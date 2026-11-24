import { S as suppressTracing, _ as globalErrorHandler, d as ExportResultCode, g as timeInputToHrTime, i as ATTR_EXCEPTION_TYPE, l as BindOnceFuture, n as ATTR_EXCEPTION_MESSAGE, r as ATTR_EXCEPTION_STACKTRACE, u as callWithTimeout, v as AddAttributeDecision, x as maybeAddAttribute, y as cleanSimpleAttributes } from "./@opentelemetry/core+[...].mjs";
import { a as TraceFlags, c as createNoopMeter, i as isSpanContextValid, n as diag, o as SeverityNumber, r as context, s as createNoopLogger, t as trace } from "./opentelemetry__api+unenv.mjs";
import { t as defaultResource } from "./opentelemetry__resources.mjs";
//#region node_modules/@opentelemetry/sdk-logs/dist/LogRecordImpl.mjs
var LogRecordImpl = class {
	resource;
	instrumentationScope;
	attributes = {};
	_hrTime;
	_hrTimeObserved;
	_spanContext;
	_severityText;
	_severityNumber;
	_body;
	_eventName;
	_attributesCount = 0;
	_droppedAttributesCount = 0;
	_isReadonly = false;
	_logRecordLimits;
	get hrTime() {
		return this._hrTime;
	}
	set hrTime(hrTime) {
		if (this._isLogRecordReadonly()) return;
		this._hrTime = hrTime;
	}
	get hrTimeObserved() {
		return this._hrTimeObserved;
	}
	set hrTimeObserved(hrTimeObserved) {
		if (this._isLogRecordReadonly()) return;
		this._hrTimeObserved = hrTimeObserved;
	}
	get spanContext() {
		return this._spanContext;
	}
	set spanContext(spanContext) {
		if (this._isLogRecordReadonly()) return;
		this._spanContext = spanContext;
	}
	set severityText(severityText) {
		if (this._isLogRecordReadonly()) return;
		this._severityText = severityText;
	}
	get severityText() {
		return this._severityText;
	}
	set severityNumber(severityNumber) {
		if (this._isLogRecordReadonly()) return;
		this._severityNumber = severityNumber;
	}
	get severityNumber() {
		return this._severityNumber;
	}
	set body(body) {
		if (this._isLogRecordReadonly()) return;
		this._body = body;
	}
	get body() {
		return this._body;
	}
	get eventName() {
		return this._eventName;
	}
	set eventName(eventName) {
		if (this._isLogRecordReadonly()) return;
		this._eventName = eventName;
	}
	get droppedAttributesCount() {
		return this._droppedAttributesCount;
	}
	constructor(_sharedState, instrumentationScope, logRecord) {
		const { timestamp, observedTimestamp, eventName, severityNumber, severityText, body, attributes = {}, exception, context } = logRecord;
		const now = Date.now();
		this._hrTime = timeInputToHrTime(timestamp ?? now);
		this._hrTimeObserved = timeInputToHrTime(observedTimestamp ?? now);
		if (context) {
			const spanContext = trace.getSpanContext(context);
			if (spanContext && isSpanContextValid(spanContext)) this._spanContext = spanContext;
		}
		this.severityNumber = severityNumber;
		this.severityText = severityText;
		this.body = body;
		this.resource = _sharedState.resource;
		this.instrumentationScope = instrumentationScope;
		this._logRecordLimits = _sharedState.logRecordLimits;
		this._eventName = eventName;
		this.setAttributes(attributes);
		if (exception != null) this._setException(exception);
	}
	setAttribute(key, value) {
		if (this._isLogRecordReadonly()) return this;
		const decision = maybeAddAttribute({
			key,
			value,
			attributes: this.attributes,
			limits: this._logRecordLimits,
			currentAttributesCount: this._attributesCount
		});
		if (decision === AddAttributeDecision.DROP_LIMIT_REACHED) {
			this._droppedAttributesCount++;
			if (this._droppedAttributesCount === 1) diag.warn("Dropping extra attributes.");
		} else if (decision === AddAttributeDecision.ADD_NEW) this._attributesCount++;
		return this;
	}
	setAttributes(attributes) {
		for (const [k, v] of Object.entries(attributes)) this.setAttribute(k, v);
		return this;
	}
	setBody(body) {
		this.body = body;
		return this;
	}
	setEventName(eventName) {
		this.eventName = eventName;
		return this;
	}
	setSeverityNumber(severityNumber) {
		this.severityNumber = severityNumber;
		return this;
	}
	setSeverityText(severityText) {
		this.severityText = severityText;
		return this;
	}
	/**
	* @internal
	* A LogRecordProcessor may freely modify logRecord for the duration of the OnEmit call.
	* If logRecord is needed after OnEmit returns (i.e. for asynchronous processing) only reads are permitted.
	*/
	_makeReadonly() {
		this._isReadonly = true;
	}
	_setException(exception) {
		let hasMinimumAttributes = false;
		if (typeof exception === "string" || typeof exception === "number") {
			if (!Object.hasOwn(this.attributes, "exception.message")) this.setAttribute(ATTR_EXCEPTION_MESSAGE, String(exception));
			hasMinimumAttributes = true;
		} else if (exception && typeof exception === "object") {
			const exceptionObj = exception;
			if (exceptionObj.code) {
				if (!Object.hasOwn(this.attributes, "exception.type")) this.setAttribute(ATTR_EXCEPTION_TYPE, exceptionObj.code.toString());
				hasMinimumAttributes = true;
			} else if (exceptionObj.name) {
				if (!Object.hasOwn(this.attributes, "exception.type")) this.setAttribute(ATTR_EXCEPTION_TYPE, exceptionObj.name);
				hasMinimumAttributes = true;
			}
			if (exceptionObj.message) {
				if (!Object.hasOwn(this.attributes, "exception.message")) this.setAttribute(ATTR_EXCEPTION_MESSAGE, exceptionObj.message);
				hasMinimumAttributes = true;
			}
			if (exceptionObj.stack) {
				if (!Object.hasOwn(this.attributes, "exception.stacktrace")) this.setAttribute(ATTR_EXCEPTION_STACKTRACE, exceptionObj.stack);
				hasMinimumAttributes = true;
			}
		}
		if (!hasMinimumAttributes) diag.warn(`Failed to record an exception ${exception}`);
	}
	_isLogRecordReadonly() {
		if (this._isReadonly) diag.warn("Can not execute the operation on emitted log record");
		return this._isReadonly;
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/Logger.mjs
var Logger$1 = class {
	_instrumentationScope;
	_sharedState;
	_loggerConfig;
	constructor(instrumentationScope, sharedState) {
		this._instrumentationScope = instrumentationScope;
		this._sharedState = sharedState;
		this._loggerConfig = this._sharedState.getLoggerConfig(this._instrumentationScope);
	}
	emit(logRecord) {
		const currentContext = logRecord.context || context.active();
		if (!this.enabled(logRecord)) return;
		/**
		* If a Logger was obtained with include_trace_context=true,
		* the LogRecords it emits MUST automatically include the Trace Context from the active Context,
		* if Context has not been explicitly set.
		*/
		const logRecordInstance = new LogRecordImpl(this._sharedState, this._instrumentationScope, {
			context: currentContext,
			...logRecord
		});
		this._sharedState.loggerMetrics.emitLog();
		/**
		* the explicitly passed Context,
		* the current Context, or an empty Context if the Logger was obtained with include_trace_context=false
		*/
		this._sharedState.activeProcessor.onEmit(logRecordInstance, currentContext);
		/**
		* A LogRecordProcessor may freely modify logRecord for the duration of the OnEmit call.
		* If logRecord is needed after OnEmit returns (i.e. for asynchronous processing) only reads are permitted.
		*/
		logRecordInstance._makeReadonly();
	}
	enabled(options) {
		if (this._sharedState.hasShutdown) return false;
		const loggerConfig = this._loggerConfig;
		if (!loggerConfig.enabled) return false;
		const severityNumber = options?.severityNumber;
		if (typeof severityNumber === "number" && severityNumber !== SeverityNumber.UNSPECIFIED && severityNumber < loggerConfig.minimumSeverity) return false;
		const currentContext = options?.context || context.active();
		if (loggerConfig.traceBased) {
			const spanContext = trace.getSpanContext(currentContext);
			if (spanContext && isSpanContextValid(spanContext)) {
				if (!((spanContext.traceFlags & TraceFlags.SAMPLED) === TraceFlags.SAMPLED)) return false;
			}
		}
		const enabledOpts = {
			context: currentContext,
			instrumentationScope: this._instrumentationScope,
			severityNumber: options?.severityNumber,
			eventName: options?.eventName
		};
		for (const processor of this._sharedState.processors) if (!processor.enabled || processor.enabled(enabledOpts)) return true;
		return false;
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/internal/utils.mjs
/**
* Normalizes an AnyValue to a JSON-serializable [typeTag, payload] tuple.
*
* Using a type tag as the first element guarantees that two values can only
* produce the same tuple when they have the same type AND the same data,
* avoiding cross-type collisions such as:
*   - null vs NaN vs Infinity (all become JSON `null` via JSON.stringify)
*   - -0 vs 0 (both become JSON `0` via JSON.stringify)
*   - string "null" vs the value null
*
* Object keys are sorted so that attribute maps with the same entries but
* different insertion orders produce the same key.
*/
function normalizeAnyValue(value) {
	if (value === void 0) return ["u", null];
	if (value === null) return ["n", null];
	const valueType = typeof value;
	if (valueType === "string") return ["s", value];
	if (valueType === "boolean") return ["b", value];
	if (valueType === "number") {
		if (Number.isNaN(value)) return ["nan", null];
		if (value === Infinity) return ["inf", null];
		if (value === -Infinity) return ["-inf", null];
		if (Object.is(value, -0)) return ["n0", null];
		return ["d", value];
	}
	if (value instanceof Uint8Array) return ["bytes", Array.from(value)];
	if (Array.isArray(value)) return ["arr", value.map(normalizeAnyValue)];
	return ["map", Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, normalizeAnyValue(v)])];
}
/**
* Converting the instrumentation scope object to a unique identifier string.
* @param scope - The instrumentation scope to convert
* @returns A unique string identifier for the scope
*/
function getInstrumentationScopeKey(scope) {
	return JSON.stringify([
		scope.name,
		scope.version || "",
		scope.schemaUrl || "",
		normalizeAnyValue(scope.attributes ?? {}),
		scope.droppedAttributesCount ?? 0
	]);
}
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/export/NoopLogRecordProcessor.mjs
var NoopLogRecordProcessor = class {
	forceFlush() {
		return Promise.resolve();
	}
	onEmit(_logRecord, _context) {}
	shutdown() {
		return Promise.resolve();
	}
	enabled(_options) {
		return false;
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/MultiLogRecordProcessor.mjs
/**
* Implementation of the {@link LogRecordProcessor} that simply forwards all
* received events to a list of {@link LogRecordProcessor}s.
*/
var MultiLogRecordProcessor = class {
	processors;
	constructor(processors) {
		this.processors = processors;
	}
	async forceFlush(options) {
		const timeout = options?.timeoutMillis ?? 3e4;
		await Promise.all(this.processors.map((processor) => callWithTimeout(processor.forceFlush(), timeout)));
	}
	onEmit(logRecord, context) {
		this.processors.forEach((processors) => processors.onEmit(logRecord, context));
	}
	async shutdown() {
		await Promise.all(this.processors.map((processor) => processor.shutdown()));
	}
	enabled(options) {
		for (const processor of this.processors) if (!processor.enabled || processor.enabled(options)) return true;
		return false;
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/semconv.mjs
/**
* The number of logs submitted to enabled SDK Loggers.
*
* @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var METRIC_OTEL_SDK_LOG_CREATED = "otel.sdk.log.created";
/**
* The number of log records for which the processing has finished, either successful or failed.
*
* @note For successful processing, `error.type` **MUST NOT** be set. For failed processing, `error.type` **MUST** contain the failure cause.
* For the SDK Simple and Batching Log Record Processor a log record is considered to be processed already when it has been submitted to the exporter,
* not when the corresponding export call has finished.
*
* @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var METRIC_OTEL_SDK_PROCESSOR_LOG_PROCESSED = "otel.sdk.processor.log.processed";
/**
* The maximum number of log records the queue of a given instance of an SDK Log Record processor can hold.
*
* @note Only applies to Log Record processors which use a queue, e.g. the SDK Batching Log Record Processor.
*
* @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var METRIC_OTEL_SDK_PROCESSOR_LOG_QUEUE_CAPACITY = "otel.sdk.processor.log.queue.capacity";
/**
* The number of log records in the queue of a given instance of an SDK log processor.
*
* @note Only applies to log record processors which use a queue, e.g. the SDK Batching Log Record Processor.
*
* @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var METRIC_OTEL_SDK_PROCESSOR_LOG_QUEUE_SIZE = "otel.sdk.processor.log.queue.size";
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
* Enum value "batching_log_processor" for attribute {@link ATTR_OTEL_COMPONENT_TYPE}.
*
* The builtin SDK batching log record processor
*
* @experimental This enum value is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var OTEL_COMPONENT_TYPE_VALUE_BATCHING_LOG_PROCESSOR = "batching_log_processor";
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
//#region node_modules/@opentelemetry/sdk-logs/dist/LoggerMetrics.mjs
/**
* Generates `otel.sdk.log.*` metrics.
* https://opentelemetry.io/docs/specs/semconv/otel/sdk-metrics/#log-metrics
*/
var LoggerMetrics = class {
	createdLogs;
	constructor(meter) {
		this.createdLogs = meter.createCounter(METRIC_OTEL_SDK_LOG_CREATED, {
			unit: "{log_record}",
			description: "The number of logs submitted to enabled SDK Loggers."
		});
	}
	emitLog() {
		this.createdLogs.add(1);
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/version.mjs
var VERSION = "3.1.1";
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/internal/LoggerProviderSharedState.mjs
var DEFAULT_LOGGER_CONFIG = {
	enabled: true,
	minimumSeverity: SeverityNumber.UNSPECIFIED,
	traceBased: false
};
/**
* Default LoggerConfigurator that returns the default config for all loggers
*/
var DEFAULT_LOGGER_CONFIGURATOR = () => ({ ...DEFAULT_LOGGER_CONFIG });
var LoggerProviderSharedState = class {
	loggers = /* @__PURE__ */ new Map();
	activeProcessor;
	registeredLogRecordProcessors = [];
	resource;
	logRecordLimits;
	processors;
	loggerMetrics;
	hasShutdown = false;
	_loggerConfigurator;
	_loggerConfigs = /* @__PURE__ */ new Map();
	constructor(resource, logRecordLimits, processors, loggerConfigurator, meterProvider) {
		this.resource = resource;
		this.logRecordLimits = logRecordLimits;
		this.processors = processors;
		if (processors.length > 0) {
			this.registeredLogRecordProcessors = processors;
			this.activeProcessor = new MultiLogRecordProcessor(this.registeredLogRecordProcessors);
		} else this.activeProcessor = new NoopLogRecordProcessor();
		this._loggerConfigurator = loggerConfigurator ?? DEFAULT_LOGGER_CONFIGURATOR;
		const meter = meterProvider ? meterProvider.getMeter("@opentelemetry/sdk-logs", VERSION) : createNoopMeter();
		this.loggerMetrics = new LoggerMetrics(meter);
	}
	/**
	* Get the LoggerConfig for a given instrumentation scope.
	* Uses the LoggerConfigurator function to compute the config on first access
	* and caches the result.
	*
	* @experimental This feature is in development as per the OpenTelemetry specification.
	*/
	getLoggerConfig(instrumentationScope) {
		const key = getInstrumentationScopeKey(instrumentationScope);
		let config = this._loggerConfigs.get(key);
		if (config) return config;
		config = this._loggerConfigurator(instrumentationScope);
		this._loggerConfigs.set(key, config);
		return config;
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/LoggerProvider.mjs
var LoggerProvider$1 = class {
	_shutdownOnce;
	_sharedState;
	constructor(config = {}) {
		const mergedConfig = {
			resource: config.resource ?? defaultResource(),
			logRecordLimits: {
				attributeCountLimit: config.logRecordLimits?.attributeCountLimit ?? 128,
				attributeValueLengthLimit: config.logRecordLimits?.attributeValueLengthLimit ?? Infinity
			},
			loggerConfigurator: config.loggerConfigurator ?? DEFAULT_LOGGER_CONFIGURATOR,
			processors: config.processors ?? [],
			meterProvider: config.meterProvider
		};
		this._sharedState = new LoggerProviderSharedState(mergedConfig.resource, mergedConfig.logRecordLimits, mergedConfig.processors, mergedConfig.loggerConfigurator, mergedConfig.meterProvider);
		this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
	}
	/**
	* Get a logger with the configuration of the LoggerProvider.
	*/
	getLogger(name, version, options) {
		if (this._shutdownOnce.isCalled) {
			diag.warn("A shutdown LoggerProvider cannot provide a Logger");
			return createNoopLogger();
		}
		if (!name) diag.warn("Logger requested without instrumentation scope name.");
		const instrumentationScope = {
			name: name || "unknown",
			version,
			schemaUrl: options?.schemaUrl,
			...cleanSimpleAttributes(options?.attributes, this._sharedState.logRecordLimits)
		};
		const key = getInstrumentationScopeKey(instrumentationScope);
		if (!this._sharedState.loggers.has(key)) this._sharedState.loggers.set(key, new Logger$1(instrumentationScope, this._sharedState));
		return this._sharedState.loggers.get(key);
	}
	/**
	* Notifies all registered LogRecordProcessor to flush any buffered data.
	*
	* Returns a promise which is resolved when all flushes are complete.
	*/
	forceFlush(options) {
		if (this._shutdownOnce.isCalled) {
			diag.warn("invalid attempt to force flush after LoggerProvider shutdown");
			return this._shutdownOnce.promise;
		}
		return this._sharedState.activeProcessor.forceFlush(options);
	}
	/**
	* Flush all buffered data and shut down the LoggerProvider and all registered
	* LogRecordProcessor.
	*
	* Returns a promise which is resolved when all flushes are complete.
	*/
	shutdown() {
		if (this._shutdownOnce.isCalled) {
			diag.warn("shutdown may only be called once per LoggerProvider");
			return this._shutdownOnce.promise;
		}
		return this._shutdownOnce.call();
	}
	_shutdown() {
		this._sharedState.hasShutdown = true;
		return this._sharedState.activeProcessor.shutdown();
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/export/LogRecordProcessorMetrics.mjs
var componentCounter = /* @__PURE__ */ new Map();
var LogRecordProcessorMetrics = class {
	processedLogs;
	queueSize;
	queueSizeCallback;
	standardAttrs;
	droppedAttrs;
	constructor(componentType, meter, queueConfig) {
		const counter = componentCounter.get(componentType) ?? 0;
		componentCounter.set(componentType, counter + 1);
		this.standardAttrs = {
			[ATTR_OTEL_COMPONENT_TYPE]: componentType,
			[ATTR_OTEL_COMPONENT_NAME]: `${componentType}/${counter}`
		};
		this.droppedAttrs = {
			...this.standardAttrs,
			[ATTR_ERROR_TYPE]: "queue_full"
		};
		this.processedLogs = meter.createCounter(METRIC_OTEL_SDK_PROCESSOR_LOG_PROCESSED, {
			unit: "{log_record}",
			description: "The number of log records for which the processing has finished, either successful or failed."
		});
		if (queueConfig) {
			const { capacity, getQueueSize } = queueConfig;
			meter.createUpDownCounter(METRIC_OTEL_SDK_PROCESSOR_LOG_QUEUE_CAPACITY, {
				unit: "{log_record}",
				description: "The maximum number of log records the queue of a given instance of an SDK log processor can hold."
			}).add(capacity, this.standardAttrs);
			this.queueSize = meter.createObservableUpDownCounter(METRIC_OTEL_SDK_PROCESSOR_LOG_QUEUE_SIZE, {
				unit: "{log_record}",
				description: "The number of log records in the queue of a given instance of an SDK log processor."
			});
			this.queueSizeCallback = (result) => result.observe(getQueueSize(), this.standardAttrs);
			this.queueSize.addCallback(this.queueSizeCallback);
		}
	}
	dropLogs(count) {
		this.processedLogs.add(count, this.droppedAttrs);
	}
	finishLogs(count, error) {
		if (!error) {
			this.processedLogs.add(count, this.standardAttrs);
			return;
		}
		const attrs = {
			...this.standardAttrs,
			[ATTR_ERROR_TYPE]: error.name
		};
		this.processedLogs.add(count, attrs);
	}
	shutdown() {
		if (this.queueSize && this.queueSizeCallback) this.queueSize.removeCallback(this.queueSizeCallback);
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/export/BatchLogRecordProcessorBase.mjs
/**
* Waits for all pending async resources in the log records to be resolved.
*/
async function waitForResources(logRecords) {
	let pendingResources = null;
	for (let i = 0, len = logRecords.length; i < len; i++) {
		const resource = logRecords[i].resource;
		if (resource.asyncAttributesPending && resource.waitForAsyncAttributes) {
			pendingResources ??= /* @__PURE__ */ new Set();
			pendingResources.add(resource);
		}
	}
	if (pendingResources !== null) await Promise.all(Array.from(pendingResources, (resource) => resource.waitForAsyncAttributes?.()));
}
/**
* Represents an export operation that handles the entire export workflow.
*/
var ExportOperation = class {
	_exportCompleted;
	_exportScheduledPromise;
	_metrics;
	_exportScheduledResolve;
	constructor(exporter, logRecords, exportTimeoutMillis, metrics) {
		this._exportScheduledPromise = new Promise((resolve) => {
			this._exportScheduledResolve = resolve;
		});
		this._exportCompleted = this._executeExport(exporter, logRecords, exportTimeoutMillis);
		this._metrics = metrics;
	}
	/** Get the promise that resolves when the export completes */
	get exportCompleted() {
		return this._exportCompleted;
	}
	/** Get the promise that resolves when exporter.export() has been called */
	get exportScheduled() {
		return this._exportScheduledPromise;
	}
	async _executeExport(exporter, logRecords, exportTimeoutMillis) {
		try {
			await waitForResources(logRecords);
			await context.with(suppressTracing(context.active()), async () => {
				return this._exportWithTimeout(exporter, logRecords, exportTimeoutMillis);
			});
		} catch (e) {
			globalErrorHandler(e);
			this._exportScheduledResolve();
		}
	}
	async _exportWithTimeout(exporter, logRecords, exportTimeoutMillis) {
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				reject(/* @__PURE__ */ new Error("Timeout"));
			}, exportTimeoutMillis);
			exporter.export(logRecords, (result) => {
				this._metrics.finishLogs(logRecords.length, result.error);
				clearTimeout(timer);
				if (result.code === ExportResultCode.SUCCESS) resolve();
				else reject(result.error ?? /* @__PURE__ */ new Error("BatchLogRecordProcessor: log record export failed"));
			});
			this._exportScheduledResolve();
		});
	}
};
var BatchLogRecordProcessorBase = class {
	_maxExportBatchSize;
	_maxQueueSize;
	_scheduledDelayMillis;
	_exportTimeoutMillis;
	_exporter;
	_metrics;
	_currentExport = null;
	_finishedLogRecords = [];
	_timer;
	_shutdownOnce;
	_flushing = false;
	constructor(options) {
		this._exporter = options.exporter;
		this._maxExportBatchSize = options.maxExportBatchSize ?? 512;
		this._maxQueueSize = options.maxQueueSize ?? 2048;
		this._scheduledDelayMillis = options.scheduledDelayMillis ?? 1e3;
		this._exportTimeoutMillis = options.exportTimeoutMillis ?? 3e4;
		this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
		if (this._maxExportBatchSize > this._maxQueueSize) {
			diag.warn("BatchLogRecordProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
			this._maxExportBatchSize = this._maxQueueSize;
		}
		const meter = options?.selfObsMeterProvider ? options.selfObsMeterProvider.getMeter("@opentelemetry/sdk-logs") : createNoopMeter();
		this._metrics = new LogRecordProcessorMetrics(OTEL_COMPONENT_TYPE_VALUE_BATCHING_LOG_PROCESSOR, meter, {
			capacity: this._maxQueueSize,
			getQueueSize: () => this._finishedLogRecords.length
		});
	}
	onEmit(logRecord) {
		if (this._shutdownOnce.isCalled) return;
		this._addToBuffer(logRecord);
	}
	forceFlush() {
		if (this._shutdownOnce.isCalled) return this._shutdownOnce.promise;
		return this._flushAll();
	}
	/** Add a LogRecord in the buffer. */
	_addToBuffer(logRecord) {
		if (this._finishedLogRecords.length >= this._maxQueueSize) {
			this._metrics.dropLogs(1);
			return;
		}
		this._finishedLogRecords.push(logRecord);
		this._maybeStartTimer();
	}
	shutdown() {
		return this._shutdownOnce.call();
	}
	async _shutdown() {
		this.onShutdown();
		await this._flushAll();
		this._metrics.shutdown();
		await this._exporter.shutdown();
	}
	/**
	* Send all LogRecords to the exporter respecting the batch size limit
	* This function is used only on forceFlush or shutdown,
	* for all other cases _exportOneBatch should be used
	* */
	async _flushAll() {
		if (this._flushing) return;
		this._flushing = true;
		let toFlush = this._finishedLogRecords;
		this._finishedLogRecords = [];
		this._clearTimer();
		const inFlight = this._currentExport;
		if (inFlight !== null) {
			await this._exporter.forceFlush();
			await inFlight.exportCompleted;
			this._currentExport = null;
		}
		while (toFlush.length > 0) {
			let batch;
			if (toFlush.length <= this._maxExportBatchSize) {
				batch = toFlush;
				toFlush = [];
			} else batch = toFlush.splice(0, this._maxExportBatchSize);
			const exportOp = new ExportOperation(this._exporter, batch, this._exportTimeoutMillis, this._metrics);
			this._currentExport = exportOp;
			try {
				await exportOp.exportScheduled;
				await this._exporter.forceFlush();
				await exportOp.exportCompleted;
			} catch (e) {
				globalErrorHandler(e);
			} finally {
				this._currentExport = null;
			}
		}
		this._flushing = false;
		this._maybeStartTimer();
	}
	/**
	* Extracts one batch from the buffer.
	* Returns null if buffer is empty.
	*/
	_extractBatch() {
		if (this._finishedLogRecords.length === 0) return null;
		if (this._finishedLogRecords.length <= this._maxExportBatchSize) {
			const batch = this._finishedLogRecords;
			this._finishedLogRecords = [];
			return batch;
		} else return this._finishedLogRecords.splice(0, this._maxExportBatchSize);
	}
	_exportOneBatch() {
		this._clearTimer();
		const logRecords = this._extractBatch();
		if (logRecords === null) return;
		const exportOp = new ExportOperation(this._exporter, logRecords, this._exportTimeoutMillis, this._metrics);
		this._currentExport = exportOp;
		exportOp.exportCompleted.then(() => {
			this._currentExport = null;
			this._maybeStartTimer();
		}).catch((error) => {
			this._currentExport = null;
			globalErrorHandler(error);
			this._maybeStartTimer();
		});
	}
	_maybeStartTimer() {
		if (this._shutdownOnce.isCalled) return;
		if (this._flushing) return;
		if (this._finishedLogRecords.length === 0) return;
		if (this._currentExport !== null) return;
		if (this._finishedLogRecords.length >= this._maxExportBatchSize) {
			this._exportOneBatch();
			return;
		}
		if (this._timer !== void 0) return;
		this._timer = setTimeout(() => {
			this._timer = void 0;
			this._exportOneBatch();
		}, this._scheduledDelayMillis);
		unrefTimer(this._timer);
	}
	_clearTimer() {
		if (this._timer !== void 0) {
			clearTimeout(this._timer);
			this._timer = void 0;
		}
	}
};
function unrefTimer(timer) {
	const handle = timer;
	if (typeof handle !== "number") handle.unref?.();
}
//#endregion
//#region node_modules/@opentelemetry/sdk-logs/dist/platform/browser/export/BatchLogRecordProcessor.mjs
var BatchLogRecordProcessor = class extends BatchLogRecordProcessorBase {
	_visibilityChangeListener;
	constructor(options) {
		super(options);
		this._onInit(options);
	}
	onShutdown() {
		if (typeof document === "undefined") return;
		if (this._visibilityChangeListener) document.removeEventListener("visibilitychange", this._visibilityChangeListener);
	}
	_onInit(options) {
		if (options.disableAutoFlushOnDocumentHide === true || typeof document === "undefined") return;
		this._visibilityChangeListener = () => {
			if (document.visibilityState === "hidden") this.forceFlush().catch((error) => {
				globalErrorHandler(error);
			});
		};
		document.addEventListener("visibilitychange", this._visibilityChangeListener);
	}
};
//#endregion
export { LoggerProvider$1 as n, BatchLogRecordProcessor as t };
