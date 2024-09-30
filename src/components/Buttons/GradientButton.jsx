import { Box, Button, Typography } from "@mui/material";
import React from "react";

const GradientButton = ({
  children,
  borderRadius,
  handleButtonClick,
  leftIcon,
  rightIcon,
}) => {
  return (
    <Button
      onClick={handleButtonClick}
      style={{ textTransform: "none" }}
      sx={{
        display: "flex",
        padding: "10px 40px",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: 400,
        borderRadius: borderRadius ? borderRadius : "44px",

        background: " linear-gradient(180deg, #7777EF 0%, #4B3BAB 100%)",
      }}
      endIcon={rightIcon}
      startIcon={leftIcon}
    >
      <Typography sx={{ color: "#fff" }} variant="body2">
        {children}
      </Typography>
    </Button>
  );
};

export default GradientButton;
