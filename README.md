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
import { GetConfigurationsRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const project: string = "<value>";
    const type: string = "<value>";

    const res = await sdk.configurations.getConfigurations(project, type);

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

### [datapoint](docs/sdks/datapoint/README.md)

* [getDatapoints](docs/sdks/datapoint/README.md#getdatapoints) - Retrieve a list of datapoints
* [updateDatapoint](docs/sdks/datapoint/README.md#updatedatapoint) - Update a specific datapoint
* [createDatapoint](docs/sdks/datapoint/README.md#createdatapoint) - Create a new datapoint
* [deleteDatapoint](docs/sdks/datapoint/README.md#deletedatapoint) - Delete a specific datapoint
* [getDatapoint](docs/sdks/datapoint/README.md#getdatapoint) - Retrieve a specific datapoint

### [datasets](docs/sdks/datasets/README.md)

* [getDatasets](docs/sdks/datasets/README.md#getdatasets) - Retrieve a list of datasets
* [createDataset](docs/sdks/datasets/README.md#createdataset) - Create a new dataset
* [deleteDataset](docs/sdks/datasets/README.md#deletedataset) - Delete a dataset
* [updateDataset](docs/sdks/datasets/README.md#updatedataset) - Update a dataset

### [events](docs/sdks/events/README.md)

* [getEvents](docs/sdks/events/README.md#getevents) - Retrieve events based on filters
* [postEvents](docs/sdks/events/README.md#postevents) - Create a new event
* [putEvents](docs/sdks/events/README.md#putevents) - Update an event
* [getEventsChart](docs/sdks/events/README.md#geteventschart) - Retrieve a chart of events
* [deleteEventsEventId](docs/sdks/events/README.md#deleteeventseventid) - Delete an event

### [metrics](docs/sdks/metrics/README.md)

* [deleteMetrics](docs/sdks/metrics/README.md#deletemetrics) - Delete a metric
* [getMetrics](docs/sdks/metrics/README.md#getmetrics) - Get all metrics
* [postMetrics](docs/sdks/metrics/README.md#postmetrics) - Create a new metric
* [putMetrics](docs/sdks/metrics/README.md#putmetrics) - Update an existing metric
* [postMetricsCompute](docs/sdks/metrics/README.md#postmetricscompute) - Compute metric

### [prompts](docs/sdks/prompts/README.md)

* [getPrompts](docs/sdks/prompts/README.md#getprompts) - Retrieve a list of prompts based on query parameters.
* [postPrompts](docs/sdks/prompts/README.md#postprompts) - Create a new prompt.
* [deletePromptsId](docs/sdks/prompts/README.md#deletepromptsid) - Delete an existing prompt.
* [putPromptsId](docs/sdks/prompts/README.md#putpromptsid) - Update an existing prompt.

### [session](docs/sdks/session/README.md)

* [startSession](docs/sdks/session/README.md#startsession) - Start a new session
* [deleteSession](docs/sdks/session/README.md#deletesession) - Delete a session
* [getSession](docs/sdks/session/README.md#getsession) - Retrieve a session
* [processEventTrace](docs/sdks/session/README.md#processeventtrace) - Process an event trace for a given session

### [tasks](docs/sdks/tasks/README.md)

* [deleteTask](docs/sdks/tasks/README.md#deletetask) - Delete a task
* [getTasks](docs/sdks/tasks/README.md#gettasks) - Get a list of tasks
* [createTask](docs/sdks/tasks/README.md#createtask) - Create a new task
* [updateTask](docs/sdks/tasks/README.md#updatetask) - Update a task

### [testcases](docs/sdks/testcases/README.md)

* [getTestcases](docs/sdks/testcases/README.md#gettestcases) - Get testcases
* [postTestcases](docs/sdks/testcases/README.md#posttestcases) - Create a testcase
* [putTestcases](docs/sdks/testcases/README.md#puttestcases) - Update a testcase

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
import { GetConfigurationsRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const project: string = "<value>";
    const type: string = "<value>";

    let res;
    try {
        res = await sdk.configurations.getConfigurations(project, type);
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
import { GetConfigurationsRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        serverIdx: 0,
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const project: string = "<value>";
    const type: string = "<value>";

    const res = await sdk.configurations.getConfigurations(project, type);

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
import { GetConfigurationsRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        serverURL: "https://api.honeyhive.ai",
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const project: string = "<value>";
    const type: string = "<value>";

    const res = await sdk.configurations.getConfigurations(project, type);

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
import { GetConfigurationsRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const project: string = "<value>";
    const type: string = "<value>";

    const res = await sdk.configurations.getConfigurations(project, type);

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
