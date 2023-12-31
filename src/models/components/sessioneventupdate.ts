/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Type } from "class-transformer";

/**
 * Updated outputs for the event
 */
export class Output extends SpeakeasyBase {}

/**
 * Updated inputs for the event
 */
export class Inputs extends SpeakeasyBase {}

/**
 * Updated user properties for the event
 */
export class UserProperties extends SpeakeasyBase {}

/**
 * Updated feedback for the event
 */
export class Feedback extends SpeakeasyBase {}

/**
 * Updated metadata for the event
 */
export class SessionEventUpdateMetadata extends SpeakeasyBase {}

export class SessionEventUpdate extends SpeakeasyBase {
    /**
     * Updated outputs for the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "output" })
    @Type(() => Output)
    output: Output;

    /**
     * Updated error for the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "error" })
    error: string;

    /**
     * Updated inputs for the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "inputs" })
    @Type(() => Inputs)
    inputs?: Inputs;

    /**
     * Updated user properties for the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "user_properties" })
    @Type(() => UserProperties)
    userProperties?: UserProperties;

    /**
     * Updated feedback for the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "feedback" })
    @Type(() => Feedback)
    feedback?: Feedback;

    /**
     * Updated metadata for the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "metadata" })
    @Type(() => SessionEventUpdateMetadata)
    metadata?: SessionEventUpdateMetadata;

    /**
     * Updated duration for the event
     */
    @SpeakeasyMetadata()
    @Expose({ name: "duration" })
    duration?: number;
}
