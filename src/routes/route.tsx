import { RouteObject, Navigate } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import Report from "../pages/Admin/Report";
 
const routes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/reportgrid",
    element: <Report />,
  },
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },
];
 
export default routes;
 
 