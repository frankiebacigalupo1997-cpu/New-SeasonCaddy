import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Mail, j as CircleAlert, m as MessageSquare } from "../_libs/lucide-react.mjs";
import { r as PublicPage, t as InfoCard } from "./PublicInfoPage-CDt776Ch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-9zh0BtZC.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicPage, {
		eyebrow: "CONTACT",
		title: "We'd like to hear from you.",
		intro: "Have a question, found incorrect information, or want to discuss SeasonCaddy? Get in touch.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5" }),
					title: "Support",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Questions about using SeasonCaddy, account features, sports listings, or viewing information." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5" }),
					title: "Data corrections",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If you find an incorrect fixture, competition, provider, or viewing listing, please tell us what is wrong and include the event details." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" }),
					title: "Business inquiries",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We welcome inquiries about provider relationships, media opportunities, partnerships, and other business matters." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "mailto:frankie@seasoncaddy.com",
						className: "font-semibold text-brand hover:underline",
						children: "frankie@seasoncaddy.com"
					}) })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Email SeasonCaddy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted-foreground",
					children: "For support, corrections, feedback, or business inquiries, email us directly."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "mailto:frankie@seasoncaddy.com",
					className: "mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-brand-foreground transition-opacity hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), "frankie@seasoncaddy.com"]
				})
			]
		})]
	});
}
//#endregion
export { ContactPage as component };
