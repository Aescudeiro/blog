import { Box, Divider, Typography } from '@mui/material';
import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Content, useGetUserQuery } from '../../gql/graphql';
import { ContentList } from '../../components';

export const Profile: FC = () => {
  const { userId } = useParams();

  const { data, isLoading, error } = useGetUserQuery({
    id: userId,
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error</Box>;
  }

  if (!data?.user) {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      <Typography variant="h4">{data.user.displayName}</Typography>
      <Divider sx={{ my: 2 }} />
      <ContentList contents={data.user.contents as Content[]} />
    </Box>
  );
};
