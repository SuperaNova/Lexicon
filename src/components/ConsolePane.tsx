import { Component, For } from 'solid-js';

interface ConsolePaneProps {
  logs: { type: 'success' | 'error' | 'info'; text: string }[];
  onClear: () => void;
}

export const ConsolePane: Component<ConsolePaneProps> = (props) => {
  return (
    <div class="h-full w-full flex flex-col bg-[var(--color-lexor-bg)] border-t border-[var(--color-lexor-border)] lg:border-t-0 lg:border-l">
      {/* Console Header */}
      <div class="flex items-center justify-between px-4 py-2 bg-[var(--color-lexor-panel)] border-b border-[var(--color-lexor-border)]">
        <h3 class="text-sm font-semibold tracking-wide text-[var(--color-lexor-text)]">OUTPUT CONSOLE</h3>
        <button 
          onClick={props.onClear}
          class="text-xs px-2 py-1 rounded bg-[var(--color-lexor-editor)] hover:bg-[var(--color-lexor-border)] transition-colors cursor-pointer"
        >
          Clear
        </button>
      </div>

      {/* Logs Area */}
      <div class="flex-1 overflow-y-auto p-4 font-mono text-sm">
        <For each={props.logs} fallback={<div class="text-[var(--color-lexor-border)] italic">Waiting for execution...</div>}>
          {(log) => (
            <div class={`mb-1 break-words ${
              log.type === 'error' ? 'text-[var(--color-lexor-error)]' : 
              log.type === 'success' ? 'text-[var(--color-lexor-accent)]' : 
              'text-[var(--color-lexor-text)]'
            }`}>
              <span class="mr-2 opacity-50">{'>'}</span>
              {log.text}
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
