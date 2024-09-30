import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const Layout = ({ children, name }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: "700" }}
        variant="subtitle1"
      >
        {name}
      </Typography>
      <Box
        sx={{
          borderRadius: "10px",
          padding: smallScreen ? "20px" : "20px 30px",
          backgroundColor: "#212126",
          marginTop: name && "20px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
