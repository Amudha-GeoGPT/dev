import Dashboard from '../pages/dashboard/dashboard';
import Headerlayout from '../layouts/dashboard-layout/Headerlayout';
import Overall from '../components/dashboard/staticmac-state/staticmac-state';
import Staticmacdistrict from '../components/dashboard/staticmac-district/staticmac-disrtict';
import Staticmactown from '../components/dashboard/staticmac-town/staticmac-town';

const Router = [
  {
    path: '/',
    element: <Headerlayout />, 
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/stateoverall', element: <Overall /> },
      { path: '/Staticmacdistrict', element: <Staticmacdistrict /> },
      { path: '/Staticmactown', element: <Staticmactown /> },
    
    ],
  },
];

export default Router;
