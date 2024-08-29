/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { remap as remap$ } from "../../lib/primitives.js";
import { ClosedEnum } from "../../types/enums.js";
import * as z from "zod";

/**
 * The status of the run
 */
export const Status = {
    Pending: "pending",
    Completed: "completed",
} as const;
/**
 * The status of the run
 */
export type Status = ClosedEnum<typeof Status>;

export type CreateRunRequest = {
    /**
     * The UUID of the project this run is associated with
     */
    project: string;
    /**
     * The name of the run to be displayed
     */
    name: string;
    /**
     * The UUIDs of the sessions/events this run is associated with
     */
    eventIds: Array<string>;
    /**
     * The UUID of the dataset this run is associated with
     */
    datasetId?: string | undefined;
    /**
     * The UUIDs of the datapoints from the original dataset this run is associated with
     */
    datapointIds?: Array<string> | undefined;
    /**
     * The configuration being used for this run
     */
    configuration?: { [k: string]: any } | undefined;
    /**
     * Additional metadata for the run
     */
    metadata?: { [k: string]: any } | undefined;
    /**
     * The status of the run
     */
    status?: Status | undefined;
};

/** @internal */
export const Status$inboundSchema: z.ZodNativeEnum<typeof Status> = z.nativeEnum(Status);

/** @internal */
export const Status$outboundSchema: z.ZodNativeEnum<typeof Status> = Status$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Status$ {
    /** @deprecated use `Status$inboundSchema` instead. */
    export const inboundSchema = Status$inboundSchema;
    /** @deprecated use `Status$outboundSchema` instead. */
    export const outboundSchema = Status$outboundSchema;
}

/** @internal */
export const CreateRunRequest$inboundSchema: z.ZodType<CreateRunRequest, z.ZodTypeDef, unknown> = z
    .object({
        project: z.string(),
        name: z.string(),
        event_ids: z.array(z.string()),
        dataset_id: z.string().optional(),
        datapoint_ids: z.array(z.string()).optional(),
        configuration: z.record(z.any()).optional(),
        metadata: z.record(z.any()).optional(),
        status: Status$inboundSchema.optional(),
    })
    .transform((v) => {
        return remap$(v, {
            event_ids: "eventIds",
            dataset_id: "datasetId",
            datapoint_ids: "datapointIds",
        });
    });

/** @internal */
export type CreateRunRequest$Outbound = {
    project: string;
    name: string;
    event_ids: Array<string>;
    dataset_id?: string | undefined;
    datapoint_ids?: Array<string> | undefined;
    configuration?: { [k: string]: any } | undefined;
    metadata?: { [k: string]: any } | undefined;
    status?: string | undefined;
};

/** @internal */
export const CreateRunRequest$outboundSchema: z.ZodType<
    CreateRunRequest$Outbound,
    z.ZodTypeDef,
    CreateRunRequest
> = z
    .object({
        project: z.string(),
        name: z.string(),
        eventIds: z.array(z.string()),
        datasetId: z.string().optional(),
        datapointIds: z.array(z.string()).optional(),
        configuration: z.record(z.any()).optional(),
        metadata: z.record(z.any()).optional(),
        status: Status$outboundSchema.optional(),
    })
    .transform((v) => {
        return remap$(v, {
            eventIds: "event_ids",
            datasetId: "dataset_id",
            datapointIds: "datapoint_ids",
        });
    });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateRunRequest$ {
    /** @deprecated use `CreateRunRequest$inboundSchema` instead. */
    export const inboundSchema = CreateRunRequest$inboundSchema;
    /** @deprecated use `CreateRunRequest$outboundSchema` instead. */
    export const outboundSchema = CreateRunRequest$outboundSchema;
    /** @deprecated use `CreateRunRequest$Outbound` instead. */
    export type Outbound = CreateRunRequest$Outbound;
}
