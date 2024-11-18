import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataGridComponent from "../../components/common/DataGridComponent";
import { SmallText } from "../styles/fontsize.const";

const TownDataGridData: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: "stateName",
      headerName: "State Name",
      flex: 2,
      sortable: false,
    },
    {
      field: "districtName",
      headerName: "District Name",
      flex: 1,
      sortable: false,
    },
    {
      field: "subdistrictname",
      headerName: "Sub District Name",
      type: "string",
      flex: 1,
      sortable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "townname",
      headerName: "Town Name",
      type: "string",
      flex: 1,
      sortable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "totalpopulation",
      headerName: "Total Population",
      type: "number",
      flex: 1,
      sortable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "households",
      headerName: "No of Household",
      type: "number",
      flex: 1,
      sortable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "mas",
      headerName: "MAS",
      type: "number",
      flex: 1,
      sortable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "allindiarank",
      headerName: "All India Rank",
      type: "number",
      flex: 1,
      sortable: false,
      align: "left",
      headerAlign: "left",
    },
  ];

  const rows = [
    {
      id: 1,
      stateName: "Andhra Pradesh",
      districtName: "Amaravati",
      subdistrictname: "Nellore",
      townname: "Guntur",
      totalpopulation: 9621551,
      households: 2377056,
      mas: 100,
      allindiarank: 1,
    },
    {
      id: 2,
      stateName: "Tamil Nadu",
      districtName: "Chennai",
      subdistrictname: "Chinglepet",
      townname: "Madurai",
      totalpopulation: 11060148,
      households: 2430616,
      mas: 94.507,
      allindiarank: 2,
    },
    {
      id: 3,
      stateName: "Assam",
      districtName: "Dispur",
      subdistrictname: "Nagaon",
      townname: "Jorhat",
      totalpopulation: 9356962,
      households: 2027743,
      mas: 91.665,
      allindiarank: 3,
    },
    {
      id: 4,
      stateName: "Bihar",
      districtName: "Patna",
      subdistrictname: "Gaya",
      townname: "Bihar Sharif",
      totalpopulation: 9429408,
      households: 2076607,
      mas: 88.428,
      allindiarank: 4,
    },
    {
      id: 5,
      stateName: "Karnataka",
      districtName: "Bangalore",
      subdistrictname: "Mysore",
      townname: "Hubli",
      totalpopulation: 10009781,
      households: 2283567,
      mas: 77.796,
      allindiarank: 5,
    },
    {
      id: 6,
      stateName: "Punjab",
      districtName: "Chandigarh",
      subdistrictname: "Amritsar",
      townname: "Ludhiana",
      totalpopulation: 7214225,
      households: 1705506,
      mas: 63.795,
      allindiarank: 6,
    },
  ];
  const fontSize = SmallText;
  return (
    <Box>
      <DataGridComponent columns={columns} rows={rows} fontSize={fontSize} />
    </Box>
  );
};

export default TownDataGridData;
