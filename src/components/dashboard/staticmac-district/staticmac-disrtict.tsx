import React, { useState } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  FormControl,
  Stack,
} from "@mui/material";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import CustomSelect from "../../common/CustomSelect";
import TabsComponent from "../../TabsComponent";
import { PrimaryText } from "../../styles/fontsize.const";
import GenerateReportIcon from "../../../assets/icons/GenerateReportIcon.svg";
import CustomButton from "../../common/CustomButton";

const Staticmacdistrict: React.FC = () => {
  const [showTabData, setShowTabData] = useState(false);
  const [stateValue, setStateValue] = useState<string[]>([]);
  const [stateIndex, setIndexValue] = useState<string>("");
  const [stateRank, setStateRank] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? 200 : 190;

  const handleSelectStateChange = (value: string[]) => {
    setStateValue(value);
  };

  const handleSelectIndexChange = (value: string) => {
    setIndexValue(value);
  };
  const handleSelectRankChange = (value: string) => {
    setStateRank(value);
  };
  const buttonStyles = {
    fontSize: PrimaryText,
    height: "33px",
    padding: "14px",
    backgroundColor: "#001B04",
    color: "#FFFFFF",
    textTransform: "none" as "none",
    borderRadius: "6px",
    "& img": {
      width: "15px",
      height: "15px",
    },
  };
  const OverallButtonStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "sticky",
    zIndex: 1,
    backgroundColor: "white",
    bottom: -8,
    marginBottom: "-11px",
    padding: "4px",
    gap: "5px",
    overflow: "hidden",
  };
  const SelectDeselectButtonStyles = {
    textTransform: "none" as "none",
    borderColor: "gray",
    flexwrap: "wrap",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "gray",
    // minWidth: "60px",
    padding: "5px",
    height: "25px",
    width: "100%",
    borderRadius: "4px",
    fontSize: PrimaryText,
    ":hover": {
      borderColor: "gray",
    },
  };
  return (
    <Box
      alignItems="center"
      sx={{
        flexGrow: 1,
        p: 2,
        overflow: "auto",
        ml: { sm: `${drawerWidth}px` },
        marginTop: "60px",
      }}
    >
      <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
        {/* States Selection */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <CustomAutocomplete
              label="State"
              placeholder="Select one or more states"
              options={[
                "Andhra Pradesh",
                "Tamil Nadu",
                "Assam",
                "Bihar",
                "Karnataka",
                "Punjab",
              ]}
              value={stateValue}
              onInputChange={handleSelectStateChange}
              noOptionsText="No states found"
              sx={{ marginTop: "4px" }}
              selectAllLabel="Select All"
              deselectAllLabel="Deselect All"
              optionFontSize={PrimaryText}
              SelectDeselectButtonStyles={SelectDeselectButtonStyles}
              OverallButtonStyles={OverallButtonStyles}
            />
          </FormControl>
        </Grid>

        {/* Rank and Index Selection */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <CustomAutocomplete
              label="District"
              placeholder="Select One or more district(s)"
              options={[
                "Ariyalur",
                "Chengalpattu",
                "Chennai",
                "Coimbatore",
                "Cuddalore",
                "Dharmapuri",
                "Dindigul",
                "Erode",
                "Kallakurichi",
                "Kancheepuram",
                "Karur",
                "Krishnagiri",
                "Madurai",
                "Mayiladuthurai",
                "Nagapattinam",
                "Namakkal",
                "Nilgiris",
                "Perambalur",
                "Pudukkottai",
                "Ramanathapuram",
                "Ranipet",
                "Salem",
                "Sivagangai",
                "Tenkasi",
                "Thanjavur",
                "Theni",
                "Thoothukudi",
                "Tiruchirappalli",
                "Tirunelveli",
                "Tirupathur",
                "Tiruppur",
                "Tiruvallur",
                "Tiruvannamalai",
                "Tiruvarur",
                "Vellore",
                "Villupuram",
                "Virudhunagar",
              ]}
              value={stateValue}
              onInputChange={handleSelectStateChange}
              noOptionsText="No states found"
              sx={{ marginTop: "4px" }}
              selectAllLabel="Select All"
              deselectAllLabel="Deselect All"
              optionFontSize={PrimaryText}
              SelectDeselectButtonStyles={SelectDeselectButtonStyles}
              OverallButtonStyles={OverallButtonStyles}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <CustomSelect
              label="State Index"
              placeholder="Select Index"
              options={["Show MIS", "Show MAS"]}
              value={stateIndex}
              onChange={handleSelectIndexChange}
              sx={{ marginTop: "4px", height: "39px" }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <CustomSelect
              label="Select Rank"
              placeholder="Select Rank"
              options={[
                "Show All",
                "Top 10",
                "Top 50",
                "Top 100",
                "Bottom 10",
                "Bottom 50",
                "Bottom 100",
              ]}
              value={stateRank}
              onChange={handleSelectRankChange}
              sx={{ marginTop: "4px", height: "39px" }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "flex-end", width: "100%" }}
      >
        <CustomButton
          buttonText={showTabData ? "Clear Filter" : "Generate Report"}
          buttonStyles={buttonStyles}
          icon={
            !showTabData && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={GenerateReportIcon} alt="GenerateReportIcon" />
              </Box>
            )
          }
          onClick={() => setShowTabData((prev) => !prev)}
        />
      </Stack>
      <Box
        sx={{ borderBottom: "1px solid #D4D4D4", width: "100%", mt: 2 }}
      ></Box>

      {showTabData && <TabsComponent />}
    </Box>
  );
};

export default Staticmacdistrict;
