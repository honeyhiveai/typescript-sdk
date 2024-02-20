/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Type } from "class-transformer";

export class UpdateDatapointRequestInputs extends SpeakeasyBase {}

export class UpdateDatapointRequestHistory extends SpeakeasyBase {}

export class UpdateDatapointRequestMetadata extends SpeakeasyBase {}

export class UpdateDatapointRequest extends SpeakeasyBase {
    /**
     * The ID of the datapoint to update
     */
    @SpeakeasyMetadata()
    @Expose({ name: "datapoint_id" })
    datapointId?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "inputs" })
    @Type(() => UpdateDatapointRequestInputs)
    inputs?: UpdateDatapointRequestInputs;

    @SpeakeasyMetadata({ elemType: UpdateDatapointRequestHistory })
    @Expose({ name: "history" })
    @Type(() => UpdateDatapointRequestHistory)
    history?: UpdateDatapointRequestHistory[];

    @SpeakeasyMetadata()
    @Expose({ name: "ground_truth" })
    groundTruth?: Record<string, any>;

    @SpeakeasyMetadata()
    @Expose({ name: "linked_evals" })
    linkedEvals?: string[];

    @SpeakeasyMetadata()
    @Expose({ name: "linked_datasets" })
    linkedDatasets?: string[];

    @SpeakeasyMetadata()
    @Expose({ name: "saved" })
    saved?: boolean;

    @SpeakeasyMetadata()
    @Expose({ name: "type" })
    type?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "metadata" })
    @Type(() => UpdateDatapointRequestMetadata)
    metadata?: UpdateDatapointRequestMetadata;
}