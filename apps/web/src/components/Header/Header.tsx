import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSignOut } from '@nhost/react';
import { FC, useState } from 'react';
import { StyledLink } from './styles';
import { useUserData } from '@nhost/react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const pages = [
  { label: 'Home', link: '/' },
  { label: 'New Post', link: '/new-post' },
];

export const Header: FC = () => {
  const user = useUserData();
  const { signOut } = useSignOut();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    signOut();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <StyledLink to={page.link} key={page.label}>
                <Button
                  onClick={handleCloseUserMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              </StyledLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user?.displayName}
                src={user?.avatarUrl}
                sx={{ border: '1px solid black' }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              id="account-menu"
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              onClick={handleCloseUserMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem sx={{ mx: 1, borderRadius: '6px' }}>
                <Link to={`/${user?.id}`}>
                  <Box display="flex" alignItems="center">
                    <HomeOutlinedIcon />
                    <Typography textAlign="center" ml={1}>
                      {user?.displayName}
                    </Typography>
                  </Box>
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleLogout}
                sx={{ mx: 1, borderRadius: '6px' }}
              >
                <Box display="flex" alignItems="center">
                  <LogoutOutlinedIcon color="error" />
                  <Typography textAlign="center" ml={1} color="error">
                    Logout
                  </Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
