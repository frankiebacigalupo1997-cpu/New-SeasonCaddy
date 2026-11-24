import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { L as CalendarDays, h as MapPin, i as Tv, u as Search } from "../_libs/lucide-react.mjs";
import { n as PublicCta, r as PublicPage, t as InfoCard } from "./PublicInfoPage-CDt776Ch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-CpK5baE-.js
var import_jsx_runtime = require_jsx_runtime();
function HowItWorksPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicPage, {
		eyebrow: "HOW IT WORKS",
		title: "Find your sport. Find your game. Find where to watch.",
		intro: "SeasonCaddy brings upcoming sporting events and viewing information together so you can spend less time searching and more time watching.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" }),
						title: "1. Pick your sport",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Browse the sports and competitions available through SeasonCaddy and find the leagues and events you're interested in." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-5 w-5" }),
						title: "2. Find your game",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Browse upcoming events and see when they are scheduled to take place." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "h-5 w-5" }),
						title: "3. Find where to watch",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Where viewing information is available, SeasonCaddy displays the relevant provider information for the United States." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }),
						title: "4. Watch",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use the available provider information to continue to the relevant service and confirm current availability before watching or subscribing." })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-5 w-5" }),
				title: "Our data",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy combines sports schedule and viewing-availability information from relevant data sources and providers." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We aim to keep information current, but broadcasting rights, schedules, providers, and availability can change. Always confirm important details with the provider before relying on a listing." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicCta, {})
		]
	});
}
//#endregion
export { HowItWorksPage as component };
