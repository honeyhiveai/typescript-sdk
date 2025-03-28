/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import * as components from "../components/index.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type UpdateConfigurationRequest = {
  /**
   * Configuration ID like `6638187d505c6812e4043f24`
   */
  id: string;
  putConfigurationRequest: components.PutConfigurationRequest;
};

/** @internal */
export const UpdateConfigurationRequest$inboundSchema: z.ZodType<
  UpdateConfigurationRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string(),
  PutConfigurationRequest: components.PutConfigurationRequest$inboundSchema,
}).transform((v) => {
  return remap$(v, {
    "PutConfigurationRequest": "putConfigurationRequest",
  });
});

/** @internal */
export type UpdateConfigurationRequest$Outbound = {
  id: string;
  PutConfigurationRequest: components.PutConfigurationRequest$Outbound;
};

/** @internal */
export const UpdateConfigurationRequest$outboundSchema: z.ZodType<
  UpdateConfigurationRequest$Outbound,
  z.ZodTypeDef,
  UpdateConfigurationRequest
> = z.object({
  id: z.string(),
  putConfigurationRequest: components.PutConfigurationRequest$outboundSchema,
}).transform((v) => {
  return remap$(v, {
    putConfigurationRequest: "PutConfigurationRequest",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace UpdateConfigurationRequest$ {
  /** @deprecated use `UpdateConfigurationRequest$inboundSchema` instead. */
  export const inboundSchema = UpdateConfigurationRequest$inboundSchema;
  /** @deprecated use `UpdateConfigurationRequest$outboundSchema` instead. */
  export const outboundSchema = UpdateConfigurationRequest$outboundSchema;
  /** @deprecated use `UpdateConfigurationRequest$Outbound` instead. */
  export type Outbound = UpdateConfigurationRequest$Outbound;
}

export function updateConfigurationRequestToJSON(
  updateConfigurationRequest: UpdateConfigurationRequest,
): string {
  return JSON.stringify(
    UpdateConfigurationRequest$outboundSchema.parse(updateConfigurationRequest),
  );
}

export function updateConfigurationRequestFromJSON(
  jsonString: string,
): SafeParseResult<UpdateConfigurationRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateConfigurationRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateConfigurationRequest' from JSON`,
  );
}
