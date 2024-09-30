import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import contactUsDetails from "../utils/contactUsDetails";
import SEO from "../SEO";
import SEOContent from "../SEOContext";

const LgScreenRow = ({ fied, value, icon, pref }) => {
  return (
    <a
      target="_blank"
      style={{ textDecoration: "none", color: "inherit" }}
      href={pref + value}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          padding: "16px 20px",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
        }}
      >
        <Typography variant="subtitle1">{fied}</Typography>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Typography sx={{ fontSize: "18px !important" }} variant="body1">
            {value}
          </Typography>
          {icon}
        </Box>
      </Box>
    </a>
  );
};

const SmallScreenRow = ({ fied, value, icon, pref }) => {
  return (
    <a
      target="_blank"
      style={{ textDecoration: "none", color: "inherit" }}
      href={pref + value}
    >
      <Box
        sx={{
          width: "100%",
          background: "#212126",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "16px 20px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="subtitle1">{fied}</Typography>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {icon}
          <Typography sx={{ fontSize: "18px !important" }} variant="body1">
            {value}
          </Typography>
        </Box>
      </Box>
    </a>
  );
};

const ContactUs = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{ width: "100%", padding: smallScreen ? "30px 20px" : "30px 50px" }}
    >
      <SEO
title={SEOContent.ContactUs.title}
description={SEOContent.ContactUs.description}
keywords={SEOContent.ContactUs.keywords} />
      <Typography variant="h3">Contact</Typography>
      {!smallScreen && (
        <Box
          sx={{
            padding: smallScreen ? "16px 20px" : "20px 30px",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: "20px",
            borderRadius: "10px",
            background: "#212126",
            marginTop: "30px",
          }}
        >
          <Typography sx={{ fontSize: "20px" }} variant="body1">
            Contact Details
          </Typography>
          <Box>
            {contactUsDetails.map((detail, index) => {
              return (
                <LgScreenRow
                  key={index}
                  fied={detail.field}
                  value={detail.value}
                  icon={detail.icon}
                  pref={detail.pref}
                />
              );
            })}
          </Box>
        </Box>
      )}

      {smallScreen && (
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{ fontSize: "18px", margin: "30px 0px 20px 0px" }}
            variant="subtitle1"
          >
            Contact Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            {contactUsDetails.map((detail, index) => {
              return (
                <SmallScreenRow
                  key={index}
                  fied={detail.field}
                  value={detail.value}
                  icon={detail.icon}
                  pref={detail.pref}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ContactUs;
