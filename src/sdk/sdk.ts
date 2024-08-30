/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { ClientSDK } from "../lib/sdks.js";
import { Configurations } from "./configurations.js";
import { Datapoints } from "./datapoints.js";
import { Datasets } from "./datasets.js";
import { Events } from "./events.js";
import { Metrics } from "./metrics.js";
import { Projects } from "./projects.js";
import { Runs } from "./runs.js";
import { Session } from "./session.js";
import { Tools } from "./tools.js";

export class HoneyHive extends ClientSDK {
    private _session?: Session;
    get session(): Session {
        return (this._session ??= new Session(this.options$));
    }

    private _events?: Events;
    get events(): Events {
        return (this._events ??= new Events(this.options$));
    }

    private _metrics?: Metrics;
    get metrics(): Metrics {
        return (this._metrics ??= new Metrics(this.options$));
    }

    private _tools?: Tools;
    get tools(): Tools {
        return (this._tools ??= new Tools(this.options$));
    }

    private _datapoints?: Datapoints;
    get datapoints(): Datapoints {
        return (this._datapoints ??= new Datapoints(this.options$));
    }

    private _datasets?: Datasets;
    get datasets(): Datasets {
        return (this._datasets ??= new Datasets(this.options$));
    }

    private _projects?: Projects;
    get projects(): Projects {
        return (this._projects ??= new Projects(this.options$));
    }

    private _runs?: Runs;
    get runs(): Runs {
        return (this._runs ??= new Runs(this.options$));
    }

    private _configurations?: Configurations;
    get configurations(): Configurations {
        return (this._configurations ??= new Configurations(this.options$));
    }
}
