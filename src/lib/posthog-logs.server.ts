import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from "@opentelemetry/sdk-logs";

const posthogToken =
  process.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN ??
  import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost =
  process.env.VITE_PUBLIC_POSTHOG_HOST ??
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

const loggerProvider = createLoggerProvider();
const logger = loggerProvider?.getLogger("seasoncaddy.posthog");

type LogAttributes = Record<string, string | number | boolean>;

function createLoggerProvider() {
  if (!posthogToken) {
    if (import.meta.env.DEV) {
      console.warn(
        "VITE_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
      );
    }
    return null;
  }

  if (!posthogHost) {
    if (import.meta.env.DEV) {
      console.warn(
        "VITE_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_HOST is configured",
      );
    }
    return null;
  }

  try {
    const exporter = new OTLPLogExporter({
      url: new URL("/i/v1/logs", posthogHost).toString(),
      headers: {
        Authorization: `Bearer ${posthogToken}`,
      },
      timeoutMillis: 2000,
    });
    const provider = new LoggerProvider({
      resource: resourceFromAttributes({
        "service.name": "seasoncaddy",
      }),
      processors: [new BatchLogRecordProcessor(exporter)],
    });

    return provider;
  } catch {
    return null;
  }
}

async function emit(
  severityText: "INFO" | "WARN" | "ERROR",
  body: string,
  attributes?: LogAttributes,
) {
  try {
    logger?.emit({ severityText, body, attributes });
    await loggerProvider?.forceFlush();
  } catch {}
}

export const posthogLogger = {
  info: (body: string, attributes?: LogAttributes) =>
    emit("INFO", body, attributes),
  warn: (body: string, attributes?: LogAttributes) =>
    emit("WARN", body, attributes),
  error: (body: string, attributes?: LogAttributes) =>
    emit("ERROR", body, attributes),
};
