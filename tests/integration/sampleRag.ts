import { HoneyHiveTracer, traceTool, traceModel, traceChain, enrichSpan, enrichSession } from "honeyhive";
import { OpenAI } from "openai";

const openai = new OpenAI();

// Keep interfaces used in the functions
interface MedicalDocument {
  docs: string[];
  response: string;
}

interface RagPipelineMetrics {
  num_retrieved_docs: number;
  query_length: number;
}

async function initializeTracer() {
  return await HoneyHiveTracer.init({
    sessionName: "multi-step-trace-test-ts-1-0-21",
    verbose: true,
  });
}


async function tracedMain() {

  // const currentSessionId = tracer.sessionId;
  // console.log(`Initialized tracer with session ID: ${currentSessionId}`);

  // Define the get_relevant_docs function with tracing
  const getRelevantDocs = traceTool(function getRelevantDocs(
    query: string,
  ): string[] {
    console.log("Executing getRelevantDocs");
    const medicalDocs = [
      "Regular exercise reduces diabetes risk by 30%. Daily walking is recommended.",
      "Studies show morning exercises have better impact on blood sugar levels.",
    ];

    enrichSpan({
      metrics: { retrieval_relevance: 0.5 },
    });

    return medicalDocs;
  });

  const generateResponse = traceModel(async function generateResponse(
    docs: string[],
    query: string,
  ): Promise<string> {
    console.log("Executing generateResponse");
    const prompt = `Question: ${query}\nContext: ${docs}\nAnswer:`;
    const response = await callOpenAI(prompt);

    enrichSpan({
      metrics: { contains_citations: true },
    });

    return response || "no response";
  });

  const ragPipeline = traceChain(async function ragPipeline(
    query: string,
  ): Promise<MedicalDocument> {
    console.log("Executing ragPipeline");
    const docs = getRelevantDocs(query);
    const response = await generateResponse(docs, query);

    enrichSession({
      metrics: {
        rag_pipeline: {
          num_retrieved_docs: docs.length,
          query_length: query.split(" ").length,
        }, // No need for 'as RagPipelineMetrics' if types match
      },
    });

    return { docs, response };
  });

  // Execute the pipeline
  const query = "How does exercise affect diabetes?";
  console.log("Executing pipeline...");
  const result = await ragPipeline(query);
  console.log("Pipeline executed, result:", result);

  console.log("Test finished successfully.");
}

async function callOpenAI(prompt: string) {
  const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message.content;
}

async function main() {
  const tracer = await initializeTracer();
  try {
    await tracer.trace(() => tracedMain());
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await tracer.flush();
  }
}

export { main };
