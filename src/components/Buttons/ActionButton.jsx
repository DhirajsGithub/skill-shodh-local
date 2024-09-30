import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const ActionButton = ({
  name,
  handleOnClick,
  leftIcon,
  rightIcon,
  fontSize,
}) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Button
      sx={{
        display: "flex",
        width: "100%",
        alignSelf: "stretch",

        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",

        padding: smallScreen ? "10px 30px" : "12px 30px",
        textTransform: "none",
        fontWeight: "400px",
        backgroundColor: "#5773FF",

        ":hover": {
          bgcolor: "#5773FF", // theme.palette.primary.main
          color: "white",
        },
      }}
      onClick={handleOnClick}
      startIcon={leftIcon}
      endIcon={rightIcon}
    >
      <Typography
        sx={{ fontWeight: "400", fontSize: fontSize ? fontSize : "auto" }}
        variant="h5"
      >
        {name}
      </Typography>
    </Button>
  );
};

export default ActionButton;
