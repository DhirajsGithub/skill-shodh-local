import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const UploadButton = ({
  name,
  handleOnClick,
  leftIcon,
  rightIcon,
  disabled,
}) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Button
      sx={{
        display: "flex",
        width: "100%",
        alignSelf: "stretch",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        border: "1.5px solid rgba(136, 136, 136, 0.20)",
        padding: smallScreen ? "10px 30px" : "15px 30px",
        cursor: disabled ? "not-allowed" : "pointer",
        textTransform: "none",
        fontWeight: "400px",
        backgroundColor: "rgba(136, 136, 136, 0.20)",

        ":hover": {
          bgcolor: "#353535", // theme.palette.primary.main
          color: "white",
        },
      }}
      onClick={handleOnClick}
    >
      {leftIcon && leftIcon}
      <Typography sx={{ fontWeight: "400", color: "#888" }} variant="h5">
        {name}
      </Typography>
      {rightIcon && rightIcon}
    </Button>
  );
};

export default UploadButton;
