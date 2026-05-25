import { run_lexor } from '@superanova/lexor_wasm';

self.onmessage = async (e: MessageEvent) => {
  const { code, id, inputs = [] } = e.data;
  
  try {
    // Note: Web Workers do not have access to window.prompt()
    // If the Lexor script requires input (via SCAN) and the inputs array is empty,
    // the WASM module's built-in prompt fallback might throw an error here.
    // For a fully robust IDE, we will eventually need to feed inputs from the UI.
    
    const result = run_lexor(code, inputs);

    if (result.error) {
      // It threw a Lexor-level error (Syntax, Semantic, Runtime)
      self.postMessage({ id, type: 'error', error: result.error });
    } else {
      // Execution successful
      self.postMessage({ id, type: 'success', output: result.output });
    }
  } catch (err: any) {
    // This catches JS-level errors (like window.prompt crashing in a worker)
    self.postMessage({ id, type: 'error', error: err.message || "A fatal JS execution error occurred" });
  }
};

