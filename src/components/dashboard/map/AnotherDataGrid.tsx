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


const AnotherDataGrid = ({
  wardDatas = [],
  setWardPoints,
  setWardNo,
}: {
  wardDatas?: WardData[];
  setWardPoints: any;
  setWardNo:any
}) => {
  const [mapData, setMapData] = useState<WardData[]>([]);
  const [latLongPoints, setLatLongPoints] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [simplifiedWardData, setSimplifiedWardData] = useState<
    { color_code: string; ward_no: string; boundaries: any }[]
  >([]);
  const [selectedWardNo, setSelectedWardNo] = useState<string | null>(null);
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
      width: 55,
      sortable: false,
      renderHeader: () => <strong style={{ fontSize: "12px" }}>S.No</strong>,
    },
    {
      field: "ward_no",
      headerName: "Ward Name",
      width: 85,
      sortable: false,
      renderHeader: () => <strong style={{ fontSize: "12px" }}>Ward No</strong>,
      renderCell: (params: any) => (
        <Box
          onClick={() => handleWardNoCellClick(params)}
          sx={{ cursor: "pointer" }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "ck_outlet_count",
      headerName: "CK Outlets",
      width: 114,
      renderHeader: () => (
        <strong style={{ fontSize: "12px" }}>CK Outlets</strong>
      ),
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
      width: 134,
      renderHeader: () => (
        <strong style={{ fontSize: "12px" }}>Opportunities</strong>
      ),
      renderCell: (params: any) => (
        <Box
          onClick={() => handleOpportunitiesCellClick(params)} // Call the new click handler
          sx={{ cursor: "pointer" }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "population_count",
      headerName: "Populations",
      width: 116,
      renderHeader: () => (
        <strong style={{ fontSize: "12px" }}>Population</strong>
      ),
    },
    {
      field: "insights",
      headerName: "Insights",
      width: 68,
      sortable: false,
      renderHeader: () => (
        <strong style={{ fontSize: "12px" }}>Insights</strong>
      ),
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
      const color = "pink";
      const fillColor = "green";
      const response = await axios.post(
        "https://geogptdev.ckdigital.in/api/filterByWard",
        {
          district_name: "Chennai",
          ward_no: [ward_no],
          outletTagged: "Universal Outlet",
        }
      );

      if (response.data.message === "success") {
        const coordinates = response.data.results;
        const updatedCoordinates = coordinates.map((coordinate: any) => ({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          distributorCode: coordinate.distributorCode,
          distributorName: coordinate.distributorName,
          outletName: coordinate.outletName,
          pid: coordinate.pid,
          color,
          fillColor,
        }));

        setWardPoints(updatedCoordinates);
        setMapState((prevState) => ({
          ...prevState,
          latLongPoints: updatedCoordinates,
          wardData: prevState.wardData,
        }));

        const wardDataResponse = await axios.post(
          "https://geogptdev.ckdigital.in/api/getwardData",
          {
            district_name: "Chennai",
            ward_list: [ward_no], // Pass the ward_no dynamically
          }
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleCkOutletsCellClick = async (params: any) => {
    try {
      const { ward_no } = params.row;
      const color = "red";
      const fillColor = "black";
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
        const updatedCoordinates = coordinates.map((coordinate: any) => ({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          distributorCode: coordinate.distributorCode,
          distributorName: coordinate.distributorName,
          outletName: coordinate.outletName,
          pid: coordinate.pid,
          color,
          fillColor,
        }));
        setWardPoints(updatedCoordinates);
        setMapState((prevState) => ({
          ...prevState,
          latLongPoints: updatedCoordinates,
          wardData: prevState.wardData,
        }));
        const wardDataResponse = await axios.post(
          "https://geogptdev.ckdigital.in/api/getwardData",
          {
            district_name: "Chennai",
            ward_list: [ward_no], 
          }
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleWardNoCellClick = async (params: any) => {
    const { color_code, ward_no, boundaries } = params.row;
  
    // Set the selected ward number
    setSelectedWardNo(ward_no);
  
    // Check if the ward data already exists in wardDatas
    const existingWardData = wardDatas.find((ward) => ward.ward_no === ward_no);
  
    // Prepare the simplified data for the selected ward
    const simplifiedData = {
      color_code,
      ward_no,
      boundaries,
    };
  
    if (existingWardData) {
      // If data exists, update only the relevant fields
      setMapState((prevState) => ({
        ...prevState,
        simplifiedWardData: [simplifiedData],
        latLongPoints: prevState.latLongPoints, // Assuming no changes to latLongPoints
        wardData: [existingWardData], // Only include the existing ward data for the selected ward_no
      }));
  
      setWardNo(existingWardData); // Optionally update state with the existing ward data
    } else {
      // If no existing data, update simplifiedWardData with the current ward fields
      setMapState((prevState) => ({
        ...prevState,
        simplifiedWardData: [simplifiedData],
        latLongPoints: prevState.latLongPoints,
        wardData: [], // No additional ward data to include
      }));
    }
  
    // Log the data for debugging
    console.log("Existing Ward Data:", existingWardData || simplifiedData);
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
        // onCellClick={handleWardNoCellClick}
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
            display: "none",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "12px", // Set font size for all cells in the row
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
        {/* <NewTamilNaduMap
          wardData={mapState.wardData}
          latLongPoints={mapState.latLongPoints}
          simplifiedWardData={mapState.simplifiedWardData}
        /> */}
      </Box>
    </Box>
  );
};

export default AnotherDataGrid;
