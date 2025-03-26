import { HoneyHive } from "./sdk";
import { CreateRunResponse, Dataset, Status } from '../models/components';
import { HoneyHiveTracer, getGitInfo } from './tracer';
import * as crypto from 'crypto';
import * as path from 'path';
import assert from "assert";

type Dict<T> = { [key: string]: T };

interface EvaluationConfig {
    apiKey?: string | undefined;
    project?: string | undefined;
    name?: string | undefined;
    suite?: string | undefined;
    function?: (...args: any[]) => any | undefined;
    evaluators?: ((...args: any[]) => any)[] | undefined;
    dataset?: Dict<any>[] | undefined;
    datasetId?: string | undefined;
    maxWorkers?: number | undefined;
    runConcurrently?: boolean | undefined;
    serverUrl?: string | undefined;
    verbose?: boolean | undefined;
    disableHttpTracing?: boolean | undefined;
    metadata?: Dict<any> | undefined;
    instrumentModules?: Record<string, any> | undefined;
}

const DEFAULT_CONFIG: EvaluationConfig = {
    apiKey: process.env['HH_API_KEY'],
    project: process.env['HH_PROJECT'],
    verbose: false,
    runConcurrently: true,
    maxWorkers: 10,
    evaluators: [],
    disableHttpTracing: false,
    instrumentModules: {}
}

interface EvaluatorResult {
    metrics: Dict<any>;
    metadata: Dict<any>;
}

interface EvaluationResult {
    runId: string;
    datasetId: string | undefined;
    sessionIds: string[];
    status: Status;
    suite: string;
    stats: Dict<any>;
    data: Dict<any>;
}

class Evaluation {
    private hhai: HoneyHive;
    private evaluationSessionIds: string[];
    private evalRun: CreateRunResponse | null;
    private status: Status;
    private config: EvaluationConfig;
    private function: (...args: any[]) => any;
    private name: string;
    private suite: string;
    private evaluators: ((...args: any[]) => any)[];
    private apiKey: string | undefined;
    private project: string | undefined;
    private maxWorkers: number;
    private runConcurrently: boolean;
    private serverUrl: string | undefined;
    private verbose: boolean;
    private metadata: Dict<any>;
    private disableHttpTracing: boolean;
    private datasetId: string | undefined;
    private dataset: Dict<any>[] | Dataset | undefined;
    private useHhDataset: boolean;
    public evalResult: EvaluationResult | undefined;
    private instrumentModules: Record<string, any>;

    private constructor(config: EvaluationConfig) {
        // Merge with t
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
        this.apiKey = this.config.apiKey || process.env['HH_API_KEY'] || undefined;
        this.project = this.config.project || process.env['HH_PROJECT'] || undefined;
        this.evaluators = this.config.evaluators || [];
        this.status = Status.Pending;
        this.maxWorkers = this.config.maxWorkers || parseInt(process.env['HH_MAX_WORKERS'] || '10');
        this.runConcurrently = this.config.runConcurrently || false;
        this.serverUrl = this.config.serverUrl || process.env['HH_API_URL'] || undefined;
        this.verbose = this.config.verbose || false;
        this.metadata = this.config.metadata || {};
        this.disableHttpTracing = this.config.disableHttpTracing || false;
        this.evalRun = null;
        this.evaluationSessionIds = [];
        this.instrumentModules = this.config.instrumentModules || {};

        // Setup dataset related properties
        this.datasetId = this.config.datasetId;
        this.dataset = this.config.dataset;
        
        // Validate that only one of datasetId or dataset is provided
        if (!this.datasetId && !this.dataset) {
            throw new Error("No valid 'datasetId' or 'dataset' found. Please provide one to iterate the evaluation over.");
        } else if (this.datasetId && this.dataset) {
            throw new Error("Both 'datasetId' and 'dataset' were provided. Please provide only one of them for evaluation.");
        }
        
        // Flag to indicate whether we're using a HoneyHive dataset
        this.useHhDataset = this.datasetId !== undefined;

        // Add git information to metadata if available
        const gitInfo = getGitInfo();
        if (gitInfo && !gitInfo.error) {
            this.metadata['git'] = gitInfo;
        }

        // Validate requirements and initialize HoneyHive client
        this.validateRequirements();
        this.hhai = new HoneyHive({ 
            bearerAuth: this.apiKey,
            ...(this.serverUrl && { serverUrl: this.serverUrl })
        });

        // mark the tracer for evaluation tracing
        HoneyHiveTracer.isEvaluation = true;
        
    }

    public static async init(config: EvaluationConfig): Promise<Evaluation> {
        const evaluation = new Evaluation(config);
        await evaluation.setupDataset();
        console.log('\x1b[38;5;208mHoneyHive evaluation started\x1b[0m');
        return evaluation;
    }

    /**
     * Set up the dataset for evaluation:
     * - Loads dataset from HoneyHive using datasetId if provided
     * - Uses provided dataset list if passed directly
     * - Generates an external dataset ID for custom datasets
     * - Validates dataset format (must be a list of dictionaries)
     * - Raises exceptions if no dataset is provided or format is invalid
     */
    private async setupDataset(): Promise<void> {
        // load the dataset from HoneyHive
        if (this.useHhDataset) {
            try {
                const dataset = await this.hhai.datasets.getDatasets(
                    this.project as string,
                    undefined,
                    this.datasetId
                );
                if (dataset && dataset.testcases && dataset.testcases.length > 0) {
                    this.dataset = dataset.testcases[0];
                }
            } catch (error) {
                throw new Error(`No dataset found with id - ${this.datasetId} for project - ${this.project}`);
            }
        }
        // use provided dataset
        else {
            // validate dataset format
            if (!Array.isArray(this.dataset)) {
                throw new Error("Dataset must be a list");
            }
            if (!this.dataset.every(item => typeof item === 'object' && item !== null)) {
                throw new Error("All items in dataset must be dictionaries");
            }

            // generated id for external datasets
            // TODO: large dataset optimization
            // TODO: dataset might not be json serializable
            this.datasetId = this.dataset ? 
                this.generateHash(JSON.stringify(this.dataset)) : 
                undefined;
        }
        
        // Ensure we have valid dataset information
        if (!this.datasetId && !this.dataset) {
            throw new Error("No valid 'datasetId' or 'dataset' found. Please provide one to iterate the evaluation over.");
        }
    }

    private generateHash(inputString: string): string {
        const hashObject = crypto.createHash('md5');
        hashObject.update(inputString, 'utf-8');
        return `EXT-${hashObject.digest('hex').slice(0, 24)}`;
    }

    private validateRequirements(): void {
        if (!this.apiKey) {
            throw new Error("Honeyhive API key not found. Please set 'apiKey' to initiate Honeyhive Tracer. Cannot run Evaluation");
        }
        if (!this.project) {
            throw new Error("Honeyhive Project not found. Please set 'project' to initiate Honeyhive Tracer. Cannot run Evaluation");
        }
    }

    private async getInputsAndGroundTruth(run_id: number): Promise<{inputs: any, groundTruth: any} | null> {
        if (this.useHhDataset && this.dataset && (this.dataset! as Dataset).datapoints && (this.dataset as Dataset).datapoints!.length > 0) {
            try {
                const datapoint_id = (this.dataset as Dataset).datapoints![run_id];
                if (!datapoint_id) {
                    throw new Error("No datapoint id found for run_id: " + run_id);
                }
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
        } else if (this.dataset && (this.dataset as Dict<any>[])[run_id]) {
            const datapoint = (this.dataset as Dict<any>[])[run_id];
            const result = {
                inputs: datapoint!['inputs'] || {},
                groundTruth: datapoint!['ground_truths'] || {}
            };
            return result;
        }
        return null;
    }

    private async initializeTracer(inputs: any, datapointIdx: number): Promise<HoneyHiveTracer> {
        const evalContext = this.getTracingMetadata(datapointIdx);
        try {
            return await HoneyHiveTracer.init({
                apiKey: this.apiKey,
                project: this.project,
                source: 'evaluation',
                sessionName: this.name,
                inputs: { inputs: inputs || {} },
                isEvaluation: true,
                verbose: this.verbose,
                ...(this.serverUrl && { serverUrl: this.serverUrl }),
                disableHttpTracing: this.disableHttpTracing,
                metadata: this.metadata,
                runId: evalContext['run_id'],
                datasetId: evalContext['dataset_id'],
                datapointId: evalContext['datapoint_id'],
                instrumentModules: this.instrumentModules
            });
        } catch (error) {
            throw new Error("Unable to initiate Honeyhive Tracer. Cannot run Evaluation");
        }
    }

    private getTracingMetadata(datapointIdx: number): Dict<any> {
        assert(this.evalRun && this.evalRun.runId, "Evaluation run or runId not found");
        const metadata: Dict<any> = {
            "run_id": this.evalRun.runId
        };
        
        if (this.useHhDataset && this.dataset) {
            metadata["datapoint_id"] = (this.dataset as Dataset).datapoints?.[datapointIdx];
        } else if (this.dataset) {
            metadata["datapoint_id"] = this.generateHash(
                JSON.stringify((this.dataset as Dict<any>[])[datapointIdx])
            );
        } else {
            throw new Error("No dataset or datasetId found. Cannot initialize tracer");
        }
        
        metadata["dataset_id"] = this.datasetId;
        return metadata;
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
                        output = await this.function(inputs, ground_truths);
                        console.log(output);
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

    private async runEvaluators(outputs?: any, inputs?: any, ground_truths?: any): Promise<EvaluatorResult> {
        const metrics: Dict<any> = {};
        const metadata: Dict<any> = {};

        if (!this.evaluators || this.evaluators.length === 0) {
            return { metrics, metadata };
        }

        for (let index = 0; index < this.evaluators.length; index++) {
            const evaluatorFn: ((...args: any[]) => Promise<any> | any) | undefined = this.evaluators[index];
            if (!evaluatorFn) continue;
            const evaluatorName = evaluatorFn.name || `evaluator_${index}`;
            
            try {   
                // Run the evaluator - handle both sync and async functions
                const evaluatorResult = await Promise.resolve(
                    evaluatorFn(outputs, inputs, ground_truths)
                );
                metrics[evaluatorName] = evaluatorResult;
            } catch (error) {
                console.error(`Error in evaluator: ${error}`);
                metrics[evaluatorName] = null;
            }
        }
        
        return { metrics, metadata };
    }

    private async enrichEvaluationSession(
        tracer: HoneyHiveTracer,
        output: any,
        metrics: Dict<any>,
        metadata: Dict<any>,
        datapointIdx: number
    ): Promise<void> {
        try {
            if (this.evalRun && this.evalRun?.runId) {
                const tracing_metadata = this.getTracingMetadata(datapointIdx);
                const session_metadata = {
                    ...tracing_metadata,
                    ...metadata
                };
                
                if (typeof output !== 'object') {
                    output = { output };
                }
                await tracer.enrichSession({
                    metadata: session_metadata,
                    outputs: output,
                    metrics: metrics
                });
            }
        } catch (error) {
            console.error(`Error enriching evaluation session: ${error}`);
        }
    }

    private async runEach(datapointIdx: number): Promise<Dict<any>> {
        let inputs = {};
        let groundTruth = {};
        let outputs = null;
        let metrics: Dict<any> = {};
        let metadata = {};
        let sessionId: string | undefined;
        let tracer: HoneyHiveTracer;

        // Get inputs
        try {
            const datapoint = await this.getInputsAndGroundTruth(datapointIdx);
            if (datapoint) {
                inputs = datapoint.inputs;
                groundTruth = datapoint.groundTruth;
            }
        } catch (error) {
            console.error(`Error getting inputs for index ${datapointIdx}: ${error}`);
            return this.createResult(inputs, groundTruth, outputs, metrics, metadata);
        }

        // Initialize tracer
        try {
            tracer = await this.initializeTracer(inputs, datapointIdx);
            sessionId = tracer.sessionId;
            assert(sessionId);
            this.evaluationSessionIds.push(sessionId);
        } catch (error) {
            console.error(`Unable to initiate Honeyhive Tracer. Cannot run Evaluation: ${error}`);
            throw error;
        }

        // Run the function
        try {
            outputs = await this.runEvaluation(tracer, inputs, groundTruth);
        } catch (error) {
            console.error(`Error in evaluation function: ${error}`);
        }

        // Run evaluators
        const evaluatorResult = await this.runEvaluators(outputs, inputs, groundTruth);
        metrics = evaluatorResult.metrics;
        metadata = evaluatorResult.metadata;

        // Add trace metadata, outputs, and metrics to session
        await this.enrichEvaluationSession(tracer, outputs, metrics, metadata, datapointIdx);

        console.log(`Test case ${datapointIdx} complete`);

        return this.createResult(inputs, groundTruth, outputs, metrics, metadata);
    }

    private createResult(inputs: any, groundTruth: any, outputs: any, metrics: Dict<any>, metadata: Dict<any>): Dict<any> {
        return {
            input: inputs,
            ground_truth: groundTruth,
            output: outputs,
            metrics: metrics,
            metadata: metadata,
        };
    }

    public async run(): Promise<void> {
        const evalRun = await this.hhai.experiments.createRun({
            project: this.project!,
            name: this.name,
            datasetId: this.datasetId,
            eventIds: [],
            status: this.status,
            metadata: this.metadata
        });
        this.evalRun = evalRun;
        
        assert(this.evalRun.runId, "Evaluation runId not found");

        this.evalResult = {
            runId: this.evalRun.runId,
            datasetId: this.datasetId,
            sessionIds: [],
            status: this.status,
            suite: this.suite,
            stats: {},
            data: {
                input: [],
                output: [],
                metrics: [],
                metadata: [],
                ground_truth: []
            }
        };

        //########################################################
        // Run evaluations
        //########################################################

        const numPoints = this.useHhDataset ? (this.dataset as Dataset).datapoints!.length : (this.dataset as Dict<any>[]).length;
        const startTime = Date.now();
        
        let results: Dict<any>[] = [];
        try {
            if (this.runConcurrently) {
                // Process in batches of maxWorkers
                for (let i = 0; i < numPoints; i += this.maxWorkers) {
                    const batchSize = Math.min(this.maxWorkers, numPoints - i);
                    const batchPromises = [];
                    
                    for (let j = 0; j < batchSize; j++) {
                        const datapointIdx = i + j;
                        batchPromises.push(this.runEach(datapointIdx));
                    }
                    
                    const batchResults = await Promise.all(batchPromises);
                    results = results.concat(batchResults);
                }
            } else {
                // Sequential execution
                for (let datapointIdx = 0; datapointIdx < numPoints; datapointIdx++) {
                    const result = await this.runEach(datapointIdx);
                    results.push(result);
                }
            }
        } catch (error) {
            console.error(`Error in evaluation: ${error}`);
        } finally {
            // Complete any pending flush
            if (HoneyHiveTracer.flushPromise) {
                await HoneyHiveTracer.flushPromise;
            }
            // Final flush for any remaining spans
            await HoneyHiveTracer.flush();
        }

        const endTime = Date.now();
        //########################################################

        const duration = endTime - startTime;
        this.evalResult.stats['duration_s'] = Number((duration / 1000).toFixed(3));

        // Process results
        for (const result of results) {
            this.evalResult.data['input'].push(JSON.stringify(result['input']));
            this.evalResult.data['output'].push(JSON.stringify(result['output']));
            this.evalResult.data['metrics'].push(JSON.stringify(result['metrics']));
            this.evalResult.data['metadata'].push(JSON.stringify(result['metadata']));
            this.evalResult.data['ground_truth'].push(JSON.stringify(result['ground_truth']));
        }

        //########################################################
        // Update Run
        //########################################################

        try {
            this.status = Status.Completed;
            assert(this.evalRun && this.evalRun.runId, "Evaluation run or runId not found");
            await this.hhai.experiments.updateRun(
                {
                    eventIds: this.evaluationSessionIds,
                    status: this.status
                },
                this.evalRun.runId,
            );
        } catch (error) {
            console.warn("Warning: Unable to mark evaluation as `Completed`");
        }
        this.evalResult.status = this.status;
    }
}

export async function evaluate(config: EvaluationConfig): Promise<EvaluationResult | undefined> {
    const evaluation = await Evaluation.init(config);
    await evaluation.run();
    return evaluation.evalResult;
}

export type { EvaluationConfig, EvaluationResult };
