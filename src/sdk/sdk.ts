/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import * as utils from "../internal/utils";
import * as components from "../models/components";
import { Configurations } from "./configurations";
import { Datapoints } from "./datapoints";
import { Datasets } from "./datasets";
import { Events } from "./events";
import { Metrics } from "./metrics";
import { Projects } from "./projects";
import { Session } from "./session";
import { Tools } from "./tools";
import axios from "axios";
import { AxiosInstance } from "axios";

/**
 * Contains the list of servers available to the SDK
 */
export const ServerList = ["https://api.honeyhive.ai"] as const;

/**
 * The available configuration options for the SDK
 */
export type SDKProps = {
    bearerAuth?: string;

    /**
     * Allows overriding the default axios client used by the SDK
     */
    defaultClient?: AxiosInstance;

    /**
     * Allows overriding the default server used by the SDK
     */
    serverIdx?: number;

    /**
     * Allows overriding the default server URL used by the SDK
     */
    serverURL?: string;
    /**
     * Allows overriding the default retry config used by the SDK
     */
    retryConfig?: utils.RetryConfig;
};

export class SDKConfiguration {
    defaultClient: AxiosInstance;
    security?: components.Security | (() => Promise<components.Security>);
    serverURL: string;
    serverDefaults: any;
    language = "typescript";
    openapiDocVersion = "1.0.1";
    sdkVersion = "0.4.4";
    genVersion = "2.332.4";
    userAgent = "speakeasy-sdk/typescript 0.4.4 2.332.4 1.0.1 honeyhive";
    retryConfig?: utils.RetryConfig;
    public constructor(init?: Partial<SDKConfiguration>) {
        Object.assign(this, init);
    }
}

export class HoneyHive {
    public session: Session;
    public events: Events;
    public metrics: Metrics;
    public tools: Tools;
    public datapoints: Datapoints;
    public datasets: Datasets;
    public projects: Projects;
    public configurations: Configurations;

    private sdkConfiguration: SDKConfiguration;

    constructor(props?: SDKProps) {
        let serverURL = props?.serverURL;

        if (!serverURL) {
            const serverIdx = props?.serverIdx ?? 0;
            if (serverIdx < 0 || serverIdx >= ServerList.length) {
                throw new Error(`Invalid server index ${serverIdx}`);
            }
            serverURL = ServerList[serverIdx];
        }

        const defaultClient = props?.defaultClient ?? axios.create();
        this.sdkConfiguration = new SDKConfiguration({
            defaultClient: defaultClient,
            security: new components.Security({ bearerAuth: props?.bearerAuth }),

            serverURL: serverURL,
            retryConfig: props?.retryConfig,
        });

        this.session = new Session(this.sdkConfiguration);
        this.events = new Events(this.sdkConfiguration);
        this.metrics = new Metrics(this.sdkConfiguration);
        this.tools = new Tools(this.sdkConfiguration);
        this.datapoints = new Datapoints(this.sdkConfiguration);
        this.datasets = new Datasets(this.sdkConfiguration);
        this.projects = new Projects(this.sdkConfiguration);
        this.configurations = new Configurations(this.sdkConfiguration);
    }
}
