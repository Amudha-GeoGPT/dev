import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useCallback, useEffect, useState } from "react";
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
  const [zoomLevel, setZoomLevel] = useState<number>(13);

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

  const createCustomIcon = useCallback(
    (wardName: string) => {
      const fontSize = 6 + zoomLevel * 0.2;
      const wardIndex = wardName.indexOf("WARD");
      let formattedWardName;

      if (wardIndex !== -1) {
        const firstLine = wardName.slice(0, wardIndex).trim();
        const secondLine = wardName.slice(wardIndex).trim();

        formattedWardName = `
          <div style="font-size: ${fontSize}px; color: black; text-align: center; white-space: nowrap;">
           ${firstLine}<br />${secondLine}
          </div>
        `;
      } else {
        formattedWardName = `
          <div style="font-size: ${fontSize}px; color: black; text-align: center; white-space: nowrap;">
           ${wardName}
          </div>
        `;
      }

      return L.divIcon({
        className: "custom-icon",
        html: formattedWardName,
      });
    },
    [zoomLevel]
  );

  const ZoomHandler: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      const handleZoom = () => {
        setZoomLevel(map.getZoom());
      };
      map.on("zoomend", handleZoom);
      return () => {
        map.off("zoomend", handleZoom);
      };
    }, [map]);
    return null;
  };
  const mapContainerStyles: React.CSSProperties = {
    width: isFullScreen ? "100%" : "47%",
    height: isFullScreen ? "100vh" : "96%",
    position: isFullScreen ? "fixed" : "absolute",
    top: isFullScreen ? 0 : "auto",
    left: isFullScreen ? 0 : "auto",
    zIndex: isFullScreen ? 9999 : "auto",
    transition: "all 0.3s ease",
    background: "white",
  };

  const handleMapToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div style={mapContainerStyles}>
      <MapContainer
        center={[13.0843, 80.2705]}
        zoom={13}
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        <ZoomHandler />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {wardData.map((ward) => {
          if (ward.coordinates && ward.coordinates.length > 0) {
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
          } else {
            console.warn(`Ward ${ward.ward_no} has invalid coordinates`);
            return null;
          }
        })}
      </MapContainer>
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 44,
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
            position: "absolute",
          }}
        />
      </div>
    </div>
  );
};

export default NewTamilNaduMap;
