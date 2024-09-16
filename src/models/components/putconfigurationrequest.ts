/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { collectExtraKeys as collectExtraKeys$ } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";

/**
 * Type of API calling - "chat" or "completion"
 */
export const PutConfigurationRequestCallType = {
  Chat: "chat",
  Completion: "completion",
} as const;
/**
 * Type of API calling - "chat" or "completion"
 */
export type PutConfigurationRequestCallType = ClosedEnum<
  typeof PutConfigurationRequestCallType
>;

/**
 * Response format for the model with the key "type" and value "text" or "json_object"
 */
export type PutConfigurationRequestResponseFormat = {};

export type PutConfigurationRequestSelectedFunctions = {
  /**
   * UUID of the function
   */
  id?: string | undefined;
  /**
   * Name of the function
   */
  name?: string | undefined;
  /**
   * Description of the function
   */
  description?: string | undefined;
  /**
   * Parameters for the function
   */
  parameters?: { [k: string]: any } | undefined;
};

/**
 * Function calling mode - "none", "auto" or "force"
 */
export const PutConfigurationRequestFunctionCallParams = {
  None: "none",
  Auto: "auto",
  Force: "force",
} as const;
/**
 * Function calling mode - "none", "auto" or "force"
 */
export type PutConfigurationRequestFunctionCallParams = ClosedEnum<
  typeof PutConfigurationRequestFunctionCallParams
>;

export type PutConfigurationRequestParameters = {
  /**
   * Type of API calling - "chat" or "completion"
   */
  callType: PutConfigurationRequestCallType;
  /**
   * Model unique name
   */
  model: string;
  /**
   * Model-specific hyperparameters
   */
  hyperparameters?: { [k: string]: any } | undefined;
  /**
   * Response format for the model with the key "type" and value "text" or "json_object"
   */
  responseFormat?: PutConfigurationRequestResponseFormat | undefined;
  /**
   * List of functions to be called by the model, refer to OpenAI schema for more details
   */
  selectedFunctions?:
    | Array<PutConfigurationRequestSelectedFunctions>
    | undefined;
  /**
   * Function calling mode - "none", "auto" or "force"
   */
  functionCallParams?: PutConfigurationRequestFunctionCallParams | undefined;
  /**
   * Force function-specific parameters
   */
  forceFunction?: { [k: string]: any } | undefined;
  additionalProperties: { [k: string]: any };
};

export const PutConfigurationRequestEnv = {
  Dev: "dev",
  Staging: "staging",
  Prod: "prod",
} as const;
export type PutConfigurationRequestEnv = ClosedEnum<
  typeof PutConfigurationRequestEnv
>;

/**
 * Type of the configuration - "LLM" or "pipeline" - "LLM" by default
 */
export const PutConfigurationRequestType = {
  Llm: "LLM",
  Pipeline: "pipeline",
} as const;
/**
 * Type of the configuration - "LLM" or "pipeline" - "LLM" by default
 */
export type PutConfigurationRequestType = ClosedEnum<
  typeof PutConfigurationRequestType
>;

export type PutConfigurationRequest = {
  /**
   * Name of the project to which this configuration belongs
   */
  project: string;
  /**
   * Name of the configuration
   */
  name: string;
  /**
   * Name of the provider - "openai", "anthropic", etc.
   */
  provider: string;
  parameters: PutConfigurationRequestParameters;
  /**
   * List of environments where the configuration is active
   */
  env?: Array<PutConfigurationRequestEnv> | undefined;
  /**
   * Type of the configuration - "LLM" or "pipeline" - "LLM" by default
   */
  type?: PutConfigurationRequestType | undefined;
  /**
   * Details of user who created the configuration
   */
  userProperties?: { [k: string]: any } | undefined;
};

/** @internal */
export const PutConfigurationRequestCallType$inboundSchema: z.ZodNativeEnum<
  typeof PutConfigurationRequestCallType
> = z.nativeEnum(PutConfigurationRequestCallType);

/** @internal */
export const PutConfigurationRequestCallType$outboundSchema: z.ZodNativeEnum<
  typeof PutConfigurationRequestCallType
> = PutConfigurationRequestCallType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PutConfigurationRequestCallType$ {
  /** @deprecated use `PutConfigurationRequestCallType$inboundSchema` instead. */
  export const inboundSchema = PutConfigurationRequestCallType$inboundSchema;
  /** @deprecated use `PutConfigurationRequestCallType$outboundSchema` instead. */
  export const outboundSchema = PutConfigurationRequestCallType$outboundSchema;
}

/** @internal */
export const PutConfigurationRequestResponseFormat$inboundSchema: z.ZodType<
  PutConfigurationRequestResponseFormat,
  z.ZodTypeDef,
  unknown
> = z.object({});

/** @internal */
export type PutConfigurationRequestResponseFormat$Outbound = {};

/** @internal */
export const PutConfigurationRequestResponseFormat$outboundSchema: z.ZodType<
  PutConfigurationRequestResponseFormat$Outbound,
  z.ZodTypeDef,
  PutConfigurationRequestResponseFormat
> = z.object({});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PutConfigurationRequestResponseFormat$ {
  /** @deprecated use `PutConfigurationRequestResponseFormat$inboundSchema` instead. */
  export const inboundSchema =
    PutConfigurationRequestResponseFormat$inboundSchema;
  /** @deprecated use `PutConfigurationRequestResponseFormat$outboundSchema` instead. */
  export const outboundSchema =
    PutConfigurationRequestResponseFormat$outboundSchema;
  /** @deprecated use `PutConfigurationRequestResponseFormat$Outbound` instead. */
  export type Outbound = PutConfigurationRequestResponseFormat$Outbound;
}

/** @internal */
export const PutConfigurationRequestSelectedFunctions$inboundSchema: z.ZodType<
  PutConfigurationRequestSelectedFunctions,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  parameters: z.record(z.any()).optional(),
});

/** @internal */
export type PutConfigurationRequestSelectedFunctions$Outbound = {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  parameters?: { [k: string]: any } | undefined;
};

/** @internal */
export const PutConfigurationRequestSelectedFunctions$outboundSchema: z.ZodType<
  PutConfigurationRequestSelectedFunctions$Outbound,
  z.ZodTypeDef,
  PutConfigurationRequestSelectedFunctions
> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  parameters: z.record(z.any()).optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PutConfigurationRequestSelectedFunctions$ {
  /** @deprecated use `PutConfigurationRequestSelectedFunctions$inboundSchema` instead. */
  export const inboundSchema =
    PutConfigurationRequestSelectedFunctions$inboundSchema;
  /** @deprecated use `PutConfigurationRequestSelectedFunctions$outboundSchema` instead. */
  export const outboundSchema =
    PutConfigurationRequestSelectedFunctions$outboundSchema;
  /** @deprecated use `PutConfigurationRequestSelectedFunctions$Outbound` instead. */
  export type Outbound = PutConfigurationRequestSelectedFunctions$Outbound;
}

/** @internal */
export const PutConfigurationRequestFunctionCallParams$inboundSchema:
  z.ZodNativeEnum<typeof PutConfigurationRequestFunctionCallParams> = z
    .nativeEnum(PutConfigurationRequestFunctionCallParams);

/** @internal */
export const PutConfigurationRequestFunctionCallParams$outboundSchema:
  z.ZodNativeEnum<typeof PutConfigurationRequestFunctionCallParams> =
    PutConfigurationRequestFunctionCallParams$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PutConfigurationRequestFunctionCallParams$ {
  /** @deprecated use `PutConfigurationRequestFunctionCallParams$inboundSchema` instead. */
  export const inboundSchema =
    PutConfigurationRequestFunctionCallParams$inboundSchema;
  /** @deprecated use `PutConfigurationRequestFunctionCallParams$outboundSchema` instead. */
  export const outboundSchema =
    PutConfigurationRequestFunctionCallParams$outboundSchema;
}

/** @internal */
export const PutConfigurationRequestParameters$inboundSchema: z.ZodType<
  PutConfigurationRequestParameters,
  z.ZodTypeDef,
  unknown
> = collectExtraKeys$(
  z.object({
    call_type: PutConfigurationRequestCallType$inboundSchema,
    model: z.string(),
    hyperparameters: z.record(z.any()).optional(),
    responseFormat: z.lazy(() =>
      PutConfigurationRequestResponseFormat$inboundSchema
    ).optional(),
    selectedFunctions: z.array(
      z.lazy(() => PutConfigurationRequestSelectedFunctions$inboundSchema),
    ).optional(),
    functionCallParams: PutConfigurationRequestFunctionCallParams$inboundSchema
      .optional(),
    forceFunction: z.record(z.any()).optional(),
  }).catchall(z.any()),
  "additionalProperties",
).transform((v) => {
  return remap$(v, {
    "call_type": "callType",
  });
});

/** @internal */
export type PutConfigurationRequestParameters$Outbound = {
  call_type: string;
  model: string;
  hyperparameters?: { [k: string]: any } | undefined;
  responseFormat?: PutConfigurationRequestResponseFormat$Outbound | undefined;
  selectedFunctions?:
    | Array<PutConfigurationRequestSelectedFunctions$Outbound>
    | undefined;
  functionCallParams?: string | undefined;
  forceFunction?: { [k: string]: any } | undefined;
  [additionalProperties: string]: unknown;
};

/** @internal */
export const PutConfigurationRequestParameters$outboundSchema: z.ZodType<
  PutConfigurationRequestParameters$Outbound,
  z.ZodTypeDef,
  PutConfigurationRequestParameters
> = z.object({
  callType: PutConfigurationRequestCallType$outboundSchema,
  model: z.string(),
  hyperparameters: z.record(z.any()).optional(),
  responseFormat: z.lazy(() =>
    PutConfigurationRequestResponseFormat$outboundSchema
  ).optional(),
  selectedFunctions: z.array(
    z.lazy(() => PutConfigurationRequestSelectedFunctions$outboundSchema),
  ).optional(),
  functionCallParams: PutConfigurationRequestFunctionCallParams$outboundSchema
    .optional(),
  forceFunction: z.record(z.any()).optional(),
  additionalProperties: z.record(z.any()),
}).transform((v) => {
  return {
    ...v.additionalProperties,
    ...remap$(v, {
      callType: "call_type",
      additionalProperties: null,
    }),
  };
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PutConfigurationRequestParameters$ {
  /** @deprecated use `PutConfigurationRequestParameters$inboundSchema` instead. */
  export const inboundSchema = PutConfigurationRequestParameters$inboundSchema;
  /** @deprecated use `PutConfigurationRequestParameters$outboundSchema` instead. */
  export const outboundSchema =
    PutConfigurationRequestParameters$outboundSchema;
  /** @deprecated use `PutConfigurationRequestParameters$Outbound` instead. */
  export type Outbound = PutConfigurationRequestParameters$Outbound;
}

/** @internal */
export const PutConfigurationRequestEnv$inboundSchema: z.ZodNativeEnum<
  typeof PutConfigurationRequestEnv
> = z.nativeEnum(PutConfigurationRequestEnv);

/** @internal */
export const PutConfigurationRequestEnv$outboundSchema: z.ZodNativeEnum<
  typeof PutConfigurationRequestEnv
> = PutConfigurationRequestEnv$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PutConfigurationRequestEnv$ {
  /** @deprecated use `PutConfigurationRequestEnv$inboundSchema` instead. */
  export const inboundSchema = PutConfigurationRequestEnv$inboundSchema;
  /** @deprecated use `PutConfigurationRequestEnv$outboundSchema` instead. */
  export const outboundSchema = PutConfigurationRequestEnv$outboundSchema;
}

/** @internal */
export const PutConfigurationRequestType$inboundSchema: z.ZodNativeEnum<
  typeof PutConfigurationRequestType
> = z.nativeEnum(PutConfigurationRequestType);

/** @internal */
export const PutConfigurationRequestType$outboundSchema: z.ZodNativeEnum<
  typeof PutConfigurationRequestType
> = PutConfigurationRequestType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PutConfigurationRequestType$ {
  /** @deprecated use `PutConfigurationRequestType$inboundSchema` instead. */
  export const inboundSchema = PutConfigurationRequestType$inboundSchema;
  /** @deprecated use `PutConfigurationRequestType$outboundSchema` instead. */
  export const outboundSchema = PutConfigurationRequestType$outboundSchema;
}

/** @internal */
export const PutConfigurationRequest$inboundSchema: z.ZodType<
  PutConfigurationRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  project: z.string(),
  name: z.string(),
  provider: z.string(),
  parameters: z.lazy(() => PutConfigurationRequestParameters$inboundSchema),
  env: z.array(PutConfigurationRequestEnv$inboundSchema).optional(),
  type: PutConfigurationRequestType$inboundSchema.optional(),
  user_properties: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    "user_properties": "userProperties",
  });
});

/** @internal */
export type PutConfigurationRequest$Outbound = {
  project: string;
  name: string;
  provider: string;
  parameters: PutConfigurationRequestParameters$Outbound;
  env?: Array<string> | undefined;
  type?: string | undefined;
  user_properties?: { [k: string]: any } | undefined;
};

/** @internal */
export const PutConfigurationRequest$outboundSchema: z.ZodType<
  PutConfigurationRequest$Outbound,
  z.ZodTypeDef,
  PutConfigurationRequest
> = z.object({
  project: z.string(),
  name: z.string(),
  provider: z.string(),
  parameters: z.lazy(() => PutConfigurationRequestParameters$outboundSchema),
  env: z.array(PutConfigurationRequestEnv$outboundSchema).optional(),
  type: PutConfigurationRequestType$outboundSchema.optional(),
  userProperties: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    userProperties: "user_properties",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PutConfigurationRequest$ {
  /** @deprecated use `PutConfigurationRequest$inboundSchema` instead. */
  export const inboundSchema = PutConfigurationRequest$inboundSchema;
  /** @deprecated use `PutConfigurationRequest$outboundSchema` instead. */
  export const outboundSchema = PutConfigurationRequest$outboundSchema;
  /** @deprecated use `PutConfigurationRequest$Outbound` instead. */
  export type Outbound = PutConfigurationRequest$Outbound;
}
