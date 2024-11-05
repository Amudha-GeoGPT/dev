import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import DatamapsIndia from "react-datamaps-india";
// Define types for the regions
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
            elementToHide.style.display = "none"; // Hide unwanted elements
        }
    }, []);

    const regionData = useMemo<Record<RegionName, { value: number }>>(() => ({
        "Andaman & Nicobar Island": { value: 800 },
        "Andhra Pradesh": { value: 780  },
        "Arunachal Pradesh": { value: 100 },
        "Assam": { value: 650 },
        "Bihar": { value: 800 },
        "Chandigarh": { value: 350 },
        "Chhattisgarh": { value: 800 },
        "Delhi": { value: 80 },
        "Goa": { value: 800 },
        "Gujarat": { value: 800 },
        "Haryana": { value: 350 },
        "Himachal Pradesh": { value: 600 },
        "Jammu & Kashmir": { value: 250 },
        "Jharkhand": { value: 800 },
        "Karnataka": { value: 1000 },
        "Kerala": { value: 790 },
        "Lakshadweep": { value: 800 },
        "Madhya Pradesh": { value: 110 },
        "Maharashtra": { value: 1000 },
        "Manipur": { value: 140 },
        "Meghalaya": { value: 8 },
        "Mizoram": { value: 140 },
        "Nagaland": { value: 800 },
        "Odisha": { value: 800 },
        "Puducherry": { value: 800 },
        "Punjab": { value: 350 },
        "Rajasthan": { value: 10 },
        "Sikkim": { value: 800 },
        "Tamil Nadu": { value: 1000 },
        "Telangana": { value: 650 },
        "Tripura": { value: 800 },
        "Uttar Pradesh": { value: 600 },
        "Uttarakhand": { value: 18 },
        "West Bengal": { value: 800 },
    }), []);
    const handleHover = (region: RegionName | null) => {
        setHoveredRegion(region);
    };

    const handleLeave = () => {
        setHoveredRegion(null);
    };

    return (
        <Box alignItems="center" sx={{ flexGrow: 1, p: 2, overflow: 'hidden', ml: { sm: `${drawerWidth}px` }, marginTop: '-50px' }}>
            <div style={{ position: "relative", width: "100%", height: "600px" }}>
                <DatamapsIndia
                    style={{ width: "100%", height: "100%" }}
                    regionData={regionData}
                    fillColor={(geo: { properties: { name: string } }) => {
                        const regionName = geo.properties.name as RegionName;
                        const value = regionData[regionName]?.value || 0; // Get the value for the region
                        // Return the color from the scale or a default color for regions with no data
                        return hoveredRegion === regionName ? "lightblue" : (value > 0 ? value : "#D3D3D3"); // Use a light grey for regions with no data
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
                        startColor: "#00FF00",
                        endColor: "#FF0000",
                        noDataColor: "#f5f5f5", 
                        borderColor: "black",
                        hoverColor: "blue",
                        hoverBorderColor: "black",
                    }}
                />
            </div>
        </Box>
    );
};

export default Mapcontroller;
