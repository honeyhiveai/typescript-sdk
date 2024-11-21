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
import * as pinecone from "@pinecone-database/pinecone";
import * as ChainsModule from "langchain/chains";
import * as AgentsModule from "langchain/agents";
import * as ToolsModule from "langchain/tools";
import * as chromadb from "chromadb";

// @ts-expect-error Azure SDK does not provide valid declarations for their CommonJS build
// https://github.com/Azure/azure-sdk-for-js/issues/28877
import * as azureOpenAI from "@azure/openai";

interface InitParams {
  apiKey?: string;
  project?: string;
  sessionName?: string;
  source?: string;
  serverUrl?: string;
  inputs?: Record<string, any>;
  isEvaluation?: boolean;
}

interface InitSessionIdParams {
  apiKey: string;
  sessionId: string;
  serverUrl?: string;
}

interface BetaLike {
  chat: {
    completions: {
      stream: any;
    };
  };
  embeddings: any;
}

interface ChatLike {
  completions: any;
}

interface OpenAILike {
  chat: ChatLike;
  embeddings: any;
  beta?: BetaLike;
}

type ChatParams = {
  messages: unknown;
  stream?: boolean | null;
};

interface NonStreamingChatResponse {
  choices: any[];
  usage:
    | {
        total_tokens: number;
        prompt_tokens: number;
        completion_tokens: number;
      }
    | undefined;
}

type StreamingChatResponse = any;
type EnhancedResponse = {
  response: Response;
  data: any;
};
interface APIPromise<T> extends Promise<T> {
  withResponse(): Promise<EnhancedResponse>;
}

function traceOpenAIv4<T extends OpenAILike>(openai: T, sessionId: string | undefined): T {
  const completionProxy = new Proxy(openai.chat.completions, {
    get(target, name, receiver) {
      const baseVal = Reflect.get(target, name, receiver);
      if (name === "create") {
          return wrapChatCompletion(baseVal.bind(target), sessionId);
      }
      return baseVal;
    },
  });
  const chatProxy = new Proxy(openai.chat, {
    get(target, name, receiver) {
      if (name === "completions") {
        return completionProxy;
      }
      return Reflect.get(target, name, receiver);
    },
  });

  const embeddingProxy = new Proxy(openai.embeddings, {
    get(target, name, receiver) {
      const baseVal = Reflect.get(target, name, receiver);
      if (name === "create") {
        //   return wrapEmbeddings(baseVal.bind(target));
        return baseVal;
      }
      return baseVal;
    },
  });

  let betaProxy: OpenAILike;
  if (openai.beta?.chat?.completions?.stream) {
    const betaChatCompletionProxy = new Proxy(openai?.beta?.chat.completions, {
      get(target, name, receiver) {
        const baseVal = Reflect.get(target, name, receiver);
        if (name === "parse") {
          //   return wrapBetaChatCompletionParse(baseVal.bind(target));
          return baseVal;
        } else if (name === "stream") {
          //   return wrapBetaChatCompletionStream(baseVal.bind(target));
          return baseVal;
        }
        return baseVal;
      },
    });
    const betaChatProxy = new Proxy(openai.beta.chat, {
      get(target, name, receiver) {
        if (name === "completions") {
          return betaChatCompletionProxy;
        }
        return Reflect.get(target, name, receiver);
      },
    });
    betaProxy = new Proxy(openai.beta, {
      get(target, name, receiver) {
        if (name === "chat") {
          return betaChatProxy;
        }
        return Reflect.get(target, name, receiver);
      },
    });
  }
  const proxy = new Proxy(openai, {
    get(target, name, receiver) {
      if (name === "chat") {
        return chatProxy;
      }
      // TODO: support embeddings
      if (name === "embeddings") {
        return embeddingProxy;
      }
      // TODO: support beta
      if (name === "beta" && betaProxy) {
        return betaProxy;
      }
      return Reflect.get(target, name, receiver);
    },
  });

  return proxy;
}

function wrapChatCompletion<
  P extends ChatParams,
  C extends NonStreamingChatResponse | StreamingChatResponse,
>(
  completion: (params: P, options?: unknown) => APIPromise<C>,
  sessionId: string | undefined,
): (params: P, options?: unknown) => Promise<any> {
  return async (allParams: P, options?: unknown) => {
    const { ...params } = allParams;

    const tracer = trace.getTracer('traceloop.tracer');
    const spanName = 'openai.chat';
    const span = tracer.startSpan(spanName);
    setSpanAttributes(span, 'honeyhive_event_type', 'model');
    setSpanAttributes(span, 'traceloop.association.properties.session_id', sessionId);

    const { messages, ...rest } = params;
    setSpanAttributes(span, 'honeyhive_inputs.chat_history', messages);
    setSpanAttributes(span, 'honeyhive_metadata', rest);

    // For some reason, CJS and ESM behave differently here.
    // CJS returns a streaming iterator or non-streaming response directly, but ESM returns a wrapped iterator or non-streaming response.
    if (params.stream) {
      const completionResponse = completion(params as P, options);
      let ret: StreamingChatResponse;
      const startTime = Math.floor(Date.now() / 1000);
      let wrapperStream: WrapperStream<any>;
      if (completionResponse.withResponse) {
        ({ data: ret } = await completionResponse.withResponse());
        wrapperStream = new WrapperStream(span, startTime, ret.iterator());
        ret.iterator = () => wrapperStream[Symbol.asyncIterator]();
      } else {
        ret = (await completionResponse) as StreamingChatResponse;
        wrapperStream = new WrapperStream(span, startTime, ret);
        ret = wrapperStream[Symbol.asyncIterator]();
      }
      
      return ret;
    } else {
      try {
        const completionResponse = completion(params as P, options);
        let ret: NonStreamingChatResponse;
        if (completionResponse.withResponse) {
          ({ data: ret } = await completionResponse.withResponse());
        } else {
          ret = (await completionResponse) as NonStreamingChatResponse;
        }

        const outputs = ret.choices && ret.choices[0] ? {
          finish_reason: ret.choices[0].finish_reason,
          role: ret.choices[0].message.role,
          content: ret.choices[0].message.content,
        } : {};
        setSpanAttributes(span, 'honeyhive_outputs', outputs);

        span.end();
        return ret;
      } catch (err: unknown) {
        span.recordException(err as Exception);
        span.end();
        throw err;
      }
    }
  };
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

function postprocessStreamingResults(allResults: any[]): {
  output: {
    role: string;
    content: string;
    finish_reason?: string;
  },
  // metrics: Record<string, number>;
} {
  let role = undefined;
  let content = undefined;
  let tool_calls = undefined;
  let finish_reason = undefined;
  let metrics = {};
  for (const result of allResults) {
    if (result.usage) {
      metrics = {
        ...metrics,
        tokens: result.usage.total_tokens,
        prompt_tokens: result.usage.prompt_tokens,
        completion_tokens: result.usage.completion_tokens,
      };
    }

    const delta = result.choices?.[0]?.delta;
    if (!delta) {
      continue;
    }

    if (!role && delta.role) {
      role = delta.role;
    }

    if (delta.finish_reason) {
      finish_reason = delta.finish_reason;
    }

    if (delta.content) {
      content = (content || "") + delta.content;
    }

    if (delta.tool_calls) {
      if (!tool_calls) {
        tool_calls = [
          {
            id: delta.tool_calls[0].id,
            type: delta.tool_calls[0].type,
            function: delta.tool_calls[0].function,
          },
        ];
      } else {
        tool_calls[0]!.function.arguments +=
          delta.tool_calls[0].function.arguments;
      }
    }
  }

  return {
    output: {
      role: role || "unknown",
      content: content || "",
      finish_reason: finish_reason || "unknown",
    },
    // metrics: metrics,
  };
}

class WrapperStream<Item> implements AsyncIterable<Item> {
  private span: Span;
  private iter: AsyncIterable<Item>;
  private startTime: number;

  constructor(span: Span, startTime: number, iter: AsyncIterable<Item>) {
    this.span = span;
    this.iter = iter;
    this.startTime = startTime;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<Item, any, undefined> {
    let first = true;
    const allResults: any[] = [];
    try {
      for await (const item of this.iter) {
        if (first) {
          const now = Math.floor(Date.now() / 1000);
          setSpanAttributes(this.span, 'metrics.time_to_first_token', now - this.startTime);
          first = false;
        }

        allResults.push(item);
        yield item;
      }

      const { output } = postprocessStreamingResults(allResults);
      setSpanAttributes(this.span, 'honeyhive_outputs', output);
    } finally {
      this.span.end();
    }
  }
}

export class HoneyHiveTracer {
  private sdk: HoneyHive;
  public sessionId: string | undefined;
  private spanProxy: any = {};
  private static isEvaluationModeActive: boolean = false;

  private constructor(sdk: HoneyHive) {
    this.sdk = sdk;
  }

  private async initSession(
    project: string,
    sessionName: string,
    source: string,
    apiKey: string,
    serverUrl: string,
    inputs?: Record<string, any>,
  ): Promise<void> {
    try {
      const requestBody = {
        session: {
          project: project,
          sessionName: sessionName,
          source: source,
          inputs: inputs || {}
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
              const sessionId = this.sessionId || "";
              return traceloop.withAssociationProperties(
                { session_id: sessionId },
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

  public static async init({
    apiKey,
    project,
    sessionName,
    source = "dev",
    serverUrl = "https://api.honeyhive.ai",
    inputs,
    isEvaluation = false
  }: InitParams = {}): Promise<HoneyHiveTracer> {
    if (!apiKey) {
      apiKey = process.env['HH_API_KEY'];
      if (!apiKey) {
        throw new Error("apiKey must be specified or set in environment variable HH_API_KEY.");
      }
    }
    if (!project) {
      project = process.env['HH_PROJECT'];
      if (!project) {
        throw new Error("project name must be specified or set in environment variable HH_PROJECT.");
      }
    }
    const sdk = new HoneyHive({
      bearerAuth: apiKey,
      serverURL: serverUrl,
    });
    const tracer = new HoneyHiveTracer(sdk);

    if (HoneyHiveTracer.isEvaluationModeActive && !isEvaluation) {
      return tracer;
    }
    if (isEvaluation) {
      HoneyHiveTracer.isEvaluationModeActive = true;
    }
    if (!sessionName) {
      try {
        // Check for CommonJS module
        if (typeof require !== 'undefined' && require.main) {
          sessionName = path.basename(require.main.filename);
        } else if (typeof process !== 'undefined' && process.argv && process.argv[1]) {
          // Check for ES Module by using process.argv
          sessionName = path.basename(process.argv[1]);
        } else {
          sessionName = 'unknown';
        }
      } catch (error) {
        sessionName = 'unknown';
      }
    }
    await tracer.initSession(project, sessionName, source, apiKey, serverUrl, inputs);
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

  public traceModel<F extends (...args: any[]) => any>(
    func: F,
    { config, metadata }: { config?: any; metadata?: any } = {}
  ): F {
    return this.traceFunction({ eventType: "model", config, metadata })(func);
  }

  public traceTool<F extends (...args: any[]) => any>(
    func: F,
    { config, metadata }: { config?: any; metadata?: any } = {}
  ): F {
    return this.traceFunction({ eventType: "tool", config, metadata })(func);
  } 

  public traceChain<F extends (...args: any[]) => any>(
    func: F,
    { config, metadata }: { config?: any; metadata?: any } = {}
  ): F {
    return this.traceFunction({ eventType: "chain", config, metadata })(func);
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

  public traceOpenAI<T extends object>(openai: T): T {
    if ((openai as any)?.chat?.completions?.create) {
      return traceOpenAIv4(openai as any, this.sessionId) as T;
    } else {
      console.warn("Cannot trace unsupported OpenAI library, please upgrade to OpenAI v4");
      return openai;
    }
  }

  public async flush(): Promise<void> {
    return await traceloop.forceFlush();
  }
}
