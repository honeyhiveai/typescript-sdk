/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type UpdateToolRequest = {
    id: string;
    name: string;
    description?: string | undefined;
    parameters: { [k: string]: any };
};

/** @internal */
export const UpdateToolRequest$inboundSchema: z.ZodType<UpdateToolRequest, z.ZodTypeDef, unknown> =
    z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        parameters: z.record(z.any()),
    });

/** @internal */
export type UpdateToolRequest$Outbound = {
    id: string;
    name: string;
    description?: string | undefined;
    parameters: { [k: string]: any };
};

/** @internal */
export const UpdateToolRequest$outboundSchema: z.ZodType<
    UpdateToolRequest$Outbound,
    z.ZodTypeDef,
    UpdateToolRequest
> = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    parameters: z.record(z.any()),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace UpdateToolRequest$ {
    /** @deprecated use `UpdateToolRequest$inboundSchema` instead. */
    export const inboundSchema = UpdateToolRequest$inboundSchema;
    /** @deprecated use `UpdateToolRequest$outboundSchema` instead. */
    export const outboundSchema = UpdateToolRequest$outboundSchema;
    /** @deprecated use `UpdateToolRequest$Outbound` instead. */
    export type Outbound = UpdateToolRequest$Outbound;
}
