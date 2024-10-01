# CreateModelEventBatchRequestBody

## Example Usage

```typescript
import { CreateModelEventBatchRequestBody } from "honeyhive/models/operations";

let value: CreateModelEventBatchRequestBody = {
  modelEvents: [
    {
      project: "New Project",
      model: "gpt-4o",
      provider: "openai",
      messages: [
        {
          "role": "system",
          "content": "Hello, world!",
        },
      ],
      response: {
        "role": "assistant",
        "content": "Hello, world!",
      },
      duration: 42,
      usage: {
        "prompt_tokens": 10,
        "completion_tokens": 10,
        "total_tokens": 20,
      },
      cost: 0.00008,
      error: null,
      source: "playground",
      eventName: "Model Completion",
      hyperparameters: {
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
      template: [
        {
          "role": "system",
          "content": "Hello, {{ name }}!",
        },
      ],
      templateInputs: {
        "name": "world",
      },
      tools: [
        {
          "type": "function",
          "function": {
            "name": "get_current_weather",
            "description": "Get the current weather",
            "parameters": {
              "type": "object",
              "properties": {
                "location": {
                  "type": "string",
                  "description": "The city and state, e.g. San Francisco, CA",
                },
                "format": {
                  "type": "string",
                  "enum": [
                    "celsius",
                    "fahrenheit",
                  ],
                  "description": "The temperature unit to use. Infer this from the users location.",
                },
              },
              "required": [
                "location",
                "format",
              ],
            },
          },
        },
      ],
      toolChoice: "none",
      responseFormat: {
        "type": "text",
      },
    },
  ],
  sessionProperties: {
    modelEvent: {
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
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
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {

      },
      feedback: {

      },
      metadata: {

      },
    },
  },
};
```

## Fields

| Field                                                                                                                  | Type                                                                                                                   | Required                                                                                                               | Description                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `modelEvents`                                                                                                          | [components.CreateModelEvent](../../models/components/createmodelevent.md)[]                                           | :heavy_minus_sign:                                                                                                     | N/A                                                                                                                    |
| `isSingleSession`                                                                                                      | *boolean*                                                                                                              | :heavy_minus_sign:                                                                                                     | Default is false. If true, all events will be associated with the same session                                         |
| `sessionProperties`                                                                                                    | [operations.CreateModelEventBatchSessionProperties](../../models/operations/createmodeleventbatchsessionproperties.md) | :heavy_minus_sign:                                                                                                     | N/A                                                                                                                    |