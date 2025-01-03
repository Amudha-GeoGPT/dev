import { useState } from "react";
import CustomSelectSearch from "../../common/CustomSelectSearch";
import { Box, Grid, Typography } from "@mui/material";
import CustomButton from "../../common/CustomButton";
import { SmallText } from "../../styles/fontsize.const";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AnotherDataGrid from "./AnotherDataGrid";
import "leaflet/dist/leaflet.css";
import NewTamilNaduMap from "./NewTamilnaduMap";
import axios from "axios";

interface RowData {
  id: number;
  CKOutlets: string;
  col1: number | string;
  col2: number | string;
  col3: number | string;
  col4: number | string;
  col5: number | string;
}

interface Option {
  label: string;
  value: string;
}

type Ranges = {
  [key in "lt50" | "51to100" | "100to200" | "200to300" | "gt300"]: {
    wards: number;
    population: number;
  };
};

const NewMap = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [selectedMetropolitan, setSelectedMetropolitan] =
    useState<Option | null>(null);
  const [wardDataCache, setWardDataCache] = useState<any>(null);
  const [specificRangeData, setSpecificRangeData] = useState<any>(null);
  const [wardDataForMap, setWardDataForMap] = useState<any[]>([]);
  const [rows, setRows] = useState<RowData[]>([
    {
      id: 1,
      CKOutlets: "No.of.wards",
      col1: "",
      col2: "",
      col3: "",
      col4: "",
      col5: "",
    },
    {
      id: 2,
      CKOutlets: "No.of.Populations",
      col1: "",
      col2: "",
      col3: "",
      col4: "",
      col5: "",
    },
  ]);

  const handleMetropolitanChange = (value: Option | null) =>
    setSelectedMetropolitan(value);

  const handleApplyFilter = async () => {
    if (selectedMetropolitan?.value !== "Chennai") {
      alert("Please select Chennai to filter data.");
      return;
    }

    try {
      const response = await axios.post(
        "https://geogptdev.ckdigital.in/api/getwardData",
        { district_name: selectedMetropolitan.value }
      );

      console.log("API Response:", response.data);

      if (response.data.message === "success") {
        const { results } = response.data;
        setWardDataCache(results);

        const ranges: Ranges = {
          lt50: { wards: 0, population: 0 },
          "51to100": { wards: 0, population: 0 },
          "100to200": { wards: 0, population: 0 },
          "200to300": { wards: 0, population: 0 },
          gt300: { wards: 0, population: 0 },
        };

        // Map API response data to the ranges object
        Object.keys(results).forEach((range: string) => {
          const mappedRange = mapRangeKey(range);
          if (ranges[mappedRange]) {
            ranges[mappedRange].wards = results[range].no_of_wards;
            ranges[mappedRange].population = results[range].no_of_population;
          }
          //   const transformedWards = results[range].data.map((item: any) => ({
          //     coordinates: item.boundaries.map((boundary: any) => [
          //       boundary.latitude,
          //       boundary.longitude,
          //     ]),
          //     color_code: item.color_code,
          //     ward_name: item.ward_name,
          //   }));
          //   setWardDataForMap((prevData) => [...prevData, ...transformedWards]);
        });

        setRows([
          {
            id: 1,
            CKOutlets: "No.of.wards",
            col1: ranges.lt50.wards,
            col2: ranges["51to100"].wards,
            col3: ranges["100to200"].wards,
            col4: ranges["200to300"].wards,
            col5: ranges.gt300.wards,
          },
          {
            id: 2,
            CKOutlets: "No.of.Populations",
            col1: ranges.lt50.population,
            col2: ranges["51to100"].population,
            col3: ranges["100to200"].population,
            col4: ranges["200to300"].population,
            col5: ranges.gt300.population,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      alert("Failed to fetch data.");
    }
  };

  const mapRangeKey = (range: string): keyof Ranges => {
    switch (range) {
      case "lt50":
        return "lt50";
      case "51to100":
        return "51to100";
      case "100to200":
        return "100to200";
      case "200to300":
        return "200to300";
      case "gt300":
        return "gt300";
      default:
        throw new Error(`Unknown range: ${range}`);
    }
  };

  const handleCellClick = async (params: any) => {
    const clickedRange = params.field;
    console.log("Clicked Range:", clickedRange);

    if (!wardDataCache) {
      console.error("No ward data available. Please apply filter first.");
      return;
    }

    const rangeMapping: { [key: string]: keyof Ranges } = {
      col1: "lt50",
      col2: "51to100",
      col3: "100to200",
      col4: "200to300",
      col5: "gt300",
    };

    const rangeKey = rangeMapping[clickedRange];

    if (!rangeKey) {
      console.error("No valid range found for the clicked field.");
      return;
    }

    const specificRange = wardDataCache[rangeKey];

    if (specificRange) {
      const specificData = specificRange.data;
      setSpecificRangeData(specificData); // Store the filtered data for the map

      // Transform the specific range data to match the structure needed for the map
      const transformedWards = specificData.map((item: any) => ({
        coordinates: item.boundaries.map((boundary: any) => [
          boundary.latitude,
          boundary.longitude,
        ]),
        color_code: item.color_code,
        ward_name: item.ward_name,
      }));

      // Update the map data state with the transformed data for the specific range
      setWardDataForMap(transformedWards);

      setClicked(true);
      console.log("Ward Name:", specificData[0].ward_name);
      console.log("Population Count:", specificData[0].population_count);
      console.log("CK Outlet Count:", specificData[0].ck_outlet_count);
      console.log("Color Code:", specificData[0].color_code);
    } else {
      console.log("Range data not found");
      setClicked(false);
      setWardDataForMap([]); // Reset map data if no range is found
    }
  };

  const buttonStyles = {
    fontSize: SmallText,
    height: "40px",
    padding: "14px",
    backgroundColor: "#001B04",
    color: "#FFFFFF",
    textTransform: "none" as const,
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#0A330A",
    },
  };

  const columns: GridColDef[] = [
    {
      field: "CKOutlets",
      headerName: "CK Outlets",
      flex: 1,
      renderCell: (params) => <Typography sx={{}}>{params.value}</Typography>,
      headerClassName: "headerCell",
      sortable: false,
    },
    {
      field: "col1",
      headerName: "<50",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={{ color: "red" }}>&lt;50</span>,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.CKOutlets === "No.of.wards" ? "red" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col2",
      headerName: "51 to 100",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={{ color: "orange" }}>51 to 100</span>,

      renderCell: (params) => (
        <Typography
          sx={{
            color:
              params.row.CKOutlets === "No.of.wards" ? "orange" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col3",
      headerName: "101 to 200",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={{ color: "green" }}>101 to 200</span>,

      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.CKOutlets === "No.of.wards" ? "green" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col4",
      headerName: "201 to 300",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={{ color: "green" }}>201 to 300</span>,

      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.CKOutlets === "No.of.wards" ? "green" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col5",
      headerName: ">300",
      flex: 1,
      sortable: false,
      renderHeader: () => <span style={{ color: "green" }}>&gt;300</span>,

      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.CKOutlets === "No.of.wards" ? "green" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={1.5}>
          <CustomSelectSearch
            label="Metropolitan"
            placeholder="Select Metropolitan"
            options={[{ label: "Chennai", value: "Chennai" }]}
            value={selectedMetropolitan}
            onChange={handleMetropolitanChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <CustomButton buttonText="Clear All" buttonStyles={buttonStyles} />
            <CustomButton
              buttonText="Apply Filter"
              buttonStyles={buttonStyles}
              onClick={handleApplyFilter}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid item xs={6}>
            <Box>
              <Typography variant="h5">Overview</Typography>
              <Box sx={{ mt: 2 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  disableColumnMenu
                  hideFooter
                  onCellClick={handleCellClick}
                  sx={{
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                  }}
                />
              </Box>
              <Box sx={{ mt: 2, height: "400px" }}>
                <NewTamilNaduMap wardData={wardDataForMap} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mt: 2 }}>
              {clicked && specificRangeData && (
                <AnotherDataGrid wardDatas={specificRangeData} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NewMap;
