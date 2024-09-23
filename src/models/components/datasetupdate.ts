/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";

export type DatasetUpdate = {
  /**
   * The unique identifier of the dataset being updated
   */
  datasetId: string;
  /**
   * Updated name for the dataset
   */
  name?: string | undefined;
  /**
   * Updated description for the dataset
   */
  description?: string | undefined;
  /**
   * Updated list of datapoint ids for the dataset - note the full list is needed
   */
  datapoints?: Array<string> | undefined;
  /**
   * Updated list of unique evaluation run ids to be associated with this dataset
   */
  linkedEvals?: Array<string> | undefined;
  /**
   * Updated metadata to track for the dataset
   */
  metadata?: { [k: string]: any } | undefined;
};

/** @internal */
export const DatasetUpdate$inboundSchema: z.ZodType<
  DatasetUpdate,
  z.ZodTypeDef,
  unknown
> = z.object({
  dataset_id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  datapoints: z.array(z.string()).optional(),
  linked_evals: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    "dataset_id": "datasetId",
    "linked_evals": "linkedEvals",
  });
});

/** @internal */
export type DatasetUpdate$Outbound = {
  dataset_id: string;
  name?: string | undefined;
  description?: string | undefined;
  datapoints?: Array<string> | undefined;
  linked_evals?: Array<string> | undefined;
  metadata?: { [k: string]: any } | undefined;
};

/** @internal */
export const DatasetUpdate$outboundSchema: z.ZodType<
  DatasetUpdate$Outbound,
  z.ZodTypeDef,
  DatasetUpdate
> = z.object({
  datasetId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  datapoints: z.array(z.string()).optional(),
  linkedEvals: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    datasetId: "dataset_id",
    linkedEvals: "linked_evals",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace DatasetUpdate$ {
  /** @deprecated use `DatasetUpdate$inboundSchema` instead. */
  export const inboundSchema = DatasetUpdate$inboundSchema;
  /** @deprecated use `DatasetUpdate$outboundSchema` instead. */
  export const outboundSchema = DatasetUpdate$outboundSchema;
  /** @deprecated use `DatasetUpdate$Outbound` instead. */
  export type Outbound = DatasetUpdate$Outbound;
}
