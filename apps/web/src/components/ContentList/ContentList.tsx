import { FC } from 'react';
import { Content } from '../../gql/graphql';
import { List } from '@mui/material';
import { ContentListItem } from '../ContentListItem';

interface Props {
  contents: Content[];
}

export const ContentList: FC<Props> = ({ contents }) => {
  return (
    <List sx={{ width: '100%' }}>
      {contents.map((content, index) => (
        <ContentListItem key={content.id} content={content} index={index + 1} />
      ))}
    </List>
  );
};
