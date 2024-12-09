import React, { useState } from "react";
import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import {
  LabelColor,
  PlaceholderColor,
  SelectAutoCompleteBorderColor,
} from "../styles/color.const";
import { SecondayText } from "../styles/fontsize.const";
import DoneIcon from "@mui/icons-material/Done";
 
interface SelectComponentProps {
  label?: string | boolean;
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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
 
  return (
    <FormControl fullWidth variant="outlined">
      {(typeof label === "string" && label) || false ? (
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
      ) : null}
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        open={isDropdownOpen}
        onOpen={() => {
          setDropdownOpen(true);
          onChange("");
        }}
        onClose={() => setDropdownOpen(false)}
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
              <span style={{ color: PlaceholderColor, fontSize: SecondayText }}>
                {placeholder}
              </span>
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
              setDropdownOpen(false);
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
 
 