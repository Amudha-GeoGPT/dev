/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, InputAdornment, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import NewTamilNaduMap from "./NewTamilnaduMap";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
interface WardData {
  boundaries: any;
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
  const [mapData, setMapData] = useState<WardData[]>([]);
  const [latLongPoints, setLatLongPoints] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [simplifiedWardData, setSimplifiedWardData] = useState<
    { color_code: string; ward_no: string; boundaries: any }[]
  >([]);
  const [mapState, setMapState] = useState({
    wardData: [] as WardData[],
    latLongPoints: [] as any[],
    simplifiedWardData: [] as {
      color_code: string;
      ward_no: string;
      boundaries: any;
    }[],
  });

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
      renderCell: (params: any) => (
        <Box
          onClick={() => handleWardNameCellClick(params)}
          sx={{ cursor: "pointer" }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "ck_outlet_count",
      headerName: "CK Outlets",
      width: 150,
      renderHeader: () => <strong>CK Outlets</strong>,
      renderCell: (params: any) => (
        <Box
          onClick={() => handleCkOutletsCellClick(params)}
          sx={{ cursor: "pointer" }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "no_of_universal_outlet",
      headerName: "Opportunities",
      width: 150,
      renderHeader: () => <strong>Opportunities</strong>,
      renderCell: (params: any) => (
        <Box
          onClick={() => handleOpportunitiesCellClick(params)}
          sx={{ cursor: "pointer" }}
        >
          {params.value}
        </Box>
      ),
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
      ward_no: item.ward_no || "N/A",
      color_code: item.color_code,
      boundaries:
        item.boundaries?.map((boundary: any) => [
          boundary.latitude,
          boundary.longitude,
        ]) || [],
    }));
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpportunitiesCellClick = async (params: any) => {
    try {
      const { ward_no } = params.row;

      if (!ward_no) {
        alert("Ward number is not available for this entry.");
        return;
      }

      const outletTagged = "Universal Outlet";
      const payload = {
        district_name: "Chennai",
        ward_no: [ward_no],
        outletTagged,
      };

      const response = await axios.post(
        "https://geogptdev.ckdigital.in/api/filterByWard",
        payload
      );

      if (response.data.message === "success") {
        const coordinates = response.data.results;

        if (coordinates.length > 0) {
          const updatedWardData = {
            ...params.row,
            coordinates,
          };

          setMapData((prevData) => [...prevData, updatedWardData]);
          setLatLongPoints(coordinates);
        } else {
          console.warn("No valid coordinates found.");
          alert("No coordinates found for this ward.");
        }
      } else {
        alert("Failed to fetch filtered data.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Failed to process the click.");
    }
  };
  const handleCkOutletsCellClick = async (params: any) => {
    try {
      const { ward_no } = params.row;
      const response = await axios.post(
        "https://geogptdev.ckdigital.in/api/filterByWard",
        {
          district_name: "CHENNAI",
          ward_no: [ward_no],
          outletTagged: "CK Outlet",
        }
      );

      if (response.data.message === "success") {
        const coordinates = response.data.results;
        setMapState((prevState) => ({
          ...prevState,
          latLongPoints: coordinates,
          wardData: prevState.wardData,
        }));
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleWardNameCellClick = async (params: any) => {
    const { color_code, ward_no, boundaries, ward_name } = params.row;

    setMapState((prevState) => ({
      ...prevState,
      simplifiedWardData: [
        {
          color_code,
          ward_no,
          boundaries,
          ward_name,
        },
      ],
      latLongPoints: prevState.latLongPoints,
    }));
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
        // onCellClick={handleWardNameCellClick}
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
          // "& .MuiDataGrid-row": {
          //   cursor: "pointer",
          // },
          // "& .MuiDataGrid-cell.Mui-focused": {
          //   outline: "none",
          // },
          // "& .MuiDataGrid-cell:focus": {
          //   outline: "none",
          // },
          // "& .MuiDataGrid-cell.Mui-selected": {
          //   backgroundColor: "transparent",
          // },
          height: "100%",
          overflow: "hidden",
        }}
      />
      <Box sx={{ display: "none", mt: 2 }}>
        <NewTamilNaduMap
          wardData={mapState.wardData}
          latLongPoints={mapState.latLongPoints}
          simplifiedWardData={mapState.simplifiedWardData}
        />
      </Box>
    </Box>
  );
};

export default AnotherDataGrid;
