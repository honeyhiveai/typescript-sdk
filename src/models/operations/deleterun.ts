/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type DeleteRunRequest = {
  runId: string;
};

/** @internal */
export const DeleteRunRequest$inboundSchema: z.ZodType<
  DeleteRunRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  run_id: z.string(),
}).transform((v) => {
  return remap$(v, {
    "run_id": "runId",
  });
});

/** @internal */
export type DeleteRunRequest$Outbound = {
  run_id: string;
};

/** @internal */
export const DeleteRunRequest$outboundSchema: z.ZodType<
  DeleteRunRequest$Outbound,
  z.ZodTypeDef,
  DeleteRunRequest
> = z.object({
  runId: z.string(),
}).transform((v) => {
  return remap$(v, {
    runId: "run_id",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace DeleteRunRequest$ {
  /** @deprecated use `DeleteRunRequest$inboundSchema` instead. */
  export const inboundSchema = DeleteRunRequest$inboundSchema;
  /** @deprecated use `DeleteRunRequest$outboundSchema` instead. */
  export const outboundSchema = DeleteRunRequest$outboundSchema;
  /** @deprecated use `DeleteRunRequest$Outbound` instead. */
  export type Outbound = DeleteRunRequest$Outbound;
}

export function deleteRunRequestToJSON(
  deleteRunRequest: DeleteRunRequest,
): string {
  return JSON.stringify(
    DeleteRunRequest$outboundSchema.parse(deleteRunRequest),
  );
}

export function deleteRunRequestFromJSON(
  jsonString: string,
): SafeParseResult<DeleteRunRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteRunRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteRunRequest' from JSON`,
  );
}
