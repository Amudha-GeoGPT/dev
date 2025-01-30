import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  LabelColor,
  SelectAutoCompleteBorderColor,
} from "../styles/color.const";
import { SecondayText } from "../styles/fontsize.const";
interface CustomSelectSearchProps {
  options: any;
  value?: any;
  onChange?: (value: any | null) => void;
  placeholder?: string;
  label?: string;
  sx?: object;
}

const CustomSelectSearch: React.FC<CustomSelectSearchProps> = ({
  options,
  sx,
  placeholder,
  value,
  label,
  onChange,
}) => {
  return (
    <FormControl fullWidth variant="outlined">
      {label ? (
        <FormLabel
          sx={{
            color: LabelColor,
            fontSize: SecondayText,
            marginBottom: "4px",
            marginLeft: "5px",
            "&.Mui-focused": {
              color: LabelColor,
            },
          }}
        >
          {label}
        </FormLabel>
      ) : null}
      <Autocomplete
        disablePortal
        options={options}
        value={value || ""}
        onChange={(_, newValue) => onChange?.(newValue || "")}
        sx={{
          ...sx,
          "& .MuiOutlinedInput-root": {
            padding: "0px",
            borderRadius: "8px",
            border: `1.8px solid ${SelectAutoCompleteBorderColor}`,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: `none`,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: `none`,
            },
          },
        }}
        renderOption={(props, option) => {
          const { key, ...restProps } = props;
          return (
            <li
              key={option.value}
              {...restProps}
              style={{
                backgroundColor: restProps["aria-selected"]
                  ? "lightblue"
                  : "white",
                color: restProps["aria-selected"] ? "black" : "inherit",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e2f2e5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = restProps[
                  "aria-selected"
                ]
                  ? "lightblue"
                  : "white")
              }
            >
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
      />
    </FormControl>
  );
};

export default CustomSelectSearch;
