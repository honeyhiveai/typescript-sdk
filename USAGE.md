<!-- Start SDK Example Usage [usage] -->
```typescript
import { HoneyHive } from "honeyhive";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });

    const res = await sdk.session.startSession({
        session: {
            project: "Simple RAG Project",
            sessionName: "Playground Session",
            source: "playground",
            sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
            childrenIds: ["7f22137a-6911-4ed3-bc36-110f1dde6b66"],
            config: {
                key: "<value>",
            },
            inputs: {
                context: "Hello world",
                question: "What is in the context?",
                chat_history: "<value>",
            },
            outputs: {
                role: "assistant",
                content: "Hello world",
            },
            error: null,
            duration: 824.8056,
            userProperties: {
                user: "google-oauth2|111840237613341303366",
            },
            metrics: {},
            feedback: {},
            metadata: {},
            startTime: 1712025501605,
            endTime: 1712025499832,
        },
    });

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```
<!-- End SDK Example Usage [usage] -->