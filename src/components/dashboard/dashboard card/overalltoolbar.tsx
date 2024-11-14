/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import StaticCard from './card';
import Dashboard from './progressbar/Dashboard';
import TableDashboard from './tabledatadashboard';

const Overalltabbar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        padding: {
          xs: '12px',
          sm: '20px',
          md: '32px',
        },
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'SemiBold 800',
          fontWeight: 600,
          fontSize: {
            xs: '14px',
            sm: '16px',
            md: '18px',
          },
          lineHeight: {
            xs: '20px',
            sm: '24px',
            md: '28px',
          },
          color: '#101828',
          marginTop: {
            xs: '16px',
            sm: '24px',
            md: '32px',
          },
        }}
      >
        Village Planning
      </Typography>

      <Grid
        container
        spacing={{ xs: 1.5, sm: 2, md: 3 }}
        sx={{
          width: '100%',
          flexGrow: 1,
          height: 'auto',
          minHeight: '100%',
        }}
      >
        <Grid item xs={12}>
          <StaticCard />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'SemiBold 800',
              fontWeight: 600,
              fontSize: {
                xs: '14px',
                sm: '16px',
                md: '18px',
              },
              lineHeight: {
                xs: '20px',
                sm: '24px',
                md: '28px',
              },
              color: '#101828',
              marginTop: {
                xs: '16px',
                sm: '24px',
                md: '32px',
              },
              marginBottom: {
                xs: '08px',
                sm: '16px',
                md: '20px',
              },
            }}
          >
            Village Planning
          </Typography>
          <Grid
            container
            spacing={{ xs: 1.5, sm: 2, md: 3 }}
            sx={{
              width: '100%',
              flexGrow: 1,
              height: 'auto',
              minHeight: '100%',
            }}
          >
            <Grid item xs={12}>
              <Dashboard />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              height: 'auto',
              minHeight: {
                xs: '200px',
                sm: '250px',
                md: '300px',
              },
              marginBottom: {
                xs: '16px',
                sm: '24px',
                md: '32px',
              },
              overflowX: 'auto',
            }}
          >
            <TableDashboard />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overalltabbar;
