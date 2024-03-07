# Configurations
(*configurations*)

### Available Operations

* [getConfigurations](#getconfigurations) - Retrieve a list of configurations
* [createConfiguration](#createconfiguration) - Create a new configuration
* [deleteConfiguration](#deleteconfiguration) - Delete a configuration
* [updateConfiguration](#updateconfiguration) - Update an existing configuration

## getConfigurations

Retrieve a list of configurations

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetConfigurationsRequest, TypeT } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const projectName: string = "<value>";
const type: TypeT = TypeT.Llm;

  const res = await sdk.configurations.getConfigurations(projectName, type);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `projectName`                                                | *string*                                                     | :heavy_check_mark:                                           | Project name for configuration                               |
| `type`                                                       | [operations.TypeT](../../models/operations/typet.md)         | :heavy_check_mark:                                           | Configuration type - "LLM" or "pipeline"                     |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetConfigurationsResponse](../../models/operations/getconfigurationsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## createConfiguration

Create a new configuration

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { CallType, FunctionCallParams, TypeT } from "HoneyHive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.configurations.createConfiguration({
    project: "<value>",
    name: "<value>",
    provider: "<value>",
    parameters: {
      callType: CallType.Chat,
      model: "Volt",
      hyperparameters: {},
      selectedFunctions: [
        {
          parameters: {
            "key": "<value>",
          },
        },
      ],
      forceFunction: {
        "key": "<value>",
      },
    },
    userProperties: {},
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
| `request`                                                            | [components.Configuration](../../models/components/configuration.md) | :heavy_check_mark:                                                   | The request object to use for the request.                           |
| `config`                                                             | [AxiosRequestConfig](https://axios-http.com/docs/req_config)         | :heavy_minus_sign:                                                   | Available config options for making requests.                        |


### Response

**Promise<[operations.CreateConfigurationResponse](../../models/operations/createconfigurationresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteConfiguration

Delete a configuration

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteConfigurationRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.configurations.deleteConfiguration(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | Configuration ID                                             |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteConfigurationResponse](../../models/operations/deleteconfigurationresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## updateConfiguration

Update an existing configuration

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import {
  CallType,
  Configuration,
  FunctionCallParams,
  Hyperparameters,
  ParametersT,
  SelectedFunctions,
  TypeT,
  UserProperties,
} from "HoneyHive/dist/models/components";
import { UpdateConfigurationRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";
const configuration: Configuration = {
  project: "<value>",
  name: "<value>",
  provider: "<value>",
  parameters: {
    callType: CallType.Chat,
    model: "Charger",
    hyperparameters: {},
    selectedFunctions: [
      {
        parameters: {
          "key": "<value>",
        },
      },
    ],
    forceFunction: {
      "key": "<value>",
    },
  },
  userProperties: {},
};

  const res = await sdk.configurations.updateConfiguration(id, configuration);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                            | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `id`                                                                 | *string*                                                             | :heavy_check_mark:                                                   | Configuration ID                                                     |
| `configuration`                                                      | [components.Configuration](../../models/components/configuration.md) | :heavy_check_mark:                                                   | N/A                                                                  |
| `config`                                                             | [AxiosRequestConfig](https://axios-http.com/docs/req_config)         | :heavy_minus_sign:                                                   | Available config options for making requests.                        |


### Response

**Promise<[operations.UpdateConfigurationResponse](../../models/operations/updateconfigurationresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |
