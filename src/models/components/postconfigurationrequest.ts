/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import {
  collectExtraKeys as collectExtraKeys$,
  safeParse,
} from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * Type of API calling - "chat" or "completion"
 */
export const PostConfigurationRequestCallType = {
  Chat: "chat",
  Completion: "completion",
} as const;
/**
 * Type of API calling - "chat" or "completion"
 */
export type PostConfigurationRequestCallType = ClosedEnum<
  typeof PostConfigurationRequestCallType
>;

/**
 * Response format for the model with the key "type" and value "text" or "json_object"
 */
export type PostConfigurationRequestResponseFormat = {};

export type PostConfigurationRequestSelectedFunctions = {
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
export const PostConfigurationRequestFunctionCallParams = {
  None: "none",
  Auto: "auto",
  Force: "force",
} as const;
/**
 * Function calling mode - "none", "auto" or "force"
 */
export type PostConfigurationRequestFunctionCallParams = ClosedEnum<
  typeof PostConfigurationRequestFunctionCallParams
>;

export type PostConfigurationRequestParameters = {
  /**
   * Type of API calling - "chat" or "completion"
   */
  callType: PostConfigurationRequestCallType;
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
  responseFormat?: PostConfigurationRequestResponseFormat | undefined;
  /**
   * List of functions to be called by the model, refer to OpenAI schema for more details
   */
  selectedFunctions?:
    | Array<PostConfigurationRequestSelectedFunctions>
    | undefined;
  /**
   * Function calling mode - "none", "auto" or "force"
   */
  functionCallParams?: PostConfigurationRequestFunctionCallParams | undefined;
  /**
   * Force function-specific parameters
   */
  forceFunction?: { [k: string]: any } | undefined;
  additionalProperties?: { [k: string]: any };
};

export const PostConfigurationRequestEnv = {
  Dev: "dev",
  Staging: "staging",
  Prod: "prod",
} as const;
export type PostConfigurationRequestEnv = ClosedEnum<
  typeof PostConfigurationRequestEnv
>;

export type PostConfigurationRequest = {
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
  parameters: PostConfigurationRequestParameters;
  /**
   * List of environments where the configuration is active
   */
  env?: Array<PostConfigurationRequestEnv> | undefined;
  /**
   * Details of user who created the configuration
   */
  userProperties?: { [k: string]: any } | undefined;
};

/** @internal */
export const PostConfigurationRequestCallType$inboundSchema: z.ZodNativeEnum<
  typeof PostConfigurationRequestCallType
> = z.nativeEnum(PostConfigurationRequestCallType);

/** @internal */
export const PostConfigurationRequestCallType$outboundSchema: z.ZodNativeEnum<
  typeof PostConfigurationRequestCallType
> = PostConfigurationRequestCallType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PostConfigurationRequestCallType$ {
  /** @deprecated use `PostConfigurationRequestCallType$inboundSchema` instead. */
  export const inboundSchema = PostConfigurationRequestCallType$inboundSchema;
  /** @deprecated use `PostConfigurationRequestCallType$outboundSchema` instead. */
  export const outboundSchema = PostConfigurationRequestCallType$outboundSchema;
}

/** @internal */
export const PostConfigurationRequestResponseFormat$inboundSchema: z.ZodType<
  PostConfigurationRequestResponseFormat,
  z.ZodTypeDef,
  unknown
> = z.object({});

/** @internal */
export type PostConfigurationRequestResponseFormat$Outbound = {};

/** @internal */
export const PostConfigurationRequestResponseFormat$outboundSchema: z.ZodType<
  PostConfigurationRequestResponseFormat$Outbound,
  z.ZodTypeDef,
  PostConfigurationRequestResponseFormat
> = z.object({});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PostConfigurationRequestResponseFormat$ {
  /** @deprecated use `PostConfigurationRequestResponseFormat$inboundSchema` instead. */
  export const inboundSchema =
    PostConfigurationRequestResponseFormat$inboundSchema;
  /** @deprecated use `PostConfigurationRequestResponseFormat$outboundSchema` instead. */
  export const outboundSchema =
    PostConfigurationRequestResponseFormat$outboundSchema;
  /** @deprecated use `PostConfigurationRequestResponseFormat$Outbound` instead. */
  export type Outbound = PostConfigurationRequestResponseFormat$Outbound;
}

export function postConfigurationRequestResponseFormatToJSON(
  postConfigurationRequestResponseFormat:
    PostConfigurationRequestResponseFormat,
): string {
  return JSON.stringify(
    PostConfigurationRequestResponseFormat$outboundSchema.parse(
      postConfigurationRequestResponseFormat,
    ),
  );
}

export function postConfigurationRequestResponseFormatFromJSON(
  jsonString: string,
): SafeParseResult<PostConfigurationRequestResponseFormat, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      PostConfigurationRequestResponseFormat$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PostConfigurationRequestResponseFormat' from JSON`,
  );
}

/** @internal */
export const PostConfigurationRequestSelectedFunctions$inboundSchema: z.ZodType<
  PostConfigurationRequestSelectedFunctions,
  z.ZodTypeDef,
  unknown
> = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  parameters: z.record(z.any()).optional(),
});

/** @internal */
export type PostConfigurationRequestSelectedFunctions$Outbound = {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  parameters?: { [k: string]: any } | undefined;
};

/** @internal */
export const PostConfigurationRequestSelectedFunctions$outboundSchema:
  z.ZodType<
    PostConfigurationRequestSelectedFunctions$Outbound,
    z.ZodTypeDef,
    PostConfigurationRequestSelectedFunctions
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
export namespace PostConfigurationRequestSelectedFunctions$ {
  /** @deprecated use `PostConfigurationRequestSelectedFunctions$inboundSchema` instead. */
  export const inboundSchema =
    PostConfigurationRequestSelectedFunctions$inboundSchema;
  /** @deprecated use `PostConfigurationRequestSelectedFunctions$outboundSchema` instead. */
  export const outboundSchema =
    PostConfigurationRequestSelectedFunctions$outboundSchema;
  /** @deprecated use `PostConfigurationRequestSelectedFunctions$Outbound` instead. */
  export type Outbound = PostConfigurationRequestSelectedFunctions$Outbound;
}

export function postConfigurationRequestSelectedFunctionsToJSON(
  postConfigurationRequestSelectedFunctions:
    PostConfigurationRequestSelectedFunctions,
): string {
  return JSON.stringify(
    PostConfigurationRequestSelectedFunctions$outboundSchema.parse(
      postConfigurationRequestSelectedFunctions,
    ),
  );
}

export function postConfigurationRequestSelectedFunctionsFromJSON(
  jsonString: string,
): SafeParseResult<
  PostConfigurationRequestSelectedFunctions,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      PostConfigurationRequestSelectedFunctions$inboundSchema.parse(
        JSON.parse(x),
      ),
    `Failed to parse 'PostConfigurationRequestSelectedFunctions' from JSON`,
  );
}

/** @internal */
export const PostConfigurationRequestFunctionCallParams$inboundSchema:
  z.ZodNativeEnum<typeof PostConfigurationRequestFunctionCallParams> = z
    .nativeEnum(PostConfigurationRequestFunctionCallParams);

/** @internal */
export const PostConfigurationRequestFunctionCallParams$outboundSchema:
  z.ZodNativeEnum<typeof PostConfigurationRequestFunctionCallParams> =
    PostConfigurationRequestFunctionCallParams$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PostConfigurationRequestFunctionCallParams$ {
  /** @deprecated use `PostConfigurationRequestFunctionCallParams$inboundSchema` instead. */
  export const inboundSchema =
    PostConfigurationRequestFunctionCallParams$inboundSchema;
  /** @deprecated use `PostConfigurationRequestFunctionCallParams$outboundSchema` instead. */
  export const outboundSchema =
    PostConfigurationRequestFunctionCallParams$outboundSchema;
}

/** @internal */
export const PostConfigurationRequestParameters$inboundSchema: z.ZodType<
  PostConfigurationRequestParameters,
  z.ZodTypeDef,
  unknown
> = collectExtraKeys$(
  z.object({
    call_type: PostConfigurationRequestCallType$inboundSchema,
    model: z.string(),
    hyperparameters: z.record(z.any()).optional(),
    responseFormat: z.lazy(() =>
      PostConfigurationRequestResponseFormat$inboundSchema
    ).optional(),
    selectedFunctions: z.array(
      z.lazy(() => PostConfigurationRequestSelectedFunctions$inboundSchema),
    ).optional(),
    functionCallParams: PostConfigurationRequestFunctionCallParams$inboundSchema
      .optional(),
    forceFunction: z.record(z.any()).optional(),
  }).catchall(z.any()),
  "additionalProperties",
  true,
).transform((v) => {
  return remap$(v, {
    "call_type": "callType",
  });
});

/** @internal */
export type PostConfigurationRequestParameters$Outbound = {
  call_type: string;
  model: string;
  hyperparameters?: { [k: string]: any } | undefined;
  responseFormat?: PostConfigurationRequestResponseFormat$Outbound | undefined;
  selectedFunctions?:
    | Array<PostConfigurationRequestSelectedFunctions$Outbound>
    | undefined;
  functionCallParams?: string | undefined;
  forceFunction?: { [k: string]: any } | undefined;
  [additionalProperties: string]: unknown;
};

/** @internal */
export const PostConfigurationRequestParameters$outboundSchema: z.ZodType<
  PostConfigurationRequestParameters$Outbound,
  z.ZodTypeDef,
  PostConfigurationRequestParameters
> = z.object({
  callType: PostConfigurationRequestCallType$outboundSchema,
  model: z.string(),
  hyperparameters: z.record(z.any()).optional(),
  responseFormat: z.lazy(() =>
    PostConfigurationRequestResponseFormat$outboundSchema
  ).optional(),
  selectedFunctions: z.array(
    z.lazy(() => PostConfigurationRequestSelectedFunctions$outboundSchema),
  ).optional(),
  functionCallParams: PostConfigurationRequestFunctionCallParams$outboundSchema
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
export namespace PostConfigurationRequestParameters$ {
  /** @deprecated use `PostConfigurationRequestParameters$inboundSchema` instead. */
  export const inboundSchema = PostConfigurationRequestParameters$inboundSchema;
  /** @deprecated use `PostConfigurationRequestParameters$outboundSchema` instead. */
  export const outboundSchema =
    PostConfigurationRequestParameters$outboundSchema;
  /** @deprecated use `PostConfigurationRequestParameters$Outbound` instead. */
  export type Outbound = PostConfigurationRequestParameters$Outbound;
}

export function postConfigurationRequestParametersToJSON(
  postConfigurationRequestParameters: PostConfigurationRequestParameters,
): string {
  return JSON.stringify(
    PostConfigurationRequestParameters$outboundSchema.parse(
      postConfigurationRequestParameters,
    ),
  );
}

export function postConfigurationRequestParametersFromJSON(
  jsonString: string,
): SafeParseResult<PostConfigurationRequestParameters, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      PostConfigurationRequestParameters$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PostConfigurationRequestParameters' from JSON`,
  );
}

/** @internal */
export const PostConfigurationRequestEnv$inboundSchema: z.ZodNativeEnum<
  typeof PostConfigurationRequestEnv
> = z.nativeEnum(PostConfigurationRequestEnv);

/** @internal */
export const PostConfigurationRequestEnv$outboundSchema: z.ZodNativeEnum<
  typeof PostConfigurationRequestEnv
> = PostConfigurationRequestEnv$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PostConfigurationRequestEnv$ {
  /** @deprecated use `PostConfigurationRequestEnv$inboundSchema` instead. */
  export const inboundSchema = PostConfigurationRequestEnv$inboundSchema;
  /** @deprecated use `PostConfigurationRequestEnv$outboundSchema` instead. */
  export const outboundSchema = PostConfigurationRequestEnv$outboundSchema;
}

/** @internal */
export const PostConfigurationRequest$inboundSchema: z.ZodType<
  PostConfigurationRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  project: z.string(),
  name: z.string(),
  provider: z.string(),
  parameters: z.lazy(() => PostConfigurationRequestParameters$inboundSchema),
  env: z.array(PostConfigurationRequestEnv$inboundSchema).optional(),
  user_properties: z.record(z.any()).optional(),
}).transform((v) => {
  return remap$(v, {
    "user_properties": "userProperties",
  });
});

/** @internal */
export type PostConfigurationRequest$Outbound = {
  project: string;
  name: string;
  provider: string;
  parameters: PostConfigurationRequestParameters$Outbound;
  env?: Array<string> | undefined;
  user_properties?: { [k: string]: any } | undefined;
};

/** @internal */
export const PostConfigurationRequest$outboundSchema: z.ZodType<
  PostConfigurationRequest$Outbound,
  z.ZodTypeDef,
  PostConfigurationRequest
> = z.object({
  project: z.string(),
  name: z.string(),
  provider: z.string(),
  parameters: z.lazy(() => PostConfigurationRequestParameters$outboundSchema),
  env: z.array(PostConfigurationRequestEnv$outboundSchema).optional(),
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
export namespace PostConfigurationRequest$ {
  /** @deprecated use `PostConfigurationRequest$inboundSchema` instead. */
  export const inboundSchema = PostConfigurationRequest$inboundSchema;
  /** @deprecated use `PostConfigurationRequest$outboundSchema` instead. */
  export const outboundSchema = PostConfigurationRequest$outboundSchema;
  /** @deprecated use `PostConfigurationRequest$Outbound` instead. */
  export type Outbound = PostConfigurationRequest$Outbound;
}

export function postConfigurationRequestToJSON(
  postConfigurationRequest: PostConfigurationRequest,
): string {
  return JSON.stringify(
    PostConfigurationRequest$outboundSchema.parse(postConfigurationRequest),
  );
}

export function postConfigurationRequestFromJSON(
  jsonString: string,
): SafeParseResult<PostConfigurationRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PostConfigurationRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PostConfigurationRequest' from JSON`,
  );
}
