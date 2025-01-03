import { useState } from "react";
import CustomSelectSearch from "../../common/CustomSelectSearch";
import { Box, Grid, Typography } from "@mui/material";
import CustomButton from "../../common/CustomButton";
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
  const [selectedVertical, setselectedVertical] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedMetro, setSelectedMetro] = useState<Option | null>(null);
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
  const [selectedTaluk, setSelectedTaluk] = useState<Option | null>(null);
  const [selectedWard, setSelectedWard] = useState<Option | null>(null);
  const [selectedPincode, setSelectedPincode] = useState<Option | null>(null);
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
  const verticalData = [
    "S&D",
    "Marketing",
    "IT & Support",
    "Human Resource",
    "CRM",
    "Inventory",
    "Logistics",
  ];
  const stateData = ["Tamil Nadu"];
  const metroOrNonMetro = ["Metro", "Non-Metro"];
  const taluk = [
    "Taluk 1",
    "Taluk 2",
    "Taluk 3",
    "Taluk 4",
    "Taluk 5",
    "Taluk 6",
    "Taluk 7",
  ];
  const ward = [
    "0001",

    "0002",

    "0003",

    "0004",

    "0005",

    "0006",

    "0007",

    "0008",

    "0009",

    "0010",

    "0011",

    "0012",

    "0013",

    "0014",

    "0015",

    "0016",

    "0017",

    "0018",

    "0019",

    "0020",

    "0021",

    "0022",

    "0023",

    "0024",

    "0025",

    "0026",

    "0027",

    "0028",

    "0029",

    "0030",

    "0031",

    "0032",

    "0033",

    "0034",

    "0035",

    "0036",

    "0037",

    "0038",

    "0039",

    "0040",

    "0041",

    "0042",

    "0043",

    "0044",

    "0045",

    "0046",

    "0047",

    "0048",

    "0049",

    "0050",

    "0051",

    "0052",

    "0053",

    "0054",

    "0055",

    "0056",

    "0057",

    "0058",

    "0059",

    "0060",

    "0061",

    "0062",

    "0063",

    "0064",

    "0065",

    "0066",

    "0067",

    "0068",

    "0069",

    "0070",

    "0071",

    "0072",

    "0073",

    "0074",

    "0075",

    "0076",

    "0077",

    "0078",

    "0079",

    "0080",

    "0081",

    "0082",

    "0083",

    "0084",

    "0085",

    "0086",

    "0087",

    "0088",

    "0089",

    "0090",

    "0091",

    "0092",

    "0093",

    "0094",

    "0095",

    "0096",

    "0097",

    "0098",

    "0099",

    "0100",

    "0101",

    "0102",

    "0103",

    "0104",

    "0105",

    "0106",

    "0107",

    "0108",

    "0109",

    "0110",

    "0111",

    "0112",

    "0113",

    "0114",

    "0115",

    "0116",

    "0117",

    "0118",

    "0119",

    "0120",

    "0121",

    "0122",

    "0123",

    "0124",

    "0125",

    "0126",

    "0127",

    "0128",

    "0129",

    "0130",

    "0131",

    "0132",

    "0133",

    "0134",

    "0135",

    "0136",

    "0137",

    "0138",

    "0139",

    "0140",

    "0141",

    "0142",

    "0143",

    "0144",

    "0145",

    "0146",

    "0147",

    "0148",

    "0149",

    "0150",

    "0151",

    "0152",

    "0153",

    "0154",

    "0155",
  ];
  const pincode = [6005007];

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
  const handleWardChange = (value: Option | null) => setSelectedWard(value);
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
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Ward"
              placeholder="Select Ward"
              options={ward}
              value={selectedWard}
              onChange={handleWardChange}
            />
          </Grid>
          <Grid item xs={2}>
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
                    // getRowClassName={() => "centered-row"}
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
      </Box>
    </>
  );
};

export default NewMap;
