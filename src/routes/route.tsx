import Headerlayout from "../layouts/dashboard-layout/Headerlayout";
import NewMap from "../components/dashboard/map/LocationComponent";
import AnotherDataGrid from "../components/dashboard/map/AnotherDataGrid";
import Index from "../components/dashboard/map";

const Router = [
  {
    path: "/",
    element: <Index />,
    children: [
      // { path: "/", element: <NewMap /> },
      // { path: "/sample", element: <NewMap /> },
      // { path: "/anotherdatagrid", element: <AnotherDataGrid /> },
      { path: "/index", element: <Index /> },

    ],
  },
];

export default Router;
