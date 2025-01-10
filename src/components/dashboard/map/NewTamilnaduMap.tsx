/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  
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

interface SetWardNoo {
  Universal_Outlet_Count: number;
  boundaries: Array<any>;
  ck_outlet_count: number;
  color_code: string;
  district_name: string;
  ward_no: string;
  fillColor: string;
  ward_name: string;
  population_count: number;
}

interface LatLongPoint {
  latitude: number;
  longitude: number;
  outletName: any;
  distributorCode: any;
  distributorName: any;
  color: any;
  fillColor: any;
  pid: any;
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
  setWardNoo: SetWardNoo[];
}

const NewTamilNaduMap: React.FC<NewTamilNaduMapProps> = ({
  wardData,
  latLongPoints,
  setWardNoo,
}) => {
  const [zoomLevel] = useState<number>(13);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const calculateCentroid = (coords: any[]): [number, number] => {
    if (!Array.isArray(coords) || coords.length === 0) {
        return [13.0843, 80.2705]; // Default coordinates as tuple
    }
    
    if (typeof coords[0] === "object" && "latitude" in coords[0]) {
        let latSum = 0, lngSum = 0;
        coords.forEach((point) => {
            latSum += point.latitude;
            lngSum += point.longitude;
        });
        return [latSum / coords.length, lngSum / coords.length] as [number, number];
    }
    
    if (Array.isArray(coords[0])) {
        let latSum = 0, lngSum = 0;
        coords.forEach(([lat, lng]) => {
            latSum += lat;
            lngSum += lng;
        });
        return [latSum / coords.length, lngSum / coords.length] as [number, number];
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

  const MapContent: React.FC = () => {
    const selectedWard = setWardNoo?.[0];
    const mapCenter = selectedWard
      ? calculateCentroid(
          selectedWard.boundaries.map((coord) => [
            coord.latitude,
            coord.longitude,
          ])
        )
      : [13.0843, 80.2705];
    const isValidBoundaries =
      Array.isArray(selectedWard?.boundaries) &&
      selectedWard.boundaries.length > 0;

    return (
      <MapContainer
        center={mapCenter as L.LatLngExpression}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {selectedWard ? (
          <React.Fragment key={selectedWard.ward_no}>
            {selectedWard && isValidBoundaries && (
              <Polygon
                positions={
                  selectedWard.boundaries.map((coord) => [
                    coord.latitude,
                    coord.longitude,
                  ]) as L.LatLngExpression[]
                }
                color={selectedWard.color_code}
                fillColor={selectedWard.color_code}
                fillOpacity={0.5}
                weight={2}
              >
                <Marker
    position={mapCenter as L.LatLngExpression}
    icon={createCustomIcon(selectedWard.ward_no)}
/>
              </Polygon>
            )}
          </React.Fragment>
        ) : (
          wardData.map((ward) => {
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
                <Marker
                  position={centroid}
                  icon={createCustomIcon(ward.ward_no)}
                />
              </React.Fragment>
            );
          })
        )}

        {latLongPoints.map((point, index) => (
          <CircleMarker
            key={`point-${index}`}
            center={[point.latitude, point.longitude]}
            radius={4}
            pathOptions={{
              color: point.color,
              fillColor: point.fillColor,
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <Typography variant="body2">
                Outlet Code: {point.pid || "No data"}
                <br />
                Outlet Name: {point.outletName}
                <br />
                Distributor Name: {point.distributorName || "No data"}
                <br />
                DistributorCode: {point.distributorCode || "No data"}
              </Typography>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    );
  };

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
