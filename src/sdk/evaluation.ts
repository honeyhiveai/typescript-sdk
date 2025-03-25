import { HoneyHive } from "./sdk";
import { CreateRunResponse, Status } from '../models/components';
import { HoneyHiveTracer, getGitInfo } from './tracer';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

type Dict<T> = { [key: string]: T };

interface EvaluationConfig {
    apiKey?: string | undefined;
    project?: string | undefined;
    name?: string | undefined;
    suite?: string | undefined;
    function?: (...args: any[]) => any | undefined;
    dataset?: Dict<any>[] | undefined;
    evaluators?: ((...args: any[]) => any)[] | undefined;
    datasetId?: string | undefined;
    maxWorkers?: number | undefined;
    runConcurrently?: boolean | undefined;
    serverUrl?: string | undefined;
    verbose?: boolean | undefined;
    metadata?: Dict<any> | undefined;
}

const DEFAULT_CONFIG: EvaluationConfig = {
    apiKey: process.env['HH_API_KEY'],
    project: process.env['HH_PROJECT'],
    verbose: false,
    runConcurrently: false,
    maxWorkers: 10,
    evaluators: [],
}

interface EvaluationData {
    runId: string;
    datasetId: string | undefined;
    sessionIds: string[];
    status: Status;
}

interface EvaluationResult extends EvaluationData {
    toJson(): void;
    suite: string;
}

class Evaluation {
    private hhai: HoneyHive;
    private hhDataset: any | null;
    private externalDatasetId: string | undefined;
    private evaluationSessionIds: string[];
    private evalRun: CreateRunResponse | null;
    private state: Status;
    private config: EvaluationConfig;
    private function: (...args: any[]) => any;
    private name: string;
    private suite: string;
    private evaluators: ((...args: any[]) => any)[];
    private apiKey: string;
    private project: string;
    // private maxWorkers: number;
    // private runConcurrently: boolean;
    private serverUrl: string | undefined;
    // private verbose: boolean;
    private metadata: Dict<any>;
    // private disableAutoTracing: boolean;
    private datasetId: string | undefined;
    private dataset: Dict<any>[] | undefined;

    constructor(config: EvaluationConfig) {
        // Merge with defaults
        this.config = { ...DEFAULT_CONFIG, ...config };

        // Validate function first
        if (!this.config.function) {
            throw new Error("Please provide a function to evaluate.");
        }
        this.function = this.config.function;

        // Set name if not provided
        try {
            if (!this.config.name) {
                // Try to get the main module name
                const mainModule = require.main?.filename;
                if (mainModule) {
                    const moduleName = path.basename(mainModule, path.extname(mainModule));
                    this.config.name = `Eval ${moduleName}`;
                } else {
                    // Fallback to date-based naming if main module not available
                    const currentDate = new Date();
                    const currentMmDd = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}`;
                    this.config.name = `Offline Eval ${currentMmDd}`;
                }
            }
        } catch (error) {
            // Fallback in case of any error
            this.config.name = `Offline Eval`;
        }
        this.name = this.config.name;

        // Set suite if not provided
        try {
            if (!this.config.suite) {
                const stackTrace = new Error().stack;
                if (stackTrace) {
                    const callerLine = stackTrace.split('\n')[2]; // Get the caller's line
                    const match = callerLine?.match(/at\s+(.+)\s+\((.+):[\d]+:[\d]+\)/);
                    if (match && match[2]) {
                        const callerFilePath = match[2];
                        const dirName = path.dirname(callerFilePath).split(path.sep).pop();
                        this.config.suite = dirName || "default";
                    }
                }
            }
        } catch (error) {
            this.config.suite = "default";
        }
        this.suite = this.config.suite || "default";

        // Set core properties
        this.apiKey = this.config.apiKey || process.env['HH_API_KEY'] || '';
        this.project = this.config.project || process.env['HH_PROJECT'] || '';
        this.evaluators = this.config.evaluators || [];
        this.state = Status.Pending;
        // this.maxWorkers = this.config.maxWorkers || 10;
        // this.runConcurrently = this.config.runConcurrently || false;
        this.serverUrl = this.config.serverUrl;
        // this.verbose = this.config.verbose || false;
        this.metadata = this.config.metadata || {};
        // this.disableAutoTracing = true;
        this.evalRun = null;
        this.evaluationSessionIds = [];

        // Validate requirements before proceeding
        this.validateRequirements();

        // Initialize HoneyHive client
        this.hhai = new HoneyHive({ 
            bearerAuth: this.apiKey,
            ...(this.serverUrl && { serverUrl: this.serverUrl })
        });

        // Setup dataset related properties
        this.datasetId = this.config.datasetId;
        this.dataset = this.config.dataset;
        this.hhDataset = null; // Will be loaded later via loadDataset()
        
        // Generate external dataset ID if dataset is provided
        this.externalDatasetId = this.config.dataset ? 
            this.generateHash(JSON.stringify(this.config.dataset)) : 
            undefined;

        // Add git information to metadata if available
        const gitInfo = getGitInfo();
        if (gitInfo && !gitInfo.error) {
            this.metadata['git'] = gitInfo;
        }

        // The isEvaluation property is set during tracer initialization
    }

    private generateHash(inputString: string): string {
        const hashObject = crypto.createHash('md5');
        hashObject.update(inputString, 'utf-8');
        return `EXT-${hashObject.digest('hex').slice(0, 24)}`;
    }

    private validateRequirements(): void {
        if (!this.config.apiKey) {
            throw new Error("Honeyhive API key not found. Please set 'apiKey' to initiate Honeyhive Tracer. Cannot run Evaluation");
        }
        if (!this.config.project) {
            throw new Error("Honeyhive Project not found. Please set 'project' to initiate Honeyhive Tracer. Cannot run Evaluation");
        }
        if (!this.config.name) {
            throw new Error("Evaluation name not found. Please set 'name' to initiate Honeyhive Evaluation.");
        }
        if (!this.config.datasetId && !this.config.dataset) {
            throw new Error("No valid 'datasetId' or 'dataset' found. Please provide one to iterate the evaluation over.");
        }
        if (this.config.dataset !== undefined) {
            if (!Array.isArray(this.config.dataset)) {
                throw new Error("Dataset must be a list");
            }
            if (!this.config.dataset.every(item => typeof item === 'object' && item !== null)) {
                throw new Error("All items in dataset must be dictionaries");
            }
        }
    }

    private async loadDataset(): Promise<any> {
        if (!this.datasetId) {
            return null;
        }
        try {
            const dataset = await this.hhai.datasets.getDatasets(
                this.project,
                undefined,
                this.datasetId
            );
            if (dataset && dataset.testcases && dataset.testcases.length > 0) {
                return dataset.testcases[0];
            }
        } catch (error) {
            throw new Error(`No dataset found with id - ${this.datasetId} for project - ${this.project}`);
        }
        return null;
    }

    private async getDatapoint(run_id: number): Promise<{inputs: any, groundTruth: any} | null> {
        if (this.hhDataset && this.hhDataset.datapoints && this.hhDataset.datapoints.length > 0) {
            try {
                const datapoint_id = this.hhDataset.datapoints[run_id];
                const datapoint_response = await this.hhai.datapoints.getDatapoint(datapoint_id);
                const datapointList = datapoint_response.datapoint;
                if (datapointList && datapointList[0]) {
                    return {
                        inputs: datapointList[0].inputs || {},
                        groundTruth: datapointList[0].groundTruth || {}
                    };
                }
            } catch (error) {
                console.error(`Error getting datapoint: ${error}`);
            }
        } else if (this.dataset && this.dataset[run_id]) {
            const datapoint = this.dataset[run_id];
            const result = {
                inputs: datapoint['inputs'] || {},
                groundTruth: datapoint['ground_truths'] || {}
            };
            return result;
        }
        return null;
    }

    private async initializeTracer(inputs: any): Promise<HoneyHiveTracer> {
        try {
            return await HoneyHiveTracer.init({
                apiKey: this.apiKey,
                project: this.project,
                source: 'evaluation',
                sessionName: this.name,
                inputs: inputs ? inputs : {},
                isEvaluation: true,
                ...(this.serverUrl && { serverUrl: this.serverUrl })
            });
        } catch (error) {
            throw new Error("Unable to initiate Honeyhive Tracer. Cannot run Evaluation");
        }
    }

    private async runEvaluation(tracer: HoneyHiveTracer, inputs: any, ground_truths?: any): Promise<any> {
        try {
            let output = {};
            let promiseResolve: () => void;
            const promise = new Promise<void>((resolve) => {
                promiseResolve = resolve!;
            });

            tracer.trace(() => {
                (async () => {
                    try {
                        if (!this.function) {
                            throw new Error("No evaluation function provided");
                        }
                        const agentResponse = await this.function(inputs, ground_truths);
                        output = agentResponse;
                        console.log(agentResponse);
                    } finally {
                        promiseResolve();
                    }
                })();
            });

            await promise;
            await tracer.flush();

            return output;
        } catch (error) {
            console.error(`Error in evaluation function: ${error}`);
            return null;
        }
    }

    private async runEvaluators(inputs: any, evaluation_output: any, ground_truths?: any): Promise<Dict<any>> {
        const metrics: Dict<any> = {};
        if (this.evaluators) {
            for (let index = 0; index < this.evaluators.length; index++) {
                try {
                    const evaluator: ((...args: any[]) => Promise<any>) | undefined = this.evaluators[index];
                    if (!evaluator) continue;
                    
                    const evaluator_result = await evaluator(evaluation_output, inputs, ground_truths);
                    if (evaluator_result && typeof evaluator_result === 'object') {
                        Object.assign(metrics, evaluator_result);
                        continue;
                    }
                    const evaluator_name = evaluator.name || `evaluator_${index}`;
                    metrics[evaluator_name] = evaluator_result;
                } catch (error) {
                    console.error(`Error in evaluator: ${error}`);
                }
            }
        }
        return metrics;
    }

    private async addTraceMetadata(tracer: HoneyHiveTracer, output: any, metrics: Dict<any>, run_id: number): Promise<void> {
        try {
            if (this.evalRun && this.evalRun?.runId) {
                const tracing_metadata: Dict<any> = {
                    runId: this.evalRun.runId,
                };
                if (this.hhDataset) {
                    tracing_metadata['datapointId'] = this.hhDataset.datapoints[run_id];
                    tracing_metadata['datasetId'] = this.datasetId;
                }
                if (this.externalDatasetId && this.dataset) {
                    tracing_metadata['datapointId'] = this.generateHash(JSON.stringify(this.dataset[run_id]));
                    tracing_metadata['datasetId'] = this.externalDatasetId;
                }
                if (typeof output !== 'object') {
                    output = { output };
                }
                await tracer.enrichSession({
                    metadata: tracing_metadata,
                    outputs: output,
                    metrics: metrics
                });
            }
        } catch (error) {
            console.error(`Error adding trace metadata: ${error}`);
        }
    }

    private async setupEvaluation(): Promise<void> {
        const metadata: { [key: string]: any } = this.metadata;
        
        const gitInfo = getGitInfo();
        if (gitInfo && !gitInfo.error) {
            metadata['git'] = gitInfo;
        }
        
        const eval_run = await this.hhai.experiments.createRun({
            project: this.project,
            name: this.name,
            datasetId: this.datasetId || this.externalDatasetId,
            eventIds: [],
            status: this.state,
            metadata: Object.keys(metadata).length > 0 ? metadata : undefined
        });
        this.evalRun = eval_run;
    }

    private async windupEvaluation(): Promise<void> {
        try {
            this.state = Status.Completed;
            if (this.evalRun && this.evalRun.runId) {
                await this.hhai.experiments.updateRun(
                    {
                        eventIds: this.evaluationSessionIds,
                        status: this.state
                    },
                    this.evalRun.runId,
                );
            }
        } catch (error) {
            console.warn("Warning: Unable to mark evaluation as `Completed`");
        }
    }

    public async evaluate(): Promise<EvaluationResult> {
        this.validateRequirements();

        const suite = this.suite;

        this.hhDataset = await this.loadDataset();
        const runs = this.hhDataset ? this.hhDataset.datapoints.length : (this.dataset ? this.dataset.length : 0);

        await this.setupEvaluation();

        for (let run_id = 0; run_id < runs; run_id++) {
            const datapoint = await this.getDatapoint(run_id);
            const tracer = await this.initializeTracer(datapoint?.inputs);

            const output = await this.runEvaluation(tracer, datapoint?.inputs, datapoint?.groundTruth);
            const metrics = await this.runEvaluators(datapoint?.inputs, output, datapoint?.groundTruth);

            await this.addTraceMetadata(tracer, output, metrics, run_id);

            if (tracer.sessionId)
                this.evaluationSessionIds.push(tracer.sessionId);
        }

        await this.windupEvaluation();

        const result: EvaluationResult = {
            runId: this.evalRun?.runId || '',
            datasetId: this.datasetId || this.externalDatasetId,
            sessionIds: this.evaluationSessionIds,
            status: this.state,
            suite,
            toJson(): void {
                const data: EvaluationData = {
                    runId: this.runId,
                    datasetId: this.datasetId,
                    sessionIds: this.sessionIds,
                    status: this.status
                };
                fs.writeFileSync(`${this.suite}.json`, JSON.stringify(data, null, 4));
            }
        };
        return result;
    }
}

export async function evaluate(config: EvaluationConfig): Promise<EvaluationResult> {
    const evaluation = new Evaluation(config);
    return evaluation.evaluate();
}

export type { EvaluationConfig, EvaluationResult };
