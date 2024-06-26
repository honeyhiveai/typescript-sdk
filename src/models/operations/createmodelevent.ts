/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import * as components from "../../models/components";
import { AxiosResponse } from "axios";
import { Expose, Type } from "class-transformer";

export class CreateModelEventRequestBody extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "model_event" })
    @Type(() => components.CreateModelEvent)
    modelEvent?: components.CreateModelEvent;
}

/**
 * Model event created
 */
export class CreateModelEventResponseBody extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "event_id" })
    eventId?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "success" })
    success?: boolean;
}

export class CreateModelEventResponse extends SpeakeasyBase {
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
     * Model event created
     */
    @SpeakeasyMetadata()
    object?: CreateModelEventResponseBody;
}
