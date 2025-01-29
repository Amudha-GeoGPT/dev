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
  const [responseData, setResponseData] = useState<any>(null);
  const [selectedSearch, setselectedSearch] = useState<string>("");
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedMetro, setSelectedMetro] = useState<string>("");
  const [metropolitanOptions, setMetropolitanOptions] = useState<any[]>([]);
  const [dynamicLabel, setDynamicLabel] = useState("Metropolitan");
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState(
    "Select Metropolitan"
  );
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

  const [selectedPincode, setSelectedPincode] = useState<Option | null>(null);
  const metroOrNonMetro = [
    { label: "Metro", value: "Metro" },
    { label: "Non-Metro", value: "Non-Metro" },
  ];
  const [selectedWard, setSelectedWard] = useState<any[]>([]);
  const [selectedTaluk, setSelectedTaluk] = useState<any[]>([]);

  const [wardOptions, setWardOptions] = useState<any[]>([]);
  const [talukOptions, setTalukOptions] = useState<any[]>([]);

  const handleApplyFilter = async () => {
    // console.log("Selected Metropolitan:", selectedMetropolitan);

    const districtName =
      typeof selectedMetropolitan === "string"
        ? selectedMetropolitan
        : selectedMetropolitan;

    if (!districtName) {
      alert("Please select a metropolitan district.");
      return;
    }
    try {
      const payload: any = { district_name: districtName };

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
            district_name: item.district_name,
          }));
        });

        setWardDataForMap(allTransformedWards);

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
        district_name: item.district_name,
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
    padding: "10px",
    backgroundColor: "#001B04",
    color: "#FFFFFF",
    textTransform: "none" as const,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 2.3,
    "&:hover": {
      backgroundColor: "#0A330A",
    },
  };
  const ClearAllButtonStyles = {
    fontSize: "12px",
    height: "40px",
    padding: "10px",
    backgroundColor: "white",
    color: "black",
    textTransform: "none" as const,
    borderRadius: "8px",
    border: "1px solid black",
    mt: 2.3,
    width: "100%",
  };

  const handleVerticalChange = (value: any) => setselectedVertical(value);
  const handleSearchChange = (value: string) => setselectedSearch(value);
  // const handleStateChange = (value: any) => setSelectedState(value);

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

  const handleStateChange = async (selectedOption: any) => {
    const stateName = selectedOption?.value;

    setSelectedState(selectedOption);

    try {
      const response = await axios.post(
        "https://geogptdev.ckdigital.in/api/filterMetro",
        { stateName }
      );

      if (response.data.message === "success") {
        setResponseData(response.data.results);
      }
    } catch (err) {
      console.error("POST call failed:", err);
    }
  };

  const handleMetroChange = (selectedOption: any) => {
    setSelectedMetro(selectedOption?.value);

    const metroData = responseData?.Metro;
    const nonMetroData = responseData?.Non_Metro;

    let options = [];
    if (
      selectedOption?.value === "Non-Metro" ||
      selectedOption?.value === "Metro"
    ) {
      setSelectedMetropolitan(null);
      setSelectedWard([]);
      setSelectedTaluk([]);
      setclickedOverview(false);
    }
    if (selectedOption?.value === "Metro" && metroData) {
      options = metroData[0]?.data
        .map((item: any) => ({
          label: item.district_name,
          value: item.district_name,
          wards: item.wards,
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label));
      setDynamicLabel("Metropolitan");
      setDynamicPlaceholder("Select Metropolitan");
    } else if (selectedOption?.value === "Non-Metro" && nonMetroData) {
      options = nonMetroData[0]?.data
        .map((item: any) => ({
          label: item.district_name,
          value: item.district_name,
          taluks: item.taluks,
        }))

        .sort((a: any, b: any) => a.label.localeCompare(b.label));
      setDynamicLabel("District");
      setDynamicPlaceholder("Select District");
    }

    setMetropolitanOptions(options);
  };

  const handleMetropolitanChange = (selectedOption: any) => {
    setSelectedMetropolitan(selectedOption?.value);

    const selectedDistrict = metropolitanOptions.find(
      (item: any) => item.value === selectedOption?.value
    );

    if (selectedDistrict) {
      if (selectedDistrict.wards && selectedDistrict.wards.length > 0) {
        setWardOptions(
          selectedDistrict.wards.map((ward: any) => ({
            label: ward.ward_no,
            value: ward.ward_no,
          }))
        );
      } else {
        setWardOptions([]);
      }

      if (selectedDistrict.taluks && selectedDistrict.taluks.length > 0) {
        setTalukOptions(
          selectedDistrict.taluks.map((taluk: any) => ({
            label: taluk.taluk_no,
            value: taluk.taluk_no,
          }))
        );
      } else {
        // alert("No Taluk data found")
        setTalukOptions([]);
      }
    }
  };

  return {
    selectedVertical,
    setselectedVertical,
    selectedSearch,
    setselectedSearch,
    selectedState,
    wardOptions,
    metroOrNonMetro,
    setSelectedState,
    selectedMetro,
    setSelectedMetro,
    clicked,
    ClearAllButtonStyles,
    setClicked,
    clickedOverview,
    handleTalukChange,
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
    metropolitanOptions,
    selectedPincode,
    setSelectedPincode,
    handleMetropolitanChange,
    handleApplyFilter,
    handleCellClick,
    ApplyFilterButtonStyles,
    handlePincodeChange,
    // handleTalukChange,
    handleWardChange,
    handleMetroChange,
    handleStateChange,
    handleSearchChange,
    handleVerticalChange,
    dynamicLabel,
    dynamicPlaceholder,
    talukOptions,
  };
};
