import { HoneyHiveLangChainTracer } from ".";
import { HoneyHive } from './sdk';
import * as Components from "../models/components/index.js";
import * as operations from "../models/operations/index.js";

type EvaluatingCallbackFunction = (input: Record<string, any>, tracer: HoneyHiveLangChainTracer) => Record<string, any> | string | undefined;

interface EvaluationInput {
    apiKey: string;
    project: string;
    name: string;
    datasetId?: string;
    queryList?: Record<string, any>[];
}

class Evaluation {
    private hhai: HoneyHive;
    private apiKey: string;
    private project: string;
    private evalName: string;
    private datasetId?: string | undefined;
    private evaluationSessionIds: string[] = [];
    private evalRun?: Components.EvaluationRun | undefined;
    private dataset?: any;
    private queryList?: Record<string, any>[] | undefined;
    private tracer: HoneyHiveLangChainTracer
    private runs: number;

    constructor(
        input: EvaluationInput
    ) {

        this.apiKey = input.apiKey;
        this.project = input.project;
        this.evalName = input.name;
        this.datasetId = input.datasetId;
        this.queryList = input.queryList;
        this.runs = 0;

        this.validateRequirements();

        this.hhai = new HoneyHive({ bearerAuth: this.apiKey });
        this.tracer = this.initializeHoneyHiveTracer();
    }

    private initializeHoneyHiveTracer(): HoneyHiveLangChainTracer {
        const config = {
            project: this.project,
            apiKey: this.apiKey,
            sessionName: this.evalName
        };
        return new HoneyHiveLangChainTracer(config);
    }

    private validateRequirements(): void {
        if (!this.apiKey) {
            throw new Error("Honeyhive API key not found. Please set 'apiKey' to initiate Honeyhive Tracer. Cannot run Evaluation");
        }
        if (!this.project) {
            throw new Error("Honeyhive Project not found. Please set 'project' to initiate Honeyhive Tracer. Cannot run Evaluation");
        }
    }

    private async loadDataset(): Promise<any> {
        if (!this.datasetId) return null;
        try {
            const dataset = await this.hhai.datasets.getDatasets(
                this.project,
                operations.Type.Evaluation,
                this.datasetId,
            );
            if (dataset && dataset.testcases && dataset.testcases.length > 0) {
                return dataset.testcases[0];
            }
        } catch (error) {
            console.log(error);
            throw new Error(`No dataset found with id - ${this.datasetId} for project - ${this.project}`);
        }
        return null;
    }

    private async setupEval(): Promise<void> {
        const evalRun = await this.hhai.runs.createRun({
            project: this.project,
            name: this.evalName,
            datasetId: this.datasetId,
            eventIds: [],
        });
        this.evalRun = evalRun;
    }

    private async getInputs(runIter: number): Promise<Record<string, any> | undefined> {
        if (this.dataset && this.dataset.datapoints && this.dataset.datapoints.length > 0) {
            try {
                const datapointId: string = this.dataset.datapoints[runIter];
                const datapointResponse = await this.hhai.datapoints.getDatapoint(datapointId);
                return datapointResponse.datapoint?.[0]?.inputs;
            } catch (error) {
                console.error(`Error getting datapoint: ${error}`);
            }
        } else if (this.queryList) {
            return this.queryList[runIter];
        }
        return undefined;
    }

    private async initializeTracerSession(): Promise<void> {
        await this.tracer.startNewSession()
    }

    private addTraceMetadata(runIter: number, inputs?: Record<string, any>, evaluationOutput?: any): void {
        try {
            const tracingMetadata: Record<string, any> = {
                run_id: this.evalRun!.runId,
                inputs: inputs
            };
            if (this.dataset) {
                tracingMetadata['datapoint_id'] = this.dataset.datapoints[runIter];
                tracingMetadata['dataset_id'] = this.datasetId;
            }
            if (evaluationOutput) {
                tracingMetadata['outputs'] = evaluationOutput;
            }

            this.hhai.events.updateEvent({
                eventId: this.tracer.getSessionId(),
                metadata: tracingMetadata
            });
        } catch (error) {
            console.error(`Error adding trace metadata: ${error}`);
        }
    }

    private async executeEachRun(runIter: number, callback: EvaluatingCallbackFunction) {
        const inputs = await this.getInputs(runIter);
        await this.initializeTracerSession();

        const finalState = await callback(inputs || {}, this.tracer);

        const finalContent = (finalState as { content: string })?.content;
        this.addTraceMetadata(runIter, inputs, finalContent);
        this.evaluationSessionIds.push(this.tracer.getSessionId());
    }

    private async windup(): Promise<void> {
        try {
            if (this.evalRun && typeof this.evalRun.runId === 'string') {
                await this.hhai.runs.updateRun(
                    this.evalRun.runId,
                    {
                        eventIds: this.evaluationSessionIds,
                        status: "completed"
                    }
                );
            }
        } catch (error) {
            console.warn("Warning: Unable to mark evaluation as `Completed`");
        }
    }

    public run(callback: EvaluatingCallbackFunction): void {
        // Using a self-executing async function to run the async operations
        (async () => {
            try {
                this.dataset = await this.loadDataset();
                this.runs = this.dataset ? this.dataset.datapoints.length :
                    this.queryList ? this.queryList.length : 0;
                console.log("Number of runs", this.runs);

                await this.setupEval();

                for (let runIter = 0; runIter < this.runs; runIter++) {
                    await this.executeEachRun(runIter, callback);
                }

                await this.windup();
            } catch (error) {
                console.error("Error during evaluation:", error);
            }
        })();
    }

}

export { Evaluation };

