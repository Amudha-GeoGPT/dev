import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  buttonText: string;
  icon?: React.ReactNode;
  buttonStyles?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonText,
  buttonStyles,
  icon,
}) => {
  return (
    <Button variant="contained" sx={buttonStyles} startIcon={icon}>
      {buttonText}
    </Button>
  );
};

export default CustomButton;
