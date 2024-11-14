import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface DataGridComponentProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

export default function DataGridComponent({
  columns,
  rows,
}: DataGridComponentProps) {
  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        hideFooterPagination
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "black",
            color: "white",
          },
          "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
            color: "white",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f0f0f0",
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: "#7f56d9",
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
        }}
      />
    </Box>
  );
}
