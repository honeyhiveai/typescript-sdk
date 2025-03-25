import OpenAI from "openai";
import axios from "axios";
import { HoneyHiveTracer } from "honeyhive";

const openai = new OpenAI();

// Function to search Google using the SERP API
async function searchGoogle(query: string): Promise<string[]> {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=en&gl=us&api_key=${process.env['SERP_API_KEY']}`;
  let results = [];
  try {
    const response = await axios.get(url);
    results = response.data.organic_results.map(
      (result: any) => result.snippet,
    );
  } catch (error) {
    console.error("Error during Google search:", error);
  }

  return results;
}

// Function to generate a summary of text using OpenAI's LLM
async function generateAnswer(
  text: string,
  question: string,
): Promise<string | null> {
  const prompt = `Answer the question "${question}" with the help of the following text:\n${text}`;

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

  return summary;
}

// Function to determine if the answer is satisfactory
async function isAnswerSatisfactory(
  question: string,
  text: string,
): Promise<boolean> {
  const prompt = `Question: "${question}"\n\nAnswer: "${text}"\n\nIs the provided answer clear and satisfactory? Please respond with "Yes" or "No".`;
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

  return ans;
}

// Main pipeline function
async function ReActPipeline(question: string, tracer?: HoneyHiveTracer): Promise<string | null> {
  let attempts = 0;
  const maxAttempts = 5;
  let satisfactory = false;
  let summary: string | null = "";

  while (!satisfactory && attempts < maxAttempts) {
    // Step 1: Turn the user question into a search query
    const searchQuery = `${question}`;
    console.log(`Searching for: ${searchQuery}`);
    const searchResults = await searchGoogle(searchQuery);

    if (searchResults.length === 0) {
      console.log("No search results found. Trying a different phrasing...");
      attempts++;
      continue;
    }

    // Step 2: Combine the search results into a single text
    const combinedSearchResults = searchResults.join("\n\n");

    // Step 3: Generate a summary of the search results
    summary = await generateAnswer(combinedSearchResults, question);

    // Step 4: Check if the summary is satisfactory
    if (summary) {
      satisfactory = await isAnswerSatisfactory(question, summary);
    } else {
      console.log("Failed to generate a summary. Trying again...");
    }

    attempts++;
  }

  // Output the final summary if satisfactory, or indicate failure
  if (satisfactory && summary) {
    if (tracer) {
      tracer.enrichSession({ metrics: { satisfactorySummaryFound: true } });
    }

    console.log("Satisfactory Summary Found:", summary);
  } else {
    if (tracer) {
      tracer.enrichSession({ metrics: { satisfactorySummaryFound: false } });
    }

    console.log(
      "Failed to find a satisfactory summary after several attempts.",
    );
  }
  return summary;
}

async function main() {
  const question = "What is the capital of France?";
  const tracer = await HoneyHiveTracer.init({apiKey: process.env['HH_API_KEY'], project: process.env['HH_PROJECT']});
  const result = await ReActPipeline(question, tracer);
  console.log(result);
  await tracer.flush();
}

export { main };
