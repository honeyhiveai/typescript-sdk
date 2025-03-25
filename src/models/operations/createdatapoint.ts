/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type CreateDatapointResult = {
  insertedId?: string | undefined;
};

/**
 * Datapoint successfully created
 */
export type CreateDatapointResponseBody = {
  result?: CreateDatapointResult | undefined;
};

/** @internal */
export const CreateDatapointResult$inboundSchema: z.ZodType<
  CreateDatapointResult,
  z.ZodTypeDef,
  unknown
> = z.object({
  insertedId: z.string().optional(),
});

/** @internal */
export type CreateDatapointResult$Outbound = {
  insertedId?: string | undefined;
};

/** @internal */
export const CreateDatapointResult$outboundSchema: z.ZodType<
  CreateDatapointResult$Outbound,
  z.ZodTypeDef,
  CreateDatapointResult
> = z.object({
  insertedId: z.string().optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateDatapointResult$ {
  /** @deprecated use `CreateDatapointResult$inboundSchema` instead. */
  export const inboundSchema = CreateDatapointResult$inboundSchema;
  /** @deprecated use `CreateDatapointResult$outboundSchema` instead. */
  export const outboundSchema = CreateDatapointResult$outboundSchema;
  /** @deprecated use `CreateDatapointResult$Outbound` instead. */
  export type Outbound = CreateDatapointResult$Outbound;
}

export function createDatapointResultToJSON(
  createDatapointResult: CreateDatapointResult,
): string {
  return JSON.stringify(
    CreateDatapointResult$outboundSchema.parse(createDatapointResult),
  );
}

export function createDatapointResultFromJSON(
  jsonString: string,
): SafeParseResult<CreateDatapointResult, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateDatapointResult$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateDatapointResult' from JSON`,
  );
}

/** @internal */
export const CreateDatapointResponseBody$inboundSchema: z.ZodType<
  CreateDatapointResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  result: z.lazy(() => CreateDatapointResult$inboundSchema).optional(),
});

/** @internal */
export type CreateDatapointResponseBody$Outbound = {
  result?: CreateDatapointResult$Outbound | undefined;
};

/** @internal */
export const CreateDatapointResponseBody$outboundSchema: z.ZodType<
  CreateDatapointResponseBody$Outbound,
  z.ZodTypeDef,
  CreateDatapointResponseBody
> = z.object({
  result: z.lazy(() => CreateDatapointResult$outboundSchema).optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateDatapointResponseBody$ {
  /** @deprecated use `CreateDatapointResponseBody$inboundSchema` instead. */
  export const inboundSchema = CreateDatapointResponseBody$inboundSchema;
  /** @deprecated use `CreateDatapointResponseBody$outboundSchema` instead. */
  export const outboundSchema = CreateDatapointResponseBody$outboundSchema;
  /** @deprecated use `CreateDatapointResponseBody$Outbound` instead. */
  export type Outbound = CreateDatapointResponseBody$Outbound;
}

export function createDatapointResponseBodyToJSON(
  createDatapointResponseBody: CreateDatapointResponseBody,
): string {
  return JSON.stringify(
    CreateDatapointResponseBody$outboundSchema.parse(
      createDatapointResponseBody,
    ),
  );
}

export function createDatapointResponseBodyFromJSON(
  jsonString: string,
): SafeParseResult<CreateDatapointResponseBody, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateDatapointResponseBody$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateDatapointResponseBody' from JSON`,
  );
}
