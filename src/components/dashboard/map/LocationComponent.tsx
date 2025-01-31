/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomSelectSearch from "../../common/CustomSelectSearch";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Drawer,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomButton from "../../common/CustomButton";
import DownloadIcon from "@mui/icons-material/Download";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AnotherDataGrid from "./AnotherDataGrid";
import "leaflet/dist/leaflet.css";
import CloseIcon from "@mui/icons-material/Close";
import NewTamilNaduMap from "./NewTamilnaduMap";
import CheckIcon from "@mui/icons-material/Check";
import { verticalData } from "./WardList";
import { SelectAutoCompleteBorderColor } from "../../styles/color.const";
import { useNewMapPages } from "./NewMapPages";
import { useEffect, useState } from "react";
import CustomSelect from "../../common/CustomSelect";
import React from "react";

const LocationComponent = () => {
  const [wardDataNo, setWardDataNo] = React.useState<any>(null);
  const [wardDataPoint, setWardDataPoint] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [_clickedItem, setClickedItem] = React.useState<string | null>(null);
  const toggleDrawer = (open: boolean) => (_event: React.MouseEvent) => {
    setIsDrawerOpen(open);
  };
  const {
    selectedVertical,
    selectedState,
    selectedMetro,
    metropolitanOptions,
    clicked,
    clickedOverview,
    selectedMetropolitan,
    specificRangeData,
    wardDataForMap,
    // rows,
    handleTalukChange,
    talukOptions,
    selectedWard,
    // selectedWardNo,
    handleMetropolitanChange,
    handleApplyFilter,
    handleCellClick,
    ApplyFilterButtonStyles,
    ClearAllButtonStyles,
    handleWardChange,
    handleMetroChange,
    handleStateChange,
    handleVerticalChange,
    filteredRows,
    metroOrNonMetro,
    wardOptions,
    dynamicLabel,
    dynamicPlaceholder,
    selectedTaluk,
    summaryData,
  } = useNewMapPages(setWardDataNo, setWardDataPoint);

  const columns: GridColDef[] = [
    {
      field: "CKOutlets",
      headerName: "CK Outlets",
      flex: 3,
      renderCell: (params) => <Typography>{params.value}</Typography>,
      headerClassName: "headerCell",
      sortable: false,
    },
    {
      field: "col1",
      headerName: "<50",
      flex: 1.8,
      sortable: false,
      renderHeader: () => <span style={{ color: "red" }}>&lt;50</span>,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.CKOutlets === "No.of.wards" ? "red" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col2",
      headerName: "51 to 100",
      flex: 2,
      sortable: false,
      renderHeader: () => <span style={{ color: "orange" }}>51 to 100</span>,
      renderCell: (params) => (
        <Typography
          sx={{
            color:
              params.row.CKOutlets === "No.of.wards" ? "orange" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col3",
      headerName: "101 to 200",
      flex: 2.2,
      sortable: false,
      renderHeader: () => <span style={{ color: "#9370db" }}>101 to 200</span>,
      renderCell: (params) => (
        <Typography
          sx={{
            color:
              params.row.CKOutlets === "No.of.wards" ? "#9370db" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col4",
      headerName: "201 to 300",
      flex: 2.3,
      sortable: false,
      renderHeader: () => <span style={{ color: "#20b2aa" }}>201 to 300</span>,
      renderCell: (params) => (
        <Typography
          sx={{
            color:
              params.row.CKOutlets === "No.of.wards" ? "#20b2aa" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "col5",
      headerName: ">300",
      flex: 2.6,
      sortable: false,
      renderHeader: () => <span style={{ color: "green" }}>300 & above</span>,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.CKOutlets === "No.of.wards" ? "green" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];
 

  useEffect(() => {
    if (wardDataNo && wardDataNo.length > 0) {
      setWardDataPoint([]);
    }
  }, [wardDataNo]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={0.5} sx={{ p: 2 }}>
          <Grid item xs={1.8}>
            <CustomSelect
              label="Vertical"
              placeholder="Select Vertical"
              options={verticalData}
              value={selectedVertical}
              onChange={handleVerticalChange}
              sx={{ height: "40px" }}
            />
          </Grid>
          <Grid item xs={1.8}>
            <CustomSelectSearch
              label="State"
              placeholder="Select State"
              options={[{ label: "Tamilnadu", value: "Tamilnadu" }]}
              value={selectedState}
              onChange={(value) => handleStateChange(value)}
            />
          </Grid>
          <Grid item xs={1.8}>
            <CustomSelectSearch
              label="Metro/NonMetro"
              placeholder="Select Metro/Non-Metro"
              options={metroOrNonMetro}
              value={selectedMetro}
              onChange={handleMetroChange}
            />
          </Grid>
          <Grid item xs={1.8}>
            <CustomSelectSearch
              label={dynamicLabel}
              placeholder={dynamicPlaceholder}
              options={metropolitanOptions}
              value={selectedMetropolitan}
              onChange={handleMetropolitanChange}
            />
          </Grid>
          {selectedMetro === "Non_Metro" && (
            <Grid item xs={2}>
              <Typography
                sx={{
                  fontSize: "12px",
                  mt: "2px",
                  marginBottom: "4px",
                  marginLeft: "5px",
                }}
              >
                Taluk
              </Typography>
              <Autocomplete
                multiple
                limitTags={1}
                options={talukOptions}
                value={selectedTaluk}
                onChange={handleTalukChange}
                disableCloseOnSelect
                // ListboxComponent={(props) => (
                //   <Box sx={{ position: "relative" }}>
                //     <ul {...props} style={{ paddingBottom: "40px" }} />{" "}
                //     {/* Add some padding for space */}
                //     <Box
                //       sx={{
                //         position: "absolute",
                //         bottom: 0,
                //         width: "100%",
                //         display: "flex",
                //         justifyContent: "space-between",
                //         padding: "4px",
                //         backgroundColor: "white",
                //         boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
                //         zIndex: 1,
                //         borderTop: "1px solid black",
                //       }}
                //     >
                //       <Button
                //         // variant="outlined"
                //         sx={{
                //           fontSize: "10px",
                //           color: "black",
                //           textTransform: "none",
                //         }}
                //         onClick={() => handleClearSelection()}
                //       >
                //         Clear
                //       </Button>
                //       <Button
                //         variant="contained"
                //         sx={{
                //           fontSize: "10px",
                //           backgroundColor: "black",
                //         }}
                //         onClick={() => handleConfirmSelection()}
                //       >
                //         OK
                //       </Button>
                //     </Box>
                //   </Box>
                // )}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "0px",
                    borderRadius: "8px",
                    border: `1.8px solid ${SelectAutoCompleteBorderColor}`,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: `none`,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: `none`,
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Select Taluk"
                  />
                )}
                renderTags={(value, getTagProps) => {
                  const visibleTag = value.slice(0, 1);
                  const additionalCount = value.length - 1;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "nowrap",
                        gap: "1px",
                      }}
                    >
                      {visibleTag.map((option, index) => (
                        <Chip
                          label={option.label}
                          {...getTagProps({ index })}
                          sx={{
                            fontSize: "10px",
                            borderRadius: "12px",
                            whiteSpace: "nowrap",
                            overflow: "visible",
                            textOverflow: "clip",
                            backgroundColor: "#E2F2E5",
                          }}
                        />
                      ))}
                      {additionalCount > 0 && (
                        <Chip
                          label={`+${additionalCount}`}
                          onClick={() => {}}
                          sx={{
                            fontSize: "10px",
                            whiteSpace: "nowrap",
                            background: "#E2F2E5",
                            // padding: "2px 6px",
                            color: "#000",
                            cursor: "pointer",
                            "&:hover": {
                              background: "#E2F2E5",
                            },
                          }}
                        />
                      )}
                    </Box>
                  );
                }}
                renderOption={(props, option) => {
                  const isSelected = selectedTaluk.some(
                    (item) => item.label === option.label
                  );

                  return (
                    <li
                      {...props}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "#e2f2e5";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                      onClick={() => {
                        const updatedSelection = isSelected
                          ? selectedTaluk.filter(
                              (item) => item.label !== option.label
                            )
                          : [...selectedTaluk, option];

                        setClickedItem(isSelected ? null : option.label);
                        handleTalukChange(null, updatedSelection);
                      }}
                      style={{
                        backgroundColor: isSelected ? "#003809" : "transparent",
                        color: isSelected ? "white" : "black",
                        margin: "4px",
                        borderRadius: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography>{option.label}</Typography>
                        {isSelected && <CheckIcon sx={{ color: "white" }} />}
                      </Box>
                    </li>
                  );
                }}
              />
            </Grid>
          )}
          {selectedMetro === "Metro" && (
            <Grid item xs={2}>
              <Typography
                sx={{
                  fontSize: "12px",
                  mt: "2px",
                  marginBottom: "4px",
                  marginLeft: "5px",
                }}
              >
                Wards
              </Typography>
              <Autocomplete
                multiple
                limitTags={1}
                options={wardOptions}
                value={selectedWard}
                onChange={handleWardChange}
                disableCloseOnSelect
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "0px",
                    borderRadius: "8px",
                    border: `1.8px solid ${SelectAutoCompleteBorderColor}`,
                    height: "40px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: `none`,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: `none`,
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Select wards"
                  />
                )}
                renderTags={(value, getTagProps) => {
                  const visibleTag = value.slice(0, 1);
                  const additionalCount = value.length - 1;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "nowrap",
                        gap: "4px",
                      }}
                    >
                      {visibleTag.map((option, index) => (
                        <Chip
                          label={option.label}
                          {...getTagProps({ index })}
                          sx={{
                            fontSize: "10px",
                            borderRadius: "12px",
                            whiteSpace: "nowrap",
                            overflow: "visible",
                            textOverflow: "clip",
                            backgroundColor: "#E2F2E5",
                          }}
                        />
                      ))}
                      {additionalCount > 0 && (
                        <Chip
                          label={`+${additionalCount}`}
                          onClick={() => {}}
                          sx={{
                            whiteSpace: "nowrap",
                            backgroundColor: "#E2F2E5",
                            color: "#000",
                            cursor: "pointer",
                            fontSize: "10px",
                            "&:hover": {
                              background: "#E2F2E5",
                            },
                          }}
                        />
                      )}
                    </Box>
                  );
                }}
                renderOption={(props, option) => {
                  const isSelected = selectedWard.some(
                    (item) => item.label === option.label
                  );

                  return (
                    <li
                      {...props}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "#e2f2e5";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                      onClick={() => {
                        const updatedSelection = isSelected
                          ? selectedWard.filter(
                              (item) => item.label !== option.label
                            )
                          : [...selectedWard, option];

                        setClickedItem(isSelected ? null : option.label);
                        handleWardChange(null, updatedSelection);
                      }}
                      style={{
                        backgroundColor: isSelected ? "#003809" : "transparent",
                        color: isSelected ? "white" : "black",
                        // padding: "8px",
                        borderRadius: "8px",
                        // marginBottom: "1px",
                        margin: "4px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography>{option.label}</Typography>
                        {isSelected && (
                          <CheckIcon
                            sx={{ color: "white", fontSize: "18px" }}
                          />
                        )}
                      </Box>
                    </li>
                  );
                }}
              />
            </Grid>
          )}

          <Grid item xs={2} sx={{ ml: 1.4 }}>
            <Box
              display="flex"
              gap={1}
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <CustomButton
                buttonText="Clear All"
                buttonStyles={{
                  ...ClearAllButtonStyles,
                  width: "100%",
                }}
              />
              <CustomButton
                buttonText="Apply Filter"
                buttonStyles={{
                  ...ApplyFilterButtonStyles,
                  width: "100%",
                }}
                onClick={handleApplyFilter}
              />
            </Box>
          </Grid>
        </Grid>
        {clickedOverview && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              mt: 1,
            }}
          >
            <Grid container spacing={3} sx={{ width: "100%" }}>
              <Grid item xs={6}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between", // Ensure proper spacing
                      alignItems: "center", // Vertical alignment
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Overview
                    </Typography>
                    <Button
                      onClick={toggleDrawer(true)}
                      variant="contained"
                      sx={{
                        fontSize: "12px",
                        height: "30px",
                        padding: "10px",
                        backgroundColor: "white",
                        color: "black",
                        textTransform: "none",
                        borderRadius: "8px",
                        border: "1px solid black",
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#003809",
                        },
                      }}
                    >
                      View Summary
                    </Button>
                  </Box>
                  <Box sx={{ mt: 2.5 }}>
                    <DataGrid
                      rows={filteredRows}
                      columns={columns}
                      disableColumnMenu
                      hideFooter
                      onCellClick={handleCellClick}
                      sx={{
                        borderRadius: "12px",
                        "& .MuiDataGrid-columnSeparator": {
                          display: "none",
                        },
                        "& .MuiDataGrid-cell": {
                          display: "flex",
                          alignItems: "center",
                          borderRight: "1px solid #cdd0d7 !important",
                          // borderBottom: "1px solid #ddd",
                          padding: "12px",
                        },
                        "& .MuiDataGrid-columnHeader": {
                          borderRight: "1px solid #cdd0d7 !important",
                          // borderBottom: "1px solid #ddd",
                          padding: "12px",
                        },
                        "& .MuiDataGrid-columnHeader:nth-child(7)": {
                          /* Update the number based on the column count */
                          borderRight: "none !important",
                        },
                        "& .MuiDataGrid-row": {
                          cursor: "pointer",
                        },
                        "& .MuiDataGrid-cell.Mui-focused": {
                          outline: "none",
                        },
                        "& .MuiDataGrid-cell:focus": {
                          outline: "none",
                        },
                        "& .MuiDataGrid-cell.Mui-selected": {
                          backgroundColor: "transparent",
                        },
                        "& .MuiDataGrid-columnHeader.Mui-focused": {
                          outline: "none",
                        },
                        "& .MuiDataGrid-columnHeader:focus": {
                          outline: "none",
                        },
                        "& .MuiDataGrid-columnHeader.Mui-selected": {
                          backgroundColor: "transparent",
                        },
                        "& .MuiDataGrid-cell:last-of-type": {
                          borderRight: "none !important",
                        },

                        // "& .MuiDataGrid-root": {
                        //   border: "1px solid #ddd",
                        //   borderCollapse: "collapse",
                        // },
                        "& .MuiDataGrid-virtualScroller": {
                          // borderTop: "1px solid #ddd",
                        },
                        "& .MuiDataGrid-row:nth-of-type(odd)": {
                          backgroundColor: "#f5f5f5",
                          "&:hover": {
                            backgroundColor: "#d8d8d8",
                          },
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 2, height: "400px", width: "100%" }}>
                    <NewTamilNaduMap
                      wardData={wardDataForMap || []}
                      latLongPoints={wardDataPoint}
                      simplifiedWardData={
                        wardDataForMap
                          ? [
                              {
                                color_code:
                                  wardDataForMap[0]?.color_code || "#000000",
                                ward_no: wardDataForMap[0]?.ward_no || "0",
                                taluk_no: wardDataForMap[0]?.taluk_no || "0",

                                boundaries:
                                  wardDataForMap[0]?.coordinates || [],
                                district_name:
                                  wardDataForMap[0]?.district_name || "",
                              },
                            ]
                          : []
                      }
                      setWardNoo={wardDataNo}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  {clicked && specificRangeData && (
                    <AnotherDataGrid
                      setWardPoints={setWardDataPoint}
                      wardDatas={specificRangeData}
                      setWardNo={setWardDataNo}
                      selectedMetroType={selectedMetro} // Pass the selected metro type
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 400 },
        }}
      >
        <Box p={2} sx={{ position: "relative", height: "100%" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              Summary
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ background: "#043b0d", borderRadius: "8px" }}>
                <Tooltip title="Download" arrow>
                  <IconButton>
                    <DownloadIcon
                      sx={{ color: "white", width: "15px", height: "15px" }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="body1">
            Region:{" "}
            <Typography component="span" color="#043b0d">
              {summaryData.district_name || "No Data"}
            </Typography>
          </Typography>
{/* .. */}
          <Box mt={2}>
          <Box mt={2}>
  <Box
    p={2}
    mb={2}
    borderRadius={2}
    sx={{
      background: "linear-gradient(to right, #11998e, #35e87e)",
      color: "#fff",
    }}
  >
    <Typography variant="subtitle2">
      {selectedMetro === "Metro" ? "Total No. of Wards" : "Total No. of Taluks"}
    </Typography>
    <Typography variant="h4" fontWeight="bold">
      {summaryData.no_of_wards || "No Data"}
    </Typography>
  </Box>
</Box>


            <Box
              p={2}
              mb={2}
              borderRadius={2}
              sx={{
                background: "linear-gradient(to right, #4669dd, #b06ab3)",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle2">No. of CK Outlets</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summaryData.ck_outlet_count || "No Data"}
              </Typography>
            </Box>

            <Box
              p={2}
              mb={2}
              borderRadius={2}
              sx={{
                background: "linear-gradient(to right, #ff8008, #ffc334)",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle2">
                No. of Universal Outlets
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {summaryData.no_of_universal_outlet || "No Data"}
              </Typography>
            </Box>
            <Box
              p={2}
              borderRadius={2}
              sx={{
                background: "linear-gradient(to right, #834d9b, #cd4fd4)",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle2">Population</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summaryData.population_count || "No Data"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default LocationComponent;
