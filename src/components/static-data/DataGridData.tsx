import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataGridComponent from "../../components/common/DataGridComponent";

const DataGridData: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "stateName", headerName: "State Name", flex: 5 },
    { field: "districtName", headerName: "District Name", flex: 1 },
    {
      field: "population",
      headerName: "Total Population",
      type: "number",
      flex: 1,
    },
    {
      field: "households",
      headerName: "No of Household",
      type: "number",
      flex: 1,
    },
    { field: "mis", headerName: "MIS", type: "number", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      stateName: "Andhra Pradesh",
      districtName: "Amaravati",
      population: 9621551,
      households: 2377056,
      mis: 100,
    },
    {
      id: 2,
      stateName: "Tamil Nadu",
      districtName: "Chennai",
      population: 11060148,
      households: 2430616,
      mis: 94.507,
    },
    {
      id: 3,
      stateName: "Assam",
      districtName: "Dispur",
      population: 9356962,
      households: 2027743,
      mis: 91.665,
    },
    {
      id: 4,
      stateName: "Bihar",
      districtName: "Patna",
      population: 9429408,
      households: 2076607,
      mis: 88.428,
    },
    {
      id: 5,
      stateName: "Karnataka",
      districtName: "Bangalore",
      population: 10009781,
      households: 2283567,
      mis: 77.796,
    },
    {
      id: 6,
      stateName: "Punjab",
      districtName: "Chandigarh",
      population: 7214225,
      households: 1705506,
      mis: 63.795,
    },
  ];
  return (
    <Box>
      <DataGridComponent columns={columns} rows={rows} />
    </Box>
  );
};

export default DataGridData;
