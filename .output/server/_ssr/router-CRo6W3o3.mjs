import { n as PostHogProvider, t as PostHogErrorBoundary } from "../_libs/@posthog/react+[...].mjs";
import { t as AuthProvider } from "./useAuth-DlnhgW14.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$15 } from "./game._gameId-BuiUV0zv.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as frontendIdentityCatalogQueryOptions, r as globalUpcomingDatasetQueryOptions, t as frontendCatalogQueryOptions } from "./useSeasonCaddyData-eoAkFgOh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CRo6W3o3.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-kQnTHQoj.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var posthogToken = "phc_paNkdt9v9Csm8sNfjRu2YN3iFfwnY3NVMjtPQ934RZ9h";
var posthogHost = "https://us.i.posthog.com";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex cursor-pointer items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-border bg-surface-2 px-4 py-2 text-sm font-bold text-foreground transition-colors hover:border-brand",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SeasonCaddy — Find Where to Watch Sports" },
			{
				name: "description",
				content: "Find upcoming sports events and see where they're available to watch in the United States."
			},
			{
				property: "og:title",
				content: "SeasonCaddy — Find Where to Watch Sports"
			},
			{
				property: "og:description",
				content: "Find upcoming sports events and see where they're available to watch in the United States."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#07111f"
			},
			{
				name: "impact-site-verification",
				value: "fb8e9c3f-e0a9-44de-bed3-1dd34ba3c735"
			},
			{
				name: "mitgo-verification",
				content: "7dadce9d-4081-4981-a35b-c003c162fedc"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon-48x48.png",
				type: "image/png",
				sizes: "48x48"
			},
			{
				rel: "icon",
				href: "/favicon-96x96.png",
				type: "image/png",
				sizes: "96x96"
			},
			{
				rel: "shortcut icon",
				href: "/favicon.ico"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon-192x192.png",
				sizes: "192x192"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostHogProvider, {
		apiKey: posthogToken,
		options: {
			api_host: posthogHost,
			capture_exceptions: true,
			debug: false
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostHogErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
			client: queryClient,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})]
		}) })
	});
}
var $$splitComponentImporter$13 = () => import("./routes-CjkTgwCW.mjs");
var Route$13 = createFileRoute("/")({
	validateSearch: (search) => ({ region: typeof search.region === "string" ? search.region : void 0 }),
	loader: ({ context }) => {
		context.queryClient.prefetchQuery(globalUpcomingDatasetQueryOptions);
	},
	head: () => ({ meta: [
		{ title: "SeasonCaddy" },
		{
			name: "description",
			content: "Pick your sport, competition and teams, then see every televised game in your region and the exact streaming services you need to watch them."
		},
		{
			property: "og:title",
			content: "SeasonCaddy"
		},
		{
			property: "og:description",
			content: "Your team schedule, regional broadcast coverage and watch links in one dashboard."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./about-DXwpzTNb.mjs");
var Route$12 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About SeasonCaddy" }, {
		name: "description",
		content: "Learn what SeasonCaddy is, how it works, and how we organize sports viewing information for US fans."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./affiliate-disclosure-C_Z2BiDv.mjs");
var Route$11 = createFileRoute("/affiliate-disclosure")({
	head: () => ({ meta: [{ title: "Affiliate Disclosure | SeasonCaddy" }, {
		name: "description",
		content: "SeasonCaddy's affiliate and referral disclosure."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./auth-_6aiOSx3.mjs");
var Route$10 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in — SeasonCaddy" },
		{
			name: "description",
			content: "Sign in or create your SeasonCaddy account."
		},
		{
			property: "og:title",
			content: "Sign in — SeasonCaddy"
		},
		{
			property: "og:description",
			content: "Sign in to SeasonCaddy and keep your Caddy with you."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./contact-9zh0BtZC.mjs");
var Route$9 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact SeasonCaddy" }, {
		name: "description",
		content: "Contact SeasonCaddy with questions, feedback, data corrections, or business inquiries."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./how-it-works-CpK5baE-.mjs");
var Route$8 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [{ title: "How SeasonCaddy Works" }, {
		name: "description",
		content: "See how SeasonCaddy organizes upcoming US sporting events and viewing information."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./my-caddy-B2DrRBUy.mjs");
var Route$7 = createFileRoute("/my-caddy")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./privacy-CPhrzNAR.mjs");
var Route$6 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy | SeasonCaddy" }, {
		name: "description",
		content: "SeasonCaddy privacy policy."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./terms-DkVJDY9W.mjs");
var Route$5 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms of Service | SeasonCaddy" }, {
		name: "description",
		content: "SeasonCaddy terms of service."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./my-caddy.index-CgszLegO.mjs");
var Route$4 = createFileRoute("/my-caddy/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./my-caddy.calendar-BJKD__CH.mjs");
var Route$3 = createFileRoute("/my-caddy/calendar")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./my-caddy.settings-DhtG80KW.mjs");
var Route$2 = createFileRoute("/my-caddy/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./my-caddy.streaming-B6co4X1K.mjs");
var Route$1 = createFileRoute("/my-caddy/streaming")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./my-caddy.teams-BAdr75Sc.mjs");
var Route = createFileRoute("/my-caddy/teams")({
	loader: ({ context }) => {
		context.queryClient.prefetchQuery(frontendCatalogQueryOptions);
		context.queryClient.prefetchQuery(frontendIdentityCatalogQueryOptions);
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var AboutRoute = Route$12.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$14
});
var AffiliateDisclosureRoute = Route$11.update({
	id: "/affiliate-disclosure",
	path: "/affiliate-disclosure",
	getParentRoute: () => Route$14
});
var AuthRoute = Route$10.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$14
});
var ContactRoute = Route$9.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$14
});
var HowItWorksRoute = Route$8.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$14
});
var MyCaddyRoute = Route$7.update({
	id: "/my-caddy",
	path: "/my-caddy",
	getParentRoute: () => Route$14
});
var PrivacyRoute = Route$6.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$14
});
var TermsRoute = Route$5.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$14
});
var GameGameIdRoute = Route$15.update({
	id: "/game/$gameId",
	path: "/game/$gameId",
	getParentRoute: () => Route$14
});
var MyCaddyIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => MyCaddyRoute
});
var MyCaddyRouteChildren = {
	MyCaddyCalendarRoute: Route$3.update({
		id: "/calendar",
		path: "/calendar",
		getParentRoute: () => MyCaddyRoute
	}),
	MyCaddySettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => MyCaddyRoute
	}),
	MyCaddyStreamingRoute: Route$1.update({
		id: "/streaming",
		path: "/streaming",
		getParentRoute: () => MyCaddyRoute
	}),
	MyCaddyTeamsRoute: Route.update({
		id: "/teams",
		path: "/teams",
		getParentRoute: () => MyCaddyRoute
	}),
	MyCaddyIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AffiliateDisclosureRoute,
	AuthRoute,
	ContactRoute,
	HowItWorksRoute,
	MyCaddyRoute: MyCaddyRoute._addFileChildren(MyCaddyRouteChildren),
	PrivacyRoute,
	TermsRoute,
	GameGameIdRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
