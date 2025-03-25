/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type GetRunsRequest = {
  project?: string | undefined;
};

/** @internal */
export const GetRunsRequest$inboundSchema: z.ZodType<
  GetRunsRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  project: z.string().optional(),
});

/** @internal */
export type GetRunsRequest$Outbound = {
  project?: string | undefined;
};

/** @internal */
export const GetRunsRequest$outboundSchema: z.ZodType<
  GetRunsRequest$Outbound,
  z.ZodTypeDef,
  GetRunsRequest
> = z.object({
  project: z.string().optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GetRunsRequest$ {
  /** @deprecated use `GetRunsRequest$inboundSchema` instead. */
  export const inboundSchema = GetRunsRequest$inboundSchema;
  /** @deprecated use `GetRunsRequest$outboundSchema` instead. */
  export const outboundSchema = GetRunsRequest$outboundSchema;
  /** @deprecated use `GetRunsRequest$Outbound` instead. */
  export type Outbound = GetRunsRequest$Outbound;
}

export function getRunsRequestToJSON(getRunsRequest: GetRunsRequest): string {
  return JSON.stringify(GetRunsRequest$outboundSchema.parse(getRunsRequest));
}

export function getRunsRequestFromJSON(
  jsonString: string,
): SafeParseResult<GetRunsRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetRunsRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetRunsRequest' from JSON`,
  );
}
