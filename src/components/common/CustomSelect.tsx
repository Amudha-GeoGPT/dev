import React from "react";
import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import {
  LabelColor,
  PlaceholderColor,
  SelectAutoCompleteBorderColor,
} from "../styles/fontcolor.const";
import { TertiaryText } from "../styles/fontsize.const";

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
          fontSize: TertiaryText,
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

          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${SelectAutoCompleteBorderColor}`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${SelectAutoCompleteBorderColor}`,
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${SelectAutoCompleteBorderColor}`,
          },
        }}
        renderValue={(selected) => {
          if (!selected)
            return (
              <span style={{ color: PlaceholderColor }}>{placeholder}</span>
            );

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
