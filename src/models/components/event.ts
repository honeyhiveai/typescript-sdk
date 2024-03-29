/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Type } from "class-transformer";

/**
 * Associated configuration for the event - model, provider, etc
 */
export class EventConfig extends SpeakeasyBase {}

/**
 * Specify whether the event is of "model", "tool", "session" or "chain" type
 */
export enum EventEventType {
    Model = "model",
    Tool = "tool",
    Chain = "chain",
    Session = "session",
}

/**
 * Any user feedback provided for the event output
 */
export class EventFeedback extends SpeakeasyBase {}

/**
 * Input object passed to the event - user query, text blob, etc
 */
export class EventInputs extends SpeakeasyBase {}

/**
 * Any system or application metadata associated with the event
 */
export class EventMetadata extends SpeakeasyBase {}

/**
 * Any values computed over the output of the event
 */
export class EventMetrics extends SpeakeasyBase {}

/**
 * Final output of the event - completion, chunks, etc
 */
export class EventOutputs extends SpeakeasyBase {}

/**
 * Any user properties associated with the event
 */
export class EventUserProperties extends SpeakeasyBase {}

export class Event extends SpeakeasyBase {
    /**
     * Id of events that are nested within the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "children_ids" })
    childrenIds?: string[];

    /**
     * Associated configuration for the event - model, provider, etc
     */
    @SpeakeasyMetadata()
    @Expose({ name: "config" })
    @Type(() => EventConfig)
    config?: EventConfig;

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
     * Any error description if the event failed
     */
    @SpeakeasyMetadata()
    @Expose({ name: "error" })
    error?: string;

    /**
     * Unique id of the event, if not set, it will be auto-generated
     */
    @SpeakeasyMetadata()
    @Expose({ name: "event_id" })
    eventId?: string;

    /**
     * Name of the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "event_name" })
    eventName?: string;

    /**
     * Specify whether the event is of "model", "tool", "session" or "chain" type
     */
    @SpeakeasyMetadata()
    @Expose({ name: "event_type" })
    eventType?: EventEventType;

    /**
     * Any user feedback provided for the event output
     */
    @SpeakeasyMetadata()
    @Expose({ name: "feedback" })
    @Type(() => EventFeedback)
    feedback?: EventFeedback;

    /**
     * Input object passed to the event - user query, text blob, etc
     */
    @SpeakeasyMetadata()
    @Expose({ name: "inputs" })
    @Type(() => EventInputs)
    inputs?: EventInputs;

    /**
     * Any system or application metadata associated with the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "metadata" })
    @Type(() => EventMetadata)
    metadata?: EventMetadata;

    /**
     * Any values computed over the output of the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "metrics" })
    @Type(() => EventMetrics)
    metrics?: EventMetrics;

    /**
     * Final output of the event - completion, chunks, etc
     */
    @SpeakeasyMetadata()
    @Expose({ name: "outputs" })
    @Type(() => EventOutputs)
    outputs?: EventOutputs;

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
    project?: string;

    /**
     * Unique id of the session associated with the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "session_id" })
    sessionId?: string;

    /**
     * Source of the event - production, staging, etc
     */
    @SpeakeasyMetadata()
    @Expose({ name: "source" })
    source?: string;

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
    @Type(() => EventUserProperties)
    userProperties?: EventUserProperties;
}
