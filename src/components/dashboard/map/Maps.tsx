/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MapContainer, Marker, TileLayer, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const position: [number, number] = [11.1271, 78.6569]; // Tamil Nadu center coordinates

const icon = L.icon({
  iconUrl: "../../../assets/images/svg/live-location-placeholder-pin-red-23395.png",
  iconSize: [38, 38],
});

function ResetCenterView(props: { selectPosition: any }) {
  const { selectPosition } = props;
  const map = useMap();

  React.useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        { animate: true }
      );
    }
  }, [selectPosition]);

  return null;
}
interface Outlet {
    censusCode: string;
    latitude: number;
    longitude: number;
    outletName: string;
    overallScore: string;
    pid: string;
    realityScore: number;
  }
  
  interface MarkerData {
    id: number;
    position: [number, number];
    state: string;
    district: string;
    category: string;
    name: string;
    outlets: Outlet[];
  }

export default function SearchBox() {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [loading, setLoading] = useState(false);
  
  const categoryOptions = [
    "Bakery and Baked Goods Store", "Cafeteria", "Catering and Other Food Services",
    "Coffee Shop", "Coffee-Tea", "Consumer Goods", "Convenience Store", "Dairy Goods",
    "Department Store", "Drugstore", "Drugstore or Pharmacy", "Food Market-Stall",
    "Food-Beverage Specialty Store", "Grocery", "Home Specialty Store", "Pharmacy",
    "Restaurant", "Specialty Food Store", "Specialty Store", "Sweet Shop", "Tea House",
    "Variety Store"
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

  const fetchLocationData = async (category: string, district: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://geogptdev.ckdigital.in/api/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stateName: "TAMIL NADU",
          districtName: district,
          category: category
        })
      });
      
      const data = await response.json();
      
      if (data.outletDetails) {
        const formattedData: MarkerData = {
          id: 1,
          position: [13.0827, 80.2707],
          state: "TAMIL NADU",
          district: district,
          category: category,
          name: `${district} ${category} Stores`,
          outlets: data.outletDetails
        };
        
        setMarkers([formattedData]);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleCategoryChange = (event: any, value: string | null) => {
    if (value) {
      setSelectedCategory(value);
      if (selectedDistrict) {
        fetchLocationData(value, selectedDistrict);
      }
    }
  };

  const handleDistrictChange = (event: any, value: string | null) => {
    if (value) {
      setSelectedDistrict(value);
      if (selectedCategory) {
        fetchLocationData(selectedCategory, value);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
      <Box sx={{
        position: 'absolute',
        top: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: 800,
        zIndex: 1000,
        display: 'flex',
        gap: 2,
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 1
      }}>
        <Autocomplete
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
          renderInput={(params) => <TextField {...params} label="Select Category" variant="outlined" />}
          fullWidth
        />
        <Autocomplete
          options={districtOptions}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          renderInput={(params) => <TextField {...params} label="Select District" variant="outlined" />}
          fullWidth
        />
      </Box>

      <div style={{ flex: 1, width: "100%", position: "relative" }}>
        <MapContainer
          center={position}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {markers.map((marker) =>
            marker.outlets?.map((outlet) => (
              <Marker
                key={outlet.pid}
                position={[outlet.latitude, outlet.longitude]}
                icon={icon}
              >
                <Popup>
                  <div>
                    <b>{outlet.outletName}</b><br />
                    <span>Category: {marker.category}</span><br />
                    <span>District: {marker.district}</span><br />
                    <span>Score: {outlet.overallScore}</span><br />
                    <span>Census Code: {outlet.censusCode}</span><br />
                    <span>Reality Score: {outlet.realityScore}</span><br />
                    <span>PID: {outlet.pid}</span>
                  </div>
                </Popup>
              </Marker>
            ))
          )}
        </MapContainer>
      </div>
    </div>
  );
}