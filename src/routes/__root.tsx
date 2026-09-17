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
            "SeasonCaddy — Your Sports Schedule & Streaming Guide",
        },

        {
          name:
            "description",

          content:
            "Follow your teams, track upcoming fixtures, see regional broadcast coverage and find the streaming services you need with SeasonCaddy.",
        },

        {
          property:
            "og:title",

          content:
            "SeasonCaddy — Your Sports Schedule & Streaming Guide",
        },

        {
          property:
            "og:description",

          content:
            "Follow your teams, track upcoming fixtures and see where every game is available to watch.",
        },

        {
          property:
            "og:type",

          content:
            "website",
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
      ],

      links: [
        {
          rel:
            "stylesheet",

          href:
            appCss,
        },

        {
          rel: "icon",
          href: "https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding/SeasonCaddy%20Logo%20Blue.png",
          type: "image/png",
        },
        
        {
          rel: "apple-touch-icon",
          href: "https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding/SeasonCaddy%20Logo%20Blue.png",
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

  return (
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
}
