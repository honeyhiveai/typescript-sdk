/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { sessionGetSession } from "../funcs/sessionGetSession.js";
import { sessionStartSession } from "../funcs/sessionStartSession.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as components from "../models/components/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Session extends ClientSDK {
    /**
     * Start a new session
     */
    async startSession(
        request: operations.StartSessionRequestBody,
        options?: RequestOptions
    ): Promise<operations.StartSessionResponseBody> {
        return unwrapAsync(sessionStartSession(this, request, options));
    }

    /**
     * Retrieve a session
     */
    async getSession(sessionId: string, options?: RequestOptions): Promise<components.Event> {
        return unwrapAsync(sessionGetSession(this, sessionId, options));
    }
}
