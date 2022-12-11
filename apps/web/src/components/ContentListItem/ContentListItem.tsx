import { FC } from 'react';
import { Box, Divider, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Content } from '../../gql/graphql';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

interface Props {
  content: Content;
  index: number;
}

export const ContentListItem: FC<Props> = ({
  content: { id, title, owner, createdAt, parentId, body, children_aggregate },
  index,
}) => {
  return (
    <ListItem alignItems="flex-start">
      <Typography component="span" sx={{ mr: 1 }}>
        {index}.
      </Typography>
      <Box width="100%">
        <Link to={`/${owner.id}/${id}`}>
          {parentId ? (
            <Box display="flex" alignItems="center">
              <Typography component="span" fontStyle="italic">
                <ModeCommentOutlinedIcon
                  sx={{ mr: 1, width: '16px', height: '16px' }}
                />
                "{body.slice(0, 300)}..."
              </Typography>
            </Box>
          ) : (
            <Typography component="span">{title}</Typography>
          )}
        </Link>
        <Box display="flex">
          <Typography component="span" fontSize="small">
            {children_aggregate.aggregate?.count ?? 0} comments
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Link to={`/${owner.id}`}>
            <Typography component="span" fontSize="small">
              {owner.displayName}
            </Typography>
          </Link>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Typography component="span" fontSize="small">
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};
