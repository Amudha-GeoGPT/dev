// import { Outlet } from "react-router-dom";
// import Headerhome from "../../components/header-home/header-home";
// import { Box, Paper } from "@mui/material";
// import { useTheme, useMediaQuery } from "@mui/material";

// const Headerlayout = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
//   const isLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"));
  
//   const drawerWidth = isMobile ? 200 : isTablet ? 250 : isLaptop ? 90 : 190;
//   const marginLeft = isMobile ? 10 : isTablet ? 20 : isLaptop ? 12 : 23;

//   return (
//     <>  
//       <Headerhome />
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           height: '100vh',
//           overflow: 'auto',
//           pt: 8,
//           ml: marginLeft,
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             flex: 1,
//             ml: 4,
//             p: 1,
//             minHeight: `calc(10vh - 180px)`,
//             width: {
//               xs: `calc(100% - 38px)`,
//               sm: `calc(100% - ${drawerWidth}px - (-158px))`,
//               md: `calc(100% - ${drawerWidth}px - (-158px))`,
//               lg: `calc(100% - ${drawerWidth}px - (-158px))`
//             }
//           }}
//         >
//           <Outlet />
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default Headerlayout;

import { Outlet } from "react-router-dom";
import Headerhome from "../../components/header-home/header-home";
import { Box, Grid, Paper } from "@mui/material";
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
          ml: 23,
        }}
      >
        <Grid
          elevation={3}
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