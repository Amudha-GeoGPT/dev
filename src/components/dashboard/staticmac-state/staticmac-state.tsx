import React, { useState } from "react";
import {
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  FormControl,
  Stack,
} from "@mui/material";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import CustomSelect from "../../common/CustomSelect";
import TabsComponent from "../../TabsComponent";
import { MainContentBackground } from "../../styles/color.const";
import CustomButton from "../../common/CustomButton";
import { PrimaryText, SmallText } from "../../styles/fontsize.const";
import GenerateReportIcon from "../../../assets/icons/GenerateReportIcon.svg";

const Overall: React.FC = () => {
  const [showTabData, setShowTabData] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? 200 : 100;
  const [stateValue, setStateValue] = useState<string[]>([]);
  const [stateIndex, setIndexValue] = useState<string>("");
  const [stateRank, setStateRank] = useState<string>("");

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

  return (
    <Paper
      elevation={1}
      sx={{
        // flexGrow: 1,
        p: 2,
        // ml: 2,
        mt:6,
        backgroundColor:'#FAFFFA',
        // width: "100%", // Ensures the Paper spans the full width of its container
        // height: "100%",
      }}
    >
      <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
        {/* States Selection */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <CustomAutocomplete
              label="State"
              placeholder={
                stateValue.length === 0 ? "Select one or more states" : ""
              }
              options={[
                "Andhra Pradesh",
                "Tamil Nadu",
                "Assam",
                "Bihar",
                "Karnataka",
                "Punjab",
                "Goa",
                "Maharastra",
                "Kerala",
              ]}
              value={stateValue}
              onInputChange={handleSelectStateChange}
              noOptionsText="No states found"
              selectAllLabel="Select All"
              deselectAllLabel="Deselect All"
            />
          </FormControl>
        </Grid>

        {/* Rank and Index Selection */}
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
      <Stack direction="row" sx={{ justifyContent: "flex-end", width: "100%" }}>
        <CustomButton
          buttonText={showTabData ? "Clear Filter" : "Generate Report"}
          buttonStyles={buttonStyles}
          icon={
            !showTabData && (
              <img src={GenerateReportIcon} alt="Generate Report Icon" />
            )
          }
          onClick={() => setShowTabData((prev) => !prev)}
        />
      </Stack>
      {showTabData && (
        <Paper elevation={1} sx={{ mt: 2, p: 2 }}>
          <TabsComponent />
        </Paper>
      )}
    </Paper>
  );
};

export default Overall;
