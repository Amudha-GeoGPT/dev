import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GraphData from "./static-data/IndiaMapData";
import BarGraphData from "./static-data/GraphData";
import CustomButton from "./common/CustomButton";
import ExportIcon from "../assets/icons/ExportIcon.svg";
import { PrimaryText, SmallText } from "./styles/fontsize.const";
import TownDataGridData from "./static-data/TownDataGridData";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const buttonStyles = {
  fontSize: SmallText,
  height: "30px",
  padding: "14px",
  backgroundColor: "#001B04",
  color: "#FFFFFF",
  textTransform: "none" as "none",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#0A330A",
  },
  "& img": {
    width: "20px",
    height: "20px",
  },
};
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
      {value === index && <Box sx={{ marginTop: "20px" }}>{children}</Box>}
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

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTab-root": {
              fontSize: PrimaryText,
              minWidth: 280,
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

        <CustomButton
          buttonText="Export CSV"
          buttonStyles={buttonStyles}
          icon={<img src={ExportIcon} alt="Export Icon" />}
         
        />
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TownDataGridData />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BarGraphData />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GraphData />
      </CustomTabPanel>
    </Box>
  );
}
