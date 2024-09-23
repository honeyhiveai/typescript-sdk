/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import * as components from "../components/index.js";

export type UpdateDatapointRequest = {
  /**
   * ID of datapoint to update
   */
  id: string;
  updateDatapointRequest: components.UpdateDatapointRequest;
};

/** @internal */
export const UpdateDatapointRequest$inboundSchema: z.ZodType<
  UpdateDatapointRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string(),
  UpdateDatapointRequest: components.UpdateDatapointRequest$inboundSchema,
}).transform((v) => {
  return remap$(v, {
    "UpdateDatapointRequest": "updateDatapointRequest",
  });
});

/** @internal */
export type UpdateDatapointRequest$Outbound = {
  id: string;
  UpdateDatapointRequest: components.UpdateDatapointRequest$Outbound;
};

/** @internal */
export const UpdateDatapointRequest$outboundSchema: z.ZodType<
  UpdateDatapointRequest$Outbound,
  z.ZodTypeDef,
  UpdateDatapointRequest
> = z.object({
  id: z.string(),
  updateDatapointRequest: components.UpdateDatapointRequest$outboundSchema,
}).transform((v) => {
  return remap$(v, {
    updateDatapointRequest: "UpdateDatapointRequest",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace UpdateDatapointRequest$ {
  /** @deprecated use `UpdateDatapointRequest$inboundSchema` instead. */
  export const inboundSchema = UpdateDatapointRequest$inboundSchema;
  /** @deprecated use `UpdateDatapointRequest$outboundSchema` instead. */
  export const outboundSchema = UpdateDatapointRequest$outboundSchema;
  /** @deprecated use `UpdateDatapointRequest$Outbound` instead. */
  export type Outbound = UpdateDatapointRequest$Outbound;
}
