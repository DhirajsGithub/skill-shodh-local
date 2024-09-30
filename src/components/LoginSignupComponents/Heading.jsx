import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const Heading = ({ heading, subheading }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!smallScreen && <Typography variant="h3">{heading}</Typography>}
      {smallScreen && (
        <Box
          sx={{
            display: "inline-flex",
            padding: "10px 10px 5px 10px",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            borderBottom: "1px solid #5773FF",
          }}
        >
          <Typography variant="h3">{heading}</Typography>
        </Box>
      )}
      <Typography sx={{ textAlign: "center" }} variant="h6">
        {subheading}
      </Typography>
    </Box>
  );
};

export default Heading;
