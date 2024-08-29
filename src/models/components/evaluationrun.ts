/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { remap as remap$ } from "../../lib/primitives.js";
import { ClosedEnum } from "../../types/enums.js";
import * as z from "zod";

/**
 * The results of the evaluation (including pass/fails and metric aggregations)
 */
export type Results = {};

export const EvaluationRunStatus = {
    Pending: "pending",
    Completed: "completed",
} as const;
export type EvaluationRunStatus = ClosedEnum<typeof EvaluationRunStatus>;

export type EvaluationRun = {
    runId?: string | undefined;
    /**
     * The UUID of the project this run is associated with
     */
    project?: string | undefined;
    /**
     * The date and time the run was created
     */
    createdAt?: Date | undefined;
    /**
     * The UUIDs of the sessions/events this run is associated with
     */
    eventIds?: Array<string> | undefined;
    /**
     * The UUID of the dataset this run is associated with
     */
    datasetId?: string | null | undefined;
    /**
     * The UUIDs of the datapoints from the original dataset this run is associated with
     */
    datapointIds?: Array<string> | undefined;
    /**
     * The results of the evaluation (including pass/fails and metric aggregations)
     */
    results?: Results | undefined;
    /**
     * The configuration being used for this run
     */
    configuration?: { [k: string]: any } | undefined;
    /**
     * Additional metadata for the run
     */
    metadata?: { [k: string]: any } | undefined;
    status?: EvaluationRunStatus | undefined;
    /**
     * The name of the run to be displayed
     */
    name?: string | undefined;
};

/** @internal */
export const Results$inboundSchema: z.ZodType<Results, z.ZodTypeDef, unknown> = z.object({});

/** @internal */
export type Results$Outbound = {};

/** @internal */
export const Results$outboundSchema: z.ZodType<Results$Outbound, z.ZodTypeDef, Results> = z.object(
    {}
);

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Results$ {
    /** @deprecated use `Results$inboundSchema` instead. */
    export const inboundSchema = Results$inboundSchema;
    /** @deprecated use `Results$outboundSchema` instead. */
    export const outboundSchema = Results$outboundSchema;
    /** @deprecated use `Results$Outbound` instead. */
    export type Outbound = Results$Outbound;
}

/** @internal */
export const EvaluationRunStatus$inboundSchema: z.ZodNativeEnum<typeof EvaluationRunStatus> =
    z.nativeEnum(EvaluationRunStatus);

/** @internal */
export const EvaluationRunStatus$outboundSchema: z.ZodNativeEnum<typeof EvaluationRunStatus> =
    EvaluationRunStatus$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace EvaluationRunStatus$ {
    /** @deprecated use `EvaluationRunStatus$inboundSchema` instead. */
    export const inboundSchema = EvaluationRunStatus$inboundSchema;
    /** @deprecated use `EvaluationRunStatus$outboundSchema` instead. */
    export const outboundSchema = EvaluationRunStatus$outboundSchema;
}

/** @internal */
export const EvaluationRun$inboundSchema: z.ZodType<EvaluationRun, z.ZodTypeDef, unknown> = z
    .object({
        run_id: z.string().optional(),
        project: z.string().optional(),
        created_at: z
            .string()
            .datetime({ offset: true })
            .transform((v) => new Date(v))
            .optional(),
        event_ids: z.array(z.string()).optional(),
        dataset_id: z.nullable(z.string()).optional(),
        datapoint_ids: z.array(z.string()).optional(),
        results: z.lazy(() => Results$inboundSchema).optional(),
        configuration: z.record(z.any()).optional(),
        metadata: z.record(z.any()).optional(),
        status: EvaluationRunStatus$inboundSchema.optional(),
        name: z.string().optional(),
    })
    .transform((v) => {
        return remap$(v, {
            run_id: "runId",
            created_at: "createdAt",
            event_ids: "eventIds",
            dataset_id: "datasetId",
            datapoint_ids: "datapointIds",
        });
    });

/** @internal */
export type EvaluationRun$Outbound = {
    run_id?: string | undefined;
    project?: string | undefined;
    created_at?: string | undefined;
    event_ids?: Array<string> | undefined;
    dataset_id?: string | null | undefined;
    datapoint_ids?: Array<string> | undefined;
    results?: Results$Outbound | undefined;
    configuration?: { [k: string]: any } | undefined;
    metadata?: { [k: string]: any } | undefined;
    status?: string | undefined;
    name?: string | undefined;
};

/** @internal */
export const EvaluationRun$outboundSchema: z.ZodType<
    EvaluationRun$Outbound,
    z.ZodTypeDef,
    EvaluationRun
> = z
    .object({
        runId: z.string().optional(),
        project: z.string().optional(),
        createdAt: z
            .date()
            .transform((v) => v.toISOString())
            .optional(),
        eventIds: z.array(z.string()).optional(),
        datasetId: z.nullable(z.string()).optional(),
        datapointIds: z.array(z.string()).optional(),
        results: z.lazy(() => Results$outboundSchema).optional(),
        configuration: z.record(z.any()).optional(),
        metadata: z.record(z.any()).optional(),
        status: EvaluationRunStatus$outboundSchema.optional(),
        name: z.string().optional(),
    })
    .transform((v) => {
        return remap$(v, {
            runId: "run_id",
            createdAt: "created_at",
            eventIds: "event_ids",
            datasetId: "dataset_id",
            datapointIds: "datapoint_ids",
        });
    });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace EvaluationRun$ {
    /** @deprecated use `EvaluationRun$inboundSchema` instead. */
    export const inboundSchema = EvaluationRun$inboundSchema;
    /** @deprecated use `EvaluationRun$outboundSchema` instead. */
    export const outboundSchema = EvaluationRun$outboundSchema;
    /** @deprecated use `EvaluationRun$Outbound` instead. */
    export type Outbound = EvaluationRun$Outbound;
}
