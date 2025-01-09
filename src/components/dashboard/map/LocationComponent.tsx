/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomSelectSearch from "../../common/CustomSelectSearch";
import {
  Autocomplete,
  Box,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "../../common/CustomButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AnotherDataGrid from "./AnotherDataGrid";
import "leaflet/dist/leaflet.css";
import NewTamilNaduMap from "./NewTamilnaduMap";
import CheckIcon from "@mui/icons-material/Check";
import {
  metroOrNonMetro,
  stateData,
  taluk,
  verticalData,
  ward,
} from "./WardList";
import { SelectAutoCompleteBorderColor } from "../../styles/color.const";
import { useNewMapPages } from "./NewMapPages";
import { useState } from "react";
import CustomSelect from "../../common/CustomSelect";

const LocationComponent = () => {
  const {
    selectedVertical,
    selectedState,
    selectedMetro,
    clicked,
    clickedOverview,
    selectedMetropolitan,
    specificRangeData,
    wardDataForMap,
    rows,
    // selectedTaluk,
    selectedWard,
    handleMetropolitanChange,
    handleApplyFilter,
    handleCellClick,
    ApplyFilterButtonStyles,
    ClearAllButtonStyles,
    // handleTalukChange,
    handleWardChange,
    handleMetroChange,
    handleStateChange,
    handleVerticalChange,
  } = useNewMapPages();
  const [selectedTaluk, setSelectedTaluk] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const handleTalukChange = (
    _event: any,
    newValue: Array<{ label: string; value: string }>
  ) => {
    setSelectedTaluk(newValue);
  };

  const columns: GridColDef[] = [
    {
      field: "CKOutlets",
      headerName: "CK Outlets",
      flex: 2.5,
      renderCell: (params) => <Typography sx={{}}>{params.value}</Typography>,
      headerClassName: "headerCell",
      sortable: false,
    },
    {
      field: "col1",
      headerName: "<50",
      flex: 1.5,
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
      flex: 1.5,
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
      flex: 1.5,
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
      flex: 1.5,
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
      flex: 1.2,
      sortable: false,
      renderHeader: () => <span style={{ color: "green" }}>&gt;300</span>,

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
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={1} sx={{ p: 2 }}>
          <Grid item xs={1.5}>
            <CustomSelect
              label="Verticals"
              placeholder="Select Verticals"
              options={verticalData}
              value={selectedVertical}
              onChange={handleVerticalChange}
              sx={{ height: "40px" }}
            />
          </Grid>

          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="State"
              placeholder="Select State"
              options={stateData}
              value={selectedState}
              onChange={handleStateChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Metro/Non-Metro"
              placeholder="Select Metro/Non-Metro"
              options={metroOrNonMetro}
              value={selectedMetro}
              onChange={handleMetroChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomSelectSearch
              label="Metropolitan"
              placeholder="Select Metropolitan"
              options={[{ label: "Chennai", value: "Chennai" }]}
              value={selectedMetropolitan}
              onChange={handleMetropolitanChange}
            />
          </Grid>

          {selectedMetro === "Non-Metro" && (
            <>
              <Grid item xs={2.4}>
                <Typography sx={{ fontSize: "12px", mt: "2px" }}>
                  Taluk
                </Typography>
                <Autocomplete
                  multiple
                  limitTags={1}
                  options={taluk}
                  value={selectedTaluk}
                  onChange={handleTalukChange}
                  disableCloseOnSelect
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
                  // ListboxComponent={(props) => (
                  //   <>
                  //     <ListboxComponent {...props}>
                  //       {props.children}

                  //       <Box sx={{display:'flex',justifyContent:'space-around',p:0.3,borderTop:'1px solid black'}}>
                  //         <Button
                  //           variant="outlined"
                  //           sx={{ backgroundColor: "white", color: "black",border:'none' }}
                  //         >
                  //           Clear
                  //         </Button>
                  //         <Button
                  //           variant="outlined"
                  //           sx={{ backgroundColor: "black", color: "white",borderRadius:'10px' }}
                  //         >
                  //           Ok
                  //         </Button>
                  //       </Box>
                  //     </ListboxComponent>
                  //   </>
                  // )}
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
                              background: "#E2F2E5",
                              color: "#000",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </Box>
                    );
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography>{option.label}</Typography>
                        {selected && (
                          <CheckIcon
                            sx={{
                              color: "green",
                            }}
                          />
                        )}
                      </Box>
                    </li>
                  )}
                />
              </Grid>
            </>
          )}
          {selectedMetro === "Metro" && (
            <Grid item xs={2.4}>
              <Typography sx={{ fontSize: "12px", mt: "2px" }}>
                Wards
              </Typography>
              <Autocomplete
                multiple
                limitTags={1}
                options={ward}
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
                    // "& .MuiInputBase-input": {
                    //   fontSize: "12px", // Placeholder font size
                    // },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Select wards"
                    // InputProps={{
                    //   ...params.InputProps,
                    //   style: {
                    //     fontSize: "14px", // Placeholder font size
                    //   },
                    // }}
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
                            backgroundColor: "#f0f0f0",
                            color: "#000",
                            cursor: "pointer",
                            background: "#E2F2E5",
                          }}
                        />
                      )}
                    </Box>
                  );
                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography>{option.label}</Typography>
                      {selected && (
                        <CheckIcon
                          sx={{
                            color: "green",
                          }}
                        />
                      )}
                    </Box>
                  </li>
                )}
              />
            </Grid>
          )}
          <Grid item xs={1} sx={{ ml: 1 }}>
            <CustomButton
              buttonText="Clear All"
              buttonStyles={ClearAllButtonStyles}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CustomButton
              buttonText="Apply Filter"
              buttonStyles={ApplyFilterButtonStyles}
              onClick={handleApplyFilter}
            />
          </Grid>
        </Grid>
        {clickedOverview && (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Grid container spacing={3} sx={{ width: "100%" }}>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Overview
                  </Typography>
                  <Box sx={{ mt: 2.5 }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      disableColumnMenu
                      hideFooter
                      onCellClick={handleCellClick}
                      sx={{
                        "& .MuiDataGrid-columnSeparator": {
                          display: "none",
                        },
                        "& .MuiDataGrid-cell": {
                          display: "flex",
                          alignItems: "center",
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
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 2, height: "400px", width: "100%" }}>
                    <NewTamilNaduMap
                      wardData={wardDataForMap || []}
                      latLongPoints={
                        specificRangeData
                          ? specificRangeData.map(
                              (point: { latitude: any; longitude: any }) => ({
                                latitude: Number(point?.latitude || 0),
                                longitude: Number(point?.longitude || 0),
                              })
                            )
                          : []
                      }
                      simplifiedWardData={
                        wardDataForMap
                          ? [
                              {
                                color_code:
                                  wardDataForMap[0]?.color_code || "#000000",
                                ward_no: wardDataForMap[0]?.ward_no || "0",
                                boundaries:
                                  wardDataForMap[0]?.coordinates || [],
                              },
                            ]
                          : []
                      }
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ mt: 2 }}>
                  {clicked && specificRangeData && (
                    <AnotherDataGrid wardDatas={specificRangeData} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default LocationComponent;
