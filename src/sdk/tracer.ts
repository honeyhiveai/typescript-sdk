import path from "path";

import { HoneyHive } from "./sdk";
import { UpdateEventRequestBody } from "../models/operations/updateevent";
import { Telemetry } from "./telemetry";
import { Span, trace, Exception } from "@opentelemetry/api";
import * as traceloop from "@traceloop/node-server-sdk";

// eslint-disable-next-line import/no-named-as-default
import OpenAI from "openai";
import * as anthropic from "@anthropic-ai/sdk";
import * as cohere from "cohere-ai";
import * as bedrock from "@aws-sdk/client-bedrock-runtime";
import * as google_aiplatform from "@google-cloud/aiplatform";
import * as pinecone from "@pinecone-database/pinecone";
import * as ChainsModule from "langchain/chains";
import * as AgentsModule from "langchain/agents";
import * as ToolsModule from "langchain/tools";
import * as chromadb from "chromadb";

// @ts-expect-error Azure SDK does not provide valid declarations for their CommonJS build
// https://github.com/Azure/azure-sdk-for-js/issues/28877
import * as azureOpenAI from "@azure/openai";

interface InitParams {
  apiKey: string;
  project: string;
  sessionName?: string;
  source?: string;
  serverUrl?: string;
}

interface InitSessionIdParams {
  apiKey: string;
  sessionId: string;
  serverUrl?: string;
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

export class HoneyHiveTracer {
  private sdk: HoneyHive;
  public sessionId: string | undefined;
  private spanProxy: any = {};

  private constructor(sdk: HoneyHive) {
    this.sdk = sdk;
  }

  private async initSession(
    project: string,
    sessionName: string,
    source: string,
    apiKey: string,
    serverUrl: string,
  ): Promise<void> {
    try {
      const requestBody = {
        session: {
          project: project,
          sessionName: sessionName,
          source: source,
        },
      };
      const res = await this.sdk.session.startSession(requestBody);
      this.sessionId = res.sessionId;

      if (this.sessionId) {
        traceloop.initialize({
          baseUrl: `${serverUrl}/opentelemetry`,
          apiKey: apiKey,
          disableBatch: true,
          instrumentModules: {
            openAI: OpenAI,
            anthropic: anthropic,
            azureOpenAI: azureOpenAI,
            cohere: cohere,
            bedrock: bedrock,
            google_aiplatform: google_aiplatform,
            pinecone: pinecone,
            langchain: {
              chainsModule: ChainsModule,
              agentsModule: AgentsModule,
              toolsModule: ToolsModule,
            },
            chromadb: chromadb,
          },
        });
      }
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  }

  private async initSessionFromId(
    sessionId: string,
    apiKey: string,
    serverUrl: string,
  ): Promise<void> {
    this.sessionId = sessionId;
    traceloop.initialize({
      baseUrl: `${serverUrl}/opentelemetry`,
      apiKey: apiKey,
      disableBatch: true,
      instrumentModules: {
        openAI: OpenAI,
        anthropic: anthropic,
        azureOpenAI: azureOpenAI,
        cohere: cohere,
        bedrock: bedrock,
        google_aiplatform: google_aiplatform,
        pinecone: pinecone,
        langchain: {
          chainsModule: ChainsModule,
          agentsModule: AgentsModule,
          toolsModule: ToolsModule,
        },
        chromadb: chromadb,
      },
    });
  }

  public static async init({
    apiKey,
    project,
    sessionName,
    source = "dev",
    serverUrl = "https://api.honeyhive.ai",
  }: InitParams): Promise<HoneyHiveTracer> {
    console.log(serverUrl);
    const sdk = new HoneyHive({
      bearerAuth: apiKey,
      serverURL: serverUrl,
    });
    const tracer = new HoneyHiveTracer(sdk);
    if (!sessionName) {
      try {
        const mainModule = require.main;
        if (mainModule) {
          sessionName = path.basename(mainModule.filename);
        } else {
          sessionName = 'unknown';
        }
      } catch (error) {
        sessionName = 'unknown';
      }
    }
    await tracer.initSession(project, sessionName, source, apiKey, serverUrl);
    await Telemetry.getInstance().capture("tracer_init", { "hhai_session_id": tracer.sessionId });
    return tracer;
  }

  public static async initFromSessionId({
    apiKey,
    sessionId,
    serverUrl = "https://api.honeyhive.ai",
  }: InitSessionIdParams): Promise<HoneyHiveTracer> {
    const sdk = new HoneyHive({
      bearerAuth: apiKey,
      serverURL: serverUrl,
    });
    const tracer = new HoneyHiveTracer(sdk);
    await tracer.initSessionFromId(sessionId, apiKey, serverUrl);
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
        await this.sdk.events.updateEvent(updateData);
      } catch (error) {
        console.error("Failed to update event:", error);
      }
    } else {
      console.error("Session ID is not initialized");
    }
  }

  public traceFunction({ eventType, config, metadata }: { eventType?: string; config?: any; metadata?: any } = {}) {
    // Helper function to extract argument names from the function
    function getArgs(func: Function): string[] | null {
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
        const spanName = func.name || 'anonymous';
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

          // Log function arguments
          setSpanAttributes(span, 'traceloop.association.properties.session_id', this.sessionId);

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
          span.end();
          this.spanProxy = oldSpanProxy;
          throw err;
        }
      };
      return wrappedFunction as T;
    };
  }

  public trace(fn: () => void): void {
    if (this.sessionId) {
      traceloop.withAssociationProperties(
        {
          session_id: this.sessionId,
        },
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
    error
  }: {
    config?: any;
    metadata?: any;
    metrics?: any;
    feedback?: any;
    inputs?: any;
    outputs?: any;
    error?: any;
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
    } else {
      console.warn("No active span found. Make sure enrichSpan is called within a traced function.");
    }
  }

  public async flush(): Promise<void> {
    return await traceloop.forceFlush();
  }
}
