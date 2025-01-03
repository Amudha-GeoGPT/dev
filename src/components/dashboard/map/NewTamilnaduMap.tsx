import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

interface WardData {
  ward_name: string;
  coordinates: number[][];
  color_code: string;
  fillColor: string;
  ward_no: string;
}

interface NewTamilNaduMapProps {
  wardData: WardData[];
}

const NewTamilNaduMap: React.FC<NewTamilNaduMapProps> = ({ wardData }) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

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
        font-size: 10px;
        font-weight: normal;
        color: black;
        background: white;
        padding: 1px 2px;
         border-radius: 3px;
        border: 1px solid gray;
        white-space: nowrap;
        text-align: center;
      ">
        ${wardName}
      </div>
    `,
    });
  const mapContainerStyles: React.CSSProperties = {
    width: isFullScreen ? "100vw" : "100%",
    height: isFullScreen ? "100vh" : "400px",
    position: isFullScreen ? "fixed" : "relative",
    top: isFullScreen ? 0 : "auto",
    left: isFullScreen ? 0 : "auto",
    zIndex: isFullScreen ? 9999 : "auto",
    transition: "all 0.3s ease",
  };

  // Toggle full-screen mode
  const handleMapToggle = () => {
    setIsFullScreen(!isFullScreen);
  };
  return (
    <div style={mapContainerStyles}>
      <MapContainer
        center={[13.0843, 80.2705]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {wardData.map((ward) => {
          const centroid = calculateCentroid(ward.coordinates);
          return (
            <React.Fragment key={ward.ward_no}>
              <Polygon
                positions={ward.coordinates as L.LatLngExpression[]}
                color={ward.color_code}
                fillColor={ward.fillColor}
                fillOpacity={0.5}
              />
              <Marker
                position={centroid}
                icon={createCustomIcon(ward.ward_no)}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>
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
            padding: "12px",
            fontSize: "40px",
          }}
        />
      </div>
    </div>
  );
};

export default NewTamilNaduMap;
