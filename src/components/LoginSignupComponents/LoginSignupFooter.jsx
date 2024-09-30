import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import DividerWithText from "../generalComponents/DividerWithText";
import Auth2Button from "../Buttons/Auth2Button";
import googleSvg from "../../assets/bxl-google.svg.svg";
import gitHubSvg from "../../assets/bxl-github.svg.svg";
import ActionButton from "../Buttons/ActionButton";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

const LoginSignupFooter = ({
  page,
  handleGoogleButtonClick,
  handleGitHubButtonClick,
  handleNextButtonClick,
}) => {
  const smallScreen = useMediaQuery("(max-width:768px)");

  return (
    <Box>
      <Box sx={{ margin: smallScreen ? "20px 0px" : "32px 0px" }}>
        <DividerWithText color="rgba(136, 136, 136, 0.20)" height="#fff">
          or
        </DividerWithText>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: smallScreen ? "16px" : "20px",
        }}
      >
        <Auth2Button
          handleOnClick={handleGoogleButtonClick}
          img={googleSvg}
          name="Google"
        />
        <Auth2Button
          handleOnClick={handleGitHubButtonClick}
          img={gitHubSvg}
          name="Github"
        />
      </Box>
      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: smallScreen ? "column" : "row",
          gap: smallScreen && "20px",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="body1">
          {page === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          &nbsp;
          <Link
            style={{
              color: "#5773FF",
              cursor: "pointer",
              textDecoration: "none",
            }}
            to={page === "login" ? "/signup" : "/login"}
          >
            {page === "login" ? "Sign Up" : "Login"}
          </Link>
        </Typography>

        <Box
          sx={{
            alignSelf: "stretch",
          }}
        >
          <ActionButton
            handleOnClick={handleNextButtonClick}
            name={page === "login" ? "Login" : "Sign Up"}
            rightIcon={<EastIcon sx={{ color: "#fff" }} />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginSignupFooter;
