import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import DatamapsIndia from "react-datamaps-india";

type RegionData = Record<RegionName, { value: number }>;
type RegionColors = Record<RegionName, string>;
type TooltipStyles = React.CSSProperties;
type OverallBoxStyles = React.CSSProperties;

interface IndiaMapProps {
  regionData: RegionData;
  regionColors: RegionColors;
  tooltipStyles: TooltipStyles;
  overallBoxStyles: OverallBoxStyles;
}
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

const IndiaMap = ({
  regionColors,
  regionData,
  tooltipStyles,
  overallBoxStyles
}: IndiaMapProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionName | null>(null);
  const [lastHoveredRegion, setLastHoveredRegion] = useState<RegionName | null>(
    null
  );

  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleHover = (region: RegionName | null, event: MouseEvent) => {
    if (region !== lastHoveredRegion) {
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setHoveredRegion(region);
      setLastHoveredRegion(region);
    }
  };

  const handleLeave = () => {
    setHoveredRegion(null);
  };
  useEffect(() => {
    const hideSpecificElements = () => {
      // Hide all text elements with specific styles
      const allTextElements = document.querySelectorAll("text");
      allTextElements.forEach((element) => {
        const textElement = element as SVGTextElement;
        const computedStyle = window.getComputedStyle(textElement);
        if (
          computedStyle.textAnchor === "middle" &&
          computedStyle.fontSize === "7px" &&
          computedStyle.fill === "rgb(51, 51, 51)"
        ) {
          textElement.style.display = "none";
        }
      });
  
      
      const specificGroupElement = document.querySelector("#root-svg-group > g:nth-child(4)");
      if (specificGroupElement) {
        (specificGroupElement as HTMLElement).style.display = "none";
      }
    };
  
    hideSpecificElements();
  }, []);
  
  return (
    <Box sx={overallBoxStyles}>
      <Box
        sx={{
          position: "relative",
          top: "-10px",
          width: "60vw",
        }}
      >
        <DatamapsIndia
          regionData={regionData}
          fillColor={(geo: { properties: { name: string } }) => {
            const regionName = geo.properties.name as RegionName;
            return hoveredRegion === regionName
              ? "lightblue"
              : regionColors[regionName] || "#f5f5f5";
          }}
          hoverComponent={({
            value,
          }: {
            value: { name: string; value: number };
          }) => (
            <Box sx={tooltipStyles}>
              {value.name}: {value.value}
            </Box>
          )}
          onHover={handleHover}
          onLeave={handleLeave}
          mapLayout={{
            startColor: "#00FF00",
            endColor: "#FF0000",
          }}
        />
      </Box>
    </Box>
  );
};

export default IndiaMap;
