import { OpenAI } from 'openai';
import { HoneyHiveTracer, traceModel } from 'honeyhive';

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
    await HoneyHiveTracer.flush();
}

async function main() {

    const continuedTracer = await HoneyHiveTracer.init({
        sessionId: "72d12bb6-6173-4440-a8a6-54999632e4ec",
        instrumentModules: {
            openAI: OpenAI
        }
    });
    return await continuedTracer.trace(tracedMain);
}

export { main };
