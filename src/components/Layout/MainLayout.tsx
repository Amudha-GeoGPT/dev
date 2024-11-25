import React from "react";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Outlet } from "@mui/icons-material";
const MainLayout: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={2} sx={{ height: "100vh" }}>
        <Sidebar />
      </Grid>

      <Grid item xs={10}>
        <Grid>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
                height: {
                  xs: "calc(74vh - 32px)",
                  sm: "calc(70vh - 32px)",
                  md: "calc(92vh - 32px)",
                  lg: "calc(94vh - 20px)",
                },
                backgroundColor: "#ffff",
                // borderRadius: "10px",
                boxSizing: "border-box",
                maxWidth: "100vw",
                maxHeight: "97vh",
                boxShadow: "none",
                // border: "1px solid pink",
                "&::-webkit-scrollbar": {
                  width: "0px",
                  height: "0px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
