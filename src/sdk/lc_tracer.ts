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
  eventId: string;
  parentId?: string | undefined;
  eventType: string;
  eventName: string;
  config: any;
  inputs: Record<string, any>;
  outputs?: Record<string, any> | undefined;
  children?: Log[];
  startTime: number;
  endTime: number;
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

    (async () => {
      await this.startNewSession();
    })();
  }

  private createLog(
    eventType: string,
    eventName: string | undefined,
    inputs: Record<string, any>,
    outputs: Record<string, any> | null,
    config: any,
    startTime: number,
    endTime: number,
    error?: string,
    parentId?: string
  ): Log {
    return {
      project: this.project,
      eventId: uuidv4(),
      parentId,
      eventType,
      eventName: eventName || "Event",
      config,
      inputs,
      outputs: outputs || undefined,
      startTime,
      endTime,
      duration: endTime - startTime,
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

  private async startNewSession(): Promise<void> {
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
/*
import axios, { AxiosInstance } from 'axios';
import { v4 as uuid } from 'uuid';
import { BaseCallbackHandler } from '@langchain/core/callbacks/base';
import { Serialized } from '@langchain/core/load/serializable';
import { ChainValues } from '@langchain/core/utils/types';
import { AgentAction, AgentFinish } from 'langchain/agents';
import { LLMResult } from '@langchain/core/outputs';

const HONEYHIVE_APP_URL = process.env['HONEYHIVE_APP_URL'] || 'https://api.honeyhive.ai';

interface HoneyHiveTracerConfig {
  project: string;
  apiKey?: string;
  name: string;
  source?: string;
  userProperties?: Record<string, any>;
  metadata?: Record<string, any>;
  verbose?: boolean;
  baseUrl?: string;
}

export class HoneyHiveLangChainTracer extends BaseCallbackHandler {
  private axiosInstance: AxiosInstance;
  private project: string;
  private source: string;
  name: string;
  private userProperties?: Record<string, any> | undefined;
  private sessionId: string;
  private logs: any[];

  constructor({
    project,
    apiKey,
    name,
    source = 'langchain',
    userProperties,
    verbose = false,
    baseUrl,
  }: HoneyHiveTracerConfig) {
    super();
    this.project = project;
    this.source = source;
    this.name = name;
    this.userProperties = userProperties;
    this.sessionId = uuid();
    this.logs = [];

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiKey || process.env['HONEYHIVE_API_KEY']) {
      headers['Authorization'] = `Bearer ${apiKey || process.env['HONEYHIVE_API_KEY']}`;
    }

    this.axiosInstance = axios.create({
      baseURL: baseUrl || HONEYHIVE_APP_URL,
      headers,
    });

    if (verbose) {
      this.axiosInstance.interceptors.response.use(
        response => response,
        error => {
          console.warn('HoneyHive API request failed:', error.message);
          return Promise.reject(error);
        }
      );
    }
  }

  private createLog(
    eventType: string,
    inputs: any,
    runId: string,
    parentstring?: string,
    metadata?: Record<string, any>,
    startTime?: number
  ) {
    const timestamp = startTime || Date.now() * 1000; // microseconds
    return {
      project: this.project,
      event_id: runId,
      parent_id: parentstring || null,
      event_type: eventType,
      event_name: this.name || eventType,
      config: {},
      inputs,
      outputs: null as Record<string, any> | null,
      children: [],
      user_properties: this.userProperties,
      metadata: metadata || {},
      source: this.source,
      start_time: timestamp,
      end_time: timestamp, // Updated when the event ends
      duration: 0, // Updated when the event ends
      error: null,
    };
  }

  private updateLog(log: any, outputs: any, error?: string) {
    log.outputs = outputs;
    log.error = error || null;
    log.end_time = Date.now() * 1000; // microseconds
    log.duration = log.end_time - log.start_time;
  }

  private async postLogs() {
    if (this.logs.length === 0) return;

    const sessionLogs = {
      logs: this.logs,
      session_id: this.sessionId,
      project: this.project,
      source: this.source,
    };

    try {
      await this.axiosInstance.post(`/session/${this.sessionId}/traces`, sessionLogs);
      this.logs = []; // Clear logs after successful post
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Failed to send trace to HoneyHive:', errorMessage);
      console.error(error);
    }
  }

  override async handleLLMStart(
    // @ts-expect-error: Not used
    llm: Serialized,
    prompts: string[],
    runId: string,
    parentstring?: string,
    // @ts-expect-error: Not used
    extraParams?: Record<string, unknown>,
    // @ts-expect-error: Not used
    tags?: string[],
    metadata?: Record<string, unknown>,
    // @ts-expect-error: Not used
    runName?: string
  ): Promise<void> {
    const inputs = prompts.map(prompt => ({ text: prompt }));
    const log = this.createLog('llm', inputs, runId, parentstring, metadata);
    this.logs.push(log);
  }

  override async handleLLMEnd(output: LLMResult, runId: string): Promise<void> {
    const log = this.logs.find(l => l.event_id === runId);
    if (log) {
      const outputs = output.generations?.map(g => g?.[0]?.text) || [];
      this.updateLog(log, outputs);
      await this.postLogs();
    }
  }

  override async handleChainStart(
    // @ts-expect-error: Not used
    chain: Serialized,
    inputs: ChainValues,
    runId: string,
    parentstring?: string,
    // @ts-expect-error: Not used
    tags?: string[],
    metadata?: Record<string, unknown>,
    runType?: string,
    // @ts-expect-error: Not used
    runName?: string
  ): Promise<void> {
    const log = this.createLog(runType || 'chain', inputs, runId, parentstring, metadata);
    this.logs.push(log);
  }

  override async handleChainEnd(outputs: ChainValues, runId: string): Promise<void> {
    const log = this.logs.find(l => l.event_id === runId);
    if (log) {
      this.updateLog(log, outputs);
      await this.postLogs();
    }
  }

  override async handleAgentAction(
    action: AgentAction,
    runId: string,
    parentstring?: string
  ): Promise<void> {
    const log = this.createLog('agent_action', action.toolInput, runId, parentstring);
    log.metadata = { action };
    this.logs.push(log);
  }

  override async handleAgentEnd(action: AgentFinish, runId: string): Promise<void> {
    const log = this.logs.find(l => l.event_id === runId);
    if (log) {
      this.updateLog(log, action.returnValues);
      await this.postLogs();
    }
  }
}
*/
