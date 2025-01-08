import { Box, InputAdornment, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import NewTamilNaduMap from "./NewTamilnaduMap";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
interface WardData {
  id: string;
  ward_name: string;
  ck_outlet_count: number;
  population_count: number;
  no_of_universal_outlet: number;
  coordinates: number[][];
  color_code: string;
  fillColor: string;
  ward_no: string;
}

const AnotherDataGrid = ({ wardDatas = [] }: { wardDatas?: WardData[] }) => {
  console.log();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedWardData, setSelectedWardData] = useState<WardData | null>(
    null
  );

  const columns = [
    {
      field: "sno",
      headerName: "S.No",
      width: 80,
      sortable: false,
      renderHeader: () => <strong>S.No</strong>,
    },
    {
      field: "ward_name",
      headerName: "Ward Name",
      width: 280,
      sortable: false,
      renderHeader: () => <strong>Ward Name</strong>,
    },
    {
      field: "ck_outlet_count",
      headerName: "CK Outlets",
      width: 150,
      renderHeader: () => <strong>CK Outlets</strong>,
    },
    {
      field: "no_of_universal_outlet",
      headerName: "Opportunities",
      width: 150,
      renderHeader: () => <strong>Opportunities</strong>,
    },
    {
      field: "population_count",
      headerName: "Populations",
      width: 150,
      renderHeader: () => <strong>Populations</strong>,
    },
    {
      field: "insights",
      headerName: "Insights",
      width: 75,
      sortable: false,
      renderHeader: () => <strong>Insights</strong>,
      renderCell: () => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <OpenInNewIcon />
        </Box>
      ),
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
      insights: null,
    }));
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleWardNameCellClick = (params: any) => {
    const selectedWard = wardDatas.find(
      (item) => item.ward_name === params.row.ward_name
    );
    if (selectedWard) {
      setSelectedWardData(selectedWard);
    }
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
        onCellClick={handleWardNameCellClick}
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
          "& .MuiDataGrid-cell.Mui-focused": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell.Mui-selected": {
            backgroundColor: "transparent",
          },
          height: "100%",
          overflow: "auto",
        }}
      />
      {selectedWardData && (
        <NewTamilNaduMap
          key={selectedWardData.id}
          wardData={[selectedWardData]}
        />
      )}
    </Box>
  );
};

export default AnotherDataGrid;
