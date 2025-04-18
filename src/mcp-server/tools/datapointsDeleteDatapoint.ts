/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { datapointsDeleteDatapoint } from "../../funcs/datapointsDeleteDatapoint.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  id: z.string(),
};

export const tool$datapointsDeleteDatapoint: ToolDefinition<typeof args> = {
  name: "datapoints-delete-datapoint",
  description: `Delete a specific datapoint`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await datapointsDeleteDatapoint(
      client,
      args.id,
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
