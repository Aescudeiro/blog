import { Box } from '@mui/material';
import { FC } from 'react';
import { ContentList } from '../../components';
import { Content, useGetContentsQuery } from '../../gql/graphql';

export const Home: FC = () => {
  const { data, isLoading, error } = useGetContentsQuery();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error</Box>;
  }

  if (!data) {
    return <Box>No data</Box>;
  }

  return (
    <Box>
      <ContentList contents={data.contents as Content[]} />
    </Box>
  );
};
