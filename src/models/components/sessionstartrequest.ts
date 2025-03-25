/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type SessionStartRequest = {
  /**
   * Project name associated with the session
   */
  project: string;
  /**
   * Name of the session
   */
  sessionName: string;
  /**
   * Source of the session - production, staging, etc
   */
  source: string;
  /**
   * Unique id of the session, if not set, it will be auto-generated
   */
  sessionId?: string | undefined;
  /**
   * Id of events that are nested within the session
   */
  childrenIds?: Array<string> | undefined;
  /**
   * Associated configuration for the session
   */
  config?: { [k: string]: any } | undefined;
  /**
   * Input object passed to the session - user query, text blob, etc
   */
  inputs?: { [k: string]: any } | undefined;
  /**
   * Final output of the session - completion, chunks, etc
   */
  outputs?: { [k: string]: any } | undefined;
  /**
   * Any error description if session failed
   */
  error?: string | undefined;
  /**
   * How long the session took in milliseconds
   */
  duration?: number | undefined;
  /**
   * Any user properties associated with the session
   */
  userProperties?: { [k: string]: any } | undefined;
  /**
   * Any values computed over the output of the session
   */
  metrics?: { [k: string]: any } | undefined;
  /**
   * Any user feedback provided for the session output
   */
  feedback?: { [k: string]: any } | undefined;
  /**
   * Any system or application metadata associated with the session
   */
  metadata?: { [k: string]: any } | undefined;
  /**
   * UTC timestamp (in milliseconds) for the session start
   */
  startTime?: number | undefined;
  /**
   * UTC timestamp (in milliseconds) for the session end
   */
  endTime?: number | undefined;
};

/** @internal */
export const SessionStartRequest$inboundSchema: z.ZodType<
  SessionStartRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  project: z.string(),
  session_name: z.string(),
  source: z.string(),
  session_id: z.string().optional(),
  children_ids: z.array(z.string()).optional(),
  config: z.record(z.any()).optional(),
  inputs: z.record(z.any()).optional(),
  outputs: z.record(z.any()).optional(),
  error: z.string().optional(),
  duration: z.number().optional(),
  user_properties: z.record(z.any()).optional(),
  metrics: z.record(z.any()).optional(),
  feedback: z.record(z.any()).optional(),
  metadata: z.record(z.any()).optional(),
  start_time: z.number().optional(),
  end_time: z.number().int().optional(),
}).transform((v) => {
  return remap$(v, {
    "session_name": "sessionName",
    "session_id": "sessionId",
    "children_ids": "childrenIds",
    "user_properties": "userProperties",
    "start_time": "startTime",
    "end_time": "endTime",
  });
});

/** @internal */
export type SessionStartRequest$Outbound = {
  project: string;
  session_name: string;
  source: string;
  session_id?: string | undefined;
  children_ids?: Array<string> | undefined;
  config?: { [k: string]: any } | undefined;
  inputs?: { [k: string]: any } | undefined;
  outputs?: { [k: string]: any } | undefined;
  error?: string | undefined;
  duration?: number | undefined;
  user_properties?: { [k: string]: any } | undefined;
  metrics?: { [k: string]: any } | undefined;
  feedback?: { [k: string]: any } | undefined;
  metadata?: { [k: string]: any } | undefined;
  start_time?: number | undefined;
  end_time?: number | undefined;
};

/** @internal */
export const SessionStartRequest$outboundSchema: z.ZodType<
  SessionStartRequest$Outbound,
  z.ZodTypeDef,
  SessionStartRequest
> = z.object({
  project: z.string(),
  sessionName: z.string(),
  source: z.string(),
  sessionId: z.string().optional(),
  childrenIds: z.array(z.string()).optional(),
  config: z.record(z.any()).optional(),
  inputs: z.record(z.any()).optional(),
  outputs: z.record(z.any()).optional(),
  error: z.string().optional(),
  duration: z.number().optional(),
  userProperties: z.record(z.any()).optional(),
  metrics: z.record(z.any()).optional(),
  feedback: z.record(z.any()).optional(),
  metadata: z.record(z.any()).optional(),
  startTime: z.number().optional(),
  endTime: z.number().int().optional(),
}).transform((v) => {
  return remap$(v, {
    sessionName: "session_name",
    sessionId: "session_id",
    childrenIds: "children_ids",
    userProperties: "user_properties",
    startTime: "start_time",
    endTime: "end_time",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace SessionStartRequest$ {
  /** @deprecated use `SessionStartRequest$inboundSchema` instead. */
  export const inboundSchema = SessionStartRequest$inboundSchema;
  /** @deprecated use `SessionStartRequest$outboundSchema` instead. */
  export const outboundSchema = SessionStartRequest$outboundSchema;
  /** @deprecated use `SessionStartRequest$Outbound` instead. */
  export type Outbound = SessionStartRequest$Outbound;
}

export function sessionStartRequestToJSON(
  sessionStartRequest: SessionStartRequest,
): string {
  return JSON.stringify(
    SessionStartRequest$outboundSchema.parse(sessionStartRequest),
  );
}

export function sessionStartRequestFromJSON(
  jsonString: string,
): SafeParseResult<SessionStartRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SessionStartRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SessionStartRequest' from JSON`,
  );
}
