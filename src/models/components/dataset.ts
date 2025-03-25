/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * What the dataset is to be used for - "evaluation" or "fine-tuning"
 */
export const DatasetType = {
  Evaluation: "evaluation",
  FineTuning: "fine-tuning",
} as const;
/**
 * What the dataset is to be used for - "evaluation" or "fine-tuning"
 */
export type DatasetType = ClosedEnum<typeof DatasetType>;

/**
 * The type of data included in the dataset - "event" (default) or "session"
 */
export const PipelineType = {
  Event: "event",
  Session: "session",
} as const;
/**
 * The type of data included in the dataset - "event" (default) or "session"
 */
export type PipelineType = ClosedEnum<typeof PipelineType>;

export type Dataset = {
  /**
   * UUID of the project associated with this dataset
   */
  project?: string | undefined;
  /**
   * Name of the dataset
   */
  name?: string | undefined;
  /**
   * A description for the dataset
   */
  description?: string | undefined;
  /**
   * What the dataset is to be used for - "evaluation" or "fine-tuning"
   */
  type?: DatasetType | undefined;
  /**
   * List of unique datapoint ids to be included in this dataset
   */
  datapoints?: Array<string> | undefined;
  /**
   * Number of datapoints included in the dataset
   */
  numPoints?: number | undefined;
  linkedEvals?: Array<string> | undefined;
  /**
   * Whether the dataset has been saved or detected
   */
  saved?: boolean | undefined;
  /**
   * The type of data included in the dataset - "event" (default) or "session"
   */
  pipelineType?: PipelineType | undefined;
  /**
   * Timestamp of when the dataset was created
   */
  createdAt?: string | undefined;
  /**
   * Timestamp of when the dataset was last updated
   */
  updatedAt?: string | undefined;
};

/** @internal */
export const DatasetType$inboundSchema: z.ZodNativeEnum<typeof DatasetType> = z
  .nativeEnum(DatasetType);

/** @internal */
export const DatasetType$outboundSchema: z.ZodNativeEnum<typeof DatasetType> =
  DatasetType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace DatasetType$ {
  /** @deprecated use `DatasetType$inboundSchema` instead. */
  export const inboundSchema = DatasetType$inboundSchema;
  /** @deprecated use `DatasetType$outboundSchema` instead. */
  export const outboundSchema = DatasetType$outboundSchema;
}

/** @internal */
export const PipelineType$inboundSchema: z.ZodNativeEnum<typeof PipelineType> =
  z.nativeEnum(PipelineType);

/** @internal */
export const PipelineType$outboundSchema: z.ZodNativeEnum<typeof PipelineType> =
  PipelineType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PipelineType$ {
  /** @deprecated use `PipelineType$inboundSchema` instead. */
  export const inboundSchema = PipelineType$inboundSchema;
  /** @deprecated use `PipelineType$outboundSchema` instead. */
  export const outboundSchema = PipelineType$outboundSchema;
}

/** @internal */
export const Dataset$inboundSchema: z.ZodType<Dataset, z.ZodTypeDef, unknown> =
  z.object({
    project: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    type: DatasetType$inboundSchema.optional(),
    datapoints: z.array(z.string()).optional(),
    num_points: z.number().int().optional(),
    linked_evals: z.array(z.string()).optional(),
    saved: z.boolean().optional(),
    pipeline_type: PipelineType$inboundSchema.optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  }).transform((v) => {
    return remap$(v, {
      "num_points": "numPoints",
      "linked_evals": "linkedEvals",
      "pipeline_type": "pipelineType",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
    });
  });

/** @internal */
export type Dataset$Outbound = {
  project?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  type?: string | undefined;
  datapoints?: Array<string> | undefined;
  num_points?: number | undefined;
  linked_evals?: Array<string> | undefined;
  saved?: boolean | undefined;
  pipeline_type?: string | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
};

/** @internal */
export const Dataset$outboundSchema: z.ZodType<
  Dataset$Outbound,
  z.ZodTypeDef,
  Dataset
> = z.object({
  project: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  type: DatasetType$outboundSchema.optional(),
  datapoints: z.array(z.string()).optional(),
  numPoints: z.number().int().optional(),
  linkedEvals: z.array(z.string()).optional(),
  saved: z.boolean().optional(),
  pipelineType: PipelineType$outboundSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
}).transform((v) => {
  return remap$(v, {
    numPoints: "num_points",
    linkedEvals: "linked_evals",
    pipelineType: "pipeline_type",
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Dataset$ {
  /** @deprecated use `Dataset$inboundSchema` instead. */
  export const inboundSchema = Dataset$inboundSchema;
  /** @deprecated use `Dataset$outboundSchema` instead. */
  export const outboundSchema = Dataset$outboundSchema;
  /** @deprecated use `Dataset$Outbound` instead. */
  export type Outbound = Dataset$Outbound;
}

export function datasetToJSON(dataset: Dataset): string {
  return JSON.stringify(Dataset$outboundSchema.parse(dataset));
}

export function datasetFromJSON(
  jsonString: string,
): SafeParseResult<Dataset, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Dataset$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Dataset' from JSON`,
  );
}
