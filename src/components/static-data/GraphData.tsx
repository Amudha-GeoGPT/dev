import React from "react";
import { Box } from "@mui/material";
import CustomBarChart from "../../components/common/CustomGraph";
import { GraphFontColor } from "../styles/color.const";
import { SmallText } from "../styles/fontsize.const";

const BarGraphData: React.FC = () => {
  const colors = ["#E2F2E5", "#BAEC36", "#001B04"];
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
  ];
  const TooltipStyle = {
    backgroundColor: "#e2f2e5",
    border: "1px solid #011c05",
    padding: 1,
    borderRadius: 2,
  };
  const OverallBoxStyles = {
    padding: "14px",
    borderRadius: 2,
    border: "1px solid #E4E7EC",
    backgroundColor: "#fff",
    width: "100%",
    height: "50vh",
  };
  const xAxisProps = {
    label: {
      value: "City's",
      position: "insideBottom",
      dy: 6,
      fontSize: SmallText,
      marginTop: 5,
      fill: GraphFontColor,
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
      dy: 35,
      fontSize: SmallText,
      fill: GraphFontColor,
    },
    axisLine: false,
    tickLine: false,
    domain: [0, 1000],
    ticks: [0, 200, 400, 600, 800, 1000],
    tick: {
      fontSize: SmallText,
      fill: GraphFontColor,
    },
  };
  const legendProps = {
    iconType: "circle",
    iconSize: 8,
    formatter: (value: any) => (
      <span
        style={{
          color: GraphFontColor,
          fontSize: SmallText,
        }}
      >
        {value}
      </span>
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
    <Box>
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
