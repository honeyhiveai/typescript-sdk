/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type UpdateRunResponse = {
  /**
   * Database update success message
   */
  evaluation?: { [k: string]: any } | undefined;
  /**
   * A warning message if the logged events don't have an associated datapoint id on the event metadata
   */
  warning?: string | null | undefined;
};

/** @internal */
export const UpdateRunResponse$inboundSchema: z.ZodType<
  UpdateRunResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  evaluation: z.record(z.any()).optional(),
  warning: z.nullable(z.string()).optional(),
});

/** @internal */
export type UpdateRunResponse$Outbound = {
  evaluation?: { [k: string]: any } | undefined;
  warning?: string | null | undefined;
};

/** @internal */
export const UpdateRunResponse$outboundSchema: z.ZodType<
  UpdateRunResponse$Outbound,
  z.ZodTypeDef,
  UpdateRunResponse
> = z.object({
  evaluation: z.record(z.any()).optional(),
  warning: z.nullable(z.string()).optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace UpdateRunResponse$ {
  /** @deprecated use `UpdateRunResponse$inboundSchema` instead. */
  export const inboundSchema = UpdateRunResponse$inboundSchema;
  /** @deprecated use `UpdateRunResponse$outboundSchema` instead. */
  export const outboundSchema = UpdateRunResponse$outboundSchema;
  /** @deprecated use `UpdateRunResponse$Outbound` instead. */
  export type Outbound = UpdateRunResponse$Outbound;
}
