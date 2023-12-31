/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Transform } from "class-transformer";

/**
 * The response object for providing feedback
 */
export class FeedbackResponse extends SpeakeasyBase {
    /**
     * The task for which the feedback was submitted
     */
    @SpeakeasyMetadata()
    @Expose({ name: "task" })
    task?: string;

    /**
     * The ID of the generation for which feedback was submitted
     */
    @SpeakeasyMetadata()
    @Expose({ name: "generation_id" })
    generationId?: string;

    /**
     * The feedback JSON with one or many feedback items
     */
    @SpeakeasyMetadata()
    @Expose({ name: "feedback" })
    feedback?: Record<string, any>;

    /**
     * The ground truth for the generation
     */
    @SpeakeasyMetadata()
    @Expose({ name: "ground_truth" })
    groundTruth?: string;

    /**
     * The timestamp of when the feedback was created
     */
    @SpeakeasyMetadata()
    @Expose({ name: "created_at" })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt?: Date;
}
