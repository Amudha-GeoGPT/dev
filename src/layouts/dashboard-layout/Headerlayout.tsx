import { Outlet } from "react-router-dom";
import Headerhome from "../../components/header-home/header-home";
import { Box, Grid } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
 
const Headerlayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? 200 : 190;
 
  return (
    <>  
      <Headerhome />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'auto',
          pt:8,
          ml: -4,
        }}
      >
        <Grid
          container
          sx={{
            flex: 1,
            ml: 4,
            p: 1,
            minHeight: `calc(10vh - 180px)`,
            width: {
              xs: `calc(100% - 38px)`,
              sm: `calc(100% - ${drawerWidth}px - (-158px))`
            }
          }}
        >
          <Outlet />
        </Grid>
      </Box>
    </>
  );
};
export default Headerlayout;
 