import { FC } from 'react';
import { Box } from '@mui/material';
import { useCodeEditor } from '../../../../hooks/useCodeEditor';
import { Extension } from '@codemirror/state';

interface Props {
  value: string;
  onChange: (value: string) => void;
  extensions: Extension[];
}

export const EditTab: FC<Props> = ({ value, onChange, extensions }) => {
  const ref = useCodeEditor({ value, onChange, extensions });

  return (
    <form>
      <Box
        ref={ref}
        sx={{ height: 'calc(100vh - 350px)', minHeight: '200px' }}
        overflow="auto"
      />
    </form>
  );
};
