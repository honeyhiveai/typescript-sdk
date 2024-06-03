# Events
(*events*)

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
import { CreateEventRequestEventType } from "honeyhive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.createEvent({
    event: {
      project: "Simple RAG",
      source: "playground",
      eventName: "Model Completion",
      eventType: CreateEventRequestEventType.Model,
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

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                              | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `request`                                                                              | [operations.CreateEventRequestBody](../../models/operations/createeventrequestbody.md) | :heavy_check_mark:                                                                     | The request object to use for the request.                                             |
| `config`                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                           | :heavy_minus_sign:                                                                     | Available config options for making requests.                                          |


### Response

**Promise<[operations.CreateEventResponse](../../models/operations/createeventresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## updateEvent

Update an event

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.updateEvent({
    eventId: "<value>",
    metadata: {
      "key": "<value>",
    },
    feedback: {
      "key": "<value>",
    },
    metrics: {
      "key": "<value>",
    },
    outputs: {
      "key": "<value>",
    },
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                              | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `request`                                                                              | [operations.UpdateEventRequestBody](../../models/operations/updateeventrequestbody.md) | :heavy_check_mark:                                                                     | The request object to use for the request.                                             |
| `config`                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                           | :heavy_minus_sign:                                                                     | Available config options for making requests.                                          |


### Response

**Promise<[operations.UpdateEventResponse](../../models/operations/updateeventresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getEvents

Retrieve events based on filters

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { Operator, TypeT } from "honeyhive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.getEvents({
    project: "<value>",
    filters: [
      {
        field: "event_type",
        value: "model",
        operator: Operator.Is,
        type: TypeT.String,
      },
    ],
    dateRange: {},
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                          | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `request`                                                                          | [operations.GetEventsRequestBody](../../models/operations/geteventsrequestbody.md) | :heavy_check_mark:                                                                 | The request object to use for the request.                                         |
| `config`                                                                           | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                       | :heavy_minus_sign:                                                                 | Available config options for making requests.                                      |


### Response

**Promise<[operations.GetEventsResponse](../../models/operations/geteventsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## createModelEvent

Please refer to our instrumentation guide for detailed information

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.createModelEvent({
    event: {
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
          "key": "<value>",
        },
      ],
      toolChoice: "none",
      responseFormat: {
        "type": "text",
      },
    },
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                        | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `request`                                                                                        | [operations.CreateModelEventRequestBody](../../models/operations/createmodeleventrequestbody.md) | :heavy_check_mark:                                                                               | The request object to use for the request.                                                       |
| `config`                                                                                         | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                     | :heavy_minus_sign:                                                                               | Available config options for making requests.                                                    |


### Response

**Promise<[operations.CreateModelEventResponse](../../models/operations/createmodeleventresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## createEventBatch

Please refer to our instrumentation guide for detailed information

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { CreateEventRequestEventType } from "honeyhive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.createEventBatch({
    events: [
      {
        project: "Simple RAG",
        source: "playground",
        eventName: "Model Completion",
        eventType: CreateEventRequestEventType.Model,
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

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                        | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `request`                                                                                        | [operations.CreateEventBatchRequestBody](../../models/operations/createeventbatchrequestbody.md) | :heavy_check_mark:                                                                               | The request object to use for the request.                                                       |
| `config`                                                                                         | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                     | :heavy_minus_sign:                                                                               | Available config options for making requests.                                                    |


### Response

**Promise<[operations.CreateEventBatchResponse](../../models/operations/createeventbatchresponse.md)>**
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

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.createModelEventBatch({
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
            "key": "<value>",
          },
        ],
        toolChoice: "none",
        responseFormat: {
          "type": "text",
        },
      },
    ],
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                                  | Type                                                                                                       | Required                                                                                                   | Description                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `request`                                                                                                  | [operations.CreateModelEventBatchRequestBody](../../models/operations/createmodeleventbatchrequestbody.md) | :heavy_check_mark:                                                                                         | The request object to use for the request.                                                                 |
| `config`                                                                                                   | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                               | :heavy_minus_sign:                                                                                         | Available config options for making requests.                                                              |


### Response

**Promise<[operations.CreateModelEventBatchResponse](../../models/operations/createmodeleventbatchresponse.md)>**
### Errors

| Error Object                             | Status Code                              | Content Type                             |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| errors.CreateModelEventBatchResponseBody | 500                                      | application/json                         |
| errors.SDKError                          | 4xx-5xx                                  | */*                                      |
