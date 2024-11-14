import { Box, useMediaQuery } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import DatamapsIndia from "react-datamaps-india";

type RegionName = "Andaman & Nicobar Island" | "Andhra Pradesh" | "Arunachal Pradesh" | "Assam" | "Bihar" | "Chandigarh" | "Chhattisgarh" | "Delhi" | "Goa" | "Gujarat" | "Haryana" | "Himachal Pradesh" | "Jammu & Kashmir" | "Jharkhand" | "Karnataka" | "Kerala" | "Lakshadweep" | "Madhya Pradesh" | "Maharashtra" | "Manipur" | "Meghalaya" | "Mizoram" | "Nagaland" | "Odisha" | "Puducherry" | "Punjab" | "Rajasthan" | "Sikkim" | "Tamil Nadu" | "Telangana" | "Tripura" | "Uttar Pradesh" | "Uttarakhand" | "West Bengal";

const IndiaMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionName | null>(null);
  const [lastHoveredRegion, setLastHoveredRegion] = useState<RegionName | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:1200px)');

  const boxStyles = {
    marginTop: isSmallScreen ? '-100px' : isMediumScreen ? '-130px' : '-150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: isSmallScreen ? '80vh' : '100vh',
    width: isSmallScreen ? '100%' : '100vw',
    overflow: 'hidden',
    marginLeft: isSmallScreen ? '-50px' : isMediumScreen ? '-100px' : '-200px',
    marginBottom: '10px',
  };

  const regionColors = useMemo(() => ({
    "Andaman & Nicobar Island": "#FF5733",
    "Andhra Pradesh": "#33FF57",
    "Arunachal Pradesh": "#3357FF",
    Assam: "#FF33A1",
    Bihar: "#FF9933",
    Chandigarh: "#33FFF5",
    Chhattisgarh: "#F5FF33",
    Delhi: "#F033FF",
    Goa: "#FF33D4",
    Gujarat: "#33FFB3",
    Haryana: "#B3FF33",
    "Himachal Pradesh": "#33B3FF",
    "Jammu & Kashmir": "#FFD733",
    Jharkhand: "#33D7FF",
    Karnataka: "#FF7D33",
    Kerala: "#FF33B3",
    Lakshadweep: "#FFC733",
    "Madhya Pradesh": "#33FF8C",
    Maharashtra: "#FF337D",
    Manipur: "#B3FFDA",
    Meghalaya: "#DA33FF",
    Mizoram: "#FFC3FF",
    Nagaland: "#C3FFC3",
    Odisha: "#FFC3C3",
    Puducherry: "#C3B3FF",
    Punjab: "#FFB3C3",
    Rajasthan: "#FFBF33",
    Sikkim: "#B3C3FF",
    "Tamil Nadu": "#FF3366",
    Telangana: "#33FF66",
    Tripura: "#FF6633",
    "Uttar Pradesh": "#FF33CC",
    Uttarakhand: "#D2FF33",
    "West Bengal": "#FF3380",
  }), []);

  const regionData = useMemo(() => ({
    "Andaman & Nicobar Island": { value: 150 },
    "Andhra Pradesh": { value: 470 },
    "Arunachal Pradesh": { value: 248 },
    Assam: { value: 528 },
    Bihar: { value: 755 },
    Chandigarh: { value: 95 },
    Chhattisgarh: { value: 1700 },
    Delhi: { value: 1823 },
    Goa: { value: 508 },
    Gujarat: { value: 624 },
    Haryana: { value: 1244 },
    "Himachal Pradesh": { value: 640 },
    "Jammu & Kashmir": { value: 566 },
    Jharkhand: { value: 814 },
    Karnataka: { value: 2482 },
    Kerala: { value: 899 },
    Lakshadweep: { value: 15 },
    "Madhya Pradesh": { value: 1176 },
    Maharashtra: { value: 727 },
    Manipur: { value: 314 },
    Meghalaya: { value: 273 },
    Mizoram: { value: 306 },
    Nagaland: { value: 374 },
    Odisha: { value: 395 },
    Puducherry: { value: 245 },
    Punjab: { value: 786 },
    Rajasthan: { value: 1819 },
    Sikkim: { value: 152 },
    "Tamil Nadu": { value: 2296 },
    Telangana: { value: 467 },
    Tripura: { value: 194 },
    "Uttar Pradesh": { value: 2944 },
    Uttarakhand: { value: 1439 },
    "West Bengal": { value: 1321 },
  }), []);

  useEffect(() => {
    const hideSpecificElements = () => {
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

  return (
    <Box sx={boxStyles}>
      <Box
        sx={{
          height: { xs: '50vh', sm: '40vh', md: '70vh' },
          width: { xs: '90vw', sm: '70vw', md: '50vw' },
          position: 'relative',
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
          hoverComponent={({ value }: { value: { name: string; value: number } }) => (
            <Box
              style={{
                backgroundColor: "white",
                top: tooltipPosition.y + 10, // Offset for better visibility
                left: tooltipPosition.x + 10, // Offset for better visibility
                pointerEvents: "none",
                zIndex: 9999,
                color: "black",
                fontSize: "14px",
                fontWeight: "bold",
                minWidth: "auto",
                padding: "5px",
                borderRadius: "4px",
                position: "fixed",
              }}
            >
              {value.name}: {value.value}
            </Box>
          )}
          onHover={handleHover}
          onLeave={handleLeave}
          mapLayout={{
            startColor: "#00FF00",
            endColor: "#FF0000",
          }}
          afterRender={(map: { svg: { select: (arg0: string) => any; }; }) => {
            const elementToHide = map.svg.select("#root-svg-group > g:nth-child(4)");
            if (elementToHide) {
              elementToHide.style("display", "none");
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default IndiaMap;