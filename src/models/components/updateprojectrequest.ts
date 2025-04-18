/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type UpdateProjectRequest = {
  projectId: string;
  name?: string | undefined;
  description?: string | undefined;
};

/** @internal */
export const UpdateProjectRequest$inboundSchema: z.ZodType<
  UpdateProjectRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  project_id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    "project_id": "projectId",
  });
});

/** @internal */
export type UpdateProjectRequest$Outbound = {
  project_id: string;
  name?: string | undefined;
  description?: string | undefined;
};

/** @internal */
export const UpdateProjectRequest$outboundSchema: z.ZodType<
  UpdateProjectRequest$Outbound,
  z.ZodTypeDef,
  UpdateProjectRequest
> = z.object({
  projectId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    projectId: "project_id",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace UpdateProjectRequest$ {
  /** @deprecated use `UpdateProjectRequest$inboundSchema` instead. */
  export const inboundSchema = UpdateProjectRequest$inboundSchema;
  /** @deprecated use `UpdateProjectRequest$outboundSchema` instead. */
  export const outboundSchema = UpdateProjectRequest$outboundSchema;
  /** @deprecated use `UpdateProjectRequest$Outbound` instead. */
  export type Outbound = UpdateProjectRequest$Outbound;
}

export function updateProjectRequestToJSON(
  updateProjectRequest: UpdateProjectRequest,
): string {
  return JSON.stringify(
    UpdateProjectRequest$outboundSchema.parse(updateProjectRequest),
  );
}

export function updateProjectRequestFromJSON(
  jsonString: string,
): SafeParseResult<UpdateProjectRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateProjectRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateProjectRequest' from JSON`,
  );
}
