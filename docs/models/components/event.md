# Event

## Example Usage

```typescript
import { Event } from "honeyhive/models/components";

let value: Event = {
  projectId: "New Project",
  source: "playground",
  eventName: "Model Completion",
  eventType: "model",
  eventId: "7f22137a-6911-4ed3-bc36-110f1dde6b66",
  sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
  parentId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
  childrenIds: [
    "<value>",
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
        "<value>",
      ],
      "n": 1,
    },
    "template": [
      {
        "role": "system",
        "content": "Answer the user's question only using provided context.

        Context: {{ context }}",
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
};
```

## Fields

| Field                                                                                     | Type                                                                                      | Required                                                                                  | Description                                                                               |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `projectId`                                                                               | *string*                                                                                  | :heavy_minus_sign:                                                                        | Name of project associated with the event                                                 |
| `source`                                                                                  | *string*                                                                                  | :heavy_minus_sign:                                                                        | Source of the event - production, staging, etc                                            |
| `eventName`                                                                               | *string*                                                                                  | :heavy_minus_sign:                                                                        | Name of the event                                                                         |
| `eventType`                                                                               | [components.EventType](../../models/components/eventtype.md)                              | :heavy_minus_sign:                                                                        | Specify whether the event is of "session", "model", "tool" or "chain" type                |
| `eventId`                                                                                 | *string*                                                                                  | :heavy_minus_sign:                                                                        | Unique id of the event, if not set, it will be auto-generated                             |
| `sessionId`                                                                               | *string*                                                                                  | :heavy_minus_sign:                                                                        | Unique id of the session associated with the event, if not set, it will be auto-generated |
| `parentId`                                                                                | *string*                                                                                  | :heavy_minus_sign:                                                                        | Id of the parent event if nested                                                          |
| `childrenIds`                                                                             | *string*[]                                                                                | :heavy_minus_sign:                                                                        | Id of events that are nested within the event                                             |
| `config`                                                                                  | Record<string, *any*>                                                                     | :heavy_minus_sign:                                                                        | Associated configuration JSON for the event - model name, vector index name, etc          |
| `inputs`                                                                                  | Record<string, *any*>                                                                     | :heavy_minus_sign:                                                                        | Input JSON given to the event - prompt, chunks, etc                                       |
| `outputs`                                                                                 | Record<string, *any*>                                                                     | :heavy_minus_sign:                                                                        | Final output JSON of the event                                                            |
| `error`                                                                                   | *string*                                                                                  | :heavy_minus_sign:                                                                        | Any error description if event failed                                                     |
| `startTime`                                                                               | *number*                                                                                  | :heavy_minus_sign:                                                                        | UTC timestamp (in milliseconds) for the event start                                       |
| `endTime`                                                                                 | *number*                                                                                  | :heavy_minus_sign:                                                                        | UTC timestamp (in milliseconds) for the event end                                         |
| `duration`                                                                                | *number*                                                                                  | :heavy_minus_sign:                                                                        | How long the event took in milliseconds                                                   |
| `metadata`                                                                                | Record<string, *any*>                                                                     | :heavy_minus_sign:                                                                        | Any system or application metadata associated with the event                              |
| `feedback`                                                                                | Record<string, *any*>                                                                     | :heavy_minus_sign:                                                                        | Any user feedback provided for the event output                                           |
| `metrics`                                                                                 | Record<string, *any*>                                                                     | :heavy_minus_sign:                                                                        | Any values computed over the output of the event                                          |
| `userProperties`                                                                          | Record<string, *any*>                                                                     | :heavy_minus_sign:                                                                        | Any user properties associated with the event                                             |