/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Type } from "class-transformer";

/**
 * Associated configuration JSON for the event - model name, vector index name, etc
 */
export class Config extends SpeakeasyBase {}

/**
 * Specify whether the event is of "model", "tool" or "chain" type
 */
export enum EventType {
    Model = "model",
    Tool = "tool",
    Chain = "chain",
}

/**
 * Any user feedback provided for the event output
 */
export class Feedback extends SpeakeasyBase {}

/**
 * Input JSON given to the event - prompt, chunks, etc
 */
export class CreateEventRequestInputs extends SpeakeasyBase {}

/**
 * Any system or application metadata associated with the event
 */
export class CreateEventRequestMetadata extends SpeakeasyBase {}

/**
 * Any values computed over the output of the event
 */
export class Metrics extends SpeakeasyBase {}

/**
 * Final output JSON of the event
 */
export class Outputs extends SpeakeasyBase {}

/**
 * Any user properties associated with the event
 */
export class CreateEventRequestUserProperties extends SpeakeasyBase {}

export class CreateEventRequest extends SpeakeasyBase {
    /**
     * Id of events that are nested within the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "children_ids" })
    childrenIds?: string[];

    /**
     * Associated configuration JSON for the event - model name, vector index name, etc
     */
    @SpeakeasyMetadata()
    @Expose({ name: "config" })
    @Type(() => Config)
    config?: Config;

    /**
     * How long the event took in milliseconds
     */
    @SpeakeasyMetadata()
    @Expose({ name: "duration" })
    duration?: number;

    /**
     * UTC timestamp (in milliseconds) for the event end
     */
    @SpeakeasyMetadata()
    @Expose({ name: "end_time" })
    endTime?: number;

    /**
     * Any error description if event failed
     */
    @SpeakeasyMetadata()
    @Expose({ name: "error" })
    error?: string;

    /**
     * Name of the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "event_name" })
    eventName: string;

    /**
     * Specify whether the event is of "model", "tool" or "chain" type
     */
    @SpeakeasyMetadata()
    @Expose({ name: "event_type" })
    eventType: EventType;

    /**
     * Any user feedback provided for the event output
     */
    @SpeakeasyMetadata()
    @Expose({ name: "feedback" })
    @Type(() => Feedback)
    feedback?: Feedback;

    /**
     * Input JSON given to the event - prompt, chunks, etc
     */
    @SpeakeasyMetadata()
    @Expose({ name: "inputs" })
    @Type(() => CreateEventRequestInputs)
    inputs?: CreateEventRequestInputs;

    /**
     * Any system or application metadata associated with the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "metadata" })
    @Type(() => CreateEventRequestMetadata)
    metadata?: CreateEventRequestMetadata;

    /**
     * Any values computed over the output of the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "metrics" })
    @Type(() => Metrics)
    metrics?: Metrics;

    /**
     * Final output JSON of the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "outputs" })
    @Type(() => Outputs)
    outputs?: Outputs;

    /**
     * Id of the parent event if nested
     */
    @SpeakeasyMetadata()
    @Expose({ name: "parent_id" })
    parentId?: string;

    /**
     * Project associated with the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "project" })
    project: string;

    /**
     * Source of the event - production, staging, etc
     */
    @SpeakeasyMetadata()
    @Expose({ name: "source" })
    source: string;

    /**
     * UTC timestamp (in milliseconds) for the event start
     */
    @SpeakeasyMetadata()
    @Expose({ name: "start_time" })
    startTime?: number;

    /**
     * Any user properties associated with the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "user_properties" })
    @Type(() => CreateEventRequestUserProperties)
    userProperties?: CreateEventRequestUserProperties;
}