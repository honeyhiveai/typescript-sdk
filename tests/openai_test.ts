import OpenAI from 'openai';
import { HoneyHiveTracer } from 'honeyhive';
import { v4 as uuidv4 } from 'uuid';

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL;
const HH_PROJECT_NAME = process.env.HH_PROJECT_NAME || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

// log all env variables
console.log("HH_API_KEY:", HH_API_KEY);
console.log("HH_API_URL:", HH_API_URL);
console.log("HH_PROJECT_NAME:", HH_PROJECT_NAME);
console.log("OPENAI_API_KEY:", OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function initializeTracer(sessionName: string): Promise<HoneyHiveTracer> {
  const tracer = await HoneyHiveTracer.init({
    apiKey: HH_API_KEY,
    project: HH_PROJECT_NAME,
    sessionName: sessionName,
    source: "OpenAI Test",
    serverUrl: HH_API_URL,
  });

  return tracer;
}

async function makeOpenAICall(prompt: string, tracer: HoneyHiveTracer) {

const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
    });

    if (!completion.choices[0]?.message?.content) {
    throw new Error('No response content from OpenAI');
    }

    return completion.choices[0].message.content;
}

(async () => {
  try {
    console.log("Starting OpenAI test...");
    const sessionName = `OpenAI Test ${uuidv4()}`;
    
    const tracer = await initializeTracer(sessionName);
    
    const prompt = "Write a haiku about programming";
    console.log(`Sending prompt: ${prompt}`);
    
    const tracedMakeOpenAICall = tracer.traceFunction()(makeOpenAICall);
    const response = await tracedMakeOpenAICall(prompt, tracer);

    if (!response) {
      console.error("No response received from OpenAI");
    } else {
      console.log("Response:", response);
    }

  } catch (error) {
    console.error("Error in main execution:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  }
})(); 