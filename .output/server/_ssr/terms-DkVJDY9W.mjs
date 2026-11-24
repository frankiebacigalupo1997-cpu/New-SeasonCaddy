import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as PublicPage } from "./PublicInfoPage-CDt776Ch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-DkVJDY9W.js
var import_jsx_runtime = require_jsx_runtime();
function TermsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicPage, {
		eyebrow: "LEGAL",
		title: "Terms of Service",
		intro: "Effective September 23, 2026.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "panel p-6 sm:p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-8 text-[15px] leading-7 text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
						title: "1. About SeasonCaddy",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy is a sports discovery platform that provides information about upcoming sporting events and, where available, viewing or streaming information." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PolicySection, {
						title: "2. Use of the service",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You may use SeasonCaddy for lawful personal and informational purposes." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You agree not to use the service for unlawful purposes, attempt unauthorized access, interfere with operation or security, introduce malicious code, circumvent security controls, or systematically extract information in violation of applicable law or these Terms." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PolicySection, {
						title: "3. Sports and viewing information",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy provides sports schedule and viewing information for informational and discovery purposes." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Schedules, times, broadcasting rights, availability, and providers can change. SeasonCaddy does not guarantee that an event will be available through a particular provider at a particular time. Confirm important details with the relevant provider before purchasing a subscription or relying on viewing information." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PolicySection, {
						title: "4. Third-party providers",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy may display information about or link to third-party services, broadcasters, streaming platforms, websites, and other providers. These third parties operate independently from SeasonCaddy." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy does not control third-party pricing, subscription terms, availability, content, broadcast rights, geographic restrictions, service interruptions, or privacy practices." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
						title: "5. Affiliate relationships",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy may participate in affiliate and referral programs. This means SeasonCaddy may receive compensation when users follow certain links or complete qualifying actions with participating providers." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
						title: "6. Intellectual property",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The SeasonCaddy website, software, design, branding, original written content, and other original materials are owned by or licensed to SeasonCaddy unless otherwise stated. Third-party names, trademarks, logos, and other intellectual property remain the property of their respective owners." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
						title: "7. Availability",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We may modify, suspend, or discontinue portions of SeasonCaddy at any time. We do not guarantee that the service will always be available, uninterrupted, or error-free." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
						title: "8. Disclaimer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SeasonCaddy is provided on an “as is” and “as available” basis to the extent permitted by applicable law. We make no guarantee regarding the completeness, accuracy, timeliness, availability, or suitability of sports or viewing information for any particular purpose." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
						title: "9. Limitation of liability",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "To the maximum extent permitted by applicable law, SeasonCaddy will not be liable for losses arising from reliance on third-party sports schedules, broadcasting information, provider availability, pricing, subscriptions, or services." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
						title: "10. Changes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We may update these Terms from time to time. The updated version will be identified by its effective date." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
						title: "11. Contact",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Questions regarding these Terms can be submitted through the SeasonCaddy Contact page." })
					})
				]
			})
		})
	});
}
function PolicySection({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-3 text-xl font-bold text-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children
	})] });
}
//#endregion
export { TermsPage as component };
