import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const Auth2Button = ({ name, handleOnClick, img }) => {
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
        border: "1px solid rgba(136, 136, 136, 0.20)",
        padding: smallScreen ? "10px 20px" : "16px 20px",
        cursor: "pointer",
        textTransform: "none",
      }}
      onClick={handleOnClick}
    >
      <Box component="img" src={img} />
      <Typography sx={{ fontWeight: "400" }} variant="h5">
        {name}
      </Typography>
    </Button>
  );
};

export default Auth2Button;
