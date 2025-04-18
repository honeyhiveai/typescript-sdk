/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import {
  EvaluationRun,
  EvaluationRun$inboundSchema,
  EvaluationRun$Outbound,
  EvaluationRun$outboundSchema,
} from "./evaluationrun.js";

export type CreateRunResponse = {
  evaluation?: EvaluationRun | undefined;
  runId?: string | undefined;
};

/** @internal */
export const CreateRunResponse$inboundSchema: z.ZodType<
  CreateRunResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  evaluation: EvaluationRun$inboundSchema.optional(),
  run_id: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    "run_id": "runId",
  });
});

/** @internal */
export type CreateRunResponse$Outbound = {
  evaluation?: EvaluationRun$Outbound | undefined;
  run_id?: string | undefined;
};

/** @internal */
export const CreateRunResponse$outboundSchema: z.ZodType<
  CreateRunResponse$Outbound,
  z.ZodTypeDef,
  CreateRunResponse
> = z.object({
  evaluation: EvaluationRun$outboundSchema.optional(),
  runId: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    runId: "run_id",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateRunResponse$ {
  /** @deprecated use `CreateRunResponse$inboundSchema` instead. */
  export const inboundSchema = CreateRunResponse$inboundSchema;
  /** @deprecated use `CreateRunResponse$outboundSchema` instead. */
  export const outboundSchema = CreateRunResponse$outboundSchema;
  /** @deprecated use `CreateRunResponse$Outbound` instead. */
  export type Outbound = CreateRunResponse$Outbound;
}

export function createRunResponseToJSON(
  createRunResponse: CreateRunResponse,
): string {
  return JSON.stringify(
    CreateRunResponse$outboundSchema.parse(createRunResponse),
  );
}

export function createRunResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateRunResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateRunResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateRunResponse' from JSON`,
  );
}
