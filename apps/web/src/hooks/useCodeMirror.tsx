import { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { Extension } from '@codemirror/state';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { defaultKeymap } from '@codemirror/commands';
import { keymap } from '@codemirror/view';

export const useCodeMirror = (extensions: Extension[]) => {
  const [view, setView] = useState<EditorView>();
  const ref = useRef();

  useEffect(() => {
    const view = new EditorView({
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        ...extensions,
      ],
      parent: ref.current,
    });

    setView(view);

    return () => {
      view.destroy();
      setView(undefined);
    };
  }, []);

  return { ref, view };
};
