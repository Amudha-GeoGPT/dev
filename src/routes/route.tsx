import { RouteObject, Navigate } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import Report from "../pages/Admin/Report";
import DynamicApiDataGrid from "../pages/Admin/ReportProject";
 
const routes: RouteObject[] = [
  {
    path: "/reportform",
    element: <AdminPage />,
  },
  {
    path: "/reportgrid",
    element: <Report />,
  },
  {
    path: "/",
    element: <Navigate to="/reportform" replace />,
  },
  {
    path: "/reportproject",
    element: <DynamicApiDataGrid />,
  },
];
 
export default routes;
 
 