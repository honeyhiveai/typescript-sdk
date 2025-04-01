import { AzureOpenAI } from "openai";
import "@azure/openai/types";
import { HoneyHiveTracer, traceModel } from "honeyhive";

const deployment = "gpt-4o-mini";
const apiVersion = "2024-08-01-preview";

const client = new AzureOpenAI({ 
    deployment,
    apiVersion,
    apiKey: "6SOZrqvGmqL8XEuvns93AECqTHuBij62537rcZFIOlHqi2MIi9c0JQQJ99BAACHYHv6XJ3w3AAAAACOG1HLz",
    endpoint: "https://ai-mohak1742ai463968399897.openai.azure.com"
});

async function callAzureOpenAI(prompt: string) {
    const response = await client.chat.completions.create({
        messages: [
          {
            role: "user",
            content:
              prompt,
          },
        ],
        max_tokens: 128,
        model: "gpt-4o-mini",
    });
    return response.choices[0].message.content;
}

async function tracedMain() {
    const prompt = "What is the capital of France?";
    const tracedCallAzureOpenAI = traceModel(callAzureOpenAI);
    const response = await tracedCallAzureOpenAI(prompt);
    
    console.log("RESPONSE: ", response);
    await HoneyHiveTracer.flush();
}

async function main() {
    const tracer = await HoneyHiveTracer.init();
    return tracer.trace(tracedMain);
}

export { main };
