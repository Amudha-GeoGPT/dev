import React from "react";
import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import { LabelColor } from "../styles/fontcolor.const";

interface SelectComponentProps {
  label: string;
  options: string[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  sx?: React.CSSProperties;
}

const CustomSelect: React.FC<SelectComponentProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  sx,
}) => {
  return (
    <FormControl fullWidth variant="outlined">
      <FormLabel
        sx={{
          color: LabelColor,
          "&.Mui-focused": {
            color: LabelColor,
          },
        }}
      >
        {label}
      </FormLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        sx={{
          ...sx,
          "&.MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
          },
        }}
        renderValue={(selected) => {
          if (!selected)
            return <span style={{ color: "#a2a2a2" }}>{placeholder}</span>;
          // return <span style={{ color: SelectAutoCompletePlaceholderColor }}>{placeholder}</span>;

          return selected;
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
