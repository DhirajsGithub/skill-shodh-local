import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const CommonRow = ({ label, answer, isModal }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Typography
        sx={{
          fontSize: smallScreen ? "14px" : "16px",
          wordBreak: "break-word",
        }} // Changed to "break-word"
        variant="subtitle2"
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: smallScreen ? "16px" : "18px",
          wordBreak: "break-word",
        }} // Changed to "break-word"
        variant="body2"
      >
        {isModal
          ? answer
          : answer?.length > 300
          ? answer?.slice(0, 300) + "..."
          : answer}
      </Typography>
    </Box>
  );
};

export default CommonRow;
