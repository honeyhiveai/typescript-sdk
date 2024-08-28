# SessionStartRequest

## Example Usage

```typescript
import { SessionStartRequest } from "honeyhive/models/components";

let value: SessionStartRequest = {
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
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `project`                                                       | *string*                                                        | :heavy_check_mark:                                              | Project name associated with the session                        |
| `sessionName`                                                   | *string*                                                        | :heavy_check_mark:                                              | Name of the session                                             |
| `source`                                                        | *string*                                                        | :heavy_check_mark:                                              | Source of the session - production, staging, etc                |
| `sessionId`                                                     | *string*                                                        | :heavy_minus_sign:                                              | Unique id of the session, if not set, it will be auto-generated |
| `childrenIds`                                                   | *string*[]                                                      | :heavy_minus_sign:                                              | Id of events that are nested within the session                 |
| `config`                                                        | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Associated configuration for the session                        |
| `inputs`                                                        | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Input object passed to the session - user query, text blob, etc |
| `outputs`                                                       | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Final output of the session - completion, chunks, etc           |
| `error`                                                         | *string*                                                        | :heavy_minus_sign:                                              | Any error description if session failed                         |
| `duration`                                                      | *number*                                                        | :heavy_minus_sign:                                              | How long the session took in milliseconds                       |
| `userProperties`                                                | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Any user properties associated with the session                 |
| `metrics`                                                       | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Any values computed over the output of the session              |
| `feedback`                                                      | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Any user feedback provided for the session output               |
| `metadata`                                                      | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Any system or application metadata associated with the session  |
| `startTime`                                                     | *number*                                                        | :heavy_minus_sign:                                              | UTC timestamp (in milliseconds) for the session start           |
| `endTime`                                                       | *number*                                                        | :heavy_minus_sign:                                              | UTC timestamp (in milliseconds) for the session end             |