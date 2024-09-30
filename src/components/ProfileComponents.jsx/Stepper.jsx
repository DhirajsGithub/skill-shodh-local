import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const Step = ({ name, activePage, handleStepClick, id }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Typography
      onClick={() => handleStepClick(id)}
      sx={{
        fontSize: smallScreen ? "12px !important" : "18px",
        color: activePage === id ? "#888" : "#fff",
        fontWeight: 400,
        cursor: "pointer",
        textAlign: "center",
      }}
      variant="h5"
    >
      {name}
    </Typography>
  );
};

const Stepper = ({ handleStepClick, activePage }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        display: "flex",
        width: smallScreen ? "100%" : "80%",
        margin: "0 auto",
        marginTop: !smallScreen && "20px",
        padding: smallScreen ? "15px 20px" : "20px 40px",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexShrink: 0,
        borderRadius: !smallScreen && 61,
        border: !smallScreen && "1px solid rgba(136, 136, 136, 0.2)",
        borderBottom: smallScreen && "1px solid rgba(136, 136, 136, 0.2)",
        backgroundColor: "#27272C",
      }}
    >
      <Step
        activePage={activePage}
        handleStepClick={handleStepClick}
        id={0}
        name="Basic Details"
      />
      <Step
        activePage={activePage}
        handleStepClick={handleStepClick}
        id={1}
        name="Education Details"
      />
      <Step
        activePage={activePage}
        handleStepClick={handleStepClick}
        id={2}
        name="Skill Details"
      />
      <Step
        activePage={activePage}
        handleStepClick={handleStepClick}
        id={3}
        name="Socials"
      />
    </Box>
  );
};

export default Stepper;
