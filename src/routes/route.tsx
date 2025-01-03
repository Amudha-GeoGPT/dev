import Headerlayout from "../layouts/dashboard-layout/Headerlayout";
import NewMap from "../components/dashboard/map/NewMap";
import AnotherDataGrid from "../components/dashboard/map/AnotherDataGrid";

const Router = [
  {
    path: "/",
    element: <Headerlayout />,
    children: [
      { path: "/", element: <NewMap /> },
      { path: "/sample", element: <NewMap /> },
      { path: "/anotherdatagrid", element: <AnotherDataGrid /> },
    ],
  },
];

export default Router;
