import React from 'react';
import { useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DefaultImagebg from '../../assets/images/svg/DefaultLoadingimgbg.svg';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  // Media queries for different screen sizes
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const drawerWidth = isMobile ? 200 : 240;

  // Define responsive styles for the SVG container
  const imageStyles = {
    height: isMobile ? '80%' : isTablet ? '60%' : '50%',
    width: isMobile ? '80%' : isTablet ? '60%' : '50%',
    marginTop: isMobile ? '100px' : isTablet ? '140px' : '180px',
    marginLeft: isMobile ? 'auto' : isTablet ? 'auto' : '225px',
    marginRight: isMobile ? 'auto' : undefined, // Center on mobile
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  };

  return (
    <Box
      display="flex"
      sx={{
        flexGrow: 1,
        p: 3,
        overflow: 'auto',
        ml: { sm: `${drawerWidth}px` },
        backgroundColor:"#FAFFFA",

      }}
    >
      {/* Content Area */}
      <Box
        component="img"
        src={DefaultImagebg}
        sx={imageStyles}
      />
    </Box>
  );
};

export default Dashboard;
