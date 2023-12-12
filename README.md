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
import { GetTasksRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const name: string = "string";

    const res = await sdk.getTasks(name);

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

### [HoneyHive SDK](docs/sdks/honeyhive/README.md)

* [getTasks](docs/sdks/honeyhive/README.md#gettasks) - Get all tasks
* [postTasks](docs/sdks/honeyhive/README.md#posttasks) - Create a task
* [deleteTasks](docs/sdks/honeyhive/README.md#deletetasks) - Delete a task
* [putTasks](docs/sdks/honeyhive/README.md#puttasks) - Update a task
* [getGenerations](docs/sdks/honeyhive/README.md#getgenerations) - Get all generations
* [postGenerations](docs/sdks/honeyhive/README.md#postgenerations) - Generate a text
* [getPrompts](docs/sdks/honeyhive/README.md#getprompts) - Get all prompts or filter by task and name
* [postPrompts](docs/sdks/honeyhive/README.md#postprompts) - Create a prompt
* [putPromptsId](docs/sdks/honeyhive/README.md#putpromptsid) - Update a prompt
* [deletePromptsId](docs/sdks/honeyhive/README.md#deletepromptsid) - Delete a prompt by name
* [getFineTunedModels](docs/sdks/honeyhive/README.md#getfinetunedmodels) - Get all fine-tuned models
* [postFineTunedModels](docs/sdks/honeyhive/README.md#postfinetunedmodels) - Create a new fine-tuned model
* [getFineTunedModelsId](docs/sdks/honeyhive/README.md#getfinetunedmodelsid) - Get a fine-tuned model
* [deleteFineTunedModelsId](docs/sdks/honeyhive/README.md#deletefinetunedmodelsid) - Delete a fine-tuned model
* [getDatasets](docs/sdks/honeyhive/README.md#getdatasets) - Get datasets
* [postDatasets](docs/sdks/honeyhive/README.md#postdatasets) - Create a dataset
* [putDatasets](docs/sdks/honeyhive/README.md#putdatasets) - Update a dataset
* [deleteDatasets](docs/sdks/honeyhive/README.md#deletedatasets) - Delete all datasets
* [deleteDatasetsName](docs/sdks/honeyhive/README.md#deletedatasetsname) - Delete a dataset
* [getMetrics](docs/sdks/honeyhive/README.md#getmetrics) - Get all metrics
* [postMetrics](docs/sdks/honeyhive/README.md#postmetrics) - Create a metric
* [deleteMetrics](docs/sdks/honeyhive/README.md#deletemetrics) - Delete a metric
* [putMetrics](docs/sdks/honeyhive/README.md#putmetrics) - Update a metric
* [postMetricsCompute](docs/sdks/honeyhive/README.md#postmetricscompute) - Compute metric
* [postChat](docs/sdks/honeyhive/README.md#postchat) - Create a chat completion
* [postGenerationsLog](docs/sdks/honeyhive/README.md#postgenerationslog) - Log a generation
* [postFeedback](docs/sdks/honeyhive/README.md#postfeedback) - Send feedback
* [postEvaluations](docs/sdks/honeyhive/README.md#postevaluations) - Log an evaluation
* [getEvaluations](docs/sdks/honeyhive/README.md#getevaluations) - Get all evaluations
* [getEvaluationsId](docs/sdks/honeyhive/README.md#getevaluationsid) - Get an evaluation
* [deleteEvaluationsId](docs/sdks/honeyhive/README.md#deleteevaluationsid) - Delete an evaluation
* [putEvaluationsId](docs/sdks/honeyhive/README.md#putevaluationsid) - Update an evaluation
* [postSessionStart](docs/sdks/honeyhive/README.md#postsessionstart) - Start a session
* [postSessionSessionIdEnd](docs/sdks/honeyhive/README.md#postsessionsessionidend) - End a session
* [postSessionSessionIdEvent](docs/sdks/honeyhive/README.md#postsessionsessionidevent) - Log an event
* [postSessionSessionIdFeedback](docs/sdks/honeyhive/README.md#postsessionsessionidfeedback) - Log session feedback
* [getSessionSessionId](docs/sdks/honeyhive/README.md#getsessionsessionid) - Get a session
* [putSessionSessionId](docs/sdks/honeyhive/README.md#putsessionsessionid) - Update a session event
* [deleteSessionSessionId](docs/sdks/honeyhive/README.md#deletesessionsessionid) - Delete a session
* [getSessionSessionIdExport](docs/sdks/honeyhive/README.md#getsessionsessionidexport) - Get a session in Trace Event format
* [getSession](docs/sdks/honeyhive/README.md#getsession) - Get all sessions
* [postSessionSessionIdTraces](docs/sdks/honeyhive/README.md#postsessionsessionidtraces) - Log a trace
<!-- End Available Resources and Operations [operations] -->

<!-- Start Error Handling [errors] -->
## Error Handling

Handling errors in this SDK should largely match your expectations.  All operations return a response object or throw an error.  If Error objects are specified in your OpenAPI Spec, the SDK will throw the appropriate Error type.

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 400-600         | */*             |

Example

```typescript
import { HoneyHive } from "HoneyHive";
import { GetTasksRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const name: string = "string";

    let res;
    try {
        res = await sdk.getTasks(name);
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
import { GetTasksRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        serverIdx: 0,
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const name: string = "string";

    const res = await sdk.getTasks(name);

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
import { GetTasksRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        serverURL: "https://api.honeyhive.ai",
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const name: string = "string";

    const res = await sdk.getTasks(name);

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
import { GetTasksRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const name: string = "string";

    const res = await sdk.getTasks(name);

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
