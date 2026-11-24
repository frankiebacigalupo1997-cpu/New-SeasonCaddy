import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { posthogLogger } from "./lib/posthog-logs.server";

type ServerEntry = {
  fetch: (
    request: Request,
    env: unknown,
    ctx: unknown,
  ) => Promise<Response> | Response;
};

type ServerContext = {
  waitUntil?: (promise: Promise<unknown>) => void;
} | undefined;

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(ctx: ServerContext): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => {
        ctx?.waitUntil?.(
          posthogLogger.info("TanStack Start server entry initialized", {
            runtime: "node",
          }),
        );
        return (m.default ?? m) as ServerEntry;
      },
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(
  response: Response,
  ctx: ServerContext,
): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(
    consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`),
  );
  ctx?.waitUntil?.(
    posthogLogger.warn("SSR error response normalized", {
      response_status: response.status,
    }),
  );
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as {
      unhandled?: unknown;
      message?: unknown;
    };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: ServerContext) {
    try {
      const handler = await getServerEntry(ctx);
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response, ctx);
    } catch (error) {
      console.error(error);
      ctx?.waitUntil?.(
        posthogLogger.error(
          "SSR request failed before a response was produced",
        ),
      );
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
