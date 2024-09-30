import React, { useState } from "react";
import SuggestionCard from "../generalComponents/SuggestionCard";
import CloseIcon from "@mui/icons-material/Close";

import { Box, Slider, Typography, useMediaQuery } from "@mui/material";

const SelectedSkillRow = ({
  skillDetails,
  handleLevelChange,
  handleDeleteSelectedSkillClick,
}) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const marks = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        // justifyContent: "center",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          width: smallScreen ? "50%" : "30%",
          minWidth: "115px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <CloseIcon
          onClick={() => handleDeleteSelectedSkillClick(skillDetails.id)}
          sx={{
            color: "#fff",
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
        />
        <SuggestionCard fix={true} name={skillDetails.name} checked={true} />
      </Box>
      <Box
        sx={{
          width: smallScreen ? "95%" : "60%",
          minWidth: "230px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "#91FF6A" }} variant="body2">
            Beginner
          </Typography>
          <Typography sx={{ color: "#FF976A" }} variant="body2">
            Intermediate
          </Typography>
          <Typography sx={{ color: "#FF6AA0" }} variant="body2">
            Advance
          </Typography>
        </Box>
        <Slider
          onChange={(e, value) => {
            handleLevelChange(skillDetails.id, value);
          }}
          aria-label="Restricted values"
          value={skillDetails.level}
          getAriaValueText={valuetext}
          step={null}
          min={1}
          max={3}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>
    </Box>
  );
};

export default SelectedSkillRow;
