/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose } from "class-transformer";

/**
 * What the dataset is to be used for - "evaluation" (default) or "fine-tuning"
 */
export enum CreateDatasetRequestType {
    Evaluation = "evaluation",
    FineTuning = "fine-tuning",
}

/**
 * The type of data included in the dataset - "event" (default) or "session"
 */
export enum CreateDatasetRequestPipelineType {
    Event = "event",
    Session = "session",
}

export class CreateDatasetRequest extends SpeakeasyBase {
    /**
     * UUID of the project associated with this dataset like `65e0fc2d6a2eb95f55a92cbc`
     */
    @SpeakeasyMetadata()
    @Expose({ name: "project" })
    project: string;

    /**
     * Name of the dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "name" })
    name: string;

    /**
     * A description for the dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "description" })
    description?: string;

    /**
     * What the dataset is to be used for - "evaluation" (default) or "fine-tuning"
     */
    @SpeakeasyMetadata()
    @Expose({ name: "type" })
    type?: CreateDatasetRequestType;

    /**
     * List of unique datapoint ids to be included in this dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "datapoints" })
    datapoints?: string[];

    /**
     * List of unique evaluation run ids to be associated with this dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "linked_evals" })
    linkedEvals?: string[];

    @SpeakeasyMetadata()
    @Expose({ name: "saved" })
    saved?: boolean;

    /**
     * The type of data included in the dataset - "event" (default) or "session"
     */
    @SpeakeasyMetadata()
    @Expose({ name: "pipeline_type" })
    pipelineType?: CreateDatasetRequestPipelineType;

    /**
     * Any helpful metadata to track for the dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "metadata" })
    metadata?: Record<string, any>;
}
