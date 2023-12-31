/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Type } from "class-transformer";

export class MetricUpdateRequestThreshold extends SpeakeasyBase {}

export class MetricUpdateRequest extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "metric_id" })
    metricId?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "name" })
    name?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "description" })
    description?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "code_snippet" })
    codeSnippet?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "enabled_in_prod" })
    enabledInProd?: boolean;

    @SpeakeasyMetadata()
    @Expose({ name: "needs_ground_truth" })
    needsGroundTruth?: boolean;

    @SpeakeasyMetadata()
    @Expose({ name: "return_type" })
    returnType?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "threshold" })
    @Type(() => MetricUpdateRequestThreshold)
    threshold?: MetricUpdateRequestThreshold;

    @SpeakeasyMetadata()
    @Expose({ name: "pass_when" })
    passWhen?: boolean;

    @SpeakeasyMetadata()
    @Expose({ name: "prompt" })
    prompt?: string;

    @SpeakeasyMetadata()
    @Expose({ name: "criteria" })
    criteria?: string;
}
