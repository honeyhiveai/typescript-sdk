/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { AxiosResponse } from "axios";
import { Expose, Type } from "class-transformer";

/**
 * Mapping of keys in the data object to be used as inputs, ground truth, and history, everything else goes into metadata
 */
export class Mapping extends SpeakeasyBase {
    /**
     * List of keys in the data object to be used as inputs
     */
    @SpeakeasyMetadata()
    @Expose({ name: "inputs" })
    inputs: string[];

    /**
     * List of keys in the data object to be used as ground truth
     */
    @SpeakeasyMetadata()
    @Expose({ name: "ground_truth" })
    groundTruth: string[];

    /**
     * List of keys in the data object to be used as chat history, can be empty list if not needed
     */
    @SpeakeasyMetadata()
    @Expose({ name: "history" })
    history: string[];
}

export class AddDatapointsRequestBody extends SpeakeasyBase {
    /**
     * Name of the project associated with this dataset like `New Project`
     */
    @SpeakeasyMetadata()
    @Expose({ name: "project" })
    project?: string;

    /**
     * List of JSON objects to be added as datapoints
     */
    @SpeakeasyMetadata()
    @Expose({ name: "data" })
    data?: Record<string, any>[];

    /**
     * Mapping of keys in the data object to be used as inputs, ground truth, and history, everything else goes into metadata
     */
    @SpeakeasyMetadata()
    @Expose({ name: "mapping" })
    @Type(() => Mapping)
    mapping?: Mapping;
}

export class AddDatapointsRequest extends SpeakeasyBase {
    /**
     * The unique identifier of the dataset to add datapoints to like  `663876ec4611c47f4970f0c3`
     */
    @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=dataset_id" })
    datasetId: string;

    @SpeakeasyMetadata({ data: "request, media_type=application/json" })
    requestBody: AddDatapointsRequestBody;
}

/**
 * Successful addition
 */
export class AddDatapointsResponseBody extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "inserted" })
    inserted?: boolean;

    /**
     * List of unique datapoint ids added to the dataset
     */
    @SpeakeasyMetadata()
    @Expose({ name: "datapoint_ids" })
    datapointIds?: string[];
}

export class AddDatapointsResponse extends SpeakeasyBase {
    /**
     * HTTP response content type for this operation
     */
    @SpeakeasyMetadata()
    contentType: string;

    /**
     * HTTP response status code for this operation
     */
    @SpeakeasyMetadata()
    statusCode: number;

    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    @SpeakeasyMetadata()
    rawResponse: AxiosResponse;

    /**
     * Successful addition
     */
    @SpeakeasyMetadata()
    object?: AddDatapointsResponseBody;
}
