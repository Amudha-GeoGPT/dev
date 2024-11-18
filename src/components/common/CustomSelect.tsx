import React from "react";
import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import {
  LabelColor,
  PlaceholderColor,
  SelectAutoCompleteBorderColor,
} from "../styles/color.const";
import { SecondayText, TertiaryText } from "../styles/fontsize.const";
import DoneIcon from "@mui/icons-material/Done";

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
          fontSize: SecondayText,
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
          borderRadius: "8px",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: `1.5px solid ${SelectAutoCompleteBorderColor}`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `1.5px solid ${SelectAutoCompleteBorderColor}`,
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: `1.5px solid ${SelectAutoCompleteBorderColor}`,
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
          <MenuItem
            key={index}
            value={option}
            onClick={() => {
              onChange(option);
            }}
          >
            {option}
            {option === value && <DoneIcon sx={{ marginLeft: "auto" }} />}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
