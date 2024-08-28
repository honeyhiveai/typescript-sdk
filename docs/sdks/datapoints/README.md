# Datapoints
(*datapoints*)

## Overview

### Available Operations

* [getDatapoints](#getdatapoints) - Retrieve a list of datapoints
* [createDatapoint](#createdatapoint) - Create a new datapoint
* [getDatapoint](#getdatapoint) - Retrieve a specific datapoint
* [updateDatapoint](#updatedatapoint) - Update a specific datapoint
* [deleteDatapoint](#deletedatapoint) - Delete a specific datapoint

## getDatapoints

Retrieve a list of datapoints

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.datapoints.getDatapoints("<value>");

  // Handle the result
  console.log(result)
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { datapointsGetDatapoints } from "honeyhive/funcs/datapointsGetDatapoints.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await datapointsGetDatapoints(honeyHive, "<value>");

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
| `project`                                                                                                                                                                      | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Project name to filter datapoints                                                                                                                                              |
| `datapointIds`                                                                                                                                                                 | *string*[]                                                                                                                                                                     | :heavy_minus_sign:                                                                                                                                                             | List of datapoint ids to fetch                                                                                                                                                 |
| `datasetName`                                                                                                                                                                  | *string*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | Name of the dataset to get datapoints from                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetDatapointsResponseBody](../../models/operations/getdatapointsresponsebody.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## createDatapoint

Create a new datapoint

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.datapoints.createDatapoint({
    project: "New Project",
    inputs: {
      "query": "what's the temperature in Iceland?",
    },
    history: [
      {
        "role": "system",
        "content": "You are a helpful web assistant that helps users answer questions about the world based on the information provided to you by Google's search API. Answer the questions as truthfully as you can. In case you are unsure about the correct answer, please respond with \"I apologize but I'm not sure.\"",
      },
      {
        "role": "user",
        "content": "what's the temperature in Iceland?\n\n\n--Google search API results below:---\n\n\"snippet\":\"2 Week Extended Forecast in Reykjavik, Iceland ; Feb 4, 29 / 20 °F · Snow showers early. Broken clouds. ; Feb 5, 27 / 16 °F · Light snow. Decreasing cloudiness.\",\"snippet_highlighted_words\":[\"Feb 4, 29 / 20 °F\"]",
      },
    ],
    groundTruth: {
      "role": "assistant",
      "content": "The temperature in Reykjavik, Iceland is currently around 5F or -15C. Please note that weather conditions can change rapidly, so it's best to check a reliable source for the most up-to-date information.",
    },
    linkedEvent: "6bba5182-d4b1-4b29-a64a-f0a8bd964f76",
    linkedDatasets: [
      "<value>",
    ],
    metadata: {
      "question_type": "weather",
      "completion_tokens": 47,
      "prompt_tokens": 696,
      "total_tokens": 743,
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
import { datapointsCreateDatapoint } from "honeyhive/funcs/datapointsCreateDatapoint.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await datapointsCreateDatapoint(honeyHive, {
    project: "New Project",
    inputs: {
      "query": "what's the temperature in Iceland?",
    },
    history: [
      {
        "role": "system",
        "content": "You are a helpful web assistant that helps users answer questions about the world based on the information provided to you by Google's search API. Answer the questions as truthfully as you can. In case you are unsure about the correct answer, please respond with \"I apologize but I'm not sure.\"",
      },
      {
        "role": "user",
        "content": "what's the temperature in Iceland?\n\n\n--Google search API results below:---\n\n\"snippet\":\"2 Week Extended Forecast in Reykjavik, Iceland ; Feb 4, 29 / 20 °F · Snow showers early. Broken clouds. ; Feb 5, 27 / 16 °F · Light snow. Decreasing cloudiness.\",\"snippet_highlighted_words\":[\"Feb 4, 29 / 20 °F\"]",
      },
    ],
    groundTruth: {
      "role": "assistant",
      "content": "The temperature in Reykjavik, Iceland is currently around 5F or -15C. Please note that weather conditions can change rapidly, so it's best to check a reliable source for the most up-to-date information.",
    },
    linkedEvent: "6bba5182-d4b1-4b29-a64a-f0a8bd964f76",
    linkedDatasets: [
      "<value>",
    ],
    metadata: {
      "question_type": "weather",
      "completion_tokens": 47,
      "prompt_tokens": 696,
      "total_tokens": 743,
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
| `request`                                                                                                                                                                      | [components.CreateDatapointRequest](../../models/components/createdatapointrequest.md)                                                                                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreateDatapointResponseBody](../../models/operations/createdatapointresponsebody.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## getDatapoint

Retrieve a specific datapoint

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.datapoints.getDatapoint("<value>");

  // Handle the result
  console.log(result)
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { datapointsGetDatapoint } from "honeyhive/funcs/datapointsGetDatapoint.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await datapointsGetDatapoint(honeyHive, "<value>");

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
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Datapoint ID like `65c13dbbd65fb876b7886cdb`                                                                                                                                   |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetDatapointResponseBody](../../models/operations/getdatapointresponsebody.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## updateDatapoint

Update a specific datapoint

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  await honeyHive.datapoints.updateDatapoint("<value>", {
    inputs: {
      "query": "what's the temperature in Reykjavik?",
    },
    history: [
      {
        "role": "system",
        "content": "You are a helpful web assistant that helps users answer questions about the world based on the information provided to you by Google's search API. Answer the questions as truthfully as you can. In case you are unsure about the correct answer, please respond with \"I apologize but I'm not sure.\"",
      },
      {
        "role": "user",
        "content": "what's the temperature in Reykjavik?\n\n\n--Google search API results below:---\n\n\"snippet\":\"2 Week Extended Forecast in Reykjavik, Iceland ; Feb 4, 29 / 20 °F · Snow showers early. Broken clouds. ; Feb 5, 27 / 16 °F · Light snow. Decreasing cloudiness.\",\"snippet_highlighted_words\":[\"Feb 4, 29 / 20 °F\"]",
      },
    ],
    groundTruth: {
      "role": "assistant",
      "content": "The temperature in Reykjavik, Iceland is currently around 5F or -15C. Please note that weather conditions can change rapidly, so it's best to check a reliable source for the most up-to-date information.",
    },
    linkedEvals: [
      "<value>",
    ],
    linkedDatasets: [
      "<value>",
    ],
    metadata: {
      "question_type": "capital-weather",
      "random_field": 0,
    },
  });

  
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { datapointsUpdateDatapoint } from "honeyhive/funcs/datapointsUpdateDatapoint.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await datapointsUpdateDatapoint(honeyHive, "<value>", {
    inputs: {
      "query": "what's the temperature in Reykjavik?",
    },
    history: [
      {
        "role": "system",
        "content": "You are a helpful web assistant that helps users answer questions about the world based on the information provided to you by Google's search API. Answer the questions as truthfully as you can. In case you are unsure about the correct answer, please respond with \"I apologize but I'm not sure.\"",
      },
      {
        "role": "user",
        "content": "what's the temperature in Reykjavik?\n\n\n--Google search API results below:---\n\n\"snippet\":\"2 Week Extended Forecast in Reykjavik, Iceland ; Feb 4, 29 / 20 °F · Snow showers early. Broken clouds. ; Feb 5, 27 / 16 °F · Light snow. Decreasing cloudiness.\",\"snippet_highlighted_words\":[\"Feb 4, 29 / 20 °F\"]",
      },
    ],
    groundTruth: {
      "role": "assistant",
      "content": "The temperature in Reykjavik, Iceland is currently around 5F or -15C. Please note that weather conditions can change rapidly, so it's best to check a reliable source for the most up-to-date information.",
    },
    linkedEvals: [
      "<value>",
    ],
    linkedDatasets: [
      "<value>",
    ],
    metadata: {
      "question_type": "capital-weather",
      "random_field": 0,
    },
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    | Example                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | ID of datapoint to update                                                                                                                                                      |                                                                                                                                                                                |
| `updateDatapointRequest`                                                                                                                                                       | [components.UpdateDatapointRequest](../../models/components/updatedatapointrequest.md)                                                                                         | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            | [object Object]                                                                                                                                                                |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |                                                                                                                                                                                |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |                                                                                                                                                                                |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |                                                                                                                                                                                |

### Response

**Promise\<void\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## deleteDatapoint

Delete a specific datapoint

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.datapoints.deleteDatapoint("<value>");

  // Handle the result
  console.log(result)
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { datapointsDeleteDatapoint } from "honeyhive/funcs/datapointsDeleteDatapoint.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await datapointsDeleteDatapoint(honeyHive, "<value>");

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
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Datapoint ID like `65c13dbbd65fb876b7886cdb`                                                                                                                                   |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.DeleteDatapointResponseBody](../../models/operations/deletedatapointresponsebody.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |
