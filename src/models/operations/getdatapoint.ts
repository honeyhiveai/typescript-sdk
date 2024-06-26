/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import * as components from "../../models/components";
import { AxiosResponse } from "axios";
import { Expose, Type } from "class-transformer";

export class GetDatapointRequest extends SpeakeasyBase {
    /**
     * Datapoint ID like `65c13dbbd65fb876b7886cdb`
     */
    @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=id" })
    id: string;
}

/**
 * Successful response
 */
export class GetDatapointResponseBody extends SpeakeasyBase {
    @SpeakeasyMetadata({ elemType: components.Datapoint })
    @Expose({ name: "datapoint" })
    @Type(() => components.Datapoint)
    datapoint?: components.Datapoint[];
}

export class GetDatapointResponse extends SpeakeasyBase {
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
     * Successful response
     */
    @SpeakeasyMetadata()
    object?: GetDatapointResponseBody;
}
