/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { configurationsCreateConfiguration } from "../funcs/configurationsCreateConfiguration.js";
import { configurationsDeleteConfiguration } from "../funcs/configurationsDeleteConfiguration.js";
import { configurationsGetConfigurations } from "../funcs/configurationsGetConfigurations.js";
import { configurationsUpdateConfiguration } from "../funcs/configurationsUpdateConfiguration.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as components from "../models/components/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Configurations extends ClientSDK {
  /**
   * Retrieve a list of configurations
   */
  async getConfigurations(
    project: string,
    env?: operations.Env | undefined,
    name?: string | undefined,
    options?: RequestOptions,
  ): Promise<Array<components.Configuration>> {
    return unwrapAsync(configurationsGetConfigurations(
      this,
      project,
      env,
      name,
      options,
    ));
  }

  /**
   * Create a new configuration
   */
  async createConfiguration(
    request: components.PostConfigurationRequest,
    options?: RequestOptions,
  ): Promise<void> {
    return unwrapAsync(configurationsCreateConfiguration(
      this,
      request,
      options,
    ));
  }

  /**
   * Update an existing configuration
   */
  async updateConfiguration(
    putConfigurationRequest: components.PutConfigurationRequest,
    id: string,
    options?: RequestOptions,
  ): Promise<void> {
    return unwrapAsync(configurationsUpdateConfiguration(
      this,
      putConfigurationRequest,
      id,
      options,
    ));
  }

  /**
   * Delete a configuration
   */
  async deleteConfiguration(
    id: string,
    options?: RequestOptions,
  ): Promise<void> {
    return unwrapAsync(configurationsDeleteConfiguration(
      this,
      id,
      options,
    ));
  }
}
