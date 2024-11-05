import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import DatamapsIndia from "react-datamaps-india";
import { scaleSequential } from "d3-scale";
import { interpolateBlues } from "d3-scale-chromatic";

// Define a type for the regions
type RegionName = 
  | "Andaman & Nicobar Island"
  | "Andhra Pradesh"
  | "Kerala"
  | "Tamil Nadu"
  | "Gujarat"
  | "Jammu & Kashmir";
  // Add other regions...

const Mapcontroller = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? 200 : 190;

  // Define the data for each region with values
  const regionData = useMemo(() => ({
    "Andaman & Nicobar Island": { value: 100 },
    "Andhra Pradesh": { value: 200 },
    "Kerala": { value: 300 },
    "Tamil Nadu": { value: 500 },
    "Gujarat": { value: 600 },
    "Jammu & Kashmir": { value: 700 },
    // Add data for all regions...
  }), []);

  // Create a color scale based on the region values
  const colorScale = scaleSequential()
    .domain([100, 700]) // Adjust domain if needed for other regions' values
    .interpolator(interpolateBlues);

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
            if (regionName === "Jammu & Kashmir") return "#008000"; // Set Jammu & Kashmir to green
            const regionValue = regionData[regionName]?.value || 0;
            return colorScale(regionValue); // Use colorScale for other regions
          }}
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
