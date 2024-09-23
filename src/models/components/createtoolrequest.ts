/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { ClosedEnum } from "../../types/enums.js";

export const CreateToolRequestType = {
  Function: "function",
  Tool: "tool",
} as const;
export type CreateToolRequestType = ClosedEnum<typeof CreateToolRequestType>;

export type CreateToolRequest = {
  /**
   * Name of the project associated with this tool
   */
  task: string;
  name: string;
  description?: string | undefined;
  /**
   * These can be function call params or plugin call params
   */
  parameters: { [k: string]: any };
  type: CreateToolRequestType;
};

/** @internal */
export const CreateToolRequestType$inboundSchema: z.ZodNativeEnum<
  typeof CreateToolRequestType
> = z.nativeEnum(CreateToolRequestType);

/** @internal */
export const CreateToolRequestType$outboundSchema: z.ZodNativeEnum<
  typeof CreateToolRequestType
> = CreateToolRequestType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateToolRequestType$ {
  /** @deprecated use `CreateToolRequestType$inboundSchema` instead. */
  export const inboundSchema = CreateToolRequestType$inboundSchema;
  /** @deprecated use `CreateToolRequestType$outboundSchema` instead. */
  export const outboundSchema = CreateToolRequestType$outboundSchema;
}

/** @internal */
export const CreateToolRequest$inboundSchema: z.ZodType<
  CreateToolRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  task: z.string(),
  name: z.string(),
  description: z.string().optional(),
  parameters: z.record(z.any()),
  type: CreateToolRequestType$inboundSchema,
});

/** @internal */
export type CreateToolRequest$Outbound = {
  task: string;
  name: string;
  description?: string | undefined;
  parameters: { [k: string]: any };
  type: string;
};

/** @internal */
export const CreateToolRequest$outboundSchema: z.ZodType<
  CreateToolRequest$Outbound,
  z.ZodTypeDef,
  CreateToolRequest
> = z.object({
  task: z.string(),
  name: z.string(),
  description: z.string().optional(),
  parameters: z.record(z.any()),
  type: CreateToolRequestType$outboundSchema,
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace CreateToolRequest$ {
  /** @deprecated use `CreateToolRequest$inboundSchema` instead. */
  export const inboundSchema = CreateToolRequest$inboundSchema;
  /** @deprecated use `CreateToolRequest$outboundSchema` instead. */
  export const outboundSchema = CreateToolRequest$outboundSchema;
  /** @deprecated use `CreateToolRequest$Outbound` instead. */
  export type Outbound = CreateToolRequest$Outbound;
}
