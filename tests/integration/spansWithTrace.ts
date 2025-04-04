import { OpenAI } from 'openai';
import { HoneyHiveTracer, traceTool, traceModel, enrichSpan, enrichSession, traceChain } from 'honeyhive';

const openai = new OpenAI();

async function initializeTracer(sessionName: string): Promise<HoneyHiveTracer> {
    const tracer = await HoneyHiveTracer.init({
        verbose: true,
        instrumentModules: {
            openAI: OpenAI
        }
    });
    return tracer;
}

async function tool(tracer: HoneyHiveTracer) {
    console.log("tool", tracer);
    await new Promise(resolve => setTimeout(resolve, 500));
    enrichSpan({
        metrics: {
            "tool": 42
        }
    });
}

async function chain(prompt: string) {
    console.log("chain");
    enrichSession({
        metrics: {
            "chain": 42
        }
    });
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
    });
    console.log(response.choices[0].message.content);
    enrichSpan({
        metrics: {
            "chain": 42
        }
    });
}

async function tracedMain(tracer: HoneyHiveTracer) {
    const prompt = "What is the capital of France?";
    const tracedTool = traceTool(tool);
    const tracedChain = traceChain(chain);
    await tracedTool(tracer);
    await tracedChain(prompt);
    enrichSession({
        metrics: {
            "session": 42
        }
    });
    await HoneyHiveTracer.flush();
}

async function main() {
    const tracer = await initializeTracer("test");
    return await tracer.trace(tracedMain, tracer);
}

export { main };
