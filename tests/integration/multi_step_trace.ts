import { HoneyHiveTracer, HoneyHive } from 'honeyhive';
import assert from "assert";
import { Operator, Event } from "honeyhive/models/components/index.js"; // Import Event type

// Keep interfaces used in the functions
interface MedicalDocument {
    docs: string[];
    response: string;
}

interface RagPipelineMetrics {
    num_retrieved_docs: number;
    query_length: number;
}

async function main() {
    // Environment variable checks
    if (!process.env.HH_API_KEY) {
        throw new Error("HH_API_KEY environment variable is not set.");
    }
    if (!process.env.HH_PROJECT) {
        throw new Error("HH_PROJECT environment variable is not set.");
    }
    const serverURL = process.env.HH_API_URL; // Optional

    const tracer = await HoneyHiveTracer.init({
        apiKey: process.env.HH_API_KEY,
        project: process.env.HH_PROJECT,
        sessionName: "multi-step-trace-test", // Use a distinct session name for the test
        serverUrl: serverURL
    });

    const currentSessionId = tracer.sessionId;
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);

    // Define the get_relevant_docs function with tracing
    const getRelevantDocs = tracer.traceFunction()(
        function getRelevantDocs(query: string): string[] {
            console.log("Executing getRelevantDocs");
            const medicalDocs = [
                "Regular exercise reduces diabetes risk by 30%. Daily walking is recommended.",
                "Studies show morning exercises have better impact on blood sugar levels."
            ];
            
            tracer.enrichSpan({
                metrics: { retrieval_relevance: 0.5 }
            });
            
            return medicalDocs;
        }
    );

    const generateResponse = tracer.traceFunction()(
        function generateResponse(docs: string[], query: string): string {
            console.log("Executing generateResponse");
            const prompt = `Question: ${query}\nContext: ${docs}\nAnswer:`;
            const response = "This is a test response.";
            
            tracer.enrichSpan({
                metrics: { contains_citations: true }
            });
            
            return response;
        }
    );

    const ragPipeline = tracer.traceFunction()(
        function ragPipeline(query: string): MedicalDocument {
            console.log("Executing ragPipeline");
            const docs = getRelevantDocs(query);
            const response = generateResponse(docs, query);
            
            tracer.enrichSession({
                metrics: {
                    rag_pipeline: {
                        num_retrieved_docs: docs.length,
                        query_length: query.split(" ").length
                    } // No need for 'as RagPipelineMetrics' if types match
                }
            });
            
            return { docs, response };
        }
    );

    // Execute the pipeline
    const query = "How does exercise affect diabetes?";
    console.log("Executing pipeline...");
    const result = ragPipeline(query);
    console.log("Pipeline executed, result:", result);

    // Wait for data propagation
    console.log("Waiting for data propagation...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Initialize SDK
    const sdk = new HoneyHive({
        bearerAuth: process.env.HH_API_KEY,
        serverURL: serverURL
    });

    // Fetch events for the session
    console.log(`Fetching events for session ID: ${currentSessionId}`);
    try {
        const res = await sdk.events.getEvents({
            project: process.env.HH_PROJECT,
            filters: [
                {
                    field: "session_id",
                    value: currentSessionId,
                    operator: Operator.Is
                }
            ],
        });

        // Assertions
        assert(res.events, `Events response is undefined for session ${currentSessionId}`);
        // Expecting >= 4 events: Session Start, rag_pipeline, get_relevant_docs, generate_response
        assert(res.events.length >= 4, `Expected at least 4 events for session ${currentSessionId}, found ${res.events.length}`);
        console.log(`Found ${res.events.length} events.`);

        // Check for span-level metrics
        let spanMetricsFound = {
            retrieval_relevance: false,
            contains_citations: false
        };
        res.events.forEach((event: Event) => {
            if (event.metrics) {
                if ('retrieval_relevance' in event.metrics) {
                    spanMetricsFound.retrieval_relevance = true;
                    console.log(`Found retrieval_relevance metric in event: ${event.eventId}`);
                }
                if ('contains_citations' in event.metrics) {
                     spanMetricsFound.contains_citations = true;
                     console.log(`Found contains_citations metric in event: ${event.eventId}`);
                }
            }
        });

        assert(spanMetricsFound.retrieval_relevance, "'retrieval_relevance' metric not found in any event");
        assert(spanMetricsFound.contains_citations, "'contains_citations' metric not found in any event");
        console.log("Span-level metrics verified.");

        // Check for session-level metrics (should be in the session event)
        const sessionEvent = res.events.find((e: Event) => e.eventType === 'session');
        assert(sessionEvent, "Session start event not found");
        assert(sessionEvent.metrics, "Metrics not found in session start event");
        console.log("Session event metrics:", sessionEvent.metrics);
        assert(sessionEvent.metrics.rag_pipeline, "'rag_pipeline' metric not found in session start event metrics");
        // Use type assertion or check existence before accessing nested properties
        const ragPipelineMetrics = sessionEvent.metrics.rag_pipeline as RagPipelineMetrics;
        assert(ragPipelineMetrics, "'rag_pipeline' metric structure is invalid");
        assert.strictEqual(ragPipelineMetrics.num_retrieved_docs, 2, "num_retrieved_docs does not match");
        assert.strictEqual(ragPipelineMetrics.query_length, 5, "query_length does not match");
        console.log("Session-level metrics verified.");

    } catch (error) {
        console.error(`Error fetching or verifying events for session ${currentSessionId}:`, error);
        throw error; // Re-throw the error to fail the test
    }

    console.log('Test finished successfully.');
}

export { main };