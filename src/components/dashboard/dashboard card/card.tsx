/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography } from '@mui/material';

const StaticCard = () => {

  const cardData = [
    { title: 'Total Village', value: '17530' },
    { title: 'Ck Covered Villages', value: '5592' },
    { title: 'Ck Covered Villages', value: '11938' },
    { title: 'Village Covered %', value: '31.90%' },
    { title: 'CK Count of City', value: '31.90%' },
    { title: 'Total Outlets In CK', value: '79' },
  ];

  const getBackgroundColor = (index: number) => {
    const colors = [
      '#FF98BE',
      '#DCADFB',
      '#85DEBE',
      '#E7DE57',
      '#28C2FF',
      '#FF98BE'
    ];
    return colors[index % colors.length];
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(6, 1fr)'
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
            alignItems: 'flex-start',
            paddingY: {
              xs: 2,
              sm: 2.5,
              md: 3
            },
            width: '100%', // Set width to 100% of the parent container
            height: 'auto', // Adjust height to be auto
            minHeight: {
              xs: '100px',
              sm: '110px',
              md: '120px'
            },
            background: getBackgroundColor(index),
            border: '1px solid #E1E1E1',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
            borderRadius: '12px',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            }
          }}
        >
          <Typography
            variant="h6"
            color="white"
            sx={{
              fontSize: {
                xs: '14px',
                sm: '15px',
                md: '16px'
              },
              fontWeight: 600,
              lineHeight: 1.5,
              letterSpacing: '-0.02em',
              marginBottom: 0.5,
              paddingX: 2
            }}
          >
            {card.title}
          </Typography>
          <Typography
            variant="body2"
            color="white"
            sx={{
              fontSize: {
                xs: '22px',
                sm: '24px',
                md: '27px'
              },
              fontWeight: 600,
              lineHeight: 1.5,
              letterSpacing: '-0.02em',
              paddingX: 2
            }}
          >
            {card.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default StaticCard;
