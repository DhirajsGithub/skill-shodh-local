import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import HeaderInput from "./HeaderInput";
import PrimaryButton from "../../Buttons/PrimaryButton";
import SortIcon from "@mui/icons-material/Sort";
import { useDispatch } from "react-redux";
import { toggleCollapse, toggleSidebar } from "../../../store";
import { useNavigate } from "react-router-dom";

const NoLoginHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const smallScreen = useMediaQuery("(max-width:768px)");
  const iconStyle = {
    width: smallScreen ? "20px" : "25px",
    height: smallScreen ? "20px" : "25px",
    color: "#fff",
    cursor: "pointer",
  };
  const handleSortIconClick = () => {
    dispatch(toggleCollapse(false)); // to make sure that the sidebar will be full width
    dispatch(toggleSidebar());
  };
  const handleSignInClick = () => {
    navigate("/login");
  };
  const handleJoinClick = () => {
    navigate("/signup");
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
      {smallScreen && (
        <Box>
          <SortIcon onClick={handleSortIconClick} sx={iconStyle} />
        </Box>
      )}
      <Box sx={{ minWidth: !smallScreen && "400px", flexGrow: 1 }}>
        <HeaderInput />
      </Box>

      <Box sx={{ display: "flex", gap: "16px" }}>
        {!smallScreen && (
          <Box sx={{ minWidth: !smallScreen && "120px" }}>
            <PrimaryButton handleOnClick={handleSignInClick} variant="outlined">
              Sign In
            </PrimaryButton>
          </Box>
        )}
        <Box sx={{ minWidth: !smallScreen && "120px" }}>
          <PrimaryButton handleOnClick={handleJoinClick}>Join</PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NoLoginHeader;
