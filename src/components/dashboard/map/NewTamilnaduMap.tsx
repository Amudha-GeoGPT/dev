/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  useMap,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
interface WardData {
  ward_name: string;
  coordinates: number[][];
  color_code: string;
  fillColor: string;
  ward_no: string;
}
interface LatLongPoint {
  latitude: number;
  longitude: number;
  pid: any;
  outletName: any;
  distributorCode: any;
  distributorName: any;
  color:any;
  fillColor:any;
}
interface Coordinate {
  lat: number;
  lng: number;
}
interface SimplifiedWardData {
  color_code: string;
  ward_no: string;
  boundaries: number[][];
}
interface NewTamilNaduMapProps {
  wardData: WardData[];
  latLongPoints: LatLongPoint[];
  simplifiedWardData: SimplifiedWardData[];
}
const NewTamilNaduMap: React.FC<NewTamilNaduMapProps> = ({
  wardData,
  latLongPoints,
  simplifiedWardData,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(13);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const calculateCentroid = (coords: any[]): [number, number] => {
    if (!Array.isArray(coords) || coords.length === 0) {
      return [13.0843, 80.2705];
    }
    if (typeof coords[0] === "object" && "latitude" in coords[0]) {
      let latSum = 0,
        lngSum = 0;
      coords.forEach((point) => {
        latSum += point.latitude;
        lngSum += point.longitude;
      });
      return [latSum / coords.length, lngSum / coords.length];
    }
    if (Array.isArray(coords[0])) {
      let latSum = 0,
        lngSum = 0;
      coords.forEach(([lat, lng]) => {
        latSum += lat;
        lngSum += lng;
      });
      return [latSum / coords.length, lngSum / coords.length];
    }
    return [13.0843, 80.2705];
  };
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
  const ZoomHandler: React.FC = () => {
    const map = useMap();
    return null;
  };
  useEffect(() => {
    console.log("Map data updated:", {
      wardData: wardData.length,
      latLongPoints: latLongPoints.length,
      simplifiedWardData: simplifiedWardData.length,
    });
  }, [wardData, latLongPoints, simplifiedWardData]);
  const resetKey = `${JSON.stringify(wardData)}-${JSON.stringify(
    latLongPoints
  )}`;
  console.log("Ward Name:", simplifiedWardData);
  console.log("CK outlet r universal lat long ", latLongPoints);

  const MapContent: React.FC = () => (
    <MapContainer
      // key={resetKey} // Force re-render on state change
      center={[13.0843, 80.2705]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <ZoomHandler />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {wardData.map((ward) => {
        const coordinates = Array.isArray(ward.coordinates)
          ? ward.coordinates
          : [];
        const centroid = calculateCentroid(coordinates);
        return (
          <React.Fragment key={ward.ward_no}>
            {coordinates.length > 0 && (
              <Polygon
                positions={coordinates as L.LatLngExpression[]}
                color={ward.color_code}
                fillColor={ward.fillColor}
                fillOpacity={0.5}
              />
            )}
            <Marker position={centroid} icon={createCustomIcon(ward.ward_no)} />
          </React.Fragment>
        );
      })}
      {simplifiedWardData.map((ward) => {
        const { boundaries, ward_no, color_code } = ward;
        if (
          !Array.isArray(boundaries) ||
          boundaries.length === 0 ||
          !boundaries.every(
            (coord) => Array.isArray(coord) && coord.length === 2
          )
        ) {
          console.warn(`Invalid boundaries for ward: ${ward_no}`);
          return null;
        }
        const centroid = calculateCentroid(boundaries);
        return (
          <React.Fragment key={ward_no}>
            <Polygon
              positions={boundaries as L.LatLngExpression[]}
              color={color_code}
              fillColor={color_code}
              fillOpacity={0.5}
            />
            <Marker position={centroid} icon={createCustomIcon(ward_no)} />
          </React.Fragment>
        );
      })}
      {latLongPoints.map((point, index) => (
        <CircleMarker
          key={`circle-${index}`}
          center={[point.latitude, point.longitude]}
          radius={4} // Adjust the size of the circle
          pathOptions={{
            color: point.color, 
            fillColor: point.fillColor, 
            fillOpacity: 0.8, 
          }}
        >
          <Popup>
            <Box>
              <Typography
                sx={{
                  fontSize: "10px",
                  lineHeight: "0.5",
                }}
              >
                Outlet Name: {point.outletName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  lineHeight: "0.5",
                }}
              >
                Distributor Name:{" "}
                {point.distributorName ? point.distributorName : "not found"}
              </Typography>
            </Box>
          </Popup>
        </CircleMarker>
      ))}

      {simplifiedWardData.map((ward) => (
        <React.Fragment key={ward.ward_no}>
          <Polygon
            positions={ward.boundaries as L.LatLngExpression[]}
            color={ward.color_code}
            fillColor={ward.color_code}
            fillOpacity={0.3}
          />
        </React.Fragment>
      ))}
    </MapContainer>
  );
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "500px",
          width: "100%",
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1000,
            backgroundColor: "white",
          }}
          onClick={() => setIsFullScreen(true)}
        >
          <OpenInFullIcon />
        </IconButton>
        {!isFullScreen && <MapContent />}
      </Box>

      <Modal
        open={isFullScreen}
        onClose={() => setIsFullScreen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            position: "relative",
            backgroundColor: "white",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1000,
              backgroundColor: "white",
            }}
            onClick={() => setIsFullScreen(false)}
          >
            <CloseFullscreenIcon />
          </IconButton>
          <MapContent />
        </Box>
      </Modal>
    </>
  );
};
export default NewTamilNaduMap;
