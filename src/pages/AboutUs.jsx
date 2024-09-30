import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import aboutUsContent from "../utils/aboutUsContent";
import SEO from "../SEO";
import SEOContent from "../SEOContext";

const Content = ({ content }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: "100%",
        padding: smallScreen ? "16px 20px" : "20px 30px",
        borderRadius: "10px",
        background: "#212126",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Typography
        sx={{
          fontSize: smallScreen ? "16px !important" : "20px",
          fontWeight: 400,
        }}
        variant="body1"
      >
        {content.heading}
      </Typography>
      <Typography
        sx={{
          fontSize: smallScreen ? "16px !important" : "18px",
          fontWeight: 400,
        }}
        variant="subtitle1"
      >
        {content.content}
      </Typography>
    </Box>
  );
};

const AboutUs = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: "100%",
        padding: smallScreen ? "30px 20px" : "30px 50px",
      }}
    >
      <SEO
title={SEOContent.AboutUs.title}
description={SEOContent.AboutUs.description}
keywords={SEOContent.AboutUs.keywords} />
      <Typography variant="h3">About SkillShodh</Typography>
      <Box
        sx={{
          width: "100%",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: smallScreen ? "10px" : "30px",
        }}
      >
        {aboutUsContent.map((content, index) => {
          return <Content key={index} content={content} />;
        })}
      </Box>
    </Box>
  );
};

export default AboutUs;
