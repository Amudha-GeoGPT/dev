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
import outletwithoutclr from '../../assets/images/svg/outletimg.svg';
import outletwithclr from '../../assets/images/svg/Vectorwithclr.svg';
import Home from '../../assets/images/svg/Home.svg';
import search from '../../assets/images/svg/search.svg';
import Homewithcolor from '../../assets/images/svg/Homewithcolor.svg'
import userguide from '../../assets/images/svg/userguide.svg'
import { SecondayText } from '../styles/fontsize.const';
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
const ActiveGreenBox={
  height:'100%',  
  borderTopLeftRadius: '10px',   
  borderBottomLeftRadius: '10px',
  background:"#BAEC36",
  width:"7px",
  position:"absolute",
  right:0
}
const Headerhome: React.FC = () => {
  const [] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
 
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

  const drawerWidth = 216; // Set a fixed width for the drawer

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
                {selectedItem === "Static MAS" || selectedItem === "Static MAS-State-overall" || selectedItem ==="Static MAS-State-Urban" || selectedItem === "Static MAS-State-Rural" || selectedItem === "Static MAS-district-overall" || selectedItem === "Static MAS-district-Urban" || selectedItem === "Static MAS-district-Rural" || selectedItem === "Static MAS-Town" || selectedItem === "Static MAS-Sub District Rural"?
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
            }}} primary="Static MAS" style={{cursor:'pointer'}}/>
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
                <ListItemText primary="State" sx={{cursor:'pointer'}}/>
                {stateOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={stateOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem

                    onClick={() => handleMenuClick("Static MAS-State-overall")}
                    sx={{
                      pl: 4,
                      color: selectedItem === "Static MAS-State-overall" ? '#BAEC36' : 'white',
                      position:"relative"
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
                    <ListItemText primary="Overall" sx={{cursor:'pointer'}}/>
                    {selectedItem === "Static MAS-State-overall" && (
                    <Box sx={ActiveGreenBox}></Box>)}
                  </ListItem>
                  <ListItem

                    onClick={() => handleMenuClick("Static MAS-State-Urban")}
                    sx={{
                      pl: 4,
                      position:"relative",
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
                    <ListItemText primary="Urban" sx={{cursor:'pointer'}} />
                    {selectedItem === "Static MAS-State-Urban" && (
                    <Box sx={ActiveGreenBox}></Box>)}
                  </ListItem>
                  {/* 3 */}
                  <ListItem

                    onClick={() => handleMenuClick("Static MAS-State-Rural")}
                    sx={{
                      pl: 4,
                      position:"relative",
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
                    <ListItemText primary="Rural" sx={{cursor:'pointer'}} />
                    {selectedItem === "Static MAS-State-Rural" && (
                    <Box sx={ActiveGreenBox}></Box>)}
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
                <ListItemText  primary="District" sx={{cursor:'pointer'}} />
                {districtOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={districtOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem sx={{
                    pl: 4,
                    position:"relative",
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
                    <ListItemText primary="Overall" sx={{cursor:'pointer'}}/>
                    {selectedItem === "Static MAS-district-overall" && (
                    <Box sx={ActiveGreenBox}></Box>)}
                  </ListItem>
                  <ListItem onClick={() => handleMenuClick("Static MAS-district-Urban")} sx={{
                    pl: 4,
                    position:"relative",
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
                    <ListItemText primary="Urban" sx={{cursor:'pointer'}} />
                    {selectedItem === "Static MAS-district-Urban" && (
                    <Box sx={ActiveGreenBox}></Box>)}
                  </ListItem>
                  <ListItem sx={{
                    pl: 4,
                    position:"relative",
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
                    <ListItemText primary="Rural" sx={{cursor:'pointer'}}/>
                    {selectedItem === "Static MAS-district-Rural" && (
                    <Box sx={ActiveGreenBox}></Box>)}
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
                <ListItemText primary="Town" sx={{ color: selectedItem === "Static MAS-Town" ? '#BAEC36' : 'white',cursor:'pointer' }} />
                {selectedItem === "Static MAS-Town" && (
                    <Box sx={ActiveGreenBox}></Box>)}
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
                <ListItemText primary="Sub District Rural" sx={{ color: selectedItem === "Static MAS-Sub District Rural" ? '#BAEC36' : 'white',cursor:'pointer'}}  primaryTypographyProps={{fontSize:"16px"}} />
                {selectedItem === "Static MAS-Sub District Rural" && (
                    <Box sx={ActiveGreenBox}></Box>)}
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
            }}} primary="Outlet Planning" style={{cursor:'pointer'}} />
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
            }}} primary="User guide" style={{cursor:'pointer'}}/>
          </ListItem>

        </List>
      </Drawer>
    </Box>
  );
};

export default Headerhome;