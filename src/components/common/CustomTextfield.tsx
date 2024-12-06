import { TextField } from "@mui/material";
import React from "react";

interface CustomTextfieldProps {
  sx?: object;
  placeholder?: any;
}

const CustomTextfield: React.FC<CustomTextfieldProps> = ({
  sx,
  placeholder,
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      sx={{
        ...sx,
      }}
      {...props}
    />
  );
};

export default CustomTextfield;
