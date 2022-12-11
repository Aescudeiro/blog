import { Box, Button, TextField } from '@mui/material';
import { useUserData } from '@nhost/react';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '../../components';
import { useAddContentMutation } from '../../gql/graphql';

export const NewContent: FC = () => {
  const user = useUserData();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const addContent = useAddContentMutation();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSaveContent = () => {
    addContent.mutateAsync(
      {
        title,
        body: code,
        parentId: null,
        ancestorId: null,
      },
      {
        onSuccess: (data) => {
          navigate(`/${user?.id}/${data.insertContent?.id}`);
        },
      }
    );
  };

  const handleGoBack = () => {
    navigate('-1');
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        sx={{ marginBottom: 2 }}
      />
      <Editor code={code} setCode={setCode} />
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button onClick={handleGoBack} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button onClick={handleSaveContent} variant="contained" color="success">
          Save
        </Button>
      </Box>
    </Box>
  );
};
