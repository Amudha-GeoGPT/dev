import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const NewTamilNaduMap = () => {
  const ward1Coordinates = [
    [13.159819, 80.30416],
    [13.157562, 80.299955],
    [13.154721, 80.303562],
    [13.166756, 80.302704],
    [13.169681, 80.305881],
    [13.168762, 80.293083],
    [13.175698, 80.302273],
  ];

  const ward2Coordinates = [
    [13.121319, 80.087965],
    [13.110284, 80.083499],
    [13.109281, 80.097241],
    [13.122656, 80.083499],
    [13.110953, 80.062199],
  ];

  const ward3Coordinates = [
    [12.989992, 80.143397],
    [12.983524, 80.134695],
    [12.982186, 80.143971],
    [12.966796, 80.132291],
    [12.954082, 80.132634],
  ];

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

  const centroidWard1 = calculateCentroid(ward1Coordinates);
  const centroidWard2 = calculateCentroid(ward2Coordinates);
  const centroidWard3 = calculateCentroid(ward3Coordinates);

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

  return (
    <MapContainer
      center={[13.0223, 80.2291]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Polygon
        positions={ward1Coordinates}
        pathOptions={{
          color: "red",
          fillColor: "lightblue",
          fillOpacity: 0.5,
        }}
      />
      <Marker position={centroidWard1} icon={createCustomIcon("Ward 1")} />

      <Polygon
        positions={ward2Coordinates}
        pathOptions={{
          color: "green",
          fillColor: "lightgreen",
          fillOpacity: 0.5,
        }}
      />
      <Marker position={centroidWard2} icon={createCustomIcon("Ward 2")} />

      <Polygon
        positions={ward3Coordinates}
        pathOptions={{
          color: "blue",
          fillColor: "lightblue",
          fillOpacity: 0.5,
        }}
      />
      <Marker position={centroidWard3} icon={createCustomIcon("Ward 3")} />
    </MapContainer>
  );
};

export default NewTamilNaduMap;
