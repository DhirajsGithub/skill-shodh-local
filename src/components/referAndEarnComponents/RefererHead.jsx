import { Box, Typography } from "@mui/material";
import React from "react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";

const RefererHead = ({ handleRefreshClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        {/* <ArrowCircleLeftRoundedIcon sx={{ fontSize: 18, color: "#fff" }} /> */}
        <Typography variant="h4" color="white">
          Referral Page
        </Typography>
      </Box>
      <Box
        onClick={handleRefreshClick}
        sx={{ display: "flex", gap: "10px", cursor: "pointer" }}
      >
        <Typography sx={{ color: "#5773FF" }} variant="body1">
          Refresh
        </Typography>
        <CachedRoundedIcon sx={{ fontSize: 18, color: "#5773FF" }} />
      </Box>
    </Box>
  );
};

export default RefererHead;
