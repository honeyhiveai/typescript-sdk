/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose } from "class-transformer";

export class DatasetUpdate extends SpeakeasyBase {
    /**
     * The unique identifier of the dataset being updated
     */
    @SpeakeasyMetadata()
    @Expose({ name: "dataset_id" })
    datasetId: string;

    /**
     * Updated name for the dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "name" })
    name?: string;

    /**
     * Updated description for the dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "description" })
    description?: string;

    /**
     * Updated list of datapoint ids for the dataset - note the full list is needed
     */
    @SpeakeasyMetadata()
    @Expose({ name: "datapoints" })
    datapoints?: string[];

    /**
     * Updated list of unique evaluation run ids to be associated with this dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "linked_evals" })
    linkedEvals?: string[];

    /**
     * Updated metadata to track for the dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "metadata" })
    metadata?: Record<string, any>;
}
