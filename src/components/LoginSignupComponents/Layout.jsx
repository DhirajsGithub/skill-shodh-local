import { Box, useMediaQuery } from "@mui/material";
import React from "react";

const Layout = ({ children }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        backgroundColor: "#212126",
        color: "#fff",
        display: "flex",
        gap: "60px",
        justifyContent: "center",
        alignItems: "center",
        padding: smallScreen ? "45px 20px" : "60px",
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
