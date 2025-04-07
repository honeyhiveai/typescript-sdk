import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { Mutex } from 'async-mutex';

import { HoneyHive } from "./sdk";
import { UpdateEventRequestBody } from "../models/operations/updateevent";
// import { Telemetry } from "./telemetry";
import { Span, trace, Exception, context, createContextKey } from "@opentelemetry/api";
import * as traceloop from "@traceloop/node-server-sdk";
import * as crypto from "crypto";
import { StartSessionRequestBody } from "../models/operations/startsession";
import assert from "assert";

export interface EnrichSpanParams {
  config?: Record<string, any>;
  metadata?: Record<string, any>;
  metrics?: Record<string, any>;
  feedback?: Record<string, any>;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  error?: string | null;
  eventName?: string;
}

export interface EnrichSessionParams {
  sessionId?: string | undefined;
  metadata?: Record<string, any>;
  feedback?: Record<string, any>;
  metrics?: Record<string, any>;
  config?: Record<string, any>;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  userProperties?: Record<string, any>;
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
  metadata: Record<string, any>;
  instrumentModules?: Record<string, any>;
  verbose: boolean;
  isEvaluation: boolean;
  disableBatch: boolean;
  disableHttpTracing: boolean;
  runId?: string | undefined;
  datasetId?: string | undefined;
  datapointId?: string | undefined;
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
  disable_http_tracing?: string;
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
    // Use git rev-parse --is-inside-work-tree instead of file I/O
    const result = execSync('git rev-parse --is-inside-work-tree', { 
      cwd: directory, 
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'] // Suppress stderr
    }).trim();
    return result === 'true';
  } catch (error) {
    // Return false if git command fails (not a git repo or git not installed)
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
  
  try {
    // First check if this is a git repository
    if (!isGitRepo(directory)) {
      return { 
        uncommittedChanges: false,
        error: "Not a git repository"
      };
    }

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
  if (!span) {
    return;
  }
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

function getAssociationPropsFromContext(): Record<string, string> | undefined {
  try {
    const ctx = context.active();
    const contextAssocProps = ctx.getValue(createContextKey("association_properties"));
    return contextAssocProps as Record<string, string> | undefined;
  } catch (error) {
    if (HoneyHiveTracer.verbose) {
      console.warn("Failed to get association properties:", error);
    }
    return undefined;
  }
}

const DEFAULT_PROPERTIES: HoneyHiveTracerProperties = {
  apiKey: undefined,
  project: undefined,
  sessionId: undefined,
  serverUrl: 'https://api.honeyhive.ai',
  sessionName: 'unknown session',
  source: 'unknown source',
  inputs: {},
  metadata: {},
  disableBatch: false,
  isEvaluation: false,
  verbose: false,
  disableHttpTracing: false,
  runId: undefined,
  datasetId: undefined,
  datapointId: undefined,
}

export class HoneyHiveTracer {
  private properties: HoneyHiveTracerProperties = DEFAULT_PROPERTIES;
  public static isEvaluation: boolean = false;
  public static evalAssociationProps: Record<string, string> = {};
  private static instrumentModules: Record<string, any> = {};
  public static sdkInstance: HoneyHive | null = null;
  private static isTraceloopInitialized: boolean = false;
  public static flushPromise: Promise<void> | null = null;
  private static flushMutex = new Mutex();
  public static verbose: boolean = false;
  private static failedToInitialize: boolean = false;
  private static notifiedInitializationFailure: boolean = false;

  /** Property getters */
  // required
  public get apiKey(): string | undefined { return this.properties.apiKey || process.env['HH_API_KEY']; }
  public get project(): string | undefined { return this.properties.project || process.env['HH_PROJECT']; }
  public get sessionId(): string | undefined { return this.properties.sessionId; }

  // defaults available
  public get serverUrl(): string { 
    return this.properties.serverUrl || process.env['HH_API_URL'] || DEFAULT_PROPERTIES.serverUrl; 
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
  public get metadata(): Record<string, any> { return this.properties.metadata || DEFAULT_PROPERTIES.metadata; }
  public get disableBatch(): boolean { return this.properties.disableBatch || DEFAULT_PROPERTIES.disableBatch; }
  public get isEvaluation(): boolean { return this.properties.isEvaluation || DEFAULT_PROPERTIES.isEvaluation; }
  public get runId(): string | undefined { return this.properties.runId || DEFAULT_PROPERTIES.runId; }
  public get datasetId(): string | undefined { return this.properties.datasetId || DEFAULT_PROPERTIES.datasetId; }
  public get datapointId(): string | undefined { return this.properties.datapointId || DEFAULT_PROPERTIES.datapointId; }
  public get verbose(): boolean { return this.properties.verbose || DEFAULT_PROPERTIES.verbose || HoneyHiveTracer.verbose; }
  public get disableHttpTracing(): boolean { return this.properties.disableHttpTracing || DEFAULT_PROPERTIES.disableHttpTracing; }

  // Setters
  public set sessionId(sessionId: string | undefined) { 
    if (!sessionId) {
      throw new Error("sessionId is required");
    }
    this.properties.sessionId = sessionId;
  }

  // Update instrument modules
  private updateInstrumentModules(instrumentModules: Record<string, any>): Record<string, any> { 
    HoneyHiveTracer.instrumentModules = { 
      ...HoneyHiveTracer.instrumentModules, 
      ...instrumentModules 
    };
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
  public async startSession(): Promise<string | null> {
    if (HoneyHiveTracer.failedToInitialize) {
      return null;
    }
    try {
      // If sessionId is already initialized, continue an existing session
      if (this.sessionId) {
        return this.sessionId;
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
      
      let sessionId: string;
      try {
        if (!HoneyHiveTracer.sdkInstance) {
          throw new Error("SDK instance is not initialized");
        }
        const res = await HoneyHiveTracer.sdkInstance.session.startSession(requestBody, {
          timeoutMs: 5000 // 5 seconds
        });
        if (!res.sessionId || res.sessionId === undefined) {
          throw new Error("No sessionId returned from server");
        }
        sessionId = res.sessionId as string;
      } catch (apiError) {
        // If API call fails, generate a random UUID as a fallback
        sessionId = crypto.randomUUID();
        if (HoneyHiveTracer.verbose) {
          console.warn(`Could not start HoneyHive session via API: ${apiError}. Using generated sessionId: ${sessionId}`);
        }
      }

      if (HoneyHiveTracer.verbose) {
        console.info("HoneyHive session started with id: ", sessionId);
      }

      // Set tracer sessionId
      this.sessionId = sessionId;
      assert(this.sessionId, "Could not get sessionId from server or generate random UUID");
      return this.sessionId;
    } catch (error) {
      if (HoneyHiveTracer.verbose) {
        console.error("Failed to create HoneyHive session:", error);
      }
      return null;
    }
  }

  /**
   * Private constructor for HoneyHiveTracer
   * Creates a new tracer instance with the provided SDK and properties
   * Sets the SDK instance if not already set and initializes properties
   * @param properties Optional configuration properties for the tracer
   */
  private constructor(
    params: Partial<HoneyHiveTracerProperties> | undefined = undefined
  ) {
    // error safe initialization
    if (params === undefined) {
      if (!HoneyHiveTracer.notifiedInitializationFailure && (!HoneyHiveTracer.isEvaluation || HoneyHiveTracer.failedToInitialize)) {
        console.error('\x1b[31mHoneyHiveTracer initialization failed.\nPlease initialize with HoneyHiveTracer.init({..., verbose: true}) to debug.\x1b[0m');
        HoneyHiveTracer.failedToInitialize = true;
        HoneyHiveTracer.notifiedInitializationFailure = true;
      }
      return;
    }

    try {
      // Check for apiKey
      const apiKey = params.apiKey || process.env['HH_API_KEY'];
      if (!apiKey) {
        throw new Error("apiKey is required to initialize HoneyHiveTracer. Please set HH_API_KEY environment variable or pass apiKey to tracer initialization props.");
      }

      // Set serverUrl
      params.serverUrl = params.serverUrl || process.env['HH_API_URL'] || DEFAULT_PROPERTIES.serverUrl;
      
      // Initialize SDK instance
      if (!HoneyHiveTracer.sdkInstance) {
        HoneyHiveTracer.sdkInstance = new HoneyHive({
          bearerAuth: apiKey,
          serverURL: params.serverUrl,
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
      if (params?.instrumentModules) {
        this.updateInstrumentModules(params.instrumentModules);
      }
      this.properties = {
        apiKey: params?.apiKey || this.apiKey,
        project: params?.project || this.project,
        sessionId: params?.sessionId || this.sessionId,
        serverUrl: params?.serverUrl || this.serverUrl,
        sessionName: params?.sessionName || this.sessionName,
        source: params?.source || this.source,
        inputs: params?.inputs || this.inputs,
        metadata: params?.metadata || this.metadata,
        disableBatch: params?.disableBatch || this.disableBatch,
        isEvaluation: params?.isEvaluation || this.isEvaluation,
        runId: params?.runId || this.runId,
        datasetId: params?.datasetId || this.datasetId,
        datapointId: params?.datapointId || this.datapointId,
        verbose: params?.verbose || this.verbose,
        disableHttpTracing: params?.disableHttpTracing || this.disableHttpTracing,
      }
      
    } catch (error) {
      if (HoneyHiveTracer.verbose) {
        console.error("Failed to initialize HoneyHiveTracer:", error);
      }
      return new HoneyHiveTracer();
    }
  }

  /**
   * Common initialization logic for both init and initFromSessionId
   * @param params Tracer properties
   * @returns Initialized tracer instance
   */
  public static async init(params: Partial<HoneyHiveTracerProperties> | undefined = {}): Promise<HoneyHiveTracer> {
    try {
      // Track verbose setting statically across all instances
      HoneyHiveTracer.verbose = HoneyHiveTracer.verbose || params?.verbose || DEFAULT_PROPERTIES.verbose;

      // Get traceloop association properties from context
      const contextAssocProps: TraceloopAssociationProperties | undefined = getAssociationPropsFromContext();
      if (contextAssocProps) {
        if (contextAssocProps['session_id']) {
          params.sessionId = contextAssocProps['session_id'];
        }
        if (contextAssocProps['project']) {
          params.project = contextAssocProps['project'];
        }
        if (contextAssocProps['source']) {
          params.source = contextAssocProps['source'];
        }
        if (contextAssocProps['disable_http_tracing']) {
          params.disableHttpTracing = contextAssocProps['disable_http_tracing'] === 'true';
        }
        if (contextAssocProps['run_id']) {
          params.runId = contextAssocProps['run_id'];
        }
        if (contextAssocProps['dataset_id']) {
          params.datasetId = contextAssocProps['dataset_id'];
        }
        if (contextAssocProps['datapoint_id']) {
          params.datapointId = contextAssocProps['datapoint_id'];
        }
      }

      // Create a new tracer instance
      const tracer = new HoneyHiveTracer(params);

      // Start session
      assert(tracer.project, // TODO: check for project validity
        "project is required to initialize HoneyHiveTracer. Please set HH_PROJECT environment variable or pass project to tracer initialization props."
      );
      const sessionId = await tracer.startSession();
      if (!sessionId) {
        return new HoneyHiveTracer();
      }

      // Initialize traceloop
      if (HoneyHiveTracer.isTraceloopInitialized) {
        return tracer;
      }

      /*
        instrumentModules?: {
          openAI?: typeof openai.OpenAI;
          anthropic?: typeof anthropic;
          azureOpenAI?: typeof azure;
          cohere?: typeof cohere;
          bedrock?: typeof bedrock;
          google_vertexai?: typeof vertexAI;
          google_aiplatform?: typeof aiplatform;
          pinecone?: typeof pinecone;
          together?: typeof together.Together;
          langchain?: {
              chainsModule?: typeof ChainsModule;
              agentsModule?: typeof AgentsModule;
              toolsModule?: typeof ToolsModule;
              runnablesModule?: typeof RunnableModule;
              vectorStoreModule?: typeof VectorStoreModule;
          };
          llamaIndex?: typeof llamaindex;
          chromadb?: typeof chromadb;
          qdrant?: typeof qdrant;
        };
      */
      traceloop.initialize({
        baseUrl: `${tracer.serverUrl}/opentelemetry`,
        apiKey: tracer.apiKey!,
        disableBatch: tracer.disableBatch,
        instrumentModules: HoneyHiveTracer.instrumentModules,
        logLevel: tracer.verbose ? "debug" : "error",
        silenceInitializationMessage: !tracer.verbose,
      });
      // await Telemetry.getInstance().capture("tracer_init", { "hhai_session_id": tracer.sessionId });
      HoneyHiveTracer.isTraceloopInitialized = true;

      // Log initialization success with orange color
      if (HoneyHiveTracer.verbose || !HoneyHiveTracer.isEvaluation) {
        console.log('\x1b[38;5;208mHoneyHive is initialized\x1b[0m');
      }
      if (HoneyHiveTracer.verbose) {
        console.log('\x1b[38;5;208mVerbose logging enabled for HoneyHive. Please set verbose: false to disable.\x1b[0m');
      }

      return tracer;
    } catch (error) {
      return new HoneyHiveTracer();
    }
  }

  public async enrichSession(params: EnrichSessionParams = {}): Promise<void> {
    if (!params.sessionId) {
      params.sessionId = this.sessionId;
    }
    return enrichSession(params);
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
    try {
      // Try to get association properties from context
      const contextAssocProps = getAssociationPropsFromContext();
      if (contextAssocProps) {
        return contextAssocProps;
      }

      this.testRequiredProperties();

      const associationProps: Record<string, string> = {};
      
      // Add basic properties
      associationProps['session_id'] = this.sessionId!;
      associationProps['project'] = this.project!;
      associationProps['source'] = this.source!;
      associationProps['disable_http_tracing'] = this.disableHttpTracing.toString().toLowerCase();

      if (this.runId) {
        associationProps['run_id'] = this.runId;
      }

      if (this.datasetId) {
        associationProps['dataset_id'] = this.datasetId;
      }

      if (this.datapointId) {
        associationProps['datapoint_id'] = this.datapointId;
      }

      return associationProps;
    } catch (error) {
      if (HoneyHiveTracer.verbose) {
        console.warn("Failed to get association properties:", error);
      }
      return {};
    }
  }

  public traceFunction(...args: any[]) {
    return traceFunction(...args, this.getTraceloopAssociationProperties());
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

  public trace<A extends unknown[], F extends (...args: A) => ReturnType<F>>(
    fn: F,
    ...args: A
  ): ReturnType<F> {
    try {
      if (this.sessionId) {
        const associationProps = this.getTraceloopAssociationProperties();
        
        // If traceloop.withAssociationProperties throws before executing fn,
        // we'll catch it in the outer try-catch and execute fn directly
        const result = traceloop.withAssociationProperties(
          associationProps,
          fn,
          undefined, // thisArg
          ...args
        );

        if (isPromise(result)) {
          return result.catch((error) => {
            if (HoneyHiveTracer.verbose) {
              console.warn("Unable to trace function. ", error);
            }
            // If we get here, fn was already executed by traceloop.withAssociationProperties
            // so we just return the original result
            return result;
          }) as ReturnType<F>;
        }
        return result as ReturnType<F>;
      } else {
        throw new Error("Session ID is not initialized");
      }
    } catch (error) {
      if (HoneyHiveTracer.verbose) {
        console.warn("Unable to trace function. ", error);
      }
      // If we get here, traceloop.withAssociationProperties threw before executing fn
      // so we need to execute fn directly
      return fn(...args);
    }
  }

  /*
  * @deprecated Use the exported enrichSpan function instead.
  */
  public enrichSpan(params: EnrichSpanParams = {}) {
    enrichSpan(params);
  }

  /**
   * @deprecated Use the exported enrichSpan function instead.
   */
  public static enrichSpan(params: EnrichSpanParams = {}) {
    enrichSpan(params);
  }

  /**
   * Flushes all pending spans in OTEL exporter batch.
   * 
   * Implementation uses a double-checked locking pattern with a mutex to ensure:
   * 1. Multiple concurrent flush calls reuse the same promise (fast path)
   * 2. Only one actual flush operation happens at a time
   * 3. The shared promise is properly cleaned up after completion
   * 4. Thread-safety is maintained throughout the process
   * 
   * @returns Promise that resolves when the flush is complete
   */
  public static async flush(): Promise<void> {
    try {
      if (!HoneyHiveTracer.isTraceloopInitialized) {
        throw new Error();
      }

      // Fast path: If a flush is already in progress, return the existing promise
      if (HoneyHiveTracer.flushPromise) {
        return HoneyHiveTracer.flushPromise;
      }

      // Slow path: Need to acquire the mutex to safely create a new flush
      return HoneyHiveTracer.flushMutex.runExclusive(async () => {
        if (!HoneyHiveTracer.isTraceloopInitialized) {
          return;
        }

        // Double-check if another thread created the promise while we were waiting
        if (HoneyHiveTracer.flushPromise) {
          return HoneyHiveTracer.flushPromise;
        }
        
        // Create a new flush promise
        try {
          HoneyHiveTracer.flushPromise = traceloop!.forceFlush();
          
          // TODO: for lambda, clear the otel context by setting an empty context as active
          // const emptyContext = trace.deleteSpan(context.active());
          // context.with(emptyContext, () => {});
          
          return HoneyHiveTracer.flushPromise;
        } finally {
          // Clean up after the promise is resolved
          HoneyHiveTracer.flushPromise!.then(
            () => { HoneyHiveTracer.flushPromise = null; }, // promise fulfilled
            () => { HoneyHiveTracer.flushPromise = null; } // promise rejected
          );
        }
      });
    } catch (error) {
      if (HoneyHiveTracer.verbose) {
        console.warn("Failed to flush:", error);
      }
    }
  }

  public async flush(): Promise<void> {
    try {
      return await HoneyHiveTracer.flush();
    } catch {
      // do nothing
    }
  }
}

export async function enrichSession(params: EnrichSessionParams = {}): Promise<void> {
  try {
    let {
      sessionId,
    } = params;
    
    const {
      metadata,
      feedback,
      metrics,
      config,
      inputs,
      outputs,
      userProperties
    } = params;

    // If sessionId is not provided, try to get from association properties
    if (!sessionId) {
      const contextAssocProps = getAssociationPropsFromContext();
      console.log("contextAssocProps", contextAssocProps);
      if (contextAssocProps && contextAssocProps['session_id']) {
        sessionId = contextAssocProps['session_id'];
      }
    }

    // Proceed only if we have a sessionId
    if (!sessionId) {
      if (HoneyHiveTracer.verbose) {
        console.error("Session ID is not provided and could not be found in context. Please initialize HoneyHiveTracer before calling enrichSession");
      }
      return;
    }

    const updateData: UpdateEventRequestBody = { eventId: sessionId };

    if (metadata) updateData['metadata'] = metadata;
    if (feedback) updateData['feedback'] = feedback;
    if (metrics) updateData['metrics'] = metrics;
    if (config) updateData['config'] = config;
    if (outputs) updateData['outputs'] = outputs;
    if (userProperties) updateData['userProperties'] = userProperties;

    // TODO support by adding type to UpdateEventRequestBody
    if (inputs) {
      if (HoneyHiveTracer.verbose) {
        console.warn("inputs are not yet supported in enrichSession");
      }
    }
  
    if (!HoneyHiveTracer.sdkInstance) {
      if (HoneyHiveTracer.verbose) {
        console.error("SDK instance is not initialized. Please initialize HoneyHiveTracer before calling enrichSession");
      }
      return;
    }
    await HoneyHiveTracer.sdkInstance.events.updateEvent(updateData, {
      timeoutMs: 5000 // 5 seconds
    });
  } catch (error) {
    if (HoneyHiveTracer.verbose) {
      console.warn("Failed to update event:", error);
    }
  }
}

export function enrichSpan({
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
  let span: Span | undefined;
  try {
    span = trace.getActiveSpan();
    if (!span) {
      if (HoneyHiveTracer.verbose) {
        console.warn("No active span found. Make sure enrichSpan is called within a traced function.");
      }
      return;
    }
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
  } catch (error) {
    if (HoneyHiveTracer.verbose) {
      console.warn("Failed to get active span:", error);
    }
    return;
  }
}

export function traceModel<F extends (...args: any[]) => any>(
  func: F,
  { config, metadata, eventName }: { config?: any | undefined; metadata?: any | undefined; eventName?: string | undefined } = {}
): F {
  return traceFunction({ eventType: "model", config, metadata, eventName })(func);
}

export function traceTool<F extends (...args: any[]) => any>(
  func: F,
  { config, metadata, eventName }: { config?: any | undefined; metadata?: any | undefined; eventName?: string | undefined } = {}
): F {
  return traceFunction({ eventType: "tool", config, metadata, eventName })(func);
} 

export function traceChain<F extends (...args: any[]) => any>(
  func: F,
  { config, metadata, eventName }: { config?: any | undefined; metadata?: any | undefined; eventName?: string | undefined } = {}
): F {
  return traceFunction({ eventType: "chain", config, metadata, eventName })(func);
}

export function traceFunction(
  { eventType, config, metadata, eventName }: 
  { eventType?: string | undefined; config?: any | undefined; metadata?: any | undefined; eventName?: string | undefined } = {},
  associationProperties: Record<string, string> | undefined = undefined
) {
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
      if (HoneyHiveTracer.verbose) {
        console.warn('Failed to parse function arguments:', error);
      }
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

      try {
        // Get argument names
        const argNames = getArgs(func);

        args.forEach((arg, index) => {
          const argName = (argNames && argNames[index]) ? argNames[index] : index.toString();
          setSpanAttributes(span, `honeyhive_inputs._params_.${argName}`, arg);
        });

        if (eventType) {
          if (typeof eventType === 'string' && ['tool', 'model', 'chain'].includes(eventType.toLowerCase())) {
            setSpanAttributes(span, 'honeyhive_event_type', eventType.toLowerCase());
          } else {
            if (HoneyHiveTracer.verbose) {
              console.warn("event_type could not be set. Must be 'tool', 'model', or 'chain'.");
            }
          }
        }
        if (config) {
          setSpanAttributes(span, 'honeyhive_config', config);
        }
        if (metadata) {
          setSpanAttributes(span, 'honeyhive_metadata', metadata);
        }

        // Set association properties
        if (!associationProperties) {
            // Try to get association properties from context
            const contextAssocProps = getAssociationPropsFromContext();
            
            if (!contextAssocProps) {
              if (HoneyHiveTracer.verbose) {
                console.error(
                  "No association properties found. " +
                "Please use tracer.trace<Model/Tool/Chain>(...) to trace a function, " +
                "or use tracer.trace(fn) at the top level to automatically get trace context."
                );
              }
              associationProperties = {};
            } else {
              associationProperties = contextAssocProps as Record<string, string>;
            }
        }
        
        // Set association properties on span
        // TODO: This should not be needed since we're calling withAssociationProperties
        // but chains dont work otherwise. Investigate.
        Object.entries(associationProperties).forEach(([key, value]) => {
          setSpanAttributes(span, `traceloop.association.properties.${key}`, value);
        });

        // Directly attach the span to the context
        const spanContext = trace.setSpan(context.active(), span);
        
        const result = context.with(spanContext, () => {
          return traceloop.withAssociationProperties(
            associationProperties || {}, // association properties (ensure it's not undefined)
            func, // function to trace
            undefined, // thisArg
            ...args // args
          );
        });

        if (isPromise(result)) {
          const newResult = result.then(
            (res: any) => {
              setSpanAttributes(span, 'honeyhive_outputs.result', res);
              span.end();
              return res;
            },
            (err: any) => {
              span.recordException(err);
              // Also capture the error message/details as a span attribute
              setSpanAttributes(span, 'honeyhive_error', String(err));
              span.end();
              throw err;
            }
          ) as ReturnType<T>;
          return newResult;
        } else {
          setSpanAttributes(span, 'honeyhive_outputs.result', result);
          span.end();
          return result;
        }
      } catch (err: unknown) {
        span.recordException(err as Exception);
        
        // Also capture the error message/details as a span attribute
        if (err instanceof Error) {
          setSpanAttributes(span, 'honeyhive_error', String(err));
        }

        span.end();
        throw err;
      }
    };

    // If Traceloop is not initialized, return the original function to avoid errors
    if (traceloop && trace && trace.getTracer('traceloop.tracer')) {
      return wrappedFunction as T;
    } else {
      return func as T;
    }
  };
}
