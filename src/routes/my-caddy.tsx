import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from "@tanstack/react-router";

import {
  CalendarDays,
  Home,
  Settings,
  Tv,
  Users,
} from "lucide-react";

import type { ReactNode } from "react";

import { Shell } from "@/components/gamehub/Shell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/my-caddy")({

  component: MyCaddyLayout,
});

function MyCaddyLayout() {
  const location =
    useLocation();

  const path =
    location.pathname;

  return (
    <Shell>
      <main
        className="mx-auto px-4 pb-12 pt-8 md:px-6 md:pt-10"
        style={{
          maxWidth:
            "1600px",
        }}
      >
        <div className="my-caddy-layout">

          {/* SIDEBAR / MOBILE NAV */}

          <aside className="my-caddy-sidebar min-w-0">
          <nav className="my-caddy-nav sportstream-scrollbar">
              <SidebarLink
                to="/my-caddy"
                icon={
                  <Home
                    size={
                      19
                    }
                  />
                }
                label="Overview"
                active={
                  path ===
                    "/my-caddy" ||
                  path ===
                    "/my-caddy/"
                }
              />

              <SidebarLink
                to="/my-caddy/calendar"
                icon={
                  <CalendarDays
                    size={
                      19
                    }
                  />
                }
                label="My Calendar"
                active={
                  path.startsWith(
                    "/my-caddy/calendar",
                  )
                }
              />

              <SidebarLink
                to="/my-caddy/streaming"
                icon={
                  <Tv
                    size={
                      19
                    }
                  />
                }
                label="Streaming & Coverage"
                active={
                  path.startsWith(
                    "/my-caddy/streaming",
                  )
                }
              />

              <SidebarLink
                to="/my-caddy/teams"
                icon={
                  <Users
                    size={
                      19
                    }
                  />
                }
                label="My Teams"
                active={
                  path.startsWith(
                    "/my-caddy/teams",
                  )
                }
              />

              <SidebarLink
                to="/my-caddy/settings"
                icon={
                  <Settings
                    size={
                      19
                    }
                  />
                }
                label="Account Settings"
                active={
                  path.startsWith(
                    "/my-caddy/settings",
                  )
                }
              />
            </nav>
          </aside>

          {/* ACTIVE MY CADDY PAGE */}

          <section className="min-w-0">
            <Outlet />
          </section>
        </div>
      </main>
    </Shell>
  );
}

function SidebarLink({
  to,
  icon,
  label,
  active,
}: {
  to:
    | "/my-caddy"
    | "/my-caddy/calendar"
    | "/my-caddy/streaming"
    | "/my-caddy/teams"
    | "/my-caddy/settings";

  icon:
    ReactNode;

  label:
    string;

  active:
    boolean;
}) {
  return (
    <Link
      to={
        to
      }
      className="my-caddy-nav-link rounded-[11px] text-sm transition-colors"
      style={{
        border:
          active
            ? "1px solid color-mix(in oklch, var(--brand) 35%, transparent)"
            : "1px solid transparent",

        background:
          active
            ? "color-mix(in oklch, var(--brand) 14%, transparent)"
            : "transparent",

        color:
          active
            ? "var(--brand)"
            : "var(--foreground)",

        fontWeight:
          active
            ? 750
            : 650,

        textDecoration:
          "none",
      }}
    >
      <span className="shrink-0">
        {
          icon
        }
      </span>

      <span>
        {
          label
        }
      </span>
    </Link>
  );
}
