import OpenAI from "openai";
import axios from "axios";
import {
  HoneyHive,
  SessionTracer,
  Config,
  ToolConfig,
  ModelConfig,
} from "honeyhive";

// Configure your API keys here
const OPENAI_KEY = process.env.OPENAI_KEY;
const SERP_API_KEY = process.env.SERP_API_KEY;
const HH_PROJECT = process.env.HH_PROJECT;
const HH_API_KEY = process.env.HH_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_KEY });

// Function to search Google using the SERP API
async function searchGoogle(
  query: string,
  tracer: SessionTracer,
): Promise<string[]> {
  const searchConfig: ToolConfig = { type: "tool", name: "GoogleSearch" };
  tracer.startEvent("tool", "Google Search", searchConfig, { query });

  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=en&gl=us&api_key=${SERP_API_KEY}`;
  let results = [];
  try {
    const response = await axios.get(url);
    results = response.data.organic_results.map(
      (result: any) => result.snippet,
    );
  } catch (error) {
    console.error("Error during Google search:", error);
  }

  tracer.endEvent({ results });
  return results;
}

// Function to generate a summary of text using OpenAI's LLM
async function generateAnswer(
  text: string,
  question: string,
  tracer: SessionTracer,
): Promise<string | null> {
  const summarizeConfig: ModelConfig = {
    type: "model",
    name: "OpenAI Summarization",
    provider: "OpenAI",
    model: "gpt-3.5-turbo",
  };
  const prompt = `Answer the question "${question}" with the help of the following text:\n${text}`;
  tracer.startEvent("model", "Text Summarization", summarizeConfig, { prompt });

  let summary = null;
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    summary = chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error during text summarization:", error);
  }

  tracer.endEvent({ summary });
  return summary;
}

// Function to determine if the answer is satisfactory
async function isAnswerSatisfactory(
  question: string,
  text: string,
  tracer: SessionTracer,
): Promise<boolean> {
  const answerConfig: ModelConfig = {
    type: "model",
    name: "OpenAI Summarization",
    provider: "OpenAI",
    model: "gpt-3.5-turbo",
  };
  const prompt = `Question: "${question}"\n\nAnswer: "${text}"\n\nIs the provided answer clear and satisfactory? Please respond with "Yes" or "No".`;
  tracer.startEvent("model", "Answer Verification", answerConfig, { prompt });
  let ans = false;
  let response = null;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    response = chatCompletion.choices[0].message.content?.toLowerCase();
    // Assume a simple "Yes" or "No" for a straightforward answer.
    if (response) {
      ans = response.startsWith("yes");
    }
  } catch (error) {
    console.error("Error determining if the answer is satisfactory:", error);
  }

  const outputs = { answer: ans, model_response: response };
  tracer.endEvent({ outputs });
  return ans;
}

// Main pipeline function
export async function ReActPipeline(
  question: string,
  source: string,
  metadata: { [key: string]: any },
): Promise<SessionTracer> {
  const tracer = new SessionTracer(
    HH_API_KEY || "",
    HH_PROJECT || "",
    "My ReAct Pipeline",
    {},
    source,
    metadata,
  );
  await tracer.startSession({ question: question });
  let attempts = 0;
  const maxAttempts = 5;
  let satisfactory = false;
  let summary: string | null = "";

  while (!satisfactory && attempts < maxAttempts) {
    // Step 1: Turn the user question into a search query
    const searchQuery = `${question}`;
    console.log(`Searching for: ${searchQuery}`);
    const searchResults = await searchGoogle(searchQuery, tracer);

    if (searchResults.length === 0) {
      console.log("No search results found. Trying a different phrasing...");
      attempts++;
      continue;
    }

    // Step 2: Combine the search results into a single text
    const combinedSearchResults = searchResults.join("\n\n");

    // Step 3: Generate a summary of the search results
    summary = await generateAnswer(combinedSearchResults, question, tracer);

    // Step 4: Check if the summary is satisfactory
    if (summary) {
      satisfactory = await isAnswerSatisfactory(question, summary, tracer);
    } else {
      console.log("Failed to generate a summary. Trying again...");
    }

    attempts++;
  }

  // Output the final summary if satisfactory, or indicate failure
  if (satisfactory && summary) {
    console.log("Satisfactory Summary Found:", summary);
  } else {
    console.log(
      "Failed to find a satisfactory summary after several attempts.",
    );
  }

  await tracer.endSession({ finalSummary: summary });
  return tracer;
}
