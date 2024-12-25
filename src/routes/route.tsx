/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate, RouteObject } from 'react-router-dom';
import Headerlayout from '../layouts/dashboard-layout/Headerlayout';
import { Login } from '../pages/login/login';
import { ProtectedRoute } from '../store/actions/ProtectedRoute';
import IndiaMap from '../components/dashboard/map/tamilnadumap';
import { EmptyPage } from '../pages/userReport/empty';
import AdminPage from '../pages/Admin/AdminPage';
const routes: RouteObject[] = [

  {
    path: 'admin',
    element: <AdminPage />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Headerlayout />
      </ProtectedRoute>
    ),
    children: [
    
      { 
        path: 'indiaMap', 
        element: <IndiaMap /> 
      },
      {
        path: 'admin',
        element: <AdminPage />
      },
      {
        path: 'empty',
        element: <EmptyPage />
      }
    ]
  }
];



export default routes;


