import React from "react";
import WestIcon from "@mui/icons-material/West";
import { Box, Typography } from "@mui/material";

const CommonMobileLayout = ({ name, subname, children, handleBackClick }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: "10px",

          alignItems: "center",
        }}
      >
        <WestIcon
          onClick={handleBackClick}
          sx={{ color: "#fff", width: "25px", height: "25px" }}
        />
        <Typography
          sx={{ fontSize: "20px !important", fontWeight: "700" }}
          variant="body1"
        >
          {name}
        </Typography>
      </Box>
      <Box sx={{ margin: "30px 0px" }}>
        <Typography sx={{ fontSize: "16px !important" }} variant="body1">
          {subname}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default CommonMobileLayout;
