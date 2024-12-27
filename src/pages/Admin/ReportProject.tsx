import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import * as XLSX from "xlsx";
import { DataGrid } from "@mui/x-data-grid";

const DynamicApiDataGrid: React.FC = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    if (!apiUrl) {
      alert("Please enter a valid API URL");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(apiUrl);

      if (apiUrl.includes("jsonplaceholder.typicode.com")) {
        if (!response.data || !Array.isArray(response.data)) {
          alert("API response is not in the expected format");
          setLoading(false);
          return;
        }

        const responseData = response.data;

        const generatedColumns = Object.keys(responseData[0]).map((key) => ({
          field: key,
          headerName: key.replace(/([A-Z])/g, " $1").toUpperCase(),
          flex: 1,
          sortable: true,
          filterable: true,
        }));

        sessionStorage.setItem("apiData", JSON.stringify(responseData));
        setColumns(generatedColumns);
        setData(responseData);
      } else if (apiUrl.includes("dummyjson.com")) {
        if (!response.data || !Array.isArray(response.data.users)) {
          alert("API response is not in the expected format");
          setLoading(false);
          return;
        }

        const responseData = response.data.users;

        const generatedColumns = Object.keys(responseData[0]).map((key) => ({
          field: key,
          headerName: key.replace(/([A-Z])/g, " $1").toUpperCase(),
          flex: 1,
          sortable: true,
          filterable: true,
        }));

        sessionStorage.setItem("apiData", JSON.stringify(responseData));
        setColumns(generatedColumns);
        setData(responseData);
      } else if (apiUrl.includes("dummyapi.online")) {
        if (!response.data || !Array.isArray(response.data.data)) {
          alert("API response is not in the expected format");
          setLoading(false);
          return;
        }

        const responseData = response.data.data;

        const generatedColumns = Object.keys(responseData[0]).map((key) => ({
          field: key,
          headerName: key.replace(/([A-Z])/g, " $1").toUpperCase(),
          flex: 1,
          sortable: true,
          filterable: true,
        }));

        sessionStorage.setItem("apiData", JSON.stringify(responseData));
        setColumns(generatedColumns);
        setData(responseData);
      } else {
        alert("Unknown API format");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please check the API URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExcel = () => {
    const storedData = sessionStorage.getItem("apiData");

    if (storedData) {
      const dataForDownload = JSON.parse(storedData);

      const ws = XLSX.utils.json_to_sheet(dataForDownload);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");

      XLSX.writeFile(wb, "data.xlsx");
    } else {
      alert("No data available for download");
    }
  };

  return (
    <Box p={3} display="flex" flexDirection="column" gap={2}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="API URL"
          variant="outlined"
          fullWidth
          size="small"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="Enter API URL"
          sx={{ maxWidth: 400 }}
        />

        <Button
          variant="contained"
          onClick={handleFetchData}
          disabled={loading}
          size="small"
          sx={{ maxWidth: 200, textTransform: "none" }}
        >
          {loading ? "Loading..." : "Generate"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadExcel}
          disabled={data.length === 0}
          size="small"
          sx={{ maxWidth: 200, textTransform: "none" }}
        >
          Download as Excel
        </Button>
      </Box>

      {error && <Box color="red">{error}</Box>}

      {/* Conditionally render DataGrid after fetching data */}
      {data.length > 0 && (
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default DynamicApiDataGrid;
