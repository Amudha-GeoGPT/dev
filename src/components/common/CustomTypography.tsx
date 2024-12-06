import React from "react";
import { Typography } from "@mui/material";

interface CustomLabelProps {
  sx?: object;
  value?: string;
}

const CustomTypography: React.FC<CustomLabelProps> = ({ sx, value }) => {
  return (
    <Typography
      sx={{
        ...sx,
      }}
    >
      {value}
    </Typography>
  );
};

export default CustomTypography;
