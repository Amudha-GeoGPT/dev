import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import DatamapsIndia from "react-datamaps-india";

type RegionName =
  | "Andaman & Nicobar Island"
  | "Andhra Pradesh"
  | "Arunachal Pradesh"
  | "Assam"
  | "Bihar"
  | "Chandigarh"
  | "Chhattisgarh"
  | "Delhi"
  | "Goa"
  | "Gujarat"
  | "Haryana"
  | "Himachal Pradesh"
  | "Jammu & Kashmir"
  | "Jharkhand"
  | "Karnataka"
  | "Kerala"
  | "Lakshadweep"
  | "Madhya Pradesh"
  | "Maharashtra"
  | "Manipur"
  | "Meghalaya"
  | "Mizoram"
  | "Nagaland"
  | "Odisha"
  | "Puducherry"
  | "Punjab"
  | "Rajasthan"
  | "Sikkim"
  | "Tamil Nadu"
  | "Telangana"
  | "Tripura"
  | "Uttar Pradesh"
  | "Uttarakhand"
  | "West Bengal";

const Mapcontroller = () => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionName | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? 200 : 190;

  useEffect(() => {
    const elementToHide = document.querySelector("#root-svg-group > g:nth-child(4)");
    if (elementToHide instanceof HTMLElement) {
      elementToHide.style.display = "none";
    }
  }, []);

  const regionColors = useMemo(() => ({
    "Andaman & Nicobar Island": "#FF5733",
    "Andhra Pradesh": "#33FF57",
    "Arunachal Pradesh": "#3357FF",
    "Assam": "#FF33A1",
    "Bihar": "#FF9933",
    "Chandigarh": "#33FFF5",
    "Chhattisgarh": "#F5FF33",
    "Delhi": "#F033FF",
    "Goa": "#FF33D4",
    "Gujarat": "#33FFB3",
    "Haryana": "#B3FF33",
    "Himachal Pradesh": "#33B3FF",
    "Jammu & Kashmir": "#FFD733",
    "Jharkhand": "#33D7FF",
    "Karnataka": "#FF7D33",
    "Kerala": "#FF33B3",
    "Lakshadweep": "#FFC733",
    "Madhya Pradesh": "#33FF8C",
    "Maharashtra": "#FF337D",
    "Manipur": "#B3FFDA",
    "Meghalaya": "#DA33FF",
    "Mizoram": "#FFC3FF",
    "Nagaland": "#C3FFC3",
    "Odisha": "#FFC3C3",
    "Puducherry": "#C3B3FF",
    "Punjab": "#FFB3C3",
    "Rajasthan": "#FFBF33",
    "Sikkim": "#B3C3FF",
    "Tamil Nadu": "#FF3366",
    "Telangana": "#33FF66",
    "Tripura": "#FF6633",
    "Uttar Pradesh": "#FF33CC",
    "Uttarakhand": "#D2FF33",
    "West Bengal": "#FF3380",
  }), []);

  const regionData = useMemo(() => {
    const data: Record<RegionName, { value: number; color: string }> = {
      "Andaman & Nicobar Island": { value: 150, color: regionColors["Andaman & Nicobar Island"] },
      "Andhra Pradesh": { value: 470, color: regionColors["Andhra Pradesh"] },
      "Arunachal Pradesh": { value: 248, color: regionColors["Arunachal Pradesh"] },
      "Assam": { value: 528, color: regionColors["Assam"] },
      "Bihar": { value: 755, color: regionColors["Bihar"] },
      "Chandigarh": { value: 95, color: regionColors["Chandigarh"] },
      "Chhattisgarh": { value: 1700, color: regionColors["Chhattisgarh"] },
      "Delhi": { value: 1823, color: regionColors["Delhi"] },
      "Goa": { value: 508, color: regionColors["Goa"] },
      "Gujarat": { value: 624, color: regionColors["Gujarat"] },
      "Haryana": { value: 1244, color: regionColors["Haryana"] },
      "Himachal Pradesh": { value: 640, color: regionColors["Himachal Pradesh"] },
      "Jammu & Kashmir": { value: 1000, color: regionColors["Jammu & Kashmir"] },
      "Jharkhand": { value: 814, color: regionColors["Jharkhand"] },
      "Karnataka": { value: 2482, color: regionColors["Karnataka"] },
      "Kerala": { value: 899, color: regionColors["Kerala"] },
      "Lakshadweep": { value: 15, color: regionColors["Lakshadweep"] },
      "Madhya Pradesh": { value: 1176, color: regionColors["Madhya Pradesh"] },
      "Maharashtra": { value: 727, color: regionColors["Maharashtra"] },
      "Manipur": { value: 314, color: regionColors["Manipur"] },
      "Meghalaya": { value: 273, color: regionColors["Meghalaya"] },
      "Mizoram": { value: 306, color: regionColors["Mizoram"] },
      "Nagaland": { value: 374, color: regionColors["Nagaland"] },
      "Odisha": { value: 395, color: regionColors["Odisha"] },
      "Puducherry": { value: 245, color: regionColors["Puducherry"] },
      "Punjab": { value: 786, color: regionColors["Punjab"] },
      "Rajasthan": { value: 1819, color: regionColors["Rajasthan"] },
      "Sikkim": { value: 152, color: regionColors["Sikkim"] },
      "Tamil Nadu": { value: 2296, color: regionColors["Tamil Nadu"] },
      "Telangana": { value: 467, color: regionColors["Telangana"] },
      "Tripura": { value: 194, color: regionColors["Tripura"] },
      "Uttar Pradesh": { value: 2944, color: regionColors["Uttar Pradesh"] },
      "Uttarakhand": { value: 1439, color: regionColors["Uttarakhand"] },
      "West Bengal": { value: 1321, color: regionColors["West Bengal"] },
    };
    return data;
  }, [regionColors]);

  const handleHover = (region: RegionName | null) => {
    setHoveredRegion(region);
  };
  type HoverComponentValue = { name: string; value: number };
  const handleLeave = () => {
    setHoveredRegion(null);
  };

  return (
    <Box
      alignItems="center"
      sx={{ flexGrow: 1, p: 2, overflow: "auto", ml: { sm: `${drawerWidth}px` }, marginTop: "60px" }}
    >
      <div style={{ position: "relative", width: "100%", height: "600px" }}>
        <DatamapsIndia
          regionData={regionData}
          fillColor={(geo: { properties: { name: string } }) => {
            const regionName = geo.properties.name as RegionName;
            return hoveredRegion === regionName ? "lightblue" : regionColors[regionName] || "#f5f5f5";
        }}

        hoverComponent={({ value }: { value: HoverComponentValue }) => (
            <div style={{ background: "white", border: "1px solid black", padding: "5px" }}>
                <div>
                    {value.name} {value.value} OCs
                </div>
            </div>
        )}

          onHover={handleHover}
          onLeave={handleLeave}
          mapLayout={{
            noDataColor: "#f5f5f5",
            borderColor: "#8D8D8D",
            hoverColor: "blue",
            hoverBorderColor: "green",
          }}
        />
      </div>
    </Box>
  );
};

export default Mapcontroller;
