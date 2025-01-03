import { useState } from "react";
import CustomSelectSearch from "../../common/CustomSelectSearch";
import { Box, Grid, Typography } from "@mui/material";
import CustomButton from "../../common/CustomButton";
import { SmallText } from "../../styles/fontsize.const";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AnotherDataGrid from "./AnotherDataGrid";
import "leaflet/dist/leaflet.css";
import NewTamilNaduMap from "./NewTamilnaduMap";
interface Option {
  label: string;
  value: string;
}

const NewMap = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const verticalData = [
    "S&D",
    "Marketing",
    "IT & Support",
    "Human Resource",
    "CRM",
    "Inventory",
    "Logistics",
  ];
  const stateData = [
    "Tamil Nadu",
    "Assam",
    "Andhra Pradesh",
    "Bihar",
    "Karnataka",
    "Punjab",
    "Kerala",
    "Telengana",
  ];
  const metroOrNonMetro = ["Metro", "Non-Metro"];
  const metropolitan = ["Chennai"];

  const taluk = [
    "Taluk 1",
    "Taluk 2",
    "Taluk 3",
    "Taluk 4",
    "Taluk 5",
    "Taluk 6",
    "Taluk 7",
  ];
  const ward = [
    "Ward 1",
    "Ward 2",
    "Ward 3",
    "Ward 4",
    "Ward 5",
    "Ward 6",
    "Ward 7",
  ];
  const pincode = [6005007];
  const [selectedVertical, setselectedVertical] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedMetro, setSelectedMetro] = useState<Option | null>(null);
  const [selectedMetropolitan, setSelectedMetropolitan] =
    useState<Option | null>(null);
  const [selectedTaluk, setSelectedTaluk] = useState<Option | null>(null);
  const [selectedWard, setSelectedWard] = useState<Option | null>(null);
  const [selectedPincode, setSelectedPincode] = useState<Option | null>(null);

  const handleVerticalChange = (value: Option | null) =>
    setselectedVertical(value);
  const handleStateChange = (value: Option | null) => setSelectedState(value);
  const handleMetroChange = (value: Option | null) => setSelectedMetro(value);
  const handleMetropolitanChange = (value: Option | null) =>
    setSelectedMetropolitan(value);
  const handleTalukChange = (value: Option | null) => setSelectedTaluk(value);
  const handleWardChange = (value: Option | null) => setSelectedWard(value);
  const handlePincodeChange = (value: Option | null) =>
    setSelectedPincode(value);
  const handleCellClick = () => {
    setClicked(true);
  };
  const buttonStyles = {
    fontSize: SmallText,
    height: "40px",
    padding: "14px",
    backgroundColor: "#001B04",
    color: "#FFFFFF",
    textTransform: "none" as const,
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#0A330A",
    },
  };

  const rows = [
    { id: 1, CKOutlets: "No.of.wards", col1: 30, col2: 25, col3: 25, col4: 25 },
    {
      id: 2,
      CKOutlets: "No.of.Populations",
      col1: "3,00,000",
      col2: "3,00,000",
      col3: "3,00,000",
      col4: "3,00,000",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "CKOutlets",
      headerName: "CK Outlets",
      flex: 1,
      renderCell: (params) => <Typography sx={{}}>{params.value}</Typography>,
      headerClassName: "headerCell",
      sortable: false,
    },
    {
      field: "col1",
      headerName: "<50",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={{ color: "red" }}>&lt;50</span>,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.CKOutlets === "No.of.wards" ? "red" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col2",
      headerName: "51 to 100",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={{ color: "orange" }}>51 to 100</span>,

      renderCell: (params) => (
        <Typography
          sx={{
            color:
              params.row.CKOutlets === "No.of.wards" ? "orange" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col3",
      headerName: "101 to 200",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={{ color: "green" }}>101 to 200</span>,

      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.CKOutlets === "No.of.wards" ? "green" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col4",
      headerName: "201 to 300",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={{ color: "green" }}>201 to 300</span>,

      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.CKOutlets === "No.of.wards" ? "green" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={2}>
            <CustomSelectSearch
              label="Verticals"
              placeholder="Select Verticals"
              options={verticalData}
              value={selectedVertical}
              onChange={handleVerticalChange}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomSelectSearch
              label="State"
              placeholder="Select State"
              options={stateData}
              value={selectedState}
              onChange={handleStateChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Metro/Non-Metro"
              placeholder="Select Metro/Non-Metro"
              options={metroOrNonMetro}
              value={selectedMetro}
              onChange={handleMetroChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Metropolitan"
              placeholder="Select Metropolitan"
              options={metropolitan}
              value={selectedMetropolitan}
              onChange={handleMetropolitanChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Taluk"
              placeholder="Select Taluks"
              options={taluk}
              value={selectedTaluk}
              onChange={handleTalukChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Ward"
              placeholder="Select Ward"
              options={ward}
              value={selectedWard}
              onChange={handleWardChange}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomSelectSearch
              label="Pincode"
              placeholder="Select Pincode"
              options={pincode}
              value={selectedPincode}
              onChange={handlePincodeChange}
            />
          </Grid>

          <Grid xs={12} sx={{ mt: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <CustomButton
                buttonText="Clear All"
                buttonStyles={buttonStyles}
              />
              <CustomButton
                buttonText="Apply Filter"
                buttonStyles={buttonStyles}
              />
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Grid container spacing={3} sx={{ width: "100%" }}>
            <Grid item xs={6}>
              <Box>
                <Typography variant="h5">Overview</Typography>
                <Box sx={{ mt: 2 }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    disableColumnMenu
                    hideFooter
                    onCellClick={handleCellClick}
                    sx={{
                      // border: "1px solid red",
                      "& .MuiDataGrid-columnSeparator": {
                        display: "none",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2, height: "400px" }}>
                  <NewTamilNaduMap />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
              {clicked && (
                <Box
                  sx={{ width: "100%", overflowX: "auto", overflowY: "auto" }}
                >
                  <AnotherDataGrid />
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default NewMap;
