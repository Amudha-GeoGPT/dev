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
import { Box, IconButton, Modal } from "@mui/material";
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

  const calculateCentroid = (coords: number[][]): [number, number] => {
    if (
      !Array.isArray(coords) ||
      coords.length === 0 ||
      !coords.every(
        (coord) =>
          Array.isArray(coord) &&
          coord.length === 2 &&
          coord.every(Number.isFinite)
      )
    ) {
      console.warn("Invalid coordinates for centroid calculation:", coords);
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

  // useEffect(() => {
  //   console.log("Ward data or lat/long points changed, refreshing map.");
  // }, [wardData, latLongPoints]);
  const resetKey = `${JSON.stringify(wardData)}-${JSON.stringify(
    latLongPoints
  )}`;
  console.log("Ward Name:", simplifiedWardData);
  console.log("CK outlet r universal lat long ", latLongPoints);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: isFullScreen ? "100vh" : "500px",
          width: isFullScreen ? "100vw" : "100%",
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
          onClick={() => setIsFullScreen(!isFullScreen)}
        >
          {isFullScreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
        </IconButton>
        <MapContainer
          // key={resetKey} // Force re-render on state change
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

            if (
              !Array.isArray(coordinates) ||
              coordinates.length === 0 ||
              !coordinates.every(
                (coord) => Array.isArray(coord) && coord.length === 2
              )
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
            <>
              <Marker
                key={index}
                position={[point.latitude, point.longitude]}
              />
            </>
          ))}
        </MapContainer>
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
          {/* Close Button Inside Modal */}
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
          <MapContainer
            center={[13.0843, 80.2705]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {wardData.map((ward) => {
              const { coordinates, ward_no, color_code, fillColor } = ward;
              const centroid = calculateCentroid(coordinates);

              return (
                <React.Fragment key={ward_no}>
                  <Polygon
                    positions={coordinates as L.LatLngExpression[]}
                    color={color_code}
                    fillColor={fillColor}
                    fillOpacity={0.5}
                  />
                  <Marker
                    position={centroid}
                    icon={createCustomIcon(ward_no)}
                  />
                </React.Fragment>
              );
            })}
          </MapContainer>
        </Box>
      </Modal>
    </>
  );
};

export default NewTamilNaduMap;
