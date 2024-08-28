<!-- Start SDK Example Usage [usage] -->
```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.session.startSession({
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "context": "Hello world",
        "question": "What is in the context?",
        "chat_history": [
          {
            "role": "system",
            "content": "Answer the user's question only using provided context.
  
            Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
      },
      outputs: {
        "role": "assistant",
        "content": "Hello world",
      },
      error: null,
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {
  
      },
      feedback: {
  
      },
      metadata: {
  
      },
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  });

  // Handle the result
  console.log(result)
}

run();
```
<!-- End SDK Example Usage [usage] -->