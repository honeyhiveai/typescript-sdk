/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Transform, Type } from "class-transformer";

/**
 * Arbitrary JSON object containing the inputs for the datapoint
 */
export class Inputs extends SpeakeasyBase {}

export class History extends SpeakeasyBase {}

export class Datapoint extends SpeakeasyBase {
    /**
     * UUID for the datapoint
     */
    @SpeakeasyMetadata()
    @Expose({ name: "_id" })
    id?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "tenant" })
    tenant?: string;

    /**
     * UUID for the project where the datapoint is stored
     */
    @SpeakeasyMetadata()
    @Expose({ name: "project_id" })
    projectId?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "created_at" })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt?: Date;

    @SpeakeasyMetadata()
    @Expose({ name: "updated_at" })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    updatedAt?: Date;

    /**
     * Arbitrary JSON object containing the inputs for the datapoint
     */
    @SpeakeasyMetadata()
    @Expose({ name: "inputs" })
    @Type(() => Inputs)
    inputs?: Inputs;

    /**
     * Conversation history associated with the datapoint
     */
    @SpeakeasyMetadata({ elemType: History })
    @Expose({ name: "history" })
    @Type(() => History)
    history?: History[];

    @SpeakeasyMetadata()
    @Expose({ name: "ground_truth" })
    groundTruth?: Record<string, any>;

    /**
     * Event id for the event from which the datapoint was created
     */
    @SpeakeasyMetadata()
    @Expose({ name: "linked_event" })
    linkedEvent?: string;

    /**
     * Ids of evaluations where the datapoint is included
     */
    @SpeakeasyMetadata()
    @Expose({ name: "linked_evals" })
    linkedEvals?: string[];

    /**
     * Ids of all datasets that include the datapoint
     */
    @SpeakeasyMetadata()
    @Expose({ name: "linked_datasets" })
    linkedDatasets?: string[];

    @SpeakeasyMetadata()
    @Expose({ name: "saved" })
    saved?: boolean;

    /**
     * session or event - specify the type of data
     */
    @SpeakeasyMetadata()
    @Expose({ name: "type" })
    type?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "metadata" })
    metadata?: Record<string, any>;
}
