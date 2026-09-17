import {
  useState,
} from "react";

import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  AlertTriangle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Trash2,
  X,
} from "lucide-react";

import {
  useAuth,
} from "@/hooks/useAuth";

import {
  supabase,
} from "@/integrations/supabase/client";

export const Route =
  createFileRoute(
    "/my-caddy/settings",
  )({
    component:
      SettingsPage,
  });

function SettingsPage() {
  const {
    user,
    loading,
  } =
    useAuth();

  const navigate =
    useNavigate();

  /* ==================================================== */
  /* PASSWORD                                             */
  /* ==================================================== */

  const [
    newPassword,
    setNewPassword,
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
    showConfirmPassword,
    setShowConfirmPassword,
  ] =
    useState(false);

  const [
    saving,
    setSaving,
  ] =
    useState(false);

  const [
    message,
    setMessage,
  ] = useState<{
    type:
      | "success"
      | "error";

    text: string;
  } | null>(
    null,
  );

  /* ==================================================== */
  /* DELETE ACCOUNT                                       */
  /* ==================================================== */

  const [
    deleteOpen,
    setDeleteOpen,
  ] =
    useState(false);

  const [
    deleteConfirmation,
    setDeleteConfirmation,
  ] =
    useState("");

  const [
    deleting,
    setDeleting,
  ] =
    useState(false);

  const [
    deleteError,
    setDeleteError,
  ] =
    useState<
      string | null
    >(null);

  /* ==================================================== */
  /* UPDATE PASSWORD                                      */
  /* ==================================================== */

  async function updatePassword(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage(
      null,
    );

    if (
      !newPassword ||
      !confirmPassword
    ) {
      setMessage({
        type:
          "error",

        text:
          "Enter and confirm your new password.",
      });

      return;
    }

    if (
      newPassword.length <
      6
    ) {
      setMessage({
        type:
          "error",

        text:
          "Your password must be at least 6 characters.",
      });

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setMessage({
        type:
          "error",

        text:
          "The passwords do not match.",
      });

      return;
    }

    setSaving(
      true,
    );

    try {
      const {
        error,
      } =
        await supabase.auth.updateUser(
          {
            password:
              newPassword,
          },
        );

      if (
        error
      ) {
        throw error;
      }

      setNewPassword(
        "",
      );

      setConfirmPassword(
        "",
      );

      setMessage({
        type:
          "success",

        text:
          "Your password has been updated.",
      });
    } catch (
      error
    ) {
      console.error(
        "Failed to update password:",
        error,
      );

      setMessage({
        type:
          "error",

        text:
          error instanceof
          Error
            ? error.message
            : "We couldn't update your password. Please try again.",
      });
    } finally {
      setSaving(
        false,
      );
    }
  }

  /* ==================================================== */
  /* DELETE DIALOG                                        */
  /* ==================================================== */

  function openDeleteDialog() {
    setDeleteConfirmation(
      "",
    );

    setDeleteError(
      null,
    );

    setDeleteOpen(
      true,
    );
  }

  function closeDeleteDialog() {
    if (
      deleting
    ) {
      return;
    }

    setDeleteOpen(
      false,
    );

    setDeleteConfirmation(
      "",
    );

    setDeleteError(
      null,
    );
  }

  /* ==================================================== */
  /* DELETE ACCOUNT                                       */
  /* ==================================================== */

  async function deleteAccount() {
    if (
      deleteConfirmation !==
        "DELETE" ||
      deleting
    ) {
      return;
    }

    setDeleting(
      true,
    );

    setDeleteError(
      null,
    );

    try {
      const {
        data: {
          session,
        },

        error:
          sessionError,
      } =
        await supabase.auth.getSession();

      if (
        sessionError
      ) {
        throw sessionError;
      }

      if (
        !session?.access_token
      ) {
        throw new Error(
          "Your session has expired. Please sign in again.",
        );
      }

      const {
        data,
        error,
      } =
        await supabase.functions.invoke(
          "delete-account",
          {
            body:
              {},

            headers:
              {
                Authorization:
                  `Bearer ${session.access_token}`,
              },
          },
        );

      if (
        error
      ) {
        console.error(
          "Delete function error:",
          error,
        );

        console.error(
          "Delete function response:",
          data,
        );

        throw error;
      }

      if (
        !data?.success
      ) {
        throw new Error(
          data?.error ??
            "The account could not be deleted.",
        );
      }

      setDeleteOpen(
        false,
      );

      navigate({
        to:
          "/auth",

        replace:
          true,
      });
    } catch (
      error
    ) {
      console.error(
        "Failed to delete account:",
        error,
      );

      setDeleteError(
        error instanceof
        Error
          ? error.message
          : "We couldn't delete your account. Please try again.",
      );

      setDeleting(
        false,
      );
    }
  }

  /* ==================================================== */
  /* PAGE                                                 */
  /* ==================================================== */

  return (
    <>
      <div className="account-settings-page">

        {/* =============================================== */}
        {/* PAGE HEADING                                    */}
        {/* =============================================== */}

        <div className="account-settings-heading">
          <h1
            style={{
              margin:
                0,

              fontSize:
                38,

              lineHeight:
                1.1,

              fontWeight:
                800,
            }}
          >
            Account Settings
          </h1>

          <p
            style={{
              margin:
                "10px 0 0",

              color:
                "var(--muted-foreground)",

              fontSize:
                16,
            }}
          >
            Manage your SeasonCaddy account.
          </p>
        </div>

        {/* =============================================== */}
        {/* ACCOUNT                                         */}
        {/* =============================================== */}

        <section
          style={
            panelStyle
          }
        >
          <div
            style={
              sectionHeaderStyle
            }
          >
            <div>
              <h2
                style={
                  sectionTitleStyle
                }
              >
                Account
              </h2>

              <p
                style={
                  sectionDescriptionStyle
                }
              >
                The email address associated with your SeasonCaddy account.
              </p>
            </div>
          </div>

          <div
            style={
              sectionBodyStyle
            }
          >
            <label
              style={
                labelStyle
              }
            >
              EMAIL ADDRESS
            </label>

            <div
              style={
                readOnlyFieldStyle
              }
            >
              <Mail
                size={
                  18
                }
                style={{
                  flexShrink:
                    0,
                }}
              />

              <span
                style={{
                  minWidth:
                    0,

                  overflow:
                    "hidden",

                  textOverflow:
                    "ellipsis",

                  whiteSpace:
                    "nowrap",
                }}
              >
                {loading
                  ? "Loading..."
                  : user?.email ??
                    "No email available"}
              </span>
            </div>
          </div>
        </section>

        {/* =============================================== */}
        {/* PASSWORD                                        */}
        {/* =============================================== */}

        <section
          style={{
            ...panelStyle,

            marginTop:
              20,
          }}
        >
          <div
            style={
              sectionHeaderStyle
            }
          >
            <div>
              <h2
                style={
                  sectionTitleStyle
                }
              >
                Password
              </h2>

              <p
                style={
                  sectionDescriptionStyle
                }
              >
                Choose a new password for your account.
              </p>
            </div>
          </div>

          <form
            onSubmit={
              updatePassword
            }
            style={
              sectionBodyStyle
            }
          >
            <PasswordField
              label="NEW PASSWORD"
              value={
                newPassword
              }
              onChange={
                setNewPassword
              }
              visible={
                showPassword
              }
              onToggle={() =>
                setShowPassword(
                  (
                    current,
                  ) =>
                    !current,
                )
              }
            />

            <div
              style={{
                height:
                  18,
              }}
            />

            <PasswordField
              label="CONFIRM NEW PASSWORD"
              value={
                confirmPassword
              }
              onChange={
                setConfirmPassword
              }
              visible={
                showConfirmPassword
              }
              onToggle={() =>
                setShowConfirmPassword(
                  (
                    current,
                  ) =>
                    !current,
                )
              }
            />

            {message && (
              <div
                style={{
                  marginTop:
                    18,

                  padding:
                    "12px 14px",

                  borderRadius:
                    10,

                  border:
                    message.type ===
                    "success"
                      ? "1px solid color-mix(in oklch, var(--brand) 45%, var(--border))"
                      : "1px solid rgba(248, 113, 113, 0.45)",

                  background:
                    message.type ===
                    "success"
                      ? "color-mix(in oklch, var(--brand) 10%, transparent)"
                      : "rgba(248, 113, 113, 0.08)",

                  color:
                    message.type ===
                    "success"
                      ? "var(--brand)"
                      : "#fca5a5",

                  fontSize:
                    14,
                }}
              >
                {
                  message.text
                }
              </div>
            )}

            <div className="account-settings-password-actions">
              <button
                type="submit"
                disabled={
                  saving
                }
                style={{
                  border:
                    0,

                  borderRadius:
                    10,

                  padding:
                    "12px 18px",

                  background:
                    "var(--brand)",

                  color:
                    "var(--brand-foreground)",

                  fontWeight:
                    800,

                  cursor:
                    saving
                      ? "default"
                      : "pointer",

                  opacity:
                    saving
                      ? 0.65
                      : 1,
                }}
              >
                {saving
                  ? "Updating..."
                  : "Update password"}
              </button>
            </div>
          </form>
        </section>

        {/* =============================================== */}
        {/* DANGER ZONE                                     */}
        {/* =============================================== */}

        <section
          style={{
            ...panelStyle,

            marginTop:
              20,

            border:
              "1px solid rgba(248, 113, 113, 0.35)",
          }}
        >
          <div
            style={
              sectionHeaderStyle
            }
          >
            <div>
              <h2
                style={
                  sectionTitleStyle
                }
              >
                Delete account
              </h2>

              <p
                style={
                  sectionDescriptionStyle
                }
              >
                Permanently delete your SeasonCaddy account and account data.
              </p>
            </div>
          </div>

          <div className="account-settings-danger-body">
            <div
              style={{
                color:
                  "var(--muted-foreground)",

                fontSize:
                  14,

                lineHeight:
                  1.6,

                maxWidth:
                  570,
              }}
            >
              Deleting your account is permanent and cannot be undone.
            </div>

            <button
              type="button"
              onClick={
                openDeleteDialog
              }
              className="account-settings-delete-button"
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                gap:
                  8,

                border:
                  "1px solid rgba(248, 113, 113, 0.5)",

                borderRadius:
                  10,

                padding:
                  "11px 16px",

                background:
                  "rgba(248, 113, 113, 0.08)",

                color:
                  "#fca5a5",

                fontWeight:
                  800,

                cursor:
                  "pointer",
              }}
            >
              <Trash2
                size={
                  17
                }
              />

              Delete account
            </button>
          </div>
        </section>
      </div>

      {/* ================================================= */}
      {/* DELETE CONFIRMATION MODAL                         */}
      {/* ================================================= */}

      {deleteOpen && (
        <div
          role="presentation"
          className="account-settings-modal-backdrop"
          onMouseDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeDeleteDialog();
            }
          }}
          style={{
            background:
              "rgba(0, 0, 0, 0.68)",

            backdropFilter:
              "blur(5px)",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            className="account-settings-delete-modal"
            style={{
              overflow:
                "hidden",

              border:
                "1px solid rgba(248, 113, 113, 0.4)",

              borderRadius:
                16,

              background:
                "var(--surface-1)",

              boxShadow:
                "0 24px 80px rgba(0, 0, 0, 0.45)",
            }}
          >

            {/* =========================================== */}
            {/* MODAL HEADER                                */}
            {/* =========================================== */}

            <div
              className="account-settings-modal-header"
              style={{
                borderBottom:
                  "1px solid var(--border)",
              }}
            >
              <div className="account-settings-modal-title-row">
                <div
                  style={{
                    display:
                      "grid",

                    placeItems:
                      "center",

                    width:
                      42,

                    height:
                      42,

                    flexShrink:
                      0,

                    borderRadius:
                      11,

                    background:
                      "rgba(248, 113, 113, 0.12)",

                    color:
                      "#fca5a5",
                  }}
                >
                  <AlertTriangle
                    size={
                      21
                    }
                  />
                </div>

                <div
                  style={{
                    minWidth:
                      0,
                  }}
                >
                  <h2
                    id="delete-account-title"
                    style={{
                      margin:
                        0,

                      fontSize:
                        21,

                      fontWeight:
                        800,
                    }}
                  >
                    Delete your account?
                  </h2>

                  <p
                    style={{
                      margin:
                        "7px 0 0",

                      color:
                        "var(--muted-foreground)",

                      fontSize:
                        14,

                      lineHeight:
                        1.55,
                    }}
                  >
                    This will permanently delete your SeasonCaddy account.
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  closeDeleteDialog
                }
                disabled={
                  deleting
                }
                aria-label="Close"
                style={{
                  display:
                    "grid",

                  placeItems:
                    "center",

                  width:
                    34,

                  height:
                    34,

                  flexShrink:
                    0,

                  padding:
                    0,

                  border:
                    0,

                  borderRadius:
                    8,

                  background:
                    "transparent",

                  color:
                    "var(--muted-foreground)",

                  cursor:
                    deleting
                      ? "default"
                      : "pointer",
                }}
              >
                <X
                  size={
                    19
                  }
                />
              </button>
            </div>

            {/* =========================================== */}
            {/* MODAL BODY                                  */}
            {/* =========================================== */}

            <div className="account-settings-modal-body">
              <p
                style={{
                  margin:
                    "0 0 14px",

                  color:
                    "var(--muted-foreground)",

                  fontSize:
                    14,

                  lineHeight:
                    1.55,
                }}
              >
                To confirm, type{" "}
                <strong
                  style={{
                    color:
                      "var(--text)",
                  }}
                >
                  DELETE
                </strong>{" "}
                below.
              </p>

              <input
                type="text"
                value={
                  deleteConfirmation
                }
                onChange={(
                  event,
                ) => {
                  setDeleteConfirmation(
                    event.target.value,
                  );

                  setDeleteError(
                    null,
                  );
                }}
                disabled={
                  deleting
                }
                autoFocus
                autoComplete="off"
                placeholder="Type DELETE"
                style={{
                  width:
                    "100%",

                  boxSizing:
                    "border-box",

                  border:
                    "1px solid var(--border)",

                  borderRadius:
                    10,

                  background:
                    "var(--surface-2)",

                  color:
                    "var(--text)",

                  padding:
                    "13px 14px",

                  outline:
                    "none",

                  font:
                    "inherit",
                }}
              />

              {deleteError && (
                <div
                  style={{
                    marginTop:
                      14,

                    padding:
                      "11px 13px",

                    border:
                      "1px solid rgba(248, 113, 113, 0.4)",

                    borderRadius:
                      9,

                    background:
                      "rgba(248, 113, 113, 0.08)",

                    color:
                      "#fca5a5",

                    fontSize:
                      14,

                    lineHeight:
                      1.5,
                  }}
                >
                  {
                    deleteError
                  }
                </div>
              )}

              <div className="account-settings-modal-actions">
                <button
                  type="button"
                  className="account-settings-modal-button"
                  onClick={
                    closeDeleteDialog
                  }
                  disabled={
                    deleting
                  }
                  style={{
                    border:
                      "1px solid var(--border)",

                    borderRadius:
                      10,

                    padding:
                      "11px 16px",

                    background:
                      "transparent",

                    color:
                      "var(--text)",

                    fontWeight:
                      700,

                    cursor:
                      deleting
                        ? "default"
                        : "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="account-settings-modal-button"
                  onClick={
                    deleteAccount
                  }
                  disabled={
                    deleteConfirmation !==
                      "DELETE" ||
                    deleting
                  }
                  style={{
                    display:
                      "inline-flex",

                    alignItems:
                      "center",

                    gap:
                      8,

                    border:
                      "1px solid rgba(248, 113, 113, 0.55)",

                    borderRadius:
                      10,

                    padding:
                      "11px 16px",

                    background:
                      "#dc2626",

                    color:
                      "#ffffff",

                    fontWeight:
                      800,

                    cursor:
                      deleteConfirmation ===
                        "DELETE" &&
                      !deleting
                        ? "pointer"
                        : "not-allowed",

                    opacity:
                      deleteConfirmation ===
                        "DELETE" &&
                      !deleting
                        ? 1
                        : 0.45,
                  }}
                >
                  <Trash2
                    size={
                      17
                    }
                  />

                  {deleting
                    ? "Deleting..."
                    : "Permanently delete account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ====================================================== */
/* PASSWORD FIELD                                         */
/* ====================================================== */

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
}: {
  label: string;

  value: string;

  onChange: (
    value: string,
  ) => void;

  visible: boolean;

  onToggle:
    () => void;
}) {
  return (
    <div>
      <label
        style={
          labelStyle
        }
      >
        {
          label
        }
      </label>

      <div
        style={{
          position:
            "relative",

          display:
            "flex",

          alignItems:
            "center",
        }}
      >
        <Lock
          size={
            18
          }
          style={{
            position:
              "absolute",

            left:
              14,

            color:
              "var(--muted-foreground)",

            pointerEvents:
              "none",
          }}
        />

        <input
          type={
            visible
              ? "text"
              : "password"
          }
          value={
            value
          }
          onChange={(
            event,
          ) =>
            onChange(
              event.target.value,
            )
          }
          autoComplete="new-password"
          style={{
            width:
              "100%",

            boxSizing:
              "border-box",

            border:
              "1px solid var(--border)",

            borderRadius:
              10,

            background:
              "var(--surface-1)",

            color:
              "var(--text)",

            padding:
              "13px 46px 13px 44px",

            outline:
              "none",

            font:
              "inherit",
          }}
        />

        <button
          type="button"
          onClick={
            onToggle
          }
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
          style={{
            position:
              "absolute",

            right:
              10,

            display:
              "grid",

            placeItems:
              "center",

            width:
              34,

            height:
              34,

            padding:
              0,

            border:
              0,

            background:
              "transparent",

            color:
              "var(--muted-foreground)",

            cursor:
              "pointer",
          }}
        >
          {visible ? (
            <EyeOff
              size={
                18
              }
            />
          ) : (
            <Eye
              size={
                18
              }
            />
          )}
        </button>
      </div>
    </div>
  );
}

/* ====================================================== */
/* STYLES                                                 */
/* ====================================================== */

const panelStyle:
  React.CSSProperties =
{
  overflow:
    "hidden",

  border:
    "1px solid var(--border)",

  borderRadius:
    14,

  background:
    "color-mix(in oklch, var(--surface-2) 60%, transparent)",
};

const sectionHeaderStyle:
  React.CSSProperties =
{
  display:
    "flex",

  alignItems:
    "center",

  justifyContent:
    "space-between",

  gap:
    20,

  padding:
    "20px 22px",

  borderBottom:
    "1px solid var(--border)",
};

const sectionBodyStyle:
  React.CSSProperties =
{
  padding:
    22,
};

const sectionTitleStyle:
  React.CSSProperties =
{
  margin:
    0,

  fontSize:
    20,

  fontWeight:
    800,
};

const sectionDescriptionStyle:
  React.CSSProperties =
{
  margin:
    "6px 0 0",

  color:
    "var(--muted-foreground)",

  fontSize:
    14,
};

const labelStyle:
  React.CSSProperties =
{
  display:
    "block",

  marginBottom:
    8,

  color:
    "var(--muted-foreground)",

  fontSize:
    12,

  fontWeight:
    800,

  letterSpacing:
    "0.04em",
};

const readOnlyFieldStyle:
  React.CSSProperties =
{
  display:
    "flex",

  alignItems:
    "center",

  gap:
    12,

  minHeight:
    46,

  boxSizing:
    "border-box",

  padding:
    "0 14px",

  border:
    "1px solid var(--border)",

  borderRadius:
    10,

  background:
    "var(--surface-1)",

  color:
    "var(--text)",
};