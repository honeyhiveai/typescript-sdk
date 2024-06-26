/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose } from "class-transformer";

export enum PostConfigurationRequestEnv {
    Dev = "dev",
    Staging = "staging",
    Prod = "prod",
}

export class PostConfigurationRequest extends SpeakeasyBase {
    /**
     * Name of the project to which this configuration belongs
     */
    @SpeakeasyMetadata()
    @Expose({ name: "project" })
    project: string;

    /**
     * Name of the configuration
     */
    @SpeakeasyMetadata()
    @Expose({ name: "name" })
    name: string;

    /**
     * Name of the provider - "openai", "anthropic", etc.
     */
    @SpeakeasyMetadata()
    @Expose({ name: "provider" })
    provider: string;

    @SpeakeasyMetadata()
    @Expose({ name: "parameters" })
    parameters: Record<string, any>;

    /**
     * List of environments where the configuration is active
     */
    @SpeakeasyMetadata()
    @Expose({ name: "env" })
    env?: PostConfigurationRequestEnv[];

    /**
     * Details of user who created the configuration
     */
    @SpeakeasyMetadata()
    @Expose({ name: "user_properties" })
    userProperties?: Record<string, any>;
}
