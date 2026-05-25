import { createSignal, onMount, onCleanup } from 'solid-js';
import { EditorPane } from './components/EditorPane';
import { ConsolePane } from './components/ConsolePane';

type Log = { type: 'success' | 'error' | 'info'; text: string };

function App() {
  const [code, setCode] = createSignal('print("Hello Lexor!");\n');
  const [logs, setLogs] = createSignal<Log[]>([{ type: 'info', text: 'Lexor IDE Ready.' }]);
  const [isExecuting, setIsExecuting] = createSignal(false);
  
  let worker: Worker;

  onMount(() => {
    worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
    
    worker.onmessage = (e) => {
      const { type, output, error } = e.data;
      setIsExecuting(false);
      
      if (type === 'success') {
        setLogs(prev => [...prev, { type: 'success', text: output || "Execution complete." }]);
      } else if (type === 'error') {
        setLogs(prev => [...prev, { type: 'error', text: error }]);
      }
    };
  });

  onCleanup(() => {
    if (worker) worker.terminate();
  });

  const runCode = () => {
    if (isExecuting()) return;
    setIsExecuting(true);
    setLogs(prev => [...prev, { type: 'info', text: 'Running...' }]);
    
    worker.postMessage({
      id: Date.now(),
      code: code()
    });
  };

  const clearLogs = () => setLogs([]);

  return (
    <div class="h-screen w-screen flex flex-col bg-[var(--color-lexor-bg)] text-[var(--color-lexor-text)] overflow-hidden">
      {/* Navbar */}
      <header class="flex items-center justify-between px-6 py-3 bg-[var(--color-lexor-panel)] border-b border-[var(--color-lexor-border)] shadow-md z-10">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-[var(--color-lexor-accent)] flex items-center justify-center text-[var(--color-lexor-bg)] font-bold text-xl">L</div>
          <h1 class="font-bold text-xl tracking-wide">Lexicon</h1>
        </div>
        
        <button 
          onClick={runCode}
          disabled={isExecuting()}
          class={`px-6 py-2 rounded font-semibold transition-all shadow-sm ${
            isExecuting() 
              ? 'bg-[var(--color-lexor-border)] text-gray-400 cursor-not-allowed' 
              : 'bg-[var(--color-lexor-accent)] text-[var(--color-lexor-bg)] hover:brightness-110 hover:shadow-[0_0_15px_rgba(166,227,161,0.4)]'
          }`}
        >
          {isExecuting() ? 'Running...' : 'Run Code'}
        </button>
      <div class="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg class="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img class="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://solidjs.com/" target="_blank">
                <img class="button-icon" src={solidLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg class="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg class="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div class="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
