import { styled } from "@mui/material/styles";

export const ListboxComponent = styled("ul")(({ theme }) => ({
  // "& .select-buttons": {
  //   display: "flex",
  //   justifyContent: "center",
  //   top: 0,
  //   backgroundColor: theme.palette.background.paper,
  //   position: "sticky",
  //   bottom: 0,
  //   zIndex: 1,
  //   padding: "10px",
  // },
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
