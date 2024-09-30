import { Box, Typography } from "@mui/material";
import React from "react";
import DividerWithText from "./DividerWithText";

const DateLabel = ({ label, borderBottomWidth }) => {
  return (
    <Box sx={{ width: "100%", textAlign: "center", margin: "5px 0px" }}>
      <DividerWithText
        borderBottomWidth={borderBottomWidth ? borderBottomWidth : "0.1px"}
        color="#888"
      >
        <Box
          sx={{
            padding: "4px 6px",
            display: "inline-block",
            borderRadius: "45px",
            backgroundColor: "var(--Symentic-Gray-20, #343434)",
          }}
        >
          <Typography sx={{ fontSize: "12px" }} variant="subtitle2">
            {label}
          </Typography>
        </Box>
      </DividerWithText>
    </Box>
  );
};

export default DateLabel;
