/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { remap as remap$ } from "../../lib/primitives.js";
import * as z from "zod";

export type GetMetricsRequest = {
    /**
     * Project name associated with metrics
     */
    projectName: string;
};

/** @internal */
export const GetMetricsRequest$inboundSchema: z.ZodType<GetMetricsRequest, z.ZodTypeDef, unknown> =
    z
        .object({
            project_name: z.string(),
        })
        .transform((v) => {
            return remap$(v, {
                project_name: "projectName",
            });
        });

/** @internal */
export type GetMetricsRequest$Outbound = {
    project_name: string;
};

/** @internal */
export const GetMetricsRequest$outboundSchema: z.ZodType<
    GetMetricsRequest$Outbound,
    z.ZodTypeDef,
    GetMetricsRequest
> = z
    .object({
        projectName: z.string(),
    })
    .transform((v) => {
        return remap$(v, {
            projectName: "project_name",
        });
    });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GetMetricsRequest$ {
    /** @deprecated use `GetMetricsRequest$inboundSchema` instead. */
    export const inboundSchema = GetMetricsRequest$inboundSchema;
    /** @deprecated use `GetMetricsRequest$outboundSchema` instead. */
    export const outboundSchema = GetMetricsRequest$outboundSchema;
    /** @deprecated use `GetMetricsRequest$Outbound` instead. */
    export type Outbound = GetMetricsRequest$Outbound;
}
