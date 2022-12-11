import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { GetContentQuery } from '../../gql/graphql';
import { Body, Header } from './components';

type NonNullable<T> = Exclude<T, null | undefined>;

interface Props {
  content: NonNullable<GetContentQuery['content']>;
}

export const Content: FC<Props> = ({ content }) => {
  const { owner, createdAt, title, body, id } = content;
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <Box>
      <Box>
        <Header
          createdAt={createdAt}
          owner={owner}
          onEdit={handleEdit}
          onCloseEdit={handleCloseEdit}
          contentId={id}
        />
        <Body
          title={title ?? ''}
          body={body}
          isEditing={isEditing}
          onCloseEdit={handleCloseEdit}
        />
      </Box>
    </Box>
  );
};
