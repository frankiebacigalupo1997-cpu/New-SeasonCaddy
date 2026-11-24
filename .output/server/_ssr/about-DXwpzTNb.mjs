import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as icons, n as PublicCta, r as PublicPage, t as InfoCard } from "./PublicInfoPage-CDt776Ch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DXwpzTNb.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicPage, {
		eyebrow: "ABOUT SEASONCADDY",
		title: "Never miss where your game is streaming.",
		intro: "SeasonCaddy is a sports discovery platform designed to make it easier to find upcoming sporting events and understand where they are available to watch in the United States.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
				icon: icons.calendar,
				title: "How SeasonCaddy works",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy organizes upcoming sporting events and connects them with available viewing information." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Depending on the sport, competition, and event, SeasonCaddy can show the sport, league or competition, teams or participants, date and start time, and available viewing provider information." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The goal is simple: start with the game you want to watch and quickly find the information you need to watch it." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
				icon: icons.database,
				title: "Where our information comes from",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy combines sports schedule and viewing-availability information from relevant data sources and providers." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We aim to present useful viewing information while keeping the underlying data as close to its original source as possible." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sports schedules and broadcasting rights can change. Users should confirm important viewing details with the relevant provider before purchasing a subscription or service." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
				icon: icons.tv,
				title: "Why we built SeasonCaddy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sports viewing has become increasingly fragmented. A single fan may need to check several services to determine where a game is available." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy was built to make that process simpler by bringing sports schedules and viewing information together in one place." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy is designed to be a useful consumer product first. Provider and affiliate relationships may support the platform, but the product exists to help fans find and follow their sports." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicCta, {})
		]
	});
}
//#endregion
export { AboutPage as component };
