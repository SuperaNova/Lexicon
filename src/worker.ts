// Lexor WASM Worker
// This isolates the systems-level compute from the UI thread per Playbook 2.

// TODO: When the @superanova/lexor_wasm package is published to npm, 
// uncomment the import and use it in the executeCode function.
// import * as lexor from '@superanova/lexor_wasm';

self.onmessage = async (e: MessageEvent) => {
  const { code, id } = e.data;
  
  try {
    // Simulated compile/execute delay to mimic WASM boundary crossing
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // MOCK EXECUTION:
    // Once lexor_wasm is ready, replace this mock logic with:
    // const output = lexor.run(code);
    let output = "";
    if (code.trim() === "") {
      output = "";
    } else if (code.includes("print")) {
      output = "Lexor Output: Hello World!";
    } else if (code.includes("error")) {
      throw new Error("Syntax error on line 1");
    } else {
      output = "Lexor parsed successfully. (Mock Output)";
    }

    self.postMessage({ id, type: 'success', output });
  } catch (err: any) {
    self.postMessage({ id, type: 'error', error: err.message || "Unknown error" });
  }
};
