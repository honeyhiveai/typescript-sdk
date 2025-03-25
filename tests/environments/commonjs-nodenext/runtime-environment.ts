/**
 * Utility functions for detecting runtime environment and execution context
 */

/**
 * Checks if we're in a CommonJS environment
 */
export function isCommonJS(): boolean {
  // @ts-ignore: Ignoring TypeScript error for 'module' global
  return typeof module !== 'undefined' && typeof module.exports !== 'undefined';
}

/**
 * Checks if this is the main module in CommonJS
 */
export function isMainModuleCommonJS(): boolean {
  try {
    // @ts-ignore: Ignoring TypeScript error for 'require' and 'module' globals
    return typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module;
  } catch (e) {
    return false;
  }
}

/**
 * Safely gets the filename in various environments
 */
export function getFilename(): string | null {
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

/**
 * Checks if the current file is being run directly as the main entry point
 */
export function isRunningDirectly(): boolean {
  // For CommonJS environments
  if (isCommonJS()) {
    return isMainModuleCommonJS();
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
        
      return filename === entryPoint;
    }
  }
  return false;
}

/**
 * Helper function to execute a main function if the file is being run directly
 * @param mainFn The main function to execute
 */
export async function executeIfMain(mainFn: () => Promise<void>): Promise<void> {
  try {
    if (isRunningDirectly()) {
      await mainFn().catch(err => {
        console.error('Error in main function:', err);
        process.exit(1);
      });
    }
  } catch (globalError) {
    console.error('Global module initialization error:', globalError);
  }
} 