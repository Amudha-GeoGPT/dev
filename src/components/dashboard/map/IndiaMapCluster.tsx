import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet.markercluster";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { RootState, useAppDispatch } from "../../../store/store";
import { fetchDistributorDataThunk } from "../../../redux/Thunks/mapThunks";
import {
  setSelectedState,
  setSelectedDistrict,
  setSelectedCategory,
  setSelectedVertical,
  setSelectedDistributor,
  setSelectedDistance,
  setAvailableDistricts,
  setAvailableDistributors,
  setFilteredMarkers,
} from "../../../redux/Slice/mapSlice";

const { BaseLayer } = LayersControl;

interface Outlet {
  pid: string;
  latitude: number;
  longitude: number;
  outletName: string;
  overallScore: number;
  realityScore: number;
  censusCode?: string;
}

const IndiaMap = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<LeafletMap | null>(null);
  const [debouncedTimer, setDebouncedTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    filteredMarkers,
    loading,
    selectedState,
    selectedDistrict,
    selectedCategory,
    selectedVertical,
    selectedDistributor,
    selectedDistance,
    distributorData,
    availableDistributors,
    selectedLatitude,
    selectedLongitude,
  } = useSelector((state: RootState) => state.map);

  const verticalOptions = ["S&D", "CK Retail"];
  const distanceOptions = [25, 50];
  const getDistrictOptions = () => {
    if (!distributorData || !selectedState) return [];

    return (
      distributorData[selectedState]?.map(
        (districtObj) => Object.keys(districtObj)[0]
      ) || []
    );
  };

  const getDistributorOptions = () => {
    if (!distributorData || !selectedState || !selectedDistrict) return [];

    const districtObj = distributorData[selectedState]?.find(
      (obj) => obj[selectedDistrict]
    );
    return districtObj
      ? districtObj[selectedDistrict]?.distributor_list?.map(
          (d) => d.distributorName
        ) || []
      : [];
  };
  const categoryOptions = [
    "Bakery and Baked Goods Store",
    "Cafeteria",
    "Catering and Other Food Services",
    "Coffee Shop",
    "Coffee-Tea",
    "Consumer Goods",
    "Convenience Store",
    "Dairy Goods",
    "Department Store",
    "Drugstore",
    "Drugstore or Pharmacy",
    "Food Market-Stall",
    "Food-Beverage Specialty Store",
    "Grocery",
    "Home Specialty Store",
    "Pharmacy",
    "Restaurant",
    "Specialty Food Store",
    "Specialty Store",
    "Sweet Shop",
    "Tea House",
    "Variety Store",
  ]; 


  useEffect(() => {
    if (selectedVertical === "S&D") {
      setIsLoading(true);
      setError(null);
      dispatch(fetchDistributorDataThunk())
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [selectedVertical, dispatch]);

  useEffect(() => {
    if (distributorData && selectedState) {
      const districts = distributorData[selectedState]
        ?.map((districtObj) => Object.keys(districtObj)[0])
        .filter(Boolean);

      dispatch(setAvailableDistricts(districts || []));
    }
  }, [selectedState, distributorData, dispatch]);

  useEffect(() => {
    if (distributorData && selectedState && selectedDistrict) {
      const districtObj = distributorData[selectedState]?.find(
        (obj) => obj[selectedDistrict]
      );

      if (districtObj) {
        const distributors =
          districtObj[selectedDistrict]?.distributor_list || [];
        dispatch(setAvailableDistributors(distributors));
      }
    }
  }, [selectedDistrict, selectedState, distributorData, dispatch]);
  const handleLatLongChange = (lat: number, long: number) => {
    dispatch(setSelectedLatitude(lat));
    dispatch(setSelectedLongitude(long));

    if (mapRef.current && lat && long) {
      mapRef.current.setView([lat, long], 12);
    }
  };

  const handleFilter = async () => {
    if (selectedVertical === "CK Retail") {
      try {
        const response = await fetch(
          "https://geogptdev.ckdigital.in/api/filter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              stateName: "TAMIL NADU",
              districtName: "Chennai",
              category: selectedCategory,
              latitude: selectedLatitude,
              longitude: selectedLongitude,
              distance: selectedDistance,
            }),
          }
        );

        const data = await response.json();
        if (data.results) {
          dispatch(
            setFilteredMarkers(
              data.results.flatMap((result: any) => result.outletDetails)
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const mapOptions = {};
  const markerClusterOptions = {}; 
  const markers: never[] = []; 
  const selectedDistributorMarker =
    selectedDistributor && availableDistributors.length > 0
      ? availableDistributors.find(
          (d) => d.distributorName === selectedDistributor
        )
      : null;

  return (
    <Box sx={{ height: "80%", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
          gap: "10px",
        }}
      >
        <CustomSelect
          label="Vertical"
          placeholder="Select Vertical"
          options={verticalOptions}
          value={selectedVertical}
          onChange={(value) => dispatch(setSelectedVertical(value))}
          sx={{ marginTop: "4px", height: "39px" }}
        />

        {selectedVertical === "S&D" ? (
          <>
            <CustomSelect
              label="State"
              placeholder="Select State"
              options={distributorData ? Object.keys(distributorData) : []}
              value={selectedState}
              onChange={(value) => dispatch(setSelectedState(value))}
              sx={{ marginTop: "4px", height: "39px" }}
            />

            <CustomSelect
              label="District"
              placeholder="Select District"
              options={
                selectedState && distributorData
                  ? distributorData[selectedState]?.map(
                      (districtObj) => Object.keys(districtObj)[0]
                    ) || []
                  : []
              }
              value={selectedDistrict}
              onChange={(value) => dispatch(setSelectedDistrict(value))}
              sx={{ marginTop: "4px", height: "39px" }}
              disabled={!selectedState || !distributorData}
            />

            <CustomSelect
              label="Distributor"
              placeholder="Select Distributor"
              options={availableDistributors.map((d) => d.distributorName)}
              value={selectedDistributor}
              onChange={(value) => {
                dispatch(setSelectedDistributor(value));
                const distributor = availableDistributors.find(
                  (d) => d.distributorName === value
                );
                if (distributor && mapRef.current) {
                  mapRef.current.setView(
                    [distributor.latitude, distributor.longitude],
                    12
                  );
                }
              }}
              sx={{ marginTop: "4px", height: "39px" }}
              disabled={!selectedDistrict}
            />
            <CustomSelect
              label="Distance"
              placeholder="Select Distance"
              options={distanceOptions.map(String)}
              value={String(selectedDistance)}
              onChange={(value) => dispatch(setSelectedDistance(Number(value)))}
              sx={{ marginTop: "4px", height: "39px" }}
            />
          </>
        ) : (
          <>
            <CustomSelect
              label="Category"
              placeholder="Select Category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={(value) => dispatch(setSelectedCategory(value))}
              sx={{ marginTop: "4px", height: "39px" }}
            />
          </>
        )}
      </Box>
      {selectedVertical === "CK Retail" && (
        <>
          <CustomSelect
            label="Latitude"
            placeholder="Select Latitude"
            options={["13.0269700125116", "27.096548"]}
            value={selectedLatitude?.toString() || ""}
            onChange={(value) =>
              handleLatLongChange(parseFloat(value), selectedLongitude || 0)
            }
            sx={{ marginTop: "4px", height: "39px" }}
          />
          <CustomSelect
            label="Longitude"
            placeholder="Select Longitude"
            options={["80.25721997409174", "93.62047"]}
            value={selectedLongitude?.toString() || ""}
            onChange={(value) =>
              handleLatLongChange(selectedLatitude || 0, parseFloat(value))
            }
            sx={{ marginTop: "4px", height: "39px" }}
          />
          <CustomSelect
            label="Distance (km)"
            placeholder="Select Distance"
            options={["25", "50"]}
            value={selectedDistance.toString()}
            onChange={(value) => dispatch(setSelectedDistance(parseInt(value)))}
            sx={{ marginTop: "4px", height: "39px" }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomButton
              buttonText={!selectedCategory ? "Select category" : "Filter"}
              onClick={handleFilter}
              disabled={loading || !selectedCategory}
            />
          </Box>
        </>
      )}

      {/* Map Container */}
      <Box sx={{ height: "700px", width: "100%", mt: 2 }}>
        <MapContainer
          ref={mapRef}
          center={
            selectedVertical === "CK Retail" &&
            selectedLatitude &&
            selectedLongitude
              ? [selectedLatitude, selectedLongitude]
              : [11.1271, 78.6569]
          }
          zoom={selectedVertical === "CK Retail" ? 12 : 7}
          style={{ height: "100%", width: "100%" }}
          {...mapOptions}
        >
          <LayersControl position="topright">
            <BaseLayer checked name="Street">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
                tileSize={256}
                subdomains={["a", "b", "c"]}
                keepBuffer={2}
              />
            </BaseLayer>
            <BaseLayer name="Satellite with Labels">
              <TileLayer
                url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
                maxZoom={20}
              />
            </BaseLayer>
          </LayersControl>

          <MarkerClusterGroup {...markerClusterOptions}>
            {selectedDistributorMarker && (
              <Marker
                position={[
                  selectedDistributorMarker.latitude,
                  selectedDistributorMarker.longitude,
                ]}
              >
                <Popup>
                  <div>
                    <strong>{selectedDistributorMarker.distributorName}</strong>
                    <br />
                    Code: {selectedDistributorMarker.distributorCode}
                  </div>
                </Popup>
              </Marker>
            )}
          </MarkerClusterGroup>
        </MapContainer>
      </Box>
    </Box>
  );
};

export default IndiaMap;
