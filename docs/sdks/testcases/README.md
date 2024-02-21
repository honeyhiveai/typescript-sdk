# Testcases
(*testcases*)

### Available Operations

* [getTestcases](#gettestcases) - Get testcases
* [postTestcases](#posttestcases) - Create a testcase
* [putTestcases](#puttestcases) - Update a testcase

## getTestcases

Get testcases

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetTestcasesRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const project: string = "<value>";
const type: string = "<value>";
const testcaseId: string = "<value>";

  const res = await sdk.testcases.getTestcases(project, type, testcaseId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `project`                                                    | *string*                                                     | :heavy_check_mark:                                           | Project ID                                                   |
| `type`                                                       | *string*                                                     | :heavy_minus_sign:                                           | Type of the testcase                                         |
| `testcaseId`                                                 | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetTestcasesResponse](../../models/operations/gettestcasesresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postTestcases

Create a testcase

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.testcases.postTestcases({
    datapoints: [
      "<value>",
    ],
    linkedEvals: [
      "<value>",
    ],
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `request`                                                    | [components.Testcase](../../models/components/testcase.md)   | :heavy_check_mark:                                           | The request object to use for the request.                   |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.PostTestcasesResponse](../../models/operations/posttestcasesresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putTestcases

Update a testcase

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { TestcaseUpdate } from "HoneyHive/dist/models/components";
import { PutTestcasesRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const testcaseId: string = "<value>";
const testcaseUpdate: TestcaseUpdate = {
  datapoints: [
    "<value>",
  ],
};

  const res = await sdk.testcases.putTestcases(testcaseId, testcaseUpdate);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                              | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `testcaseId`                                                           | *string*                                                               | :heavy_check_mark:                                                     | The ID of the testcase to update                                       |
| `testcaseUpdate`                                                       | [components.TestcaseUpdate](../../models/components/testcaseupdate.md) | :heavy_check_mark:                                                     | N/A                                                                    |
| `config`                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)           | :heavy_minus_sign:                                                     | Available config options for making requests.                          |


### Response

**Promise<[operations.PutTestcasesResponse](../../models/operations/puttestcasesresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |
