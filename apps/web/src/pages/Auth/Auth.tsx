import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Image, Container } from './styles';

export const Auth: FC = () => {
  return (
    <Container>
      <Image />
      <Outlet />
    </Container>
  );
};
