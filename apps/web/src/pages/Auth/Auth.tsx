import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Image, Container } from './styles';
import { Box, useMediaQuery } from '@mui/material';

export const Auth: FC = () => {
  const matches = useMediaQuery('(min-width:750px)');

  return (
    <Container>
      {matches ? <Image /> : null}
      <Box width={matches ? '50%' : '100%'}>
        <Outlet />
      </Box>
    </Container>
  );
};
