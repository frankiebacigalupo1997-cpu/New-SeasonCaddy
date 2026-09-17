import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  toast,
} from "sonner";

import {
  supabase,
} from "@/integrations/supabase/client";

import {
  useAuth,
} from "@/hooks/useAuth";

const SEASONCADDY_LOGO_URL =
  "https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding/SeasonCaddy%20Logo%20Blue.png";

export const Route =
  createFileRoute(
    "/auth",
  )({
    head: () => ({
      meta: [
        {
          title:
            "Sign in — SeasonCaddy",
        },
        {
          name:
            "description",
          content:
            "Sign in or create your SeasonCaddy account.",
        },
        {
          property:
            "og:title",
          content:
            "Sign in — SeasonCaddy",
        },
        {
          property:
            "og:description",
          content:
            "Sign in to SeasonCaddy and keep your Caddy with you.",
        },
      ],
    }),

    component:
      AuthPage,
  });

type AuthMode =
  | "signin"
  | "signup";

function AuthPage() {
  const navigate =
    useNavigate();

  const {
    user,
    loading,
  } =
    useAuth();

  const [
    mode,
    setMode,
  ] =
    useState<AuthMode>(
      "signin",
    );

  const [
    email,
    setEmail,
  ] =
    useState("");

  const [
    password,
    setPassword,
  ] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] =
    useState(false);

  const [
    busy,
    setBusy,
  ] =
    useState(false);

  /* ==================================================== */
  /* REDIRECT SIGNED-IN USERS                             */
  /* ==================================================== */

  useEffect(() => {
    if (
      !loading &&
      user
    ) {
      navigate({
        to: "/my-caddy",
      });
    }
  }, [
    loading,
    user,
    navigate,
  ]);

  /* ==================================================== */
  /* CHANGE MODE                                          */
  /* ==================================================== */

  function changeMode(
    nextMode: AuthMode,
  ) {
    setMode(
      nextMode,
    );

    setPassword(
      "",
    );

    setConfirmPassword(
      "",
    );

    setShowPassword(
      false,
    );
  }

  /* ==================================================== */
  /* SUBMIT                                               */
  /* ==================================================== */

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    if (
      !cleanEmail
    ) {
      toast.error(
        "Enter your email address.",
      );

      return;
    }

    if (
      password.length <
      6
    ) {
      toast.error(
        "Your password must be at least 6 characters.",
      );

      return;
    }

    if (
      mode ===
        "signup" &&
      password !==
        confirmPassword
    ) {
      toast.error(
        "Your passwords do not match.",
      );

      return;
    }

    setBusy(
      true,
    );

    try {
      if (
        mode ===
        "signin"
      ) {
        const {
          error,
        } =
          await supabase.auth.signInWithPassword(
            {
              email:
                cleanEmail,

              password,
            },
          );

        if (
          error
        ) {
          throw error;
        }

        toast.success(
          "Welcome back",
        );

        navigate({
          to: "/my-caddy",
        });

        return;
      }

      const {
        data,
        error,
      } =
        await supabase.auth.signUp(
          {
            email:
              cleanEmail,

            password,
          },
        );

      if (
        error
      ) {
        throw error;
      }

      /*
       * If Supabase email confirmation is disabled,
       * signUp returns a session and the user can
       * continue immediately.
       */
      if (
        data.session
      ) {
        toast.success(
          "Your SeasonCaddy account is ready",
        );

        navigate({
          to: "/my-caddy",
        });

        return;
      }

      /*
       * This fallback remains in case email
       * confirmation is still enabled in Supabase.
       */
      toast.success(
        "Account created. Check your email to finish signing in.",
      );

      changeMode(
        "signin",
      );
    } catch (
      error
    ) {
      console.error(
        "Authentication failed",
        error,
      );

      toast.error(
        getAuthErrorMessage(
          error,
          mode,
        ),
      );
    } finally {
      setBusy(
        false,
      );
    }
  }

  /* ==================================================== */
  /* RENDER                                               */
  /* ==================================================== */

  return (
    <div
      className="bg-background bg-arena"
      style={{
        minHeight:
          "100vh",

        display:
          "grid",

        placeItems:
          "center",

        padding:
          "24px",
      }}
    >
      <div
        style={{
          width:
            "100%",

          maxWidth:
            "430px",
        }}
      >
        {/* BRAND */}

        <div
          style={{
            marginBottom:
              "24px",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >
          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                "12px",
            }}
          >
            <img
              src={
                SEASONCADDY_LOGO_URL
              }
              alt="SeasonCaddy logo"
              style={{
                width:
                  "50px",

                height:
                  "50px",

                objectFit:
                  "contain",

                display:
                  "block",
              }}
            />

            <div
              className="font-display font-extrabold tracking-tight"
              style={{
                fontSize:
                  "24px",

                lineHeight:
                  1,

                whiteSpace:
                  "nowrap",
              }}
            >
              <span className="text-foreground">
                Season
              </span>

              <span className="text-brand">
                Caddy
              </span>
            </div>
          </div>
        </div>

        {/* AUTH PANEL */}

        <section
          style={{
            borderRadius:
              "14px",

            border:
              "1px solid var(--border)",

            background:
              "color-mix(in oklch, var(--surface-2) 70%, transparent)",

            overflow:
              "hidden",
          }}
        >
          {/* MODE TABS */}

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1fr 1fr",

              padding:
                "6px",

              borderBottom:
                "1px solid var(--border)",
            }}
          >
            <ModeButton
              active={
                mode ===
                "signin"
              }
              onClick={() =>
                changeMode(
                  "signin",
                )
              }
            >
              Sign in
            </ModeButton>

            <ModeButton
              active={
                mode ===
                "signup"
              }
              onClick={() =>
                changeMode(
                  "signup",
                )
              }
            >
              Create account
            </ModeButton>
          </div>

          <div
            style={{
              padding:
                "26px",
            }}
          >
            <div
              style={{
                marginBottom:
                  "22px",
              }}
            >
              <h1
                className="font-display"
                style={{
                  margin:
                    0,

                  fontSize:
                    "24px",

                  fontWeight:
                    900,

                  letterSpacing:
                    "-0.025em",
                }}
              >
                {mode ===
                "signin"
                  ? "Welcome back"
                  : "Create your account"}
              </h1>

              <p
                className="text-muted-foreground"
                style={{
                  margin:
                    "7px 0 0",

                  fontSize:
                    "12px",

                  lineHeight:
                    1.5,
                }}
              >
                {mode ===
                "signin"
                  ? "Sign in to access your Caddy."
                  : "Create an account to save your teams and access My Caddy."}
              </p>
            </div>

            <form
              onSubmit={
                submit
              }
            >
              {/* EMAIL */}

              <label
                style={{
                  display:
                    "block",
                }}
              >
                <span
                  style={
                    labelStyle
                  }
                >
                  Email address
                </span>

                <div
                  style={{
                    position:
                      "relative",
                  }}
                >
                  <Mail
                    size={
                      16
                    }
                    className="text-muted-foreground"
                    style={{
                      position:
                        "absolute",

                      left:
                        "12px",

                      top:
                        "50%",

                      transform:
                        "translateY(-50%)",

                      pointerEvents:
                        "none",
                    }}
                  />

                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={
                      email
                    }
                    onChange={(
                      event,
                    ) =>
                      setEmail(
                        event
                          .target
                          .value,
                      )
                    }
                    placeholder="you@example.com"
                    style={{
                      ...inputStyle,

                      paddingLeft:
                        "38px",
                    }}
                  />
                </div>
              </label>

              {/* PASSWORD */}

              <label
                style={{
                  display:
                    "block",

                  marginTop:
                    "16px",
                }}
              >
                <span
                  style={
                    labelStyle
                  }
                >
                  Password
                </span>

                <div
                  style={{
                    position:
                      "relative",
                  }}
                >
                  <LockKeyhole
                    size={
                      16
                    }
                    className="text-muted-foreground"
                    style={{
                      position:
                        "absolute",

                      left:
                        "12px",

                      top:
                        "50%",

                      transform:
                        "translateY(-50%)",

                      pointerEvents:
                        "none",
                    }}
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    required
                    minLength={
                      6
                    }
                    autoComplete={
                      mode ===
                      "signin"
                        ? "current-password"
                        : "new-password"
                    }
                    value={
                      password
                    }
                    onChange={(
                      event,
                    ) =>
                      setPassword(
                        event
                          .target
                          .value,
                      )
                    }
                    placeholder="Enter your password"
                    style={{
                      ...inputStyle,

                      paddingLeft:
                        "38px",

                      paddingRight:
                        "42px",
                    }}
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowPassword(
                        (
                          current,
                        ) =>
                          !current,
                      )
                    }
                    style={{
                      position:
                        "absolute",

                      right:
                        "10px",

                      top:
                        "50%",

                      transform:
                        "translateY(-50%)",

                      display:
                        "grid",

                      placeItems:
                        "center",

                      padding:
                        "4px",

                      border:
                        "none",

                      background:
                        "transparent",

                      color:
                        "var(--muted-foreground)",

                      cursor:
                        "pointer",
                    }}
                  >
                    {showPassword ? (
                      <EyeOff
                        size={
                          16
                        }
                      />
                    ) : (
                      <Eye
                        size={
                          16
                        }
                      />
                    )}
                  </button>
                </div>
              </label>

              {/* CONFIRM PASSWORD */}

              {mode ===
                "signup" && (
                <label
                  style={{
                    display:
                      "block",

                    marginTop:
                      "16px",
                  }}
                >
                  <span
                    style={
                      labelStyle
                    }
                  >
                    Confirm password
                  </span>

                  <div
                    style={{
                      position:
                        "relative",
                    }}
                  >
                    <LockKeyhole
                      size={
                        16
                      }
                      className="text-muted-foreground"
                      style={{
                        position:
                          "absolute",

                        left:
                          "12px",

                        top:
                          "50%",

                        transform:
                          "translateY(-50%)",

                        pointerEvents:
                          "none",
                      }}
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      required
                      minLength={
                        6
                      }
                      autoComplete="new-password"
                      value={
                        confirmPassword
                      }
                      onChange={(
                        event,
                      ) =>
                        setConfirmPassword(
                          event
                            .target
                            .value,
                        )
                      }
                      placeholder="Enter your password again"
                      style={{
                        ...inputStyle,

                        paddingLeft:
                          "38px",
                      }}
                    />
                  </div>
                </label>
              )}

              <button
                type="submit"
                disabled={
                  busy
                }
                style={{
                  width:
                    "100%",

                  height:
                    "42px",

                  marginTop:
                    "22px",

                  border:
                    "none",

                  borderRadius:
                    "9px",

                  background:
                    "var(--brand)",

                  color:
                    "var(--brand-foreground)",

                  fontSize:
                    "12px",

                  fontWeight:
                    850,

                  cursor:
                    busy
                      ? "wait"
                      : "pointer",

                  opacity:
                    busy
                      ? 0.65
                      : 1,
                }}
              >
                {busy
                  ? mode ===
                    "signin"
                    ? "Signing in..."
                    : "Creating account..."
                  : mode ===
                    "signin"
                  ? "Sign in"
                  : "Create account"}
              </button>
            </form>

            <div
              style={{
                marginTop:
                  "18px",

                textAlign:
                  "center",

                fontSize:
                  "11px",
              }}
            >
              <span className="text-muted-foreground">
                {mode ===
                "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>{" "}

              <button
                type="button"
                onClick={() =>
                  changeMode(
                    mode ===
                      "signin"
                      ? "signup"
                      : "signin",
                  )
                }
                style={{
                  padding:
                    0,

                  border:
                    "none",

                  background:
                    "transparent",

                  color:
                    "var(--brand)",

                  fontSize:
                    "11px",

                  fontWeight:
                    800,

                  cursor:
                    "pointer",
                }}
              >
                {mode ===
                "signin"
                  ? "Create one"
                  : "Sign in"}
              </button>
            </div>
          </div>
        </section>

        <p
          className="text-muted-foreground"
          style={{
            margin:
              "15px 0 0",

            textAlign:
              "center",

            fontSize:
              "10px",

            lineHeight:
              1.5,
          }}
        >
          Your password is securely handled by our authentication provider.
        </p>
      </div>
    </div>
  );
}

/* ====================================================== */
/* MODE BUTTON                                            */
/* ====================================================== */

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      style={{
        height:
          "38px",

        border:
          active
            ? "1px solid color-mix(in oklch, var(--brand) 45%, var(--border))"
            : "1px solid transparent",

        borderRadius:
          "8px",

        background:
          active
            ? "color-mix(in oklch, var(--brand) 13%, transparent)"
            : "transparent",

        color:
          active
            ? "var(--brand)"
            : "var(--muted-foreground)",

        fontSize:
          "11px",

        fontWeight:
          800,

        cursor:
          "pointer",
      }}
    >
      {
        children
      }
    </button>
  );
}

/* ====================================================== */
/* ERROR MESSAGE                                          */
/* ====================================================== */

function getAuthErrorMessage(
  error: unknown,
  mode: AuthMode,
) {
  if (
    !(error instanceof Error)
  ) {
    return "Authentication failed. Please try again.";
  }

  const message =
    error.message.toLowerCase();

  if (
    message.includes(
      "invalid login credentials",
    )
  ) {
    return "The email address or password is incorrect.";
  }

  if (
    message.includes(
      "user already registered",
    )
  ) {
    return "An account already exists with this email address.";
  }

  if (
    message.includes(
      "password",
    )
  ) {
    return error.message;
  }

  return mode ===
    "signin"
    ? "Could not sign in. Please check your details and try again."
    : "Could not create your account. Please try again.";
}

/* ====================================================== */
/* STYLES                                                 */
/* ====================================================== */

const labelStyle = {
  display:
    "block",

  marginBottom:
    "7px",

  fontSize:
    "10px",

  fontWeight:
    800,

  color:
    "var(--muted-foreground)",

  textTransform:
    "uppercase",

  letterSpacing:
    "0.055em",
} as const;

const inputStyle = {
  width:
    "100%",

  height:
    "42px",

  padding:
    "0 12px",

  borderRadius:
    "9px",

  border:
    "1px solid var(--border)",

  background:
    "var(--surface-2)",

  color:
    "var(--foreground)",

  fontSize:
    "12px",

  outline:
    "none",

  boxSizing:
    "border-box",
} as const;