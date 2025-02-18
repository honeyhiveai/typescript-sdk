import { HoneyHive } from "./sdk";
import { CreateRunResponse, Status } from '../models/components';
import { HoneyHiveTracer } from './tracer';
import * as crypto from 'crypto';

type Dict<T> = { [key: string]: T };
type Any = any;

interface EvaluationConfig {
    evaluationFunction: Function,
    hh_api_key: string;
    hh_project: string;
    name: string;
    dataset_id?: string;
    dataset?: Dict<Any>[];
    evaluators?: Function[];
}

interface EvaluationState {
    hhai: HoneyHive;
    hh_dataset: Any;
    external_dataset_id: string | undefined;
    evaluation_session_ids: string[];
    eval_run: CreateRunResponse | null;
    state: Status;
}

function validateRequirements(config: EvaluationConfig): void {
    if (!config.hh_api_key) {
        throw new Error("Honeyhive API key not found. Please set 'hh_api_key' to initiate Honeyhive Tracer. Cannot run Evaluation");
    }
    if (!config.hh_project) {
        throw new Error("Honeyhive Project not found. Please set 'hh_project' to initiate Honeyhive Tracer. Cannot run Evaluation");
    }
    if (!config.name) {
        throw new Error("Evaluation name not found. Please set 'name' to initiate Honeyhive Evaluation.");
    }
    if (!config.dataset_id && !config.dataset) {
        throw new Error("No valid 'dataset_id' or 'dataset' found. Please provide one to iterate the evaluation over.");
    }
}

function _generateHash(inputString: string): string {
    const hashObject = crypto.createHash('md5');
    hashObject.update(inputString, 'utf-8');
    return `EXT-${hashObject.digest('hex').slice(0, 24)}`;
}

async function loadDataset(hhai: HoneyHive, config: EvaluationConfig): Promise<any> {
    if (!config.dataset_id) {
        return null;
    }
    try {
        const dataset = await hhai.datasets.getDatasets(
            config.hh_project,
            undefined,
            config.dataset_id
        );
        if (dataset && dataset.testcases && dataset.testcases.length > 0) {
            return dataset.testcases[0];
        }
    } catch (error) {
        throw new Error(`No dataset found with id - ${config.dataset_id} for project - ${config.hh_project}`);
    }
    return null;
}

async function getInputs(state: EvaluationState, config: EvaluationConfig, run_id: number): Promise<any> {
    if (state.hh_dataset && state.hh_dataset.datapoints && state.hh_dataset.datapoints.length > 0) {
        try {
            const datapoint_id = state.hh_dataset.datapoints[run_id];
            const datapoint_response = await state.hhai.datapoints.getDatapoint(datapoint_id);
            const datapointList = datapoint_response.datapoint;
            if (datapointList && datapointList[0])
                return datapointList[0].inputs;
        } catch (error) {
            console.error(`Error getting datapoint: ${error}`);
        }
    } else if (config.dataset) {
        return config.dataset[run_id];
    }
    return null;
}

async function initializeTracer(config: EvaluationConfig, inputs: any): Promise<HoneyHiveTracer> {
    try {
        return await HoneyHiveTracer.init({
            apiKey: config.hh_api_key,
            project: config.hh_project,
            source: 'evaluation',
            sessionName: config.name,
            inputs: inputs ? inputs : {},
            isEvaluation: true
        });
    } catch (error) {
        throw new Error("Unable to initiate Honeyhive Tracer. Cannot run Evaluation");
    }
}

async function runEvaluation(tracer: HoneyHiveTracer, evalconfig: EvaluationConfig, inputs: any): Promise<Any> {
    try {
        let output = {};
        let promiseResolve: () => void;
        const promise = new Promise<void>((resolve) => {
            promiseResolve = resolve;
        });

        tracer.trace(() => {
            (async () => {
                try {
                    const agentResponse = await evalconfig.evaluationFunction(inputs);
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

async function runEvaluators(inputs: any, evaluation_output: any, evaluators?: Function[]): Promise<Dict<Any>> {
    const metrics: Dict<Any> = {};
    if (evaluators) {
        for (let index = 0; index < evaluators.length; index++) {
            try {
                const evaluator = evaluators[index];
                if (evaluator) {
                    const evaluator_result = await evaluator(inputs, evaluation_output);
                    if (evaluator_result && typeof evaluator_result === 'object') {
                        Object.assign(metrics, evaluator_result);
                        continue;
                    }
                    const evaluator_name = evaluator.name || `evaluator_${index}`;
                    metrics[evaluator_name] = evaluator_result;
                }
            } catch (error) {
                console.error(`Error in evaluator: ${error}`);
            }
        }
    }
    return metrics;
}

async function addTraceMetadata(tracer: HoneyHiveTracer, state: EvaluationState, config: EvaluationConfig, evaluation_output: any, metrics: Dict<Any>, run_id: number): Promise<void> {
    try {
        if (state.eval_run && state.eval_run?.runId) {
            const tracing_metadata: Dict<Any> = {
                run_id: state.eval_run.runId,
            };
            if (state.hh_dataset) {
                tracing_metadata['datapoint_id'] = state.hh_dataset.datapoints[run_id];
                tracing_metadata['dataset_id'] = config.dataset_id;
            }
            if (state.external_dataset_id && config.dataset) {
                tracing_metadata['datapoint_id'] = _generateHash(JSON.stringify(config.dataset[run_id]));
                tracing_metadata['dataset_id'] = state.external_dataset_id;
            }
            if (typeof evaluation_output !== 'object') {
                evaluation_output = { output: evaluation_output };
            }
            await tracer.enrichSession({
                metadata: tracing_metadata,
                outputs: evaluation_output,
                metrics: metrics
            });
        }

    } catch (error) {
        console.error(`Error adding trace metadata: ${error}`);
    }
}

async function setupEvaluation(state: EvaluationState, config: EvaluationConfig): Promise<void> {
    const eval_run = await state.hhai.experiments.createRun({
        project: config.hh_project,
        name: config.name,
        datasetId: config.dataset_id || state.external_dataset_id,
        eventIds: [],
        status: state.state,
    });
    state.eval_run = eval_run;
}

async function windupEvaluation(state: EvaluationState): Promise<void> {
    try {
        state.state = Status.Completed;
        if (state.eval_run && state.eval_run.runId) {
            await state.hhai.experiments.updateRun(
                {
                    eventIds: state.evaluation_session_ids,
                    status: state.state
                },
                state.eval_run.runId,
            );
        }
    } catch (error) {
        console.warn("Warning: Unable to mark evaluation as `Completed`");
    }
}

async function evaluate(
    config: EvaluationConfig
): Promise<{
    run_id: string;
    dataset_id: string | undefined;
    session_ids: string[];
    status: Status;
}> {
    validateRequirements(config);

    const state: EvaluationState = {
        hhai: new HoneyHive({ bearerAuth: config.hh_api_key }),
        hh_dataset: null,
        external_dataset_id: config.dataset ? _generateHash(JSON.stringify(config.dataset)) : undefined,
        evaluation_session_ids: [],
        eval_run: null,
        state: Status.Pending
    };

    state.hh_dataset = await loadDataset(state.hhai, config);
    const runs = state.hh_dataset ? state.hh_dataset.datapoints.length : (config.dataset ? config.dataset.length : 0);

    await setupEvaluation(state, config);

    for (let run_id = 0; run_id < runs; run_id++) {
        console.log(`---------- RUN ${run_id + 1} ----------`)
        const inputs = await getInputs(state, config, run_id);
        const tracer = await initializeTracer(config, inputs);

        const output = await runEvaluation(tracer, config, inputs);
        const metrics = await runEvaluators(inputs, output, config.evaluators);

        await addTraceMetadata(tracer, state, config, output, metrics, run_id);

        if (tracer.sessionId)
            state.evaluation_session_ids.push(tracer.sessionId);
    }

    await windupEvaluation(state);

    return {
        run_id: state.eval_run?.runId || '',
        dataset_id: config.dataset_id || state.external_dataset_id,
        session_ids: state.evaluation_session_ids,
        status: state.state
    };
}

export { evaluate };
