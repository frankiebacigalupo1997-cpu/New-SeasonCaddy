import { S as suppressTracing, d as ExportResultCode, f as hrTime, h as hrTimeToNanoseconds, m as hrTimeToMilliseconds, p as hrTimeDuration } from "./core+[...].mjs";
import { c as createNoopMeter, n as diag, r as context } from "../opentelemetry__api+unenv.mjs";
//#region node_modules/@opentelemetry/exporter-logs-otlp-http/dist/semconv.mjs
/**
* Enum value "otlp_http_log_exporter" for attribute {@link ATTR_OTEL_COMPONENT_TYPE}.
*
* OTLP log record exporter over HTTP with protobuf serialization
*
* @experimental This enum value is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_LOG_EXPORTER = "otlp_http_log_exporter";
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/OTLPExporterBase.mjs
var OTLPExporterBase = class {
	_delegate;
	constructor(delegate) {
		this._delegate = delegate;
	}
	/**
	* Export items.
	* @param items
	* @param resultCallback
	*/
	export(items, resultCallback) {
		this._delegate.export(items, resultCallback);
	}
	forceFlush() {
		return this._delegate.forceFlush();
	}
	shutdown() {
		return this._delegate.shutdown();
	}
	setMetrics(metrics) {
		this._delegate.setMetrics(metrics);
	}
};
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/types.mjs
/**
* Interface for handling error
*/
var OTLPExporterError = class extends Error {
	code;
	name = "OTLPExporterError";
	data;
	constructor(message, code, data) {
		super(message);
		this.data = data;
		this.code = code;
	}
};
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/configuration/shared-configuration.mjs
function validateTimeoutMillis(timeoutMillis) {
	if (Number.isFinite(timeoutMillis) && timeoutMillis > 0) return timeoutMillis;
	throw new Error(`Configuration: timeoutMillis is invalid, expected number greater than 0 (actual: '${timeoutMillis}')`);
}
function wrapStaticHeadersInFunction(headers) {
	if (headers == null) return;
	return async () => headers;
}
/**
* @param userProvidedConfiguration  Configuration options provided by the user in code.
* @param fallbackConfiguration Fallback to use when the {@link userProvidedConfiguration} does not specify an option.
* @param defaultConfiguration The defaults as defined by the exporter specification
*/
function mergeOtlpSharedConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration) {
	return {
		timeoutMillis: validateTimeoutMillis(userProvidedConfiguration.timeoutMillis ?? fallbackConfiguration.timeoutMillis ?? defaultConfiguration.timeoutMillis),
		concurrencyLimit: userProvidedConfiguration.concurrencyLimit ?? fallbackConfiguration.concurrencyLimit ?? defaultConfiguration.concurrencyLimit,
		compression: userProvidedConfiguration.compression ?? fallbackConfiguration.compression ?? defaultConfiguration.compression
	};
}
function getSharedConfigurationDefaults() {
	return {
		timeoutMillis: 1e4,
		concurrencyLimit: 30,
		compression: "none"
	};
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/bounded-queue-export-promise-handler.mjs
var BoundedQueueExportPromiseHandler = class {
	_concurrencyLimit;
	_sendingPromises = [];
	/**
	* @param concurrencyLimit maximum promises allowed in a queue at the same time.
	*/
	constructor(concurrencyLimit) {
		this._concurrencyLimit = concurrencyLimit;
	}
	pushPromise(promise) {
		if (this.hasReachedLimit()) throw new Error("Concurrency Limit reached");
		this._sendingPromises.push(promise);
		const popPromise = () => {
			const index = this._sendingPromises.indexOf(promise);
			this._sendingPromises.splice(index, 1);
		};
		promise.then(popPromise, popPromise);
	}
	hasReachedLimit() {
		return this._sendingPromises.length >= this._concurrencyLimit;
	}
	async awaitAll() {
		await Promise.all(this._sendingPromises);
	}
};
/**
* Promise queue for keeping track of export promises. Finished promises will be auto-dequeued.
* Allows for awaiting all promises in the queue.
*/
function createBoundedQueueExportPromiseHandler(options) {
	return new BoundedQueueExportPromiseHandler(options.concurrencyLimit);
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/logging-response-handler.mjs
function isPartialSuccessResponse(response) {
	return Object.prototype.hasOwnProperty.call(response, "partialSuccess");
}
/**
* Default response handler that logs a partial success to the console.
*/
function createLoggingPartialSuccessResponseHandler() {
	return { handleResponse(response) {
		if (response == null || !isPartialSuccessResponse(response) || response.partialSuccess == null || Object.keys(response.partialSuccess).length === 0) return;
		diag.warn("Received Partial Success response:", JSON.stringify(response.partialSuccess));
	} };
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/otlp-export-delegate.mjs
var OTLPExportDelegate = class {
	_metrics;
	_diagLogger;
	_transport;
	_serializer;
	_responseHandler;
	_promiseQueue;
	_timeout;
	constructor(transport, serializer, responseHandler, promiseQueue, metrics, timeout) {
		this._transport = transport;
		this._serializer = serializer;
		this._responseHandler = responseHandler;
		this._promiseQueue = promiseQueue;
		this._timeout = timeout;
		this._diagLogger = diag.createComponentLogger({ namespace: "OTLPExportDelegate" });
		this._metrics = metrics;
	}
	export(internalRepresentation, resultCallback) {
		this._diagLogger.debug("items to be sent", internalRepresentation);
		if (this._promiseQueue.hasReachedLimit()) {
			resultCallback({
				code: ExportResultCode.FAILED,
				error: /* @__PURE__ */ new Error("Concurrent export limit reached")
			});
			return;
		}
		const serializedRequest = this._serializer.serializeRequest(internalRepresentation);
		if (serializedRequest == null) {
			resultCallback({
				code: ExportResultCode.FAILED,
				error: /* @__PURE__ */ new Error("Nothing to send")
			});
			return;
		}
		const finishExport = this._metrics.startExport(internalRepresentation);
		this._promiseQueue.pushPromise(this._transport.send(serializedRequest, this._timeout).then((response) => {
			if (response.status === "success") {
				finishExport(void 0);
				if (response.data != null) try {
					this._responseHandler.handleResponse(this._serializer.deserializeResponse(response.data));
				} catch (e) {
					this._diagLogger.warn("Export succeeded but could not deserialize response - is the response specification compliant?", e, response.data);
				}
				resultCallback({ code: ExportResultCode.SUCCESS });
				return;
			} else if (response.status === "failure" && response.error) {
				finishExport(response.error);
				resultCallback({
					code: ExportResultCode.FAILED,
					error: response.error
				});
				return;
			} else if (response.status === "retryable") {
				finishExport("export_max_retries");
				resultCallback({
					code: ExportResultCode.FAILED,
					error: response.error ?? new OTLPExporterError("Export failed with retryable status")
				});
			} else {
				finishExport("export_failed");
				resultCallback({
					code: ExportResultCode.FAILED,
					error: new OTLPExporterError("Export failed with unknown error")
				});
			}
		}, (reason) => {
			finishExport(reason);
			resultCallback({
				code: ExportResultCode.FAILED,
				error: reason
			});
		}));
	}
	forceFlush() {
		return this._promiseQueue.awaitAll();
	}
	setMetrics(metrics) {
		this._metrics = metrics;
	}
	async shutdown() {
		this._diagLogger.debug("shutdown started");
		await this.forceFlush();
		this._transport.shutdown();
	}
};
/**
* Creates a generic delegate for OTLP exports which only contains parts of the OTLP export that are shared across all
* signals.
*/
function createOtlpExportDelegate(components, settings) {
	return new OTLPExportDelegate(components.transport, components.serializer, createLoggingPartialSuccessResponseHandler(), components.promiseHandler, components.metrics, settings.timeout);
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/otlp-network-export-delegate.mjs
function createOtlpNetworkExportDelegate(options, serializer, metrics, transport) {
	return createOtlpExportDelegate({
		transport,
		serializer,
		promiseHandler: createBoundedQueueExportPromiseHandler(options),
		metrics
	}, { timeout: options.timeoutMillis });
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/semconv.mjs
/**
* [HTTP response status code](https://tools.ietf.org/html/rfc7231#section-6).
*
* @example 200
*/
var ATTR_HTTP_RESPONSE_STATUS_CODE = "http.response.status_code";
/**
* A name uniquely identifying the instance of the OpenTelemetry component within its containing SDK instance.
*
* @example otlp_grpc_span_exporter/0
* @example custom-name
*
* @note Implementations **SHOULD** ensure a low cardinality for this attribute, even across application or SDK restarts.
* E.g. implementations **MUST NOT** use UUIDs as values for this attribute.
*
* Implementations **MAY** achieve these goals by following a `<otel.component.type>/<instance-counter>` pattern, e.g. `batching_span_processor/0`.
* Hereby `otel.component.type` refers to the corresponding attribute value of the component.
*
* The value of `instance-counter` **MAY** be automatically assigned by the component and uniqueness within the enclosing SDK instance **MUST** be guaranteed.
* For example, `<instance-counter>` **MAY** be implemented by using a monotonically increasing counter (starting with `0`), which is incremented every time an
* instance of the given component type is started.
*
* With this implementation, for example the first Batching Span Processor would have `batching_span_processor/0`
* as `otel.component.name`, the second one `batching_span_processor/1` and so on.
* These values will therefore be reused in the case of an application restart.
*
* @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var ATTR_OTEL_COMPONENT_NAME = "otel.component.name";
/**
* A name identifying the type of the OpenTelemetry component.
*
* @example batching_span_processor
* @example com.example.MySpanExporter
*
* @note If none of the standardized values apply, implementations **SHOULD** use the language-defined name of the type.
* E.g. for Java the fully qualified classname **SHOULD** be used in this case.
*
* @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var ATTR_OTEL_COMPONENT_TYPE = "otel.component.type";
/**
* Server domain name if available without reverse DNS lookup; otherwise, IP address or Unix domain socket name.
*
* @example example.com
* @example 10.1.2.80
* @example /tmp/my.sock
*
* @note When observed from the client side, and when communicating through an intermediary, `server.address` **SHOULD** represent the server address behind any intermediaries, for example proxies, if it's available.
*/
var ATTR_SERVER_ADDRESS = "server.address";
/**
* Server port number.
*
* @example 80
* @example 8080
* @example 443
*
* @note When observed from the client side, and when communicating through an intermediary, `server.port` **SHOULD** represent the server port behind any intermediaries, for example proxies, if it's available.
*/
var ATTR_SERVER_PORT = "server.port";
/**
* Describes a class of error the operation ended with.
*
* @example timeout
* @example java.net.UnknownHostException
* @example server_certificate_invalid
* @example 500
*
* @note The `error.type` **SHOULD** be predictable, and **SHOULD** have low cardinality.
*
* When `error.type` is set to a type (e.g., an exception type), its
* canonical class name identifying the type within the artifact **SHOULD** be used.
*
* Instrumentations **SHOULD** document the list of errors they report.
*
* The cardinality of `error.type` within one instrumentation library **SHOULD** be low.
* Telemetry consumers that aggregate data from multiple instrumentation libraries and applications
* should be prepared for `error.type` to have high cardinality at query time when no
* additional filters are applied.
*
* If the operation has completed successfully, instrumentations **SHOULD NOT** set `error.type`.
*
* If a specific domain defines its own set of error identifiers (such as HTTP or RPC status codes),
* it's **RECOMMENDED** to:
*
*   - Use a domain-specific attribute
*   - Set `error.type` to capture all errors, regardless of whether they are defined within the domain-specific set or not.
*/
var ATTR_ERROR_TYPE = "error.type";
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/version.mjs
var VERSION = "0.301.2";
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/ExporterMetrics.mjs
var componentCounter = /* @__PURE__ */ new Map();
/**
* Generates `otel.sdk.exporter.*` metrics.
* https://opentelemetry.io/docs/specs/semconv/otel/sdk-metrics
*/
var ExporterMetrics = class {
	inflight;
	exported;
	duration;
	standardAttrs;
	responseAttributesFromError;
	helper;
	constructor(options) {
		const { componentType, metricsHelper, meterProvider, url, responseAttributesFromError } = options;
		this.responseAttributesFromError = responseAttributesFromError;
		const meter = meterProvider ? meterProvider.getMeter("@opentelemetry/otlp-exporter", VERSION) : createNoopMeter();
		const counter = componentCounter.get(componentType) ?? 0;
		componentCounter.set(componentType, counter + 1);
		this.standardAttrs = {
			[ATTR_OTEL_COMPONENT_TYPE]: componentType,
			[ATTR_OTEL_COMPONENT_NAME]: `${componentType}/${counter}`
		};
		if (url) {
			let urlToParse = url;
			if (!url.includes("://")) urlToParse = `http://${url}`;
			try {
				const parsedUrl = new URL(urlToParse);
				this.standardAttrs[ATTR_SERVER_ADDRESS] = parsedUrl.hostname;
				let port = void 0;
				if (parsedUrl.port) port = Number(parsedUrl.port);
				else if (parsedUrl.protocol === "http:") port = 80;
				else if (parsedUrl.protocol === "https:") port = 443;
				if (typeof port === "number") this.standardAttrs[ATTR_SERVER_PORT] = port;
			} catch {}
		}
		this.helper = metricsHelper;
		this.inflight = meter.createUpDownCounter(`otel.sdk.exporter.${this.helper.name}.inflight`, {
			unit: `{${this.helper.name}}`,
			description: `The number of ${this.helper.name}s which were passed to the exporter, but that have not been exported yet (neither successful, nor failed).`
		});
		this.exported = meter.createCounter(`otel.sdk.exporter.${this.helper.name}.exported`, {
			unit: `{${this.helper.name}}`,
			description: `The number of ${this.helper.name}s for which the export has finished, either successful or failed.`
		});
		this.duration = meter.createHistogram("otel.sdk.exporter.operation.duration", {
			unit: "s",
			description: "The duration of exporting a batch of telemetry records.",
			advice: { explicitBucketBoundaries: [] }
		});
	}
	startExport(request) {
		const numItems = this.helper.countItems(request);
		const startTime = hrTime();
		this.inflight.add(numItems, this.standardAttrs);
		return (error) => {
			const endTime = hrTime();
			this.inflight.add(-numItems, this.standardAttrs);
			const exportedAttrs = error ? {
				...this.standardAttrs,
				[ATTR_ERROR_TYPE]: error instanceof Error ? error.name : "export_failed"
			} : this.standardAttrs;
			this.exported.add(numItems, exportedAttrs);
			const durationAttrs = {
				...exportedAttrs,
				...this.responseAttributesFromError(error)
			};
			const duration = hrTimeToMilliseconds(hrTimeDuration(startTime, endTime)) / 1e3;
			this.duration.record(duration, durationAttrs);
		};
	}
};
//#endregion
//#region node_modules/@opentelemetry/otlp-transformer/dist/logs/index.mjs
/**
* @experimental this helper may receive breaking changes in minor versions, pin this package's version when using this constant
*/
var LogsExporterMetricsHelper = {
	name: "log",
	countItems: (request) => request.length
};
//#endregion
//#region node_modules/@opentelemetry/otlp-transformer/dist/platform/browser/base64.mjs
function encodeBase64(bytes) {
	const chars = new Array(bytes.length);
	for (let i = 0; i < bytes.length; i++) chars[i] = String.fromCharCode(bytes[i]);
	return btoa(chars.join(""));
}
//#endregion
//#region node_modules/@opentelemetry/otlp-transformer/dist/common/internal.mjs
function createResource(resource, encoder) {
	const result = {
		attributes: toAttributes(resource.attributes, encoder),
		droppedAttributesCount: 0
	};
	const schemaUrl = resource.schemaUrl;
	if (schemaUrl && schemaUrl !== "") result.schemaUrl = schemaUrl;
	return result;
}
function createInstrumentationScope(scope, encoder) {
	const result = {
		name: scope.name,
		version: scope.version
	};
	if (scope.attributes && Object.keys(scope.attributes).length > 0) {
		result.attributes = toAttributes(scope.attributes, encoder);
		result.droppedAttributesCount = scope.droppedAttributesCount ?? 0;
	}
	return result;
}
function toAttributes(attributes, encoder) {
	return Object.keys(attributes).map((key) => toKeyValue(key, attributes[key], encoder));
}
function toKeyValue(key, value, encoder) {
	return {
		key,
		value: toAnyValue(value, encoder)
	};
}
function toAnyValue(value, encoder) {
	const t = typeof value;
	if (t === "string") return { stringValue: value };
	if (t === "number") {
		if (!Number.isInteger(value)) return { doubleValue: value };
		return { intValue: value };
	}
	if (t === "boolean") return { boolValue: value };
	if (value instanceof Uint8Array) return { bytesValue: encoder.encodeUint8Array(value) };
	if (Array.isArray(value)) {
		const values = new Array(value.length);
		for (let i = 0; i < value.length; i++) values[i] = toAnyValue(value[i], encoder);
		return { arrayValue: { values } };
	}
	if (t === "object" && value != null) {
		const keys = Object.keys(value);
		const values = new Array(keys.length);
		for (let i = 0; i < keys.length; i++) values[i] = {
			key: keys[i],
			value: toAnyValue(value[keys[i]], encoder)
		};
		return { kvlistValue: { values } };
	}
	return {};
}
//#endregion
//#region node_modules/@opentelemetry/otlp-transformer/dist/logs/internal.mjs
function createExportLogsServiceRequest(logRecords, encoder) {
	return { resourceLogs: logRecordsToResourceLogs(logRecords, encoder) };
}
function createResourceMap(logRecords) {
	const resourceMap = /* @__PURE__ */ new Map();
	for (const record of logRecords) {
		const { resource, instrumentationScope } = record;
		let ismMap = resourceMap.get(resource);
		if (!ismMap) {
			ismMap = /* @__PURE__ */ new Map();
			resourceMap.set(resource, ismMap);
		}
		let records = ismMap.get(instrumentationScope);
		if (!records) {
			records = [];
			ismMap.set(instrumentationScope, records);
		}
		records.push(record);
	}
	return resourceMap;
}
function logRecordsToResourceLogs(logRecords, encoder) {
	const resourceMap = createResourceMap(logRecords);
	return Array.from(resourceMap, ([resource, ismMap]) => {
		const processedResource = createResource(resource, encoder);
		return {
			resource: processedResource,
			scopeLogs: Array.from(ismMap, ([, scopeLogs]) => {
				return {
					scope: createInstrumentationScope(scopeLogs[0].instrumentationScope, encoder),
					logRecords: scopeLogs.map((log) => toLogRecord(log, encoder)),
					schemaUrl: scopeLogs[0].instrumentationScope.schemaUrl
				};
			}),
			schemaUrl: processedResource.schemaUrl
		};
	});
}
function toLogRecord(log, encoder) {
	return {
		timeUnixNano: encoder.encodeHrTime(log.hrTime),
		observedTimeUnixNano: encoder.encodeHrTime(log.hrTimeObserved),
		severityNumber: toSeverityNumber(log.severityNumber),
		severityText: log.severityText,
		body: toAnyValue(log.body, encoder),
		eventName: log.eventName,
		attributes: toAttributes(log.attributes, encoder),
		droppedAttributesCount: log.droppedAttributesCount,
		flags: log.spanContext?.traceFlags,
		traceId: encoder.encodeOptionalSpanContext(log.spanContext?.traceId),
		spanId: encoder.encodeOptionalSpanContext(log.spanContext?.spanId)
	};
}
function toSeverityNumber(severityNumber) {
	return severityNumber;
}
//#endregion
//#region node_modules/@opentelemetry/otlp-transformer/dist/common/utils.mjs
function hrTimeToNanos(hrTime) {
	const NANOSECONDS = BigInt(1e9);
	return BigInt(Math.trunc(hrTime[0])) * NANOSECONDS + BigInt(Math.trunc(hrTime[1]));
}
function encodeAsString(hrTime) {
	return hrTimeToNanos(hrTime).toString();
}
var encodeTimestamp = typeof BigInt !== "undefined" ? encodeAsString : hrTimeToNanoseconds;
function identity(value) {
	return value;
}
/**
* Encoder for JSON format.
* Uses string timestamps, hex for span/trace IDs, and base64 for Uint8Array.
*/
var JSON_ENCODER = {
	encodeHrTime: encodeTimestamp,
	encodeSpanContext: identity,
	encodeOptionalSpanContext: identity,
	encodeUint8Array: encodeBase64
};
//#endregion
//#region node_modules/@opentelemetry/otlp-transformer/dist/logs/json/logs.mjs
/**
* @experimental this serializer may receive breaking changes in minor versions, pin this package's version when using this constant
*/
var JsonLogsSerializer = {
	serializeRequest: (arg) => {
		const request = createExportLogsServiceRequest(arg, JSON_ENCODER);
		return new TextEncoder().encode(JSON.stringify(request));
	},
	deserializeResponse: (arg) => {
		if (arg.length === 0) return {};
		const decoder = new TextDecoder();
		try {
			return JSON.parse(decoder.decode(arg));
		} catch (err) {
			diag.warn(`Failed to parse logs export response: ${err.message}. Returning empty response`);
			return {};
		}
	}
};
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/retrying-transport.mjs
var MAX_ATTEMPTS = 5;
var INITIAL_BACKOFF = 1e3;
var MAX_BACKOFF = 5e3;
var BACKOFF_MULTIPLIER = 1.5;
var JITTER = .2;
/**
* Get a pseudo-random jitter that falls in the range of [-JITTER, +JITTER]
*/
function getJitter() {
	return Math.random() * (2 * JITTER) - JITTER;
}
var RetryingTransport = class {
	_transport;
	constructor(transport) {
		this._transport = transport;
	}
	retry(data, timeoutMillis, inMillis) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this._transport.send(data, timeoutMillis).then(resolve, reject);
			}, inMillis);
		});
	}
	async send(data, timeoutMillis) {
		let attempts = MAX_ATTEMPTS;
		let nextBackoff = INITIAL_BACKOFF;
		const deadline = Date.now() + timeoutMillis;
		let result = await this._transport.send(data, timeoutMillis);
		while (result.status === "retryable" && attempts > 0) {
			attempts--;
			const backoff = Math.max(Math.min(nextBackoff * (1 + getJitter()), MAX_BACKOFF), 0);
			nextBackoff = nextBackoff * BACKOFF_MULTIPLIER;
			const retryInMillis = result.retryInMillis ?? backoff;
			const remainingTimeoutMillis = deadline - Date.now();
			if (retryInMillis > remainingTimeoutMillis) {
				diag.info(`Export retry time ${Math.round(retryInMillis)}ms exceeds remaining timeout ${Math.round(remainingTimeoutMillis)}ms, not retrying further.`);
				return result;
			}
			diag.verbose(`Scheduling export retry in ${Math.round(retryInMillis)}ms`);
			result = await this.retry(data, remainingTimeoutMillis, retryInMillis);
		}
		if (result.status === "success") diag.verbose(`Export succeeded after ${MAX_ATTEMPTS - attempts} retry attempts.`);
		else if (result.status === "retryable") diag.info(`Export failed after maximum retry attempts (${MAX_ATTEMPTS}).`);
		else diag.info(`Export failed with non-retryable error: ${result.error}`);
		return result;
	}
	shutdown() {
		return this._transport.shutdown();
	}
};
/**
* Creates an Exporter Transport that retries on 'retryable' response.
*/
function createRetryingTransport(options) {
	return new RetryingTransport(options.transport);
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/is-export-retryable.mjs
function isExportHTTPErrorRetryable(statusCode) {
	return statusCode === 429 || statusCode === 502 || statusCode === 503 || statusCode === 504;
}
function parseRetryAfterToMills(retryAfter) {
	if (retryAfter == null) return;
	const seconds = Number.parseInt(retryAfter, 10);
	if (Number.isInteger(seconds)) return seconds > 0 ? seconds * 1e3 : -1;
	const delay = new Date(retryAfter).getTime() - Date.now();
	if (delay >= 0) return delay;
	return 0;
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/platform/browser/transport/fetch-transport.mjs
/**
* Maximum total body size for concurrent keepalive requests.
* Browsers enforce a 64KiB cumulative limit across all pending keepalive requests.
* We use 60KB to leave headroom for headers.
* @see https://github.com/whatwg/fetch/issues/679
* @see https://blog.huli.tw/2025/01/06/en/navigator-sendbeacon-64kib-and-source-code/
*/
var MAX_KEEPALIVE_BODY_SIZE = 61440;
/**
* Maximum concurrent keepalive requests.
* Chrome enforces 9 concurrent keepalive fetch requests per renderer process.
* @see https://github.com/whatwg/fetch/issues/679
* Quote: "If the renderer process is processing more than 9 requests with keepalive set, we reject a new request"
*/
var MAX_KEEPALIVE_REQUESTS = 9;
/**
* Track cumulative body size charged against the keepalive budget.
* This is necessary because the 64KiB limit is cumulative, not per-request.
* Charged from request start until the response body drains, which is later
* than the request completing: that is when the browser gives the quota back.
*/
var pendingBodySize = 0;
/**
* Track number of requests holding keepalive budget, on the same terms as
* {@link pendingBodySize}.
*/
var pendingKeepaliveCount = 0;
var FetchTransport = class {
	_parameters;
	constructor(parameters) {
		this._parameters = parameters;
	}
	async send(data, timeoutMillis) {
		const abortController = new AbortController();
		const timeout = setTimeout(() => abortController.abort(), timeoutMillis);
		let fetchApi = globalThis.fetch;
		if (typeof fetchApi.__original === "function") fetchApi = fetchApi.__original;
		const requestSize = data.byteLength;
		const wouldExceedSize = pendingBodySize + requestSize > MAX_KEEPALIVE_BODY_SIZE;
		const useKeepalive = !wouldExceedSize && !(pendingKeepaliveCount >= MAX_KEEPALIVE_REQUESTS);
		if (useKeepalive) {
			pendingBodySize += requestSize;
			pendingKeepaliveCount++;
		} else {
			const reason = wouldExceedSize ? "size limit" : "count limit";
			diag.debug(`keepalive disabled: ${(requestSize / 1024).toFixed(1)}KB payload, ${pendingKeepaliveCount} pending (${reason})`);
		}
		const suppressedContext = suppressTracing(context.active());
		let released = false;
		const release = () => {
			if (released) return;
			released = true;
			if (useKeepalive) {
				pendingBodySize -= requestSize;
				pendingKeepaliveCount--;
			}
			clearTimeout(timeout);
		};
		let drainOwnsCleanup = false;
		try {
			const url = new URL(this._parameters.url);
			const headers = await this._parameters.headers();
			const response = await context.with(suppressedContext, () => fetchApi(url.href, {
				method: "POST",
				headers,
				body: data,
				signal: abortController.signal,
				keepalive: useKeepalive,
				mode: globalThis.location ? globalThis.origin === url.origin ? "same-origin" : "cors" : "no-cors"
			}));
			drainResponseBody(response).then(release, release);
			drainOwnsCleanup = true;
			if (response.status >= 200 && response.status <= 299) {
				diag.debug(`export response success (status: ${response.status})`);
				return { status: "success" };
			} else if (isExportHTTPErrorRetryable(response.status)) {
				diag.warn(`export response retryable (status: ${response.status})`);
				return {
					status: "retryable",
					retryInMillis: parseRetryAfterToMills(response.headers.get("Retry-After"))
				};
			}
			diag.error(`export response failure (status: ${response.status})`);
			return {
				status: "failure",
				error: /* @__PURE__ */ new Error(`Fetch request failed with non-retryable status ${response.status}`)
			};
		} catch (error) {
			if (isFetchNetworkErrorRetryable(error)) {
				diag.warn(`export request retryable (network error: ${error})`);
				return {
					status: "retryable",
					error: new Error("Fetch request encountered a network error", { cause: error })
				};
			}
			diag.error(`export request failure (error: ${error})`);
			return {
				status: "failure",
				error: new Error("Fetch request errored", { cause: error })
			};
		} finally {
			if (!drainOwnsCleanup) release();
		}
	}
	shutdown() {}
};
/**
* Creates an exporter transport that uses `fetch` to send the data
* @param parameters applied to each request made by transport
*/
function createFetchTransport(parameters) {
	return new FetchTransport(parameters);
}
function isFetchNetworkErrorRetryable(error) {
	return error instanceof TypeError && !error.cause;
}
/**
* Reads the response body to its end and discards it.
*
* Chromium gives the request's share of the keepalive quota back only once the
* response body has been read to the end, and it skips the buffering consumer
* that would otherwise drain the body on its own when the response carries a
* `Cache-Control: no-store` header, which collectors commonly send. Leaving the
* body unread then leaks the quota until the document goes away and every
* following keepalive export stays pending forever. Cancelling the body is the
* client-abort path and releases the quota far more slowly than reading it to
* the end, so the body is read rather than cancelled.
*
* Never rejects. Its settlement, not its outcome, is what releases the
* request's keepalive budget, so a caller that ignores it leaks that budget
* for the life of the document.
*
* @see https://fetch.spec.whatwg.org/#fetch-processresponseendofbody
* @see https://issues.chromium.org/issues/546438373
*/
async function drainResponseBody(response) {
	try {
		const body = response.body;
		if (body == null) return;
		const reader = body.getReader();
		try {
			let chunk = await reader.read();
			while (!chunk.done) chunk = await reader.read();
		} finally {
			reader.releaseLock();
		}
	} catch (error) {
		diag.debug(`error reading export response body: ${error}`);
	}
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/platform/browser/otlp-browser-http-export-delegate.mjs
function createOtlpFetchExportDelegate(options, serializer, metrics) {
	return createOtlpNetworkExportDelegate(options, serializer, metrics, createRetryingTransport({ transport: createFetchTransport(options) }));
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/util.mjs
/**
* Parses headers from config leaving only those that have defined values
* @param partialHeaders
*/
function validateAndNormalizeHeaders(partialHeaders) {
	const headers = {};
	Object.entries(partialHeaders ?? {}).forEach(([key, value]) => {
		if (typeof value !== "undefined") headers[key] = String(value);
		else diag.warn(`Header "${key}" has invalid value (${value}) and will be ignored`);
	});
	return headers;
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/configuration/otlp-http-configuration.mjs
function mergeHeaders(userProvidedHeaders, fallbackHeaders, defaultHeaders) {
	return async () => {
		const requiredHeaders = { ...await defaultHeaders() };
		const headers = {};
		if (fallbackHeaders != null) Object.assign(headers, await fallbackHeaders());
		if (userProvidedHeaders != null) Object.assign(headers, validateAndNormalizeHeaders(await userProvidedHeaders()));
		return Object.assign(headers, requiredHeaders);
	};
}
function validateUserProvidedUrl(url) {
	if (url == null) return;
	try {
		const base = globalThis.location?.href;
		return new URL(url, base).href;
	} catch {
		throw new Error(`Configuration: Could not parse user-provided export URL: '${url}'`);
	}
}
/**
* @param userProvidedConfiguration  Configuration options provided by the user in code.
* @param fallbackConfiguration Fallback to use when the {@link userProvidedConfiguration} does not specify an option.
* @param defaultConfiguration The defaults as defined by the exporter specification
*/
function mergeOtlpHttpConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration) {
	return {
		...mergeOtlpSharedConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration),
		headers: mergeHeaders(userProvidedConfiguration.headers, fallbackConfiguration.headers, defaultConfiguration.headers),
		url: validateUserProvidedUrl(userProvidedConfiguration.url) ?? fallbackConfiguration.url ?? defaultConfiguration.url
	};
}
function getHttpConfigurationDefaults(requiredHeaders, signalResourcePath) {
	return {
		...getSharedConfigurationDefaults(),
		headers: async () => requiredHeaders,
		url: "http://localhost:4318/" + signalResourcePath
	};
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/configuration/convert-legacy-http-options.mjs
function convertLegacyHeaders(config) {
	if (typeof config.headers === "function") return config.headers;
	return wrapStaticHeadersInFunction(config.headers);
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/platform/browser/configuration/convert-legacy-browser-http-options.mjs
/**
* @deprecated this will be removed in 2.0
*
* @param config
* @param signalResourcePath
* @param requiredHeaders
*/
function convertLegacyBrowserHttpOptions(config, signalResourcePath, requiredHeaders) {
	return mergeOtlpHttpConfigurationWithDefaults({
		url: config.url,
		timeoutMillis: config.timeoutMillis,
		headers: convertLegacyHeaders(config),
		concurrencyLimit: config.concurrencyLimit
	}, {}, getHttpConfigurationDefaults(requiredHeaders, signalResourcePath));
}
//#endregion
//#region node_modules/@opentelemetry/otlp-exporter-base/dist/platform/browser/configuration/create-legacy-browser-delegate.mjs
/**
* @deprecated
*/
function createLegacyOtlpBrowserExporterMetrics(metricsComponentType, exporterMetricsHelper, url, meterProvider) {
	return new ExporterMetrics({
		componentType: metricsComponentType,
		metricsHelper: exporterMetricsHelper,
		url,
		meterProvider,
		responseAttributesFromError: (error) => {
			if (!error) return { [ATTR_HTTP_RESPONSE_STATUS_CODE]: 200 };
			if (!(error instanceof Error)) return {};
			if (error.message.startsWith("Fetch request failed with non-retryable status ")) {
				const statusStr = error.message.substring(47);
				return { [ATTR_HTTP_RESPONSE_STATUS_CODE]: Number(statusStr) };
			}
			return {};
		}
	});
}
/**
* @deprecated
* @param config
* @param serializer
* @param signalResourcePath
* @param requiredHeaders
*/
function createLegacyOtlpBrowserExportDelegate(config, serializer, metricsComponentType, exporterMetricsHelper, meterProvider, signalResourcePath, requiredHeaders) {
	const options = convertLegacyBrowserHttpOptions(config, signalResourcePath, requiredHeaders);
	return createOtlpFetchExportDelegate(options, serializer, createLegacyOtlpBrowserExporterMetrics(metricsComponentType, exporterMetricsHelper, options.url, config.selfObsMeterProvider));
}
//#endregion
//#region node_modules/@opentelemetry/exporter-logs-otlp-http/dist/platform/browser/OTLPLogExporter.mjs
/**
* Collector Logs Exporter for Web
*/
var OTLPLogExporter = class extends OTLPExporterBase {
	constructor(config = {}) {
		super(createLegacyOtlpBrowserExportDelegate(config, JsonLogsSerializer, OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_LOG_EXPORTER, LogsExporterMetricsHelper, config.selfObsMeterProvider, "v1/logs", { "Content-Type": "application/json" }));
	}
};
//#endregion
export { OTLPLogExporter as t };
