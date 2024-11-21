import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  buttonText: string;
  icon?: React.ReactNode;
  buttonStyles?: React.CSSProperties;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonText,
  buttonStyles,
  icon,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      sx={buttonStyles}
      startIcon={icon}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default CustomButton;
