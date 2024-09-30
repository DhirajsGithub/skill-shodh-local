import { Avatar, Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import HeaderInput from "./HeaderInput";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GradientButton from "../../Buttons/GradientButton";
import SortIcon from "@mui/icons-material/Sort";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalInfo,
  setTeamsModalInfo,
  toggleCollapse,
  toggleSidebar,
} from "../../../store";
import { Link, useNavigate } from "react-router-dom";
import defaultProfileImg from "../../../assets/defaultProfileImg.png";
import AddIcon from "@mui/icons-material/Add";

import referIcon from "../../../assets/navBar_icons/Refer.svg"
const Profile = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authSlice);

  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Link
      to={"/profile/" + user.username}
      tyle={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          border: "1px solid rgba(136, 136, 136, 0.20)",
          background: "#FFF",
          width: smallScreen ? "30px" : "41px",
          height: smallScreen ? "30px" : "41px",
          borderRadius: "50%",
          boxShadow: "0px 0px 34.9px 0px rgba(0, 0, 0, 0.10)",
          cursor: "pointer",
        }}
      >
        <Avatar
          sx={{ width: "100%", height: "100%", borderRadius: "50%" }}
          src={user.profile || defaultProfileImg}
          alt="User Profile Photo"
        />
      </Box>
    </Link>
  );
};

const LoginHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authSlice);

  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const handleSortIconClick = () => {
    dispatch(toggleCollapse(false)); // to make sure that the sidebar will be full width
    dispatch(toggleSidebar());
  };
  const handleNotificationClick = () => {
    dispatch(setModalInfo("notificationDrawer"));
  };
  const handleChatIconClick = () => {
    dispatch(setModalInfo("chatScreenDrawer"));
  };
  const iconStyle = {
    width: smallScreen ? "20px" : "25px",
    height: smallScreen ? "20px" : "25px",
    color: "#fff",
    cursor: "pointer",
  };
  return (
    <Box
      sx={{
        display: "flex",
        padding: smallScreen ? "20px" : "30px",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: smallScreen ? "20px" : "54px",
        borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
        backgroundColor: "#18181D",
        zIndex: 999,
      }}
    >
      <Box>
        {!smallScreen && (
          <Typography sx={{}} variant="h4">
            Hello, {user?.name_first}
          </Typography>
        )}
        {smallScreen && (
          <SortIcon onClick={handleSortIconClick} sx={iconStyle} />
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <HeaderInput />
      </Box>

      {!smallScreen && (
        <Link
          to="/refer&win"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <GradientButton
            handleButtonClick={() => {}}
            leftIcon={<Box component="img" src={referIcon} alt="SkillShodh Refer & Win Icon"/>}
          >
            Refere & Win
          </GradientButton>
        </Link>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: smallScreen ? "16px" : "20px",
        }}
      >
        <ChatIcon onClick={handleChatIconClick} sx={iconStyle} />
        <NotificationsIcon onClick={handleNotificationClick} sx={iconStyle} />
        <Profile />
      </Box>
    </Box>
  );
};

export default LoginHeader;
