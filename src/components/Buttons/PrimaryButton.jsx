import { Box, Button, Typography } from "@mui/material";
import React from "react";

const PrimaryButton = ({
  children,
  variant,
  handleOnClick,
  leftIcon,
  rightIcon,
}) => {
  if (!variant) variant = "contained"; // default value
  let color = "";
  let bgColor = "";
  if (variant === "white") {
    color = "#000";
    bgColor = "white";
  } else if (variant === "outlined") {
    color = "#5773FF";
    bgColor = "transparent";
  } else {
    color = "white";
    bgColor = "#5773FF";
  }

  return (
    <Button
      onClick={handleOnClick}
      sx={{
        display: "flex",
        width: "100%",
        padding: "15px 30px",
        textTransform: "none",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50px",
        backgroundColor: bgColor,
        border: variant === "outlined" && `1px solid ${color}`,
        ":hover": {
          boxShadow: "4px 4px 8px #4b4b55c2",
          backgroundColor: bgColor,
        },
      }}
      endIcon={rightIcon}
      startIcon={leftIcon}
    >
      <Typography sx={{ color: color }} variant="body1">
        {children}
      </Typography>
    </Button>
  );
};

export default PrimaryButton;
