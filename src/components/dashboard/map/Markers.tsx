/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Marker } from "react-leaflet";

interface LatLongPoint {
  latitude: number;
  longitude: number;
}

interface MarkersProps {
  latLongPoints: LatLongPoint[];
}

const Markers: React.FC<MarkersProps> = ({ latLongPoints }) => {
  return (
    <>
      {latLongPoints.map((point, index) => {
        return (
          <Marker
            key={`marker-${index}`}
            position={[point.latitude, point.longitude]}
          />
        );
      })}
    </>
  );
};

export default Markers;
