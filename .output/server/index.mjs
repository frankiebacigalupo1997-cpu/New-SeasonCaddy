globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon-96x96.png": {
		"type": "image/png",
		"etag": "\"24db-zRu1waEsG6gQJkvR5j5rC+XVCss\"",
		"mtime": "2026-09-21T14:53:09.986Z",
		"size": 9435,
		"path": "../public/favicon-96x96.png"
	},
	"/favicon-48x48.png": {
		"type": "image/png",
		"etag": "\"d69-kvy3wXb89ss2B1XLZ2pJtswt65Y\"",
		"mtime": "2026-09-21T14:53:09.986Z",
		"size": 3433,
		"path": "../public/favicon-48x48.png"
	},
	"/favicon-192x192.png": {
		"type": "image/png",
		"etag": "\"67e1-BygSRRXr1XhirEBNHGOCaYF28/M\"",
		"mtime": "2026-09-21T14:53:09.986Z",
		"size": 26593,
		"path": "../public/favicon-192x192.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1866-OV8Nd7CHCWJCECTAzd3g2oMBK+g\"",
		"mtime": "2026-09-21T14:53:09.986Z",
		"size": 6246,
		"path": "../public/favicon.ico"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2532-P1u486agW3ymimJYHS3VvIiBLK8\"",
		"mtime": "2026-09-21T14:53:09.986Z",
		"size": 9522,
		"path": "../public/favicon.svg"
	},
	"/icons.svg": {
		"type": "image/svg+xml",
		"etag": "\"13a7-+Yl6wl4T3p6mAdLxrF2TU9++/No\"",
		"mtime": "2026-09-21T14:53:09.987Z",
		"size": 5031,
		"path": "../public/icons.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"de-KbaSSWewjU+lzhUA0MXLgLIOyPs\"",
		"mtime": "2026-09-21T14:53:09.987Z",
		"size": 222,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"a7-rYqK9KjspsX3FAxc0XQrwc0Mdn0\"",
		"mtime": "2026-09-21T14:53:09.987Z",
		"size": 167,
		"path": "../public/sitemap.xml"
	},
	"/assets/GameTiming-Dhgenp20.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2787-bwDy4clQPlbduHIdpStdQnJWQV8\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 10119,
		"path": "../public/assets/GameTiming-Dhgenp20.js"
	},
	"/assets/NextFixtureHero-C6D_3MmP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172f-oKhryZecUprAwxIbYshHPZ0Ii8Y\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 5935,
		"path": "../public/assets/NextFixtureHero-C6D_3MmP.js"
	},
	"/assets/SeasonCaddySelect-C_NzIdCq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d4-yLoORHod4jV0i41FRmte0GuFGVE\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 2004,
		"path": "../public/assets/SeasonCaddySelect-C_NzIdCq.js"
	},
	"/assets/Shell-BdPsF36g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d89-mxT8giO5b1GWE4/dimYpE2jENsI\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 3465,
		"path": "../public/assets/Shell-BdPsF36g.js"
	},
	"/assets/auth-BS_btFox.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e60-ZfUr40w1lYfEvakU1eUlzjp6vwc\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 7776,
		"path": "../public/assets/auth-BS_btFox.js"
	},
	"/assets/calendar-days-DHHRWEIf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-ExaJTnni1Ht15ISWpDXMmfk09ds\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 494,
		"path": "../public/assets/calendar-days-DHHRWEIf.js"
	},
	"/assets/chevron-down-DIPML3EK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-IzEIb7UUoJx3Jb9F9IfFEF/90L8\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 128,
		"path": "../public/assets/chevron-down-DIPML3EK.js"
	},
	"/assets/chevron-left-1iPyETUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-/mnbpLKTQZdWdZjrCkRRUwoEfMQ\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 130,
		"path": "../public/assets/chevron-left-1iPyETUi.js"
	},
	"/assets/chevron-right-DgRFoTpy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-3gHXqpbF+XbGET0fVE9fJu7mKt0\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 130,
		"path": "../public/assets/chevron-right-DgRFoTpy.js"
	},
	"/assets/clock-3-DtbuVWVu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-rC6fpMGP5J/Z9XUAYnQHTwR0rZY\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 169,
		"path": "../public/assets/clock-3-DtbuVWVu.js"
	},
	"/assets/createLucideIcon-Dnf1Bovx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a7-KxKyuvMM+rbs22brLr5d2RsZ7Cg\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 1191,
		"path": "../public/assets/createLucideIcon-Dnf1Bovx.js"
	},
	"/assets/game._gameId-5uUhW4c8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1b-4N9Irm7HTZoSvaFKJV6pEtaFo+s\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 7963,
		"path": "../public/assets/game._gameId-5uUhW4c8.js"
	},
	"/assets/game._gameId-Bsw_BwPr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c8-ul2rN29UIzSOhzhKo0nPlLGWFIY\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 456,
		"path": "../public/assets/game._gameId-Bsw_BwPr.js"
	},
	"/assets/game._gameId-C7o56Qx3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23c-o0nWxSR4osn+DLGD7uf7nkDh/w0\"",
		"mtime": "2026-09-21T14:53:06.332Z",
		"size": 572,
		"path": "../public/assets/game._gameId-C7o56Qx3.js"
	},
	"/assets/gamehub-cloud-Bwsn_L8U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1736-NTfx3G2mj8kfbv5TxUot4nLWep8\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 5942,
		"path": "../public/assets/gamehub-cloud-Bwsn_L8U.js"
	},
	"/assets/google-calendar-api-465GHVLp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fb-uKB6fwa9zsn/YoPfefei3tnxSVY\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 763,
		"path": "../public/assets/google-calendar-api-465GHVLp.js"
	},
	"/assets/index-B-E-ej4g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6494d-3DwbyUIiXyXU7ZOWk9VuZUt+ZKs\"",
		"mtime": "2026-09-21T14:53:06.328Z",
		"size": 411981,
		"path": "../public/assets/index-B-E-ej4g.js"
	},
	"/assets/loader-circle-CTM7Md5a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-A+OfoK+HjjQqUbmE9jN9ocI7by8\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 144,
		"path": "../public/assets/loader-circle-CTM7Md5a.js"
	},
	"/assets/mail-B96uTCag.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30f-1motb5O6fXbum6h4L+gtv1Jo/4E\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 783,
		"path": "../public/assets/mail-B96uTCag.js"
	},
	"/assets/my-caddy-eX13KU5y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a09-61BINBJn7Ej+LJ/Nqifyab7pPU4\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 2569,
		"path": "../public/assets/my-caddy-eX13KU5y.js"
	},
	"/assets/my-caddy.calendar-Dqe88Nca.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3848-ZBIkET1a4UJvTzbU/S/UxgbrkMk\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 14408,
		"path": "../public/assets/my-caddy.calendar-Dqe88Nca.js"
	},
	"/assets/my-caddy.index-CrohAiZZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5887-WPMVTuRjQrimkB2kiYZ/JM85pT0\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 22663,
		"path": "../public/assets/my-caddy.index-CrohAiZZ.js"
	},
	"/assets/my-caddy.settings-D90p_im6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29ff-NRnstuO82eAIsgFGjf/K/OJ0WKQ\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 10751,
		"path": "../public/assets/my-caddy.settings-D90p_im6.js"
	},
	"/assets/my-caddy.streaming-DyGLIxwS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3897-jtGKrDuC+uByi2YYtX3Z9kiIqag\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 14487,
		"path": "../public/assets/my-caddy.streaming-DyGLIxwS.js"
	},
	"/assets/my-caddy.teams-DYJ4dlTH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b9a-CtlKq6ZXbmB6wpH39SvnmDZkCjI\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 15258,
		"path": "../public/assets/my-caddy.teams-DYJ4dlTH.js"
	},
	"/assets/react-dom-BYE1EggL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd6-iLFP9sMnvWTL90PNvYZV3UyXmS0\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 3542,
		"path": "../public/assets/react-dom-BYE1EggL.js"
	},
	"/assets/routes-BA2Kl8tI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"750f-24by3hCWrP7tFdF4K6wA5+deg1s\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 29967,
		"path": "../public/assets/routes-BA2Kl8tI.js"
	},
	"/assets/sparkles-DYQPtf9_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-YVwvmQMsXn7XE2YOj9q/2BJiMOk\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 494,
		"path": "../public/assets/sparkles-DYQPtf9_.js"
	},
	"/assets/styles-BE4wz_BX.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"100ef-EsKH8urJ8zVZb7jEOr0gS9gKxCo\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 65775,
		"path": "../public/assets/styles-BE4wz_BX.css"
	},
	"/assets/tv-DwK6wf44.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-BLUFmMNpO+zzipTARuHTficIAYU\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 185,
		"path": "../public/assets/tv-DwK6wf44.js"
	},
	"/assets/useAuth-DKTet7-j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35625-zrj/QZN8h0XpYsAycl3bZSw6tZ8\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 218661,
		"path": "../public/assets/useAuth-DKTet7-j.js"
	},
	"/assets/users-B7DYcjRA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-DYMcuoebLWm5MtHChwaubKeCxhU\"",
		"mtime": "2026-09-21T14:53:06.333Z",
		"size": 306,
		"path": "../public/assets/users-B7DYcjRA.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_RfVFMN = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_RfVFMN
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
