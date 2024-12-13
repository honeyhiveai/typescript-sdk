import { OpenAI } from 'openai';
import { Pinecone, IndexModel } from '@pinecone-database/pinecone';
import { HoneyHiveTracer } from "honeyhive";
import fs from 'fs';
// Initialize the HoneyHive tracer at the start
const tracer = await HoneyHiveTracer.init({
    apiKey: "Z29keTJ2OGduMGxqNTRpNWdpeW8waA==",
    project: "agi",
    source: "dev", // e.g. "prod", "dev", etc.
    sessionName: "RAG Session",
});

// Initialize clients
const openai = new OpenAI();

const embedQuery = async (query) => {
    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: query
    });
    return embeddingResponse.data[0].embedding;
};


const pc = new Pinecone({ apiKey: "fa580be1-38a2-4d70-aeac-e73233a520fe" });

const index_name = "tutorial"
let index;
const indexes = await pc.listIndexes();
if (!indexes.indexes!.some(index => index.name === index_name)) {
    await pc.createIndex({
        name: index_name,
        dimension: 1536, // OpenAI embeddings dimensions
        metric: 'cosine', // Replace with your model metric
        spec: { 
            serverless: { 
                cloud: 'aws', 
                region: 'us-east-1'
            }
        }
    });

    index = pc.Index(index_name);

    // read paul_graham.txt
    const text = fs.readFileSync('paul_graham.txt', 'utf8');

    const embedding = await embedQuery(text);

    await index.upsert([
        {
          "id": "paul-graham", 
          "values": embedding
        },
    ]);
} else {
    index = pc.Index(index_name);
}


const getRelevantDocumentsConfig = {
    "embedding_model": "text-embedding-ada-002",
    "top_k": 3
};

// Decorate the intermediate steps
const getRelevantDocuments = tracer.traceFunction({
    config: getRelevantDocumentsConfig
})(
    async function getRelevantDocuments(queryVector) {
        // if (!index) throw new Error('Index is not initialized');
        // const queryResult = await index.query({
        //     vector: queryVector,
        //     topK: 3,
        //     includeMetadata: true
        // });
        
        // return queryResult.matches.map(item => item.metadata!._node_content as string);
        return ["abc", "def"];
    }
);

const generateResponseConfig = {
    "model": "gpt-4o",
    "prompt": "You are a helpful assistant" 
};
const generateResponseMetadata = {
    "version": 1
};

// Decorate the intermediate steps
const generateResponse = tracer.traceFunction({
    config: generateResponseConfig,
    metadata: generateResponseMetadata
})(
    async function generateResponse(context, query) {
        const prompt = `Context: ${context}\n\nQuestion: ${query}\n\nAnswer:`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt }
            ]
        });
        return completion.choices[0].message.content || "";
    }
);

// Decorate the main application logic
const ragPipeline = tracer.traceFunction()(
    async function ragPipeline(query) {
        // const queryVector = await embedQuery(query);
        const relevantDocs = await getRelevantDocuments([]);
        const context = [relevantDocs].join("\n");
        const response = await generateResponse(context, query);
        
        return response;
    }
);

async function main() {
    let query = "What does the document talk about?";
    let response = await ragPipeline(query);

    console.log("Query", query);
    console.log("Response", response);

    // Set relevant metadata on the session level
    tracer.enrichSession({
        metadata: {
            "experiment-id": 1234
        }
    });

    // Simulate getting user feedback
    let userRating = 4;
    tracer.enrichSession({
        feedback: {
            "rating": userRating,
            "comment": "The response was accurate and helpful."
        }
    });
}

// Wrap execution entry with `tracer.trace`
await tracer.trace(() => main())