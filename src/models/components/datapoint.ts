/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";

export type Datapoint = {
  /**
   * UUID for the datapoint
   */
  id?: string | undefined;
  tenant?: string | undefined;
  /**
   * UUID for the project where the datapoint is stored
   */
  projectId?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  /**
   * Arbitrary JSON object containing the inputs for the datapoint
   */
  inputs?: { [k: string]: any } | undefined;
  /**
   * Conversation history associated with the datapoint
   */
  history?: Array<{ [k: string]: any }> | undefined;
  groundTruth?: { [k: string]: any } | undefined;
  /**
   * Event id for the event from which the datapoint was created
   */
  linkedEvent?: string | undefined;
  /**
   * Ids of evaluations where the datapoint is included
   */
  linkedEvals?: Array<string> | undefined;
  /**
   * Ids of all datasets that include the datapoint
   */
  linkedDatasets?: Array<string> | undefined;
  saved?: boolean | undefined;
  /**
   * session or event - specify the type of data
   */
  type?: string | undefined;
  metadata?: { [k: string]: any } | undefined;
};

/** @internal */
export const Datapoint$inboundSchema: z.ZodType<
  Datapoint,
  z.ZodTypeDef,
  unknown
> = z.object({
  _id: z.string().optional(),
  tenant: z.string().optional(),
  project_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  inputs: z.record(z.any()).optional(),
  history: z.array(z.record(z.any())).optional(),
  ground_truth: z.record(z.any()).optional(),
  linked_event: z.string().optional(),
  linked_evals: z.array(z.string()).optional(),
  linked_datasets: z.array(z.string()).optional(),
  saved: z.boolean().optional(),
  type: z.string().optional(),
  metadata: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    "_id": "id",
    "project_id": "projectId",
    "created_at": "createdAt",
    "updated_at": "updatedAt",
    "ground_truth": "groundTruth",
    "linked_event": "linkedEvent",
    "linked_evals": "linkedEvals",
    "linked_datasets": "linkedDatasets",
  });
});

/** @internal */
export type Datapoint$Outbound = {
  _id?: string | undefined;
  tenant?: string | undefined;
  project_id?: string | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  inputs?: { [k: string]: any } | undefined;
  history?: Array<{ [k: string]: any }> | undefined;
  ground_truth?: { [k: string]: any } | undefined;
  linked_event?: string | undefined;
  linked_evals?: Array<string> | undefined;
  linked_datasets?: Array<string> | undefined;
  saved?: boolean | undefined;
  type?: string | undefined;
  metadata?: { [k: string]: any } | undefined;
};

/** @internal */
export const Datapoint$outboundSchema: z.ZodType<
  Datapoint$Outbound,
  z.ZodTypeDef,
  Datapoint
> = z.object({
  id: z.string().optional(),
  tenant: z.string().optional(),
  projectId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  inputs: z.record(z.any()).optional(),
  history: z.array(z.record(z.any())).optional(),
  groundTruth: z.record(z.any()).optional(),
  linkedEvent: z.string().optional(),
  linkedEvals: z.array(z.string()).optional(),
  linkedDatasets: z.array(z.string()).optional(),
  saved: z.boolean().optional(),
  type: z.string().optional(),
  metadata: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    id: "_id",
    projectId: "project_id",
    createdAt: "created_at",
    updatedAt: "updated_at",
    groundTruth: "ground_truth",
    linkedEvent: "linked_event",
    linkedEvals: "linked_evals",
    linkedDatasets: "linked_datasets",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Datapoint$ {
  /** @deprecated use `Datapoint$inboundSchema` instead. */
  export const inboundSchema = Datapoint$inboundSchema;
  /** @deprecated use `Datapoint$outboundSchema` instead. */
  export const outboundSchema = Datapoint$outboundSchema;
  /** @deprecated use `Datapoint$Outbound` instead. */
  export type Outbound = Datapoint$Outbound;
}
