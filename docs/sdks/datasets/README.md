# Datasets
(*datasets*)

### Available Operations

* [deleteDatasets](#deletedatasets) - Delete a dataset
* [getDatasets](#getdatasets) - Get datasets
* [postDatasets](#postdatasets) - Create a dataset
* [putDatasets](#putdatasets) - Update a dataset

## deleteDatasets

Delete a dataset

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteDatasetsRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const datasetId: string = "<value>";

  const res = await sdk.datasets.deleteDatasets(datasetId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `datasetId`                                                  | *string*                                                     | :heavy_check_mark:                                           | The unique identifier of the dataset to be deleted           |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteDatasetsResponse](../../models/operations/deletedatasetsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getDatasets

Get datasets

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetDatasetsQueryParamType, GetDatasetsRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const project: string = "<value>";
const type: GetDatasetsQueryParamType = GetDatasetsQueryParamType.Evaluation;
const datasetId: string = "<value>";

  const res = await sdk.datasets.getDatasets(project, type, datasetId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                    | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `project`                                                                                    | *string*                                                                                     | :heavy_check_mark:                                                                           | Project ID associated with the datasets                                                      |
| `type`                                                                                       | [operations.GetDatasetsQueryParamType](../../models/operations/getdatasetsqueryparamtype.md) | :heavy_minus_sign:                                                                           | Type of the dataset - "evaluation" or "fine-tuning"                                          |
| `datasetId`                                                                                  | *string*                                                                                     | :heavy_minus_sign:                                                                           | Unique dataset ID for filtering specific dataset                                             |
| `config`                                                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                 | :heavy_minus_sign:                                                                           | Available config options for making requests.                                                |


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
import { CreateDatasetRequestType, PipelineType } from "HoneyHive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.datasets.postDatasets({
    datapoints: [
      "<value>",
    ],
    linkedEvals: [
      "<value>",
    ],
    metadata: {},
    name: "<value>",
    project: "<value>",
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

  const res = await sdk.datasets.putDatasets({
    datapoints: [
      "<value>",
    ],
    datasetId: "<value>",
    linkedEvals: [
      "<value>",
    ],
    metadata: {},
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

**Promise<[operations.PutDatasetsResponse](../../models/operations/putdatasetsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |
