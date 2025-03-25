/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { datasetsCreateDataset } from "../../funcs/datasetsCreateDataset.js";
import * as components from "../../models/components/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: components.CreateDatasetRequest$inboundSchema,
};

export const tool$datasetsCreateDataset: ToolDefinition<typeof args> = {
  name: "datasets-create-dataset",
  description: `Create a dataset`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await datasetsCreateDataset(
      client,
      args.request,
      { fetchOptions: { signal: ctx.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    const value = result.value;

    return formatResult(value, apiCall);
  },
};
