import React, { useState } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  FormControl,
  Stack,
  Paper,
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
  const drawerWidth = isMobile ? 200 : 190;
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
  const ChipValueStyles = {
    fontSize: SmallText,
    height: "24px",
    // padding: "0px",
    borderRadius: "6px",
    backgroundColor: "#e2f2e5",
  };
  const ChipNumberStyles = {
    backgroundColor: "#e2f2e5",
    fontSize: SmallText,
    height: "24px",
    borderRadius: "6px",
  };
  const AutocompleteTextfieldStyles: any = {
    height: "40px",
    maxHeight: 40,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    textOverflow: "ellipsis",
  };
  const DoneIconStyles = {
    marginLeft: "auto",
    width: "15px",
    height: "15px",
  };
  return (
    <>
    {/* // <Box */}
    {/* //   sx={{ */}
    {/* //     display: 'flex',
    //     flexDirection: 'column',
    //     height: `calc(100vh - 60px)`, // Subtract header height
    //     marginLeft: { sm: `${drawerWidth}px` },
    //     marginTop: '60px',
    //     backgroundColor: MainContentBackground,
    //     overflow: 'auto'
    //   }}
    // > */}
    {/* //   <Paper
    //     elevation={3}
    //     sx={{
    //       flex: 1,
    //       ml: 4,
    //       p: 1,
    //       minHeight: `calc(10vh - 180px)`, // Ensures full height coverage
    //       width: {
    //         xs: `calc(100% - 38px)`,
    //         sm: `calc(100% - ${drawerWidth}px - (-158px))`
    //       }
    //     }}
    //   > */}
      <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
        {/* States Selection */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth 
          sx={{
                '& .MuiAutocomplete-root':{
                  '& .MuiFormControl-root':{
                    '& .MuiInputBase-root':{
                      '& .MuiBox-root':{
                        '& .MuiButtonBase-root':{
                          '& .MuiChip-label':{
                              paddingRight:'4px',
                              paddingLeft:'2px'
                          },
                          margin:'2px'
                        }
                      },
                      flexWrap:'nowrap',
                      maxHeight:'40px',
                      gap:'1px',
                      justifyContent: 'flex-start',
                    "padding-right":'0px !important',
                }}} 
              }}>
            <CustomAutocomplete
              
              label="State"
              placeholder={stateValue.length === 0 ? "Select one or more states" : ""}
              options={[
                "Andhra Pradesh",
                "Tamil Nadu",
                "Assam",
                "Bihar",
                "Karnataka",
                "Punjab",
                "Goa",
                "Maharastra",
                "kerala",
              ]}
              value={stateValue}
              onInputChange={handleSelectStateChange}
              noOptionsText="No states found"
              // sx={{ marginTop: "4px"}}
              selectAllLabel="Select All"
              deselectAllLabel="Deselect All"
              optionFontSize={PrimaryText}
              SelectDeselectButtonStyles={SelectDeselectButtonStyles}
              OverallButtonStyles={OverallButtonStyles}
              ChipValueStyles={ChipValueStyles}
              ChipNumberStyles={ChipNumberStyles}
              AutocompleteTextfieldStyles={AutocompleteTextfieldStyles}
              DoneIconStyles={DoneIconStyles}

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
      {/* </Paper>
    </Box> */}
    </>
  );
};

export default Overall;
