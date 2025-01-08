import { Box, Typography } from "@mui/material";
import Index from "../components/dashboard/map/Index";
import StoreIcon from '@mui/icons-material/Store';

const MainLayout = () => {
  return (
    <>
      <Box
        sx={{
          background: "black",
          width: "100%",
          height: "60px",
          display: "flex",
          alignItems: "center",
        //   justifyContent: "space-between",  // Ensures space between text and icon
          px: 2, // Adds padding to the left and right
        }}
      >
        <Typography sx={{ color: "white", fontWeight: "bold" }}>
          GEO GPT
        </Typography>
        <StoreIcon sx={{ color: "#baec36" ,ml:1}} />
      </Box>
      <Box sx={{ p: 2 }}> {/* Adds some padding around the Index component */}
        <Index />
      </Box>
    </>
  );
};

export default MainLayout;
