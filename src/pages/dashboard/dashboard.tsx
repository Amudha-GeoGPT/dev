import React from 'react';
import {useMediaQuery,Box} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DefaultImagebg from '../../assets/images/svg/DefaultLoadingimgbg.svg'
const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const drawerWidth = isMobile ? 200 : 240;

  return (
    <Box display="flex" sx={{ flexGrow: 1, p: 3, overflow: 'auto', ml: { sm: `${drawerWidth}px` } }}>
      

      {/* Content Area */}
      
      <Box component="img" src={DefaultImagebg} sx={{
          backgroundSize: 'cover', // Ensure the background covers the entire area
          backgroundPosition: 'center', // Center the background image
          height: isMobile ? '100%':'70%',
          width: isMobile ?'100%':'70%',
          marginTop:'75px'
        }}/>
</Box>
  );
};

export default Dashboard;
