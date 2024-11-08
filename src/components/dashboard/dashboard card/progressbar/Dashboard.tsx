/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import CityCount from './CityCount';
import CoveredVillages from './CoveredVillages';
import OutletCount from './OutletCount';
import SSFABilling from './SSFABilling';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery('(max-width: 1024px)');

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
      borderRadius: 8,
      padding: '0px 0px 18px',
      gap: '10px',
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
      borderRadius: 8,
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
    <div style={styles.mainContainer}>
      <div style={styles.sectionContainer}>
        <div style={styles.header}>SSFA</div>
        <div style={styles.grid}>
          <CityCount />
          <CoveredVillages />
          <OutletCount />
          <SSFABilling />
        </div>
      </div>
      <div style={styles.sectionContainer}>
        <div style={styles.header}>PFA</div>
        <div style={styles.grid}>
          <CityCount />
          <CoveredVillages />
          <OutletCount />
          <SSFABilling />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
