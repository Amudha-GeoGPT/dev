import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
  Box,
  Toolbar,
  AppBar,
  Typography,
  InputBase,
  Menu,
  MenuItem,
} from '@mui/material';
import { useTheme, styled, alpha } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ExpandLess,
  ExpandMore,
  LocationCity as CityIcon,
  Public as StateIcon,
  Terrain as RuralIcon,
  Apartment as TownIcon,
  Business as OutletIcon,
  Help as UserGuideIcon,
  Search as SearchIcon,
  AccountCircle,
  MoreVert as MoreIcon,
} from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Headerhome: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Static MAS");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleDrawerToggle = () => setOpen(!open);
  const toggleStateMenu = () => setStateOpen(!stateOpen);
  const toggleDistrictMenu = () => setDistrictOpen(!districtOpen);
  const handleMenuClick = (title: string) => {
    setHeaderTitle(title);
    if (isMobile || isTablet) setOpen(false);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(event.currentTarget);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const drawerWidth = isMobile ? 200 : 240;

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
        <IconButton size="large" aria-label="search" color="inherit">
          <SearchIcon />
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
      {/* AppBar with Navbar Content */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#001B04',
        }}
      >
        <Toolbar>
          {(isMobile || isTablet) && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {headerTitle}
          </Typography>
          <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" edge="end" aria-label="account of current user" onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" edge="end" aria-label="account of current user" onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
            
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Typography variant='h6' sx={{fontSize:'16px'}}>Shobha sv</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile || isTablet ? 'temporary' : 'permanent'}
        open={isMobile  ? open : true}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#001B04',
            color: 'white',
          },
        }}
      >
        {(isMobile || isTablet) && <Toolbar />}
        <Box>
          <Typography variant="h6" align="center" sx={{ m: '2px' }}>
            <IconButton>
              <HomeIcon sx={{ color: 'white' }} />
            </IconButton>
            GEO GPT
          </Typography>
        </Box>
        <List>
          {/* Static MAS */}
          <ListItem  onClick={() => handleMenuClick("Static MAS")}>
            <ListItemIcon><HomeIcon sx={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Static MAS" />
          </ListItem>

          {/* State Menu */}
          <ListItem  onClick={toggleStateMenu}>
            <ListItemIcon><StateIcon sx={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="State" />
            {stateOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={stateOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem  sx={{ pl: 4 }} onClick={() => handleMenuClick("State - Overall")}>
                <ListItemIcon><CityIcon sx={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="Overall" />
              </ListItem>
              <ListItem  sx={{ pl: 4 }} onClick={() => handleMenuClick("State - Urban")}>
                <ListItemIcon><CityIcon sx={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="Urban" />
              </ListItem>
              <ListItem  sx={{ pl: 4 }} onClick={() => handleMenuClick("State - Rural")}>
                <ListItemIcon><RuralIcon sx={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="Rural" />
              </ListItem>
            </List>
          </Collapse>

          {/* District Menu */}
          <ListItem  onClick={toggleDistrictMenu}>
            <ListItemIcon><CityIcon sx={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="District" />
            {districtOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={districtOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem  sx={{ pl: 4 }} onClick={() => handleMenuClick("District - Overall")}>
                <ListItemIcon><TownIcon sx={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="Overall" />
              </ListItem>
              <ListItem  sx={{ pl: 4 }} onClick={() => handleMenuClick("District - Urban")}>
                <ListItemIcon><TownIcon sx={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="Urban" />
              </ListItem>
              <ListItem  sx={{ pl: 4 }} onClick={() => handleMenuClick("District - Rural")}>
                <ListItemIcon><RuralIcon sx={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="Rural" />
              </ListItem>
            </List>
          </Collapse>

          {/* Outlet */}
          <ListItem  onClick={() => handleMenuClick("Outlet")}>
            <ListItemIcon><OutletIcon sx={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Outlet" />
          </ListItem>

          {/* User Guide */}
          <ListItem  onClick={() => handleMenuClick("User Guide")}>
            <ListItemIcon><UserGuideIcon sx={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="User Guide" />
          </ListItem>
        </List>
      </Drawer>

      {/* Content Area */}
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto', ml: { sm: `${drawerWidth}px` } }}> */}
  {/* <Toolbar /> Ensures content starts below AppBar */}
  {/* <Typography paragraph>
    {`Welcome to ${headerTitle}`}
  </Typography> */}
  {/* <Typography paragraph>
    {`Home ${headerTitle}`}
  </Typography> */}
{/* </Box> */}

    </Box>
  );
};

export default Headerhome;
