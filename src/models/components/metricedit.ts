/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { ClosedEnum } from "../../types/enums.js";

/**
 * Type of the metric - "custom", "model", "human" or "composite"
 */
export const MetricEditType = {
  Custom: "custom",
  Model: "model",
  Human: "human",
  Composite: "composite",
} as const;
/**
 * Type of the metric - "custom", "model", "human" or "composite"
 */
export type MetricEditType = ClosedEnum<typeof MetricEditType>;

/**
 * The data type of the metric value - "boolean", "float", "string"
 */
export const MetricEditReturnType = {
  Boolean: "boolean",
  Float: "float",
  String: "string",
} as const;
/**
 * The data type of the metric value - "boolean", "float", "string"
 */
export type MetricEditReturnType = ClosedEnum<typeof MetricEditReturnType>;

/**
 * Threshold for numeric metrics to decide passing or failing in tests
 */
export type MetricEditThreshold = {
  min?: number | undefined;
  max?: number | undefined;
};

/**
 * Type of event that the metric is set to be computed on
 */
export const MetricEditEventType = {
  Model: "model",
  Tool: "tool",
  Chain: "chain",
  Session: "session",
} as const;
/**
 * Type of event that the metric is set to be computed on
 */
export type MetricEditEventType = ClosedEnum<typeof MetricEditEventType>;

export type MetricEdit = {
  /**
   * Unique identifier of the metric
   */
  metricId: string;
  /**
   * Criteria for human or composite metrics
   */
  criteria?: string | undefined;
  /**
   * Updated name of the metric
   */
  name?: string | undefined;
  /**
   * Short description of what the metric does
   */
  description?: string | undefined;
  /**
   * Updated code block for the metric
   */
  codeSnippet?: string | undefined;
  /**
   * Updated Evaluator prompt for the metric
   */
  prompt?: string | undefined;
  /**
   * Type of the metric - "custom", "model", "human" or "composite"
   */
  type?: MetricEditType | undefined;
  /**
   * Whether to compute on all production events automatically
   */
  enabledInProd?: boolean | undefined;
  /**
   * Whether a ground truth (on metadata) is required to compute it
   */
  needsGroundTruth?: boolean | undefined;
  /**
   * The data type of the metric value - "boolean", "float", "string"
   */
  returnType?: MetricEditReturnType | undefined;
  /**
   * Threshold for numeric metrics to decide passing or failing in tests
   */
  threshold?: MetricEditThreshold | undefined;
  /**
   * Threshold for boolean metrics to decide passing or failing in tests
   */
  passWhen?: boolean | undefined;
  /**
   * Name of event that the metric is set to be computed on
   */
  eventName?: string | undefined;
  /**
   * Type of event that the metric is set to be computed on
   */
  eventType?: MetricEditEventType | undefined;
  /**
   * Provider of the model, formatted as a LiteLLM provider prefix
   */
  modelProvider?: string | undefined;
  /**
   * Name of the model, formatted as a LiteLLM model name
   */
  modelName?: string | undefined;
  /**
   * Child metrics added under composite events
   */
  childMetrics?: Array<{ [k: string]: any }> | undefined;
};

/** @internal */
export const MetricEditType$inboundSchema: z.ZodNativeEnum<
  typeof MetricEditType
> = z.nativeEnum(MetricEditType);

/** @internal */
export const MetricEditType$outboundSchema: z.ZodNativeEnum<
  typeof MetricEditType
> = MetricEditType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace MetricEditType$ {
  /** @deprecated use `MetricEditType$inboundSchema` instead. */
  export const inboundSchema = MetricEditType$inboundSchema;
  /** @deprecated use `MetricEditType$outboundSchema` instead. */
  export const outboundSchema = MetricEditType$outboundSchema;
}

/** @internal */
export const MetricEditReturnType$inboundSchema: z.ZodNativeEnum<
  typeof MetricEditReturnType
> = z.nativeEnum(MetricEditReturnType);

/** @internal */
export const MetricEditReturnType$outboundSchema: z.ZodNativeEnum<
  typeof MetricEditReturnType
> = MetricEditReturnType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace MetricEditReturnType$ {
  /** @deprecated use `MetricEditReturnType$inboundSchema` instead. */
  export const inboundSchema = MetricEditReturnType$inboundSchema;
  /** @deprecated use `MetricEditReturnType$outboundSchema` instead. */
  export const outboundSchema = MetricEditReturnType$outboundSchema;
}

/** @internal */
export const MetricEditThreshold$inboundSchema: z.ZodType<
  MetricEditThreshold,
  z.ZodTypeDef,
  unknown
> = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
});

/** @internal */
export type MetricEditThreshold$Outbound = {
  min?: number | undefined;
  max?: number | undefined;
};

/** @internal */
export const MetricEditThreshold$outboundSchema: z.ZodType<
  MetricEditThreshold$Outbound,
  z.ZodTypeDef,
  MetricEditThreshold
> = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace MetricEditThreshold$ {
  /** @deprecated use `MetricEditThreshold$inboundSchema` instead. */
  export const inboundSchema = MetricEditThreshold$inboundSchema;
  /** @deprecated use `MetricEditThreshold$outboundSchema` instead. */
  export const outboundSchema = MetricEditThreshold$outboundSchema;
  /** @deprecated use `MetricEditThreshold$Outbound` instead. */
  export type Outbound = MetricEditThreshold$Outbound;
}

/** @internal */
export const MetricEditEventType$inboundSchema: z.ZodNativeEnum<
  typeof MetricEditEventType
> = z.nativeEnum(MetricEditEventType);

/** @internal */
export const MetricEditEventType$outboundSchema: z.ZodNativeEnum<
  typeof MetricEditEventType
> = MetricEditEventType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace MetricEditEventType$ {
  /** @deprecated use `MetricEditEventType$inboundSchema` instead. */
  export const inboundSchema = MetricEditEventType$inboundSchema;
  /** @deprecated use `MetricEditEventType$outboundSchema` instead. */
  export const outboundSchema = MetricEditEventType$outboundSchema;
}

/** @internal */
export const MetricEdit$inboundSchema: z.ZodType<
  MetricEdit,
  z.ZodTypeDef,
  unknown
> = z.object({
  metric_id: z.string(),
  criteria: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  code_snippet: z.string().optional(),
  prompt: z.string().optional(),
  type: MetricEditType$inboundSchema.optional(),
  enabled_in_prod: z.boolean().optional(),
  needs_ground_truth: z.boolean().optional(),
  return_type: MetricEditReturnType$inboundSchema.optional(),
  threshold: z.lazy(() => MetricEditThreshold$inboundSchema).optional(),
  pass_when: z.boolean().optional(),
  event_name: z.string().optional(),
  event_type: MetricEditEventType$inboundSchema.optional(),
  model_provider: z.string().optional(),
  model_name: z.string().optional(),
  child_metrics: z.array(z.record(z.any())).optional(),
}).transform((v) => {
  return remap$(v, {
    "metric_id": "metricId",
    "code_snippet": "codeSnippet",
    "enabled_in_prod": "enabledInProd",
    "needs_ground_truth": "needsGroundTruth",
    "return_type": "returnType",
    "pass_when": "passWhen",
    "event_name": "eventName",
    "event_type": "eventType",
    "model_provider": "modelProvider",
    "model_name": "modelName",
    "child_metrics": "childMetrics",
  });
});

/** @internal */
export type MetricEdit$Outbound = {
  metric_id: string;
  criteria?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  code_snippet?: string | undefined;
  prompt?: string | undefined;
  type?: string | undefined;
  enabled_in_prod?: boolean | undefined;
  needs_ground_truth?: boolean | undefined;
  return_type?: string | undefined;
  threshold?: MetricEditThreshold$Outbound | undefined;
  pass_when?: boolean | undefined;
  event_name?: string | undefined;
  event_type?: string | undefined;
  model_provider?: string | undefined;
  model_name?: string | undefined;
  child_metrics?: Array<{ [k: string]: any }> | undefined;
};

/** @internal */
export const MetricEdit$outboundSchema: z.ZodType<
  MetricEdit$Outbound,
  z.ZodTypeDef,
  MetricEdit
> = z.object({
  metricId: z.string(),
  criteria: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  codeSnippet: z.string().optional(),
  prompt: z.string().optional(),
  type: MetricEditType$outboundSchema.optional(),
  enabledInProd: z.boolean().optional(),
  needsGroundTruth: z.boolean().optional(),
  returnType: MetricEditReturnType$outboundSchema.optional(),
  threshold: z.lazy(() => MetricEditThreshold$outboundSchema).optional(),
  passWhen: z.boolean().optional(),
  eventName: z.string().optional(),
  eventType: MetricEditEventType$outboundSchema.optional(),
  modelProvider: z.string().optional(),
  modelName: z.string().optional(),
  childMetrics: z.array(z.record(z.any())).optional(),
}).transform((v) => {
  return remap$(v, {
    metricId: "metric_id",
    codeSnippet: "code_snippet",
    enabledInProd: "enabled_in_prod",
    needsGroundTruth: "needs_ground_truth",
    returnType: "return_type",
    passWhen: "pass_when",
    eventName: "event_name",
    eventType: "event_type",
    modelProvider: "model_provider",
    modelName: "model_name",
    childMetrics: "child_metrics",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace MetricEdit$ {
  /** @deprecated use `MetricEdit$inboundSchema` instead. */
  export const inboundSchema = MetricEdit$inboundSchema;
  /** @deprecated use `MetricEdit$outboundSchema` instead. */
  export const outboundSchema = MetricEdit$outboundSchema;
  /** @deprecated use `MetricEdit$Outbound` instead. */
  export type Outbound = MetricEdit$Outbound;
}
