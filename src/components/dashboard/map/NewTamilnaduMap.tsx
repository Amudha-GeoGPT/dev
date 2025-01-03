import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

interface WardData {
  ward_name: string;
  coordinates: number[][]; // Coordinates for the polygon
  color_code: string; 
  fillColor: string; 
}

interface NewTamilNaduMapProps {
  wardData: WardData[]; 
}

const NewTamilNaduMap: React.FC<NewTamilNaduMapProps> = ({ wardData }) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false); // Full-screen state

  const calculateCentroid = (coords: number[][]): [number, number] => {
    let x = 0,
      y = 0,
      n = coords.length;
    coords.forEach(([lat, lng]) => {
      x += lat;
      y += lng;
    });
    return [x / n, y / n];
  };

  const createCustomIcon = (wardName: string) =>
    L.divIcon({
      className: "custom-icon",
      html: `
      <div style="
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        color: black;
        background: white;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid gray;
        white-space: nowrap;
        text-align: center;
      ">
        ${wardName}
      </div>
    `,
    });
    const mapContainerStyles = {
      width: isFullScreen ? "100vw" : "100%", // Full width when in full-screen mode
      height: isFullScreen ? "100vh" : "400px", // Full height when in full-screen mode
      position: isFullScreen ? "fixed" : "relative", // Fixed position in full-screen mode
      top: isFullScreen ? 0 : "auto",
      left: isFullScreen ? 0 : "auto",
      zIndex: isFullScreen ? 9999 : "auto", // Bring to front in full-screen mode
      transition: "all 0.3s ease", // Smooth transition for toggling
    };
  
    // Toggle full-screen mode
    const handleMapToggle = () => {
      setIsFullScreen(!isFullScreen); // Toggle between full-screen and normal
    };
  return (
    <div style={mapContainerStyles}>
    <MapContainer
      center={[13.0843, 80.2705]} // Center of Tamil Nadu
      zoom={13} // Default zoom level
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {wardData.map((ward) => {
        const centroid = calculateCentroid(ward.coordinates); // Calculate centroid for marker position
        return (
          <React.Fragment key={ward.ward_name}>
            <Polygon
              positions={ward.coordinates}
              color={ward.color_code}
              fillColor={ward.fillColor}
              fillOpacity={0.5}
            />
            <Marker position={centroid} icon={createCustomIcon(ward.ward_name)} />
          </React.Fragment>
        );
      })}
    </MapContainer>
{/* Full-screen toggle button */}
<div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <OpenInFullIcon
          onClick={handleMapToggle}
          style={{
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            borderRadius: "50%",
            padding: "8px",
          }}
        />
      </div>
    </div>
  );
};

export default NewTamilNaduMap;
