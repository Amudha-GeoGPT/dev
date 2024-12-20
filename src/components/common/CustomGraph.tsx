/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Box, Typography } from "@mui/material";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { PrimaryText } from "../styles/fontsize.const";

interface CustomBarChartProps {
  data: Array<{
    [key: string]: number | string;
    state: string;
    district: string;
    msi: number;
    totalPopulation: number;
    households: number;
  }>;
  xKey: string;
  yKeys: string[];
  colors: string[];
  TooltipStyle?: React.CSSProperties;
  OverallBoxStyles?: React.CSSProperties;
  tooltipInfoLable?: string[];
  xAxisProps?: object;
  yAxisProps?: object;
  legendProps?: object;
  barProps?: object;
}

const CustomTooltip: React.FC<
  TooltipProps<ValueType, NameType> & {
    TooltipStyle?: React.CSSProperties;
    tooltipInfoLable?: string[];
  }
> = ({ active, payload, TooltipStyle, tooltipInfoLable }) => {
  if (active && payload && payload.length) {
    const { payload: data } = payload[0];
    return (
      <Box sx={TooltipStyle}>
        {tooltipInfoLable?.map((key: any) => (
          <Typography
            sx={{ fontSize: PrimaryText }}
            key={key}
          >{`${key}: ${data[key]}`}</Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const CustomBarChart: React.FC<CustomBarChartProps> = ({
  data,
  xKey,
  yKeys,
  colors,
  OverallBoxStyles,
  tooltipInfoLable,
  TooltipStyle,
  xAxisProps,
  yAxisProps,
  legendProps,
  barProps,
}) => {
  return (
    <Box sx={OverallBoxStyles}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{
            top: 10, // Adjust top margin if needed
            right: 10,
            left: 10,
            bottom: 40, // Add space below the X-axis
          }}>
          {/* <ReferenceLine y={0} stroke="transparent" /> */}
          <CartesianGrid vertical={false} stroke="#E4E7EC" />

          <XAxis dataKey={xKey} {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip
            content={
              <CustomTooltip
                TooltipStyle={TooltipStyle}
                tooltipInfoLable={tooltipInfoLable}
              />
            }
          />
          <Legend {...legendProps} />

          {yKeys.map((key, index) => (
            <Bar
              {...barProps}
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              radius={index === yKeys.length - 1 ? [8, 8, 0, 0] : [0, 0, 0, 0]}
            />
          ))}
          
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CustomBarChart;
