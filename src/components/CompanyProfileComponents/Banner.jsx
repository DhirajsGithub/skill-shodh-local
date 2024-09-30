import React from "react";
import { Avatar, Box, Typography, useMediaQuery } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

const Banner = ({ companyProfile }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");

  return (
    <Box sx={{ padding: smallScreen ? "0px" : "40px 30px 0px 30px" }}>
      <Box
        sx={{
          width: "100%",
          padding: smallScreen ? "20px" : "30px",
          background: "#212126",
          borderRadius: !smallScreen && "10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Box>
            <Avatar
              src={companyProfile?.logo}
              sx={{
                width: smallScreen ? "60px" : "120px",
                height: smallScreen ? "60px" : "120px",
              }}
            />
          </Box>
          <Box>
            <Typography sx={{ wordBreak: "break-all" }} variant="h3">
              {companyProfile?.name}
            </Typography>
            <Typography sx={{ wordBreak: "break-all" }} variant="subtitle1">
              {companyProfile?.city}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          {companyProfile?.website && (
            <a
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
              href={companyProfile?.website}
            >
              <LanguageIcon
                sx={{
                  color: "#fff",
                  fontSize: smallScreen ? "20px" : "28px",
                  cursor: "pointer",
                  ":hover": {
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease",
                  },
                }}
              />
            </a>
          )}
          {companyProfile?.insta && (
            <a
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
              href={companyProfile?.insta}
            >
              <InstagramIcon
                sx={{
                  color: "#fff",
                  fontSize: smallScreen ? "20px" : "28px",
                  cursor: "pointer",
                  ":hover": {
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease",
                  },
                }}
              />
            </a>
          )}
          {companyProfile?.facebook && (
            <a
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
              href={companyProfile?.facebook}
            >
              <FacebookIcon
                sx={{
                  color: "#fff",
                  fontSize: smallScreen ? "20px" : "28px",
                  cursor: "pointer",
                  ":hover": {
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease",
                  },
                }}
              />
            </a>
          )}
          {companyProfile?.linkedIn && (
            <a
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
              href={companyProfile?.linkedIn}
            >
              <LinkedInIcon
                sx={{
                  color: "#fff",
                  fontSize: smallScreen ? "20px" : "28px",
                  cursor: "pointer",
                  ":hover": {
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease",
                  },
                }}
              />
            </a>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
