/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
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
  taluk_no: string;
  district_name: string;
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
  taluk_no: string;
  taluk_name: string;
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
  taluk_no: string;
  boundaries: number[][];
  district_name: any;
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
  const [districtName, setDistrictName] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (wardData?.[0]?.district_name) {
      setDistrictName(wardData[0].district_name);
    }
  }, [wardData]);

  const districtCenterMapping: Record<string, [number, number]> = {
    Chennai: [13.0843, 80.2705],
    Madurai: [9.9252, 78.1198],
    Coimbatore: [11.0168, 76.9558],
    Tirunelveli: [8.715, 77.7656],
    Salem: [11.6643, 78.146],
    Virudhunagar: [9.568, 77.9624],
    Dindigul: [10.3624, 77.9695],
    Karur: [10.9601, 78.0766],
    Erode: [11.341, 77.7172],
    Nagapattinam: [10.7672, 79.8449],
    Thiruchirappalli: [10.7905, 78.7047],
    Sivaganga: [9.848, 78.4832],
    Tamilnadu: [11.127, 78.6569],
    Thiruvarur: [10.7661, 79.6344],
    Cuddalore: [11.748, 79.7714],
    Viluppuram: [11.9401, 79.4861],
    Thanjavur: [10.7877, 79.1384],
    Kanniyakumari: [8.0844, 77.5495],
    Thiruvallur: [13.1227, 79.9118],
    Dharmapuri: [12.1211, 78.1582],
    Ramanathapuram: [9.3639, 78.8395],
    Ariyalur: [11.1404, 79.0745],
    Krishnagiri: [12.5266, 78.215],
    Kancheepuram: [12.8372, 79.7042],
    // The Nilgiris:[11.4916,76.7337],
    Tiruvannamalai: [12.2253, 79.0747],
    Pudukkottai: [10.3833, 78.8001],
    Vellore: [12.9236, 79.1331],
    Theni: [10.0079, 77.4735],
    Namakkal: [11.2194, 78.1678],
    Thoothukkudi: [8.7642, 78.1348],
    Perambalur: [11.2342, 78.8807],
  };
  const getDistrictCenter = (): [number, number] => {
    const district = districtName?.trim() || "Tamilnadu";
    console.log("District for Center", district);

    for (let key in districtCenterMapping) {
      if (key === district) {
        return districtCenterMapping[key];
      }
    }
    // alert(`No data found for district: ${district}.`);
    return districtCenterMapping["Tamilnadu"];
  };

  const calculateCentroid = (
    coords: any[],
    _district_name?: string
  ): [number, number] => {
    if (!Array.isArray(coords) || coords.length === 0) {
      return getDistrictCenter();
    }

    if (typeof coords[0] === "object" && "latitude" in coords[0]) {
      let latSum = 0,
        lngSum = 0;
      coords.forEach((point) => {
        latSum += point.latitude;
        lngSum += point.longitude;
      });
      return [latSum / coords.length, lngSum / coords.length] as [
        number,
        number
      ];
    }

    if (Array.isArray(coords[0])) {
      let latSum = 0,
        lngSum = 0;
      coords.forEach(([lat, lng]) => {
        latSum += lat;
        lngSum += lng;
      });
      return [latSum / coords.length, lngSum / coords.length] as [
        number,
        number
      ];
    }
    return getDistrictCenter();
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
    const districtCenter = getDistrictCenter();

    const mapCenter = selectedWard
      ? calculateCentroid(
          selectedWard.boundaries.map((coord) => [
            coord.latitude,
            coord.longitude,
          ]),
          selectedWard.district_name
        )
      : districtCenter;

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
          // <React.Fragment key={selectedWard.ward_no}>
          <React.Fragment key={selectedWard.ward_no || selectedWard.taluk_no}>
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
                  // icon={createCustomIcon(selectedWard.ward_no)}
                  icon={createCustomIcon(
                    selectedWard.ward_no || selectedWard.taluk_no
                  )}
                />
              </Polygon>
            )}
          </React.Fragment>
        ) : (
          wardData.map((ward) => {
            console.log("District Name:", ward.district_name);
            const coordinates = Array.isArray(ward.coordinates)
              ? ward.coordinates
              : [];
            const centroid = calculateCentroid(coordinates, ward.district_name);
            return (
              // <React.Fragment key={ward.ward_no}>
              <React.Fragment key={ward.ward_no || ward.taluk_no}>
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
                  // icon={createCustomIcon(ward.ward_no)}
                  icon={createCustomIcon(ward.ward_no || ward.taluk_no)}
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
