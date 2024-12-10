import React from "react";
import { Box, TextField, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UserIcon from "../../assets/Icons/UserIcon.svg";
import NotificationIcon from "../../assets/Icons/NotificationIcon.svg";

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#001B04",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px",
      }}
    >
      <Typography variant="h6" sx={{ color: "white", fontSize: "20px" }}>
        Static MAS
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ marginRight: "15px" }}>
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: 4,
              // marginRight: "14px",
              "& .MuiOutlinedInput-root": {
                height: "30px",
                width: "200px",
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#E1E1E1",
            cursor: "pointer",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={NotificationIcon}
            alt="Notification Icon"
            style={{ width: "25px", height: "25px" }}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#E1E1E1",
            borderRadius: "50%",
            cursor: "pointer",
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={UserIcon}
            alt="User Icon"
            style={{ width: "25px", height: "25px" }}
          />
        </Box>
        <Box>
          <Typography sx={{ color: "white", fontSize: "14px" }}>
            Shobha SV
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
