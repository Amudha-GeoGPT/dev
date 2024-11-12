/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Dashboard = () => {
  const theme = useTheme();

  const cardData = [
    { title: 'City Count', value: 20, text: '1' },
    { title: 'Covered Village', value: 50, text: '5' },
    { title: 'Outlet Count', value: 90, text: '45' },
    { title: 'SSFA Billing %', value: 75, text: '55' },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 1600, margin: 'auto', display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
      {['PFA', 'SSFA'].map((section, sectionIndex) => (
        <Box key={sectionIndex}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '12px 16px',
              gap: '4px',
              width: '100%',
              height: '44px',
              background: '#001B04',
              boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), inset 0px 0px 0px 1px rgba(16, 24, 40, 0.18), inset 0px -2px 0px rgba(16, 24, 40, 0.05)',
              borderRadius: '8px',
              marginBottom: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '20px',
                textTransform: 'capitalize',
                color: '#FFFFFF',
              }}
            >
              {section}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)', // Four cards in a row for medium screens and above
              },
              gap: {
                xs: 2,
                sm: 2.5,
                md: 3
              },
              paddingY: {
                xs: 1,
                sm: 2,
                md: 2.5
              },
              width: '100%'
            }}
          >
            {cardData.map((card, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: {
                    xs: 2,
                    sm: 2.5,
                    md: 3
                  },
                  height: {
                    xs: '150px',
                    sm: '160px',
                    md: '170px'
                  },
                  background: 'linear-gradient(105.39deg, #32CDDC 2.97%, #44D799 97.74%)', // Gradient background
                  border: '1px solid #E1E1E1',
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  borderRadius: '12px',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
                <CircularProgressbar
                  value={card.value}
                  text={card.text}
                  strokeWidth={12} // Increase the stroke width
                  styles={buildStyles({
                    pathColor: '#2F68DD',
                    textColor: '#FFFFFF',
                    trailColor: '#EEEEEE',
                    textSize: '24px',
                  })}
                />
                <Typography
                  variant="h6"
                  color="white"
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '11.33px'
                    },// font size
                    fontWeight: 700,
                    lineHeight: 1.5,
                    letterSpacing: '-0.02em',
                    marginTop: 1,
                    paddingX: 2
                  }}
                >
                  {card.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Dashboard;