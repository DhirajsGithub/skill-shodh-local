import React from "react";
import LoginHeader from "./LoginHeader";
import NoLoginHeader from "./NoLoginHeader";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.authSlice);
  return (
    <Box sx={{ position: "sticky", top: "0%", zIndex: 99 }}>
      {isAuthenticated && <LoginHeader />}
      {!isAuthenticated && <NoLoginHeader />}
    </Box>
  );
};

export default Header;
