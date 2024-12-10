import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Collapse,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "../../assets/Icons/HomeIcon.svg";
import StaticMasIcon from "../../assets/Icons/StaticMasIcon.svg";
import OutletPlanningIcon from "../../assets/Icons/OutletPlanningIcon.svg";
import UserGuideIcon from "../../assets/Icons/UserGuideIcon.svg";
import StateIcon from "../../assets/Icons/StateIcon.svg";
import RuralIcon from "../../assets/Icons/RuralIcon.svg";
import UrbanIcon from "../../assets/Icons/UrbanIcon.svg";
import OverallIcon from "../../assets/Icons/UserGuideIcon.svg";
import DistrictIcon from "../../assets/Icons/DistrictIcon.svg";
import TownIcon from "../../assets/Icons/TownIcon.svg";
import SubdistrictruralIcon from "../../assets/Icons/SubdistrictruralIcon.svg";

const Sidebar: React.FC = () => {
  const [openStaticMas, setOpenStaticMas] = useState(false);

  const handleStaticMasClick = () => {
    setOpenStaticMas((prev) => !prev);
  };
  const [openState, setOpenState] = useState(false);

  const handleStateClick = () => {
    setOpenState((prev) => !prev);
  };
  const [openDistrict, setopenDistrict] = useState(false);

  const handleDistrictClick = () => {
    setopenDistrict((prev) => !prev);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#011A09",
        color: "white",
        paddingY: 2,
        paddingX: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 4,
          gap: "12px",
        }}
      >
        <img
          src={HomeIcon}
          alt="Home Icon"
          style={{ width: "25px", height: "25px" }}
        />
        <Typography
          variant="h6"
          sx={{ color: "white", fontSize: "16px", fontWeight: "600" }}
        >
          GEO GPT
        </Typography>
      </Box>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <img
              src={StaticMasIcon}
              alt="Notification Icon"
              style={{ width: "25px", height: "25px" }}
            />
          </ListItemIcon>
          <ListItemText primary="Static MAS" onClick={handleStaticMasClick} />
          {openStaticMas ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={openStaticMas} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
            <ListItemButton>
              <ListItemIcon>
                <img
                  src={StateIcon}
                  alt="Notification Icon"
                  style={{ width: "29px", height: "29px" }}
                />
              </ListItemIcon>
              <ListItemText primary="State" onClick={handleStateClick} />
              {openState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={openState} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={OverallIcon}
                      alt="Notification Icon"
                      style={{ width: "29px", height: "29px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Overall" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={UrbanIcon}
                      alt="Notification Icon"
                      style={{ width: "29px", height: "29px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Urban" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={RuralIcon}
                      alt="Notification Icon"
                      style={{ width: "29px", height: "29px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Rural" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton>
              <ListItemIcon>
                <img
                  src={DistrictIcon}
                  alt="Notification Icon"
                  style={{ width: "29px", height: "29px" }}
                />
              </ListItemIcon>
              <ListItemText primary="District" onClick={handleDistrictClick} />
              {openDistrict ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={openDistrict} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={OverallIcon}
                      alt="Notification Icon"
                      style={{ width: "29px", height: "29px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Overall" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={UrbanIcon}
                      alt="Notification Icon"
                      style={{ width: "29px", height: "29px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Urban" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={RuralIcon}
                      alt="Notification Icon"
                      style={{ width: "29px", height: "29px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Rural" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton>
              <ListItemIcon>
                <img
                  src={TownIcon}
                  alt="Notification Icon"
                  style={{ width: "29px", height: "29px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Town" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <img
                  src={SubdistrictruralIcon}
                  alt="Notification Icon"
                  style={{ width: "29px", height: "29px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Sub District Rural" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <img
              src={OutletPlanningIcon}
              alt="Notification Icon"
              style={{ width: "29px", height: "29px" }}
            />
          </ListItemIcon>
          <ListItemText primary="Outlet Planning" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <img
              src={UserGuideIcon}
              alt="Notification Icon"
              style={{ width: "25px", height: "25px" }}
            />
          </ListItemIcon>
          <ListItemText primary="User Guide" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
