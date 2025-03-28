/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type CreateDatapointRequest = {
  /**
   * Name for the project to which the datapoint belongs
   */
  project: string;
  /**
   * Arbitrary JSON object containing the inputs for the datapoint
   */
  inputs: { [k: string]: any };
  /**
   * Conversation history associated with the datapoint
   */
  history?: Array<{ [k: string]: any }> | undefined;
  /**
   * Expected output JSON object for the datapoint
   */
  groundTruth?: { [k: string]: any } | undefined;
  /**
   * Event id for the event from which the datapoint was created
   */
  linkedEvent?: string | undefined;
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
export const CreateDatapointRequest$inboundSchema: z.ZodType<
  CreateDatapointRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  project: z.string(),
  inputs: z.record(z.any()),
  history: z.array(z.record(z.any())).optional(),
  ground_truth: z.record(z.any()).optional(),
  linked_event: z.string().optional(),
  linked_datasets: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    "ground_truth": "groundTruth",
    "linked_event": "linkedEvent",
    "linked_datasets": "linkedDatasets",
  });
});

/** @internal */
export type CreateDatapointRequest$Outbound = {
  project: string;
  inputs: { [k: string]: any };
  history?: Array<{ [k: string]: any }> | undefined;
  ground_truth?: { [k: string]: any } | undefined;
  linked_event?: string | undefined;
  linked_datasets?: Array<string> | undefined;
  metadata?: { [k: string]: any } | undefined;
};

/** @internal */
export const CreateDatapointRequest$outboundSchema: z.ZodType<
  CreateDatapointRequest$Outbound,
  z.ZodTypeDef,
  CreateDatapointRequest
> = z.object({
  project: z.string(),
  inputs: z.record(z.any()),
  history: z.array(z.record(z.any())).optional(),
  groundTruth: z.record(z.any()).optional(),
  linkedEvent: z.string().optional(),
  linkedDatasets: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    groundTruth: "ground_truth",
    linkedEvent: "linked_event",
    linkedDatasets: "linked_datasets",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateDatapointRequest$ {
  /** @deprecated use `CreateDatapointRequest$inboundSchema` instead. */
  export const inboundSchema = CreateDatapointRequest$inboundSchema;
  /** @deprecated use `CreateDatapointRequest$outboundSchema` instead. */
  export const outboundSchema = CreateDatapointRequest$outboundSchema;
  /** @deprecated use `CreateDatapointRequest$Outbound` instead. */
  export type Outbound = CreateDatapointRequest$Outbound;
}

export function createDatapointRequestToJSON(
  createDatapointRequest: CreateDatapointRequest,
): string {
  return JSON.stringify(
    CreateDatapointRequest$outboundSchema.parse(createDatapointRequest),
  );
}

export function createDatapointRequestFromJSON(
  jsonString: string,
): SafeParseResult<CreateDatapointRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateDatapointRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateDatapointRequest' from JSON`,
  );
}
