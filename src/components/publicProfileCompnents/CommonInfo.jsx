import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const CommonInfo = ({ field, value }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Typography sx={{ fontWeight: 500 }} variant="body1">
        {field}
      </Typography>
      <Typography sx={{ fontWeight: 500, color: "#888" }} variant="body1">
        {value}
      </Typography>
    </Box>
  );
};

export default CommonInfo;
