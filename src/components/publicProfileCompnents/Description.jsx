import React from "react";
import FieldLayout from "./FieldLayout";
import { Typography, useMediaQuery } from "@mui/material";

const Description = ({ bio }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <FieldLayout name="Description">
      <Typography
        sx={{ fontSize: smallScreen ? "14px" : "18px" }}
        variant="subtitle1"
      >
        {bio}
      </Typography>
    </FieldLayout>
  );
};

export default Description;
