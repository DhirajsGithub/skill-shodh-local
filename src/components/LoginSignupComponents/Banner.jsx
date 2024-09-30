import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import CodeIcon from "@mui/icons-material/Code";

const Banner = () => {
  const mediumScreen = useMediaQuery("(max-width:1100px)");
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundColor: "#18181D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        boxShadow: "2px 5px 24.2px 0px rgba(0, 0, 0, 0.03) inset",
      }}
    >
      <Box>
        <Box
          sx={{
            width: "85%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "66px 54px",
            backgroundColor: "#212126",
            border: "2px solid rgba(136, 136, 136, 0.20)",
            borderRadius: "18px",
            position: "absolute",
            top: mediumScreen ? "10%" : "20%",
            left: "10%",
            zIndex: 1,
          }}
        >
          <Typography sx={{ maxWidth: "250px" }} variant={"h2"}>
            SkillShodh
          </Typography>
        </Box>
        <Box
          sx={{
            width: mediumScreen ? "70%" : "60%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "66px 40px",
            backgroundColor: "rgb(28, 28, 32)",
            border: "2px solid rgba(136, 136, 136, 0.20)",
            borderRadius: "18px",
            position: "absolute",
            top: mediumScreen ? "28%" : "42%",
            left: "7%",
            zIndex: 2,
          }}
        >
          <Typography sx={{ fontWeight: "400" }} variant={"h5"}>
          Join our vibrant community and unlock opportunities tailored to your skills. Connect with top companies, discover internships, and build your professional network.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "25px",
            backgroundColor: "rgba(24, 24, 29)",
            border: "1px solid rgba(136, 136, 136, 0.20)",
            borderRadius: "50%",
            position: "absolute",
            top: mediumScreen ? "48%" : "58%",
            left: mediumScreen ? "67%" : "60%",
            zIndex: 3,
          }}
        >
          <CodeIcon
            sx={{
              width: mediumScreen ? "30px" : "40px",
              height: mediumScreen ? "30px" : "40px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
