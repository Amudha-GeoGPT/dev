import React, { useCallback, useMemo, useState } from "react";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  Typography,
  Button,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import * as XLSX from "xlsx";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Recharts for Pie Chart

interface ColumnData {
  columnName: string;
  sort: string;
  filter: string;
}

interface ReportProps {}

const Report: React.FC<ReportProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const gridData = location.state?.gridData || [];
  const locationRoles = location.state?.roles || [];
  const locationColumnsData: ColumnData[] = location.state?.columnsData || [];
  const reportName = location.state?.reportName;
  const [selectedRole, setSelectedRole] = useState<string | null>(
    "All Records"
  );
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [sortModel, setSortModel] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("report");

  const filteredData = useMemo(() => {
    if (selectedRole === "All Records") {
      return gridData;
    }
    return gridData.filter((row: any) => row.role_id === selectedRole);
  }, [selectedRole, gridData]);

  const handleFilterChange = useCallback((model: GridFilterModel) => {
    setFilterModel(model);
  }, []);

  const handleSortModelChange = useCallback((model: any[]) => {
    setSortModel(model);
  }, []);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "role_id",
        headerName: "Role",
        sortable: locationColumnsData.some(
          (col) => col.columnName === "role_id" && col.sort === "true"
        ),
        filterable: locationColumnsData.some(
          (col) => col.columnName === "role_id" && col.filter === "true"
        ),
      },
      {
        field: "name",
        headerName: "Name",
        width: 130,
        sortable: locationColumnsData.some(
          (col) => col.columnName === "name" && col.sort === "true"
        ),
        filterable: locationColumnsData.some(
          (col) => col.columnName === "name" && col.filter === "true"
        ),
      },
      {
        field: "task",
        headerName: "Task",
        width: 130,
        sortable: locationColumnsData.some(
          (col) => col.columnName === "task" && col.sort === "true"
        ),
        filterable: locationColumnsData.some(
          (col) => col.columnName === "task" && col.filter === "true"
        ),
      },
      {
        field: "subtask",
        headerName: "Subtask",
        width: 180,
        sortable: locationColumnsData.some(
          (col) => col.columnName === "subtask" && col.sort === "true"
        ),
        filterable: locationColumnsData.some(
          (col) => col.columnName === "subtask" && col.filter === "true"
        ),
      },
      {
        field: "assignee",
        headerName: "Assignee",
        width: 130,
        sortable: locationColumnsData.some(
          (col) => col.columnName === "assignee" && col.sort === "true"
        ),
        filterable: locationColumnsData.some(
          (col) => col.columnName === "assignee" && col.filter === "true"
        ),
      },
      {
        field: "teamLead",
        headerName: "Team Lead",
        sortable: locationColumnsData.some(
          (col) => col.columnName === "teamLead" && col.sort === "true"
        ),
        filterable: locationColumnsData.some(
          (col) => col.columnName === "teamLead" && col.filter === "true"
        ),
      },
      {
        field: "completionPercentage",
        headerName: "Completion",
        sortable: locationColumnsData.some(
          (col) =>
            col.columnName === "completionPercentage" && col.sort === "true"
        ),
        filterable: locationColumnsData.some(
          (col) =>
            col.columnName === "completionPercentage" && col.filter === "true"
        ),
      },
      {
        field: "startDate",
        headerName: "Start Date",
        width: 180,
        sortable: locationColumnsData.some(
          (col) => col.columnName === "startDate" && col.sort === "true"
        ),
        filterable: locationColumnsData.some(
          (col) => col.columnName === "startDate" && col.filter === "true"
        ),
      },
      {
        field: "endDate",
        headerName: "End Date",
        width: 180,
        sortable: locationColumnsData.some(
          (col) => col.columnName === "endDate" && col.sort === "true"
        ),
        filterable: locationColumnsData.some(
          (col) => col.columnName === "endDate" && col.filter === "true"
        ),
      },
    ],
    [locationColumnsData]
  );

  const handleDownload = () => {
    const finalFilteredData = filteredData.filter((row: any) => {
      return filterModel.items.every((filter) => {
        const value = row[filter.field];
        if (filter.operator === "contains") {
          return value
            ?.toString()
            .toLowerCase()
            .includes(filter.value?.toLowerCase());
        }
        if (filter.operator === "equals") {
          return value?.toString() === filter.value;
        }
        return true;
      });
    });

    const sortedData = finalFilteredData.sort((a: any, b: any) => {
      return sortModel.reduce((acc: any, sort: any) => {
        const { field, sort: sortOrder } = sort;
        if (acc !== 0) return acc;

        const valueA = a[field];
        const valueB = b[field];

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }, 0);
    });

    const ws = XLSX.utils.json_to_sheet(sortedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    const fileName = reportName ? `${reportName}.xlsx` : "Report.xlsx";
    XLSX.writeFile(wb, fileName);
  };

  // Prepare Pie Chart Data from selected columns
  const pieChartData = selectedColumns.map((colName) => {
    const count = filteredData.reduce((acc: number, row: any) => {
      return acc + (row[colName] ? 1 : 0);
    }, 0);
    return { name: colName, value: count };
  });

  return (
    <Box display="flex">
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#f4f4f4",
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
            Roles
          </Typography>
          <List>
            <ListItemButton
              onClick={() => {
                setSelectedRole("All Records");
                setFilterModel({ items: [] });
              }}
            >
              <Typography variant="body1">All Records</Typography>
            </ListItemButton>
            {locationRoles.map((role: string, index: number) => (
              <ListItemButton
                key={index}
                onClick={() => {
                  setSelectedRole(role);
                  setFilterModel({ items: [] });
                }}
              >
                <Typography variant="body1">{role}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, overflowX: "hidden" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <ArrowBackIcon
            sx={{
              cursor: "pointer",
              marginBottom: 2,
              "&:hover": { color: "primary.main" },
            }}
            onClick={() => navigate(-1)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            sx={{ marginTop: 2 }}
          >
            Download
          </Button>
        </Box>

        {/* Tab Switch */}
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          aria-label="Report or Graph tabs"
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Report" value="report" />
          <Tab label="Graph" value="graph" />
        </Tabs>

        {/* Conditional Rendering Based on Selected Tab */}
        {selectedTab === "report" && (
          <Box
            sx={{
              width: "100%",
              overflow: "auto",
              backgroundColor: "#fff",
              boxShadow: 2,
              borderRadius: "8px",
              padding: 1.5,
            }}
          >
            <DataGrid
              rows={filteredData}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={5}
              filterModel={filterModel}
              onFilterModelChange={handleFilterChange}
              sortModel={sortModel}
              onSortModelChange={handleSortModelChange}
              sx={{ minWidth: "100%" }}
            />
          </Box>
        )}

        {selectedTab === "graph" && (
          <>
            <Box
              sx={{ marginTop: 3, padding: 2, borderRadius: 2, boxShadow: 1 }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, marginBottom: 2 }}
              >
                Graph
              </Typography>

              <Autocomplete
                multiple
                id="column-name-multiple-autocomplete"
                options={locationColumnsData.map((col) => col.columnName)}
                value={selectedColumns}
                onChange={(_, newValue) => setSelectedColumns(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Columns"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                )}
                disableCloseOnSelect
              />
            </Box>

            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                justifyContent: "center",
                padding: 1,
                backgroundColor: "#f4f6f8",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <PieChart width={350} height={350}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`#${Math.floor(Math.random() * 16777215).toString(
                        16
                      )}`}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Report;
