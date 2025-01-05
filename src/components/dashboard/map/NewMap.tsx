import { useState } from "react";
import CustomSelectSearch from "../../common/CustomSelectSearch";
import {
  Autocomplete,
  Box,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "../../common/CustomButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AnotherDataGrid from "./AnotherDataGrid";
import "leaflet/dist/leaflet.css";
import NewTamilNaduMap from "./NewTamilnaduMap";
import axios from "axios";
import {
  metroOrNonMetro,
  pincode,
  stateData,
  taluk,
  verticalData,
  ward,
} from "./WardList";
import { SelectAutoCompleteBorderColor } from "../../styles/color.const";

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
  const [selectedVertical, setselectedVertical] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedMetro, setSelectedMetro] = useState<Option | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [clickedOverview, setclickedOverview] = useState<boolean>(false);

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
  const [selectedTaluk, setSelectedTaluk] = useState<Option | null>(null);
  const [selectedWard, setSelectedWard] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [selectedPincode, setSelectedPincode] = useState<Option | null>(null);
  const handleMetropolitanChange = (value: Option | null) =>
    setSelectedMetropolitan(value);

  const handleApplyFilter = async () => {
    if (selectedMetropolitan?.value !== "Chennai") {
      alert("Please select Chennai to filter data.");
      return;
    }

    try {
      const payload: any = { district_name: selectedMetropolitan.value };

      if (selectedWard.length > 0) {
        payload.ward_list = selectedWard.map((ward) => ward.value);
      }
      const response = await axios.post(
        "https://geogptdev.ckdigital.in/api/getwardData",
        payload
      );

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

        Object.keys(results).forEach((range: string) => {
          const mappedRange = mapRangeKey(range);
          if (ranges[mappedRange]) {
            ranges[mappedRange].wards = results[range].no_of_wards;
            ranges[mappedRange].population = results[range].no_of_population;
          }
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
    setclickedOverview(true);
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
      setSpecificRangeData(specificData);

      const transformedWards = specificData.map((item: any) => ({
        coordinates: item.boundaries.map((boundary: any) => [
          boundary.latitude,
          boundary.longitude,
        ]),
        color_code: item.color_code,
        ward_name: item.ward_name,
        ward_no: item.ward_no,
      }));

      setWardDataForMap(transformedWards);

      setClicked(true);
    } else {
      setClicked(false);
      setWardDataForMap([]);
    }
  };

  const buttonStyles = {
    fontSize: "12px",
    height: "40px",
    padding: "18px",
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
      flex: 2.5,
      renderCell: (params) => <Typography sx={{}}>{params.value}</Typography>,
      headerClassName: "headerCell",
      sortable: false,
    },
    {
      field: "col1",
      headerName: "<50",
      flex: 1.5,
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
      flex: 1.5,
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
      flex: 1.5,
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
      flex: 1.5,
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
      flex: 1.2,
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
  const handleVerticalChange = (value: Option | null) =>
    setselectedVertical(value);
  const handleStateChange = (value: Option | null) => setSelectedState(value);
  const handleMetroChange = (value: Option | null) => setSelectedMetro(value);
  const handleTalukChange = (value: Option | null) => setSelectedTaluk(value);
  const handleWardChange = (
    _event: any,
    newValue: Array<{ label: string; value: string }>
  ) => {
    setSelectedWard(newValue);
  };

  const handlePincodeChange = (value: Option | null) =>
    setSelectedPincode(value);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={1} sx={{ p: 2 }}>
          <Grid item xs={2}>
            <CustomSelectSearch
              label="Verticals"
              placeholder="Select Verticals"
              options={verticalData}
              value={selectedVertical}
              onChange={handleVerticalChange}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomSelectSearch
              label="State"
              placeholder="Select State"
              options={stateData}
              value={selectedState}
              onChange={handleStateChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Metro/Non-Metro"
              placeholder="Select Metro/Non-Metro"
              options={metroOrNonMetro}
              value={selectedMetro}
              onChange={handleMetroChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Metropolitan"
              placeholder="Select Metropolitan"
              options={[{ label: "Chennai", value: "Chennai" }]}
              value={selectedMetropolitan}
              onChange={handleMetropolitanChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Taluk"
              placeholder="Select Taluks"
              options={taluk}
              value={selectedTaluk}
              onChange={handleTalukChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontSize: "12px", mt: "2px" }}>Wards</Typography>
            <Autocomplete
              multiple
              options={ward}
              value={selectedWard}
              onChange={handleWardChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "0px",
                  borderRadius: "8px",
                  border: `1.8px solid ${SelectAutoCompleteBorderColor}`,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: `none`,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: `none`,
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select wards"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.label}
                    {...getTagProps({ index })}
                    sx={{
                      width: "auto",
                      whiteSpace: "nowrap",
                      overflow: "visible",
                      textOverflow: "clip",
                      margin: "2px",
                    }}
                  />
                ))
              }
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Pincode"
              placeholder="Select Pincode"
              options={pincode}
              value={selectedPincode}
              onChange={handlePincodeChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <CustomButton
                buttonText="Clear All"
                buttonStyles={buttonStyles}
              />
              <CustomButton
                buttonText="Apply Filter"
                buttonStyles={buttonStyles}
                onClick={handleApplyFilter}
              />
            </Box>
          </Grid>
        </Grid>
        {clickedOverview && (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Grid container spacing={3} sx={{ width: "100%" }}>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Overview
                  </Typography>
                  <Box sx={{ mt: 2.5 }}>
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
                        "& .MuiDataGrid-cell": {
                          display: "flex",
                          alignItems: "center",
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
        )}
      </Box>
    </>
  );
};

export default NewMap;
