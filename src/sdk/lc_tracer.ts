import { DocumentInterface } from '@langchain/core/documents';
import { BaseCallbackHandler } from '@langchain/core/callbacks/base';
import { AgentAction, AgentFinish } from '@langchain/core/agents';
import { ChainValues } from '@langchain/core/utils/types';
import { LLMResult } from '@langchain/core/outputs';
import { Serialized } from '@langchain/core/load/serializable';
import { v4 as uuidv4 } from 'uuid';

interface HoneyHiveTracerInput {
  project: string;
  name: string;
  source?: string;
  userProperties?: Record<string, any>;
  apiKey?: string;
  verbose?: boolean;
  baseUrl?: string;
}

interface Log {
  project?: string;
  event_id: string;
  parent_id?: string | undefined;
  event_type: string;
  event_name: string;
  config: any;
  inputs: Record<string, any>;
  metrics?: Record<string, any> | undefined;
  feedback?: Record<string, any> | undefined;
  user_properties?: Record<string, any> | undefined;
  outputs?: Record<string, any> | undefined;
  children?: Log[];
  start_time: number;
  end_time: number;
  duration: number;
  metadata?: Record<string, unknown> | undefined;
  source?: string;
  error?: string | undefined;
}

class HoneyHiveLangChainTracer extends BaseCallbackHandler {
  project: string;
  name: string;
  source: string;
  userProperties?: Record<string, any> | undefined;
  verbose: boolean;
  private headers: Record<string, string>;
  private baseUrl: string;
  private sessionId: string;
  private logStack: Log[] = [];

  constructor(input: HoneyHiveTracerInput) {
    super();
    this.project = input.project;
    this.name = input.name;
    this.source = input.source || 'langchain';
    this.userProperties = input.userProperties;
    this.verbose = input.verbose || false;
    this.baseUrl = input.baseUrl || 'https://api.honeyhive.ai';
    this.sessionId = uuidv4();

    const apiKey = input.apiKey || process.env['HONEYHIVE_API_KEY'];
    if (!apiKey) {
      throw new Error('HoneyHive API key is not set!');
    }

    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
  }

  private createLog(
    event_type: string,
    event_name: string | undefined,
    inputs: Record<string, any>,
    outputs: Record<string, any> | null,
    config: any,
    start_time: number,
    end_time: number,
    metadata?: Record<string, unknown> | undefined,
    error?: string,
    parent_id?: string,
    user_properties?: Record<string, any> | null,
    metrics?: Record<string, any> | null,
    feedback?: Record<string, any> | null,
  ): Log {
    return {
      project: this.project,
      event_id: uuidv4(),
      parent_id,
      event_type,
      event_name: event_name || "Event",
      config,
      inputs,
      outputs: outputs || {},
      user_properties: user_properties || {},
      metrics: metrics || {},
      feedback: feedback || {},
      start_time: start_time,
      end_time: end_time,
      duration: (end_time - start_time) / 1000,
      metadata: metadata,
      source: this.source,
      error,
      children: []
    };
  }

  private pushLog(log: Log): void {
    if (this.logStack.length > 0) {
      const parentLog = this.logStack[this.logStack.length - 1];
      log.parent_id = parentLog?.event_id;
      parentLog?.children?.push(log);
    }
    this.logStack.push(log);
  }

  private popLog(): Log | undefined {
    return this.logStack.pop();
  }

  override async handleLLMStart(
    llm: Serialized,
    prompts: string[],
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string,
    extraParams?: Record<string, unknown>,
    // @ts-expect-error: Not used
    tags?: string[],
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const startTime = 1000 * Date.now();
    const log = this.createLog(
      'model',
      llm.id[llm.id.length - 1],
      { prompts },
      null,
      this.convertToModelConfig(llm, extraParams),
      startTime,
      startTime,
      metadata,
      undefined,
      parentstring?.toString()
    );
    this.pushLog(log);
  }

  override async handleLLMEnd(
    output: LLMResult,
    // @ts-expect-error: Not used
    runId: string,
    // @ts-expect-error: Not used
    parentstring?: string
  ): Promise<void> {
    const endTime = 1000 * Date.now();
    const log = this.popLog();
    if (log) {
      log.end_time = endTime;
      log.duration = (endTime - log.start_time) / 1000;
      // Extract text and generationInfo from the output
      const generations = output.generations;

      const texts = generations.flat().map((gen) => gen.text);
      const metadataArray = generations.flat().map((gen) => {
        const { text, ...rest } = gen;
        return rest;
      });

      // Convert the metadata array to an object with index keys
      const metadata = metadataArray.reduce((acc, curr, index) => {
        acc[index] = curr;
        return acc;
      }, {} as Record<string, unknown>);
      log.outputs = { generations: texts };
      if (log.metadata) {
        log.metadata['generationInfo'] = metadata;
      }
      // If this is the top-level chain, post the entire log structure
      if (this.logStack.length === 0) {
        await this.postTrace([log]);
      }
    }
  }

  override async handleChainStart(
    chain: Serialized,
    inputs: ChainValues,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string,
    // @ts-expect-error: Not used
    tags?: string[],
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const startTime = 1000 * Date.now();
    const log = this.createLog(
      'chain',
      chain.id[chain.id.length - 1],
      inputs,
      null,
      {},
      startTime,
      startTime,
      metadata,
      undefined,
      parentstring?.toString()
    );
    this.pushLog(log);
  }

  override async handleChainEnd(
    outputs: ChainValues,
    // @ts-expect-error: Not used
    runId: string,
    // @ts-expect-error: Not used
    parentstring?: string
  ): Promise<void> {
    const endTime = 1000 * Date.now();
    const log = this.popLog();
    if (log) {
      log.end_time = endTime;
      log.duration = (endTime - log.start_time) / 1000;
      log.outputs = outputs;

      // If this is the top-level chain, post the entire log structure
      if (this.logStack.length === 0) {
        await this.postTrace([log]);
      }
    }
  }

  override async handleToolStart(
    tool: Serialized,
    input: string,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string,
    // @ts-expect-error: Not used
    tags?: string[],
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const startTime = 1000 * Date.now();
    const log = this.createLog(
      'tool',
      tool.id[tool.id.length - 1],
      { input },
      null,
      {},
      startTime,
      startTime,
      metadata,
      undefined,
      parentstring?.toString()
    );
    this.pushLog(log);
  }

  override async handleToolEnd(
    output: string,
    // @ts-expect-error: Not used
    runId: string,
    // @ts-expect-error: Not used
    parentstring?: string
  ): Promise<void> {
    const endTime = 1000 * Date.now();
    const log = this.popLog();
    if (log) {
      log.end_time = endTime;
      log.duration = (endTime - log.start_time) / 1000;
      log.outputs = { output: output };
      // If this is the top-level chain, post the entire log structure
      if (this.logStack.length === 0) {
        await this.postTrace([log]);
      }
    }
  }

  override async handleAgentAction(
    action: AgentAction,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const startTime = 1000 * Date.now();
    const log = this.createLog(
      'tool',
      'Agent Action',
      { action: action.tool, input: action.toolInput, log: action.log },
      null,
      {},
      startTime,
      startTime,
      undefined,
      undefined,
      parentstring?.toString()
    );
    this.pushLog(log);
    this.popLog();
    // If this is the top-level chain, post the entire log structure
    if (this.logStack.length === 0) {
      await this.postTrace([log]);
    }
  }

  override async handleAgentEnd(
    finish: AgentFinish,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const endTime = 1000 * Date.now();
    const log = this.createLog(
      'tool',
      'Agent Finish',
      { output: finish.returnValues, log: finish.log },
      { output: finish.returnValues, log: finish.log },
      {},
      endTime,
      endTime,
      undefined,
      undefined,
      parentstring?.toString()
    );
    this.pushLog(log);
    this.popLog();
    // If this is the top-level chain, post the entire log structure
    if (this.logStack.length === 0) {
      await this.postTrace([log]);
    }
  }

  private convertToModelConfig(
    llm: Serialized,
    extraParams?: Record<string, unknown>
  ): any {
    // This is a simplified conversion. You might need to adjust based on the actual structure of your LLM serialization
    return {
      model: llm.id[llm.id.length - 1],
      provider: llm.id[1], // Assuming the provider is the second element in the id array
      ...extraParams,
    };
  }

  private async postTrace(logs: Log[]): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/session/${this.sessionId}/traces`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ logs }),
      });

      if (!response.ok) {
        throw new Error(`Failed to post trace: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error posting trace:', error);
      if (this.verbose) {
        console.error(error);
      }
    }
  }

  override async handleChainError(
    error: Error,
    // @ts-expect-error: Not used
    runId: string,
    // @ts-expect-error: Not used
    parentstring?: string
  ): Promise<void> {
    const endTime = 1000 * Date.now();
    const log = this.popLog();
    if (log) {
      log.end_time = endTime;
      log.duration = (endTime - log.start_time) / 1000;
      log.error = error.message;

      // If this is the top-level chain, post the entire log structure
      if (this.logStack.length === 0) {
        await this.postTrace([log]);
      }
    }
  }

  override async handleLLMError(
    error: Error,
    // @ts-expect-error: Not used
    runId: string,
    // @ts-expect-error: Not used
    parentstring?: string
  ): Promise<void> {
    const endTime = 1000 * Date.now();
    const log = this.popLog();
    if (log) {
      log.end_time = endTime;
      log.duration = (endTime - log.start_time) / 1000;
      log.error = error.message;
      // If this is the top-level chain, post the entire log structure
      if (this.logStack.length === 0) {
        await this.postTrace([log]);
      }
    }
  }

  override async handleToolError(
    error: Error,
    // @ts-expect-error: Not used
    runId: string,
    // @ts-expect-error: Not used
    parentstring?: string
  ): Promise<void> {
    const endTime = 1000 * Date.now();
    const log = this.popLog();
    if (log) {
      log.end_time = endTime;
      log.duration = (endTime - log.start_time) / 1000;
      log.error = error.message;
      // If this is the top-level chain, post the entire log structure
      if (this.logStack.length === 0) {
        await this.postTrace([log]);
      }
    }
  }

  override async handleRetrieverStart(
    retriever: Serialized,
    query: string,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string,
    // @ts-expect-error: Not used
    tags?: string[],
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const startTime = 1000 * Date.now();
    const log = this.createLog(
      'tool',
      retriever.id[retriever.id.length - 1],
      { query },
      null,
      {},
      startTime,
      startTime,
      metadata,
      undefined,
      parentstring?.toString()
    );
    this.pushLog(log);
  }
  
  override async handleRetrieverEnd(
    documents: DocumentInterface[],
    // @ts-expect-error: Not used
    runId: string,
    // @ts-expect-error: Not used
    parentstring?: string
  ): Promise<void> {
    const endTime = 1000 * Date.now();
    const log = this.popLog();
    if (log) {
      log.end_time = endTime;
      log.duration = (endTime - log.start_time) / 1000;
      log.outputs = { documents };
      // If this is the top-level chain, post the entire log structure
      if (this.logStack.length === 0) {
        await this.postTrace([log]);
      }
    }
  }
  
  override async handleRetrieverError(
    error: Error,
    // @ts-expect-error: Not used
    runId: string,
    // @ts-expect-error: Not used
    parentstring?: string
  ): Promise<void> {
    const endTime = 1000 * Date.now();
    const log = this.popLog();
    if (log) {
      log.end_time = endTime;
      log.duration = (endTime - log.start_time) / 1000;
      log.error = error.message;
      // If this is the top-level chain, post the entire log structure
      if (this.logStack.length === 0) {
        await this.postTrace([log]);
      }
    }
  }


  async startNewSession(): Promise<void> {
    const sessionBody = {
      project: this.project,
      source: this.source,
      sessionId: this.sessionId,
      sessionName: this.name,
      userProperties: this.userProperties,
    };

    try {
      const response = await fetch(`${this.baseUrl}/session/start`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(sessionBody),
      });

      const text = await response.text();
      // Parse the JSON response
      const jsonResponse = JSON.parse(text);

      // Extract the session_id
      const sessionId = jsonResponse.session_id;
      this.sessionId = sessionId;

      if (!response.ok) {
        throw new Error(`Failed to start new session: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error starting new session:', error);
      if (this.verbose) {
        console.error(error);
      }
    }
  }
}

export { HoneyHiveLangChainTracer };
