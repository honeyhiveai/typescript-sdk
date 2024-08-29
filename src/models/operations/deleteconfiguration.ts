/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type DeleteConfigurationRequest = {
    /**
     * Configuration ID like `6638187d505c6812e4043f24`
     */
    id: string;
};

/** @internal */
export const DeleteConfigurationRequest$inboundSchema: z.ZodType<
    DeleteConfigurationRequest,
    z.ZodTypeDef,
    unknown
> = z.object({
    id: z.string(),
});

/** @internal */
export type DeleteConfigurationRequest$Outbound = {
    id: string;
};

/** @internal */
export const DeleteConfigurationRequest$outboundSchema: z.ZodType<
    DeleteConfigurationRequest$Outbound,
    z.ZodTypeDef,
    DeleteConfigurationRequest
> = z.object({
    id: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace DeleteConfigurationRequest$ {
    /** @deprecated use `DeleteConfigurationRequest$inboundSchema` instead. */
    export const inboundSchema = DeleteConfigurationRequest$inboundSchema;
    /** @deprecated use `DeleteConfigurationRequest$outboundSchema` instead. */
    export const outboundSchema = DeleteConfigurationRequest$outboundSchema;
    /** @deprecated use `DeleteConfigurationRequest$Outbound` instead. */
    export type Outbound = DeleteConfigurationRequest$Outbound;
}
