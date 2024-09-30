import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import errorImg from "../assets/errorPage.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import SEO from "../SEO";
import SEOContent from "../SEOContext";

const ErrorPage = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0A0A0A",
        padding: smallScreen ? "20px" : "50px",
        display: "flex",

        flexDirection: "column",
        gap: "95px",
        justifyContent: "space-between",
      }}
    >
      <SEO
title={SEOContent.ErrorPage.title}
description={SEOContent.ErrorPage.description}
keywords={SEOContent.ErrorPage.keywords} />
      <Box>
        <Typography sx={{ fontSize: "20px @important" }} variant="body1">
          SKILL SHODH
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "80px",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {!smallScreen && (
          <Box
            sx={{ width: "400px", height: "400px", objectFit: "contain" }}
            src={errorImg}
            component="img"
          />
        )}
        <Box sx={{ width: "500px" }}>
          <Typography
            sx={{ fontSize: smallScreen ? "100px" : "150px" }}
            variant="h1"
          >
            404
          </Typography>
          <Typography
            sx={{
              fontSize: smallScreen ? "20px !important" : "25px !important",
            }}
            variant="body1"
          >
            The page you are looking for doesn’t exist , please wait while we
            come back. Or go to home page
          </Typography>
          <br />
          <br />
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
            to="/"
          >
            <ArrowRightAltIcon sx={{ fontSize: "35px", color: "#fff" }} />
            <Typography
              sx={{
                fontSize: smallScreen ? "20px !important" : "25px !important",
                color: "#5773FF",
              }}
              variant="body1"
            >
              Go to Home Page
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ fontSize: "20px @important", textAlign: "end" }}
          variant="body1"
        >
          INVALID PATH
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorPage;
