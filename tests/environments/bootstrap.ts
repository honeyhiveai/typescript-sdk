// EDIT WITH CAUTION
// THIS MUST WORK IN ALL ENVIRONMENTS

// ============================================================================
// imports
// ============================================================================

// This is where we patch the user's TS code as-is
// TODO: there can be a bootstrap for each environment

// </patch>


// ============================================================================
// RUNNER SECTION
// This handles various runtimes and runs the exported main: async (): Promise<void> function
// Helper function to check if we're in a CommonJS environment
function isCommonJS(): boolean {
    // @ts-ignore: Ignoring TypeScript error for 'module' global
    return typeof module !== 'undefined' && typeof module.exports !== 'undefined';
  }
  
// Helper function to check if this is the main module in CommonJS
function isMainModuleCommonJS(): boolean {
try {
    // @ts-ignore: Ignoring TypeScript error for 'require' and 'module' globals
    return typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module;
} catch (e) {
    return false;
}
}

// Helper function to safely get the filename in various environments
function getFilename(): string | null {
try {
    if (isCommonJS()) {
    // @ts-ignore: Ignoring TypeScript error for '__filename' global
    return typeof __filename !== 'undefined' ? __filename : null;
    } else {
    // We're in some other environment, try to use process.argv[1]
    return typeof process !== 'undefined' && process.argv && process.argv.length > 1 ? process.argv[1] : null;
    }
} catch (e) {
    return null;
}
}

async function run(mainFn: () => Promise<void>) {
try {
    // Check if this file is being run directly
    let isRunningDirectly = false;
    
    // For CommonJS environments
    if (isCommonJS()) {
        isRunningDirectly = isMainModuleCommonJS();
    } 
    // For other environments (including ESM)
    else {
        // Get the current filename and check if it matches the entry point
        const filename = getFilename();
        if (filename) {
        // Check if our filename is the entry point 
        // This works in most Node.js environments
        const entryPoint = typeof process !== 'undefined' && process.argv && process.argv.length > 1 
            ? process.argv[1] 
            : null;
            
        isRunningDirectly = filename === entryPoint;
        }
    }

    // Execute main if this file is being run directly
    if (isRunningDirectly) {
        await mainFn().catch(err => {
        console.error('Error in main function:', err);
        process.exit(1);
        });
    }
    } catch (globalError) {
    console.error('Global module initialization error:', globalError);
    }
}
  
// Self-executing function to detect the environment and handle execution
(async () => {
    console.log("----------------------------------------\n");
    await run(main);
})();
// ============================================================================
