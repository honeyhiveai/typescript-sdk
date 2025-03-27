import { evaluate, HoneyHiveTracer, evaluator } from 'honeyhive';

class Eval {
    someFunction = evaluator((..._: any[]) => {
        return 'someFunction';
    }, { repeat: 2 });

    someAsyncFunction = evaluator(async (..._: any[]) => {
        // Simulate some async work
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('someAsyncFunction');
        return Promise.resolve('someAsyncFunction');
    }, { repeat: 10 });
}

async function main(): Promise<void> {
    const evalObj = new Eval();
    
    const result = evalObj.someFunction();
    console.log(result);

    const result2 = await evalObj.someAsyncFunction();
    console.log(result2);
}

export { main };
