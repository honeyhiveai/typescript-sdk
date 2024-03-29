/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { AxiosResponse } from "axios";
import { Expose, Type } from "class-transformer";

export class PostDatasetsResult extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "insertedId" })
    insertedId?: string;
}

/**
 * Successful creation
 */
export class PostDatasetsResponseBody extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "inserted" })
    inserted?: boolean;

    @SpeakeasyMetadata()
    @Expose({ name: "result" })
    @Type(() => PostDatasetsResult)
    result?: PostDatasetsResult;
}

export class PostDatasetsResponse extends SpeakeasyBase {
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
    object?: PostDatasetsResponseBody;
}
