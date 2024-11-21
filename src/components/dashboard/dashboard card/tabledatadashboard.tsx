import React, { useState } from 'react';
import DashboardTabledata from './outletdashboardtabledata';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const TableDashboard = () => {
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down('md'));
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    'Outlet Summary': true // Set Outlet Summary to be open by default
  });

  const handleClick = (section: string) => {
    setOpenSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const sections = [
    { title: 'Outlet Summary', content: 'Total outlet count - CSNG' },
    { title: 'Covered / Uncovered Village Count', content: 'SSFA JC Wise Outlet Count' },
    { title: 'Covered Village Count', content: 'RSC JC Wise Outlet Count' },
  ];

  const styles: { [key: string]: React.CSSProperties } = {
    mainContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: isTabletOrSmaller ? 'column' as const : 'row' as const,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '20px',
      padding: '10px',
    },
    sectionContainer: {
      width: isTabletOrSmaller ? '100%' : '32%', // Adjust width for desktop view to fit three in a row
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
      padding: '0px 0px 18px',
      gap: '10px',
      overflow: 'hidden',
      transition: 'height 0.3s ease',
    },
    header: {
      width: '100%',
      height: 44,
      backgroundColor: '#001B04',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 600,
      textTransform: 'capitalize' as const,
      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), inset 0px 0px 0px 1px rgba(16, 24, 40, 0.18), inset 0px -2px 0px rgba(16, 24, 40, 0.05)',
      borderRadius: 2,
      cursor: 'pointer',
    },
    contentWrapper: {
      width: '100%',
      padding: '13px', // Add padding for spacing between title and content
      textAlign: 'center',
    },
    content: {
      overflow: 'hidden',
      transition: 'max-height 0.3s ease',
      maxHeight: '0px', // Collapsed state
    },
    contentExpanded: {
      maxHeight: '1000px', // Expanded state, adjust as needed
    },
    grid: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row' as const,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 18,
      flexWrap: isTabletOrSmaller ? 'wrap' as const : 'nowrap' as const,
    },
    contentTable: {
      width: '100%', // Make table data width equal to the title container width
      padding: '10px 0 0', // Add top padding for spacing between content and table
    },
  };

  return (
    <Box sx={styles.mainContainer}>
      {sections.map((section) => (
        <Box
          key={section.title}
          sx={{
            ...styles.sectionContainer,
            height: openSections[section.title] ? 'auto' : '274px',
          }}
        >
          <Box
            sx={{
              ...styles.header,
              backgroundColor: openSections[section.title] ? '#001B04' : '#FFFFFF',
              color: openSections[section.title] ? '#FFFFFF' : '#001B04',
            }}
            onClick={() => handleClick(section.title)}
          >
            <Typography 
              variant={isTabletOrSmaller ? "subtitle1" : "h6"}
              sx={{ 
                fontSize: {
                  xs: '0.875rem',  // Mobile
                  sm: '1rem',      // Tablet
                  md: '0.85rem'    // Desktop
                },
                fontWeight: 8
              }}
            >
              {section.title}
            </Typography>
          </Box>
          <Box sx={styles.contentWrapper}>
            <Typography 
              variant="body2"
              sx={{
                ...styles.content,
                ...(openSections[section.title] && styles.contentExpanded),
                fontSize: {
                  xs: '0.75rem',    // Mobile
                  sm: '0.875rem',   // Tablet
                  md: '1rem'        // Desktop
                },
              }}
            >
              {section.content}
            </Typography>
            {openSections[section.title] && (
              <Box sx={styles.contentTable}>
                <DashboardTabledata />
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TableDashboard;
