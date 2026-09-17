import {
  Link,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

import {
  LogOut,
  UserRound,
} from "lucide-react";

import type {
  ReactNode,
} from "react";

import {
  useAuth,
} from "@/hooks/useAuth";

export function Shell({
  children,
}: {
  children: ReactNode;
}) {
  const {
    user,
    signOut,
  } =
    useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const isHome =
    location.pathname ===
    "/";

  const isMyCaddy =
    location.pathname.startsWith(
      "/my-caddy",
    );

  return (
    <div className="min-h-screen bg-background bg-arena">

      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="seasoncaddy-header-inner">

          {/* ============================================= */}
          {/* BRAND                                         */}
          {/* ============================================= */}

          <div className="seasoncaddy-header-brand">
            <Link
              to="/"
              className="flex min-w-0 items-center gap-3"
            >
              <div
                className="flex shrink-0 items-center justify-center overflow-hidden rounded-lg"
                style={{
                  width:
                    "44px",

                  height:
                    "44px",
                }}
              >
                <img
                  src="https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding/SeasonCaddy%20Logo%20Blue.png"
                  alt="SeasonCaddy logo"
                  style={{
                    width:
                      "44px",

                    height:
                      "44px",

                    objectFit:
                      "contain",

                    display:
                      "block",
                  }}
                />
              </div>

              <span
                className="seasoncaddy-wordmark font-display font-extrabold tracking-tight"
              >
                <span className="text-foreground">
                  Season
                </span>

                <span className="text-brand">
                  Caddy
                </span>
              </span>
            </Link>
          </div>

          {/* ============================================= */}
          {/* NAVIGATION                                    */}
          {/* ============================================= */}

          <nav className="seasoncaddy-header-nav">
            <Link
              to="/"
              className={`seasoncaddy-header-nav-link rounded-full font-semibold transition-all ${
                isHome
                  ? "bg-brand text-brand-foreground shadow-sm"
                  : "text-foreground/75 hover:bg-surface-2/60 hover:text-foreground"
              }`}
            >
              Home
            </Link>

            <Link
              to="/my-caddy"
              className={`seasoncaddy-header-nav-link rounded-full font-semibold whitespace-nowrap transition-all ${
                isMyCaddy
                  ? "bg-brand text-brand-foreground shadow-sm"
                  : "text-foreground/75 hover:bg-surface-2/60 hover:text-foreground"
              }`}
            >
              My Caddy
            </Link>
          </nav>

          {/* ============================================= */}
          {/* RIGHT SIDE                                    */}
          {/* ============================================= */}

          <div className="seasoncaddy-header-actions">

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/my-caddy/settings"
                  aria-label="Account settings"
                  title={
                    user.email ??
                    "Account settings"
                  }
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border bg-surface-2 font-bold text-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  <UserRound className="h-[18px] w-[18px]" />
                </Link>

                <button
                  type="button"
                  aria-label="Sign out"
                  onClick={async () => {
                    await signOut();

                    navigate({
                      to:
                        "/auth",
                    });
                  }}
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2/60 hover:text-foreground"
                >
                  <LogOut className="h-[18px] w-[18px]" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="seasoncaddy-sign-in rounded-lg bg-brand px-4 py-2 text-sm font-bold text-brand-foreground transition-opacity hover:opacity-90"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ================================================= */}
      {/* PAGE                                              */}
      {/* ================================================= */}

      {children}

      {/* ================================================= */}
      {/* FOOTER                                            */}
      {/* ================================================= */}

      <footer className="seasoncaddy-footer mx-auto max-w-[1600px] text-xs text-muted-foreground">
        <span className="font-semibold">
          SeasonCaddy
        </span>

        <span>
          Every game. All season.
        </span>
      </footer>
    </div>
  );
}