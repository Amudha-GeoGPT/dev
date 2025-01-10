/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomSelectSearch from "../../common/CustomSelectSearch";
import { Box, Grid, Typography } from "@mui/material";
import CustomButton from "../../common/CustomButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AnotherDataGrid from "./AnotherDataGrid";
import "leaflet/dist/leaflet.css";
import NewTamilNaduMap from "./NewTamilnaduMap";
import { pincode, verticalData } from "./WardList";
import { useNewMapPages } from "./NewMapPages";
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

const PincodeComponent = () => {
  const {
    selectedVertical,
    handlePincodeChange,
    clicked,
    clickedOverview,
    specificRangeData,
    wardDataForMap,
    rows,
    selectedPincode,
    handleApplyFilter,
    handleCellClick,
    ApplyFilterButtonStyles,
    ClearAllButtonStyles,
    handleVerticalChange,
  } = useNewMapPages(
    (value) => {
      console.log(value);
    },
    (wardDataPoint) => {
      // Handle ward data points here
      console.log(wardDataPoint);
    }
  );   const columns: GridColDef[] = [
    {
      field: "CKOutlets",
      headerName: "CK Outlets",
      flex: 2.5,
      renderCell: (params) => <Typography sx={{}}>{params.value}</Typography>,
      headerClassName: "headerCell",
      sortable: false,
    },
    {
      field: "col1",
      headerName: "<50",
      flex: 1.5,
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
      flex: 1.5,
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
      flex: 1.5,
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
      flex: 1.5,
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
    {
      field: "col5",
      headerName: ">300",
      flex: 1.2,
      sortable: false,
      renderHeader: () => <span style={{ color: "green" }}>&gt;300</span>,

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
        <Grid container spacing={1} sx={{ p: 2 }}>
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
              label="Pincode"
              placeholder="Select Pincode"
              options={pincode}
              value={selectedPincode}
              onChange={handlePincodeChange}
            />
          </Grid>

          <Grid item xs={1} sx={{ ml: 1 }}>
            <CustomButton
              buttonText="Clear All"
              buttonStyles={ClearAllButtonStyles}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomButton
              buttonText="Apply Filter"
              buttonStyles={ApplyFilterButtonStyles}
              onClick={handleApplyFilter}
            />
          </Grid>
        </Grid>
        {clickedOverview && (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Grid container spacing={3} sx={{ width: "100%" }}>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Overview
                  </Typography>
                  <Box sx={{ mt: 2.5 }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      disableColumnMenu
                      hideFooter
                      onCellClick={handleCellClick}
                      sx={{
                        "& .MuiDataGrid-columnSeparator": {
                          display: "none",
                        },
                        "& .MuiDataGrid-cell": {
                          display: "flex",
                          alignItems: "center",
                        },
                        "& .MuiDataGrid-row": {
                          cursor: "pointer",
                        },
                        "& .MuiDataGrid-cell.Mui-focused": {
                          outline: "none",
                        },
                        "& .MuiDataGrid-cell:focus": {
                          outline: "none",
                        },
                        "& .MuiDataGrid-cell.Mui-selected": {
                          backgroundColor: "transparent",
                        },
                        "& .MuiDataGrid-columnHeader.Mui-focused": {
                          outline: "none",
                        },
                        "& .MuiDataGrid-columnHeader:focus": {
                          outline: "none",
                        },
                        "& .MuiDataGrid-columnHeader.Mui-selected": {
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 2, height: "400px" }}>
                    <NewTamilNaduMap wardData={wardDataForMap} latLongPoints={[]} simplifiedWardData={[]} setWardNoo={[]} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ mt: 2 }}>
                  {clicked && specificRangeData && (
                    <AnotherDataGrid wardDatas={specificRangeData} setWardPoints={undefined} setWardNo={function (_data: SetWardNoo[]): void {
                      throw new Error("Function not implemented.");
                    } } />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PincodeComponent;
