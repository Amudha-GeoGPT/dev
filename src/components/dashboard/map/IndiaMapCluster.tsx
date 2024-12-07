/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Map as LeafletMap } from "leaflet";
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
  setSelectedLatitude,
  setSelectedLongitude,
} from "../../../redux/Slice/mapSlice";
import { Circle } from "react-leaflet";
import L from "leaflet";
// import markerIcon from '../../../assets/icons/map-marker-2-256.png';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOnIcon from "@mui/icons-material/LocationOn";

const { BaseLayer } = LayersControl;

const IndiaMap = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<LeafletMap | null>(null);

  const {
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
  const [outletData, setOutletData] = useState<any>(null);
  const [distributorRadius, setDistributorRadius] = useState<{
    center: [number, number];
    radius: number;
    color: string;
  } | null>(null);

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
      dispatch(fetchDistributorDataThunk());
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
  // const [distributorRadius, setDistributorRadius] = useState<{
  //   center: [number, number];
  //   radius: number;
  // } | null>(null);
  const blueIcon = L.icon({
    iconUrl: LocationOnIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const purpleIcon = L.icon({
    iconUrl: "path/to/purple-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const fetchMapResults = async (distributorName: string) => {
    try {
      const distributor = availableDistributors.find(
        (d) => d.distributorName === distributorName
      );
      if (!distributor) return;

      const response = await fetch(
        "https://geogptdev.ckdigital.in/api/getmapresult",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vertical: "sales",
            distributorName: distributorName,
            latitude: distributor.latitude,
            longitude: distributor.longitude,
            distance: selectedDistance,
            pincode: "",
            category: "",
          }),
        }
      );

      const responseData = await response.json();
      setOutletData(responseData);

      const outletType = responseData.results[0]?.outletTagged;

      setDistributorRadius({
        center: [distributor.latitude, distributor.longitude],
        radius: selectedDistance * 1000,
        color: outletType === "Universal Outlet" ? "#0000FF" : "#800080",
      });

      if (mapRef.current) {
        mapRef.current.setView(
          [distributor.latitude, distributor.longitude],
          12
        );
      }
    } catch (error) {
      console.error("Error fetching map results:", error);
    }
  };

  const handleDistributorSelect = (value: string) => {
    dispatch(setSelectedDistributor(value));
    const distributor = availableDistributors.find(
      (d) => d.distributorName === value
    );

    if (distributor) {
      fetchMapResults(value);
    }
  };

  const mapOptions = {};
  const markerClusterOptions = {};
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
            />

            <CustomSelect
              label="Distributor"
              placeholder="Select Distributor"
              options={availableDistributors.map((d) => d.distributorName)}
              value={selectedDistributor}
              onChange={handleDistributorSelect}
              sx={{ marginTop: "4px", height: "39px" }}
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
                url={`https://surveyoutlet.blob.core.windows.net/geogpt/TAMILNADU/{z}/{x}/{y}.png?sv=2023-01-03&se=2025-01-04T10%3A33%3A54Z&sr=c&sp=rl&sig=sXlqL0SFvPHYKCPt4cTLum8b38wz6Kf%2FqcvHnc5fU9M%3D`}
                maxZoom={19}
                tileSize={256}
                subdomains={["a", "b", "c"]}
                keepBuffer={2}
              />
            </BaseLayer>
            <BaseLayer name="Satellite with Labels">
              <TileLayer
                url={`http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}`}
                maxZoom={20}
              />
            </BaseLayer>
          </LayersControl>

          <MarkerClusterGroup {...markerClusterOptions}>
            {selectedDistributorMarker && (
              <>
                <Marker
                  position={[
                    selectedDistributorMarker.latitude,
                    selectedDistributorMarker.longitude,
                  ]}
                  icon={
                    outletData?.results[0]?.outletTagged === "Universal Outlet"
                      ? blueIcon
                      : purpleIcon
                  }
                >
                  <Popup>
                    <div>
                      <strong>
                        {selectedDistributorMarker.distributorName}
                      </strong>
                      <br />
                      Code: {selectedDistributorMarker.distributorCode}
                      <br />
                      Type: {outletData?.results[0]?.outletTagged}
                    </div>
                  </Popup>
                </Marker>

                {distributorRadius && selectedVertical === "S&D" && (
                  <Circle
                    center={distributorRadius.center}
                    radius={distributorRadius.radius}
                    pathOptions={{
                      color: distributorRadius.color,
                      fillColor: distributorRadius.color,
                      fillOpacity: 0.1,
                      weight: 1,
                    }}
                  />
                )}
              </>
            )}
          </MarkerClusterGroup>
        </MapContainer>
      </Box>
    </Box>
  );
};

export default IndiaMap;
