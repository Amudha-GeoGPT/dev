import React, { useEffect, useState } from "react";
import {
  Grid,
  Autocomplete,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CustomButton from "../../components/common/CustomButton";
import { buttonStyles } from "./AdminPage.style";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [role, setRole] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [columnsData, setColumnsData] = useState<
    { columnName: string; sort: string; filter: string }[]
  >([]);
  const [filterSortOption, setFilterSortOption] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentColumn, setCurrentColumn] = useState<string | null>(null);
  const [reportName, setReportName] = useState<string>("");
  const [gridData, setGridData] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleColumnNameChange = (values: string[]) => {
    const dialogTriggerColumns = [
      "name",
      "assignee",
      "completionPercentage",
      "endDate",
      "role_id",
      "startDate",
      "subtask",
      "task",
      "teamLead",
    ];

    const updatedColumns = values.map((value) => {
      const existingColumn = columnsData.find(
        (col) => col.columnName === value
      );
      return (
        existingColumn || { columnName: value, sort: "false", filter: "false" }
      );
    });

    setColumnsData(updatedColumns);
    // sessionStorage.setItem("columnsNameData", JSON.stringify(updatedColumns));

    const newColumn = values.find(
      (value) => !columnsData.some((col) => col.columnName === value)
    );

    if (newColumn && dialogTriggerColumns.includes(newColumn)) {
      setCurrentColumn(newColumn);
      setOpenDialog(true);
    }
  };

  const handleRoleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    setRole(newValue);
    // sessionStorage.setItem("roleData", JSON.stringify(newValue));
  };

  const handleFilterSortChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterSortOption(event.target.value);
  };

  const applyFilterOrSort = () => {
    if (currentColumn) {
      setColumnsData((prevColumns) =>
        prevColumns.map((col) =>
          col.columnName === currentColumn
            ? {
                ...col,
                sort: filterSortOption === "sort" ? "true" : "false",
                filter: filterSortOption === "filter" ? "true" : "false",
              }
            : col
        )
      );
    }
    setFilterSortOption("");
    setCurrentColumn(null);
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setFilterSortOption("");
    setCurrentColumn(null);
    setOpenDialog(false);
  };

  const handleGenerate = async () => {
    const payload = {
      role_id: role,
      reportName: reportName,
      columnName: columnsData,
    };

    try {
      const response = await fetch("http://localhost:5000/api/getfiltered", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (data.message === "success" || data.message === "sucess") {
        sessionStorage.setItem("gridData", JSON.stringify(data.results));
        setGridData(data.results);
        navigate("/reportgrid", {
          state: {
            gridData: data.results,
            columnsData: columnsData,
            roles: role,
            reportName: reportName,
          },
        });
      } else {
        console.error("Failed to fetch filtered data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  console.log(gridData, "gridData");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/getroles");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        if (data.message === "sucess") {
          setRoles(data.results);
        } else {
          console.error("Failed to fetch roles:", data.message);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("gridData");
    sessionStorage.removeItem("columnsData");
  }, []);

  // useEffect(() => {
  //   const sessionData: any = sessionStorage.getItem("roleData");
  //   const parsedData = JSON.parse(sessionData);
  //   if (parsedData) {
  //     setRole(parsedData);
  //   }
  // }, [role]);

  // useEffect(() => {
  //   const sessionData = sessionStorage.getItem("columnsNameData");
  //   if (sessionData) {
  //     const parsedData = JSON.parse(sessionData);
  //     setColumnsData(parsedData);
  //   }
  // }, [columnsData]);
  return (
    <Grid container spacing={2} alignItems="center" sx={{ p: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Autocomplete
          multiple
          id="multiple-limit-tags"
          options={roles}
          value={role}
          onChange={handleRoleChange}
          renderInput={(params) => (
            <TextField {...params} label="Role" placeholder="Select Role" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          id="outlined-basic"
          label="Report Name"
          variant="outlined"
          fullWidth
          value={reportName}
          onChange={(e) => setReportName(e.target.value)}
        />{" "}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Autocomplete
          multiple
          id="column-name-multiple-autocomplete"
          options={[
            "name",
            "assignee",
            "completionPercentage",
            "endDate",
            "role_id",
            "startDate",
            "subtask",
            "task",
            "teamLead",
          ]}
          value={columnsData.map((col) => col.columnName)}
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValues: string[]
          ) => {
            handleColumnNameChange(newValues);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Column Names"
              placeholder="Select Columns"
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <CustomButton
          buttonText="Generate"
          buttonStyles={buttonStyles}
          icon={false}
          onClick={handleGenerate}
        />
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Option</FormLabel>
            <RadioGroup
              row
              value={filterSortOption}
              onChange={handleFilterSortChange}
            >
              <FormControlLabel
                value="filter"
                control={<Radio />}
                label="Filter"
              />
              <FormControlLabel value="sort" control={<Radio />} label="Sort" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <CustomButton
            buttonText="Cancel"
            buttonStyles={{ ...buttonStyles, backgroundColor: "#BDBDBD" }}
            onClick={handleDialogClose}
          />
          <CustomButton
            buttonText="Apply"
            buttonStyles={buttonStyles}
            onClick={applyFilterOrSort}
          />
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AdminPage;
