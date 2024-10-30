import Dashboard from '../pages/dashboard/dashboard';
import Headerlayout from '../layouts/dashboard-layout/Headerlayout';
import Overall from '../components/dashboard/overall';
const Router = [
  {
    path: '/',
    element: <Headerlayout />, 
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/stateoverall', element: <Overall /> },
    ],
  },
];

export default Router;
