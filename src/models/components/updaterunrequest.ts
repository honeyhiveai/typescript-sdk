/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose } from "class-transformer";

export enum UpdateRunRequestStatus {
    Pending = "pending",
    Completed = "completed",
}

export class UpdateRunRequest extends SpeakeasyBase {
    /**
     * Additional sessions/events to associate with this run
     */
    @SpeakeasyMetadata()
    @Expose({ name: "event_ids" })
    eventIds?: string[];

    /**
     * The UUID of the dataset this run is associated with
     */
    @SpeakeasyMetadata()
    @Expose({ name: "dataset_id" })
    datasetId?: string;

    /**
     * Additional datapoints to associate with this run
     */
    @SpeakeasyMetadata()
    @Expose({ name: "datapoint_ids" })
    datapointIds?: string[];

    /**
     * The configuration being used for this run
     */
    @SpeakeasyMetadata()
    @Expose({ name: "configuration" })
    configuration?: Record<string, any>;

    /**
     * Additional metadata for the run
     */
    @SpeakeasyMetadata()
    @Expose({ name: "metadata" })
    metadata?: Record<string, any>;

    /**
     * The name of the run to be displayed
     */
    @SpeakeasyMetadata()
    @Expose({ name: "name" })
    name?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "status" })
    status?: UpdateRunRequestStatus;
}
