# GetEventsResponseBody

Success

## Example Usage

```typescript
import { GetEventsResponseBody } from "honeyhive/models/operations";

let value: GetEventsResponseBody = {
  events: [
    {
      projectId: "New Project",
      source: "playground",
      eventName: "Model Completion",
      eventType: "model",
      eventId: "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      parentId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [

      ],
      config: {
        "model": "gpt-3.5-turbo",
        "version": "v0.1 - Fork",
        "provider": "openai",
        "hyperparameters": {
          "temperature": 0,
          "top_p": 1,
          "max_tokens": 1000,
          "presence_penalty": 0,
          "frequency_penalty": 0,
          "stop": [

          ],
          "n": 1,
        },
        "template": [
          {
            "role": "system",
            "content": "Answer the user's question only using provided context.\n" +
            "\n" +
            "Context: {{ context }}",
          },
          {
            "role": "user",
            "content": "{{question}}",
          },
        ],
        "type": "chat",
      },
      inputs: {
        "context": "Hello world",
        "question": "What is in the context?",
        "chat_history": [
          {
            "role": "system",
            "content": "Answer the user's question only using provided context.\n" +
            "\n" +
            "Context: Hello world",
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
      startTime: 2024-04-01 22:38:19,
      endTime: 2024-04-01 22:38:19,
      duration: 824.8056,
      metadata: {
        "cost": 0.00008,
        "completion_tokens": 23,
        "prompt_tokens": 35,
        "total_tokens": 58,
      },
      feedback: {

      },
      metrics: {
        "Answer Faithfulness": 5,
        "Answer Faithfulness_explanation": "The AI assistant's answer is a concise and accurate description of Ramp's API. It provides a clear explanation of what the API does and how developers can use it to integrate Ramp's financial services into their own applications. The answer is faithful to the provided context.",
        "Number of words": 18,
      },
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
    },
  ],
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `events`                                               | [components.Event](../../models/components/event.md)[] | :heavy_minus_sign:                                     | N/A                                                    |
| `totalEvents`                                          | *number*                                               | :heavy_minus_sign:                                     | Total number of events in the specified filter         |