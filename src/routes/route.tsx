/* eslint-disable @typescript-eslint/no-unused-vars */
import AnotherDataGrid from "../components/dashboard/map/AnotherDataGrid";

import MainLayout from "../layouts/MainLayout";
// Add this interface at the top of your file with the other imports
interface SetWardNoo {
  Universal_Outlet_Count: number;
  boundaries: Array<{ latitude: number; longitude: number }>;
  ck_outlet_count: number;
  color_code: string;
  district_name: string;
  ward_no: string;
  fillColor: string;
  ward_name: string;
  population_count: number;
}


const Router = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainLayout /> },
      { path: "/anotherdatagrid", element: <AnotherDataGrid setWardPoints={undefined} setWardNo={function (_data: SetWardNoo[]): void {
        throw new Error("Function not implemented.");
      } } /> },
    ],
  },
];

export default Router;
