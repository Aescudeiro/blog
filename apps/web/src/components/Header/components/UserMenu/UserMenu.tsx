import { Home, Logout } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useSignOut } from '@nhost/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  onMenuClose: () => void;
  userId: string;
  userDisplayName?: string;
}

export const UserMenu: FC<Props> = ({
  anchorEl,
  isMenuOpen,
  onMenuClose,
  userId,
  userDisplayName,
}) => {
  const { signOut } = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    onMenuClose();
    signOut();
  };

  const handleProfile = () => {
    onMenuClose();
    navigate(`/${userId}`);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={onMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <IconButton
          size="large"
          aria-label="logout current user"
          color="inherit"
        >
          <Home />
        </IconButton>
        <Typography>{userDisplayName}</Typography>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="logout current user"
          sx={{ color: 'red' }}
        >
          <Logout />
        </IconButton>
        <Typography color="red">Logout</Typography>
      </MenuItem>
    </Menu>
  );
};
