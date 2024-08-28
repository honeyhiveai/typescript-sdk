/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { remap as remap$ } from "../../lib/primitives.js";
import { ClosedEnum } from "../../types/enums.js";
import * as z from "zod";

/**
 * Specify whether the event is of "model", "tool" or "chain" type
 */
export const CreateEventRequestEventType = {
    Model: "model",
    Tool: "tool",
    Chain: "chain",
} as const;
/**
 * Specify whether the event is of "model", "tool" or "chain" type
 */
export type CreateEventRequestEventType = ClosedEnum<typeof CreateEventRequestEventType>;

export type CreateEventRequest = {
    /**
     * Project associated with the event
     */
    project: string;
    /**
     * Source of the event - production, staging, etc
     */
    source: string;
    /**
     * Name of the event
     */
    eventName: string;
    /**
     * Specify whether the event is of "model", "tool" or "chain" type
     */
    eventType: CreateEventRequestEventType;
    /**
     * Unique id of the event, if not set, it will be auto-generated
     */
    eventId?: string | undefined;
    /**
     * Unique id of the session associated with the event, if not set, it will be auto-generated
     */
    sessionId?: string | undefined;
    /**
     * Id of the parent event if nested
     */
    parentId?: string | undefined;
    /**
     * Id of events that are nested within the event
     */
    childrenIds?: Array<string> | undefined;
    /**
     * Associated configuration JSON for the event - model name, vector index name, etc
     */
    config: { [k: string]: any };
    /**
     * Input JSON given to the event - prompt, chunks, etc
     */
    inputs: { [k: string]: any };
    /**
     * Final output JSON of the event
     */
    outputs?: { [k: string]: any } | undefined;
    /**
     * Any error description if event failed
     */
    error?: string | undefined;
    /**
     * UTC timestamp (in milliseconds) for the event start
     */
    startTime?: number | undefined;
    /**
     * UTC timestamp (in milliseconds) for the event end
     */
    endTime?: number | undefined;
    /**
     * How long the event took in milliseconds
     */
    duration: number;
    /**
     * Any system or application metadata associated with the event
     */
    metadata?: { [k: string]: any } | undefined;
    /**
     * Any user feedback provided for the event output
     */
    feedback?: { [k: string]: any } | undefined;
    /**
     * Any values computed over the output of the event
     */
    metrics?: { [k: string]: any } | undefined;
    /**
     * Any user properties associated with the event
     */
    userProperties?: { [k: string]: any } | undefined;
};

/** @internal */
export const CreateEventRequestEventType$inboundSchema: z.ZodNativeEnum<
    typeof CreateEventRequestEventType
> = z.nativeEnum(CreateEventRequestEventType);

/** @internal */
export const CreateEventRequestEventType$outboundSchema: z.ZodNativeEnum<
    typeof CreateEventRequestEventType
> = CreateEventRequestEventType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateEventRequestEventType$ {
    /** @deprecated use `CreateEventRequestEventType$inboundSchema` instead. */
    export const inboundSchema = CreateEventRequestEventType$inboundSchema;
    /** @deprecated use `CreateEventRequestEventType$outboundSchema` instead. */
    export const outboundSchema = CreateEventRequestEventType$outboundSchema;
}

/** @internal */
export const CreateEventRequest$inboundSchema: z.ZodType<
    CreateEventRequest,
    z.ZodTypeDef,
    unknown
> = z
    .object({
        project: z.string(),
        source: z.string(),
        event_name: z.string(),
        event_type: CreateEventRequestEventType$inboundSchema,
        event_id: z.string().optional(),
        session_id: z.string().optional(),
        parent_id: z.string().optional(),
        children_ids: z.array(z.string()).optional(),
        config: z.record(z.any()),
        inputs: z.record(z.any()),
        outputs: z.record(z.any()).optional(),
        error: z.string().optional(),
        start_time: z.number().optional(),
        end_time: z.number().int().optional(),
        duration: z.number(),
        metadata: z.record(z.any()).optional(),
        feedback: z.record(z.any()).optional(),
        metrics: z.record(z.any()).optional(),
        user_properties: z.record(z.any()).optional(),
    })
    .transform((v) => {
        return remap$(v, {
            event_name: "eventName",
            event_type: "eventType",
            event_id: "eventId",
            session_id: "sessionId",
            parent_id: "parentId",
            children_ids: "childrenIds",
            start_time: "startTime",
            end_time: "endTime",
            user_properties: "userProperties",
        });
    });

/** @internal */
export type CreateEventRequest$Outbound = {
    project: string;
    source: string;
    event_name: string;
    event_type: string;
    event_id?: string | undefined;
    session_id?: string | undefined;
    parent_id?: string | undefined;
    children_ids?: Array<string> | undefined;
    config: { [k: string]: any };
    inputs: { [k: string]: any };
    outputs?: { [k: string]: any } | undefined;
    error?: string | undefined;
    start_time?: number | undefined;
    end_time?: number | undefined;
    duration: number;
    metadata?: { [k: string]: any } | undefined;
    feedback?: { [k: string]: any } | undefined;
    metrics?: { [k: string]: any } | undefined;
    user_properties?: { [k: string]: any } | undefined;
};

/** @internal */
export const CreateEventRequest$outboundSchema: z.ZodType<
    CreateEventRequest$Outbound,
    z.ZodTypeDef,
    CreateEventRequest
> = z
    .object({
        project: z.string(),
        source: z.string(),
        eventName: z.string(),
        eventType: CreateEventRequestEventType$outboundSchema,
        eventId: z.string().optional(),
        sessionId: z.string().optional(),
        parentId: z.string().optional(),
        childrenIds: z.array(z.string()).optional(),
        config: z.record(z.any()),
        inputs: z.record(z.any()),
        outputs: z.record(z.any()).optional(),
        error: z.string().optional(),
        startTime: z.number().optional(),
        endTime: z.number().int().optional(),
        duration: z.number(),
        metadata: z.record(z.any()).optional(),
        feedback: z.record(z.any()).optional(),
        metrics: z.record(z.any()).optional(),
        userProperties: z.record(z.any()).optional(),
    })
    .transform((v) => {
        return remap$(v, {
            eventName: "event_name",
            eventType: "event_type",
            eventId: "event_id",
            sessionId: "session_id",
            parentId: "parent_id",
            childrenIds: "children_ids",
            startTime: "start_time",
            endTime: "end_time",
            userProperties: "user_properties",
        });
    });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateEventRequest$ {
    /** @deprecated use `CreateEventRequest$inboundSchema` instead. */
    export const inboundSchema = CreateEventRequest$inboundSchema;
    /** @deprecated use `CreateEventRequest$outboundSchema` instead. */
    export const outboundSchema = CreateEventRequest$outboundSchema;
    /** @deprecated use `CreateEventRequest$Outbound` instead. */
    export type Outbound = CreateEventRequest$Outbound;
}
