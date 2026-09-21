import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAuth } from "./useAuth-CNmA0ie9.mjs";
import { g as Link, l as useLocation, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as LogOut, r as UserRound } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Shell-C3AN-g_y.js
var import_jsx_runtime = require_jsx_runtime();
function Shell({ children }) {
	const { user, signOut } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const isHome = location.pathname === "/";
	const isMyCaddy = location.pathname.startsWith("/my-caddy");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background bg-arena",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/40 bg-background/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "seasoncaddy-header-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "seasoncaddy-header-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex shrink-0 items-center justify-center overflow-hidden rounded-lg",
									style: {
										width: "44px",
										height: "44px"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding/SeasonCaddy%20Logo%20Blue.png",
										alt: "SeasonCaddy logo",
										style: {
											width: "44px",
											height: "44px",
											objectFit: "contain",
											display: "block"
										}
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "seasoncaddy-wordmark font-display font-extrabold tracking-tight",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "seasoncaddy-header-nav",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: `seasoncaddy-header-nav-link rounded-full font-semibold transition-all ${isHome ? "bg-brand text-brand-foreground shadow-sm" : "text-foreground/75 hover:bg-surface-2/60 hover:text-foreground"}`,
								children: "Home"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/my-caddy",
								className: `seasoncaddy-header-nav-link rounded-full font-semibold whitespace-nowrap transition-all ${isMyCaddy ? "bg-brand text-brand-foreground shadow-sm" : "text-foreground/75 hover:bg-surface-2/60 hover:text-foreground"}`,
								children: "My Caddy"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "seasoncaddy-header-actions",
							children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/my-caddy/settings",
									"aria-label": "Account settings",
									title: user.email ?? "Account settings",
									className: "grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border bg-surface-2 font-bold text-foreground transition-colors hover:border-brand hover:text-brand",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-[18px] w-[18px]" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Sign out",
									onClick: async () => {
										await signOut();
										navigate({ to: "/auth" });
									},
									className: "grid h-10 w-10 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2/60 hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-[18px] w-[18px]" })
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "seasoncaddy-sign-in rounded-lg bg-brand px-4 py-2 text-sm font-bold text-brand-foreground transition-opacity hover:opacity-90",
								children: "Sign in"
							})
						})
					]
				})
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "seasoncaddy-footer mx-auto max-w-[1600px] text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: "SeasonCaddy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Every game. All season." })]
			})
		]
	});
}
//#endregion
export { Shell as t };
