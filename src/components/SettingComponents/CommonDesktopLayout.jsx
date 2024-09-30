import React from "react";
import Layout from "./Layout";
import { Box, Typography } from "@mui/material";

const CommonDesktopLayout = ({ name, subname, children }) => {
  return (
    <Layout name={name}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography
          sx={{ fontSize: "18px", marginBottom: "20px" }}
          variant="body1"
        >
          {subname}
        </Typography>
      </Box>
      {children}
    </Layout>
  );
};

export default CommonDesktopLayout;
