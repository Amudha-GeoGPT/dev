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

const AnotherDataGrid = ({
  wardDatas = [],
  setWardPoints,
  setWardNo,
}: {
  wardDatas?: WardData[];
  setWardPoints: any;
  setWardNo: (data: SetWardNoo[]) => void; // Update the type here
})  => {
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
      const color = "green ";
      const fillColor = "yellow";
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
    setSelectedWardNo(ward_no);

    const existingWardData = wardDatas.find((ward) => ward.ward_no === ward_no);

    if (existingWardData) {
      const transformedData: SetWardNoo = {
        Universal_Outlet_Count: existingWardData.no_of_universal_outlet || 0,
        boundaries: existingWardData.boundaries || [],
        ck_outlet_count: existingWardData.ck_outlet_count || 0,
        color_code: existingWardData.color_code,
        district_name: "Chennai",
        ward_no: existingWardData.ward_no,
        fillColor: existingWardData.fillColor || "#000000",
        ward_name: existingWardData.ward_name,
        population_count: existingWardData.population_count || 0,
      };

      setMapState({
        wardData: [existingWardData],
        latLongPoints: [],
        simplifiedWardData: [
          {
            color_code,
            ward_no,
            boundaries,
          },
        ],
      });
      setWardNo([transformedData]); // Pass as an array
    } else {
      setMapState({
        wardData: [],
        latLongPoints: [],
        simplifiedWardData: [
          {
            color_code,
            ward_no,
            boundaries,
          },
        ],
      });
    }
  };

  

  return (
    <Box sx={{ width: "100%", height: "600px", mt: 0.5 }}>
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
     <NewTamilNaduMap
    wardData={mapState.wardData}
    latLongPoints={mapState.latLongPoints}
    simplifiedWardData={mapState.simplifiedWardData}
    setWardNoo={mapState.wardData.map((ward) => ({
      Universal_Outlet_Count: ward.no_of_universal_outlet || 0,
      boundaries: ward.boundaries || [],
      ck_outlet_count: ward.ck_outlet_count || 0,
      color_code: ward.color_code,
      district_name: "Chennai", // Assuming district_name is constant or fetched elsewhere
      ward_no: ward.ward_no,
      fillColor: ward.fillColor || "#000000", // Default fillColor if not present
      ward_name: ward.ward_name,
      population_count: ward.population_count || 0,
    }))} // Transform wardData to SetWardNoo
  />
</Box>
    </Box>
  );
};

export default AnotherDataGrid;
