import { HoneyHive } from "./sdk";
import * as traceloop from "@traceloop/node-server-sdk";

import OpenAI from "openai";
import * as anthropic from '@anthropic-ai/sdk';
import * as azureOpenAI from "@azure/openai";
import * as cohere from "cohere-ai";
import * as bedrock from "@aws-sdk/client-bedrock-runtime";
import * as google_aiplatform from "@google-cloud/aiplatform";
import * as pinecone from '@pinecone-database/pinecone';
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
  static async init({
    apiKey,
    project,
    sessionName,
    source,
    serverUrl = "https://api.honeyhive.ai",
  }: InitParams): Promise<void> {
    try {
      const sdk = new HoneyHive({
        bearerAuth: apiKey,
        serverURL: serverUrl,
      });
      const requestBody = {
        session: {
          project: project,
          sessionName: sessionName,
          source: source,
        },
      };
      const res = await sdk.session.startSession(requestBody);
      const sessionId = res.object?.sessionId;
      if (sessionId) {
        traceloop.initialize({
          baseUrl: `${serverUrl}/opentelemetry`,
          appName: sessionId,
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
      console.error(error);
    }
  }
}
