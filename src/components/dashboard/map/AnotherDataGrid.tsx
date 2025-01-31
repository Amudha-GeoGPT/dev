/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, InputAdornment, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import NewTamilNaduMap from "./NewTamilnaduMap";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import { useNewMapPages } from "./NewMapPages";
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
  taluk_no: string;
  district_name: any;
  taluk_name: string;
}
interface Payload {
  district_name: any;
  outletTagged: string;
  ward_no?: number[]; // Make ward_no optional
  taluk_no?: number[]; // Make taluk_no optional
}
interface SetWardNoo {
  Universal_Outlet_Count: number;
  boundaries: Array<{ latitude: number; longitude: number }>;
  ck_outlet_count: number;
  color_code: string;
  district_name: any;
  ward_no: string;
  taluk_no: string;
  fillColor: string;
  ward_name: string;
  population_count: number;
  taluk_name: string;
}
interface Props {
  wardDatas?: WardData[];
  setWardPoints: any;
  setWardNo: (data: SetWardNoo[]) => void;
  selectedMetroType?: string; // Add this new prop
}
const AnotherDataGrid = ({
  wardDatas = [],
  setWardPoints,
  setWardNo,
  selectedMetroType, // Add this prop
}: Props) => {
  // const [mapData, setMapData] = useState<WardData[]>([]);
  // const [latLongPoints, setLatLongPoints] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [simplifiedWardData, setSimplifiedWardData] = useState<
  //   { color_code: string; ward_no: string; boundaries: any }[]
  // >([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedWardNo, setSelectedWardNo] = useState<any>(null);
  const [selectedTalukNo, setSelectedTalukNo] = useState<any>(null);
  const { fieldKey } = useNewMapPages();

  console.log("Ward", selectedWardNo);
  console.log("Taluk", selectedTalukNo);
  console.log("finally eeeeee", fieldKey);

  const [mapState, setMapState] = useState({
    wardData: [] as WardData[],
    latLongPoints: [] as any[],
    simplifiedWardData: [] as {
      color_code: string;
      ward_no: string;
      taluk_no: string;
      boundaries: any;
      district_name: any;
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
      field: selectedMetroType === "Metro" ? "ward_no" : "taluk_no",
      headerName: selectedMetroType === "Metro" ? "Ward No" : "Taluk No",
      width: 85,
      sortable: false,
      renderHeader: () => (
        <strong style={{ fontSize: "12px" }}>
          {selectedMetroType === "Metro" ? "Ward No" : "Taluk No"}
        </strong>
      ),
      renderCell: (params: any) => (
        <Box
          onClick={async () => {
            await handleWardNoCellClick(params);
            await handleCkOutletsCellClick(params);
          }}
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
          onClick={async () => {
            await handleOpportunitiesCellClick(params);
            await handleCkOutletsCellClick(params);
          }}
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
  // Now the variable is being used

  const filteredRows = wardDatas
    .filter((item) => {
      const searchValue =
        selectedMetroType === "Metro"
          ? item.ward_no || ""
          : item.taluk_no || "";
      return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .map((item: WardData, index: number) => ({
      id: item.id || index + 1,
      sno: index + 1,
      ward_no:
        selectedMetroType === "Metro" ? item.ward_no || "N/A" : undefined,
      taluk_no:
        selectedMetroType === "Non_Metro" ? item.taluk_no || "N/A" : undefined,

      ck_outlet_count: item.ck_outlet_count || 0,
      no_of_universal_outlet: item.no_of_universal_outlet || 0,
      population_count: item.population_count || 0,
      insights: null,
      // ward_no: item.ward_no || "N/A",
      // taluk_no: item.taluk_no || "N/A",

      // taluk: item.taluk_no || "N/A",
      color_code: item.color_code,
      district_name: item.district_name,
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
      const { taluk_no } = params.row;
      const { district_name } = params.row;
      const color = "#0A98ED";
      const fillColor = "#0068B3";
      const payload: Payload = {
        district_name: district_name, // dynamic district name
        outletTagged: "Universal Outlet", // static outletTagged
      };

      if (ward_no) {
        payload.ward_no = [ward_no];
      } else if (taluk_no) {
        payload.taluk_no = [taluk_no];
      }
      const response = await axios.post(
        "https://geogptdev.ckdigital.in/api/filterByWard",
        // {
        //   district_name: district_name,
        //   ward_no: [ward_no],
        //   outletTagged: "Universal Outlet",
        // }
        payload
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

        // Get the existing coordinates (if any)
        setWardPoints((prevPoints: any) => {
          const combinedCoordinates = [...prevPoints, ...updatedCoordinates]; // Merging new and existing data
          return combinedCoordinates;
        });

        setMapState((prevState) => ({
          ...prevState,
          latLongPoints: prevState.latLongPoints
            ? [...prevState.latLongPoints, ...updatedCoordinates]
            : updatedCoordinates, // Merge new data
          wardData: prevState.wardData,
        }));

        // Trigger the second function after the first API call is successful
        await handleCkOutletsCellClick(params); // Pass `params` here, or modify as needed
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleCkOutletsCellClick = async (params: any) => {
    try {
      const { ward_no } = params.row;
      const { taluk_no } = params.row;

      const { district_name } = params.row;
      const color = "#1FFC2B";
      const fillColor = "#003809";
      const payload: Payload = {
        district_name: district_name,
        outletTagged: "Universal Outlet",
      };

      if (ward_no) {
        payload.ward_no = [ward_no];
      } else if (taluk_no) {
        payload.taluk_no = [taluk_no];
      }
      // const payload: Payload = {
      //   district_name: district_name, // dynamic district name
      //   outletTagged: "Universal Outlet", // static outletTagge
      // };

      // if (ward_no) {
      //   payload.ward_no = [ward_no];
      // } else if (taluk_no) {
      //   payload.taluk_no = [taluk_no];
      // }

      const response = await axios.post(
        "https://geogptdev.ckdigital.in/api/filterByWard",
        // payload
        // {
        //   district_name: district_name,
        //   ward_no: [ward_no],
        //   outletTagged: "CK Outlet",
        // }
        payload
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

        // Get the existing coordinates and combine with new data
        setWardPoints((prevPoints: any) => {
          const combinedCoordinates = [...prevPoints, ...updatedCoordinates];
          return combinedCoordinates;
        });

        setMapState((prevState) => ({
          ...prevState,
          latLongPoints: prevState.latLongPoints
            ? [...prevState.latLongPoints, ...updatedCoordinates]
            : updatedCoordinates, // Merge new data
          wardData: prevState.wardData,
        }));
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleWardNoCellClick = async (params: any) => {
    const { color_code, ward_no, boundaries, district_name, taluk_no } =
      params.row;
    setSelectedWardNo(ward_no);
    setSelectedTalukNo(taluk_no);
    const existingWardData = wardDatas.find(
      (ward) => ward.ward_no === ward_no || ward.taluk_no===taluk_no
    );

    if (existingWardData) {
      const transformedData: SetWardNoo = {
        Universal_Outlet_Count: existingWardData.no_of_universal_outlet || 0,
        boundaries: existingWardData.boundaries || [],
        ck_outlet_count: existingWardData.ck_outlet_count || 0,
        color_code: existingWardData.color_code,
        district_name: existingWardData.district_name,
        ward_no: existingWardData.ward_no,
        taluk_no: existingWardData.taluk_no,
        fillColor: existingWardData.fillColor || "#000000",
        ward_name: existingWardData.ward_name,
        taluk_name: existingWardData.taluk_name,

        population_count: existingWardData.population_count || 0,
      };

      setMapState({
        wardData: [existingWardData],
        latLongPoints: [],
        simplifiedWardData: [
          {
            color_code,
            ward_no,
            taluk_no,
            boundaries,
            district_name,
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
            taluk_no,
            boundaries,
            district_name,
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
          borderRadius: "12px",

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
          "& .MuiDataGrid-cell.Mui-focused": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell.Mui-selected": {
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "#d8d8d8", // Change to red on hover
            },
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
            district_name: ward.district_name, // Assuming district_name is constant or fetched elsewhere
            ward_no: ward.ward_no,
            fillColor: ward.fillColor || "#000000", // Default fillColor if not present
            ward_name: ward.ward_name,
            population_count: ward.population_count || 0,
            taluk_no: ward.taluk_no,
            taluk_name: ward.taluk_name,
          }))} // Transform wardData to SetWardNoo
        />
      </Box>
    </Box>
  );
};

export default AnotherDataGrid;
