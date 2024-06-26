/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose } from "class-transformer";

export enum Env {
    Dev = "dev",
    Staging = "staging",
    Prod = "prod",
}

/**
 * Type of the configuration - "LLM" or "pipeline" - "LLM" by default
 */
export enum ConfigurationType {
    Llm = "LLM",
    Pipeline = "pipeline",
}

export class Configuration extends SpeakeasyBase {
    /**
     * ID of the configuration
     */
    @SpeakeasyMetadata()
    @Expose({ name: "_id" })
    id?: string;

    /**
     * ID of the project to which this configuration belongs
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
     * List of environments where the configuration is active
     */
    @SpeakeasyMetadata()
    @Expose({ name: "env" })
    env?: Env[];

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
     * Type of the configuration - "LLM" or "pipeline" - "LLM" by default
     */
    @SpeakeasyMetadata()
    @Expose({ name: "type" })
    type?: ConfigurationType;

    /**
     * Details of user who created the configuration
     */
    @SpeakeasyMetadata()
    @Expose({ name: "user_properties" })
    userProperties?: Record<string, any>;
}
