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
      {latLongPoints.map((cord, i) => {
        console.table(cord);
        return (
          <Marker
            key={`MARKER_${i}`}
            position={[cord.latitude, cord.longitude]}
          />
        );
      })}
    </>
  );
};

export default Markers;
