import React from "react";
import { Radio, FormControlLabel } from "@mui/material";

interface CustomRadioButtonProps {
  sx?: object;
  value: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  sx,
  value,
  label,
  checked,
  onChange,
}) => {
  return (
    <FormControlLabel
      control={
        <Radio
          sx={{
            ...sx,
          }}
          value={value}
          checked={checked}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
};

export default CustomRadioButton;
