# SessionPropertiesBatch

## Example Usage

```typescript
import { SessionPropertiesBatch } from "honeyhive/models/components";

let value: SessionPropertiesBatch = {
  sessionName: "Playground Session",
  source: "playground",
  sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
  inputs: {
    "context": "Hello world",
    "question": "What is in the context?",
    "chat_history": [
      {
        "role": "system",
        "content": "Answer the user's question only using provided context.\n"
          + "\n"
          + "Context: Hello world",
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
  userProperties: {
    "user": "google-oauth2|111840237613341303366",
  },
  metrics: {},
  feedback: {},
  metadata: {},
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `sessionName`                                                   | *string*                                                        | :heavy_minus_sign:                                              | Name of the session                                             |
| `source`                                                        | *string*                                                        | :heavy_minus_sign:                                              | Source of the session - production, staging, etc                |
| `sessionId`                                                     | *string*                                                        | :heavy_minus_sign:                                              | Unique id of the session, if not set, it will be auto-generated |
| `config`                                                        | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Associated configuration for the session                        |
| `inputs`                                                        | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Input object passed to the session - user query, text blob, etc |
| `outputs`                                                       | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Final output of the session - completion, chunks, etc           |
| `error`                                                         | *string*                                                        | :heavy_minus_sign:                                              | Any error description if session failed                         |
| `userProperties`                                                | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Any user properties associated with the session                 |
| `metrics`                                                       | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Any values computed over the output of the session              |
| `feedback`                                                      | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Any user feedback provided for the session output               |
| `metadata`                                                      | Record<string, *any*>                                           | :heavy_minus_sign:                                              | Any system or application metadata associated with the session  |