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
  metadata?: Record<string, any>;
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
  metadata?: Record<string, any> | undefined;
  source?: string;
  error?: string | undefined;
}

class HoneyHiveLangChainTracer extends BaseCallbackHandler {
  project: string;
  name: string;
  source: string;
  userProperties?: Record<string, any> | undefined;
  metadata?: Record<string, any> | undefined;
  verbose: boolean;
  private headers: Record<string, string>;
  private baseUrl: string;
  private sessionId: string;

  constructor(input: HoneyHiveTracerInput) {
    super();
    this.project = input.project;
    this.name = input.name;
    this.source = input.source || 'langchain';
    this.userProperties = input.userProperties;
    this.metadata = input.metadata;
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

    /*(async () => {
      await this.startNewSession();
    })();*/
  }

  private createLog(
    event_type: string,
    event_name: string | undefined,
    inputs: Record<string, any>,
    outputs: Record<string, any> | null,
    config: any,
    start_time: number,
    end_time: number,
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
      start_time,
      end_time,
      duration: end_time - start_time,
      metadata: this.metadata,
      source: this.source,
      error,
    };
  }

  override async handleLLMStart(
    llm: Serialized,
    prompts: string[],
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string,
    extraParams?: Record<string, unknown>
  ): Promise<void> {
    const startTime = Date.now();
    const log = this.createLog(
      'llm',
      llm.id[llm.id.length - 1],
      { prompts },
      null,
      this.convertToModelConfig(llm, extraParams),
      startTime,
      startTime,
      undefined,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  override async handleLLMEnd(
    output: LLMResult,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const endTime = Date.now();
    const log = this.createLog(
      'llm',
      'LLM End',
      {},
      { generations: output.generations },
      {},
      endTime,
      endTime,
      undefined,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  override async handleChainStart(
    chain: Serialized,
    inputs: ChainValues,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const startTime = Date.now();
    const log = this.createLog(
      'chain',
      chain.id[chain.id.length - 1],
      inputs,
      null,
      {},
      startTime,
      startTime,
      undefined,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  override async handleChainEnd(
    outputs: ChainValues,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const endTime = Date.now();
    const log = this.createLog(
      'chain',
      'Chain End',
      {},
      outputs,
      {},
      endTime,
      endTime,
      undefined,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  override async handleToolStart(
    tool: Serialized,
    input: string,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const startTime = Date.now();
    const log = this.createLog(
      'tool',
      tool.id[tool.id.length - 1],
      { input },
      null,
      {},
      startTime,
      startTime,
      undefined,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  override async handleToolEnd(
    output: string,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const endTime = Date.now();
    const log = this.createLog(
      'tool',
      'Tool End',
      {},
      { output },
      {},
      endTime,
      endTime,
      undefined,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  override async handleAgentAction(
    action: AgentAction,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const startTime = Date.now();
    const log = this.createLog(
      'agent',
      'Agent Action',
      { action: action.tool, input: action.toolInput },
      null,
      {},
      startTime,
      startTime,
      undefined,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  async handleAgentFinish(
    finish: AgentFinish,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const endTime = Date.now();
    const log = this.createLog(
      'agent',
      'Agent Finish',
      {},
      { output: finish.returnValues },
      {},
      endTime,
      endTime,
      undefined,
      parentstring?.toString()
    );
    await this.postTrace([log]);
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
    parentstring?: string
  ): Promise<void> {
    const endTime = Date.now();
    const log = this.createLog(
      'chain',
      'Chain Error',
      {},
      null,
      {},
      endTime,
      endTime,
      error.message,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  override async handleLLMError(
    error: Error,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const endTime = Date.now();
    const log = this.createLog(
      'llm',
      'LLM Error',
      {},
      null,
      {},
      endTime,
      endTime,
      error.message,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  override async handleToolError(
    error: Error,
    // @ts-expect-error: Not used
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const endTime = Date.now();
    const log = this.createLog(
      'tool',
      'Tool Error',
      {},
      null,
      {},
      endTime,
      endTime,
      error.message,
      parentstring?.toString()
    );
    await this.postTrace([log]);
  }

  async startNewSession(): Promise<void> {
    const sessionBody = {
      project: this.project,
      source: this.source,
      sessionId: this.sessionId,
      sessionName: this.name,
      userProperties: this.userProperties,
      metadata: this.metadata,
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
