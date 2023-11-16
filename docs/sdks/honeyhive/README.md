# HoneyHive SDK


## Overview

### Available Operations

* [deleteTasks](#deletetasks) - Delete a task
* [getTasks](#gettasks) - Get all tasks
* [postTasks](#posttasks) - Create a task
* [putTasks](#puttasks) - Update a task
* [getGenerations](#getgenerations) - Get all generations
* [postGenerations](#postgenerations) - Generate a text
* [getPrompts](#getprompts) - Get all prompts or filter by task and name
* [postPrompts](#postprompts) - Create a prompt
* [deletePromptsId](#deletepromptsid) - Delete a prompt by name
* [putPromptsId](#putpromptsid) - Update a prompt
* [getFineTunedModels](#getfinetunedmodels) - Get all fine-tuned models
* [postFineTunedModels](#postfinetunedmodels) - Create a new fine-tuned model
* [deleteFineTunedModelsId](#deletefinetunedmodelsid) - Delete a fine-tuned model
* [getFineTunedModelsId](#getfinetunedmodelsid) - Get a fine-tuned model
* [deleteDatasets](#deletedatasets) - Delete all datasets
* [getDatasets](#getdatasets) - Get datasets
* [postDatasets](#postdatasets) - Create a dataset
* [putDatasets](#putdatasets) - Update a dataset
* [deleteDatasetsName](#deletedatasetsname) - Delete a dataset
* [deleteMetrics](#deletemetrics) - Delete a metric
* [getMetrics](#getmetrics) - Get all metrics
* [postMetrics](#postmetrics) - Create a metric
* [putMetrics](#putmetrics) - Update a metric
* [postMetricsCompute](#postmetricscompute) - Compute metric
* [postChat](#postchat) - Create a chat completion
* [postGenerationsLog](#postgenerationslog) - Log a generation
* [postFeedback](#postfeedback) - Send feedback
* [getEvaluations](#getevaluations) - Get all evaluations
* [postEvaluations](#postevaluations) - Log an evaluation
* [deleteEvaluationsId](#deleteevaluationsid) - Delete an evaluation
* [getEvaluationsId](#getevaluationsid) - Get an evaluation
* [putEvaluationsId](#putevaluationsid) - Update an evaluation
* [postSessionStart](#postsessionstart) - Start a session
* [postSessionSessionIdEnd](#postsessionsessionidend) - End a session
* [postSessionSessionIdEvent](#postsessionsessionidevent) - Log an event
* [postSessionSessionIdFeedback](#postsessionsessionidfeedback) - Log session feedback
* [deleteSessionSessionId](#deletesessionsessionid) - Delete a session
* [getSessionSessionId](#getsessionsessionid) - Get a session
* [putSessionSessionId](#putsessionsessionid) - Update a session event
* [getSessionSessionIdExport](#getsessionsessionidexport) - Get a session in Trace Event format
* [getSession](#getsession) - Get all sessions
* [postSessionSessionIdTraces](#postsessionsessionidtraces) - Log a trace

## deleteTasks

Delete a task

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteTasksRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const name: string = "string";

  const res = await sdk.deleteTasks(name);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getTasks

Get all tasks

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetTasksRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const name: string = "string";

  const res = await sdk.getTasks(name);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postTasks

Create a task

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postTasks({
    fineTunedModels: [
      {},
    ],
    prompts: [
      {
        inputVariables: [
          "string",
        ],
        hyperparameters: {
          "key": "string",
        },
        fewShotExamples: [
          {
            "key": "string",
          },
        ],
      },
    ],
    datasets: [
      {
        file: [
          {
            "key": "string",
          },
        ],
      },
    ],
    metrics: [
      {
        threshold: {
          "key": "string",
        },
      },
    ],
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## putTasks

Update a task

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.putTasks({
    fineTunedModels: [
      {},
    ],
    prompts: [
      {
        inputVariables: [
          "string",
        ],
        hyperparameters: {
          "key": "string",
        },
        fewShotExamples: [
          {
            "key": "string",
          },
        ],
      },
    ],
    datasets: [
      {
        file: [
          {
            "key": "string",
          },
        ],
      },
    ],
    metrics: [
      {
        threshold: {
          "key": "string",
        },
      },
    ],
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getGenerations

Get all generations

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetGenerationsRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const task: string = "string";
const prompt: string = "string";
const modelId: string = "string";

  const res = await sdk.getGenerations(task, prompt, modelId);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postGenerations

Generate a text

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postGenerations({
    input: {
      "key": "string",
    },
    prompts: [
      "string",
    ],
    metadata: {
      "key": "string",
    },
    userProperties: {
      "key": "string",
    },
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getPrompts

Get all prompts or filter by task and name

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetPromptsRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const task: string = "string";
const name: string = "string";

  const res = await sdk.getPrompts(task, name);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postPrompts

Create a prompt

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postPrompts({
    hyperparameters: {
      "key": "string",
    },
    fewShotExamples: [
      {
        "key": "string",
      },
    ],
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## deletePromptsId

Delete a prompt by name

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeletePromptsIdRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const id: string = "string";

  const res = await sdk.deletePromptsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## putPromptsId

Update a prompt

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { PromptUpdateQuery } from "HoneyHive/dist/models/components";
import { PutPromptsIdRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const id: string = "string";
const promptUpdateQuery: PromptUpdateQuery = {
  inputVariables: [
    "string",
  ],
  hyperparameters: {
    "key": "string",
  },
  fewShotExamples: [
    {
      "key": "string",
    },
  ],
};

  const res = await sdk.putPromptsId(id, promptUpdateQuery);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getFineTunedModels

Get all fine-tuned models

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetFineTunedModelsRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const task: string = "string";
const modelId: string = "string";

  const res = await sdk.getFineTunedModels(task, modelId);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postFineTunedModels

Create a new fine-tuned model

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postFineTunedModels({});

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## deleteFineTunedModelsId

Delete a fine-tuned model

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteFineTunedModelsIdRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const id: string = "string";

  const res = await sdk.deleteFineTunedModelsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getFineTunedModelsId

Get a fine-tuned model

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetFineTunedModelsIdRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const id: string = "string";

  const res = await sdk.getFineTunedModelsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## deleteDatasets

Delete all datasets

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.deleteDatasets();

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getDatasets

Get datasets

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetDatasetsRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const task: string = "string";
const prompt: string = "string";
const datasetId: string = "string";
const purpose: string = "string";

  const res = await sdk.getDatasets(task, prompt, datasetId, purpose);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postDatasets

Create a dataset

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postDatasets({
    file: [
      {
        "key": "string",
      },
    ],
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## putDatasets

Update a dataset

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.putDatasets({
    file: [
      {
        "key": "string",
      },
    ],
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## deleteDatasetsName

Delete a dataset

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteDatasetsNameRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const name: string = "string";

  const res = await sdk.deleteDatasetsName(name);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## deleteMetrics

Delete a metric

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteMetricsRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const metricId: string = "string";

  const res = await sdk.deleteMetrics(metricId);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getMetrics

Get all metrics

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetMetricsRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const task: string = "string";

  const res = await sdk.getMetrics(task);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postMetrics

Create a metric

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postMetrics({
    threshold: {},
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## putMetrics

Update a metric

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.putMetrics({
    threshold: {},
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postMetricsCompute

Compute metric

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postMetricsCompute({
    metric: {},
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postChat

Create a chat completion

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postChat({
    project: "string",
    messages: [
      {
        "key": "string",
      },
    ],
    model: "Golf",
    hyperparameters: {
      "key": "string",
    },
    functions: [
      {
        "key": "string",
      },
    ],
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postGenerationsLog

Log a generation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postGenerationsLog({
    inputs: {
      "key": "string",
    },
    hyperparameters: {
      "key": "string",
    },
    usage: {
      "key": "string",
    },
    userProperties: {
      "key": "string",
    },
    metadata: {},
    feedback: {
      "key": "string",
    },
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postFeedback

Send feedback

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postFeedback({
    task: "string",
    generationId: "string",
    feedbackJson: {
      "key": "string",
    },
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getEvaluations

Get all evaluations

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.getEvaluations();

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postEvaluations

Log an evaluation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postEvaluations({
    prompts: [
      {
        "key": "string",
      },
    ],
    dataset: [
      {
        "key": "string",
      },
    ],
    metrics: [
      [
        {
          "key": "string",
        },
      ],
    ],
    metricsToCompute: [
      "string",
    ],
    results: [
      {
        "key": "string",
      },
    ],
    summary: [
      {
        "key": "string",
      },
    ],
    comments: [
      {
        "key": "string",
      },
    ],
    generations: [
      {
        "key": "string",
      },
    ],
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## deleteEvaluationsId

Delete an evaluation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteEvaluationsIdRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const id: string = "string";

  const res = await sdk.deleteEvaluationsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getEvaluationsId

Get an evaluation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetEvaluationsIdRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const id: string = "string";

  const res = await sdk.getEvaluationsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## putEvaluationsId

Update an evaluation

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { EvaluationUpdateRequest } from "HoneyHive/dist/models/components";
import { PutEvaluationsIdRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const id: string = "string";
const evaluationUpdateRequest: EvaluationUpdateRequest = {
  prompts: [
    {
      "key": "string",
    },
  ],
  dataset: [
    {
      "key": "string",
    },
  ],
  metrics: [
    [
      {
        "key": "string",
      },
    ],
  ],
  summary: [
    {
      "key": "string",
    },
  ],
  generations: [
    {
      "key": "string",
    },
  ],
  results: [
    {
      "key": "string",
    },
  ],
  accepted: [
    false,
  ],
  comments: [
    {
      "key": "string",
    },
  ],
};

  const res = await sdk.putEvaluationsId(id, evaluationUpdateRequest);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postSessionStart

Start a session

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });

  const res = await sdk.postSessionStart({
    userProperties: {
      "key": "string",
    },
  });

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postSessionSessionIdEnd

End a session

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { PostSessionSessionIdEndRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const sessionId: string = "string";

  const res = await sdk.postSessionSessionIdEnd(sessionId);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postSessionSessionIdEvent

Log an event

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { SessionEventQuery } from "HoneyHive/dist/models/components";
import { PostSessionSessionIdEventRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const sessionId: string = "string";
const sessionEventQuery: SessionEventQuery = {
  config: {
    "key": "string",
  },
  children: [
    {
      "key": "string",
    },
  ],
  inputs: {
    "key": "string",
  },
  outputs: {
    "key": "string",
  },
  userProperties: {
    "key": "string",
  },
  metadata: {
    "key": "string",
  },
  metrics: {
    "key": "string",
  },
  feedback: {
    "key": "string",
  },
};

  const res = await sdk.postSessionSessionIdEvent(sessionId, sessionEventQuery);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postSessionSessionIdFeedback

Log session feedback

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { SessionFeedback } from "HoneyHive/dist/models/components";
import { PostSessionSessionIdFeedbackRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const sessionId: string = "string";
const sessionFeedback: SessionFeedback = {
  feedback: {
    "key": "string",
  },
};

  const res = await sdk.postSessionSessionIdFeedback(sessionId, sessionFeedback);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## deleteSessionSessionId

Delete a session

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteSessionSessionIdRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const sessionId: string = "string";

  const res = await sdk.deleteSessionSessionId(sessionId);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getSessionSessionId

Get a session

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetSessionSessionIdRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const sessionId: string = "string";

  const res = await sdk.getSessionSessionId(sessionId);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

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

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const sessionId: string = "string";
const sessionEventUpdate: SessionEventUpdate = {
  output: {},
  error: "string",
  inputs: {},
  userProperties: {},
  feedback: {},
  metadata: {},
};

  const res = await sdk.putSessionSessionId(sessionId, sessionEventUpdate);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getSessionSessionIdExport

Get a session in Trace Event format

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetSessionSessionIdExportRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const sessionId: string = "string";

  const res = await sdk.getSessionSessionIdExport(sessionId);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## getSession

Get all sessions

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetSessionRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const project: string = "string";
const query: Record<string, any> = {
  "key": "string",
};
const limit: number = 355376;

  const res = await sdk.getSession(project, query, limit);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |

## postSessionSessionIdTraces

Log a trace

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { SessionEventQuery, SessionTrace } from "HoneyHive/dist/models/components";
import { PostSessionSessionIdTracesRequest } from "HoneyHive/dist/models/operations";

(async() => {
  const sdk = new HoneyHive({
    bearerAuth: "",
  });
const sessionId: string = "string";
const sessionTrace: SessionTrace = {
  logs: [
    {
      config: {
        "key": "string",
      },
      children: [
        {
          "key": "string",
        },
      ],
      inputs: {
        "key": "string",
      },
      outputs: {
        "key": "string",
      },
      userProperties: {
        "key": "string",
      },
      metadata: {
        "key": "string",
      },
      metrics: {
        "key": "string",
      },
      feedback: {
        "key": "string",
      },
    },
  ],
};

  const res = await sdk.postSessionSessionIdTraces(sessionId, sessionTrace);

  if (res.statusCode == 200) {
    // handle response
  }
})();
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
| errors.SDKError | 400-600         | */*             |
