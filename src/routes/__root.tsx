import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import type {
  ReactNode,
} from "react";

import appCss from "../styles.css?url";

import {
  Toaster,
} from "@/components/ui/sonner";

import {
  AuthProvider,
} from "@/hooks/useAuth";

import {
  PostHogErrorBoundary,
  PostHogProvider,
} from "@posthog/react";

const posthogToken =
  import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;

const posthogHost =
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

/* ====================================================== */
/* NOT FOUND                                              */
/* ====================================================== */

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">
          404
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ====================================================== */
/* ERROR BOUNDARY                                         */
/* ====================================================== */

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;

  reset: () => void;
}) {
  console.error(
    error,
  );

  const router =
    useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();

              reset();
            }}
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand/90"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface-2 px-4 py-2 text-sm font-bold text-foreground transition-colors hover:border-brand"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/* ====================================================== */
/* ROOT ROUTE                                             */
/* ====================================================== */

export const Route =
  createRootRouteWithContext<{
    queryClient: QueryClient;
  }>()({
    head: () => ({
      meta: [
        {
          charSet:
            "utf-8",
        },

        {
          name:
            "viewport",

          content:
            "width=device-width, initial-scale=1",
        },

        {
          title:
            "SeasonCaddy — Find Where to Watch Sports",
        },

        {
          name:
            "description",

          content:
            "Find upcoming sports events and see where they're available to watch in the United States.",
        },

        {
          property:
            "og:title",

          content:
            "SeasonCaddy — Find Where to Watch Sports",
        },

        {
          property:
            "og:description",

          content:
            "Find upcoming sports events and see where they're available to watch in the United States.",
        },

        {
          property:
            "og:type",

          content:
            "website",
        },

        {
          property:
            "og:image",

          content:
            "https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding/SeasonCaddy%20Logo%20Blue.png",
        },

        {
          property:
            "og:image:alt",

          content:
            "SeasonCaddy emblem",
        },

        {
          name:
            "twitter:image",

          content:
            "https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding/SeasonCaddy%20Logo%20Blue.png",
        },

        {
          name:
            "twitter:image:alt",

          content:
            "SeasonCaddy emblem",
        },

        {
          name:
            "twitter:card",

          content:
            "summary_large_image",
        },

        {
          name:
            "theme-color",

          content:
            "#07111f",
        },

        {
  name: "impact-site-verification",
  value: "fb8e9c3f-e0a9-44de-bed3-1dd34ba3c735",
},

{
  name: "mitgo-verification",
  content: "7dadce9d-4081-4981-a35b-c003c162fedc",
},
      ],

      links: [
        {
          rel:
            "stylesheet",

          href:
            appCss,
        },

        /* ================================================== */
        /* SEASONCADDY FAVICONS                               */
        /* ================================================== */

        {
          rel: "icon",
          href: "/favicon-48x48.png",
          type: "image/png",
          sizes: "48x48",
        },

        {
          rel: "icon",
          href: "/favicon-96x96.png",
          type: "image/png",
          sizes: "96x96",
        },

        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },

        {
          rel: "apple-touch-icon",
          href: "/favicon-192x192.png",
          sizes: "192x192",
        },

        {
          rel:
            "preconnect",

          href:
            "https://fonts.googleapis.com",
        },

        {
          rel:
            "preconnect",

          href:
            "https://fonts.gstatic.com",

          crossOrigin:
            "anonymous",
        },

        {
          rel:
            "stylesheet",

          href:
            "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap",
        },
      ],
    }),

    shellComponent:
      RootShell,

    component:
      RootComponent,

    notFoundComponent:
      NotFoundComponent,

    errorComponent:
      ErrorComponent,
  });

/* ====================================================== */
/* ROOT HTML SHELL                                        */
/* ====================================================== */

function RootShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        {
          children
        }

        <Scripts />
      </body>
    </html>
  );
}

/* ====================================================== */
/* ROOT APP                                               */
/* ====================================================== */

function RootComponent() {
  const {
    queryClient,
  } =
    Route.useRouteContext();

  if (import.meta.env.DEV && typeof window !== "undefined") {
    if (!posthogToken) {
      throw new Error(
        "VITE_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
      );
    }

    if (!posthogHost) {
      throw new Error(
        "VITE_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_HOST is configured",
      );
    }
  }

  const app = (
    <QueryClientProvider
      client={
        queryClient
      }
    >
      <AuthProvider>
        {/* Required: nested routes render here. */}
        <Outlet />
      </AuthProvider>

      <Toaster />
    </QueryClientProvider>
  );

  if (!posthogToken || !posthogHost) {
    return app;
  }

  return (
    <PostHogProvider
      apiKey={
        posthogToken
      }
      options={{
        api_host: posthogHost,
        capture_exceptions: true,
        debug: import.meta.env.DEV,
      }}
    >
      <PostHogErrorBoundary>
        {app}
      </PostHogErrorBoundary>
    </PostHogProvider>
  );
}
