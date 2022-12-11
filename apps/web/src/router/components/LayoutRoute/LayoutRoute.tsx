import { Box, Container } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../../components';

export const LayoutRoute: FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Header />
      <Container maxWidth="md" sx={{ paddingY: '16px', height: '100%' }}>
        <Outlet />
      </Container>
    </Box>
  );
};
