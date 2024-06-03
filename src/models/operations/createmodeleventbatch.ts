/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import * as components from "../../models/components";
import { AxiosResponse } from "axios";
import { Expose, Type } from "class-transformer";

export class CreateModelEventBatchRequestBody extends SpeakeasyBase {
    @SpeakeasyMetadata({ elemType: components.CreateModelEvent })
    @Expose({ name: "model_events" })
    @Type(() => components.CreateModelEvent)
    modelEvents?: components.CreateModelEvent[];
}

/**
 * Model events created
 */
export class CreateModelEventBatchResponseBody extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "event_ids" })
    eventIds?: string[];

    @SpeakeasyMetadata()
    @Expose({ name: "success" })
    success?: boolean;
}

export class CreateModelEventBatchResponse extends SpeakeasyBase {
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
     * Model events created
     */
    @SpeakeasyMetadata()
    object?: CreateModelEventBatchResponseBody;
}
