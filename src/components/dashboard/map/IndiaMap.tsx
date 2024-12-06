import { Box } from "@mui/material";
import { useEffect, useRef, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import {
  MapContainer,
  TileLayer,
  Marker,
  // Popup,
  Tooltip,
  LayersControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet.markercluster";
import { RootState, useAppDispatch } from "../../../service/store/store";
import { fetchLocationDataThunk } from "../../../redux/Thunks/mapThunks";
import {
  setSelectedState,
  setSelectedDistrict,
  setSelectedCategory,
} from "../../../redux/Slice/mapSlice";

const { BaseLayer } = LayersControl;

const IndiaMap = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<LeafletMap | null>(null);
  const {
    filteredMarkers,
    loading,
    selectedState,
    selectedDistrict,
    selectedCategory,
  } = useSelector((state: RootState) => state.map);

  const handleFilter = useCallback(async () => {
    await dispatch(
      fetchLocationDataThunk({
        category: selectedCategory,
        district: selectedDistrict,
      })
    );
  }, [dispatch, selectedCategory, selectedDistrict]);

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

  const districtOptions = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivagangai",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupattur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
    "Mayiladuthurai",
  ];
  // const distributorOptions = [
  //  "Distributor",
  // ];
  const markers = useMemo(() => {
    return filteredMarkers
      .filter((outlet) => outlet.latitude && outlet.longitude)
      .map((outlet) => (
        <Marker key={outlet.pid} position={[outlet.latitude, outlet.longitude]}>
          {/* <Popup>
            <strong>{outlet.outletName}</strong>
            <br />
            Overall Score: {outlet.overallScore}
            <br />
            Reality Score: {outlet.realityScore}
          </Popup> */}
          <Tooltip direction="top" offset={[-8, -15]}>
            <div>
              <strong>Outlet Name:</strong> {outlet.outletName || "N/A"}
              <br />
              <strong>Overall Score:</strong> {outlet.overallScore || "N/A"}
              <br />
              <strong>PID:</strong> {outlet.pid || "N/A"}
              <br />
              <strong>Reality Score:</strong> {outlet.realityScore || "N/A"}
              <br />
              <strong>Census Code:</strong> {outlet.censusCode || "N/A"}
            </div>
          </Tooltip>
        </Marker>
      ));
  }, [filteredMarkers]);

  const mapOptions = {
    preferCanvas: true,
    renderer: L.canvas(),
    updateWhenZooming: false,
    updateWhenIdle: true,
    minZoom: 5,
    maxZoom: 19,
    maxBounds: L.latLngBounds(L.latLng(8.4, 76.0), L.latLng(13.5, 80.5)),
    zoomControl: false,
    attributionControl: false,
  };

  useEffect(() => {
    if (mapRef.current && filteredMarkers.length > 0) {
      const bounds = L.latLngBounds(
        filteredMarkers
          .filter((marker) => marker.latitude && marker.longitude)
          .map((marker) => [marker.latitude, marker.longitude])
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [filteredMarkers]);

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
         {/* <CustomSelect
          label="Vertical"
          placeholder="Select Vertical"
          options={["S&D", "CK Retail"]}
          // value={selectedState}
          // onChange={(value) => dispatch(setSelectedState(value))}
          sx={{ marginTop: "4px", height: "39px" }}
        /> */}
        <CustomSelect
          label="State"
          placeholder="Select State"
          options={["TAMIL NADU", "KARNATAKA"]}
          value={selectedState}
          onChange={(value) => dispatch(setSelectedState(value))}
          sx={{ marginTop: "4px", height: "39px" }}
        />
        <CustomSelect
          label="District"
          placeholder="Select District"
          options={districtOptions}
          value={selectedDistrict}
          onChange={(value) => dispatch(setSelectedDistrict(value))}
          sx={{ marginTop: "4px", height: "39px" }}
        />
        <CustomSelect
          label="Category"
          placeholder="Select Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={(value) => dispatch(setSelectedCategory(value))}
          sx={{ marginTop: "4px", height: "39px" }}
        />
        {/* <CustomSelect
          label="Distributor"
          placeholder="Select Distributor"
          // options={distributorOptions}
          // value={selectedDistributor}
          // onChange={(value) => dispatch(setSelectedCategory(value))}
          sx={{ marginTop: "4px", height: "39px" }}
        /> */}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          buttonText="Filter"
          onClick={handleFilter}
          disabled={loading}
        />
      </Box>
      <Box sx={{ height: "700px", width: "100%", mt: 2 }}>
        <MapContainer
          ref={mapRef}
          center={[11.1271, 78.6569]}
          zoom={7}
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
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
            </BaseLayer>
          </LayersControl>
          <MarkerClusterGroup>{markers}</MarkerClusterGroup>
        </MapContainer>
      </Box>
    </Box>
  );
};

export default IndiaMap;
