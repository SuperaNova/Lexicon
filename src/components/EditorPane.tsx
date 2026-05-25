/* eslint-disable solid/reactivity */
import { onCleanup, onMount } from 'solid-js';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';

interface EditorPaneProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
}

export function EditorPane(props: EditorPaneProps) {
  let editorRef!: HTMLDivElement;
  let view: EditorView;

  onMount(() => {
    const updateListener = EditorView.updateListener.of((update) => {
      // eslint-disable-next-line solid/reactivity
      if (update.docChanged && props.onCodeChange) {
        // eslint-disable-next-line solid/reactivity
        props.onCodeChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: props.initialCode || '',
      extensions: [
        basicSetup,
        updateListener,
        // Kid-friendly dark theme configuration
        EditorView.theme(
          {
            '&': {
              height: '100%',
              backgroundColor: 'var(--color-lexor-editor)',
              color: 'var(--color-lexor-text)',
              fontSize: '16px', // slightly larger for kids
            },
            '.cm-gutters': {
              backgroundColor: 'var(--color-lexor-panel)',
              color: 'var(--color-lexor-border)',
              borderRight: '1px solid var(--color-lexor-border)',
            },
            '.cm-activeLineGutter': {
              backgroundColor: 'var(--color-lexor-border)',
              color: 'var(--color-lexor-accent)',
            },
            '.cm-activeLine': {
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            },
            '.cm-cursor': {
              borderLeftColor: 'var(--color-lexor-accent)',
            },
          },
          { dark: true },
        ),
      ],
    });

    view = new EditorView({
      state,
      parent: editorRef,
    });

    onCleanup(() => {
      if (view) view.destroy();
    });
  });

  return <div class="h-full w-full overflow-hidden text-left" ref={editorRef} />;
}
