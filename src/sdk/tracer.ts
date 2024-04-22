import { v4 as uuidv4 } from "uuid";
import axios, { AxiosInstance } from "axios";

export type EventType = "chain" | "generic" | "tool" | "model";

export interface Config {
  type: string;
  name?: string;
  description?: string;
}

export interface ModelConfig extends Config {
  provider: string;
  endpoint?: string;
  model: string;
  prompt_template?: string;
  chat_template?: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  other?: { [key: string]: any };
}

export interface ToolConfig extends Config {
  source?: string;
  other?: { [key: string]: any };
}

export interface AgentOther {
  max_iterations: number;
  stop?: string | string[];
  output_parser?: string;
}

export interface AgentConfig extends Config {
  agent_class: string;
  tools: ToolConfig[];
  model_config: ModelConfig;
  other: AgentOther;
}

export enum ChatRole {
  User = "user",
  Assistant = "assistant",
  System = "system",
}

export interface ChatMessage {
  role: ChatRole;
  content: string;
  name?: string;
}

export interface ParentLog {
  project?: string;
  event_id?: string;
  session_id?: string;
  event_type?: EventType;
  event_name?: string;
  config?: Config | ModelConfig | ToolConfig | AgentConfig;
  inputs?: { [key: string]: any };
  outputs?: { [key: string]: any };
  children?: ChildLog[];
  user_properties?: { [key: string]: any };
  metadata?: { [key: string]: any };
  source?: string;
  start_time?: number;
  end_time?: number;
  duration?: number;
  error?: string;
  metrics?: { [key: string]: number };
  feedback?: { [key: string]: any };
}

export interface ChildLog {
  project?: string;
  event_id?: string;
  session_id?: string;
  parent_id?: string;
  event_type: EventType;
  event_name: string;
  config: Config | ModelConfig | ToolConfig | AgentConfig;
  inputs: { [key: string]: any };
  outputs?: { [key: string]: any };
  children?: ChildLog[];
  user_properties?: { [key: string]: any };
  metadata?: { [key: string]: any };
  source?: string;
  start_time?: number;
  end_time?: number;
  duration?: number;
  error?: string;
  metrics?: { [key: string]: number };
  feedback?: { [key: string]: any };
}

interface EvalInfo {
  runName?: string;
  datasetId?: string;
  projectId?: string;
  datapointIds?: string[];
  runId?: string;
}

export class SessionTracer {
  private eventStack: ChildLog[];
  private client: AxiosInstance;
  private session_id: string;
  private parentEvent: ParentLog;
  private evalInfo: EvalInfo | undefined;
  private lastEventId: string;
  private lastEventMetrics: { [key: string]: any };
  private lastEventMetadata: { [key: string]: any };

  constructor(
    private api_key: string,
    private project: string,
    private session_name: string,
    private user_properties: { [key: string]: any } = {},
    private source: string = "HoneyHive Typescript SDK",
    private metadata: { [key: string]: any } = {},
  ) {
    this.eventStack = [];
    this.client = axios.create({
      headers: {
        Authorization: "Bearer " + api_key,
      },
    });
    this.session_id = "";
    this.parentEvent = {};
    this.lastEventId = "";
    this.lastEventMetrics = {};
    this.lastEventMetadata = {};
  }

  public getSessionId(): string {
    return this.session_id;
  }

  public getEvalInfo(): EvalInfo | undefined {
    return this.evalInfo;
  }

  public async setMetric(
    metric_name: string,
    metric_value: any,
    threshold: any,
  ): Promise<void> {
    if (!this.lastEventId) {
      throw new Error("No events defined on session to set metric on");
    }
    const metrics: Record<string, any> = { ...this.lastEventMetrics };
    const metadata: Record<string, any> = { ...this.lastEventMetadata };
    metrics[metric_name] = metric_value;
    metadata[`threshold_${metric_name}`] = threshold;
    const body = {
      event_id: this.lastEventId,
      metadata: metadata,
      metrics: metrics,
    };
    try {
      const res = await this.client.put(
        `https://api.honeyhive.ai/events`,
        body,
      );
      if (res.status === 200) {
        this.lastEventMetrics = metrics;
        this.lastEventMetadata = metadata;
      }
    } catch (error) {
      // continue regardless of error
    }
  }

  async startSession(inputs?: { [key: string]: any }): Promise<void> {
    try {
      this.session_id = uuidv4();
      const session = {
        project: this.project,
        source: this.source,
        session_name: this.session_name,
        user_properties: this.user_properties,
        inputs: inputs || {},
        event_id: this.session_id,
        session_id: this.session_id,
      };
      this.parentEvent = {
        project: this.project,
        event_type: "chain",
        event_name: this.session_name,
        config: { type: "chain" },
        inputs: inputs || {},
        start_time: Date.now(),
        user_properties: this.user_properties,
        metadata: {},
        source: this.source,
        children: [],
        metrics: {},
        feedback: {},
        event_id: uuidv4(),
        session_id: this.session_id,
      };
      await this.client.post(`https://api.honeyhive.ai/session/start`, {
        session: session,
      });
    } catch {
      // continue regardless of error
    }

    if (this.source === "evaluation") {
      try {
        if (this.metadata && "run_id" in this.metadata) {
          this.evalInfo = { runId: this.metadata["run_id"] };
        } else if (this.metadata && "dataset_name" in this.metadata) {
          const projectRes = await this.client.get(
            `https://api.honeyhive.ai/projects`,
            {
              params: { name: this.project },
            },
          );

          if (projectRes.status !== 200)
            throw new Error("Failed to fetch project");

          const projectId = projectRes.data[0]._id;

          const datasetRes = await this.client.get(
            `https://api.honeyhive.ai/datasets`,
            {
              params: {
                name: this.metadata["dataset_name"],
                project: projectId,
              },
            },
          );

          if (datasetRes.status !== 200)
            throw new Error("Failed to fetch dataset");

          const dataset = datasetRes.data["testcases"][0];
          const datasetId = dataset["_id"];
          const datapointIds = dataset["datapoints"];
          const runName =
            "run_name" in this.metadata
              ? this.metadata["run_name"]
              : this.session_name;

          this.evalInfo = {
            datasetId: datasetId,
            datapointIds: datapointIds,
            projectId: projectId,
            runName: runName,
          };
        }
      } catch (error) {
        // continue regardless of error
      }
    }
  }

  startEvent(
    event_type: EventType,
    event_name: string,
    config: Config | ModelConfig | ToolConfig | AgentConfig,
    inputs: { [key: string]: any },
  ): void {
    try {
      const newEvent: ChildLog = {
        session_id: this.session_id,
        event_id: uuidv4(),
        project: this.project,
        parent_id:
          this.eventStack.length > 0
            ? this.eventStack[this.eventStack.length - 1].event_id
            : this.parentEvent.event_id,
        event_type,
        event_name,
        config,
        inputs,
        start_time: Date.now(),
        user_properties: this.user_properties,
        metadata: {},
        source: this.source,
        children: [],
        error: "",
        metrics: {},
        feedback: {},
      };
      this.eventStack.push(newEvent);
    } catch {
      // continue regardless of error
    }
  }

  endEvent(outputs?: { [key: string]: any }, error?: string): void {
    try {
      if (this.eventStack.length < 1) {
        throw new Error("No event to end. Stack length must be at least 1.");
      }
      const currentEvent = this.eventStack.pop();
      if (currentEvent) {
        if (currentEvent.event_id) {
          this.lastEventId = currentEvent.event_id;
          if (currentEvent.metrics) {
            this.lastEventMetrics = currentEvent.metrics;
          } else {
            this.lastEventMetrics = {};
          }
          if (currentEvent.metadata) {
            this.lastEventMetadata = currentEvent.metadata;
          } else {
            this.lastEventMetadata = {};
          }
        }
        currentEvent.end_time = Date.now();
        currentEvent.duration =
          currentEvent.end_time -
          (currentEvent.start_time || currentEvent.end_time);
        currentEvent.outputs = outputs;
        if (error) {
          currentEvent.error = error;
        }
        if (this.eventStack.length > 0) {
          this.eventStack[this.eventStack.length - 1].children = [
            ...(this.eventStack[this.eventStack.length - 1].children || []),
            currentEvent,
          ];
        } else {
          this.parentEvent.children = [
            ...(this.parentEvent.children || []),
            currentEvent,
          ];
        }
      }
    } catch {
      // continue regardless of error
    }
  }

  async endSession(
    outputs?: { [key: string]: any },
    error?: string,
  ): Promise<void> {
    try {
      while (this.eventStack.length > 0) {
        this.endEvent();
      }
      const session_trace = this.parentEvent;
      session_trace.end_time = Date.now();
      session_trace.duration =
        session_trace.end_time -
        (session_trace.start_time || session_trace.end_time);
      session_trace.outputs = outputs;
      if (error) {
        session_trace.error = error;
      }
      if (session_trace) {
        await this.client.post(
          `https://api.honeyhive.ai/session/${this.session_id}/traces`,
          {
            logs: [session_trace],
          },
        );

        await this.client.put(`https://api.honeyhive.ai/events`, {
          event_id: this.session_id,
          outputs: outputs,
        });

        if (this.evalInfo) {
          if (this.evalInfo.runId) {
            const getRunRes = await this.client.get(
              `https://api.honeyhive.ai/runs/${this.evalInfo.runId}`,
            );

            if (getRunRes.status !== 200)
              throw new Error("Failed to get run info");

            var eventIds = getRunRes.data["evaluation"]["event_ids"];
            eventIds.push(this.session_id);
            const updateRunRes = await this.client.put(
              `https://api.honeyhive.ai/runs/${this.evalInfo.runId}`,
              { event_ids: eventIds },
            );

            if (updateRunRes.status !== 200)
              throw new Error("Failed to update run info");
          } else {
            let body: any = {
              event_ids: [this.session_id],
              dataset_id: this.evalInfo.datasetId,
              datapoint_ids: this.evalInfo.datapointIds,
              project: this.evalInfo.projectId,
              status: "completed",
              name: this.evalInfo.runName,
            };

            if ("config" in session_trace) {
              body["configuration"] = session_trace["config"];
            }

            const runRes = await this.client.post(
              `https://api.honeyhive.ai/runs`,
              body,
            );

            if (runRes.status !== 200)
              throw new Error("Failed to submit eval info");

            const runId = runRes.data["run_id"];
            this.evalInfo.runId = runId;
          }
        }
      }
    } catch {
      // continue regardless of error
    }
  }
}
