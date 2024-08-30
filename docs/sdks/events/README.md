# Events
(*events*)

## Overview

### Available Operations

* [createEvent](#createevent) - Create a new event
* [updateEvent](#updateevent) - Update an event
* [getEvents](#getevents) - Retrieve events based on filters
* [createModelEvent](#createmodelevent) - Create a new model event
* [createEventBatch](#createeventbatch) - Create a batch of events
* [createModelEventBatch](#createmodeleventbatch) - Create a batch of model events

## createEvent

Please refer to our instrumentation guide for detailed information

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.events.createEvent({
    event: {
      project: "Simple RAG",
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
        "version": "v0.1",
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
            "content": "Answer the user's question only using provided context. Context: {{ context }}",
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
            "content": "Answer the user's question only using provided context. Context: Hello world",
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
      startTime: 1714978764301,
      endTime: 1714978765301,
      duration: 999.8056,
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
  });

  // Handle the result
  console.log(result)
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { eventsCreateEvent } from "honeyhive/funcs/eventsCreateEvent.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await eventsCreateEvent(honeyHive, {
    event: {
      project: "Simple RAG",
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
        "version": "v0.1",
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
            "content": "Answer the user's question only using provided context. Context: {{ context }}",
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
            "content": "Answer the user's question only using provided context. Context: Hello world",
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
      startTime: 1714978764301,
      endTime: 1714978765301,
      duration: 999.8056,
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
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result)
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateEventRequestBody](../../models/operations/createeventrequestbody.md)                                                                                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreateEventResponseBody](../../models/operations/createeventresponsebody.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## updateEvent

Update an event

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  await honeyHive.events.updateEvent({
    eventId: "7f22137a-6911-4ed3-bc36-110f1dde6b66",
    metadata: {
      "cost": 0.00008,
      "completion_tokens": 23,
      "prompt_tokens": 35,
      "total_tokens": 58,
    },
    feedback: {
      "rating": 5,
    },
    metrics: {
      "num_words": 2,
    },
    outputs: {
      "role": "assistant",
      "content": "Hello world",
    },
    config: {
      "template": [
        {
          "role": "system",
          "content": "Hello, {{ name }}!",
        },
      ],
    },
    userProperties: {
      "user_id": "691b1f94-d38c-4e92-b051-5e03fee9ff86",
    },
    duration: 42,
  });

  
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { eventsUpdateEvent } from "honeyhive/funcs/eventsUpdateEvent.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await eventsUpdateEvent(honeyHive, {
    eventId: "7f22137a-6911-4ed3-bc36-110f1dde6b66",
    metadata: {
      "cost": 0.00008,
      "completion_tokens": 23,
      "prompt_tokens": 35,
      "total_tokens": 58,
    },
    feedback: {
      "rating": 5,
    },
    metrics: {
      "num_words": 2,
    },
    outputs: {
      "role": "assistant",
      "content": "Hello world",
    },
    config: {
      "template": [
        {
          "role": "system",
          "content": "Hello, {{ name }}!",
        },
      ],
    },
    userProperties: {
      "user_id": "691b1f94-d38c-4e92-b051-5e03fee9ff86",
    },
    duration: 42,
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.UpdateEventRequestBody](../../models/operations/updateeventrequestbody.md)                                                                                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## getEvents

Retrieve events based on filters

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.events.getEvents({
    project: "<value>",
    filters: [
      {
        field: "event_type",
        value: "model",
        operator: "is",
        type: "string",
      },
    ],
  });

  // Handle the result
  console.log(result)
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { eventsGetEvents } from "honeyhive/funcs/eventsGetEvents.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await eventsGetEvents(honeyHive, {
    project: "<value>",
    filters: [
      {
        field: "event_type",
        value: "model",
        operator: "is",
        type: "string",
      },
    ],
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result)
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetEventsRequestBody](../../models/operations/geteventsrequestbody.md)                                                                                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetEventsResponseBody](../../models/operations/geteventsresponsebody.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## createModelEvent

Please refer to our instrumentation guide for detailed information

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.events.createModelEvent({
    modelEvent: {
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
  });

  // Handle the result
  console.log(result)
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { eventsCreateModelEvent } from "honeyhive/funcs/eventsCreateModelEvent.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await eventsCreateModelEvent(honeyHive, {
    modelEvent: {
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
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result)
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateModelEventRequestBody](../../models/operations/createmodeleventrequestbody.md)                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreateModelEventResponseBody](../../models/operations/createmodeleventresponsebody.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## createEventBatch

Please refer to our instrumentation guide for detailed information

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.events.createEventBatch({
    events: [
      {
        project: "Simple RAG",
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
          "version": "v0.1",
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
              "content": "Answer the user's question only using provided context. Context: {{ context }}",
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
              "content": "Answer the user's question only using provided context. Context: Hello world",
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
        startTime: 1714978764301,
        endTime: 1714978765301,
        duration: 999.8056,
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
  });

  // Handle the result
  console.log(result)
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { eventsCreateEventBatch } from "honeyhive/funcs/eventsCreateEventBatch.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await eventsCreateEventBatch(honeyHive, {
    events: [
      {
        project: "Simple RAG",
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
          "version": "v0.1",
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
              "content": "Answer the user's question only using provided context. Context: {{ context }}",
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
              "content": "Answer the user's question only using provided context. Context: Hello world",
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
        startTime: 1714978764301,
        endTime: 1714978765301,
        duration: 999.8056,
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
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result)
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateEventBatchRequestBody](../../models/operations/createeventbatchrequestbody.md)                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreateEventBatchResponseBody](../../models/operations/createeventbatchresponsebody.md)\>**

### Errors

| Error Object                        | Status Code                         | Content Type                        |
| ----------------------------------- | ----------------------------------- | ----------------------------------- |
| errors.CreateEventBatchResponseBody | 500                                 | application/json                    |
| errors.SDKError                     | 4xx-5xx                             | */*                                 |


## createModelEventBatch

Please refer to our instrumentation guide for detailed information

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.events.createModelEventBatch({
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
  });

  // Handle the result
  console.log(result)
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { eventsCreateModelEventBatch } from "honeyhive/funcs/eventsCreateModelEventBatch.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await eventsCreateModelEventBatch(honeyHive, {
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
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result)
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateModelEventBatchRequestBody](../../models/operations/createmodeleventbatchrequestbody.md)                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreateModelEventBatchResponseBody](../../models/operations/createmodeleventbatchresponsebody.md)\>**

### Errors

| Error Object                             | Status Code                              | Content Type                             |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| errors.CreateModelEventBatchResponseBody | 500                                      | application/json                         |
| errors.SDKError                          | 4xx-5xx                                  | */*                                      |
