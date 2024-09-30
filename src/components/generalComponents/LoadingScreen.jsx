import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const LoadingScreen = ({ loading, name }) => {
  const handleClose = () => {};

  return (
    <Box sx={{ position: "absolute" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: 99999 }}
        open={loading}
        onClick={handleClose}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="inherit" />

          <Typography variant="body1">{name ? name : "Loading"}...</Typography>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default LoadingScreen;
