/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { sessionGetSession } from "../../funcs/sessionGetSession.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  sessionId: z.string(),
};

export const tool$sessionGetSession: ToolDefinition<typeof args> = {
  name: "session-get-session",
  description: `Retrieve a session`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await sessionGetSession(
      client,
      args.sessionId,
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
