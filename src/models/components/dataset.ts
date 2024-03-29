/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Transform } from "class-transformer";

/**
 * What the dataset is to be used for - "evaluation" or "fine-tuning"
 */
export enum DatasetType {
    Evaluation = "evaluation",
    FineTuning = "fine-tuning",
}

export class Dataset extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "created_at" })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt?: Date;

    /**
     * List of unique datapoint ids to be included in this dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "datapoints" })
    datapoints?: string[];

    @SpeakeasyMetadata()
    @Expose({ name: "description" })
    description?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "linked_evals" })
    linkedEvals?: string[];

    @SpeakeasyMetadata()
    @Expose({ name: "name" })
    name?: string;

    /**
     * Number of datapoints included in the dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "num_points" })
    numPoints?: number;

    @SpeakeasyMetadata()
    @Expose({ name: "pipeline_type" })
    pipelineType?: string;

    /**
     * UUID of the project associated with this dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "project" })
    project?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "saved" })
    saved?: boolean;

    /**
     * What the dataset is to be used for - "evaluation" or "fine-tuning"
     */
    @SpeakeasyMetadata()
    @Expose({ name: "type" })
    type?: DatasetType;

    @SpeakeasyMetadata()
    @Expose({ name: "updated_at" })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    updatedAt?: Date;
}
