/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  useTheme,
  useMediaQuery,
  Grid,
  FormControl,
  Typography,
  Chip,
  Stack,
  ListSubheader,
  List,
} from "@mui/material";
import { borderRadius, fontSize, styled } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
// import SearchIcon from '@mui/icons-material/Search';
import Overalltabbar from "../dashboard card/overalltoolbar";
import DashboardIcon from "../../../assets/images/svg/akar-icons_dashboard.svg";
import MapIcon from "../../../assets/images/svg/map 1.svg";
import Map1Icon from "../../../assets/images/svg/map 2.svg";
import Dashboard1Icon from "../../../assets/images/svg/akar-icons_dashboard2.svg";

import IndiaMap from "../map/tamilnadumap";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import { PrimaryText, SecondayText } from "../../styles/fontsize.const";

const SelectionField = ({
  label,
  options,
  selectedValues,
  setSelectedValues,
  searchTerm,
  setSearchTerm,
}: any) => {
  const filteredOptions = options.filter((option: string) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    setSelectedValues(options);
  };

  const handleDeselectAll = () => {
    setSelectedValues([]);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string[]) => {
    setSelectedValues(newValue);
  };

  return (
    <FormControl fullWidth>
      <Typography
        variant="caption"
        sx={{ marginBottom: 1, textAlign: "left", fontSize: "0.7rem" }}
      >
        {label}
      </Typography>
      <Autocomplete
        multiple
        value={selectedValues}
        onChange={handleChange}
        options={filteredOptions}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <Box
            component="li"
            {...props}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ flexBasis: "80%" }}>{option}</Typography>
            {selected && <CheckIcon color="primary" />}
          </Box>
        )}
        renderTags={(value, getTagProps) => (
          <div
            style={{
              maxHeight: 40,
              overflowY: "auto",
              display: "flex",
              flexWrap: "wrap",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {value.map((option, index) => (
              <Chip
                // key={option}
                label={option}
                {...getTagProps({ index })}
                onDelete={() => {
                  setSelectedValues((prev: any[]) =>
                    prev.filter((state) => state !== option)
                  );
                }}
              />
            ))}
          </div>
        )}
        ListboxComponent={React.forwardRef((props, ref) => (
          <Box ref={ref}>
            {/* <ListSubheader
            sx={{
              bgcolor: 'background.paper',
              position: 'sticky',
              top: 0,
              zIndex: 2,
              padding: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder={`Search ${label}`}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { height: 40 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </ListSubheader> */}
            <List {...props} />
            <ListSubheader
              sx={{
                bgcolor: "background.paper",
                position: "sticky",
                bottom: 0,
                zIndex: 1,
                paddingY: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handleSelectAll}
                variant="outlined"
                sx={{
                  marginRight: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  padding: { xs: "2px 4px", sm: "2px 8px" },
                  minWidth: { xs: "70px", sm: "90px" },
                }}
              >
                Select All
              </Button>
              <Button
                onClick={handleDeselectAll}
                variant="outlined"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  padding: { xs: "2px 4px", sm: "2px 8px" },
                  minWidth: { xs: "70px", sm: "90px" },
                }}
              >
                Deselect All
              </Button>
            </ListSubheader>
          </Box>
        ))}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={`Select one or more ${label}`}
            placeholder={`Select one or more ${label}`}
            sx={{
              "& .MuiInputBase-input": {
                height: 11.3,
                paddingTop: 16,
              },
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 8px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -7px) scale(0.75)",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                background: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
              },
            }}
          />
        )}
        popupIcon={null}
        openOnFocus
      />
    </FormControl>
  );
};

const Staticmacoutlet: React.FC = () => {
  const [activeButton, setActiveButton] = useState<"dashboard" | "map">(
    "dashboard"
  );
  const [showTabData, setShowTabData] = useState(false);
  const [showMapData, setShowMapData] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? 200 : 190;
  const [stateValue, setStateValue] = useState<string[]>([]);
  const [stateTopRank, setTopRank] = useState<string>("");
  const [stateMarketCriteria, setMarketCriteria] = useState<string>("");

  const handleSelectStateChange = (value: string[]) => {
    setStateValue(value);
  };
  const handleTopRank = (value: string) => {
    setTopRank(value);
  };
  const handleMarketCriteria = (value: string) => {
    setMarketCriteria(value);
  };

  const buttonStylesClearAll = {
    fontSize: SecondayText,
    fontWeight: 540,
    border: "1px solid #1018280D",
    boxShadow: "0px 1px 2px 0px #1018280D",
    height: "34px",
    padding: "14px",
    backgroundColor: "#E3E3E3",
    color: "#1E1E1E",
    textTransform: "none" as "none",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#d3d3d3",
    },
  };
  const buttonStylesApplyFilter = {
    fontSize: SecondayText,
    fontWeight: 540,
    height: "34px",
    padding: "14px",
    backgroundColor: "#001B04",
    color: "#FFFFFF",
    textTransform: "none" as "none",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#001303",
    },
  };
  const buttonStylesDashboard = {
    borderRadius: "0px",
    fontSize: PrimaryText,
    backgroundColor: activeButton === "dashboard" ? "#003809" : "#E2F2E5",
    color: activeButton === "dashboard" ? "#FFFFFF" : "#1E1E1E",
    border: activeButton === "dashboard" ? "none" : "none ",
    boxShadow: "none",
    textTransform: "none" as "none",
    "&:hover": {
      backgroundColor: activeButton === "dashboard" ? "#002B07" : "#E2F2E5",
      boxShadow: "none",
    },
  };
  const buttonStylesMapView = {
    borderRadius: "0px",
    fontSize: PrimaryText,
    backgroundColor: activeButton === "map" ? "#003809" : "#E2F2E5",
    color: activeButton === "map" ? "#FFFFFF" : "#1E1E1E",
    border: activeButton === "map" ? "none" : "none",
    boxShadow: "none",
    textTransform: "none" as "none",
    "&:hover": {
      backgroundColor: activeButton === "map" ? "#002B07" : "#E2F2E5",
      boxShadow: "none",
    },
  };
  const ClearApplyButtonStyles = {
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "15px",
  };
  return (
    <Box
      alignItems="center"
      sx={{
        flexGrow: 1,
        p: 3,
        overflow: "auto",
        ml: { sm: `${drawerWidth}px` },
        marginTop: "60px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#E2F2E5",
          padding: "4px",
          borderRadius: "8px",
          maxWidth: "242px",
          height: "50px",
          mb: 3,
        }}
      >
        <CustomButton
          buttonText="Dashboard"
          buttonStyles={buttonStylesDashboard}
          icon={
            <Box
              component="img"
              src={
                activeButton === "dashboard" ? DashboardIcon : Dashboard1Icon
              }
              sx={{
                color: activeButton === "dashboard" ? "#FFFFFF" : "#1E1E1E",
                width: "22px",
                height: "22px",
              }}
            />
          }
          onClick={() => setActiveButton("dashboard")}
        />
        <CustomButton
          buttonText="Map View"
          buttonStyles={buttonStylesMapView}
          icon={
            <Box
              component="img"
              src={activeButton === "map" ? MapIcon : Map1Icon}
              sx={{
                color: activeButton === "map" ? "#FFFFFF" : "#1E1E1E",
                width: "22px",
                height: "22px",
              }}
            />
          }
          onClick={() => setActiveButton("map")}
        />
      </Box>

      {activeButton === "dashboard" ? (
        <>
          <Grid container spacing={2} sx={{ paddingLeft: "2px" }}>
            <Grid item xs={12} sm={6} md={1.713}>
              <CustomAutocomplete
                label="State"
                placeholder="Select one or more states"
                insideplaceholder="Search State"
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
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.713}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.713}>
              <CustomAutocomplete
                label="Taluk"
                placeholder="Select Taluks"
                options={[
                  "Taluk 1",
                  "Taluk 2",
                  "Taluk 3",
                  "Taluk 4",
                  "Taluk 5",
                  "Taluk 6",
                ]}
                value={stateValue}
                onInputChange={handleSelectStateChange}
                noOptionsText="No states found"
                sx={{ marginTop: "4px" }}
                selectAllLabel="Select All"
                deselectAllLabel="Deselect All"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.713}>
              <CustomAutocomplete
                label="Village"
                placeholder="Select Taluks"
                options={[
                  "Village 1",
                  "Village 2",
                  "Village 3",
                  "Village 4",
                  "Village 5",
                  "Village 6",
                ]}
                value={stateValue}
                onInputChange={handleSelectStateChange}
                noOptionsText="No states found"
                sx={{ marginTop: "4px" }}
                selectAllLabel="Select All"
                deselectAllLabel="Deselect All"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.713}>
              <CustomAutocomplete
                label="Urban / Rural"
                placeholder="Select Urban/Rural"
                options={[
                  "Rural 1",
                  "Rural 2",
                  "Rural 3",
                  "Rural 4",
                  "Rural 5",
                  "Rural 6",
                ]}
                value={stateValue}
                onInputChange={handleSelectStateChange}
                noOptionsText="No states found"
                sx={{ marginTop: "4px" }}
                selectAllLabel="Select All"
                deselectAllLabel="Deselect All"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.713}>
              <CustomSelect
                label="Top-Rank"
                placeholder="Select Top rank"
                options={[
                  "Top 10",
                  "Top 50",
                  "Top 100",
                  "Bottom 10",
                  "Bottom 50",
                  "Bottom 100",
                ]}
                value={stateTopRank}
                onChange={handleTopRank}
                sx={{
                  marginTop: "4px",
                  height: "39px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.713}>
              <CustomSelect
                label="Market Criteria"
                placeholder="Please Select Market Criteria"
                options={[
                  "Phoenix Baker @phoenix",
                  "Olivia Rhye @olivia",
                  "Lana Steiner @lana",
                  "Demi Wilkinson @demi",
                  "Candice Wu @candice",
                  "Natali Craig @natali",
                  "Drew Cano @drew",
                ]}
                value={stateMarketCriteria}
                onChange={handleMarketCriteria}
                sx={{
                  marginTop: "4px",
                  height: "39px",
                }}
              />
            </Grid>
          </Grid>
          <Stack spacing={2} direction="row" sx={ClearApplyButtonStyles}>
            <CustomButton
              buttonText="Clear All"
              buttonStyles={buttonStylesClearAll}
              icon={false}
              onClick={() => setShowTabData(false)}
            />
            <CustomButton
              buttonText="Apply Filter"
              buttonStyles={buttonStylesApplyFilter}
              icon={false}
              onClick={() => setShowTabData(true)}
            />
          </Stack>
          {showTabData && <Overalltabbar />}
        </>
      ) : activeButton === "map" ? (
        <>
          <Grid container spacing={2} sx={{ width: "100%", paddingLeft: 2 }}>
            <Grid item xs={12} sm={6} md={1.713}>
              <CustomAutocomplete
                label="State"
                placeholder="Select one or more states"
                insideplaceholder="Search State"
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
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.713}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.713}>
              <CustomAutocomplete
                label="Taluk"
                placeholder="Select Taluks"
                options={[
                  "Taluk 1",
                  "Taluk 2",
                  "Taluk 3",
                  "Taluk 4",
                  "Taluk 5",
                  "Taluk 6",
                ]}
                value={stateValue}
                onInputChange={handleSelectStateChange}
                noOptionsText="No states found"
                sx={{ marginTop: "4px" }}
                selectAllLabel="Select All"
                deselectAllLabel="Deselect All"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={1.713}>
              <CustomAutocomplete
                label="Village"
                placeholder="Select Taluks"
                options={[
                  "Village 1",
                  "Village 2",
                  "Village 3",
                  "Village 4",
                  "Village 5",
                  "Village 6",
                ]}
                value={stateValue}
                onInputChange={handleSelectStateChange}
                noOptionsText="No states found"
                sx={{ marginTop: "4px" }}
                selectAllLabel="Select All"
                deselectAllLabel="Deselect All"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={1.713}>
              <CustomSelect
                label="Market Criteria"
                placeholder="Please Select Market Criteria"
                options={[
                  "Phoenix Baker @phoenix",
                  "Olivia Rhye @olivia",
                  "Lana Steiner @lana",
                  "Demi Wilkinson @demi",
                  "Candice Wu @candice",
                  "Natali Craig @natali",
                  "Drew Cano @drew",
                ]}
                value={stateMarketCriteria}
                onChange={handleMarketCriteria}
                sx={{
                  marginTop: "4px",
                  height: "39px",
                }}
              />
            </Grid>
          </Grid>
          <Stack spacing={2} direction="row" sx={ClearApplyButtonStyles}>
            <CustomButton
              buttonText="Clear All"
              buttonStyles={buttonStylesClearAll}
              icon={false}
              onClick={() => setShowMapData(false)}
            />
            <CustomButton
              buttonText="Apply Filter"
              buttonStyles={buttonStylesApplyFilter}
              icon={false}
              onClick={() => setShowMapData(true)}
            />
          </Stack>
          {/* {showMapData && <IndiaMap />} */}
          {/* {showMapData && "Coming Soon..."} */}

        </>
      ) : null}
    </Box>
  );
};

export default Staticmacoutlet;
