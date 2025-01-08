import React, { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface WardData {
  ward_name: string;
  coordinates: number[][]; // Array of [latitude, longitude] pairs
  color_code: string;
  fillColor: string;
  ward_no: string;
}

interface LatLongPoint {
  latitude: number;
  longitude: number;
}

interface NewTamilNaduMapProps {
  wardData: WardData[];
  latLongPoints?: LatLongPoint[];
}

const NewTamilNaduMap: React.FC<NewTamilNaduMapProps> = ({
  wardData,
  latLongPoints = [],
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(13);

  // Calculate the centroid of a polygon
  const calculateCentroid = (coords: number[][]): [number, number] => {
    if (!Array.isArray(coords) || coords.length === 0) {
      console.warn("Invalid coordinates for centroid calculation.");
      return [0, 0];
    }
    let latSum = 0,
      lngSum = 0;
    coords.forEach(([lat, lng]) => {
      latSum += lat;
      lngSum += lng;
    });
    return [latSum / coords.length, lngSum / coords.length];
  };

  // Create a custom icon for the marker
  const createCustomIcon = useCallback(
    (wardName: string) => {
      const fontSize = 6 + zoomLevel * 0.2;
      return L.divIcon({
        className: "custom-icon",
        html: `<div style="font-size: ${fontSize}px; color: black; text-align: center;">${wardName}</div>`,
      });
    },
    [zoomLevel]
  );

  // Zoom handler to track zoom level changes
  const ZoomHandler: React.FC = () => {
    const map = useMap();

   

    return null;
  };
  console.log("enga work agutha paru", latLongPoints);

  return (
    <MapContainer
      center={[13.0843, 80.2705]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <ZoomHandler />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      
      {wardData.map((ward) => {
        const { coordinates, ward_no, color_code, fillColor } = ward;

        // Validate coordinates
        if (
          !Array.isArray(coordinates) ||
          coordinates.length === 0 ||
          !coordinates.every((coord) => Array.isArray(coord) && coord.length === 2)
        ) {
          console.warn(`Invalid coordinates for ward: ${ward_no}`);
          return null;
        }

        const centroid = calculateCentroid(coordinates);

        return (
          <React.Fragment key={ward_no}>
            <Polygon
              positions={coordinates as L.LatLngExpression[]}
              color={color_code}
              fillColor={fillColor}
              fillOpacity={0.5}
            />
            <Marker position={centroid} icon={createCustomIcon(ward_no)} />
          </React.Fragment>
        );
      })}

      
      {latLongPoints.map((point, index) => (
        <Marker
          key={index}
          position={[point.latitude, point.longitude]}
        />
      ))}
    </MapContainer>
  );
};

export default NewTamilNaduMap;
