import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
 
const AnotherDataGrid = () => {
  const columns = [
    { field: "sno", headerName: "Sno", width: 100, sortable: false },
    { field: "wardName", headerName: "Ward Name", width: 200 },
    { field: "ckOutlets", headerName: "CK Outlets", width: 150 },
    { field: "opportunities", headerName: "Opportunities", width: 150 },
    {
      field: "noOfPopulations",
      headerName: "No.of.Populations",
      width: 150,
      sortable: false,
    },
  ];
 
  const rows = [
    {
      id: 1,
      sno: 1,
      wardName: "Ward 1",
      ckOutlets: "25",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 2,
      sno: 2,
      wardName: "Ward 2",
      ckOutlets: "30",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 3,
      sno: 3,
      wardName: "Ward 3",
      ckOutlets: "25",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 4,
      sno: 4,
      wardName: "Ward 4",
      ckOutlets: "30",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 5,
      sno: 5,
      wardName: "Ward 5",
      ckOutlets: "25",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 6,
      sno: 6,
      wardName: "Ward 6",
      ckOutlets: "30",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 7,
      sno: 7,
      wardName: "Ward 7",
      ckOutlets: "25",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 8,
      sno: 8,
      wardName: "Ward 8",
      ckOutlets: "30",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 9,
      sno: 9,
      wardName: "Ward 9",
      ckOutlets: "25",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 10,
      sno: 10,
      wardName: "Ward 10",
      ckOutlets: "30",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 11,
      sno: 11,
      wardName: "Ward 11",
      ckOutlets: "25",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 12,
      sno: 12,
      wardName: "Ward 12",
      ckOutlets: "30",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 13,
      sno: 13,
      wardName: "Ward 13",
      ckOutlets: "25",
      opportunities: "25",
      noOfPopulations: "25",
    },
    {
      id: 14,
      sno: 14,
      wardName: "Ward 14",
      ckOutlets: "30",
      opportunities: "25",
      noOfPopulations: "25",
    },
  ];
  return (
    <>
      <Box sx={{ width: "100%", height: "550px", overflow: "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu
          hideFooter
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "white",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
            height: "100%",
            overflow: "auto",
          }}
        />
      </Box>
    </>
  );
};
 
export default AnotherDataGrid;
 
 