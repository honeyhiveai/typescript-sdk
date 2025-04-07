import { OpenAI } from 'openai';
import { HoneyHiveTracer, traceModel, enrichSession } from 'honeyhive';

const openai = new OpenAI();

function hello() {
    console.log("hello");
}

async function callOpenAI(prompt: string) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
}

async function tracedMain() {
    const prompt = "What is the capital of France?";
    const tracedHello = traceModel(hello);
    tracedHello();
    const response = await callOpenAI(prompt);
    
    console.log(response);
    await enrichSession({
        metadata: {
            "test": "test"
        }
    });
}

// Export the main function type for TypeScript
async function main(): Promise<void> {
    const tracer = await HoneyHiveTracer.init({
        verbose: true,
        instrumentModules: {
            openAI: OpenAI
        }
    });

    try {
        await tracer.trace(tracedMain);
    } catch (error) {
        console.error(error);
    } finally {
        await tracer.flush();
    }
}

export { main };
