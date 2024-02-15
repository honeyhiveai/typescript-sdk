# HoneyHive SDK


## Overview

### Available Operations

* [getTasks](#gettasks) - Get all tasks
* [postTasks](#posttasks) - Create a task
* [deleteTasks](#deletetasks) - Delete a task
* [putTasks](#puttasks) - Update a task
* [getGenerations](#getgenerations) - Get all generations
* [postGenerations](#postgenerations) - Generate a text
* [getPrompts](#getprompts) - Get all prompts or filter by task and name
* [postPrompts](#postprompts) - Create a prompt
* [putPromptsId](#putpromptsid) - Update a prompt
* [deletePromptsId](#deletepromptsid) - Delete a prompt by name
* [getFineTunedModels](#getfinetunedmodels) - Get all fine-tuned models
* [postFineTunedModels](#postfinetunedmodels) - Create a new fine-tuned model
* [getFineTunedModelsId](#getfinetunedmodelsid) - Get a fine-tuned model
* [deleteFineTunedModelsId](#deletefinetunedmodelsid) - Delete a fine-tuned model
* [getDatasets](#getdatasets) - Get datasets
* [postDatasets](#postdatasets) - Create a dataset
* [putDatasets](#putdatasets) - Update a dataset
* [deleteDatasets](#deletedatasets) - Delete all datasets
* [deleteDatasetsName](#deletedatasetsname) - Delete a dataset
* [getMetrics](#getmetrics) - Get all metrics
* [postMetrics](#postmetrics) - Create a metric
* [deleteMetrics](#deletemetrics) - Delete a metric
* [putMetrics](#putmetrics) - Update a metric
* [postMetricsCompute](#postmetricscompute) - Compute metric
* [postChat](#postchat) - Create a chat completion
* [postGenerationsLog](#postgenerationslog) - Log a generation
* [postFeedback](#postfeedback) - Send feedback
* [postEvaluations](#postevaluations) - Log an evaluation
* [getEvaluations](#getevaluations) - Get all evaluations
* [getEvaluationsId](#getevaluationsid) - Get an evaluation
* [deleteEvaluationsId](#deleteevaluationsid) - Delete an evaluation
* [putEvaluationsId](#putevaluationsid) - Update an evaluation
* [postSessionStart](#postsessionstart) - Start a session
* [postSessionSessionIdEnd](#postsessionsessionidend) - End a session
* [postSessionSessionIdEvent](#postsessionsessionidevent) - Log an event
* [postSessionSessionIdFeedback](#postsessionsessionidfeedback) - Log session feedback
* [getSessionSessionId](#getsessionsessionid) - Get a session
* [putSessionSessionId](#putsessionsessionid) - Update a session event
* [deleteSessionSessionId](#deletesessionsessionid) - Delete a session
* [getSessionSessionIdExport](#getsessionsessionidexport) - Get a session in Trace Event format
* [getSession](#getsession) - Get all sessions
* [postSessionSessionIdTraces](#postsessionsessionidtraces) - Log a trace

## getTasks

Get all tasks

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetTasksRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const name: string = "<value>";

  const res = await sdk.getTasks(name);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `name`                                                       | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetTasksResponse](../../models/operations/gettasksresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postTasks

Create a task

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postTasks({
    fineTunedModels: [
      {},
    ],
    prompts: [
      {
        inputVariables: [
          "<value>",
        ],
        hyperparameters: {
          "key": "<value>",
        },
        fewShotExamples: [
          {
            "key": "<value>",
          },
        ],
      },
    ],
    datasets: [
      {
        file: [
          {
            "key": "<value>",
          },
        ],
      },
    ],
    metrics: [
      {
        threshold: {
          "key": "<value>",
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

| Parameter                                                                    | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `request`                                                                    | [components.TaskCreationQuery](../../models/components/taskcreationquery.md) | :heavy_check_mark:                                                           | The request object to use for the request.                                   |
| `config`                                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                 | :heavy_minus_sign:                                                           | Available config options for making requests.                                |


### Response

**Promise<[operations.PostTasksResponse](../../models/operations/posttasksresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteTasks

Delete a task

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteTasksRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const name: string = "<value>";

  const res = await sdk.deleteTasks(name);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `name`                                                       | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteTasksResponse](../../models/operations/deletetasksresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putTasks

Update a task

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.putTasks({
    fineTunedModels: [
      {},
    ],
    prompts: [
      {
        inputVariables: [
          "<value>",
        ],
        hyperparameters: {
          "key": "<value>",
        },
        fewShotExamples: [
          {
            "key": "<value>",
          },
        ],
      },
    ],
    datasets: [
      {
        file: [
          {
            "key": "<value>",
          },
        ],
      },
    ],
    metrics: [
      {
        threshold: {
          "key": "<value>",
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

| Parameter                                                                | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `request`                                                                | [components.TaskUpdateQuery](../../models/components/taskupdatequery.md) | :heavy_check_mark:                                                       | The request object to use for the request.                               |
| `config`                                                                 | [AxiosRequestConfig](https://axios-http.com/docs/req_config)             | :heavy_minus_sign:                                                       | Available config options for making requests.                            |


### Response

**Promise<[operations.PutTasksResponse](../../models/operations/puttasksresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getGenerations

Get all generations

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetGenerationsRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const task: string = "<value>";
const prompt: string = "<value>";
const modelId: string = "<value>";

  const res = await sdk.getGenerations(task, prompt, modelId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `task`                                                       | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `prompt`                                                     | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `modelId`                                                    | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetGenerationsResponse](../../models/operations/getgenerationsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postGenerations

Generate a text

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postGenerations({
    input: {
      "key": "<value>",
    },
    prompts: [
      "<value>",
    ],
    metadata: {
      "key": "<value>",
    },
    userProperties: {
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

| Parameter                                                            | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `request`                                                            | [components.GenerateQuery](../../models/components/generatequery.md) | :heavy_check_mark:                                                   | The request object to use for the request.                           |
| `config`                                                             | [AxiosRequestConfig](https://axios-http.com/docs/req_config)         | :heavy_minus_sign:                                                   | Available config options for making requests.                        |


### Response

**Promise<[operations.PostGenerationsResponse](../../models/operations/postgenerationsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getPrompts

Get all prompts or filter by task and name

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetPromptsRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const task: string = "<value>";
const name: string = "<value>";

  const res = await sdk.getPrompts(task, name);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `task`                                                       | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `name`                                                       | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetPromptsResponse](../../models/operations/getpromptsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postPrompts

Create a prompt

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postPrompts({
    hyperparameters: {
      "key": "<value>",
    },
    fewShotExamples: [
      {
        "key": "<value>",
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

| Parameter                                                                        | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `request`                                                                        | [components.PromptCreationQuery](../../models/components/promptcreationquery.md) | :heavy_check_mark:                                                               | The request object to use for the request.                                       |
| `config`                                                                         | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                     | :heavy_minus_sign:                                                               | Available config options for making requests.                                    |


### Response

**Promise<[operations.PostPromptsResponse](../../models/operations/postpromptsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putPromptsId

Update a prompt

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { PromptUpdateQuery } from "HoneyHive/dist/models/components";
import { PutPromptsIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";
const promptUpdateQuery: PromptUpdateQuery = {
  inputVariables: [
    "<value>",
  ],
  hyperparameters: {
    "key": "<value>",
  },
  fewShotExamples: [
    {
      "key": "<value>",
    },
  ],
};

  const res = await sdk.putPromptsId(id, promptUpdateQuery);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                    | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `id`                                                                         | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `promptUpdateQuery`                                                          | [components.PromptUpdateQuery](../../models/components/promptupdatequery.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `config`                                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                 | :heavy_minus_sign:                                                           | Available config options for making requests.                                |


### Response

**Promise<[operations.PutPromptsIdResponse](../../models/operations/putpromptsidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deletePromptsId

Delete a prompt by name

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeletePromptsIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.deletePromptsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeletePromptsIdResponse](../../models/operations/deletepromptsidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getFineTunedModels

Get all fine-tuned models

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetFineTunedModelsRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const task: string = "<value>";
const modelId: string = "<value>";

  const res = await sdk.getFineTunedModels(task, modelId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `task`                                                       | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `modelId`                                                    | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetFineTunedModelsResponse](../../models/operations/getfinetunedmodelsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postFineTunedModels

Create a new fine-tuned model

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postFineTunedModels({});

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                              | Type                                                                                                   | Required                                                                                               | Description                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `request`                                                                                              | [operations.PostFineTunedModelsRequestBody](../../models/operations/postfinetunedmodelsrequestbody.md) | :heavy_check_mark:                                                                                     | The request object to use for the request.                                                             |
| `config`                                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                           | :heavy_minus_sign:                                                                                     | Available config options for making requests.                                                          |


### Response

**Promise<[operations.PostFineTunedModelsResponse](../../models/operations/postfinetunedmodelsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getFineTunedModelsId

Get a fine-tuned model

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetFineTunedModelsIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.getFineTunedModelsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetFineTunedModelsIdResponse](../../models/operations/getfinetunedmodelsidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteFineTunedModelsId

Delete a fine-tuned model

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteFineTunedModelsIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.deleteFineTunedModelsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteFineTunedModelsIdResponse](../../models/operations/deletefinetunedmodelsidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getDatasets

Get datasets

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetDatasetsRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const task: string = "<value>";
const prompt: string = "<value>";
const datasetId: string = "<value>";
const purpose: string = "<value>";

  const res = await sdk.getDatasets(task, prompt, datasetId, purpose);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `task`                                                       | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `prompt`                                                     | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `datasetId`                                                  | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `purpose`                                                    | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetDatasetsResponse](../../models/operations/getdatasetsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postDatasets

Create a dataset

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postDatasets({
    file: [
      {
        "key": "<value>",
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

| Parameter                                                            | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `request`                                                            | [components.UploadDataset](../../models/components/uploaddataset.md) | :heavy_check_mark:                                                   | The request object to use for the request.                           |
| `config`                                                             | [AxiosRequestConfig](https://axios-http.com/docs/req_config)         | :heavy_minus_sign:                                                   | Available config options for making requests.                        |


### Response

**Promise<[operations.PostDatasetsResponse](../../models/operations/postdatasetsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putDatasets

Update a dataset

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.putDatasets({
    file: [
      {
        "key": "<value>",
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

| Parameter                                                            | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `request`                                                            | [components.UploadDataset](../../models/components/uploaddataset.md) | :heavy_check_mark:                                                   | The request object to use for the request.                           |
| `config`                                                             | [AxiosRequestConfig](https://axios-http.com/docs/req_config)         | :heavy_minus_sign:                                                   | Available config options for making requests.                        |


### Response

**Promise<[operations.PutDatasetsResponse](../../models/operations/putdatasetsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteDatasets

Delete all datasets

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.deleteDatasets();

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteDatasetsResponse](../../models/operations/deletedatasetsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteDatasetsName

Delete a dataset

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteDatasetsNameRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const name: string = "<value>";

  const res = await sdk.deleteDatasetsName(name);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `name`                                                       | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteDatasetsNameResponse](../../models/operations/deletedatasetsnameresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getMetrics

Get all metrics

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetMetricsRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const task: string = "<value>";

  const res = await sdk.getMetrics(task);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `task`                                                       | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetMetricsResponse](../../models/operations/getmetricsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postMetrics

Create a metric

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postMetrics({
    threshold: {},
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                        | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `request`                                                                        | [components.MetricCreateRequest](../../models/components/metriccreaterequest.md) | :heavy_check_mark:                                                               | The request object to use for the request.                                       |
| `config`                                                                         | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                     | :heavy_minus_sign:                                                               | Available config options for making requests.                                    |


### Response

**Promise<[operations.PostMetricsResponse](../../models/operations/postmetricsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteMetrics

Delete a metric

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteMetricsRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const metricId: string = "<value>";

  const res = await sdk.deleteMetrics(metricId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `metricId`                                                   | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteMetricsResponse](../../models/operations/deletemetricsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putMetrics

Update a metric

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.putMetrics({
    threshold: {},
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                        | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `request`                                                                        | [components.MetricUpdateRequest](../../models/components/metricupdaterequest.md) | :heavy_check_mark:                                                               | The request object to use for the request.                                       |
| `config`                                                                         | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                     | :heavy_minus_sign:                                                               | Available config options for making requests.                                    |


### Response

**Promise<[operations.PutMetricsResponse](../../models/operations/putmetricsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postMetricsCompute

Compute metric

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postMetricsCompute({
    metric: {},
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
| `request`                                                                          | [components.MetricComputeRequest](../../models/components/metriccomputerequest.md) | :heavy_check_mark:                                                                 | The request object to use for the request.                                         |
| `config`                                                                           | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                       | :heavy_minus_sign:                                                                 | Available config options for making requests.                                      |


### Response

**Promise<[operations.PostMetricsComputeResponse](../../models/operations/postmetricscomputeresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postChat

Create a chat completion

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postChat({
    project: "<value>",
    messages: [
      {
        "key": "<value>",
      },
    ],
    model: "Golf",
    hyperparameters: {
      "key": "<value>",
    },
    functions: [
      {
        "key": "<value>",
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

| Parameter                                                                            | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `request`                                                                            | [components.ChatCompletionRequest](../../models/components/chatcompletionrequest.md) | :heavy_check_mark:                                                                   | The request object to use for the request.                                           |
| `config`                                                                             | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                         | :heavy_minus_sign:                                                                   | Available config options for making requests.                                        |


### Response

**Promise<[operations.PostChatResponse](../../models/operations/postchatresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postGenerationsLog

Log a generation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postGenerationsLog({
    inputs: {
      "key": "<value>",
    },
    hyperparameters: {
      "key": "<value>",
    },
    usage: {
      "key": "<value>",
    },
    userProperties: {
      "key": "<value>",
    },
    metadata: {},
    feedback: {
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
| `request`                                                                              | [components.GenerationLoggingQuery](../../models/components/generationloggingquery.md) | :heavy_check_mark:                                                                     | The request object to use for the request.                                             |
| `config`                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                           | :heavy_minus_sign:                                                                     | Available config options for making requests.                                          |


### Response

**Promise<[operations.PostGenerationsLogResponse](../../models/operations/postgenerationslogresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postFeedback

Send feedback

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postFeedback({
    task: "<value>",
    generationId: "<value>",
    feedbackJson: {
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

| Parameter                                                            | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `request`                                                            | [components.FeedbackQuery](../../models/components/feedbackquery.md) | :heavy_check_mark:                                                   | The request object to use for the request.                           |
| `config`                                                             | [AxiosRequestConfig](https://axios-http.com/docs/req_config)         | :heavy_minus_sign:                                                   | Available config options for making requests.                        |


### Response

**Promise<[operations.PostFeedbackResponse](../../models/operations/postfeedbackresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postEvaluations

Log an evaluation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postEvaluations({
    prompts: [
      {
        "key": "<value>",
      },
    ],
    dataset: [
      {
        "key": "<value>",
      },
    ],
    metrics: [
      [
        {
          "key": "<value>",
        },
      ],
    ],
    metricsToCompute: [
      "<value>",
    ],
    results: [
      {
        "key": "<value>",
      },
    ],
    summary: [
      {
        "key": "<value>",
      },
    ],
    comments: [
      {
        "key": "<value>",
      },
    ],
    generations: [
      {
        "key": "<value>",
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

| Parameter                                                                              | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `request`                                                                              | [components.EvaluationLoggingQuery](../../models/components/evaluationloggingquery.md) | :heavy_check_mark:                                                                     | The request object to use for the request.                                             |
| `config`                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                           | :heavy_minus_sign:                                                                     | Available config options for making requests.                                          |


### Response

**Promise<[operations.PostEvaluationsResponse](../../models/operations/postevaluationsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getEvaluations

Get all evaluations

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.getEvaluations();

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetEvaluationsResponse](../../models/operations/getevaluationsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getEvaluationsId

Get an evaluation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetEvaluationsIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.getEvaluationsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetEvaluationsIdResponse](../../models/operations/getevaluationsidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteEvaluationsId

Delete an evaluation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteEvaluationsIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.deleteEvaluationsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteEvaluationsIdResponse](../../models/operations/deleteevaluationsidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putEvaluationsId

Update an evaluation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { EvaluationUpdateRequest } from "HoneyHive/dist/models/components";
import { PutEvaluationsIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";
const evaluationUpdateRequest: EvaluationUpdateRequest = {
  prompts: [
    {
      "key": "<value>",
    },
  ],
  dataset: [
    {
      "key": "<value>",
    },
  ],
  metrics: [
    [
      {
        "key": "<value>",
      },
    ],
  ],
  summary: [
    {
      "key": "<value>",
    },
  ],
  generations: [
    {
      "key": "<value>",
    },
  ],
  results: [
    {
      "key": "<value>",
    },
  ],
  accepted: [
    false,
  ],
  comments: [
    {
      "key": "<value>",
    },
  ],
};

  const res = await sdk.putEvaluationsId(id, evaluationUpdateRequest);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                                                                                     | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `evaluationUpdateRequest`                                                                | [components.EvaluationUpdateRequest](../../models/components/evaluationupdaterequest.md) | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `config`                                                                                 | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                             | :heavy_minus_sign:                                                                       | Available config options for making requests.                                            |


### Response

**Promise<[operations.PutEvaluationsIdResponse](../../models/operations/putevaluationsidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postSessionStart

Start a session

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postSessionStart({
    userProperties: {
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

| Parameter                                                                    | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `request`                                                                    | [components.SessionStartQuery](../../models/components/sessionstartquery.md) | :heavy_check_mark:                                                           | The request object to use for the request.                                   |
| `config`                                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                 | :heavy_minus_sign:                                                           | Available config options for making requests.                                |


### Response

**Promise<[operations.PostSessionStartResponse](../../models/operations/postsessionstartresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postSessionSessionIdEnd

End a session

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { PostSessionSessionIdEndRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";

  const res = await sdk.postSessionSessionIdEnd(sessionId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `sessionId`                                                  | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.PostSessionSessionIdEndResponse](../../models/operations/postsessionsessionidendresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postSessionSessionIdEvent

Log an event

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { SessionEventQuery } from "HoneyHive/dist/models/components";
import { PostSessionSessionIdEventRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";
const sessionEventQuery: SessionEventQuery = {
  config: {
    "key": "<value>",
  },
  children: [
    {
      "key": "<value>",
    },
  ],
  inputs: {
    "key": "<value>",
  },
  outputs: {
    "key": "<value>",
  },
  userProperties: {
    "key": "<value>",
  },
  metadata: {
    "key": "<value>",
  },
  metrics: {
    "key": "<value>",
  },
  feedback: {
    "key": "<value>",
  },
};

  const res = await sdk.postSessionSessionIdEvent(sessionId, sessionEventQuery);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                    | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `sessionId`                                                                  | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `sessionEventQuery`                                                          | [components.SessionEventQuery](../../models/components/sessioneventquery.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `config`                                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                 | :heavy_minus_sign:                                                           | Available config options for making requests.                                |


### Response

**Promise<[operations.PostSessionSessionIdEventResponse](../../models/operations/postsessionsessionideventresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postSessionSessionIdFeedback

Log session feedback

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { SessionFeedback } from "HoneyHive/dist/models/components";
import { PostSessionSessionIdFeedbackRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";
const sessionFeedback: SessionFeedback = {
  feedback: {
    "key": "<value>",
  },
};

  const res = await sdk.postSessionSessionIdFeedback(sessionId, sessionFeedback);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `sessionId`                                                              | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `sessionFeedback`                                                        | [components.SessionFeedback](../../models/components/sessionfeedback.md) | :heavy_check_mark:                                                       | N/A                                                                      |
| `config`                                                                 | [AxiosRequestConfig](https://axios-http.com/docs/req_config)             | :heavy_minus_sign:                                                       | Available config options for making requests.                            |


### Response

**Promise<[operations.PostSessionSessionIdFeedbackResponse](../../models/operations/postsessionsessionidfeedbackresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getSessionSessionId

Get a session

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetSessionSessionIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";

  const res = await sdk.getSessionSessionId(sessionId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `sessionId`                                                  | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetSessionSessionIdResponse](../../models/operations/getsessionsessionidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putSessionSessionId

Update a session event

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import {
  Feedback,
  Inputs,
  Output,
  SessionEventUpdate,
  SessionEventUpdateMetadata,
  UserProperties,
} from "HoneyHive/dist/models/components";
import { PutSessionSessionIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";
const sessionEventUpdate: SessionEventUpdate = {
  output: {},
  error: "<value>",
  inputs: {},
  userProperties: {},
  feedback: {},
  metadata: {},
};

  const res = await sdk.putSessionSessionId(sessionId, sessionEventUpdate);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                      | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `sessionId`                                                                    | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `sessionEventUpdate`                                                           | [components.SessionEventUpdate](../../models/components/sessioneventupdate.md) | :heavy_minus_sign:                                                             | N/A                                                                            |
| `config`                                                                       | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                   | :heavy_minus_sign:                                                             | Available config options for making requests.                                  |


### Response

**Promise<[operations.PutSessionSessionIdResponse](../../models/operations/putsessionsessionidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteSessionSessionId

Delete a session

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteSessionSessionIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";

  const res = await sdk.deleteSessionSessionId(sessionId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `sessionId`                                                  | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteSessionSessionIdResponse](../../models/operations/deletesessionsessionidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getSessionSessionIdExport

Get a session in Trace Event format

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetSessionSessionIdExportRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";

  const res = await sdk.getSessionSessionIdExport(sessionId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `sessionId`                                                  | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetSessionSessionIdExportResponse](../../models/operations/getsessionsessionidexportresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getSession

Get all sessions

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetSessionRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const project: string = "<value>";
const query: Record<string, any> = {
  "key": "<value>",
};
const limit: number = 355376;

  const res = await sdk.getSession(project, query, limit);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `project`                                                    | *string*                                                     | :heavy_minus_sign:                                           | The project to query sessions for                            |
| `query`                                                      | Record<string, *any*>                                        | :heavy_minus_sign:                                           | The query for finding sessions                               |
| `limit`                                                      | *number*                                                     | :heavy_minus_sign:                                           | The maximum number of sessions to return                     |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetSessionResponse](../../models/operations/getsessionresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postSessionSessionIdTraces

Log a trace

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { SessionEventQuery, SessionTrace } from "HoneyHive/dist/models/components";
import { PostSessionSessionIdTracesRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";
const sessionTrace: SessionTrace = {
  logs: [
    {
      config: {
        "key": "<value>",
      },
      children: [
        {
          "key": "<value>",
        },
      ],
      inputs: {
        "key": "<value>",
      },
      outputs: {
        "key": "<value>",
      },
      userProperties: {
        "key": "<value>",
      },
      metadata: {
        "key": "<value>",
      },
      metrics: {
        "key": "<value>",
      },
      feedback: {
        "key": "<value>",
      },
    },
  ],
};

  const res = await sdk.postSessionSessionIdTraces(sessionId, sessionTrace);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                          | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `sessionId`                                                        | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `sessionTrace`                                                     | [components.SessionTrace](../../models/components/sessiontrace.md) | :heavy_check_mark:                                                 | N/A                                                                |
| `config`                                                           | [AxiosRequestConfig](https://axios-http.com/docs/req_config)       | :heavy_minus_sign:                                                 | Available config options for making requests.                      |


### Response

**Promise<[operations.PostSessionSessionIdTracesResponse](../../models/operations/postsessionsessionidtracesresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |
