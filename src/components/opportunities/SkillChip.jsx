import { Chip, useMediaQuery } from "@mui/material";
import React from "react";

const SkillChip = ({ label }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Chip
      sx={{
        padding: "8px 16px",
        backgroundColor: "#233D38",
        color: "#57FFE1",
        borderRadius: "40px",
        fontSize: smallScreen ? "12px" : "14px",
        fontWeight: 400,
      }}
      label={label}
    />
  );
};

export default SkillChip;
