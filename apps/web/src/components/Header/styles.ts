import { styled, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)({
  textDecoration: 'none',
});

export const StyledAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  color: 'black',
});

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
});
