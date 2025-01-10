import AnotherDataGrid from "../components/dashboard/map/AnotherDataGrid";

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
