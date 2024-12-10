import Headerlayout from '../layouts/dashboard-layout/Headerlayout';
import Overall from '../components/dashboard/staticmac-state/staticmac-state';
import Staticmacdistrict from '../components/dashboard/staticmac-district/staticmac-disrtict';
import Staticmactown from '../components/dashboard/staticmac-town/staticmac-town';
import Staticmacoutlet from '../components/dashboard/systematic outlet/outletplanning';
import IndiaMap from '../components/dashboard/map/Tamilnadumap';


const Router = [
  {
    path: '/',
    element: <Headerlayout />,
    children: [
      { path: '/', element: <IndiaMap /> },
      { path: '/indiaMap', element: <IndiaMap /> },
      { path: '/stateoverall', element: <Overall /> },
      { path: '/Staticmacdistrict', element: <Staticmacdistrict /> },
      { path: '/Staticmactown', element: <Staticmactown /> },
      { path: '/Staticmacoutletplanning', element: <Staticmacoutlet /> },
    ],
  },
];

export default Router;
