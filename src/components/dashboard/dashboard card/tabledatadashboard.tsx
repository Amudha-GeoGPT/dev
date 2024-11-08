import React, { useState } from 'react';
import DashboardTabledata from './dashboardtabledata';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const TableDashboard = () => {
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down('md'));
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
const handleClick = (section: string) => {
  // setSelectedSection(selectedSection === section ? null : section);
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
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      padding: '10px',
    },
    sectionContainer: {
      width: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: -10,
      padding: '0px 0px 18px',
      gap: '10px',
      // cursor: 'pointer',
      overflow: 'hidden',
      //  transition: 'all 0.3s ease',
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
    },
    grid: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row' as const,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 18,
      flexWrap: isTabletOrSmaller ? 'wrap' as const : 'nowrap' as const
    }
  };

  return (
    <Box sx={styles.mainContainer}>
      {sections.map((section) => (
        <Box
          key={section.title}
          sx={{
            ...styles.sectionContainer,
            height: openSections[section.title] ? 'auto' : 274,
          }}
          onClick={() => handleClick(section.title)}
        >
          <Box
            sx={{
              ...styles.header,
              backgroundColor: openSections[section.title] ? '#001B04' : '#FFFFFF',
              color: openSections[section.title] ? '#FFFFFF' : '#001B04',
            }}
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
          <Typography 
            variant="body2"
            sx={{
              fontSize: {
                xs: '0.75rem',    // Mobile
                sm: '0.875rem',   // Tablet
                md: '1rem'        // Desktop
              },
              padding: '0 10px',
              textAlign: 'center'
            }}
          >
            {section.content}
          </Typography>
          {openSections[section.title] && (
            <Box sx={styles.grid}>
              <DashboardTabledata />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TableDashboard;

// import React, { useState } from 'react';
// import DashboardTabledata from './dashboardtabledata';
// import { Box, Typography } from '@mui/material';

// const TableDashboard = () => {
//   const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

//   const handleClick = (section: string) => {
//     setOpenSections(prevState => ({
//       ...prevState,
//       [section]: !prevState[section]
//     }));
//   };

//   const sections = [
//     { title: 'Outlet Summary', content: 'Total outlet count - CSNG' },
//     { title: 'Covered / Uncovered Village Count', content: 'SSFA JC Wise Outlet Count' },
//     { title: 'Covered Village Count', content: 'RSC JC Wise Outlet Count' },
//   ];

//   return (
//     <Box sx={styles.mainContainer}>
//       {sections.map((section) => (
//         <Box
//           key={section.title}
//           sx={{
//             ...styles.sectionContainer,
//             height: openSections[section.title] ? 'auto' : 274,
//           }}
//           onClick={() => handleClick(section.title)}
//         >
//           <Box
//             sx={{
//               ...styles.header,
//               backgroundColor: openSections[section.title] ? '#001B04' : '#FFFFFF',
//               color: openSections[section.title] ? '#FFFFFF' : '#001B04',
//             }}
//           >
//             <Typography variant="h6">{section.title}</Typography>
//           </Box>
//           <Typography variant="body2">{section.content}</Typography>
//           {openSections[section.title] && (
//             <Box sx={styles.grid}>
//               <DashboardTabledata toggleSection={() => handleClick(section.title)} />
//             </Box>
//           )}
//         </Box>
//       ))}
//     </Box>
//   );
// };

// const styles = {
//   mainContainer: {
//     width: '100%',
//     maxWidth: 1200,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     padding: '32px 0px',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     gap: '20px',
//     marginTop: '20px',
//     flexWrap: 'wrap', // Allow wrapping for responsiveness
//   },
//   sectionContainer: {
//     width: '100%',
//     maxWidth: 524,
//     minHeight: 274,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     padding: '0px 0px 18px',
//     gap: '10px',
//     cursor: 'pointer',
//     overflow: 'hidden',
//     transition: 'all 0.3s ease',
//   },
//   header: {
//     width: '100%',
//     height: 44,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontSize: 14,
//     fontWeight: 600,
//     textTransform: 'capitalize',
//     boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), inset 0px 0px 0px 1px rgba(16, 24, 40, 0.18), inset 0px -2px 0px rgba(16, 24, 40, 0.05)',
//     borderRadius: 8,
//   },
//   grid: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 18,
//   },
// };

// export default TableDashboard;
