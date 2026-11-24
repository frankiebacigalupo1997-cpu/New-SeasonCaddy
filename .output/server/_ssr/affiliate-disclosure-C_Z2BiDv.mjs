import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { D as ExternalLink, S as Info, w as Handshake } from "../_libs/lucide-react.mjs";
import { r as PublicPage, t as InfoCard } from "./PublicInfoPage-CDt776Ch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/affiliate-disclosure-C_Z2BiDv.js
var import_jsx_runtime = require_jsx_runtime();
function AffiliateDisclosurePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicPage, {
		eyebrow: "TRANSPARENCY",
		title: "Affiliate Disclosure",
		intro: "SeasonCaddy may participate in affiliate and referral programs with relevant service providers.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-5 w-5" }),
				title: "How affiliate links work",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Some links displayed through SeasonCaddy may be affiliate links. If you click a qualifying affiliate link and subsequently complete a qualifying action, SeasonCaddy may receive compensation from the provider or affiliate network." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Using an affiliate link does not generally result in an additional cost to you. Affiliate relationships help support the operation, maintenance, and development of SeasonCaddy." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5" }),
				title: "Our approach",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy's goal is to help users discover where sporting events are available to watch. We aim to provide useful viewing information regardless of whether a particular provider offers an affiliate relationship with SeasonCaddy." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Provider availability, pricing, subscriptions, geographic restrictions, schedules, and broadcast rights are controlled by the relevant provider and may change." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-5 w-5" }),
				title: "Third-party providers",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy is an independent platform. Unless explicitly stated otherwise, the appearance of a provider, broadcaster, league, team, or other organization on SeasonCaddy does not mean that the organization sponsors, operates, or endorses SeasonCaddy." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Third-party names, trademarks, and logos remain the property of their respective owners." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-6 text-sm leading-7 text-muted-foreground",
				children: [
					"Questions about our affiliate relationships? ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "font-semibold text-brand hover:underline",
						to: "/contact",
						children: "Contact SeasonCaddy"
					}),
					"."
				]
			})
		]
	});
}
//#endregion
export { AffiliateDisclosurePage as component };
