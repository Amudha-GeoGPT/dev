import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
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

const MapController = () => {
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

    // Define color ranges for different values
    const getColorByValue = (value: number) => {
        if (value > 2000) return "#FF0000"; // Red
        if (value > 1500) return "#FF4500"; // Orange Red
        if (value > 1000) return "#FFA500"; // Orange
        if (value > 500) return "#FFFF00"; // Yellow
        return "#ADFF2F"; // Green Yellow
    };

    const regionData = useMemo<Record<RegionName, { value: number; color: string }>>(() => ({
        "Andaman & Nicobar Island": { value: 150, color: getColorByValue(150) },
        "Andhra Pradesh": { value: 470, color: getColorByValue(470) },
        "Arunachal Pradesh": { value: 248, color: getColorByValue(248) },
        "Assam": { value: 528, color: getColorByValue(528) },
        "Bihar": { value: 755, color: getColorByValue(755) },
        "Chandigarh": { value: 95, color: getColorByValue(95) },
        "Chhattisgarh": { value: 1700, color: getColorByValue(1700) },
        "Delhi": { value: 1823, color: getColorByValue(1823) },
        "Goa": { value: 508, color: getColorByValue(508) },
        "Gujarat": { value: 624, color: getColorByValue(624) },
        "Haryana": { value: 1244, color: getColorByValue(1244) },
        "Himachal Pradesh": { value: 640, color: getColorByValue(640) },
        "Jammu & Kashmir": { value: 1000, color: getColorByValue(1000) },
        "Jharkhand": { value: 814, color: getColorByValue(814) },
        "Karnataka": { value: 2482, color: getColorByValue(2482) },
        "Kerala": { value: 899, color: getColorByValue(899) },
        "Lakshadweep": { value: 15, color: getColorByValue(15) },
        "Madhya Pradesh": { value: 1176, color: getColorByValue(1176) },
        "Maharashtra": { value: 727, color: getColorByValue(727) },
        "Manipur": { value: 314, color: getColorByValue(314) },
        "Meghalaya": { value: 273, color: getColorByValue(273) },
        "Mizoram": { value: 306, color: getColorByValue(306) },
        "Nagaland": { value: 374, color: getColorByValue(374) },
        "Odisha": { value: 395, color: getColorByValue(395) },
        "Puducherry": { value: 245, color: getColorByValue(245) },
        "Punjab": { value: 786, color: getColorByValue(786) },
        "Rajasthan": { value: 1819, color: getColorByValue(1819) },
        "Sikkim": { value: 152, color: getColorByValue(152) },
        "Tamil Nadu": { value: 2296, color: getColorByValue(2296) },
        "Telangana": { value: 467, color: getColorByValue(467) },
        "Tripura": { value: 194, color: getColorByValue(194) },
        "Uttar Pradesh": { value: 2944, color: getColorByValue(2944) },
        "Uttarakhand": { value: 1439, color: getColorByValue(1439) },
        "West Bengal": { value: 1321, color: getColorByValue(1321) },
    }), []);

    const handleHover = (region: RegionName | null) => {
        setHoveredRegion(region);
    };

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
                        return hoveredRegion === regionName ? "lightblue" : regionData[regionName]?.color || "#f5f5f5";
                    }}
                    hoverComponent={({ value }: { value: HoverComponentValue }) => (
                        <div style={{ background: "white", border: "1px solid black", padding: "5px" }}>
                            <div>
                                {value.name}: {value.value} OCs
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

export default MapController;
