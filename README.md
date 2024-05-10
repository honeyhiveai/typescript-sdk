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
import { HoneyHive } from "honeyhive";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });

    const res = await sdk.session.startSession({
        session: {
            project: "Simple RAG Project",
            sessionName: "Playground Session",
            source: "playground",
            sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
            childrenIds: ["7f22137a-6911-4ed3-bc36-110f1dde6b66"],
            config: {
                key: "<value>",
            },
            inputs: {
                context: "Hello world",
                question: "What is in the context?",
                chat_history: "<value>",
            },
            outputs: {
                role: "assistant",
                content: "Hello world",
            },
            error: null,
            duration: 824.8056,
            userProperties: {
                user: "google-oauth2|111840237613341303366",
            },
            metrics: {},
            feedback: {},
            metadata: {},
            startTime: 1712025501605,
            endTime: 1712025499832,
        },
    });

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

### [session](docs/sdks/session/README.md)

* [startSession](docs/sdks/session/README.md#startsession) - Start a new session
* [getSession](docs/sdks/session/README.md#getsession) - Retrieve a session

### [events](docs/sdks/events/README.md)

* [createEvent](docs/sdks/events/README.md#createevent) - Create a new event
* [updateEvent](docs/sdks/events/README.md#updateevent) - Update an event
* [getEvents](docs/sdks/events/README.md#getevents) - Retrieve events based on filters

### [metrics](docs/sdks/metrics/README.md)

* [getMetrics](docs/sdks/metrics/README.md#getmetrics) - Get all metrics
* [createMetric](docs/sdks/metrics/README.md#createmetric) - Create a new metric
* [updateMetric](docs/sdks/metrics/README.md#updatemetric) - Update an existing metric
* [deleteMetric](docs/sdks/metrics/README.md#deletemetric) - Delete a metric

### [tools](docs/sdks/tools/README.md)

* [getTools](docs/sdks/tools/README.md#gettools) - Retrieve a list of tools
* [createTool](docs/sdks/tools/README.md#createtool) - Create a new tool
* [updateTool](docs/sdks/tools/README.md#updatetool) - Update an existing tool
* [deleteTool](docs/sdks/tools/README.md#deletetool) - Delete a tool

### [datapoints](docs/sdks/datapoints/README.md)

* [getDatapoints](docs/sdks/datapoints/README.md#getdatapoints) - Retrieve a list of datapoints
* [createDatapoint](docs/sdks/datapoints/README.md#createdatapoint) - Create a new datapoint
* [getDatapoint](docs/sdks/datapoints/README.md#getdatapoint) - Retrieve a specific datapoint
* [updateDatapoint](docs/sdks/datapoints/README.md#updatedatapoint) - Update a specific datapoint
* [deleteDatapoint](docs/sdks/datapoints/README.md#deletedatapoint) - Delete a specific datapoint

### [datasets](docs/sdks/datasets/README.md)

* [getDatasets](docs/sdks/datasets/README.md#getdatasets) - Get datasets
* [createDataset](docs/sdks/datasets/README.md#createdataset) - Create a dataset
* [updateDataset](docs/sdks/datasets/README.md#updatedataset) - Update a dataset
* [deleteDataset](docs/sdks/datasets/README.md#deletedataset) - Delete a dataset

### [projects](docs/sdks/projects/README.md)

* [getProjects](docs/sdks/projects/README.md#getprojects) - Get a list of projects
* [createProject](docs/sdks/projects/README.md#createproject) - Create a new project
* [updateProject](docs/sdks/projects/README.md#updateproject) - Update an existing project
* [deleteProject](docs/sdks/projects/README.md#deleteproject) - Delete a project

### [configurations](docs/sdks/configurations/README.md)

* [getConfigurations](docs/sdks/configurations/README.md#getconfigurations) - Retrieve a list of configurations
* [createConfiguration](docs/sdks/configurations/README.md#createconfiguration) - Create a new configuration
* [updateConfiguration](docs/sdks/configurations/README.md#updateconfiguration) - Update an existing configuration
* [deleteConfiguration](docs/sdks/configurations/README.md#deleteconfiguration) - Delete a configuration
<!-- End Available Resources and Operations [operations] -->

<!-- Start Error Handling [errors] -->
## Error Handling

Handling errors in this SDK should largely match your expectations.  All operations return a response object or throw an error.  If Error objects are specified in your OpenAPI Spec, the SDK will throw the appropriate Error type.

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

Example

```typescript
import { HoneyHive } from "honeyhive";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });

    let res;
    try {
        res = await sdk.session.startSession({
            session: {
                project: "Simple RAG Project",
                sessionName: "Playground Session",
                source: "playground",
                sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
                childrenIds: ["7f22137a-6911-4ed3-bc36-110f1dde6b66"],
                config: {
                    key: "<value>",
                },
                inputs: {
                    context: "Hello world",
                    question: "What is in the context?",
                    chat_history: "<value>",
                },
                outputs: {
                    role: "assistant",
                    content: "Hello world",
                },
                error: null,
                duration: 824.8056,
                userProperties: {
                    user: "google-oauth2|111840237613341303366",
                },
                metrics: {},
                feedback: {},
                metadata: {},
                startTime: 1712025501605,
                endTime: 1712025499832,
            },
        });
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
import { HoneyHive } from "honeyhive";

async function run() {
    const sdk = new HoneyHive({
        serverIdx: 0,
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });

    const res = await sdk.session.startSession({
        session: {
            project: "Simple RAG Project",
            sessionName: "Playground Session",
            source: "playground",
            sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
            childrenIds: ["7f22137a-6911-4ed3-bc36-110f1dde6b66"],
            config: {
                key: "<value>",
            },
            inputs: {
                context: "Hello world",
                question: "What is in the context?",
                chat_history: "<value>",
            },
            outputs: {
                role: "assistant",
                content: "Hello world",
            },
            error: null,
            duration: 824.8056,
            userProperties: {
                user: "google-oauth2|111840237613341303366",
            },
            metrics: {},
            feedback: {},
            metadata: {},
            startTime: 1712025501605,
            endTime: 1712025499832,
        },
    });

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```


### Override Server URL Per-Client

The default server can also be overridden globally by passing a URL to the `serverURL: str` optional parameter when initializing the SDK client instance. For example:
```typescript
import { HoneyHive } from "honeyhive";

async function run() {
    const sdk = new HoneyHive({
        serverURL: "https://api.honeyhive.ai",
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });

    const res = await sdk.session.startSession({
        session: {
            project: "Simple RAG Project",
            sessionName: "Playground Session",
            source: "playground",
            sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
            childrenIds: ["7f22137a-6911-4ed3-bc36-110f1dde6b66"],
            config: {
                key: "<value>",
            },
            inputs: {
                context: "Hello world",
                question: "What is in the context?",
                chat_history: "<value>",
            },
            outputs: {
                role: "assistant",
                content: "Hello world",
            },
            error: null,
            duration: 824.8056,
            userProperties: {
                user: "google-oauth2|111840237613341303366",
            },
            metrics: {},
            feedback: {},
            metadata: {},
            startTime: 1712025501605,
            endTime: 1712025499832,
        },
    });

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
import { honeyhive } from "HoneyHive";
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
import { HoneyHive } from "honeyhive";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });

    const res = await sdk.session.startSession({
        session: {
            project: "Simple RAG Project",
            sessionName: "Playground Session",
            source: "playground",
            sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
            childrenIds: ["7f22137a-6911-4ed3-bc36-110f1dde6b66"],
            config: {
                key: "<value>",
            },
            inputs: {
                context: "Hello world",
                question: "What is in the context?",
                chat_history: "<value>",
            },
            outputs: {
                role: "assistant",
                content: "Hello world",
            },
            error: null,
            duration: 824.8056,
            userProperties: {
                user: "google-oauth2|111840237613341303366",
            },
            metrics: {},
            feedback: {},
            metadata: {},
            startTime: 1712025501605,
            endTime: 1712025499832,
        },
    });

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
