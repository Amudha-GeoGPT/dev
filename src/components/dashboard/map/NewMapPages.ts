/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
export const useNewMapPages = (
  setWardDataNo: (value: any) => void,
  setWardDataPoint: (value: any[]) => void

) => {
  const [selectedVertical, setselectedVertical] = useState<any>("");
  const [selectedSearch, setselectedSearch] = useState<string>("");
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedMetro, setSelectedMetro] = useState<string>("");
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
      CKOutlets: "Population",
      col1: "",
      col2: "",
      col3: "",
      col4: "",
      col5: "",
    },
  ]);
  const [selectedTaluk, setSelectedTaluk] = useState<
    Array<{ label: string; value: string }>
  >([]);
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
            CKOutlets: "Population",
            col1: ranges.lt50.population,
            col2: ranges["51to100"].population,
            col3: ranges["100to200"].population,
            col4: ranges["200to300"].population,
            col5: ranges.gt300.population,
          },
        ]);

        // Plot all the ward data on the map after applying the filter
        const allTransformedWards = Object.keys(results).flatMap((range) => {
          const specificRange = results[range];
          return specificRange.data.map((item: any) => ({
            coordinates: item.boundaries.map((boundary: any) => [
              boundary.latitude,
              boundary.longitude,
            ]),
            color_code: item.color_code,
            ward_name: item.ward_name,
            ward_no: item.ward_no,
          }));
        });

        setWardDataForMap(allTransformedWards);

        // Set clicked state to true to indicate that the map data has been loaded
        setClicked(true);
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
    setWardDataNo(null);
    setWardDataPoint([]);

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

  const ApplyFilterButtonStyles = {
    fontSize: "12px",
    height: "40px",
    padding: "18px",
    backgroundColor: "#001B04",
    color: "#FFFFFF",
    textTransform: "none" as const,
    borderRadius: "8px",
    mt: 2.5,
    "&:hover": {
      backgroundColor: "#0A330A",
    },
  };
  const ClearAllButtonStyles = {
    fontSize: "12px",
    height: "40px",
    padding: "18px",
    backgroundColor: "white",
    color: "black",
    textTransform: "none" as const,
    borderRadius: "8px",
    border: "1px solid black",
    mt: 2.5,
  };

  const handleVerticalChange = (value: any) => setselectedVertical(value);
  const handleSearchChange = (value: string) => setselectedSearch(value);
  const handleStateChange = (value: any) => setSelectedState(value);
  const handleMetroChange = (value: any) => {
    setSelectedMetro(value);
  };
  const handleWardChange = (
    _event: any,
    newValue: Array<{ label: string; value: string }>
  ) => {
    setSelectedWard(newValue);
  };
  const handleTalukChange = (
    _event: any,
    newValue: Array<{ label: string; value: string }>
  ) => {
    setSelectedTaluk(newValue);
  };

  const handlePincodeChange = (value: Option | null) =>
    setSelectedPincode(value);
  return {
    selectedVertical,
    setselectedVertical,
    selectedSearch,
    setselectedSearch,
    selectedState,
    setSelectedState,
    selectedMetro,
    setSelectedMetro,
    clicked,
    ClearAllButtonStyles,
    setClicked,
    clickedOverview,
    setclickedOverview,
    selectedMetropolitan,
    setSelectedMetropolitan,
    wardDataCache,
    setWardDataCache,
    specificRangeData,
    setSpecificRangeData,
    wardDataForMap,
    setWardDataForMap,
    rows,
    setRows,
    selectedTaluk,
    setSelectedTaluk,
    selectedWard,
    setSelectedWard,
    selectedPincode,
    setSelectedPincode,
    handleMetropolitanChange,
    handleApplyFilter,
    handleCellClick,
    ApplyFilterButtonStyles,
    handlePincodeChange,
    handleTalukChange,
    handleWardChange,
    handleMetroChange,
    handleStateChange,
    handleSearchChange,
    handleVerticalChange,
  };
};
