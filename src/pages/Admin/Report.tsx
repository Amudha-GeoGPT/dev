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
} from "@mui/material";
import * as XLSX from "xlsx";

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
    console.log("Exporting file as:", fileName);

    XLSX.writeFile(wb, fileName);
  };

  return (
    <>
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
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, fontWeight: "bold" }}
            >
              Roles
            </Typography>
            <List>
              <ListItemButton
                sx={{
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                }}
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
                  sx={{
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
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
                "&:hover": {
                  color: "primary.main",
                },
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
              sx={{
                minWidth: "100%",
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Report;
