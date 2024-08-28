import axios, { AxiosInstance } from 'axios';
import { v4 as uuid } from 'uuid'
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

  override async handleLLMStart(
    // @ts-ignore
    llm: Serialized,
    prompts: string[],
    runId: string,
    parentRunId?: string,
    // @ts-ignore
    extraParams?: Record<string, unknown>,
    // @ts-ignore
    tags?: string[],
    metadata?: Record<string, unknown>,
    // @ts-ignore
    runName?: string
  ): Promise<void> {
    const inputs = prompts.map(prompt => ({ text: prompt }));
    const log = this.createLog('llm', inputs, runId, parentRunId, metadata);
    await this.postTrace([log]);
  }

  override async handleLLMEnd(output: LLMResult, runId: string): Promise<void> {
    const log = this.createLog('llm', [], runId);
    log.outputs = output.generations?.map(g => g?.[0]?.text);
    await this.postTrace([log]);
  }

  override async handleChainStart(
    // @ts-ignore
    chain: Serialized,
    inputs: ChainValues,
    runId: string,
    parentRunId?: string,
    // @ts-ignore
    tags?: string[],
    metadata?: Record<string, unknown>,
    runType?: string,
    // @ts-ignore
    runName?: string
  ): Promise<void> {
    const log = this.createLog(runType || 'chain', inputs, runId, parentRunId, metadata);
    await this.postTrace([log]);
  }

  override async handleChainEnd(outputs: ChainValues, runId: string): Promise<void> {
    const log = this.createLog('chain', [], runId);
    log.outputs = outputs;
    await this.postTrace([log]);
  }

  override async handleAgentAction(
    action: AgentAction,
    runId: string,
    parentRunId?: string
  ): Promise<void> {
    const log = this.createLog('agent', action.toolInput, runId, parentRunId);
    log.metadata = { action };
    await this.postTrace([log]);
  }

  override async handleAgentEnd(action: AgentFinish, runId: string): Promise<void> {
    const log = this.createLog('agent', [], runId);
    log.outputs = action.returnValues;
    await this.postTrace([log]);
  }

  private createLog(
    eventType: string,
    inputs: any,
    runId: string,
    parentRunId?: string,
    metadata?: Record<string, any>
  ) {
    return {
      project: this.project,
      event_id: runId,
      parent_id: parentRunId || null,
      event_type: eventType,
      event_name: this.name || eventType,
      config: {},
      inputs,
      outputs: null as Record<string, any> | null,
      children: [],
      user_properties: this.userProperties,
      metadata: metadata || {},
      source: this.source,
      start_time: Date.now() * 1000, // microseconds
      end_time: Date.now() * 1000, // microseconds, replace this later
      duration: 0,
      error: null,
    };
  }

  private async postTrace(logs: any[]): Promise<void> {
    const sessionLogs = {
      logs,
      session_id: this.sessionId,
      project: this.project,
      source: this.source,
    };

    try {
      await this.axiosInstance.post(`/session/${this.sessionId}/traces`, sessionLogs);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Failed to send trace to HoneyHive:', errorMessage);
    }
  }
}
