import { Box, useMediaQuery } from "@mui/material";
import React from "react";

const Wrapper = ({ children }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: smallScreen && "0 20px",
      }}
    >
      <Box
        sx={{
          width: smallScreen ? "100%" : "50%",
          maxWidth: "650px",
          display: "flex",
          flexDirection: "column",
          gap: smallScreen ? "20px" : "30px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Wrapper;
