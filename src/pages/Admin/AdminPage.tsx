import {
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogActions,
  DialogContent,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomTextfield from "../../components/common/CustomTextfield";
import CustomButton from "../../components/common/CustomButton";
import { buttonStyles, textFieldStyle } from "./AdminPage.style";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PrimaryText } from "../../components/styles/fontsize.const";

const AdminPage = () => {
  const [role, setRole] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [columnName, setColumnName] = useState<string>("");
  const [filterSortOption, setFilterSortOption] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [reportName, setReportName] = useState<string>("");
  const [gridData, setGridData] = useState<any[]>([]);

  const handleColumnNameChange = (values: string[]) => {
    const columnsThatRequireDialog = [
      "name",
      "assignee",
      "completionPercentage",
      "endDate",
      "startDate",
      "subtask",
      "task",
      "teamLead",
    ];
  
    // Check if any newly selected value requires opening the dialog
    const requiresDialog = values.some((value) =>
      columnsThatRequireDialog.includes(value)
    );
  
    if (requiresDialog) {
      setOpenDialog(true);
    }
  };
  

  const handleRoleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    setRole(newValue);
  };

  const handleFilterSortChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterSortOption(event.target.value);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleGenerate = async () => {
    const payload = {
      role_id: role,
      reportName: reportName,
      columnName: [
        {
          columnName: columnName,
          sort: filterSortOption === "sort" ? "true" : "false",
          filter: filterSortOption === "filter" ? "true" : "false",
        },
      ],
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

      // Check for both "success" and the typo "sucess"
      if (data.message === "success" || data.message === "sucess") {
        setGridData(data.results);
      } else {
        console.error("Failed to fetch filtered data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

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

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID" },
    { field: "role_id", headerName: "Role" },
    { field: "name", headerName: "Name", width: 130 },
    { field: "task", headerName: "Task", width: 130 },
    { field: "subtask", headerName: "Subtask", width: 180 },
    { field: "assignee", headerName: "Assignee", width: 130 },
    { field: "teamLead", headerName: "Team Lead" },
    { field: "completionPercentage", headerName: "Completion" },
    { field: "startDate", headerName: "Start Date", width: 170 },
    { field: "endDate", headerName: "End Date", width: 170 },
  ];

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <Autocomplete
          multiple
          id="multiple-limit-tags"
          options={roles}
          value={role}
          onChange={handleRoleChange}
          renderInput={(params) => (
            <TextField {...params} label="Role" placeholder="Select Role" />
          )}
          sx={{ marginTop: "4px", height: "39px" }}
        />
      </Grid>

      <Grid item xs={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Report Name
          </Typography>
          <CustomTextfield
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            placeholder="Enter Report Name"
            sx={{ ...textFieldStyle }}
            variant={"outlined"}
          />
        </Box>
      </Grid>
      <Grid item xs={3}>
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
    value={columnName ? columnName.split(",") : []} // Ensure value is an array
    onChange={(
      event: React.SyntheticEvent<Element, Event>,
      newValues: string[]
    ) => {
      const newValue = newValues.join(",");
      handleColumnNameChange(newValues); // Pass the updated array of selected values
      setColumnName(newValue); // Update the state
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Column Names"
        placeholder="Select Columns"
      />
    )}
    sx={{ marginTop: "4px", height: "39px" }}
  />
</Grid>


      <Grid item xs={3}>
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
            onClick={handleDialogClose}
          />
        </DialogActions>
      </Dialog>

      {/* DataGrid to display the filtered data */}
      <Grid item xs={12} sx={{ mt: 5 }}>
        <DataGrid
          rows={gridData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.ID}
          sx={{
            borderRadius: "10px",
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#001B04",
              color: "white",
              fontSize: "12px",
            },
            "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
              color: "white",
            },
            "& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon": {
              // display: "none",
            },
            "& .MuiDataGrid-columnHeader .MuiDataGrid-filterIcon": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon": {
              display: "none",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              // backgroundColor: "#F6F6F6",
            },
            "& .MuiCheckbox-root.Mui-checked": {
              color: "#7f56d9",
            },
            "& .MuiDataGrid-iconSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-cell": {
              fontSize: PrimaryText,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AdminPage;
