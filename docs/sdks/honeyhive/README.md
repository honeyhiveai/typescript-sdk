# HoneyHive SDK


## Overview

### Available Operations

* [postRuns](#postruns) - Create a new evaluation run
* [getRuns](#getruns) - Get a list of evaluation runs
* [getRunsRunId](#getrunsrunid) - Get details of an evaluation run
* [putRunsRunId](#putrunsrunid) - Update an evaluation run
* [deleteRunsRunId](#deleterunsrunid) - Delete an evaluation run

## postRuns

Create a new evaluation run

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { Status } from "honeyhive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.postRuns({
    project: "<value>",
    name: "<value>",
    eventIds: [
      "7ca92550-e86b-4cb5-8288-452bedab53f3",
    ],
    datapointIds: [
      "<value>",
    ],
    configuration: {
      "key": "<value>",
    },
    metadata: {
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

| Parameter                                                                  | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `request`                                                                  | [components.CreateRunRequest](../../models/components/createrunrequest.md) | :heavy_check_mark:                                                         | The request object to use for the request.                                 |
| `config`                                                                   | [AxiosRequestConfig](https://axios-http.com/docs/req_config)               | :heavy_minus_sign:                                                         | Available config options for making requests.                              |


### Response

**Promise<[operations.PostRunsResponse](../../models/operations/postrunsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getRuns

Get a list of evaluation runs

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { GetRunsRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const project: string = "<value>";

  const res = await sdk.getRuns(project);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `project`                                                    | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetRunsResponse](../../models/operations/getrunsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getRunsRunId

Get details of an evaluation run

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { GetRunsRunIdRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const runId: string = "<value>";

  const res = await sdk.getRunsRunId(runId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `runId`                                                      | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetRunsRunIdResponse](../../models/operations/getrunsrunidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putRunsRunId

Update an evaluation run

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { UpdateRunRequest, UpdateRunRequestStatus } from "honeyhive/dist/models/components";
import { PutRunsRunIdRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const runId: string = "<value>";
const updateRunRequest: UpdateRunRequest = {
  eventIds: [
    "c107a175-576a-4346-97d8-4fcfc3b17a11",
  ],
  datapointIds: [
    "<value>",
  ],
  configuration: {
    "key": "<value>",
  },
  metadata: {
    "key": "<value>",
  },
};

  const res = await sdk.putRunsRunId(runId, updateRunRequest);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                  | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `runId`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `updateRunRequest`                                                         | [components.UpdateRunRequest](../../models/components/updaterunrequest.md) | :heavy_check_mark:                                                         | N/A                                                                        |
| `config`                                                                   | [AxiosRequestConfig](https://axios-http.com/docs/req_config)               | :heavy_minus_sign:                                                         | Available config options for making requests.                              |


### Response

**Promise<[operations.PutRunsRunIdResponse](../../models/operations/putrunsrunidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteRunsRunId

Delete an evaluation run

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { DeleteRunsRunIdRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const runId: string = "<value>";

  const res = await sdk.deleteRunsRunId(runId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `runId`                                                      | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteRunsRunIdResponse](../../models/operations/deleterunsrunidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |
