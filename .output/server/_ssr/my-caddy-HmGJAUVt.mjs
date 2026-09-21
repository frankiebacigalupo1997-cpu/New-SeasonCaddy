import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as Outlet, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Settings, i as Tv, k as CalendarDays, n as Users, v as House } from "../_libs/lucide-react.mjs";
import { t as Shell } from "./Shell-C3AN-g_y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-caddy-HmGJAUVt.js
var import_jsx_runtime = require_jsx_runtime();
function MyCaddyLayout() {
	const path = useLocation().pathname;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto px-4 pb-12 pt-8 md:px-6 md:pt-10",
		style: { maxWidth: "1600px" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "my-caddy-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "my-caddy-sidebar min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "my-caddy-nav sportstream-scrollbar",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
							to: "/my-caddy",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { size: 19 }),
							label: "Overview",
							active: path === "/my-caddy" || path === "/my-caddy/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
							to: "/my-caddy/calendar",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 19 }),
							label: "My Calendar",
							active: path.startsWith("/my-caddy/calendar")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
							to: "/my-caddy/streaming",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { size: 19 }),
							label: "Streaming & Coverage",
							active: path.startsWith("/my-caddy/streaming")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
							to: "/my-caddy/teams",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 19 }),
							label: "My Teams",
							active: path.startsWith("/my-caddy/teams")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
							to: "/my-caddy/settings",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 19 }),
							label: "Account Settings",
							active: path.startsWith("/my-caddy/settings")
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})
	}) });
}
function SidebarLink({ to, icon, label, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "my-caddy-nav-link rounded-[11px] text-sm transition-colors",
		style: {
			border: active ? "1px solid color-mix(in oklch, var(--brand) 35%, transparent)" : "1px solid transparent",
			background: active ? "color-mix(in oklch, var(--brand) 14%, transparent)" : "transparent",
			color: active ? "var(--brand)" : "var(--foreground)",
			fontWeight: active ? 750 : 650,
			textDecoration: "none"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
//#endregion
export { MyCaddyLayout as component };
