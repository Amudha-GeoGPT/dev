import { SelectAutoCompleteBorderColor } from "../../components/styles/color.const";
import { SmallText } from "../../components/styles/fontsize.const";

export const textFieldStyle = {
    width: "100%",
    "& .MuiInputBase-root": {
      height: "39px",
      padding: "0 14px",
      border: "none",
      borderRadius: "8px",
    },
    "& .MuiOutlinedInput-root": {
      padding: "0",
      border: `1.5px solid ${SelectAutoCompleteBorderColor}`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      display: "none",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      display: "none",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      borderColor: "black",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
  };

  export const buttonStyles = {
    fontSize: SmallText,
    height: "45px",
    padding: "14px",
    backgroundColor: "#001B04",
    color: "#FFFFFF",
    textTransform: "none" as const,
    borderRadius: "4px",
    mt:2.5,
    "&:hover": {
      backgroundColor: "#0A330A",
    },
    "& img": {
      width: "20px",
      height: "20px",
    },
  };