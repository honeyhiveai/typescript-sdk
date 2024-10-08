/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { datapointsCreateDatapoint } from "../funcs/datapointsCreateDatapoint.js";
import { datapointsDeleteDatapoint } from "../funcs/datapointsDeleteDatapoint.js";
import { datapointsGetDatapoint } from "../funcs/datapointsGetDatapoint.js";
import { datapointsGetDatapoints } from "../funcs/datapointsGetDatapoints.js";
import { datapointsUpdateDatapoint } from "../funcs/datapointsUpdateDatapoint.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as components from "../models/components/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Datapoints extends ClientSDK {
  /**
   * Retrieve a list of datapoints
   */
  async getDatapoints(
    project: string,
    datapointIds?: Array<string> | undefined,
    datasetName?: string | undefined,
    options?: RequestOptions,
  ): Promise<operations.GetDatapointsResponseBody> {
    return unwrapAsync(datapointsGetDatapoints(
      this,
      project,
      datapointIds,
      datasetName,
      options,
    ));
  }

  /**
   * Create a new datapoint
   */
  async createDatapoint(
    request: components.CreateDatapointRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateDatapointResponseBody> {
    return unwrapAsync(datapointsCreateDatapoint(
      this,
      request,
      options,
    ));
  }

  /**
   * Retrieve a specific datapoint
   */
  async getDatapoint(
    id: string,
    options?: RequestOptions,
  ): Promise<operations.GetDatapointResponseBody> {
    return unwrapAsync(datapointsGetDatapoint(
      this,
      id,
      options,
    ));
  }

  /**
   * Update a specific datapoint
   */
  async updateDatapoint(
    updateDatapointRequest: components.UpdateDatapointRequest,
    id: string,
    options?: RequestOptions,
  ): Promise<void> {
    return unwrapAsync(datapointsUpdateDatapoint(
      this,
      updateDatapointRequest,
      id,
      options,
    ));
  }

  /**
   * Delete a specific datapoint
   */
  async deleteDatapoint(
    id: string,
    options?: RequestOptions,
  ): Promise<operations.DeleteDatapointResponseBody> {
    return unwrapAsync(datapointsDeleteDatapoint(
      this,
      id,
      options,
    ));
  }
}
