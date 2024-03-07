# HoneyHive

<!-- Start SDK Installation [installation] -->
## SDK Installation

### NPM

```bash
npm add https://github.com/honeyhiveai/typescript-sdk
```

### Yarn

```bash
yarn add https://github.com/honeyhiveai/typescript-sdk
```
<!-- End SDK Installation [installation] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

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
<!-- End SDK Example Usage [usage] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

### [configurations](docs/sdks/configurations/README.md)

* [getConfigurations](docs/sdks/configurations/README.md#getconfigurations) - Retrieve a list of configurations
* [createConfiguration](docs/sdks/configurations/README.md#createconfiguration) - Create a new configuration
* [deleteConfiguration](docs/sdks/configurations/README.md#deleteconfiguration) - Delete a configuration
* [updateConfiguration](docs/sdks/configurations/README.md#updateconfiguration) - Update an existing configuration

### [datapoints](docs/sdks/datapoints/README.md)

* [getDatapoints](docs/sdks/datapoints/README.md#getdatapoints) - Retrieve a list of datapoints
* [createDatapoint](docs/sdks/datapoints/README.md#createdatapoint) - Create a new datapoint
* [updateDatapoint](docs/sdks/datapoints/README.md#updatedatapoint) - Update a specific datapoint
* [deleteDatapoint](docs/sdks/datapoints/README.md#deletedatapoint) - Delete a specific datapoint
* [getDatapoint](docs/sdks/datapoints/README.md#getdatapoint) - Retrieve a specific datapoint

### [datasets](docs/sdks/datasets/README.md)

* [deleteDatasets](docs/sdks/datasets/README.md#deletedatasets) - Delete a dataset
* [getDatasets](docs/sdks/datasets/README.md#getdatasets) - Get datasets
* [postDatasets](docs/sdks/datasets/README.md#postdatasets) - Create a dataset
* [putDatasets](docs/sdks/datasets/README.md#putdatasets) - Update a dataset

### [events](docs/sdks/events/README.md)

* [postEvents](docs/sdks/events/README.md#postevents) - Create a new event
* [putEvents](docs/sdks/events/README.md#putevents) - Update an event
* [deleteEventsEventId](docs/sdks/events/README.md#deleteeventseventid) - Delete an event

### [metrics](docs/sdks/metrics/README.md)

* [deleteMetrics](docs/sdks/metrics/README.md#deletemetrics) - Delete a metric
* [getMetrics](docs/sdks/metrics/README.md#getmetrics) - Get all metrics
* [postMetrics](docs/sdks/metrics/README.md#postmetrics) - Create a new metric
* [putMetrics](docs/sdks/metrics/README.md#putmetrics) - Update an existing metric

### [projects](docs/sdks/projects/README.md)

* [deleteProject](docs/sdks/projects/README.md#deleteproject) - Delete a project
* [getProjects](docs/sdks/projects/README.md#getprojects) - Get a list of projects
* [createProject](docs/sdks/projects/README.md#createproject) - Create a new project
* [updateProject](docs/sdks/projects/README.md#updateproject) - Update an existing project

### [session](docs/sdks/session/README.md)

* [startSession](docs/sdks/session/README.md#startsession) - Start a new session
* [deleteSession](docs/sdks/session/README.md#deletesession) - Delete a session
* [getSession](docs/sdks/session/README.md#getsession) - Retrieve a session
* [processEventTrace](docs/sdks/session/README.md#processeventtrace) - Process an event trace for a given session

### [tools](docs/sdks/tools/README.md)

* [deleteTool](docs/sdks/tools/README.md#deletetool) - Delete a tool
* [getTools](docs/sdks/tools/README.md#gettools) - Retrieve a list of tools
* [createTool](docs/sdks/tools/README.md#createtool) - Create a new tool
* [updateTool](docs/sdks/tools/README.md#updatetool) - Update an existing tool
<!-- End Available Resources and Operations [operations] -->

<!-- Start Error Handling [errors] -->
## Error Handling

Handling errors in this SDK should largely match your expectations.  All operations return a response object or throw an error.  If Error objects are specified in your OpenAPI Spec, the SDK will throw the appropriate Error type.

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

Example

```typescript
import { HoneyHive } from "HoneyHive";
import { GetConfigurationsRequest, TypeT } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const projectName: string = "<value>";
    const type: TypeT = TypeT.Llm;

    let res;
    try {
        res = await sdk.configurations.getConfigurations(projectName, type);
    } catch (err) {
        if (err instanceof errors.SDKError) {
            console.error(err); // handle exception
            throw err;
        }
    }

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Select Server by Index

You can override the default server globally by passing a server index to the `serverIdx: number` optional parameter when initializing the SDK client instance. The selected server will then be used as the default on the operations that use it. This table lists the indexes associated with the available servers:

| # | Server | Variables |
| - | ------ | --------- |
| 0 | `https://api.honeyhive.ai` | None |

#### Example

```typescript
import { HoneyHive } from "HoneyHive";
import { GetConfigurationsRequest, TypeT } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        serverIdx: 0,
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


### Override Server URL Per-Client

The default server can also be overridden globally by passing a URL to the `serverURL: str` optional parameter when initializing the SDK client instance. For example:
```typescript
import { HoneyHive } from "HoneyHive";
import { GetConfigurationsRequest, TypeT } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        serverURL: "https://api.honeyhive.ai",
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
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The Typescript SDK makes API calls using the [axios](https://axios-http.com/docs/intro) HTTP library.  In order to provide a convenient way to configure timeouts, cookies, proxies, custom headers, and other low-level configuration, you can initialize the SDK client with a custom `AxiosInstance` object.

For example, you could specify a header for every request that your sdk makes as follows:

```typescript
import { HoneyHive } from "HoneyHive";
import axios from "axios";

const httpClient = axios.create({
    headers: {'x-custom-header': 'someValue'}
})

const sdk = new HoneyHive({defaultClient: httpClient});
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name         | Type         | Scheme       |
| ------------ | ------------ | ------------ |
| `bearerAuth` | http         | HTTP Bearer  |

To authenticate with the API the `bearerAuth` parameter must be set when initializing the SDK client instance. For example:
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

### Per-Operation Security Schemes

Some operations in this SDK require the security scheme to be specified at the request level. For example:
```typescript
import { HoneyHive } from "HoneyHive";
import { GetToolsSecurity } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive();
    const operationSecurity: GetToolsSecurity = "<YOUR_BEARER_TOKEN_HERE>";

    const res = await sdk.tools.getTools(operationSecurity);

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```
<!-- End Authentication [security] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically.
Feel free to open a PR or a Github issue as a proof of concept and we'll do our best to include it in a future release!

### SDK Created by [Speakeasy](https://docs.speakeasyapi.dev/docs/using-speakeasy/client-sdks)
