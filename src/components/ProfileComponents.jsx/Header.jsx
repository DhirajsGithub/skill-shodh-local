import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import WestIcon from "@mui/icons-material/West";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Header = ({ name, activePage }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBackClick = () => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: smallScreen ? "20px" : "25px 40px",
        borderBottom: "2px solid rgba(136, 136, 136, 0.20)",
      }}
    >
      <Box
        onClick={handleBackClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
        }}
      >
        <HomeIcon
          sx={{
            width: "20px",
            height: "20px",
            color: "#888",
          }}
        />
        {!smallScreen && (
          <Typography sx={{ color: "#888", fontWeight: "400" }} variant={"h6"}>
            Home
          </Typography>
        )}
      </Box>

      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography variant={"h5"}>{name}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          zIndex: "-999",
          opacity: 0,
        }}
      >
        <WestIcon
          sx={{
            width: "20px",
            height: "20px",
            color: "#888",
          }}
        />
        {!smallScreen && (
          <Typography sx={{ color: "#888", fontWeight: "400" }} variant={"h5"}>
            Back
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Header;
