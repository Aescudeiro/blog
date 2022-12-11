import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Editor } from '../../../Editor';
import { Preview } from '../../../Preview';

interface Props {
  title: string;
  body: string;
  isEditing: boolean;
  onCloseEdit: () => void;
}

export const Body: FC<Props> = ({ title, body, isEditing, onCloseEdit }) => {
  const [code, setCode] = useState(body);

  return (
    <Box>
      {title ? (
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      ) : null}
      {isEditing ? (
        <Box>
          <Editor code={code} setCode={setCode} />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={onCloseEdit}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Reply
            </Button>
          </Box>
        </Box>
      ) : (
        <Preview body={body} />
      )}
    </Box>
  );
};
