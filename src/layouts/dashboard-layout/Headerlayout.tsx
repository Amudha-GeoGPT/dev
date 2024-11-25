import { Outlet } from "react-router-dom";
import Headerhome from "../../components/header-home/header-home";
import { FC } from 'react';
import { styled, Container, Box, useTheme } from '@mui/material';
import Overall from '../../components/dashboard/staticmac-state/staticmac-state';

// import { useSelector } from '@/store/Store';
// import { Outlet } from 'react-router-dom';
// import { AppState } from '@/store/Store';
// import Header from './vertical/header/Header';
// import Sidebar from './vertical/sidebar/Sidebar';
// import Customizer from './shared/customizer/Customizer';
// import Navigation from '../full/horizontal/navbar/Navigation';
// import HorizontalHeader from '../full/horizontal/header/Header';
const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));
 
const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));
const Headerlayout = () => {
  return (
    <MainWrapper>
        {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
       <Headerhome />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {/* {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
       
        {customizer.isHorizontal ? <Navigation /> : ''} */}
        <Container
          sx={{maxWidth:'100%!important'}}> 
       
 
          <Box sx={{ minHeight: 'calc(100vh - 170vh)' }}>
            <Overall />
          </Box>
 
         
        </Container>
       
      </PageWrapper>
     </MainWrapper>
  );
};

export default Headerlayout;