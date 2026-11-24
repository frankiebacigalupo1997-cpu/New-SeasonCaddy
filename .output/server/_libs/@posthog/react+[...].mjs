import { n as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { C as performance_default } from "../@opentelemetry/core+[...].mjs";
import processModule from "node:process";
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof processModule && "function" === typeof processModule.emit) {
			processModule.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.2.8";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/posthog-js/dist/module.mjs
var t = "u" > typeof window ? window : void 0;
var i = "u" > typeof globalThis ? globalThis : t;
var e = null == i ? void 0 : i.navigator;
var s = null == i ? void 0 : i.document;
var n = null == i ? void 0 : i.location;
var r = null == i ? void 0 : i.fetch;
var o = (null == i ? void 0 : i.XMLHttpRequest) && "withCredentials" in new i.XMLHttpRequest() ? i.XMLHttpRequest : void 0;
var l = null == i ? void 0 : i.AbortController;
var a = null == i ? void 0 : i.CompressionStream;
var u = null == e ? void 0 : e.userAgent;
var h = "undefined" != typeof globalThis ? globalThis : t;
h && "undefined" == typeof self && (h.self = h), h && "undefined" == typeof File && (h.File = function() {});
var c = null != t ? t : {};
var d = "0.13.1";
var v = {
	DEBUG: !1,
	LIB_VERSION: d,
	LIB_NAME: "browser-common",
	JS_SDK_VERSION: d
};
var f = function(t) {
	return t.AnonymousId = "anonymous_id", t.DistinctId = "distinct_id", t.Props = "props", t.EnablePersonProcessing = "enable_person_processing", t.PersonMode = "person_mode", t.FeatureFlagDetails = "feature_flag_details", t.FeatureFlags = "feature_flags", t.FeatureFlagPayloads = "feature_flag_payloads", t.BootstrapFeatureFlagDetails = "bootstrap_feature_flag_details", t.BootstrapFeatureFlags = "bootstrap_feature_flags", t.BootstrapFeatureFlagPayloads = "bootstrap_feature_flag_payloads", t.OverrideFeatureFlags = "override_feature_flags", t.Queue = "queue", t.AiQueue = "ai_queue", t.AiCaptureQueue = "ai_capture_queue", t.LogsQueue = "logs_queue", t.OptedOut = "opted_out", t.SessionId = "session_id", t.SessionStartTimestamp = "session_start_timestamp", t.SessionLastTimestamp = "session_timestamp", t.PersonProperties = "person_properties", t.GroupProperties = "group_properties", t.InstalledAppBuild = "installed_app_build", t.InstalledAppVersion = "installed_app_version", t.SessionReplay = "session_replay", t.PushRegistered = "push_registered", t.SessionReplayEventTriggerActivatedSession = "session_replay_event_trigger_activated_session", t.SurveyLastSeenDate = "survey_last_seen_date", t.SurveysInProgress = "surveys_in_progress", t.SurveysSeen = "surveys_seen", t.Surveys = "surveys", t.RemoteConfig = "remote_config", t.FlagsEndpointWasHit = "flags_endpoint_was_hit", t.DeviceId = "device_id", t;
}({});
var p = function(t) {
	return t.GZipJS = "gzip-js", t.Base64 = "base64", t;
}({});
var g = [
	"$snapshot",
	"$pageview",
	"$pageleave",
	"$set",
	"survey dismissed",
	"survey sent",
	"survey shown",
	"$identify",
	"$groupidentify",
	"$create_alias",
	"$$client_ingestion_warning",
	"$web_experiment_applied",
	"$feature_enrollment_update",
	"$feature_flag_called"
];
var _ = ["token"];
function m(t, i) {
	return -1 !== t.indexOf(i);
}
var y = function(t) {
	return t.trim();
};
var b = function(t) {
	return t.replace(/^\$/, "");
};
function w(t) {
	var i;
	const e = [];
	return null !== (i = JSON.stringify(t, function(t, i) {
		if ("bigint" == typeof i) return i.toString();
		if ("function" != typeof i && "symbol" != typeof i) {
			if (i instanceof Error) return {
				name: i.name,
				message: i.message,
				stack: i.stack
			};
			if (i && "object" == typeof i) {
				for (; e.length > 0 && e[e.length - 1] !== this;) e.pop();
				if (e.includes(i)) return "[Circular]";
				e.push(i);
			}
			return i;
		}
	})) && void 0 !== i ? i : "null";
}
var S = Object.prototype;
var x = S.hasOwnProperty;
var E = S.toString;
var k = Array.isArray || function(t) {
	return "[object Array]" === E.call(t);
};
var T = (t) => "function" == typeof t;
var P = (t) => t === Object(t) && !k(t);
var O = (t) => {
	if (P(t)) {
		for (const i in t) if (x.call(t, i)) return !1;
		return !0;
	}
	return !1;
};
var C = (t) => void 0 === t;
var R = (t) => "[object String]" == E.call(t);
var A = (t) => R(t) && 0 === t.trim().length;
var I = (t) => null === t;
var M = (t) => C(t) || I(t);
var F = (t) => "[object Number]" == E.call(t) && t == t;
var D = (t) => F(t) && t > 0;
var j = (t) => "[object Boolean]" === E.call(t);
var L = (t) => m(g, t);
var N = (t) => m(_, t);
function B(t) {
	return null === t || "object" != typeof t;
}
function U(t, i) {
	return {}.toString.call(t) === `[object ${i}]`;
}
function z(t) {
	switch ({}.toString.call(t)) {
		case "[object Error]":
		case "[object Exception]":
		case "[object DOMException]":
		case "[object DOMError]":
		case "[object WebAssembly.Exception]": return !0;
		default: return q(t, Error);
	}
}
function H(t) {
	return "u" > typeof Event && q(t, Event);
}
function q(t, i) {
	try {
		return t instanceof i;
	} catch (t) {
		return !1;
	}
}
var W = [
	!0,
	"true",
	1,
	"1",
	"yes"
];
var V = (t) => m(W, t);
var G = [
	!1,
	"false",
	0,
	"0",
	"no"
];
function K(t, i, e, s, n, r, o) {
	try {
		var l = t[r](o), a = l.value;
	} catch (t) {
		e(t);
		return;
	}
	l.done ? i(a) : Promise.resolve(a).then(s, n);
}
function J(t) {
	return function() {
		var i = this, e = arguments;
		return new Promise(function(s, n) {
			var r = t.apply(i, e);
			function o(t) {
				K(r, s, n, o, l, "next", t);
			}
			function l(t) {
				K(r, s, n, o, l, "throw", t);
			}
			o(void 0);
		});
	};
}
var Y = [
	"amazonbot",
	"amazonproductbot",
	"app.hypefactors.com",
	"applebot",
	"archive.org_bot",
	"awariobot",
	"backlinksextendedbot",
	"baiduspider",
	"bingbot",
	"bingpreview",
	"chrome-lighthouse",
	"dataforseobot",
	"deepscan",
	"duckduckbot",
	"facebookexternal",
	"facebookcatalog",
	"http://yandex.com/bots",
	"hubspot",
	"ia_archiver",
	"leikibot",
	"linkedinbot",
	"meta-externalagent",
	"mj12bot",
	"msnbot",
	"nessus",
	"petalbot",
	"pinterestbot",
	"prerender",
	"rogerbot",
	"screaming frog",
	"sebot-wa",
	"sitebulb",
	"slackbot",
	"slurp",
	"trendictionbot",
	"turnitin",
	"twitterbot",
	"vercel-screenshot",
	"vercelbot",
	"yahoo! slurp",
	"yandexbot",
	"zoombot",
	"bot.htm",
	"bot.php",
	"(bot;",
	"bot/",
	"crawler",
	"ahrefsbot",
	"ahrefssiteaudit",
	"semrushbot",
	"siteauditbot",
	"splitsignalbot",
	"gptbot",
	"oai-searchbot",
	"chatgpt-user",
	"perplexitybot",
	"better uptime bot",
	"sentryuptimebot",
	"uptimerobot",
	"headlesschrome",
	"lightpanda",
	"cypress",
	"google-hoteladsverifier",
	"adsbot-google",
	"apis-google",
	"duplexweb-google",
	"feedfetcher-google",
	"google favicon",
	"google web preview",
	"google-read-aloud",
	"googlebot",
	"googleother",
	"google-cloudvertexbot",
	"googleweblight",
	"mediapartners-google",
	"storebot-google",
	"google-inspectiontool",
	"bytespider"
];
var Z = /* @__PURE__ */ new Map();
var X = function(t, i = []) {
	if (!t) return !1;
	const e = function(t, i) {
		let e = "";
		for (let t = 0; i.length > t; t++) {
			const s = i[t];
			e += s.length + ":" + s;
		}
		return t.length + ":" + t + "|" + i.length + ":" + e;
	}(t, i), s = Z.get(e);
	if (void 0 !== s) return s;
	const n = t.toLowerCase(), r = Y.concat(i).some((t) => -1 !== n.indexOf(t.toLowerCase()));
	return 256 > Z.size || Z.clear(), Z.set(e, r), r;
};
function Q(t, i, e, s, n) {
	return i > e && (s.warn("min cannot be greater than max."), i = e), F(t) ? t > e ? (s.warn(" cannot be  greater than max: " + e + ". Using max value instead."), e) : i > t ? (s.warn(" cannot be less than min: " + i + ". Using min value instead."), i) : t : (s.warn(" must be a number. using max or fallback. max: " + e + ", fallback: " + n), Q(null != n ? n : e, i, e, s));
}
var tt = class {
	constructor(t) {
		this.C = {}, this.I = t.I, this.A = Q(t.bucketSize, 0, 100, t.R), this.O = Q(t.refillRate, 0, this.A, t.R), this.$ = Q(t.refillInterval, 0, 864e5, t.R);
	}
	F(t, i) {
		const e = Math.floor((i - t.lastAccess) / this.$);
		e > 0 && (t.tokens = Math.min(t.tokens + e * this.O, this.A), t.lastAccess = t.lastAccess + e * this.$);
	}
	consumeRateLimit(t) {
		var i;
		const e = Date.now(), s = String(t);
		let n = this.C[s];
		return n ? this.F(n, e) : (n = {
			tokens: this.A,
			lastAccess: e
		}, this.C[s] = n), 0 === n.tokens || (n.tokens--, 0 === n.tokens && (null === (i = this.I) || void 0 === i || i.call(this, t)), 0 === n.tokens);
	}
	stop() {
		this.C = {};
	}
};
var it = "Mobile";
var et = "Android";
var st = "Tablet";
var nt = "Android Tablet";
var rt = "iPad";
var ot = "Apple Watch";
var lt = "Safari";
var at = "BlackBerry";
var ut = "Samsung Internet";
var ht = "Chrome";
var ct = "Chrome iOS";
var dt = "Internet Explorer";
var vt = "Internet Explorer Mobile";
var ft = "Opera";
var pt = "Microsoft Edge";
var gt = "Firefox";
var _t = "Firefox iOS";
var mt = "Nintendo";
var yt = "PlayStation";
var bt = "Xbox";
var wt = "Android Mobile";
var $t = "Mobile Safari";
var St = "Windows";
var xt = "Windows Phone";
var Et = "Nokia";
var kt = "Ouya";
var Tt = "Generic tablet";
var Pt = "Konqueror";
var Ot = "Oculus Browser";
var Ct = "Vivaldi";
var Rt = "Yandex";
var At = "Whale";
var It = "DuckDuckGo";
var Mt = "Pale Moon";
var Ft = "Waterfox";
var Dt = "Brave";
var jt = "Claude";
var Lt = "Codex";
var Nt = "ChatGPT";
var Bt = "Google Search App";
var Ut = /* @__PURE__ */ new RegExp("Version/(\\d+(\\.\\d+)?)");
var zt = /* @__PURE__ */ new RegExp("(Claude|Codex|ChatGPT)\\/(\\d+(\\.\\d+)?)");
var Ht = new RegExp(bt, "i");
var qt = /* @__PURE__ */ new RegExp("PlayStation \\w+", "i");
var Wt = /* @__PURE__ */ new RegExp("Nintendo \\w+", "i");
var Vt = /* @__PURE__ */ new RegExp("BlackBerry|PlayBook|BB10", "i");
var Gt = {
	"NT3.51": "NT 3.11",
	"NT4.0": "NT 4.0",
	"5.0": "2000",
	5.1: "XP",
	5.2: "XP",
	"6.0": "Vista",
	6.1: "7",
	6.2: "8",
	6.3: "8.1",
	6.4: "10",
	"10.0": "10"
};
var Kt = function(t, i, e, s) {
	i = i || "";
	return function(t) {
		return (null == t ? void 0 : t.brave) ? Dt : null;
	}(e) || ((null == s ? void 0 : s.detectGoogleSearchApp) && m(t, "GSA/") ? Bt : m(t, " OPR/") && m(t, "Mini") ? "Opera Mini" : m(t, " OPR/") ? ft : Vt.test(t) ? at : m(t, "IEMobile") || m(t, "WPDesktop") ? vt : m(t, "OculusBrowser") ? Ot : m(t, "SamsungBrowser") ? ut : m(t, "Edge") || m(t, "Edg/") ? pt : m(t, "Vivaldi/") ? Ct : m(t, "YaBrowser/") ? Rt : m(t, "Whale/") ? At : m(t, "DuckDuckGo/") || m(t, "Ddg/") ? It : m(t, "Claude/") ? jt : m(t, "Codex/") ? Lt : m(t, "ChatGPT/") ? Nt : m(t, "FBIOS") ? "Facebook Mobile" : m(t, "UCWEB") || m(t, "UCBrowser") ? "UC Browser" : m(t, "CriOS") ? ct : m(t, "CrMo") || m(t, ht) ? ht : m(t, et) && m(t, lt) ? wt : m(t, "FxiOS") ? _t : m(t.toLowerCase(), Pt.toLowerCase()) ? Pt : m(t, "Brave/") ? Dt : ((t, i) => i && m(i, "Apple") || function(t) {
		return m(t, lt) && !m(t, ht) && !m(t, et);
	}(t))(t, i) ? m(t, it) ? $t : lt : m(t, "PaleMoon/") ? Mt : m(t, "Waterfox/") ? Ft : m(t, gt) ? gt : m(t, "MSIE") || m(t, "Trident/") ? dt : m(t, "Gecko") ? gt : "");
};
var Jt = {
	[vt]: [/* @__PURE__ */ new RegExp("rv:(\\d+(\\.\\d+)?)")],
	[pt]: [/* @__PURE__ */ new RegExp("Edge?\\/(\\d+(\\.\\d+)?)")],
	[ht]: [/* @__PURE__ */ new RegExp("(Chrome|CrMo)\\/(\\d+(\\.\\d+)?)")],
	[ct]: [/* @__PURE__ */ new RegExp("CriOS\\/(\\d+(\\.\\d+)?)")],
	"UC Browser": [/* @__PURE__ */ new RegExp("(UCBrowser|UCWEB)\\/(\\d+(\\.\\d+)?)")],
	[lt]: [Ut],
	[$t]: [Ut],
	[ft]: [/* @__PURE__ */ new RegExp("(Opera|OPR)\\/(\\d+(\\.\\d+)?)")],
	[gt]: [/* @__PURE__ */ new RegExp("Firefox\\/(\\d+(\\.\\d+)?)")],
	[_t]: [/* @__PURE__ */ new RegExp("FxiOS\\/(\\d+(\\.\\d+)?)")],
	[Pt]: [/* @__PURE__ */ new RegExp("Konqueror[:/]?(\\d+(\\.\\d+)?)", "i")],
	[at]: [/* @__PURE__ */ new RegExp("BlackBerry (\\d+(\\.\\d+)?)"), Ut],
	[wt]: [/* @__PURE__ */ new RegExp("android\\s(\\d+(\\.\\d+)?)", "i")],
	[ut]: [/* @__PURE__ */ new RegExp("SamsungBrowser\\/(\\d+(\\.\\d+)?)")],
	[Ot]: [/* @__PURE__ */ new RegExp("OculusBrowser\\/(\\d+(\\.\\d+)?)")],
	[Ct]: [/* @__PURE__ */ new RegExp("Vivaldi\\/(\\d+(\\.\\d+)?)")],
	[Rt]: [/* @__PURE__ */ new RegExp("YaBrowser\\/(\\d+(\\.\\d+)?)")],
	[At]: [/* @__PURE__ */ new RegExp("Whale\\/(\\d+(\\.\\d+)?)")],
	[Dt]: [/* @__PURE__ */ new RegExp("Brave\\/(\\d+(\\.\\d+)?)")],
	[jt]: [zt],
	[Lt]: [zt],
	[Nt]: [zt],
	[It]: [/* @__PURE__ */ new RegExp("(DuckDuckGo|Ddg)\\/(\\d+(\\.\\d+)?)")],
	[Mt]: [/* @__PURE__ */ new RegExp("PaleMoon\\/(\\d+(\\.\\d+)?)")],
	[Ft]: [/* @__PURE__ */ new RegExp("Waterfox\\/(\\d+(\\.\\d+)?)")],
	[Bt]: [/* @__PURE__ */ new RegExp("GSA\\/(\\d+(\\.\\d+)?)")],
	[dt]: [/* @__PURE__ */ new RegExp("(rv:|MSIE )(\\d+(\\.\\d+)?)")],
	Mozilla: [/* @__PURE__ */ new RegExp("rv:(\\d+(\\.\\d+)?)")]
};
var Yt = function(t, i, e, s) {
	const r = Jt[Kt(t, i, e, s)];
	if (C(r)) return null;
	for (let i = 0; r.length > i; i++) {
		const e = t.match(r[i]);
		if (e) return parseFloat(e[e.length - 2]);
	}
	return null;
};
var Zt = [
	[/* @__PURE__ */ new RegExp("Xbox; Xbox (.*?)[);]", "i"), (t) => [bt, t && t[1] || ""]],
	[new RegExp(mt, "i"), [mt, ""]],
	[new RegExp(yt, "i"), [yt, ""]],
	[Vt, [at, ""]],
	[new RegExp(St, "i"), (t, i) => {
		if (/Phone/.test(i) || /WPDesktop/.test(i)) return [xt, ""];
		if (new RegExp(it).test(i) && !/IEMobile\b/.test(i)) return ["Windows Mobile", ""];
		const e = /Windows NT ([0-9.]+)/i.exec(i);
		if (e && e[1]) {
			let t = Gt[e[1]] || "";
			return /arm/i.test(i) && (t = "RT"), [St, t];
		}
		return [St, ""];
	}],
	[/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, (t) => t && t[3] ? ["iOS", [
		t[3],
		t[4],
		t[5] || "0"
	].join(".")] : ["iOS", ""]],
	[/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, (t) => {
		let i = "";
		return t && t.length >= 3 && (i = C(t[2]) ? t[3] : t[2]), ["watchOS", i];
	}],
	[/* @__PURE__ */ new RegExp("(Android (\\d+)\\.(\\d+)\\.?(\\d+)?|Android)", "i"), (t) => t && t[2] ? [et, [
		t[2],
		t[3],
		t[4] || "0"
	].join(".")] : [et, ""]],
	[/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, (t) => {
		const i = ["Mac OS X", ""];
		return t && t[1] && (i[1] = [
			t[1],
			t[2],
			t[3] || "0"
		].join(".")), i;
	}],
	[/Mac/i, ["Mac OS X", ""]],
	[/CrOS/, ["Chrome OS", ""]],
	[/Linux|debian/i, ["Linux", ""]]
];
var Xt = function(t) {
	for (let i = 0; Zt.length > i; i++) {
		const [e, s] = Zt[i], n = e.exec(t), r = n && (T(s) ? s(n, t) : s);
		if (r) return r;
	}
	return ["", ""];
};
var Qt = function(t) {
	return Wt.test(t) ? mt : qt.test(t) ? yt : Ht.test(t) ? bt : new RegExp(kt, "i").test(t) ? kt : (/* @__PURE__ */ new RegExp("(Windows Phone|WPDesktop)", "i")).test(t) ? xt : /iPad/.test(t) ? rt : /iPod/.test(t) ? "iPod Touch" : /iPhone/.test(t) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(t) ? ot : Vt.test(t) ? at : /(kobo)\s(ereader|touch)/i.test(t) ? "Kobo" : new RegExp(Et, "i").test(t) ? Et : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(t) || /(kf[a-z]+)( bui|\)).+silk\//i.test(t) ? "Kindle Fire" : /(Android|ZTE)/i.test(t) ? new RegExp(it).test(t) && !/(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(t) || /pixel[\daxl ]{1,6}/i.test(t) && !/pixel c/i.test(t) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(t) || /lmy47v/i.test(t) && !/QTAQZ3/i.test(t) ? et : nt : (/* @__PURE__ */ new RegExp("(pda|Mobile)", "i")).test(t) ? "Generic mobile" : new RegExp(st, "i").test(t) && !(/* @__PURE__ */ new RegExp("Tablet pc", "i")).test(t) ? Tt : "";
};
var ti = function(t, i) {
	var e;
	const s = Qt(t);
	return s === rt || s === nt || "Kobo" === s || "Kindle Fire" === s || s === Tt ? st : s === mt || s === bt || s === yt || s === kt ? "Console" : s === ot ? "Wearable" : s ? it : "Android" === (null == i ? void 0 : i.userAgentDataPlatform) && (null !== (e = null == i ? void 0 : i.maxTouchPoints) && void 0 !== e ? e : 0) > 0 ? 600 > Math.min(null !== (n = null == i ? void 0 : i.screenWidth) && void 0 !== n ? n : 0, null !== (r = null == i ? void 0 : i.screenHeight) && void 0 !== r ? r : 0) / (null !== (o = null == i ? void 0 : i.devicePixelRatio) && void 0 !== o ? o : 1) ? it : st : "Desktop";
	var n, r, o;
};
var ii = /\bFBAV\/(\d+(?:\.\d+)*)/i;
var ei = [
	[/\bInstagram(?:[ /](\d+(?:\.\d+)*))?\b/i, "Instagram"],
	[/\bBarcelona[ /](\d+(?:\.\d+)*)?/i, "Threads"],
	[
		/\b(?:MessengerForiOS|(?:FBAN|FB_IAB)\/Orca-Android)\b/i,
		"Messenger",
		ii
	],
	[
		/\bFBAN\/EMA\b/i,
		"Facebook Lite",
		ii
	],
	[
		/\b(?:FBIOS|(?:FBAN|FB_IAB)\/(?:FB4A|FBIOS))\b/i,
		"Facebook",
		ii
	],
	[/\bLinkedInApp(?:\]?\/(\d+(?:\.\d+)*))?\b/i, "LinkedIn"],
	[/\bTwitter(?:Android| for (?:iPhone|iPad|Android))(?:\/(\d+(?:\.\d+)*))?\b/i, "Twitter"],
	[
		/\b(?:musical_ly|trill)(?:[_/](\d+\.\d+(?:\.\d+)*))?(?=\b|_)/i,
		"TikTok",
		/\bapp_version\/(\d+(?:\.\d+)*)/i
	],
	[/\b(?:MicroMessenger|WeChat)\/(\d+(?:\.\d+)*)?/i, "WeChat"],
	[/\bLine\/(\d+(?:\.\d+)*)?/i, "Line"],
	[/\bGSA\/(\d+(?:\.\d+)*)?/i, "Google"],
	[/\[Pinterest\/(?:iOS|Android)\b|\bPinterest(?: for (?:Android(?: Tablet)?|iOS))?\/(\d+(?:\.\d+)*)/i, "Pinterest"],
	[/\b(?:WA4A|WAiOS)\/(\d+(?:\.\d+)*)?/i, "WhatsApp"],
	[/\bSnapchat[ /](\d+(?:\.\d+)*)?/i, "Snapchat"],
	[/\bBing(?:Web|Sapphire)\/(\d+(?:\.\d+)*)?/i, "Bing"],
	[
		/\bNAVER\(inapp; search;/i,
		"Naver",
		/\bNAVER\(inapp; search;[^;)]*; (\d+(?:\.\d+)*)/i
	],
	[/\bKAKAOTALK[ /](\d+\.\d+(?:\.\d+)*)?/i, "KakaoTalk"]
];
var si = "[Truncated]";
var ni = "[Unserializable]";
function ri(t) {
	let i = "";
	for (let e = 0; t.length > e; e++) {
		const s = t.charCodeAt(e);
		if (55296 > s || s > 56319) i += 56320 > s || s > 57343 ? t[e] : "�";
		else {
			const s = t.charCodeAt(e + 1);
			56320 > s || s > 57343 ? i += "�" : (i += t[e] + t[e + 1], e++);
		}
	}
	return i;
}
function oi(t, i) {
	if (!i) return t;
	let e = [];
	try {
		e = Object.keys(i);
	} catch (t) {
		e = [];
	}
	for (const s of e) {
		let e;
		try {
			e = i[s];
		} catch (t) {
			e = ni;
		}
		Object.defineProperty(t, s, {
			value: e,
			enumerable: !0,
			writable: !0,
			configurable: !0
		});
	}
	return t;
}
var li = 3e5;
var ai = class {
	record(t) {
		if ("too-large" === t.kind) return;
		if ("retry-later" !== t.kind) return void this.reset();
		if (!t.retryAfterMs) return;
		const i = this.isOpen(), e = Date.now(), s = Math.min(t.retryAfterMs, li);
		if (!i) return this.ts = e, void (this.es = e + s);
		this.es = Math.max(this.es, Math.min(e + s, this.ts + li));
	}
	remainingMs() {
		const t = Date.now();
		if (this.ts - 5e3 > t) return this.reset(), 0;
		const i = Math.min(li, Math.max(0, this.es - t));
		return 0 === i && this.reset(), i;
	}
	isOpen() {
		return this.remainingMs() > 0;
	}
	reset() {
		this.es = 0, this.ts = 0;
	}
	constructor() {
		this.es = 0, this.ts = 0;
	}
};
var ui = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function hi(t, i) {
	return "string" == typeof (e = t) && ui.test(e) ? t : i();
	var e;
}
function ci(t, i) {
	const e = new Error(i);
	try {
		Object.defineProperty(e, "name", {
			value: t,
			writable: !0,
			enumerable: !0,
			configurable: !0
		});
	} catch (t) {}
	return e;
}
function di(t) {
	return t ? t.split("#")[0] : t;
}
function vi(t) {
	try {
		return t();
	} catch (t) {
		return;
	}
}
function fi(t, i) {
	const e = setTimeout(t, i);
	return null != e && e.unref && e?.unref(), e;
}
function pi(t, i, e) {
	return gi.apply(this, arguments);
}
function gi() {
	return (gi = J(function* (t, i, e) {
		let s;
		try {
			return yield Promise.race([t, new Promise((t, n) => {
				s = fi(() => {
					try {
						e?.(), t();
					} catch (t) {
						n(t);
					}
				}, i);
			})]);
		} finally {
			clearTimeout(s);
		}
	})).apply(this, arguments);
}
function _i(t) {
	return _i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t;
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
	}, _i(t);
}
function mi(t, i, e) {
	return (i = function(t) {
		var i = function(t) {
			if ("object" != _i(t) || !t) return t;
			var i = t[Symbol.toPrimitive];
			if (void 0 !== i) {
				var e = i.call(t, "string");
				if ("object" != _i(e)) return e;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(t);
		}(t);
		return "symbol" == _i(i) ? i : i + "";
	}(i)) in t ? Object.defineProperty(t, i, {
		value: e,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[i] = e, t;
}
function yi(t, i) {
	var e = Object.keys(t);
	if (Object.getOwnPropertySymbols) {
		var s = Object.getOwnPropertySymbols(t);
		i && (s = s.filter(function(i) {
			return Object.getOwnPropertyDescriptor(t, i).enumerable;
		})), e.push.apply(e, s);
	}
	return e;
}
function bi(t) {
	for (var i = 1; arguments.length > i; i++) {
		var e = null != arguments[i] ? arguments[i] : {};
		i % 2 ? yi(Object(e), !0).forEach(function(i) {
			mi(t, i, e[i]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : yi(Object(e)).forEach(function(i) {
			Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(e, i));
		});
	}
	return t;
}
var wi;
var $i;
var Si;
var xi;
function Ei(t) {
	var i;
	const e = globalThis._posthogChunkIds, s = globalThis._debugIds;
	if (!e && !s) return;
	const n = e ? Object.keys(e) : [], r = s ? Object.keys(s) : [];
	if (xi && ki(e, n, $i) && ki(s, r, Si)) return xi;
	$i = e ? bi({}, e) : void 0, Si = s ? bi({}, s) : void 0, xi = {}, null !== (i = wi) && void 0 !== i || (wi = {});
	const o = (i, e) => {
		for (const n of i) {
			const i = e[n];
			if (!i) continue;
			const r = null == wi ? void 0 : wi[n];
			if (r) {
				xi[r] = i;
				continue;
			}
			const o = t(n);
			for (let t = o.length - 1; t >= 0; t--) {
				var s;
				const e = null === (s = o[t]) || void 0 === s ? void 0 : s.filename;
				if (e) {
					xi[e] = i, wi[n] = e;
					break;
				}
			}
		}
	};
	return s && o(r, s), e && o(n, e), xi;
}
function ki(t, i, e) {
	return t && e ? i.length === Object.keys(e).length && i.every((i) => t[i] === e[i]) : t === e;
}
var Ti = class {
	constructor(t, i, e = []) {
		this.coercers = t, this.stackParser = i, this.modifiers = e;
	}
	buildFromUnknown(t, i = {}) {
		const e = i && i.mechanism || {
			handled: !0,
			type: "generic"
		}, s = this.buildCoercingContext(e, i, 0).apply(t), n = this.buildParsingContext(i), r = this.parseStacktrace(s, n);
		return {
			$exception_list: this.convertToExceptionList(r, e),
			$exception_level: "error"
		};
	}
	modifyFrames(t) {
		var i = this;
		return J(function* () {
			for (const e of t) e.stacktrace && e.stacktrace.frames && k(e.stacktrace.frames) && (e.stacktrace.frames = yield i.applyModifiers(e.stacktrace.frames));
			return t;
		})();
	}
	coerceFallback(t) {
		var i;
		return {
			type: "Error",
			value: "Unknown error",
			stack: null === (i = t.syntheticException) || void 0 === i ? void 0 : i.stack,
			synthetic: !0
		};
	}
	parseStacktrace(t, i) {
		var e;
		let s, n;
		if (null != t.cause && (s = this.parseStacktrace(t.cause, i)), "" != t.stack && null != t.stack) try {
			n = this.applyChunkIds(this.stackParser(t.stack, t.synthetic ? i.skipFirstLines : 0), i.chunkIdMap);
		} catch (t) {}
		return bi(bi({}, t), {}, {
			cause: s,
			stack: n,
			errors: null === (e = t.errors) || void 0 === e ? void 0 : e.map((t) => this.parseStacktrace(t, i))
		});
	}
	applyChunkIds(t, i) {
		return t.map((t) => (t.filename && i && (t.chunk_id = i[t.filename]), t));
	}
	applyCoercers(t, i) {
		for (const e of this.coercers) if (e.match(t)) return e.coerce(t, i);
		return this.coerceFallback(i);
	}
	applyModifiers(t) {
		var i = this;
		return J(function* () {
			let e = t;
			for (const t of i.modifiers) e = yield t(e);
			return e;
		})();
	}
	convertToExceptionList(t, i) {
		const e = [], s = (t, n, r) => {
			var o;
			const l = e.length, a = void 0 === n ? bi(bi({ type: "string" == typeof i.type && i.type.length > 0 ? i.type : "generic" }, "boolean" == typeof i.handled ? { handled: i.handled } : void 0 === i.handled ? { handled: !0 } : {}), {}, {
				synthetic: "boolean" == typeof i.synthetic ? i.synthetic : t.synthetic,
				exception_id: l
			}) : {
				type: "chained",
				source: r,
				synthetic: t.synthetic,
				exception_id: l,
				parent_id: n
			}, u = {
				type: t.type,
				value: t.value,
				mechanism: a
			};
			t.stack && (u.stacktrace = {
				type: "raw",
				frames: t.stack
			}), e.push(u), t.cause && s(t.cause, l, "cause");
			for (const i of null !== (o = t.errors) && void 0 !== o ? o : []) s(i, l, "member");
		};
		return s(t), e;
	}
	buildParsingContext(t) {
		var i;
		return {
			chunkIdMap: Ei(this.stackParser),
			skipFirstLines: null !== (i = t.skipFirstLines) && void 0 !== i ? i : 1
		};
	}
	getAggregateErrors(t) {
		try {
			if (z(t)) {
				let e = Object.getPrototypeOf(t);
				for (let s = 0; e && 100 > s; s++) {
					var i;
					const s = null === (i = Object.getOwnPropertyDescriptor(e, "constructor")) || void 0 === i ? void 0 : i.value;
					if ("function" == typeof s && "AggregateError" === s.name) {
						const i = t.errors;
						return k(i) ? i : void 0;
					}
					e = Object.getPrototypeOf(e);
				}
			}
		} catch (t) {}
	}
	buildCoercingContext(t, i, e = 0) {
		let s = 0, n = 0, r = !1;
		const o = /* @__PURE__ */ new Set(), l = [], a = {}, u = (t, i, e = 0) => {
			const u = h(i, e), c = u.apply;
			if (u.apply = (i) => {
				l.push(t);
				try {
					return c(i);
				} finally {
					l.pop();
				}
			}, e > 4 || e > 0 && -1 !== l.indexOf(t)) return this.coerceFallback(u);
			const d = "object" == typeof t && null !== t || "function" == typeof t;
			if (0 === e && s >= 50 || d && o.has(t)) return;
			d && o.add(t), 0 === e && s++;
			const v = this.getAggregateErrors(t);
			let f, p;
			r || (r = !!v);
			try {
				if (f = this.applyCoercers(t, u), !f) throw a;
			} catch (t) {
				if (t === a) return void (0 === e && s--);
				if (!r) throw t;
				f = this.coerceFallback(u);
			}
			if (!v || s >= 50) return f;
			try {
				p = v.length;
			} catch (t) {
				return f;
			}
			if (!Number.isInteger(p) || 0 > p || p > 4294967295) return f;
			const g = [];
			for (let t = 0; 50 > s && 1e3 > n && p > t; t++) {
				let e;
				n++;
				try {
					e = u.next(v[t]);
				} catch (t) {
					s++, e = this.coerceFallback(h(i + 1));
				}
				e && g.push(e);
			}
			return bi(bi({}, f), {}, { errors: g });
		}, h = (e, s = 0) => bi(bi({}, i), {}, {
			syntheticException: 0 == e ? i.syntheticException : void 0,
			mechanism: 0 == e ? t : {},
			apply(t) {
				const i = u(t, e, s + 1);
				if (!i) throw a;
				return i;
			},
			next: (t) => u(t, e + 1)
		}), c = h(e);
		return bi(bi({}, c), {}, { apply: (t) => {
			var i;
			return null !== (i = u(t, e)) && void 0 !== i ? i : this.coerceFallback(c);
		} });
	}
};
var Pi = /^([a-z][a-z0-9.+-]+):/i;
var Oi = [
	"http",
	"https",
	"file",
	"blob",
	"app",
	"capacitor",
	"ionic",
	"webpack",
	"webpack-internal",
	"ng"
];
function Ci(t) {
	if (!t || "<anonymous>" === t) return !1;
	const i = Pi.exec(t);
	return !i || Oi.includes(i[1].toLowerCase());
}
function Ri(t, i, e, s, n) {
	const r = {
		platform: t,
		filename: i,
		function: "<anonymous>" === e ? "?" : e,
		in_app: Ci(i)
	};
	return C(s) || (r.lineno = s), C(n) || (r.colno = n), r;
}
var Ai = (t, i) => {
	const e = -1 !== t.indexOf("safari-extension"), s = -1 !== t.indexOf("safari-web-extension");
	return e || s ? [-1 !== t.indexOf("@") ? t.split("@")[0] : "?", e ? `safari-extension:${i}` : `safari-web-extension:${i}`] : [t, i];
};
var Ii = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
var Mi = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var Fi = /\((\S*)(?::(\d+))(?::(\d+))\)/;
var Di = (t, i) => {
	const e = Ii.exec(t);
	if (e) {
		const [, t, s, n] = e;
		return Ri(i, t, "?", +s, +n);
	}
	const s = Mi.exec(t);
	if (s) {
		if (s[2] && 0 === s[2].indexOf("eval")) {
			const t = Fi.exec(s[2]);
			t && (s[2] = t[1], s[3] = t[2], s[4] = t[3]);
		}
		const [t, e] = Ai(s[1] || "?", s[2]);
		return Ri(i, e, t, s[3] ? +s[3] : void 0, s[4] ? +s[4] : void 0);
	}
};
var ji = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
var Li = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var Ni = (t, i) => {
	const e = ji.exec(t);
	if (e) {
		if (e[3] && e[3].indexOf(" > eval") > -1) {
			const t = Li.exec(e[3]);
			t && (e[1] = e[1] || "eval", e[3] = t[1], e[4] = t[2], e[5] = "");
		}
		let t = e[3], s = e[1] || "?";
		return [s, t] = Ai(s, t), Ri(i, t, s, e[4] ? +e[4] : void 0, e[5] ? +e[5] : void 0);
	}
};
var Bi = /\(error: (.*)\)/;
function Ui(t, i) {
	return t.filename === i.filename && t.function === i.function && t.module === i.module && t.lineno === i.lineno && t.colno === i.colno;
}
function zi(t) {
	for (let i = 1; 10 >= i; i++) {
		const e = t.length - 2 * i;
		if (0 > e) break;
		let s = !0;
		for (let n = 0; i > n; n++) if (!Ui(t[e + n], t[e + i + n])) {
			s = !1;
			break;
		}
		if (s) {
			for (let s = 0; i > s; s++) t[e + s] = t[e + i + s];
			return t.length = e + i, {
				start: e,
				length: i
			};
		}
	}
}
function Hi(t, i) {
	const e = i.start + i.length, s = Wi(t, i);
	s && t.splice(e + s === t.length ? e : i.start, s);
}
function qi(t, i) {
	let e = i.start;
	for (; e > 0 && Ui(t[e - 1], t[e - 1 + i.length]);) e--;
	return i.start - e;
}
function Wi(t, i) {
	const e = i.start + i.length;
	let s = e;
	for (; t.length > s && Ui(t[s], t[s - i.length]);) s++;
	return s - e;
}
function Vi(t, i) {
	const e = i[0];
	let s = t.length - (e ? qi(t, e) : 0);
	for (const e of i) s -= Wi(t, e);
	return s;
}
function Gi(t, i, e) {
	for (let s = 0; t.length > s; s++) {
		const n = t[(i + s) % t.length], r = t[(e + s) % t.length];
		if (n !== r) return r > n;
	}
	return !1;
}
var Ki = class {
	match(t) {
		return this.isDOMException(t) || this.isDOMError(t);
	}
	coerce(t, i) {
		const e = R(t.stack);
		return {
			type: this.getType(t),
			value: this.getValue(t),
			stack: e ? t.stack : void 0,
			cause: t.cause ? i.next(t.cause) : void 0,
			synthetic: !1
		};
	}
	getType(t) {
		return this.isDOMError(t) ? "DOMError" : "DOMException";
	}
	getValue(t) {
		const i = t.name || (this.isDOMError(t) ? "DOMError" : "DOMException");
		return t.message ? `${i}: ${t.message}` : i;
	}
	isDOMException(t) {
		return U(t, "DOMException");
	}
	isDOMError(t) {
		return U(t, "DOMError");
	}
};
var Ji = class {
	match(t) {
		return z(t);
	}
	coerce(t, i) {
		var e;
		const s = this.getStack(t), n = void 0 === s ? null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack : void 0, r = !!n;
		return {
			type: this.getType(t),
			value: this.getMessage(t, i),
			stack: null != s ? s : n,
			cause: t.cause ? i.next(t.cause) : void 0,
			synthetic: r
		};
	}
	getType(t) {
		return t.name || t.constructor.name;
	}
	getMessage(t, i) {
		const e = t.message;
		return String(e.error && "string" == typeof e.error.message ? e.error.message : e);
	}
	getStack(t) {
		try {
			const i = t.stacktrace;
			if ("string" == typeof i && i.length > 0) return i;
			const e = t.stack;
			return "string" == typeof e && e.length > 0 ? e : void 0;
		} catch (t) {
			return;
		}
	}
};
var Yi = class {
	match(t) {
		return !!U(t, "ErrorEvent") && (null != t.error || this.Sr(t));
	}
	coerce(t, i) {
		var e;
		if (null != t.error) return i.apply(t.error);
		const s = i.apply(t.message);
		return bi(bi({}, s), {}, {
			stack: null !== (e = this._r(t)) && void 0 !== e ? e : s.stack,
			synthetic: !0
		});
	}
	Sr(t) {
		return R(t.message) && t.message.length > 0;
	}
	_r(t) {
		var i, e;
		const s = t, n = null !== (i = s.lineno) && void 0 !== i ? i : 0, r = null !== (e = s.colno) && void 0 !== e ? e : 0;
		if (R(s.filename) && 0 !== s.filename.length && 0 !== n) return `Error\n    at ${s.filename}:${n}:${r}`;
	}
};
var Zi = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
var Xi = class {
	match(t) {
		return "string" == typeof t;
	}
	coerce(t, i) {
		var e;
		const [s, n] = this.getInfos(t);
		return {
			type: null != s ? s : "Error",
			value: null != n ? n : t,
			stack: null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack,
			synthetic: !0
		};
	}
	getInfos(t) {
		let i = "Error", e = t;
		const s = t.match(Zi);
		return s && (i = s[1], e = s[2]), [i, e];
	}
};
var Qi = [
	"fatal",
	"error",
	"warning",
	"log",
	"info",
	"debug"
];
function te(t, i = 40) {
	const e = Object.keys(t);
	if (e.sort(), !e.length) return "[object has no keys]";
	let s = "";
	for (const t of e) {
		const e = s ? `${s}, ${t}` : t;
		if (e.length > i) break;
		s = e;
	}
	return s;
}
var ie = class {
	match(t) {
		return "object" == typeof t && null !== t;
	}
	coerce(t, i) {
		var e, s;
		const n = this.getErrorPropertyFromObject(t);
		return n ? i.apply(n) : {
			type: this.getType(t),
			value: this.getValue(t),
			stack: null !== (e = this.getStack(t)) && void 0 !== e ? e : null === (s = i.syntheticException) || void 0 === s ? void 0 : s.stack,
			level: this.isSeverityLevel(t.level) ? t.level : "error",
			synthetic: !0
		};
	}
	getType(t) {
		if (H(t)) return t.constructor.name;
		const i = "name" in t ? t.name : void 0;
		return R(i) && !A(i) ? i : "Error";
	}
	getValue(t) {
		if ("name" in t && "string" == typeof t.name) {
			let i = `'${t.name}' captured as exception`;
			return "message" in t && "string" == typeof t.message && (i += ` with message: '${t.message}'`), i;
		}
		if ("message" in t && "string" == typeof t.message) return t.message;
		const i = this.getObjectClassName(t);
		return `${i && "Object" !== i ? `'${i}'` : "Object"} captured as exception with keys: ${te(t)}`;
	}
	isSeverityLevel(t) {
		return R(t) && !A(t) && Qi.indexOf(t) >= 0;
	}
	getStack(t) {
		try {
			return R(t.stacktrace) && t.stacktrace.length > 0 ? t.stacktrace : R(t.stack) && t.stack.length > 0 ? t.stack : void 0;
		} catch (t) {
			return;
		}
	}
	getErrorPropertyFromObject(t) {
		for (const i in t) if ({}.hasOwnProperty.call(t, i)) {
			const e = t[i];
			if (z(e)) return e;
		}
	}
	getObjectClassName(t) {
		try {
			const i = Object.getPrototypeOf(t);
			return i ? i.constructor.name : void 0;
		} catch (t) {
			return;
		}
	}
};
var ee = class {
	match(t) {
		return H(t);
	}
	coerce(t, i) {
		var e;
		const s = t.constructor.name;
		return {
			type: s,
			value: `${s} captured as exception with keys: ${te(t)}`,
			stack: null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack,
			synthetic: !0
		};
	}
};
var se = class {
	match(t) {
		return B(t);
	}
	coerce(t, i) {
		var e;
		return {
			type: "Error",
			value: `Primitive value captured as exception: ${String(t)}`,
			stack: null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack,
			synthetic: !0
		};
	}
};
var ne = class {
	match(t) {
		return U(t, "PromiseRejectionEvent") || this.isCustomEventWrappingRejection(t);
	}
	isCustomEventWrappingRejection(t) {
		if (!H(t)) return !1;
		try {
			const i = t.detail;
			return null != i && "object" == typeof i && "reason" in i;
		} catch (t) {
			return !1;
		}
	}
	coerce(t, i) {
		var e;
		const s = this.getUnhandledRejectionReason(t);
		return B(s) ? {
			type: "UnhandledRejection",
			value: `Non-Error promise rejection captured with value: ${String(s)}`,
			stack: null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack,
			synthetic: !0
		} : i.apply(s);
	}
	getUnhandledRejectionReason(t) {
		try {
			if ("reason" in t) return t.reason;
			if ("detail" in t && null != t.detail && "object" == typeof t.detail && "reason" in t.detail) return t.detail.reason;
		} catch (t) {}
		return t;
	}
};
var re = "$message";
var oe = "$timestamp";
var le = /* @__PURE__ */ new Set([re, oe]);
var ae = {
	enabled: !0,
	max_bytes: 32768
};
function ue(t) {
	var i;
	return t ? {
		enabled: null !== (i = t.enabled) && void 0 !== i ? i : ae.enabled,
		max_bytes: ce(t.max_bytes, ae.max_bytes)
	} : bi({}, ae);
}
var he = class {
	constructor(t) {
		this.ns = [], this.ss = 0, this.Br = ue(t);
	}
	setConfig(t) {
		this.Br = ue(t), this.rs();
	}
	add(t) {
		const i = function(t) {
			let i;
			try {
				i = w(t);
			} catch (t) {
				return;
			}
			try {
				const t = JSON.parse(i);
				if (!P(t)) return;
				const e = t, s = e[re], n = e[oe];
				if (!R(s) || 0 === s.trim().length) return;
				if (!R(n) && !F(n)) return;
				return {
					step: e,
					json: i
				};
			} catch (t) {
				return;
			}
		}(t);
		if (!i) return;
		const e = function(t) {
			if ("u" > typeof TextEncoder) return new TextEncoder().encode(t).length;
			const i = encodeURIComponent(t);
			let e = 0;
			for (let t = 0; i.length > t; t++) "%" === i[t] ? (e += 1, t += 2) : e += 1;
			return e;
		}(i.json);
		e > this.Br.max_bytes || (this.ns.push({
			step: i.step,
			bytes: e
		}), this.ss += e, this.rs());
	}
	getAttachable() {
		return this.ns.map((t) => t.step);
	}
	clear() {
		this.ns = [], this.ss = 0;
	}
	size() {
		return this.ns.length;
	}
	rs() {
		for (; this.ss > this.Br.max_bytes && this.ns.length > 0;) {
			const t = this.ns.shift();
			t && (this.ss -= t.bytes);
		}
	}
};
function ce(t, i) {
	if (!F(t) || Infinity === t || -Infinity === t) return i;
	const e = Math.floor(t);
	return 0 > e ? i : e;
}
var de = (t) => {
	if ("string" != typeof t) return t;
	try {
		return JSON.parse(t);
	} catch (i) {
		return t;
	}
};
function ve(t) {
	return "string" == typeof t || t;
}
function fe(t) {
	return "string" == typeof t ? t : void 0;
}
var pe = [
	"$feature_flag",
	"$feature_flag_response",
	"$feature_flag_has_experiment",
	"$feature_flag_id",
	"$feature_flag_version",
	"$feature_flag_reason",
	"$feature_flag_request_id",
	"$feature_flag_evaluated_at",
	"$feature_flag_error",
	"locally_evaluated",
	"$groups",
	"$process_person_profile",
	"$geoip_disable",
	"$current_url",
	"$pathname",
	"$referring_domain",
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_content",
	"utm_term",
	"gad_source",
	"mc_cid",
	"gclid",
	"gclsrc",
	"dclid",
	"gbraid",
	"wbraid",
	"fbclid",
	"msclkid",
	"twclid",
	"li_fat_id",
	"igshid",
	"ttclid",
	"rdt_cid",
	"epik",
	"qclid",
	"sccid",
	"oppref",
	"bfcid",
	"irclid",
	"_kx",
	"$session_id",
	"$window_id",
	"$lib",
	"$lib_version",
	"$device_id",
	"$is_server"
];
var ge = "NativeGzipValidationError";
var _e = (t) => t.length >= 2 && 31 === t[0] && 139 === t[1];
var me = (t, i) => t === p.GZipJS || i === p.GZipJS || "gzip" === i;
var ye = (t) => !(!t || "object" != typeof t) && "NotReadableError" === ("name" in t ? String(t.name) : "");
var be;
var we = (t) => {
	throw ci(ge, `Native gzip produced invalid output: ${t}`);
};
var $e = 0;
var Se = !1;
var xe = function() {
	var t = J(function* (t, i) {
		18 > t.size && we("too-short");
		const e = new Uint8Array(yield t.slice(0, 10).arrayBuffer());
		_e(e) && 8 === e[2] || we("invalid-header");
		const s = new DataView(yield t.slice(t.size - 8).arrayBuffer()), n = i.length >>> 0;
		s.getUint32(4, !0) !== n && we("invalid-size"), (Se || 3 > $e) && (s.getUint32(0, !0) !== ((t) => {
			const i = (() => {
				if (be) return be;
				be = [];
				for (let t = 0; 256 > t; t++) {
					let i = t;
					for (let t = 0; 8 > t; t++) i = 1 & i ? 3988292384 ^ i >>> 1 : i >>> 1;
					be[t] = i >>> 0;
				}
				return be;
			})();
			let e = 4294967295;
			for (let s = 0; t.length > s; s++) e = i[255 & (e ^ t[s])] ^ e >>> 8;
			return (4294967295 ^ e) >>> 0;
		})(i) && (Se = !0, we("invalid-crc")), $e++);
	});
	return function(i, e) {
		return t.apply(this, arguments);
	};
}();
function Ee() {
	return Ee = J(function* (t, i = !0, e) {
		try {
			const i = new TextEncoder().encode(t), e = new globalThis.CompressionStream("gzip"), n = e.writable.getWriter(), r = n.write(i).then(() => n.close()).catch((s = J(function* (t) {
				try {
					yield n.abort(t);
				} catch (t) {}
				throw t;
			}), function(t) {
				return s.apply(this, arguments);
			})), o = new Response(e.readable).blob(), [l] = yield Promise.all([o, r]);
			return yield xe(l, i), l;
		} catch (t) {
			if (null == e ? void 0 : e.rethrow) throw t;
			return i && console.error("Failed to gzip compress data", t), null;
		}
		var s;
	}), Ee.apply(this, arguments);
}
function ke(t, i) {
	if (null == t) return {};
	var e, s, n = function(t, i) {
		if (null == t) return {};
		var e = {};
		for (var s in t) if ({}.hasOwnProperty.call(t, s)) {
			if (i.includes(s)) continue;
			e[s] = t[s];
		}
		return e;
	}(t, i);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(t);
		for (s = 0; r.length > s; s++) i.includes(e = r[s]) || {}.propertyIsEnumerable.call(t, e) && (n[e] = t[e]);
	}
	return n;
}
var Te = "[redacted]";
var Pe = /^[A-Za-z0-9+/\n\r]+=*$/;
var Oe = /^[A-Za-z0-9_-]+={0,2}$/;
var Ce = /[-_]/;
var Re = /^data:[^,\s]*;base64,/i;
var Ae = /^[A-Za-z0-9+/_-]+={0,2}$/;
var Ie = /\bph[a-z]_[A-Za-z0-9_-]{20,}\b/g;
var Me = /^(authorization|cookie|set-cookie|x-api-key|api[-_]?key|api[-_]?token|access[-_]?token|refresh[-_]?token|token|password|secret|client[-_]?secret|private[-_]?key)$/i;
var Fe = /[a-z][a-z0-9+.-]{0,63}:[^\s<>"]+/gi;
var De = /[\s<>"]/;
var je = (() => new RegExp(Fe.source, "i"))();
var Le = /[a-z][a-z0-9+.-]{0,63}:\/\//i;
var Ne = (() => new RegExp(`^${Le.source}`, "i"))();
var Be = (() => new RegExp(Le.source, "gi"))();
var Ue = /(^|[-_./;])(auth|token|secret|password|passwd|pwd|credential|signature|sig|key|hmac|sas|bearer|jwt|session|sessionid)([-_./;]|$)/i;
var ze = /^(code|AWSAccessKeyId|GoogleAccessId|Policy)$/i;
var He = /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g;
var qe = /[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,255}\.[A-Za-z]{2,24}/g;
var We = /\b(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\b/g;
var Ve = /(^|[^\w:])((?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{1,4}){0,5}|::(?:[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{1,4}){0,6})))(?=$|[^\w:])/g;
var Ge = /\b\d{3}[ .-]\d{2}[ .-]\d{4}\b/g;
var Ke = /\d+/g;
var Je = /(^|[^\w+])((?:\+?1[ ./-]?)?(?:\(\d{3}\)[ ./-]?|\d{3}[ ./-])\d{3}[ ./-]\d{4})(?![\w])/g;
var Ye = /(^|[^\w])(\+\d{1,3}(?:[ ./()-]{0,2}\d){7,13})(?![\w])/g;
function Ze(t) {
	return function(t) {
		return Me.test(t);
	}(t) || Ue.test(t) || ze.test(t);
}
function Xe(t) {
	return t.split("&", 129).length > 128;
}
function Qe(t, i, e) {
	return Ze(t) || i.includes(";") && function(t) {
		return t.split(";").some((t) => Ze(t.split("=", 1)[0]));
	}(i) ? Te : je.test(i) ? e ? rs(i, {
		allowNestedUrls: !1,
		stripPunctuation: !0
	}) : Te : i;
}
function ts(t, i) {
	const e = new URLSearchParams();
	let s = !1, n = !1;
	for (const [r, o] of new URLSearchParams(t)) {
		const t = os(r), l = os(o);
		s || (s = t !== r || l !== o);
		const a = Qe(t, l, i);
		s || (s = a !== l), n = Ze(t) || a !== l, e.append(t, a);
	}
	return {
		changed: s,
		lastFieldSensitive: n,
		serialized: e.toString()
	};
}
function is(t, i) {
	if (!t.includes("=")) return {
		value: es(t, i),
		lastFieldSensitive: !1
	};
	const e = ts(t, i);
	return {
		value: e.changed ? e.serialized : t,
		lastFieldSensitive: e.lastFieldSensitive
	};
}
function es(t, i) {
	return i ? rs(t, {
		allowNestedUrls: !1,
		stripPunctuation: !0
	}) : je.test(t) ? Te : t;
}
function ss(t, i, e) {
	return "#" === t ? !i.fragment && (i.fragment = !0) : "?" === t && (i.fragment ? "=" !== e && !i.fragmentQuery && (i.fragmentQuery = !0) : !i.query && (i.query = !0));
}
function ns(t, i) {
	var e;
	if (t.length > 8192 && Ne.test(t)) return Te;
	const { address: s, suffix: n } = i.stripPunctuation ? function(t) {
		let i = t.length;
		for (; i > 0 && ".,;:!?)]}'".includes(t[i - 1]);) i--;
		return {
			address: t.slice(0, i),
			suffix: t.slice(i)
		};
	}(t) : {
		address: t,
		suffix: ""
	};
	let r;
	try {
		r = new URL(s);
	} catch (t) {
		return Te + n;
	}
	const o = r.search.slice(1), l = "" !== r.hash, a = function(t) {
		const i = t.slice(1), e = i.indexOf("?");
		return 0 > e ? {
			head: i,
			tail: null
		} : {
			head: i.slice(0, e),
			tail: i.slice(e + 1)
		};
	}(r.hash);
	if (Xe(o) || Xe(a.head) || Xe(null !== (e = a.tail) && void 0 !== e ? e : "")) return Te + n;
	let u = !1;
	(r.username || r.password) && (r.username = Te, r.password = "", u = !0);
	const h = ts(o, i.allowNestedUrls);
	h.changed && (r.search = h.serialized, u = !0);
	const c = is(a.head, i.allowNestedUrls), d = null === a.tail ? null : (v = a.tail, c.lastFieldSensitive ? {
		value: "" === v ? "" : Te,
		lastFieldSensitive: !0
	} : is(v, i.allowNestedUrls));
	var v;
	const f = null === d ? c.value : `${c.value}?${d.value}`;
	f !== r.hash.slice(1) && (r.hash = f, u = !0);
	const p = l ? null != d ? d : c : h;
	return (u ? os(r.toString()) : s) + (p.lastFieldSensitive ? "" : n);
}
function rs(t, i) {
	return t.replace(Fe, (e) => function(t, i) {
		const e = function(t) {
			if (!t.includes("://")) return [];
			const i = [...t.matchAll(Be)].map((t) => t.index), e = [], s = {
				query: !1,
				fragment: !1,
				fragmentQuery: !1
			};
			let n = 0, r = !1, o = "";
			for (let l = 0; t.length > l && i.length > n; l++) {
				i[n] === l && (l > 0 && "=" !== o && e.push(l), n++);
				const a = t[l];
				ss(a, s, o) ? (o = a, r = !0) : r && "=&".includes(a) && (o = a);
			}
			return e;
		}(t);
		if (0 === e.length) return ns(t, i);
		let s = "", n = 0;
		for (const r of e) s += ns(t.slice(n, r), bi(bi({}, i), {}, { stripPunctuation: !1 })), n = r;
		return s + ns(t.slice(n), i);
	}(e, bi(bi({}, i), {}, { stripPunctuation: i.stripPunctuation && e.length !== t.length })));
}
function os(t) {
	return t.replace(Ie, Te);
}
function ls(t, i) {
	return function(t) {
		return t.length >= 10240 && (Pe.test(t) || function(t) {
			const i = Re.exec(t);
			if (!i) return !1;
			let e;
			try {
				e = decodeURIComponent(t.slice(i[0].length));
			} catch (t) {
				return !1;
			}
			return Ae.test(e.replace(/[\r\n]/g, ""));
		}(t) || Ce.test(t) && Oe.test(t));
	}(t) ? "[binary data redacted - not supported by PostHog MCP analytics]" : function(t, i, e) {
		const s = 4 * e.maxStringLength;
		if (t.length > s) {
			const n = i(t.slice(0, function(t, i) {
				let e = i;
				for (; e > 0 && !De.test(t[e - 1]);) e--;
				return e;
			}(t, s)));
			if (n.length >= 2 * e.maxStringLength) return n + e.truncationSuffix;
		}
		return i(t);
	}(t, (t) => function(t) {
		return rs(t, {
			allowNestedUrls: !0,
			stripPunctuation: !0
		});
	}(function(t) {
		let i = t.replace(He, " ");
		return i = i.replace(qe, Te), i = i.replace(We, Te), i = i.replace(Ve, `$1${Te}`), i = function(t) {
			let i = "", e = 0;
			for (let s = ds(t, 0); null !== s; s = ds(t, s[1])) i += t.slice(e, s[0]) + vs(t.slice(s[0], s[1])), e = s[1];
			return i + t.slice(e);
		}(i), i = i.replace(Ge, Te), i = i.replace(Je, `$1${Te}`), i = i.replace(Ye, `$1${Te}`), i;
	}(os(t))), i);
}
function as(t) {
	let i = 0, e = !1;
	for (let s = t.length - 1; s >= 0; s--) {
		let n = t.charCodeAt(s) - 48;
		if (0 > n || n > 9) return !1;
		e && (n *= 2, n > 9 && (n -= 9)), i += n, e = !e;
	}
	return i % 10 == 0;
}
function us(t, i) {
	const e = t.charCodeAt(i);
	return e >= 48 && 57 >= e;
}
function hs(t, i) {
	const e = t.charCodeAt(i);
	return us(t, i) || 95 === e || e >= 65 && 90 >= e || e >= 97 && 122 >= e;
}
function cs(t, i) {
	let e = i;
	for (; us(t, e);) e++;
	return e;
}
function ds(t, i) {
	for (let e = i; t.length > e; e++) {
		if (!us(t, e) || hs(t, e - 1)) continue;
		let i = 0, s = -1, n = e;
		for (;;) {
			const e = cs(t, n);
			if (i += e - n, 13 > i || hs(t, e) || (s = e), n = e + 1, !" ./-".includes(t.charAt(e)) || !us(t, n)) break;
		}
		if (s >= 0) return [e, s];
		e = n - 1;
	}
	return null;
}
function vs(t) {
	const i = [];
	for (let e = Ke.exec(t); null !== e; e = Ke.exec(t)) i.push({
		digits: e[0],
		start: e.index,
		end: e.index + e[0].length
	});
	let e = "", s = 0, n = 0;
	for (; i.length > n;) {
		let r = "", o = -1;
		for (let t = n; i.length > t && (r += i[t].digits, 19 >= r.length); t++) r.length >= 13 && as(r) && (o = t);
		0 > o ? n++ : (e += t.slice(s, i[n].start) + Te, s = i[o].end, n = o + 1);
	}
	return e + t.slice(s);
}
var fs = {}.propertyIsEnumerable;
function ps(t, i) {
	try {
		return ms(t, i, {
			ancestors: /* @__PURE__ */ new WeakSet(),
			remainingNodes: 1e4
		}, 0);
	} catch (t) {
		return [];
	}
}
function gs(t, i, e, s) {
	if (0 >= e.remainingNodes) return { stringValue: si };
	if (e.remainingNodes--, j(t)) return { boolValue: t };
	if ("bigint" == typeof t) return function(t, i) {
		const e = t.toString(), s = BigInt("9223372036854775808");
		return t >= s || -s > t ? (i?.debug(`Attribute ${e} is outside the int64 range; encoding it as a string`), { stringValue: e }) : { intValue: e };
	}(t, i);
	if ("number" == typeof t) {
		if (!Number.isFinite(t)) return { stringValue: String(t) };
		if (Number.isInteger(t)) {
			if (Number.isSafeInteger(t)) return { intValue: String(t) };
			if (typeof BigInt > "u") return { stringValue: String(t) };
			const e = BigInt(t).toString();
			return t >= 0x8000000000000000 || -0x8000000000000000 > t ? (i?.debug(`Attribute ${e} is outside the int64 range; encoding it as a string`), { stringValue: e }) : { intValue: e };
		}
		return { doubleValue: t };
	}
	if ("string" == typeof t) return { stringValue: ri(t) };
	if ("function" == typeof t) return { stringValue: "[Function]" };
	if ("symbol" == typeof t) return { stringValue: String(t) };
	if ("object" == typeof t && null !== t) {
		if (e.ancestors.has(t)) return { stringValue: "[Circular]" };
		if (s >= 20) return { stringValue: si };
		if (t instanceof Date) {
			const i = t.getTime(), e = Number.isFinite(i) ? t.toISOString() : String(t);
			return { stringValue: "string" == typeof e ? ri(e) : String(e) };
		}
		e.ancestors.add(t);
		try {
			try {
				const n = t.toJSON;
				if ("function" == typeof n) return gs(n.call(t), i, e, s + 1);
			} catch (t) {}
			return k(t) ? { arrayValue: { values: _s(t, i, e, s + 1) } } : { kvlistValue: { values: ms(t, i, e, s + 1) } };
		} finally {
			e.ancestors.delete(t);
		}
	}
	return { stringValue: ri(String(t)) };
}
function _s(t, i, e, s) {
	const n = [], r = Math.min(t.length, 1e3);
	let o = 0;
	for (; r > o && e.remainingNodes > 0; o++) try {
		const r = o in t ? t[o] : void 0;
		if (M(r)) continue;
		n.push(gs(r, i, e, s));
	} catch (t) {
		n.push({ stringValue: ni });
	}
	return t.length > o && n.push({ stringValue: si }), n;
}
function ms(t, i, e, s) {
	const n = [];
	for (const r in t) if (fs.call(t, r)) {
		if (!r) {
			i?.debug("Dropping an attribute with an empty key");
			continue;
		}
		if (n.length >= 1e3 || 0 >= e.remainingNodes) {
			i?.debug("Attributes truncated: the value exceeds the OTLP encoder budget");
			break;
		}
		try {
			const o = t[r];
			if (I(o) || C(o)) continue;
			n.push({
				key: ri(r),
				value: gs(o, i, e, s)
			});
		} catch (t) {
			n.push({
				key: ri(r),
				value: { stringValue: ni }
			});
		}
	}
	return n;
}
function ys(t, i, e) {
	return bi(bi(bi(bi({}, oi({}, t.resourceAttributes)), {}, { "service.name": t.serviceName || "unknown_service" }, t.environment && { "deployment.environment": t.environment }), t.serviceVersion && { "service.version": t.serviceVersion }), {}, {
		"telemetry.sdk.name": i,
		"telemetry.sdk.version": e
	});
}
var bs = [
	"service.name",
	"deployment.environment",
	"service.version",
	"telemetry.sdk.name",
	"telemetry.sdk.version"
];
function ws(t, i) {
	const e = oi({}, t), s = {};
	for (const t of bs) ({}).hasOwnProperty.call(e, t) && (s[t] = e[t], delete e[t]);
	return [...ps(e, i), ...ps(s, i)];
}
var $s = {
	darwin: "macOS",
	win32: "Windows",
	cygwin: "Windows",
	linux: "Linux",
	android: "Android",
	freebsd: "FreeBSD",
	openbsd: "OpenBSD",
	netbsd: "NetBSD",
	sunos: "SunOS",
	aix: "AIX",
	haiku: "Haiku",
	"Mac OS X": "macOS"
};
var Ss = {
	text: "INFO",
	number: 9
};
var xs = {
	trace: {
		text: "TRACE",
		number: 1
	},
	debug: {
		text: "DEBUG",
		number: 5
	},
	info: Ss,
	warn: {
		text: "WARN",
		number: 13
	},
	error: {
		text: "ERROR",
		number: 17
	},
	fatal: {
		text: "FATAL",
		number: 21
	}
};
function Es(t) {
	try {
		return ri(String(t));
	} catch (t) {
		return ni;
	}
}
function ks(t, i, e, s) {
	const { text: r, number: o } = xs[t.level || "info"] || Ss, l = function(t = Date.now()) {
		return String(t) + "000000";
	}(F(s) ? s : void 0), a = {};
	i.distinctId && (a.posthogDistinctId = i.distinctId), i.sessionId && (a.sessionId = i.sessionId), i.windowId && (a["window.id"] = i.windowId), M(i.sessionStartTimestamp) || (a.sessionStartTimestamp = String(i.sessionStartTimestamp)), M(i.lastActivityTimestamp) || (a.lastActivityTimestamp = String(i.lastActivityTimestamp)), i.currentUrl && (a["url.full"] = i.currentUrl), i.screenName && (a["screen.name"] = i.screenName), i.appState && (a["app.state"] = i.appState), i.activeFeatureFlags && i.activeFeatureFlags.length > 0 && (a.feature_flags = i.activeFeatureFlags);
	const u = bi({}, a), h = t.attributes;
	if (h) {
		let t = [];
		try {
			t = Object.keys(h);
		} catch (i) {
			t = [];
		}
		for (const i of t) {
			let t;
			try {
				t = h[i];
			} catch (i) {
				t = ni;
			}
			Object.defineProperty(u, i, {
				value: t,
				enumerable: !0,
				writable: !0,
				configurable: !0
			});
		}
	}
	const c = {
		timeUnixNano: l,
		observedTimeUnixNano: l,
		severityNumber: o,
		severityText: r,
		body: { stringValue: Es(t.body) },
		attributes: ps(u, e)
	};
	return t.trace_id && (c.traceId = t.trace_id), t.span_id && (c.spanId = t.span_id), C(t.trace_flags) || (c.flags = t.trace_flags), c;
}
function Ts(t, i, e) {
	return ys(t, i, e);
}
function Ps(t, i, e, s) {
	return { resourceLogs: [{
		resource: { attributes: ws(i) },
		scopeLogs: [{
			scope: {
				name: e,
				version: s
			},
			logRecords: t
		}]
	}] };
}
var Os = class {
	constructor(t) {
		this.ls = t, this.us = 0;
	}
	get pending() {
		return !!this.cs;
	}
	arm(t) {
		this.clear(), this.us = Date.now() + t, this.cs = fi(() => {
			this.cs = void 0, this.ls();
		}, t);
	}
	armNoEarlierThan(t) {
		this.cs && Date.now() + t <= this.us || this.arm(t);
	}
	clear() {
		this.cs && (clearTimeout(this.cs), this.cs = void 0);
	}
};
function Cs() {
	return .75 + .5 * Math.random();
}
function Rs(t, i, e, s) {
	const n = Math.min(Math.max(0, i - 1), 6), r = t * Math.pow(2, n);
	return Math.round((void 0 === s ? r : Math.min(r, Math.max(s, t))) * e);
}
var As = class {
	constructor(t, i, e, s, n, r = () => Promise.resolve(), o, l = () => !1) {
		var a;
		this._instance = t, this.Br = i, this.R = e, this.hs = s, this.ds = n, this.vs = r, this.fs = o, this.ps = l, this.gs = new Os(() => this.ys()), this.bs = null, this._s = 0, this.ws = 0, this.ks = null, this.Ss = new ai(), this.xs = 0, this.$s = 1, this.Cs = 0, this.Ts = 0, this.Ms = !1, this.Is = i.maxBufferSize, this.Es = Math.max(null !== (a = i.maxQueueSize) && void 0 !== a ? a : i.maxBufferSize, i.maxBufferSize), this.As = i.flushIntervalMs, this.Rs = i.maxBatchRecordsPerPost, this.Ps = i.rateCapWindowMs, this.Os = i.maxLogsPerInterval;
	}
	clearQueue() {
		this.ws++, this._instance.setPersistedProperty(f.LogsQueue, []);
	}
	get throttled() {
		return this.Ss.isOpen();
	}
	reset() {
		this.gs.clear(), this.Cs = 0, this.Ts = 0, this.Ms = !1, this.xs = 0, this.$s = 1, this.Ss.reset(), this.Rs = this.Br.maxBatchRecordsPerPost;
	}
	onReconnect() {
		this.xs = 0, this.$s = 1, this.Ss.isOpen() ? this.Fs() && this.Ls() : this.ys();
	}
	captureLog(t, i) {
		var e;
		if (this._instance.isDisabled) return;
		if (this._instance.optedOut) return;
		if (!(null == t ? void 0 : t.body)) return;
		const s = this.Ds(t);
		if (null === s) return;
		if (!s.body) return void this.R.info("Log was rejected in beforeSend function");
		if (!this.Ns()) return;
		const n = { record: ks(s, null !== (e = null == i ? void 0 : i.context) && void 0 !== e ? e : this.hs(), this.R, null == i ? void 0 : i.occurredAtMs) };
		this.ds(() => this.js(n));
	}
	Ds(t) {
		const i = this.Br.beforeSend;
		if (!i) return t;
		const e = k(i) ? i : [i];
		let s = t;
		for (const t of e) try {
			const i = t(s);
			if (!i) return this.R.info("Log was rejected in beforeSend function"), null;
			s = i;
		} catch (t) {
			return this.R.error("Error in beforeSend function for log:", t), null;
		}
		return s;
	}
	Ns() {
		if (void 0 === this.Os) return !0;
		const t = Date.now(), i = t - this.Cs;
		return this.Ps > i && i >= 0 || (this.Cs = t, this.Ts = 0, this.Ms = !1), this.Os > this.Ts ? (this.Ts++, !0) : (this.Ms || (this.R.warn(`captureLog dropping logs: exceeded ${this.Os} logs per ${this.Ps}ms`), this.Ms = !0), !1);
	}
	flush() {
		var t = this;
		return J(function* () {
			if (!t._instance.isDisabled) return t.bs || (t.bs = t.qs().finally(() => {
				t.bs = null;
			})), t.bs;
		})();
	}
	qs() {
		var t = this;
		return J(function* () {
			var i;
			if (t.gs.clear(), t.Bs()) return;
			let e = null !== (i = t._instance.getPersistedProperty(f.LogsQueue)) && void 0 !== i ? i : [];
			if (0 === e.length) return;
			const s = e.length;
			let n = 0;
			for (; e.length > 0 && s > n;) {
				var r, o;
				if (t.Bs()) return;
				const i = t.ws;
				t._s = 0;
				const s = Math.min(e.length, t.Rs), l = e.slice(0, s), a = Ps(l.map((t) => t.record), t.zs(), null !== (r = t.fs) && void 0 !== r ? r : t._instance.getLibraryId(), t._instance.getLibraryVersion()), u = yield t._instance.Hs(a);
				if (t.ws !== i) return;
				if ("too-large" === u.kind && l.length > 1) t.Rs = Math.max(1, Math.floor(l.length / 2)), t.R.warn(`Logs batch of size ${l.length} was too large for the ingestion endpoint, reducing batch size to ${t.Rs}`);
				else {
					if (t.Ss.record(u), t.gs.pending && t.gs.arm(Math.max(t.As, t.Ss.remainingMs())), "retry-later" === u.kind) throw u.error;
					if ("too-large" === u.kind ? t.R.warn("Dropping a single log record with batch size 1 — the record is larger than the server cap and cannot be split further.") : "ok" === u.kind && t.Br.maxBatchRecordsPerPost > t.Rs && (t.Rs = Math.min(t.Br.maxBatchRecordsPerPost, t.Rs + 1)), yield t.Us(l.length), e = null !== (o = t._instance.getPersistedProperty(f.LogsQueue)) && void 0 !== o ? o : [], n += l.length, "fatal" === u.kind) throw u.error;
				}
			}
		})();
	}
	Bs() {
		return !!this.ps() && (this.Fs() && this.clearQueue(), !0);
	}
	Us(t) {
		var i = this;
		return J(function* () {
			var e;
			const s = Math.max(0, t - i._s), n = null !== (e = i._instance.getPersistedProperty(f.LogsQueue)) && void 0 !== e ? e : [];
			i._instance.setPersistedProperty(f.LogsQueue, n.slice(s)), yield i.vs();
		})();
	}
	zs() {
		return Ts(this.Br, this._instance.getLibraryId(), this._instance.getLibraryVersion());
	}
	js(t) {
		var i;
		if (this._instance.optedOut) return;
		const e = null !== (i = this._instance.getPersistedProperty(f.LogsQueue)) && void 0 !== i ? i : [];
		this.Es > e.length || (e.shift(), this._s++, this.R.info("Logs queue is full, dropping oldest record.")), e.push(t), this._instance.setPersistedProperty(f.LogsQueue, e), this.Is > e.length || this.Ss.isOpen() ? this.Ls() : this.ys();
	}
	Ls() {
		this.gs.pending || this.gs.arm(Math.max(this.As, this.Ss.remainingMs()));
	}
	Ws() {
		return Math.max(Rs(this.As, this.xs, this.$s, 3e4), this.Ss.remainingMs());
	}
	Fs() {
		const t = this._instance.getPersistedProperty(f.LogsQueue);
		return !!t && t.length > 0;
	}
	shutdown(t) {
		var i = this;
		return J(function* () {
			i.gs.clear();
			const e = i.flush().catch(() => {});
			void 0 !== t ? yield pi(e, t) : yield e;
		})();
	}
	flushWithTimeout(t) {
		var i = this;
		return J(function* () {
			const e = i.flush();
			yield pi(e, t, () => {
				e.catch(() => {});
			});
		})();
	}
	flushInBackground() {
		if (this.ks) return this.ks;
		const t = this.flush().then(() => {
			this.xs = 0, this.$s = 1;
		}, (t) => {
			this.xs++, this.$s = Cs(), this.R.error("PostHog logs flush failed:", t);
		}).finally(() => {
			this.ks === t && (this.ks = null), !this._instance.isDisabled && this.Fs() && this.gs.armNoEarlierThan(this.Ws());
		});
		return this.ks = t, t;
	}
	ys() {
		this.flushInBackground();
	}
};
var Is = /^[0-9a-f]+$/;
function Ms(t, i, e) {
	return "string" == typeof t && t.length === i && t !== e && Is.test(t);
}
var Fs = /^([0-9a-f]{2})-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})(-.*)?$/;
var Ds = "00";
var js = [
	0,
	5,
	10,
	25,
	50,
	75,
	100,
	250,
	500,
	750,
	1e3,
	2500,
	5e3,
	7500,
	1e4
];
function Ls(t) {
	return String(t) + "000000";
}
function Ns(t, i, e, s) {
	let n = "";
	return s && (n = Object.keys(s).sort().map((t) => `${JSON.stringify(t)}:${JSON.stringify(s[t])}`).join(",")), `${t}\0${i}\0${null != e ? e : ""}\0${n}`;
}
var Bs = class {
	constructor(t, i, e) {
		this._instance = t, this.Br = i, this.R = e, this.Gs = /* @__PURE__ */ new Map(), this.gs = new Os(() => this.flush().catch((t) => {
			this.R.error("Metrics flush failed:", t);
		})), this.bs = null, this.Vs = null, this.Qs = !1, this.Js = /* @__PURE__ */ new Map(), this.Zs = /* @__PURE__ */ new Set(), this.Ks = /* @__PURE__ */ new Map(), this.Ys = /* @__PURE__ */ new Set(), this.Xs = !1, this.Ss = new ai(), this.xs = 0, this.$s = 1, this.$o = 0;
	}
	count(t, i = 1, e) {
		this.To({
			name: t,
			type: "count",
			value: i,
			unit: null == e ? void 0 : e.unit,
			attributes: null == e ? void 0 : e.attributes
		});
	}
	gauge(t, i, e) {
		this.To({
			name: t,
			type: "gauge",
			value: i,
			unit: null == e ? void 0 : e.unit,
			attributes: null == e ? void 0 : e.attributes
		});
	}
	histogram(t, i, e) {
		this.To({
			name: t,
			type: "histogram",
			value: i,
			unit: null == e ? void 0 : e.unit,
			attributes: null == e ? void 0 : e.attributes,
			bounds: k(null == e ? void 0 : e.bounds) ? e.bounds.slice() : null == e ? void 0 : e.bounds
		});
	}
	flush() {
		var t = this;
		const i = this.bs, e = function() {
			var e = J(function* () {
				i && (yield i.catch(() => {})), yield t.Mo();
			});
			return function() {
				return e.apply(this, arguments);
			};
		}()().finally(() => {
			this.bs === e && (this.bs = null);
		});
		return this.bs = e, e;
	}
	flushCoalesced() {
		var t, i;
		return this.Io() ? null !== (t = this.bs) && void 0 !== t ? t : Promise.resolve() : (this.Vs || (this.Vs = (null !== (i = this.bs) && void 0 !== i ? i : Promise.resolve()).catch(() => {}).then(() => (this.Vs = null, this.Io() ? void 0 : this.flush()))), this.Vs);
	}
	Io() {
		return this.xs > 0 || this.Ss.remainingMs() > 0;
	}
	drainWindow() {
		if (0 === this.Gs.size) return null;
		const t = this.Gs;
		return this.Eo(), this.Ao(t);
	}
	reset() {
		this.$o++, this.Ss.reset(), this.xs = 0, this.$s = 1, this.gs.clear(), this.bs = null, this.Vs = null, this.Eo(), this.Ks = /* @__PURE__ */ new Map(), this.Xs = !1;
	}
	Eo() {
		this.Gs = /* @__PURE__ */ new Map(), this.Qs = !1, this.Js = /* @__PURE__ */ new Map(), this.Zs = /* @__PURE__ */ new Set(), this.Ys = /* @__PURE__ */ new Set();
	}
	To(t) {
		if (this._instance.isDisabled || this._instance.optedOut) return;
		const i = this.Ds(t);
		if (null === i) return;
		if (!i.name || "string" != typeof i.name) return void this.R.warn("Dropping metric with empty name");
		if ("number" != typeof i.value || !Number.isFinite(i.value)) return void this.R.warn(`Dropping metric '${i.name}': value must be a finite number`);
		if ("count" !== i.type && "gauge" !== i.type && "histogram" !== i.type) return void this.R.warn(`Dropping metric '${i.name}': unknown type '${String(i.type)}'`);
		if ("count" === i.type && 0 > i.value) return void this.R.warn(`Dropping count '${i.name}': counters are monotonic, value must be >= 0`);
		let e, s;
		try {
			e = i.attributes ? bi({}, i.attributes) : void 0, s = Ns(i.type, i.name, i.unit, e);
		} catch (t) {
			this.R.warn(`Dropping metric '${i.name}': attributes could not be serialized`, t);
			return;
		}
		let n, r = this.Gs.get(s);
		if (!r && !this.Ro()) return;
		if ("histogram" === i.type && (n = this.Po(i.name, i.unit, i.bounds), !n)) return;
		r || (r = {
			name: i.name,
			type: i.type,
			unit: i.unit,
			attributes: e,
			windowStartMs: Date.now(),
			hist: n && zs(n)
		}, this.Gs.set(s, r));
		const o = this.Js.get(i.name);
		void 0 === o ? this.Js.set(i.name, i.type) : o === i.type || this.Zs.has(i.name) || (this.Zs.add(i.name), this.R.warn(`Metric name '${i.name}' is already used as a ${o}; recording it as a ${i.type} too will blend both series in charts. Use a distinct name.`)), this.Oo(r, i.value);
		const l = this.Fo();
		l && (r.exemplar = bi(bi({}, l), {}, {
			value: i.value,
			timeMs: Date.now()
		})), this.Ls();
	}
	Fo() {
		try {
			var t, i;
			const e = function(t) {
				const i = function(t) {
					if ("string" != typeof t) return;
					const i = Fs.exec(t.trim());
					if (!i) return;
					const [, e, s, n, r, o] = i;
					return "ff" === e || "00" === e && o || !function(t) {
						return Ms(t, 32, "00000000000000000000000000000000");
					}(s) || !function(t) {
						return Ms(t, 16, "0000000000000000");
					}(n) ? void 0 : {
						version: e,
						traceId: s,
						spanId: n,
						flags: r
					};
				}(t);
				return i && {
					traceId: i.traceId,
					spanId: i.spanId,
					flags: (e = i.flags, 1 & parseInt(e, 16) ? "01" : Ds)
				};
				var e;
			}(null === (t = (i = this._instance).getActiveSpan) || void 0 === t || null === (t = t.call(i)) || void 0 === t ? void 0 : t.traceparent());
			if (e && "01" === e.flags) return {
				traceId: e.traceId,
				spanId: e.spanId
			};
		} catch (t) {}
	}
	Ro() {
		return this.Br.maxSeriesPerFlush > this.Gs.size || (this.Qs || (this.Qs = !0, this.R.warn(`Metric series cap reached (${this.Br.maxSeriesPerFlush} per flush window); dropping new series until the next flush. Reduce attribute cardinality.`)), !1);
	}
	Po(t, i, e) {
		if (void 0 !== e && !function(t) {
			if (!k(t) || 0 === t.length) return !1;
			for (let i = 0; t.length > i; i++) if (!Number.isFinite(t[i]) || i > 0 && t[i - 1] >= t[i]) return !1;
			return !0;
		}(e)) return void this.R.warn(`Dropping histogram '${t}': bounds must be a non-empty array of finite, strictly increasing numbers`);
		const s = Ns("histogram", t, i, void 0), n = this.Ks.get(s);
		if (n) return this.Lo(t, s, n, e), n;
		if (this.Ks.size >= this.Br.maxSeriesPerFlush) {
			if (this.Xs || (this.Xs = !0, this.R.warn(`Histogram bounds limit reached (${this.Br.maxSeriesPerFlush} distinct histograms); new histograms that pass custom bounds are dropped. Reduce histogram name cardinality.`)), e && !Us(e, js)) return;
			return js;
		}
		const r = e ? e.slice() : js;
		return this.Ks.set(s, r), r;
	}
	Lo(t, i, e, s) {
		Us(e, null != s ? s : js) || this.Ys.has(i) || (this.Ys.add(i), this.R.warn(`Histogram '${t}' already uses the bounds [${e.join(", ")}]; samples that pass different bounds are recorded in those buckets.`));
	}
	Oo(t, i) {
		switch (t.type) {
			case "count":
				var e;
				t.total = (null !== (e = t.total) && void 0 !== e ? e : 0) + i;
				break;
			case "gauge":
				t.last = i;
				break;
			case "histogram": {
				const e = t.hist;
				e.count += 1, e.sum += i, e.min = Math.min(e.min, i), e.max = Math.max(e.max, i), e.bucketCounts[function(t, i) {
					for (let e = 0; i.length > e; e++) if (i[e] >= t) return e;
					return i.length;
				}(i, e.bounds)] += 1;
				break;
			}
		}
	}
	Ds(t) {
		const i = this.Br.beforeSend;
		if (!i) return t;
		const e = k(i) ? i : [i];
		let s = t;
		for (const t of e) try {
			const i = t(s);
			if (!i) return this.R.info("Metric was rejected in beforeSend function"), null;
			s = i;
		} catch (t) {
			return this.R.error("Error in beforeSend function for metric:", t), null;
		}
		return s;
	}
	Ls() {
		this.gs.pending || this.gs.arm(this.Ws());
	}
	Ws() {
		return Math.max(Rs(this.Br.flushIntervalMs, this.xs, this.$s, 3e4), this.Ss.remainingMs());
	}
	Mo() {
		var t = this;
		return J(function* () {
			if (t.gs.clear(), 0 === t.Gs.size) return;
			const i = t.Gs;
			t.Eo();
			const e = t.$o, s = yield t._instance.Do(t.Ao(i));
			if (e === t.$o) switch (t.Ss.record(s), "retry-later" === s.kind ? (t.xs++, t.$s = Cs()) : (t.xs = 0, t.$s = 1), t.gs.pending && t.gs.arm(t.Ws()), s.kind) {
				case "ok": return;
				case "retry-later":
					t.No(i), t.gs.armNoEarlierThan(t.Ws());
					return;
				case "too-large":
					t.R.warn("Metrics batch exceeded the server size limit and was dropped");
					return;
				case "fatal":
					t.R.error("Failed to send metrics batch:", s.error);
					return;
			}
		})();
	}
	Ao(t) {
		return i = this.jo(t), e = function(t, i, e) {
			return ys(t, i, e);
		}(this.Br, this._instance.getLibraryId(), this._instance.getLibraryVersion()), s = this._instance.getLibraryId(), n = this._instance.getLibraryVersion(), { resourceMetrics: [{
			resource: { attributes: ws(e) },
			scopeMetrics: [{
				scope: {
					name: s,
					version: n
				},
				metrics: i
			}]
		}] };
		var i, e, s, n;
	}
	jo(t) {
		const i = Ls(Date.now()), e = /* @__PURE__ */ new Map();
		for (const o of t.values()) {
			var s;
			const t = Ns(o.type, o.name, o.unit, void 0);
			let l = e.get(t);
			l || (l = bi({ name: o.name }, o.unit && { unit: o.unit }), "count" === o.type ? l.sum = {
				aggregationTemporality: 1,
				isMonotonic: !0,
				dataPoints: []
			} : "gauge" === o.type ? l.gauge = { dataPoints: [] } : l.histogram = {
				aggregationTemporality: 1,
				dataPoints: []
			}, e.set(t, l));
			const a = ps(null !== (s = o.attributes) && void 0 !== s ? s : {}, this.R), u = Ls(o.windowStartMs), h = Hs(o.exemplar);
			if ("count" === o.type) {
				var n;
				const t = bi({
					attributes: a,
					startTimeUnixNano: u,
					timeUnixNano: i,
					asDouble: null !== (n = o.total) && void 0 !== n ? n : 0
				}, h);
				l.sum.dataPoints.push(t);
			} else if ("gauge" === o.type) {
				var r;
				const t = bi({
					attributes: a,
					timeUnixNano: i,
					asDouble: null !== (r = o.last) && void 0 !== r ? r : 0
				}, h);
				l.gauge.dataPoints.push(t);
			} else {
				const t = o.hist, e = bi({
					attributes: a,
					startTimeUnixNano: u,
					timeUnixNano: i,
					count: t.count,
					sum: t.sum,
					min: t.min,
					max: t.max,
					bucketCounts: t.bucketCounts,
					explicitBounds: t.bounds
				}, h);
				l.histogram.dataPoints.push(e);
			}
		}
		return Array.from(e.values());
	}
	No(t) {
		for (const [n, r] of t) {
			var i;
			const t = this.Gs.get(n);
			if (t) switch (t.windowStartMs = Math.min(t.windowStartMs, r.windowStartMs), t.exemplar = null !== (i = t.exemplar) && void 0 !== i ? i : r.exemplar, t.type) {
				case "count":
					var e, s;
					t.total = (null !== (e = t.total) && void 0 !== e ? e : 0) + (null !== (s = r.total) && void 0 !== s ? s : 0);
					break;
				case "gauge": break;
				case "histogram": {
					const i = t.hist, e = r.hist;
					i.count += e.count, i.sum += e.sum, i.min = Math.min(i.min, e.min), i.max = Math.max(i.max, e.max);
					for (let t = 0; i.bucketCounts.length > t; t++) i.bucketCounts[t] += e.bucketCounts[t];
					break;
				}
			}
			else this.Ro() && this.Gs.set(n, r);
		}
	}
};
function Us(t, i) {
	if (t === i) return !0;
	if (t.length !== i.length) return !1;
	for (let e = 0; t.length > e; e++) if (t[e] !== i[e]) return !1;
	return !0;
}
function zs(t) {
	return {
		bounds: t,
		count: 0,
		sum: 0,
		min: Infinity,
		max: -Infinity,
		bucketCounts: new Array(t.length + 1).fill(0)
	};
}
function Hs(t) {
	return t ? { exemplars: [{
		filteredAttributes: [],
		timeUnixNano: Ls(t.timeMs),
		asDouble: t.value,
		traceId: t.traceId,
		spanId: t.spanId
	}] } : {};
}
var qs = (t, { debugEnabled: i } = {}) => {
	const e = {
		N(e, ...s) {
			let n;
			try {
				n = typeof window > "u" ? void 0 : window;
			} catch (t) {
				return;
			}
			n && (v.DEBUG || n.POSTHOG_DEBUG || i) && !C(n.console) && n.console && ("__rrweb_original__" in n.console[e] ? n.console[e].__rrweb_original__ : n.console[e])(t, ...s);
		},
		debug(...t) {
			e.N("debug", ...t);
		},
		info(...t) {
			e.N("log", ...t);
		},
		warn(...t) {
			e.N("warn", ...t);
		},
		error(...t) {
			e.N("error", ...t);
		},
		critical(...i) {
			console.error(t, ...i);
		},
		uninitializedWarning(t) {
			e.error(`You must initialize PostHog before calling ${t}`);
		},
		createLogger: (i, e) => qs(`${t} ${i}`, e)
	};
	return e;
};
var Ws = qs("[PostHog.js]");
var Vs = (t, i) => Ws.createLogger(t, i);
var Gs = {
	"conversations.js": "sha384-oAejv5s/09pcsJfgqP1jymjv5fl8GEw6mZI8YBQOOJ2DYc7vQUqFajQ6u/afuVBn",
	"crisp-chat-integration.js": "sha384-qVSPPiM5PHJlVNpiLPyETnf0VXOGevtCqjm2K8EmWnKpLQnY/TMu+iLJ8wWLW8iA",
	"dead-clicks-autocapture.js": "sha384-+WOUHLYfulxlnu9CZVlOAeJv3+4bn45d4fioYdJUuzaoiM8ax0ht8QX40J2Fp14f",
	"exception-autocapture.js": "sha384-F/fSZE+cj7O//TRJ+JCQlJGTD5o2XBCDsPXuE1eA7HcBSkFklSQFzyOt2eKBo+iL",
	"intercom-integration.js": "sha384-gWEoUxf+HEPSZ4GZthxep/3LlEectgXxzj8uWkW7dnvRRV6AKkHXtZEmcb0OqOvn",
	"lazy-recorder.js": "sha384-+SHUN/zCSEpZKF6MIx9ArzWQ0vET29Xl7kVpiH5PhyGLjXPaZNJXVGb0g4VCm9Ni",
	"logs.js": "sha384-HGXa+FeVH5JwY3bwubM1EJrP+LG95rh6oU9TbtzHZLs1ECpl5mCXv5FcYF8SgNjk",
	"product-tours.js": "sha384-AxPSB2uUloFM3lwE+tuKuG8hqbz1Kq5RslkgQWrrkBHSCvYp583FcRWgIE6Kwj+M",
	"recorder.js": "sha384-88LswkBOqtAt/RoXzLE7k7Mu58QaEmmnL+18tkw1RT7WaOZPxnbzUoMnHBC+TsPB",
	"surveys.js": "sha384-mkj77uCxsKE5Amwl3eZ7LosN2XerRQgrshLqCYc2al5OjbkCUqr93M8bSNBnjV7d",
	"tracing-headers.js": "sha384-kiUbaGGMgA6klTPefqr6nHeeTCejdA62XyCxqOySP2gLNe+wl/TDX0KflMiSMNJ2",
	"web-vitals-soft-navs.js": "sha384-recN8i2tLQWaeNtCAnErAmFlgg4+33FAHvs8l84aE+SHr6oqLAPwhFVZdP4SfKT6",
	"web-vitals-with-attribution-soft-navs.js": "sha384-f9L4YQQre9lKeUzyvy2Kt4dHLIXECipeMmbr7SPQAOqLi+ZCHbh1I1g/OwsK/zrp",
	"web-vitals-with-attribution.js": "sha384-QVSLDmgzPE1K6g6gBB8QKx/YDQbI2ot0gAcajFIAkGf34SWA3oe6m+WzcmbzpVjD",
	"web-vitals.js": "sha384-wNvgQ2MIesvfVwpUOblaIO/5weiMjR0Ld1eSNtW14MURV24BwfW8Svo6TsBJ3Bk9"
};
var Ks = /^sha384-[A-Za-z0-9+/]{64}$/;
var Js;
var Ys = (t) => {
	var i;
	return (null == t ? void 0 : t.config.require_subresource_integrity) ? t.__loadExternalDependency : null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.loadExternalDependency;
};
var Zs = Vs("[ExternalScriptsLoader]");
var Xs = (t) => {
	const i = null == s ? void 0 : s.querySelectorAll("script");
	if (i) {
		for (let e = 0; i.length > e; e++) if (i[e].src === t || i[e].getAttribute("src") === t) return i[e];
	}
};
var Qs = (t, i, e) => {
	e ? Zs.critical(i) : Zs.warn(i), t(i);
};
var tn = (t, i, e, n) => {
	if (t.config.disable_external_dependency_loading) return Zs.warn(`${i} was requested but loading of external scripts is disabled.`), e("Loading of external scripts is disabled");
	const r = () => {
		if (s?.removeEventListener("DOMContentLoaded", r), t.config.disable_external_dependency_loading) return e("Loading of external scripts is disabled");
		if (!s) return e("document not found");
		let l = s.createElement("script");
		if (l.type = "text/javascript", l.crossOrigin = "anonymous", n && (l.integrity = n), l.src = i, l.onload = (t) => {
			l.__posthog_loading_callback_fired = !0, e(void 0, t);
		}, l.onerror = (t) => {
			l.__posthog_loading_error = t, e(t);
		}, t.config.prepare_external_dependency_script && (l = t.config.prepare_external_dependency_script(l)), !l) return e("prepare_external_dependency_script returned null");
		if (n && (!l.src || l.integrity !== n || "anonymous" !== l.crossOrigin)) return Qs(e, `prepare_external_dependency_script must keep src, integrity and crossOrigin 'anonymous' for ${i}`, !0);
		if (t.config.disable_external_dependency_loading) return e("Loading of external scripts is disabled");
		const a = Xs(l.src);
		if (a) {
			if (a.integrity !== l.integrity || a.crossOrigin !== l.crossOrigin || a.nonce !== l.nonce) return e("Existing script conflicts with prepared script policy");
			if (a.__posthog_loading_callback_fired) return e();
			const t = a.__posthog_loading_error;
			return t ? e(t) : (a.addEventListener("load", (t) => {
				a.__posthog_loading_callback_fired = !0, e(void 0, t);
			}), void a.addEventListener("error", (t) => {
				a.__posthog_loading_error = t, e(t);
			}));
		}
		if (!s.body) return o();
		if ("head" === t.config.external_scripts_inject_target) s.head.appendChild(l);
		else {
			const t = s.querySelectorAll("body > script");
			var u;
			t.length > 0 ? null === (u = t[0].parentNode) || void 0 === u || u.insertBefore(l, t[0]) : s.body.appendChild(l);
		}
	}, o = () => {
		s?.addEventListener("DOMContentLoaded", r);
	};
	(null == s ? void 0 : s.body) || Xs(i) ? r() : o();
};
var en = {};
var sn = (t, i) => {
	let e = `/static/${i}.js?v=${t.version}`;
	if ("toolbar" === i) {
		const t = 3e5;
		e = `${e}&t=${Math.floor(Date.now() / t) * t}`;
	}
	return t.requestRouter.endpointFor("assets", e);
};
c.__PosthogExtensions__ = c.__PosthogExtensions__ || {};
var nn = (t, i, e) => {
	if (t.config.require_subresource_integrity) {
		if ("remote-config" === i || "toolbar" === i) return Qs(e, `${i} can't be integrity-verified, so it is not loaded with require_subresource_integrity`);
		if (!s || !("integrity" in s.createElement("script"))) return Qs(e, "This browser does not support Subresource Integrity", !0);
		const n = `${i}.js`, r = Gs[n];
		return R(r) && Ks.test(r) ? void tn(t, t.requestRouter.endpointFor("assets", `/static/${t.version}/${n}`), e, r) : Qs(e, `No integrity hash for ${n}`, !0);
	}
	if ("remote-config" === i) {
		tn(t, t.requestRouter.endpointFor("assets", `/array/${t.config.token}/config.js`), e);
		return;
	}
	const n = t.config.strict_script_versioning;
	if (n) {
		const s = t.requestRouter.endpointFor("assets", `/static/${t.version}/${i}.js`), r = en[s];
		if ("fallback" === n && r) {
			if (Xs(r)) return void tn(t, r, e);
			delete en[s];
		}
		tn(t, s, "fallback" === n ? (n, r) => {
			if (n) if ("string" == typeof n) e(n);
			else {
				var o;
				const n = sn(t, i);
				en[s] = n;
				const r = Xs(s);
				null == r || null === (o = r.parentNode) || void 0 === o || o.removeChild(r), tn(t, n, e);
			}
			else e(void 0, r);
		} : e);
		return;
	}
	tn(t, sn(t, i), e);
};
Js = nn, c.__PosthogExtensions__.loadExternalDependency = nn, c.__PosthogExtensions__.loadSiteApp = (t, i, e) => {
	if (t.config.require_subresource_integrity) return Qs(e, `Site apps can't be integrity-verified, so ${i} is not loaded with require_subresource_integrity`);
	tn(t, t.requestRouter.endpointFor("api", i), e);
}, v.DEBUG = !1, v.LIB_VERSION = "1.454.2", v.LIB_NAME = "web";
var rn = v;
var on = "$early_access_features";
var ln = "$active_feature_flags";
var an = "$feature_flag_details";
var un = "$feature_flag_errors";
var hn = "$feature_flag_evaluated_at";
var cn = "$feature_flag_request_id";
var dn = "$minimal_flag_called_events";
var vn = "$enabled_feature_flags";
var fn = "$stored_group_properties";
var pn = "$stored_person_properties";
var gn = "$flag_call_reported";
var _n = "$flag_call_reported_session_id";
var mn = "$feature_flag_payloads";
var yn = "$override_feature_flags";
var bn = "$override_feature_flag_payloads";
var wn = "visibilitychange";
var $n = "$autocapture_disabled_server_side";
var Sn = "$surveys";
var xn = "$surveys_loaded_at";
var En = "PostHog loadExternalDependency extension not found.";
var kn = "$surveys_activated";
var Tn = "$surveys_activated_session";
var Pn = "$surveys_activated_timestamps";
var On = "$people_distinct_id";
var Cn = "distinct_id";
var Rn = "$device_id";
var An = "$device_model";
var In = "__alias";
var Mn = "__cmpns";
var Fn = "$fbc";
var Dn = "$fbc_persistence";
var jn = "$fbp";
var Ln = "$fbp_persistence";
var Nn = "__timers";
var Bn = "$heatmaps_enabled_server_side";
var Un = "$exception_capture_enabled_server_side";
var zn = "$error_tracking_suppression_rules";
var Hn = "$error_tracking_capture_extension_exceptions";
var qn = "$web_vitals_enabled_server_side";
var Wn = "$dead_clicks_enabled_server_side";
var Vn = "$product_tours_enabled_server_side";
var Gn = "$logs_capture_enabled_server_side";
var Kn = "$web_vitals_allowed_metrics";
var Jn = "$session_recording_remote_config";
var Yn = "$session_recording_enabled_server_side";
var Zn = "$replay_sample_rate";
var Xn = "$replay_override_sampling";
var Qn = "$replay_override_linked_flag";
var tr = "$replay_override_url_trigger";
var ir = "$replay_override_event_trigger";
var er = "$sesid";
var sr = "$session_is_sampled";
var nr = "$session_past_minimum_duration";
var rr = "$session_recording_url_trigger_activated_session";
var or = "$session_recording_event_trigger_activated_session";
var lr = "$debug_first_full_snapshot_timestamp";
var ar = "$sess_rec_flush_size";
var ur = "$groups";
var hr = "ph_product_tours";
var cr = "$product_tours_activated";
var dr = "$product_tours_activated_session";
var vr = "$conversations_widget_session_id";
var fr = "$conversations_ticket_id";
var pr = "$conversations_widget_state";
var gr = "$conversations_user_traits";
var _r = "$user_state";
var mr = "$client_session_props";
var yr = "$capture_rate_limit";
var br = "$initial_campaign_params";
var wr = "$initial_referrer_info";
var $r = "$initial_person_info";
var Sr = "$epp";
var xr = "$posthog_cookieless";
var Er = "$cookieless_mode";
var kr = "$sdk_debug_extensions_init_method";
var Tr = "$sdk_debug_extensions_init_time_ms";
var Pr = "$sdk_debug_recording_script_not_loaded";
var Or = "$sdk_debug_replay_stale_config";
var Cr = "$sdk_debug_replay_event_trigger_status";
var Rr = "$sdk_debug_replay_linked_flag_trigger_status";
var Ar = "$sdk_debug_replay_matched_recording_trigger_groups";
var Ir = "$sdk_debug_replay_pending_trigger_conditions";
var Mr = "$sdk_debug_replay_remote_trigger_matching_config";
var Fr = "$sdk_debug_replay_trigger_groups_count";
var Dr = "$sdk_debug_replay_url_trigger_status";
var jr = "$session_recording_start_reason";
var Lr = "anonymous";
var Nr = "identified";
var Br = "identified_only";
var Ur = "beforeunload";
var zr = "$pageview";
var Hr = "$pageleave";
var qr = "$identify";
var Wr = "$groupidentify";
function Vr(t, i) {
	k(t) && t.forEach(i);
}
function Gr(t, i) {
	if (!M(t)) if (k(t)) t.forEach(i);
	else if (((t) => t instanceof FormData)(t)) t.forEach((t, e) => i(t, e));
	else for (const e in t) x.call(t, e) && i(t[e], e);
}
var Kr = function(t, ...i) {
	for (const e of i) for (const i in e) void 0 !== e[i] && (t[i] = e[i]);
	return t;
};
function Jr(t) {
	const i = Object.keys(t);
	let e = i.length;
	const s = new Array(e);
	for (; e--;) s[e] = [i[e], t[i[e]]];
	return s;
}
var Yr = function(t) {
	return function(...i) {
		try {
			return t.apply(this, i);
		} catch (t) {
			Ws.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), Ws.critical(t);
		}
	};
};
var Zr = function(t) {
	const i = {};
	return Gr(t, function(t, e) {
		(R(t) && t.length > 0 || F(t)) && (i[e] = t);
	}), i;
};
function Xr(t) {
	const i = bi({}, t);
	for (const e of [
		"name",
		"message",
		"stack",
		"cause",
		"errors"
	]) try {
		e in t && (i[e] = t[e]);
	} catch (t) {}
	return i;
}
var Qr = [
	"herokuapp.com",
	"vercel.app",
	"netlify.app"
];
function to(t) {
	const i = null == t ? void 0 : t.hostname;
	if (!R(i)) return !1;
	const e = i.split(".").slice(-2).join(".");
	for (const t of Qr) if (e === t) return !1;
	return !0;
}
function io(t, i, e, s) {
	const { capture: n = !1, passive: r = !0 } = null != s ? s : {};
	t?.addEventListener(i, e, {
		capture: n,
		passive: r
	});
}
function eo(t) {
	return "ph_toolbar_internal" === t.name;
}
var so = (t) => {
	if (s) {
		try {
			const i = t + "=", e = s.cookie.split(";").filter((t) => t.length);
			for (let t = 0; e.length > t; t++) {
				let s = e[t];
				for (; " " == s.charAt(0);) s = s.substring(1, s.length);
				if (0 === s.indexOf(i)) return decodeURIComponent(s.substring(i.length, s.length));
			}
		} catch (t) {}
		return null;
	}
};
var no = class t {
	constructor(t) {
		if (this.bytes = t, 16 !== t.length) throw new TypeError("not 128-bit length");
	}
	static fromFieldsV7(i, e, s, n) {
		if (!Number.isInteger(i) || !Number.isInteger(e) || !Number.isInteger(s) || !Number.isInteger(n) || 0 > i || 0 > e || 0 > s || 0 > n || i > 0xffffffffffff || e > 4095 || s > 1073741823 || n > 4294967295) throw new RangeError("invalid field value");
		const r = /* @__PURE__ */ new Uint8Array(16);
		return r[0] = i / Math.pow(2, 40), r[1] = i / Math.pow(2, 32), r[2] = i / Math.pow(2, 24), r[3] = i / Math.pow(2, 16), r[4] = i / 256, r[5] = i, r[6] = 112 | e >>> 8, r[7] = e, r[8] = 128 | s >>> 24, r[9] = s >>> 16, r[10] = s >>> 8, r[11] = s, r[12] = n >>> 24, r[13] = n >>> 16, r[14] = n >>> 8, r[15] = n, new t(r);
	}
	toString() {
		let t = "";
		for (let i = 0; this.bytes.length > i; i++) t = t + (this.bytes[i] >>> 4).toString(16) + (15 & this.bytes[i]).toString(16), 3 !== i && 5 !== i && 7 !== i && 9 !== i || (t += "-");
		if (36 !== t.length) throw new Error("Invalid UUIDv7 was generated");
		return t;
	}
	clone() {
		return new t(this.bytes.slice(0));
	}
	equals(t) {
		return 0 === this.compareTo(t);
	}
	compareTo(t) {
		for (let i = 0; 16 > i; i++) {
			const e = this.bytes[i] - t.bytes[i];
			if (0 !== e) return Math.sign(e);
		}
		return 0;
	}
};
var ro = class {
	generate() {
		const t = this.generateOrAbort();
		if (!C(t)) return t;
		{
			this.Mt = 0;
			const t = this.generateOrAbort();
			if (C(t)) throw new Error("Could not generate UUID after timestamp reset");
			return t;
		}
	}
	generateOrAbort() {
		const t = (() => {
			const t = Date.now();
			return F(t) && isFinite(t) ? Math.min(Math.max(Math.floor(t), 0), 0xffffffffffff) : 0;
		})();
		if (t > this.Mt) this.Mt = t, this.Tt();
		else {
			if (this.Mt >= t + 1e4) return;
			this.It++, this.It > 4398046511103 && (this.Mt++, this.Tt());
		}
		return no.fromFieldsV7(this.Mt, Math.trunc(this.It / Math.pow(2, 30)), this.It & Math.pow(2, 30) - 1, this.At.nextUint32());
	}
	Tt() {
		this.It = 1024 * this.At.nextUint32() + (1023 & this.At.nextUint32());
	}
	constructor() {
		this.Mt = 0, this.It = 0, this.At = new ao();
	}
};
var oo = (t) => {
	if ("u" > typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw new Error("no cryptographically strong RNG available");
	for (let i = 0; t.length > i; i++) t[i] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
	return t;
};
var lo;
var ao = class {
	nextUint32() {
		var t;
		return this.Rt.length > this.Et || ((null !== (t = lo) && void 0 !== t ? t : lo = "u" > typeof window && !C(window.crypto) && crypto.getRandomValues ? (t) => {
			try {
				return crypto.getRandomValues(t);
			} catch (i) {
				return oo(t);
			}
		} : oo)(this.Rt), this.Et = 0), this.Rt[this.Et++];
	}
	constructor() {
		this.Rt = /* @__PURE__ */ new Uint32Array(8), this.Et = Infinity;
	}
};
var uo;
var ho = () => co().toString();
var co = () => (uo || (uo = new ro())).generate();
var vo = "";
var fo = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
var po = null;
var go = {
	Ot() {
		if (!I(po)) return po;
		if (po = !1, s) try {
			const t = `__ph_cookie_support_${ho()}`;
			go.$t(t, "xyz"), po = "\"xyz\"" === so(t), go.Dt(t);
		} catch (t) {
			po = !1;
		}
		return po;
	},
	Ft(t) {
		Ws.error("cookieStore error: " + t);
	},
	Lt: so,
	Pt(t) {
		let i;
		try {
			i = JSON.parse(go.Lt(t)) || {};
		} catch (t) {}
		return i;
	},
	$t(t, i, e, n, r) {
		if (!s) return !1;
		try {
			let o = "", l = "";
			const a = function(t, i) {
				if (i) {
					let i = function(t, i = s) {
						if (vo) return vo;
						if (!i) return "";
						if (["localhost", "127.0.0.1"].includes(t)) return "";
						const e = t.split(".");
						let n = Math.min(e.length, 8);
						const r = "dmn_chk_" + ho();
						for (; !vo && n--;) {
							const t = e.slice(n).join("."), s = r + "=1;domain=." + t + ";path=/";
							i.cookie = s + ";max-age=3", i.cookie.includes(r) && (i.cookie = s + ";max-age=0", vo = t);
						}
						return vo;
					}(t);
					if (!i) {
						const e = ((t) => {
							const i = t.match(fo);
							return i ? i[0] : "";
						})(t);
						e !== i && Ws.info("Warning: cookie subdomain discovery mismatch", e, i), i = e;
					}
					return i ? "; domain=." + i : "";
				}
				return "";
			}(s.location.hostname, n);
			if (e) {
				const t = /* @__PURE__ */ new Date();
				t.setTime(t.getTime() + 864e5 * e), o = "; expires=" + t.toUTCString();
			}
			r && (l = "; secure");
			const u = t + "=" + encodeURIComponent(JSON.stringify(i)) + o + "; SameSite=Lax; path=/" + a + l;
			return u.length > 3686.4 && Ws.warn("cookieStore warning: large cookie, len=" + u.length), s.cookie = u, !0;
		} catch (t) {
			return !1;
		}
	},
	Dt(t, i) {
		if ((null == s ? void 0 : s.cookie) && (!i || !I(so(t)))) try {
			go.$t(t, "", -1, i);
		} catch (t) {
			return;
		}
	}
};
var _o = null;
var mo = {
	Ot() {
		if (!I(_o)) return _o;
		let i = !0;
		if (C(t)) i = !1;
		else try {
			const t = "__mplssupport__";
			mo.$t(t, "xyz"), "\"xyz\"" !== mo.Lt(t) && (i = !1), mo.Dt(t);
		} catch (t) {
			i = !1;
		}
		return i || Ws.error("localStorage unsupported; falling back to cookie store"), _o = i, i;
	},
	Ft(t) {
		Ws.error("localStorage error: " + t);
	},
	Lt(i) {
		try {
			return null == t ? void 0 : t.localStorage.getItem(i);
		} catch (t) {
			mo.Ft(t);
		}
		return null;
	},
	Pt(t) {
		try {
			return JSON.parse(mo.Lt(t)) || {};
		} catch (t) {}
		return null;
	},
	$t(i, e) {
		try {
			return t?.localStorage.setItem(i, JSON.stringify(e)), !0;
		} catch (t) {
			mo.Ft(t);
		}
		return !1;
	},
	Dt(i) {
		try {
			t?.localStorage.removeItem(i);
		} catch (t) {
			mo.Ft(t);
		}
	}
};
var yo = [
	pn,
	ln,
	vn,
	an,
	mn,
	cn,
	hn,
	un,
	gn
];
var bo = [
	Rn,
	Cn,
	er,
	sr,
	Sr,
	$r,
	Dn,
	_r
];
var wo = (t) => t + "_cpm";
var $o = [
	"__proto__",
	"constructor",
	"prototype"
];
var So = (t) => {
	if (!P(t)) return {};
	const i = {};
	return Object.keys(t).forEach((e) => {
		-1 === $o.indexOf(e) && (i[e] = t[e]);
	}), i;
};
var xo = (t, i = []) => {
	const e = {};
	return [...bo, ...i].forEach((i) => {
		const s = t[i];
		C(s) || I(s) || "" === s || (e[i] = s);
	}), e;
};
var Eo = (t) => {
	let i = 5381, e = 2166136261;
	for (let s = 0; t.length > s; s++) {
		const n = t.charCodeAt(s);
		i = 33 * i ^ n, e = Math.imul(e ^ n, 16777619);
	}
	return t.length.toString(36) + "." + (i >>> 0).toString(36) + "." + (e >>> 0).toString(36);
};
var ko = (t, i) => ({
	p: i,
	f: Eo(JSON.stringify(t))
});
var To = (t, i) => {
	if (!i) return {
		properties: [],
		isValid: !1
	};
	try {
		const e = go.Pt(wo(t)), s = (null == e ? void 0 : e.f) === Eo(i) && k(e.p);
		return {
			properties: s ? e.p : [],
			isValid: s
		};
	} catch (t) {
		return {
			properties: [],
			isValid: !1
		};
	}
};
var Po = (t, i) => i + "|" + (go.Lt(wo(t)) || "");
var Oo = {};
var Co = {
	Ot: () => !0,
	Ft(t) {
		Ws.error("memoryStorage error: " + t);
	},
	Lt: (t) => t in Oo ? Oo[t] : null,
	Pt: (t) => t in Oo ? Oo[t] : null,
	$t: (t, i) => (Oo[t] = i, !0),
	Dt(t) {
		delete Oo[t];
	}
};
var Ro = null;
var Ao = {
	Ot() {
		if (!I(Ro)) return Ro;
		if (Ro = !0, C(t)) Ro = !1;
		else try {
			const t = "__support__";
			Ao.$t(t, "xyz"), "\"xyz\"" !== Ao.Lt(t) && (Ro = !1), Ao.Dt(t);
		} catch (t) {
			Ro = !1;
		}
		return Ro;
	},
	Ft(t) {
		Ws.error("sessionStorage error: ", t);
	},
	Lt(i) {
		try {
			return null == t ? void 0 : t.sessionStorage.getItem(i);
		} catch (t) {
			Ao.Ft(t);
		}
		return null;
	},
	Pt(t) {
		try {
			return JSON.parse(Ao.Lt(t)) || null;
		} catch (t) {}
		return null;
	},
	$t(i, e) {
		try {
			return t?.sessionStorage.setItem(i, JSON.stringify(e)), !0;
		} catch (t) {
			Ao.Ft(t);
		}
		return !1;
	},
	Dt(i) {
		try {
			t?.sessionStorage.removeItem(i);
		} catch (t) {
			Ao.Ft(t);
		}
	}
};
var Io = class {
	constructor(t) {
		this._instance = t;
	}
	get Br() {
		return this._instance.config;
	}
	get consent() {
		return this.Wa() ? 0 : this.Ga;
	}
	isOptedOut() {
		return "always" === this.Br.cookieless_mode || this.isRejected() || -1 === this.consent && "on_reject" === this.Br.cookieless_mode;
	}
	isOptedIn() {
		return !this.isOptedOut();
	}
	isExplicitlyOptedOut() {
		return 0 === this.consent;
	}
	isRejected() {
		return 0 === this.consent || -1 === this.consent && this.Br.opt_out_capturing_by_default;
	}
	optInOut(t) {
		this.Va.$t(this.Qa, t ? 1 : 0, this.Br.cookie_expiration, this.Br.cross_subdomain_cookie, this.Br.secure_cookie);
	}
	reset() {
		this.Va.Dt(this.Qa, this.Br.cross_subdomain_cookie);
	}
	get Qa() {
		const { token: t, opt_out_capturing_cookie_prefix: i, consent_persistence_name: e } = this._instance.config;
		return e || (i ? i + t : "__ph_opt_in_out_" + t);
	}
	get Ga() {
		const t = this.Va.Lt(this.Qa);
		return V(t) ? 1 : m(G, t) ? 0 : -1;
	}
	get Va() {
		const t = this.Br.opt_out_capturing_persistence_type, i = "localStorage" === t ? mo : go, e = i.Ot() ? i : Co;
		if (!this.Ja || this.Ja !== e) {
			this.Ja = e;
			const i = "localStorage" === t ? go : mo;
			i.Lt(this.Qa) && (this.Ja.Lt(this.Qa) || this.optInOut(V(i.Lt(this.Qa))), i.Dt(this.Qa, this.Br.cross_subdomain_cookie));
		}
		return this.Ja;
	}
	Wa() {
		return !!this.Br.respect_dnt && [
			null == e ? void 0 : e.doNotTrack,
			null == e ? void 0 : e.msDoNotTrack,
			c.doNotTrack,
			null == e ? void 0 : e.globalPrivacyControl
		].some((t) => V(t));
	}
};
function Mo(t, i) {
	var e;
	const s = null == t || null === (e = t.config) || void 0 === e ? void 0 : e.get_current_url;
	if (!T(s)) return i;
	try {
		const t = s(i);
		return R(t) && t ? t : i;
	} catch (t) {
		return Ws.error("Error in get_current_url, falling back to window.location.href", t), i;
	}
}
function Fo(t) {
	var i;
	return t instanceof Element && ("__POSTHOG_TOOLBAR__" === t.id || !!(null === (i = t.closest) || void 0 === i ? void 0 : i.call(t, ".toolbar-global-fade-container")));
}
function Do(t) {
	return !!t && 1 === t.nodeType;
}
function jo(t, i) {
	return !!t && !!t.tagName && t.tagName.toLowerCase() === i.toLowerCase();
}
function Lo(t) {
	return !!t && 3 === t.nodeType;
}
function No(t) {
	return !!t && 11 === t.nodeType && Do(t.host);
}
function Bo(t) {
	return t ? y(t).split(/\s+/) : [];
}
function Uo(t, i) {
	const e = function(t) {
		var i;
		const e = typeof window > "u" ? void 0 : window, s = null == e || null === (i = e.location) || void 0 === i ? void 0 : i.href;
		return C(s) ? void 0 : Mo(t, s);
	}(i);
	return !!(e && t && t.some((t) => e.match(t)));
}
function zo(t) {
	let i = "";
	switch (typeof t.className) {
		case "string":
			i = t.className;
			break;
		case "object":
			i = (t.className && "baseVal" in t.className ? t.className.baseVal : null) || t.getAttribute("class") || "";
			break;
		default: i = "";
	}
	return Bo(i);
}
function Ho(t) {
	return M(t) ? null : y(t).split(/(\s+)/).filter((t) => bl(t)).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
}
function qo(t) {
	let i = "";
	return cl(t) && !dl(t) && t.childNodes && t.childNodes.length && Gr(t.childNodes, function(t) {
		var e;
		Lo(t) && t.textContent && (i += null !== (e = Ho(t.textContent)) && void 0 !== e ? e : "");
	}), y(i);
}
function Wo(t) {
	var i;
	return C(t.target) ? t.srcElement || null : (null === (i = t.target) || void 0 === i ? void 0 : i.shadowRoot) ? t.composedPath()[0] || null : t.target || null;
}
var Vo = [
	"a",
	"button",
	"form",
	"input",
	"select",
	"textarea",
	"label"
];
function Go(t, i) {
	const e = t.matches || t.matchesSelector || t.msMatchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.oMatchesSelector;
	try {
		return !!e && e.call(t, i);
	} catch (t) {
		return !1;
	}
}
function Ko(t, i) {
	if (C(i)) return !0;
	for (const e of t) if (i.some((t) => Go(e, t))) return !0;
	return !1;
}
function Jo(t) {
	const i = t.parentNode;
	return !(!i || !Do(i)) && i;
}
var Yo = [".ph-no-autocapture", "[data-ph-no-autocapture]"];
var Zo = [
	"next",
	"previous",
	"prev",
	">",
	"<",
	"→",
	"←",
	"›",
	"‹",
	"»",
	"«",
	"▶",
	"◀",
	"❯",
	"❮"
];
var Xo = (() => [
	...Zo,
	"+",
	"-",
	"−",
	"–"
])();
var Qo = (() => Xo.length + 10)();
var tl = [
	"button",
	"a",
	"input",
	"select",
	"textarea",
	"label"
];
var il = [
	"button",
	"link",
	"tab",
	"menuitem",
	"option"
];
var el = (t, i) => /[a-z0-9]/i.test(i) ? m(Xo, i) ? new RegExp(`\\b${i}\\b`).test(t) : t.includes(i) : t === i;
var sl = (t) => m(tl, t.tagName.toLowerCase()) || m(il, (t.getAttribute("role") || "").toLowerCase());
function nl(t) {
	let i = "", e = "";
	const s = (t) => {
		Do(t) && cl(t) && !dl(t) && (i += ` ${qo(t)}`, e = e || t.getAttribute("aria-label") || "", Gr(t.childNodes, s));
	};
	s(t), i = y(i.replace(/\s+/g, " "));
	const n = (bl(i) ? i : "").toLowerCase();
	return {
		safeText: n,
		ariaLabel: y(t.getAttribute("aria-label") || (n ? "" : e)).toLowerCase()
	};
}
var rl = [".ph-no-rageclick", ".ph-no-capture"];
var ol = [
	"",
	"text",
	"search",
	"email",
	"password",
	"url",
	"tel",
	"number"
];
function ll(t, i) {
	if (!(typeof window > "u" ? void 0 : window) || al(t)) return !1;
	let e, s, n;
	var r, o;
	if (j(i) ? (e = !!i && rl, s = void 0, n = !1) : (e = null !== (r = null == i ? void 0 : i.css_selector_ignorelist) && void 0 !== r ? r : rl, s = null == i ? void 0 : i.content_ignorelist, n = null !== (o = null == i ? void 0 : i.ignore_text_selection) && void 0 !== o && o), !1 === e) return !1;
	if (n && function(t) {
		return !(!t || !Do(t)) && (!!jo(t, "textarea") || (jo(t, "input") ? m(ol, (t.getAttribute("type") || "").toLowerCase()) : function(t) {
			var i;
			if (t.isContentEditable) return !0;
			const e = null === (i = t.getAttribute) || void 0 === i ? void 0 : i.call(t, "contenteditable");
			return "true" === e || "" === e;
		}(t)));
	}(t)) return !1;
	const { targetElementList: l, isComplete: a } = ul(t, !1);
	return !(!a || s && function(t, { safeText: i, ariaLabel: e }) {
		let s;
		if (!0 === t) s = Zo;
		else {
			if (!k(t)) return !1;
			if (t.length > Qo) return Ws.error(`[PostHog] content_ignorelist array cannot exceed ${Qo} items. Use css_selector_ignorelist for more complex matching.`), !1;
			s = t.map((t) => t.toLowerCase());
		}
		return s.some((t) => el(i, t) || el(e, t));
	}(s, function(t, i) {
		for (const t of i) if (sl(t)) return nl(t);
		for (const t of i) {
			try {
				var e;
				if ("pointer" !== (null === (e = window) || void 0 === e ? void 0 : e.getComputedStyle(t).getPropertyValue("cursor"))) break;
			} catch (t) {
				break;
			}
			const i = nl(t);
			if (i.safeText || i.ariaLabel) return i;
		}
		return nl(t);
	}(t, l)) || Ko(l, e));
}
var al = (t) => !t || jo(t, "html") || !Do(t);
var ul = (t, i) => {
	const e = typeof window > "u" ? void 0 : window;
	if (!e || al(t)) return {
		parentIsUsefulElement: !1,
		targetElementList: [],
		isComplete: !1
	};
	let s = !1;
	const n = [t];
	let r = t;
	const o = /* @__PURE__ */ new Set([t]);
	for (; !jo(r, "body");) {
		const t = r.assignedSlot || r.parentNode, l = No(t) ? t.host : t && Do(t) ? t : null;
		if (!l) break;
		if (o.has(l) || o.size >= 1e3) return {
			parentIsUsefulElement: s,
			targetElementList: n,
			isComplete: !1
		};
		if (o.add(l), No(t)) n.push(l), r = l;
		else {
			if (i || Vo.indexOf(l.tagName.toLowerCase()) > -1) s = !0;
			else try {
				const t = e.getComputedStyle(l);
				t && "pointer" === t.getPropertyValue("cursor") && (s = !0);
			} catch (t) {}
			n.push(l), r = l;
		}
	}
	return {
		parentIsUsefulElement: s,
		targetElementList: n,
		isComplete: !0
	};
};
function hl(t) {
	const i = /* @__PURE__ */ new Set();
	let e = 0, s = t;
	for (; s;) {
		if (e++ >= 1e3 || i.has(s)) return !0;
		i.add(s);
		const t = zo(s);
		if (m(t, "ph-sensitive") || m(t, "ph-no-capture")) return !0;
		const n = s.assignedSlot || s.parentNode;
		s = No(n) ? n.host : n && Do(n) ? n : null;
	}
	return !1;
}
function cl(t) {
	if (hl(t)) return !1;
	if (m(zo(t), "ph-include")) return !0;
	const i = t.type || "";
	if (R(i)) switch (i.toLowerCase()) {
		case "hidden":
		case "password": return !1;
	}
	const e = t.name || t.id || "";
	return !R(e) || !/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(e.replace(/[^a-zA-Z0-9]/g, ""));
}
function dl(t) {
	return !!(jo(t, "input") && ![
		"button",
		"checkbox",
		"submit",
		"reset"
	].includes(t.type) || jo(t, "select") || jo(t, "textarea") || "true" === t.getAttribute("contenteditable"));
}
var vl = /* @__PURE__ */ new RegExp("^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$");
var fl = /(^|[^0-9A-Za-z_])([0-9][0-9 -]*[0-9])(?=$|[^0-9A-Za-z_])/g;
var pl = [
	16,
	15,
	14,
	13
];
var gl = /* @__PURE__ */ new RegExp("^(\\d{3}-?\\d{2}-?\\d{4})$");
var _l = /* @__PURE__ */ new RegExp("(^|[^0-9])((?!000|666)[0-9]{3}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4})(?=$|([^0-9]))", "g");
var ml = /[0-9A-Za-z_]/;
function yl(t) {
	let i = 0, e = !1;
	for (let s = t.length - 1; s >= 0; s--) {
		let n = t.charCodeAt(s) - 48;
		e && (n *= 2, n > 9 && (n -= 9)), i += n, e = !e;
	}
	return i % 10 == 0;
}
function bl(t, i = !0) {
	if (M(t)) return !1;
	if (R(t)) {
		if (t = y(t), i ? vl.test((t || "").replace(/[- ]/g, "")) : function(t) {
			let i;
			for (fl.lastIndex = 0; i = fl.exec(t);) {
				const t = i[2];
				if (!t) continue;
				const e = t.replace(/[- ]/g, "");
				for (let t = 0; e.length > t; t++) for (const i of pl) {
					const s = t + i;
					if (e.length >= s) {
						const i = e.slice(t, s);
						if (vl.test(i) && yl(i)) return !0;
					}
				}
			}
			return !1;
		}(t)) return !1;
		if (i ? gl.test(t) : function(t) {
			let i;
			for (_l.lastIndex = 0; i = _l.exec(t);) {
				const t = i[1], e = i[3];
				if (!(t && e && ml.test(t) && ml.test(e))) return !0;
			}
			return !1;
		}(t)) return !1;
	}
	return !0;
}
function wl(t) {
	let i = qo(t);
	return i = `${i} ${$l(t)}`.trim(), bl(i) ? i : "";
}
function $l(t) {
	let i = "";
	return t && t.childNodes && t.childNodes.length && Gr(t.childNodes, function(t) {
		var e;
		if (t && "span" === (null === (e = t.tagName) || void 0 === e ? void 0 : e.toLowerCase())) try {
			const e = qo(t);
			i = `${i} ${e}`.trim(), t.childNodes && t.childNodes.length && (i = `${i} ${$l(t)}`.trim());
		} catch (t) {
			Ws.error("[AutoCapture]", t);
		}
	}), i;
}
function Sl(t) {
	return t.replace(/"|\\"/g, "\\\"");
}
function xl(t) {
	const i = t.attr__class;
	if (i) return k(i) ? i : Bo(i);
}
var El = Vs("[Dead Clicks]");
var kl = () => !0;
var Tl = (t) => {
	var i;
	const e = !!(null === (i = t.instance.persistence) || void 0 === i ? void 0 : i.get_property(Wn)), s = t.instance.config.capture_dead_clicks;
	return j(s) ? s : !!P(s) || e;
};
var Pl = class {
	get lazyLoadedDeadClicksAutocapture() {
		return this.Za;
	}
	constructor(t, i, e) {
		this.instance = t, this.isEnabled = i, this.onCapture = e, this.startIfEnabledOrStop();
	}
	onRemoteConfig(t) {
		if (!t.ok) return;
		const i = t.config;
		"captureDeadClicks" in i && (this.instance.persistence && this.instance.persistence.register({ [Wn]: i.captureDeadClicks }), this.startIfEnabledOrStop());
	}
	startIfEnabledOrStop() {
		this.isEnabled(this) ? this.Ka(() => {
			this.Ya();
		}) : this.stop();
	}
	Ka(t) {
		var i, e;
		(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.initDeadClicksAutocapture) ? t() : null === (e = Ys(this.instance)) || void 0 === e || e(this.instance, "dead-clicks-autocapture", (i) => {
			i ? El.error("failed to load script", i) : t();
		});
	}
	Ya() {
		var t;
		if (s) {
			if (!this.Za && (null === (t = c.__PosthogExtensions__) || void 0 === t ? void 0 : t.initDeadClicksAutocapture)) {
				const t = P(this.instance.config.capture_dead_clicks) ? bi({}, this.instance.config.capture_dead_clicks) : {};
				t.__onCapture = this.onCapture, this.onCapture && (t.capture_dead_swipes = !1), this.Za = c.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, t), this.Za.start(s), El.info("starting...");
			}
		} else El.error("`document` not found. Cannot start.");
	}
	stop() {
		this.Za && (this.Za.stop(), this.Za = void 0, El.info("stopping..."));
	}
};
var Ol = Vs("[SegmentIntegration]");
function Cl(t, i, e = !0) {
	const s = t.config.segment;
	if (!s) return i();
	const { analytics: n, filterProperties: r } = ((t) => T(t.register))(o = s) ? { analytics: o } : o;
	var o;
	(function(t, i, e, s) {
		const n = (i) => {
			const n = () => i.anonymousId() || ho();
			t.config.get_device_id = n, s && i.id() && (t.register({
				distinct_id: i.id(),
				$device_id: n()
			}), t.persistence.set_property(_r, Nr)), e(s ? void 0 : i.anonymousId() || void 0);
		}, r = i.user();
		"then" in r && T(r.then) ? r.then(n) : n(r);
	})(t, n, (e) => {
		n.register(((t, i, { filterProperties: e } = {}) => {
			"undefined" != typeof Promise && Promise.resolve || Ol.warn("This browser does not have Promise support, and can not use the segment integration");
			const s = (s, n) => {
				if (!n) return s;
				const r = !!i && s.event.anonymousId === i && !s.event.userId;
				r || s.event.userId || s.event.anonymousId === t.get_distinct_id() || (Ol.info("No userId set, resetting PostHog"), t.reset()), r || (i = void 0), s.event.userId && s.event.userId !== t.get_distinct_id() && (Ol.info("UserId set, identifying with PostHog"), t.identify(s.event.userId));
				let o = t.calculateEventProperties(n, s.event.properties);
				if (!M(e)) {
					const t = s.event.properties || {}, i = {};
					for (const e of Object.keys(o)) x.call(t, e) || (i[e] = o[e]);
					const n = ((t, i) => {
						const e = k(t) ? t : [t];
						let s = bi({}, i);
						for (const t of e) try {
							if (s = t(s), M(s)) return null;
						} catch (t) {
							return Ol.error("Error in Segment filterProperties:", t), null;
						}
						return s;
					})(e, i);
					if (M(n)) return s;
					o = n;
				}
				return s.event.properties = Object.assign({}, o, s.event.properties), s;
			};
			return {
				name: "PostHog JS",
				type: "enrichment",
				version: "1.0.0",
				isLoaded() {
					return !0;
				},
				load() {
					return Promise.resolve();
				},
				track(t) {
					return s(t, t.event.event);
				},
				page(t) {
					return s(t, zr);
				},
				identify(t) {
					return s(t, qr);
				},
				screen(t) {
					return s(t, "$screen");
				}
			};
		})(t, e, { filterProperties: r })).then(() => {
			i();
		}, (t) => {
			Ol.error("Failed to register the Segment integration", t), i();
		});
	}, e);
}
var Rl = "posthog-js";
function Al(t, { organization: i, projectId: e, prefix: s, severityAllowList: n = ["error"], sendExceptionsToPostHog: r = !0 } = {}) {
	return (o) => {
		var l, a, u, h, c;
		if ("*" !== n && !n.includes(o.level) || !t.__loaded) return o;
		o.tags || (o.tags = {});
		const d = t.requestRouter.endpointFor("ui", `/project/${t.config.token}/person/${t.get_distinct_id()}`);
		o.tags["PostHog Person URL"] = d, t.sessionRecordingStarted() && (o.tags["PostHog Recording URL"] = t.get_session_replay_url({ withTimestamp: !0 }));
		const v = (null === (l = o.exception) || void 0 === l ? void 0 : l.values) || [], f = v.map((t) => bi(bi({}, t), {}, { stacktrace: t.stacktrace ? bi(bi({}, t.stacktrace), {}, {
			type: "raw",
			frames: (t.stacktrace.frames || []).map((t) => bi(bi({}, t), {}, { platform: "web:javascript" }))
		}) : void 0 })), p = {
			$exception_message: (null === (a = v[0]) || void 0 === a ? void 0 : a.value) || o.message,
			$exception_type: null === (u = v[0]) || void 0 === u ? void 0 : u.type,
			$exception_level: o.level,
			$exception_list: f,
			$sentry_event_id: o.event_id,
			$sentry_exception: o.exception,
			$sentry_exception_message: (null === (h = v[0]) || void 0 === h ? void 0 : h.value) || o.message,
			$sentry_exception_type: null === (c = v[0]) || void 0 === c ? void 0 : c.type,
			$sentry_tags: o.tags
		};
		var g;
		return i && e && (p.$sentry_url = (s || "https://sentry.io/organizations/") + i + "/issues/?project=" + e + "&query=" + o.event_id), r && (null === (g = t.exceptions) || void 0 === g || g.sendExceptionEvent(p)), o;
	};
}
var Il = class {
	constructor(t, i, e, s, n, r) {
		this.name = Rl, this.setupOnce = function(o) {
			o(Al(t, {
				organization: i,
				projectId: e,
				prefix: s,
				severityAllowList: n,
				sendExceptionsToPostHog: null == r || r
			}));
		};
	}
};
var Ml = class {
	constructor(t) {
		this.Xa = (t, i, e) => {
			e && (e.noSessionId || e.activityTimeout || e.sessionPastMaximumLength || e.crossTabAdoption) && (Ws.info("[PageViewManager] Session rotated, clearing pageview state", {
				sessionId: t,
				changeReason: e
			}), this.tu = void 0, this._instance.scrollManager.resetContext());
		}, this._instance = t, this.eu();
	}
	eu() {
		var t;
		this.iu = null === (t = this._instance.sessionManager) || void 0 === t ? void 0 : t.onSessionId(this.Xa);
	}
	destroy() {
		var t;
		null === (t = this.iu) || void 0 === t || t.call(this), this.iu = void 0;
	}
	doPageView(i, e) {
		var s;
		const n = this.nu(i, e);
		return this.tu = {
			pathname: null !== (s = null == t ? void 0 : t.location.pathname) && void 0 !== s ? s : "",
			pageViewId: e,
			timestamp: i
		}, this._instance.scrollManager.resetContext(), n;
	}
	doPageLeave(t) {
		var i;
		return this.nu(t, null === (i = this.tu) || void 0 === i ? void 0 : i.pageViewId);
	}
	doEvent() {
		var t;
		return { $pageview_id: null === (t = this.tu) || void 0 === t ? void 0 : t.pageViewId };
	}
	nu(t, i) {
		const e = this.tu;
		if (!e) return { $pageview_id: i };
		let s = {
			$pageview_id: i,
			$prev_pageview_id: e.pageViewId
		};
		const n = this._instance.scrollManager.getContext();
		if (n && !this._instance.config.disable_scroll_properties) {
			let { maxScrollHeight: t, lastScrollY: i, maxScrollY: e, maxContentHeight: r, lastContentY: o, maxContentY: l } = n;
			if (!(C(t) || C(i) || C(e) || C(r) || C(o) || C(l))) {
				t = Math.ceil(t), i = Math.ceil(i), e = Math.ceil(e), r = Math.ceil(r), o = Math.ceil(o), l = Math.ceil(l);
				const n = t > 1 ? Q(i / t, 0, 1, Ws) : 1, a = t > 1 ? Q(e / t, 0, 1, Ws) : 1, u = r > 1 ? Q(o / r, 0, 1, Ws) : 1, h = r > 1 ? Q(l / r, 0, 1, Ws) : 1;
				s = Kr(s, {
					$prev_pageview_last_scroll: i,
					$prev_pageview_last_scroll_percentage: n,
					$prev_pageview_max_scroll: e,
					$prev_pageview_max_scroll_percentage: a,
					$prev_pageview_last_content: o,
					$prev_pageview_last_content_percentage: u,
					$prev_pageview_max_content: l,
					$prev_pageview_max_content_percentage: h
				});
			}
		}
		return e.pathname && (s.$prev_pageview_pathname = e.pathname), e.timestamp && (s.$prev_pageview_duration = (t.getTime() - e.timestamp.getTime()) / 1e3), s;
	}
};
var Fl = ["flags", "surveys"];
var Dl = {
	[On]: { exposure: "hidden" },
	[In]: { exposure: "hidden" },
	[Mn]: { exposure: "hidden" },
	[Nn]: { exposure: "hidden" },
	[Dn]: { exposure: "hidden" },
	[Ln]: { exposure: "hidden" },
	[$n]: { exposure: "event" },
	[Bn]: { exposure: "hidden" },
	[Gn]: { exposure: "hidden" },
	[Un]: { exposure: "event" },
	[zn]: { exposure: "hidden" },
	[Hn]: { exposure: "event" },
	[qn]: { exposure: "event" },
	[Wn]: { exposure: "event" },
	[Vn]: { exposure: "hidden" },
	[Kn]: { exposure: "event" },
	[Jn]: { exposure: "hidden" },
	[Yn]: { exposure: "hidden" },
	[er]: { exposure: "hidden" },
	[sr]: { exposure: "event" },
	[Zn]: {
		exposure: "event",
		shouldSkipFromEventProperties: (t) => I(t)
	},
	[nr]: { exposure: "event" },
	[rr]: { exposure: "event" },
	[or]: { exposure: "event" },
	[lr]: { exposure: "event" },
	[ar]: { exposure: "hidden" },
	[vn]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[ln]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[on]: { exposure: "hidden" },
	[an]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[mn]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[cn]: {
		exposure: "hidden",
		storageGroup: "flags",
		volatile: !0
	},
	[dn]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[yn]: { exposure: "hidden" },
	[bn]: { exposure: "hidden" },
	[pn]: { exposure: "hidden" },
	[fn]: { exposure: "hidden" },
	[Sn]: {
		exposure: "hidden",
		storageGroup: "surveys"
	},
	[xn]: {
		exposure: "hidden",
		storageGroup: "surveys",
		volatile: !0
	},
	[kn]: { exposure: "event" },
	[Tn]: { exposure: "hidden" },
	[Pn]: { exposure: "hidden" },
	[hr]: { exposure: "hidden" },
	[cr]: { exposure: "hidden" },
	[dr]: { exposure: "hidden" },
	[vr]: { exposure: "event" },
	[fr]: { exposure: "event" },
	[pr]: { exposure: "event" },
	[gr]: { exposure: "event" },
	[gn]: { exposure: "hidden" },
	[_n]: { exposure: "hidden" },
	[ur]: { exposure: "event" },
	[un]: { exposure: "hidden" },
	[hn]: {
		exposure: "hidden",
		storageGroup: "flags",
		volatile: !0
	},
	[_r]: { exposure: "hidden" },
	[mr]: { exposure: "hidden" },
	[yr]: { exposure: "hidden" },
	[br]: { exposure: "hidden" },
	[wr]: { exposure: "hidden" },
	[$r]: { exposure: "hidden" },
	[Sr]: { exposure: "hidden" },
	[Xn]: { exposure: "event" },
	[Qn]: { exposure: "event" },
	[tr]: { exposure: "event" },
	[ir]: { exposure: "event" },
	[kr]: { exposure: "event" },
	[Tr]: { exposure: "event" },
	[Pr]: { exposure: "hidden" },
	[Or]: { exposure: "hidden" },
	[Cr]: { exposure: "hidden" },
	[Rr]: { exposure: "hidden" },
	[Ar]: { exposure: "hidden" },
	[Ir]: { exposure: "hidden" },
	[Mr]: { exposure: "hidden" },
	[Fr]: { exposure: "hidden" },
	[Dr]: { exposure: "hidden" },
	[jr]: { exposure: "event" }
};
var jl = [
	["$posthog_sr_group_event_trigger_", { exposure: "hidden" }],
	["$posthog_sr_group_url_trigger_", { exposure: "hidden" }],
	["$posthog_sr_group_sampling_", { exposure: "hidden" }]
];
var Ll = (t) => {
	const i = Dl[t];
	if (i) return i;
	for (const [i, e] of jl) if (0 === t.indexOf(i)) return e;
};
function Nl() {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	} catch (t) {
		return;
	}
}
var Bl = (t) => {
	const i = typeof document > "u" ? void 0 : document, e = null == i ? void 0 : i.createElement("a");
	return C(e) ? null : (e.href = t, e);
};
var Ul = () => {
	try {
		return "u" > typeof window && !1 !== window.navigator.onLine;
	} catch (t) {
		return !1;
	}
};
var zl = (t, i) => t >= i && Ul();
var Hl = (t, i, e, s) => {
	if (0 === t) {
		if (Ul()) {
			const t = i + 1;
			return t === e && s(), t;
		}
		return i;
	}
	return 0;
};
var ql = (t, i) => {
	try {
		let e;
		return JSON.stringify(t, (t, i) => {
			var s;
			return z(i) ? (null !== (s = e) && void 0 !== s || (e = /* @__PURE__ */ new WeakMap()), e.has(i) || e.set(i, Xr(i)), e.get(i)) : "bigint" == typeof i ? i.toString() : i;
		}, i);
	} catch (i) {
		return w(t);
	}
};
var Wl = function(t, i) {
	const e = ((t.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&");
	let s;
	for (let t = 0; e.length > t; t++) {
		const n = e[t].split(/=(.*)/);
		if (n[0] === i) {
			s = n;
			break;
		}
	}
	if (!k(s) || 2 > s.length) return "";
	{
		let t = s[1].replace(/\+/g, " ");
		try {
			t = decodeURIComponent(t);
		} catch (i) {
			Ws.error("Skipping decoding for malformed query param: " + t);
		}
		return t;
	}
};
var Vl = function(t, i, e) {
	if (!t || !i || !i.length) return t;
	const s = t.split(/#(.*)/), n = s[1], r = (s[0] || "").split(/\?(.*)/), o = r[1], l = r[0], a = (o || "").split("&"), u = [];
	for (let t = 0; a.length > t; t++) {
		const s = a[t].split("?");
		let n = 0;
		for (; s.length > n && !i.includes(s[n].split("=")[0]);) n++;
		u.push(s.length > n ? s.slice(0, n).concat(s[n].split("=")[0] + "=" + e).join("?") : a[t]);
	}
	let h = l;
	return null != o && (h += "?" + u.join("&")), null != n && (h += "#" + n), h;
};
var Gl = function(t, i) {
	const e = t.match(new RegExp(i + "=([^&]*)"));
	return e ? e[1] : null;
};
var Kl = [
	"gclid",
	"gclsrc",
	"dclid",
	"gbraid",
	"wbraid",
	"fbclid",
	"msclkid",
	"twclid",
	"li_fat_id",
	"igshid",
	"ttclid",
	"rdt_cid",
	"epik",
	"qclid",
	"sccid",
	"oppref",
	"bfcid",
	"irclid",
	"_kx"
];
var Jl = ["ScCid", "SsCid"];
var Yl = { sccid: Jl };
var Zl = (() => [
	...Kl,
	...Jl,
	"sscid"
])();
var Xl = (() => [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_content",
	"utm_term",
	"gad_source",
	"mc_cid",
	...Kl
])();
var Ql = "<masked>";
var ta = ["li_fat_id"];
function ia(t, i, e) {
	if (!s) return {};
	const n = i ? [...Zl, ...e || []] : [], r = ea(Vl(s.URL, n, Ql), t);
	return Kr(function() {
		const t = {};
		return Gr(ta, function(i) {
			const e = so(i);
			t[i] = e || null;
		}), t;
	}(), r);
}
function ea(t, i) {
	const e = Xl.concat(i || []), s = {};
	return Gr(e, function(i) {
		let e = Wl(t, i);
		!e && x.call(Yl, i) && Vr(Yl[i], function(i) {
			e = e || Wl(t, i);
		}), s[i] = e || null;
	}), s;
}
function sa(t) {
	const i = function(t) {
		return t ? 0 === t.search("https?://(.*)google.([^/?]*)") ? "google" : 0 === t.search("https?://(.*)bing.com") ? "bing" : 0 === t.search("https?://(.*)yahoo.com") ? "yahoo" : 0 === t.search("https?://(.*)duckduckgo.com") ? "duckduckgo" : null : null;
	}(t), e = "yahoo" != i ? "q" : "p", n = {};
	if (!I(i)) {
		n.$search_engine = i;
		const t = s ? Wl(s.referrer, e) : "";
		t.length && (n.ph_keyword = t);
	}
	return n;
}
function na() {
	return navigator.language || navigator.userLanguage;
}
function ra() {
	const t = na();
	return "string" == typeof t ? t.split("-")[0] : void 0;
}
var oa = "$direct";
function la() {
	return (null == s ? void 0 : s.referrer) || oa;
}
function aa(t, i, e = !1) {
	const s = t ? [...Zl, ...i || []] : [], r = e ? di(null == n ? void 0 : n.href) : null == n ? void 0 : n.href, o = null == r ? void 0 : r.substring(0, 1e3);
	return {
		r: la().substring(0, 1e3),
		u: o ? Vl(o, s, Ql) : void 0
	};
}
function ua(t, i = !1, e, s) {
	var n;
	const { r, u: o } = t, l = i ? di(o) : o, a = l && e ? Vl(l, [...Zl, ...s || []], Ql) : l, u = {
		$referrer: r,
		$referring_domain: null == r ? void 0 : r == oa ? oa : null === (n = Bl(r)) || void 0 === n ? void 0 : n.host
	};
	if (a) {
		u.$current_url = a;
		const t = Bl(a);
		u.$host = null == t ? void 0 : t.host, u.$pathname = null == t ? void 0 : t.pathname, Kr(u, ea(a));
	}
	if (r) Kr(u, sa(r));
	return u;
}
function ha() {
	try {
		return (/* @__PURE__ */ new Date()).getTimezoneOffset();
	} catch (t) {
		return;
	}
}
var ca = {
	flags: hn,
	surveys: xn
};
var da = [
	"cookie",
	"localstorage",
	"localstorage+cookie",
	"sessionstorage",
	"memory"
];
var va = (t) => `${t}_cookie_identity_change_pending`;
var fa = (t) => {
	let i = "", e = 0;
	for (const s of t) {
		const t = encodeURIComponent(JSON.stringify(s).slice(1, -1)).length;
		if (e + t > 1e3) break;
		i += s, e += t;
	}
	return i;
};
var pa = "main";
var ga = [
	vn,
	ln,
	an,
	mn,
	cn,
	hn,
	dn,
	pn
];
var _a$1 = (t) => -1 !== ga.indexOf(t);
var ma = [Dn, Ln];
var ya = (t) => -1 !== ma.indexOf(t);
var ba = (t, i) => {
	try {
		return JSON.stringify(t) === JSON.stringify(i);
	} catch (e) {
		return t === i;
	}
};
var wa = (t) => {
	if (!t) return {};
	const i = JSON.parse(t);
	return P(i) ? i : {};
};
var $a = (t, i) => {
	Gr(t, (e, s) => {
		const n = Ll(s);
		n && "event" !== n.exposure || {}.hasOwnProperty.call(i, s) || delete t[s];
	});
};
var Sa = class {
	constructor(i, e, s = !0, n = !i.cookieless_mode) {
		if (this.su = {}, this.ru = !1, this.ou = !1, this.lu = !1, this.au = !1, this.uu = !1, this.cu = /* @__PURE__ */ new Map(), this.hu = !1, this.du = !1, this.vu = !1, this.fu = /* @__PURE__ */ new Set(), this.pu = /* @__PURE__ */ new Set(), this.Br = i, this.gu = s, this.props = {}, this.mu = void 0, this.yu = ((t) => {
			let i = "";
			return t.token && (i = t.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), t.persistence_name ? "ph_" + t.persistence_name : "ph_" + i + "_posthog";
		})(i), this.gi = i.disable_persistence || !!e, this.Va = this.bu(i), this.lu = this._u(i), this.load(n), this.wu(), i.debug && Ws.info("Persistence loaded", i.persistence, bi({}, this.props)), this.update_config(i, i, e), this.save(), t) {
			const i = () => this.flush();
			io(t, "beforeunload", i, { capture: !1 }), io(t, "pagehide", i, { capture: !1 }), this.ku = (i) => {
				if (this.ru && (!i.storageArea || i.storageArea === (null == t ? void 0 : t.localStorage)) && i.key) if (i.key !== this.yu) {
					if (this.lu) {
						const t = Fl.find((t) => i.key === this.Su(t));
						t && this.xu(i.key, t);
					}
				} else this.xu(i.key, pa);
			}, io(t, "storage", this.ku);
		}
	}
	reconcileFeatureFlagsBeforeMerge() {
		return !(this.gi || this.uu || this.hu) && this.$u();
	}
	markCrossTabFeatureFlagChanges(t) {
		Object.entries(t).forEach(([t, i]) => {
			const e = this.cu.get(t);
			if (!_a$1(t) || !0 === e) return;
			if (!0 === i) return void this.Cu(t, !0);
			const s = new Set(e || []);
			i.forEach((t) => s.add(t)), s.size && this.Cu(t, s);
		});
	}
	onCrossTabFeatureFlagChange(t) {
		return this.pu.add(t), () => this.pu.delete(t);
	}
	destroy() {
		this.ku && t && (t.removeEventListener("storage", this.ku), this.ku = void 0), this.pu.clear();
	}
	xu(t, i, e = !0) {
		if (this.gi) return !1;
		let s, n;
		try {
			if (n = mo.Lt(t), I(n)) {
				const t = this.Tu(i);
				return t.storageValue = null, i !== pa ? t.persisted = !1 : this.Mu({}), !1;
			}
			s = wa(n);
		} catch (t) {
			return !1;
		}
		i === pa && this.Mu(s);
		const r = i === pa ? s : mo.Pt(this.yu);
		if (r && this.Iu(r)) return !1;
		const o = this.Eu(s, i, e);
		return i === pa && this.lu && !ba(this.Au().main, s) || this.Ru(s, i, !0, n), o;
	}
	Iu(t) {
		const i = this.props[Cn], e = t[Cn];
		return !C(i) && !C(e) && i !== e;
	}
	Ru(t, i, e, s) {
		const n = this.Tu(i);
		n.storageValue = s, i !== pa && (n.persisted = e);
		try {
			n.fingerprint = this.Pu(t, i);
		} catch (t) {
			n.fingerprint = void 0;
		}
	}
	Eu(t, i, e) {
		let s = !1;
		return ga.forEach((e) => {
			var n;
			const r = null === (n = Ll(e)) || void 0 === n ? void 0 : n.storageGroup;
			if (i === pa && this.lu && r || i !== pa && r !== i) return;
			const o = e in t, l = this.Ou(e, o ? t[e] : void 0), a = this.cu.has(e) ? e in this.props : o;
			a === e in this.props && ba(l, this.props[e]) || (a ? this.Fu(e, l, !1) : this.Lu(e, !1), s = !0);
		}), s && e && this.pu.forEach((t) => t()), s;
	}
	Mu(t) {
		const i = this.ou && this.Br.cookieWinsOnConflict ? [...bo, ...this.Br.cookie_persisted_properties || []] : [];
		ma.forEach((e) => {
			this.fu.has(e) || -1 !== i.indexOf(e) || (e in t ? ba(t[e], this.props[e]) || this.Fu(e, t[e], !1) : e in this.props && this.Lu(e, !1));
		});
	}
	Du() {
		return this.ou && this.ru && !this.Br.cookieWinsOnConflict;
	}
	Nu() {
		if (!this.Du()) return;
		let t, i;
		try {
			t = go.Lt(this.yu) || void 0;
		} catch (t) {
			return;
		}
		if (t && t !== this.ju) {
			this.ju = t;
			try {
				i = So(JSON.parse(t));
			} catch (t) {
				return;
			}
			ma.forEach((t) => {
				!(t in i) || t in this.props || this.fu.has(t) || this.Fu(t, i[t], !1);
			});
		}
	}
	qu(t) {
		if (this.Du()) try {
			const i = JSON.stringify(xo(t, this.Br.cookie_persisted_properties || [])), e = go.Lt(this.yu) || void 0;
			e === i && (this.ju = e);
		} catch (t) {}
	}
	$u() {
		if (!this.ru) return !1;
		try {
			this.vu = !1;
			const t = mo.Lt(this.yu), i = this.Tu(pa);
			let e, s = !1, n = !1;
			if (t !== i.storageValue) if (I(t)) R(i.storageValue) && this.Mu({}), i.storageValue = null;
			else {
				if (e = wa(t), this.Mu(e), this.vu = !this.du && this.Iu(e), this.vu) return !1;
				n = this.Eu(e, pa, !1), !this.lu || ba(this.Au().main, e) ? this.Ru(e, pa, !0, t) : i.storageValue = t, s = !0;
			}
			return this.lu && Fl.forEach((t) => {
				const i = mo.Lt(this.Su(t)), r = this.Tu(t), o = e || {}, l = s && ga.some((i) => {
					var e;
					return (null === (e = Ll(i)) || void 0 === e ? void 0 : e.storageGroup) === t && i in o;
				});
				if (i === r.storageValue && !l) return;
				if (I(i)) return r.storageValue = null, r.persisted = !1, void (l && (n = this.Eu(o, t, !1) || n));
				const a = wa(i);
				n = this.Eu(a, t, !1) || n, this.Ru(a, t, !0, i);
			}), n;
		} catch (t) {
			return !1;
		}
	}
	Cu(t, i) {
		this.cu.set(t, i);
		const e = Ll(t);
		null != e && e.volatile || (this.Tu((this.lu ? null == e ? void 0 : e.storageGroup : void 0) || pa).fingerprint = void 0, this.Bu(t));
	}
	zu() {
		ga.forEach((t) => this.cu.set(t, !0));
	}
	wu() {
		if (this.ru) try {
			const t = mo.Lt(this.yu), i = wa(t);
			this.Tu(pa).storageValue = t, ga.forEach((t) => {
				var e;
				const s = this.lu ? null === (e = Ll(t)) || void 0 === e ? void 0 : e.storageGroup : void 0, n = s ? mo.Lt(this.Su(s)) : null;
				if (s) {
					const t = this.Tu(s);
					t.storageValue = n, t.persisted = !I(n);
				}
				const r = s && !I(n) ? wa(n) : i;
				t in this.props ? this.Hu(t, r[t], this.props[t]) : t in r && this.Cu(t, !0);
			});
		} catch (t) {}
	}
	Ou(t, i) {
		const e = this.cu.get(t);
		if (!e) return i;
		if (!0 === e) return this.props[t];
		if ("$active_feature_flags" === t) {
			const s = new Set(k(i) ? i : []), n = new Set(k(this.props[t]) ? this.props[t] : []);
			return e.forEach((t) => n.has(t) ? s.add(t) : s.delete(t)), Array.from(s);
		}
		const s = P(i) ? bi({}, i) : {}, n = P(this.props[t]) ? this.props[t] : {};
		return e.forEach((t) => {
			t in n ? s[t] = n[t] : delete s[t];
		}), s;
	}
	Hu(t, i, e) {
		if (!_a$1(t)) return;
		const s = this.cu.get(t);
		if (!0 === s) return;
		let n = i;
		if (this.ru) try {
			var r;
			const i = this.lu ? null === (r = Ll(t)) || void 0 === r ? void 0 : r.storageGroup : void 0, e = i ? this.Su(i) : this.yu;
			n = wa(mo.Lt(e))[t];
		} catch (t) {}
		const o = new Set(s || []);
		if ("$active_feature_flags" === t) {
			if (!C(i) && !k(i) || !C(n) && !k(n) || !k(e)) return void this.Cu(t, !0);
			const s = new Set(i || []), r = new Set(n || []), l = new Set(e);
			(/* @__PURE__ */ new Set([...s, ...l])).forEach((t) => {
				s.has(t) !== l.has(t) && o.add(t);
			}), o.forEach((t) => {
				r.has(t) === l.has(t) && o.delete(t);
			});
		} else {
			if (!P(e)) return void (ba(n, e) ? this.cu.delete(t) : this.Cu(t, !0));
			{
				if (!C(i) && !P(i) || C(i) && O(e) && C(n)) return void this.Cu(t, !0);
				const s = P(i) ? i : {}, r = P(n) ? n : {};
				(/* @__PURE__ */ new Set([...Object.keys(s), ...Object.keys(e)])).forEach((t) => {
					t in s == t in e && ba(s[t], e[t]) || o.add(t);
				}), o.forEach((t) => {
					t in r == t in e && ba(r[t], e[t]) && o.delete(t);
				});
			}
		}
		o.size ? this.Cu(t, o) : this.cu.delete(t);
	}
	Uu() {
		var t;
		const i = null === (t = this.Br) || void 0 === t ? void 0 : t.persistence_save_debounce_ms;
		return F(i) && i > 0 ? i : 0;
	}
	Wu(t) {
		if (this.Br.cookieWinsOnConflict && "localstorage+cookie" === this.Br.persistence.toLowerCase()) if (t) try {
			const i = xo(t, this.Br.cookie_persisted_properties || []), e = ko(i, this.Br.cookie_persisted_properties || []), s = JSON.stringify(i) + "|" + JSON.stringify(e), n = go.Lt(this.yu) || void 0;
			n && Po(this.yu, n) === s && (this.Gu = s, this.Vu = n);
		} catch (t) {}
		else try {
			const t = go.Lt(this.yu) || void 0;
			this.Gu = t ? Po(this.yu, t) : void 0, this.Vu = t;
		} catch (t) {}
	}
	syncCookieProperties() {
		return this.Qu(this.Br);
	}
	Qu(t, i = !1) {
		if (this.gi && !i || this.uu || !t.cookieWinsOnConflict || "localstorage+cookie" !== t.persistence.toLowerCase()) return !1;
		let e;
		try {
			e = go.Lt(this.yu) || void 0;
		} catch (t) {}
		if (!e || e === this.Vu) return !1;
		const s = Po(this.yu, e);
		let n;
		try {
			n = So(JSON.parse(e));
		} catch (t) {
			return !1;
		}
		if ((go.Lt(this.yu) || void 0) !== e) return !1;
		this.Gu = s, this.Vu = e;
		const r = To(this.yu, e), o = [...bo, ...r.properties], l = {};
		if (Object.keys(n).forEach((t) => {
			const i = n[t];
			(C(i) || I(i) || "" === i || "$user_state" === t && "anonymous" !== i && "identified" !== i) && (l[t] = !0, delete n[t]);
		}), O(n)) return !1;
		const a = "distinct_id" in n || "anonymous" === n.$user_state || "identified" === n.$user_state, u = this.props, h = u[Cn], c = u[_r], d = Kr({}, u);
		[...bo, ...t.cookie_persisted_properties || []].forEach((t) => {
			if (-1 !== o.indexOf(t) && !(t in n) && !l[t] && (a || "distinct_id" !== t && "$user_state" !== t)) {
				const i = d[t];
				(r.isValid || -1 === bo.indexOf(t) || !1 !== i && 0 !== i) && delete d[t];
			}
		}), this.props = Kr(d, n), ga.forEach((t) => {
			const i = t in this.props;
			t in u === i && ba(u[t], this.props[t]) || (i ? this.Hu(t, u[t], this.props[t]) : this.Cu(t, !0));
		}), !a || "$user_state" in n || "$user_state" in this.props || this.Fu(_r, Lr);
		const v = this.props[Cn], f = this.props[_r];
		return !a || v === h && f === c || (this.du = !0, this.au = !0, Ao.$t(va(this.yu), !0), this.Lu(pn), this.Lu(ln), this.Lu(vn), this.Lu(an), this.Lu(mn), this.Lu(cn), this.Lu(hn), this.Lu(un), this.Lu(gn), "anonymous" !== f || "identified" !== c && "anonymous" !== n.$user_state && (C(h) || v === h) || ($a(this.props, n), this.Lu(fn)), "identified" === f ? this.props.$user_id = v : delete this.props.$user_id, this.Lu(In)), !0;
	}
	consumeCookieIdentityChange() {
		const t = va(this.yu), i = this.au || !!Ao.Lt(t);
		return this.au = !1, i && Ao.Dt(t), i;
	}
	Ju(t = !1) {
		return !(this.uu || this.gi && !t || !this.Br.cookieWinsOnConflict || "localstorage+cookie" !== this.Br.persistence.toLowerCase() || (this.uu = !0, 0));
	}
	Zu() {
		this.uu && (C(this.Ku) || (clearTimeout(this.Ku), this.Ku = void 0), delete this.su[pa], this.Yu(!0));
	}
	Xu(t = !0) {
		if (this.uu) try {
			t ? this.Zu() : C(this.Ku) || (clearTimeout(this.Ku), this.Ku = void 0);
		} finally {
			this.uu = !1;
		}
	}
	isDisabled() {
		return !!this.gi;
	}
	bu(i) {
		-1 === da.indexOf(i.persistence.toLowerCase()) && (Ws.critical("Unknown persistence type " + i.persistence + "; falling back to localStorage+cookie"), i.persistence = "localStorage+cookie");
		const e = ((i = [], e = !1, s = () => !1) => {
			const n = [...bo, ...i];
			return bi(bi({}, mo), {}, {
				Pt(t) {
					try {
						let r, o = {};
						try {
							r = go.Lt(t) || void 0, o = r ? So(JSON.parse(r)) : {};
						} catch (t) {}
						const l = JSON.parse(mo.Lt(t) || "{}");
						let a;
						if (e) {
							const e = To(t, r), s = [...bo, ...e.properties], u = {};
							Object.keys(o).forEach((t) => {
								const i = o[t];
								I(i) || "" === i || "$user_state" === t && "anonymous" !== i && "identified" !== i || (u[t] = i);
							});
							const h = "distinct_id" in u || "anonymous" === u.$user_state || "identified" === u.$user_state;
							if (Object.keys(u).length > 0) {
								var i;
								const t = l[Cn], r = null !== (i = l.$user_state) && void 0 !== i ? i : Lr;
								n.forEach((t) => {
									if (-1 !== s.indexOf(t) && !(t in o) && (h || "distinct_id" !== t && "$user_state" !== t)) {
										const i = l[t];
										(e.isValid || -1 === bo.indexOf(t) || !1 !== i && 0 !== i) && delete l[t];
									}
								}), !h || "$user_state" in o || "$user_state" in l || (l[_r] = Lr), !h || ("distinct_id" in u ? u[Cn] : l[Cn]) === t && ("$user_state" in u ? u[_r] : l[_r]) === r || (yo.forEach((t) => delete l[t]), "identified" === u.$user_state && "distinct_id" in u ? l.$user_id = u[Cn] : delete l.$user_id, "identified" !== u.$user_state && (delete l[ur], delete l[fn]), delete l.__alias);
							}
							a = Kr(l, u);
						} else a = Kr(o, l);
						return s() || mo.$t(t, a), a;
					} catch (t) {}
					return null;
				},
				$t(t, s, n, r, o, l) {
					const a = mo.$t(t, s, void 0, void 0, l);
					try {
						const u = xo(s, i);
						if (Object.keys(u).length) {
							if (e) {
								const e = wo(t), h = ko(u, i);
								if (go.$t(e, h, n, r, o, l), go.Lt(e) !== JSON.stringify(h)) {
									go.Dt(e, r);
									const i = xo(s);
									return go.$t(t, i, n, r, o, l), a;
								}
							}
							go.$t(t, u, n, r, o, l);
						}
					} catch (t) {
						mo.Ft(t);
					}
					return a;
				},
				Dt(i, e) {
					try {
						t?.localStorage.removeItem(i), go.Dt(i, e), go.Dt(wo(i), e);
					} catch (t) {
						mo.Ft(t);
					}
				}
			});
		})(i.cookie_persisted_properties || [], i.cookieWinsOnConflict, () => !!this.gi);
		let s, n = !1, r = !1;
		const o = i.persistence.toLowerCase();
		return "localstorage" === o && mo.Ot() ? (s = mo, r = !0) : "localstorage+cookie" === o && e.Ot() ? (s = e, r = !0, n = !0) : "sessionstorage" === o && Ao.Ot() ? s = Ao : "memory" === o ? s = Co : "cookie" === o && go.Ot() ? (s = go, n = !0) : e.Ot() ? (s = e, r = !0, n = !0) : go.Ot() ? (s = go, n = !0) : s = Co, this.ru = r, this.ou = n, s;
	}
	Su(t) {
		return `${this.yu}__${t}`;
	}
	_u(t) {
		return this.ru && !!t.split_storage;
	}
	properties() {
		const t = {};
		return Gr(this.props, (i, e) => {
			const s = Ll(e);
			if (!s || "event" === s.exposure) {
				var n;
				if (null == s || null === (n = s.shouldSkipFromEventProperties) || void 0 === n ? void 0 : n.call(s, i)) return;
				t[e] = i;
			}
		}), t;
	}
	load(t = !1) {
		if (this.gi && !t) return;
		const i = this.Br.cookieWinsOnConflict && "localstorage+cookie" === this.Br.persistence.toLowerCase(), e = i ? mo.Pt(this.yu) : null;
		let s = {};
		if (i) try {
			s = So(go.Pt(this.yu)), Gr(s, (t, i) => {
				(C(t) || I(t) || "" === t) && delete s[i];
			});
		} catch (t) {}
		const n = this.Va.Pt(this.yu);
		if (n && (this.props = Kr({}, n)), this.lu && this.tc(), i && n) {
			var r, o;
			const t = null == e ? void 0 : e[Cn], i = null !== (r = null == e ? void 0 : e.$user_state) && void 0 !== r ? r : Lr, l = n[Cn], a = null !== (o = n.$user_state) && void 0 !== o ? o : Lr;
			if (l !== t || a !== i) {
				this.au = !0, this.gi || Ao.$t(va(this.yu), !0);
				const e = Kr({}, this.props);
				yo.forEach((t) => delete e[t]), "anonymous" !== a || "identified" !== i && "anonymous" !== s.$user_state && (C(t) || l === t) || ($a(e, s), delete e[fn]), this.props = e;
				const n = /* @__PURE__ */ new Set();
				yo.forEach((t) => {
					var i;
					const e = null === (i = Ll(t)) || void 0 === i ? void 0 : i.storageGroup;
					e && n.add(e);
				}), n.forEach((t) => {
					if (this.gi) return;
					const i = {};
					Gr(this.props, (e, s) => {
						var n;
						(null === (n = Ll(s)) || void 0 === n ? void 0 : n.storageGroup) === t && (i[s] = e);
					}), O(i) ? (mo.Dt(this.Su(t)), this.su[t] = {}) : mo.$t(this.Su(t), i) && (this.su[t] = {
						persisted: !0,
						fingerprint: this.Pu(i, t)
					});
				});
			}
		}
		Ao.Lt(va(this.yu)) && (this.au = !0);
	}
	tc() {
		for (const t of Fl) {
			const i = mo.Pt(this.Su(t));
			if (i && !O(i)) {
				const e = this.Tu(t);
				e.persisted = !0, this.ec(t) || (e.fingerprint = this.Pu(i, t)), this.nc(t, i) || Kr(this.props, i);
			}
		}
	}
	ec(t) {
		return Object.keys(this.props).some((i) => {
			var e;
			return (null === (e = Ll(i)) || void 0 === e ? void 0 : e.storageGroup) === t;
		});
	}
	nc(t, i) {
		const e = ca[t];
		if (!e) return !1;
		const s = i[e], n = this.props[e];
		return F(s) && F(n) && n > s;
	}
	refreshKey(t) {
		this.sc([t]);
	}
	sc(t) {
		if (this.gi) return;
		let i, e = !1;
		const s = () => (e || (i = this.Va.Pt(this.yu), e = !0), i);
		t.forEach((t) => {
			var i;
			if (this.fu.has(t)) return;
			const e = this.lu ? null === (i = Ll(t)) || void 0 === i ? void 0 : i.storageGroup : void 0, n = e ? mo.Pt(this.Su(e)) : s();
			if (n && t in n) this.Fu(t, n[t], !1);
			else {
				if (e) {
					const i = s();
					if (i && t in i) return void this.Fu(t, i[t], !1);
				}
				this.Lu(t, !1);
			}
		});
	}
	refreshMetaIdentifiers() {
		this.gi || (this.rc() ? this.oc() : this.sc(ma));
	}
	oc() {
		const t = this.lc();
		(C(t) || t !== this.ac) && (this.sc(ma), this.uc(t));
	}
	uc(t = this.lc()) {
		this.ac = 0 === this.fu.size ? t : void 0;
	}
	refreshMetaIdentifiersBeforeCapture() {
		this.gi || this.uu || (this.rc() || this.Nu(), this.oc());
	}
	rc() {
		return this.Va === go || this.Va === Ao || this.Va === Co;
	}
	lc() {
		const t = this.Va.Lt(this.yu);
		return R(t) ? t : void 0;
	}
	save() {
		if (this.gi) return;
		const t = this.Uu();
		t > 0 ? C(this.Ku) && (this.Ku = setTimeout(() => {
			this.Ku = void 0, this.Yu();
		}, t)) : this.Yu();
	}
	flush() {
		C(this.Ku) || (clearTimeout(this.Ku), this.Ku = void 0, this.Yu());
	}
	Yu(t = !1) {
		if (this.gi || this.uu && !t) return;
		t || (this.syncCookieProperties(), this.rc() && this.refreshMetaIdentifiers());
		const i = !t && !this.hu;
		i || (this.vu = !1);
		const e = !!i && this.$u();
		if (this.vu) return void (this.Br.debug && Ws.warn("skipping persistence write because storage belongs to a different distinct ID"));
		if (t || this.Nu(), this.lu) return this.cc(), void (e && this.pu.forEach((t) => t()));
		const s = this.hc(this.Va, this.yu, this.props, pa);
		"written" === s && (this.Wu(this.props), this.qu(this.props)), "failed" !== s && (this.cu.clear(), this.du = !1, this.fu.clear()), "written" === s && this.uc(), e && this.pu.forEach((t) => t());
	}
	cc() {
		const { main: t, groups: i } = this.Au(), e = this.hc(this.Va, this.yu, t, pa);
		"written" === e && (this.Wu(t), this.qu(t)), "failed" !== e && (this.du = !1, this.fu.clear(), ga.forEach((t) => {
			var i;
			null !== (i = Ll(t)) && void 0 !== i && i.storageGroup || this.cu.delete(t);
		})), "written" === e && this.uc();
		for (const t of Fl) {
			var s;
			const e = i[t];
			if (O(e) && !(null === (s = this.su[t]) || void 0 === s ? void 0 : s.persisted)) {
				ga.forEach((i) => {
					var e;
					(null === (e = Ll(i)) || void 0 === e ? void 0 : e.storageGroup) === t && this.cu.delete(i);
				});
				continue;
			}
			const n = this.hc(mo, this.Su(t), e, t);
			"failed" !== n && ga.forEach((i) => {
				const e = Ll(i);
				(null == e ? void 0 : e.storageGroup) !== t || "written" !== n && e.volatile || this.cu.delete(i);
			});
		}
	}
	Au() {
		const t = {}, i = {
			flags: {},
			surveys: {}
		};
		return Gr(this.props, (e, s) => {
			var n;
			const r = null === (n = Ll(s)) || void 0 === n ? void 0 : n.storageGroup;
			r ? i[r][s] = e : t[s] = e;
		}), {
			main: t,
			groups: i
		};
	}
	Pu(t, i) {
		if (i === pa) return JSON.stringify(t) + "|" + this.dc + "|" + this.vc + "|" + this.fc;
		const e = {};
		return Gr(t, (t, i) => {
			var s;
			e[i] = (null === (s = Ll(i)) || void 0 === s ? void 0 : s.volatile) ? "__volatile__" : t;
		}), JSON.stringify(e);
	}
	hc(t, i, e, s) {
		const n = this.Tu(s);
		if (s !== pa && !n.dirty && !C(n.fingerprint)) return "skipped";
		let r;
		try {
			if (r = this.Pu(e, s), r === n.fingerprint) return n.dirty = !1, "skipped";
		} catch (t) {
			r = void 0;
		}
		return t.$t(i, e, this.dc, this.vc, this.fc, this.Br.debug) ? (n.dirty = !1, s !== pa && (n.persisted = !0), C(r) || (n.fingerprint = r), this.ru && (n.storageValue = mo.Lt(i)), "written") : (this.Br.debug && Ws.warn(`failed to persist storage entry "${i}"; will retry on next save`), "failed");
	}
	remove({ keepGroupEntries: t = !1 } = {}) {
		if (this.zu(), C(this.Ku) || (clearTimeout(this.Ku), this.Ku = void 0), this.Va.Dt(this.yu, !1), this.Va.Dt(this.yu, !0), !t && this.gu) for (const t of Fl) mo.Dt(this.Su(t));
		t ? delete this.su[pa] : this.su = {}, this.Gu = void 0, this.Vu = void 0, this.ju = void 0;
	}
	clear() {
		this.remove(), this.props = {};
	}
	register_once(t, i, e) {
		if (P(t)) {
			this.syncCookieProperties(), C(i) && (i = "None"), this.dc = C(e) ? this.gc : e;
			let s = !1;
			if (Gr(t, (t, e) => {
				this.props.hasOwnProperty(e) && this.props[e] !== i || (this.Fu(e, t), s = !0);
			}), s) return this.save(), !0;
		}
		return !1;
	}
	register(t, i) {
		if (P(t)) {
			this.syncCookieProperties(), this.dc = C(i) ? this.gc : i;
			let e = !1;
			if (Gr(t, (i, s) => {
				t.hasOwnProperty(s) && (this.props[s] !== i || P(i) || k(i)) && (this.Fu(s, i), e = !0);
			}), e) return this.save(), !0;
		}
		return !1;
	}
	unregister(t) {
		this.syncCookieProperties();
		const i = "string" == typeof t ? [t] : t;
		let e = !1;
		for (const t of i) t in this.props && (this.Lu(t), e = !0);
		e && this.save();
	}
	update_campaign_params() {
		const t = null == s ? void 0 : s.URL;
		if (t === this.mu) return;
		const i = ia(this.Br.custom_campaign_params, this.Br.mask_personal_data_properties, this.Br.custom_personal_data_properties), e = !O(Zr(i));
		return e && this.register(i), this.mu = t, e ? i : void 0;
	}
	update_search_keyword() {
		this.register(function() {
			const t = null == s ? void 0 : s.referrer;
			return t ? sa(t) : {};
		}());
	}
	update_referrer_info() {
		var t;
		this.register_once({
			$referrer: la(),
			$referring_domain: (null == s ? void 0 : s.referrer) && (null === (t = Bl(s.referrer)) || void 0 === t ? void 0 : t.host) || oa
		}, void 0);
	}
	set_initial_person_info() {
		if (this.props.$initial_campaign_params || this.props.$initial_referrer_info) return;
		const t = aa(this.Br.mask_personal_data_properties, this.Br.custom_personal_data_properties, this.Br.disable_capture_url_hashes);
		this.register_once({ [$r]: this.ou ? {
			r: fa(t.r),
			u: t.u ? fa(t.u) : void 0
		} : t }, void 0);
	}
	get_initial_props() {
		const t = {};
		Gr([wr, br], (i) => {
			const e = this.props[i];
			e && Gr(e, function(i, e) {
				t["$initial_" + b(e)] = i;
			});
		});
		const i = this.props[$r];
		if (i) Kr(t, function(t, i = !1, e, s) {
			const n = ua(t, i, e, s), r = {};
			return Gr(n, function(t, i) {
				r[`$initial_${b(i)}`] = t;
			}), r;
		}(i, this.Br.disable_capture_url_hashes, this.Br.mask_personal_data_properties, this.Br.custom_personal_data_properties));
		return t;
	}
	safe_merge(t) {
		return Gr(this.props, function(i, e) {
			e in t || (t[e] = i);
		}), t;
	}
	update_config(t, i, e) {
		const s = t.persistence !== i.persistence, n = !((t, i) => {
			if (t.length !== i.length) return !1;
			const e = [...t].sort(), s = [...i].sort();
			return e.every((t, i) => t === s[i]);
		})(t.cookie_persisted_properties || [], i.cookie_persisted_properties || []), r = s || n, o = t.cookieWinsOnConflict !== i.cookieWinsOnConflict, l = t.disable_persistence || !!e, a = !!this.gi && !l;
		l || this.Qu(i, a), this.Br = t, !l && (s || n || o) && (this.Gu = void 0, this.Vu = void 0, this.ju = void 0, this.Qu(bi(bi({}, t), {}, { cookie_persisted_properties: i.cookie_persisted_properties }), a));
		const u = r || o ? this.bu(t) : this.Va;
		this.mc();
		const h = this._u(t), c = r || h !== this.lu, d = !l && (c || t.cross_subdomain_cookie !== this.vc || t.secure_cookie !== this.fc) && this.Ju(a);
		this.hu = c;
		try {
			if (this.gc = this.dc = t.cookie_expiration, this.set_disabled(l), this.set_cross_subdomain(t.cross_subdomain_cookie), this.set_secure(t.secure_cookie), c) {
				const t = this.props;
				this.clear(), this.Va = u, this.lu = h, this.props = t, this.save();
			} else o && (this.Va = u, l || (delete this.su[pa], this.Yu()));
		} finally {
			this.hu = !1, d && this.Xu();
		}
	}
	mc() {
		const t = this.props[$r];
		if (!this.ou || !P(t) || "string" != typeof t.r) return;
		const i = fa(t.r), e = "string" == typeof t.u ? fa(t.u) : t.u;
		i === t.r && e === t.u || this.Fu($r, bi(bi({}, t), {}, {
			r: i,
			u: e
		}));
	}
	set_disabled(t) {
		this.gi = t, this.gi ? this.remove() : this.save();
	}
	set_cross_subdomain(t) {
		t !== this.vc && (this.vc = t, this.remove({ keepGroupEntries: !0 }), this.save());
	}
	set_secure(t) {
		t !== this.fc && (this.fc = t, this.remove({ keepGroupEntries: !0 }), this.save());
	}
	set_event_timer(t, i) {
		const e = this.props.__timers || {};
		e[t] = i, this.Fu(Nn, e), this.save();
	}
	remove_event_timer(t) {
		const i = this.props.__timers || {}, e = i[t];
		return C(e) || (delete i[t], this.Fu(Nn, i), this.save()), e;
	}
	get_property(t) {
		return this.props[t];
	}
	set_property(t, i) {
		this.Fu(t, i), this.save();
	}
	Fu(t, i, e = !0) {
		var s;
		const n = this.props[t];
		this.props[t] = i, e && ("distinct_id" !== t && "$user_state" !== t || n === i || (this.du = !0), ya(t) && !ba(n, i) && this.fu.add(t), this.Hu(t, n, i), null !== (s = Ll(t)) && void 0 !== s && s.volatile || this.Bu(t));
	}
	Lu(t, i = !0) {
		delete this.props[t], i && (_a$1(t) && this.Cu(t, !0), ya(t) && this.fu.add(t), this.Bu(t));
	}
	Bu(t) {
		var i;
		const e = null === (i = Ll(t)) || void 0 === i ? void 0 : i.storageGroup;
		e && (this.Tu(e).dirty = !0);
	}
	Tu(t) {
		return this.su[t] || (this.su[t] = {});
	}
};
var xa = {
	GZipJS: "gzip-js",
	Base64: "base64"
};
var Ea = {
	Activation: "events",
	Cancellation: "cancelEvents"
};
var Oa = {
	Popover: "popover",
	API: "api",
	Widget: "widget",
	ExternalSurvey: "external_survey"
};
var Ia = {
	SHOWN: "survey shown",
	DISMISSED: "survey dismissed",
	SENT: "survey sent",
	ABANDONED: "survey abandoned"
};
var Ma = {
	SURVEY_ID: "$survey_id",
	SURVEY_NAME: "$survey_name",
	SURVEY_RESPONSE: "$survey_response",
	SURVEY_ITERATION: "$survey_iteration",
	SURVEY_ITERATION_START_DATE: "$survey_iteration_start_date",
	SURVEY_PARTIALLY_COMPLETED: "$survey_partially_completed",
	SURVEY_SUBMISSION_ID: "$survey_submission_id",
	SURVEY_QUESTIONS: "$survey_questions",
	SURVEY_COMPLETED: "$survey_completed",
	PRODUCT_TOUR_ID: "$product_tour_id",
	SURVEY_LAST_SEEN_DATE: "$survey_last_seen_date",
	SURVEY_LANGUAGE: "$survey_language"
};
var Fa = {
	Popover: "popover",
	Inline: "inline"
};
function Da(t) {
	let i = !0;
	return { dispose() {
		if (i) {
			i = !1;
			const e = t();
			e && T(e.then) && e.then(void 0, () => {});
		}
	} };
}
var La = {
	SHOWN: "product tour shown",
	DISMISSED: "product tour dismissed",
	COMPLETED: "product tour completed",
	STEP_SHOWN: "product tour step shown",
	STEP_COMPLETED: "product tour step completed",
	BUTTON_CLICKED: "product tour button clicked",
	STEP_SELECTOR_FAILED: "product tour step selector failed",
	BANNER_CONTAINER_SELECTOR_FAILED: "product tour banner container selector failed",
	BANNER_ACTION_CLICKED: "product tour banner action clicked"
};
var Na = {
	TOUR_ID: "$product_tour_id",
	TOUR_NAME: "$product_tour_name",
	TOUR_ITERATION: "$product_tour_iteration",
	TOUR_RENDER_REASON: "$product_tour_render_reason",
	TOUR_STEP_ID: "$product_tour_step_id",
	TOUR_STEP_ORDER: "$product_tour_step_order",
	TOUR_STEP_TYPE: "$product_tour_step_type",
	TOUR_DISMISS_REASON: "$product_tour_dismiss_reason",
	TOUR_BUTTON_TEXT: "$product_tour_button_text",
	TOUR_BUTTON_ACTION: "$product_tour_button_action",
	TOUR_BUTTON_LINK: "$product_tour_button_link",
	TOUR_BUTTON_TOUR_ID: "$product_tour_button_tour_id",
	TOUR_STEPS_COUNT: "$product_tour_steps_count",
	TOUR_STEP_SELECTOR: "$product_tour_step_selector",
	TOUR_STEP_SELECTOR_FOUND: "$product_tour_step_selector_found",
	TOUR_STEP_ELEMENT_TAG: "$product_tour_step_element_tag",
	TOUR_STEP_ELEMENT_ID: "$product_tour_step_element_id",
	TOUR_STEP_ELEMENT_CLASSES: "$product_tour_step_element_classes",
	TOUR_STEP_ELEMENT_TEXT: "$product_tour_step_element_text",
	TOUR_ERROR: "$product_tour_error",
	TOUR_MATCHES_COUNT: "$product_tour_matches_count",
	TOUR_FAILURE_PHASE: "$product_tour_failure_phase",
	TOUR_WAITED_FOR_ELEMENT: "$product_tour_waited_for_element",
	TOUR_WAIT_DURATION_MS: "$product_tour_wait_duration_ms",
	TOUR_BANNER_SELECTOR: "$product_tour_banner_selector",
	TOUR_LINKED_SURVEY_ID: "$product_tour_linked_survey_id",
	USE_MANUAL_SELECTOR: "$use_manual_selector",
	INFERENCE_DATA_PRESENT: "$inference_data_present",
	TOUR_LAST_SEEN_DATE: "$product_tour_last_seen_date",
	TOUR_TYPE: "$product_tour_type"
};
var Ba = Vs("[RateLimiter]");
var Ua = class {
	constructor(t) {
		this.serverLimits = {}, this.lastEventRateLimited = !1, this.checkForLimiting = (t) => {
			const i = t.text;
			if (i && i.length) try {
				(JSON.parse(i).quota_limited || []).forEach((t) => {
					Ba.info(`${t || "events"} is quota limited.`), this.serverLimits[t] = (/* @__PURE__ */ new Date()).getTime() + 6e4;
				});
			} catch (t) {
				Ba.warn(`could not rate limit - continuing. Error: "${null == t ? void 0 : t.message}"`, { text: i });
				return;
			}
		}, this.instance = t, this.lastEventRateLimited = this.clientRateLimitContext(!0).isRateLimited;
	}
	get captureEventsPerSecond() {
		var t;
		return (null === (t = this.instance.config.rate_limiting) || void 0 === t ? void 0 : t.events_per_second) || 10;
	}
	get captureEventsBurstLimit() {
		var t;
		return Math.max((null === (t = this.instance.config.rate_limiting) || void 0 === t ? void 0 : t.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond);
	}
	get isClientRateLimited() {
		return 1 > this.yc().tokens;
	}
	clientRateLimitContext(t = !1) {
		var i;
		const e = this.yc(), s = 1 > e.tokens;
		if (s || t || (e.tokens = Math.max(0, e.tokens - 1)), s && !t) {
			const t = (F(e.dropped) ? e.dropped : 0) + 1;
			e.dropped = t, !this.lastEventRateLimited && this.bc(t) && (e.dropped = 0);
		}
		return this.lastEventRateLimited = s, null === (i = this.instance.persistence) || void 0 === i || i.set_property("$capture_rate_limit", e), {
			isRateLimited: s,
			remainingTokens: e.tokens
		};
	}
	yc() {
		var t;
		const { captureEventsBurstLimit: i, captureEventsPerSecond: e } = this, s = (/* @__PURE__ */ new Date()).getTime(), n = null === (t = this.instance.persistence) || void 0 === t ? void 0 : t.get_property(yr), r = n ? bi({}, n) : {
			tokens: i,
			last: s
		};
		return r.tokens += Math.max(0, s - r.last) / 1e3 * e, r.last = Math.max(r.last, s), r.tokens > i && (r.tokens = i), r;
	}
	_c(t) {
		const i = this.instance.config.property_denylist;
		return !k(i) || !i.includes(t);
	}
	wc() {
		var t;
		if (this._c("$current_url") && this._c("$pathname") && (null == n ? void 0 : n.pathname)) return `${null !== (t = n.origin) && void 0 !== t ? t : ""}${n.pathname}`;
	}
	bc(t) {
		var i, e;
		const { captureEventsBurstLimit: s, captureEventsPerSecond: n } = this, r = this.wc(), o = this._c("$session_id") ? null === (i = (e = this.instance).get_session_id) || void 0 === i ? void 0 : i.call(e) : void 0, l = [
			`${t} event(s) dropped since the last warning`,
			r ? `triggered on ${r}` : void 0,
			o ? `session ${o}` : void 0
		].filter(Boolean).join(", ");
		return !!this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: `posthog-js client rate limited: ${l}. Config is set to ${n} events per second and ${s} events burst limit.` }, { skip_client_rate_limiting: !0 });
	}
	isServerRateLimited(t) {
		const i = this.serverLimits[t || "events"] || !1;
		return !1 !== i && (/* @__PURE__ */ new Date()).getTime() < i;
	}
};
var za = Vs("[RemoteConfig]");
var Ha = class {
	constructor(t) {
		this._instance = t;
	}
	get remoteConfig() {
		var t;
		return null === (t = c._POSTHOG_REMOTE_CONFIG) || void 0 === t || null === (t = t[this._instance.config.token]) || void 0 === t ? void 0 : t.config;
	}
	kc(t) {
		const i = Ys(this._instance);
		i ? i(this._instance, "remote-config", () => t(this.remoteConfig)) : t();
	}
	Sc(t) {
		const i = this._instance.__pending_remote_config_callbacks;
		if (i) return void i.push(t);
		const e = [t];
		this._instance.__pending_remote_config_callbacks = e;
		try {
			this._instance._send_request({
				method: "GET",
				url: this._instance.requestRouter.endpointFor("assets", `/array/${this._instance.config.token}/config`),
				batchKey: "remote_config",
				fireCallbackOnDrop: !0,
				callback: (t) => {
					this._instance.__pending_remote_config_callbacks = void 0, e.forEach((i) => i(t));
				}
			});
		} catch (t) {
			throw this._instance.__pending_remote_config_callbacks = void 0, t;
		}
	}
	load() {
		try {
			if (this.remoteConfig) return za.info("Using preloaded remote config", this.remoteConfig), void this.xc(this.remoteConfig);
			if (this._instance.$c()) return void za.warn("Remote config is disabled. Falling back to local config.");
			if (!this._instance.config.opt_in_site_apps) return void this.Sc((t) => {
				this.xc(t.json, t);
			});
			this.kc((t) => {
				if (!t) return za.info("No config found after loading remote JS config. Falling back to JSON."), void this.Sc((t) => {
					this.xc(t.json, t);
				});
				this.xc(t);
			});
		} catch (t) {
			za.error("Error loading remote config", t), this.xc();
		}
	}
	xc(t, i) {
		!t && i && (0 === i.statusCode ? i.error || za.warn("Failed to fetch remote config from PostHog.") : za.error("Failed to fetch remote config from PostHog."));
		try {
			this._instance.xc(t ? {
				ok: !0,
				config: t
			} : { ok: !1 });
		} catch (t) {
			za.error("Error applying remote config", t);
		}
		if (!1 !== (null == t ? void 0 : t.hasFeatureFlags) && !this._instance.config.advanced_disable_feature_flags_on_first_load) try {
			var e;
			null === (e = this._instance.featureFlags) || void 0 === e || e.ensureFlagsLoaded();
		} catch (t) {
			za.error("Error loading feature flags", t);
		}
	}
};
var Wa = Uint8Array;
var Va = Uint16Array;
var Ga = Uint32Array;
var Ka = new Wa([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]);
var Ja = new Wa([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]);
var Ya = new Wa([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]);
var Za = function(t, i) {
	for (var e = new Va(31), s = 0; 31 > s; ++s) e[s] = i += 1 << t[s - 1];
	var n = new Ga(e[30]);
	for (s = 1; 30 > s; ++s) for (var r = e[s]; e[s + 1] > r; ++r) n[r] = r - e[s] << 5 | s;
	return [e, n];
};
var Xa = Za(Ka, 2);
var Qa = Xa[1];
Xa[0][28] = 258, Qa[258] = 28;
for (var tu = Za(Ja, 0)[1], iu = new Va(32768), eu = 0; 32768 > eu; ++eu) {
	var su = (43690 & eu) >>> 1 | (21845 & eu) << 1;
	iu[eu] = ((65280 & (su = (61680 & (su = (52428 & su) >>> 2 | (13107 & su) << 2)) >>> 4 | (3855 & su) << 4)) >>> 8 | (255 & su) << 8) >>> 1;
}
var nu = function(t, i, e) {
	for (var s = t.length, n = 0, r = new Va(i); s > n; ++n) ++r[t[n] - 1];
	var o, l = new Va(i);
	for (n = 0; i > n; ++n) l[n] = l[n - 1] + r[n - 1] << 1;
	if (e) {
		o = new Va(1 << i);
		var a = 15 - i;
		for (n = 0; s > n; ++n) if (t[n]) for (var u = n << 4 | t[n], h = i - t[n], c = l[t[n] - 1]++ << h, d = c | (1 << h) - 1; d >= c; ++c) o[iu[c] >>> a] = u;
	} else for (o = new Va(s), n = 0; s > n; ++n) o[n] = iu[l[t[n] - 1]++] >>> 15 - t[n];
	return o;
};
var ru = new Wa(288);
for (eu = 0; 144 > eu; ++eu) ru[eu] = 8;
for (eu = 144; 256 > eu; ++eu) ru[eu] = 9;
for (eu = 256; 280 > eu; ++eu) ru[eu] = 7;
for (eu = 280; 288 > eu; ++eu) ru[eu] = 8;
var ou = new Wa(32);
for (eu = 0; 32 > eu; ++eu) ou[eu] = 5;
var lu = nu(ru, 9, 0);
var au = nu(ou, 5, 0);
var uu = function(t) {
	return (t / 8 | 0) + (7 & t && 1);
};
var hu = function(t, i, e) {
	(null == i || 0 > i) && (i = 0), (null == e || e > t.length) && (e = t.length);
	var s = new (t instanceof Va ? Va : t instanceof Ga ? Ga : Wa)(e - i);
	return s.set(t.subarray(i, e)), s;
};
var cu = function(t, i, e) {
	var s = i / 8 | 0;
	t[s] |= e <<= 7 & i, t[s + 1] |= e >>> 8;
};
var du = function(t, i, e) {
	var s = i / 8 | 0;
	t[s] |= e <<= 7 & i, t[s + 1] |= e >>> 8, t[s + 2] |= e >>> 16;
};
var vu = function(t, i) {
	for (var e = [], s = 0; t.length > s; ++s) t[s] && e.push({
		s,
		f: t[s]
	});
	var n = e.length, r = e.slice();
	if (!n) return [new Wa(0), 0];
	if (1 == n) {
		var o = new Wa(e[0].s + 1);
		return o[e[0].s] = 1, [o, 1];
	}
	e.sort(function(t, i) {
		return t.f - i.f;
	}), e.push({
		s: -1,
		f: 25001
	});
	var l = e[0], a = e[1], u = 0, h = 1, c = 2;
	for (e[0] = {
		s: -1,
		f: l.f + a.f,
		l,
		r: a
	}; h != n - 1;) l = e[e[c].f > e[u].f ? u++ : c++], a = e[u != h && e[c].f > e[u].f ? u++ : c++], e[h++] = {
		s: -1,
		f: l.f + a.f,
		l,
		r: a
	};
	var d = r[0].s;
	for (s = 1; n > s; ++s) r[s].s > d && (d = r[s].s);
	var v = new Va(d + 1), f = fu(e[h - 1], v, 0);
	if (f > i) {
		s = 0;
		var p = 0, g = f - i, _ = 1 << g;
		for (r.sort(function(t, i) {
			return v[i.s] - v[t.s] || t.f - i.f;
		}); n > s; ++s) {
			var m = r[s].s;
			if (i >= v[m]) break;
			p += _ - (1 << f - v[m]), v[m] = i;
		}
		for (p >>>= g; p > 0;) {
			var y = r[s].s;
			i > v[y] ? p -= 1 << i - v[y]++ - 1 : ++s;
		}
		for (; s >= 0 && p; --s) {
			var b = r[s].s;
			v[b] == i && (--v[b], ++p);
		}
		f = i;
	}
	return [new Wa(v), f];
};
var fu = function(t, i, e) {
	return -1 == t.s ? Math.max(fu(t.l, i, e + 1), fu(t.r, i, e + 1)) : i[t.s] = e;
};
var pu = function(t) {
	for (var i = t.length; i && !t[--i];);
	for (var e = new Va(++i), s = 0, n = t[0], r = 1, o = function(t) {
		e[s++] = t;
	}, l = 1; i >= l; ++l) if (t[l] == n && l != i) ++r;
	else {
		if (!n && r > 2) {
			for (; r > 138; r -= 138) o(32754);
			r > 2 && (o(r > 10 ? r - 11 << 5 | 28690 : r - 3 << 5 | 12305), r = 0);
		} else if (r > 3) {
			for (o(n), --r; r > 6; r -= 6) o(8304);
			r > 2 && (o(r - 3 << 5 | 8208), r = 0);
		}
		for (; r--;) o(n);
		r = 1, n = t[l];
	}
	return [e.subarray(0, s), i];
};
var gu = function(t, i) {
	for (var e = 0, s = 0; i.length > s; ++s) e += t[s] * i[s];
	return e;
};
var _u = function(t, i, e) {
	var s = e.length, n = uu(i + 2);
	t[n] = 255 & s, t[n + 1] = s >>> 8, t[n + 2] = 255 ^ t[n], t[n + 3] = 255 ^ t[n + 1];
	for (var r = 0; s > r; ++r) t[n + r + 4] = e[r];
	return 8 * (n + 4 + s);
};
var mu = function(t, i, e, s, n, r, o, l, a, u, h) {
	cu(i, h++, e), ++n[256];
	for (var c = vu(n, 15), d = c[0], v = c[1], f = vu(r, 15), p = f[0], g = f[1], _ = pu(d), m = _[0], y = _[1], b = pu(p), w = b[0], S = b[1], x = new Va(19), E = 0; m.length > E; ++E) x[31 & m[E]]++;
	for (E = 0; w.length > E; ++E) x[31 & w[E]]++;
	for (var k = vu(x, 7), T = k[0], P = k[1], O = 19; O > 4 && !T[Ya[O - 1]]; --O);
	var C, R, A, I, M = u + 5 << 3, F = gu(n, ru) + gu(r, ou) + o, D = gu(n, d) + gu(r, p) + o + 14 + 3 * O + gu(x, T) + (2 * x[16] + 3 * x[17] + 7 * x[18]);
	if (F >= M && D >= M) return _u(i, h, t.subarray(a, a + u));
	if (cu(i, h, 1 + (F > D)), h += 2, F > D) {
		C = nu(d, v, 0), R = d, A = nu(p, g, 0), I = p;
		var j = nu(T, P, 0);
		for (cu(i, h, y - 257), cu(i, h + 5, S - 1), cu(i, h + 10, O - 4), h += 14, E = 0; O > E; ++E) cu(i, h + 3 * E, T[Ya[E]]);
		h += 3 * O;
		for (var L = [m, w], N = 0; 2 > N; ++N) {
			var B = L[N];
			for (E = 0; B.length > E; ++E) cu(i, h, j[U = 31 & B[E]]), h += T[U], U > 15 && (cu(i, h, B[E] >>> 5 & 127), h += B[E] >>> 12);
		}
	} else C = lu, R = ru, A = au, I = ou;
	for (E = 0; l > E; ++E) if (s[E] > 255) {
		var U;
		du(i, h, C[257 + (U = s[E] >>> 18 & 31)]), h += R[U + 257], U > 7 && (cu(i, h, s[E] >>> 23 & 31), h += Ka[U]);
		var z = 31 & s[E];
		du(i, h, A[z]), h += I[z], z > 3 && (du(i, h, s[E] >>> 5 & 8191), h += Ja[z]);
	} else du(i, h, C[s[E]]), h += R[s[E]];
	return du(i, h, C[256]), h + R[256];
};
var yu = new Ga([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]);
var bu = new Wa(0);
var wu = function() {
	for (var t = new Ga(256), i = 0; 256 > i; ++i) {
		for (var e = i, s = 9; --s;) e = (1 & e && 3988292384) ^ e >>> 1;
		t[i] = e;
	}
	return t;
}();
var $u = function(t, i, e) {
	for (; e; ++i) t[i] = e, e >>>= 8;
};
function Su(t, i) {
	void 0 === i && (i = {});
	var e = function() {
		var t = 4294967295;
		return {
			p(i) {
				for (var e = t, s = 0; i.length > s; ++s) e = wu[255 & e ^ i[s]] ^ e >>> 8;
				t = e;
			},
			d() {
				return 4294967295 ^ t;
			}
		};
	}(), s = t.length;
	e.p(t);
	var n, r, o, l, a, u, h = (l = 10 + ((n = i).filename && n.filename.length + 1 || 0), a = 8, function(t, i, e, s, n, r) {
		var o = t.length, l = new Wa(s + o + 5 * (1 + Math.floor(o / 7e3)) + n), a = l.subarray(s, l.length - n), u = 0;
		if (!i || 8 > o) for (var h = 0; o >= h; h += 65535) {
			var c = h + 65535;
			o > c ? u = _u(a, u, t.subarray(h, c)) : (a[h] = r, u = _u(a, u, t.subarray(h, o)));
		}
		else {
			for (var d = yu[i - 1], v = d >>> 13, f = 8191 & d, p = (1 << e) - 1, g = new Va(32768), _ = new Va(p + 1), m = Math.ceil(e / 3), y = 2 * m, b = function(i) {
				return (t[i] ^ t[i + 1] << m ^ t[i + 2] << y) & p;
			}, w = new Ga(25e3), S = new Va(288), x = new Va(32), E = 0, k = 0, T = (h = 0, 0), P = 0, O = 0; o > h; ++h) {
				var C = b(h), R = 32767 & h, A = _[C];
				if (g[R] = A, _[C] = R, h >= P) {
					var I = o - h;
					if ((E > 7e3 || T > 24576) && I > 423) {
						u = mu(t, a, 0, w, S, x, k, T, O, h - O, u), T = E = k = 0, O = h;
						for (var M = 0; 286 > M; ++M) S[M] = 0;
						for (M = 0; 30 > M; ++M) x[M] = 0;
					}
					var F = 2, D = 0, j = f, L = R - A & 32767;
					if (I > 2 && C == b(h - L)) for (var N = Math.min(v, I) - 1, B = Math.min(32767, h), U = Math.min(258, I); B >= L && --j && R != A;) {
						if (t[h + F] == t[h + F - L]) {
							for (var z = 0; U > z && t[h + z] == t[h + z - L]; ++z);
							if (z > F) {
								if (F = z, D = L, z > N) break;
								var H = Math.min(L, z - 2), q = 0;
								for (M = 0; H > M; ++M) {
									var W = h - L + M + 32768 & 32767, V = W - g[W] + 32768 & 32767;
									V > q && (q = V, A = W);
								}
							}
						}
						L += (R = A) - (A = g[R]) + 32768 & 32767;
					}
					if (D) {
						w[T++] = 268435456 | Qa[F] << 18 | tu[D];
						var G = 31 & Qa[F], K = 31 & tu[D];
						k += Ka[G] + Ja[K], ++S[257 + G], ++x[K], P = h + F, ++E;
					} else w[T++] = t[h], ++S[t[h]];
				}
			}
			u = mu(t, a, r, w, S, x, k, T, O, h - O, u), r || (u = _u(a, u, bu));
		}
		return hu(l, 0, s + uu(u) + n);
	}(r = t, null == (o = i).level ? 6 : o.level, null == o.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(r.length)))) : 12 + o.mem, l, a, !u)), c = h.length;
	return function(t, i) {
		var e = i.filename;
		if (t[0] = 31, t[1] = 139, t[2] = 8, t[8] = 2 > i.level ? 4 : 9 == i.level ? 2 : 0, t[9] = 3, 0 != i.mtime && $u(t, 4, Math.floor(new Date(i.mtime || Date.now()) / 1e3)), e) {
			t[3] = 8;
			for (var s = 0; e.length >= s; ++s) t[s + 10] = e.charCodeAt(s);
		}
	}(h, i), $u(h, c - 8, e.d()), $u(h, c - 4, s), h;
}
var xu = !!o || !!r;
var Eu = /* @__PURE__ */ new WeakMap();
var ku = "text/plain";
var Tu = 0;
var Pu = !1;
var Ou = (t, i) => {
	const [e, s] = t.split("#"), [n, r] = e.split("?");
	if (!r) return t;
	const o = r.split("&").filter((t) => t.split("=")[0] !== i).join("&");
	return `${n}${o ? `?${o}` : ""}${s ? `#${s}` : ""}`;
};
var Cu = (t, i, e = !0) => {
	var s;
	const [n, r] = t.split("?"), o = bi({}, i), l = null !== (s = null == r ? void 0 : r.split("&").map((t) => {
		var i;
		const [s, n] = t.split("="), r = e && null !== (i = o[s]) && void 0 !== i ? i : n;
		return delete o[s], `${s}=${r}`;
	})) && void 0 !== s ? s : [], a = function(t, i = "&") {
		let e, s;
		const n = [];
		return Gr(t, function(t, i) {
			C(t) || C(i) || "undefined" === i || (e = encodeURIComponent(((t) => t instanceof File)(t) ? t.name : t.toString()), s = encodeURIComponent(i), n[n.length] = s + "=" + e);
		}), n.join(i);
	}(o);
	return a && l.push(a), l.length > 0 ? `${n}?${l.join("&")}` : n;
};
var Ru = (t) => {
	if (t.pr) return t.pr;
	const { data: i, compression: e } = t;
	if (!i) return;
	if (e === xa.GZipJS) {
		const t = Su(function(t) {
			var i = t.length;
			if ("undefined" != typeof TextEncoder) return new TextEncoder().encode(t);
			for (var e = new Wa(t.length + (t.length >>> 1)), s = 0, n = function(t) {
				e[s++] = t;
			}, r = 0; i > r; ++r) {
				if (s + 5 > e.length) {
					var o = new Wa(s + 8 + (i - r << 1));
					o.set(e), e = o;
				}
				var l = t.charCodeAt(r);
				128 > l ? n(l) : 2048 > l ? (n(192 | l >>> 6), n(128 | 63 & l)) : l > 55295 && 57344 > l ? (n(240 | (l = 65536 + (1047552 & l) | 1023 & t.charCodeAt(++r)) >>> 18), n(128 | l >>> 12 & 63), n(128 | l >>> 6 & 63), n(128 | 63 & l)) : (n(224 | l >>> 12), n(128 | l >>> 6 & 63), n(128 | 63 & l));
			}
			return hu(e, 0, s);
		}(ql(i)), { mtime: 0 });
		return {
			contentType: ku,
			body: t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength),
			estimatedSize: t.byteLength
		};
	}
	if (e === xa.Base64) {
		const e = function(t) {
			return t ? btoa(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, (t, i) => String.fromCharCode(parseInt(i, 16)))) : t;
		}(ql(i)), s = "sendBeacon" === t.transport, n = s ? e : ((t) => "data=" + encodeURIComponent("string" == typeof t ? t : ql(t)))(e);
		return {
			contentType: s ? ku : "application/x-www-form-urlencoded",
			body: n,
			estimatedSize: new Blob([n]).size
		};
	}
	const s = ql(i);
	return {
		contentType: "application/json",
		body: s,
		estimatedSize: new Blob([s]).size
	};
};
var Au = (t) => {
	const i = () => "sendBeacon" === t.transport ? {
		url: Cu(t.url, { compression: xa.Base64 }),
		encodedBody: Ru(bi(bi({}, t), {}, {
			compression: xa.Base64,
			pr: void 0
		}))
	} : {
		url: Ou(t.url, "compression"),
		encodedBody: Ru(bi(bi({}, t), {}, {
			compression: void 0,
			pr: void 0
		}))
	};
	let e;
	try {
		e = Ru(t);
	} catch (e) {
		if (me(t.compression, Wl(t.url, "compression"))) return Ws.error("Failed to gzip request body, sending uncompressed payload", e), i();
		throw e;
	}
	return e && me(t.compression, Wl(t.url, "compression")) && !((s = e.body) instanceof ArrayBuffer ? _e(new Uint8Array(s)) : ArrayBuffer.isView(s) && _e(new Uint8Array(s.buffer, s.byteOffset, s.byteLength))) ? (Pu = !0, i()) : {
		url: t.url,
		encodedBody: e
	};
	var s;
};
var Iu = (t) => {
	try {
		return Au(t);
	} catch (e) {
		var i;
		Ws.error(e), null === (i = t.callback) || void 0 === i || i.call(t, {
			statusCode: 0,
			error: e
		});
		return;
	}
};
var Mu = function() {
	var t = J(function* (t) {
		const i = yield function(t) {
			return Ee.apply(this, arguments);
		}(ql(t.data), rn.DEBUG, { rethrow: !0 });
		if (!i) return t;
		const e = yield i.arrayBuffer();
		return bi(bi({}, t), {}, { pr: {
			contentType: ku,
			body: e,
			estimatedSize: e.byteLength
		} });
	});
	return function(i) {
		return t.apply(this, arguments);
	};
}();
var Fu = (t) => ci("AbortError", "PostHog request timed out" + (t ? ` after ${t}ms` : ""));
var Du = /Failed to fetch|NetworkError|Load failed/i;
var ju = (t) => "TypeError" === (null == t ? void 0 : t.name) && Du.test((null == t ? void 0 : t.message) || "");
var Lu = (t) => {
	try {
		const i = function(t, i = Date.now(), e = 3e5) {
			if ("string" != typeof t || !t) return;
			const s = t.trim(), n = /^\d+\s*,/.test(s) ? s.slice(0, s.indexOf(",")).trim() : s;
			if (/^\d+$/.test(n)) {
				const t = 1e3 * Math.min(Number(n), e / 1e3);
				return t > 0 ? t : void 0;
			}
			if (!/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*[ ,]/.test(n)) return;
			const r = /^\w{3} \w{3} /.test(n) ? n + " GMT" : n, o = Date.parse(r) - i;
			return Number.isFinite(o) && o > 0 ? Math.min(o, e) : void 0;
		}(t());
		return C(i) ? void 0 : Math.min(i, 3e4);
	} catch (t) {
		return;
	}
};
var Nu = (t) => {
	var i;
	const e = Iu(t);
	if (!e) return;
	const s = new o();
	Eu.set(s, !0);
	const { url: n, encodedBody: r } = e;
	s.open(t.method || "GET", n, !0);
	const { contentType: l, body: a } = null != r ? r : {};
	Gr(t.headers, function(t, i) {
		s.setRequestHeader(i, t);
	}), l && s.setRequestHeader("Content-Type", l), t.timeout && (s.timeout = t.timeout);
	let u = !1;
	s.ontimeout = () => {
		u = !0;
	}, s.onloadend = () => {
		var i;
		if (u) {
			var e;
			const i = Fu(t.timeout);
			Ws.warn(i), null === (e = t.callback) || void 0 === e || e.call(t, {
				statusCode: 0,
				error: i
			});
			return;
		}
		const n = {
			statusCode: s.status,
			text: s.responseText
		};
		if (200 === s.status) try {
			n.json = JSON.parse(s.responseText);
		} catch (t) {}
		null === (i = t.callback) || void 0 === i || i.call(t, n, Lu(() => s.getResponseHeader("Retry-After")));
	}, null === (i = t.onSend) || void 0 === i || i.call(t, n), s.send(a);
};
var Bu = (t) => {
	const i = Iu(t);
	if (!i) return;
	const { url: e, encodedBody: s } = i, { contentType: n, body: o, estimatedSize: a } = null != s ? s : {}, u = new Headers();
	Gr(t.headers, function(t, i) {
		u.append(i, t);
	}), n && u.append("Content-Type", n);
	let h = null, c = !1;
	if (l) {
		const i = new l();
		h = {
			signal: i.signal,
			timeout: setTimeout(() => {
				c = !0;
				try {
					i.abort(Fu(t.timeout));
				} catch (t) {
					v(t);
				}
			}, t.timeout)
		};
	}
	let d = !1;
	const v = (i) => {
		var e;
		d || (d = !0, c && "AbortError" === (null == i ? void 0 : i.name) || ju(i) ? Ws.warn(i) : Ws.error(i), null === (e = t.callback) || void 0 === e || e.call(t, {
			statusCode: 0,
			error: i
		}));
	};
	let f = 0;
	const p = () => {
		Tu -= f, f = 0, h && clearTimeout(h.timeout);
	};
	try {
		var g;
		const i = bi({
			method: (null == t ? void 0 : t.method) || "GET",
			headers: u,
			referrerPolicy: "strict-origin",
			body: o,
			signal: null == h ? void 0 : h.signal
		}, t.fetchOptions);
		null === (g = t.onSend) || void 0 === g || g.call(t, e);
		const s = null != a ? a : C(o) ? 0 : void 0;
		i.keepalive = "POST" === i.method && !t.Ua && !1 !== i.keepalive && i.body === o && !C(s) && s >= 0 && 52428.8 > Tu + s, i.keepalive && (f = s, Tu += f), r(e, i).then((i) => i.text().then((e) => {
			var s;
			if (d) return;
			const n = {
				statusCode: i.status,
				text: e
			};
			if (200 === i.status) try {
				n.json = JSON.parse(e);
			} catch (t) {
				Ws.error(t);
			}
			d = !0, p(), null === (s = t.callback) || void 0 === s || s.call(t, n, Lu(() => i.headers.get("Retry-After")));
		})).catch((t) => {
			p(), v(t);
		}).finally(p);
	} catch (t) {
		p(), v(t);
	}
};
var Uu = (t) => {
	try {
		var i;
		const { url: s, encodedBody: n } = Au(t), { contentType: o, body: l, estimatedSize: a } = null != n ? n : {};
		if (!l) return;
		const u = l instanceof Blob ? l : new Blob([l], { type: o });
		if (e.sendBeacon(s, u)) return;
		const h = k(t.data) ? t.data : null === (i = t.data) || void 0 === i ? void 0 : i.batch;
		if (k(h) && h.length > 1 && (null != a ? a : 0) > 16384) {
			const i = Math.ceil(h.length / 2), e = (i) => k(t.data) ? i : bi(bi({}, t.data), {}, { batch: i });
			Uu(bi(bi({}, t), {}, { data: e(h.slice(0, i)) })), Uu(bi(bi({}, t), {}, { data: e(h.slice(i)) }));
			return;
		}
		Ws.warn(`Beacon of ~${null != a ? a : 0} bytes was rejected by the browser, falling back to ${r ? "fetch" : "XHR"}`), r ? Bu(bi(bi({}, t), {}, { Ua: !0 })) : Nu(t);
	} catch (t) {
		Ws.warn("Beacon send failed", t);
	}
};
var zu = (t, i, e, s) => {
	const n = "query" === s ? "POST" === i ? "sent_at" : "_" : void 0;
	return Cu(e === xa.GZipJS ? Ou(t, "compression") : t, bi(bi({}, n ? { [n]: Date.now().toString() } : {}), e === xa.GZipJS ? {} : { compression: e }));
};
var Hu = (() => {
	const t = [];
	return r && t.push({
		transport: "fetch",
		method: Bu
	}), o && t.push({
		transport: "XHR",
		method: Nu
	}), null != e && e.sendBeacon && t.push({
		transport: "sendBeacon",
		method: Uu
	}), t;
})();
var qu = !xu && -1 === (null == u ? void 0 : u.indexOf("MSIE")) && -1 === (null == u ? void 0 : u.indexOf("Mozilla"));
function Wu(t, i, e) {
	var s, n, r, o;
	e && (i = bi(bi({}, i), {}, { callback: (t) => e(t) })), t.__loaded ? qu ? t.__request_queue.push(i) : t.rateLimiter.isServerRateLimited(i.batchKey) ? i.fireCallbackOnDrop && (null === (r = i.callback) || void 0 === r || r.call(i, { statusCode: 429 })) : (i.transport = i.transport || t.config.api_transport, i.headers = bi(bi({}, t.config.request_headers), i.headers), i.compression = "best-available" === i.compression ? null !== (s = t.compression) && void 0 !== s ? s : i.compressionFallback : i.compression, (C(t.config.disable_beacon) ? t.config.__preview_disable_beacon : t.config.disable_beacon) && (i.disableTransport = ["sendBeacon"]), i.fetchOptions = i.fetchOptions || t.config.fetch_options, null === (n = i.onDispatch) || void 0 === n || n.call(i), ((t, i) => {
		var e, s, n;
		const r = bi(bi({}, t), {}, { callback: null != i ? i : (i) => {
			var e;
			return null === (e = t.callback) || void 0 === e ? void 0 : e.call(t, i);
		} });
		r.timeout = r.timeout || 6e4;
		const o = null !== (e = r.transport) && void 0 !== e ? e : "fetch";
		"sendBeacon" === o && C(r.compression) && r.data && (r.compression = xa.Base64), "POST" === r.method && r.data && ("capture-body" === r.timestampMode ? r.data = ((t) => {
			var i, e;
			const s = (k(t) ? t : [t]).map((t) => bi(bi({}, t), t.timestamp instanceof Date && !isNaN(t.timestamp.getTime()) ? { timestamp: t.timestamp.toISOString() } : {})), n = s[0];
			return {
				api_key: null !== (i = null == n || null === (e = n.properties) || void 0 === e ? void 0 : e.token) && void 0 !== i ? i : null == n ? void 0 : n.token,
				batch: s,
				sent_at: (/* @__PURE__ */ new Date()).toISOString()
			};
		})(r.data) : "body" === r.timestampMode && (r.data = ((t, i = (/* @__PURE__ */ new Date()).toISOString()) => k(t) ? t.map((t) => bi(bi({}, t), {}, { sent_at: i })) : bi(bi({}, t), {}, { sent_at: i }))(r.data))), r.url = zu(r.url, r.method, r.compression, r.timestampMode);
		const l = Hu.filter((t) => !r.disableTransport || !t.transport || !r.disableTransport.includes(t.transport)), u = null !== (s = null === (n = function(t, i) {
			for (let e = 0; t.length > e; e++) if (i(t[e])) return t[e];
		}(l, (t) => t.transport === o)) || void 0 === n ? void 0 : n.method) && void 0 !== s ? s : l[0].method;
		if (!u) throw new Error("No available transport method");
		const h = (t) => {
			try {
				u(t);
			} catch (t) {
				var i;
				ju(t) ? Ws.warn(t) : Ws.error(t), null === (i = r.callback) || void 0 === i || i.call(r, {
					statusCode: 0,
					error: t
				});
			}
		};
		"sendBeacon" !== o && !r.preferSyncCompression && r.data && r.compression === xa.GZipJS && a && "undefined" != typeof Promise && !Pu ? Mu(r).then((t) => {
			h(t);
		}).catch((i) => {
			if (ye(i)) return Pu = !0, void h(bi(bi({}, r), {}, {
				compression: void 0,
				url: zu(t.url, t.method, void 0, t.timestampMode)
			}));
			((t) => {
				if (!t || "object" != typeof t) return !1;
				const i = "name" in t ? String(t.name) : "";
				return ye(t) || i === ge;
			})(i) && (Pu = !0), h(r);
		}) : h(r);
	})(i, (s, n) => {
		var r, o, l;
		t.rateLimiter.checkForLimiting(s), 400 > s.statusCode || null === (r = (o = t.config).on_request_error) || void 0 === r || r.call(o, s), e ? e(s, n) : null === (l = i.callback) || void 0 === l || l.call(i, s);
	})) : i.fireCallbackOnDrop && (null === (o = i.callback) || void 0 === o || o.call(i, { statusCode: 0 }));
}
var Vu = class {
	constructor(t, i) {
		this.Cc = !0, this.Tc = [], this.Mc = Q((null == i ? void 0 : i.flush_interval_ms) || 3e3, 250, 5e3, Ws.createLogger("flush interval"), 3e3), this.Ic = t;
	}
	enqueue(t) {
		this.Tc.push(t), this.Ec || this.Ac();
	}
	unload() {
		this.Rc();
		const t = this.Tc.length > 0 ? this.Pc() : {}, i = Object.values(t);
		[...i.filter((t) => 0 === t.url.indexOf("/e")), ...i.filter((t) => 0 !== t.url.indexOf("/e"))].map((t) => {
			this.Oc(bi(bi({}, t), {}, { callback: void 0 }), "sendBeacon");
		});
	}
	enable() {
		this.Cc = !1, this.Ac();
	}
	Ac() {
		this.Cc || (this.Ec = setTimeout(() => {
			this.Rc(), this.Fc();
		}, this.Mc));
	}
	Fc() {
		if (this.Tc.length > 0) {
			const t = this.Pc();
			for (const i in t) this.Oc(t[i]);
		}
	}
	Oc(t, i) {
		try {
			this.Ic(t, i);
		} catch (t) {
			Ws.error(t);
		}
	}
	Rc() {
		clearTimeout(this.Ec), this.Ec = void 0;
	}
	Pc() {
		const t = {}, i = {};
		Gr(this.Tc, (e) => {
			var s;
			const n = e, r = ((n ? n.batchKey : null) || n.url) + (n.batchGroup ? `:${n.batchGroup}` : "");
			C(t[r]) && (t[r] = bi(bi({}, n), {}, {
				data: [],
				callback: void 0,
				fireCallbackOnDrop: void 0
			}), i[r] = []), null === (s = t[r].data) || void 0 === s || s.push(n.data), n.callback && i[r].push(n.callback);
		});
		for (const e in i) {
			const s = i[e];
			s.length && (t[e].callback = (t) => {
				for (const i of s) i(t);
			});
		}
		return this.Tc = [], t;
	}
};
var Gu = ["retriesPerformedSoFar"];
var Ku = class {
	constructor(t) {
		this._instance = t, this.Lc = !1, this.Dc = 3e3, this.Tc = [], this.Tc = [], this.Nc = !0, this.resume();
	}
	resume() {
		if (!C(t) && "onLine" in t.navigator) {
			if (this.Nc = t.navigator.onLine, this.jc) return;
			this.jc = () => {
				this.Nc = !0, this.Fc();
			}, this.qc = () => {
				this.Nc = !1;
			}, io(t, "online", this.jc), io(t, "offline", this.qc);
		}
	}
	get length() {
		return this.Tc.length;
	}
	retriableRequest(t, i) {
		let { retriesPerformedSoFar: e } = t, s = ke(t, Gu);
		D(e) && (s.url = Cu(s.url, { retry_count: e })), Wu(this._instance, i ? bi(bi({}, s), {}, { transport: i }) : s, (t, i) => {
			var n;
			if (200 !== t.statusCode && (400 > t.statusCode || t.statusCode >= 500)) {
				if ((0 === t.statusCode ? 3 : 10) > (null != e ? e : 0)) return void this.js(bi({ retriesPerformedSoFar: e }, s), i);
				0 === t.statusCode && Ws.warn(`Request failed before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped retrying after ${null != e ? e : 0} retries.`);
			}
			null === (n = s.callback) || void 0 === n || n.call(s, t);
		});
	}
	js(t, i) {
		const e = t.retriesPerformedSoFar || 0;
		t.retriesPerformedSoFar = e + 1;
		const s = Math.max(function(t) {
			const i = 3e3 * Math.pow(2, t), e = i / 2, s = Math.min(18e5, i), n = (Math.random() - .5) * (s - e);
			return Math.ceil(s + n);
		}(e), null != i ? i : 0), n = Date.now() + s;
		this.Tc.push({
			retryAt: n,
			requestOptions: t
		});
		let r = `Enqueued failed request for retry in ${s}`;
		navigator.onLine || (r += " (Browser is offline)"), Ws.warn(r), this.Lc || (this.Lc = !0, this.Bc());
	}
	Bc() {
		if (this.zc && clearTimeout(this.zc), 0 === this.Tc.length) return this.Lc = !1, void (this.zc = void 0);
		this.zc = setTimeout(() => {
			this.Nc && this.Tc.length > 0 && this.Fc(), this.Bc();
		}, this.Dc);
	}
	Fc() {
		const t = Date.now(), i = [], e = this.Tc.filter((e) => t > e.retryAt || (i.push(e), !1));
		if (this.Tc = i, e.length > 0) for (const { requestOptions: t } of e) this.retriableRequest(t);
	}
	unload() {
		this.zc && (clearTimeout(this.zc), this.zc = void 0), this.Lc = !1, C(t) || (this.jc && (t.removeEventListener("online", this.jc), this.jc = void 0), this.qc && (t.removeEventListener("offline", this.qc), this.qc = void 0));
		for (const { requestOptions: t } of this.Tc) try {
			this._instance._send_request(bi(bi({}, t), {}, {
				callback: k(t.data) ? void 0 : t.callback,
				transport: "sendBeacon"
			}));
		} catch (t) {
			Ws.error(t);
		}
		this.Tc = [];
	}
};
var Ju = class {
	constructor(t) {
		this._instance = t, this.Hc = () => {
			var t, i, e, s;
			this.Uc || (this.Uc = {});
			const n = this.scrollElement(), r = this.scrollY(), o = n ? Math.max(0, n.scrollHeight - n.clientHeight) : 0, l = r + ((null == n ? void 0 : n.clientHeight) || 0), a = (null == n ? void 0 : n.scrollHeight) || 0;
			this.Uc.lastScrollY = Math.ceil(r), this.Uc.maxScrollY = Math.max(r, null !== (t = this.Uc.maxScrollY) && void 0 !== t ? t : 0), this.Uc.maxScrollHeight = Math.max(o, null !== (i = this.Uc.maxScrollHeight) && void 0 !== i ? i : 0), this.Uc.lastContentY = l, this.Uc.maxContentY = Math.max(l, null !== (e = this.Uc.maxContentY) && void 0 !== e ? e : 0), this.Uc.maxContentHeight = Math.max(a, null !== (s = this.Uc.maxContentHeight) && void 0 !== s ? s : 0);
		};
	}
	get Wc() {
		return this._instance.config.scroll_root_selector;
	}
	getContext() {
		return this.Uc;
	}
	resetContext() {
		const t = this.Uc;
		return this.Uc = void 0, setTimeout(this.Hc, 0), t;
	}
	startMeasuringScrollPosition() {
		io(t, "scroll", this.Hc, { capture: !0 }), io(t, "scrollend", this.Hc, { capture: !0 }), io(t, "resize", this.Hc);
	}
	scrollElement() {
		if (this.Wc) {
			const e = k(this.Wc) ? this.Wc : [this.Wc];
			for (const s of e) {
				var i;
				const e = null == t || null === (i = t.document) || void 0 === i ? void 0 : i.querySelector(s);
				if (e) return e;
			}
			return;
		}
		var e;
		return null == t || null === (e = t.document) || void 0 === e ? void 0 : e.documentElement;
	}
	Gc(i) {
		var e, s;
		const n = "y" === i ? "scrollTop" : "scrollLeft";
		if (this.Wc) {
			const t = this.scrollElement();
			return t && t[n] || 0;
		}
		return t ? "y" === i ? t.scrollY || t.pageYOffset || (null === (e = t.document) || void 0 === e || null === (e = e.documentElement) || void 0 === e ? void 0 : e.scrollTop) || 0 : t.scrollX || t.pageXOffset || (null === (s = t.document) || void 0 === s || null === (s = s.documentElement) || void 0 === s ? void 0 : s.scrollLeft) || 0 : 0;
	}
	scrollY() {
		return this.Gc("y");
	}
	scrollX() {
		return this.Gc("x");
	}
};
var Yu = (t) => aa(null == t ? void 0 : t.config.mask_personal_data_properties, null == t ? void 0 : t.config.custom_personal_data_properties, null == t ? void 0 : t.config.disable_capture_url_hashes);
var Zu = class {
	constructor(t, i, e, s) {
		this.ze = (t) => {
			const i = this.Vc();
			if (i && i.sessionId === t) return;
			const e = {
				sessionId: t,
				props: this.Qc(this._instance)
			};
			this.Jc.register({ [mr]: e });
		}, this._instance = t, this.Zc = i, this.Jc = e, this.Qc = s || Yu, this.Zc.onSessionId(this.ze);
	}
	Vc() {
		return this.Jc.props[mr];
	}
	getSetOnceProps() {
		var t;
		const i = null === (t = this.Vc()) || void 0 === t ? void 0 : t.props;
		return i ? "r" in i ? ua(i, this._instance.config.disable_capture_url_hashes, this._instance.config.mask_personal_data_properties, this._instance.config.custom_personal_data_properties) : {
			$referring_domain: i.referringDomain,
			$pathname: i.initialPathName,
			utm_source: i.utm_source,
			utm_campaign: i.utm_campaign,
			utm_medium: i.utm_medium,
			utm_content: i.utm_content,
			utm_term: i.utm_term
		} : {};
	}
	getSessionProps() {
		const t = {};
		return Gr(Zr(this.getSetOnceProps()), (i, e) => {
			"$current_url" === e && (e = "url"), t[`$session_entry_${b(e)}`] = i;
		}), t;
	}
};
var Xu = class {
	on(t, i) {
		return this.qo[t] || (this.qo[t] = []), this.qo[t].push(i), () => {
			this.qo[t] = this.qo[t].filter((t) => t !== i);
		};
	}
	emit(t, i) {
		for (const e of this.qo[t] || []) e(i);
		for (const e of this.qo["*"] || []) e(t, i);
	}
	constructor() {
		this.qo = {};
	}
};
var Qu = Vs("[SessionId]");
var th = 864e5;
var ih = class {
	on(t, i) {
		return this.Kc.on(t, i);
	}
	constructor(t, i, e) {
		var s;
		if (this.Yc = null, this.Xc = null, this.eh = [], this.ih = void 0, this.nh = !1, this.Kc = new Xu(), this.sh = (t, i) => !(!D(t) || !D(i)) && Math.abs(t - i) > this.sessionTimeoutMs, !t.persistence) throw new Error("SessionIdManager requires a PostHogPersistence instance");
		if ("always" === t.config.cookieless_mode) throw new Error("SessionIdManager cannot be used with cookieless_mode=\"always\"");
		this.Br = t.config, this.Jc = t.persistence, this.Ue = void 0, this.Xt = void 0, this._sessionStartTimestamp = null, this.rh = void 0, this._sessionActivityTimestamp = null, this.oh = i || ho, this.ah = e || ho;
		const n = this.Br.persistence_name || this.Br.token;
		if (this._sessionTimeoutMs = 1e3 * Q(this.Br.session_idle_timeout_seconds || 1800, 60, 36e3, Qu.createLogger("session_idle_timeout_seconds"), 1800), t.register({ $configured_session_timeout_ms: this._sessionTimeoutMs }), this.uh(), this.hh = "ph_" + n + "_window_id", this.dh = "ph_" + n + "_primary_window_exists", this.fh()) {
			const t = Ao.Pt(this.hh), i = Ao.Pt(this.dh);
			t && !i ? this.Ue = t : Ao.Dt(this.hh), Ao.$t(this.dh, !0);
		}
		null !== (s = this.Br.bootstrap) && void 0 !== s && s.sessionID && this.setBootstrapSessionId(this.Br.bootstrap.sessionID), this.ph();
	}
	get sessionTimeoutMs() {
		return this._sessionTimeoutMs;
	}
	onSessionId(t) {
		return C(this.eh) && (this.eh = []), this.eh.push(t), this.Xt && t(this.Xt, this.Ue), () => {
			this.eh = this.eh.filter((i) => i !== t);
		};
	}
	fh() {
		return "memory" !== this.Br.persistence && !this.Jc.gi && Ao.Ot();
	}
	gh(t) {
		t !== this.Ue && (this.Ue = t, this.fh() && Ao.$t(this.hh, t));
	}
	mh() {
		return this.Ue ? this.Ue : this.fh() ? Ao.Pt(this.hh) : null;
	}
	yh(t) {
		const i = this.Yc;
		return !I(i) && !I(t) && 5e3 > Math.abs(t - i);
	}
	bh(t, i, e) {
		const s = i !== this._sessionActivityTimestamp, n = !(t !== this.Xt || e !== this._sessionStartTimestamp);
		this._sessionStartTimestamp = e, this._sessionActivityTimestamp = i, this.Xt = t, n && !s || n && this.yh(i) || (this.Yc = i, this.Jc.register({ [er]: [
			i,
			t,
			e
		] }));
	}
	_h() {
		var t;
		const i = null === (t = this.Br) || void 0 === t ? void 0 : t.persistence_save_debounce_ms;
		return D(i) && i > 0;
	}
	wh() {
		this._h() ? this.Jc.refreshKey(er) : (this.Jc.flush(), this.Jc.load());
	}
	kh() {
		var t;
		if (I(this._sessionActivityTimestamp) || this._sessionActivityTimestamp === this.Yc) return;
		this.wh();
		const [, i, e] = this.Sh();
		i === this.Xt && e === this._sessionStartTimestamp && (this.Yc = this._sessionActivityTimestamp, this.Jc.register({ [er]: [
			this._sessionActivityTimestamp,
			null !== (t = this.Xt) && void 0 !== t ? t : null,
			this._sessionStartTimestamp
		] }), this.Jc.flush());
	}
	xh() {
		const [t] = this.Sh(), i = D(t) ? t : 0, e = D(this._sessionActivityTimestamp) ? this._sessionActivityTimestamp : 0;
		return Math.max(i, e);
	}
	$h(t) {
		return this.wh(), this.sh(t, this.xh());
	}
	Sh() {
		const t = this.Jc.props[er];
		return k(t) && 2 === t.length && t.push(t[0]), t || [
			0,
			null,
			0
		];
	}
	resetSessionId() {
		this.Yc = null, this.rh = void 0, clearTimeout(this.Ch), this.Ch = void 0, this.bh(null, null, null);
	}
	setBootstrapSessionId(t, i = !1) {
		const e = ((t, i = (/* @__PURE__ */ new Date()).getTime()) => {
			try {
				const e = ((t) => {
					const i = t.replace(/-/g, "");
					if (32 !== i.length) throw new Error("Not a valid UUID");
					if ("7" !== i[12]) throw new Error("Not a UUIDv7");
					return parseInt(i.substring(0, 12), 16);
				})(t);
				return e > i + 6e4 ? void Qu.error("Bootstrap sessionID cannot be in the future") : e;
			} catch (t) {
				Qu.error("Invalid sessionID in bootstrap", t);
				return;
			}
		})(t);
		return !C(e) && (i ? this.rh = {
			sessionId: t,
			sessionStartTimestamp: e
		} : this.bh(t, (/* @__PURE__ */ new Date()).getTime(), e), !0);
	}
	destroy() {
		this.nh = !0, this.kh(), clearTimeout(this.Ch), this.Ch = void 0, this.ih && t && (t.removeEventListener(Ur, this.ih, { capture: !1 }), this.ih = void 0), this.eh = [];
	}
	ph() {
		this.ih = () => {
			this.kh(), this.fh() && Ao.Dt(this.dh);
		}, io(t, Ur, this.ih, { capture: !1 });
	}
	checkAndGetSessionAndWindowId(t = !1, i = null, e = !1) {
		if ("always" === this.Br.cookieless_mode) throw new Error("checkAndGetSessionAndWindowId should not be called with cookieless_mode=\"always\"");
		const s = i || (/* @__PURE__ */ new Date()).getTime(), n = this.Xt;
		if (e) this.Xc = s;
		else if (I(this.Xc) || this.Xc > s || s - this.Xc >= 1e3) {
			var r, o;
			null === (r = (o = this.Jc).syncCookieProperties) || void 0 === r || r.call(o), this.Xc = s;
		}
		let [, l, a] = this.Sh();
		const u = !C(n) && l !== n, h = this.xh();
		let c = this.mh();
		const d = this.rh, v = !!d && (d.sessionStartTimestamp > s + 6e4 || s - d.sessionStartTimestamp > th), f = d ? v : D(a) && Math.abs(s - a) > th;
		let p = !1, g = u, _ = !l || !!d;
		const m = l;
		let y = !_ && !t && this.sh(s, h);
		if (y && (y = this.$h(s), y || Qu.info("cross-tab refresh kept the session alive", { sessionId: l }), [, l, a] = this.Sh(), y || (_ = !l || !!d)), _ || y || f) {
			g = !1;
			const t = d && !v;
			l = t ? d.sessionId : this.oh(), c = this.ah(), Qu.info("new session ID assigned", {
				sessionId: l,
				windowId: c,
				bootstrapped: !!t,
				changeReason: {
					noSessionId: _,
					activityTimeout: y,
					sessionPastMaximumLength: f
				}
			}), a = t ? d.sessionStartTimestamp : s, this.rh = void 0, p = !0;
		} else c || (c = this.ah(), p = !0), g = g || l !== m, g && (Qu.info("adopted cross-tab session id", {
			sessionId: l,
			windowId: c
		}), p = !0);
		const b = D(h) && t && !f ? h : s, w = D(a) ? a : (/* @__PURE__ */ new Date()).getTime();
		this.gh(c), this.bh(l, b, w), t || this.uh();
		const S = {
			noSessionId: _,
			activityTimeout: y,
			sessionPastMaximumLength: f,
			crossTabAdoption: g
		};
		return p && this.eh.forEach((t) => t(l, c, S)), {
			sessionId: l,
			windowId: c,
			sessionStartTimestamp: w,
			changeReason: p ? S : void 0,
			lastActivityTimestamp: h
		};
	}
	uh() {
		this.nh || (clearTimeout(this.Ch), this.Ch = setTimeout(() => {
			if (!this.nh) if (this.$h((/* @__PURE__ */ new Date()).getTime())) {
				const t = this.Xt;
				this.resetSessionId(), this.Kc.emit("forcedIdleReset", { idleSessionId: t });
			} else this.uh();
		}, 1.1 * this.sessionTimeoutMs));
	}
};
var eh = Object.freeze([
	"2026-08-30",
	"2026-08-29",
	"2026-06-25",
	"2026-05-30",
	"2026-01-30",
	"2025-11-30",
	"2025-05-24"
]);
var sh = function(t, i) {
	if (!t) return !1;
	const e = t.userAgent;
	if (e && X(e, i)) return !0;
	try {
		const e = null == t ? void 0 : t.userAgentData;
		if ((null == e ? void 0 : e.brands) && e.brands.some((t) => X(null == t ? void 0 : t.brand, i))) return !0;
	} catch (t) {}
	return !!t.webdriver;
};
function nh() {
	return (nh = J(function* () {
		const t = null == e ? void 0 : e.userAgentData;
		if (null == t ? void 0 : t.getHighEntropyValues) try {
			const i = yield t.getHighEntropyValues(["model"]), e = null == i ? void 0 : i.model;
			return R(e) && e.length > 0 ? e : void 0;
		} catch (t) {
			Ws.info("Unable to resolve $device_model from userAgentData.getHighEntropyValues", t);
			return;
		}
	})).apply(this, arguments);
}
function rh(t, i) {
	let e = `$survey_${i}/${t.id}`;
	return t.current_iteration && t.current_iteration > 0 && (e = `$survey_${i}/${t.id}/${t.current_iteration}`), e;
}
function oh(t) {
	var i;
	return !!(null === (i = t.conditions) || void 0 === i || null === (i = i.events) || void 0 === i || null === (i = i.values) || void 0 === i ? void 0 : i.length);
}
var lh = (t, i) => {
	if (!((t) => {
		try {
			new RegExp(t);
		} catch (t) {
			return !1;
		}
		return !0;
	})(i)) return !1;
	try {
		return new RegExp(i).test(t);
	} catch (t) {
		return !1;
	}
};
var ah = (t) => t.toLowerCase();
var uh = {
	exact: (t, i) => i.some((i) => t.some((t) => i === t)),
	is_not: (t, i) => i.every((i) => t.every((t) => i !== t)),
	regex: (t, i) => i.some((i) => t.some((t) => lh(i, t))),
	not_regex: (t, i) => i.every((i) => t.every((t) => !lh(i, t))),
	icontains: (t, i) => i.map(ah).some((i) => t.map(ah).some((t) => i.includes(t))),
	not_icontains: (t, i) => i.map(ah).every((i) => t.map(ah).every((t) => !i.includes(t))),
	gt: (t, i) => i.some((i) => {
		const e = parseFloat(i);
		return !isNaN(e) && t.some((t) => e > parseFloat(t));
	}),
	lt: (t, i) => i.some((i) => {
		const e = parseFloat(i);
		return !isNaN(e) && t.some((t) => e < parseFloat(t));
	})
};
function hh(t, i) {
	return !t || Object.entries(t).every(([t, e]) => {
		const s = null == i ? void 0 : i[t];
		if (null == s) return !1;
		const n = uh[e.operator];
		return !!n && n(e.values.map(String), [String(s)]);
	});
}
function ch(t, i, e) {
	return ql({
		distinct_id: t,
		userPropertiesToSet: i,
		userPropertiesToSetOnce: e
	});
}
var dh = "custom";
var vh = "i.posthog.com";
var fh = /^\/static\//;
var ph = [
	"/s/",
	"/e/",
	"/i/"
];
var gh = class {
	constructor(t) {
		this.Th = {}, this.instance = t;
	}
	get apiHost() {
		const t = this.instance.config.api_host.trim().replace(/\/$/, "");
		return "https://app.posthog.com" === t ? "https://us.i.posthog.com" : t;
	}
	get flagsApiHost() {
		const t = this.instance.config.flags_api_host;
		return t ? t.trim().replace(/\/$/, "") : this.apiHost;
	}
	get uiHost() {
		var t;
		let i = null === (t = this.instance.config.ui_host) || void 0 === t ? void 0 : t.replace(/\/$/, "");
		return i || (i = this.apiHost.replace(`.${vh}`, ".posthog.com")), "https://app.posthog.com" === i ? "https://us.posthog.com" : i;
	}
	get region() {
		return this.Th[this.apiHost] || (this.Th[this.apiHost] = /https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? "us" : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? "eu" : dh), this.Th[this.apiHost];
	}
	Mh(t) {
		if (!fh.test(t)) return;
		const i = this.instance.config.asset_host;
		return "string" == typeof i && i.trim().replace(/\/$/, "") || void 0;
	}
	Ih(t) {
		const i = Bl(t);
		return i ? i.protocol + "//" + i.host + i.pathname : void 0;
	}
	Eh(t, i, e) {
		if ("ui" === t) return e;
		let s = e;
		const n = this.instance.config.rewriteRequestPath;
		if (n) {
			var r;
			const t = (null === (r = Bl(e)) || void 0 === r ? void 0 : r.href) || e;
			s = n(new URL(t)).toString();
		}
		if (n && "api" === t && ph.some((t) => 0 === i.indexOf(t))) {
			const t = this.Ih(s);
			if (t) {
				const i = this.apiHost;
				let e = this.Ah;
				(null == e ? void 0 : e.apiHost) === i && e.rewriteRequestPath === n || (e = {
					apiHost: i,
					rewriteRequestPath: n,
					urls: /* @__PURE__ */ new Set()
				}, this.Ah = e), e.urls.add(t);
			}
		}
		return s;
	}
	isIngestionEndpoint(t) {
		const i = this.Ah, e = this.Ih(t);
		return (null == i ? void 0 : i.apiHost) === this.apiHost && i.rewriteRequestPath === this.instance.config.rewriteRequestPath && !!e && i.urls.has(e);
	}
	endpointFor(t, i = "") {
		if (i && (i = "/" === i[0] ? i : `/${i}`), "ui" === t) return this.Eh(t, i, this.uiHost + i);
		if ("flags" === t) return this.Eh(t, i, this.flagsApiHost + i);
		if ("assets" === t) {
			const e = this.Mh(i);
			if (e) return this.Eh(t, i, `${e}${i}`);
		}
		if (this.region === dh) return this.Eh(t, i, this.apiHost + i);
		const e = vh + i;
		switch (t) {
			case "assets": return this.Eh(t, i, `https://${this.region}-assets.${e}`);
			case "api": return this.Eh(t, i, `https://${this.region}.${e}`);
		}
	}
};
var _h = Vs("[Surveys]");
var mh = (t) => {
	try {
		const i = ((t) => ((t, i) => `seenSurvey_${function(t) {
			return t.current_iteration && t.current_iteration > 0 ? `${t.id}_${t.current_iteration}` : t.id;
		}(i)}`)(0, t))(t);
		if (localStorage.getItem(i)) return;
		localStorage.setItem(i, "true");
	} catch (t) {
		_h.error("Failed to persist survey seen state", t);
	}
};
var yh = [
	Oa.Popover,
	Oa.Widget,
	Oa.API
];
var bh = {
	ignoreConditions: !1,
	ignoreDelay: !1,
	displayType: Fa.Popover
};
var wh = Vs("[PostHog ExternalIntegrations]");
var $h = {
	intercom: "intercom-integration",
	crispChat: "crisp-chat-integration"
};
var Sh = class {
	constructor(t) {
		this._instance = t;
	}
	Ka(t, i) {
		var e;
		null === (e = Ys(this._instance)) || void 0 === e || e(this._instance, t, (t) => {
			if (t) return wh.error("failed to load script", t);
			i();
		});
	}
	startIfEnabledOrStop() {
		var t;
		for (const [n, r] of Object.entries(null !== (t = this._instance.config.integrations) && void 0 !== t ? t : {})) {
			var i, e, s;
			r && !(null === (i = c.__PosthogExtensions__) || void 0 === i || null === (i = i.integrations) || void 0 === i ? void 0 : i[n]) && this.Ka($h[n], () => {
				var t;
				null === (t = c.__PosthogExtensions__) || void 0 === t || null === (t = t.integrations) || void 0 === t || null === (t = t[n]) || void 0 === t || t.start(this._instance);
			}), !r && null !== (e = c.__PosthogExtensions__) && void 0 !== e && null !== (e = e.integrations) && void 0 !== e && e[n] && (null === (s = c.__PosthogExtensions__) || void 0 === s || null === (s = s.integrations) || void 0 === s || null === (s = s[n]) || void 0 === s || s.stop());
		}
	}
};
var xh = class {
	constructor(t) {
		this.disabled = !1 === t;
		const i = P(t) ? t : {};
		this.thresholdPx = i.threshold_px || 30, this.timeoutMs = i.timeout_ms || 1e3, this.clickCount = i.click_count || 3, this.clicks = [];
	}
	isRageClick(t, i, e) {
		if (this.disabled) return !1;
		const s = this.clicks[this.clicks.length - 1];
		if (s && Math.abs(t - s.x) + Math.abs(i - s.y) < this.thresholdPx && this.timeoutMs > e - s.timestamp) {
			if (this.clicks.push({
				x: t,
				y: i,
				timestamp: e
			}), this.clicks.length === this.clickCount) return !0;
		} else this.clicks = [{
			x: t,
			y: i,
			timestamp: e
		}];
		return !1;
	}
};
var Eh = () => typeof window > "u" ? void 0 : window;
var kh = () => typeof document > "u" ? void 0 : document;
var Th = "$copy_autocapture";
var Ph = [
	"password",
	"hidden",
	"file",
	"checkbox",
	"button",
	"submit",
	"reset",
	"image"
];
var Oh = Vs("[AutoCapture]");
function Ch(t, i) {
	return i.length > t ? i.slice(0, t) + "..." : i;
}
function Rh(t) {
	if (t.previousElementSibling) return t.previousElementSibling;
	let i = t;
	do
		i = i.previousSibling;
	while (i && !Do(i));
	return i;
}
function Ah(t, { e: i, maskAllElementAttributes: e, maskAllText: s, elementAttributeIgnoreList: n, elementsChainAsString: r, disableCaptureUrlHashes: o }) {
	var l, a;
	if (!Do(t)) return { props: {} };
	const u = [t], h = /* @__PURE__ */ new Set([t]);
	let c = t;
	for (; !jo(c, "body") && 1e3 > u.length;) {
		const t = c.assignedSlot || c.parentNode, i = No(t) ? t.host : t && Do(t) ? t : null;
		if (!i || h.has(i)) break;
		h.add(i), u.push(i), c = i;
	}
	const d = "click" === i.type && "http://www.w3.org/2000/svg" === t.namespaceURI ? u.findIndex((t) => jo(t, "button") || jo(t, "a")) : -1;
	d > 0 && (s = s || u.slice(0, d + 1).some((t) => !cl(t) || dl(t)));
	const v = [], f = {};
	let p, g = !1, _ = !1;
	if (Gr(u, (t) => {
		const i = cl(t);
		if (i && jo(t, "a") && !e && !(null == n ? void 0 : n.includes("href"))) {
			const e = t.getAttribute("href");
			g = !!(i && e && bl(e)) && (o ? di(e) : e);
		}
		m(zo(t), "ph-no-capture") && (_ = !0), v.push(function(t, i, e, s, n = !1) {
			const r = t.tagName.toLowerCase(), o = { tag_name: r };
			Vo.indexOf(r) > -1 && !e && (o.$el_text = "a" === r.toLowerCase() || "button" === r.toLowerCase() ? Ch(1024, wl(t)) : Ch(1024, qo(t)));
			const l = zo(t);
			i || null != s && s.includes("class") || 0 >= l.length || (o.classes = l.filter(function(t) {
				return "" !== t;
			})), Gr(hl(t) ? [] : t.attributes, function(e) {
				var r;
				if ((!dl(t) || -1 !== [
					"name",
					"id",
					"class",
					"aria-label"
				].indexOf(e.name)) && !(null == s ? void 0 : s.includes(e.name)) && !i && bl(e.value) && (!R(r = e.name) || "_ngcontent" !== r.substring(0, 10) && "_nghost" !== r.substring(0, 7))) {
					let t = e.value;
					"class" === e.name && (t = Bo(t).join(" ")), o["attr__" + e.name] = Ch(1024, "href" === e.name && n ? di(t) : t);
				}
			});
			let a = 1, u = 1, h = t;
			for (; h = Rh(h);) a++, h.tagName === t.tagName && u++;
			return o.nth_child = a, o.nth_of_type = u, o;
		}(t, e, s, n, o)), Gr(function(t) {
			if (!cl(t)) return {};
			const i = {};
			return Gr(t.attributes, function(t) {
				if (t.name && 0 === t.name.indexOf("data-ph-capture-attribute")) {
					const e = t.name.replace("data-ph-capture-attribute-", ""), s = t.value;
					e && s && bl(s) && (i[e] = s);
				}
			}), i;
		}(t), (t, i) => {
			({}).hasOwnProperty.call(f, i) || (f[i] = t);
		});
	}), _) return {
		props: {},
		explicitNoCapture: _
	};
	if (d > 0 && (t = u[d], v.splice(0, d)), s || (v[0].$el_text = jo(t, "a") || jo(t, "button") ? wl(t) : qo(t)), g) {
		var y, b;
		v[0].attr__href = g;
		const t = null === (y = Bl(g)) || void 0 === y ? void 0 : y.host, i = null === (b = Eh()) || void 0 === b || null === (b = b.location) || void 0 === b ? void 0 : b.host;
		t && i && t !== i && (p = g);
	}
	return {
		props: Kr((S = i.type, {
			$event_type: S,
			$ce_version: 1
		}), r ? {} : { $elements: v }, { $elements_chain: (w = v, k(w) ? function(t) {
			return t.map((t) => {
				var i, e;
				let s = "";
				if (t.tag_name && (s += t.tag_name), t.attr_class) {
					t.attr_class.sort();
					for (const i of t.attr_class) s += `.${i.replace(/"/g, "")}`;
				}
				const n = bi(bi(bi(bi({}, t.text ? { text: t.text } : {}), {}, {
					"nth-child": null !== (i = t.nth_child) && void 0 !== i ? i : 0,
					"nth-of-type": null !== (e = t.nth_of_type) && void 0 !== e ? e : 0
				}, t.href ? { href: t.href } : {}), t.attr_id ? { attr_id: t.attr_id } : {}), t.attributes), r = {};
				return Jr(n).sort(([t], [i]) => function(t, i) {
					return i > t ? -1 : t > i ? 1 : 0;
				}(t, i)).forEach(([t, i]) => r[Sl(t.toString())] = Sl(i.toString())), s += ":", s += Jr(r).map(([t, i]) => `${t}="${i}"`).join(""), s;
			}).join(";");
		}(function(t) {
			return t.map((t) => {
				var i, e;
				const s = {
					text: null === (i = t.$el_text) || void 0 === i ? void 0 : i.slice(0, 400),
					tag_name: t.tag_name,
					href: null === (e = t.attr__href) || void 0 === e ? void 0 : e.slice(0, 2048),
					attr_class: xl(t),
					attr_id: t.attr__id,
					nth_child: t.nth_child,
					nth_of_type: t.nth_of_type,
					attributes: {}
				};
				return Jr(t).filter(([t]) => 0 === t.indexOf("attr__")).forEach(([t, i]) => s.attributes[t] = i), s;
			});
		}(w)) : "") }, (null === (l = v[0]) || void 0 === l ? void 0 : l.$el_text) ? { $el_text: null === (a = v[0]) || void 0 === a ? void 0 : a.$el_text } : {}, p && "click" === i.type ? { $external_click_url: p } : {}, f),
		target: t
	};
	var w, S;
}
var Ih = "autocapture";
var Mh = class {
	Sa() {
		this.xa = void 0, clearTimeout(this.$a), this.$a = void 0;
	}
	Ca(t) {
		var i;
		if (!cl(t)) return !0;
		const e = null !== (i = this.Ta().css_selector_ignorelist) && void 0 !== i ? i : Yo, s = /* @__PURE__ */ new Set();
		let n = t;
		for (; n;) {
			if (s.size >= 1e3 || s.has(n)) return !0;
			s.add(n);
			const t = n, i = zo(t);
			if (m(i, "ph-no-capture") || m(i, "ph-sensitive") || dl(t) || e.some((i) => Go(t, i))) return !0;
			const r = n.assignedSlot || n.parentNode;
			n = No(r) ? r.host : r && Do(r) ? r : null;
		}
		return !1;
	}
	Ma(t) {
		if (!this.isEnabled || "pointercancel" === t.type) return void this.Sa();
		if ("pointerdown" === t.type) {
			var i;
			this.Sa();
			const e = Wo(t);
			t.isPrimary && 0 === t.button && !t.ctrlKey && e && Do(e) && (this.xa = {
				target: e,
				excluded: this.Ca(e),
				id: t.pointerId,
				x: t.clientX,
				y: t.clientY,
				released: !1,
				distinctId: null === (i = this.Gl) || void 0 === i ? void 0 : i.distinctId
			});
			return;
		}
		const e = this.xa;
		e && (t.pointerId !== e.id || Math.abs(t.clientX - e.x) > 5 || Math.abs(t.clientY - e.y) > 5 ? this.Sa() : "pointerup" === t.type && (e.released = !0, this.$a = setTimeout(() => this.Sa(), 0)));
	}
	Ia(t) {
		var i;
		const e = this.xa;
		this.Sa();
		const s = Wo(t);
		if ((null == e ? void 0 : e.released) && e.target.isConnected && e.distinctId === (null === (i = this.Gl) || void 0 === i ? void 0 : i.distinctId) && t.pointerId === e.id && (t.detail > 0 || "touch" === t.pointerType || "pen" === t.pointerType) && 0 === t.button && 5 >= Math.abs(t.clientX - e.x) && 5 >= Math.abs(t.clientY - e.y) && s && (jo(s, "html") || jo(s, "body"))) {
			var n, r, o;
			if (e.excluded) return null;
			const t = null !== (n = this.Ta().css_selector_ignorelist) && void 0 !== n ? n : Yo;
			return [
				s,
				null === (r = kh()) || void 0 === r ? void 0 : r.documentElement,
				null === (o = kh()) || void 0 === o ? void 0 : o.body
			].some((i) => {
				if (!i) return !1;
				const e = zo(i);
				return m(e, "ph-no-capture") || m(e, "ph-sensitive") || !cl(i) || dl(i) || t.some((t) => Go(i, t));
			}) ? null : e.target;
		}
	}
	constructor(t) {
		this.Jl = t, this.name = Ih, this.Ea = !1, this.Aa = null, this.Ra = !1, this.Pa = /* @__PURE__ */ new Map(), this.Oa = !1, this.Br = {
			enabled: !1,
			rageclick: !1,
			maskAllElementAttributes: !1,
			maskAllText: !1,
			disableCaptureUrlHashes: !1,
			remoteRequestsDisabled: !1
		}, this.Ai = !1, this.Jl.refresh(this.Br), this.rageclicks = new xh(this.Br.rageclick), this.Fa = null;
	}
	setup(t) {
		this.La(), this.Gl = t;
		const i = t.onRemoteConfig(this.onRemoteConfig.bind(this));
		this.Ai ? i.dispose() : (this.la = i, this.startIfEnabled());
	}
	dispose() {
		var t;
		this.Ai || (this.Ai = !0, this.Gl = void 0, null === (t = this.la) || void 0 === t || t.dispose(), this.la = void 0, this.Pa.clear(), this.Fa = null, this.Da());
	}
	Ta() {
		return this.Jl.refresh(this.Br), this.Br;
	}
	La() {
		var t, i;
		return this.Ta(), this.Br.url_allowlist = null === (t = this.Br.url_allowlist) || void 0 === t ? void 0 : t.map((t) => new RegExp(t)), this.Br.url_ignorelist = null === (i = this.Br.url_ignorelist) || void 0 === i ? void 0 : i.map((t) => new RegExp(t)), this.Br;
	}
	Na() {
		const t = Eh(), i = kh();
		if (!this.isBrowserSupported()) return void Oh.info("Disabling Automatic Event Collection because this browser is not supported");
		if (!t || !i) return;
		this.ja = t, this.qa = i;
		const e = this.Ba = (i) => {
			i = i || (null == t ? void 0 : t.event);
			try {
				if ("blur" === i.type) return void this.Sa();
				if (0 === i.type.indexOf("pointer")) return void this.Ma(i);
				const t = "click" === i.type ? this.Ia(i) : void 0;
				if (I(t)) return;
				this.za(i, "$autocapture", t);
			} catch (t) {
				Oh.error("Failed to capture event", t);
			}
		};
		if (io(t, "blur", e), io(i, "submit", e, { capture: !0 }), io(i, "change", e, { capture: !0 }), io(i, "click", e, { capture: !0 }), Gr([
			"pointerdown",
			"pointermove",
			"pointerup",
			"pointercancel"
		], (t) => {
			io(i, t, e, { capture: !0 });
		}), this.Ta().capture_copied_text) {
			const e = this.Ha = (i) => {
				i = i || (null == t ? void 0 : t.event);
				try {
					this.za(i, Th);
				} catch (t) {
					Oh.error("Failed to capture clipboard event", t);
				}
			};
			io(i, "copy", e, { capture: !0 }), io(i, "cut", e, { capture: !0 }), io(i, "paste", e, { capture: !0 });
		}
	}
	Da() {
		const t = this.ja, i = this.qa;
		this.Sa(), this.Ba && (t?.removeEventListener("blur", this.Ba), Gr([
			"pointerdown",
			"pointermove",
			"pointerup",
			"pointercancel"
		], (t) => {
			i?.removeEventListener(t, this.Ba, !0);
		}), i?.removeEventListener("submit", this.Ba, !0), i?.removeEventListener("change", this.Ba, !0), i?.removeEventListener("click", this.Ba, !0), this.Ba = void 0), this.Ha && (i?.removeEventListener("copy", this.Ha, !0), i?.removeEventListener("cut", this.Ha, !0), i?.removeEventListener("paste", this.Ha, !0), this.Ha = void 0), this.ja = void 0, this.qa = void 0, this.Ea = !1;
	}
	startIfEnabled() {
		this.isEnabled || this.Sa(), !this.Ai && this.Gl && this.isEnabled && !this.Ea && (this.Na(), this.Ea = !0);
	}
	onRemoteConfig(t) {
		if (this.Ai) return;
		if (this.Ra = !0, !t.ok) return void this.startIfEnabled();
		const i = t.config;
		i.elementsChainAsString && (this.Oa = i.elementsChainAsString);
		const e = i.autocapture_opt_out;
		var s;
		j(e) && (null === (s = this.Gl) || void 0 === s || s.kv.set("$autocapture_disabled_server_side", e), this.Aa = e), this.startIfEnabled();
	}
	setElementSelectors(t, i = this) {
		if (this.Ai) return;
		t.size ? this.Pa.set(i, new Set(t)) : this.Pa.delete(i);
		const e = /* @__PURE__ */ new Set();
		this.Pa.forEach((t) => {
			t.forEach((t) => e.add(t));
		}), this.Fa = e;
	}
	getElementSelectors(t, i) {
		var e;
		const s = [];
		return null === (e = this.Fa) || void 0 === e || e.forEach((e) => {
			var n;
			(null === (n = kh()) || void 0 === n ? void 0 : n.querySelectorAll(e))?.forEach((n) => {
				t !== n && i !== n || m(s, e) || s.push(e);
			});
		}), s;
	}
	get isEnabled() {
		var t, i;
		if (this.Ai) return !1;
		const e = null === (t = this.Gl) || void 0 === t ? void 0 : t.kv.get($n), s = this.Aa, n = this.Ta();
		if (!n.remoteRequestsDisabled && !this.Ra) return !1;
		const r = n.remoteRequestsDisabled && !this.Ra;
		if (I(s) && !j(e) && !r) return !1;
		const o = null !== (i = this.Aa) && void 0 !== i ? i : !!e;
		return !!n.enabled && !o;
	}
	za(t, i = "$autocapture", e) {
		if (!this.isEnabled) return void this.Sa();
		let s = e || Wo(t);
		Lo(s) && (s = s.parentNode || null);
		const n = this.La();
		var r;
		"$autocapture" === i && "click" === t.type && t instanceof MouseEvent && n.rageclick && null !== (r = this.rageclicks) && void 0 !== r && r.isRageClick(t.clientX, t.clientY, t.timeStamp || (/* @__PURE__ */ new Date()).getTime()) && ll(s, n.rageclick) && this.za(t, "$rageclick", e);
		const o = i === Th, l = o ? bi(bi({}, n), {}, { dom_event_allowlist: void 0 }) : n;
		if (s && function(t, i, e, s, n, r) {
			var o;
			const l = typeof window > "u" ? void 0 : window;
			if (!l || al(t)) return !1;
			if ((null == e ? void 0 : e.url_allowlist) && !Uo(e.url_allowlist, r)) return !1;
			if ((null == e ? void 0 : e.url_ignorelist) && Uo(e.url_ignorelist, r)) return !1;
			if (null == e ? void 0 : e.dom_event_allowlist) {
				const t = e.dom_event_allowlist;
				if (t && !t.some((t) => i.type === t)) return !1;
			}
			const { parentIsUsefulElement: a, targetElementList: u, isComplete: h } = ul(t, s);
			if (!h) return !1;
			if (!function(t, i) {
				const e = null == i ? void 0 : i.element_allowlist;
				if (C(e)) return !0;
				for (const i of t) if (e.some((t) => i.tagName.toLowerCase() === t)) return !0;
				return !1;
			}(u, e)) return !1;
			if (!Ko(u, null == e ? void 0 : e.css_selector_allowlist)) return !1;
			if (Ko(u, null !== (o = null == e ? void 0 : e.css_selector_ignorelist) && void 0 !== o ? o : Yo)) return !1;
			try {
				const e = l.getComputedStyle(t);
				if (e && "pointer" === e.getPropertyValue("cursor") && "click" === i.type) return !0;
			} catch (t) {}
			const c = t.tagName.toLowerCase();
			switch (c) {
				case "html": return !1;
				case "form": return (n || ["submit"]).indexOf(i.type) >= 0;
				case "input":
				case "select":
				case "textarea": return (n || ["change", "click"]).indexOf(i.type) >= 0;
				default: return a ? (n || ["click"]).indexOf(i.type) >= 0 : (n || ["click"]).indexOf(i.type) >= 0 && (Vo.indexOf(c) > -1 || "true" === t.getAttribute("contenteditable"));
			}
		}(s, t, l, o, o ? [
			"copy",
			"cut",
			"paste"
		] : void 0, { config: { get_current_url: n.getCurrentUrl } })) {
			var a;
			const { props: e, explicitNoCapture: r, target: o } = Ah(s, {
				e: t,
				maskAllElementAttributes: n.maskAllElementAttributes,
				maskAllText: n.maskAllText,
				elementAttributeIgnoreList: n.element_attribute_ignorelist,
				elementsChainAsString: this.Oa,
				disableCaptureUrlHashes: n.disableCaptureUrlHashes
			});
			if (r) return !1;
			const l = this.getElementSelectors(s, o);
			if (l && l.length > 0 && (e.$element_selectors = l), i === Th) {
				const i = t.type || "clipboard";
				if ("paste" !== i) {
					var u, h;
					const t = null === (u = Eh()) || void 0 === u || null === (u = u.getSelection()) || void 0 === u ? void 0 : u.toString(), i = Ho(t);
					if (!i) return !1;
					e.$selected_content = i, e.$clipboard_text_length = null !== (h = null == t ? void 0 : t.length) && void 0 !== h ? h : 0;
				}
				e.$copy_type = i;
			}
			if ("$autocapture" === i && "change" === t.type && n.capture_value_css_selector_allowlist && !n.maskAllText && (jo(c = s, "input") ? !m(Ph, c.type) : jo(c, "textarea") || jo(c, "select") && !c.multiple) && function(t, i) {
				var e;
				if (!cl(t)) return !1;
				const s = null !== (e = i.css_selector_ignorelist) && void 0 !== e ? e : Yo, n = /* @__PURE__ */ new Set();
				let r = t;
				for (jo(t, "select") && (r = t.options[t.selectedIndex] || t); r;) {
					const t = r, i = zo(t);
					if (n.size >= 1e3 || n.has(r) || m(i, "ph-sensitive") || m(i, "ph-no-capture") || s.some((i) => Go(t, i))) return !1;
					n.add(r);
					const e = r.assignedSlot || r.parentNode;
					r = No(e) ? e.host : e && Do(e) ? e : null;
				}
				return !0;
			}(s, n) && !s.querySelector(".ph-no-capture, .ph-sensitive")) {
				const t = n.capture_value_css_selector_allowlist;
				let i = !1;
				try {
					i = T(t) ? !!t(s) : k(t) && t.some((t) => Go(s, t));
				} catch (t) {
					Oh.error("capture_value_css_selector_allowlist threw", t);
				}
				i && (e.$input_value = s.value);
			}
			return null === (a = this.Gl) || void 0 === a || a.capture(i, e), !0;
		}
		var c;
	}
	isBrowserSupported() {
		var t;
		return T(null === (t = kh()) || void 0 === t ? void 0 : t.querySelectorAll);
	}
};
var Fh = "featureFlags";
var Dh = "logs";
var jh = () => {
	var i;
	return (null == t || null === (i = t.performance) || void 0 === i ? void 0 : i.now) ? t.performance.now() : Date.now();
};
var Lh = [];
var Nh = [
	50,
	75,
	100,
	150,
	200,
	300,
	400,
	500,
	750,
	1e3,
	1500,
	2e3,
	3e3,
	5e3,
	1e4
];
var Bh = [
	5,
	10,
	25,
	...Nh
];
var Uh = class {
	constructor(t) {
		this._instance = t;
	}
	initialize() {}
	get(t) {
		const i = this._instance.persistence;
		if ("string" == typeof t) return null == i ? void 0 : i.get_property(t);
		const e = {};
		for (const s of t) {
			const t = null == i ? void 0 : i.get_property(s);
			C(t) || (e[s] = t);
		}
		return e;
	}
	set(t, i) {
		var e;
		null === (e = this._instance.persistence) || void 0 === e || e.register("string" == typeof t ? { [t]: i } : t);
	}
	remove(t) {
		var i;
		null === (i = this._instance.persistence) || void 0 === i || i.unregister(t);
	}
};
var zh = class {
	constructor(t) {
		this.instance = t, this.R = Ws, this.kv = new Uh(t), this.onSession = (t) => Da(this.instance.onSessionId((i) => {
			try {
				t(i);
			} catch (t) {
				this.R.error("Browser extension session listener failed", t);
			}
		})), this.onEvent = (t) => Da(this.instance._addCaptureHook((i, e) => {
			if (e) try {
				t({
					event: i,
					properties: e.properties
				});
			} catch (t) {
				this.R.error("Browser extension event listener failed", t);
			}
		})), this.onRemoteConfig = (t) => {
			const i = (i) => {
				try {
					t(i);
				} catch (t) {
					this.R.error("Browser extension remote config listener failed", t);
				}
			}, e = this.instance.mr.on("extensionsRemoteConfig", i);
			return this.instance.gr && i(this.instance.gr), Da(e);
		};
	}
	get logger() {
		return this.R;
	}
	get distinctId() {
		return this.instance.get_distinct_id();
	}
	get anonymousId() {
		var t;
		return null !== (t = this.instance.get_property("$device_id")) && void 0 !== t ? t : this.distinctId;
	}
	get deviceId() {
		const t = this.instance.get_property(Rn);
		return "string" == typeof t ? t : void 0;
	}
	get library() {
		return {
			name: rn.LIB_NAME,
			version: rn.LIB_VERSION
		};
	}
	get initialPersonProperties() {
		var t, i;
		return null !== (t = null === (i = this.instance.persistence) || void 0 === i ? void 0 : i.get_initial_props()) && void 0 !== t ? t : {};
	}
	get groups() {
		return this.instance.getGroups();
	}
	get session() {
		try {
			var t, i, e, s, n;
			const r = null === (t = this.instance.sessionManager) || void 0 === t ? void 0 : t.checkAndGetSessionAndWindowId(!0);
			return {
				sessionId: null !== (i = null == r ? void 0 : r.sessionId) && void 0 !== i ? i : "",
				windowId: null !== (e = null == r ? void 0 : r.windowId) && void 0 !== e ? e : "",
				sessionStartTimestamp: null !== (s = null == r ? void 0 : r.sessionStartTimestamp) && void 0 !== s ? s : 0,
				lastActivityTimestamp: null !== (n = null == r ? void 0 : r.lastActivityTimestamp) && void 0 !== n ? n : 0
			};
		} catch (t) {
			return {
				sessionId: "",
				windowId: "",
				sessionStartTimestamp: 0,
				lastActivityTimestamp: 0
			};
		}
	}
	get isOptedOut() {
		return this.instance.has_opted_out_capturing();
	}
	get canCapture() {
		return T(this.instance.is_capturing) ? this.instance.is_capturing() : !this.isOptedOut;
	}
	get isRateLimited() {
		var t;
		return !!(null === (t = this.instance.rateLimiter) || void 0 === t ? void 0 : t.isClientRateLimited);
	}
	get projectToken() {
		return this.instance.config.token;
	}
	getExtension(t) {
		let i;
		switch (t) {
			case Fh:
			case "featureFlagsCommon":
				i = this.instance.featureFlags;
				break;
			case Dh:
				i = this.instance.logs;
				break;
			case "surveys":
				i = this.instance.surveys;
				break;
			case Ih: i = this.instance.autocapture;
		}
		return i;
	}
	capture(t, i, e) {
		if (!e) return this.yr(this.instance.capture(t, i));
		const s = bi({
			timestamp: e.timestamp,
			uuid: e.uuid,
			$set: e.set,
			$set_once: e.setOnce
		}, "unload" === e.delivery ? {
			transport: "sendBeacon",
			send_instantly: !0
		} : {});
		return this.yr(this.instance.capture(t, i, s));
	}
	yr(t) {
		var i;
		return !C(t) || !(null === (i = this.instance.rateLimiter) || void 0 === i ? void 0 : i.lastEventRateLimited);
	}
	registerDynamicEventProperties(t) {
		return Da(this.instance.br(t));
	}
	sendRequest(i) {
		var e = this;
		return J(function* (i, s = {}) {
			var n;
			const r = null !== (n = s.target) && void 0 !== n ? n : "api", o = s.query ? Cu(i, s.query) : i, l = e.instance.requestRouter.endpointFor(r, o), a = {
				method: s.method,
				url: l,
				data: s.body,
				headers: s.headers,
				timeout: s.timeoutMs,
				fireCallbackOnDrop: !0,
				transport: s.transport,
				compression: s.compression,
				compressionFallback: "flags" === s.target && "best-available" === s.compression ? p.Base64 : void 0,
				timestampMode: s.sentAt
			};
			return "api" === r && "/i/v1/logs" === i && (a.batchKey = "logs"), "sendBeacon" === s.transport ? (e.instance._send_request(a), { statusCode: 202 }) : new Promise((i) => {
				var s;
				if (a.callback = i, "flags" === r && (null === (s = e.instance.config.metrics) || void 0 === s ? void 0 : s.flags)) {
					let s, n;
					a.onDispatch = () => {
						s = jh();
					}, a.onSend = (i) => {
						n = ((i) => {
							try {
								return ((i) => {
									var e;
									const s = null == t ? void 0 : t.PerformanceObserver, n = null === (e = Bl(i)) || void 0 === e ? void 0 : e.href;
									if (!s || !n) return;
									const r = jh(), o = {
										name: n,
										before: Infinity,
										inFlight: !0
									};
									let l, a, u, h = Infinity, c = !1;
									const d = () => {
										c || (c = !0, clearTimeout(u), p.disconnect(), Lh.splice(Lh.indexOf(o), 1));
									};
									let v = !1;
									const f = (t) => {
										for (const i of t) {
											const t = i.startTime;
											i.name !== n || (v ? r >= t : r > t) || t >= o.before || l && t >= l.startTime || (l = i);
										}
										if (l && a && h >= l.startTime) {
											const t = a;
											d(), t(l);
										}
									}, p = new s((t) => f(t.getEntriesByName(n, "resource")));
									p.observe({ entryTypes: ["resource"] });
									for (const t of Lh) t.name === n && (t.before = Math.min(t.before, r), v = v || t.inFlight);
									return Lh.push(o), {
										take(t, i) {
											c || (h = t, o.inFlight = !1, a = i, u = setTimeout(d, 5e3), T(p.takeRecords) && f(p.takeRecords()));
										},
										stop: d
									};
								})(i);
							} catch (t) {
								return;
							}
						})(i);
					}, a.callback = (t) => {
						if (i(t), C(s)) return;
						const r = s, o = jh();
						try {
							const i = ((t, i) => {
								var e, s;
								const n = i.statusCode || void 0, r = { "server.address": (null !== (e = null === (s = Bl(t)) || void 0 === s ? void 0 : s.hostname) && void 0 !== e ? e : t).replace(/^\[(.*)\]$/, "$1") };
								n && (r["http.response.status_code"] = n);
								const o = ((t, i) => t ? 400 > t ? void 0 : String(t) : "AbortError" === (null == i ? void 0 : i.name) ? "timeout" : "_OTHER")(n, i.error);
								o && (r["error.type"] = o);
								const l = Nl();
								return l && (r["client.timezone"] = l), r;
							})(l, t);
							if (e.wr("posthog.flags.request.duration", o - r, Nh, i), t.statusCode && n) return void n.take(o, (t) => e.kr(t, r, o, i));
						} catch (t) {
							Ws.error("Failed to record the /flags request timing", t);
						}
						n?.stop();
					};
				}
				e.instance._send_request(a);
			});
		}).apply(this, arguments);
	}
	kr(t, i, e, s) {
		if (t.responseEnd >= t.startTime) try {
			const n = Math.min(t.responseEnd, e);
			this.wr("posthog.flags.request.pre_send_duration", t.startTime - i, Bh, s), this.wr("posthog.flags.request.network_duration", n - t.startTime, Nh, s), this.wr("posthog.flags.request.main_thread_duration", e - n, Bh, s);
		} catch (t) {
			Ws.error("Failed to record the /flags request timing split", t);
		}
	}
	wr(t, i, e, s) {
		var n;
		null === (n = this.instance.metrics) || void 0 === n || n.histogram(t, i, {
			unit: "ms",
			attributes: bi({}, s),
			bounds: e
		});
	}
};
var Hh = {};
var qh = 0;
var Wh = () => {};
var Vh = "Consent opt in/out is not valid with cookieless_mode=\"always\" and will be ignored";
var Gh = "Surveys module not available";
var Kh = "sanitize_properties is deprecated. Use before_send instead";
var Jh = "Invalid value for property_denylist config: ";
var Yh = [
	"$recording_status",
	"$sdk_debug_recording_script_not_loaded",
	"$sdk_debug_replay_url_trigger_status",
	"$sdk_debug_replay_event_trigger_status",
	"$sdk_debug_replay_linked_flag_trigger_status",
	"$sdk_debug_replay_rrweb_error",
	"$sdk_debug_replay_internal_buffer_length",
	"$sdk_debug_replay_flushed_size"
];
var Zh = [
	"$feature_flag_called",
	"$$heatmap",
	"$snapshot"
];
var Xh = (t) => "$" === t.charAt(0) && !m(Zh, t);
var Qh = /^[A-Za-z0-9_-]{1,400}$/;
var tc = /^fb\.[0-9]+\.[0-9]+\.[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)?$/;
var ic = /^fb\.[0-9]+\.[0-9]+\.[0-9]+$/;
var ec = [
	"token",
	"distinct_id",
	Er
];
var sc = "posthog";
var nc = [...eh].sort()[eh.length - 1];
var rc = (t) => {
	const i = {};
	return t && "unset" !== t ? ("2025-11-30" > t || (i.strictMinimumDuration = !0), "2026-05-30" > t || (i.canvasCapture = { resolutionScale: .6 }), "2026-06-25" > t || (i.streamNetworkBody = !0), "2026-08-30" > t || (i.captureJsonLd = !0), i) : i;
};
var oc = (i) => {
	var e;
	return bi({
		api_host: "https://us.i.posthog.com",
		flags_api_host: null,
		ui_host: null,
		asset_host: null,
		token: "",
		autocapture: !0,
		cross_subdomain_cookie: to(null == s ? void 0 : s.location),
		persistence: "localStorage+cookie",
		persistence_name: "",
		cookie_persisted_properties: [],
		loaded: Wh,
		save_campaign_params: !0,
		custom_campaign_params: [],
		custom_blocked_useragents: [],
		save_referrer: !0,
		capture_pageleave: "if_capture_pageview",
		defaults: null != i ? i : "unset",
		__preview_deferred_init_extensions: !1,
		__preview_replay_sync_fetch: !0,
		__preview_external_dependency_versioned_paths: !1,
		__preview_cookie_wins_on_conflict: !1,
		debug: n && R(null == n ? void 0 : n.search) && -1 !== n.search.indexOf("__posthog_debug=true") || !1,
		cookie_expiration: 365,
		upgrade: !1,
		disable_session_recording: !1,
		disable_persistence: !1,
		disable_web_experiments: !0,
		disable_surveys: !1,
		disable_surveys_automatic_display: !1,
		disable_conversations: !1,
		disable_product_tours: !1,
		disableDeviceModel: !1,
		reuseAnonymousId: !1,
		disable_external_dependency_loading: !1,
		strict_script_versioning: "fallback",
		enable_recording_console_log: void 0,
		secure_cookie: "https:" === (null == t || null === (e = t.location) || void 0 === e ? void 0 : e.protocol),
		ip: !1,
		opt_out_capturing_by_default: !1,
		opt_out_persistence_by_default: !1,
		opt_out_useragent_filter: !1,
		opt_out_capturing_persistence_type: "localStorage",
		consent_persistence_name: null,
		opt_out_capturing_cookie_prefix: null,
		opt_in_site_apps: !1,
		property_denylist: [],
		respect_dnt: !1,
		sanitize_properties: null,
		request_headers: {},
		request_batching: !0,
		properties_string_max_length: 65535,
		mask_all_element_attributes: !1,
		mask_all_text: !1,
		mask_personal_data_properties: !1,
		custom_personal_data_properties: [],
		advanced_disable_flags: !1,
		advanced_disable_decide: !1,
		advanced_disable_feature_flags: !1,
		advanced_disable_feature_flags_on_first_load: !1,
		advanced_only_evaluate_survey_feature_flags: !1,
		advanced_feature_flags_dedup_per_session: !1,
		advanced_enable_surveys: !1,
		advanced_disable_toolbar_metrics: !1,
		feature_flag_request_timeout_ms: 3e3,
		feature_flag_request_max_retries: 1,
		surveys_request_timeout_ms: 1e4,
		on_request_error(t) {
			Ws.error("Bad HTTP status: " + t.statusCode + " " + t.text);
		},
		get_device_id: (t) => t,
		capture_performance: void 0,
		name: "posthog",
		bootstrap: {},
		disable_compression: !1,
		session_idle_timeout_seconds: 1800,
		person_profiles: Br,
		before_send: void 0,
		get_current_url: void 0,
		request_queue_config: { flush_interval_ms: 3e3 },
		error_tracking: {},
		_onCapture: Wh
	}, ((t) => ({
		rageclick: t && t >= "2026-05-30" ? {
			content_ignorelist: Xo,
			ignore_text_selection: !0
		} : !t || "2025-11-30" > t || { content_ignorelist: !0 },
		capture_pageview: !t || "2025-05-24" > t || "history_change",
		session_recording: rc(t),
		external_scripts_inject_target: t && t >= "2026-01-30" ? "head" : "body",
		internal_or_test_user_hostname: t && t >= "2026-01-30" ? /^(localhost|127\.0\.0\.1)$/ : void 0,
		persistence_save_debounce_ms: t && t >= "2026-05-30" ? 250 : 0,
		split_storage: !(!t || "2026-05-30" > t),
		detect_google_search_app: !(!t || "2026-05-30" > t),
		disable_capture_url_hashes: !(!t || "2026-06-25" > t),
		cookieWinsOnConflict: !(!t || "unset" === t || "2026-08-29" > t)
	}))(i));
};
var lc = [
	["process_person", "person_profiles"],
	["xhr_headers", "request_headers"],
	["cookie_name", "persistence_name"],
	["disable_cookie", "disable_persistence"],
	["__preview_disable_beacon", "disable_beacon"],
	["store_google", "save_campaign_params"],
	["verbose", "debug"],
	["__preview_cookie_wins_on_conflict", "cookieWinsOnConflict"]
];
var ac = (t) => {
	const i = {};
	for (const [e, s] of lc) C(t[e]) || (i[s] = t[e]);
	const e = Kr({}, i, t), s = t.__preview_external_dependency_versioned_paths;
	return C(s) || (C(t.strict_script_versioning) && (e.strict_script_versioning = !!s), R(s) && C(t.asset_host) && (e.asset_host = s)), k(t.property_blacklist) && (C(t.property_denylist) ? e.property_denylist = t.property_blacklist : k(t.property_denylist) ? e.property_denylist = [...t.property_blacklist, ...t.property_denylist] : Ws.error(Jh + t.property_denylist)), e;
};
var uc = class {
	constructor() {
		this.__forceAllowLocalhost = !1;
	}
	get Rh() {
		return this.__forceAllowLocalhost;
	}
	set Rh(t) {
		Ws.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = t;
	}
};
var hc = class i {
	Ph(t) {
		if (!t) return;
		const i = this.Oh.indexOf(t);
		-1 !== i && this.Oh.splice(i, 1);
	}
	Fh(t, i) {
		var e;
		return this.Ph(t), this.Oh.push(i), null === (e = i.initialize) || void 0 === e || e.call(i), i;
	}
	Lh() {
		return "always" === this.config.cookieless_mode || "on_reject" === this.config.cookieless_mode && this.consent.isRejected();
	}
	Dh() {
		if (this.Nh) return;
		if (!this.jh || !("capture_pageview" in this.jh)) return;
		if (bi(bi({}, i.__defaultExtensionClasses), this.config.__extensionClasses).historyAutocapture) return;
		const t = this.config.capture_pageview;
		("history_change" === t || P(t) && (t.path || t.search || t.hash && !this.config.disable_capture_url_hashes)) && (this.Nh = !0, Ws.warn("capture_pageview is set to capture history changes, but the history autocapture extension is not loaded, so only the first pageview of each page load is captured. With the slim bundle, pass __extensionClasses: { historyAutocapture: AnalyticsExtensions.historyAutocapture } from 'posthog-js/dist/extension-bundles', or set capture_pageview: true to capture page loads only."));
	}
	qh() {
		if (this.Bh) return;
		if (this.config.reuseAnonymousId) return;
		if (this.config.segment) return;
		if (this.Lh()) return;
		const t = "memory" === this.config.persistence || "sessionStorage" === this.config.persistence;
		if (!t && !this.config.disable_persistence) return;
		if (this.zh) return;
		let i, e, s;
		t ? (i = `persistence is set to '${this.config.persistence}'`, e = "memory" === this.config.persistence ? "on every page load" : "for every new browser tab or window", s = "Either set persistence to 'localStorage+cookie', keep this persistence and pass a stable ID through bootstrap.distinctID, or enable reuseAnonymousId.") : (i = "persistence is disabled (disable_persistence is true)", e = "on every page load", s = "Either set disable_persistence to false, keep persistence disabled and pass a stable ID through bootstrap.distinctID, or enable reuseAnonymousId."), this.Bh = !0, console.warn("[PostHog.js]", `${i} but no bootstrap.distinctID was provided. PostHog will mint a new distinct ID ${e}, so calling identify() merges a new ID onto the person each time. A person can then pass the distinct-ID limit and its events stop appearing on person pages and the session tab. ${s}`);
	}
	Hh() {
		const t = this.persistence;
		if (!t || this.Uh) return;
		if (this.Lh()) return void ("on_reject" === this.config.cookieless_mode && "$posthog_cookieless" !== this.get_distinct_id() && (this.Wh(), this.Gh()));
		if ("$posthog_cookieless" !== this.get_distinct_id()) return;
		this.Vh() || t.load(!0);
		const i = this.get_distinct_id();
		if (!i || "$posthog_cookieless" === i) {
			const i = this.config.get_device_id(ho());
			this.register({
				distinct_id: i,
				$device_id: i
			}), t.set_property(_r, Lr);
		}
		this.Wh();
	}
	get decideEndpointWasHit() {
		var t, i;
		return null !== (t = null === (i = this.featureFlags) || void 0 === i ? void 0 : i.hasLoadedFlags) && void 0 !== t && t;
	}
	get flagsEndpointWasHit() {
		var t, i;
		return null !== (t = null === (i = this.featureFlags) || void 0 === i ? void 0 : i.hasLoadedFlags) && void 0 !== t && t;
	}
	constructor() {
		var t;
		this.Qh = !1, this.Jh = !1, this.Zh = !1, this.webPerformance = new uc(), this.Kh = !1, this.version = rn.LIB_VERSION, this.__loadExternalDependency = Js, this.Yh = /* @__PURE__ */ new Set(), this.Xh = "", this.mr = new Xu(), this.Oh = [], this.ed = [], this.nd = !1, this.zh = !1, this.Bh = !1, this.Nh = !1, this.Uh = !1, this._calculate_event_properties = this.calculateEventProperties.bind(this), this.config = oc(), this.SentryIntegration = Il, this.sentryIntegration = (t) => function(t, i) {
			const e = Al(t, i);
			return {
				name: Rl,
				processEvent: (t) => e(t)
			};
		}(this, t), this.__request_queue = [], this.__loaded = !1, this.analyticsDefaultEndpoint = "/e/", this.sd = !1, this.rd = null, this.od = null, this.ld = null, this.scrollManager = new Ju(this), this.pageViewManager = new Ml(this), this.rateLimiter = new Ua(this), this.requestRouter = new gh(this), this.consent = new Io(this), this.externalIntegrations = new Sh(this);
		const e = null !== (t = i.__defaultExtensionClasses) && void 0 !== t ? t : {};
		this.featureFlags = e.featureFlags && new e.featureFlags(this), this.toolbar = e.toolbar && new e.toolbar(this), this.surveys = e.surveys && new e.surveys(this), this.conversations = e.conversations && new e.conversations(this), this.logs = e.logs && new e.logs(this), this.metrics = e.metrics && new e.metrics(this), this.experiments = e.experiments && new e.experiments(this), this.exceptions = e.exceptions && new e.exceptions(this), this.people = {
			set: (t, i, e) => {
				const s = R(t) ? { [t]: i } : t;
				this.setPersonProperties(s), e?.({});
			},
			set_once: (t, i, e) => {
				const s = R(t) ? { [t]: i } : t;
				this.setPersonProperties(void 0, s), e?.({});
			}
		}, this.on("eventCaptured", (t) => Ws.info(`send "${null == t ? void 0 : t.event}"`, t));
	}
	init(t, e, s) {
		if (s && s !== sc) {
			var n;
			const r = null !== (n = Hh[s]) && void 0 !== n ? n : new i();
			return r._init(t, e, s), Hh[s] = r, Hh[sc][s] = r, r;
		}
		return this._init(t, e, s);
	}
	_init(i, e = {}, s) {
		var n, r, o;
		const l = R(i) ? i.trim() : "";
		if (!l) return Ws.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
		var a;
		if (this.__loaded) return l !== (null === (a = this.config) || void 0 === a ? void 0 : a.token) ? console.warn("[PostHog.js]", `You have already initialized PostHog with a different project token! Re-initializing is a no-op, so events will keep going to the project this instance was initialized with. To capture into a second project, load PostHog once, then initialize a named instance after the SDK has loaded, e.g. posthog.init('${l}', { ... }, 'project2')`) : console.warn("[PostHog.js]", "You have already initialized PostHog! Re-initializing is a no-op"), this;
		this.__loaded = !0, this.config = oc(e.defaults), e.debug = this.ad(e.debug), this.jh = e, this.ud = [], e.person_profiles ? this.od = e.person_profiles : e.process_person && (this.od = e.process_person);
		const u = oc(e.defaults), h = ac(e), c = Kr({}, u, h, {
			name: s,
			token: l
		});
		P(u.rageclick) && P(h.rageclick) && (c.rageclick = Kr({}, u.rageclick, h.rageclick)), P(u.session_recording) && P(h.session_recording) && (c.session_recording = Kr({}, u.session_recording, h.session_recording)), this.set_config(c), this.config.on_xhr_error && Ws.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = e.disable_compression ? void 0 : xa.GZipJS;
		const d = this.Vh(), v = !this.Lh();
		if (this.persistence = new Sa(this.config, d, !0, v), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new Sa(bi(bi({}, this.config), {}, { persistence: "sessionStorage" }), d, !1, v), this.Xh = "ph_" + (this.config.persistence_name || this.config.token) + "_session_registered_properties", "memory" !== this.config.persistence && !d && Ao.Ot()) {
			const t = Ao.Pt(this.Xh);
			k(t) && t.forEach((t) => {
				R(t) && this.Yh.add(t);
			});
		} else Ao.Dt(this.Xh);
		const f = bi({}, this.persistence.props), p = bi({}, this.sessionPersistence.props);
		this.register({ $initialization_time: (/* @__PURE__ */ new Date()).toISOString() }), this.hd = new Vu((t, i) => this.dd(t, i), this.config.request_queue_config), this.vd = new Ku(this), this.__request_queue = [];
		const g = this.Lh();
		g || (this.sessionManager = new ih(this), this.sessionPropsManager = new Zu(this, this.sessionManager, this.persistence), this.sessionManager.onSessionId((t, i, e) => {
			(null != e && e.activityTimeout || null != e && e.sessionPastMaximumLength || null != e && e.crossTabAdoption) && this.fd();
		})), this.pd(), this.config.__preview_deferred_init_extensions ? (Ws.info("Deferring extension initialization to improve startup performance"), this.gd = setTimeout(() => {
			this.gd = void 0, this.md(g);
		}, 0)) : (Ws.info("Initializing extensions synchronously"), this.md(g)), rn.DEBUG = rn.DEBUG || this.config.debug, rn.DEBUG && Ws.info("Starting in debug mode", {
			this: this,
			config: e,
			thisC: bi({}, this.config),
			p: f,
			s: p
		}), this.config.identity_distinct_id && !(null === (n = e.bootstrap) || void 0 === n ? void 0 : n.distinctID) && (e.bootstrap = bi(bi({}, e.bootstrap), {}, {
			distinctID: this.config.identity_distinct_id,
			isIdentifiedID: !0
		}));
		const _ = null === (r = e.bootstrap) || void 0 === r ? void 0 : r.distinctID;
		if (this.zh = !!_ && !A(_), null === (o = e.bootstrap) || void 0 === o ? void 0 : o.distinctID) {
			const t = e.bootstrap.distinctID, i = this.get_distinct_id(), s = this.persistence.get_property(_r);
			if (e.bootstrap.isIdentifiedID && null != i && i !== t && "anonymous" === s) this.identify(t);
			else if (e.bootstrap.isIdentifiedID && null != i && i !== t && "identified" === s) Ws.warn("Bootstrap distinctID differs from an already-identified user. The existing identity is preserved. Call reset() before reinitializing if you intend to switch users.");
			else {
				const i = this.config.get_device_id(ho()), s = e.bootstrap.isIdentifiedID ? i : t;
				this.persistence.set_property(_r, e.bootstrap.isIdentifiedID ? Nr : Lr), this.register({
					distinct_id: t,
					$device_id: s
				});
			}
		}
		if (g) this.register_once({
			distinct_id: xr,
			$device_id: null
		}, "");
		else if (!this.get_distinct_id()) {
			const t = this.config.get_device_id(ho());
			this.register_once({
				distinct_id: t,
				$device_id: t
			}, ""), this.persistence.set_property(_r, Lr);
		}
		return io(t, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), { passive: !1 }), io(t, "pageshow", (t) => {
			if (this.Jh = !1, !this.Zh) {
				var i;
				if (t.persisted && this.persistence) {
					const t = this.persistence.get_property(Cn), i = this.persistence.get_property(_r);
					this.persistence.load(), this.yd() || t === this.persistence.get_property("distinct_id") && i === this.persistence.get_property("$user_state") || this.bd();
				}
				null === (i = this.vd) || void 0 === i || i.resume();
			}
		}), e.segment ? Cl(this, () => this._d()) : this._d(), T(this.config._onCapture) && this.config._onCapture !== Wh && (Ws.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (t) => this.config._onCapture(t.event, t))), this.config.ip && Ws.warn("The `ip` config option has NO EFFECT AT ALL and has been deprecated. Use a custom transformation or \"Discard IP data\" project setting instead. See https://posthog.com/tutorials/web-redact-properties#hiding-customer-ip-address for more information."), this.config.disableDeviceModel || function() {
			return nh.apply(this, arguments);
		}().then((t) => {
			t && this.register({ [An]: t });
		}).catch(Wh), this;
	}
	wd(t) {
		const i = t;
		return R(i.name) && T(i.setup);
	}
	kd(t, i) {
		var e = this;
		this.wd(t) ? i.push(J(function* () {
			try {
				yield t.setup(e.Sd());
			} catch (e) {
				Ws.error(`Failed to set up extension "${t.name}"`, e);
				try {
					var i;
					yield null === (i = t.dispose) || void 0 === i ? void 0 : i.call(t);
				} catch (i) {
					Ws.error(`Failed to dispose extension "${t.name}"`, i);
				}
			}
		})) : this.Oh.push(t);
	}
	pd() {
		var t, e, s, n = this;
		const r = null !== (t = null === (e = this.config.__extensionClasses) || void 0 === e ? void 0 : e.featureFlags) && void 0 !== t ? t : null === (s = i.__defaultExtensionClasses) || void 0 === s ? void 0 : s.featureFlags;
		var o, l, a;
		if (r) if (this.featureFlags && this.featureFlags instanceof r || (null === (o = this.xd) || void 0 === o || o.call(this), this.xd = void 0, this.featureFlags = new r(this)), T(this.featureFlags.onReloading) && T(this.featureFlags.setup)) {
			if (!this.xd) {
				this.xd = this.featureFlags.onReloading(() => {
					this.mr.emit("featureFlagsReloading", !0);
				});
				const t = this.featureFlags;
				J(function* () {
					try {
						yield t.setup(n.Sd());
					} catch (i) {
						Ws.error("Failed to set up feature flags", i);
						const e = n.xd;
						n.xd = void 0;
						try {
							e?.();
						} catch (t) {
							Ws.error("Failed to unsubscribe feature flag reloading", t);
						}
						try {
							yield t.dispose();
						} catch (t) {
							Ws.error("Failed to dispose feature flags", t);
						}
					}
				})();
			}
		} else null === (l = (a = this.featureFlags).initialize) || void 0 === l || l.call(a);
	}
	md(t) {
		const e = performance_default.now(), s = bi(bi({}, i.__defaultExtensionClasses), this.config.__extensionClasses), n = [];
		var r, o, l, a, u, h, c, d;
		s.exceptions && this.Oh.push(this.exceptions = null !== (r = this.exceptions) && void 0 !== r ? r : new s.exceptions(this)), s.historyAutocapture && this.Oh.push(this.historyAutocapture = new s.historyAutocapture(this)), this.Dh(), s.tracingHeaders && this.Oh.push(this.tracingHeaders = new s.tracingHeaders(this)), s.siteApps && this.Oh.push(this.siteApps = new s.siteApps(this)), s.sessionRecording && !t && this.Oh.push(this.sessionRecording = new s.sessionRecording(this)), s.autocapture && this.kd(this.autocapture = new s.autocapture(this), n), s.surveys && this.kd(this.surveys = null !== (o = this.surveys) && void 0 !== o ? o : new s.surveys(this), n), s.logs && this.kd(this.logs = null !== (l = this.logs) && void 0 !== l ? l : new s.logs(this), n), s.metrics && this.Oh.push(this.metrics = null !== (a = this.metrics) && void 0 !== a ? a : new s.metrics(this)), s.conversations && this.Oh.push(this.conversations = null !== (u = this.conversations) && void 0 !== u ? u : new s.conversations(this)), s.productTours && this.Oh.push(this.productTours = new s.productTours(this)), s.heatmaps && this.Oh.push(this.heatmaps = new s.heatmaps(this)), s.webVitalsAutocapture && this.Oh.push(this.webVitalsAutocapture = new s.webVitalsAutocapture(this)), s.exceptionObserver && this.Oh.push(this.exceptionObserver = new s.exceptionObserver(this)), s.deadClicksAutocapture && this.Oh.push(this.deadClicksAutocapture = new s.deadClicksAutocapture(this, Tl)), s.toolbar && this.Oh.push(this.toolbar = null !== (h = this.toolbar) && void 0 !== h ? h : new s.toolbar(this)), s.experiments && this.Oh.push(this.experiments = null !== (c = this.experiments) && void 0 !== c ? c : new s.experiments(this)), s.webMCP && this.Oh.push(this.webMCP = null !== (d = this.webMCP) && void 0 !== d ? d : new s.webMCP(this));
		const v = this.Oh.length > 0 || n.length > 0;
		this.config.disable_scroll_properties || n.unshift(() => {
			this.scrollManager.startMeasuringScrollPosition();
		}), this.Oh.forEach((t) => {
			t.initialize && n.push(() => {
				var i;
				null === (i = t.initialize) || void 0 === i || i.call(t);
			});
		}), n.push(() => {
			if (this.$d) {
				const t = this.$d;
				this.$d = void 0, this.Oh.forEach((i) => {
					var e;
					return null === (e = i.onRemoteConfig) || void 0 === e ? void 0 : e.call(i, t);
				});
			}
		}), this.Cd(n, e, v);
	}
	Cd(t, i, e) {
		for (var s, n; t.length > 0;) {
			if (this.config.__preview_deferred_init_extensions && performance_default.now() - i >= 30 && t.length > 0) return void (this.gd = setTimeout(() => {
				this.gd = void 0, this.Cd(t, i, e);
			}, 0));
			const s = t.shift();
			if (s) try {
				s();
			} catch (t) {
				Ws.error("Error initializing extension:", t);
			}
		}
		const r = Math.round(performance_default.now() - i);
		e && r > 0 ? this.register_for_session({
			[kr]: this.config.__preview_deferred_init_extensions ? "deferred" : "synchronous",
			[Tr]: r
		}) : C(null === (s = this.sessionPersistence) || void 0 === s ? void 0 : s.props.$sdk_debug_extensions_init_method) && C(null === (n = this.sessionPersistence) || void 0 === n ? void 0 : n.props.$sdk_debug_extensions_init_time_ms) || (this.unregister_for_session(kr), this.unregister_for_session(Tr)), this.config.__preview_deferred_init_extensions && Ws.info(`PostHog extensions initialized (${r}ms)`);
	}
	xc(t) {
		if (!s || !s.body) return Ws.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout(() => {
			this.xc(t);
		}, 500);
		if (this.config.__preview_deferred_init_extensions && (this.$d = t), this.gr = t, this.compression = void 0, t.ok) {
			var i;
			const e = t.config;
			e.supportedCompression && !this.config.disable_compression && (this.compression = m(e.supportedCompression, xa.GZipJS) ? xa.GZipJS : m(e.supportedCompression, xa.Base64) ? xa.Base64 : void 0), null !== (i = e.analytics) && void 0 !== i && i.endpoint && (this.analyticsDefaultEndpoint = e.analytics.endpoint);
		}
		this.set_config({ person_profiles: this.od ? this.od : Br }), this.mr.emit("extensionsRemoteConfig", t), this.Oh.forEach((i) => {
			var e;
			return null === (e = i.onRemoteConfig) || void 0 === e ? void 0 : e.call(i, t);
		});
	}
	_d() {
		try {
			this.config.loaded(this);
		} catch (t) {
			Ws.critical("`loaded` function failed", t);
		}
		if (this.Td(), this.config.internal_or_test_user_hostname && (null == n ? void 0 : n.hostname)) {
			const t = n.hostname, i = this.config.internal_or_test_user_hostname;
			("string" == typeof i ? t === i : i.test(t)) && this.setInternalOrTestUser();
		}
		this.config.capture_pageview && setTimeout(() => {
			(this.consent.isOptedIn() || this.Lh()) && this.Md();
		}, 1), this.Id = new Ha(this), this.Id.load();
	}
	Td() {
		var t;
		this.is_capturing() && this.config.request_batching && (null === (t = this.hd) || void 0 === t || t.enable());
	}
	_dom_loaded() {
		this.is_capturing() && Vr(this.__request_queue, (t) => this.dd(t)), this.__request_queue = [], this.Td();
	}
	_handle_unload() {
		var t, i, e, s, n, r;
		this.Jh = !0, null === (t = this.surveys) || void 0 === t || null === (i = t.handlePageUnload) || void 0 === i || i.call(t), null === (e = this.metrics) || void 0 === e || e.flush("sendBeacon"), this.config.request_batching ? (this.Ed() && this.capture(Hr), null === (s = this.logs) || void 0 === s || s.flushLogs("sendBeacon"), null === (n = this.hd) || void 0 === n || n.unload(), null === (r = this.vd) || void 0 === r || r.unload()) : this.Ed() && this.capture(Hr, null, { transport: "sendBeacon" });
	}
	_send_request(t) {
		Wu(this, t);
	}
	dd(t, i) {
		this.vd ? this.vd.retriableRequest(t, i) : this._send_request(i ? bi(bi({}, t), {}, { transport: i }) : t);
	}
	_execute_array(t) {
		qh++;
		try {
			let i;
			const e = [], s = [], n = [];
			Vr(t, (t) => {
				if (t) if (i = t[0], k(i)) n.push(t);
				else if (T(t)) try {
					t.call(this);
				} catch (i) {
					Ws.error("Error executing queued PostHog call", t, i);
				}
				else k(t) && "alias" === i ? e.push(t) : k(t) && -1 !== i.indexOf("capture") && T(this[i]) ? n.push(t) : s.push(t);
			});
			const r = function(t, i) {
				Vr(t, function(t) {
					try {
						if (k(t[0])) {
							let e = i;
							Gr(t, function(t) {
								e = e[t[0]].apply(e, t.slice(1));
							});
						} else i[t[0]].apply(i, t.slice(1));
					} catch (i) {
						Ws.error("Error executing queued PostHog call", t, i);
					}
				});
			};
			r(e, this), r(s, this), r(n, this);
		} finally {
			qh--;
		}
	}
	push(t) {
		if (qh > 0 && k(t) && R(t[0])) {
			const e = i.prototype[t[0]];
			T(e) && e.apply(this, t.slice(1));
			return;
		}
		this._execute_array([t]);
	}
	get Ad() {
		return {
			property: Fn,
			persistenceKey: Dn,
			cookieName: "_fbc",
			pattern: tc,
			register: (t, i) => {
				var e;
				return null === (e = this.persistence) || void 0 === e ? void 0 : e.register({ [Dn]: {
					value: t,
					delivered: i
				} });
			},
			unregister: () => {
				var t;
				return null === (t = this.persistence) || void 0 === t ? void 0 : t.unregister(Dn);
			}
		};
	}
	get Rd() {
		return {
			property: jn,
			persistenceKey: Ln,
			cookieName: "_fbp",
			pattern: ic,
			register: (t, i) => {
				var e;
				return null === (e = this.persistence) || void 0 === e ? void 0 : e.register({ [Ln]: {
					value: t,
					delivered: i
				} });
			},
			unregister: () => {
				var t;
				return null === (t = this.persistence) || void 0 === t ? void 0 : t.unregister(Ln);
			}
		};
	}
	Pd(t) {
		var i;
		const e = null === (i = this.persistence) || void 0 === i ? void 0 : i.get_property(t.persistenceKey);
		return R(e) && t.pattern.test(e) ? {
			value: e,
			delivered: !1
		} : P(e) && R(e.value) && t.pattern.test(e.value) ? {
			value: e.value,
			delivered: !0 === e.delivered
		} : void 0;
	}
	Od(t, i, e) {
		return i === (null == e ? void 0 : e.value) ? {
			value: i,
			pending: !e.delivered
		} : (t.register(i, !1), {
			value: i,
			pending: !0
		});
	}
	Fd(t) {
		if (!this.config.save_campaign_params || this.Lh()) return;
		const i = so(t.cookieName);
		return R(i) && t.pattern.test(i) ? i : void 0;
	}
	Ld(t, i, e, s) {
		if (!this.persistence) return;
		const n = this.Ad, r = this.Pd(n);
		if (s) return void n.unregister();
		if (e) return R(i) && tc.test(i) ? this.Od(n, i, r) : void n.unregister();
		const o = R(t) && Qh.test(t) ? t : void 0, l = this.Fd(n);
		return l && ((t, i, e) => {
			const s = t.split(".");
			if (i) return s[3] === i;
			if (!e) return !0;
			const n = e.value.split(".");
			return s[3] === n[3] || Number(s[2]) > Number(n[2]);
		})(l, o, r) ? this.Od(n, l, r) : o ? (null == r ? void 0 : r.value.split(".")[3]) === o ? {
			value: r.value,
			pending: !r.delivered
		} : this.Od(n, `fb.1.${Date.now()}.${o}`, r) : r ? {
			value: r.value,
			pending: !r.delivered
		} : void 0;
	}
	Dd(t, i, e) {
		if (!this.persistence) return;
		const s = this.Rd, n = this.Pd(s);
		if (e) return void s.unregister();
		if (i) return R(t) && ic.test(t) ? this.Od(s, t, n) : void s.unregister();
		const r = this.Fd(s);
		return r ? this.Od(s, r, n) : n ? {
			value: n.value,
			pending: !n.delivered
		} : void 0;
	}
	Nd(t) {
		if (!this.persistence) return;
		const i = ({ channel: t, value: i }) => {
			const e = this.Pd(t);
			return (null == e ? void 0 : e.value) === i && !e.delivered;
		}, e = t.filter(i);
		e.length && (this.persistence.refreshMetaIdentifiers(), e.filter(i).forEach(({ channel: t, value: i }) => t.register(i, !0)));
	}
	capture(t, i, e) {
		var s, n, r;
		if (!(this.__loaded && this.persistence && this.sessionPersistence && this.hd)) return void Ws.uninitializedWarning("posthog.capture");
		if (!this.is_capturing()) return void Ws.info(`Event "${t}" was not captured because capturing is disabled (opted out or consent pending).`);
		if (C(t) || !R(t)) return void Ws.error("No event name provided to posthog.capture");
		if (this.Hh(), "$snapshot" === t && this.Lh()) return;
		const o = !this.config.opt_out_useragent_filter && this._is_bot();
		if (o && !this.config.__preview_capture_bot_pageviews) return this.Qh || (this.Qh = !0, console.warn("[PostHog.js] Events are being dropped because the user agent looks like a bot. Set `opt_out_useragent_filter: true` to capture them, e.g. in end-to-end tests. Note that logs from `captureLog` are not subject to this filter.")), void Ws.info(`Event "${t}" was not captured because the user agent looks like a bot. Set \`opt_out_useragent_filter: true\` to capture it.`);
		const l = (null == e ? void 0 : e.skip_client_rate_limiting) ? void 0 : this.rateLimiter.clientRateLimitContext();
		if (null == l ? void 0 : l.isRateLimited) return void Ws.critical("This capture call is ignored due to client rate limiting.");
		let a;
		null != i && i.$current_url && !R(null == i ? void 0 : i.$current_url) && (Ws.error("Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."), null == i || delete i.$current_url), "$exception" !== t || null != e && e.jd || Ws.warn("Using `posthog.capture('$exception')` is unreliable because it does not attach required metadata. Use `posthog.captureException(error)` instead, which attaches required metadata automatically."), this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && (a = this.sessionPersistence.update_campaign_params()), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
		const u = /* @__PURE__ */ new Date(), h = (null == e ? void 0 : e.timestamp) || u, c = hi(null == e ? void 0 : e.uuid, ho);
		let d = {
			uuid: c,
			event: t,
			properties: this.calculateEventProperties(t, i || {}, h, c)
		};
		"$pageview" === t && this.config.__preview_capture_bot_pageviews && o && (d.event = "$bot_pageview", d.properties.$browser_type = "bot"), l && (d.properties.$lib_rate_limit_remaining_tokens = l.remainingTokens);
		const v = "$feature_flag_called" === t && !1 === d.properties.$feature_flag_has_experiment && !0 === this.get_property("$minimal_flag_called_events");
		null != e && e.$set && !v && (d.$set = null == e ? void 0 : e.$set);
		const f = P(null == i ? void 0 : i.$set) ? i.$set : void 0, p = k(null == i ? void 0 : i.$unset) ? i.$unset : [], g = (null == e ? void 0 : e.$unset) || [], _ = (t) => {
			var i;
			const s = !!(null == e ? void 0 : e.$set) && t in e.$set;
			return {
				hasProvided: s || !!f && t in f,
				provided: s ? null == e || null === (i = e.$set) || void 0 === i ? void 0 : i[t] : null == f ? void 0 : f[t],
				unset: -1 !== p.indexOf(t) || -1 !== g.indexOf(t)
			};
		};
		this.persistence.refreshMetaIdentifiersBeforeCapture();
		const m = _(Fn), y = _(jn), b = [{
			channel: this.Ad,
			hasProvided: m.hasProvided,
			update: this.Ld(null == a ? void 0 : a.fbclid, m.provided, m.hasProvided, m.unset)
		}, {
			channel: this.Rd,
			hasProvided: y.hasProvided,
			update: this.Dd(y.provided, y.hasProvided, y.unset)
		}];
		for (const { channel: t, hasProvided: i, update: e } of b) e && !0 === d.properties.$process_person_profile && e.pending && !i && !v && (d.$set = bi({ [t.property]: e.value }, d.$set));
		const w = null == e ? void 0 : e.$unset;
		w && (d.$unset = w);
		const S = v ? void 0 : this.qd(null == e ? void 0 : e.$set_once, t !== Wr, t === qr);
		if (S && (d.$set_once = S), null != e && e._noTruncate || (x = this.config.properties_string_max_length, d = function(t, i) {
			const e = /* @__PURE__ */ new Set();
			return function t(s, n) {
				if (s !== Object(s)) return i ? i(s) : s;
				if (e.has(s)) return;
				let r;
				if (e.add(s), k(s)) r = [], Vr(s, (i) => {
					r.push(t(i));
				});
				else {
					const i = {};
					Gr(z(s) ? Xr(s) : s, (s, n) => {
						e.has(s) || (i[n] = t(s, n));
					}), r = i;
				}
				return r;
			}(t);
		}(d, (t) => R(t) ? t.slice(0, x) : t)), d.timestamp = h, C(null == e ? void 0 : e.timestamp) || (d.properties.$event_time_override_provided = !0, d.properties.$event_time_override_system_time = u), v && (d.properties = ((t, i = []) => {
			const e = {}, s = (i) => {
				void 0 !== t[i] && (e[i] = t[i]);
			};
			return pe.forEach(s), i.forEach(s), e;
		})(d.properties, ec)), t === Ia.DISMISSED || t === Ia.SENT) {
			const e = null == i ? void 0 : i[Ma.SURVEY_ID], s = null == i ? void 0 : i[Ma.SURVEY_ITERATION];
			mh({
				id: e,
				current_iteration: s
			}), d.$set = bi(bi({}, d.$set), {}, { [rh({
				id: e,
				current_iteration: s
			}, t === Ia.SENT ? "responded" : "dismissed")]: !0 });
		} else t === Ia.SHOWN && (d.$set = bi(bi({}, d.$set), {}, { [Ma.SURVEY_LAST_SEEN_DATE]: (/* @__PURE__ */ new Date()).toISOString() }));
		var x;
		if (t === La.SHOWN) {
			const t = null == i ? void 0 : i[Na.TOUR_TYPE];
			t && (d.$set = bi(bi({}, d.$set), {}, { [`${Na.TOUR_LAST_SEEN_DATE}/${t}`]: (/* @__PURE__ */ new Date()).toISOString() }));
		}
		const E = bi(bi({}, d.properties.$set), d.$set);
		if (O(E) || this.setPersonPropertiesForFlags(E), !M(this.config.before_send)) {
			const t = this.Ds(d);
			if (!t) return;
			d = t, d.uuid = hi(d.uuid, ho);
		}
		this.sessionRecording && !this.sessionRecording.isReplayOff && !this.nd && Xh(t) && (this.nd = !0, setTimeout(() => this.nd = !1, 3e4));
		const T = [];
		b.forEach(({ channel: t, update: i }) => {
			var e, s, n;
			const r = null !== (e = null === (s = d.$set) || void 0 === s ? void 0 : s[t.property]) && void 0 !== e ? e : P(null === (n = d.properties) || void 0 === n ? void 0 : n.$set) ? d.properties.$set[t.property] : void 0;
			null != i && i.pending && r === i.value && T.push({
				channel: t,
				value: i.value
			});
		}), this.mr.emit("eventCaptured", d);
		const A = null !== (s = null == e ? void 0 : e._url) && void 0 !== s ? s : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), I = "recordings" === (null == e ? void 0 : e._batchKey) || /\/s\/(?:\?|$)/.test(A), F = bi(bi(bi({
			method: "POST",
			url: A,
			data: d,
			compression: "best-available",
			preferSyncCompression: null == e ? void 0 : e.send_instantly,
			timestampMode: I ? "body" : "capture-body",
			batchKey: null == e ? void 0 : e._batchKey
		}, I && (null === (n = d.properties) || void 0 === n ? void 0 : n.$session_id) ? { batchGroup: d.properties.$session_id + (d.properties.$window_id ? `-${d.properties.$window_id}` : "") } : {}), (null == e ? void 0 : e.transport) ? { transport: e.transport } : {}), T.length ? {
			fireCallbackOnDrop: !0,
			callback: (t) => {
				t.statusCode >= 200 && 300 > t.statusCode && this.Nd(T);
			}
		} : {});
		if (!this.config.request_batching || e && !(null == e ? void 0 : e._batchKey) || (null == e ? void 0 : e.send_instantly)) {
			var D;
			let t;
			!F.transport && !F.callback && O(null !== (D = this.config.request_headers) && void 0 !== D ? D : {}) && this.Jh && (t = "sendBeacon"), this.dd(F, t);
		} else this.hd.enqueue(F);
		return null === (r = this.featureFlags) || void 0 === r || r.sendFlagCallsPendingCapture(), d;
	}
	_addCaptureHook(t) {
		return this.on("eventCaptured", (i) => t(i.event, i));
	}
	getExtension(t) {
		var i;
		return null === (i = this.Bd) || void 0 === i ? void 0 : i.getExtension(t);
	}
	Sd() {
		var t;
		return null !== (t = this.Bd) && void 0 !== t ? t : this.Bd = new zh(this);
	}
	br(t) {
		this.ed.push(t);
		let i = !0;
		return () => {
			if (!i) return;
			i = !1;
			const e = this.ed.indexOf(t);
			-1 !== e && this.ed.splice(e, 1);
		};
	}
	yd(t = !0) {
		var i;
		return !!(null === (i = this.persistence) || void 0 === i ? void 0 : i.consumeCookieIdentityChange()) && (this.bd(t), !0);
	}
	bd(t = !0) {
		var i, e, s;
		this.ld = null, "anonymous" === (null === (i = this.persistence) || void 0 === i ? void 0 : i.get_property("$user_state")) && (null === (s = this.sessionPersistence) || void 0 === s || s.clear(), this.Yh.clear(), this.zd()), null === (e = this.featureFlags) || void 0 === e || e.reset(), t && this.reloadFeatureFlags();
	}
	calculateEventProperties(i, e, r, o, l) {
		if (r = r || /* @__PURE__ */ new Date(), !this.persistence || !this.sessionPersistence) return e;
		this.Hh(), this.persistence.syncCookieProperties(), this.yd();
		const a = l ? void 0 : this.persistence.remove_event_timer(i);
		let h = bi({}, e);
		if (h.token = this.config.token, h.$config_defaults = "latest" === this.config.defaults ? nc : this.config.defaults, this.Lh() && (h[Er] = !0), "$snapshot" === i) {
			const t = bi(bi({}, this.persistence.properties()), this.sessionPersistence.properties());
			return h.distinct_id = t.distinct_id, (!R(h.distinct_id) && !F(h.distinct_id) || A(h.distinct_id)) && Ws.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), h;
		}
		const c = function(i, e, s, r = !1) {
			var o, l, a, h;
			if (!u) return {};
			const c = i ? [...Zl, ...e || []] : [], [d, f] = Xt(u), [p, g] = function(t) {
				for (let i = 0; ei.length > i; i++) {
					const [e, s, n] = ei[i], r = t.match(e);
					if (r) {
						const i = n && t.match(n) || r;
						return [s, (null == i ? void 0 : i[1]) || ""];
					}
				}
				return ["", ""];
			}(u), _ = function() {
				const t = "u" > typeof navigator ? navigator : void 0;
				return (null == t ? void 0 : t.brave) ? { brave: !0 } : {};
			}(), m = {};
			C(s) || (m.detectGoogleSearchApp = s);
			const y = {}, b = null === (o = navigator) || void 0 === o || null === (o = o.userAgentData) || void 0 === o ? void 0 : o.platform, w = null === (l = navigator) || void 0 === l ? void 0 : l.maxTouchPoints, S = null == t || null === (a = t.screen) || void 0 === a ? void 0 : a.width, x = null == t || null === (h = t.screen) || void 0 === h ? void 0 : h.height, E = null == t ? void 0 : t.devicePixelRatio;
			C(b) || (y.userAgentDataPlatform = b), C(w) || (y.maxTouchPoints = w), C(S) || (y.screenWidth = S), C(x) || (y.screenHeight = x), C(E) || (y.devicePixelRatio = E);
			const k = Kr(Zr({
				$os: d,
				$os_version: f,
				$browser: Kt(u, navigator.vendor, _, m),
				$webview_app: p,
				$webview_app_version: g,
				$device: Qt(u),
				$device_type: ti(u, y),
				$timezone: Nl(),
				$timezone_offset: ha()
			}), {
				$current_url: Vl(r ? di(null == n ? void 0 : n.href) : null == n ? void 0 : n.href, c, Ql),
				$host: null == n ? void 0 : n.host,
				$pathname: null == n ? void 0 : n.pathname,
				$raw_user_agent: u.length > 1e3 ? u.substring(0, 997) + "..." : u,
				$browser_version: Yt(u, navigator.vendor, _, m),
				$browser_language: na(),
				$browser_language_prefix: ra(),
				$screen_height: null == t ? void 0 : t.screen.height,
				$screen_width: null == t ? void 0 : t.screen.width,
				$viewport_height: null == t ? void 0 : t.innerHeight,
				$viewport_width: null == t ? void 0 : t.innerWidth,
				$lib: v.LIB_NAME,
				$lib_version: v.LIB_VERSION,
				$insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
				$time: Date.now() / 1e3
			});
			return v.SDK_DIST_CHANNEL && (k.$sdk_dist_channel = v.SDK_DIST_CHANNEL), k;
		}(this.config.mask_personal_data_properties, this.config.custom_personal_data_properties, this.config.detect_google_search_app, this.config.disable_capture_url_hashes);
		if (this.sessionManager) {
			const { sessionId: t, windowId: i } = this.sessionManager.checkAndGetSessionAndWindowId(l, r.getTime(), !0);
			h.$session_id = t, h.$window_id = i;
		}
		let d, f;
		this.sessionPropsManager && Kr(h, this.sessionPropsManager.getSessionProps());
		try {
			var p;
			if (this.sessionRecording) {
				const t = this.sessionRecording.sdkDebugProperties, e = !this.nd && Xh(i);
				for (const i in t) (e || m(Yh, i)) && (h[i] = t[i]);
			}
			d = null === (p = this.vd) || void 0 === p ? void 0 : p.length;
		} catch (t) {
			h.$sdk_debug_error_capturing_properties = String(t);
		}
		if (this.requestRouter.region === dh && (h.$lib_custom_api_host = this.config.api_host), f = "$pageview" !== i || l ? "$pageleave" !== i || l ? this.pageViewManager.doEvent() : this.pageViewManager.doPageLeave(r) : this.pageViewManager.doPageView(r, o), h = Kr(h, f), "$pageview" === i && s && (h.title = s.title), !C(a)) {
			const t = r.getTime() - a;
			h.$duration = parseFloat((t / 1e3).toFixed(3));
		}
		u && this.config.opt_out_useragent_filter && (h.$browser_type = this._is_bot() ? "bot" : "browser");
		const g = this.persistence.properties(), _ = this.sessionPersistence.properties(), y = h.$groups, b = g.$groups;
		P(y) && !O(y) && (h.$groups = bi(bi({}, P(b) ? b : {}), y)), Gr(["$referrer", "$referring_domain"], (t) => {
			t in g && delete _[t];
		});
		const w = {};
		if (this.ed.length > 0) for (const t of this.ed.slice()) try {
			Kr(w, t());
		} catch (t) {
			Ws.error("Failed to produce browser extension event properties", t);
		}
		h = Kr({}, c, g, _, bi(bi({}, w), h)), d ? h.$sdk_debug_retry_queue_size = d : delete h.$sdk_debug_retry_queue_size, h.$is_identified = this._isIdentified(), k(this.config.property_denylist) ? Gr(this.config.property_denylist, function(t) {
			delete h[t];
		}) : Ws.error(Jh + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
		const S = this.config.sanitize_properties;
		S && (Ws.error(Kh), h = S(h, i));
		const x = this.Hd();
		return h.$process_person_profile = x, x && !l && this.Ud("_calculate_event_properties"), h;
	}
	qd(t, i = !0, e = !1) {
		var s;
		if (!this.persistence || !this.Hd()) return t;
		if (this.Kh && !e) return t;
		let o = Kr({}, this.persistence.get_initial_props(), (null === (s = this.sessionPropsManager) || void 0 === s ? void 0 : s.getSetOnceProps()) || {}, t || {});
		const l = this.config.sanitize_properties;
		return l && (Ws.error(Kh), o = l(o, "$set_once")), i && (this.Kh = !0), O(o) ? void 0 : o;
	}
	register(t, i) {
		var e;
		null === (e = this.persistence) || void 0 === e || e.register(t, i);
	}
	register_once(t, i, e) {
		var s;
		null === (s = this.persistence) || void 0 === s || s.register_once(t, i, e);
	}
	register_for_session(t) {
		var i, e;
		null === (i = this.persistence) || void 0 === i || i.syncCookieProperties(), this.yd(), null === (e = this.sessionPersistence) || void 0 === e || e.register(t), Object.keys(t).forEach((t) => this.Yh.add(t)), this.zd();
	}
	unregister(t) {
		var i;
		null === (i = this.persistence) || void 0 === i || i.unregister(t);
	}
	unregister_for_session(t) {
		var i;
		null === (i = this.sessionPersistence) || void 0 === i || i.unregister(t), this.Yh.delete(t), this.zd();
	}
	Wd(t, i) {
		this.register({ [t]: i });
	}
	fd() {
		this.Yh.forEach((t) => {
			var i;
			null === (i = this.sessionPersistence) || void 0 === i || i.unregister(t);
		}), this.Yh.clear(), this.zd();
	}
	zd() {
		var t;
		if (!this.Xh) return;
		if ("memory" === this.config.persistence || (null === (t = this.sessionPersistence) || void 0 === t ? void 0 : t.gi) || !Ao.Ot()) return void Ao.Dt(this.Xh);
		const i = [];
		this.Yh.forEach((t) => i.push(t)), i.length > 0 ? Ao.$t(this.Xh, i) : Ao.Dt(this.Xh);
	}
	getFeatureFlag(t, i) {
		var e;
		return null === (e = this.featureFlags) || void 0 === e ? void 0 : e.getFeatureFlag(t, i);
	}
	getFeatureFlagPayload(t) {
		var i;
		return null === (i = this.featureFlags) || void 0 === i ? void 0 : i.getFeatureFlagPayload(t);
	}
	getFeatureFlagResult(t, i) {
		var e;
		return null === (e = this.featureFlags) || void 0 === e ? void 0 : e.getFeatureFlagResult(t, i);
	}
	getAllFeatureFlags() {
		var t, i;
		return null !== (t = null === (i = this.featureFlags) || void 0 === i ? void 0 : i.getAllFeatureFlags()) && void 0 !== t ? t : [];
	}
	isFeatureEnabled(t, i) {
		var e, s;
		return null !== (e = null === (s = this.featureFlags) || void 0 === s ? void 0 : s.isFeatureEnabled(t, i)) && void 0 !== e ? e : null == i ? void 0 : i.defaultValue;
	}
	reloadFeatureFlags() {
		var t;
		null === (t = this.featureFlags) || void 0 === t || t.reloadFeatureFlags();
	}
	updateFlags(t, i, e) {
		var s;
		null === (s = this.featureFlags) || void 0 === s || s.updateFlags(t, i, e);
	}
	updateEarlyAccessFeatureEnrollment(t, i, e) {
		var s;
		null === (s = this.featureFlags) || void 0 === s || s.updateEarlyAccessFeatureEnrollment(t, i, e);
	}
	getEarlyAccessFeatures(t, i = !1, e) {
		var s;
		return null === (s = this.featureFlags) || void 0 === s ? void 0 : s.getEarlyAccessFeatures(t, i, e);
	}
	on(t, i) {
		return this.mr.on(t, i);
	}
	onFeatureFlags(t) {
		return this.featureFlags ? this.featureFlags.onFeatureFlags(t) : (t([], {}, { errorsLoading: !0 }), () => {});
	}
	onSurveysLoaded(t) {
		return this.surveys ? this.surveys.onSurveysLoaded(t) : (t([], {
			isLoaded: !1,
			error: Gh
		}), () => {});
	}
	onSessionId(t) {
		var i, e;
		return null !== (i = null === (e = this.sessionManager) || void 0 === e ? void 0 : e.onSessionId(t)) && void 0 !== i ? i : () => {};
	}
	getSurveys(t, i = !1) {
		this.surveys ? this.surveys.getSurveys(t, i) : t([], {
			isLoaded: !1,
			error: Gh
		});
	}
	getActiveMatchingSurveys(t, i = !1) {
		this.surveys ? this.surveys.getActiveMatchingSurveys(t, i) : t([], {
			isLoaded: !1,
			error: Gh
		});
	}
	onActiveMatchingSurveysChanged(t) {
		return this.surveys ? this.surveys.onActiveMatchingSurveysChanged(t) : (t([], {
			isLoaded: !1,
			error: Gh
		}), () => {});
	}
	renderSurvey(t, i) {
		var e;
		null === (e = this.surveys) || void 0 === e || e.renderSurvey(t, i);
	}
	displaySurvey(t, i = bh) {
		var e;
		null === (e = this.surveys) || void 0 === e || e.displaySurvey(t, i);
	}
	cancelPendingSurvey(t) {
		var i;
		null === (i = this.surveys) || void 0 === i || i.cancelPendingSurvey(t);
	}
	canRenderSurvey(t) {
		var i, e;
		return null !== (i = null === (e = this.surveys) || void 0 === e ? void 0 : e.canRenderSurvey(t)) && void 0 !== i ? i : {
			visible: !1,
			disabledReason: Gh
		};
	}
	canRenderSurveyAsync(t, i = !1) {
		var e, s;
		return null !== (e = null === (s = this.surveys) || void 0 === s ? void 0 : s.canRenderSurveyAsync(t, i)) && void 0 !== e ? e : Promise.resolve({
			visible: !1,
			disabledReason: Gh
		});
	}
	Gd(t) {
		return !t || A(t) ? (Ws.critical("Unique user id has not been set in posthog.identify"), !1) : "$posthog_cookieless" === t ? (Ws.critical(`The string "${t}" was set in posthog.identify which indicates an error. This ID is only used as a sentinel value.`), !1) : !["distinct_id", "distinctid"].includes(t.toLowerCase()) && !["undefined", "null"].includes(t.toLowerCase()) || (Ws.critical(`The string "${t}" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.`), !1);
	}
	identify(t, i, e) {
		if (!this.__loaded || !this.persistence) return Ws.uninitializedWarning("posthog.identify");
		if (F(t) && (t = t.toString(), Ws.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), !this.Gd(t)) return;
		if (!this.Ud("posthog.identify")) return;
		this.Hh();
		const s = this.get_distinct_id(), n = this.persistence.syncCookieProperties() && this.get_distinct_id() !== s, r = this.yd(!1), o = this.persistence.Ju();
		let l = !1;
		try {
			const s = this.get_distinct_id();
			this.register({ $user_id: t }), this.get_property("$device_id") || this.register_once({
				$had_persisted_distinct_id: !0,
				$device_id: s
			}, ""), t !== s && t !== this.get_property("__alias") && (this.unregister(In), this.register({ distinct_id: t }));
			const o = (this.persistence.get_property("$user_state") || "anonymous") === Lr, u = t !== s, h = !u && o;
			if (u && o) {
				var a;
				const n = this.config.reuseAnonymousId ? { distinct_id: t } : {
					distinct_id: t,
					$anon_distinct_id: s
				};
				this.persistence.set_property(_r, Nr), this.setPersonPropertiesForFlags({
					$set: i || {},
					$set_once: e || {}
				}, !1), this.config.cookieWinsOnConflict && this.persistence.Zu(), this.capture("$identify", n, {
					$set: i || {},
					$set_once: e || {}
				}) && (this.ld = ch(t, i, e)), null === (a = this.featureFlags) || void 0 === a || a.setAnonymousDistinctId(this.config.reuseAnonymousId ? void 0 : s);
			} else if (h) {
				this.persistence.set_property(_r, Nr);
				const s = i || {}, n = e || {};
				this.setPersonPropertiesForFlags({
					$set: s,
					$set_once: n
				}, !1), this.config.cookieWinsOnConflict && this.persistence.Zu(), this.capture("$set", {
					$set: s,
					$set_once: n
				}) && (this.ld = ch(t, i, e));
			} else (i || e) && this.setPersonProperties(i, e);
			u || n || r ? (this.reloadFeatureFlags(), this.featureFlags ? this.featureFlags.resetFlagCallReported() : this.unregister(gn)) : h && (i || e) && this.reloadFeatureFlags(), l = !0;
		} finally {
			o && this.persistence.Xu(l);
		}
	}
	setPersonProperties(t, i) {
		if (!t && !i) return;
		if (!this.Ud("posthog.setPersonProperties")) return;
		const e = ch(this.get_distinct_id(), t, i);
		this.ld !== e ? (this.setPersonPropertiesForFlags({
			$set: t || {},
			$set_once: i || {}
		}, !0), this.capture("$set", {
			$set: t || {},
			$set_once: i || {}
		}) && (this.ld = e)) : Ws.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.");
	}
	unsetPersonProperties(t) {
		var i;
		const e = (k(t) ? t : [t]).filter((t) => R(t) && t.length > 0);
		0 !== e.length && this.Ud("posthog.unsetPersonProperties") && (null === (i = this.featureFlags) || void 0 === i || i.unsetPersonPropertiesForFlags(e, !0), this.capture("$set", { $unset: e }), this.ld = null);
	}
	group(t, i, e) {
		var s;
		if (!t || !i) return void Ws.error("posthog.group requires a group type and group key");
		null === (s = this.persistence) || void 0 === s || s.syncCookieProperties(), this.yd();
		const n = this.getGroups(), r = n[t] !== i;
		if (r && this.resetGroupPropertiesForFlags(t), this.register({ $groups: bi(bi({}, n), {}, { [t]: i }) }), (r || e) && this.Hd()) {
			const s = {
				$group_type: t,
				$group_key: i
			};
			e && (s.$group_set = e), this.capture(Wr, s);
		}
		e && this.setGroupPropertiesForFlags({ [t]: e }), r && !e && this.reloadFeatureFlags();
	}
	resetGroups() {
		this.register({ $groups: {} }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags();
	}
	setPersonPropertiesForFlags(t, i = !0) {
		var e;
		null === (e = this.featureFlags) || void 0 === e || e.setPersonPropertiesForFlags(t, i);
	}
	resetPersonPropertiesForFlags(t = !0) {
		var i;
		null === (i = this.featureFlags) || void 0 === i || i.resetPersonPropertiesForFlags(t);
	}
	setGroupPropertiesForFlags(t, i = !0) {
		var e;
		this.Ud("posthog.setGroupPropertiesForFlags") && (null === (e = this.featureFlags) || void 0 === e || e.setGroupPropertiesForFlags(t, i));
	}
	resetGroupPropertiesForFlags(t) {
		var i;
		null === (i = this.featureFlags) || void 0 === i || i.resetGroupPropertiesForFlags(t);
	}
	reset(t) {
		const i = j(t) ? t : null == t ? void 0 : t.resetDeviceID, e = j(t) || null == t ? void 0 : t.bootstrap;
		this.Vd(i, !1, e);
	}
	Vd(t, i = !1, e) {
		var s, n, r, o, l, a;
		if (Ws.info("reset"), !this.__loaded) return Ws.uninitializedWarning("posthog.reset");
		const u = null == e ? void 0 : e.sessionID;
		this.config.bootstrap = e || (null === (s = this.jh) || void 0 === s ? void 0 : s.bootstrap) || {}, null === (n = this.featureFlags) || void 0 === n || null === (r = n.updateConfig) || void 0 === r || r.call(n, this.config, this.$c());
		const h = this.get_property(Rn), c = this.get_property(An), d = this.get_property(Jn);
		null === (o = this.sessionRecording) || void 0 === o || o.flushBeforeIdentityReset();
		const v = this.is_capturing();
		i || this.consent.reset(), i || !v || this.is_capturing() || console.warn("[PostHog.js]", "reset() cleared the stored consent, and capturing is now off because of `opt_out_capturing_by_default`. Call opt_in_capturing() again, and prefer calling reset() before opting in rather than after.");
		const f = null === (l = this.persistence) || void 0 === l || null === (a = l.Ju) || void 0 === a ? void 0 : a.call(l), p = this.Uh;
		this.Uh = p || i;
		let g = !1;
		try {
			var _, m, y, b, w, S, x, E, k, T, P, O, R;
			if (null === (_ = this.persistence) || void 0 === _ || _.clear(), null === (m = this.sessionPersistence) || void 0 === m || m.clear(), this.Yh.clear(), this.zd(), C(d) || null === (T = this.persistence) || void 0 === T || T.register({ $session_recording_remote_config: d }), null === (y = this.surveys) || void 0 === y || y.reset(), null === (b = this.featureFlags) || void 0 === b || b.reset(), null === (w = this.conversations) || void 0 === w || w.reset(), null === (S = this.logs) || void 0 === S || S.reset(), null === (x = this.metrics) || void 0 === x || x.reset(), null === (E = this.persistence) || void 0 === E || E.set_property("$user_state", "anonymous"), null === (k = this.sessionManager) || void 0 === k || k.resetSessionId(), this.ld = null, "always" === this.config.cookieless_mode) this.register_once({
				distinct_id: xr,
				$device_id: null
			}, "");
			else {
				const i = this.config.get_device_id(ho());
				this.register_once({
					distinct_id: i,
					$device_id: t ? i : h
				}, ""), t || C(c) || this.register({ [An]: c });
			}
			if (this.register({ $last_posthog_reset: (/* @__PURE__ */ new Date()).toISOString() }, 1), e) {
				if (e.distinctID && !this.Lh() && (null === (R = this.persistence) || void 0 === R || R.set_property("$user_state", e.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: e.distinctID })), null === (P = this.featureFlags) || void 0 === P || P.initialize(), !M(u) && !(null === (O = this.sessionManager) || void 0 === O ? void 0 : O.setBootstrapSessionId(u, !0))) {
					const t = bi({}, e);
					delete t.sessionID, this.config.bootstrap = t;
				}
			}
			delete this.config.identity_distinct_id, delete this.config.identity_hash, delete this.config.identity_claims, g = !0;
		} finally {
			var A, I;
			this.Uh = p, f && (null === (A = this.persistence) || void 0 === A || null === (I = A.Xu) || void 0 === I || I.call(A, g));
		}
		var F;
		this.gr && (null === (F = this.conversations) || void 0 === F || F.onRemoteConfig(this.gr)), this.reloadFeatureFlags();
	}
	shutdown(t) {
		var i = this;
		return J(function* () {
			if (!i.__loaded) return void Ws.uninitializedWarning("posthog.shutdown");
			i.Zh = !0, clearTimeout(i.gd), i.gd = void 0;
			const t = i.xd;
			i.xd = void 0;
			for (const e of [
				() => {
					var t;
					return null === (t = i.sessionRecording) || void 0 === t ? void 0 : t.dispose();
				},
				() => {
					var t;
					return null === (t = i.logs) || void 0 === t ? void 0 : t.flushLogs("sendBeacon");
				},
				() => {
					var t;
					return null === (t = i.metrics) || void 0 === t ? void 0 : t.flush("sendBeacon");
				},
				() => {
					var t;
					return null === (t = i.metrics) || void 0 === t ? void 0 : t.dispose();
				},
				() => {
					var t;
					return null === (t = i.logs) || void 0 === t ? void 0 : t.dispose();
				},
				() => {
					var t;
					return null === (t = i.surveys) || void 0 === t ? void 0 : t.dispose();
				},
				() => {
					var t;
					return null === (t = i.autocapture) || void 0 === t ? void 0 : t.dispose();
				},
				() => null == t ? void 0 : t(),
				() => {
					var t;
					return null === (t = i.hd) || void 0 === t ? void 0 : t.unload();
				},
				() => {
					var t;
					return null === (t = i.vd) || void 0 === t ? void 0 : t.unload();
				},
				() => {
					var t;
					return null === (t = i.featureFlags) || void 0 === t ? void 0 : t.destroy();
				},
				() => {
					var t;
					return null === (t = i.persistence) || void 0 === t ? void 0 : t.destroy();
				},
				() => {
					var t;
					return null === (t = i.sessionPersistence) || void 0 === t ? void 0 : t.destroy();
				}
			]) try {
				const t = e();
				t && T(t.then) && t.then(void 0, (t) => {
					Ws.error("Error during shutdown", t);
				});
			} catch (t) {
				Ws.error("Error during shutdown", t);
			}
		})();
	}
	setIdentity(t, i) {
		var e;
		delete this.config.identity_claims, this.config.identity_distinct_id = t, this.config.identity_hash = i, this.alias(t), null === (e = this.conversations) || void 0 === e || e.Qd();
	}
	clearIdentity() {
		var t;
		delete this.config.identity_distinct_id, delete this.config.identity_hash, delete this.config.identity_claims, null === (t = this.conversations) || void 0 === t || t.Jd();
	}
	get_distinct_id() {
		return this.get_property("distinct_id");
	}
	getGroups() {
		return this.get_property("$groups") || {};
	}
	get_session_id() {
		var t, i;
		return null !== (t = null === (i = this.sessionManager) || void 0 === i ? void 0 : i.checkAndGetSessionAndWindowId(!0).sessionId) && void 0 !== t ? t : "";
	}
	get_session_replay_url(t) {
		if (!this.sessionManager) return "";
		const { sessionId: i, sessionStartTimestamp: e } = this.sessionManager.checkAndGetSessionAndWindowId(!0);
		let s = this.requestRouter.endpointFor("ui", `/project/${this.config.token}/replay/${i}`);
		if ((null == t ? void 0 : t.withTimestamp) && e) {
			var n;
			const i = null !== (n = t.timestampLookBack) && void 0 !== n ? n : 10;
			if (!e) return s;
			s += `?t=${Math.max(Math.floor(((/* @__PURE__ */ new Date()).getTime() - e) / 1e3) - i, 0)}`;
		}
		return s;
	}
	alias(t, i) {
		return t === this.get_property("$people_distinct_id") ? (Ws.critical("Attempting to create alias for existing People user - aborting."), -2) : this.Ud("posthog.alias") ? (C(i) && (i = this.get_distinct_id()), t !== i ? (this.Wd(In, t), this.capture("$create_alias", {
			alias: t,
			distinct_id: i
		})) : (Ws.warn("alias matches current distinct_id - skipping api call."), this.identify(t), -1)) : void 0;
	}
	set_config(t) {
		const i = bi({}, this.config);
		if (P(t)) {
			var e, s, n, r, o, l, a, u, h, c, d, v, f, p;
			Kr(this.config, ac(t));
			const b = this.Vh();
			if (this.persistence) {
				const t = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence;
				var g, _;
				if (t && this.sessionPersistence !== this.persistence && (null === (g = this.sessionPersistence) || void 0 === g || g.remove(), null === (_ = this.sessionPersistence) || void 0 === _ || _.destroy()), this.persistence.update_config(this.config, i, b), t) this.sessionPersistence = this.persistence;
				else if (this.sessionPersistence === this.persistence) this.sessionPersistence = new Sa(bi(bi({}, this.config), {}, { persistence: "sessionStorage" }), b, !1);
				else {
					var m;
					null === (m = this.sessionPersistence) || void 0 === m || m.update_config(bi(bi({}, this.config), {}, { persistence: "sessionStorage" }), bi(bi({}, i), {}, { persistence: "sessionStorage" }), b);
				}
			}
			const w = this.ad(this.config.debug);
			var y;
			j(w) && (this.config.debug = w), j(this.config.debug) && (this.config.debug ? (rn.DEBUG = !0, mo.Ot() && mo.$t("ph_debug", !0), Ws.info("set_config", {
				config: t,
				oldConfig: i,
				newConfig: bi({}, this.config)
			})) : (rn.DEBUG = !1, mo.Ot() && mo.Dt("ph_debug"))), null === (e = this.featureFlags) || void 0 === e || null === (s = e.updateConfig) || void 0 === s || s.call(e, this.config, this.$c()), null === (n = this.exceptionObserver) || void 0 === n || n.onConfigChange(), null === (r = this.exceptions) || void 0 === r || r.onConfigChange(), null === (o = this.metrics) || void 0 === o || o.onConfigChange(), null === (l = this.webMCP) || void 0 === l || l.startIfEnabled(), null === (a = this.sessionRecording) || void 0 === a || a.startIfEnabledOrStop(), null === (u = this.tracingHeaders) || void 0 === u || u.startIfEnabledOrStop(), null === (h = this.autocapture) || void 0 === h || h.startIfEnabled(), null === (c = this.heatmaps) || void 0 === c || c.startIfEnabled(), ("capture_pageview" in t || "disable_capture_url_hashes" in t) && (null === (y = this.historyAutocapture) || void 0 === y || y.startIfEnabledOrStop()), null === (d = this.exceptionObserver) || void 0 === d || d.startIfEnabledOrStop(), null === (v = this.deadClicksAutocapture) || void 0 === v || v.startIfEnabledOrStop(), null === (f = this.surveys) || void 0 === f || f.loadIfEnabled(), this.Wh(), null === (p = this.externalIntegrations) || void 0 === p || p.startIfEnabledOrStop(), !i.segment && this.config.segment && this.persistence && Cl(this, Wh, !1);
		}
	}
	_overrideSDKInfo(t, i) {
		rn.LIB_NAME = t, rn.LIB_VERSION = i;
	}
	startSessionRecording(t) {
		const i = !0 === t, e = {
			sampling: i || !!(null == t ? void 0 : t.sampling),
			linked_flag: i || !!(null == t ? void 0 : t.linked_flag),
			url_trigger: i || !!(null == t ? void 0 : t.url_trigger),
			event_trigger: i || !!(null == t ? void 0 : t.event_trigger)
		};
		var s, n, r, o, l;
		Object.values(e).some(Boolean) && (null === (s = this.sessionManager) || void 0 === s || s.checkAndGetSessionAndWindowId(), e.sampling && (null === (n = this.sessionRecording) || void 0 === n || n.overrideSampling()), e.linked_flag && (null === (r = this.sessionRecording) || void 0 === r || r.overrideLinkedFlag()), e.url_trigger && (null === (o = this.sessionRecording) || void 0 === o || o.overrideTrigger("url")), e.event_trigger && (null === (l = this.sessionRecording) || void 0 === l || l.overrideTrigger("event")));
		this.set_config({ disable_session_recording: !1 });
	}
	stopSessionRecording() {
		this.set_config({ disable_session_recording: !0 });
	}
	sessionRecordingStarted() {
		var t;
		return !!(null === (t = this.sessionRecording) || void 0 === t ? void 0 : t.started);
	}
	captureException(t, i) {
		try {
			if (!this.exceptions) return;
			const e = this.exceptions.buildProperties(t, {
				handled: !0,
				syntheticException: /* @__PURE__ */ new Error("PostHog syntheticException")
			});
			return this.exceptions.sendExceptionEvent(bi(bi({}, e), i));
		} catch (t) {
			return;
		}
	}
	addExceptionStep(t, i) {
		var e;
		null === (e = this.exceptions) || void 0 === e || e.addExceptionStep(t, i);
	}
	captureLog(t) {
		var i;
		null === (i = this.logs) || void 0 === i || i.captureLog(t);
	}
	get logger() {
		var t, e;
		return null !== (t = null === (e = this.logs) || void 0 === e ? void 0 : e.logger) && void 0 !== t ? t : i.Zd;
	}
	startExceptionAutocapture(t) {
		this.set_config({ capture_exceptions: null == t || t });
	}
	stopExceptionAutocapture() {
		this.set_config({ capture_exceptions: !1 });
	}
	loadToolbar(t) {
		var i, e;
		return null !== (i = null === (e = this.toolbar) || void 0 === e ? void 0 : e.loadToolbar(t)) && void 0 !== i && i;
	}
	get_property(t) {
		var i;
		return null === (i = this.persistence) || void 0 === i ? void 0 : i.props[t];
	}
	getSessionProperty(t) {
		var i;
		return null === (i = this.sessionPersistence) || void 0 === i ? void 0 : i.props[t];
	}
	toString() {
		var t;
		let i = null !== (t = this.config.name) && void 0 !== t ? t : sc;
		return i !== sc && (i = "posthog." + i), i;
	}
	_isIdentified() {
		var t, i;
		return "identified" === (null === (t = this.persistence) || void 0 === t ? void 0 : t.get_property("$user_state")) || "identified" === (null === (i = this.sessionPersistence) || void 0 === i ? void 0 : i.get_property("$user_state"));
	}
	Hd() {
		var t, i;
		return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && O(this.getGroups()) && !(null === (t = this.persistence) || void 0 === t || null === (t = t.props) || void 0 === t ? void 0 : t.__alias) && !(null === (i = this.persistence) || void 0 === i || null === (i = i.props) || void 0 === i ? void 0 : i.$epp));
	}
	Ed() {
		return !0 === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && !!this.config.capture_pageview;
	}
	createPersonProfile() {
		this.Hd() || this.Ud("posthog.createPersonProfile") && this.setPersonProperties({}, {});
	}
	setInternalOrTestUser() {
		this.Ud("posthog.setInternalOrTestUser") && this.setPersonProperties({ $internal_or_test_user: !0 });
	}
	Ud(t) {
		return "never" === this.config.person_profiles ? (Ws.error(t + " was called, but process_person is set to \"never\". This call will be ignored."), !1) : (this.qh(), this.Wd(Sr, !0), !0);
	}
	Vh() {
		if ("always" === this.config.cookieless_mode) return !0;
		const t = this.consent.isOptedOut();
		return this.config.disable_persistence || t && !(!this.config.opt_out_persistence_by_default && "on_reject" !== this.config.cookieless_mode);
	}
	Wh() {
		var t, i;
		const e = this.Vh();
		var s, n, r, o;
		return this.is_capturing() || (null === (s = this.logs) || void 0 === s || s.Kd(), null === (n = this.heatmaps) || void 0 === n || n.discardPending()), (null === (t = this.persistence) || void 0 === t ? void 0 : t.gi) !== e && (null === (r = this.persistence) || void 0 === r || r.set_disabled(e)), (null === (i = this.sessionPersistence) || void 0 === i ? void 0 : i.gi) !== e && (null === (o = this.sessionPersistence) || void 0 === o || o.set_disabled(e)), this.zd(), e;
	}
	opt_in_capturing(t) {
		var e, s, n;
		if ("always" === this.config.cookieless_mode) return void Ws.warn(Vh);
		if (this.Lh()) {
			var r, o, l, a, u, h;
			null === (r = this.sessionRecording) || void 0 === r || r.dispose({ discardBufferedEvents: !0 }), this.Vd(!0, !0), null === (o = this.sessionManager) || void 0 === o || o.destroy(), null === (l = this.pageViewManager) || void 0 === l || l.destroy(), this.sessionManager = new ih(this), this.pageViewManager = new Ml(this), this.persistence && (this.sessionPropsManager = new Zu(this, this.sessionManager, this.persistence));
			const t = null !== (a = null === (u = this.config.__extensionClasses) || void 0 === u ? void 0 : u.sessionRecording) && void 0 !== a ? a : null === (h = i.__defaultExtensionClasses) || void 0 === h ? void 0 : h.sessionRecording;
			var c, d;
			t && (this.sessionRecording = this.Fh(this.sessionRecording, new t(this)), this.gr && (null === (c = this.sessionRecording) || void 0 === c || null === (d = c.onRemoteConfig) || void 0 === d || d.call(c, this.gr)));
		}
		const v = 1 === this.consent.consent;
		var f, p, g, _;
		v ? this.Hh() : null === (f = this.heatmaps) || void 0 === f || f.discardPending(), this.consent.optInOut(!0), this.Wh(), this.Td(), null === (e = this.sessionRecording) || void 0 === e || e.startIfEnabledOrStop(), "on_reject" == this.config.cookieless_mode && (null === (p = this.surveys) || void 0 === p || p.loadIfEnabled(), null === (g = this.conversations) || void 0 === g || g.loadIfEnabled()), v || !C(null == t ? void 0 : t.captureEventName) && !(null == t ? void 0 : t.captureEventName) || this.capture(null !== (_ = null == t ? void 0 : t.captureEventName) && void 0 !== _ ? _ : "$opt_in", null == t ? void 0 : t.captureProperties, { send_instantly: !0 }), null === (s = this.persistence) || void 0 === s || s.syncCookieProperties(), this.yd(), null === (n = this.featureFlags) || void 0 === n || n.sendFlagCallsPendingCapture(), this.config.capture_pageview && this.Md();
	}
	opt_out_capturing() {
		"always" !== this.config.cookieless_mode ? (this.consent.optInOut(!1), this.Wh(), "on_reject" === this.config.cookieless_mode && this.Gh()) : Ws.warn(Vh);
	}
	Gh() {
		var t, i, e;
		const s = this.sessionRecording;
		s?.dispose({ discardBufferedEvents: !0 }), null === (t = this.heatmaps) || void 0 === t || t.discardPending(), "$posthog_cookieless" !== this.get_distinct_id() && this.Vd(!0, !0), this.register({
			distinct_id: xr,
			$device_id: null
		}), this.Ph(s), this.sessionRecording = void 0, null === (i = this.sessionManager) || void 0 === i || i.destroy(), null === (e = this.pageViewManager) || void 0 === e || e.destroy(), this.sessionManager = void 0, this.sessionPropsManager = void 0, this.config.capture_pageview && this.Md(), this.Td();
	}
	has_opted_in_capturing() {
		return this.consent.isOptedIn();
	}
	has_opted_out_capturing() {
		return this.consent.isOptedOut();
	}
	get_explicit_consent_status() {
		const t = this.consent.consent;
		return 1 === t ? "granted" : 0 === t ? "denied" : "pending";
	}
	is_capturing() {
		return !this.Uh && ("always" === this.config.cookieless_mode || ("on_reject" === this.config.cookieless_mode ? this.consent.isRejected() || this.consent.isOptedIn() : !this.has_opted_out_capturing()));
	}
	clear_opt_in_out_capturing() {
		this.consent.reset(), this.Wh();
	}
	_is_bot() {
		return e ? sh(e, this.config.custom_blocked_useragents) : void 0;
	}
	Md() {
		s && ("visible" === s.visibilityState ? this.sd || (this.sd = !0, this.capture(zr, { title: s.title }, { send_instantly: !0 }), this.rd && (s.removeEventListener(wn, this.rd), this.rd = null)) : this.rd || (this.rd = this.Md.bind(this), io(s, wn, this.rd)));
	}
	debug(i) {
		!1 === i ? (t?.console.log("You've disabled debug mode."), this.set_config({ debug: !1 })) : (t?.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), this.set_config({ debug: !0 }));
	}
	$c() {
		const t = this.jh || {};
		return "advanced_disable_flags" in t ? !!t.advanced_disable_flags : !1 !== this.config.advanced_disable_flags ? !!this.config.advanced_disable_flags : !0 === this.config.advanced_disable_decide ? (Ws.warn("Config field 'advanced_disable_decide' is deprecated. Please use 'advanced_disable_flags' instead. The old field will be removed in a future major version."), !0) : function(t, i, e, s, n) {
			const r = i in t && !M(t[i]), o = e in t && !M(t[e]);
			return r ? t[i] : !!o && (n && n.warn(`Config field '${e}' is deprecated. Please use '${i}' instead. The old field will be removed in a future major version.`), t[e]);
		}(t, "advanced_disable_flags", "advanced_disable_decide", 0, Ws);
	}
	Ds(t) {
		var i;
		if (M(this.config.before_send)) return t;
		const e = Object.keys(null !== (i = t.properties) && void 0 !== i ? i : {}).filter(N), s = k(this.config.before_send) ? this.config.before_send : [this.config.before_send];
		let n = t;
		for (const i of s) try {
			if (n = i(n), M(n)) {
				const i = `Event '${t.event}' was rejected in beforeSend function`;
				return L(t.event) ? Ws.warn(`${i}. This can cause unexpected behavior.`) : Ws.info(i), null;
			}
			n.properties && !O(n.properties) || Ws.warn(`Event '${t.event}' has no properties after beforeSend function, this is likely an error.`);
		} catch (i) {
			return Ws.error(`Error in beforeSend function for event '${t.event}':`, i), null;
		}
		for (const i of e) if (n.properties && M(n.properties[i])) return Ws.warn(`Event '${t.event}' had its '${i}' property removed in a beforeSend function. This property is required for ingestion, so the event will be dropped.`), null;
		return n;
	}
	getPageViewId() {
		var t;
		return null === (t = this.pageViewManager.tu) || void 0 === t ? void 0 : t.pageViewId;
	}
	captureTraceFeedback(t, i) {
		this.capture("$ai_feedback", {
			$ai_trace_id: String(t),
			$ai_feedback_text: i
		});
	}
	captureTraceMetric(t, i, e) {
		this.capture("$ai_metric", {
			$ai_trace_id: String(t),
			$ai_metric_name: i,
			$ai_metric_value: String(e)
		});
	}
	ad(t) {
		const i = j(t) && !t, e = mo.Ot() && "true" === mo.Lt("ph_debug");
		return !i && (!!e || t);
	}
};
hc.__defaultExtensionClasses = {}, hc.Zd = (() => {
	const t = () => {};
	return {
		trace: t,
		debug: t,
		info: t,
		warn: t,
		error: t,
		fatal: t
	};
})(), function(t, i) {
	for (let e = 0; i.length > e; e++) t.prototype[i[e]] = Yr(t.prototype[i[e]]);
}(hc, ["identify"]);
var cc = ["[data-ph-capture-value]"];
var dc = class {
	constructor(t) {
		this._instance = t;
	}
	refresh(t) {
		var i;
		const e = this._instance.config, s = P(e.autocapture) ? e.autocapture : void 0;
		t.enabled = !!e.autocapture, t.rageclick = e.rageclick, t.maskAllElementAttributes = e.mask_all_element_attributes, t.maskAllText = e.mask_all_text, t.disableCaptureUrlHashes = e.disable_capture_url_hashes, t.getCurrentUrl = e.get_current_url, t.remoteRequestsDisabled = this._instance.$c(), t.url_allowlist = null == s ? void 0 : s.url_allowlist, t.url_ignorelist = null == s ? void 0 : s.url_ignorelist, t.dom_event_allowlist = null == s ? void 0 : s.dom_event_allowlist, t.element_allowlist = null == s ? void 0 : s.element_allowlist, t.css_selector_allowlist = null == s ? void 0 : s.css_selector_allowlist, t.css_selector_ignorelist = null == s ? void 0 : s.css_selector_ignorelist, t.element_attribute_ignorelist = null == s ? void 0 : s.element_attribute_ignorelist, t.capture_copied_text = null == s ? void 0 : s.capture_copied_text, t.capture_value_css_selector_allowlist = null !== (i = null == s ? void 0 : s.capture_value_css_selector_allowlist) && void 0 !== i ? i : cc;
	}
};
var vc = Vs("[ExceptionAutocapture]");
var fc = () => {};
var pc = (t) => {
	var i;
	if (T(t)) return null !== (i = t.__posthog_layer__) && void 0 !== i ? i : t.__rrweb_layer__;
};
function gc(t, i, e) {
	try {
		if (!(i in t)) return fc;
		const s = { next: t[i] }, n = e(function(...t) {
			return s.next.apply(this, t);
		});
		return T(n) && (n.prototype = n.prototype || {}, Object.defineProperties(n, {
			__posthog_wrapped__: {
				enumerable: !1,
				value: !0
			},
			__posthog_layer__: {
				enumerable: !1,
				value: s
			}
		})), t[i] = n, () => {
			if (t[i] === n) return void (t[i] = s.next);
			let e = t[i], r = pc(e);
			for (; r;) {
				if (r.next === n) return void (r.next = s.next);
				e = r.next, r = pc(e);
			}
		};
	} catch (t) {
		return fc;
	}
}
var _c = Vs("[TracingHeaders]");
var mc = Vs("[Web Vitals]");
var yc = 9e5;
var bc = [
	"CLS",
	"FCP",
	"INP",
	"LCP"
];
var wc = ["INP", "LCP"];
var $c = [
	"interactionTarget",
	"interactionType",
	"inputDelay",
	"processingDuration",
	"presentationDelay",
	"loadState",
	"target",
	"url",
	"timeToFirstByte",
	"resourceLoadDelay",
	"resourceLoadDuration",
	"elementRenderDelay",
	"largestShiftTarget",
	"largestShiftTime",
	"largestShiftValue",
	"firstByteToFCP"
];
var Sc = "disabled";
var xc = "lazy_loading";
function Ec(t) {
	return "ph_replay_pending_buffer_" + JSON.stringify([t.persistence_name || t.token, t.token]);
}
var kc = Vs("[SessionRecording]");
var Tc = [
	Pr,
	Or,
	Cr,
	Rr,
	Ar,
	Ir,
	Mr,
	Fr,
	Dr
];
var Pc = Vs("[Heatmaps]");
function Oc(t) {
	return P(t) && "clientX" in t && "clientY" in t && F(t.clientX) && F(t.clientY);
}
var Cc = Vs("[Product Tours]");
var Rc = (t) => {
	var i;
	return !t.config.disable_product_tours && !!(null === (i = t.persistence) || void 0 === i ? void 0 : i.get_property(Vn));
};
var Ac = ["$set_once", "$set"];
var Ic = Vs("[SiteApps]");
var Mc = "Error while initializing PostHog app with config id ";
function Fc(t, i, e) {
	if (M(t)) return !1;
	switch (e) {
		case "exact": return t === i;
		case "contains": {
			const e = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/_/g, ".").replace(/%/g, ".*");
			return new RegExp(e, "i").test(t);
		}
		case "regex": try {
			return new RegExp(i).test(t);
		} catch (t) {
			return !1;
		}
		default: return !1;
	}
}
var Dc = class {
	constructor(t) {
		this.Fi = t, this.Bo = /* @__PURE__ */ new Set(), this.zo = /* @__PURE__ */ new Set(), this.Ho = new Xu(), this.Uo = (t, i) => this.Wo(t, i) && this.Go(t, i) && this.Vo(t, i) && this.Qo(t, i), this.Wo = (t, i) => !(null == i ? void 0 : i.event) || (null == t ? void 0 : t.event) === (null == i ? void 0 : i.event);
	}
	init() {
		var t, i;
		C(null === (t = this.Fi) || void 0 === t ? void 0 : t.subscribeCapture) || (this.Jo = null === (i = this.Fi) || void 0 === i ? void 0 : i.subscribeCapture((t, i) => {
			this.on(t, i);
		}));
	}
	dispose() {
		var t, i, e;
		null === (t = this.Jo) || void 0 === t || t.call(this), this.Jo = void 0, null === (i = this.Fi) || void 0 === i || null === (e = i.setElementSelectors) || void 0 === e || e.call(i, /* @__PURE__ */ new Set(), this), this.Ho = new Xu();
	}
	register(t) {
		var i, e;
		if (!C(null === (i = this.Fi) || void 0 === i ? void 0 : i.subscribeCapture) && (t.forEach((t) => {
			var i;
			this.Bo.add(t), null === (i = t.steps) || void 0 === i || i.forEach((t) => {
				this.zo.add((null == t ? void 0 : t.event) || "");
			});
		}), null === (e = this.Fi) || void 0 === e ? void 0 : e.setElementSelectors)) {
			const t = /* @__PURE__ */ new Set();
			this.Bo.forEach((i) => {
				var e;
				null === (e = i.steps) || void 0 === e || e.forEach((i) => {
					null != i && i.selector && t.add(i.selector);
				});
			}), this.Fi.setElementSelectors(t, this);
		}
	}
	replace(t) {
		this.Bo.clear(), this.zo.clear(), this.register(t);
	}
	on(t, i) {
		null != i && 0 != t.length && (this.zo.has(t) || this.zo.has(i.event)) && this.Bo.forEach((t) => {
			this.Zo(i, t) && this.Ho.emit("actionCaptured", t.name);
		});
	}
	Ko(t) {
		this.onAction("actionCaptured", (i) => t(i));
	}
	Zo(t, i) {
		if (null == (null == i ? void 0 : i.steps)) return !1;
		for (const e of i.steps) if (this.Uo(t, e)) return !0;
		return !1;
	}
	onAction(t, i) {
		return this.Ho.on(t, i);
	}
	Go(t, i) {
		if (null == i ? void 0 : i.url) {
			var e;
			let r = null == t || null === (e = t.properties) || void 0 === e ? void 0 : e.$current_url;
			if (!(null == t ? void 0 : t.properties) || !("$current_url" in t.properties)) try {
				var s, n;
				r = null === (s = this.Fi) || void 0 === s || null === (n = s.getActionUrl) || void 0 === n ? void 0 : n.call(s);
			} catch (t) {
				return !1;
			}
			if (!r || "string" != typeof r) return !1;
			if (!Fc(r, i.url, i.url_matching || "contains")) return !1;
		}
		return !0;
	}
	Vo(t, i) {
		return !!this.Yo(t, i) && !!this.Xo(t, i) && !!this.tl(t, i);
	}
	Yo(t, i) {
		var e;
		if (!(null == i ? void 0 : i.href)) return !0;
		const s = this.el(t);
		if (s.length > 0) return s.some((t) => Fc(t.href, i.href, i.href_matching || "exact"));
		const n = (null == t || null === (e = t.properties) || void 0 === e ? void 0 : e.$elements_chain) || "";
		return !!n && Fc(function(t) {
			const i = t.match(/(?::|")href="(.*?)"/);
			return i ? i[1] : "";
		}(n), i.href, i.href_matching || "exact");
	}
	Xo(t, i) {
		var e;
		if (!(null == i ? void 0 : i.text)) return !0;
		const s = this.el(t);
		if (s.length > 0) return s.some((t) => Fc(t.text, i.text, i.text_matching || "exact") || Fc(t.$el_text, i.text, i.text_matching || "exact"));
		const n = (null == t || null === (e = t.properties) || void 0 === e ? void 0 : e.$elements_chain) || "";
		return !!n && (r = function(t) {
			const i = [], e = /(?::|")text="(.*?)"/g;
			let s;
			for (; !M(s = e.exec(t));) i.includes(s[1]) || i.push(s[1]);
			return i;
		}(n), o = i.text, l = i.text_matching || "exact", r.some((t) => Fc(t, o, l)));
		var r, o, l;
	}
	tl(t, i) {
		var e, s;
		if (!(null == i ? void 0 : i.selector)) return !0;
		const n = null == t || null === (e = t.properties) || void 0 === e ? void 0 : e.$element_selectors;
		if (null == n ? void 0 : n.includes(i.selector)) return !0;
		const r = (null == t || null === (s = t.properties) || void 0 === s ? void 0 : s.$elements_chain) || "";
		if (i.selector_regex && r) try {
			return new RegExp(i.selector_regex).test(r);
		} catch (t) {}
		return !1;
	}
	el(t) {
		var i;
		return null == (null == t || null === (i = t.properties) || void 0 === i ? void 0 : i.$elements) ? [] : null == t ? void 0 : t.properties.$elements;
	}
	Qo(t, i) {
		return !(null == i ? void 0 : i.properties) || 0 === i.properties.length || hh(i.properties.reduce((t, i) => {
			const e = k(i.value) ? i.value.map(String) : null != i.value ? [String(i.value)] : [];
			return t[i.key] = {
				values: e,
				operator: i.operator || "exact"
			}, t;
		}, {}), null == t ? void 0 : t.properties);
	}
};
var jc = class {
	constructor(t, i) {
		this.il = i, this.nl = [], this.Fi = t, this.sl = /* @__PURE__ */ new Map(), this.rl = /* @__PURE__ */ new Map(), this.ll = /* @__PURE__ */ new Map();
	}
	al() {
		var t, i;
		this.ul = null === (t = (i = this.Fi).subscribeSession) || void 0 === t ? void 0 : t.call(i, (t) => this.cl(t));
	}
	hl(t) {
		return !1;
	}
	dl() {
		return null;
	}
	vl(t) {}
	fl() {}
	pl(t, i) {
		return !!t && hh(t.propertyFilters, null == i ? void 0 : i.properties);
	}
	gl(t, i) {
		const e = /* @__PURE__ */ new Map();
		return t.forEach((t) => {
			var s;
			null === (s = t.conditions) || void 0 === s || null === (s = s[i]) || void 0 === s || null === (s = s.values) || void 0 === s || s.forEach((i) => {
				if (null == i ? void 0 : i.name) {
					const s = e.get(i.name) || [];
					s.push(t.id), e.set(i.name, s);
				}
			});
		}), e;
	}
	ml(t, i, e) {
		const s = (e === Ea.Activation ? this.sl : this.rl).get(t);
		let n = [];
		return this.yl((t) => {
			n = t.filter((t) => null == s ? void 0 : s.includes(t.id));
		}), n.filter((s) => {
			var n;
			const r = null === (n = s.conditions) || void 0 === n || null === (n = n[e]) || void 0 === n || null === (n = n.values) || void 0 === n ? void 0 : n.find((i) => i.name === t);
			return this.pl(r, i);
		});
	}
	register(t) {
		this.bl(t, !1);
	}
	replace(t) {
		this.bl(t, !0);
	}
	bl(t, i) {
		C(this.Fi.subscribeCapture) || (this._l(t, i), this.wl(t, i));
	}
	wl(t, i) {
		const e = t.filter((t) => {
			var i;
			return null === (i = t.conditions) || void 0 === i || null === (i = i.actions) || void 0 === i || null === (i = i.values) || void 0 === i ? void 0 : i.length;
		});
		var s;
		if (i && this.ll.clear(), 0 === e.length) return void (i && (null === (s = this.kl) || void 0 === s || s.replace([])));
		this.kl || (this.kl = new Dc(this.Fi), this.kl.init(), this.kl.Ko((t) => this.onAction(t)));
		const n = [];
		e.forEach((t) => {
			var i;
			null === (i = t.conditions) || void 0 === i || null === (i = i.actions) || void 0 === i || i.values.forEach((i) => {
				if (n.push(i), i.name) {
					var e;
					const s = null !== (e = this.ll.get(i.name)) && void 0 !== e ? e : [];
					s.includes(t.id) || s.push(t.id), this.ll.set(i.name, s);
				}
			});
		}), i ? this.kl.replace(n) : this.kl.register(n);
	}
	Sl(t, i) {
		i.forEach((i, e) => {
			var s;
			const n = null !== (s = t.get(e)) && void 0 !== s ? s : [];
			i.forEach((t) => {
				n.includes(t) || n.push(t);
			}), t.set(e, n);
		});
	}
	_l(t, i) {
		var e, s, n;
		const r = t.filter((t) => {
			var i, e;
			return (null === (i = t.conditions) || void 0 === i ? void 0 : i.events) && (null === (e = t.conditions) || void 0 === e || null === (e = e.events) || void 0 === e || null === (e = e.values) || void 0 === e ? void 0 : e.length) > 0;
		}), o = t.filter((t) => {
			var i, e;
			return (null === (i = t.conditions) || void 0 === i ? void 0 : i.cancelEvents) && (null === (e = t.conditions) || void 0 === e || null === (e = e.cancelEvents) || void 0 === e || null === (e = e.values) || void 0 === e ? void 0 : e.length) > 0;
		}), l = this.gl(t, Ea.Activation), a = this.gl(t, Ea.Cancellation);
		i ? (this.sl = l, this.rl = a) : (this.Sl(this.sl, l), this.Sl(this.rl, a)), (0 !== r.length || 0 !== o.length || t.some((t) => {
			var i;
			return null === (i = t.conditions) || void 0 === i || null === (i = i.actions) || void 0 === i || null === (i = i.values) || void 0 === i ? void 0 : i.length;
		})) && (null !== (e = this.Jo) && void 0 !== e || (this.Jo = null === (s = (n = this.Fi).subscribeCapture) || void 0 === s ? void 0 : s.call(n, (t, i) => {
			this.onEvent(t, i);
		})));
	}
	onEvent(t, i) {
		var e, s;
		const n = this.xl(), r = (null == i || null === (e = i.properties) || void 0 === e ? void 0 : e.$survey_id) || (null == i || null === (s = i.properties) || void 0 === s ? void 0 : s.$product_tour_id);
		if (r && this.getActivatedIds().includes(r)) {
			const e = this.$l(t, r, i);
			if ("consume" === e) return n.info("event consumed activated item, removing it", {
				event: t,
				itemId: r
			}), void this.Cl([r]);
			if ("persist" === e) return n.info("shown item promoted to persisted activation", {
				event: t,
				itemId: r
			}), this.Tl(r), void this.Ml([r]);
		}
		if (this.rl.has(t)) {
			const e = this.ml(t, i, Ea.Cancellation);
			e.length > 0 && (n.info("cancel event matched, cancelling items", {
				event: t,
				itemsToCancel: e.map((t) => t.id)
			}), this.Cl(e.map((t) => t.id)), e.forEach((t) => this.Il(t.id)));
		}
		if (!this.sl.has(t)) return;
		n.info("event name matched", {
			event: t,
			eventPayload: i,
			items: this.sl.get(t)
		});
		const o = this.ml(t, i, Ea.Activation);
		this.El(o.map((t) => t.id));
	}
	onAction(t) {
		this.ll.has(t) && this.El(this.ll.get(t) || []);
	}
	El(t) {
		if (0 === t.length) return;
		const i = !!this.Fi.getSessionId(), e = [];
		for (const s of t) i && this.hl(s) ? this.Tl(s) && this.Al(s) : e.push(s);
		e.length > 0 && (this.nl = [.../* @__PURE__ */ new Set([...this.nl, ...e])]), this.xl().info("updating activated items", { activatedItems: this.getActivatedIds() }), this.Rl();
	}
	Tl(t) {
		this.nl = this.nl.filter((i) => i !== t);
		const i = this.Pl();
		return !i.includes(t) && (this.Ol([...i, t]), this.Fl(), !0);
	}
	Cl(t) {
		const i = new Set(t);
		this.nl = this.nl.filter((t) => !i.has(t));
		const e = this.Ll(), s = e.filter((t) => !i.has(t));
		s.length !== e.length && (this.Ol(s), 0 === s.length && this.Dl()), this.Ml(t), this.Rl();
	}
	Rl() {
		try {
			var t;
			null === (t = this.il) || void 0 === t || t.call(this);
		} catch (t) {
			this.xl().error("Error while handling activated items change", t);
		}
	}
	Nl() {
		const t = this.dl();
		if (!t) return {};
		const i = this.Fi.getProperty(t);
		return i && "object" == typeof i ? i : {};
	}
	Al(t) {
		if (!this.dl()) return;
		const i = this.Nl();
		this.vl(bi(bi({}, i), {}, { [t]: Date.now() }));
	}
	Ml(t) {
		if (!this.dl()) return;
		const i = this.Nl(), e = {};
		let s = !1;
		for (const [n, r] of Object.entries(i)) t.includes(n) ? s = !0 : e[n] = r;
		s && (O(e) ? this.fl() : this.vl(e));
	}
	jl() {
		this.dl() && this.fl();
	}
	getActivationTimestamp(t) {
		if (!this.Pl().includes(t)) return;
		const i = this.Nl()[t];
		return F(i) ? i : void 0;
	}
	Ll() {
		const t = this.ql();
		return this.Fi.getProperty(t) || [];
	}
	Pl() {
		const t = this.Ll();
		if (0 === t.length) return [];
		const i = this.Fi.getProperty(this.Bl()), e = this.Fi.getSessionId();
		return e && i === e ? t : [];
	}
	Fl() {
		const t = this.Fi.getSessionId();
		t && this.zl(t);
	}
	Dl() {
		this.Hl();
	}
	cl(t) {
		const i = this.Fi.getProperty(this.Bl());
		if (i && i !== t) {
			const t = this.Ll(), i = this.Nl();
			t.length > 0 && (this.Ol([]), t.filter((t) => F(i[t])).forEach((t) => this.Il(t))), this.Dl(), this.jl(), t.length > 0 && this.Rl();
		}
	}
	getActivatedIds() {
		return [.../* @__PURE__ */ new Set([...this.Pl(), ...this.nl])].filter((t) => !this.Ul(t));
	}
	dispose() {
		var t, i, e;
		null === (t = this.ul) || void 0 === t || t.call(this), this.ul = void 0, null === (i = this.Jo) || void 0 === i || i.call(this), this.Jo = void 0, null === (e = this.kl) || void 0 === e || e.dispose(), this.kl = void 0;
	}
	reset() {
		this.nl = [], this.Ll().length > 0 && this.Ol([]), this.Dl(), this.jl(), this.Rl();
	}
	getEventToItemsMap() {
		return this.sl;
	}
	Wl() {
		return this.kl;
	}
};
var Lc = class extends jc {
	constructor(t, i, e, s) {
		var n;
		super({
			subscribeCapture(i) {
				const e = t.onEvent((t) => i(t.event, t));
				return () => e.dispose();
			},
			subscribeSession(i) {
				const e = t.onSession(i);
				return () => e.dispose();
			},
			getSessionId() {
				var i;
				return null === (i = t.session) || void 0 === i ? void 0 : i.sessionId;
			},
			getProperty: (i) => t.kv.get(i),
			getActionUrl: null == e ? void 0 : e.getActionUrl,
			setElementSelectors: null !== (n = null == e ? void 0 : e.setElementSelectors) && void 0 !== n ? n : (i, e) => {
				var s;
				return null === (s = t.getExtension("autocapture")) || void 0 === s ? void 0 : s.setElementSelectors(i, e);
			}
		}, s), this.Gl = t, this.Vl = i, this.al();
	}
	ql() {
		return kn;
	}
	Bl() {
		return Tn;
	}
	dl() {
		return Pn;
	}
	vl(t) {
		this.Gl.kv.set({ [Pn]: t });
	}
	fl() {
		this.Gl.kv.remove(Pn);
	}
	hl(t) {
		var i;
		let e;
		this.yl((i) => {
			e = i.find((i) => i.id === t);
		});
		const s = null == e || null === (i = e.appearance) || void 0 === i ? void 0 : i.surveyPopupDelaySeconds;
		return F(s) && s > 0;
	}
	Ql() {
		return Ia.SHOWN;
	}
	yl(t) {
		this.Vl.getSurveys(t);
	}
	Il(t) {
		this.Vl.cancelPendingSurvey(t);
	}
	xl() {
		return _h;
	}
	Ol(t) {
		this.Gl.kv.set({ [kn]: t });
	}
	zl(t) {
		this.Gl.kv.set({ [Tn]: t });
	}
	Hl() {
		this.Gl.kv.remove(Tn);
	}
	Ul() {
		return !1;
	}
	$l(t, i, e) {
		var s;
		if (t === Ia.SENT && !1 === (null == e || null === (s = e.properties) || void 0 === s ? void 0 : s.$survey_completed)) return "ignore";
		let n;
		return this.yl((t) => {
			n = t.find((t) => t.id === i);
		}), !n || function(t) {
			var i;
			return oh(t) && !!(null === (i = t.conditions) || void 0 === i || null === (i = i.events) || void 0 === i ? void 0 : i.repeatedActivation) || "always" === t.schedule;
		}(n) ? t === Ia.SHOWN ? "consume" : "ignore" : t === Ia.SHOWN ? "persist" : t === Ia.DISMISSED || t === Ia.SENT ? "consume" : "ignore";
	}
	getSurveys() {
		return this.getActivatedIds();
	}
	getEventToSurveys() {
		return this.getEventToItemsMap();
	}
};
var Nc = (t, i) => (null == t ? void 0 : t.then) ? t.then(i) : i(t);
var Bc = "SDK is not enabled or survey functionality is not yet loaded";
var Uc = "Disabled. Not loading surveys.";
var zc = class {
	constructor(t) {
		this.Jl = t, this.name = "surveys", this._surveyEventReceiver = null, this._surveyManager = null, this.Zl = !1, this.Kl = !1, this.Yl = [], this.Xl = [], this.ta = null, this.ea = null, this.Ai = !1, this.ia = /* @__PURE__ */ new Set(), this.onRemoteConfig = (t) => {
			if (this.Ai) return;
			if (this.Br.disableSurveys) return;
			if (!t.ok) return this.Kl = !0, this.na({
				isLoaded: !1,
				error: "Remote config unavailable. Not loading surveys."
			}), _h.warn("Remote config unavailable. Not loading surveys.");
			const i = t.config.surveys;
			if (M(i)) return _h.warn("Flags not loaded yet. Not loading surveys.");
			this.sa = j(i) ? i : i.length > 0, _h.info(`flags response received, isSurveysEnabled: ${this.sa}`), this.loadIfEnabled();
		}, this.na = (t) => {
			this.Xl.slice().forEach((i) => this.ra(i, t));
		};
	}
	setup(t) {
		if (!this.Ai) return this.oa = t, Nc(t.kv.initialize(), () => {
			if (this.oa !== t || this.Ai) return;
			this.oa = void 0, this.Gl = t;
			const i = t.onRemoteConfig(this.onRemoteConfig);
			this.Ai ? i.dispose() : (this.la = i, this.loadIfEnabled());
		});
	}
	dispose() {
		var t, i, e, s, n;
		this.Ai || (this.Ai = !0, this.oa = void 0, this.Gl = void 0, null === (t = this.la) || void 0 === t || t.dispose(), this.la = void 0, null === (i = this._surveyEventReceiver) || void 0 === i || i.dispose(), this._surveyEventReceiver = null, null === (e = this._surveyManager) || void 0 === e || null === (s = e.dispose) || void 0 === s || s.call(e), this._surveyManager = null, this.Yl = [], this.Xl.forEach((t) => {
			t.active = !1;
		}), this.Xl = [], null === (n = this.aa) || void 0 === n || n.call(this), this.aa = void 0, this.ta = null, this.ia.forEach((t) => clearTimeout(t)), this.ia.clear());
	}
	get Br() {
		return this.Jl.get();
	}
	getRenderContext() {
		if (!this.Gl) return;
		const t = this;
		return {
			client: this.Gl,
			get config() {
				return t.Br;
			},
			surveys: t
		};
	}
	initialize() {
		this.loadIfEnabled();
	}
	reset() {
		var t, i;
		null === (t = this._surveyManager) || void 0 === t || null === (i = t.clearInMemoryInProgressSurveyState) || void 0 === i || i.call(t);
		try {
			var e;
			null === (e = this._surveyEventReceiver) || void 0 === e || e.reset(), localStorage.removeItem("lastSeenSurveyDate");
			const t = [];
			for (let i = 0; i < localStorage.length; i++) {
				const e = localStorage.key(i);
				(null != e && e.startsWith("seenSurvey_") || null != e && e.startsWith("inProgressSurvey_")) && t.push(e);
			}
			t.forEach((t) => localStorage.removeItem(t));
		} catch (t) {}
		this.na();
	}
	loadIfEnabled() {
		if (this.Ai || !this.Gl) return;
		const t = this.Br;
		if (this._surveyManager) return;
		if (this.Zl) return void _h.info("Already initializing surveys, skipping...");
		if (t.disableSurveys) return void _h.info(Uc);
		if (t.cookielessMode && this.Gl.isOptedOut) return void _h.info("Not loading surveys in cookieless mode without consent.");
		const i = this.Jl.getExtensions();
		if (!i) return void this.ua("PostHog Extensions not found.");
		if (C(this.sa) && !t.advancedEnableSurveys) return;
		const e = this.sa || t.advancedEnableSurveys;
		this.Zl = !0, this.Kl = !1;
		try {
			const t = i.generateSurveys;
			if (t) return this.ca(t, e), void (this.Zl = !1);
			const s = i.loadExternalDependency;
			if (!s) return this.ua(En), void (this.Zl = !1);
			s((t) => {
				try {
					if (this.Ai) return;
					const i = this.Jl.getExtensions();
					t || !(null == i ? void 0 : i.generateSurveys) ? this.ua("Could not load surveys script", t) : this.ca(i.generateSurveys, e);
				} finally {
					this.Zl = !1;
				}
			});
		} catch (t) {
			throw this.Zl = !1, this.ua("Error initializing surveys", t), t;
		}
	}
	ca(t, i) {
		var e;
		if (this.Ai) return;
		this._surveyManager = t(i), this._surveyEventReceiver = this.ha(this.Gl, this.na);
		const s = null === (e = this.Gl) || void 0 === e ? void 0 : e.kv.get(Sn);
		s && this.da(s), _h.info("Surveys loaded successfully"), this.va(), this.na(), this.fa({ isLoaded: !0 });
	}
	ha(t, i) {
		return new Lc(t, this, void 0, i);
	}
	ua(t, i) {
		this.Kl = !0, _h.error(t, i), this.na({
			isLoaded: !1,
			error: t
		}), this.fa({
			isLoaded: !1,
			error: t
		});
	}
	onSurveysLoaded(t) {
		return this.Yl.push(t), this._surveyManager && this.fa({ isLoaded: !0 }), () => {
			this.Yl = this.Yl.filter((i) => i !== t);
		};
	}
	getSurveys(t, i = !1) {
		if (this.Ai) return;
		const e = this.Gl;
		if (!e) return t([], {
			isLoaded: !1,
			error: Bc
		});
		if (this.Br.disableSurveys) return _h.info(Uc), t([]);
		const s = e.kv.get(Sn);
		if (s && !i) return t(s, { isLoaded: !0 }), void (this.pa() && this.getSurveys(() => {}, !0));
		if (this.ta) return void this.ta.then(({ surveys: i, context: e }) => {
			this.Ai || t(i, e);
		}).catch((t) => _h.error("Error in survey callback", t));
		const n = e.sendRequest("/api/surveys/", {
			method: "GET",
			query: { token: e.projectToken },
			sentAt: "query",
			timeoutMs: this.Br.requestTimeoutMs
		}).then((t) => {
			try {
				return this.ga(e, t);
			} catch (t) {
				return _h.error("Error processing surveys response", t), this.ga(e, {
					statusCode: 0,
					error: t
				});
			}
		}, (t) => this.ga(e, {
			statusCode: 0,
			error: t
		}));
		this.ta = n;
		const r = () => {
			this.ta === n && (this.ta = null);
		};
		n.then((i) => {
			r(), this.Ai || (this.na(i.context), t(i.surveys, i.context));
		}, r).catch((t) => _h.error("Error in survey callback", t));
	}
	ga(t, i) {
		if (this.Ai) return {
			surveys: [],
			context: {
				isLoaded: !1,
				error: Bc
			}
		};
		const e = i.statusCode;
		if (200 !== e || !i.json) {
			const t = `Surveys API could not be loaded, status: ${e}`;
			return 0 !== e ? _h.error(t) : i.error || _h.warn(t), this.ea = Date.now(), {
				surveys: [],
				context: {
					isLoaded: !1,
					error: t
				}
			};
		}
		this.ea = null;
		const s = i.json.surveys || [];
		return t.kv.set({
			[Sn]: s,
			[xn]: Date.now()
		}), this.da(s), {
			surveys: s,
			context: { isLoaded: !0 }
		};
	}
	da(t) {
		const i = t.filter((t) => function(t) {
			return !(!t.start_date || t.end_date);
		}(t) && (oh(t) || function(t) {
			var i;
			return !!(null === (i = t.conditions) || void 0 === i || null === (i = i.actions) || void 0 === i || null === (i = i.values) || void 0 === i ? void 0 : i.length);
		}(t)));
		this.ma(i);
	}
	ma(t) {
		var i;
		null === (i = this._surveyEventReceiver) || void 0 === i || i.replace(t);
	}
	pa() {
		return this.ya() && !this.ta && !this.ba();
	}
	ya() {
		var t;
		const i = null === (t = this.Gl) || void 0 === t ? void 0 : t.kv.get(xn);
		return F(i) && Date.now() - i > 3e5;
	}
	ba() {
		return F(this.ea) && 3e5 > Date.now() - this.ea;
	}
	markSurveyAsSeen(t, i) {
		var e;
		mh({
			id: t,
			current_iteration: null !== (e = null == i ? void 0 : i.iteration) && void 0 !== e ? e : null
		});
		try {
			localStorage.setItem("lastSeenSurveyDate", (/* @__PURE__ */ new Date()).toISOString());
		} catch (t) {}
		this.na();
	}
	fa(t) {
		for (const i of this.Yl) {
			if (this.Ai) return;
			try {
				t.isLoaded ? this.getSurveys(i) : i([], t);
			} catch (t) {
				_h.error("Error in survey callback", t);
			}
		}
	}
	getActiveMatchingSurveys(t, i = !1) {
		if (!M(this._surveyManager)) return this._surveyManager.getActiveMatchingSurveys(t, i);
		_h.warn("init was not called");
	}
	onActiveMatchingSurveysChanged(t) {
		var i;
		if (this.Ai) return () => {};
		const e = {
			callback: t,
			active: !0,
			revision: 0
		};
		this.Xl.push(e), this.va();
		const s = null === (i = this.Gl) || void 0 === i ? void 0 : i.kv.get(Sn);
		return this.Br.disableSurveys || !this._surveyManager && this.Kl && !this.Zl || !s && !M(this.ea) && !this.ta ? this.ra(e, { isLoaded: !1 }) : this._surveyManager && this.ra(e), () => {
			var t;
			e.active = !1, this.Xl = this.Xl.filter((t) => t !== e), 0 === this.Xl.length && (null === (t = this.aa) || void 0 === t || t.call(this), this.aa = void 0);
		};
	}
	va() {
		var t, i, e;
		this._surveyManager && this.Xl.length > 0 && (null !== (t = this.aa) && void 0 !== t || (this.aa = null === (i = (e = this.Jl).onMatchingConditionsChanged) || void 0 === i ? void 0 : i.call(e, this.na)));
	}
	ra(t, i) {
		if (this.Ai || !t.active) return;
		const e = ++t.revision, s = (s) => {
			if (!this.Ai && t.active && e === t.revision) try {
				const e = null != i ? i : { isLoaded: !0 }, n = JSON.stringify([s, e]);
				if (n === t.lastResult) return;
				t.lastResult = n, t.callback(s, e);
			} catch (t) {
				_h.error("Error in active matching surveys callback", t);
			}
		};
		try {
			i && !i.isLoaded ? s([]) : this.getActiveMatchingSurveys(s);
		} catch (t) {
			_h.error("Error in active matching surveys callback", t);
		}
	}
	_a(t) {
		let i = null;
		return this.getSurveys((e) => {
			var s;
			i = null !== (s = e.find((i) => i.id === t)) && void 0 !== s ? s : null;
		}), i;
	}
	wa(t) {
		if (M(this._surveyManager)) return {
			eligible: !1,
			reason: Bc
		};
		const i = "string" == typeof t ? this._a(t) : t;
		return i ? this._surveyManager.checkSurveyEligibility(i) : {
			eligible: !1,
			reason: "Survey not found"
		};
	}
	ka(t) {
		var i;
		if (!(null === (i = this.Gl) || void 0 === i ? void 0 : i.canCapture)) return {
			eligible: !1,
			reason: "PostHog is not capturing, so a survey response cannot be recorded"
		};
		if (M(this._surveyManager)) return {
			eligible: !1,
			reason: Bc
		};
		const e = "string" == typeof t ? this._a(t) : t;
		return e ? this._surveyManager.checkSurveyRenderability(e) : {
			eligible: !1,
			reason: "Survey not found"
		};
	}
	canRenderSurvey(t) {
		if (M(this._surveyManager)) return _h.warn("init was not called"), {
			visible: !1,
			disabledReason: Bc
		};
		const i = this.ka(t);
		return {
			visible: i.eligible,
			disabledReason: i.reason
		};
	}
	canRenderSurveyAsync(t, i) {
		return M(this._surveyManager) ? (_h.warn("init was not called"), Promise.resolve({
			visible: !1,
			disabledReason: Bc
		})) : new Promise((e) => {
			this.getSurveys((i) => {
				var s;
				const n = null !== (s = i.find((i) => i.id === t)) && void 0 !== s ? s : null;
				if (n) {
					const t = this.ka(n);
					e({
						visible: t.eligible,
						disabledReason: t.reason
					});
				} else e({
					visible: !1,
					disabledReason: "Survey not found"
				});
			}, i);
		});
	}
	renderSurvey(t, i, e) {
		var s, n, r;
		if (!(null === (s = this.Gl) || void 0 === s ? void 0 : s.canCapture)) return;
		if (M(this._surveyManager)) return void _h.warn("init was not called");
		const o = "string" == typeof t ? this._a(t) : t;
		if (!(null == o ? void 0 : o.id)) return void _h.warn("Survey not found");
		if (!yh.includes(o.type)) return void _h.warn(`Surveys of type ${o.type} cannot be rendered in the app`);
		const l = null === (n = typeof document > "u" ? void 0 : document) || void 0 === n ? void 0 : n.querySelector(i);
		if (l) {
			if (null === (r = o.appearance) || void 0 === r ? void 0 : r.surveyPopupDelaySeconds) {
				_h.info(`Rendering survey ${o.id} with delay of ${o.appearance.surveyPopupDelaySeconds} seconds`);
				const t = setTimeout(() => {
					var i, s, n;
					this.ia.delete(t), !this.Ai && null !== (i = this.Gl) && void 0 !== i && i.canCapture && (_h.info(`Rendering survey ${o.id} with delay of ${null === (s = o.appearance) || void 0 === s ? void 0 : s.surveyPopupDelaySeconds} seconds`), null === (n = this._surveyManager) || void 0 === n || n.renderSurvey(o, l, e), _h.info(`Survey ${o.id} rendered`));
				}, 1e3 * o.appearance.surveyPopupDelaySeconds);
				this.ia.add(t);
				return;
			}
			this._surveyManager.renderSurvey(o, l, e);
		} else _h.warn("Survey element not found");
	}
	displaySurvey(t, i) {
		var e, s;
		if (!(null === (e = this.Gl) || void 0 === e ? void 0 : e.canCapture)) return;
		if (M(this._surveyManager)) return void _h.warn("init was not called");
		const n = this._a(t);
		if (!n) return void _h.warn("Survey not found");
		let r = n;
		if (null !== (s = n.appearance) && void 0 !== s && s.surveyPopupDelaySeconds && i.ignoreDelay && (r = bi(bi({}, n), {}, { appearance: bi(bi({}, n.appearance), {}, { surveyPopupDelaySeconds: 0 }) })), i.displayType !== Fa.Popover && i.initialResponses && _h.warn("initialResponses is only supported for popover surveys. prefill will not be applied."), !1 === i.ignoreConditions) {
			const t = this.wa(n);
			if (!t.eligible) return void _h.warn("Survey is not eligible to be displayed: ", t.reason);
		}
		i.displayType !== Fa.Inline ? this._surveyManager.handlePopoverSurvey(r, i) : this.renderSurvey(r, i.selector, i.properties);
	}
	cancelPendingSurvey(t) {
		M(this._surveyManager) ? _h.warn("init was not called") : this._surveyManager.cancelSurvey(t);
	}
	handlePageUnload() {
		var t, i;
		null === (t = this._surveyManager) || void 0 === t || null === (i = t.handlePageUnload) || void 0 === i || i.call(t);
	}
};
var Hc = class {
	constructor(t) {
		this._instance = t;
	}
	get() {
		var t, i, e, s;
		const n = null === (t = this._instance) || void 0 === t ? void 0 : t.config;
		return {
			disableSurveys: !!(null == n ? void 0 : n.disable_surveys),
			cookielessMode: !!(null == n ? void 0 : n.cookieless_mode),
			advancedEnableSurveys: !!(null == n ? void 0 : n.advanced_enable_surveys),
			requestTimeoutMs: null !== (i = null == n ? void 0 : n.surveys_request_timeout_ms) && void 0 !== i ? i : 1e4,
			prefillFromUrl: !!(null == n || null === (e = n.surveys) || void 0 === e ? void 0 : e.prefillFromUrl),
			automaticDisplay: !(null == n ? void 0 : n.disable_surveys_automatic_display),
			featureFlagEvaluation: !(null == n ? void 0 : n.advanced_disable_feature_flags),
			overrideLanguage: null == n ? void 0 : n.override_display_language,
			prepareStylesheet: null == n ? void 0 : n.prepare_external_dependency_stylesheet,
			get_current_url: null == n ? void 0 : n.get_current_url,
			uiHost: null === (s = this._instance) || void 0 === s || null === (s = s.requestRouter) || void 0 === s ? void 0 : s.endpointFor("ui", "")
		};
	}
	getExtensions() {
		const t = null == c ? void 0 : c.__PosthogExtensions__;
		if (!t || !this._instance) return;
		const i = this._instance, { generateSurveys: e } = t, s = Ys(i);
		return {
			generateSurveys: e ? (t) => e(i, t) : void 0,
			loadExternalDependency: s ? (t) => s(i, "surveys", t) : void 0
		};
	}
	onMatchingConditionsChanged(i) {
		var e, s;
		const n = null === (e = this._instance) || void 0 === e ? void 0 : e._addCaptureHook((t) => {
			"$pageview" !== t && t !== Ia.SHOWN && t !== Ia.DISMISSED && t !== Ia.SENT || i();
		}), r = () => i();
		io(t, "PHSurveyShown", r);
		let o = !1;
		const l = null === (s = this._instance) || void 0 === s ? void 0 : s.onFeatureFlags(() => {
			o && i();
		});
		return o = !0, () => {
			o = !1, n?.(), l?.(), t?.removeEventListener("PHSurveyShown", r);
		};
	}
};
var qc = (() => (null == t ? void 0 : t.location) ? Gl(t.location.hash, "__posthog") || Gl(location.hash, "state") : null)();
var Wc = "_postHogToolbarParams";
var Vc = Vs("[Toolbar]");
var Gc = Vs("[FeatureFlags]");
var Kc = Vs("[FeatureFlags]", { debugEnabled: !0 });
var Jc = "\" failed. Feature flags didn't load in time.";
var Yc = [502, 504];
var Zc = [
	"click",
	"keydown",
	"wheel",
	"touchstart",
	"pointerdown"
];
var Xc = "connection_error";
var Qc = (t, i) => {
	const e = Object.keys(i || {}).filter((t) => {
		var e;
		return null == i || null === (e = i[t]) || void 0 === e ? void 0 : e.failed;
	});
	if (!e.length) return t || {};
	const s = bi({}, t);
	return e.forEach((t) => delete s[t]), s;
};
var td = (t, i) => {
	const e = bi({}, t);
	return i.forEach((t) => {
		var i;
		null !== (i = e[t]) && void 0 !== i && i.failed && delete e[t];
	}), e;
};
var id = (t, i) => !!(null == i ? void 0 : i.partialResponse) || !!t.errorsWhileComputingFlags;
var ed = (t) => {
	const i = {};
	for (let e = 0; t.length > e; e++) i[t[e]] = !0;
	return i;
};
var sd = (t) => {
	const i = {};
	for (const [e, s] of Jr(t || {})) s && (i[e] = s);
	return i;
};
var nd = (t, i) => t.distinctId === i.distinctId && t.sessionId === i.sessionId && ((t, i) => {
	const e = Object.keys(t);
	return e.length === Object.keys(i).length && e.every((e) => t[e] === i[e]);
})(t.groups, i.groups);
var rd = class {
	constructor(t) {
		this.name = "featureFlags", this.Yd = !1, this.featureFlagEventHandlers = [], this.R = Gc, this.Xd = {}, this.tv = {}, this.ev = [], this.iv = /* @__PURE__ */ new Set(), this.nv = /* @__PURE__ */ new Set(), this.sv = !1, this.rv = !1, this.ov = 0, this.lv = !1, this.av = !1, this.uv = !1, this.hv = /* @__PURE__ */ new Map(), this.dv = !1, this.vv = !1, this.fv = !1, this.pv = 0, this.gv = !1, this.ln = () => {
			const t = this.mv();
			this.pv = 0, t && this.reloadFeatureFlags();
		}, this.yv = () => {
			var t, i;
			const e = this.bv, s = null !== (t = this._v) && void 0 !== t ? t : e;
			C(e) || C(s) || this.Br.remoteRequestsDisabled || !this.wv || "hidden" === this.wv.visibilityState || Date.now() - (null !== (i = this.Sv) && void 0 !== i ? i : 0) < s || (this._v = this.gv || !this.Br.idleRefreshBackoff ? e : Math.min(2 * s, 36e5), this.gv = !1, this.reloadFeatureFlags(), this.xv());
		}, this.$v = () => {
			this.gv && this._v === this.bv || this.Cv();
		}, this.un = () => {
			var t;
			"visible" === (null === (t = this.wv) || void 0 === t ? void 0 : t.visibilityState) && this.Cv();
		}, this.Jl = t;
	}
	get Tv() {}
	Mv() {
		this.Gl && this.Iv();
	}
	setup(t) {
		try {
			this.Ev = typeof window > "u" ? void 0 : window, this.wv = typeof document > "u" ? void 0 : document;
		} catch (t) {
			this.Ev = void 0, this.wv = void 0;
		}
		return this.oa = t, this.R = t.logger.createLogger("[FeatureFlags]"), Nc(t.kv.initialize(), () => {
			this.oa === t && (this.oa = void 0, this.Gl = t, this.Av(t));
		});
	}
	Av(t) {
		var i;
		if (this.Gl === t) return this.Ev && io(this.Ev, "online", this.ln), this.Iv(), this.Rv = t.registerDynamicEventProperties(() => this.Pv() ? this.Xd : this.tv), this.Ov = null === (i = this.Tv) || void 0 === i ? void 0 : i.onCrossTabFeatureFlagChange(() => {
			this.Fv(), this.Lv(), this.Dv();
		}), this.Lv(), this.initialize();
	}
	Cv() {
		this.gv = !0, this._v = this.bv, this.yv();
	}
	Iv() {
		var t;
		const i = this.Br.refreshIntervalMs, e = !this.Br.remoteRequestsDisabled && this.wv && !C(i) && i > 0 ? i : void 0;
		this.Br.idleRefreshBackoff || (this._v = e), e !== this.bv && (this.Nv(), C(e) || (this.bv = e, this._v = e, this.xv(), null !== (t = this.wv) && void 0 !== t && t.addEventListener && (io(this.wv, wn, this.un), Vr(Zc, (t) => {
			io(this.wv, t, this.$v, { capture: !0 });
		}))));
	}
	xv() {
		C(this.bv) || (C(this.jv) || clearInterval(this.jv), this.Sv = Date.now(), this.jv = setInterval(this.yv, this.bv));
	}
	Nv() {
		var t, i;
		C(this.jv) || (clearInterval(this.jv), this.jv = void 0, null === (t = this.wv) || void 0 === t || null === (i = t.removeEventListener) || void 0 === i || i.call(t, "visibilitychange", this.un), Vr(Zc, (t) => {
			var i, e;
			null === (i = this.wv) || void 0 === i || null === (e = i.removeEventListener) || void 0 === e || e.call(i, t, this.$v, { capture: !0 });
		})), this.bv = void 0, this._v = void 0, this.gv = !1, this.Sv = void 0;
	}
	destroy() {
		this.qv();
	}
	dispose() {
		this.qv();
	}
	qv() {
		var t, i, e;
		this.Nv(), this.ov++, this.av = !1, this.oa = void 0, this.Bv(this.iv, "cancelled"), this.Bv(this.nv, "cancelled"), this.Gl && (this.zv(), null === (t = this.Rv) || void 0 === t || t.dispose(), this.Rv = void 0, null === (i = this.Ov) || void 0 === i || i.call(this), this.Ov = void 0, this.ev = [], null === (e = this.Ev) || void 0 === e || e.removeEventListener("online", this.ln), this.Gl = void 0);
	}
	get Br() {
		return this.Jl.get();
	}
	Hv(t) {
		var i;
		return this.Uv && t in this.Uv ? this.Uv[t] : null === (i = this.Gl) || void 0 === i ? void 0 : i.kv.get(t);
	}
	Fv() {
		return !!this.Uv && (this.Uv = void 0, !0);
	}
	Wv() {
		var t;
		return !C(null === (t = this.Gl) || void 0 === t ? void 0 : t.kv.get("$enabled_feature_flags")) && this.Fv();
	}
	$t(t) {
		this.Gv(() => {
			var i;
			return null === (i = this.Gl) || void 0 === i ? void 0 : i.kv.set(t);
		});
	}
	Vv(t, i, e) {
		if (!this.Tv || !t.$enabled_feature_flags) return;
		const s = this.Hv("$enabled_feature_flags") || {}, n = t.$enabled_feature_flags || {}, r = i.flags || i.featureFlags, o = i.flags ? Object.entries(i.flags).filter(([, t]) => !(null == t ? void 0 : t.failed)).map(([t]) => t) : [], l = !!i.errorsWhileComputingFlags && !!i.flags, a = l || e && i.flags ? o : e && !k(r) ? Object.keys(r || {}) : Array.from(/* @__PURE__ */ new Set([...Object.keys(s), ...Object.keys(n)])), u = this.Hv("$feature_flag_payloads") || {}, h = t.$feature_flag_payloads || {}, c = l || e ? a : Array.from(/* @__PURE__ */ new Set([...Object.keys(u), ...Object.keys(h)])), d = !l && !e, v = !!d || a, f = !!d || c, p = {
			[ln]: v,
			[vn]: v,
			[mn]: f
		};
		t.$feature_flag_details && (p[an] = v);
		for (const i of [
			cn,
			hn,
			dn
		]) C(t[i]) || (p[i] = !0);
		this.Tv.markCrossTabFeatureFlagChanges(p);
	}
	Dt(t) {
		this.Gv(() => {
			var i;
			return null === (i = this.Gl) || void 0 === i ? void 0 : i.kv.remove(t);
		});
	}
	Gv(t) {
		try {
			t();
		} catch (t) {
			this.R.error("Failed to update feature flag persistence", t);
		}
	}
	Lv() {
		const t = {}, i = this.Hv(an);
		for (const i of [cn, yn]) {
			const e = this.Hv(i);
			C(e) || (t[i] = e);
		}
		const e = this.Hv(ln);
		e && (t[ln] = e.filter((t) => {
			var e;
			return !(null == i || null === (e = i[t]) || void 0 === e ? void 0 : e.failed);
		}));
		const s = this.Hv(mn);
		s && (t[mn] = Qc(s, i)), this.Xd = t;
		const n = bi({}, t), r = Qc(this.Hv(vn), i);
		if (r) for (const [t, i] of Object.entries(r)) n[`$feature/${t}`] = i;
		this.tv = n;
	}
	Pv() {
		const t = this.Br.cacheTtlMs;
		if (!t || 0 >= t) return !1;
		const i = this.Hv(hn);
		return "number" != typeof i || Date.now() - i > t;
	}
	Qv() {
		return !!this.Pv() && (this.fv || this.rv || (this.fv = !0, this.R.warn("Feature flag cache is stale, triggering refresh..."), this.reloadFeatureFlags()), !0);
	}
	Jv() {
		const t = this.Br.evaluationContexts;
		return (null == t ? void 0 : t.length) ? t.filter((t) => {
			const i = t && "string" == typeof t && t.trim().length > 0;
			return i || this.R.error("Invalid evaluation context found:", t, "Expected non-empty string"), i;
		}) : [];
	}
	Zv() {
		const t = this.Br.flagKeys;
		if (!C(t)) return t.filter((t) => {
			const i = t && "string" == typeof t && t.trim().length > 0;
			return i || this.R.error("Invalid flag key found:", t, "Expected non-empty string"), i;
		});
	}
	initialize() {
		var t, i;
		const e = this.Br, s = null !== (t = null === (i = e.bootstrap) || void 0 === i ? void 0 : i.featureFlags) && void 0 !== t ? t : {};
		if (Object.keys(s).length) {
			var n, r;
			const t = null !== (n = null === (r = e.bootstrap) || void 0 === r ? void 0 : r.featureFlagPayloads) && void 0 !== n ? n : {}, i = Object.keys(s).filter((t) => !C(s[t])).reduce((t, i) => (t[i] = s[i], t), {}), o = Object.keys(t).filter((t) => i[t]).reduce((i, e) => (i[e] = t[e], i), {});
			return this.Kv({
				featureFlags: i,
				featureFlagPayloads: o
			}, void 0, { persist: !1 });
		}
	}
	updateFlags(t, i, e) {
		const s = (null == e ? void 0 : e.merge) ? Qc(this.Hv(vn), this.Hv(an)) : {}, n = (null == e ? void 0 : e.merge) ? Qc(this.Hv(mn), this.Hv(an)) : {}, r = bi(bi({}, s), t), o = bi(bi({}, n), i), l = {};
		for (const [t, i] of Object.entries(r)) l[t] = {
			key: t,
			enabled: ve(i),
			variant: fe(i),
			reason: void 0,
			metadata: C(null == o ? void 0 : o[t]) ? void 0 : {
				id: 0,
				version: void 0,
				description: void 0,
				payload: o[t]
			}
		};
		this.Kv({ flags: l });
	}
	get hasLoadedFlags() {
		return this.sv;
	}
	getFlags() {
		return Object.keys(this.getFlagVariants());
	}
	getFlagsWithDetails() {
		const t = this.Hv(an), i = this.Hv(yn), e = this.Hv(bn);
		if (!e && !i) return t || {};
		const s = Kr({}, t || {}), n = [.../* @__PURE__ */ new Set([...Object.keys(e || {}), ...Object.keys(i || {})])];
		for (const t of n) {
			var r, o;
			const n = s[t], l = null == i ? void 0 : i[t], a = C(l) ? null !== (r = null == n ? void 0 : n.enabled) && void 0 !== r && r : !!l, u = C(l) ? null == n ? void 0 : n.variant : "string" == typeof l ? l : void 0, h = null == e ? void 0 : e[t], c = bi(bi({}, n), {}, {
				enabled: a,
				variant: a ? null != u ? u : null == n ? void 0 : n.variant : void 0
			});
			a !== (null == n ? void 0 : n.enabled) && (c.original_enabled = null == n ? void 0 : n.enabled), u !== (null == n ? void 0 : n.variant) && (c.original_variant = null == n ? void 0 : n.variant), h && (c.metadata = bi(bi({}, null == n ? void 0 : n.metadata), {}, {
				payload: h,
				original_payload: null == n || null === (o = n.metadata) || void 0 === o ? void 0 : o.payload
			})), s[t] = c;
		}
		return this.Yd || (this.R.warn(" Overriding feature flag details!", {
			flagDetails: t,
			overriddenPayloads: e,
			finalDetails: s
		}), this.Yd = !0), s;
	}
	getAllFeatureFlags() {
		const t = this.getFlagVariants(), i = this.getFlagPayloads();
		return Object.keys(t).map((e) => {
			const s = t[e];
			return {
				key: e,
				enabled: ve(s),
				variant: fe(s),
				payload: de(i[e])
			};
		});
	}
	getFlagVariants() {
		const t = Qc(this.Hv(vn), this.Hv(an)), i = this.Hv(yn);
		if (!i) return t || {};
		const e = Kr({}, t || {}), s = Object.keys(i);
		for (let t = 0; s.length > t; t++) e[s[t]] = i[s[t]];
		return this.Yd || (this.R.warn(" Overriding feature flags!", {
			enabledFlags: t,
			overriddenFlags: i,
			finalFlags: e
		}), this.Yd = !0), e;
	}
	getFlagPayloads() {
		const t = Qc(this.Hv(mn), this.Hv(an)), i = this.Hv(bn);
		if (!i) return t || {};
		const e = Kr({}, t || {}), s = Object.keys(i);
		for (let t = 0; s.length > t; t++) e[s[t]] = i[s[t]];
		return this.Yd || (this.R.warn(" Overriding feature flag payloads!", {
			flagPayloads: t,
			overriddenPayloads: i,
			finalPayloads: e
		}), this.Yd = !0), e;
	}
	reloadFeatureFlags() {
		this.lv || this.Br.featureFlagsDisabled || this.mv() || (this.uv && this.R.warn("reloadFeatureFlags() was called inside an onFeatureFlags callback. This callback also runs when flags change in other tabs, so this can cause a request loop."), this.rv && (this.av = !0), this.Yv || (this.ev.slice().forEach((t) => {
			try {
				t();
			} catch (t) {
				this.R.error("Error while running feature flags reloading callback", t);
			}
		}), this.Yv = setTimeout(() => {
			this.Xv();
		}, 5)));
	}
	reloadFeatureFlagsAsync() {
		return !this.Gl || this.lv || this.Br.featureFlagsDisabled || this.Br.remoteRequestsDisabled || this.mv() ? Promise.resolve({ status: "skipped" }) : new Promise((t) => {
			this.iv.add(t), this.reloadFeatureFlags();
		});
	}
	Bv(t, i) {
		t.forEach((t) => t({ status: i })), t.clear();
	}
	zv() {
		clearTimeout(this.Yv), this.Yv = void 0;
	}
	onReloading(t) {
		return this.ev.push(t), () => {
			this.ev = this.ev.filter((i) => i !== t);
		};
	}
	ensureFlagsLoaded() {
		this.sv || this.rv || this.Yv || this.reloadFeatureFlags();
	}
	setAnonymousDistinctId(t) {
		this.$anon_distinct_id = t;
	}
	setReloadingPaused(t) {
		this.lv = t;
	}
	resetFlagCallReported() {
		this.Dt(gn), this.hv = /* @__PURE__ */ new Map();
	}
	sendFlagCallsPendingCapture() {
		var t;
		if (0 !== this.hv.size && !this.dv && (null === (t = this.Gl) || void 0 === t ? void 0 : t.canCapture) && !this.Gl.isRateLimited) {
			this.dv = !0;
			try {
				const t = this.getFlagVariants();
				for (const i of Array.from(this.hv.keys())) {
					const e = this.hv.get(i);
					if (e) {
						if (e.value !== String(t[i]) || !nd(e.context, this.tf())) {
							this.hv.delete(i);
							continue;
						}
						if (this.getFeatureFlagResult(i), this.hv.has(i)) break;
					}
				}
			} finally {
				this.dv = !1;
			}
		}
	}
	Xv(t) {
		var i;
		this.zv();
		const e = this.Gl;
		if (!e || this.Br.remoteRequestsDisabled || this.mv()) return void this.Bv(this.iv, "skipped");
		if (this.rv) return void (this.av = !0);
		const s = {
			token: e.projectToken,
			distinct_id: e.distinctId,
			groups: e.groups,
			$anon_distinct_id: this.$anon_distinct_id,
			person_properties: bi(bi(bi({}, e.initialPersonProperties), this.Hv("$stored_person_properties") || {}), {}, {
				$lib: e.library.name,
				$lib_version: e.library.version
			}),
			group_properties: this.Hv(fn),
			timezone: Nl()
		};
		C(e.deviceId) || (s.$device_id = e.deviceId), (null != t && t.disableFlags || this.Br.featureFlagsDisabled) && (s.disable_flags = !0);
		const n = this.Jv();
		n.length && (s.evaluation_contexts = n);
		const r = this.Zv();
		C(r) || (s.flag_keys = r);
		const o = this.Br.onlyEvaluateSurveyFeatureFlags, l = "/flags/?v=2" + (o ? "&only_evaluate_survey_feature_flags=true" : ""), a = this.ov, u = this.iv;
		this.iv = /* @__PURE__ */ new Set(), this.nv = u, this.rv = !0;
		const h = () => {
			this.av && (this.av = !1, this.Xv());
		}, c = (t) => {
			var i, e;
			const n = null !== (i = t.json) && void 0 !== i ? i : {}, r = 200 !== t.statusCode;
			if (this.rv = !1, a !== this.ov) return void h();
			if (this.ef(t.statusCode), r || this.av || (this.$anon_distinct_id = void 0), s.disable_flags && !this.av) return void this.Bv(u, "skipped");
			this.vv = !r;
			const l = [];
			t.error ? l.push(t.error instanceof Error && "AbortError" === t.error.name ? "timeout" : t.error instanceof Error ? Xc : "unknown_error") : 200 !== t.statusCode && l.push(`api_error_${t.statusCode}`), n.errorsWhileComputingFlags && l.push("errors_while_computing_flags");
			const c = !!(null === (e = n.quotaLimited) || void 0 === e ? void 0 : e.includes("feature_flags"));
			c && l.push("quota_limited"), this.$t({ [un]: l }), c ? this.R.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.") : s.disable_flags || this.Kv(n, r, { partialResponse: o }), this.Bv(u, s.disable_flags ? "skipped" : l.length || !n.flags && !n.featureFlags ? "error" : "loaded"), h();
		}, d = (t) => {
			this.rv = !1, a === this.ov ? (this.$t({ [un]: [Xc] }), this.R.error("Feature flag request failed", t), this.Wv() && this.Dv(!0), this.Bv(u, "error"), h()) : h();
		};
		let v = null !== (i = this.Br.requestMaxRetries) && void 0 !== i ? i : 1;
		const f = () => v > 0 && a === this.ov, p = () => {
			if (a !== this.ov || !this.Gl || this.Br.remoteRequestsDisabled) return this.rv = !1, this.Bv(u, "skipped"), void h();
			try {
				e.sendRequest(l, {
					target: "flags",
					method: "POST",
					body: s,
					compression: this.Br.compression,
					sentAt: "body",
					timeoutMs: this.Br.requestTimeoutMs
				}).then((t) => {
					if (((t) => Yc.includes(t.statusCode) || ((t) => 0 === t.statusCode && t.error instanceof Error && "AbortError" === t.error.name)(t))(t) && f()) return v--, void setTimeout(p, 500);
					c(t);
				}).catch(d);
			} catch (t) {
				d(t);
			}
		};
		p();
	}
	mv() {
		return zl(this.pv, 3);
	}
	ef(t) {
		this.pv = Hl(t, this.pv, 3, () => this.R.warn("Feature flag requests are failing before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped refreshing feature flags; will try again when connectivity changes."));
	}
	if(t) {
		var i;
		return !this.sv && !this.getFlags().length && !(null === (i = this.getFeatureFlagDetails(t)) || void 0 === i ? void 0 : i.failed);
	}
	getFeatureFlag(t, i = {}) {
		var e;
		if (i.fresh && !this.vv) return;
		if (this.if(t)) return void this.R.warn("getFeatureFlag for key \"" + t + Jc);
		if (this.Qv()) return;
		const s = this.getFeatureFlagResult(t, i);
		return null !== (e = null == s ? void 0 : s.variant) && void 0 !== e ? e : null == s ? void 0 : s.enabled;
	}
	getFeatureFlagDetails(t) {
		return this.getFlagsWithDetails()[t];
	}
	getFeatureFlagPayload(t) {
		const i = this.getFeatureFlagResult(t, { send_event: !1 });
		return null == i ? void 0 : i.payload;
	}
	getFeatureFlagResult(t, i = {}) {
		var e;
		if (i.fresh && !this.vv) return;
		if (this.if(t)) return void this.R.warn("getFeatureFlagResult for key \"" + t + Jc);
		if (this.Qv()) return;
		const s = null === (e = this.Hv("$feature_flag_details")) || void 0 === e || null === (e = e[t]) || void 0 === e ? void 0 : e.failed, n = s ? void 0 : this.Hv(vn), r = s ? void 0 : this.Hv(mn), o = this.Hv(yn), l = !!o && {}.hasOwnProperty.call(o, t), a = l || !!n && t in n, u = l ? o[t] : null == n ? void 0 : n[t], h = this.Hv(bn), c = h && {}.hasOwnProperty.call(h, t) ? h[t] : null == r ? void 0 : r[t], d = String(u), v = this.Hv("$feature_flag_request_id") || void 0, f = this.Hv("$feature_flag_evaluated_at") || void 0;
		let p, g = this.Hv("$flag_call_reported") || {};
		if (this.Br.deduplicateCallsPerSession) {
			var _;
			const t = null === (_ = this.Gl) || void 0 === _ || null === (_ = _.session) || void 0 === _ ? void 0 : _.sessionId, i = this.Hv(_n);
			t && t !== i && (g = {}, p = t);
		}
		if (!i.send_event && "send_event" in i) p && this.$t({
			[gn]: g,
			[_n]: p
		});
		else {
			var m, y, b;
			const i = !(null === (m = this.Gl) || void 0 === m ? void 0 : m.canCapture), e = !i && !(null === (y = this.Gl) || void 0 === y ? void 0 : y.isRateLimited);
			var w;
			if (e ? this.hv.delete(t) : (i && Object.keys(g).length > 0 && (g = {}, this.$t({ [gn]: g })), null !== (w = g[t]) && void 0 !== w && w.includes(d) || this.nf(t, d)), e && !(null === (b = g[t]) || void 0 === b ? void 0 : b.includes(d))) {
				var S, x, E, T, P, O, R, A, I, M, F, D, j;
				k(g[t]) ? g[t].push(d) : g[t] = [d], this.$t(bi({ [gn]: g }, p ? { [_n]: p } : {}));
				const i = this.getFeatureFlagDetails(t), e = [...null !== (S = this.Hv("$feature_flag_errors")) && void 0 !== S ? S : []];
				C(u) && e.push((null == i ? void 0 : i.failed) ? "evaluation_failed" : "flag_missing");
				const s = {
					$feature_flag: t,
					$feature_flag_response: u,
					$feature_flag_payload: null != c ? c : null,
					$feature_flag_request_id: v,
					$feature_flag_evaluated_at: f,
					$feature_flag_bootstrapped_response: null !== (x = null === (E = this.Br.bootstrap) || void 0 === E || null === (E = E.featureFlags) || void 0 === E ? void 0 : E[t]) && void 0 !== x ? x : null,
					$feature_flag_bootstrapped_payload: null !== (T = null === (P = this.Br.bootstrap) || void 0 === P || null === (P = P.featureFlagPayloads) || void 0 === P ? void 0 : P[t]) && void 0 !== T ? T : null,
					$used_bootstrap_value: !this.vv
				};
				C(null == i || null === (O = i.metadata) || void 0 === O ? void 0 : O.has_experiment) || (s.$feature_flag_has_experiment = i.metadata.has_experiment), C(null == i || null === (R = i.metadata) || void 0 === R ? void 0 : R.version) || (s.$feature_flag_version = i.metadata.version);
				const n = null !== (A = null == i || null === (I = i.reason) || void 0 === I ? void 0 : I.description) && void 0 !== A ? A : null == i || null === (M = i.reason) || void 0 === M ? void 0 : M.code;
				n && (s.$feature_flag_reason = n), null != i && null !== (F = i.metadata) && void 0 !== F && F.id && (s.$feature_flag_id = i.metadata.id), C(null == i ? void 0 : i.original_variant) && C(null == i ? void 0 : i.original_enabled) || (s.$feature_flag_original_response = C(i.original_variant) ? i.original_enabled : i.original_variant), null != i && null !== (D = i.metadata) && void 0 !== D && D.original_payload && (s.$feature_flag_original_payload = null == i || null === (j = i.metadata) || void 0 === j ? void 0 : j.original_payload), e.length && (s.$feature_flag_error = e.join(",")), this.sf(s) || (this.rf(t, d), this.nf(t, d));
			} else p && this.$t({
				[gn]: g,
				[_n]: p
			});
		}
		return a ? {
			key: t,
			enabled: !!u,
			variant: "string" == typeof u ? u : void 0,
			payload: de(c)
		} : void 0;
	}
	sf(t) {
		try {
			var i;
			return !1 !== (null === (i = this.Gl) || void 0 === i ? void 0 : i.capture("$feature_flag_called", t));
		} catch (t) {
			return this.R.error("Failed to capture feature flag call", t), !0;
		}
	}
	nf(t, i) {
		this.hv.set(t, {
			value: i,
			context: this.tf()
		});
	}
	tf() {
		var t, i, e;
		return {
			distinctId: null === (t = this.Gl) || void 0 === t ? void 0 : t.distinctId,
			groups: bi({}, null === (i = this.Gl) || void 0 === i ? void 0 : i.groups),
			sessionId: this.Br.deduplicateCallsPerSession ? null === (e = this.Gl) || void 0 === e || null === (e = e.session) || void 0 === e ? void 0 : e.sessionId : void 0
		};
	}
	rf(t, i) {
		const e = this.Hv("$flag_call_reported") || {}, s = e[t];
		k(s) && s.includes(i) && (e[t] = s.filter((t) => t !== i), this.$t({ [gn]: e }));
	}
	getRemoteConfigPayload(t, i) {
		this.lf(t, i);
	}
	lf(t, i) {
		var e = this;
		return J(function* () {
			const s = e.Gl;
			if (!s) return;
			const n = {
				distinct_id: s.distinctId,
				token: s.projectToken,
				person_properties: {
					$lib: s.library.name,
					$lib_version: s.library.version
				}
			}, r = e.Jv();
			r.length && (n.evaluation_contexts = r);
			const o = e.Zv();
			let l;
			C(o) || (n.flag_keys = o);
			try {
				var a;
				const i = null === (a = (yield s.sendRequest("/flags/?v=2", {
					target: "flags",
					method: "POST",
					body: n,
					compression: e.Br.compression,
					sentAt: "body",
					timeoutMs: e.Br.requestTimeoutMs
				})).json) || void 0 === a ? void 0 : a.featureFlagPayloads;
				l = (null == i ? void 0 : i[t]) || void 0;
			} catch (t) {
				e.R.error("Remote config feature flag request failed", t);
				return;
			}
			try {
				i(l);
			} catch (t) {
				e.R.error("Remote config feature flag callback failed", t);
			}
		})();
	}
	isFeatureEnabled(t, i = {}) {
		if (i.fresh && !this.vv) return i.defaultValue;
		if (this.if(t)) return this.R.warn("isFeatureEnabled for key \"" + t + Jc), i.defaultValue;
		const e = this.getFeatureFlag(t, i);
		return C(e) ? i.defaultValue : !!e;
	}
	addFeatureFlagsHandler(t) {
		this.featureFlagEventHandlers.push(t);
	}
	removeFeatureFlagsHandler(t) {
		this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((i) => i !== t);
	}
	receivedFeatureFlags(t, i, e) {
		this.Kv(t, i, e);
	}
	Kv(t, i, e) {
		if (!this.Gl) return;
		var s, n;
		this.sv = !0, !1 !== (null == e ? void 0 : e.persist) && id(t, e) && null !== (s = this.Tv) && void 0 !== s && null !== (n = s.reconcileFeatureFlagsBeforeMerge) && void 0 !== n && n.call(s) && this.Fv();
		const r = this.getFlagVariants(), o = !t.flags && k(t.featureFlags), l = ((t, i = {}, e = {}, s = {}, n, r = Gc) => {
			const o = ((t, i) => {
				const e = t.flags;
				if (e) {
					const i = Object.fromEntries(Object.keys(e).filter((t) => !e[t].failed).map((t) => {
						var i;
						return [t, null !== (i = e[t].variant) && void 0 !== i ? i : e[t].enabled];
					})), s = Object.fromEntries(Object.keys(e).filter((t) => !e[t].failed && e[t].enabled).filter((t) => {
						var i;
						return !C(null === (i = e[t].metadata) || void 0 === i ? void 0 : i.payload);
					}).map((t) => {
						var i;
						return [t, null === (i = e[t].metadata) || void 0 === i ? void 0 : i.payload];
					}));
					return bi(bi({}, t), {}, {
						featureFlags: i,
						featureFlagPayloads: s
					});
				}
				return t.featureFlags && i.warn("Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"), t;
			})(t, r), l = o.flags, a = o.featureFlags, u = o.featureFlagPayloads;
			if (!a) return;
			const h = t.requestId, c = t.evaluatedAt;
			if (k(a)) {
				r.warn("v1 of the feature flags endpoint is deprecated. Please use the latest version.");
				const t = {};
				if (a) for (let i = 0; a.length > i; i++) t[a[i]] = !0;
				return {
					[ln]: a,
					[vn]: t,
					[an]: td(s, a),
					[mn]: Qc(e, s),
					[dn]: !1
				};
			}
			let d = a, v = u, f = l;
			if (id(t, n)) {
				const t = (t) => ({}).hasOwnProperty.call(i, t) && !C(i[t]), r = Object.keys(d), o = v || {};
				d = bi(bi({}, i), d), v = bi(bi({}, e), o), (null != n && n.partialResponse || l) && r.forEach((t) => {
					t in o || null == v || delete v[t];
				}), f = l ? bi(bi({}, s), Object.fromEntries(Object.entries(l).filter(([i, e]) => !e.failed || !t(i)))) : td(s, r);
			}
			return bi(bi({
				[ln]: Object.keys(sd(d)),
				[vn]: d || {},
				[mn]: v || {},
				[an]: f || {},
				[dn]: !0 === t.minimalFlagCalledEvents
			}, h ? { [cn]: h } : {}), c ? { [hn]: c } : {});
		})(t, r, o ? this.Hv("$feature_flag_payloads") || {} : this.getFlagPayloads(), o ? this.Hv("$feature_flag_details") || {} : this.getFlagsWithDetails(), e, this.R);
		if (l) if (!1 === (null == e ? void 0 : e.persist)) {
			const t = !C(this.Gl.kv.get(vn));
			this.Uv = l, t || this.$t(l);
		} else this.Fv(), this.Vv(l, t, !!(null == e ? void 0 : e.partialResponse)), this.$t(l);
		else i && this.Wv();
		i || (this.fv = !1), this.Dv(i);
	}
	override(t, i = !1) {
		this.R.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({
			flags: t,
			suppressWarning: i
		});
	}
	overrideFeatureFlags(t) {
		this.af(t);
	}
	af(t) {
		if (this.Gl) {
			if (!1 === t) return this.Dt([yn, bn]), this.Dv(), void Kc.info("All overrides cleared");
			if (k(t)) return this.$t({ [yn]: ed(t) }), this.Dv(), void Kc.info("Flag overrides set", { flags: t });
			if (t && "object" == typeof t && ("flags" in t || "payloads" in t)) {
				var i;
				const e = t;
				this.Yd = Boolean(null !== (i = e.suppressWarning) && void 0 !== i && i);
				const s = {}, n = e.flags, r = e.payloads;
				n && (s[yn] = k(n) ? ed(n) : n), r && (s[bn] = r), Object.keys(s).length && this.$t(s), !1 === n && !1 === r ? this.Dt([yn, bn]) : !1 === n ? this.Dt(yn) : !1 === r && this.Dt(bn), this.Dv(), !1 === n ? Kc.info("Flag overrides cleared") : n && Kc.info("Flag overrides set", { flags: n }), !1 === r ? Kc.info("Payload overrides cleared") : r && Kc.info("Payload overrides set", { payloads: r });
				return;
			}
			if (t && "object" == typeof t) return this.$t({ [yn]: t }), this.Dv(), void Kc.info("Flag overrides set", { flags: t });
			this.R.warn("Invalid overrideOptions provided to overrideFeatureFlags", { overrideOptions: t });
		} else this.R.warn("posthog.featureFlags.overrideFeatureFlags called before feature flags were ready");
	}
	onFeatureFlags(t) {
		if (this.addFeatureFlagsHandler(t), this.sv) {
			const { flags: i, flagVariants: e } = this.uf();
			try {
				t(i, e);
			} catch (t) {
				this.R.error("Error while running feature flags callback", t);
			}
		}
		return () => this.removeFeatureFlagsHandler(t);
	}
	updateEarlyAccessFeatureEnrollment(t, i, e) {
		var s, n;
		const r = (this.Hv("$early_access_features") || []).find((i) => i.flagKey === t), o = { [`$feature_enrollment/${t}`]: i }, l = {
			$feature_flag: t,
			$feature_enrollment: i,
			$set: o
		};
		r && (l.$early_access_feature_name = r.name), e && (l.$feature_enrollment_stage = e);
		const a = bi(bi({}, this.getFlagVariants()), {}, { [t]: i }), u = bi({}, this.Hv(an)), h = null === (s = u[t]) || void 0 === s ? void 0 : s.failed, c = bi({}, this.Hv(mn));
		h && (delete u[t], delete c[t]), null === (n = this.Tv) || void 0 === n || n.markCrossTabFeatureFlagChanges(bi(bi({
			$active_feature_flags: [t],
			$enabled_feature_flags: [t]
		}, h ? {
			$feature_flag_details: [t],
			$feature_flag_payloads: [t]
		} : {}), {}, { $stored_person_properties: Object.keys(o) })), this.$t(bi(bi({
			[ln]: Object.keys(sd(a)),
			[vn]: a
		}, h ? {
			[an]: u,
			[mn]: c
		} : {}), {}, { [pn]: bi(bi({}, this.Hv("$stored_person_properties") || {}), o) })), this.Dv();
		try {
			var d;
			null === (d = this.Gl) || void 0 === d || d.capture("$feature_enrollment_update", l);
		} catch (t) {
			this.R.error("Failed to capture early access feature enrollment", t);
		}
	}
	getEarlyAccessFeatures(t, i = !1, e) {
		const s = this.Hv(on);
		!s || i ? this.cf(t, e) : t(s);
	}
	cf(t, i) {
		var e = this;
		return J(function* () {
			const s = e.Gl;
			if (!s) return;
			const n = i ? `&${i.map((t) => `stage=${t}`).join("&")}` : "";
			let r;
			try {
				const t = yield s.sendRequest(`/api/early_access_features/?token=${s.projectToken}${n}`, {
					target: "api",
					method: "GET",
					sentAt: "query"
				});
				if (!t.json) return;
				r = t.json.earlyAccessFeatures, e.$t({ [on]: r });
			} catch (t) {
				e.R.error("Early access feature request failed", t);
				return;
			}
			try {
				t(r);
			} catch (t) {
				e.R.error("Early access feature callback failed", t);
			}
		})();
	}
	uf() {
		const t = this.getFlags(), i = this.getFlagVariants();
		return {
			flags: t.filter((t) => i[t]),
			flagVariants: Object.keys(i).filter((t) => i[t]).reduce((t, e) => (t[e] = i[e], t), {})
		};
	}
	Dv(t) {
		this.Lv();
		const { flags: i, flagVariants: e } = this.uf(), s = this.uv;
		this.uv = !0, this.featureFlagEventHandlers.forEach((s) => {
			try {
				s(i, e, { errorsLoading: t });
			} catch (t) {
				this.R.error("Error while running feature flags callback", t);
			}
		}), this.uv = s;
	}
	setPersonPropertiesForFlags(t, i = !0) {
		this.hf(t, i);
	}
	hf(t, i = !0) {
		const e = this.Hv("$stored_person_properties") || {}, s = (null == t ? void 0 : t.$set) || ((null == t ? void 0 : t.$set_once) ? {} : t), n = null == t ? void 0 : t.$set_once, r = {};
		if (n) for (const t in n) ({}).hasOwnProperty.call(n, t) && (t in e || (r[t] = n[t]));
		this.$t({ [pn]: bi(bi(bi({}, e), r), s) }), i && this.reloadFeatureFlags();
	}
	unsetPersonPropertiesForFlags(t, i = !0) {
		const e = bi({}, this.Hv("$stored_person_properties") || {});
		t.forEach((t) => {
			delete e[t];
		}), this.$t({ [pn]: e }), i && this.reloadFeatureFlags();
	}
	resetPersonPropertiesForFlags(t = !0) {
		this.Dt(pn), t && this.reloadFeatureFlags();
	}
	setGroupPropertiesForFlags(t, i = !0) {
		const e = this.Hv("$stored_group_properties") || {}, s = bi({}, e);
		for (const i of Object.keys(t)) s[i] = bi(bi({}, e[i]), t[i]);
		this.$t({ [fn]: s }), i && this.reloadFeatureFlags();
	}
	resetGroupPropertiesForFlags(t) {
		if (t) {
			const i = this.Hv("$stored_group_properties") || {};
			this.$t({ [fn]: bi(bi({}, i), {}, { [t]: {} }) });
		} else this.Dt(fn);
	}
	reset() {
		this.ov++, this.Bv(this.iv, "cancelled"), this.Bv(this.nv, "cancelled"), this.av = !1, this.Xd = {}, this.tv = {}, this.Uv = void 0, this.sv = !1, this.lv = !1, this.vv = !1, this.$anon_distinct_id = void 0, this.zv(), this.Yd = !1, this.pv = 0, this.hv = /* @__PURE__ */ new Map();
	}
};
var od = Vs("[FeatureFlags]");
var ld = class {
	constructor(t, i = !1) {
		this.df = !1, this.update(t, i);
	}
	update(t, i) {
		this.vf = ((t, i) => {
			var e, s, n, r, o, l, a, u;
			return {
				bootstrap: {
					featureFlags: null !== (e = null === (s = t.bootstrap) || void 0 === s ? void 0 : s.featureFlags) && void 0 !== e ? e : void 0,
					featureFlagPayloads: null !== (n = null === (r = t.bootstrap) || void 0 === r ? void 0 : r.featureFlagPayloads) && void 0 !== n ? n : void 0
				},
				remoteRequestsDisabled: i,
				featureFlagsDisabled: !!t.advanced_disable_feature_flags,
				onlyEvaluateSurveyFeatureFlags: !!t.advanced_only_evaluate_survey_feature_flags,
				deduplicateCallsPerSession: !!t.advanced_feature_flags_dedup_per_session,
				cacheTtlMs: t.feature_flag_cache_ttl_ms,
				refreshIntervalMs: null !== (o = t.remote_config_refresh_interval_ms) && void 0 !== o ? o : 3e5,
				idleRefreshBackoff: C(t.remote_config_refresh_interval_ms),
				requestTimeoutMs: t.feature_flag_request_timeout_ms,
				requestMaxRetries: Math.max(0, null !== (l = t.feature_flag_request_max_retries) && void 0 !== l ? l : 1),
				compression: t.disable_compression ? void 0 : "best-available",
				evaluationContexts: null !== (a = null !== (u = t.evaluation_contexts) && void 0 !== u ? u : t.evaluation_environments) && void 0 !== a ? a : [],
				flagKeys: k(t.flag_keys) ? t.flag_keys : void 0
			};
		})(t, i), !t.evaluation_environments || t.evaluation_contexts || this.df || (od.warn("evaluation_environments is deprecated. Use evaluation_contexts instead. evaluation_environments will be removed in a future version."), this.df = !0), C(t.flag_keys) || k(t.flag_keys) || od.error("Invalid flag_keys found:", t.flag_keys, "Expected array of non-empty strings");
	}
	get() {
		return this.vf;
	}
};
var ad = (t) => z(t) && ("RangeError" === t.name && 0 === t.message.indexOf("Maximum call stack size exceeded") || "InternalError" === t.name && "too much recursion" === t.message);
var ud = Vs("[Error tracking]");
var hd = "webkit-masked-url:";
var cd = [{
	value: "isolatedAPI.contexts.topHostname",
	exact: !1
}, {
	value: "No response from target",
	exact: !0
}];
var dd = [
	"chrome-extension://",
	"moz-extension://",
	"safari-extension:",
	"safari-web-extension:",
	hd
];
var vd = ["__firefox__", "__gCrWeb"];
function fd(t, i) {
	this.v = t, this.k = i;
}
function pd(t, i) {
	(null == i || i > t.length) && (i = t.length);
	for (var e = 0, s = Array(i); i > e; e++) s[e] = t[e];
	return s;
}
function gd(t, i) {
	return function(t) {
		if (Array.isArray(t)) return t;
	}(t) || function(t, i) {
		var e = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
		if (null != e) {
			var s, n, r, o, l = [], a = !0, u = !1;
			try {
				if (r = (e = e.call(t)).next, 0 === i) {
					if (Object(e) !== e) return;
					a = !1;
				} else for (; !(a = (s = r.call(e)).done) && (l.push(s.value), l.length !== i); a = !0);
			} catch (t) {
				u = !0, n = t;
			} finally {
				try {
					if (!a && null != e.return && (o = e.return(), Object(o) !== o)) return;
				} finally {
					if (u) throw n;
				}
			}
			return l;
		}
	}(t, i) || function(t, i) {
		if (t) {
			if ("string" == typeof t) return pd(t, i);
			var e = {}.toString.call(t).slice(8, -1);
			return "Object" === e && t.constructor && (e = t.constructor.name), "Map" === e || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? pd(t, i) : void 0;
		}
	}(t, i) || function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function _d(t) {
	var i, e;
	function s(i, e) {
		try {
			var r = t[i](e), o = r.value, l = o instanceof fd;
			Promise.resolve(l ? o.v : o).then(function(e) {
				if (l) {
					var a = "return" === i && o.k ? i : "next";
					if (!o.k || e.done) return s(a, e);
					e = t[a](e).value;
				}
				n(!!r.done, e);
			}, function(t) {
				s("throw", t);
			});
		} catch (t) {
			n(2, t);
		}
	}
	function n(t, n) {
		2 === t ? i.reject(n) : i.resolve({
			value: n,
			done: t
		}), (i = i.next) ? s(i.key, i.arg) : e = null;
	}
	this._invoke = function(t, n) {
		return new Promise(function(r, o) {
			var l = {
				key: t,
				arg: n,
				resolve: r,
				reject: o,
				next: null
			};
			e ? e = e.next = l : (i = e = l, s(t, n));
		});
	}, "function" != typeof t.return && (this.return = void 0);
}
_d.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, _d.prototype.next = function(t) {
	return this._invoke("next", t);
}, _d.prototype.throw = function(t) {
	return this._invoke("throw", t);
}, _d.prototype.return = function(t) {
	return this._invoke("return", t);
};
var md = Object.entries;
var yd = Object.keys;
var bd = Object.setPrototypeOf;
var wd = Object.isFrozen;
var $d = Object.getPrototypeOf;
var Sd = Object.getOwnPropertyDescriptor;
var xd = Object.freeze;
var Ed = Object.seal;
var kd = Object.create;
var Td = "undefined" != typeof Reflect && Reflect;
var Pd = Td.apply;
var Od = Td.construct;
xd || (xd = function(t) {
	return t;
}), Ed || (Ed = function(t) {
	return t;
}), Pd || (Pd = function(t, i) {
	for (var e = arguments.length, s = new Array(e > 2 ? e - 2 : 0), n = 2; e > n; n++) s[n - 2] = arguments[n];
	return t.apply(i, s);
}), Od || (Od = function(t) {
	for (var i = arguments.length, e = new Array(i > 1 ? i - 1 : 0), s = 1; i > s; s++) e[s - 1] = arguments[s];
	return new t(...e);
});
var Cd = iv([].forEach);
var Rd = iv([].lastIndexOf);
var Ad = iv([].pop);
var Id = iv([].push);
var Md = iv([].slice);
var Fd = iv([].splice);
var Dd = Array.isArray;
var jd = ev(Set);
var Ld = iv(Set.prototype.add);
var Nd = iv(Set.prototype.has);
var Bd = iv("".toLowerCase);
var Ud = iv("".toString);
var zd = iv("".match);
var Hd = iv("".replace);
var qd = iv("".indexOf);
var Wd = iv("".trim);
var Vd = iv(0 .toString);
var Gd = iv(Boolean.prototype.toString);
var Kd = "undefined" == typeof BigInt ? null : iv(BigInt.prototype.toString);
var Jd = "undefined" == typeof Symbol ? null : iv(Symbol.prototype.toString);
var Yd = iv({}.hasOwnProperty);
var Zd = iv({}.toString);
var Xd = /t/.test;
var Qd = function(t, i) {
	return t instanceof RegExp && (t.lastIndex = 0), Pd(Xd, t, [i]);
};
var tv = ev(TypeError);
function iv(t) {
	return function(i) {
		for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), n = 1; e > n; n++) s[n - 1] = arguments[n];
		return Pd(t, i, s);
	};
}
function ev(t) {
	return function() {
		for (var i = arguments.length, e = new Array(i), s = 0; i > s; s++) e[s] = arguments[s];
		return Od(t, e);
	};
}
function sv(t, i) {
	let e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Bd;
	if (bd && bd(t, null), !Dd(i)) return t;
	let s = i.length;
	for (; s--;) {
		let n = i[s];
		if ("string" == typeof n) {
			const t = e(n);
			t !== n && (wd(i) || (i[s] = t), n = t);
		}
		t[n] = !0;
	}
	return t;
}
function nv(t) {
	for (let i = 0; t.length > i; i++) Yd(t, i) || (t[i] = null);
	return t;
}
function rv(t) {
	const i = kd(null);
	for (const s of md(t)) {
		var e = gd(s, 2);
		const n = e[0], r = e[1];
		Yd(t, n) && (i[n] = Dd(r) ? nv(r) : r && "object" == typeof r && r.constructor === Object ? rv(r) : r);
	}
	return i;
}
function ov(t) {
	const i = kd(null), e = yd(t);
	let s = e.length;
	for (; s--;) i[e[s]] = t[e[s]];
	return i;
}
function lv(t, i) {
	for (; null !== t;) {
		const e = Sd(t, i);
		if (e) {
			if (e.get) return iv(e.get);
			if ("function" == typeof e.value) return iv(e.value);
		}
		t = $d(t);
	}
	return function() {
		return null;
	};
}
var av = xd([
	"a",
	"abbr",
	"acronym",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"bdi",
	"bdo",
	"big",
	"blink",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"center",
	"cite",
	"code",
	"col",
	"colgroup",
	"content",
	"data",
	"datalist",
	"dd",
	"decorator",
	"del",
	"details",
	"dfn",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"element",
	"em",
	"fieldset",
	"figcaption",
	"figure",
	"font",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"map",
	"mark",
	"marquee",
	"menu",
	"menuitem",
	"meter",
	"nav",
	"nobr",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"search",
	"section",
	"select",
	"shadow",
	"slot",
	"small",
	"source",
	"spacer",
	"span",
	"strike",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"track",
	"tt",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
]);
var uv = xd([
	"svg",
	"a",
	"altglyph",
	"altglyphdef",
	"altglyphitem",
	"animatecolor",
	"animatemotion",
	"animatetransform",
	"circle",
	"clippath",
	"defs",
	"desc",
	"ellipse",
	"filter",
	"font",
	"g",
	"glyph",
	"glyphref",
	"hkern",
	"image",
	"line",
	"lineargradient",
	"marker",
	"mask",
	"metadata",
	"mpath",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialgradient",
	"rect",
	"stop",
	"style",
	"switch",
	"symbol",
	"text",
	"textpath",
	"title",
	"tref",
	"tspan",
	"view",
	"vkern"
]);
var hv = xd([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]);
var cv = xd([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]);
var dv = xd([
	"math",
	"menclose",
	"merror",
	"mfenced",
	"mfrac",
	"mglyph",
	"mi",
	"mlabeledtr",
	"mmultiscripts",
	"mn",
	"mo",
	"mover",
	"mpadded",
	"mphantom",
	"mroot",
	"mrow",
	"ms",
	"mspace",
	"msqrt",
	"mstyle",
	"msub",
	"msup",
	"msubsup",
	"mtable",
	"mtd",
	"mtext",
	"mtr",
	"munder",
	"munderover",
	"mprescripts"
]);
var vv = xd([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]);
var fv = xd(["#text"]);
var pv = xd([
	"accept",
	"action",
	"align",
	"alt",
	"autocapitalize",
	"autocomplete",
	"autopictureinpicture",
	"autoplay",
	"background",
	"bgcolor",
	"border",
	"capture",
	"cellpadding",
	"cellspacing",
	"checked",
	"cite",
	"class",
	"clear",
	"color",
	"cols",
	"colspan",
	"command",
	"commandfor",
	"controls",
	"controlslist",
	"coords",
	"crossorigin",
	"datetime",
	"decoding",
	"default",
	"dir",
	"disabled",
	"disablepictureinpicture",
	"disableremoteplayback",
	"download",
	"draggable",
	"enctype",
	"enterkeyhint",
	"exportparts",
	"face",
	"for",
	"headers",
	"height",
	"hidden",
	"high",
	"href",
	"hreflang",
	"id",
	"inert",
	"inputmode",
	"integrity",
	"ismap",
	"kind",
	"label",
	"lang",
	"list",
	"loading",
	"loop",
	"low",
	"max",
	"maxlength",
	"media",
	"method",
	"min",
	"minlength",
	"multiple",
	"muted",
	"name",
	"nonce",
	"noshade",
	"novalidate",
	"nowrap",
	"open",
	"optimum",
	"part",
	"pattern",
	"placeholder",
	"playsinline",
	"popover",
	"popovertarget",
	"popovertargetaction",
	"poster",
	"preload",
	"pubdate",
	"radiogroup",
	"readonly",
	"rel",
	"required",
	"rev",
	"reversed",
	"role",
	"rows",
	"rowspan",
	"spellcheck",
	"scope",
	"selected",
	"shape",
	"size",
	"sizes",
	"slot",
	"span",
	"srclang",
	"start",
	"src",
	"srcset",
	"step",
	"style",
	"summary",
	"tabindex",
	"title",
	"translate",
	"type",
	"usemap",
	"valign",
	"value",
	"width",
	"wrap",
	"xmlns"
]);
var gv = xd([
	"accent-height",
	"accumulate",
	"additive",
	"alignment-baseline",
	"amplitude",
	"ascent",
	"attributename",
	"attributetype",
	"azimuth",
	"basefrequency",
	"baseline-shift",
	"begin",
	"bias",
	"by",
	"class",
	"clip",
	"clippathunits",
	"clip-path",
	"clip-rule",
	"color",
	"color-interpolation",
	"color-interpolation-filters",
	"color-profile",
	"color-rendering",
	"cx",
	"cy",
	"d",
	"dx",
	"dy",
	"diffuseconstant",
	"direction",
	"display",
	"divisor",
	"dominant-baseline",
	"dur",
	"edgemode",
	"elevation",
	"end",
	"exponent",
	"fill",
	"fill-opacity",
	"fill-rule",
	"filter",
	"filterunits",
	"flood-color",
	"flood-opacity",
	"font-family",
	"font-size",
	"font-size-adjust",
	"font-stretch",
	"font-style",
	"font-variant",
	"font-weight",
	"fx",
	"fy",
	"g1",
	"g2",
	"glyph-name",
	"glyphref",
	"gradientunits",
	"gradienttransform",
	"height",
	"href",
	"id",
	"image-rendering",
	"in",
	"in2",
	"intercept",
	"k",
	"k1",
	"k2",
	"k3",
	"k4",
	"kerning",
	"keypoints",
	"keysplines",
	"keytimes",
	"lang",
	"lengthadjust",
	"letter-spacing",
	"kernelmatrix",
	"kernelunitlength",
	"lighting-color",
	"local",
	"marker-end",
	"marker-mid",
	"marker-start",
	"markerheight",
	"markerunits",
	"markerwidth",
	"maskcontentunits",
	"maskunits",
	"max",
	"mask",
	"mask-type",
	"media",
	"method",
	"mode",
	"min",
	"name",
	"numoctaves",
	"offset",
	"operator",
	"opacity",
	"order",
	"orient",
	"orientation",
	"origin",
	"overflow",
	"paint-order",
	"path",
	"pathlength",
	"patterncontentunits",
	"patterntransform",
	"patternunits",
	"pointer-events",
	"points",
	"preservealpha",
	"preserveaspectratio",
	"primitiveunits",
	"r",
	"rx",
	"ry",
	"radius",
	"refx",
	"refy",
	"repeatcount",
	"repeatdur",
	"restart",
	"result",
	"rotate",
	"scale",
	"seed",
	"shape-rendering",
	"slope",
	"specularconstant",
	"specularexponent",
	"spreadmethod",
	"startoffset",
	"stddeviation",
	"stitchtiles",
	"stop-color",
	"stop-opacity",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke",
	"stroke-width",
	"style",
	"surfacescale",
	"systemlanguage",
	"tabindex",
	"tablevalues",
	"targetx",
	"targety",
	"transform",
	"transform-origin",
	"text-anchor",
	"text-decoration",
	"text-orientation",
	"text-rendering",
	"textlength",
	"type",
	"u1",
	"u2",
	"unicode",
	"values",
	"vector-effect",
	"viewbox",
	"visibility",
	"version",
	"vert-adv-y",
	"vert-origin-x",
	"vert-origin-y",
	"width",
	"word-spacing",
	"wrap",
	"writing-mode",
	"xchannelselector",
	"ychannelselector",
	"x",
	"x1",
	"x2",
	"xmlns",
	"y",
	"y1",
	"y2",
	"z",
	"zoomandpan"
]);
var _v = xd([
	"accent",
	"accentunder",
	"align",
	"bevelled",
	"close",
	"columnalign",
	"columnlines",
	"columnspacing",
	"columnspan",
	"denomalign",
	"depth",
	"dir",
	"display",
	"displaystyle",
	"encoding",
	"fence",
	"frame",
	"height",
	"href",
	"id",
	"largeop",
	"length",
	"linethickness",
	"lquote",
	"lspace",
	"mathbackground",
	"mathcolor",
	"mathsize",
	"mathvariant",
	"maxsize",
	"minsize",
	"movablelimits",
	"notation",
	"numalign",
	"open",
	"rowalign",
	"rowlines",
	"rowspacing",
	"rowspan",
	"rspace",
	"rquote",
	"scriptlevel",
	"scriptminsize",
	"scriptsizemultiplier",
	"selection",
	"separator",
	"separators",
	"stretchy",
	"subscriptshift",
	"supscriptshift",
	"symmetric",
	"voffset",
	"width",
	"xmlns"
]);
var mv = xd([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]);
var yv = Ed(/{{[\w\W]*|^[\w\W]*}}/g);
var bv = Ed(/<%[\w\W]*|^[\w\W]*%>/g);
var wv = Ed(/\${[\w\W]*/g);
var $v = Ed(/{{|}}|\${|<%|%>|&lt;%|%&gt;/);
var Sv = Ed(/^data-[\-\w.\u00B7-\uFFFF]+$/);
var xv = Ed(/^aria-[\-\w]+$/);
var Ev = Ed(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
var kv = Ed(/^(?:\w+script|data):/i);
var Tv = Ed(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
var Pv = Ed(/^html$/i);
var Ov = Ed(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Cv = Ed(/<[/\w!]/g);
var Rv = Ed(/<[/\w]/g);
var Av = Ed(/<\/no(script|embed|frames)/i);
var Iv = Ed(/\/>/i);
var Mv = Ed(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i);
var Fv = Ed(/^[\r\n\t ]+/);
var Dv = xd(sv({}, [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
]));
var jv = function() {
	return "undefined" == typeof window ? null : window;
};
var Lv = function(t, i, e, s) {
	return Yd(t, i) && Dd(t[i]) ? sv(s.base ? ov(s.base) : {}, t[i], s.transform) : e;
};
var Nv = function(t, i, e) {
	const s = Yd(t, i) ? t[i] : void 0;
	return s && "object" == typeof s ? rv(s) : e;
};
var Bv = function t() {
	let i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : jv();
	const e = (i) => t(i);
	if (e.version = "3.4.18", e.removed = [], !i || !i.document || 9 !== i.document.nodeType || !i.Element) return e.isSupported = !1, e;
	let s = i.document;
	const n = s, r = n.currentScript, o = i.HTMLTemplateElement, l = i.Node, a = i.NodeFilter, u = i.DOMParser, h = i.trustedTypes, c = i.Element.prototype, d = lv(c, "cloneNode"), v = lv(c, "remove"), f = lv(c, "removeAttributeNode"), p = lv(c, "nextSibling"), g = lv(c, "childNodes"), _ = lv(c, "parentNode"), m = lv(c, "shadowRoot"), y = lv(c, "attributes"), b = l && l.prototype ? lv(l.prototype, "nodeType") : null, w = l && l.prototype ? lv(l.prototype, "nodeName") : null, S = l && l.prototype ? lv(l.prototype, "ownerDocument") : null, x = function(t) {
		return b ? b(t) : t.nodeType;
	}, E = function(t) {
		return w ? w(t) : t.nodeName;
	}, k = function(t) {
		for (; null !== t;) {
			const i = Sd(t, "namespaceURI");
			if (i) return i.get ? iv(i.get) : null;
			t = $d(t);
		}
		return null;
	}(c), T = function(t) {
		return k ? k(t) : t.namespaceURI;
	};
	if ("function" == typeof o) {
		const t = s.createElement("template");
		t.content && t.content.ownerDocument && (s = t.content.ownerDocument);
	}
	let P, O, C = "", R = !1, A = 0;
	const I = function() {
		if (A > 0) throw tv("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, M = function(t) {
		I(), A++;
		try {
			return P.createHTML(t);
		} finally {
			A--;
		}
	}, F = function(t) {
		return P && mt ? M(t) : t;
	}, D = s.implementation, j = s.createNodeIterator, L = s.createDocumentFragment, N = s.getElementsByTagName, B = n.importNode;
	let U = {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
	e.isSupported = "function" == typeof md && "function" == typeof _ && D && void 0 !== D.createHTMLDocument;
	const z = yv, H = bv, q = wv, W = Sv, V = xv, G = kv, K = Tv, J = Ov;
	let Y = Ev, Z = null;
	const X = sv({}, [
		...av,
		...uv,
		...hv,
		...dv,
		...fv
	]);
	let Q = null;
	const tt = sv({}, [
		...pv,
		...gv,
		..._v,
		...mv
	]);
	let it = null, et = null, st = null;
	const nt = Object.seal(kd(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	}));
	let rt = !0, ot = !0, lt = !1, at = !0, ut = !1, ht = !0, ct = !1, dt = !1, vt = null, ft = null, pt = !1, gt = !1, _t = !1, mt = !1, yt = !0, bt = !1;
	const wt = "user-content-";
	let $t = !0, St = !1, xt = null, Et = !1, kt = null;
	const Tt = sv({}, [
		"annotation-xml",
		"audio",
		"colgroup",
		"desc",
		"foreignobject",
		"head",
		"iframe",
		"math",
		"mi",
		"mn",
		"mo",
		"ms",
		"mtext",
		"noembed",
		"noframes",
		"noscript",
		"plaintext",
		"script",
		"selectedcontent",
		"style",
		"svg",
		"template",
		"thead",
		"title",
		"video",
		"xmp"
	]);
	let Pt = null;
	const Ot = sv({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]);
	let Ct = null;
	const Rt = sv({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), At = "http://www.w3.org/1998/Math/MathML", It = "http://www.w3.org/2000/svg", Mt = "http://www.w3.org/1999/xhtml";
	let Ft = Mt, Dt = !1, jt = null;
	const Lt = sv({}, [
		At,
		It,
		Mt
	], Ud), Nt = xd(sv({}, [
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]));
	let Bt = null;
	const Ut = xd(sv({}, ["annotation-xml"]));
	let zt = null;
	const Ht = xd(kd(null)), qt = sv({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]);
	let Wt = null;
	const Vt = ["application/xhtml+xml", "text/html"];
	let Gt = null, Kt = null;
	const Jt = s.createElement("form"), Yt = function(t) {
		return t instanceof RegExp || t instanceof Function;
	}, Zt = function() {
		let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
		t && "object" == typeof t || (t = {}), t = rv(t), Wt = -1 === Vt.indexOf(t.PARSER_MEDIA_TYPE) ? "text/html" : t.PARSER_MEDIA_TYPE, Gt = "application/xhtml+xml" === Wt ? Ud : Bd, Z = Lv(t, "ALLOWED_TAGS", X, { transform: Gt }), Q = Lv(t, "ALLOWED_ATTR", tt, { transform: Gt }), jt = Lv(t, "ALLOWED_NAMESPACES", Lt, { transform: Ud }), Ct = Lv(t, "ADD_URI_SAFE_ATTR", Rt, {
			transform: Gt,
			base: Rt
		}), Pt = Lv(t, "ADD_DATA_URI_TAGS", Ot, {
			transform: Gt,
			base: Ot
		}), kt = Lv(t, "FORBID_CONTENTS", Tt, { transform: Gt }), et = Lv(t, "FORBID_TAGS", kd(null), { transform: Gt }), st = Lv(t, "FORBID_ATTR", kd(null), { transform: Gt }), Et = !!Yd(t, "USE_PROFILES") && (t.USE_PROFILES && "object" == typeof t.USE_PROFILES ? rv(t.USE_PROFILES) : t.USE_PROFILES), rt = !1 !== t.ALLOW_ARIA_ATTR, ot = !1 !== t.ALLOW_DATA_ATTR, lt = t.ALLOW_UNKNOWN_PROTOCOLS || !1, at = !1 !== t.ALLOW_SELF_CLOSE_IN_ATTR, ut = t.SAFE_FOR_TEMPLATES || !1, ht = !1 !== t.SAFE_FOR_XML, ct = t.WHOLE_DOCUMENT || !1, gt = t.RETURN_DOM || !1, _t = t.RETURN_DOM_FRAGMENT || !1, mt = t.RETURN_TRUSTED_TYPE || !1, pt = t.FORCE_BODY || !1, yt = !1 !== t.SANITIZE_DOM, bt = t.SANITIZE_NAMED_PROPS || !1, $t = !1 !== t.KEEP_CONTENT, St = t.IN_PLACE || !1, Y = function(t) {
			if (!t) return !1;
			try {
				return Qd(t, ""), !0;
			} catch (t) {
				return !1;
			}
		}(t.ALLOWED_URI_REGEXP) ? t.ALLOWED_URI_REGEXP : Ev, Ft = "string" == typeof t.NAMESPACE ? t.NAMESPACE : Mt, Bt = Nv(t, "MATHML_TEXT_INTEGRATION_POINTS", Nt), zt = Nv(t, "HTML_INTEGRATION_POINTS", Ut);
		const i = Nv(t, "CUSTOM_ELEMENT_HANDLING", Ht);
		if (it = kd(null), Yd(i, "tagNameCheck") && Yt(i.tagNameCheck) && (it.tagNameCheck = i.tagNameCheck), Yd(i, "attributeNameCheck") && Yt(i.attributeNameCheck) && (it.attributeNameCheck = i.attributeNameCheck), Yd(i, "allowCustomizedBuiltInElements") && "boolean" == typeof i.allowCustomizedBuiltInElements && (it.allowCustomizedBuiltInElements = i.allowCustomizedBuiltInElements), Ed(it), ut && (ot = !1), _t && (gt = !0), Et && ((Yd(t, "ALLOWED_TAGS") || Yd(t, "ALLOWED_ATTR")) && "undefined" != typeof console && "function" == typeof console.warn && console.warn("DOMPurify: USE_PROFILES overrides ALLOWED_TAGS and ALLOWED_ATTR. Do not use these options together."), Z = sv({}, fv), Q = kd(null), !0 === Et.html && (sv(Z, av), sv(Q, pv)), !0 === Et.svg && (sv(Z, uv), sv(Q, gv), sv(Q, mv)), !0 === Et.svgFilters && (sv(Z, hv), sv(Q, gv), sv(Q, mv)), !0 === Et.mathMl && (sv(Z, dv), sv(Q, _v), sv(Q, mv))), nt.tagCheck = null, nt.attributeCheck = null, Yd(t, "ADD_TAGS") && ("function" == typeof t.ADD_TAGS ? nt.tagCheck = t.ADD_TAGS : Dd(t.ADD_TAGS) && (Z === X && (Z = ov(Z)), sv(Z, t.ADD_TAGS, Gt))), Yd(t, "ADD_ATTR") && ("function" == typeof t.ADD_ATTR ? nt.attributeCheck = t.ADD_ATTR : Dd(t.ADD_ATTR) && (Q === tt && (Q = ov(Q)), sv(Q, t.ADD_ATTR, Gt))), Yd(t, "ADD_FORBID_CONTENTS") && Dd(t.ADD_FORBID_CONTENTS) && (kt === Tt && (kt = ov(kt)), sv(kt, t.ADD_FORBID_CONTENTS, Gt)), $t && (Z["#text"] = !0), ct && sv(Z, [
			"html",
			"head",
			"body"
		]), Z.table && (Z.tbody = !0, delete et.tbody), t.TRUSTED_TYPES_POLICY) {
			if ("function" != typeof t.TRUSTED_TYPES_POLICY.createHTML) throw tv("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if ("function" != typeof t.TRUSTED_TYPES_POLICY.createScriptURL) throw tv("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			const i = P;
			P = t.TRUSTED_TYPES_POLICY;
			try {
				C = M("");
			} catch (t) {
				throw P = i, t;
			}
		} else null === t.TRUSTED_TYPES_POLICY ? (P = void 0, C = "") : (void 0 === P && (R || (O = function(t, i) {
			if ("object" != typeof t || "function" != typeof t.createPolicy) return null;
			let e = null;
			const s = "data-tt-policy-suffix";
			i && i.hasAttribute(s) && (e = i.getAttribute(s));
			const n = "dompurify" + (e ? "#" + e : "");
			try {
				return t.createPolicy(n, {
					createHTML: (t) => t,
					createScriptURL: (t) => t
				});
			} catch (t) {
				return console.warn("TrustedTypes policy " + n + " could not be created."), null;
			}
		}(h, r), R = !0), P = O), P && "string" == typeof C && (C = M("")));
		Kt = xd(t);
	}, Xt = sv({}, [
		...uv,
		...hv,
		...cv
	]), Qt = sv({}, [...dv, ...vv]), ti = function(t) {
		Id(e.removed, { element: t });
		try {
			_(t).removeChild(t);
		} catch (i) {
			if (v(t), !_(t)) throw tv("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, ii = function(t, i, e) {
		try {
			f(t, i);
		} catch (i) {
			try {
				t.removeAttribute(e);
			} catch (t) {}
		}
	}, ei = function(t) {
		oi(t);
		const i = g(t);
		i && Cd(Md(i), (t) => {
			try {
				v(t);
			} catch (t) {}
		}), 1 === x(t) && ni(t, !1);
	}, si = function(t, i, s) {
		if (!s) try {
			s = i.getAttributeNode(t);
		} catch (t) {
			s = null;
		}
		if (Id(e.removed, {
			attribute: s || null,
			from: i
		}), s) ii(i, s, t);
		else try {
			i.removeAttribute(t);
		} catch (t) {}
		if ("is" === t) if (gt || _t) try {
			ti(i);
		} catch (t) {}
		else try {
			i.setAttribute(t, "");
		} catch (t) {}
	}, ni = function(t, i) {
		const e = y(t);
		if (e) for (let s = e.length - 1; s >= 0; --s) {
			const n = e[s], r = n && n.name;
			"string" != typeof r || i && Q[Gt(r)] || ii(t, n, r);
		}
	}, ri = function(t, i) {
		let e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
		const s = [t];
		for (; s.length > 0;) {
			const t = s.pop();
			if (!1 === i(t)) continue;
			if (e && 1 === x(t)) {
				const i = m(t);
				mi(i) && s.push(i);
			}
			const n = g(t);
			if (n) for (let t = n.length - 1; t >= 0; --t) s.push(n[t]);
		}
	}, oi = function(t) {
		ri(t, (t) => {
			1 === x(t) && ni(t, !0);
		});
	}, li = function(t) {
		const i = [];
		return ri(t, (t) => {
			i.push(t);
		}, !0), i;
	}, ai = function(t, i) {
		let s = !1;
		return Cd(e.removed, (i) => {
			i.element && (s = s || i.element === t, oi(i.element));
		}), function(t, i) {
			const e = jd();
			Cd(li(t), (t) => {
				1 === x(t) && Ld(e, t);
			}), Cd(i, (t) => {
				1 !== x(t) || Nd(e, t) || ni(t, !0);
			});
		}(t, i), s;
	}, ui = function(t, i, e, s) {
		const n = di(t);
		let r;
		for (; r = n.nextNode();) Nd(s, r) && !Nd(xt, r) && (i && bi(U.uponSanitizeShadowNode, r, null), Ri(r, e));
	}, hi = function(t, i) {
		return !!ht && ("patchsrc" === t || "for" === t && "label" !== i && "output" !== i);
	}, ci = function(t) {
		let i = null, e = null;
		if (pt) t = "<remove></remove>" + t;
		else {
			const i = zd(t, Fv);
			e = i && i[0];
		}
		"application/xhtml+xml" === Wt && Ft === Mt && (t = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + t + "</body></html>");
		const n = P ? M(t) : t;
		if (Ft === Mt) try {
			i = new u().parseFromString(n, Wt);
		} catch (t) {}
		if (!i || !i.documentElement) {
			i = D.createDocument(Ft, "template", null);
			try {
				i.documentElement.innerHTML = Dt ? C : n;
			} catch (t) {}
		}
		const r = i.body || i.documentElement;
		return t && e && r.insertBefore(s.createTextNode(e), r.childNodes[0] || null), Ft === Mt ? N.call(i, ct ? "html" : "body")[0] : ct ? i.documentElement : r;
	}, di = function(t) {
		let i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
		const e = S ? S(t) : t.ownerDocument;
		return j.call(e || t, t, (i ? 0 : a.SHOW_ELEMENT) | a.SHOW_COMMENT | a.SHOW_TEXT | a.SHOW_PROCESSING_INSTRUCTION | a.SHOW_CDATA_SECTION, null);
	}, vi = function(t) {
		return t = Hd(t, z, " "), t = Hd(t, H, " "), Hd(t, q, " ");
	}, fi = function(t) {
		var i;
		pi(t);
		const e = null === (i = t.querySelectorAll) || void 0 === i ? void 0 : i.call(t, "template");
		e && Cd(e, (t) => {
			mi(t.content) && fi(t.content);
		});
	}, pi = function(t) {
		t.normalize();
		const i = di(t, !0);
		let e = i.nextNode();
		for (; e;) e.data = vi(e.data), e = i.nextNode();
	}, gi = function(t) {
		const i = w ? w(t) : null;
		return "string" == typeof i && "form" === Gt(i) && ("string" != typeof t.nodeName || "string" != typeof t.textContent || "function" != typeof t.removeChild || t.attributes !== y(t) || "function" != typeof t.removeAttribute || "function" != typeof t.removeAttributeNode || "function" != typeof t.getAttributeNode || "function" != typeof t.setAttribute || "string" != typeof t.namespaceURI || "function" != typeof t.insertBefore || "function" != typeof t.hasChildNodes || t.nodeType !== b(t) || t.childNodes !== g(t));
	}, _i = function(t) {
		if (!b || "object" != typeof t || null === t) return null;
		try {
			const i = b(t);
			return "number" == typeof i ? i : null;
		} catch (t) {
			return null;
		}
	}, mi = function(t) {
		return 11 === _i(t);
	}, yi = function(t) {
		return null !== _i(t);
	};
	function bi(t, i, s) {
		0 !== t.length && Cd(t, (t) => {
			t.call(e, i, s, Kt);
		});
	}
	const wi = function(t, i) {
		if (t instanceof RegExp) return Qd(t, i);
		if (t instanceof Function) {
			for (var e = arguments.length, s = new Array(e > 2 ? e - 2 : 0), n = 2; e > n; n++) s[n - 2] = arguments[n];
			return Boolean(t(i, ...s));
		}
		return !1;
	}, $i = function(t, i, e, s) {
		return 0 === t.length ? i : i === e || i === s ? ov(i) : i;
	}, Si = function(t, i) {
		return t !== i && null === _(t) && (St && oi(t), !0);
	}, xi = function(t, i) {
		if (xt && Ld(xt, t), bi(U.beforeSanitizeElements, t, null), Si(t, i)) return !0;
		if (gi(t)) return ti(t), !0;
		const s = Gt(E(t)), n = x(t);
		if (Z = $i(U.uponSanitizeElement, Z, X, vt), bi(U.uponSanitizeElement, t, {
			tagName: s,
			allowedTags: Z
		}), Si(t, i)) return !0;
		if (function(t, i, e) {
			return !!(ht && 1 === e && t.hasChildNodes() && !yi(t.firstElementChild) && Qd(Cv, t.textContent) && Qd(Cv, t.innerHTML)) || !!(ht && Dv[i] && 1 === e && T(t) === Mt && (yi(t.firstElementChild) || "string" == typeof t.textContent && Qd(Cv, t.textContent))) || 7 === e || !(!ht || 8 !== e || !Qd(Rv, t.data));
		}(t, s, n)) return ti(t), !0;
		if (et[s] || !(nt.tagCheck instanceof Function && nt.tagCheck(s)) && !Z[s]) {
			const e = function(t, i, e) {
				if (!et[i] && Ti(i) && wi(it.tagNameCheck, i)) return !1;
				if ($t && !kt[i] && !kt[Bd(i)]) {
					const i = _(t), s = g(t);
					if (s && i) for (let n = s.length - 1; n >= 0; --n) {
						const r = t === e ? d(s[n], !0) : s[n];
						i.insertBefore(r, p(t));
					}
				}
				return ti(t), !0;
			}(t, s, i);
			return !(!1 !== e || (bi(U.afterSanitizeElements, t, null), !Si(t, i))) || e;
		}
		if (1 === n && !function(t) {
			const i = T(t), e = Bd(E(t)), s = _(t);
			let n = Ft, r = "template";
			return s && 1 === x(s) && (n = T(s), r = Bd(E(s))), !!jt[i] && (i === It ? function(t, i, e) {
				return i === Mt ? "svg" === t : i === At ? "svg" === t && ("annotation-xml" === e || Bt[e]) : Boolean(Xt[t]);
			}(e, n, r) : i === At ? function(t, i, e) {
				return i === Mt ? "math" === t : i === It ? "math" === t && zt[e] : Boolean(Qt[t]);
			}(e, n, r) : i === Mt ? function(t, i, e) {
				return !(i === It && !zt[e]) && !(i === At && !Bt[e]) && !Qt[t] && (qt[t] || !Xt[t]);
			}(e, n, r) : "application/xhtml+xml" === Wt);
		}(t)) return ti(t), !0;
		if (("noscript" === s || "noembed" === s || "noframes" === s) && Qd(Av, t.innerHTML)) return ti(t), !0;
		if (ut && 3 === n) {
			const i = t.textContent, s = vi(i);
			i !== s && (Id(e.removed, { element: t.cloneNode() }), t.textContent = s);
		}
		return bi(U.afterSanitizeElements, t, null), Si(t, i);
	}, Ei = function(t, i, e) {
		if (st[i]) return !1;
		if (hi(i, t)) return !1;
		if (yt && ("id" === i || "name" === i) && (e in s || e in Jt)) return !1;
		const n = Q[i] || nt.attributeCheck instanceof Function && nt.attributeCheck(i, t);
		if (ot && Qd(W, i)) return !0;
		if (rt && Qd(V, i)) return !0;
		if (!n) return Ti(t) && wi(it.tagNameCheck, t) && wi(it.attributeNameCheck, i, t) || "is" === i && it.allowCustomizedBuiltInElements && wi(it.tagNameCheck, e);
		if (Ct[i]) return !0;
		const r = Hd(e, K, "");
		return !(!Qd(Y, r) && ("src" !== i && "xlink:href" !== i && "href" !== i || "script" === t || 0 !== qd(e, "data:") || !Pt[t]) && (!lt || Qd(G, r)) && e);
	}, ki = sv({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), Ti = function(t) {
		return !ki[Bd(t)] && Qd(J, t);
	}, Pi = function(t, i, e, s) {
		if (P && "object" == typeof h && "function" == typeof h.getAttributeType && !e) switch (h.getAttributeType(t, i)) {
			case "TrustedHTML": return M(s);
			case "TrustedScriptURL": return function(t) {
				I(), A++;
				try {
					return P.createScriptURL(t);
				} finally {
					A--;
				}
			}(s);
		}
		return s;
	}, Oi = function(t, i, e, s) {
		try {
			return e ? t.setAttributeNS(e, i, s) : t.setAttribute(i, s), !gi(t) || (ti(t), !1);
		} catch (e) {
			return si(i, t), !1;
		}
	}, Ci = function(t, i) {
		return !(!ht || !Qd(Mv, i)) || "attributename" === Bd(t) && -1 !== qd(i, "href");
	}, Ri = function(t, i) {
		xi(t, i), function(t, i) {
			if (bi(U.beforeSanitizeAttributes, t, null), Si(t, i)) return;
			const s = t.attributes;
			if (!s || gi(t)) return;
			Q = $i(U.uponSanitizeAttribute, Q, tt, ft);
			const n = {
				attrName: "",
				attrValue: "",
				keepAttr: !0,
				allowedAttributes: Q,
				forceKeepAttr: void 0
			};
			let r = s.length;
			const o = Gt(E(t));
			for (; r--;) {
				const i = s[r], l = i.name, a = i.namespaceURI, u = i.value, h = Gt(l), c = u;
				let d = "value" === l ? c : Wd(c), v = !1;
				n.attrName = h, n.attrValue = d, n.keepAttr = !0, n.forceKeepAttr = void 0, bi(U.uponSanitizeAttribute, t, n), d = n.attrValue, !bt || "id" !== h && "name" !== h || 0 === qd(d, wt) || (si(l, t, i), d = wt + d, v = !0), Ci(l, d) ? si(l, t, i) : n.forceKeepAttr || (!n.keepAttr || !at && Qd(Iv, d) ? si(l, t, i) : (ut && (d = vi(d)), Ei(o, h, d) ? (d = Pi(o, h, a, d), d !== c && Oi(t, l, a, d) && v && Ad(e.removed)) : si(l, t, i)));
			}
			bi(U.afterSanitizeAttributes, t, null), Si(t, i);
		}(t, i), mi(t.content) && Ai(t.content);
	}, Ai = function(t) {
		let i = null;
		const e = di(t);
		for (bi(U.beforeSanitizeShadowDOM, t, null); i = e.nextNode();) if (bi(U.uponSanitizeShadowNode, i, null), Ri(i, t), 1 === x(i)) {
			const t = m(i);
			mi(t) && (Ii(t), Ai(t));
		}
		ut && pi(t), bi(U.afterSanitizeShadowDOM, t, null);
	}, Ii = function(t) {
		const i = [{
			node: t,
			shadow: null
		}];
		for (; i.length > 0;) {
			const t = i.pop();
			if (t.shadow) {
				Ai(t.shadow);
				continue;
			}
			const e = t.node, s = 1 === x(e), n = g(e);
			if (n) for (let t = n.length - 1; t >= 0; --t) i.push({
				node: n[t],
				shadow: null
			});
			if (s) {
				const t = w ? w(e) : null;
				if ("string" == typeof t && "template" === Gt(t)) {
					const t = e.content;
					mi(t) && i.push({
						node: t,
						shadow: null
					});
				}
			}
			if (s) {
				const t = m(e);
				mi(t) && i.push({
					node: null,
					shadow: t
				}, {
					node: t,
					shadow: null
				});
			}
		}
	};
	return e.sanitize = function(t) {
		let i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s = null, r = null, o = null, l = null;
		if (Dt = !t, Dt && (t = "<!-->"), "string" != typeof t && !yi(t) && "string" != typeof (t = function(t) {
			switch (typeof t) {
				case "string": return t;
				case "number": return Vd(t);
				case "boolean": return Gd(t);
				case "bigint": return Kd ? Kd(t) : "0";
				case "symbol": return Jd ? Jd(t) : "Symbol()";
				case "undefined":
				default: return Zd(t);
				case "function":
				case "object": {
					if (null === t) return Zd(t);
					const i = t, e = lv(i, "toString");
					if ("function" == typeof e) {
						const t = e(i);
						return "string" == typeof t ? t : Zd(t);
					}
					return Zd(t);
				}
			}
		}(t))) throw tv("dirty is not a string, aborting");
		if (!e.isSupported) return t;
		dt ? (Z = vt, Q = ft) : Zt(i), e.removed = [];
		const a = St && "string" != typeof t && yi(t);
		let u = [];
		const h = xt;
		if (a) {
			ht && ri(t, (t) => {
				const i = x(t);
				if (7 === i || 8 === i && Qd(Rv, t.data)) {
					try {
						v(t);
					} catch (t) {}
					return !1;
				}
				if (1 === i) {
					const i = t, e = Gt(E(t));
					try {
						i.hasAttribute && i.hasAttribute("patchsrc") && i.removeAttribute("patchsrc"), i.hasAttribute && i.hasAttribute("for") && hi("for", e) && i.removeAttribute("for");
					} catch (t) {}
				}
				return !0;
			});
			const i = E(t);
			if ("string" == typeof i) {
				const e = Gt(i);
				if (!Z[e] || et[e]) throw ei(t), tv("root node is forbidden and cannot be sanitized in-place");
			}
			if (gi(t)) throw ei(t), tv("root node is clobbered and cannot be sanitized in-place");
			u = li(t), xt = jd();
		} else if (yi(t)) s = ci("<!---->"), r = s.ownerDocument.importNode(t, !0), 1 === r.nodeType && "BODY" === r.nodeName || "HTML" === r.nodeName ? s = r : s.appendChild(r), Ii(s);
		else {
			if (!gt && !ut && !ct && -1 === t.indexOf("<")) return F(t);
			if (s = ci(t), !s) return gt ? null : mt ? C : "";
		}
		s && pt && ti(s.firstChild);
		const c = a ? t : s;
		try {
			a && Ii(t);
			const i = di(c);
			for (; o = i.nextNode();) Ri(o, c);
			a && function(t, i) {
				const e = xt;
				let s = null;
				const n = () => (s || (s = jd(), Cd(i, (t) => {
					Ld(s, t);
				})), s);
				for (let i = 0;; i++) {
					const s = li(t), r = [t];
					let o = !1;
					if (Cd(s, (t) => {
						11 === x(t) ? Id(r, t) : o || Nd(e, t) || (o = Nd(n(), t));
					}), !o) return;
					if (i >= 8) throw tv("the tree kept changing during in-place sanitization; refusing to return it");
					Cd(r, (i, e) => {
						ui(i, e > 0, t, n());
					});
				}
			}(t, u);
		} catch (i) {
			throw a && (ei(t), ai(t, u)), i;
		} finally {
			xt = h;
		}
		if (a) {
			if (ai(t, u)) throw tv("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return ut && fi(t), t;
		}
		if (gt) {
			if (ut && fi(s), _t) for (l = L.call(s.ownerDocument); s.firstChild;) l.appendChild(s.firstChild);
			else l = s;
			return (Q.shadowroot || Q.shadowrootmode) && (l = B.call(n, l, !0)), l;
		}
		const d = () => ct ? s.outerHTML : s.innerHTML;
		let f = d();
		return ut && Qd($v, f) && (pi(s), f = d()), ct && Z["!doctype"] && s.ownerDocument && s.ownerDocument.doctype && s.ownerDocument.doctype.name && Qd(Pv, s.ownerDocument.doctype.name) && (f = "<!DOCTYPE " + s.ownerDocument.doctype.name + ">\n" + f), F(f);
	}, e.setConfig = function() {
		Zt(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}), dt = !0, vt = Z, ft = Q;
	}, e.clearConfig = function() {
		Kt = null, dt = !1, vt = null, ft = null, P = O, C = "";
	}, e.isValidAttribute = function(t, i, e) {
		Kt || Zt({});
		const s = Gt(t), n = Gt(i);
		return ("string" != typeof e || !(Ci(i, e) || !at && Qd(Iv, e))) && Ei(s, n, e);
	}, e.addHook = function(t, i) {
		"function" == typeof i && Yd(U, t) && Id(U[t], i);
	}, e.removeHook = function(t, i) {
		if (Yd(U, t)) {
			if (void 0 !== i) {
				const e = Rd(U[t], i);
				return -1 === e ? void 0 : Fd(U[t], e, 1)[0];
			}
			return Ad(U[t]);
		}
	}, e.removeHooks = function(t) {
		Yd(U, t) && (U[t] = []);
	}, e.removeAllHooks = function() {
		U = {
			afterSanitizeAttributes: [],
			afterSanitizeElements: [],
			afterSanitizeShadowDOM: [],
			beforeSanitizeAttributes: [],
			beforeSanitizeElements: [],
			beforeSanitizeShadowDOM: [],
			uponSanitizeAttribute: [],
			uponSanitizeElement: [],
			uponSanitizeShadowNode: []
		};
	}, e;
}();
var Uv = "Refusing to render web experiment since the viewer is a likely bot";
var zv = {
	ADD_ATTR: (t, i) => "target" === t && "a" === i || "form" === t && /^(button|fieldset|input|output|select|textarea)$/.test(i),
	ADD_URI_SAFE_ATTR: ["form"]
};
var Hv;
var qv = {
	icontains: (t, i) => i.toLowerCase().indexOf(t.toLowerCase()) > -1,
	not_icontains: (t, i) => -1 === i.toLowerCase().indexOf(t.toLowerCase()),
	regex: (t, i) => lh(i, t),
	not_regex: (t, i) => !lh(i, t),
	exact: (t, i) => i === t,
	is_not: (t, i) => i !== t
};
var Wv = Vs("[Conversations]");
var Vv = "Conversations not available yet.";
function Gv(t, i) {
	var e, s, n, r, o, l, a;
	const u = null !== (e = null == t ? void 0 : t.flushIntervalMs) && void 0 !== e ? e : 3e3, h = null !== (s = null == t ? void 0 : t.maxBufferSize) && void 0 !== s ? s : 100, c = (null == i ? void 0 : i.consoleCapture) ? void 0 : null !== (n = null == t ? void 0 : t.maxLogsPerInterval) && void 0 !== n ? n : 1e3, d = C(c) ? Math.max(h, 2048) : Math.max(h, c), v = bi(bi({}, function() {
		let t = "", i = "";
		try {
			var e;
			const s = "u" > typeof globalThis ? globalThis : "u" > typeof window ? window : void 0, n = null == s || null === (e = s.navigator) || void 0 === e ? void 0 : e.userAgent;
			n && ([t, i] = Xt(n));
		} catch (t) {}
		return function(t, i) {
			const e = function(t) {
				if (t) return {}.hasOwnProperty.call($s, t) ? $s[t] : t;
			}(t);
			return bi(bi({}, e ? { "os.name": e } : {}), i ? { "os.version": i } : {});
		}(t, i);
	}()), null == t ? void 0 : t.resourceAttributes);
	return {
		serviceName: null !== (r = null !== (o = null == v ? void 0 : v["service.name"]) && void 0 !== o ? o : null == t ? void 0 : t.serviceName) && void 0 !== r ? r : null == i ? void 0 : i.serviceNameDefault,
		serviceVersion: null !== (l = null == v ? void 0 : v["service.version"]) && void 0 !== l ? l : null == t ? void 0 : t.serviceVersion,
		environment: null !== (a = null == v ? void 0 : v["deployment.environment"]) && void 0 !== a ? a : null == t ? void 0 : t.environment,
		resourceAttributes: v,
		beforeSend: null == t ? void 0 : t.beforeSend,
		flushIntervalMs: u,
		maxBufferSize: h,
		maxQueueSize: d,
		maxBatchRecordsPerPost: 100,
		rateCapWindowMs: u,
		maxLogsPerInterval: c,
		backgroundFlushBudgetMs: 0,
		terminationFlushBudgetMs: 0
	};
}
var Kv = [
	"debug",
	"log",
	"warn",
	"error",
	"info"
];
var Jv = (t) => {
	for (; null == t ? void 0 : t.__rrweb_original__;) t = t.__rrweb_original__;
	return t;
};
var Yv = "console";
var Zv = "__posthogHandledLogsRequestError";
var Xv = (t, i) => {
	const e = t instanceof Error ? t : new Error(i);
	return e[Zv] = !0, e;
};
var Qv = (t) => !!t && "object" == typeof t && !0 === t[Zv];
var tf = class {
	get ff() {
		return bi(bi({}, this.R), {}, { error: (...t) => {
			t.some(Qv) || this.R.error(...t);
		} });
	}
	constructor(t, i) {
		var e;
		this.Jl = t, this.pf = i, this.name = "logs", this.gf = !1, this.mf = !1, this.yf = !1, this.R = Vs("[logs]"), this.Tc = [], this.bf = [], this.pv = 0, this._f = !1, this.Ai = !1, this.wf = [], this.kf = [], this.Sf = !1, this.xf = !1, this.$f = !1, this.Cf = () => {
			var t, i;
			this.Ai || (this.pv = 0, null === (t = this.Tf) || void 0 === t || t.onReconnect(), null === (i = this.Mf) || void 0 === i || i.onReconnect());
		}, this.gf = !!(null === (e = t.get()) || void 0 === e ? void 0 : e.captureConsoleLogs);
	}
	get If() {
		return !0;
	}
	Ef() {}
	Af() {
		if (!this.$f) {
			try {
				this.Ev = typeof window > "u" ? void 0 : window;
			} catch (t) {
				this.Ev = void 0;
			}
			this.Ev && (io(this.Ev, "online", this.Cf), this.$f = !0);
		}
	}
	Rf(t, i, e, s) {
		this.Af();
		const n = Gv(this.Jl.get(), e);
		return [new As(this.Pf(t, i), n, this.ff, () => this.pf(), (t) => t(), void 0, s), n];
	}
	Of() {
		const t = this.Jl.get();
		var i;
		return this.Tf && this.Ff === t || (null === (i = this.Tf) || void 0 === i || i.reset(), this.Ff = t, [this.Tf, this.Lf] = this.Rf(() => this.Tc, (t) => {
			this.Tc = t;
		})), this.Tf;
	}
	Df() {
		const t = this.Jl.get();
		var i;
		return this.Mf && this.Nf === t || (null === (i = this.Mf) || void 0 === i || i.reset(), this.Nf = t, [this.Mf, this.jf] = this.Rf(() => this.bf, (t) => {
			this.bf = t;
		}, {
			serviceNameDefault: "posthog-browser-logs",
			consoleCapture: !0
		}, Yv)), this.Mf;
	}
	setup(t) {
		if (!this.Ai && !this._f) return this._f = !0, this.Gl = t, this.R = t.logger.createLogger("[logs]"), Nc(t.kv.initialize(), () => {
			this.Ai || this.Av(t);
		});
	}
	Av(t) {
		var i;
		this.Af(), null !== (i = this.Jl.get()) && void 0 !== i && i.captureConsoleLogs && (this.gf = !0), (this.gf || this.Jl.remoteConfigWillArrive && t.kv.get(this.Jl.captureHintKey)) && this.qf();
		let e = !1;
		const s = t.onRemoteConfig((t) => {
			var i;
			e = t.ok && !0 === (null === (i = t.config.logs) || void 0 === i ? void 0 : i.captureConsoleLogs), this.onRemoteConfig(t);
		});
		this.Ai ? s.dispose() : (this.la = s, e || this.loadIfEnabled());
	}
	dispose() {
		var t, i, e, s, n, r, o;
		this.Ai || (this.Ai = !0, this.Bf(), null === (t = this.la) || void 0 === t || t.dispose(), this.la = void 0, this.Gl = void 0, this.yf = !1, null === (i = this.Ev) || void 0 === i || i.removeEventListener("online", this.Cf), null === (e = this.zf) || void 0 === e || e.call(this), this.zf = void 0, null === (s = this.Tf) || void 0 === s || s.clearQueue(), null === (n = this.Mf) || void 0 === n || n.clearQueue(), null === (r = this.Tf) || void 0 === r || r.reset(), null === (o = this.Mf) || void 0 === o || o.reset());
	}
	onRemoteConfig(t) {
		var i, e;
		if (this.Ai) return;
		const s = t.ok ? null === (i = t.config.logs) || void 0 === i ? void 0 : i.captureConsoleLogs : void 0;
		M(s) ? this.Hf() : (null === (e = this.Gl) || void 0 === e || e.kv.set(this.Jl.captureHintKey, !!s), s ? (this.gf = !0, this.mf || this.qf(), this.loadIfEnabled()) : this.Hf());
	}
	reset() {
		var t, i, e, s;
		this.Bf(), null === (t = this.Tf) || void 0 === t || t.clearQueue(), this.Tc = [], null === (i = this.Tf) || void 0 === i || i.reset(), null === (e = this.Mf) || void 0 === e || e.clearQueue(), this.bf = [], null === (s = this.Mf) || void 0 === s || s.reset(), this.pv = 0;
	}
	captureLog(t) {
		!this.Ai && this.Gl && this.Of().captureLog(t);
	}
	captureConsoleLog(t) {
		!this.Ai && this.Gl && this.Df().captureLog(t);
	}
	captureBufferedConsoleLog(t, i, e) {
		!this.Ai && this.Gl && this.Df().captureLog(t, {
			context: i,
			occurredAtMs: e
		});
	}
	Kd() {
		var t;
		this.Bf(), null === (t = this.Mf) || void 0 === t || t.clearQueue(), this.bf = [];
	}
	Hf() {
		this.gf || this.Bf();
	}
	qf() {
		var t;
		if (this.Sf || !(null === (t = this.Ev) || void 0 === t ? void 0 : t.console)) return;
		const i = Gv(this.Jl.get()).maxBufferSize;
		let e = !0;
		this.kf.push(() => {
			e = !1;
		});
		for (const t of Kv) {
			let s;
			try {
				s = Jv(this.Ev.console[t]);
			} catch (t) {
				continue;
			}
			s && this.kf.push(gc(this.Ev.console, t, (n) => {
				const r = (...s) => {
					try {
						e && this.Uf(t, s, i);
					} catch (t) {}
					return n.apply(this.Ev.console, s);
				};
				return r.__rrweb_original__ = s, r;
			}));
		}
		this.Sf = !0, this.Wf = setTimeout(() => {
			this.Bf();
		}, 3e4);
	}
	Uf(t, i, e) {
		var s;
		if (this.Sf && !this.xf && 0 !== i.length) if (null === (s = this.Gl) || void 0 === s ? void 0 : s.canCapture) {
			if (e > this.wf.length) {
				this.xf = !0;
				try {
					this.wf.push({
						level: t,
						args: i,
						occurredAtMs: Date.now(),
						context: this.pf()
					});
				} finally {
					this.xf = !1;
				}
			}
		} else this.Bf();
	}
	Bf() {
		if (this.wf = [], this.Sf) {
			this.Sf = !1, this.Wf && (clearTimeout(this.Wf), this.Wf = void 0);
			for (const t of this.kf) t();
			this.kf = [];
		}
	}
	Gf() {
		const t = this.wf;
		return this.Bf(), t;
	}
	get logger() {
		return this.Vf || (this.Vf = {
			trace: (t, i) => this.captureLog({
				body: t,
				level: "trace",
				attributes: i
			}),
			debug: (t, i) => this.captureLog({
				body: t,
				level: "debug",
				attributes: i
			}),
			info: (t, i) => this.captureLog({
				body: t,
				level: "info",
				attributes: i
			}),
			warn: (t, i) => this.captureLog({
				body: t,
				level: "warn",
				attributes: i
			}),
			error: (t, i) => this.captureLog({
				body: t,
				level: "error",
				attributes: i
			}),
			fatal: (t, i) => this.captureLog({
				body: t,
				level: "fatal",
				attributes: i
			})
		}), this.Vf;
	}
	flushLogs(t) {
		this.Gl && (t ? this.Qf(t) : (this.Tf && this.Tf.flush().catch((t) => this.Jf(t)), this.Mf && this.Mf.flush().catch((t) => this.Jf(t))));
	}
	flush() {
		var t = this;
		return J(function* () {
			var i, e;
			const s = null === (i = t.Tf) || void 0 === i ? void 0 : i.flush().catch((i) => t.Jf(i)), n = null === (e = t.Mf) || void 0 === e ? void 0 : e.flush().catch((i) => t.Jf(i));
			yield s, yield n;
		})();
	}
	Jf(t) {
		Qv(t) || this.R.error("PostHog logs flush failed:", t);
	}
	loadIfEnabled() {
		if (this.Ai || !this.gf || this.mf || this.yf) return;
		const t = this.Ef();
		if (t) {
			this.yf = !0;
			try {
				t((t, i) => {
					if (this.yf = !1, !this.Ai && this.gf) if (t || !i) this.R.error("Could not load logs script", t), this.Bf();
					else {
						const t = this.Gf();
						this.zf = i.initialize(this.Gl), this.mf = !0, t.length > 0 && i.replay(this.Gl, t);
					}
				});
			} catch (t) {
				throw this.yf = !1, t;
			}
		} else this.Bf();
	}
	Pf(t, i) {
		const e = this.Gl;
		return {
			get isDisabled() {
				return !1;
			},
			get optedOut() {
				return !e.canCapture;
			},
			getPersistedProperty: (i) => i === f.LogsQueue ? t() : void 0,
			setPersistedProperty(t, e) {
				t === f.LogsQueue && i(null != e ? e : []);
			},
			Hs: (t) => this.Hs(t),
			getLibraryId: () => e.library.name,
			getLibraryVersion: () => e.library.version
		};
	}
	Hs(t) {
		return new Promise((i) => {
			if (zl(this.pv, 3)) return void i({
				kind: "fatal",
				error: Xv(void 0, "logs endpoint is unreachable, dropping batch")
			});
			let e = !1;
			const s = (t) => {
				e || (e = !0, clearTimeout(n), i(t));
			}, n = setTimeout(() => {
				this.R.warn("Logs request timed out before receiving a response"), s({
					kind: "retry-later",
					error: Xv(void 0, "logs request timed out")
				});
			}, 9e4), r = this.If;
			this.Gl.sendRequest("/i/v1/logs", {
				method: "POST",
				query: { token: this.Gl.projectToken },
				body: t,
				compression: "best-available",
				timeoutMs: 6e4
			}).then((t) => {
				var i;
				const e = t.statusCode;
				this.Zf(e, r), e >= 200 && 300 > e ? s({ kind: "ok" }) : 413 === e ? s({ kind: "too-large" }) : 0 !== e && 408 !== e && 429 !== e && 500 > e ? s({
					kind: "fatal",
					error: /* @__PURE__ */ new Error(`logs request failed with status ${e}`)
				}) : 0 === e ? (t.error || this.R.warn("Logs request failed before receiving an HTTP response"), s({
					kind: "retry-later",
					error: Xv(t.error, "logs request failed before receiving an HTTP response")
				})) : s({
					kind: "retry-later",
					error: null !== (i = t.error) && void 0 !== i ? i : /* @__PURE__ */ new Error(`logs request failed with status ${e}`)
				});
			}, (t) => {
				s({
					kind: "retry-later",
					error: t
				});
			});
		});
	}
	Zf(t, i) {
		(0 !== t || i) && (this.pv = Hl(t, this.pv, 3, () => this.R.warn("Log requests are failing before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped sending logs; will try again when connectivity changes.")));
	}
	Qf(t) {
		this.Tc.length > 0 && this.Kf(t, this.Tc, this.Lf, this.Gl.library.name, (t) => {
			this.Tc = t;
		}), this.bf.length > 0 && this.Kf(t, this.bf, this.jf, Yv, (t) => {
			this.bf = t;
		});
	}
	Kf(t, i, e, s, n) {
		if (0 === i.length) return;
		const r = i.map((t) => t.record);
		n([]);
		const o = Ps(r, Ts(e, this.Gl.library.name, this.Gl.library.version), s, this.Gl.library.version);
		this.Gl.sendRequest("/i/v1/logs", {
			method: "POST",
			query: { token: this.Gl.projectToken },
			body: o,
			compression: "best-available",
			transport: t,
			timeoutMs: 6e4
		}).catch((t) => this.Jf(t));
	}
};
var ef = Vs("[NetworkMetrics]");
var sf = {
	"http:": 80,
	"https:": 443
};
var nf = /* @__PURE__ */ new Set([
	"CONNECT",
	"DELETE",
	"GET",
	"HEAD",
	"OPTIONS",
	"PATCH",
	"POST",
	"PUT",
	"TRACE"
]);
var rf = (t) => R(t) && 0 === t.toLowerCase().indexOf("text/event-stream");
var of = (t) => {
	try {
		return t();
	} catch (t) {
		return;
	}
};
var lf = (t, i) => {
	var e;
	const s = String(i);
	return {
		method: String(t).toUpperCase(),
		url: (null === (e = Bl(s)) || void 0 === e ? void 0 : e.href) || s
	};
};
var af = (t, i, e, s, n, r, o = !1) => {
	try {
		var l, a;
		const u = n();
		if (!u) return;
		const h = e || void 0, c = jh() - s, d = Bl(i.url);
		if (d && "http:" !== d.protocol && "https:" !== d.protocol) return;
		const v = {
			url: (null == d ? void 0 : d.href) || i.url,
			method: i.method
		}, f = T(u.name) ? u.name(v) : R(u.name) ? u.name : "http.client.request.duration";
		if (!f) return;
		const p = o && !h ? void 0 : ((t, i) => t ? 400 > t ? void 0 : String(t) : (null == i ? void 0 : i.name) || "_OTHER")(h, r), g = bi(bi(bi(bi(bi({}, ((t) => {
			const i = nf.has(t) ? t : "_OTHER";
			return bi({ "http.request.method": i }, "_OTHER" === i && t !== i ? { "http.request.method_original": t } : {});
		})(v.method)), d ? ((t) => {
			return {
				"server.address": t.hostname.startsWith("[") && t.hostname.endsWith("]") ? t.hostname.slice(1, -1) : t.hostname,
				"server.port": Number(t.port) || sf[t.protocol],
				"url.scheme": t.protocol.slice(0, -1),
				"url.template": (i = t.pathname, i.split("/").map((t) => ((t) => /^\d+$/.test(t) || t.length >= 8 && /^[0-9a-f-]*\d[0-9a-f-]*$/i.test(t))(t) ? ":id" : t).join("/"))
			};
			var i;
		})(d) : {}), h ? { "http.response.status_code": h } : {}), p ? { "error.type": p } : {}), null === (l = u.attributes) || void 0 === l ? void 0 : l.call(u, v, {
			status: h,
			durationMs: c
		}));
		null === (a = t.metrics) || void 0 === a || a.histogram(f, c, {
			unit: "ms",
			attributes: g
		});
	} catch (t) {
		ef.error("Failed to record network metric", t);
	}
};
var uf = () => {};
var hf = (i, e) => T(null == t ? void 0 : t.fetch) ? gc(t, "fetch", (t) => function(...s) {
	const n = jh(), r = t.apply(this, s);
	if (!e()) return r;
	try {
		var o, l, a;
		const [t, u] = s, h = lf(null !== (o = null !== (l = null == u ? void 0 : u.method) && void 0 !== l ? l : null == t ? void 0 : t.method) && void 0 !== o ? o : "GET", null !== (a = null == t ? void 0 : t.url) && void 0 !== a ? a : t);
		return r.then((t) => (rf(of(() => {
			var i;
			return null == t || null === (i = t.headers) || void 0 === i ? void 0 : i.get("content-type");
		})) || af(i, h, null == t ? void 0 : t.status, n, e, void 0, !0), t), (t) => {
			throw af(i, h, void 0, n, e, t), t;
		});
	} catch (t) {
		return ef.error("Failed to observe fetch", t), r;
	}
}) : uf;
var cf = (i, e) => {
	var s;
	const n = null == t || null === (s = t.XMLHttpRequest) || void 0 === s ? void 0 : s.prototype;
	if (!n) return uf;
	const r = /* @__PURE__ */ new WeakMap(), o = gc(n, "open", (t) => function(...i) {
		try {
			(() => Eu.has(this))() || r.set(this, lf(i[0], i[1]));
		} catch (t) {
			ef.error("Failed to observe XHR open", t);
		}
		return t.apply(this, i);
	}), l = gc(n, "send", (t) => function(...s) {
		let n, o;
		try {
			const t = r.get(this);
			if (t && e()) {
				const s = jh(), r = () => rf(of(() => this.getResponseHeader("content-type")));
				let l = !1;
				o = () => {
					2 === this.readyState && (l = r());
				}, n = () => {
					this.removeEventListener("loadend", n), this.removeEventListener("readystatechange", o), l || r() || af(i, t, this.status, s, e);
				}, io(this, "readystatechange", o), io(this, "loadend", n);
			}
		} catch (t) {
			ef.error("Failed to observe XHR send", t);
		}
		try {
			return t.apply(this, s);
		} catch (t) {
			throw n && this.removeEventListener("loadend", n), o && this.removeEventListener("readystatechange", o), t;
		}
	});
	return () => {
		o(), l();
	};
};
var df = /* @__PURE__ */ new WeakMap();
var vf = /* @__PURE__ */ new Set([
	"$comment",
	"$defs",
	"$id",
	"$schema",
	"additionalProperties",
	"default",
	"definitions",
	"deprecated",
	"description",
	"examples",
	"minProperties",
	"properties",
	"readOnly",
	"required",
	"title",
	"type",
	"writeOnly"
]);
var ff = {
	maxStringLength: 2048,
	truncationSuffix: "..."
};
var pf = {
	maxStringLength: 2048,
	truncationSuffix: "..."
};
function gf(t) {
	if (t) return !0 === t ? {
		intent: !0,
		model: !0
	} : {
		intent: !1 !== t.intent,
		model: !1 !== t.model
	};
}
function _f(t, i) {
	return {}.hasOwnProperty.call(t, i);
}
function mf(t, i) {
	const e = Object.create(t);
	return i && Object.defineProperty(e, "inputSchema", {
		configurable: !0,
		enumerable: !0,
		writable: !0,
		value: i
	}), e;
}
function yf(t, i, e = !1) {
	if (!R(t)) return;
	const s = t.trim();
	return s ? (e ? ls(s, ff) : s).slice(0, i) : void 0;
}
function bf(t) {
	try {
		return P(t) && !0 === t.isError;
	} catch (t) {
		return !1;
	}
}
function wf(t) {
	return ls(t || "Unknown error", pf).slice(0, 2048);
}
function $f(t, i) {
	try {
		return wf(i ? function(t) {
			try {
				if (!P(t) || !k(t.content)) return;
				return t.content.filter((t) => P(t) && "text" === t.type && R(t.text)).map((t) => t.text).join(" ").trim() || void 0;
			} catch (t) {
				return;
			}
		}(t) : P(t) && R(t.message) ? t.message : R(t) ? t : String(t));
	} catch (t) {
		return "Unknown error";
	}
}
function Sf(t, i, e) {
	return i.errorResult ? [{
		type: "Error",
		value: e,
		mechanism: {
			type: "generic",
			handled: !0,
			synthetic: !0,
			exception_id: 0
		}
	}] : t.buildProperties(i.error, { handled: !0 }).$exception_list.map((t) => bi(bi({}, t), {}, { value: wf(t.value) }));
}
function xf(t, i) {
	if (i) return "Error";
	try {
		if (!P(t)) return "Error";
		let i = R(t.name) ? t.name.trim() : "";
		const e = t.constructor;
		return i && "Error" !== i || !T(e) || "Error" === e.name || (i = e.name), (i || "Error").slice(0, 256);
	} catch (t) {
		return "Error";
	}
}
function Ef(t, i) {
	return {
		message: $f(t, i),
		type: xf(t, i)
	};
}
hc.__defaultExtensionClasses = bi({}, {
	featureFlags: class extends rd {
		constructor(t) {
			const i = new ld(t.config, t.$c());
			super(i), this.name = Fh, this._instance = t, this.Yf = i;
		}
		get Tv() {
			return this._instance.persistence;
		}
		updateConfig(t, i) {
			this.Yf.update(t, i), this.Mv();
		}
	},
	sessionRecording: class {
		get Br() {
			return this._instance.config;
		}
		get Jc() {
			return this._instance.persistence;
		}
		get started() {
			var t;
			return !!(null === (t = this.Xf) || void 0 === t ? void 0 : t.isStarted);
		}
		get status() {
			var t, i;
			return this.isReplayOff ? Sc : "awaiting_config" === this.tp || "missing_config" === this.tp ? this.tp : null !== (t = null === (i = this.Xf) || void 0 === i ? void 0 : i.status) && void 0 !== t ? t : this.tp;
		}
		constructor(i) {
			if (this._instance = i, this._forceAllowLocalhostNetworkCapture = !1, this.tp = Sc, this.ep = void 0, this.np = !1, this.Yn = void 0, this.Xe = (() => {
				var i, e;
				if (!(null == s ? void 0 : s.visibilityState) || "visible" === s.visibilityState) return !0;
				const n = null == t || null === (i = t.performance) || void 0 === i || null === (e = i.getEntriesByType) || void 0 === e ? void 0 : e.call(i, "visibility-state");
				return !(null == n ? void 0 : n.length) || n.some((t) => "visible" === t.name);
			})(), this.un = () => {
				var t, i;
				"visible" === (null == s ? void 0 : s.visibilityState) && (this.Xe = !0, null === (t = this.Xf) || void 0 === t || null === (i = t.setDocumentWasEverVisible) || void 0 === i || i.call(t, !0));
			}, !this._instance.sessionManager) throw kc.error("started without valid sessionManager"), /* @__PURE__ */ new Error("[SessionRecording] started without valid sessionManager. This is a bug.");
			if ("always" === this.Br.cookieless_mode) throw new Error("[SessionRecording] cannot be used with cookieless_mode=\"always\"");
			const e = this._instance.get_property(sr);
			var n;
			R(e) && "!" === e[0] && (null === (n = this.Jc) || void 0 === n || n.unregister("$session_is_sampled")), null != s && s.addEventListener && io(s, "visibilitychange", this.un);
		}
		initialize() {
			this.startIfEnabledOrStop();
		}
		dispose({ discardBufferedEvents: t = !1 } = {}) {
			var i;
			this.np = !0, null == s || null === (i = s.removeEventListener) || void 0 === i || i.call(s, "visibilitychange", this.un), t ? this.sp(!0) : this.stopRecording();
		}
		get rp() {
			var i;
			const e = !!(null === (i = this._instance.get_property("$session_recording_remote_config")) || void 0 === i ? void 0 : i.enabled), s = !this.Br.disable_session_recording, n = this.Br.disable_session_recording || this._instance.consent.isOptedOut();
			return t && e && s && !n;
		}
		get isReplayOff() {
			var t;
			return !!this.Br.disable_session_recording || this._instance.consent.isOptedOut() || !1 === (null === (t = this._instance.get_property("$session_recording_remote_config")) || void 0 === t ? void 0 : t.enabled);
		}
		startIfEnabledOrStop(t) {
			if (this.np) return;
			var i;
			if (this.Xf) {
				if (this.Yn !== (null === (i = this.Br.session_recording) || void 0 === i ? void 0 : i.selectMaskingFn)) Ao.Dt(Ec(this.Br)), this.Xf.discard({ discardProducerEvents: !0 }), this.Yn = void 0;
				else if (this.Xf.isStarted && this.rp) return void (this.op() || this.sp(!0));
			}
			const e = !C(Object.assign) && !C(Array.from);
			this.rp && e ? (this.lp(t), kc.info("starting")) : (this.tp = Sc, this.stopRecording());
		}
		lp(t) {
			var i, e;
			if (this.rp) if ("awaiting_config" !== this.tp && "missing_config" !== this.tp && (this.tp = xc), (null == c || null === (i = c.__PosthogExtensions__) || void 0 === i || null === (i = i.rrweb) || void 0 === i ? void 0 : i.record) && (null === (e = c.__PosthogExtensions__) || void 0 === e ? void 0 : e.initSessionRecording)) this.ap(t);
			else {
				var s;
				const i = this._instance.sessionManager;
				null === (s = Ys(this._instance)) || void 0 === s || s(this._instance, this.up, (e) => {
					if (!this.np && this.rp && this._instance.sessionManager === i) return e ? (this._instance.register_for_session({ $sdk_debug_recording_script_not_loaded: !0 }), kc.error("could not load recorder", e)) : void this.ap(t);
					this.tp = "disabled";
				});
			}
		}
		stopRecording() {
			var t, i;
			null === (t = this.ep) || void 0 === t || t.call(this), this.ep = void 0, null === (i = this.Xf) || void 0 === i || i.stop();
		}
		sp(t = !1) {
			var i, e, s;
			t && (this.Yn || null !== (i = this.Br.session_recording) && void 0 !== i && i.selectMaskingFn) && Ao.Dt(Ec(this.Br)), null === (e = this.ep) || void 0 === e || e.call(this), this.ep = void 0, null === (s = this.Xf) || void 0 === s || s.discard({ discardProducerEvents: t }), this.Yn = void 0;
		}
		cp() {
			var t, i;
			null === (t = this.Jc) || void 0 === t || t.unregister("$session_is_sampled"), null === (i = this.Jc) || void 0 === i || i.unregister("$replay_sample_rate");
		}
		hp(t, i) {
			if (M(t)) return null;
			const e = F(t) ? t : parseFloat(t);
			return "number" != typeof (s = e) || !Number.isFinite(s) || 0 > s || s > 1 ? (kc.warn(`${i} must be between 0 and 1. Ignoring invalid value:`, t), null) : e;
			var s;
		}
		dp(t) {
			if (this.Jc) {
				var i, e;
				const s = this.Jc, n = () => {
					var i;
					const e = !1 === t.sessionRecording ? void 0 : t.sessionRecording, n = this.hp(null === (i = this.Br.session_recording) || void 0 === i ? void 0 : i.sampleRate, "session_recording.sampleRate"), r = this.hp(null == e ? void 0 : e.sampleRate, "remote config sampleRate"), o = null != n ? n : r;
					M(o) && this.cp();
					const l = null == e ? void 0 : e.minimumDurationMilliseconds;
					s.register({ [Jn]: bi(bi({
						cache_timestamp: Date.now(),
						enabled: !!e
					}, e), {}, {
						networkPayloadCapture: bi({ capturePerformance: t.capturePerformance }, null == e ? void 0 : e.networkPayloadCapture),
						canvasRecording: {
							enabled: null == e ? void 0 : e.recordCanvas,
							fps: null == e ? void 0 : e.canvasFps,
							quality: null == e ? void 0 : e.canvasQuality
						},
						sampleRate: o,
						minimumDurationMilliseconds: C(l) ? null : l,
						endpoint: null == e ? void 0 : e.endpoint,
						triggerMatchType: null == e ? void 0 : e.triggerMatchType,
						masking: null == e ? void 0 : e.masking,
						urlTriggers: null == e ? void 0 : e.urlTriggers,
						version: null == e ? void 0 : e.version,
						triggerGroups: null == e ? void 0 : e.triggerGroups
					}) });
				};
				n(), null === (i = this.ep) || void 0 === i || i.call(this), this.ep = null === (e = this._instance.sessionManager) || void 0 === e ? void 0 : e.onSessionId(n);
			}
		}
		onRemoteConfig(t) {
			const i = t.ok ? t.config : void 0;
			i && "sessionRecording" in i ? !1 === i.sessionRecording ? (this.dp(i), this.sp()) : (this.dp(i), this.startIfEnabledOrStop()) : ("awaiting_config" === this.tp && (this.tp = "missing_config", this._instance.register_for_session({ [Or]: !0 }), kc.warn("config refresh failed, recording will not start until page reload")), this.startIfEnabledOrStop());
		}
		log(t, i = "log") {
			var e;
			(null === (e = this.Xf) || void 0 === e ? void 0 : e.log) ? this.Xf.log(t, i) : kc.warn("log called before recorder was ready");
		}
		get up() {
			var t, i;
			const e = null === (t = this._instance) || void 0 === t || null === (t = t.persistence) || void 0 === t ? void 0 : t.get_property(Jn);
			return (null == e || null === (i = e.scriptConfig) || void 0 === i ? void 0 : i.script) || "lazy-recorder";
		}
		vp() {
			const t = this._instance.get_property(Jn);
			if (!t) return !1;
			let i;
			try {
				i = "object" == typeof t ? t : JSON.parse(t);
			} catch (t) {
				return kc.warn("persisted remote config for session recording is invalid and will be ignored", t), !1;
			}
			return !M(i.cache_timestamp) && 36e5 >= Date.now() - i.cache_timestamp;
		}
		op() {
			var t, i, e;
			return !(null === (t = this.Br.session_recording) || void 0 === t ? void 0 : t.selectMaskingFn) || !(!0 !== (null === (i = c.__PosthogExtensions__) || void 0 === i || null === (i = i.rrweb) || void 0 === i || null === (i = i.record) || void 0 === i ? void 0 : i.supportsSelectMasking) || !0 !== (null === (e = c.__PosthogExtensions__) || void 0 === e || null === (e = e.initSessionRecording) || void 0 === e ? void 0 : e.supportsSelectMasking) || this.Xf && !0 !== this.Xf.supportsSelectMasking) || (this.tp = Sc, kc.error("Session recording has not started: the recorder does not support selectMaskingFn."), !1);
		}
		ap(t) {
			var i, e, s, n, r, o;
			if (this.np || !this.rp || !this._instance.sessionManager) return void (this.tp = Sc);
			if (!(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.initSessionRecording)) return kc.warn("Called on script loaded before session recording is available. This can be caused by adblockers."), void this._instance.register_for_session({ [Pr]: !0 });
			if (!this.op()) return;
			if (this.Xf || (this.Xf = null === (o = c.__PosthogExtensions__) || void 0 === o ? void 0 : o.initSessionRecording(this._instance, this.Xe), this.Xf._forceAllowLocalhostNetworkCapture = this._forceAllowLocalhostNetworkCapture), !this.op()) return void this.sp(!0);
			if (!this.vp()) {
				if ("missing_config" === this.tp || "awaiting_config" === this.tp) return;
				this.tp = "awaiting_config", kc.info("persisted remote config is stale, requesting fresh config before starting"), new Ha(this._instance).load();
				return;
			}
			this.tp = xc, null === (e = (s = this.Xf).setDocumentWasEverVisible) || void 0 === e || e.call(s, this.Xe);
			const l = null === (n = this.Br.session_recording) || void 0 === n ? void 0 : n.selectMaskingFn;
			this.Xf.start(t), this.Yn = l, this.Xf.isStarted && l !== (null === (r = this.Br.session_recording) || void 0 === r ? void 0 : r.selectMaskingFn) && this.startIfEnabledOrStop();
		}
		onRRwebEmit(t) {
			var i, e;
			null === (i = this.Xf) || void 0 === i || null === (e = i.onRRwebEmit) || void 0 === e || e.call(i, t);
		}
		overrideLinkedFlag() {
			var t, i;
			this.Xf || null === (i = this.Jc) || void 0 === i || i.register({ $replay_override_linked_flag: !0 }), null === (t = this.Xf) || void 0 === t || t.overrideLinkedFlag();
		}
		overrideSampling() {
			var t, i;
			this.Xf || null === (i = this.Jc) || void 0 === i || i.register({ $replay_override_sampling: !0 }), null === (t = this.Xf) || void 0 === t || t.overrideSampling();
		}
		overrideTrigger(t) {
			var i, e;
			this.Xf || null === (e = this.Jc) || void 0 === e || e.register({ ["url" === t ? "$replay_override_url_trigger" : "$replay_override_event_trigger"]: !0 }), null === (i = this.Xf) || void 0 === i || i.overrideTrigger(t);
		}
		get sdkDebugProperties() {
			var t;
			if (this.isReplayOff) return { $recording_status: Sc };
			const i = {};
			for (const t of Tc) {
				var e;
				const s = null === (e = this._instance.sessionPersistence) || void 0 === e ? void 0 : e.get_property(t);
				C(s) || (i[t] = s);
			}
			return bi(bi({}, i), (null === (t = this.Xf) || void 0 === t ? void 0 : t.sdkDebugProperties) || { $recording_status: this.status });
		}
		tryAddCustomEvent(t, i) {
			var e;
			return !!(null === (e = this.Xf) || void 0 === e ? void 0 : e.tryAddCustomEvent(t, i));
		}
		flushBeforeIdentityReset() {
			var t, i;
			null === (t = this.Xf) || void 0 === t || null === (i = t.flushBeforeIdentityReset) || void 0 === i || i.call(t);
		}
	},
	autocapture: class extends Mh {
		constructor(t) {
			super(new dc(t)), this.instance = t;
		}
	},
	historyAutocapture: class {
		constructor(t) {
			this.fp = !1, this._instance = t, this.pp = this.gp();
		}
		initialize() {
			this.startIfEnabled();
		}
		get isEnabled() {
			const t = this.mp();
			return !!(t.path || t.search || this.yp(t));
		}
		startIfEnabled() {
			this.isEnabled && (Ws.info("History API monitoring enabled, starting..."), this.monitorHistoryChanges());
		}
		startIfEnabledOrStop() {
			this.stop(), this.pp = this.gp(), this.startIfEnabled();
		}
		stop() {
			this.bp && this.bp(), this.bp = void 0, this._p && this._p(), this._p = void 0, Ws.info("History API monitoring stopped");
		}
		monitorHistoryChanges() {
			t && t.history && (this.wp("pushState"), this.wp("replaceState"), this.kp(), this.yp() && this.Sp());
		}
		wp(i) {
			var e;
			if (!t || (null === (e = t.history[i]) || void 0 === e ? void 0 : e.__posthog_wrapped__)) return;
			const s = this;
			gc(t.history, i, (e) => function(n, r, o) {
				var l;
				s.xp(o) && s.$p(), e.call(this, n, r, o), s.Cp(i, !s.fp && "popstate" !== (null == t || null === (l = t.event) || void 0 === l ? void 0 : l.type));
			});
		}
		gp() {
			const i = null == t ? void 0 : t.location;
			if (null == i ? void 0 : i.pathname) return {
				pathname: i.pathname,
				search: i.search,
				hash: i.hash
			};
		}
		mp() {
			const t = this._instance.config.capture_pageview;
			return "history_change" === t ? { path: !0 } : P(t) ? t : {};
		}
		yp(t = this.mp()) {
			return !!t.hash && !this._instance.config.disable_capture_url_hashes;
		}
		Tp(t) {
			const i = this.mp(), e = this.pp;
			return !(!e || !(i.path && t.pathname !== e.pathname || i.search && t.search !== e.search || this.yp(i) && t.hash !== e.hash));
		}
		Cp(t, i = !1) {
			try {
				i || this.$p();
				const e = this.gp();
				if (!e) return;
				if (this.Tp(e)) {
					const e = () => this._instance.capture(zr, { navigation_type: t });
					i ? (this.Mp = e, Promise.resolve().then(() => this.$p())) : e();
				}
				this.pp = e;
			} catch (i) {
				Ws.error(`Error capturing ${t} pageview`, i);
			}
		}
		xp(i) {
			var e, s;
			return !(M(i) || !t) && (null === (e = Bl(String(i))) || void 0 === e ? void 0 : e.href) !== (null === (s = t.location) || void 0 === s ? void 0 : s.href);
		}
		$p() {
			const t = this.Mp;
			if (t) {
				this.Mp = void 0, this.fp = !0;
				try {
					t();
				} catch (t) {
					Ws.error("Error capturing deferred pageview", t);
				} finally {
					this.fp = !1;
				}
				this.pp = this.gp();
			}
		}
		kp() {
			if (this.bp) return;
			const i = () => {
				this.Cp("popstate");
			};
			io(t, "popstate", i), this.bp = () => {
				t && t.removeEventListener("popstate", i);
			};
		}
		Sp() {
			if (this._p) return;
			const i = () => {
				this.Cp("hashchange");
			};
			io(t, "hashchange", i), this._p = () => {
				t && t.removeEventListener("hashchange", i);
			};
		}
	},
	heatmaps: class {
		get Br() {
			return this.instance.config;
		}
		constructor(t) {
			var i;
			this.Ip = !1, this.Ea = !1, this.Ep = !1, this.Ap = 0, this.Rp = null, this.instance = t, this.Ip = !!(null === (i = this.instance.persistence) || void 0 === i ? void 0 : i.props[Bn]), this.rageclicks = new xh(t.config.rageclick);
		}
		initialize() {
			this.startIfEnabled();
		}
		get flushIntervalMilliseconds() {
			let t = 5e3;
			return P(this.Br.capture_heatmaps) && this.Br.capture_heatmaps.flush_interval_milliseconds && (t = this.Br.capture_heatmaps.flush_interval_milliseconds), t;
		}
		get isEnabled() {
			return M(this.Br.capture_heatmaps) ? M(this.Br.enable_heatmaps) ? this.Ip : this.Br.enable_heatmaps : !1 !== this.Br.capture_heatmaps;
		}
		startIfEnabled() {
			if (this.isEnabled) {
				if (this.Ea) return;
				Pc.info("starting..."), this.Pp(), this.un();
			} else {
				var t;
				clearInterval(null !== (t = this.Rp) && void 0 !== t ? t : void 0), this.Op(), this.getAndClearBuffer();
			}
		}
		onRemoteConfig(t) {
			if (!t.ok) return;
			const i = t.config;
			if (!("heatmaps" in i)) return;
			const e = !!i.heatmaps;
			this.instance.persistence && this.instance.persistence.register({ [Bn]: e }), this.Ip = e, this.startIfEnabled();
		}
		getAndClearBuffer() {
			const t = this.Rt;
			return this.Rt = void 0, t;
		}
		discardPending() {
			this.Ap = Date.now(), clearTimeout(this.Fp), this.Fp = void 0, this.getAndClearBuffer();
		}
		Lp(t) {
			Oc(t.originalEvent) && t.timestamp > this.Ap && this.jr(t.originalEvent, "deadclick");
		}
		un() {
			this.Rp && clearInterval(this.Rp), this.Rp = "visible" === (null == s ? void 0 : s.visibilityState) ? setInterval(this.Fc.bind(this), this.flushIntervalMilliseconds) : null;
		}
		Pp() {
			t && s && (this.Dp = this.Fc.bind(this), io(t, Ur, this.Dp), this.Np = (i) => this.jr(i || (null == t ? void 0 : t.event)), io(s, "click", this.Np, { capture: !0 }), this.jp = (i) => this.qp(i || (null == t ? void 0 : t.event)), io(s, "mousemove", this.jp, { capture: !0 }), this.Bp = new Pl(this.instance, kl, this.Lp.bind(this)), this.Bp.startIfEnabledOrStop(), this.zp = this.un.bind(this), io(s, wn, this.zp), this.Ea = !0);
		}
		Op() {
			var i;
			t && s && (this.Dp && t.removeEventListener(Ur, this.Dp), this.Np && s.removeEventListener("click", this.Np, { capture: !0 }), this.jp && s.removeEventListener("mousemove", this.jp, { capture: !0 }), this.zp && s.removeEventListener(wn, this.zp), clearTimeout(this.Fp), this.Fp = void 0, null === (i = this.Bp) || void 0 === i || i.stop(), this.Ea = !1);
		}
		Hp(i, e) {
			const s = this.instance.scrollManager.scrollY(), n = this.instance.scrollManager.scrollX(), r = this.instance.scrollManager.scrollElement(), o = function(i, e, s) {
				let n = i;
				for (; n && Do(n) && !jo(n, "body");) {
					if (n === s) return !1;
					let i;
					try {
						var r, o, l;
						i = null === (r = null !== (o = null === (l = n.ownerDocument) || void 0 === l ? void 0 : l.defaultView) && void 0 !== o ? o : t) || void 0 === r ? void 0 : r.getComputedStyle(n).position;
					} catch (t) {
						return !1;
					}
					if (m(e, i)) return !0;
					n = Jo(n);
				}
				return !1;
			}(Wo(i), ["fixed", "sticky"], r);
			return {
				x: i.clientX + (o ? 0 : n),
				y: i.clientY + (o ? 0 : s),
				target_fixed: o,
				type: e
			};
		}
		jr(t, i = "click") {
			var e;
			if (Fo(t.target) || !Oc(t) || !this.instance.is_capturing()) return;
			const s = this.Hp(t, i);
			null !== (e = this.rageclicks) && void 0 !== e && e.isRageClick(t.clientX, t.clientY, (/* @__PURE__ */ new Date()).getTime()) && ll(Wo(t), this.instance.config.rageclick) && this.To(bi(bi({}, s), {}, { type: "rageclick" })), this.To(s);
		}
		qp(t) {
			!Fo(t.target) && Oc(t) && (C(this.Fp) && (this.Ep = this.instance.is_capturing()), clearTimeout(this.Fp), this.Fp = setTimeout(() => {
				this.Fp = void 0, this.Ep && this.instance.is_capturing() && this.To(this.Hp(t, "mousemove"));
			}, 500));
		}
		To(i) {
			if (!t) return;
			const e = this.Br.disable_capture_url_hashes ? di(t.location.href) : t.location.href, s = this.Br.custom_personal_data_properties, r = Vl(e, this.Br.mask_personal_data_properties ? [...Zl, ...s || []] : [], Ql);
			this.Rt = this.Rt || {}, this.Rt[r] || (this.Rt[r] = []), this.Rt[r].push(i);
		}
		Fc() {
			this.Rt && !O(this.Rt) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
		}
	},
	deadClicksAutocapture: Pl,
	webVitalsAutocapture: class {
		constructor(i) {
			var e;
			this._instance = i, this.Ip = !1, this.Ea = !1, this.Rt = {
				navigationKey: void 0,
				url: void 0,
				metrics: [],
				firstMetricTimestamp: void 0
			}, this.Up = (t = !1) => {
				clearTimeout(this.Wp), this.Wp = void 0, 0 !== this.Rt.metrics.length && (this._instance.capture("$web_vitals", bi({ $current_url: this.Rt.url }, this.Rt.metrics.reduce((t, i) => bi(bi({}, t), {}, {
					[`$web_vitals_${i.name}_event`]: bi({}, i),
					[`$web_vitals_${i.name}_value`]: i.value
				}), {})), t ? {
					transport: "sendBeacon",
					send_instantly: !0
				} : void 0), this.Rt = {
					navigationKey: void 0,
					url: void 0,
					metrics: [],
					firstMetricTimestamp: void 0
				});
			}, this.Gp = (t) => {
				var i;
				if (this.Rt = this.Rt || {
					navigationKey: void 0,
					url: void 0,
					metrics: [],
					firstMetricTimestamp: void 0
				}, M(null == t ? void 0 : t.name) || M(null == t ? void 0 : t.value)) return void mc.error("Invalid metric received", t);
				const e = "string" == typeof t.navigationURL ? t.navigationURL : void 0, s = this.Vp(e);
				if (C(s)) return;
				const n = F(t.navigationId) || "string" == typeof t.navigationId ? `navigation:${t.navigationId}` : `url:${s}`;
				if (this.Qp && t.value >= this.Qp) return void mc.error("Ignoring metric with value >= " + this.Qp, t);
				this.Rt.navigationKey !== n && (this.Up(), this.Wp = setTimeout(this.Up, this.flushToCaptureTimeoutMs)), C(this.Rt.navigationKey) && (this.Rt.navigationKey = n, this.Rt.url = s), this.Rt.firstMetricTimestamp = C(this.Rt.firstMetricTimestamp) ? Date.now() : this.Rt.firstMetricTimestamp;
				const r = null === (i = this._instance.sessionManager) || void 0 === i ? void 0 : i.checkAndGetSessionAndWindowId(!0), o = bi(bi(bi({}, t), e ? { navigationURL: s } : {}), {}, {
					$current_url: s,
					timestamp: Date.now()
				});
				if (delete o.entries, P(t.attribution) && this.attributionMetrics.indexOf(t.name) > -1) {
					const i = {};
					for (const e of $c) {
						const s = "url" === e && "string" == typeof t.attribution[e] ? this.Vp(t.attribution[e]) : t.attribution[e];
						C(s) || (i[e] = s);
					}
					o.attribution = i;
				} else delete o.attribution;
				C(r) || (o.$session_id = r.sessionId, o.$window_id = r.windowId), this.Rt.metrics.push(o), this.Rt.metrics.length === this.allowedMetrics.length && this.Up();
			}, this.Jp = () => {
				if (this.Ea) return;
				let i, e, s, n, r = !1;
				const o = c.__PosthogExtensions__, l = null == o ? void 0 : o.postHogWebVitalsCallbacksByFlavor, a = (null == l ? void 0 : l[this.Zp]) || ("web-vitals" === this.Zp && C(l) ? null == o ? void 0 : o.postHogWebVitalsCallbacks : void 0);
				if (!C(a)) {
					const t = a.withoutAttribution, o = this.attributionMetrics;
					r = !C(t), i = o.indexOf("LCP") > -1 ? a.onLCP : (null == t ? void 0 : t.onLCP) || a.onLCP, e = o.indexOf("CLS") > -1 ? a.onCLS : (null == t ? void 0 : t.onCLS) || a.onCLS, s = o.indexOf("FCP") > -1 ? a.onFCP : (null == t ? void 0 : t.onFCP) || a.onFCP, n = o.indexOf("INP") > -1 ? a.onINP : (null == t ? void 0 : t.onINP) || a.onINP;
				}
				if (!(i && e && s && n)) return void mc.error("web vitals callbacks not loaded - not starting");
				const u = { reportSoftNavs: this.useSoftNavs }, h = r && this.attributionMetrics.indexOf("INP") > -1 ? bi(bi({}, u), {}, { includeProcessedEventEntries: !1 }) : u;
				this.allowedMetrics.indexOf("LCP") > -1 && i(this.Gp.bind(this), u), this.allowedMetrics.indexOf("CLS") > -1 && e(this.Gp.bind(this), u), this.allowedMetrics.indexOf("FCP") > -1 && s(this.Gp.bind(this), u), this.allowedMetrics.indexOf("INP") > -1 && n(this.Gp.bind(this), h);
				const d = null == t ? void 0 : t.document;
				io(d, wn, () => {
					"hidden" === (null == d ? void 0 : d.visibilityState) && this.Up(!0);
				}), io(t, "pagehide", () => this.Up(!0)), this.Ea = !0;
			}, this.Ip = !!(null === (e = this._instance.persistence) || void 0 === e ? void 0 : e.props[qn]), this.startIfEnabled();
		}
		get Kp() {
			return this._instance.config.capture_performance;
		}
		get allowedMetrics() {
			var t, i;
			const e = P(this.Kp) ? null === (t = this.Kp) || void 0 === t ? void 0 : t.web_vitals_allowed_metrics : void 0;
			return M(e) ? (null === (i = this._instance.persistence) || void 0 === i ? void 0 : i.props.$web_vitals_allowed_metrics) || bc : e;
		}
		get flushToCaptureTimeoutMs() {
			return (P(this.Kp) ? this.Kp.web_vitals_delayed_flush_ms : void 0) || 5e3;
		}
		get attributionMetrics() {
			const t = P(this.Kp) ? this.Kp.web_vitals_attribution : void 0;
			return j(t) ? t ? bc : [] : k(t) ? t : wc;
		}
		get useAttribution() {
			return this.attributionMetrics.length > 0;
		}
		get useSoftNavs() {
			const t = P(this.Kp) ? this.Kp.__preview_web_vitals_soft_navs : void 0;
			return null != t && t;
		}
		get Qp() {
			const t = P(this.Kp) && F(this.Kp.__web_vitals_max_value) ? this.Kp.__web_vitals_max_value : yc;
			return t > 0 && 6e4 >= t ? yc : t;
		}
		get isEnabled() {
			const t = null == n ? void 0 : n.protocol;
			if ("http:" !== t && "https:" !== t) return mc.info("Web Vitals are disabled on non-http/https protocols"), !1;
			const i = P(this.Kp) ? this.Kp.web_vitals : j(this.Kp) ? this.Kp : void 0;
			return j(i) ? i : this.Ip;
		}
		startIfEnabled() {
			this.isEnabled && !this.Ea && (mc.info("enabled, starting..."), this.Ka(this.Jp));
		}
		onRemoteConfig(t) {
			if (!t.ok) return;
			const i = t.config;
			if (!("capturePerformance" in i)) return;
			const e = P(i.capturePerformance) && !!i.capturePerformance.web_vitals, s = P(i.capturePerformance) ? i.capturePerformance.web_vitals_allowed_metrics : void 0;
			this._instance.persistence && (this._instance.persistence.register({ [qn]: e }), this._instance.persistence.register({ [Kn]: s })), this.Ip = e, this.startIfEnabled();
		}
		get Zp() {
			return this.useSoftNavs ? this.useAttribution ? "web-vitals-with-attribution-soft-navs" : "web-vitals-soft-navs" : this.useAttribution ? "web-vitals-with-attribution" : "web-vitals";
		}
		Ka(t) {
			var i;
			const e = c.__PosthogExtensions__, s = this.Zp, n = null == e ? void 0 : e.postHogWebVitalsCallbacksByFlavor;
			(null == n ? void 0 : n[s]) || "web-vitals" === s && C(n) && (null == e ? void 0 : e.postHogWebVitalsCallbacks) ? t() : null === (i = Ys(this._instance)) || void 0 === i || i(this._instance, s, (i) => {
				i ? mc.error("failed to load script", i) : t();
			});
		}
		Vp(i) {
			const e = i || (null == t ? void 0 : t.location.href);
			if (!e) return void mc.error("Could not determine current URL");
			const s = this._instance.config.disable_capture_url_hashes ? di(e) : e, n = this._instance.config.custom_personal_data_properties;
			return Vl(s, this._instance.config.mask_personal_data_properties ? [...Zl, ...n || []] : [], Ql);
		}
	},
	exceptionObserver: class {
		constructor(i) {
			var e;
			this.Jp = () => {
				var i;
				if (!t || !this.isEnabled || !(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.errorWrappingFunctions)) return;
				const e = c.__PosthogExtensions__.errorWrappingFunctions.wrapOnError, s = c.__PosthogExtensions__.errorWrappingFunctions.wrapUnhandledRejection, n = c.__PosthogExtensions__.errorWrappingFunctions.wrapConsoleError;
				try {
					!this.Yp && this.Br.capture_unhandled_errors && (this.Yp = e(this.captureException.bind(this))), !this.Xp && this.Br.capture_unhandled_rejections && (this.Xp = s(this.captureException.bind(this))), !this.tg && this.Br.capture_console_errors && (this.tg = n(this.captureException.bind(this)));
				} catch (t) {
					vc.error("failed to start", t), this.eg();
				}
			}, this._instance = i, this.ig = !!(null === (e = this._instance.persistence) || void 0 === e ? void 0 : e.props[Un]), this.kt = new tt(bi(bi({}, function(t = {}) {
				var i, e, s, n;
				return {
					refillRate: null !== (i = null !== (e = t.exceptionRateLimiterRefillRate) && void 0 !== e ? e : t.__exceptionRateLimiterRefillRate) && void 0 !== i ? i : 1,
					bucketSize: null !== (s = null !== (n = t.exceptionRateLimiterBucketSize) && void 0 !== n ? n : t.__exceptionRateLimiterBucketSize) && void 0 !== s ? s : 10
				};
			}(this._instance.config.error_tracking)), {}, {
				refillInterval: 1e4,
				R: vc
			})), this.Br = this.ng(), this.startIfEnabledOrStop();
		}
		ng() {
			const t = this._instance.config.capture_exceptions;
			let i = {
				capture_unhandled_errors: !1,
				capture_unhandled_rejections: !1,
				capture_console_errors: !1
			};
			return P(t) ? i = bi(bi({}, i), t) : (C(t) ? this.ig : t) && (i = bi(bi({}, i), {}, {
				capture_unhandled_errors: !0,
				capture_unhandled_rejections: !0
			})), i;
		}
		get isEnabled() {
			return this.Br.capture_console_errors || this.Br.capture_unhandled_errors || this.Br.capture_unhandled_rejections;
		}
		startIfEnabledOrStop() {
			this.isEnabled ? (vc.info("enabled"), this.eg(), this.Ka(this.Jp)) : this.eg();
		}
		Ka(t) {
			var i, e;
			(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.errorWrappingFunctions) ? t() : null === (e = Ys(this._instance)) || void 0 === e || e(this._instance, "exception-autocapture", (i) => {
				if (i) return vc.error("failed to load script", i);
				t();
			});
		}
		eg() {
			var t, i, e;
			null === (t = this.Yp) || void 0 === t || t.call(this), this.Yp = void 0, null === (i = this.Xp) || void 0 === i || i.call(this), this.Xp = void 0, null === (e = this.tg) || void 0 === e || e.call(this), this.tg = void 0;
		}
		onRemoteConfig(t) {
			if (!t.ok) return;
			const i = t.config;
			"autocaptureExceptions" in i && (this.ig = !!i.autocaptureExceptions || !1, this._instance.persistence && this._instance.persistence.register({ [Un]: this.ig }), this.Br = this.ng(), this.startIfEnabledOrStop());
		}
		onConfigChange() {
			this.Br = this.ng();
		}
		captureException(t) {
			try {
				var i, e, s;
				const n = null !== (i = null == t || null === (e = t.$exception_list) || void 0 === e || null === (e = e[0]) || void 0 === e ? void 0 : e.type) && void 0 !== i ? i : "Exception";
				if (this.kt.consumeRateLimit(n)) return void vc.info("Skipping exception capture because of client rate limiting.", { exception: n });
				null === (s = this._instance.exceptions) || void 0 === s || s.sendExceptionEvent(t);
			} catch (t) {}
		}
	},
	exceptions: class {
		constructor(t) {
			var i, e;
			this.sg = [], this.rg = new Ti([
				new Ki(),
				new ne(),
				new Yi(),
				new Ji(),
				new ee(),
				new ie(),
				new Xi(),
				new se()
			], function(t, ...i) {
				return (e, s = 0) => {
					const n = [], r = e.split("\n"), o = Math.min(r.length, s + 1e3), l = [];
					for (let e = s; o > e; e++) {
						const s = r[e];
						if (s.length > 1024) continue;
						const o = Bi.test(s) ? s.replace(Bi, "$1") : s;
						if (!o.match(/\S*Error: /)) {
							for (const e of i) {
								const i = e(o, t);
								if (i) {
									n.push(i);
									const t = zi(n);
									if (t) {
										for (let i = l.length - 1; i >= 0; i--) {
											const e = l[i];
											if (t.start >= e.start + e.length) break;
											l.pop();
										}
										l.push(t);
									}
									break;
								}
							}
							if (Vi(n, l) >= 50) break;
						}
					}
					const a = [...l].sort((t, i) => i.start - t.start), u = a[a.length - 1];
					if (u) {
						const t = qi(n, u);
						n.splice(u.start - t, t);
						for (const i of a) i.start -= t;
					}
					for (const t of a) Hi(n, t);
					return l.some((t) => 0 === t.start && n.length === t.length) && function(t) {
						const i = t.map((t) => `${t.function}|${t.filename}|${t.lineno}|${t.colno}|${t.module}`);
						let e = 0;
						for (let t = 1; i.length > t; t++) Gi(i, t, e) && (e = t);
						t.push(...t.splice(0, e));
					}(n), function(t) {
						if (!t.length) return [];
						const i = Array.from(t);
						return i.reverse(), i.slice(0, 50).map((t) => {
							return bi(bi({}, t), {}, {
								filename: t.filename || (e = i, e[e.length - 1] || {}).filename,
								function: t.function || "?"
							});
							var e;
						});
					}(n);
				};
			}("web:javascript", Di, Ni)), this._instance = t, this.sg = null !== (i = null === (e = this._instance.persistence) || void 0 === e ? void 0 : e.get_property("$error_tracking_suppression_rules")) && void 0 !== i ? i : [], this.og = ue(this.lg()), this.ag = new he(this.og);
		}
		onConfigChange() {
			this.og = ue(this.lg()), this.ag.setConfig(this.og);
		}
		onRemoteConfig(t) {
			var i, e, s;
			if (!t.ok) return;
			const n = t.config;
			if (!("errorTracking" in n)) return;
			const r = null !== (i = null === (e = n.errorTracking) || void 0 === e ? void 0 : e.suppressionRules) && void 0 !== i ? i : [], o = null === (s = n.errorTracking) || void 0 === s ? void 0 : s.captureExtensionExceptions;
			this.sg = r, this._instance.persistence && this._instance.persistence.register({
				[zn]: this.sg,
				[Hn]: o
			});
		}
		get ug() {
			var t;
			const i = !!this._instance.get_property(Hn), e = this._instance.config.error_tracking.captureExtensionExceptions;
			return null !== (t = null != e ? e : i) && void 0 !== t && t;
		}
		buildProperties(t, i) {
			return this.rg.buildFromUnknown(t, {
				syntheticException: null == i ? void 0 : i.syntheticException,
				mechanism: { handled: null == i ? void 0 : i.handled }
			});
		}
		addExceptionStep(t, i) {
			if (this.og.enabled) try {
				if (!R(t) || 0 === t.trim().length) return void ud.warn("Ignoring exception step because message must be a non-empty string");
				const { sanitizedProperties: e, droppedKeys: s } = function(t) {
					if (!t) return {
						sanitizedProperties: {},
						droppedKeys: []
					};
					const i = [];
					return {
						sanitizedProperties: Object.keys(t).reduce((e, s) => le.has(s) ? (i.push(s), e) : (e[s] = t[s], e), {}),
						droppedKeys: i
					};
				}(this.cg(i));
				s.length > 0 && ud.warn("Ignoring reserved exception step fields", { droppedKeys: s }), this.ag.add(bi({
					[re]: t,
					[oe]: (/* @__PURE__ */ new Date()).toISOString()
				}, e));
			} catch (t) {
				ud.error("Failed to add exception step. Ignoring breadcrumb.", t);
			}
		}
		sendExceptionEvent(t) {
			try {
				const i = t.$exception_list;
				if (this.hg(i)) {
					if (this.dg(i)) return this.vg("Exception dropped: matched a suppression rule"), void ud.info("Skipping exception capture because a suppression rule matched");
					if (!this.ug && this.fg(i)) return this.vg("Exception dropped: thrown by a browser extension"), void ud.info("Skipping exception capture because it was thrown by an extension");
					if (!this.ug && this.pg(i)) return this.vg("Exception dropped: thrown by an injected browser script"), void ud.info("Skipping exception capture because it was thrown by an injected browser script");
					if (!this._instance.config.error_tracking.__capturePostHogExceptions && this.gg(i)) return this.vg("Exception dropped: thrown by the PostHog SDK"), void ud.info("Skipping exception capture because it was thrown by the PostHog SDK");
				}
				const e = this.og.enabled && M(t.$exception_steps) ? this.mg(t) : t, s = function() {
					if ("u" > typeof processModule) {
						var t;
						const i = null === (t = processModule.env.POSTHOG_RELEASE_ID) || void 0 === t ? void 0 : t.trim();
						if (i) return i;
					}
					const i = globalThis._posthogReleaseId;
					return "string" == typeof i && i.length > 0 ? i : void 0;
				}();
				s && (e.$release_id = s);
				try {
					const t = this._instance.capture("$exception", e, {
						_noTruncate: !0,
						_batchKey: "exceptionEvent",
						jd: !0
					});
					return t && this.ag.clear(), t;
				} catch (t) {
					ad(t) || ud.error("Failed to capture exception event. Dropping this exception.", t), this.ag.clear();
					return;
				}
			} catch (t) {
				ad(t) || ud.error("Failed to process exception event. Ignoring this exception.", t);
				return;
			}
		}
		mg(t) {
			try {
				const i = this.ag.getAttachable();
				return 0 === i.length ? t : bi(bi({}, t), {}, { $exception_steps: i });
			} catch (i) {
				return ud.error("Failed to read buffered exception steps. Capturing exception without steps.", i), t;
			}
		}
		vg(t) {
			this.og.enabled && this.ag.add({
				[re]: t,
				[oe]: (/* @__PURE__ */ new Date()).toISOString()
			});
		}
		cg(t) {
			return P(t) ? bi({}, t) : {};
		}
		lg() {
			var t, i;
			return null !== (t = null === (i = this._instance.config.error_tracking) || void 0 === i ? void 0 : i.exception_steps) && void 0 !== t ? t : {};
		}
		dg(t) {
			if (0 === t.length) return !1;
			try {
				const i = t.reduce((t, { type: i, value: e }) => (R(i) && i.length > 0 && t.$exception_types.push(i), R(e) && e.length > 0 && t.$exception_values.push(e), t), {
					$exception_types: [],
					$exception_values: []
				});
				return this.sg.some((t) => {
					const e = t.values.map((t) => {
						const e = uh[t.operator], s = i[t.key];
						if (!e || !s) return !1;
						const n = k(t.value) ? t.value : [t.value];
						return n.length > 0 && e(n, s);
					});
					return "OR" === t.type ? e.some(Boolean) : e.every(Boolean);
				});
			} catch (t) {
				return ud.warn("Failed to evaluate suppression rules. Capturing the exception.", t), !1;
			}
		}
		fg(t) {
			const i = t.flatMap((t) => {
				var i, e;
				return null !== (i = null === (e = t.stacktrace) || void 0 === e ? void 0 : e.frames) && void 0 !== i ? i : [];
			}), e = i.filter(({ filename: t }) => !!t && dd.some((i) => t.startsWith(i)));
			return 0 !== e.length && (!e.every(({ filename: t }) => !!t && t.startsWith(hd)) || t.some(({ type: t, value: i }) => "NoResponse" === t || R(i) && cd.some(({ value: t, exact: e }) => e ? i === t : i.includes(t))) && !i.some(({ in_app: t, filename: i }) => t && !(null == i ? void 0 : i.startsWith(hd))));
		}
		pg(t) {
			return t.some(({ value: t }) => R(t) && vd.some((i) => t.includes(i)));
		}
		gg(t) {
			if (t.length > 0) {
				var i, e, s, n;
				const r = null !== (i = null === (e = t[0].stacktrace) || void 0 === e ? void 0 : e.frames) && void 0 !== i ? i : [], o = r[r.length - 1];
				return null !== (s = null == o || null === (n = o.filename) || void 0 === n ? void 0 : n.includes("posthog.com/static")) && void 0 !== s && s;
			}
			return !1;
		}
		hg(t) {
			return !M(t) && k(t);
		}
	},
	productTours: class {
		get Jc() {
			return this._instance.persistence;
		}
		constructor(t) {
			this.yg = null, this.bg = null, this._instance = t;
		}
		initialize() {
			this.loadIfEnabled();
		}
		onRemoteConfig(t) {
			if (!t.ok) return;
			const i = t.config;
			if ("productTours" in i) {
				var e, s;
				if (this.Jc && this.Jc.register({ [Vn]: !!i.productTours }), !Rc(this._instance)) return !this.yg && M(null === (e = this.Jc) || void 0 === e ? void 0 : e.props.ph_product_tours) || Cc.info("product tours disabled; stopping and clearing cached tours"), null === (s = this.yg) || void 0 === s || s.stop(), this.yg = null, void this.clearCache();
				this.loadIfEnabled();
			}
		}
		loadIfEnabled() {
			!this.yg && Rc(this._instance) && this.Ka(() => this._g());
		}
		Ka(t) {
			var i, e;
			(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.generateProductTours) ? t() : null === (e = Ys(this._instance)) || void 0 === e || e(this._instance, "product-tours", (i) => {
				i ? Cc.error("Could not load product tours script", i) : t();
			});
		}
		_g() {
			var t;
			!this.yg && null !== (t = c.__PosthogExtensions__) && void 0 !== t && t.generateProductTours && (this.yg = c.__PosthogExtensions__.generateProductTours(this._instance, !0));
		}
		getProductTours(t, i = !1) {
			if (k(this.bg) && !i) return void t(this.bg, { isLoaded: !0 });
			const e = this.Jc;
			if (e) {
				const s = e.props[hr];
				if (k(s) && !i) return this.bg = s, void t(s, { isLoaded: !0 });
			}
			this._instance._send_request({
				url: this._instance.requestRouter.endpointFor("api", `/api/product_tours/?token=${this._instance.config.token}`),
				method: "GET",
				timestampMode: "query",
				callback: (i) => {
					if (!Rc(this._instance)) return void t([], { isLoaded: !0 });
					const s = i.statusCode;
					if (200 !== s || !i.json) {
						const e = `Product Tours API could not be loaded, status: ${s}`;
						0 === s ? i.error || Cc.warn(e) : Cc.error(e), t([], {
							isLoaded: !1,
							error: e
						});
						return;
					}
					const n = k(i.json.product_tours) ? i.json.product_tours : [];
					this.bg = n, e && e.register({ [hr]: n }), t(n, { isLoaded: !0 });
				}
			});
		}
		getActiveProductTours(t) {
			M(this.yg) ? t([], {
				isLoaded: !1,
				error: "Product tours not loaded"
			}) : this.yg.getActiveProductTours(t);
		}
		showProductTour(t) {
			var i;
			null === (i = this.yg) || void 0 === i || i.showTourById(t);
		}
		previewTour(t) {
			this.yg ? this.yg.previewTour(t) : this.Ka(() => {
				var i;
				this._g(), null === (i = this.yg) || void 0 === i || i.previewTour(t);
			});
		}
		dismissProductTour() {
			var t;
			null === (t = this.yg) || void 0 === t || t.dismissTour("user_clicked_skip");
		}
		nextStep() {
			var t;
			null === (t = this.yg) || void 0 === t || t.nextStep();
		}
		previousStep() {
			var t;
			null === (t = this.yg) || void 0 === t || t.previousStep();
		}
		clearCache() {
			var t;
			this.bg = null, null === (t = this.Jc) || void 0 === t || t.unregister("ph_product_tours");
		}
		resetTour(t) {
			var i;
			null === (i = this.yg) || void 0 === i || i.resetTour(t);
		}
		resetAllTours() {
			var t;
			null === (t = this.yg) || void 0 === t || t.resetAllTours();
		}
		cancelPendingTour(t) {
			var i;
			null === (i = this.yg) || void 0 === i || i.cancelPendingTour(t);
		}
	},
	siteApps: class {
		constructor(t) {
			this._instance = t, this.wg = 0, this.kg = [], this.apps = {};
		}
		get isEnabled() {
			return !!this._instance.config.opt_in_site_apps && !this._instance.config.require_subresource_integrity;
		}
		Sg(t, i) {
			if (!i) return;
			const e = this.globalsForEvent(i);
			this.kg.push(e), this.kg.length > 1e3 && (this.kg = this.kg.slice(10));
		}
		get siteAppLoaders() {
			var t;
			return null === (t = c._POSTHOG_REMOTE_CONFIG) || void 0 === t || null === (t = t[this._instance.config.token]) || void 0 === t ? void 0 : t.siteApps;
		}
		initialize() {
			if (this._instance.config.opt_in_site_apps && !this.isEnabled && Ic.critical("opt_in_site_apps is ignored: require_subresource_integrity disables site apps"), this.isEnabled) {
				const t = this._instance._addCaptureHook(this.Sg.bind(this));
				this.xg = () => {
					t(), this.kg = [], this.xg = void 0;
				};
			}
		}
		globalsForEvent(t) {
			var i, e, s, n, r, o, l;
			if (!t) throw new Error("Event payload is required");
			const a = {}, u = this._instance.get_property("$groups") || [], h = this._instance.get_property("$stored_group_properties") || {};
			for (const [t, i] of Object.entries(h)) a[t] = {
				id: u[t],
				type: t,
				properties: i
			};
			const { $set_once: c, $set: d } = t;
			return {
				event: bi(bi({}, ke(t, Ac)), {}, {
					properties: bi(bi(bi({}, t.properties), d ? { $set: bi(bi({}, null !== (i = null === (e = t.properties) || void 0 === e ? void 0 : e.$set) && void 0 !== i ? i : {}), d) } : {}), c ? { $set_once: bi(bi({}, null !== (s = null === (n = t.properties) || void 0 === n ? void 0 : n.$set_once) && void 0 !== s ? s : {}), c) } : {}),
					elements_chain: null !== (r = null === (o = t.properties) || void 0 === o ? void 0 : o.$elements_chain) && void 0 !== r ? r : "",
					distinct_id: null === (l = t.properties) || void 0 === l ? void 0 : l.distinct_id
				}),
				person: { properties: this._instance.get_property("$stored_person_properties") },
				groups: a
			};
		}
		$g(t) {
			var i;
			const e = null === (i = t.tagName) || void 0 === i ? void 0 : i.toLowerCase();
			if ("style" === e && this._instance.config.prepare_external_dependency_stylesheet) return this._instance.config.prepare_external_dependency_stylesheet(t) || (Ic.error("prepare_external_dependency_stylesheet returned null"), null);
			if ("script" === e && this._instance.config.prepare_external_dependency_script) return this._instance.config.prepare_external_dependency_script(t) || (Ic.error("prepare_external_dependency_script returned null"), null);
			return t;
		}
		Cg() {
			var t, i, e, n, r, o, l, a;
			if (!this._instance.config.prepare_external_dependency_stylesheet && !this._instance.config.prepare_external_dependency_script) return () => {};
			const u = null == s ? void 0 : s.defaultView, h = null == u || null === (t = u.Node) || void 0 === t ? void 0 : t.prototype;
			if (!u || !h) return () => {};
			if (this.wg++, this.Tg) return this.Mg();
			const c = [], d = this, v = /* @__PURE__ */ new WeakSet(), f = (t, i, e) => {
				if (!(null == t ? void 0 : t[i])) return;
				const s = t[i];
				t[i] = e(s), c.push(() => {
					t[i] = s;
				});
			}, p = (t) => {
				if (v.has(t)) return t;
				const i = d.$g(t);
				return i && v.add(i), i;
			}, g = (t) => t.map((t) => "string" == typeof t ? t : p(t)).filter((t) => !I(t));
			return f(h, "appendChild", (t) => function(i) {
				const e = p(i);
				return e ? t.call(this, e) : i;
			}), f(h, "insertBefore", (t) => function(i, e) {
				const s = p(i);
				return s ? t.call(this, s, e) : i;
			}), f(h, "replaceChild", (t) => function(i, e) {
				const s = p(i);
				return s ? t.call(this, s, e) : e;
			}), [
				null === (i = u.Element) || void 0 === i ? void 0 : i.prototype,
				null === (e = u.Document) || void 0 === e ? void 0 : e.prototype,
				null === (n = u.DocumentFragment) || void 0 === n ? void 0 : n.prototype
			].forEach((t) => {
				f(t, "append", (t) => function(...i) {
					return t.apply(this, g(i));
				}), f(t, "prepend", (t) => function(...i) {
					return t.apply(this, g(i));
				});
			}), [
				null === (r = u.Element) || void 0 === r ? void 0 : r.prototype,
				null === (o = u.CharacterData) || void 0 === o ? void 0 : o.prototype,
				null === (l = u.DocumentType) || void 0 === l ? void 0 : l.prototype
			].forEach((t) => {
				f(t, "before", (t) => function(...i) {
					return t.apply(this, g(i));
				}), f(t, "after", (t) => function(...i) {
					return t.apply(this, g(i));
				}), f(t, "replaceWith", (t) => function(...i) {
					const e = g(i);
					return i.length && !e.length ? void 0 : t.apply(this, e);
				});
			}), f(null === (a = u.Element) || void 0 === a ? void 0 : a.prototype, "insertAdjacentElement", (t) => function(i, e) {
				const s = p(e);
				return s ? t.call(this, i, s) : null;
			}), this.Tg = () => {
				c.forEach((t) => t()), this.Tg = void 0;
			}, this.Mg();
		}
		Mg() {
			let t = !1;
			return () => {
				var i;
				t || (t = !0, this.wg--, 0 === this.wg && (null === (i = this.Tg) || void 0 === i || i.call(this)));
			};
		}
		Ig(t, i = !0) {
			const e = this.Cg();
			try {
				const s = t(e);
				return i && e(), s;
			} catch (t) {
				throw e(), t;
			}
		}
		setupSiteApp(t) {
			const i = this.apps[t.id], e = () => {
				var e;
				!i.errored && this.kg.length && (Ic.info(`Processing ${this.kg.length} events for site app with id ${t.id}`), this.kg.forEach((t) => this.Ig(() => {
					var e;
					return null === (e = i.processEvent) || void 0 === e ? void 0 : e.call(i, t);
				})), i.processedBuffer = !0), Object.values(this.apps).every((t) => t.processedBuffer || t.errored) && (null === (e = this.xg) || void 0 === e || e.call(this));
			};
			let s = !1;
			const n = (n) => {
				i.errored = !n, i.loaded = !0, Ic.info(`Site app with id ${t.id} ${n ? "loaded" : "errored"}`), s && e();
			};
			try {
				const { processEvent: e } = this.Ig((i) => t.init({
					posthog: this._instance,
					callback(t) {
						i(), n(t);
					}
				}), !1);
				e && (i.processEvent = e), s = !0;
			} catch (i) {
				Ic.error(Mc + t.id, i), n(!1);
			}
			if (s && i.loaded) try {
				e();
			} catch (e) {
				Ic.error(`Error while processing buffered events PostHog app with config id ${t.id}`, e), i.errored = !0;
			}
		}
		Eg() {
			const t = this.siteAppLoaders || [];
			for (const i of t) this.apps[i.id] = {
				id: i.id,
				loaded: !1,
				errored: !1,
				processedBuffer: !1
			};
			for (const i of t) this.setupSiteApp(i);
		}
		Ag(t) {
			if (0 === Object.keys(this.apps).length) return;
			const i = this.globalsForEvent(t);
			for (const e of Object.values(this.apps)) try {
				this.Ig(() => {
					var t;
					return null === (t = e.processEvent) || void 0 === t ? void 0 : t.call(e, i);
				});
			} catch (i) {
				Ic.error(`Error while processing event ${t.event} for site app ${e.id}`, i);
			}
		}
		onRemoteConfig(t) {
			var i, e, s;
			if (null === (i = this.siteAppLoaders) || void 0 === i ? void 0 : i.length) return this.isEnabled ? (this.Eg(), void this._instance.on("eventCaptured", (t) => this.Ag(t))) : void Ic.error("PostHog site apps are disabled. Enable the \"opt_in_site_apps\" config to proceed.");
			if (null === (e = this.xg) || void 0 === e || e.call(this), !t.ok) return;
			const n = t.config;
			if (null === (s = n.siteApps) || void 0 === s ? void 0 : s.length) if (this.isEnabled) for (const { id: t, url: i } of n.siteApps) {
				var r, o;
				c[`__$$ph_site_app_${t}`] = this._instance, null === (r = c.__PosthogExtensions__) || void 0 === r || null === (o = r.loadSiteApp) || void 0 === o || o.call(r, this._instance, i, (i) => {
					if (i) return Ic.error(Mc + t, i);
				});
			}
			else Ic.error("PostHog site apps are disabled. Enable the \"opt_in_site_apps\" config to proceed.");
		}
	},
	surveys: class extends zc {
		constructor(t) {
			super(new Hc(t));
		}
	},
	tracingHeaders: class {
		constructor(t) {
			this._instance = t, this.Rg = void 0, this.Pg = void 0, this.Og = void 0, this.Fg = void 0, this.Lg = [], this.Jp = () => {
				const { hostnames: t, traceparentTargets: i } = this.Dg();
				var e, s;
				t || i ? (t || k(this.Og) || (this.Og = []), this.Fg !== this.Og && (this.eg(), this.Fg = this.Og), C(this.Rg) && (this.Rg = null === (e = c.__PosthogExtensions__) || void 0 === e || null === (e = e.tracingHeadersPatchFns) || void 0 === e ? void 0 : e._patchXHR(this.Og, () => this._instance.get_distinct_id(), this._instance.sessionManager, this.Lg)), C(this.Pg) && (this.Pg = null === (s = c.__PosthogExtensions__) || void 0 === s || null === (s = s.tracingHeadersPatchFns) || void 0 === s ? void 0 : s._patchFetch(this.Og, () => this._instance.get_distinct_id(), this._instance.sessionManager, this.Lg))) : this.eg();
			};
		}
		initialize() {
			this.startIfEnabledOrStop();
		}
		Ka(t) {
			var i, e;
			(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.tracingHeadersPatchFns) ? t() : null === (e = Ys(this._instance)) || void 0 === e || e(this._instance, "tracing-headers", (i) => {
				if (i) return _c.error("failed to load script", i);
				t();
			});
		}
		Ng() {
			var t, i;
			return null !== (t = null !== (i = this._instance.config.tracing_headers) && void 0 !== i ? i : this._instance.config.addTracingHeaders) && void 0 !== t ? t : this._instance.config.__add_tracing_headers;
		}
		jg() {
			const t = this.Ng();
			return k(t) ? (k(this.Og) ? this.Og.splice(0, this.Og.length, ...t) : this.Og = [...t], t.length > 0 ? this.Og : void 0) : !k(this.Og) || (this.Og.splice(0), t) ? (this.Og = t || void 0, this.Og) : void 0;
		}
		qg() {
			const t = this._instance.config.trace_propagation_targets, i = k(t) ? t.filter((t) => R(t) && !!t) : [];
			return this.Lg.splice(0, this.Lg.length, ...i), i.length > 0 ? this.Lg : void 0;
		}
		Dg() {
			return {
				hostnames: this.jg(),
				traceparentTargets: this.qg()
			};
		}
		eg() {
			var t, i;
			null === (t = this.Rg) || void 0 === t || t.call(this), null === (i = this.Pg) || void 0 === i || i.call(this), this.Rg = void 0, this.Pg = void 0;
		}
		startIfEnabledOrStop() {
			const { hostnames: t, traceparentTargets: i } = this.Dg();
			t || i ? this.Ka(this.Jp) : this.eg();
		}
	},
	toolbar: class {
		constructor(t) {
			this.instance = t;
		}
		Bg(t) {
			c.ph_toolbar_state = t;
		}
		zg() {
			var t;
			return null !== (t = c.ph_toolbar_state) && void 0 !== t ? t : 0;
		}
		initialize() {
			return this.maybeLoadToolbar();
		}
		maybeLoadToolbar(i = void 0, e = void 0, n = void 0) {
			var r, o;
			if (eo(this.instance.config)) return !1;
			if (!t || !s) return !1;
			i = null !== (r = i) && void 0 !== r ? r : t.location, n = null !== (o = n) && void 0 !== o ? o : t.history;
			try {
				if (!e) {
					try {
						t.localStorage.setItem("test", "test"), t.localStorage.removeItem("test");
					} catch (t) {
						return !1;
					}
					e = null == t ? void 0 : t.localStorage;
				}
				const s = qc || Gl(i.hash, "__posthog") || Gl(i.hash, "state");
				let r;
				const o = s ? vi(() => JSON.parse(atob(decodeURIComponent(s)))) || vi(() => JSON.parse(decodeURIComponent(s))) : null;
				return o && "ph_authorize" === o.action ? (r = o, r.source = "url", r && Object.keys(r).length > 0 && (o.desiredHash ? i.hash = o.desiredHash : n ? n.replaceState(n.state, "", i.pathname + i.search) : i.hash = "")) : (r = JSON.parse(e.getItem(Wc) || "{}"), r.source = "localstorage", delete r.userIntent), !(!r.token || this.instance.config.token !== r.token || (this.loadToolbar(r), 0));
			} catch (t) {
				return !1;
			}
		}
		Hg(t) {
			const i = c.ph_load_toolbar || c.ph_load_editor;
			!M(i) && T(i) ? i(t, this.instance) : Vc.warn("No toolbar load function found");
		}
		loadToolbar(i) {
			const e = !!(null == s ? void 0 : s.getElementById("__POSTHOG_TOOLBAR__"));
			if (!t || e) return !1;
			const n = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, r = bi(bi({ token: this.instance.config.token }, i), {}, { apiURL: this.instance.requestRouter.endpointFor("ui") }, n ? { instrument: !1 } : {});
			if (t.localStorage.setItem(Wc, JSON.stringify(bi(bi({}, r), {}, { source: void 0 }))), 2 === this.zg()) this.Hg(r);
			else if (0 === this.zg()) {
				var o;
				this.Bg(1), null === (o = Ys(this.instance)) || void 0 === o || o(this.instance, "toolbar", (t) => {
					if (t) return Vc.error("[Toolbar] Failed to load", t), void this.Bg(0);
					this.Bg(2), this.Hg(r);
				}), io(t, "turbolinks:load", () => {
					this.Bg(0), this.loadToolbar(r);
				});
			}
			return !0;
		}
		Ug(t) {
			return this.loadToolbar(t);
		}
		maybeLoadEditor(t = void 0, i = void 0, e = void 0) {
			return this.maybeLoadToolbar(t, i, e);
		}
	},
	experiments: class i {
		get Br() {
			return this._instance.config;
		}
		constructor(t) {
			this._instance = t, this.getWebExperimentsAndEvaluateDisplayLogic = (t = !1) => {
				this.getWebExperiments((t) => {
					i.Wg("retrieved web experiments from the server"), this.Gg = /* @__PURE__ */ new Map(), t.forEach((t) => {
						if (t.feature_flag_key) {
							var e;
							this.Gg && (i.Wg("setting flag key ", t.feature_flag_key, " to web experiment ", t), null === (e = this.Gg) || void 0 === e || e.set(t.feature_flag_key, t));
							const s = this._instance.getFeatureFlag(t.feature_flag_key);
							R(s) && t.variants[s] && this.Vg(t, s);
						} else if (t.variants) for (const e in t.variants) {
							const s = t.variants[e];
							i.Qg(s, this._instance) && this.Jg(t.name, e, s.transforms);
						}
					});
				}, t);
			}, this._instance.onFeatureFlags((t) => {
				this.onFeatureFlags(t);
			});
		}
		initialize() {}
		onFeatureFlags(t) {
			if (this._is_bot()) i.Wg(Uv);
			else if (!this.Br.disable_web_experiments) {
				if (M(this.Gg)) return this.Gg = /* @__PURE__ */ new Map(), this.loadIfEnabled(), void this.previewWebExperiment();
				i.Wg("applying feature flags", t), t.forEach((t) => {
					var i;
					if (this.Gg && (null === (i = this.Gg) || void 0 === i ? void 0 : i.has(t))) {
						var e;
						const i = this._instance.getFeatureFlag(t), s = null === (e = this.Gg) || void 0 === e ? void 0 : e.get(t);
						i && null != s && s.variants[i] && this.Vg(s, i);
					}
				});
			}
		}
		previewWebExperiment() {
			const t = i.getWindowLocation();
			if (null == t ? void 0 : t.search) {
				const e = Wl(null == t ? void 0 : t.search, "__experiment_id"), s = Wl(null == t ? void 0 : t.search, "__experiment_variant");
				e && s && (i.Wg(`previewing web experiments ${e} && ${s}`), this.getWebExperiments((t) => {
					this.Zg(parseInt(e), s, t);
				}, !1, !0));
			}
		}
		loadIfEnabled() {
			this.Br.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic();
		}
		getWebExperiments(t, i, e) {
			if (this.Br.disable_web_experiments && !e) return t([]);
			const s = this._instance.get_property("$web_experiments");
			if (s && !i) return t(s);
			this._instance._send_request({
				url: this._instance.requestRouter.endpointFor("api", `/api/web_experiments/?token=${this.Br.token}`),
				method: "GET",
				timestampMode: "query",
				callback: (i) => t(200 === i.statusCode && i.json && i.json.experiments || [])
			});
		}
		Zg(t, e, s) {
			const n = s.filter((i) => i.id === t);
			n && n.length > 0 && (i.Wg(`Previewing web experiment [${n[0].name}] with variant [${e}]`), this.Jg(n[0].name, e, n[0].variants[e].transforms));
		}
		Vg(t, e) {
			const s = t.variants[e];
			i.Kg(s, this._instance) ? this.Jg(t.name, e, s.transforms) : i.Wg(`skipping variant ${e} of experiment ${t.name} because this page does not match its url conditions`);
		}
		static Qg(t, e) {
			return !M(t.conditions) && i.Kg(t, e) && i.Yg(t);
		}
		static Kg(t, e) {
			var s;
			if (M(t.conditions) || M(null === (s = t.conditions) || void 0 === s ? void 0 : s.url)) return !0;
			const n = i.getWindowLocation();
			if (n) {
				var r, o, l;
				const i = Mo(e, n.href);
				return !(null === (r = t.conditions) || void 0 === r ? void 0 : r.url) || qv[null !== (o = null === (l = t.conditions) || void 0 === l ? void 0 : l.urlMatchType) && void 0 !== o ? o : "icontains"](t.conditions.url, i);
			}
			return !1;
		}
		static getWindowLocation() {
			return null == t ? void 0 : t.location;
		}
		static Yg(t) {
			var i;
			if (M(t.conditions) || M(null === (i = t.conditions) || void 0 === i ? void 0 : i.utm)) return !0;
			const e = ia();
			if (e.utm_source) {
				var s, n, r, o, l, a, u, h;
				const i = !(null === (s = t.conditions) || void 0 === s || null === (s = s.utm) || void 0 === s ? void 0 : s.utm_campaign) || (null === (n = t.conditions) || void 0 === n || null === (n = n.utm) || void 0 === n ? void 0 : n.utm_campaign) == e.utm_campaign, c = !(null === (r = t.conditions) || void 0 === r || null === (r = r.utm) || void 0 === r ? void 0 : r.utm_source) || (null === (o = t.conditions) || void 0 === o || null === (o = o.utm) || void 0 === o ? void 0 : o.utm_source) == e.utm_source, d = !(null === (l = t.conditions) || void 0 === l || null === (l = l.utm) || void 0 === l ? void 0 : l.utm_medium) || (null === (a = t.conditions) || void 0 === a || null === (a = a.utm) || void 0 === a ? void 0 : a.utm_medium) == e.utm_medium, v = !(null === (u = t.conditions) || void 0 === u || null === (u = u.utm) || void 0 === u ? void 0 : u.utm_term) || (null === (h = t.conditions) || void 0 === h || null === (h = h.utm) || void 0 === h ? void 0 : h.utm_term) == e.utm_term;
				return i && d && v && c;
			}
			return !1;
		}
		static Wg(t, ...i) {
			Ws.info(`[WebExperiments] ${t}`, i);
		}
		static Xg(t, ...i) {
			Ws.warn(`[WebExperiments] ${t}`, i);
		}
		static tm(t) {
			("http://www.w3.org/1999/xhtml" === t.namespaceURI && "template" === t.localName ? t.content : t).querySelectorAll("a[target], template").forEach((t) => {
				var e;
				if ("template" === t.localName) return void ("http://www.w3.org/1999/xhtml" === t.namespaceURI && i.tm(t));
				if ("http://www.w3.org/1999/xhtml" !== t.namespaceURI || "_blank" !== (null === (e = t.getAttribute("target")) || void 0 === e ? void 0 : e.toLowerCase())) return void t.removeAttribute("target");
				const s = (t.getAttribute("rel") || "").split(/\s+/).filter((t) => t && !/^(opener|noopener)$/i.test(t));
				s.push("noopener"), t.setAttribute("rel", s.join(" "));
			});
		}
		Jg(t, e, s) {
			this._is_bot() ? i.Wg(Uv) : "control" !== e ? s.forEach((s) => {
				if (s.selector) {
					var n;
					i.Wg(`applying transform of variant ${e} for experiment ${t} `, s);
					const r = null === (n = document) || void 0 === n ? void 0 : n.querySelectorAll(s.selector);
					if (!(null == r ? void 0 : r.length)) return void i.Xg(`no element on this page matches selector ${s.selector} of variant ${e} for experiment ${t}`);
					const o = /* @__PURE__ */ new Map();
					r?.forEach((t) => {
						if ("script" === t.localName.toLowerCase()) return;
						const e = t;
						if (s.html) {
							var n;
							const l = "http://www.w3.org/1998/Math/MathML" === t.namespaceURI && "annotation-xml" === t.localName && (null === (n = t.getAttribute("encoding")) || void 0 === n ? void 0 : n.toLowerCase()) || "", a = JSON.stringify([
								t.namespaceURI,
								t.localName,
								l
							]);
							let u = o.get(a);
							if (M(u)) {
								var r;
								const e = null !== (r = Hv) && void 0 !== r ? r : Hv = Bv(), n = t.ownerDocument.implementation.createHTMLDocument(""), h = n.createElementNS(t.namespaceURI, t.localName);
								l && h.setAttribute("encoding", l);
								const c = n.createRange();
								c.selectNodeContents(h);
								const d = "http://www.w3.org/2000/svg" === t.namespaceURI && /^(foreignObject|desc|title)$/.test(t.localName) || /^(text\/html|application\/xhtml\+xml)$/.test(l) ? "http://www.w3.org/1999/xhtml" : t.namespaceURI, v = c.createContextualFragment(s.html);
								"http://www.w3.org/1998/Math/MathML" === t.namespaceURI && /^(mi|mo|mn|ms|mtext)$/.test(t.localName) ? (h.appendChild(v), e.sanitize(h, bi(bi({}, zv), {}, {
									NAMESPACE: d || void 0,
									IN_PLACE: !0
								}))) : ("http://www.w3.org/1999/xhtml" === h.namespaceURI && "template" === h.localName ? h.content : h).appendChild(e.sanitize(v, bi(bi({}, zv), {}, {
									NAMESPACE: d || void 0,
									RETURN_DOM_FRAGMENT: !0
								}))), i.tm(h), u = h.innerHTML, o.set(a, u);
							}
							e.innerHTML = u;
						}
						s.css && e.setAttribute("style", s.css);
					});
				}
			}) : i.Wg("Control variants leave the page unmodified.");
		}
		_is_bot() {
			return e && this._instance ? sh(e, this.Br.custom_blocked_useragents) : void 0;
		}
	},
	conversations: class {
		constructor(t) {
			this._instance = t, this.im = void 0, this._conversationsManager = null, this.nm = !1, this.ie = null, this.sm = !1, this.rm = 0, this.om = null, this.lm = null;
		}
		initialize() {
			this.loadIfEnabled();
		}
		onRemoteConfig(t) {
			if (this._instance.config.disable_conversations) return void (this.om = null);
			if (this.am = t.ok, !t.ok) return;
			const i = t.config.conversations;
			M(i) ? this.om = null : (j(i) ? this.im = i : (this.im = i.enabled, this.ie = i), this.im || (this.om = null), this.loadIfEnabled());
		}
		reset() {
			var t;
			null === (t = this._conversationsManager) || void 0 === t || t.reset(), this._conversationsManager = null, this.rm++, this.im = void 0, this.ie = null, this.am = void 0, this.sm = !1, this.om = null;
		}
		loadIfEnabled() {
			if (this._conversationsManager) return;
			if (this.nm) return;
			if (this._instance.config.disable_conversations) return;
			if (eo(this._instance.config)) return;
			if (this._instance.config.cookieless_mode && this._instance.consent.isOptedOut()) return;
			const t = null == c ? void 0 : c.__PosthogExtensions__;
			if (t && !C(this.im) && this.im) if (this.ie && this.ie.token) {
				this.nm = !0;
				try {
					const i = t.initConversations;
					if (i) return this.um(i), void (this.nm = !1);
					const e = Ys(this._instance);
					if (!e) return void this.hm(En);
					const s = this.rm;
					e(this._instance, "conversations", (i) => {
						if (s !== this.rm) return this.nm = !1, void this.loadIfEnabled();
						i || !t.initConversations ? this.hm("Could not load conversations script", i) : this.um(t.initConversations), this.nm = !1;
					});
				} catch (t) {
					this.hm("Error initializing conversations", t), this.nm = !1;
				}
			} else Wv.error("Conversations enabled but missing token in remote config.");
		}
		um(t) {
			if (this.ie) {
				try {
					this._conversationsManager = t(this.ie, this._instance), this.sm = !1, Wv.info("Conversations loaded successfully");
				} catch (t) {
					this.hm("Error completing conversations initialization", t);
					return;
				}
				this.lm && this._conversationsManager.setTheme(this.lm), this.dm();
			} else Wv.error("Cannot complete initialization: remote config is null");
		}
		dm() {
			const t = this.om;
			this.om = null, this._conversationsManager && t && ("open" === t ? this._conversationsManager.open() : this._conversationsManager.close());
		}
		hm(t, i) {
			Wv.error(t, i), this._conversationsManager = null, this.nm = !1, this.sm = !0;
		}
		show() {
			this._conversationsManager ? this._conversationsManager.show() : Wv.warn("Conversations not loaded yet.");
		}
		hide() {
			"open" === this.om && (this.om = null), this._conversationsManager && this._conversationsManager.hide();
		}
		open() {
			this._conversationsManager ? (this.om = null, this._conversationsManager.open()) : this.om = "open";
		}
		close() {
			this._conversationsManager ? (this.om = null, this._conversationsManager.close()) : this.om = "close";
		}
		setTheme(t) {
			var i, e;
			this.lm = bi(bi(bi({}, this.lm), t), {}, { dark: bi(bi({}, null === (i = this.lm) || void 0 === i ? void 0 : i.dark), null == t ? void 0 : t.dark) }), null === (e = this._conversationsManager) || void 0 === e || e.setTheme(t);
		}
		isAvailable() {
			return !0 === this.im && !I(this._conversationsManager);
		}
		getUnavailableReason() {
			return this.isAvailable() ? null : this._instance.config.disable_conversations ? "disabled_by_config" : eo(this._instance.config) ? "disabled_for_toolbar" : this._instance.config.cookieless_mode && this._instance.consent.isOptedOut() ? "consent_opted_out" : !1 === this.am ? "remote_config_failed" : C(this.im) ? this.am ? "disabled_in_project" : "remote_config_pending" : this.im ? M(this.ie) || !this.ie.token ? "missing_token" : (null == c ? void 0 : c.__PosthogExtensions__) ? this.nm ? "initializing" : this.sm ? "load_failed" : "not_loaded" : "extensions_unavailable" : "disabled_in_project";
		}
		isVisible() {
			var t, i;
			return null !== (t = null === (i = this._conversationsManager) || void 0 === i ? void 0 : i.isVisible()) && void 0 !== t && t;
		}
		sendMessage(t, i, e) {
			var s = this;
			return J(function* () {
				return s._conversationsManager ? s._conversationsManager.sendMessage(t, i, e) : (Wv.warn(Vv), null);
			})();
		}
		getMessages(t, i) {
			var e = this;
			return J(function* () {
				return e._conversationsManager ? e._conversationsManager.getMessages(t, i) : (Wv.warn(Vv), null);
			})();
		}
		markAsRead(t) {
			var i = this;
			return J(function* () {
				return i._conversationsManager ? i._conversationsManager.markAsRead(t) : (Wv.warn(Vv), null);
			})();
		}
		getTickets(t) {
			var i = this;
			return J(function* () {
				return i._conversationsManager ? i._conversationsManager.getTickets(t) : (Wv.warn(Vv), null);
			})();
		}
		requestRestoreLink(t) {
			var i = this;
			return J(function* () {
				return i._conversationsManager ? i._conversationsManager.requestRestoreLink(t) : (Wv.warn(Vv), null);
			})();
		}
		restoreFromToken(t) {
			var i = this;
			return J(function* () {
				return i._conversationsManager ? i._conversationsManager.restoreFromToken(t) : (Wv.warn(Vv), null);
			})();
		}
		restoreFromUrlToken() {
			var t = this;
			return J(function* () {
				return t._conversationsManager ? t._conversationsManager.restoreFromUrlToken() : (Wv.warn(Vv), null);
			})();
		}
		getCurrentTicketId() {
			var t, i;
			return null !== (t = null === (i = this._conversationsManager) || void 0 === i ? void 0 : i.getCurrentTicketId()) && void 0 !== t ? t : null;
		}
		getWidgetSessionId() {
			var t, i;
			return null !== (t = null === (i = this._conversationsManager) || void 0 === i ? void 0 : i.getWidgetSessionId()) && void 0 !== t ? t : null;
		}
		Qd() {
			var t;
			null === (t = this._conversationsManager) || void 0 === t || t.setIdentity();
		}
		Jd() {
			var t;
			null === (t = this._conversationsManager) || void 0 === t || t.clearIdentity();
		}
	},
	logs: class extends tf {
		constructor(t) {
			super({
				get() {
					var i;
					return null == t || null === (i = t.config) || void 0 === i ? void 0 : i.logs;
				},
				captureHintKey: Gn,
				get remoteConfigWillArrive() {
					var i, e;
					return !(null === (i = t.$c) || void 0 === i ? void 0 : i.call(t)) || !!(null === (e = c._POSTHOG_REMOTE_CONFIG) || void 0 === e || null === (e = e[t.config.token]) || void 0 === e ? void 0 : e.config);
				}
			}, () => function(t) {
				var i;
				const e = {};
				if (e.distinctId = t.get_distinct_id(), t.sessionManager) {
					const { sessionId: i, windowId: s, sessionStartTimestamp: n, lastActivityTimestamp: r } = t.sessionManager.checkAndGetSessionAndWindowId(!0);
					e.sessionId = i, e.windowId = s, M(n) || (e.sessionStartTimestamp = n), M(r) || (e.lastActivityTimestamp = r);
				}
				if (null != c && null !== (i = c.location) && void 0 !== i && i.href && (e.currentUrl = t.config.disable_capture_url_hashes ? di(c.location.href) : c.location.href), t.featureFlags) {
					const i = t.featureFlags.getFlags();
					i && i.length > 0 && (e.activeFeatureFlags = i);
				}
				return e;
			}(t)), this._instance = t, this.name = Dh, this.Af();
		}
		get If() {
			return this._instance.__loaded;
		}
		Ef() {
			const t = Vs("[logs]"), i = null == c ? void 0 : c.__PosthogExtensions__;
			if (!i) return void t.error("PostHog Extensions not found.");
			const e = Ys(this._instance);
			if (e) return (t) => {
				e(this._instance, "logs", (e) => {
					const s = i.logs;
					t(e, (null == s ? void 0 : s.initializeLogs) ? {
						initialize: (t) => s.initializeLogs(t),
						replay(t, i) {
							var e;
							return null === (e = s.replayConsoleBuffer) || void 0 === e ? void 0 : e.call(s, t, i);
						}
					} : void 0);
				});
			};
			t.error(En);
		}
	},
	metrics: class {
		constructor(t) {
			this._instance = t, this.R = Vs("[metrics]"), this.Ai = !1, this.vm = !1, this.un = () => {
				"hidden" === (null == s ? void 0 : s.visibilityState) && this.flush();
			};
		}
		initialize() {
			this.onConfigChange(), this.Ai || this.vm || !(null == s ? void 0 : s.addEventListener) || (io(s, "visibilitychange", this.un), this.vm = !0);
		}
		onConfigChange() {
			var t;
			if (this.Ai) return;
			const i = !!(null === (t = this._instance.config.metrics) || void 0 === t ? void 0 : t.network);
			i && !this.fm ? this.fm = ((t) => {
				let i = !0;
				const e = () => i ? ((t) => {
					var i;
					const e = null === (i = t.config.metrics) || void 0 === i ? void 0 : i.network;
					return !0 === e ? {} : e || void 0;
				})(t) : void 0, s = hf(t, e), n = cf(t, e);
				return () => {
					i = !1, s(), n();
				};
			})(this._instance) : !i && this.fm && (this.fm(), this.fm = void 0);
		}
		Of() {
			var t;
			if (this.Ai) return;
			const i = null === (t = this._instance) || void 0 === t || null === (t = t.config) || void 0 === t ? void 0 : t.metrics;
			if (!this.Tf || this.Ff !== i) {
				var e;
				null === (e = this.Tf) || void 0 === e || e.reset(), this.Ff = i;
				const t = function(t) {
					var i, e, s, n, r;
					const o = null == t ? void 0 : t.resourceAttributes;
					return {
						serviceName: null !== (i = null == o ? void 0 : o["service.name"]) && void 0 !== i ? i : null == t ? void 0 : t.serviceName,
						serviceVersion: null !== (e = null == o ? void 0 : o["service.version"]) && void 0 !== e ? e : null == t ? void 0 : t.serviceVersion,
						environment: null !== (s = null == o ? void 0 : o["deployment.environment"]) && void 0 !== s ? s : null == t ? void 0 : t.environment,
						resourceAttributes: o,
						beforeSend: null == t ? void 0 : t.beforeSend,
						flushIntervalMs: null !== (n = null == t ? void 0 : t.flushIntervalMs) && void 0 !== n ? n : 1e4,
						maxSeriesPerFlush: null !== (r = null == t ? void 0 : t.maxSeriesPerFlush) && void 0 !== r ? r : 1e3
					};
				}(i);
				C(null == i ? void 0 : i.flushIntervalMs) && (t.flushIntervalMs = 6e4), this.Tf = new Bs(this.Pf(), t, this.R);
			}
			return this.Tf;
		}
		count(t, i = 1, e) {
			var s;
			null === (s = this.Of()) || void 0 === s || s.count(t, i, e);
		}
		gauge(t, i, e) {
			var s;
			null === (s = this.Of()) || void 0 === s || s.gauge(t, i, e);
		}
		histogram(t, i, e) {
			var s;
			null === (s = this.Of()) || void 0 === s || s.histogram(t, i, e);
		}
		flush(t) {
			if (!this.Tf) return Promise.resolve();
			if (t) {
				const i = this.Tf.drainWindow();
				return i && this.Do(i, t), Promise.resolve();
			}
			return this.Tf.flush().catch((t) => this.R.error("PostHog metrics flush failed:", t));
		}
		reset() {
			var t;
			null === (t = this.Tf) || void 0 === t || t.reset();
		}
		dispose() {
			var t, i, e;
			this.Ai = !0, null == s || null === (t = s.removeEventListener) || void 0 === t || t.call(s, "visibilitychange", this.un), this.vm = !1, null === (i = this.fm) || void 0 === i || i.call(this), this.fm = void 0, null === (e = this.Tf) || void 0 === e || e.reset();
		}
		Pf() {
			const t = this._instance, i = this;
			return {
				get isDisabled() {
					return !1;
				},
				get optedOut() {
					return !t.is_capturing();
				},
				Do: (t) => i.Do(t),
				getLibraryId: () => rn.LIB_NAME,
				getLibraryVersion: () => rn.LIB_VERSION
			};
		}
		Do(t, i) {
			return new Promise((e) => {
				let n = !1;
				const r = (t) => {
					n || (n = !0, clearTimeout(o), e(t));
				}, o = setTimeout(() => r({
					kind: "retry-later",
					error: /* @__PURE__ */ new Error("metrics request timed out")
				}), 9e4);
				this._instance._send_request(bi(bi(bi({
					method: "POST",
					url: this.pm(),
					data: t,
					compression: "best-available",
					batchKey: "metrics"
				}, i && { transport: i }), "hidden" === (null == s ? void 0 : s.visibilityState) && { preferSyncCompression: !0 }), {}, {
					fireCallbackOnDrop: !0,
					callback(t) {
						const i = t.statusCode;
						if (i >= 200 && 300 > i) r({ kind: "ok" });
						else if (413 === i) r({ kind: "too-large" });
						else if (0 !== i && 408 !== i && 429 !== i && 500 > i) r({
							kind: "fatal",
							error: /* @__PURE__ */ new Error(`metrics request failed with status ${i}`)
						});
						else {
							var e;
							r({
								kind: "retry-later",
								error: null !== (e = t.error) && void 0 !== e ? e : /* @__PURE__ */ new Error(`metrics request failed with status ${i}`)
							});
						}
					}
				}));
			});
		}
		pm() {
			return this._instance.requestRouter.endpointFor("api", "/i/v1/metrics") + "?token=" + encodeURIComponent(this._instance.config.token);
		}
	},
	webMCP: class {
		constructor(t) {
			this._instance = t, this.gm = !1;
		}
		initialize() {
			this.startIfEnabled();
		}
		startIfEnabled() {
			if (!this._instance.config.capture_webmcp || this.gm) return;
			const t = null == s ? void 0 : s.modelContext;
			if (!t || !T(t.registerTool)) return;
			const i = df.get(t);
			if (i) return i.instances.add(this._instance), void (this.gm = !0);
			const e = { instances: /* @__PURE__ */ new Set([this._instance]) }, n = t.registerTool, r = this;
			gc(t, "registerTool", (t) => {
				const i = t;
				return function(t, ...s) {
					let n = t;
					try {
						n = r.ym(t, e);
					} catch (e) {
						return i.call(this, t, ...s);
					}
					return i.call(this, n, ...s);
				};
			}), t.registerTool !== n && (df.set(t, e), this.gm = !0);
		}
		ym(t, i) {
			if (!t || !T(t.execute)) return t;
			const e = t.execute, s = this, { tool: n, injected: r } = function(t, i) {
				const e = {
					intent: !1,
					model: !1
				}, s = t.inputSchema;
				if (!function(t) {
					return !!C(t) || P(t) && Object.keys(t).every((t) => vf.has(t) || t.startsWith("x-")) && !0 !== t.additionalProperties && !P(t.additionalProperties) && (!t.type || "object" === t.type) && (!t.properties || P(t.properties)) && (!t.required || k(t.required));
				}(s)) return {
					tool: mf(t),
					injected: e
				};
				const n = (null == s ? void 0 : s.properties) || {}, r = (t) => _f(n, t) || k(null == s ? void 0 : s.required) && s.required.includes(t);
				if (e.intent = i.intent && !r("context"), e.model = i.model && !r("llm_model"), !e.intent && !e.model) return {
					tool: mf(t),
					injected: e
				};
				const o = bi({}, n), l = k(null == s ? void 0 : s.required) ? [...s.required] : [];
				return e.intent && (o.context = {
					type: "string",
					description: "Explain why this tool is called and how it supports the user's goal. Describe the abstract purpose only. Do not include personal or identifying information. Generalize specific entities as roles such as \"a customer\"."
				}, l.includes("context") || l.push("context")), e.model && (o.llm_model = {
					type: "string",
					description: "The model identifier you are running as, for example \"claude-opus-4-8\" or \"gpt-5.2\". Pass \"unknown\" if you are not certain. Recorded for the site developer's analytics."
				}, l.includes("llm_model") || l.push("llm_model")), {
					tool: mf(t, bi(bi({}, s), {}, {
						type: (null == s ? void 0 : s.type) || "object",
						properties: o,
						required: l
					})),
					injected: e
				};
			}(t, function(t) {
				const i = {
					intent: !1,
					model: !1
				};
				for (const e of t.instances) {
					const t = gf(e.config.capture_webmcp);
					i.intent || (i.intent = !0 === (null == t ? void 0 : t.intent)), i.model || (i.model = !0 === (null == t ? void 0 : t.model));
				}
				return i;
			}(i));
			return Object.defineProperty(n, "execute", {
				configurable: !0,
				enumerable: !0,
				writable: !0,
				value(...o) {
					const l = /* @__PURE__ */ new Date(), a = function(t, i) {
						if (!P(t)) return {};
						try {
							const e = i.intent ? yf(t.context, 2048, !0) : void 0, s = i.model ? yf(t.llm_model, 256) : void 0;
							return bi(bi({}, e && "{}" !== e ? { intent: e } : {}), s && "unknown" !== s.toLowerCase() ? { model: s } : {});
						} catch (t) {
							return {};
						}
					}(o[0], r), u = function(t, i) {
						const e = t[0];
						if (!P(e)) return t;
						try {
							const s = i.intent && _f(e, "context"), n = i.model && _f(e, "llm_model");
							if (!s && !n) return t;
							const r = bi({}, e);
							return s && delete r.context, n && delete r.llm_model, [r, ...t.slice(1)];
						} catch (i) {
							return t;
						}
					}(o, r);
					let h;
					try {
						h = e.apply(this === n ? t : this, u);
					} catch (t) {
						throw s.bm(i, n, l, {
							error: t,
							errorResult: !1
						}, a), t;
					}
					if ((c = h) && "function" == typeof c.then) return Promise.resolve(h).then((t) => {
						const e = bf(t) ? {
							error: t,
							errorResult: !0
						} : void 0;
						return s.bm(i, n, l, e, a), t;
					}, (t) => {
						throw s.bm(i, n, l, {
							error: t,
							errorResult: !1
						}, a), t;
					});
					var c;
					const d = bf(h) ? {
						error: h,
						errorResult: !0
					} : void 0;
					return s.bm(i, n, l, d, a), h;
				}
			}), n;
		}
		bm(t, i, e, s, r) {
			const o = Date.now() - e.getTime();
			let l;
			for (const u of t.instances) {
				var a;
				const t = gf(u.config.capture_webmcp);
				if (t) {
					s && !l && (l = Ef(s.error, s.errorResult));
					try {
						u.capture("$mcp_tool_call", bi(bi(bi({
							$mcp_source: "posthog_mcp_analytics",
							$mcp_interface: "webmcp",
							$mcp_tool_name: i.name,
							$mcp_resource_name: i.name,
							$mcp_tool_description: i.description,
							$mcp_server_name: null == n ? void 0 : n.hostname,
							$mcp_duration_ms: o,
							$mcp_is_error: !!s
						}, l ? {
							$mcp_error_type: l.type,
							$mcp_error_message: l.message
						} : {}), t.intent && r.intent ? {
							$mcp_intent: r.intent,
							$mcp_intent_source: "context_parameter"
						} : {}), t.model && r.model ? {
							$mcp_llm_model: r.model,
							$mcp_llm_model_source: "self_reported"
						} : {}), { timestamp: e });
					} catch (t) {
						continue;
					}
					if (s && l && u.exceptions && (null === (a = u.exceptionObserver) || void 0 === a ? void 0 : a.isEnabled)) try {
						const t = {
							$exception_list: Sf(u.exceptions, s, l.message),
							$exception_level: "error",
							$exception_source: "mcp.tool_call",
							$mcp_interface: "webmcp",
							$mcp_tool_name: i.name,
							$mcp_resource_name: i.name,
							$mcp_tool_description: i.description,
							$mcp_server_name: null == n ? void 0 : n.hostname
						};
						u.exceptionObserver.captureException(t);
					} catch (t) {}
				}
			}
		}
	}
});
var Tf = function() {
	rn.SDK_DIST_CHANNEL = "npm";
	const i = Hh[sc] = new hc();
	return function() {
		function i() {
			i.done || (i.done = !0, qu = !1, Gr(Hh, function(t) {
				t._dom_loaded();
			}));
		}
		(null == s ? void 0 : s.addEventListener) ? "complete" === s.readyState ? i() : io(s, "DOMContentLoaded", i, { capture: !1 }) : t && Ws.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized");
	}(), i;
}();
//#endregion
//#region node_modules/@posthog/react/dist/esm/index.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __extends = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var __setFunctionName = function(f, name, prefix) {
	if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
	return Object.defineProperty(f, "name", {
		configurable: true,
		value: prefix ? "".concat(prefix, " ", name) : name
	});
};
var _a;
var GLOBAL_KEY = "__POSTHOG_REACT_SHARED_STATE__";
var globalObject = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : {};
var statesByReact;
try {
	statesByReact = globalObject[GLOBAL_KEY] = globalObject[GLOBAL_KEY] || /* @__PURE__ */ new WeakMap();
} catch (_b) {
	statesByReact = /* @__PURE__ */ new WeakMap();
}
if (!statesByReact.has(import_react.createContext)) statesByReact.set(import_react.createContext, {});
var sharedState = statesByReact.get(import_react.createContext);
var defaultPostHogInstance;
function setDefaultPostHogInstance(instance) {
	if (!sharedState.defaultPostHogInstance || sharedState.defaultPostHogInstance === defaultPostHogInstance) sharedState.defaultPostHogInstance = instance;
	defaultPostHogInstance = instance;
}
function getDefaultPostHogInstance() {
	return defaultPostHogInstance;
}
if (!sharedState.context) sharedState.context = (0, import_react.createContext)({
	get client() {
		return getDefaultPostHogInstance() || sharedState.defaultPostHogInstance;
	},
	bootstrap: void 0
});
var PostHogContext = sharedState.context;
function isDeepEqual(obj1, obj2, visited) {
	if (visited === void 0) visited = /* @__PURE__ */ new WeakMap();
	if (obj1 === obj2) return true;
	if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) return false;
	if (visited.has(obj1) && visited.get(obj1) === obj2) return true;
	visited.set(obj1, obj2);
	var keys1 = Object.keys(obj1);
	var keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (var _i = 0, keys1_1 = keys1; _i < keys1_1.length; _i++) {
		var key = keys1_1[_i];
		if (!keys2.includes(key)) return false;
		if (!isDeepEqual(obj1[key], obj2[key], visited)) return false;
	}
	return true;
}
function PostHogProvider(_b) {
	var _c, _d;
	var children = _b.children, client = _b.client, apiKey = _b.apiKey, options = _b.options;
	var previousInitializationRef = (0, import_react.useRef)(null);
	var posthog = (0, import_react.useMemo)(function() {
		if (client) {
			if (apiKey) console.warn("[PostHog.js] You have provided both `client` and `apiKey` to `PostHogProvider`. `apiKey` will be ignored in favour of `client`.");
			if (options) console.warn("[PostHog.js] You have provided both `client` and `options` to `PostHogProvider`. `options` will be ignored in favour of `client`.");
			return client;
		}
		var defaultInstance = getDefaultPostHogInstance();
		if (apiKey) return defaultInstance;
		console.warn("[PostHog.js] No `apiKey` or `client` were provided to `PostHogProvider`. Using default global `window.posthog` instance. You must initialize it manually. This is not recommended behavior.");
		return defaultInstance;
	}, [
		client,
		apiKey,
		JSON.stringify(options)
	]);
	(0, import_react.useEffect)(function() {
		if (client || !apiKey) return;
		var defaultInstance = getDefaultPostHogInstance();
		var previousInitialization = previousInitializationRef.current;
		if (!previousInitialization) {
			if (defaultInstance.__loaded) console.warn("[PostHog.js] `posthog` was already loaded elsewhere. This may cause issues.");
			defaultInstance.init(apiKey, options);
			previousInitializationRef.current = {
				apiKey,
				options: options !== null && options !== void 0 ? options : {}
			};
		} else {
			if (apiKey !== previousInitialization.apiKey) console.warn("[PostHog.js] You have provided a different `apiKey` to `PostHogProvider` than the one that was already initialized. This is not supported by our provider and we'll keep using the previous key. If you need to toggle between API Keys you need to control the `client` yourself and pass it in as a prop rather than an `apiKey` prop.");
			if (options && !isDeepEqual(options, previousInitialization.options)) defaultInstance.set_config(options);
			previousInitializationRef.current = {
				apiKey,
				options: options !== null && options !== void 0 ? options : {}
			};
		}
	}, [
		client,
		apiKey,
		JSON.stringify(options)
	]);
	return import_react.createElement(PostHogContext.Provider, { value: {
		client: posthog,
		bootstrap: (_c = options === null || options === void 0 ? void 0 : options.bootstrap) !== null && _c !== void 0 ? _c : (_d = client === null || client === void 0 ? void 0 : client.config) === null || _d === void 0 ? void 0 : _d.bootstrap
	} }, children);
}
var isFunction = function(f) {
	return typeof f === "function";
};
var isUndefined = function(x) {
	return x === void 0;
};
var usePostHog = function() {
	return (0, import_react.useContext)(PostHogContext).client;
};
var isError = function(value) {
	var tag = Object.prototype.toString.call(value);
	return value instanceof Error || tag === "[object Error]" || tag === "[object Exception]" || tag === "[object DOMException]" || tag === "[object DOMError]";
};
var defineErrorName = function(error, name) {
	try {
		Object.defineProperty(error, "name", {
			value: name,
			writable: true,
			enumerable: true,
			configurable: true
		});
	} catch (_b) {}
};
var setCause = function(error, cause) {
	var seenErrors = /* @__PURE__ */ new WeakSet();
	var currentError = error;
	while (!seenErrors.has(currentError)) {
		seenErrors.add(currentError);
		if (!isError(currentError.cause)) {
			if (!isUndefined(currentError.cause)) cause.cause = currentError.cause;
			currentError.cause = cause;
			return;
		}
		currentError = currentError.cause;
	}
};
var addReactComponentStack = function(error, componentStack) {
	if (!componentStack) return error;
	var componentStackError = new Error(isError(error) ? error.message : "Primitive value captured as exception: ".concat(String(error)));
	defineErrorName(componentStackError, "React ErrorBoundary ".concat(isError(error) ? error.name : "Error"));
	componentStackError.stack = componentStack;
	if (isError(error)) {
		setCause(error, componentStackError);
		return error;
	}
	return componentStackError;
};
var INITIAL_STATE = {
	componentStack: null,
	exceptionEvent: null,
	error: null
};
var __POSTHOG_ERROR_MESSAGES = { INVALID_FALLBACK: "[PostHog.js][PostHogErrorBoundary] Invalid fallback prop, provide a valid React element or a function that returns a valid React element." };
var PostHogErrorBoundary = (_a = function(_super) {
	__extends(class_1, _super);
	function class_1(props) {
		var _this = _super.call(this, props) || this;
		_this._resetError = function() {
			_this.setState(INITIAL_STATE);
		};
		_this.state = INITIAL_STATE;
		return _this;
	}
	class_1.prototype.componentDidCatch = function(error, errorInfo) {
		var additionalProperties = this.props.additionalProperties;
		var currentProperties;
		if (isFunction(additionalProperties)) currentProperties = additionalProperties(error, errorInfo);
		else if (typeof additionalProperties === "object") currentProperties = additionalProperties;
		var client = this.context.client;
		var componentStack = errorInfo.componentStack;
		var exceptionEvent = client.captureException(addReactComponentStack(error, componentStack), currentProperties);
		this.setState({
			error,
			componentStack: componentStack !== null && componentStack !== void 0 ? componentStack : null,
			exceptionEvent
		});
	};
	class_1.prototype.render = function() {
		var _b = this.props, children = _b.children, fallback = _b.fallback;
		var state = this.state;
		if (state.componentStack == null) return isFunction(children) ? children() : children;
		var element = isFunction(fallback) ? import_react.createElement(fallback, {
			error: state.error,
			componentStack: state.componentStack,
			exceptionEvent: state.exceptionEvent,
			resetError: this._resetError
		}) : fallback;
		if (import_react.isValidElement(element)) return element;
		console.warn(__POSTHOG_ERROR_MESSAGES.INVALID_FALLBACK);
		return import_react.createElement(import_react.Fragment, null);
	};
	return class_1;
}(import_react.Component), __setFunctionName(_a, "PostHogErrorBoundary"), (function() {
	_a.contextType = PostHogContext;
})(), _a);
setDefaultPostHogInstance(Tf);
//#endregion
export { require_react as i, PostHogProvider as n, usePostHog as r, PostHogErrorBoundary as t };
