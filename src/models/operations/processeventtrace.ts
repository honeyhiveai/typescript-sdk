/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { AxiosResponse } from "axios";
import { Expose } from "class-transformer";

export class ProcessEventTraceRequestBody extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "logs" })
    logs?: Record<string, any>[];
}

export class ProcessEventTraceRequest extends SpeakeasyBase {
    /**
     * The ID of the session to which this event trace belongs
     */
    @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=session_id" })
    sessionId: string;

    @SpeakeasyMetadata({ data: "request, media_type=application/json" })
    requestBody: ProcessEventTraceRequestBody;
}

/**
 * Successfully processed the event traces
 */
export class ProcessEventTraceResponseBody extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "result" })
    result?: string;
}

export class ProcessEventTraceResponse extends SpeakeasyBase {
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
     * Successfully processed the event traces
     */
    @SpeakeasyMetadata()
    object?: ProcessEventTraceResponseBody;
}
