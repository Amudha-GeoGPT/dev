import React from 'react';
import { Box, Typography } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OutletCount = () => {
  const percentage = 60;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: {
          xs: '90%', // Use a percentage for better responsiveness
          sm: '80%',
          md: '60%',
          lg: '40%',
        },
        height: 'auto',
        background: 'linear-gradient(105.39deg, #32CDDC 2.97%, #44D799 97.74%)',
        borderRadius: '12px',
        boxShadow: '0px 6px 8px rgba(168, 168, 168, 0.12)',
        padding: { xs: 2, sm: 2.5, md: 3 },
        gap: 1.5,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0px 8px 12px rgba(168, 168, 168, 0.2)',
        },
      }}
    >
      <Box
        sx={{
          width: '50%',
          maxWidth: { xs: 70, sm: 88, md: 100 },
          height: 'auto',
          aspectRatio: '1',
        }}
      >
        <CircularProgressbar
          value={percentage}
          text="5"
          styles={buildStyles({
            pathColor: '#2F68DD',
            textColor: '#FFFFFF',
            trailColor: '#EEEEEE',
            backgroundColor: '#FFFFFF',
            textSize: '24px',
            pathTransitionDuration: 0.5,
            rotation: 0.25,
          })}
        />
      </Box>

      <Typography
        sx={{
          fontSize: { xs: 16, sm: 18, md: 20 },
          color: '#FEFEFE',
          fontFamily: 'Montserrat',
          fontWeight: 500,
          lineHeight: 1.2,
          textAlign: 'center',
          width: '100%',
        }}
      >
        Outlet Count
      </Typography>
    </Box>
  );
};

export default OutletCount;
