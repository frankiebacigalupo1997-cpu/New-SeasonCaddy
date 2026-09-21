import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase, r as useAuth } from "./useAuth-CNmA0ie9.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as EyeOff, f as Mail, h as LockKeyhole, y as Eye } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-B_NTEh62.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SEASONCADDY_LOGO_URL = "https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding/SeasonCaddy%20Logo%20Blue.png";
function AuthPage() {
	const navigate = useNavigate();
	const { user, loading } = useAuth();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && user) navigate({ to: "/my-caddy" });
	}, [
		loading,
		user,
		navigate
	]);
	function changeMode(nextMode) {
		setMode(nextMode);
		setPassword("");
		setConfirmPassword("");
		setShowPassword(false);
	}
	async function submit(event) {
		event.preventDefault();
		const cleanEmail = email.trim().toLowerCase();
		if (!cleanEmail) {
			toast.error("Enter your email address.");
			return;
		}
		if (password.length < 6) {
			toast.error("Your password must be at least 6 characters.");
			return;
		}
		if (mode === "signup" && password !== confirmPassword) {
			toast.error("Your passwords do not match.");
			return;
		}
		setBusy(true);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email: cleanEmail,
					password
				});
				if (error) throw error;
				toast.success("Welcome back");
				navigate({ to: "/my-caddy" });
				return;
			}
			const { data, error } = await supabase.auth.signUp({
				email: cleanEmail,
				password
			});
			if (error) throw error;
			if (data.session) {
				toast.success("Your SeasonCaddy account is ready");
				navigate({ to: "/my-caddy" });
				return;
			}
			toast.success("Account created. Check your email to finish signing in.");
			changeMode("signin");
		} catch (error) {
			console.error("Authentication failed", error);
			toast.error(getAuthErrorMessage(error, mode));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-background bg-arena",
		style: {
			minHeight: "100vh",
			display: "grid",
			placeItems: "center",
			padding: "24px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				width: "100%",
				maxWidth: "430px"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						marginBottom: "24px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: "12px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: SEASONCADDY_LOGO_URL,
							alt: "SeasonCaddy logo",
							style: {
								width: "50px",
								height: "50px",
								objectFit: "contain",
								display: "block"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display font-extrabold tracking-tight",
							style: {
								fontSize: "24px",
								lineHeight: 1,
								whiteSpace: "nowrap"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: "Season"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand",
								children: "Caddy"
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					style: {
						borderRadius: "14px",
						border: "1px solid var(--border)",
						background: "color-mix(in oklch, var(--surface-2) 70%, transparent)",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							padding: "6px",
							borderBottom: "1px solid var(--border)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
							active: mode === "signin",
							onClick: () => changeMode("signin"),
							children: "Sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
							active: mode === "signup",
							onClick: () => changeMode("signup"),
							children: "Create account"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { padding: "26px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { marginBottom: "22px" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display",
									style: {
										margin: 0,
										fontSize: "24px",
										fontWeight: 900,
										letterSpacing: "-0.025em"
									},
									children: mode === "signin" ? "Welcome back" : "Create your account"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									style: {
										margin: "7px 0 0",
										fontSize: "12px",
										lineHeight: 1.5
									},
									children: mode === "signin" ? "Sign in to access your Caddy." : "Create an account to save your teams and access My Caddy."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: submit,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										style: { display: "block" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: labelStyle,
											children: "Email address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: { position: "relative" },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
												size: 16,
												className: "text-muted-foreground",
												style: {
													position: "absolute",
													left: "12px",
													top: "50%",
													transform: "translateY(-50%)",
													pointerEvents: "none"
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "email",
												required: true,
												autoComplete: "email",
												value: email,
												onChange: (event) => setEmail(event.target.value),
												placeholder: "you@example.com",
												style: {
													...inputStyle,
													paddingLeft: "38px"
												}
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										style: {
											display: "block",
											marginTop: "16px"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: labelStyle,
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: { position: "relative" },
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
													size: 16,
													className: "text-muted-foreground",
													style: {
														position: "absolute",
														left: "12px",
														top: "50%",
														transform: "translateY(-50%)",
														pointerEvents: "none"
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: showPassword ? "text" : "password",
													required: true,
													minLength: 6,
													autoComplete: mode === "signin" ? "current-password" : "new-password",
													value: password,
													onChange: (event) => setPassword(event.target.value),
													placeholder: "Enter your password",
													style: {
														...inputStyle,
														paddingLeft: "38px",
														paddingRight: "42px"
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": showPassword ? "Hide password" : "Show password",
													onClick: () => setShowPassword((current) => !current),
													style: {
														position: "absolute",
														right: "10px",
														top: "50%",
														transform: "translateY(-50%)",
														display: "grid",
														placeItems: "center",
														padding: "4px",
														border: "none",
														background: "transparent",
														color: "var(--muted-foreground)",
														cursor: "pointer"
													},
													children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 16 })
												})
											]
										})]
									}),
									mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										style: {
											display: "block",
											marginTop: "16px"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: labelStyle,
											children: "Confirm password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: { position: "relative" },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
												size: 16,
												className: "text-muted-foreground",
												style: {
													position: "absolute",
													left: "12px",
													top: "50%",
													transform: "translateY(-50%)",
													pointerEvents: "none"
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: showPassword ? "text" : "password",
												required: true,
												minLength: 6,
												autoComplete: "new-password",
												value: confirmPassword,
												onChange: (event) => setConfirmPassword(event.target.value),
												placeholder: "Enter your password again",
												style: {
													...inputStyle,
													paddingLeft: "38px"
												}
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: busy,
										style: {
											width: "100%",
											height: "42px",
											marginTop: "22px",
											border: "none",
											borderRadius: "9px",
											background: "var(--brand)",
											color: "var(--brand-foreground)",
											fontSize: "12px",
											fontWeight: 850,
											cursor: busy ? "wait" : "pointer",
											opacity: busy ? .65 : 1
										},
										children: busy ? mode === "signin" ? "Signing in..." : "Creating account..." : mode === "signin" ? "Sign in" : "Create account"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									marginTop: "18px",
									textAlign: "center",
									fontSize: "11px"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: mode === "signin" ? "Don't have an account?" : "Already have an account?"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => changeMode(mode === "signin" ? "signup" : "signin"),
										style: {
											padding: 0,
											border: "none",
											background: "transparent",
											color: "var(--brand)",
											fontSize: "11px",
											fontWeight: 800,
											cursor: "pointer"
										},
										children: mode === "signin" ? "Create one" : "Sign in"
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					style: {
						margin: "15px 0 0",
						textAlign: "center",
						fontSize: "10px",
						lineHeight: 1.5
					},
					children: "Your password is securely handled by our authentication provider."
				})
			]
		})
	});
}
function ModeButton({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		style: {
			height: "38px",
			border: active ? "1px solid color-mix(in oklch, var(--brand) 45%, var(--border))" : "1px solid transparent",
			borderRadius: "8px",
			background: active ? "color-mix(in oklch, var(--brand) 13%, transparent)" : "transparent",
			color: active ? "var(--brand)" : "var(--muted-foreground)",
			fontSize: "11px",
			fontWeight: 800,
			cursor: "pointer"
		},
		children
	});
}
function getAuthErrorMessage(error, mode) {
	if (!(error instanceof Error)) return "Authentication failed. Please try again.";
	const message = error.message.toLowerCase();
	if (message.includes("invalid login credentials")) return "The email address or password is incorrect.";
	if (message.includes("user already registered")) return "An account already exists with this email address.";
	if (message.includes("password")) return error.message;
	return mode === "signin" ? "Could not sign in. Please check your details and try again." : "Could not create your account. Please try again.";
}
var labelStyle = {
	display: "block",
	marginBottom: "7px",
	fontSize: "10px",
	fontWeight: 800,
	color: "var(--muted-foreground)",
	textTransform: "uppercase",
	letterSpacing: "0.055em"
};
var inputStyle = {
	width: "100%",
	height: "42px",
	padding: "0 12px",
	borderRadius: "9px",
	border: "1px solid var(--border)",
	background: "var(--surface-2)",
	color: "var(--foreground)",
	fontSize: "12px",
	outline: "none",
	boxSizing: "border-box"
};
//#endregion
export { AuthPage as component };
