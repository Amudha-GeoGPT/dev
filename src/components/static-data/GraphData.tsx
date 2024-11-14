import React from "react";
import { Box } from "@mui/material";
import CustomBarChart from "../../components/common/CustomGraph";

const BarGraphData: React.FC = () => {
  const colors = ["#e2f2e5", "#baec36", "#001b04"];
  const yKeys = ["P1", "P2", "P3"];
  const data = [
    {
      city: "CHENNAI",
      P1: 250,
      P2: 450,
      P3: 700,
      state: "Gujarat",
      district: "Ahmedabad",
      msi: 1.3,
      totalPopulation: 1200000,
      households: 250000,
    },
    {
      city: "MIZORAM",
      P1: 250,
      P2: 450,
      P3: 700,
      state: "Gujarat",
      district: "Ahmedabad",
      msi: 1.3,
      totalPopulation: 1200000,
      households: 250000,
    },
    {
      city: "GUJARAT",
      P1: 250,
      P2: 450,
      P3: 700,
      state: "Gujarat",
      district: "Ahmedabad",
      msi: 1.3,
      totalPopulation: 1200000,
      households: 250000,
    },
    {
      city: "RAJASTHAN",
      P1: 250,
      P2: 450,
      P3: 700,
      state: "Gujarat",
      district: "Ahmedabad",
      msi: 1.3,
      totalPopulation: 1200000,
      households: 250000,
    },
    {
      city: "KARNAAKA",
      P1: 200,
      P2: 400,
      P3: 600,
      state: "Karnataka",
      district: "Bengaluru",
      msi: 1.2,
      totalPopulation: 1000000,
      households: 200000,
    },
    {
      city: "TAMILNADU",
      P1: 300,
      P2: 500,
      P3: 800,
      state: "Maharashtra",
      district: "Mumbai",
      msi: 1.5,
      totalPopulation: 1500000,
      households: 300000,
    },
    {
      city: "ASSAM",
      P1: 250,
      P2: 450,
      P3: 700,
      state: "Gujarat",
      district: "Ahmedabad",
      msi: 1.3,
      totalPopulation: 1200000,
      households: 250000,
    },
    {
      city: "KERALAM",
      P1: 200,
      P2: 400,
      P3: 600,
      state: "Karnataka",
      district: "Bengaluru",
      msi: 1.2,
      totalPopulation: 1000000,
      households: 200000,
    },
    {
      city: "KARNATAKA",
      P1: 300,
      P2: 500,
      P3: 800,
      state: "Maharashtra",
      district: "Mumbai",
      msi: 1.5,
      totalPopulation: 1500000,
      households: 300000,
    },
    {
      city: "KOLKATA",
      P1: 250,
      P2: 450,
      P3: 700,
      state: "Gujarat",
      district: "Ahmedabad",
      msi: 1.3,
      totalPopulation: 1200000,
      households: 250000,
    },
    {
      city: "MUMBAI",
      P1: 250,
      P2: 450,
      P3: 700,
      state: "Gujarat",
      district: "Ahmedabad",
      msi: 1.3,
      totalPopulation: 1200000,
      households: 250000,
    },
    {
      city: "PUNJAB",
      P1: 200,
      P2: 400,
      P3: 600,
      state: "Karnataka",
      district: "Bengaluru",
      msi: 1.2,
      totalPopulation: 1000000,
      households: 200000,
    },
    {
      city: "BIHAR",
      P1: 200,
      P2: 400,
      P3: 600,
      state: "Karnataka",
      district: "Bengaluru",
      msi: 1.2,
      totalPopulation: 1000000,
      households: 200000,
    },
    {
      city: "GUJARAT",
      P1: 200,
      P2: 400,
      P3: 600,
      state: "Karnataka",
      district: "Bengaluru",
      msi: 1.2,
      totalPopulation: 1000000,
      households: 200000,
    },
    {
      city: "JAMU & KASHMIR",
      P1: 200,
      P2: 400,
      P3: 600,
      state: "Karnataka",
      district: "Bengaluru",
      msi: 1.2,
      totalPopulation: 1000000,
      households: 200000,
    },
  ];
  const TooltipStyle = {
    backgroundColor: "#e2f2e5",
    border: "1px solid #011c05",
    padding: 1,
    borderRadius: 2,
  };
  const OverallBoxStyles = {
    padding: "8px",
    borderRadius: 2,
    border: "1px solid black",
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
  };
  const xAxisProps = {
    label: {
      value: "City's",
      position: "insideBottom",
      dy: 6,
      fontSize: 12,
      marginTop: 5,
    },
    tick: { fontSize: "9px" },
    interval: 0,
    axisLine: false,
    tickLine: false,
  };

  const yAxisProps = {
    label: {
      value: "MAS",
      angle: -90,
      position: "insideLeft",
      dy: 15,
      fontSize: 12,
    },
    axisLine: false,
    tickLine: false,
  };
  const legendProps = {
    iconType: "circle",
    iconSize: 8,
    formatter: (value: any) => (
      <span style={{ color: "#003500" }}>{value}</span>
    ),
    verticalAlign: "top",
    align: "right",
    wrapperStyle: { marginBottom: "10px" },
  };
  const tooltipInfoLable = [
    "state",
    "district",
    "msi",
    "totalPopulation",
    "households",
  ];
  const barProps = {
    stackId: "a",
    barSize: 30,
  };
  return (
    <Box sx={{ padding: 2 }}>
      <CustomBarChart
        data={data}
        xKey="city"
        yKeys={yKeys}
        colors={colors}
        TooltipStyle={TooltipStyle}
        OverallBoxStyles={OverallBoxStyles}
        tooltipInfoLable={tooltipInfoLable}
        xAxisProps={xAxisProps}
        yAxisProps={yAxisProps}
        legendProps={legendProps}
        barProps={barProps}
      />
    </Box>
  );
};

export default BarGraphData;
