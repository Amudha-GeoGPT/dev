import { Box ,useTheme, useMediaQuery,} from "@mui/material";
import {useEffect, useState, useMemo } from "react";
import DatamapsIndia from "react-datamaps-india";

// Define types for the regions and values
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

type HoverComponentValue = { name: string; value: number };

const Mapcontroller = () => {
    const [hoveredRegion, setHoveredRegion] = useState<RegionName | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const drawerWidth = isMobile ? 200 : 190;
    useEffect(() => {
        const elementToHide = document.querySelector("#root-svg-group > g:nth-child(4)");
        if (elementToHide instanceof HTMLElement) {
            elementToHide.style.display = "none";
        }
    }, []);

    const regionColors = useMemo<Record<RegionName, string>>(() => ({
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
  
  const regionData = useMemo<Record<RegionName, { value: number }>>(() => ({
      "Andaman & Nicobar Island": { value: 150 },
      "Andhra Pradesh": { value: 470 },
      "Arunachal Pradesh": { value: 248 },
      "Assam": { value: 528 },
      "Bihar": { value: 755 },
      "Chandigarh": { value: 95 },
      "Chhattisgarh": { value: 1700 },
      "Delhi": { value: 1823 },
      "Goa": { value: 508 },
      "Gujarat": { value: 624 },
      "Haryana": { value: 1244 },
      "Himachal Pradesh": { value: 640 },
      "Jammu & Kashmir": { value: 566 },
      "Jharkhand": { value: 814 },
      "Karnataka": { value: 2482 },
      "Kerala": { value: 899 },
      "Lakshadweep": { value: 15 },
      "Madhya Pradesh": { value: 1176 },
      "Maharashtra": { value: 727 },
      "Manipur": { value: 314 },
      "Meghalaya": { value: 273 },
      "Mizoram": { value: 306 },
      "Nagaland": { value: 374 },
      "Odisha": { value: 395 },
      "Puducherry": { value: 245 },
      "Punjab": { value: 786 },
      "Rajasthan": { value: 1819 },
      "Sikkim": { value: 152 },
      "Tamil Nadu": { value: 2296 },
      "Telangana": { value: 467 },
      "Tripura": { value: 194 },
      "Uttar Pradesh": { value: 2944 },
      "Uttarakhand": { value: 1439 },
      "West Bengal": { value: 1321 },
  }), []);
  

    const handleHover = (region: RegionName | null) => {
        setHoveredRegion(region);
    };

    const handleLeave = () => {
        setHoveredRegion(null);
    };

    return (
        <Box alignItems="center"  sx={{ flexGrow: 1, p: 2, overflow: 'auto', ml: { sm: `${drawerWidth}px` }, marginTop: '60px' }}>
   
           <div style={{position: "relative",width: "100%",height: "600px" }}>
                <DatamapsIndia
                    style={{ width: "100%", height: "100%" }}
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
