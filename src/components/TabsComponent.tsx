import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DataGridData from "./static-data/DataGridData";
import GraphData from "./static-data/IndiaMapData";
import IndiaMapData from "./static-data/IndiaMapData";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            transform: "none",
            "& .MuiTab-root": {
              minWidth: 340,
              // padding: "12px 24px",
              backgroundColor: "transparent",
              textTransform: "none",
              color: "black",
              "&.Mui-selected": {
                color: "black",
                backgroundColor: "transparent",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "black",
            },
          }}
        >
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="Graph" {...a11yProps(1)} />
          <Tab label="Map" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* <DataGridData /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* <GraphData /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* <IndiaMapData /> */}
      </CustomTabPanel>
    </Box>
  );
}
