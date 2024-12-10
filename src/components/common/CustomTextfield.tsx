import { TextField, OutlinedTextFieldProps } from "@mui/material";
import React from "react";
 
interface CustomTextfieldProps extends OutlinedTextFieldProps {
  sx?: object;
  placeholder?: string;
}
 
const CustomTextfield: React.FC<CustomTextfieldProps> = ({
  sx,
  placeholder,
  ...props
}) => {
  return (
    <TextField
      placeholder={placeholder}
      sx={{
        ...sx,
      }}
      {...props}
    />
  );
};
 
export default CustomTextfield;
 
 