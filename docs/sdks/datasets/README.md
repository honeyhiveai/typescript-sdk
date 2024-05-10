# Datasets
(*datasets*)

### Available Operations

* [getDatasets](#getdatasets) - Get datasets
* [createDataset](#createdataset) - Create a dataset
* [updateDataset](#updatedataset) - Update a dataset
* [deleteDataset](#deletedataset) - Delete a dataset

## getDatasets

Get datasets

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { GetDatasetsRequest, QueryParamType } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const project: string = "<value>";
const type: QueryParamType = QueryParamType.Evaluation;
const datasetId: string = "<value>";

  const res = await sdk.datasets.getDatasets(project, type, datasetId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                        | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `project`                                                                        | *string*                                                                         | :heavy_check_mark:                                                               | Project ID associated with the datasets like `65e0fc2d6a2eb95f55a92cbc`          |
| `type`                                                                           | [operations.QueryParamType](../../models/operations/queryparamtype.md)           | :heavy_minus_sign:                                                               | Type of the dataset - "evaluation" or "fine-tuning"                              |
| `datasetId`                                                                      | *string*                                                                         | :heavy_minus_sign:                                                               | Unique dataset ID for filtering specific dataset like `663876ec4611c47f4970f0c3` |
| `config`                                                                         | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                     | :heavy_minus_sign:                                                               | Available config options for making requests.                                    |


### Response

**Promise<[operations.GetDatasetsResponse](../../models/operations/getdatasetsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## createDataset

Create a dataset

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { CreateDatasetRequestPipelineType, CreateDatasetRequestType } from "honeyhive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.datasets.createDataset({
    project: "65e0fc2d6a2eb95f55a92cbc",
    name: "test-dataset",
    description: "A test dataset",
    type: CreateDatasetRequestType.Evaluation,
    datapoints: [
      "66369748b5773befbdc661e2",
    ],
    linkedEvals: [
      "<value>",
    ],
    saved: false,
    pipelineType: CreateDatasetRequestPipelineType.Event,
    metadata: {
      "source": "dev",
    },
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
| `request`                                                                          | [components.CreateDatasetRequest](../../models/components/createdatasetrequest.md) | :heavy_check_mark:                                                                 | The request object to use for the request.                                         |
| `config`                                                                           | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                       | :heavy_minus_sign:                                                                 | Available config options for making requests.                                      |


### Response

**Promise<[operations.CreateDatasetResponse](../../models/operations/createdatasetresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## updateDataset

Update a dataset

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.datasets.updateDataset({
    datasetId: "663876ec4611c47f4970f0c3",
    name: "new-dataset-name",
    description: "An updated dataset description",
    datapoints: [
      "66369748b5773befbdc661e",
    ],
    linkedEvals: [
      "66369748b5773befbdasdk1",
    ],
    metadata: {
      "updated": true,
      "source": "prod",
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
| `request`                                                            | [components.DatasetUpdate](../../models/components/datasetupdate.md) | :heavy_check_mark:                                                   | The request object to use for the request.                           |
| `config`                                                             | [AxiosRequestConfig](https://axios-http.com/docs/req_config)         | :heavy_minus_sign:                                                   | Available config options for making requests.                        |


### Response

**Promise<[operations.UpdateDatasetResponse](../../models/operations/updatedatasetresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteDataset

Delete a dataset

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { DeleteDatasetRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const datasetId: string = "<value>";

  const res = await sdk.datasets.deleteDataset(datasetId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                          | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `datasetId`                                                                        | *string*                                                                           | :heavy_check_mark:                                                                 | The unique identifier of the dataset to be deleted like `663876ec4611c47f4970f0c3` |
| `config`                                                                           | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                       | :heavy_minus_sign:                                                                 | Available config options for making requests.                                      |


### Response

**Promise<[operations.DeleteDatasetResponse](../../models/operations/deletedatasetresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |
