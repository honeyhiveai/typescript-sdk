import { v4 as uuidv4 } from 'uuid';
import { HoneyHive } from './sdk';


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
    System = "system"
}

export interface ChatMessage {
    role: ChatRole;
    content: string;
    name?: string;
}

export interface ParentLog {
    project?: string;
    eventId?: string;
    sessionId?: string;
    eventType?: EventType;
    eventName?: string;
    config?: Config | ModelConfig | ToolConfig | AgentConfig;
    inputs?: { [key: string]: any };
    outputs?: { [key: string]: any };
    children?: ChildLog[];
    userProperties?: { [key: string]: any };
    metadata?: { [key: string]: any };
    source?: string;
    startTime?: number;
    endTime?: number;
    duration?: number;
    error?: string;
    metrics?: { [key: string]: number };
    feedback?: { [key: string]: any };
}

export interface ChildLog {
    project?: string;
    event_id: string;
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

export class SessionTracer {
    private eventStack: ChildLog[];
    private sdk: HoneyHive;
    private session_id: string;
    private parentEvent: ParentLog;

    constructor(private api_key: string, private project: string, private session_name: string, private user_properties: { [key: string]: any } = {}, private source: string = 'HoneyHive Typescript SDK') {
        this.eventStack = [];
        this.sdk = new HoneyHive({
            bearerAuth: api_key,
        });
        this.session_id = "";
        this.parentEvent = {};
    }

    async startSession(inputs?: { [key: string]: any }): Promise<void> {
        try {
            const event_id = uuidv4();
            this.parentEvent = {
                project: this.project,
                eventId: event_id,
                eventType: "chain",
                eventName: this.session_name,
                config: { type: "chain" },
                inputs: inputs || {},
                startTime: Date.now(),
                userProperties: this.user_properties,
                metadata: {},
                source: this.source,
                children: [],
                metrics: {},
                feedback: {},
            };
            const res = await this.sdk.postSessionStart({
                userProperties: this.user_properties,
                sessionId: event_id,
                sessionName: this.session_name,
                source: this.source,
                project: this.project,
            });
            const session_id = res.sessionStartResponse?.sessionId;
            if (session_id) {
                this.session_id = session_id;
            } else {
                throw new Error("Session start failed!");
            }
        } catch {
            // continue regardless of error
        }
    }

    startEvent(event_type: EventType, event_name: string, config: Config | ModelConfig | ToolConfig | AgentConfig, inputs: { [key: string]: any }): void {
        try {
            const newEvent: ChildLog = {
                event_id: uuidv4(),
                parent_id: this.eventStack.length > 0 ? this.eventStack[this.eventStack.length - 1].event_id : this.parentEvent.eventId,
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
                currentEvent.end_time = Date.now();
                currentEvent.duration = currentEvent.end_time - (currentEvent.start_time || currentEvent.end_time);
                currentEvent.outputs = outputs;
                if (error) {
                    currentEvent.error = error;
                }
                if (this.eventStack.length > 0) {
                  this.eventStack[this.eventStack.length - 1].children = [...(this.eventStack[this.eventStack.length - 1].children || []), currentEvent];
                } else {
                  this.parentEvent.children = [...(this.parentEvent.children || []), currentEvent];
                }
            }
        } catch {
            // continue regardless of error
        }
    }

    async endSession(outputs?: { [key:string]: any }, error?: string): Promise<void> {
        try {
            while (this.eventStack.length > 0) {
                this.endEvent();
            }
            const session_trace = this.parentEvent;
            if (session_trace) {
                session_trace.sessionId = uuidv4();
            }
            session_trace.endTime = Date.now();
            session_trace.duration = session_trace.endTime - (session_trace.startTime || session_trace.endTime);
            session_trace.outputs = outputs;
            if (error) {
                session_trace.error = error;
            }
            if (session_trace) {
                const res = await this.sdk.postSessionSessionIdTraces(this.session_id, { logs: [session_trace] });

                if (res.statusCode == 200) {
                    // handle response
                    console.log('Session trace sent successfully.');
                } else {
                    console.error('Failed to send session trace:', res);
                }
            }
        } catch {
            // continue regardless of error
        }
    }
}
