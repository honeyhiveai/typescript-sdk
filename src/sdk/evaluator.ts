class Evaluator<O, I, G, R> {
    private fn: (outputs: O, inputs: I, groundTruth: G) => Promise<R> | R;
    
    constructor(
        fn: (outputs: O, inputs: I, groundTruth: G) => Promise<R> | R,
        private name: string = '',
        private weight: number = 1,
        private repeat: number = 1,
        private asserts: boolean = false,
        private target: string = '',
        private transform: string = '',
        private aggregate: string = '',
        private checker: string = ''
    ) {
        this.fn = fn;

        // to prevent ts unused error
        console.log(this.name, this.weight, this.repeat, this.asserts, this.target, this.transform, this.aggregate, this.checker);
        
        // Bind the evaluate method to this instance
        this.evaluate = this.evaluate.bind(this);
    }

    evaluate(outputs?: O, inputs?: I, groundTruth?: G): R | Promise<R> | R[] | Promise<R[]> {
        // If repeat is 0, just run once and return result
        if (this.repeat <= 0) {
            return this.fn(outputs as O, inputs as I, groundTruth as G);
        }

        // Run the function once to check if it's async
        const result = this.fn(outputs as O, inputs as I, groundTruth as G);
        
        if (result instanceof Promise) {
            // Handle async function with repeat
            return (async () => {
                const promises: Promise<R>[] = [result];
                for (let i = 1; i < this.repeat; i++) {
                    promises.push(this.fn(outputs as O, inputs as I, groundTruth as G) as Promise<R>);
                }
                return await Promise.all(promises);
            })();
        } else {
            // Handle sync function with repeat
            const results: R[] = [result];
            for (let i = 1; i < this.repeat; i++) {
                results.push(this.fn(outputs as O, inputs as I, groundTruth as G) as R);
            }
            return results;
        }
    }
}

export function evaluator<O, I, G, R>(
    fn: (outputs: O, inputs: I, groundTruth: G) => Promise<R> | R,
    options?: {
        name?: string,
        weight?: number,
        repeat?: number,
        asserts?: boolean,
        target?: string,
        transform?: string,
        aggregate?: string,
        checker?: string
    }
): (outputs?: O, inputs?: I, groundTruth?: G) => R | Promise<R> | R[] | Promise<R[]> {
    const evaluatorObj = new Evaluator<O, I, G, R>(
        fn,
        options?.name,
        options?.weight,
        options?.repeat,
        options?.asserts,
        options?.target,
        options?.transform,
        options?.aggregate,
        options?.checker
    );
    return evaluatorObj.evaluate;
}