globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { t as FastResponse } from "./_libs/srvx.mjs";
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
	"/favicon-192x192.png": {
		"type": "image/png",
		"etag": "\"67e1-BygSRRXr1XhirEBNHGOCaYF28/M\"",
		"mtime": "2026-11-24T15:02:18.925Z",
		"size": 26593,
		"path": "../public/favicon-192x192.png"
	},
	"/favicon-48x48.png": {
		"type": "image/png",
		"etag": "\"d69-kvy3wXb89ss2B1XLZ2pJtswt65Y\"",
		"mtime": "2026-11-24T15:02:18.926Z",
		"size": 3433,
		"path": "../public/favicon-48x48.png"
	},
	"/favicon-96x96.png": {
		"type": "image/png",
		"etag": "\"24db-zRu1waEsG6gQJkvR5j5rC+XVCss\"",
		"mtime": "2026-11-24T15:02:18.925Z",
		"size": 9435,
		"path": "../public/favicon-96x96.png"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2532-P1u486agW3ymimJYHS3VvIiBLK8\"",
		"mtime": "2026-11-24T15:02:18.926Z",
		"size": 9522,
		"path": "../public/favicon.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"de-KbaSSWewjU+lzhUA0MXLgLIOyPs\"",
		"mtime": "2026-11-24T15:02:18.926Z",
		"size": 222,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"235-Dpm//fPy1vq6o87mWk/CewX1pdY\"",
		"mtime": "2026-11-24T15:02:18.926Z",
		"size": 565,
		"path": "../public/sitemap.xml"
	},
	"/assets/GameTiming-BFD6_pZU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1070-+YmNLtQUf2Wm4xSvNv651qqwWnY\"",
		"mtime": "2026-11-24T15:02:17.476Z",
		"size": 4208,
		"path": "../public/assets/GameTiming-BFD6_pZU.js"
	},
	"/assets/NextFixtureHero-C0ClicqE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b64-WGd9+OIQjYpKl+JxY2Zj4hnoIyM\"",
		"mtime": "2026-11-24T15:02:17.476Z",
		"size": 7012,
		"path": "../public/assets/NextFixtureHero-C0ClicqE.js"
	},
	"/assets/PublicInfoPage-BCWGH2bx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5f-I8vs2QsWTJB+PYiSEUrugXWuVOQ\"",
		"mtime": "2026-11-24T15:02:17.476Z",
		"size": 2655,
		"path": "../public/assets/PublicInfoPage-BCWGH2bx.js"
	},
	"/assets/Shell-D0mJ_vRf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1255-UB5AeOutimBJAmLO3Kr0WLRpkFc\"",
		"mtime": "2026-11-24T15:02:17.476Z",
		"size": 4693,
		"path": "../public/assets/Shell-D0mJ_vRf.js"
	},
	"/assets/affiliate-disclosure-CM0WticR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b0e-AxnRl4BSKm7FRFd2seg6M0d1S70\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 2830,
		"path": "../public/assets/affiliate-disclosure-CM0WticR.js"
	},
	"/assets/auth-D19XDVjN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f23-bJEr4S2eWFZupvquAY8eyD8K3+Q\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 7971,
		"path": "../public/assets/auth-D19XDVjN.js"
	},
	"/assets/calendar-days-Dqd8uYuD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-yjSZnIBx/hXk4GyBUjIb2YEWCJk\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 494,
		"path": "../public/assets/calendar-days-Dqd8uYuD.js"
	},
	"/assets/chevron-down-D9SA0KRf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-Q4+eBrlbP6cFTrUiC5WYREivTbA\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 128,
		"path": "../public/assets/chevron-down-D9SA0KRf.js"
	},
	"/assets/chevron-left-1mEo3G_0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-NqyOqRfNlRxl946X+TkkbsjAGVc\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 130,
		"path": "../public/assets/chevron-left-1mEo3G_0.js"
	},
	"/icons.svg": {
		"type": "image/svg+xml",
		"etag": "\"13a7-+Yl6wl4T3p6mAdLxrF2TU9++/No\"",
		"mtime": "2026-11-24T15:02:18.926Z",
		"size": 5031,
		"path": "../public/icons.svg"
	},
	"/assets/chevron-right-DQaxpk3f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-UVwgt3kVbXLBl7EL3nHnF7UiEgY\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 130,
		"path": "../public/assets/chevron-right-DQaxpk3f.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"1866-OV8Nd7CHCWJCECTAzd3g2oMBK+g\"",
		"mtime": "2026-11-24T15:02:18.925Z",
		"size": 6246,
		"path": "../public/favicon.ico"
	},
	"/assets/createLucideIcon-BtOEJTfx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a7-K+ywg20Qgs7JOh6c/TKTfrO7uBI\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 1191,
		"path": "../public/assets/createLucideIcon-BtOEJTfx.js"
	},
	"/assets/external-link-BhIaVL5H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-gWE2hQPYA8EeXX8le5tXUgJwA5s\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 251,
		"path": "../public/assets/external-link-BhIaVL5H.js"
	},
	"/assets/eye-C-JNvYR8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"279-GKdzILUkh+uKHfKxbgWu/CRSGko\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 633,
		"path": "../public/assets/eye-C-JNvYR8.js"
	},
	"/assets/frontend-data-CqN4aUsV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7e2d-F0i9VctD1Sv/uaZR4iwT+SvFNIw\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 32301,
		"path": "../public/assets/frontend-data-CqN4aUsV.js"
	},
	"/assets/contact-BvDDp_h5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e6-is8h3DYG1mg2oyZI7fnDjTHqN0Q\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 2278,
		"path": "../public/assets/contact-BvDDp_h5.js"
	},
	"/assets/about-FS7Jy4hS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a2-nAoYs6MBICFY2jGS6Ld4vzBkdvM\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 2210,
		"path": "../public/assets/about-FS7Jy4hS.js"
	},
	"/assets/clock-3-BJ_itg7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-AUqdXCdp6z1E8N8GAplLlVnKDEs\"",
		"mtime": "2026-11-24T15:02:17.477Z",
		"size": 169,
		"path": "../public/assets/clock-3-BJ_itg7H.js"
	},
	"/assets/game._gameId-8EhkG9kx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2546-/lmKp5RNnqEVu0t0PZkhNTodN04\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 9542,
		"path": "../public/assets/game._gameId-8EhkG9kx.js"
	},
	"/assets/game._gameId-BRCmHt0b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23b-SKfntY4SR+9an32VR5L5T8P0eLs\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 571,
		"path": "../public/assets/game._gameId-BRCmHt0b.js"
	},
	"/assets/game._gameId-BYpvpACK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1962-gAU/X3ECycw3hZLtAD7lunpqEN4\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 6498,
		"path": "../public/assets/game._gameId-BYpvpACK.js"
	},
	"/assets/game._gameId-lCTMQMmc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c7-Q6wxzgpA8f0BCFqK9J0O5lDDsBo\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 455,
		"path": "../public/assets/game._gameId-lCTMQMmc.js"
	},
	"/assets/gamehub-cloud-CxeeMY5C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"188a-klipn6wlubWTN/j9e+idMyiYWKA\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 6282,
		"path": "../public/assets/gamehub-cloud-CxeeMY5C.js"
	},
	"/assets/google-calendar-api-7jRO-51S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fb-97MfhdIkeJida3coIO8EzOBmokE\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 763,
		"path": "../public/assets/google-calendar-api-7jRO-51S.js"
	},
	"/assets/how-it-works-C641oVJF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f0-9x/h3sfyR57/2wB8sIAO8NQ4YsA\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 2288,
		"path": "../public/assets/how-it-works-C641oVJF.js"
	},
	"/assets/index-DnhkGE0N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c49c-j3nefIW9GsiRwzfcelVKiXMG7P8\"",
		"mtime": "2026-11-24T15:02:17.476Z",
		"size": 312476,
		"path": "../public/assets/index-DnhkGE0N.js"
	},
	"/assets/loader-circle-BvQPvh_y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-NEbh2JfNV/aYWMCgeYgDStH8jEI\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 144,
		"path": "../public/assets/loader-circle-BvQPvh_y.js"
	},
	"/assets/link-gsvJM_m9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f886-WIotCjWuueVJpvUtazvmzVxoMCE\"",
		"mtime": "2026-11-24T15:02:17.478Z",
		"size": 63622,
		"path": "../public/assets/link-gsvJM_m9.js"
	},
	"/assets/mail-od4XGpdX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-hqckcwZsQYjetcJQxcgHUKd/EBk\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 213,
		"path": "../public/assets/mail-od4XGpdX.js"
	},
	"/assets/my-caddy-CFB9aPmj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1f-S4+xjHwnxyr6dcN1lDBylDHbNtM\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 2591,
		"path": "../public/assets/my-caddy-CFB9aPmj.js"
	},
	"/assets/my-caddy.calendar-Bk51SQsP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4067-tftKBeAreZyrsIhVrEl5XOpxBRQ\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 16487,
		"path": "../public/assets/my-caddy.calendar-Bk51SQsP.js"
	},
	"/assets/my-caddy.index-C2NOpvoX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"598c-Q9mPkqes+zUGa8mgiX2RLlXsiJ4\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 22924,
		"path": "../public/assets/my-caddy.index-C2NOpvoX.js"
	},
	"/assets/my-caddy.settings-BL8x7Z6b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a69-3MfSEg3Wr6hmL1WyCznXyB6S5XA\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 10857,
		"path": "../public/assets/my-caddy.settings-BL8x7Z6b.js"
	},
	"/assets/my-caddy.streaming-Dyl7-Y76.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3960-vnbD6khlixFCMkPVTna8pMx8EsU\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 14688,
		"path": "../public/assets/my-caddy.streaming-Dyl7-Y76.js"
	},
	"/assets/my-caddy.teams-C1TI43PL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bf2-uxQZTBJX65uWBgScZxA7davYoeI\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 15346,
		"path": "../public/assets/my-caddy.teams-C1TI43PL.js"
	},
	"/assets/privacy-C67TXDnL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1177-+S2LnRyNH9emDEmY+6k7Lf1gubc\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 4471,
		"path": "../public/assets/privacy-C67TXDnL.js"
	},
	"/assets/routes-CIiSWHFQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8374-olzx1olSxXBljHSJzbvS1t6HROA\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 33652,
		"path": "../public/assets/routes-CIiSWHFQ.js"
	},
	"/assets/sparkles-CUKk9CX1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-huUC0g/f9WpIkCESGsptrF6UEAs\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 494,
		"path": "../public/assets/sparkles-CUKk9CX1.js"
	},
	"/assets/styles-kQnTHQoj.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"10508-TDr+hoEDG8IROOkFD7uG+iclfRk\"",
		"mtime": "2026-11-24T15:02:17.480Z",
		"size": 66824,
		"path": "../public/assets/styles-kQnTHQoj.css"
	},
	"/assets/tv-Dpwkq3tO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-OPHIXGoNqBSUFJcGrtp5uWV6Vt8\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 185,
		"path": "../public/assets/tv-Dpwkq3tO.js"
	},
	"/assets/terms-7VSYzmzq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a2-3icLqbGW9uCb1l7bi+lPDi28k+U\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 4258,
		"path": "../public/assets/terms-7VSYzmzq.js"
	},
	"/assets/useMatch-DDbh89II.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8fe-hQl3WWDJMZ/65GCCJn0dSIIgdlU\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 2302,
		"path": "../public/assets/useMatch-DDbh89II.js"
	},
	"/assets/useAuth-D7ZZKpZi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35e19-Mks6ufRjgenMPWnZMjrJX0sN0qo\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 220697,
		"path": "../public/assets/useAuth-D7ZZKpZi.js"
	},
	"/assets/useNavigate-CJvdl8sk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bb-c8oVbudSkfuEoQaF5kkcHP2FJUU\"",
		"mtime": "2026-11-24T15:02:17.479Z",
		"size": 187,
		"path": "../public/assets/useNavigate-CJvdl8sk.js"
	},
	"/assets/users-fR9Yx9er.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-IXgnL/6oDUf+KPWqRzpwj+vXG0I\"",
		"mtime": "2026-11-24T15:02:17.480Z",
		"size": 306,
		"path": "../public/assets/users-fR9Yx9er.js"
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
var _lazy_QEHUvG = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_QEHUvG
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
