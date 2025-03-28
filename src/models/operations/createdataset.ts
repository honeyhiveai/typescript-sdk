/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type CreateDatasetResult = {
  /**
   * UUID for the created dataset
   */
  insertedId?: string | undefined;
};

/**
 * Successful creation
 */
export type CreateDatasetResponseBody = {
  inserted?: boolean | undefined;
  result?: CreateDatasetResult | undefined;
};

/** @internal */
export const CreateDatasetResult$inboundSchema: z.ZodType<
  CreateDatasetResult,
  z.ZodTypeDef,
  unknown
> = z.object({
  insertedId: z.string().optional(),
});

/** @internal */
export type CreateDatasetResult$Outbound = {
  insertedId?: string | undefined;
};

/** @internal */
export const CreateDatasetResult$outboundSchema: z.ZodType<
  CreateDatasetResult$Outbound,
  z.ZodTypeDef,
  CreateDatasetResult
> = z.object({
  insertedId: z.string().optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateDatasetResult$ {
  /** @deprecated use `CreateDatasetResult$inboundSchema` instead. */
  export const inboundSchema = CreateDatasetResult$inboundSchema;
  /** @deprecated use `CreateDatasetResult$outboundSchema` instead. */
  export const outboundSchema = CreateDatasetResult$outboundSchema;
  /** @deprecated use `CreateDatasetResult$Outbound` instead. */
  export type Outbound = CreateDatasetResult$Outbound;
}

export function createDatasetResultToJSON(
  createDatasetResult: CreateDatasetResult,
): string {
  return JSON.stringify(
    CreateDatasetResult$outboundSchema.parse(createDatasetResult),
  );
}

export function createDatasetResultFromJSON(
  jsonString: string,
): SafeParseResult<CreateDatasetResult, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateDatasetResult$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateDatasetResult' from JSON`,
  );
}

/** @internal */
export const CreateDatasetResponseBody$inboundSchema: z.ZodType<
  CreateDatasetResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  inserted: z.boolean().optional(),
  result: z.lazy(() => CreateDatasetResult$inboundSchema).optional(),
});

/** @internal */
export type CreateDatasetResponseBody$Outbound = {
  inserted?: boolean | undefined;
  result?: CreateDatasetResult$Outbound | undefined;
};

/** @internal */
export const CreateDatasetResponseBody$outboundSchema: z.ZodType<
  CreateDatasetResponseBody$Outbound,
  z.ZodTypeDef,
  CreateDatasetResponseBody
> = z.object({
  inserted: z.boolean().optional(),
  result: z.lazy(() => CreateDatasetResult$outboundSchema).optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateDatasetResponseBody$ {
  /** @deprecated use `CreateDatasetResponseBody$inboundSchema` instead. */
  export const inboundSchema = CreateDatasetResponseBody$inboundSchema;
  /** @deprecated use `CreateDatasetResponseBody$outboundSchema` instead. */
  export const outboundSchema = CreateDatasetResponseBody$outboundSchema;
  /** @deprecated use `CreateDatasetResponseBody$Outbound` instead. */
  export type Outbound = CreateDatasetResponseBody$Outbound;
}

export function createDatasetResponseBodyToJSON(
  createDatasetResponseBody: CreateDatasetResponseBody,
): string {
  return JSON.stringify(
    CreateDatasetResponseBody$outboundSchema.parse(createDatasetResponseBody),
  );
}

export function createDatasetResponseBodyFromJSON(
  jsonString: string,
): SafeParseResult<CreateDatasetResponseBody, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateDatasetResponseBody$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateDatasetResponseBody' from JSON`,
  );
}
