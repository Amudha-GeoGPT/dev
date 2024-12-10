/* eslint-disable no-empty-pattern */
 
import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Box,
  Toolbar,
  AppBar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  AccountCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import vectorheaderimg from '../../assets/images/svg/Vectorimg.svg';

const Headerhome: React.FC = () => {
  const [] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/indiaMap');
  }, [navigate]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="small" aria-label="search">
          <SearchIcon sx={{ color: "red" }}/>
        </IconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" edge="end" aria-label="account of current user" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: '#001B04',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )} */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <img
                src={vectorheaderimg}
                alt="vector"
                style={{ width: 18, height: 16, marginRight: 8 }}
              />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ fontFamily: 'inter' }}>
              GEO GPT
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            noWrap 
            sx={{ 
              fontFamily: 'inter',
              display: { xs: 'none', sm: 'block' }, // Hide on mobile
              marginLeft: '-100px', // Adjust this value to move it left or right
            }}
          >
            Map Outlet Tool
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <IconButton size="small" aria-label="search">
              {/* <SearchIcon sx={{ color: "red" }}/> */}
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              {/* <AccountCircle /> */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Headerhome;