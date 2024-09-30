import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import ActionButton from "../Buttons/ActionButton";

const Footer = ({ handleSaveClick }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: smallScreen ? "center" : "flex-end",
        padding: smallScreen ? "30px 20px" : "60px",
        width: "100%",
      }}
    >
      <Box sx={{ width: smallScreen ? "100%" : "auto" }}>
        <ActionButton handleOnClick={handleSaveClick} name="Save" />
      </Box>
    </Box>
  );
};

export default Footer;
