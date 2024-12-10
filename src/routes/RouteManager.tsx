import React from "react";
import Headerlayout from "../layouts/dashboard-layout/Headerlayout";
import Overall from "../components/dashboard/staticmac-state/staticmac-state";
import Staticmacdistrict from "../components/dashboard/staticmac-district/staticmac-disrtict";
import Staticmactown from "../components/dashboard/staticmac-town/staticmac-town";
import Staticmacoutlet from "../components/dashboard/systematic outlet/outletplanning";
import Dashboard from "../pages/dashboard/dashboard";
import MainLayout from "../components/Layout/MainLayout";
const RouterManager = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/stateoverall", element: <Overall /> },
      { path: "/Staticmacdistrict", element: <Staticmacdistrict /> },
      { path: "/Staticmactown", element: <Staticmactown /> },
      { path: "/stateoverall", element: <Overall /> },
      { path: "/Staticmacoutletplanning", element: <Staticmacoutlet /> },
      // { path: '/Staticmacoutletplanning', element: <IndiaMap /> },
    ],
  },
];

export default RouterManager;
