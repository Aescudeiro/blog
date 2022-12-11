import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useUserData } from '@nhost/react';
import { useDeleteContentMutation } from '../../../../gql/graphql';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  owner: { id: any; displayName: string };
  createdAt: string;
  onEdit: () => void;
  contentId: any;
  onCloseEdit: () => void;
}

export const Header: FC<Props> = ({
  owner,
  createdAt,
  onEdit,
  contentId,
  onCloseEdit,
}) => {
  const user = useUserData();
  const deleteContent = useDeleteContentMutation();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteContent.mutateAsync(
      { contentId },
      {
        onSuccess: () => {
          onCloseEdit();
          queryClient.invalidateQueries(['getContentChilds']);
        },
      }
    );
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Link to={`/${owner.id}`}>
          <Typography variant="body2" component="span">
            {owner.displayName}
          </Typography>
        </Link>
        <Typography variant="body2" component="span" ml={1}>
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </Box>
      {owner.id === user?.id ? (
        <Box>
          <IconButton size="small" onClick={onEdit}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteForeverOutlinedIcon fontSize="small" color="error" />
          </IconButton>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
