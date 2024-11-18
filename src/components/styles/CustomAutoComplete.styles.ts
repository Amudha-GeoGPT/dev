import { styled } from "@mui/material/styles";

export const sharedButtonStyles = {
  flex: 1,
  textTransform: "none",
  borderColor: "black",
  color: "black",
  borderRadius: "6px",
  "&:hover": {
    borderColor: "black",
  },
};
export const SearchTextBoxStyles = {
  "& .MuiOutlinedInput-root": {
    height: "30px",
    "& input": {
      padding: "4px 14px",
    },
  },
};

export const ListboxComponent = styled("ul")(({ theme }) => ({
  "& .select-buttons": {
    display: "flex",
    justifyContent: "center",
    top: 0,
    backgroundColor: theme.palette.background.paper,
    position: "sticky",
    bottom: 0,
    zIndex: 1,
    padding: "10px",
  },
  "& .option": {
    display: "flex",
    alignItems: "center",
    padding: "4px 16px",
    cursor: "pointer",
    "&.selected": {
      backgroundColor: "#f0f0f0",
    },
  },
}));
