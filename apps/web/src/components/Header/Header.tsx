import { Avatar, Badge, Box, IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { MobileMenu, Search, UserMenu } from './components';
import { StyledAppBar, StyledToolbar } from './styles';
import { AccountCircle, Notifications, Forum } from '@mui/icons-material';
import { useUserData } from '@nhost/react';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  const user = useUserData();
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" component="div" color="black">
              BLOG
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Search />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <Forum />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user?.avatarUrl ? (
                <Avatar src={user.avatarUrl} sx={{ width: 24, height: 24 }} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {user?.avatarUrl ? (
                <Avatar src={user.avatarUrl} sx={{ width: 24, height: 24 }} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      <MobileMenu
        isMenuOpen={isMobileMenuOpen}
        anchorEl={mobileMoreAnchorEl}
        onMenuClose={handleMobileMenuClose}
        userId={user?.id ?? ''}
        userDisplayName={user?.displayName}
      />
      <UserMenu
        isMenuOpen={isProfileMenuOpen}
        anchorEl={profileAnchorEl}
        onMenuClose={handleProfileMenuClose}
        userId={user?.id ?? ''}
        userDisplayName={user?.displayName}
      />
    </Box>
  );
};
