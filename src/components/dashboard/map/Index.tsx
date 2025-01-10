import { useState } from "react";
import { Box } from "@mui/material";
import CustomButton from "../../common/CustomButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationComponent from "./LocationComponent";
import PincodeComponent from "./PincodeComponent";

const Index = () => {
  const [activeButton, setActiveButton] = useState<
    "Filter by Location" | "Filter by Pincode"
  >("Filter by Location");

  const generateButtonStyles = (isActive: boolean) => ({
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: isActive ? "#003809" : "#E2F2E5",
    color: isActive ? "#FFFFFF" : "#1E1E1E",
    border: "none",
    whiteSpace: "nowrap", // Prevent text wrapping
    padding: "8px 16px",
    boxShadow: "none",
    textTransform: "none" as "none",
    "&:hover": {
      backgroundColor: isActive ? "#002B07" : "#E2F2E5",
      boxShadow: "none",
    },
  });

  const renderIcon = (isActive: boolean, icon: React.ReactNode) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isActive ? "#FFFFFF" : "#1E1E1E",
        width: "22px",
        height: "22px",
      }}
    >
      {icon}
    </Box>
  );

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#E2F2E5",
          padding: "4px",
          borderRadius: "8px",
          maxWidth: "340px",
          height: "55px",
          mb: 3,
          overflow: "hidden",
        }}
      >
        <CustomButton
          buttonText="Filter by Location"
          buttonStyles={generateButtonStyles(
            activeButton === "Filter by Location"
          )}
          icon={renderIcon(
            activeButton === "Filter by Location",
            <LocationOnIcon
              sx={{
                fontSize: "22px",
                color:
                  activeButton === "Filter by Location" ? "#FFFFFF" : "#1E1E1E",
              }}
            />
          )}
          onClick={() => setActiveButton("Filter by Location")}
        />
        <CustomButton
          buttonText="Filter by Pincode"
          buttonStyles={generateButtonStyles(
            activeButton === "Filter by Pincode"
          )}
          icon={renderIcon(
            activeButton === "Filter by Pincode",
            <MyLocationIcon
              sx={{
                fontSize: "22px",
                color:
                  activeButton === "Filter by Pincode" ? "#FFFFFF" : "#1E1E1E",
              }}
            />
          )}
          onClick={() => setActiveButton("Filter by Pincode")}
        />
      </Box>
      {activeButton === "Filter by Location" && <LocationComponent />}
      {activeButton === "Filter by Pincode" && <PincodeComponent />}
    </Box>
  );
};

export default Index;
