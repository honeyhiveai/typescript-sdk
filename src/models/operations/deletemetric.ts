/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { remap as remap$ } from "../../lib/primitives.js";
import * as z from "zod";

export type DeleteMetricRequest = {
    metricId: string;
};

/** @internal */
export const DeleteMetricRequest$inboundSchema: z.ZodType<
    DeleteMetricRequest,
    z.ZodTypeDef,
    unknown
> = z
    .object({
        metric_id: z.string(),
    })
    .transform((v) => {
        return remap$(v, {
            metric_id: "metricId",
        });
    });

/** @internal */
export type DeleteMetricRequest$Outbound = {
    metric_id: string;
};

/** @internal */
export const DeleteMetricRequest$outboundSchema: z.ZodType<
    DeleteMetricRequest$Outbound,
    z.ZodTypeDef,
    DeleteMetricRequest
> = z
    .object({
        metricId: z.string(),
    })
    .transform((v) => {
        return remap$(v, {
            metricId: "metric_id",
        });
    });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace DeleteMetricRequest$ {
    /** @deprecated use `DeleteMetricRequest$inboundSchema` instead. */
    export const inboundSchema = DeleteMetricRequest$inboundSchema;
    /** @deprecated use `DeleteMetricRequest$outboundSchema` instead. */
    export const outboundSchema = DeleteMetricRequest$outboundSchema;
    /** @deprecated use `DeleteMetricRequest$Outbound` instead. */
    export type Outbound = DeleteMetricRequest$Outbound;
}
