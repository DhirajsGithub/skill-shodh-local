import { Box, Typography } from "@mui/material";
import React from "react";

const FieldLayout = ({ name, children }) => {
  return (
    <Box
      sx={{ width: "100%", borderRadius: "10px", backgroundColor: "#212126" }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
        }}
      >
        <Typography>{name}</Typography>
      </Box>
      <Box sx={{ width: "100%", padding: "20px 30px" }}> {children}</Box>
    </Box>
  );
};

export default FieldLayout;
