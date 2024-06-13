import { HoneyHive } from "./sdk";
import * as traceloop from "@traceloop/node-server-sdk";

import OpenAI from "openai";
import * as anthropic from "@anthropic-ai/sdk";
import * as azureOpenAI from "@azure/openai";
import * as cohere from "cohere-ai";
import * as bedrock from "@aws-sdk/client-bedrock-runtime";
import * as google_aiplatform from "@google-cloud/aiplatform";
import * as pinecone from "@pinecone-database/pinecone";
import * as ChainsModule from "langchain/chains";
import * as AgentsModule from "langchain/agents";
import * as ToolsModule from "langchain/tools";
import * as chromadb from "chromadb";

interface InitParams {
  apiKey: string;
  project: string;
  sessionName: string;
  source: string;
  serverUrl?: string;
}

export class HoneyHiveTracer {
  private sdk: HoneyHive;
  private sessionId: string | undefined;

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
      this.sessionId = res.object?.sessionId;
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

  public static async init({
    apiKey,
    project,
    sessionName,
    source,
    serverUrl = "https://api.honeyhive.ai",
  }: InitParams): Promise<HoneyHiveTracer> {
    const sdk = new HoneyHive({
      bearerAuth: apiKey,
      serverURL: serverUrl,
    });
    const tracer = new HoneyHiveTracer(sdk);
    await tracer.initSession(project, sessionName, source, apiKey, serverUrl);
    return tracer;
  }

  public async setFeedback(feedback: Record<string, any>): Promise<void> {
    if (this.sessionId) {
      try {
        await this.sdk.events.updateEvent({
          eventId: this.sessionId,
          feedback: feedback
        });
      } catch (error) {
        console.error("Failed to set feedback:", error);
      }
    } else {
      console.error("Session ID is not initialized");
    }
  }

  public async setEvaluator(metrics: Record<string, any>): Promise<void> {
    if (this.sessionId) {
      try {
        await this.sdk.events.updateEvent({
          eventId: this.sessionId,
          metrics: metrics
        });
      } catch (error) {
        console.error("Failed to set metrics:", error);
      }
    } else {
      console.error("Session ID is not initialized");
    }
  }
  
  public async setMetadata(metadata: Record<string, any>): Promise<void> {
    if (this.sessionId) {
      try {
        await this.sdk.events.updateEvent({
          eventId: this.sessionId,
          metadata: metadata
        });
      } catch (error) {
        console.error("Failed to set metadata:", error);
      }
    } else {
      console.error("Session ID is not initialized");
    }
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
}
