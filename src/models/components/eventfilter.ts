/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * The type of filter you are performing - "is", "is not", "contains", "not contains", "greater than"
 */
export const Operator = {
  Is: "is",
  IsNot: "is not",
  Contains: "contains",
  NotContains: "not contains",
  GreaterThan: "greater than",
} as const;
/**
 * The type of filter you are performing - "is", "is not", "contains", "not contains", "greater than"
 */
export type Operator = ClosedEnum<typeof Operator>;

/**
 * The data type you are using - "string", "number", "boolean", "id" (for object ids)
 */
export const Type = {
  String: "string",
  Number: "number",
  Boolean: "boolean",
  Id: "id",
} as const;
/**
 * The data type you are using - "string", "number", "boolean", "id" (for object ids)
 */
export type Type = ClosedEnum<typeof Type>;

export type EventFilter = {
  /**
   * The field name that you are filtering by like `metadata.cost`, `inputs.chat_history.0.content`
   */
  field?: string | undefined;
  /**
   * The value that you are filtering the field for
   */
  value?: string | undefined;
  /**
   * The type of filter you are performing - "is", "is not", "contains", "not contains", "greater than"
   */
  operator?: Operator | undefined;
  /**
   * The data type you are using - "string", "number", "boolean", "id" (for object ids)
   */
  type?: Type | undefined;
};

/** @internal */
export const Operator$inboundSchema: z.ZodNativeEnum<typeof Operator> = z
  .nativeEnum(Operator);

/** @internal */
export const Operator$outboundSchema: z.ZodNativeEnum<typeof Operator> =
  Operator$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Operator$ {
  /** @deprecated use `Operator$inboundSchema` instead. */
  export const inboundSchema = Operator$inboundSchema;
  /** @deprecated use `Operator$outboundSchema` instead. */
  export const outboundSchema = Operator$outboundSchema;
}

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
export const EventFilter$inboundSchema: z.ZodType<
  EventFilter,
  z.ZodTypeDef,
  unknown
> = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  operator: Operator$inboundSchema.optional(),
  type: Type$inboundSchema.optional(),
});

/** @internal */
export type EventFilter$Outbound = {
  field?: string | undefined;
  value?: string | undefined;
  operator?: string | undefined;
  type?: string | undefined;
};

/** @internal */
export const EventFilter$outboundSchema: z.ZodType<
  EventFilter$Outbound,
  z.ZodTypeDef,
  EventFilter
> = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
  operator: Operator$outboundSchema.optional(),
  type: Type$outboundSchema.optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace EventFilter$ {
  /** @deprecated use `EventFilter$inboundSchema` instead. */
  export const inboundSchema = EventFilter$inboundSchema;
  /** @deprecated use `EventFilter$outboundSchema` instead. */
  export const outboundSchema = EventFilter$outboundSchema;
  /** @deprecated use `EventFilter$Outbound` instead. */
  export type Outbound = EventFilter$Outbound;
}

export function eventFilterToJSON(eventFilter: EventFilter): string {
  return JSON.stringify(EventFilter$outboundSchema.parse(eventFilter));
}

export function eventFilterFromJSON(
  jsonString: string,
): SafeParseResult<EventFilter, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => EventFilter$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'EventFilter' from JSON`,
  );
}
