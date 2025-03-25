/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import * as components from "../components/index.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * Type of the dataset - "evaluation" or "fine-tuning"
 */
export const Type = {
  Evaluation: "evaluation",
  FineTuning: "fine-tuning",
} as const;
/**
 * Type of the dataset - "evaluation" or "fine-tuning"
 */
export type Type = ClosedEnum<typeof Type>;

export type GetDatasetsRequest = {
  /**
   * Project Name associated with the datasets like `New Project`
   */
  project: string;
  /**
   * Type of the dataset - "evaluation" or "fine-tuning"
   */
  type?: Type | undefined;
  /**
   * Unique dataset ID for filtering specific dataset like `663876ec4611c47f4970f0c3`
   */
  datasetId?: string | undefined;
};

/**
 * Successful response
 */
export type GetDatasetsResponseBody = {
  testcases?: Array<components.Dataset> | undefined;
};

/** @internal */
export const Type$inboundSchema: z.ZodNativeEnum<typeof Type> = z.nativeEnum(
  Type,
);

/** @internal */
export const Type$outboundSchema: z.ZodNativeEnum<typeof Type> =
  Type$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Type$ {
  /** @deprecated use `Type$inboundSchema` instead. */
  export const inboundSchema = Type$inboundSchema;
  /** @deprecated use `Type$outboundSchema` instead. */
  export const outboundSchema = Type$outboundSchema;
}

/** @internal */
export const GetDatasetsRequest$inboundSchema: z.ZodType<
  GetDatasetsRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  project: z.string(),
  type: Type$inboundSchema.optional(),
  dataset_id: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    "dataset_id": "datasetId",
  });
});

/** @internal */
export type GetDatasetsRequest$Outbound = {
  project: string;
  type?: string | undefined;
  dataset_id?: string | undefined;
};

/** @internal */
export const GetDatasetsRequest$outboundSchema: z.ZodType<
  GetDatasetsRequest$Outbound,
  z.ZodTypeDef,
  GetDatasetsRequest
> = z.object({
  project: z.string(),
  type: Type$outboundSchema.optional(),
  datasetId: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    datasetId: "dataset_id",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GetDatasetsRequest$ {
  /** @deprecated use `GetDatasetsRequest$inboundSchema` instead. */
  export const inboundSchema = GetDatasetsRequest$inboundSchema;
  /** @deprecated use `GetDatasetsRequest$outboundSchema` instead. */
  export const outboundSchema = GetDatasetsRequest$outboundSchema;
  /** @deprecated use `GetDatasetsRequest$Outbound` instead. */
  export type Outbound = GetDatasetsRequest$Outbound;
}

export function getDatasetsRequestToJSON(
  getDatasetsRequest: GetDatasetsRequest,
): string {
  return JSON.stringify(
    GetDatasetsRequest$outboundSchema.parse(getDatasetsRequest),
  );
}

export function getDatasetsRequestFromJSON(
  jsonString: string,
): SafeParseResult<GetDatasetsRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetDatasetsRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetDatasetsRequest' from JSON`,
  );
}

/** @internal */
export const GetDatasetsResponseBody$inboundSchema: z.ZodType<
  GetDatasetsResponseBody,
  z.ZodTypeDef,
  unknown
> = z.object({
  testcases: z.array(components.Dataset$inboundSchema).optional(),
});

/** @internal */
export type GetDatasetsResponseBody$Outbound = {
  testcases?: Array<components.Dataset$Outbound> | undefined;
};

/** @internal */
export const GetDatasetsResponseBody$outboundSchema: z.ZodType<
  GetDatasetsResponseBody$Outbound,
  z.ZodTypeDef,
  GetDatasetsResponseBody
> = z.object({
  testcases: z.array(components.Dataset$outboundSchema).optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GetDatasetsResponseBody$ {
  /** @deprecated use `GetDatasetsResponseBody$inboundSchema` instead. */
  export const inboundSchema = GetDatasetsResponseBody$inboundSchema;
  /** @deprecated use `GetDatasetsResponseBody$outboundSchema` instead. */
  export const outboundSchema = GetDatasetsResponseBody$outboundSchema;
  /** @deprecated use `GetDatasetsResponseBody$Outbound` instead. */
  export type Outbound = GetDatasetsResponseBody$Outbound;
}

export function getDatasetsResponseBodyToJSON(
  getDatasetsResponseBody: GetDatasetsResponseBody,
): string {
  return JSON.stringify(
    GetDatasetsResponseBody$outboundSchema.parse(getDatasetsResponseBody),
  );
}

export function getDatasetsResponseBodyFromJSON(
  jsonString: string,
): SafeParseResult<GetDatasetsResponseBody, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetDatasetsResponseBody$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetDatasetsResponseBody' from JSON`,
  );
}
