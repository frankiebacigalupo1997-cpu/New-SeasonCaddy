import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase, r as useAuth } from "./useAuth-CNmA0ie9.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TriangleAlert, b as EyeOff, f as Mail, m as Lock, o as Trash2, t as X, y as Eye } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-caddy.settings-Ct-4k5Wn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [showConfirmPassword, setShowConfirmPassword] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)(null);
	const [deleteOpen, setDeleteOpen] = (0, import_react.useState)(false);
	const [deleteConfirmation, setDeleteConfirmation] = (0, import_react.useState)("");
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const [deleteError, setDeleteError] = (0, import_react.useState)(null);
	async function updatePassword(event) {
		event.preventDefault();
		setMessage(null);
		if (!newPassword || !confirmPassword) {
			setMessage({
				type: "error",
				text: "Enter and confirm your new password."
			});
			return;
		}
		if (newPassword.length < 6) {
			setMessage({
				type: "error",
				text: "Your password must be at least 6 characters."
			});
			return;
		}
		if (newPassword !== confirmPassword) {
			setMessage({
				type: "error",
				text: "The passwords do not match."
			});
			return;
		}
		setSaving(true);
		try {
			const { error } = await supabase.auth.updateUser({ password: newPassword });
			if (error) throw error;
			setNewPassword("");
			setConfirmPassword("");
			setMessage({
				type: "success",
				text: "Your password has been updated."
			});
		} catch (error) {
			console.error("Failed to update password:", error);
			setMessage({
				type: "error",
				text: error instanceof Error ? error.message : "We couldn't update your password. Please try again."
			});
		} finally {
			setSaving(false);
		}
	}
	function openDeleteDialog() {
		setDeleteConfirmation("");
		setDeleteError(null);
		setDeleteOpen(true);
	}
	function closeDeleteDialog() {
		if (deleting) return;
		setDeleteOpen(false);
		setDeleteConfirmation("");
		setDeleteError(null);
	}
	async function deleteAccount() {
		if (deleteConfirmation !== "DELETE" || deleting) return;
		setDeleting(true);
		setDeleteError(null);
		try {
			const { data: { session }, error: sessionError } = await supabase.auth.getSession();
			if (sessionError) throw sessionError;
			if (!session?.access_token) throw new Error("Your session has expired. Please sign in again.");
			const { data, error } = await supabase.functions.invoke("delete-account", {
				body: {},
				headers: { Authorization: `Bearer ${session.access_token}` }
			});
			if (error) {
				console.error("Delete function error:", error);
				console.error("Delete function response:", data);
				throw error;
			}
			if (!data?.success) throw new Error(data?.error ?? "The account could not be deleted.");
			setDeleteOpen(false);
			navigate({
				to: "/auth",
				replace: true
			});
		} catch (error) {
			console.error("Failed to delete account:", error);
			setDeleteError(error instanceof Error ? error.message : "We couldn't delete your account. Please try again.");
			setDeleting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "account-settings-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "account-settings-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						margin: 0,
						fontSize: 38,
						lineHeight: 1.1,
						fontWeight: 800
					},
					children: "Account Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						margin: "10px 0 0",
						color: "var(--muted-foreground)",
						fontSize: 16
					},
					children: "Manage your SeasonCaddy account."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: panelStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: sectionHeaderStyle,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: sectionTitleStyle,
						children: "Account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: sectionDescriptionStyle,
						children: "The email address associated with your SeasonCaddy account."
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: sectionBodyStyle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						style: labelStyle,
						children: "EMAIL ADDRESS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: readOnlyFieldStyle,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							size: 18,
							style: { flexShrink: 0 }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								minWidth: 0,
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							},
							children: loading ? "Loading..." : user?.email ?? "No email available"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: {
					...panelStyle,
					marginTop: 20
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: sectionHeaderStyle,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: sectionTitleStyle,
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: sectionDescriptionStyle,
						children: "Choose a new password for your account."
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: updatePassword,
					style: sectionBodyStyle,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
							label: "NEW PASSWORD",
							value: newPassword,
							onChange: setNewPassword,
							visible: showPassword,
							onToggle: () => setShowPassword((current) => !current)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 18 } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
							label: "CONFIRM NEW PASSWORD",
							value: confirmPassword,
							onChange: setConfirmPassword,
							visible: showConfirmPassword,
							onToggle: () => setShowConfirmPassword((current) => !current)
						}),
						message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginTop: 18,
								padding: "12px 14px",
								borderRadius: 10,
								border: message.type === "success" ? "1px solid color-mix(in oklch, var(--brand) 45%, var(--border))" : "1px solid rgba(248, 113, 113, 0.45)",
								background: message.type === "success" ? "color-mix(in oklch, var(--brand) 10%, transparent)" : "rgba(248, 113, 113, 0.08)",
								color: message.type === "success" ? "var(--brand)" : "#fca5a5",
								fontSize: 14
							},
							children: message.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "account-settings-password-actions",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: saving,
								style: {
									border: 0,
									borderRadius: 10,
									padding: "12px 18px",
									background: "var(--brand)",
									color: "var(--brand-foreground)",
									fontWeight: 800,
									cursor: saving ? "default" : "pointer",
									opacity: saving ? .65 : 1
								},
								children: saving ? "Updating..." : "Update password"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: {
					...panelStyle,
					marginTop: 20,
					border: "1px solid rgba(248, 113, 113, 0.35)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: sectionHeaderStyle,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: sectionTitleStyle,
						children: "Delete account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: sectionDescriptionStyle,
						children: "Permanently delete your SeasonCaddy account and account data."
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "account-settings-danger-body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							color: "var(--muted-foreground)",
							fontSize: 14,
							lineHeight: 1.6,
							maxWidth: 570
						},
						children: "Deleting your account is permanent and cannot be undone."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: openDeleteDialog,
						className: "account-settings-delete-button",
						style: {
							display: "inline-flex",
							alignItems: "center",
							gap: 8,
							border: "1px solid rgba(248, 113, 113, 0.5)",
							borderRadius: 10,
							padding: "11px 16px",
							background: "rgba(248, 113, 113, 0.08)",
							color: "#fca5a5",
							fontWeight: 800,
							cursor: "pointer"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 17 }), "Delete account"]
					})]
				})]
			})
		]
	}), deleteOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "presentation",
		className: "account-settings-modal-backdrop",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) closeDeleteDialog();
		},
		style: {
			background: "rgba(0, 0, 0, 0.68)",
			backdropFilter: "blur(5px)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "delete-account-title",
			className: "account-settings-delete-modal",
			style: {
				overflow: "hidden",
				border: "1px solid rgba(248, 113, 113, 0.4)",
				borderRadius: 16,
				background: "var(--surface-1)",
				boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "account-settings-modal-header",
				style: { borderBottom: "1px solid var(--border)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "account-settings-modal-title-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							placeItems: "center",
							width: 42,
							height: 42,
							flexShrink: 0,
							borderRadius: 11,
							background: "rgba(248, 113, 113, 0.12)",
							color: "#fca5a5"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 21 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { minWidth: 0 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "delete-account-title",
							style: {
								margin: 0,
								fontSize: 21,
								fontWeight: 800
							},
							children: "Delete your account?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								margin: "7px 0 0",
								color: "var(--muted-foreground)",
								fontSize: 14,
								lineHeight: 1.55
							},
							children: "This will permanently delete your SeasonCaddy account. This action cannot be undone."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: closeDeleteDialog,
					disabled: deleting,
					"aria-label": "Close",
					style: {
						display: "grid",
						placeItems: "center",
						width: 34,
						height: 34,
						flexShrink: 0,
						padding: 0,
						border: 0,
						borderRadius: 8,
						background: "transparent",
						color: "var(--muted-foreground)",
						cursor: deleting ? "default" : "pointer"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 19 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "account-settings-modal-body",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							margin: "0 0 14px",
							color: "var(--muted-foreground)",
							fontSize: 14,
							lineHeight: 1.55
						},
						children: [
							"To confirm, type",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: "var(--text)" },
								children: "DELETE"
							}),
							" ",
							"below."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: deleteConfirmation,
						onChange: (event) => {
							setDeleteConfirmation(event.target.value);
							setDeleteError(null);
						},
						disabled: deleting,
						autoFocus: true,
						autoComplete: "off",
						placeholder: "Type DELETE",
						style: {
							width: "100%",
							boxSizing: "border-box",
							border: "1px solid var(--border)",
							borderRadius: 10,
							background: "var(--surface-2)",
							color: "var(--text)",
							padding: "13px 14px",
							outline: "none",
							font: "inherit"
						}
					}),
					deleteError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							marginTop: 14,
							padding: "11px 13px",
							border: "1px solid rgba(248, 113, 113, 0.4)",
							borderRadius: 9,
							background: "rgba(248, 113, 113, 0.08)",
							color: "#fca5a5",
							fontSize: 14,
							lineHeight: 1.5
						},
						children: deleteError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "account-settings-modal-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "account-settings-modal-button",
							onClick: closeDeleteDialog,
							disabled: deleting,
							style: {
								border: "1px solid var(--border)",
								borderRadius: 10,
								padding: "11px 16px",
								background: "transparent",
								color: "var(--text)",
								fontWeight: 700,
								cursor: deleting ? "default" : "pointer"
							},
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "account-settings-modal-button",
							onClick: deleteAccount,
							disabled: deleteConfirmation !== "DELETE" || deleting,
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: 8,
								border: "1px solid rgba(248, 113, 113, 0.55)",
								borderRadius: 10,
								padding: "11px 16px",
								background: "#dc2626",
								color: "#ffffff",
								fontWeight: 800,
								cursor: deleteConfirmation === "DELETE" && !deleting ? "pointer" : "not-allowed",
								opacity: deleteConfirmation === "DELETE" && !deleting ? 1 : .45
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 17 }), deleting ? "Deleting..." : "Permanently delete account"]
						})]
					})
				]
			})]
		})
	})] });
}
function PasswordField({ label, value, onChange, visible, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: labelStyle,
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			position: "relative",
			display: "flex",
			alignItems: "center"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
				size: 18,
				style: {
					position: "absolute",
					left: 14,
					color: "var(--muted-foreground)",
					pointerEvents: "none"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: visible ? "text" : "password",
				value,
				onChange: (event) => onChange(event.target.value),
				autoComplete: "new-password",
				style: {
					width: "100%",
					boxSizing: "border-box",
					border: "1px solid var(--border)",
					borderRadius: 10,
					background: "var(--surface-1)",
					color: "var(--text)",
					padding: "13px 46px 13px 44px",
					outline: "none",
					font: "inherit"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onToggle,
				"aria-label": visible ? "Hide password" : "Show password",
				style: {
					position: "absolute",
					right: 10,
					display: "grid",
					placeItems: "center",
					width: 34,
					height: 34,
					padding: 0,
					border: 0,
					background: "transparent",
					color: "var(--muted-foreground)",
					cursor: "pointer"
				},
				children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
			})
		]
	})] });
}
var panelStyle = {
	overflow: "hidden",
	border: "1px solid var(--border)",
	borderRadius: 14,
	background: "color-mix(in oklch, var(--surface-2) 60%, transparent)"
};
var sectionHeaderStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: 20,
	padding: "20px 22px",
	borderBottom: "1px solid var(--border)"
};
var sectionBodyStyle = { padding: 22 };
var sectionTitleStyle = {
	margin: 0,
	fontSize: 20,
	fontWeight: 800
};
var sectionDescriptionStyle = {
	margin: "6px 0 0",
	color: "var(--muted-foreground)",
	fontSize: 14
};
var labelStyle = {
	display: "block",
	marginBottom: 8,
	color: "var(--muted-foreground)",
	fontSize: 12,
	fontWeight: 800,
	letterSpacing: "0.04em"
};
var readOnlyFieldStyle = {
	display: "flex",
	alignItems: "center",
	gap: 12,
	minHeight: 46,
	boxSizing: "border-box",
	padding: "0 14px",
	border: "1px solid var(--border)",
	borderRadius: 10,
	background: "var(--surface-1)",
	color: "var(--text)"
};
//#endregion
export { SettingsPage as component };
