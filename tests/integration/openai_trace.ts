import { OpenAI } from 'openai';
import { HoneyHiveTracer } from 'honeyhive';

const openai = new OpenAI();

async function callOpenAI(prompt: string) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
}

async function main() {
    const prompt = "What is the capital of France?";
    const tracer = await HoneyHiveTracer.init();
    const tracedOpenAI = tracer.traceModel(callOpenAI);
    const response = await tracedOpenAI(prompt);
    console.log(response);
    await tracer.flush();
}

export { main };
