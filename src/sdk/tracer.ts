import path from "path";
import fs from "fs";
import { execSync } from "child_process";

import { HoneyHive } from "./sdk";
import { UpdateEventRequestBody } from "../models/operations/updateevent";
import { Telemetry } from "./telemetry";
import { Span, trace, Exception } from "@opentelemetry/api";
import * as traceloop from "@traceloop/node-server-sdk";
import { StartSessionRequestBody } from "../models/operations/startsession";
import { SDKError, SDKValidationError } from "../models/errors";
import assert from "assert";

export interface EnrichSpanParams {
  config?: any;
  metadata?: any;
  metrics?: any;
  feedback?: any;
  inputs?: any;
  outputs?: any;
  error?: any;
}

/**
 * Core properties of the HoneyHiveTracer
 */
export interface HoneyHiveTracerProperties {
  // Required properties
  apiKey: string | undefined;
  project: string | undefined;
  sessionId: string | undefined;
  
  // Defaults available
  serverUrl: string;
  sessionName: string
  source: string;
  inputs: Record<string, any>;
  modules?: Record<string, any>;
  verbose: boolean;
  isEvaluation: boolean;
  disableBatch: boolean;
  evalContext: EvaluationSessionProps;
  disableHttpTracing: boolean;
}

/**
 * Properties specific to evaluation sessions
 */
export interface EvaluationSessionProps {
  runId?: string;
  datasetId?: string;
  datapointId?: string;
}

/**
 * Properties for Traceloop association
 */
export interface TraceloopAssociationProperties {
  session_id?: string;
  run_id?: string;
  datapoint_id?: string;
  dataset_id?: string;
  project?: string;
  source?: string;
}

export interface TraceloopParams {
  serverUrl: string;
  apiKey: string;
  disableBatch: boolean;
  instrumentModules?: Record<string, any>;
}

export interface SessionStartParams {
  project: string;
  sessionName: string;
  source: string;
  inputs: Record<string, any>;
}

/**
 * Git information structure
 */
export interface GitInfo {
  commitHash?: string;
  branch?: string;
  repoUrl?: string;
  commitLink?: string;
  uncommittedChanges: boolean;
  relativePath?: string | undefined;
  error?: string;
}

/**
 * Check if the directory is a git repository
 * @param directory Directory to check
 * @returns Boolean indicating whether the directory is a git repository
 */
function isGitRepo(directory: string = process.cwd()): boolean {
  try {
    // Check if .git directory exists or if git rev-parse succeeds
    execSync('git rev-parse --is-inside-work-tree', { cwd: directory, encoding: 'utf-8', stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get git information from the current directory
 * @param directory Directory to get git info from
 * @returns GitInfo object
 */
export function getGitInfo(directory: string = process.cwd()): GitInfo {
  // Check if telemetry is disabled
  const telemetryEnabled = process.env['HONEYHIVE_TELEMETRY'] !== 'false';
  if (!telemetryEnabled) {
    return { 
      uncommittedChanges: false,
      error: "Telemetry disabled"
    };
  }

  // First check if this is a git repository
  if (!isGitRepo(directory)) {
    return { 
      uncommittedChanges: false,
      error: "Not a git repository"
    };
  }
  
  try {
    const commitHash = execSync('git rev-parse HEAD', { cwd: directory, encoding: 'utf-8' }).trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: directory, encoding: 'utf-8' }).trim();
    const repoUrl = execSync('git config --get remote.origin.url', { cwd: directory, encoding: 'utf-8' }).trim().replace(/\.git$/, '');

    const commitLink = repoUrl.includes('github.com')
      ? `${repoUrl}/commit/${commitHash}`
      : repoUrl;

    const status = execSync('git status --porcelain', { cwd: directory, encoding: 'utf-8' }).trim();
    const hasUncommittedChanges = Boolean(status);

    // Try to get relative path of the executing file
    let relativePath;
    try {
      const repoRoot = execSync('git rev-parse --show-toplevel', { cwd: directory, encoding: 'utf-8' }).trim();
      if (typeof require !== 'undefined' && require.main) {
        const absolutePath = require.main.filename;
        relativePath = path.relative(repoRoot, absolutePath);
      } else if (typeof process !== 'undefined' && process.argv && process.argv[1]) {
        const absolutePath = process.argv[1];
        relativePath = path.relative(repoRoot, absolutePath);
      }
    } catch (e) {
      // Silently handle errors
    }

    return {
      commitHash,
      branch,
      repoUrl,
      commitLink,
      uncommittedChanges: hasUncommittedChanges,
      relativePath
    };
  } catch (error) {
    return { 
      uncommittedChanges: false,
      error: "Failed to retrieve Git info"
    };
  }
}

function isPromise(obj: any): obj is Promise<any> {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

function setSpanAttributes(span: Span, prefix: string, value: any) {
  if (value === null || value === undefined) {
    span.setAttribute(prefix, 'null');
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        setSpanAttributes(span, `${prefix}.${index}`, item);
      });
    } else if (value instanceof Date) {
      span.setAttribute(prefix, value.toISOString());
    } else {
      Object.keys(value).forEach((key) => {
        setSpanAttributes(span, `${prefix}.${key}`, value[key]);
      });
    }
  } else if (typeof value === 'string') {
    span.setAttribute(prefix, value);
  } else if (typeof value === 'number') {
    span.setAttribute(prefix, value);
  } else if (typeof value === 'boolean') {
    span.setAttribute(prefix, value);
  } else if (typeof value === 'bigint') {
    span.setAttribute(prefix, value.toString());
  } else if (typeof value === 'symbol') {
    span.setAttribute(prefix, value.toString());
  } else if (typeof value === 'function') {
    span.setAttribute(prefix, value.name || 'anonymous');
  } else {
    span.setAttribute(prefix, String(value));
  }
}

/**
 * Attempts to determine the session name from the main module filename
 * @returns The basename of the main module filename or null
 */
function getDefaultSessionName(): string | null {
  try {
    // Check for CommonJS module
    if (typeof require !== 'undefined' && require.main) {
      return path.basename(require.main.filename);
    } else if (typeof process !== 'undefined' && process.argv && process.argv[1]) {
      // Check for ES Module by using process.argv
      return path.basename(process.argv[1]);
    }
  } catch (error) {
    // Silently handle errors
  }
  return null;
}

/**
 * Attempts to determine the source from package.json
 * @returns The package name or null
 */
function getDefaultSource(): string | null {
  try {
    // Try to get package name
    if (typeof process !== 'undefined') {
      try {
        // Use fs module with ES modules compatibility
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          return packageJson.name || null;
        }
      } catch {
        // Silently handle errors
      }
    }
  } catch (error) {
    // Silently handle errors
  }
  return null;
}

const DEFAULT_PROPERTIES: HoneyHiveTracerProperties = {
  apiKey: undefined,
  project: undefined,
  sessionId: undefined,
  serverUrl: 'https://api.honeyhive.ai',
  sessionName: 'unknown session',
  source: 'unknown source',
  inputs: {},
  disableBatch: false,
  isEvaluation: false,
  evalContext: {},
  verbose: false,
  disableHttpTracing: false,
}

export class HoneyHiveTracer {
  private spanProxy: any = {};
  private properties: HoneyHiveTracerProperties = DEFAULT_PROPERTIES;
  // private static isEvaluationModeActive: boolean = false;
  private static instrumentModules: Record<string, any> = {};
  private static sdkInstance: HoneyHive | null = null;

  /** Property getters */
  // required
  public get apiKey(): string | undefined { return this.properties.apiKey || process.env['HH_API_KEY']; }
  public get project(): string | undefined { return this.properties.project || process.env['HH_PROJECT']; }
  public get sessionId(): string | undefined { return this.properties.sessionId; }

  // defaults available
  public get serverUrl(): string { 
    return this.properties.serverUrl || process.env['HH_SERVER_URL'] || DEFAULT_PROPERTIES.serverUrl; 
  }
  public get sessionName(): string {
    return this.properties.sessionName || 
           process.env['HH_SESSION_NAME'] || 
           getDefaultSessionName() || 
           DEFAULT_PROPERTIES.sessionName;
  }
  public get source(): string { 
    return this.properties.source || 
           process.env['HH_SOURCE'] || 
           getDefaultSource() || 
           DEFAULT_PROPERTIES.source;
  }
  public get inputs(): Record<string, any> { return this.properties.inputs || DEFAULT_PROPERTIES.inputs; }
  public get disableBatch(): boolean { return this.properties.disableBatch || DEFAULT_PROPERTIES.disableBatch; }
  public get isEvaluation(): boolean { return this.properties.isEvaluation || DEFAULT_PROPERTIES.isEvaluation; }
  public get evalContext(): EvaluationSessionProps { return this.properties.evalContext || DEFAULT_PROPERTIES.evalContext; }
  public get verbose(): boolean { return this.properties.verbose || DEFAULT_PROPERTIES.verbose; }
  public get disableHttpTracing(): boolean { return this.properties.disableHttpTracing || DEFAULT_PROPERTIES.disableHttpTracing; }

  // Setters
  public set sessionId(sessionId: string | undefined) { 
    if (!sessionId) {
      throw new Error("sessionId is required");
    }
    this.properties.sessionId = sessionId;
  }

  // Update instrument modules
  private updateInstrumentModules(modules: Record<string, any>): Record<string, any> { 
    HoneyHiveTracer.instrumentModules = { ...HoneyHiveTracer.instrumentModules, ...modules };
    return HoneyHiveTracer.instrumentModules;
  }
  

  // Test required properties
  private testRequiredProperties() {
    if (!this.apiKey) {
      throw new Error("apiKey is required");
    }
    if (!this.project) {
      throw new Error("project is required");
    }
    if (!this.sessionId) {
      throw new Error("sessionId is required");
    }   
  }

  /**
   * Initialize a new session
   */
  private async startSession(): Promise<void> {
    try {
      // If sessionId is already initialized, continue an existing session
      if (this.sessionId) {
        return;
      }
      
      const requestBody: StartSessionRequestBody = {
        session: {
          project: this.project!,
          sessionName: this.sessionName,
          source: this.source,
          inputs: this.inputs,
          sessionId: this.sessionId
        }
      };

      // Gather git information
      const gitInfo = getGitInfo();
      
      // Only add git info to metadata if there's no error
      if (!gitInfo.error && requestBody.session) {
        requestBody.session.metadata = {
          git: gitInfo
        };
      }
      
      if (!HoneyHiveTracer.sdkInstance) {
        throw new Error("SDK instance is not initialized");
      }
      const res = await HoneyHiveTracer.sdkInstance.session.startSession(requestBody);
      assert(res.sessionId, "Could not get sessionId from server");

      // Set tracer sessionId
      this.sessionId = res.sessionId;
    } catch (error) {
      console.error("Failed to create session:", error);
      console.error(error instanceof SDKError ? error.message : error);
    }
  }

  /**
   * Private constructor for HoneyHiveTracer
   * Creates a new tracer instance with the provided SDK and properties
   * Sets the SDK instance if not already set and initializes properties
   * @param properties Optional configuration properties for the tracer
   */
  private constructor(
    params: Partial<HoneyHiveTracerProperties>
  ) {
    // Check for apiKey
    const apiKey = params.apiKey || process.env['HH_API_KEY'];
    if (!apiKey) {
      throw new Error("apiKey is required to initialize HoneyHiveTracer. Please set HH_API_KEY environment variable or pass apiKey to tracer initialization props.");
    }

    // Initialize SDK instance
    if (!HoneyHiveTracer.sdkInstance) {
      HoneyHiveTracer.sdkInstance = new HoneyHive({
        bearerAuth: apiKey,
        serverURL: params.serverUrl || DEFAULT_PROPERTIES.serverUrl,
      });
    }

    // Validate sessionId if provided
    if (params.sessionId) {
      if (typeof params.sessionId !== 'string') {
        throw new Error("sessionId must be a string");
      }
      params.sessionId = params.sessionId.toLowerCase();

      // Validate that sessionId is a valid UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(params.sessionId)) {
        throw new Error("sessionId must be a valid UUID");
      }
    }
    
    // Update properties
    if (params?.modules) {
      this.updateInstrumentModules(params.modules);
    }
    this.properties = {
      apiKey: params?.apiKey || this.apiKey,
      project: params?.project || this.project,
      sessionId: params?.sessionId || this.sessionId,
      serverUrl: params?.serverUrl || this.serverUrl,
      sessionName: params?.sessionName || this.sessionName,
      source: params?.source || this.source,
      inputs: params?.inputs || this.inputs,
      disableBatch: params?.disableBatch || this.disableBatch,
      isEvaluation: params?.isEvaluation || this.isEvaluation,
      evalContext: params?.evalContext || this.evalContext,
      verbose: params?.verbose || this.verbose,
      disableHttpTracing: params?.disableHttpTracing || this.disableHttpTracing,
    }
  }

  /**
   * Common initialization logic for both init and initFromSessionId
   * @param params Tracer properties
   * @returns Initialized tracer instance
   */
  public static async init(params: Partial<HoneyHiveTracerProperties>): Promise<HoneyHiveTracer> {

    // Create a new tracer instance
    const tracer = new HoneyHiveTracer(params);

    // Start session
    assert(tracer.project, // TODO: check for project validity
      "project is required to initialize HoneyHiveTracer. Please set HH_PROJECT environment variable or pass project to tracer initialization props."
    );
    await tracer.startSession();

    // Initialize traceloop
    traceloop.initialize({
      baseUrl: `${tracer.serverUrl}/opentelemetry`,
      apiKey: tracer.apiKey!,
      disableBatch: tracer.disableBatch,
      instrumentModules: HoneyHiveTracer.instrumentModules,
      logLevel: tracer.verbose ? "debug" : "error",
      silenceInitializationMessage: true,
    });
    await Telemetry.getInstance().capture("tracer_init", { "hhai_session_id": tracer.sessionId });

    return tracer;
  }

  public async enrichSession({
    metadata,
    feedback,
    metrics,
    config,
    inputs,
    outputs,
    userProperties
  }: {
    metadata?: Record<string, any>;
    feedback?: Record<string, any>;
    metrics?: Record<string, any>;
    config?: Record<string, any>;
    inputs?: Record<string, any>;
    outputs?: Record<string, any>;
    userProperties?: Record<string, any>;
  } = {}): Promise<void> {
    if (this.sessionId) {
      const updateData: UpdateEventRequestBody = { eventId: this.sessionId };

      if (metadata) updateData['metadata'] = metadata;
      if (feedback) updateData['feedback'] = feedback;
      if (metrics) updateData['metrics'] = metrics;
      if (config) updateData['config'] = config;
      if (outputs) updateData['outputs'] = outputs;
      if (userProperties) updateData['userProperties'] = userProperties;

      // TODO support by adding type to UpdateEventRequestBody
      if (inputs) {
        console.warn("inputs are not yet supported in enrichSession");
      }

      try {
        if (!HoneyHiveTracer.sdkInstance) {
          throw new Error("SDK instance is not initialized");
        }
        await HoneyHiveTracer.sdkInstance.events.updateEvent(updateData);
      } catch (error) {
        console.error("Failed to update event:", error);
      }
    } else {
      console.error("Session ID is not initialized");
    }
  }

  /**
   * Returns an OpenTelemetry tracer object.
   * 
   * After initializing a HoneyHiveTracer object with `const tracer = await HoneyHiveTracer.init(...)`,
   * you can call `tracer.getTracer()` to get an OpenTelemetry tracer object.
   * This is useful for certain integrations such as the Vercel AI SDK.
   * 
   * @returns An OpenTelemetry tracer instance with Traceloop association properties
   */
  public getTracer() {
    if (this.sessionId) {
      const tracer = trace.getTracer('traceloop.tracer');
      const wrappedTracer = new Proxy(tracer, {
        get: (target, propKey, _) => {
          // Use Reflect.get to safely access the property
          const originalMethod = Reflect.get(target, propKey);
          if (typeof originalMethod === 'function') {
            // Use an arrow function to retain 'this' context and type 'args' explicitly
            return (...args: any[]) => {
              const associationProps = this.getTraceloopAssociationProperties();
              
              return traceloop.withAssociationProperties(
                associationProps,
                originalMethod.bind(target, ...args), // Bind 'target' and spread 'args'
                target
              );
            };
          }
          return originalMethod;
        },
      });
      return wrappedTracer;
    } else {
      return trace.getTracer('traceloop.tracer');
    }
  }

  /**
   * Get Traceloop association properties as a map
   * @returns Record of association properties
   */
  private getTraceloopAssociationProperties(): Record<string, string> {
    this.testRequiredProperties();

    const associationProps: Record<string, string> = {};
    
    // Add basic properties
    associationProps['session_id'] = this.sessionId!;
    associationProps['project'] = this.project!;
    associationProps['source'] = this.source!;
    associationProps['disable_http_tracing'] = this.disableHttpTracing.toString().toLowerCase();

    // Add evaluation properties
    for (const [key, value] of Object.entries(this.evalContext)) {
      associationProps[key] = value;
    }

    return associationProps;
  }

  /**
   * Set Traceloop association properties on a span
   */
  private setTraceloopAssociationProperties(span: Span): void {
    const associationProps = this.getTraceloopAssociationProperties();

    // Set attributes on span
    Object.entries(associationProps).forEach(([key, value]) => {
      setSpanAttributes(span, `traceloop.association.properties.${key}`, value);
    });
  }

  public traceFunction(
    { eventType, config, metadata, eventName }: 
    { eventType?: string | undefined; config?: any | undefined; metadata?: any | undefined; eventName?: string | undefined } = {}) {
    // Helper function to extract argument names from the function
    function getArgs(func: (...args: any[]) => any): string[] | null {
      try {
        const funcStr = func.toString()
          .replace(/\/\/.*$/mg, '') // Remove single-line comments
          .replace(/\s+/g, '')      // Remove whitespace
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
          .replace(/=[^,]+/g, '');  // Remove default values
  
        const argsMatch = funcStr.match(/(?:function[\w\s]*\(|\()([^)]*)\)/);
        if (argsMatch && argsMatch[1]) {
          return argsMatch[1].split(',').filter(Boolean);
        }
      } catch (error) {
        console.warn('Failed to parse function arguments:', error);
      }
      return null; // Return null if parsing fails
    }
    return <T extends (...args: any[]) => any>(func: T): T => {
      const wrappedFunction = (...args: Parameters<T>): ReturnType<T> => {
        const tracer = trace.getTracer('traceloop.tracer');
        const spanName = eventName || // try user provided eventName
          func.name || ((func as any).hh_name) || // try function name
          (eventType ? eventType + ' event' : 'event'); // try eventType
        
        const span = tracer.startSpan(spanName);

        // Inject span into proxy to allow enrichment within traced function.
        // Proxy is used to overcome self-referencing issue and is reset after span ends.
        const oldSpanProxy = this.spanProxy || {};
        this.spanProxy = new Proxy({
          span: span
        }, {
          get: (_, prop) => {
            return (span as any)[prop];
          }
        });

        try {
          // Get argument names
          const argNames = getArgs(func);

          // Set association properties
          this.setTraceloopAssociationProperties(span);

          args.forEach((arg, index) => {
            const argName = (argNames && argNames[index]) ? argNames[index] : index.toString();
            setSpanAttributes(span, `honeyhive_inputs._params_.${argName}`, arg);
          });

          if (eventType) {
            if (typeof eventType === 'string' && ['tool', 'model', 'chain'].includes(eventType.toLowerCase())) {
              setSpanAttributes(span, 'honeyhive_event_type', eventType.toLowerCase());
            } else {
              console.warn("event_type could not be set. Must be 'tool', 'model', or 'chain'.");
            }
          }
          if (config) {
            setSpanAttributes(span, 'honeyhive_config', config);
          }
          if (metadata) {
            setSpanAttributes(span, 'honeyhive_metadata', metadata);
          }

          const result = func(...args);

          if (isPromise(result)) {
            const newResult = result.then(
              (res: any) => {
                setSpanAttributes(span, 'honeyhive_outputs.result', res);
                span.end();
                this.spanProxy = oldSpanProxy;
                return res;
              },
              (err: any) => {
                span.recordException(err);
                // Also capture the error message/details as a span attribute
                setSpanAttributes(span, 'honeyhive_error', String(err));
                span.end();
                this.spanProxy = oldSpanProxy;
                throw err;
              }
            ) as ReturnType<T>;
            return newResult;
          } else {
            setSpanAttributes(span, 'honeyhive_outputs.result', result);
            span.end();
            this.spanProxy = oldSpanProxy;
            return result;
          }
        } catch (err: unknown) {
          span.recordException(err as Exception);
          
          // Also capture the error message/details as a span attribute
          if (err instanceof Error) {
            setSpanAttributes(span, 'honeyhive_error', String(err));
          }

          span.end();
          this.spanProxy = oldSpanProxy;
          throw err;
        }
      };
      return wrappedFunction as T;
    };
  }

  public traceModel<F extends (...args: any[]) => any>(
    func: F,
    { config, metadata, eventName }: { config?: any | undefined; metadata?: any | undefined; eventName?: string | undefined } = {}
  ): F {
    return this.traceFunction({ eventType: "model", config, metadata, eventName })(func);
  }

  public traceTool<F extends (...args: any[]) => any>(
    func: F,
    { config, metadata, eventName }: { config?: any | undefined; metadata?: any | undefined; eventName?: string | undefined } = {}
  ): F {
    return this.traceFunction({ eventType: "tool", config, metadata, eventName })(func);
  } 

  public traceChain<F extends (...args: any[]) => any>(
    func: F,
    { config, metadata, eventName }: { config?: any | undefined; metadata?: any | undefined; eventName?: string | undefined } = {}
  ): F {
    return this.traceFunction({ eventType: "chain", config, metadata, eventName })(func);
  }

  public logModel(params: EnrichSpanParams = {}) {
    const func = () => {
      this.enrichSpan(params);
    };
    // Object.assign(func, { hh_name: logKey });
    const tracedFunction = this.traceFunction({ eventType: "model" })(func);
    tracedFunction();
  }

  public trace(fn: () => void): void {
    if (this.sessionId) {
      const associationProps = this.getTraceloopAssociationProperties();
      
      traceloop.withAssociationProperties(
        associationProps,
        fn,
      );
    } else {
      console.error("Session ID is not initialized");
    }
  }

  public enrichSpan({
    config,
    metadata,
    metrics,
    feedback,
    inputs,
    outputs,
    error,
    eventName
  }: {
    config?: any;
    metadata?: any;
    metrics?: any;
    feedback?: any;
    inputs?: any;
    outputs?: any;
    error?: any;
    eventName?: string;
  } = {}): void {
    if (this.spanProxy) {
      const span = this.spanProxy;
      if (config) {
        setSpanAttributes(span, "honeyhive_config", config);
      }
      if (metadata) {
        setSpanAttributes(span, "honeyhive_metadata", metadata);
      }
      if (metrics) {
        setSpanAttributes(span, "honeyhive_metrics", metrics);
      }
      if (feedback) {
        setSpanAttributes(span, "honeyhive_feedback", feedback);
      }
      if (inputs) {
        setSpanAttributes(span, "honeyhive_inputs", inputs);
      }
      if (outputs) {
        setSpanAttributes(span, "honeyhive_outputs", outputs);
      }
      if (error) {
        setSpanAttributes(span, "honeyhive_error", error);
      }
      if (eventName) {
        setSpanAttributes(span, "honeyhive_event_name", eventName);
      }
    } else {
      console.warn("No active span found. Make sure enrichSpan is called within a traced function.");
    }
  }

  public async flush(): Promise<void> {
    return await traceloop.forceFlush();
  }
}
