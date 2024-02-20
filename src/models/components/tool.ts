/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Type } from "class-transformer";

export class ToolParameters extends SpeakeasyBase {}

export class Tool extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "_id" })
    id?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "task" })
    task: string;

    @SpeakeasyMetadata()
    @Expose({ name: "name" })
    name: string;

    @SpeakeasyMetadata()
    @Expose({ name: "description" })
    description: string;

    @SpeakeasyMetadata()
    @Expose({ name: "parameters" })
    @Type(() => ToolParameters)
    parameters: ToolParameters;

    @SpeakeasyMetadata()
    @Expose({ name: "type" })
    type: string;
}