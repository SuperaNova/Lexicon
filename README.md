# Lexicon

**Lexicon** is a lightweight, high-performance Web IDE built to showcase the [Lexor programming language](https://github.com/SuperaNova/lexor_interpreter).

## Architecture Stack
- **Framework**: SolidJS + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Editor**: CodeMirror v6
- **Compute**: WebAssembly (WASM) via `@superanova/lexor_wasm`

### Interactive Inputs (SCAN) Limitation
Web Workers do not have access to the browser's `window` object. If a Lexor script executes a `SCAN` statement and there are no provided `inputs` in the execution array, the `lexor_wasm` package attempts to fallback to a native `window.prompt()`. 

Since this is running inside a Worker context, the prompt will fail. Future iterations of this IDE will need to implement an "Inputs Pane" so users can pre-feed data into the compiler before runtime.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production (outputs to `dist/`):
```bash
npm run build
```
