/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose } from "class-transformer";

export class UpdateRunResponse extends SpeakeasyBase {
    /**
     * Database update success message
     */
    @SpeakeasyMetadata()
    @Expose({ name: "evaluation" })
    evaluation?: Record<string, any>;

    /**
     * A warning message if the logged events don't have an associated datapoint id on the event metadata
     */
    @SpeakeasyMetadata()
    @Expose({ name: "warning" })
    warning?: string;
}
