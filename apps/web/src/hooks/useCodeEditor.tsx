import { Extension } from '@codemirror/state';
import { ViewUpdate } from '@codemirror/view';
import { useEffect } from 'react';
import { onUpdate } from './onUpdate';
import { useCodeMirror } from './useCodeMirror';

interface Props {
  value: string;
  extensions: Extension[];
  onChange: (value: string, viewUpdate: ViewUpdate) => void;
}

export const useCodeEditor = ({ value, onChange, extensions }: Props) => {
  const { ref, view } = useCodeMirror([onUpdate(onChange), ...extensions]);

  useEffect(() => {
    if (view) {
      const editorValue = view.state.doc.toString();

      if (value !== editorValue) {
        view.dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: value || '',
          },
        });
      }
    }
  }, [value, view]);

  return ref;
};
