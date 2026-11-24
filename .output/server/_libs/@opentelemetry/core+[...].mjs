import { l as createContextKey, n as diag } from "../opentelemetry__api+unenv.mjs";
//#region node_modules/unenv/dist/runtime/_internal/utils.mjs
/* @__NO_SIDE_EFFECTS__ */
function createNotImplementedError(name) {
	return /* @__PURE__ */ new Error(`[unenv] ${name} is not implemented yet!`);
}
//#endregion
//#region node_modules/unenv/dist/runtime/web/performance/_polyfills.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var _supportedEntryTypes = [
	"event",
	"mark",
	"measure",
	"resource"
];
var _PerformanceEntry = class {
	__unenv__ = true;
	detail;
	entryType = "event";
	name;
	startTime;
	constructor(name, options) {
		this.name = name;
		this.startTime = options?.startTime || _performanceNow();
		this.detail = options?.detail;
	}
	get duration() {
		return _performanceNow() - this.startTime;
	}
	toJSON() {
		return {
			name: this.name,
			entryType: this.entryType,
			startTime: this.startTime,
			duration: this.duration,
			detail: this.detail
		};
	}
};
var _PerformanceMark = class extends _PerformanceEntry {
	entryType = "mark";
};
var _PerformanceMeasure = class extends _PerformanceEntry {
	entryType = "measure";
};
var _PerformanceResourceTiming = class extends _PerformanceEntry {
	entryType = "resource";
	serverTiming = [];
	connectEnd = 0;
	connectStart = 0;
	decodedBodySize = 0;
	domainLookupEnd = 0;
	domainLookupStart = 0;
	encodedBodySize = 0;
	fetchStart = 0;
	initiatorType = "";
	name = "";
	nextHopProtocol = "";
	redirectEnd = 0;
	redirectStart = 0;
	requestStart = 0;
	responseEnd = 0;
	responseStart = 0;
	secureConnectionStart = 0;
	startTime = 0;
	transferSize = 0;
	workerStart = 0;
	responseStatus = 0;
};
var _PerformanceObserver = class {
	__unenv__ = true;
	static supportedEntryTypes = _supportedEntryTypes;
	_callback = null;
	constructor(callback) {
		this._callback = callback;
	}
	takeRecords() {
		return [];
	}
	disconnect() {
		throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.disconnect");
	}
	observe(options) {
		throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.observe");
	}
};
var _PerformanceObserverEntryList = class {
	__unenv__ = true;
	getEntries() {
		return [];
	}
	getEntriesByName(_name, _type) {
		return [];
	}
	getEntriesByType(type) {
		return [];
	}
};
var _Performance = class {
	__unenv__ = true;
	timeOrigin = _timeOrigin;
	eventCounts = /* @__PURE__ */ new Map();
	_entries = [];
	_resourceTimingBufferSize = 0;
	navigation = void 0;
	timing = void 0;
	onresourcetimingbufferfull = null;
	now() {
		if (this.timeOrigin === _timeOrigin) return _performanceNow();
		return Date.now() - this.timeOrigin;
	}
	clearMarks(markName) {
		this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
	}
	clearMeasures(measureName) {
		this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
	}
	clearResourceTimings() {
		this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
	}
	getEntries() {
		return this._entries;
	}
	getEntriesByName(name, type) {
		return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
	}
	getEntriesByType(type) {
		return this._entries.filter((e) => e.entryType === type);
	}
	mark(name, options) {
		const entry = new _PerformanceMark(name, options);
		this._entries.push(entry);
		return entry;
	}
	measure(measureName, startOrMeasureOptions, endMark) {
		let start;
		let end;
		if (typeof startOrMeasureOptions === "string") {
			start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
			end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
		} else {
			start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
			end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
		}
		const entry = new _PerformanceMeasure(measureName, {
			startTime: start,
			detail: {
				start,
				end
			}
		});
		this._entries.push(entry);
		return entry;
	}
	setResourceTimingBufferSize(maxSize) {
		this._resourceTimingBufferSize = maxSize;
	}
	toJSON() {
		return this;
	}
	addEventListener(type, listener, options) {
		throw /* @__PURE__ */ createNotImplementedError("Performance.addEventListener");
	}
	removeEventListener(type, listener, options) {
		throw /* @__PURE__ */ createNotImplementedError("Performance.removeEventListener");
	}
	dispatchEvent(event) {
		throw /* @__PURE__ */ createNotImplementedError("Performance.dispatchEvent");
	}
};
//#endregion
//#region node_modules/unenv/dist/runtime/web/performance/index.mjs
var PerformanceEntry = globalThis.PerformanceEntry || _PerformanceEntry;
var PerformanceMark = globalThis.PerformanceMark || _PerformanceMark;
var PerformanceMeasure = globalThis.PerformanceMeasure || _PerformanceMeasure;
var PerformanceResourceTiming = globalThis.PerformanceResourceTiming || _PerformanceResourceTiming;
var PerformanceObserver = globalThis.PerformanceObserver || _PerformanceObserver;
var Performance = globalThis.Performance || _Performance;
var PerformanceObserverEntryList = globalThis.PerformanceObserverEntryList || _PerformanceObserverEntryList;
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new _Performance();
//#endregion
//#region node_modules/unenv/dist/runtime/polyfill/performance.mjs
globalThis.performance ||= performance;
globalThis.Performance ||= Performance;
globalThis.PerformanceEntry ||= PerformanceEntry;
globalThis.PerformanceMark ||= PerformanceMark;
globalThis.PerformanceMeasure ||= PerformanceMeasure;
globalThis.PerformanceObserver ||= PerformanceObserver;
globalThis.PerformanceObserverEntryList ||= PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming ||= PerformanceResourceTiming;
var performance_default = globalThis.performance;
//#endregion
//#region node_modules/@opentelemetry/core/dist/trace/suppress-tracing.mjs
var SUPPRESS_TRACING_KEY = createContextKey("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
function suppressTracing(context) {
	return context.setValue(SUPPRESS_TRACING_KEY, true);
}
//#endregion
//#region node_modules/@opentelemetry/core/dist/common/attributes.mjs
var AddAttributeDecision = /* @__PURE__ */ function(AddAttributeDecision) {
	AddAttributeDecision[AddAttributeDecision["DROP_UNDEFINED"] = 0] = "DROP_UNDEFINED";
	AddAttributeDecision[AddAttributeDecision["DROP_INVALID"] = 1] = "DROP_INVALID";
	AddAttributeDecision[AddAttributeDecision["DROP_LIMIT_REACHED"] = 2] = "DROP_LIMIT_REACHED";
	AddAttributeDecision[AddAttributeDecision["ADD_NEW"] = 3] = "ADD_NEW";
	AddAttributeDecision[AddAttributeDecision["ADD_OVERWRITE_EXISTING"] = 4] = "ADD_OVERWRITE_EXISTING";
	return AddAttributeDecision;
}({});
/**
* Maybe add the `key`/`val` attribute to the given `attributes`.
* - "Maybe" because this ensures the `key` is valid (the string is not empty),
*   the `val` is an accepted spec AnyValue type (see `isAnyValue` below),
*   and the attribute does not need to be dropped because of a count limit.
*   Note that the TypeScript `AnyValue` type is *looser* than the spec
*   `AnyValue`.
* - This also applies attribute count and value length limits.
* - This returns an `AddAttributeDecision` enum value indicating whether,
*   why, and how the attribute was added. This can be relevant for the
*   caller updating metrics (e.g. `droppedAttributesCount`).
*/
function maybeAddAttribute(opts) {
	return maybeAddAttributeInternal(opts, isAnyValue);
}
function maybeAddAttributeInternal(opts, isValidValue) {
	if (opts.value === void 0) return 0;
	if (opts.key.length === 0) {
		diag.warn(`Invalid attribute key: ${opts.key}`);
		return 1;
	}
	const isNewKey = !Object.hasOwn(opts.attributes, opts.key);
	if (isNewKey && opts.currentAttributesCount >= opts.limits.attributeCountLimit) return 2;
	if (!isValidValue(opts.value)) {
		diag.warn(`Invalid attribute value set for key: ${opts.key}`);
		return 1;
	}
	let attributeValueLengthLimit = opts.limits.attributeValueLengthLimit;
	if (attributeValueLengthLimit <= 0) {
		diag.warn(`Invalid attributeValueLengthLimit: must be positive, got ${attributeValueLengthLimit} (ignoring)`);
		attributeValueLengthLimit = Infinity;
	}
	opts.attributes[opts.key] = copyAndTruncAnyValue(opts.value, attributeValueLengthLimit);
	if (isNewKey) return 3;
	return 4;
}
/**
* A version of `cleanAttributes` that limits allowed attribute value types to
* "simple" types (`SimpleAttributeValue`).
*/
function cleanSimpleAttributes(inAttributes, limits) {
	return cleanAttributesInternal(inAttributes, limits, isSimpleAttributeValue);
}
function cleanAttributesInternal(inAttributes, limits, isValidValue) {
	if (typeof inAttributes !== "object" || inAttributes == null) return {};
	const attributes = {};
	let droppedAttributesCount = 0;
	let attributeValueLengthLimit = limits.attributeValueLengthLimit;
	if (attributeValueLengthLimit <= 0) {
		diag.warn(`Invalid attributeValueLengthLimit: must be positive, got ${attributeValueLengthLimit} (ignoring)`);
		attributeValueLengthLimit = Infinity;
	}
	let count = 0;
	for (const [key, val] of Object.entries(inAttributes)) {
		if (val === void 0) continue;
		if (count >= limits.attributeCountLimit) {
			droppedAttributesCount++;
			continue;
		}
		if (key.length === 0) {
			diag.warn(`Invalid attribute key: ${key}`);
			droppedAttributesCount++;
			continue;
		}
		if (!isValidValue(val)) {
			diag.warn(`Invalid attribute value set for key: ${key}`);
			droppedAttributesCount++;
			continue;
		}
		attributes[key] = copyAndTruncAnyValue(val, attributeValueLengthLimit);
		count++;
	}
	return {
		attributes,
		droppedAttributesCount
	};
}
/**
* Returns true iff the given value is a supported AnyValue per
* https://opentelemetry.io/docs/specs/otel/common/#anyvalue
*
* - Primitives/scalars: string, boolean, number
*   (Note that this *excludes* BigInt and Symbol)
* - Byte arrays (Uint8Array, Buffer)
* - Arrays of AnyValue (heterogeneous arrays allowed)
* - Maps from string to AnyValue (nested objects)
* - Empty values (null)
*
* Notes:
* - `undefined` is *not* considered an AnyValue.
*
* @param val
* @returns true if the value is a valid AnyValue, false otherwise
*/
function isAnyValue(val) {
	return isAnyValueInternal(val, /* @__PURE__ */ new WeakSet());
}
function isAnyValueInternal(val, visited) {
	switch (typeof val) {
		case "undefined":
		case "bigint":
		case "symbol":
		case "function": return false;
		case "string":
		case "number":
		case "boolean": return true;
		case "object": break;
		default: return false;
	}
	if (val === null) return true;
	if (val instanceof Uint8Array) return true;
	if (visited.has(val)) return false;
	visited.add(val);
	const isValid = isAnyValueObject(val, visited);
	visited.delete(val);
	return isValid;
}
function isAnyValueObject(val, visited) {
	if (Array.isArray(val)) {
		for (const item of val) if (item !== void 0 && !isAnyValueInternal(item, visited)) return false;
		return true;
	}
	const obj = val;
	if (obj.constructor !== Object && obj.constructor !== void 0) return false;
	for (const k of Object.keys(obj)) {
		const v = obj[k];
		if (v !== void 0 && !isAnyValueInternal(v, visited)) return false;
	}
	return true;
}
/**
* Attribute value length limiting/truncation per:
* https://opentelemetry.io/docs/specs/otel/common/#attribute-limits
*
* For arrays and objects, this also returns a deep copy to avoid mutating data
* passed in by calling code.
*
* @param {AnyValue} val - The attribute value. We are assuming this has
*    already been guarded by `isAnyValue`. This filters out non-plain objects,
*    like RegExp & Date, and circular references.
*/
function copyAndTruncAnyValue(val, limit) {
	switch (typeof val) {
		case "number":
		case "boolean":
		case "undefined":
		case "bigint":
		case "symbol":
		case "function": return val;
		case "string": if (val.length <= limit) return val;
		else return val.substring(0, limit);
		case "object": break;
		default: return val;
	}
	if (val === null) return val;
	if (val instanceof Uint8Array) if (val.length <= limit) return val;
	else return val.slice(0, limit);
	if (Array.isArray(val)) return val.map((elem) => copyAndTruncAnyValue(elem, limit));
	const truncObj = {};
	const obj = val;
	for (const k of Object.keys(obj)) if (obj[k] !== void 0) truncObj[k] = copyAndTruncAnyValue(obj[k], limit);
	return truncObj;
}
function isSimpleAttributeValue(val) {
	if (Array.isArray(val)) return isHomogeneousAttributeValueArray(val);
	return isValidPrimitiveAttributeValueType(typeof val);
}
function isHomogeneousAttributeValueArray(arr) {
	let type;
	for (const element of arr) {
		if (element == null) continue;
		const elementType = typeof element;
		if (elementType === type) continue;
		if (!type) {
			if (isValidPrimitiveAttributeValueType(elementType)) {
				type = elementType;
				continue;
			}
			return false;
		}
		return false;
	}
	return true;
}
function isValidPrimitiveAttributeValueType(valType) {
	switch (valType) {
		case "number":
		case "boolean":
		case "string": return true;
	}
	return false;
}
//#endregion
//#region node_modules/@opentelemetry/core/dist/common/logging-error-handler.mjs
/**
* Returns a function that logs an error using the provided logger, or a
* console logger if one was not provided.
*/
function loggingErrorHandler() {
	return (ex) => {
		diag.error(stringifyException(ex));
	};
}
/**
* Converts an exception into a string representation
* @param {Exception} ex
*/
function stringifyException(ex) {
	if (typeof ex === "string") return ex;
	else return JSON.stringify(flattenException(ex));
}
/**
* Flattens an exception into key-value pairs by traversing the prototype chain
* and coercing values to strings. Duplicate properties will not be overwritten;
* the first insert wins.
*/
function flattenException(ex) {
	const result = {};
	let current = ex;
	while (current !== null) {
		Object.getOwnPropertyNames(current).forEach((propertyName) => {
			if (result[propertyName]) return;
			const value = current[propertyName];
			if (value) result[propertyName] = String(value);
		});
		current = Object.getPrototypeOf(current);
	}
	return result;
}
//#endregion
//#region node_modules/@opentelemetry/core/dist/common/global-error-handler.mjs
/** The global error handler delegate */
var delegateHandler = loggingErrorHandler();
/**
* Return the global error handler
* @param {Exception} ex
*/
function globalErrorHandler(ex) {
	try {
		delegateHandler(ex);
	} catch {}
}
//#endregion
//#region node_modules/@opentelemetry/core/dist/common/time.mjs
var NANOSECOND_DIGITS = 9;
var MILLISECONDS_TO_NANOSECONDS = Math.pow(10, 6);
var SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
/**
* Converts a number of milliseconds from epoch to HrTime([seconds, remainder in nanoseconds]).
* @param epochMillis
*/
function millisToHrTime(epochMillis) {
	const epochSeconds = epochMillis / 1e3;
	return [Math.trunc(epochSeconds), Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS)];
}
/**
* Returns an hrtime calculated via performance component.
* @param performanceNow
*/
function hrTime(performanceNow) {
	return addHrTimes(millisToHrTime(performance_default.timeOrigin), millisToHrTime(typeof performanceNow === "number" ? performanceNow : performance_default.now()));
}
/**
*
* Converts a TimeInput to an HrTime, defaults to _hrtime().
* @param time
*/
function timeInputToHrTime(time) {
	if (isTimeInputHrTime(time)) return time;
	else if (typeof time === "number") if (time < performance_default.timeOrigin / 2) return hrTime(time);
	else return millisToHrTime(time);
	else if (time instanceof Date) return millisToHrTime(time.getTime());
	else throw TypeError("Invalid input type");
}
/**
* Returns a duration of two hrTime.
* @param startTime
* @param endTime
*/
function hrTimeDuration(startTime, endTime) {
	let seconds = endTime[0] - startTime[0];
	let nanos = endTime[1] - startTime[1];
	if (nanos < 0) {
		seconds -= 1;
		nanos += SECOND_TO_NANOSECONDS;
	}
	return [seconds, nanos];
}
/**
* Convert hrTime to nanoseconds.
* @param time
*/
function hrTimeToNanoseconds(time) {
	return time[0] * SECOND_TO_NANOSECONDS + time[1];
}
/**
* Convert hrTime to milliseconds.
* @param time
*/
function hrTimeToMilliseconds(time) {
	return time[0] * 1e3 + time[1] / 1e6;
}
/**
* check if time is HrTime
* @param value
*/
function isTimeInputHrTime(value) {
	return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
}
/**
* Given 2 HrTime formatted times, return their sum as an HrTime.
*/
function addHrTimes(time1, time2) {
	const out = [time1[0] + time2[0], time1[1] + time2[1]];
	if (out[1] >= SECOND_TO_NANOSECONDS) {
		out[1] -= SECOND_TO_NANOSECONDS;
		out[0] += 1;
	}
	return out;
}
//#endregion
//#region node_modules/@opentelemetry/core/dist/ExportResult.mjs
var ExportResultCode = /* @__PURE__ */ function(ExportResultCode) {
	ExportResultCode[ExportResultCode["SUCCESS"] = 0] = "SUCCESS";
	ExportResultCode[ExportResultCode["FAILED"] = 1] = "FAILED";
	return ExportResultCode;
}({});
//#endregion
//#region node_modules/@opentelemetry/core/dist/utils/timeout.mjs
/**
* Error that is thrown on timeouts.
*/
var TimeoutError = class TimeoutError extends Error {
	constructor(message) {
		super(message);
		Object.setPrototypeOf(this, TimeoutError.prototype);
	}
};
/**
* Adds a timeout to a promise and rejects if the specified timeout has elapsed. Also rejects if the specified promise
* rejects, and resolves if the specified promise resolves.
*
* <p> NOTE: this operation will continue even after it throws a {@link TimeoutError}.
*
* @param promise promise to use with timeout.
* @param timeout the timeout in milliseconds until the returned promise is rejected.
*/
function callWithTimeout(promise, timeout) {
	let timeoutHandle;
	const timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
		timeoutHandle = setTimeout(function timeoutHandler() {
			reject(new TimeoutError("Operation timed out."));
		}, timeout);
	});
	return Promise.race([promise, timeoutPromise]).then((result) => {
		clearTimeout(timeoutHandle);
		return result;
	}, (reason) => {
		clearTimeout(timeoutHandle);
		throw reason;
	});
}
//#endregion
//#region node_modules/@opentelemetry/core/dist/utils/promise.mjs
var Deferred = class {
	_promise;
	_resolve;
	_reject;
	constructor() {
		this._promise = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
	}
	get promise() {
		return this._promise;
	}
	resolve(val) {
		this._resolve(val);
	}
	reject(err) {
		this._reject(err);
	}
};
//#endregion
//#region node_modules/@opentelemetry/core/dist/utils/callback.mjs
/**
* Bind the callback and only invoke the callback once regardless how many times `BindOnceFuture.call` is invoked.
*/
var BindOnceFuture = class {
	_isCalled = false;
	_deferred = new Deferred();
	_callback;
	_that;
	constructor(callback, that) {
		this._callback = callback;
		this._that = that;
	}
	get isCalled() {
		return this._isCalled;
	}
	get promise() {
		return this._deferred.promise;
	}
	call(...args) {
		if (!this._isCalled) {
			this._isCalled = true;
			try {
				Promise.resolve(this._callback.call(this._that, ...args)).then((val) => this._deferred.resolve(val), (err) => this._deferred.reject(err));
			} catch (err) {
				this._deferred.reject(err);
			}
		}
		return this._deferred.promise;
	}
};
//#endregion
//#region node_modules/@opentelemetry/core/dist/version.mjs
var VERSION = "3.1.1";
//#endregion
//#region node_modules/@opentelemetry/core/dist/semconv.mjs
/**
* The name of the runtime of this process.
*
* @example OpenJDK Runtime Environment
*
* @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var ATTR_PROCESS_RUNTIME_NAME = "process.runtime.name";
//#endregion
//#region node_modules/@opentelemetry/semantic-conventions/dist/stable_attributes.mjs
/**
* The exception message.
*
* @example Division by zero
* @example Can't convert 'int' object to str implicitly
*
* @note > [!WARNING]
*
* > This attribute may contain sensitive information.
*/
var ATTR_EXCEPTION_MESSAGE = "exception.message";
/**
* A stacktrace as a string in the natural representation for the language runtime. The representation is to be determined and documented by each language SIG.
*
* @example "Exception in thread "main" java.lang.RuntimeException: Test exception\\n at com.example.GenerateTrace.methodB(GenerateTrace.java:13)\\n at com.example.GenerateTrace.methodA(GenerateTrace.java:9)\\n at com.example.GenerateTrace.main(GenerateTrace.java:5)\\n"
*/
var ATTR_EXCEPTION_STACKTRACE = "exception.stacktrace";
/**
* The type of the exception (its fully-qualified class name, if applicable). The dynamic type of the exception should be preferred over the static type in languages that support it.
*
* @example java.net.ConnectException
* @example OSError
*
* @note If the recorded exception type is a wrapper that is not meaningful for
* failure classification, instrumentation **MAY** use the type of the inner
* exception instead. For example, in Go, errors created with `fmt.Errorf`
* using `%w` **MAY** be unwrapped when the wrapper type does not help
* classify the failure.
*/
var ATTR_EXCEPTION_TYPE = "exception.type";
/**
* Logical name of the service.
*
* @example shoppingcart
*
* @note **MUST** be the same for all instances of horizontally scaled services. If the value was not specified, SDKs **MUST** fallback to `unknown_service:` concatenated with the process executable name, e.g. `unknown_service:bash`. If the process executable name is not available, the value **MUST** be set to `unknown_service`.
* The process executable name is the name of the process executable, the same value as described by the [`process.executable.name`](process.md) resource attribute.
*/
var ATTR_SERVICE_NAME = "service.name";
/**
* The language of the telemetry SDK.
*/
var ATTR_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
/**
* Enum value "webjs" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
*
* [Browser](https://opentelemetry.io/docs/languages/js/)
*/
var TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = "webjs";
/**
* The name of the telemetry SDK as defined above.
*
* @example opentelemetry
*
* @note The OpenTelemetry SDK **MUST** set the `telemetry.sdk.name` attribute to `opentelemetry`.
* If another SDK, like a fork or a vendor-provided implementation, is used, this SDK **MUST** set the
* `telemetry.sdk.name` attribute to the fully-qualified class or module name of this SDK's main entry point
* or another suitable identifier depending on the language.
* The identifier `opentelemetry` is reserved and **MUST NOT** be used in this case.
* All custom identifiers **SHOULD** be stable across different versions of an implementation.
*/
var ATTR_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
/**
* The version string of the telemetry SDK.
*
* @example 1.2.3
*/
var ATTR_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
//#endregion
//#region node_modules/@opentelemetry/core/dist/platform/browser/sdk-info.mjs
/** Constants describing the SDK in use */
var SDK_INFO = {
	[ATTR_TELEMETRY_SDK_NAME]: "opentelemetry",
	[ATTR_PROCESS_RUNTIME_NAME]: "browser",
	[ATTR_TELEMETRY_SDK_LANGUAGE]: TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS,
	[ATTR_TELEMETRY_SDK_VERSION]: VERSION
};
//#endregion
export { performance_default as C, suppressTracing as S, globalErrorHandler as _, ATTR_SERVICE_NAME as a, isSimpleAttributeValue as b, ATTR_TELEMETRY_SDK_VERSION as c, ExportResultCode as d, hrTime as f, timeInputToHrTime as g, hrTimeToNanoseconds as h, ATTR_EXCEPTION_TYPE as i, BindOnceFuture as l, hrTimeToMilliseconds as m, ATTR_EXCEPTION_MESSAGE as n, ATTR_TELEMETRY_SDK_LANGUAGE as o, hrTimeDuration as p, ATTR_EXCEPTION_STACKTRACE as r, ATTR_TELEMETRY_SDK_NAME as s, SDK_INFO as t, callWithTimeout as u, AddAttributeDecision as v, maybeAddAttribute as x, cleanSimpleAttributes as y };
