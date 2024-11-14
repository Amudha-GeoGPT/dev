/* eslint-disable @typescript-eslint/no-unused-vars */
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
  ExpandLess,
  ExpandMore,
  Search as SearchIcon,
  AccountCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import stateoverallwithclr from '../../assets/images/svg/stateoverwithclr.svg';
import stateoverallwithoutcolor from '../../assets/images/svg/stateoverallwithoutclr.svg';
import stateurbanwithcolor from '../../assets/images/svg/stateurbanwithclr.svg';
import stateurbanwithoutcolor from '../../assets/images/svg/stateurbanwithoutclr.svg';
import stateruralwithoutcolor from '../../assets/images/svg/stateruralwithoutclr.svg';
import stateruralwithcolor from '../../assets/images/svg/stateruralwithclr.svg';
import commonstateimg from '../../assets/images/svg/commonstate.svg';
import commondistrictimg from '../../assets/images/svg/commondistrict.svg';
import Townwithcolor from '../../assets/images/svg/Townwithclr.svg';
import Townwithoutcolor from '../../assets/images/svg/Townwithoutclr.svg';
import subdistrictwithcolor from '../../assets/images/svg/subdistrictwithclr.svg';
import subdistrictwithoutcolor from '../../assets/images/svg/subdistrictwithout.svg';
import notificationimg from '../../assets/images/svg/notification.svg';
import avatariconimg from '../../assets/images/svg/Avatarimg.svg';
import vectorheaderimg from '../../assets/images/svg/Vectorimg.svg';
import outletwithoutclr from '../../assets/images/svg/outletimg.svg';
import outletwithclr from '../../assets/images/svg/Vectorwithclr.svg';
import Home from '../../assets/images/svg/Home.svg';
import search from '../../assets/images/svg/search.svg';
import Homewithcolor from '../../assets/images/svg/Homewithcolor.svg'
import userguide from '../../assets/images/svg/userguide.svg'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
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
  const [staticMasOpen, setStaticMasOpen] = useState(false);
  const [staticMasVisible, setStaticMasVisible] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Village Outlet Planning");
  const [selectedItem, setSelectedItem] = useState("Village Outlet Planning"); // New state to track selected item
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();


  const handleDrawerToggle = () => setOpen(!open);
  // const toggleStateMenu = () => setStateOpen(!stateOpen);
  // const toggleDistrictMenu = () => setDistrictOpen(!districtOpen);

  const toggleStateMenu = () => {
    setStateOpen(!stateOpen);
    setDistrictOpen(false);
  }
  const toggleStaticmasMenu = () => {
    setStaticMasOpen(true);
    setStaticMasVisible(true); // Add this line to show Static MAS section
  }
  const toggleOutletPlanningMenu = () => {
    setStaticMasOpen(false);
    setStateOpen(false);
    setDistrictOpen(false);
    setStaticMasVisible(false); // Hide Static MAS section
  }
  const toggleDistrictMenu = () => {
    setDistrictOpen(!districtOpen);
    setStateOpen(false);
  }

  const toggleTownMenu = () => {
    // setDistrictOpen(!districtOpen);
    setDistrictOpen(false);
  }


  const handleMenuClick = (title: string) => {
    setHeaderTitle(title);
    setSelectedItem(title); // Update selected item

    if (isMobile || isTablet) setOpen(false);
    switch (title) {
      case "Static MAS":
        navigate('/');
        break;
      case "Static MAS-State-overall":
        navigate('/stateoverall');
        break;
      case "Static MAS-State-Urban":
        navigate('/stateoverall');
        break;
      case "Static MAS-State-Rural":
        navigate('/stateoverall');
        break;
      case "Static MAS-district-overall":
        navigate('/Staticmacdistrict');
        break;
      case "Static MAS-district-Urban":
        navigate('/Staticmacdistrict');
        break;
      case "Static MAS-district-Rural":
        navigate('/Staticmacdistrict');
        break;
      case "Static MAS-Town":
        navigate('/Staticmactown');
        break;
      case "Static MAS-Sub District Rural":
        navigate('/Staticmacdistrict');
        break;
      case "Outlet Planning":
        navigate('/Staticmacoutletplanning');
        break;
      case "User Guide":
        navigate('/stateoverall');
        break;
      // Add cases for other titles  
      default:
        navigate('/');
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const drawerWidth = 200; // Set a fixed width for the drawer

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
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontFamily: 'inter' }}>
            {headerTitle}
          </Typography>
          <Search sx={{ display: { xs: 'none', md: 'flex' }, width: 200, borderRadius: 12, backgroundColor: '#EDF6EE', padding: '0 8px' }}>
            <SearchIconWrapper sx={{ color: '#1E1E1E' }}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search" inputProps={{ 'aria-label': 'search' }} sx={{ color: '#1E1E1E' }} />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" edge="end" aria-label="account of current user" onClick={handleProfileMenuOpen} color="inherit">
              <img
                src={notificationimg}
                alt="notificationimg"
                style={{ width: 32, height: 32 }}
                color='white'
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" edge="end" aria-label="account of current user" onClick={handleProfileMenuOpen} color="inherit">
              <img
                src={avatariconimg}
                alt="avatariconimg"
                style={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, margin: 2 }}>
            <Typography variant='h6' sx={{ fontSize: '16px',fontFamily:'inter'}}>Shobha sv</Typography>
          </Box>
        </Toolbar>  
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isTablet || open}
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
        <Box sx={{ padding: 2 }}>
          <h3 className='name'>
            <IconButton>
              <img
                src={vectorheaderimg}
                alt="vector"
                style={{ width: 18, height: 16, }}

              />
            </IconButton>
            GEO GPT
          </h3>
        </Box>
        <List >
          {/* static mac  */}
          <ListItem
            onClick={() => { handleMenuClick("Static MAS"); toggleStaticmasMenu(); }}
            sx={{
              color: selectedItem.includes("Static MAS") ? 'black' : 'white',
              backgroundColor: selectedItem.includes("Static MAS") ? '#BAEC36' : 'transparent',
              border: selectedItem.includes("Static MAS") ? '1px solid black' : 'none',
              borderRadius: '4px',
              padding: '2px',
              mt: 1,
              
            }}
          >
            <ListItemIcon>
              {/* <HomeIcon sx={{ 
    color: selectedItem.includes("Static MAS") ? 'black' : 'white' 
  }} /> */}
              {/* <img src={Home}/> */}
              <ListItemIcon>
                {selectedItem === "Static MAS" ?
                  <img
                    src={Homewithcolor}
                    alt="overall"
                    style={{ width: 24, height: 24,marginLeft:15 }}
                  /> : <img
                    src={Home}
                    alt="overall"
                    style={{ width: 24, height: 24 ,marginLeft:15}}
                  />}
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText  sx={{fontFamily:'inter',"& .MuiTypography-root":{
              fontFamily:'inter'
            }}} primary="Static MAS" />
            {staticMasOpen ? null : <ExpandMore />}
          </ListItem>
          {/* inside the list */}
          {staticMasVisible && (
            <>

              {/* state */}
              <ListItem onClick={toggleStateMenu}>
                <ListItemIcon> <img
                  src={commonstateimg}
                  alt="commonstate"
                  style={{ width: 24, height: 24,marginLeft:15 }}
                /></ListItemIcon>
                <ListItemText primary="State" />
                {stateOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={stateOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem

                    onClick={() => handleMenuClick("Static MAS-State-overall")}
                    sx={{
                      pl: 4,
                      color: selectedItem === "Static MAS-State-overall" ? '#BAEC36' : 'white',
                    }}
                  >

                    <ListItemIcon>
                      {selectedItem === "Static MAS-State-overall" ?
                        <img
                          src={stateoverallwithclr}
                          alt="overall"
                          style={{ width: 24, height: 24,marginLeft:25 }}
                        /> : <img
                          src={stateoverallwithoutcolor}
                          alt="overall"
                          style={{ width: 24, height: 24,marginLeft:25 }}
                        />}
                    </ListItemIcon>
                    <ListItemText primary="Overall" />
                  </ListItem>
                  <ListItem

                    onClick={() => handleMenuClick("Static MAS-State-Urban")}
                    sx={{
                      pl: 4,
                      color: selectedItem === "Static MAS-State-Urban" ? '#BAEC36' : 'white',
                    }}
                  >
                    <ListItemIcon>
                      {selectedItem === "Static MAS-State-Urban" ?
                        <img
                          src={stateurbanwithcolor}
                          alt="urban"
                          style={{ width: 24, height: 24,marginLeft:25}}
                        /> : <img
                          src={stateurbanwithoutcolor}
                          alt="urban"
                          style={{ width: 24, height: 24,marginLeft:25 }}
                        />}
                    </ListItemIcon>
                    <ListItemText primary="Urban" />
                  </ListItem>
                  {/* 3 */}
                  <ListItem

                    onClick={() => handleMenuClick("Static MAS-State-Rural")}
                    sx={{
                      pl: 4,
                      color: selectedItem === "Static MAS-State-Rural" ? '#BAEC36' : 'white',
                    }}
                  >
                    <ListItemIcon>
                      {selectedItem === "Static MAS-State-Rural" ?
                        <img
                          src={stateruralwithcolor}
                          alt="rural"
                            style={{ width: 24, height: 24,marginLeft:25 }}
                        /> : <img
                          src={stateruralwithoutcolor}
                          alt="rural"
                          style={{ width: 24, height: 24,marginLeft:25 }}
                        />}
                    </ListItemIcon>
                    <ListItemText primary="Rural" />
                  </ListItem>

                  {/* Repeat for other nested items */}
                </List>
              </Collapse>
              {/* District Menu */}
              <ListItem onClick={toggleDistrictMenu}>
                <ListItemIcon> <img
                  src={commondistrictimg}
                  alt="commondistrictimg"
                  style={{ width: 24, height: 24,marginLeft:15 }}
                /></ListItemIcon>
                <ListItemText  primary="District" />
                {districtOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={districtOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem sx={{
                    pl: 4,
                    color: selectedItem === "Static MAS-district-overall" ? '#BAEC36' : 'white',
                  }} onClick={() => handleMenuClick("Static MAS-district-overall")}>
                    <ListItemIcon> {selectedItem === "Static MAS-district-overall" ?
                      <img
                        src={stateoverallwithclr}
                        alt="overall"
                        style={{ width: 24, height: 24,marginLeft:25 }}
                      /> : <img
                        src={stateoverallwithoutcolor}
                        alt="overall"
                        style={{ width: 24, height: 24,marginLeft:25 }}
                      />}</ListItemIcon>
                    <ListItemText primary="Overall" />
                  </ListItem>
                  <ListItem onClick={() => handleMenuClick("Static MAS-district-Urban")} sx={{
                    pl: 4,
                    color: selectedItem === "Static MAS-district-Urban" ? '#BAEC36' : 'white',
                  }}>
                    <ListItemIcon> {selectedItem === "Static MAS-district-Urban" ?
                      <img
                        src={stateurbanwithcolor}
                        alt="urban"
                        style={{ width: 24, height: 24,marginLeft:25 }}
                      /> : <img
                        src={stateurbanwithoutcolor}
                        alt="urban"
                        style={{ width: 24, height: 24,marginLeft:25 }}
                      />}</ListItemIcon>
                    <ListItemText primary="Urban" />
                  </ListItem>
                  <ListItem sx={{
                    pl: 4,
                    color: selectedItem === "Static MAS-district-Rural" ? '#BAEC36' : 'white',
                  }} onClick={() => handleMenuClick("Static MAS-district-Rural")}>
                    <ListItemIcon> {selectedItem === "Static MAS-district-Rural" ?
                      <img
                        src={stateruralwithcolor}
                        alt="rural"
                        style={{ width: 24, height: 24,marginLeft:25 }}
                      /> : <img
                        src={stateruralwithoutcolor}
                        alt="rural"
                        style={{ width: 24, height: 24,marginLeft:25 }}
                      />}</ListItemIcon>
                    <ListItemText primary="Rural" />
                  </ListItem>
                </List>
              </Collapse>
              {/* Town */}
              <ListItem onClick={() => {
                handleMenuClick("Static MAS-Town");
                toggleTownMenu();
              }}>
                <ListItemIcon>{selectedItem === "Static MAS-Town" ?
                  <img
                    src={Townwithcolor}
                    alt="Townwithcolor"
                    style={{ width: 24, height: 24,marginLeft:15 }}
                  /> : <img
                    src={Townwithoutcolor}
                    alt="Townwithcolor"
                    style={{ width: 24, height: 24,marginLeft:15 }}
                  />}</ListItemIcon>
                <ListItemText primary="Town" sx={{ color: selectedItem === "Static MAS-Town" ? '#BAEC36' : 'white' }} />

              </ListItem>

              {/* sub district rural */}
              <ListItem onClick={() => handleMenuClick("Static MAS-Sub District Rural")}>
                <ListItemIcon>{selectedItem === "Static MAS-Sub District Rural" ?
                  <img
                    src={subdistrictwithcolor}
                    alt="subdistrictwithoutcolor"
                    style={{ width: 24, height: 24,marginLeft:15 }}
                  /> : <img
                    src={subdistrictwithoutcolor}
                    alt="subdistrictwithoutcolor"
                    style={{ width: 24, height: 24 ,marginLeft:15 }}
                  />}</ListItemIcon>
                <ListItemText primary="Sub District Rural" sx={{ color: selectedItem === "Static MAS-Sub District Rural" ? '#BAEC36' : 'white' }} />

              </ListItem>
            </>
          )}
          <ListItem
            onClick={() => {
              handleMenuClick("Outlet Planning");
              toggleOutletPlanningMenu();
            }}
            sx={{
              color: selectedItem === "Outlet Planning" ? 'black' : 'white',
              backgroundColor: selectedItem === "Outlet Planning" ? '#BAEC36' : 'transparent',
              border: selectedItem === "Outlet Planning" ? '1px solid black' : 'none',
              borderRadius: '4px',
              padding: '2px',
              mt: 1
            }}
          >
            <ListItemIcon>
              {selectedItem === "Outlet Planning" ?
                <img
                  src={outletwithclr}
                  alt="rural"
                  style={{ width: 24, height: 24,marginLeft:15 }}
                /> : <img
                  src={outletwithoutclr}
                  alt="rural"
                  style={{ width: 24, height: 24,marginLeft:15}}
                />}
            </ListItemIcon>
            <ListItemText sx={{fontFamily:'inter',"& .MuiTypography-root":{
              fontFamily:'inter'
            }}} primary="Outlet Planning" />
          </ListItem>

          {/* <ListItem

            onClick={() => handleMenuClick("User Guide")}
            sx={{
              color: selectedItem === "User Guide" ? 'black' : 'white',
              backgroundColor: selectedItem === "User Guide" ? 'white' : 'transparent',
              border: selectedItem === "User Guide" ? '1px solid black' : 'none',
              borderRadius: '4px',
              padding: '2px',
              mt: 1
            }}

          >
            <ListItemIcon>
              <AssignmentIcon sx={{ color: selectedItem === "User Guide" ? 'black' : 'white', marginLeft: 1 }} />
            </ListItemIcon>
            <ListItemText primary="User Guide" />
          </ListItem> */}
          <ListItem
            onClick={() => handleMenuClick("User Guide")}
            sx={{
              color: selectedItem === "User Guide" ? 'black' : 'white',
              backgroundColor: selectedItem === "User Guide" ? '#BAEC36' : 'transparent',
              border: selectedItem === "User Guide" ? '1px solid black' : 'none',
              borderRadius: '4px',
              padding: '2px',
              mt: 1
            }}

          >
            <ListItemIcon>
              {selectedItem === "User guide" ?
                <img
                  src={userguide}
                  alt="rural"
                  style={{ width: 24, height: 24,marginLeft:15}}
                /> : <img
                  src={userguide}
                  alt="rural"
                  style={{ width: 24, height: 24,marginLeft:15}}
                />}
            </ListItemIcon>
            <ListItemText sx={{fontFamily:'inter',"& .MuiTypography-root":{
              fontFamily:'inter'
            }}} primary="User guide" />
          </ListItem>

        </List>
      </Drawer>
    </Box>
  );
};

export default Headerhome;
