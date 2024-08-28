# CreateModelEvent

## Example Usage

```typescript
import { CreateModelEvent } from "honeyhive/models/components";

let value: CreateModelEvent = {
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
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `project`                                      | *string*                                       | :heavy_check_mark:                             | Project associated with the event              |
| `model`                                        | *string*                                       | :heavy_check_mark:                             | Model name                                     |
| `provider`                                     | *string*                                       | :heavy_check_mark:                             | Model provider                                 |
| `messages`                                     | Record<string, *any*>[]                        | :heavy_check_mark:                             | Messages passed to the model                   |
| `response`                                     | Record<string, *any*>                          | :heavy_check_mark:                             | Final output JSON of the event                 |
| `duration`                                     | *number*                                       | :heavy_check_mark:                             | How long the event took in milliseconds        |
| `usage`                                        | Record<string, *any*>                          | :heavy_check_mark:                             | Usage statistics of the model                  |
| `cost`                                         | *number*                                       | :heavy_minus_sign:                             | Cost of the model completion                   |
| `error`                                        | *string*                                       | :heavy_minus_sign:                             | Any error description if event failed          |
| `source`                                       | *string*                                       | :heavy_minus_sign:                             | Source of the event - production, staging, etc |
| `eventName`                                    | *string*                                       | :heavy_minus_sign:                             | Name of the event                              |
| `hyperparameters`                              | Record<string, *any*>                          | :heavy_minus_sign:                             | Hyperparameters used for the model             |
| `template`                                     | Record<string, *any*>[]                        | :heavy_minus_sign:                             | Template used for the model                    |
| `templateInputs`                               | Record<string, *any*>                          | :heavy_minus_sign:                             | Inputs for the template                        |
| `tools`                                        | Record<string, *any*>[]                        | :heavy_minus_sign:                             | Tools used for the model                       |
| `toolChoice`                                   | *string*                                       | :heavy_minus_sign:                             | Tool choice for the model                      |
| `responseFormat`                               | Record<string, *any*>                          | :heavy_minus_sign:                             | Response format for the model                  |