import NewMap from "../components/dashboard/map/LocationComponent";
import AnotherDataGrid from "../components/dashboard/map/AnotherDataGrid";
import Index from "../components/dashboard/map/Index";
import Headerlayout from "../layouts/dashboard-layout/Headerlayout";
import LocationComponent from "../components/dashboard/map/LocationComponent";
import MainLayout from "../layouts/MainLayout";

const Router = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainLayout /> },
      { path: "/anotherdatagrid", element: <AnotherDataGrid /> },

    ],
  },
];

export default Router;
