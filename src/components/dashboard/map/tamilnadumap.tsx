/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// // import React from 'react';

// // const IndiaMap = () => {
// //   return (
// //     <svg
// //       height="130%"
// //       width="200%"
// //       viewBox="-20 330 400 400"
// //       xmlns="http://www.w3.org/2000/svg"
// //       style={{ transform: 'translate(-1330px, -450px)' }} // Move the SVG up and left
// //     >
// //       <path
// //         d="M 175.673 281.99 L 175.832 281.99 L 175.779 282.123 L 175.726 282.096 L 175.753 282.016 L 175.753 281.963 L 175.726 281.963 Z M 175.991 282.362 L 175.965 282.389 L 175.938 282.362 L 175.912 282.336 L 175.912 282.362 L 175.859 282.362 L 175.885 282.416 L 175.859 282.416 L 175.673 282.469 L 175.593 282.442 L 175.593 282.389 L 175.514 282.336 L 175.381 282.283 L 175.328 282.309 L 175.302 282.309 L 175.275 282.336 L 175.302 282.442 L 175.328 282.469 L 175.328 282.549 L 175.328 282.576 L 175.249 282.576 L 175.249 282.629 L 175.222 282.629 L 175.196 282.682 L 175.646 282.815 L 175.699 282.815 L 175.753 282.842 L 175.753 282.815 L 175.885 282.789 L 175.567 284.306 L 175.593 284.971 L 176.283 286.567 L 176.442 288.349 L 176.389 289.783 L 176.309 289.704 L 176.309 289.677 L 175.567 289.677 L 175.514 289.624 L 175.434 289.677 L 175.434 289.704 L 175.434 289.783 L 175.514 289.81 L 175.54 289.836 L 175.593 289.969 L 175.593 290.022 L 175.54 290.022 L 175.275 289.943 L 175.196 289.969 L 175.222 290.102 L 175.249 290.102 L 175.355 290.049 L 175.355 290.102 L 175.302 290.182 L 175.249 290.182 L 175.222 290.261 L 175.275 290.235 L 175.275 290.261 L 175.249 290.288 L 175.355 290.315 L 175.355 290.368 L 175.381 290.341 L 175.408 290.341 L 175.408 290.394 L 175.434 290.394 L 175.408 290.447 L 175.567 290.421 L 175.54 290.474 L 175.567 290.5 L 176.097 290.66 L 176.363 291.191 L 176.575 295.435 L 176.654 295.886 L 175.912 296.045 L 172.65 295.568 L 172.172 295.594 L 171.164 296.337 L 170.714 297.502 L 171.058 298.112 L 170.687 298.35 L 169.812 299.383 L 169.785 299.647 L 168.592 300.918 L 167.982 302.029 L 167.77 303.166 L 168.539 304.065 L 169.52 304.885 L 168.539 304.753 L 167.558 304.911 L 165.701 305.44 L 165.489 305.757 L 164.799 306.021 L 163.42 306.153 L 162.147 306.946 L 161.511 307.474 L 161.14 308.187 L 161.166 309.163 L 160.715 310.325 L 160.795 311.512 L 159.946 312.725 L 159.336 312.936 L 158.408 313.569 L 157.904 313.701 L 157.161 314.36 L 155.862 314.597 L 155.544 315.15 L 153.395 314.781 L 151.406 313.305 L 152.388 311.987 L 152.414 311.512 L 153.077 311.09 L 152.467 310.193 L 152.255 309.375 L 152.918 308.53 L 151.857 306.972 L 152.945 305.81 L 153.077 304.515 L 153.555 304.012 L 153.581 303.537 L 154.112 303.034 L 153.74 302.029 L 152.679 302.056 L 152.149 301.421 L 152.52 300.759 L 152.679 299.7 L 152.441 299.515 L 152.998 298.668 L 152.892 298.191 L 152.335 297.502 L 152.918 297.37 L 152.892 296.125 L 152.096 295.303 L 150.452 296.416 L 149.63 296.31 L 148.966 295.78 L 149.152 295.197 L 148.94 294.507 L 149.073 293.234 L 149.444 292.836 L 149.683 291.616 L 148.94 290.819 L 148.171 290.633 L 147.402 290.235 L 148.25 288.641 L 147.163 287.977 L 145.519 287.844 L 146.155 287.312 L 146.394 286.514 L 145.572 286.275 L 144.776 285.69 L 143.821 285.45 L 143.53 284.652 L 144.193 284.652 L 145.307 284.12 L 145.333 283.827 L 146.076 283.481 L 146.527 284.226 L 147.03 284.333 L 149.232 284.333 L 149.046 283.907 L 149.683 282.735 L 150.637 282.549 L 151.274 283.241 L 151.512 282.895 L 152.785 282.549 L 154.509 282.815 L 155.04 281.43 L 155.809 281.483 L 156.631 281.217 L 157.559 279.858 L 157.188 279.351 L 156.074 279.111 L 155.225 279.191 L 154.828 279.031 L 156.074 277.697 L 156.26 276.629 L 155.835 276.362 L 156.021 275.348 L 157.4 274.76 L 158.09 273.263 L 159.018 273.317 L 159.495 273.691 L 160.264 273.504 L 160.768 274.039 L 161.696 274.172 L 161.75 274.733 L 163.023 275.428 L 163.871 275.374 L 163.845 274.974 L 164.693 274.68 L 165.356 272.755 L 165.303 272.221 L 166.948 271.338 L 168.274 271.445 L 168.592 271.311 L 170.157 271.926 L 170.82 270.803 L 171.483 270.963 L 171.934 270.535 L 172.597 270.348 L 172.57 269.143 L 173.631 269.25 L 173.896 269.786 L 174.851 269.491 L 174.877 269.893 L 176.044 269.304 L 177.185 269.009 L 177.503 267.991 L 177.901 267.67 L 179.784 267.83 L 180.182 267.134 L 180.473 267.884 L 180.367 268.527 L 180.712 268.688 L 180.898 269.33 L 180.102 272.649 L 180.049 274.145 L 178.988 277.083 L 177.927 278.417 L 176.601 280.524 L 176.336 280.551 L 176.336 280.604 L 176.309 280.791 L 176.283 281.297 L 175.991 281.137 L 175.991 281.217 L 175.593 281.403 L 175.593 281.51 L 175.514 281.563 L 175.514 281.59 L 175.487 281.59 L 175.487 281.563 L 175.487 281.403 L 175.275 281.164 L 175.328 281.057 L 175.355 281.057 L 175.487 281.084 L 175.567 281.03 L 175.62 280.977 L 175.196 280.95 L 175.169 280.897 L 175.063 280.764 L 175.09 280.684 L 174.665 280.791 L 174.665 280.844 L 174.718 281.03 L 174.957 281.004 L 175.01 281.004 L 175.036 281.004 L 175.143 281.03 L 175.116 281.11 L 175.169 281.19 L 174.957 281.297 L 174.957 281.323 L 175.09 281.457 L 175.143 281.51 L 175.116 281.43 L 175.116 281.377 L 175.09 281.83 L 175.169 281.67 L 174.983 281.697 L 175.01 281.75 L 174.983 281.776 L 174.983 281.83 L 174.904 281.91 L 174.957 281.91 L 174.983 281.91 L 174.983 281.883 L 175.116 281.883 L 175.09 282.043 L 175.328 282.096 L 175.408 282.256 L 175.646 282.016 L 175.673 282.096 L 175.593 282.229 L 175.62 282.309 L 175.673 282.336 L 175.699 282.336 L 175.753 282.229 L 175.753 282.176 L 175.885 282.176 L 175.965 282.229 Z M 174.373 281.936 L 174.4 281.883 L 174.135 282.149 L 174.214 282.123 L 174.294 282.123 L 174.294 282.096 L 174.373 282.069 L 174.533 282.229 L 174.612 282.203 L 174.639 282.176 L 174.692 282.123 L 174.559 281.936 L 174.453 281.883 L 174.426 281.936 Z M 174.347 280.631 L 174.373 280.711 L 174.294 280.817 L 174.294 280.844 L 174.267 281.164 L 174.373 281.19 L 174.373 281.297 L 174.373 281.35 L 174.294 281.377 L 174.294 281.43 L 174.294 281.563 L 174.347 281.75 L 174.4 281.776 L 174.48 281.776 L 174.48 281.723 L 174.506 281.697 L 174.612 281.723 L 174.692 281.643 L 174.745 281.643 L 174.771 281.643 L 174.506 281.377 L 174.533 281.323 L 174.559 281.297 L 174.559 281.244 L 174.506 280.897 L 174.559 280.844 L 174.586 280.711 L 174.612 280.684 Z M 174.904 281.19 L 174.665 281.217 L 174.665 281.27 L 174.612 281.297 L 174.692 281.323 L 174.877 281.297 Z M 174.745 282.522 L 174.48 282.442 L 174.533 282.522 Z M 174.798 282.629 L 174.904 282.549 L 174.798 282.522 L 174.798 282.602 Z"
// //         fill="#FF5733"
// //         stroke="#000"
// //         strokeWidth="0.5"
// //         transform="scale(1.5)"
// //       />
// //     </svg>
// //   );
// // };

// // export default IndiaMap;



// // import React, { useState } from 'react';
// // import {
// //   LayersControl,
// //   MapContainer,
// //   TileLayer,
// //   Marker,
// //   Popup,
// //   useMapEvents
// // } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import { Box, TextField, Autocomplete } from '@mui/material';
// // import { OpenStreetMapProvider } from 'leaflet-geosearch';

// // const { BaseLayer } = LayersControl;
// // const provider = new OpenStreetMapProvider();

// // function LocationMarker() {
// //   const [position, setPosition] = useState<L.LatLng | null>(null);
// //   const map = useMapEvents({
// //     locationfound(e) {
// //       setPosition(e.latlng);
// //       map.flyTo(e.latlng, map.getZoom());
// //     }
// //   });

// //   return position ? (
// //     <Marker position={position}>
// //       <Popup>Your Location</Popup>
// //     </Marker>
// //   ) : null;
// // }

// // const IndiaMap: React.FC = () => {
// //   const [map, setMap] = useState<L.Map | null>(null);
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [selectedLocation, setSelectedLocation] = useState(null);

// //   const handleSearch = async (query: string) => {
// //     if (query.length > 2) {
// //       const results = await provider.search({ query });
// //       setSearchResults(results);
// //     }
// //   };

// //   const handleLocationSelect = (location: any) => {
// //     if (location && map) {
// //       setSelectedLocation(location);
// //       map.flyTo([location.y, location.x], 15);
// //     }
// //   };

// //   return (
// //     <Box sx={{ position: 'relative', height: '100%' }}>
// //       <Autocomplete
// //         options={searchResults}
// //         getOptionLabel={(option: any) => option.label}
// //         onChange={(_, value) => handleLocationSelect(value)}
// //         onInputChange={(_, value) => handleSearch(value)}
// //         renderInput={(params) => (
// //           <TextField
// //             {...params}
// //             label="Search location"
// //             variant="outlined"
// //             sx={{
// //               position: 'absolute',
// //               top: 10,
// //               left: '50%',
// //               transform: 'translateX(-50%)',
// //               width: '80%',
// //               maxWidth: 500,
// //               zIndex: 1000,
// //               backgroundColor: 'white',
// //               borderRadius: 1
// //             }}
// //           />
// //         )}
// //       />
// //       <MapContainer
// //         center={[11.1271, 78.6569]}
// //         zoom={7}
// //         style={{ height: '100%', width: '100%' }}
// //         whenCreated={setMap}
// //       >
// //         <LayersControl position="topleft">
// //           <BaseLayer checked name="OpenStreetMap">
// //             <TileLayer
// //               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //               maxZoom={19}
// //             />
// //           </BaseLayer>
// //           <BaseLayer name="Satellite">
// //             <TileLayer
// //               url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
// //               maxZoom={19}
// //             />
// //           </BaseLayer>
// //           <BaseLayer name="Terrain">
// //             <TileLayer
// //               url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
// //               maxZoom={17}
// //             />
// //           </BaseLayer>
// //         </LayersControl>
// //         <LocationMarker />
// //         {selectedLocation && (
// //           <Marker position={[selectedLocation.y, selectedLocation.x]}>
// //             <Popup>{selectedLocation.label}</Popup>
// //           </Marker>
// //         )}
// //       </MapContainer>
// //     </Box>
// //   );
// // };

// // export default IndiaMap;
// //--FINAL--
// // import React, { useEffect, useState, useCallback } from 'react';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import { Box, TextField, Autocomplete, CircularProgress, debounce } from '@mui/material';
// // // import debounce from 'lodash.debounce';

// // interface SearchResult {
// //   display_name: string;
// //   lat: string;
// //   lon: string;
// //   boundingbox: string[];
// // }

// // const IndiaMap: React.FC = () => {
// //   const [map, setMap] = useState<L.Map | null>(null);
// //   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
// //   const [marker, setMarker] = useState<L.Marker | null>(null);
// //   const [polygon, setPolygon] = useState<L.Circle | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const mapInstance = L.map('map').setView([11.1271, 78.6569], 7);

// //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //       maxZoom: 19,
// //       attribution: ''
// //     }).addTo(mapInstance);

// //     setMap(mapInstance);

// //     return () => {
// //       mapInstance.remove();
// //     };
// //   }, []);

  
// //   const fetchSearchResults = async (query: string) => {
// //     if (query.length < 3) return;

// //     setLoading(true);
// //     try {
// //       const response = await fetch(
// //         `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in&addressdetails=1&polygon_geojson=1`
// //       );
// //       const data = await response.json();
// //       setSearchResults(data);
// //     } catch (error) {
// //       console.log('Search error:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 300), []);

// //   const handleSearch = (query: string) => {
// //     debouncedFetchSearchResults(query);
// //   };

// //   const handleLocationSelect = (location: SearchResult | null) => {
// //     if (!location || !map) return;

// //     // Clear previous markers and polygons
// //     if (marker) marker.remove();
// //     if (polygon) polygon.remove();

// //     const { lat, lon, boundingbox } = location;
// //     const latLng = L.latLng(parseFloat(lat), parseFloat(lon));

// //     // Add marker
// //     const newMarker = L.marker(latLng).addTo(map);
// //     setMarker(newMarker);

// //     // Create highlight rectangle
// //     const bounds = L.latLngBounds([
// //       [parseFloat(boundingbox[0]), parseFloat(boundingbox[2])],
// //       [parseFloat(boundingbox[1]), parseFloat(boundingbox[3])]
// //     ]);
// //     const newCircle = L.circle(latLng, {
// //       color: '#ff7800',
// //       weight: 1,
// //       fillOpacity: 0.2,
// //       radius: 25 // radius in meters, adjust as needed
// //     }).addTo(map);
    
// //     setPolygon(newCircle);
    

// //     // Fit map to bounds
// //     map.fitBounds(bounds);
// //   };

// //   return (
// //     <Box sx={{ position: 'relative', height: '100%' }}>
// //       <Autocomplete
// //         options={searchResults}
// //         getOptionLabel={(option) => option.display_name}
// //         onInputChange={(_, value) => handleSearch(value)}
// //         onChange={(_, value) => handleLocationSelect(value)}
// //         renderInput={(params) => (
// //           <TextField
// //             {...params}
// //             label="Search location"
// //             variant="outlined"
// //             sx={{
// //               position: 'absolute',
// //               top: 10,
// //               left: '50%',
// //               transform: 'translateX(-50%)',
// //               width: '80%',
// //               maxWidth: 500,
// //               zIndex: 1000,
// //               backgroundColor: 'white',
// //               borderRadius: 1
// //             }}
// //             InputProps={{
// //               ...params.InputProps,
// //               endAdornment: (
// //                 <>
// //                   {loading ? <CircularProgress color="inherit" size={20} /> : null}
// //                   {params.InputProps.endAdornment}
// //                 </>
// //               ),
// //             }}
// //           />
// //         )}
// //       />
// //       <div
// //         id="map"
// //         style={{
// //           height: '88%',
// //           width: '100%',
// //           position: 'absolute',
// //           top: 70,
// //           bottom: 100
// //         }}
// //       />
// //     </Box>
// //   );
// // };

// // export default IndiaMap;

// import { Box } from "@mui/material";
// import { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import CustomSelect from "../../common/CustomSelect";
// import CustomButton from "../../common/CustomButton";
// import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { Map as LeafletMap } from 'leaflet';
// import { RootState, useAppDispatch } from '../../../service/store/store';
// import { fetchLocationDataThunk } from '../../../redux/Thunks/mapThunks';
// import { setSelectedState, setSelectedDistrict, setSelectedCategory } from '../../../redux/Slice/mapSlice';

// const IndiaMap = () => {
//   // const dispatch = useDispatch();
//   const dispatch = useAppDispatch();

//   const mapRef = useRef<LeafletMap>(null);
  
//   const { 
//     filteredMarkers, 
//     loading, 
//     selectedState, 
//     selectedDistrict, 
//     selectedCategory 
//   } = useSelector((state: RootState) => state.map);

//   const handleFilter = async () => {
//     await dispatch(fetchLocationDataThunk({ 
//       category: selectedCategory, 
//       district: selectedDistrict 
//     }));
    
//     if (mapRef.current && filteredMarkers.length > 0) {
//       const bounds = L.latLngBounds(
//         filteredMarkers.map(marker => [marker.latitude, marker.longitude])
//       );
//       mapRef.current.fitBounds(bounds, { padding: [50, 50] });
//     }
//   };

//   const categoryOptions = [
//     "Bakery and Baked Goods Store",
//     "Cafeteria",
//     "Catering and Other Food Services",
//     "Coffee Shop",
//     "Coffee-Tea",
//     "Consumer Goods",
//     "Convenience Store",
//     "Dairy Goods",
//     "Department Store",
//     "Drugstore",
//     "Drugstore or Pharmacy",
//     "Food Market-Stall",
//     "Food-Beverage Specialty Store",
//     "Grocery",
//     "Home Specialty Store",
//     "Pharmacy",
//     "Restaurant",
//     "Specialty Food Store",
//     "Specialty Store",
//     "Sweet Shop",
//     "Tea House",
//     "Variety Store",
//   ];

//   const districtOptions = [
//     "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
//     "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
//     "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur",
//     "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi",
//     "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur",
//     "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram",
//     "Virudhunagar", "Mayiladuthurai"
//   ];

//   return (
//     <Box sx={{ height: "80%", width: "100%" }}>
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1, gap: "10px" }}>
//         <CustomSelect
//           label="State"
//           placeholder="Select State"
//           options={["TAMIL NADU", "KARNATAKA"]}
//           value={selectedState}
//           onChange={(value) => dispatch(setSelectedState(value))}
//           sx={{ marginTop: "4px", height: "39px" }}
//         />
//         <CustomSelect
//           label="District"
//           placeholder="Select District"
//           options={districtOptions}
//           value={selectedDistrict}
//           onChange={(value) => dispatch(setSelectedDistrict(value))}
//           sx={{ marginTop: "4px", height: "39px" }}
//         />
//         <CustomSelect
//           label="Category"
//           placeholder="Select Category"
//           options={categoryOptions}
//           value={selectedCategory}
//           onChange={(value) => dispatch(setSelectedCategory(value))}
//           sx={{ marginTop: "4px", height: "39px" }}
//         />
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//         <CustomButton buttonText="Filter" onClick={handleFilter} disabled={loading} />
//       </Box>

//       <Box sx={{ height: "700px", width: "100%", mt: 2 }}>
//         <MapContainer
//           ref={mapRef}
//           center={filteredMarkers.length > 0 ? [filteredMarkers[0].latitude, filteredMarkers[0].longitude] : [20.5937, 78.9629]}
//           zoom={filteredMarkers.length > 0 ? 12 : 8}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='<a href="https://www.openstreetmap.org/copyright">'
//           />

//           {filteredMarkers.map((outlet) => (
//             outlet.latitude && outlet.longitude ? (
//               <Marker
//                 key={outlet.pid}
//                 position={[outlet.latitude, outlet.longitude]}
//               >
//                 <Popup>
//                   <strong>{outlet.outletName}</strong>
//                   <br />
//                   Overall Score: {outlet.overallScore}
//                   <br />
//                   Reality Score: {outlet.realityScore}
//                 </Popup>
//                 <Tooltip direction="top" offset={[-8, -15]}>
//                   <div>
//                     <strong>Outlet Name:</strong> {outlet.outletName || "N/A"}
//                     <br />
//                     <strong>Overall Score:</strong> {outlet.overallScore || "N/A"}
//                     <br />
//                     <strong>PID:</strong> {outlet.pid || "N/A"}
//                     <br />
//                     <strong>RealityScore:</strong> {outlet.realityScore || "N/A"}
//                     <br />
//                     <strong>CensusCode:</strong> {outlet.censusCode || "N/A"}
//                   </div>
//                 </Tooltip>
//               </Marker>
//             ) : null
//           ))}
//         </MapContainer>
//       </Box>
//     </Box>
//   );
// };

// export default IndiaMap;
import { Box } from "@mui/material";
import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { useSelector } from 'react-redux';
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import { Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L, { Map as LeafletMap } from "leaflet"; // Import LeafletMap type
import "leaflet.markercluster"; // Import marker cluster
import { RootState, useAppDispatch } from '../../../store/store';
import { fetchLocationDataThunk } from '../../../redux/Thunks/mapThunks';
// import { LayersControl } from 'react-leaflet';
import { setSelectedState, setSelectedDistrict, setSelectedCategory, setFilteredMarkers } from '../../../redux/Slice/mapSlice';
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster"; // Import MarkerClusterGroup
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
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
 
// Define the structure of the API response
interface FetchLocationDataResponse {
  results: { outletDetails: Outlet[] }[];
}
const IndiaMap = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<LeafletMap | null>(null);
  const [debouncedTimer, setDebouncedTimer] = useState<NodeJS.Timeout | null>(null);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
 
  const { filteredMarkers, loading, selectedState, selectedDistrict, selectedCategory } = useSelector((state: RootState) => state.map);
 
  // const handleFilter = useCallback(async () => {
  //   const result = await dispatch(fetchLocationDataThunk({ category: selectedCategory, district: selectedDistrict, page, limit: 100 }));
  //   const payload = result.payload as FetchLocationDataResponse; // Type assertion
 
  //   if (payload.results.flatMap(result => result.outletDetails).length < 100) {
  //     setHasMore(false);
  //   }
 
  //   if (mapRef.current && filteredMarkers.length > 0) {
  //     const bounds = L.latLngBounds(filteredMarkers.map(marker => [marker.latitude, marker.longitude]));
  //     mapRef.current.fitBounds(bounds, { padding: [50, 50] });
  //   }
  // }, [dispatch, selectedCategory, selectedDistrict, filteredMarkers, page]);
 
  // const loadMoreData = () => {
  //   if (hasMore && !loading) {
  //     setPage((prevPage: number) => prevPage + 1);
  //   }
  // };
 
  // useEffect(() => {
  //   handleFilter();
  // }, [page]);
 
 
const handleFilter = useCallback(async () => {
  if (debouncedTimer) {
    clearTimeout(debouncedTimer);
  }
 
  setCategoryLoading(true);
 
  const timer = setTimeout(async () => {
    try {
      const CHUNK_SIZE = 1000000;
      let currentPage = 1;
      const allMarkers: Outlet[] = [];
     
      const fetchChunk = async () => {
        const result = await dispatch(fetchLocationDataThunk({
          category: selectedCategory === "All" ? "" : selectedCategory,
          district: selectedDistrict,
          page: currentPage,
          limit: CHUNK_SIZE
        }));
       
        const payload = result.payload as FetchLocationDataResponse;
        const newMarkers = payload.results.flatMap(result => result.outletDetails);
       
        // Use batch updates for better performance
        if (currentPage === 1) {
          dispatch(setFilteredMarkers(newMarkers));
        } else {
          dispatch(setFilteredMarkers(prev => [...prev, ...newMarkers]));
        }
       
        if (newMarkers.length === CHUNK_SIZE && currentPage < 3) {
          currentPage++;
          await fetchChunk();
        }
      };
 
      await fetchChunk();
    } finally {
      setCategoryLoading(false);
    }
  }, 300);
 
  setDebouncedTimer(timer);
}, [dispatch, selectedCategory, selectedDistrict]);
 
  const categoryOptions = [
    "All",
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
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
    "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur",
    "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi",
    "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur",
    "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram",
    "Virudhunagar", "Mayiladuthurai"
  ];
 
  const markers = useMemo(() => {
    return filteredMarkers
      .filter(outlet => outlet.latitude && outlet.longitude)
      .map((outlet) => (
        <Marker
          key={outlet.pid}
          position={[outlet.latitude, outlet.longitude]}
        >
          <Popup>
            <strong>{outlet.outletName}</strong>
            <br />
            Overall Score: {outlet.overallScore}
            <br />
            Reality Score: {outlet.realityScore}
          </Popup>
          <Tooltip direction="top" offset={[-8, -15]}>
            <div>
              <strong>Outlet Name:</strong> {outlet.outletName || "N/A"}
              <br />
              <strong>Overall Score:</strong> {outlet.overallScore || "N/A"}
              <br />
              <strong>PID:</strong> {outlet.pid || "N/A"}
              <br />
              <strong>RealityScore:</strong> {outlet.realityScore || "N/A"}
              <br />
              <strong>CensusCode:</strong> {outlet.censusCode || "N/A"}
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
    maxBounds: L.latLngBounds(
      L.latLng(8.4, 76.0), // Southwest
      L.latLng(13.5, 80.5) // Northeast
    ),
    zoomControl: false,
    attributionControl: false,
  };
 
  useEffect(() => {
    if (mapRef.current && filteredMarkers.length > 0) {
      const bounds = L.latLngBounds(
        filteredMarkers
          .filter(marker => marker.latitude && marker.longitude)
          .map(marker => [marker.latitude, marker.longitude])
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [filteredMarkers]);
  const createClusterCustomIcon = function (cluster: any) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-cluster-custom',
      iconSize: L.point(40, 40, true),
    });
  };
 
  const markerClusterOptions = {
    chunkedLoading: true,
    chunkInterval: 100,
    chunkDelay: 50,
    maxClusterRadius: 100,
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 16,
    removeOutsideVisibleBounds: true,
    animate: false
  };
  return (
    <Box sx={{ height: "80%", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1, gap: "10px" }}>
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
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <CustomButton
      buttonText={
        !selectedCategory || !selectedDistrict
          ? "Please select category and district"
          : categoryLoading
            ? "Loading..."
            : "Filter"
      }
      onClick={handleFilter}
      disabled={loading || categoryLoading || !isValid}
      sx={{
        backgroundColor: !isValid ? '#f5f5f5' : undefined,
        '&:hover': {
          backgroundColor: !isValid ? '#f5f5f5' : undefined
        }
      }}
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
                subdomains={['a', 'b', 'c']}
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
         
  <MarkerClusterGroup
    {...markerClusterOptions}
    key={filteredMarkers.length} // Force re-render on data change
    chunkedLoading={true}
    removeOutsideVisibleBounds={true}
  >
    {markers}
  </MarkerClusterGroup>
</MapContainer>
        {/* {hasMore && (
          <CustomButton buttonText="Load More" onClick={loadMoreData} disabled={loading} />
        )} */}
      </Box>
    </Box>
  );
};
 
export default IndiaMap;  // final 
 