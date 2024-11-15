import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { PrimaryText } from "../styles/fontsize.const";

interface DataGridComponentProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  fontSize: string;
}

export default function DataGridComponent({
  columns,
  rows,
  fontSize,
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
          borderRadius: "10px",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#001B04",
            color: "white",
            fontSize: fontSize,
          },
          "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
            color: "white",
          },
          "& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeader .MuiDataGrid-filterIcon": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon": {
            display: "none",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            // backgroundColor: "#F6F6F6",
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: "#7f56d9",
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-cell": {
            fontSize: PrimaryText,
          },
        }}
      />
    </Box>
  );
}
