import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { setTeamsModalInfo } from "../../store";
import mobileBanner from "../../assets/skill-shodh/Banner Mobile.png";
import desktopBanner from "../../assets/skill-shodh/Banner Desktop.png";
import desktopBanner2 from "../../assets/skill-shodh/Teams Banner ( New ).png";
import { useNavigate } from "react-router-dom";

const Banner = ({ heading, body, buttonName, buttonIcon }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const desktopBannerImgs = [desktopBanner, desktopBanner2];
  // const [index, setIndex] = useState(0)
  // useEffect(() => {
  //   console.log(desktopBannerImgs);
  //   index = parseInt(Math.random() * 10) % desktopBannerImgs.length;
  //   setIndex()
  // }, []);

  const bgImgaeStyle = {
    width: "100%",
    cursor: "pointer",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    height: smallScreen ? "200px" : "411px",
    background: `linear-gradient(180deg, rgba(24, 24, 29, 0.00) -25%, rgba(24, 24, 29, 0.5) 100%), url(${
      smallScreen ? mobileBanner : desktopBanner
    }) lightgray 10% / cover no-repeat`,
  };
  const handleOnClick = () => {
    // dispatch(setTeamsModalInfo("createNewTeam"));
    navigate("/refer&win");
  };
  return (
    <Box>
      <Box sx={bgImgaeStyle} onClick={handleOnClick}>
        <Box
          sx={{
            width: !smallScreen ? "400px" : "100%",
            height: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: smallScreen ? "20px 16px" : "0px 30px",
          }}
        >
          {/* <Box>
            <Typography variant={smallScreen ? "h2" : "h1"}>
              {heading}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            {buttonName && (
              <Box
                sx={{ marginTop: smallScreen ? "16px" : "55px", width: "80%" }}
              >
                <PrimaryButton
                  leftIcon={buttonIcon}
                  handleOnClick={handleOnClick}
                >
                  {buttonName}
                </PrimaryButton>
              </Box>
            )}
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
