
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
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
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { RootState, useAppDispatch } from "../../../store/store";
import {
  fetchDistributorDataThunk,
  fetchMapResultsThunk,
  fetchFilterDataThunk,
} from "../../../redux/Thunks/mapThunks";
import {
  setSelectedState,
  setSelectedDistrict,
  setSelectedCategory,
  setSelectedVertical,
  setSelectedDistributor,
  setSelectedDistance,
  setAvailableDistricts,
  setAvailableDistributors,
  setSelectedLatitude,
  setSelectedLongitude,
} from "../../../redux/Slice/mapSlice";
import L from "leaflet";
import markerIcon from '../../../assets/icons/map-marker-2-256.png';
import markerPurpleIcon from '../../../assets/icons/map-marker-2-256 (purple).png';

const { BaseLayer } = LayersControl;

const IndiaMap = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<LeafletMap | null>(null);
  const [selectedInputMethod, setSelectedInputMethod] = useState("Distributor");
  const [selectedPincode, setSelectedPincode] = useState("");
  
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
    outletData,
  } = useSelector((state: RootState) => state.map);

  const verticalOptions = ["S&D", "CK Retail"];
  const distanceOptions = [25, 50];
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
        const distributors = districtObj[selectedDistrict]?.distributor_list || [];
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

  const handleFilter = () => {
    if (selectedVertical === "S&D" && selectedInputMethod === "Pincode") {
      if (!selectedPincode) {
        console.error("Pincode is required");
        return;
      }
      dispatch(fetchMapResultsThunk({
        distributorName: selectedDistributor,
        latitude: selectedLatitude?.toString() || "8.274030043",
        longitude: selectedLongitude?.toString() || "77.44223",
        distance: selectedDistance.toString(),
        pincode: selectedPincode,
      }));
    } else if (selectedVertical === "CK Retail") {
      dispatch(fetchFilterDataThunk({
        vertical: "ckretail",
        category: selectedCategory,
        latitude: selectedLatitude?.toString() || "",
        longitude: selectedLongitude?.toString() || "",
        distance: selectedDistance.toString(),
        pincode: selectedPincode,
      }));
    }
  };

  const handleDistributorSelect = (value: string) => {
    dispatch(setSelectedDistributor(value));
    const distributor = availableDistributors.find(d => d.distributorName === value);
    if (distributor) {
      dispatch(fetchMapResultsThunk({
        distributorName: value,
        latitude: distributor.latitude,
        longitude: distributor.longitude,
        distance: selectedDistance,
      }));
    }
  };

  const blueIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const purpleIcon = L.icon({
    iconUrl: markerPurpleIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const mapOptions = {};

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
              label="Select Input Method"
              placeholder="Choose Input Method"
              options={["Distributor", "Pincode"]}
              value={selectedInputMethod}
              onChange={(value) => setSelectedInputMethod(value)}
              sx={{ marginTop: "4px", height: "39px" }}
            />
            {selectedInputMethod === "Distributor" ? (
              <CustomSelect
                label="Distributor"
                placeholder="Select Distributor"
                options={availableDistributors.map((d) => d.distributorName)}
                value={selectedDistributor}
                onChange={handleDistributorSelect}
                sx={{ marginTop: "4px", height: "39px" }}
              />
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Typography sx={{ color: "black", fontSize: "16px" }}>Pincode</Typography>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  value={selectedPincode}
                  onChange={(e) => setSelectedPincode(e.target.value)}
                  style={{
                    height: '39px',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '100%',
                  }}
                />
              </Box>
            )}
            <CustomSelect
              label="Distance"
              placeholder="Select Distance"
              options={distanceOptions.map(String)}
              value={String(selectedDistance)}
              onChange={(value) => dispatch(setSelectedDistance(Number(value)))}
              sx={{ marginTop: "4px", height: "39px" }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <CustomButton
                buttonText="Filter"
                onClick={handleFilter}
                disabled={loading || (selectedInputMethod === "Pincode" && !selectedPincode)}
              />
            </Box>
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
    <Box sx={{ display: "flex", alignItems: "center", width: "100%", flexWrap: "wrap", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Typography sx={{ fontSize: "16px" }}>Latitude</Typography>
        <input
          type="text"
          placeholder="Select Latitude"
          value={selectedLatitude?.toString() || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(parseFloat(value))) {
              handleLatLongChange(parseFloat(value), selectedLongitude || 0);
            }
          }}
          style={{ height: '39px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </Box>
      
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Typography sx={{ fontSize: "16px" }}>Longitude</Typography>
        <input
          type="text"
          placeholder="Select Longitude"
          value={selectedLongitude?.toString() || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(parseFloat(value))) {
              handleLatLongChange(selectedLatitude || 0, parseFloat(value));
            }
          }}
          style={{ height: '39px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Typography sx={{ color: "black", fontSize: "16px" }}>Pincode</Typography>
        <input
          type="text"
          placeholder="Enter Pincode"
          value={selectedPincode || ""}
          onChange={(e) => setSelectedPincode(e.target.value)}
          style={{ height: '39px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </Box>

      <CustomSelect
        label="Distance"
        placeholder="Select Distance"
        options={["25", "50"]}
        value={selectedDistance.toString()}
        onChange={(value) => dispatch(setSelectedDistance(parseInt(value)))}
        sx={{ marginTop: "3px", height: "39px", flexGrow: 1 }}
      />

      <Box sx={{ display: "flex", alignItems: "center", marginTop: "6px" }}>
        <CustomButton
          buttonText={!selectedCategory ? "Select category" : "Filter"}
          onClick={handleFilter}
          disabled={loading || !selectedCategory}
        />
      </Box>
    </Box>
  </>
)}

      <Box sx={{ height: "735px", width: "100%", mt: 2, position: "relative" }}>
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
          style={{ height: "100%", width: "100%", zIndex: 0 }}
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
          <MarkerClusterGroup>
            {outletData?.map((outlet: any) => (
              <Marker
                key={outlet._id.$oid}
                position={[outlet.latitude, outlet.longitude]}
                icon={
                  outlet.category === "Department Store" &&
                  outlet.outletTagged === "Universal Outlet"
                    ? blueIcon
                    : purpleIcon
                }
              >
                <Popup>
                  <div style={{ fontSize: "14px", lineHeight: "1.5" }}>
                    <strong>{outlet.outletName}</strong>
                    <br />
                    District: {outlet.districtName}
                    <br />
                    State: {outlet.stateName}
                    <br />
                    Subdistrict: {outlet.subdistrictName}
                    <br />
                    Village/Town: {outlet.villageTownName}
                    <br />
                    Pincode: {outlet.pincode}
                    <br />
                    PID: {typeof outlet.pid === "object" ? outlet.pid.$numberDouble : outlet.pid}
                    <br />
                    Overall Score: {typeof outlet.overallScore === "object" ? outlet.overallScore.$numberDouble : outlet.overallScore}
                    <br />
                    Reality Score: {typeof outlet.realityScore === "object" ? outlet.realityScore.$numberDouble : outlet.realityScore}
                    <br />
                    Type: {outlet.outletTagged}
                    <br />
                    Coordinates: [{outlet.latitude}, {outlet.longitude}]
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
        <Box
          sx={{
            position: "absolute",
            top: "70px",
            right: "10px",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "250px",
            zIndex: 1000,
          }}
        >
          <h4 style={{ margin: "0 0 10px 0" }}>Market Criteria</h4>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <div style={{ backgroundColor: "green", width: "20px", height: "20px", marginRight: "5px" }}></div>
            <span>P1 Market</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <div style={{ backgroundColor: "yellow", width: "20px", height: "20px", marginRight: "5px" }}></div>
            <span>P2 Market</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <div style={{ backgroundColor: "red", width: "20px", height: "20px", marginRight: "5px" }}></div>
            <span>P3 Market</span>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default IndiaMap;