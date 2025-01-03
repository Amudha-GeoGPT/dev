import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface WardData {
  id: string;
  ward_name: string;
  // ward_no: string;
  ck_outlet_count: number;
  population_count: number;
  no_of_universal_outlet:number;
}

const AnotherDataGrid = ({ wardDatas }: { wardDatas: WardData[] }) => {
  console.log("Ward Data in AnotherDataGrid:", wardDatas);

  const columns = [
    { field: "sno", headerName: "Sno", width: 100, sortable: false },
    // { field: "ward_no", headerName: "Ward No", width: 200 },
    { field: "ward_name", headerName: "Ward Name", width: 200 },
    { field: "ck_outlet_count", headerName: "CK Outlets", width: 150 },
    {
      field: "population_count",
      headerName: "No.of.Populations",
      width: 150,
      sortable: false,
    },
    {
      field: "no_of_universal_outlet",
      headerName: "Opportunities",
      width: 150,
      sortable: false,
    },
  ];

  const rows = wardDatas.map((item: WardData, index: number) => ({
    id: item.id || index + 1,
    sno: index + 1,
    // ward_no: item.ward_no || "N/A",
    ward_name: item.ward_name || "N/A",
    ck_outlet_count: item.ck_outlet_count || 0,
    population_count: item.population_count || 0,
    no_of_universal_outlet:item.no_of_universal_outlet || 0
  }));

  console.log("Rows data:", rows);

  return (
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
            // display: "none",
          },
          "& .MuiDataGrid-row": {
            cursor: "pointer",
          },
          height: "100%",
          overflow: "auto",
        }}
      />
    </Box>
  );
};

export default AnotherDataGrid;
