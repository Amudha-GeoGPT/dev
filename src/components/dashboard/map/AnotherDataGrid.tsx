import { Box, InputAdornment, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface WardData {
  id: string;
  ward_name: string;
  ck_outlet_count: number;
  population_count: number;
  no_of_universal_outlet: number;
}

const AnotherDataGrid = ({ wardDatas=[] }: { wardDatas?: WardData[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const columns = [
    { field: "sno", headerName: "Sno", width: 80, sortable: false },
    {
      field: "ward_name",
      headerName: "Ward Name",
      width: 280,
      sortable: false,
    },
    { field: "ck_outlet_count", headerName: "CK Outlets", width: 150 },
    {
      field: "no_of_universal_outlet",
      headerName: "Opportunities",
      width: 150,
    },
    {
      field: "population_count",
      headerName: "No.of.Populations",
      width: 150,
      sortable: false,
    },
  ];

  const filteredRows = wardDatas
    .filter((item) =>
      item.ward_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((item: WardData, index: number) => ({
      id: item.id || index + 1,
      sno: index + 1,
      ward_name: item.ward_name || "N/A",
      ck_outlet_count: item.ck_outlet_count || 0,
      no_of_universal_outlet: item.no_of_universal_outlet || 0,
      population_count: item.population_count || 0,
    }));
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <Box sx={{ width: "100%", height: "600px", mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search Ward"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "280px",
          }}
        />
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        disableColumnMenu
        hideFooter
        sx={{
          mt: 1,
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
