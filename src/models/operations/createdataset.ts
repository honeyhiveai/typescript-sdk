/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { AxiosResponse } from "axios";
import { Expose, Type } from "class-transformer";

export class CreateDatasetResult extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "insertedId" })
    insertedId?: string;
}

/**
 * Successful creation
 */
export class CreateDatasetResponseBody extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "inserted" })
    inserted?: boolean;

    @SpeakeasyMetadata()
    @Expose({ name: "result" })
    @Type(() => CreateDatasetResult)
    result?: CreateDatasetResult;
}

export class CreateDatasetResponse extends SpeakeasyBase {
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
     * Successful creation
     */
    @SpeakeasyMetadata()
    object?: CreateDatasetResponseBody;
}