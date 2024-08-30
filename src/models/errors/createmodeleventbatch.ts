/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { remap as remap$ } from "../../lib/primitives.js";
import * as z from "zod";

/**
 * Model events partially created
 */
export type CreateModelEventBatchResponseBodyData = {
    eventIds?: Array<string> | undefined;
    errors?: Array<string> | undefined;
    success?: boolean | undefined;
};

/**
 * Model events partially created
 */
export class CreateModelEventBatchResponseBody extends Error {
    eventIds?: Array<string> | undefined;
    errors?: Array<string> | undefined;
    success?: boolean | undefined;

    /** The original data that was passed to this error instance. */
    data$: CreateModelEventBatchResponseBodyData;

    constructor(err: CreateModelEventBatchResponseBodyData) {
        const message =
            "message" in err && typeof err.message === "string"
                ? err.message
                : `API error occurred: ${JSON.stringify(err)}`;
        super(message);
        this.data$ = err;

        if (err.eventIds != null) {
            this.eventIds = err.eventIds;
        }
        if (err.errors != null) {
            this.errors = err.errors;
        }
        if (err.success != null) {
            this.success = err.success;
        }

        this.name = "CreateModelEventBatchResponseBody";
    }
}

/** @internal */
export const CreateModelEventBatchResponseBody$inboundSchema: z.ZodType<
    CreateModelEventBatchResponseBody,
    z.ZodTypeDef,
    unknown
> = z
    .object({
        event_ids: z.array(z.string()).optional(),
        errors: z.array(z.string()).optional(),
        success: z.boolean().optional(),
    })
    .transform((v) => {
        const remapped = remap$(v, {
            event_ids: "eventIds",
        });

        return new CreateModelEventBatchResponseBody(remapped);
    });

/** @internal */
export type CreateModelEventBatchResponseBody$Outbound = {
    event_ids?: Array<string> | undefined;
    errors?: Array<string> | undefined;
    success?: boolean | undefined;
};

/** @internal */
export const CreateModelEventBatchResponseBody$outboundSchema: z.ZodType<
    CreateModelEventBatchResponseBody$Outbound,
    z.ZodTypeDef,
    CreateModelEventBatchResponseBody
> = z
    .instanceof(CreateModelEventBatchResponseBody)
    .transform((v) => v.data$)
    .pipe(
        z
            .object({
                eventIds: z.array(z.string()).optional(),
                errors: z.array(z.string()).optional(),
                success: z.boolean().optional(),
            })
            .transform((v) => {
                return remap$(v, {
                    eventIds: "event_ids",
                });
            })
    );

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateModelEventBatchResponseBody$ {
    /** @deprecated use `CreateModelEventBatchResponseBody$inboundSchema` instead. */
    export const inboundSchema = CreateModelEventBatchResponseBody$inboundSchema;
    /** @deprecated use `CreateModelEventBatchResponseBody$outboundSchema` instead. */
    export const outboundSchema = CreateModelEventBatchResponseBody$outboundSchema;
    /** @deprecated use `CreateModelEventBatchResponseBody$Outbound` instead. */
    export type Outbound = CreateModelEventBatchResponseBody$Outbound;
}
