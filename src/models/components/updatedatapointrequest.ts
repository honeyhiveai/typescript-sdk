/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";

export type UpdateDatapointRequest = {
  /**
   * Arbitrary JSON object containing the inputs for the datapoint
   */
  inputs?: { [k: string]: any } | undefined;
  /**
   * Conversation history associated with the datapoint
   */
  history?: Array<{ [k: string]: any }> | undefined;
  /**
   * Expected output JSON object for the datapoint
   */
  groundTruth?: { [k: string]: any } | undefined;
  /**
   * Ids of evaluations where the datapoint is included
   */
  linkedEvals?: Array<string> | undefined;
  /**
   * Ids of all datasets that include the datapoint
   */
  linkedDatasets?: Array<string> | undefined;
  /**
   * Any additional metadata for the datapoint
   */
  metadata?: { [k: string]: any } | undefined;
};

/** @internal */
export const UpdateDatapointRequest$inboundSchema: z.ZodType<
  UpdateDatapointRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  inputs: z.record(z.any()).optional(),
  history: z.array(z.record(z.any())).optional(),
  ground_truth: z.record(z.any()).optional(),
  linked_evals: z.array(z.string()).optional(),
  linked_datasets: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    "ground_truth": "groundTruth",
    "linked_evals": "linkedEvals",
    "linked_datasets": "linkedDatasets",
  });
});

/** @internal */
export type UpdateDatapointRequest$Outbound = {
  inputs?: { [k: string]: any } | undefined;
  history?: Array<{ [k: string]: any }> | undefined;
  ground_truth?: { [k: string]: any } | undefined;
  linked_evals?: Array<string> | undefined;
  linked_datasets?: Array<string> | undefined;
  metadata?: { [k: string]: any } | undefined;
};

/** @internal */
export const UpdateDatapointRequest$outboundSchema: z.ZodType<
  UpdateDatapointRequest$Outbound,
  z.ZodTypeDef,
  UpdateDatapointRequest
> = z.object({
  inputs: z.record(z.any()).optional(),
  history: z.array(z.record(z.any())).optional(),
  groundTruth: z.record(z.any()).optional(),
  linkedEvals: z.array(z.string()).optional(),
  linkedDatasets: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    groundTruth: "ground_truth",
    linkedEvals: "linked_evals",
    linkedDatasets: "linked_datasets",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace UpdateDatapointRequest$ {
  /** @deprecated use `UpdateDatapointRequest$inboundSchema` instead. */
  export const inboundSchema = UpdateDatapointRequest$inboundSchema;
  /** @deprecated use `UpdateDatapointRequest$outboundSchema` instead. */
  export const outboundSchema = UpdateDatapointRequest$outboundSchema;
  /** @deprecated use `UpdateDatapointRequest$Outbound` instead. */
  export type Outbound = UpdateDatapointRequest$Outbound;
}
