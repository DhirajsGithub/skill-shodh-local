import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import ActionButton from "../Buttons/ActionButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { setTeamsModalInfo } from "../../store";
import { useDispatch } from "react-redux";
import ban1 from "../../assets/skill-shodh/Banner Desktop.png";
import ban2 from "../../assets/skill-shodh/Teams Banner ( New ).png";

const TeamAndCarousel = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const images = [ban1, ban2];
  return (
    <Box
      sx={{
        padding: smallScreen ? "20px 16px" : "0px 30px",
        display: "flex",
        gap: "20px",
        width: "100%",
        // justifyContent: "space-between",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "282px",
          maxWidth: smallScreen ? "100%" : "300px",
          flexGrow: 1,
          padding: "20px",
          gap: "16px",
          alignItems: "flex-start",
          borderRadius: "10px",
          border: "1px solid #888",
          //   flexShrink: 0,
        }}
      >
        <Typography variant="h4">Team Code</Typography>
        <Typography variant="body1">
        Create a team now! Collaborate with others, share ideas, and boost your productivity. Connect with like-minded individuals and work together on exciting projects. Experience the power of teamwork and achieve more together. Don't wait, start your team today!

        </Typography>
        <PrimaryButton
          handleOnClick={() => dispatch(setTeamsModalInfo("createNewTeam"))}
        >
          Create New team
        </PrimaryButton>
      </Box>
      {!smallScreen && (
        <Box sx={{ maxWidth: "900px", width: "100%" }} className="box">
          <Carousel
            interval={2000}
            autoPlay={true}
            transitionTime={800}
            infiniteLoop={true}
            height={310}
            showThumbs={false}
            useKeyboardArrows={true}
          >
            {images.map((URL, index) => (
              <div key={index} className="slide">
                <img
                  style={{ borderRadius: "10px", height: "310px" }}
                  alt="sample_file"
                  src={URL}
                  key={index}
                />
              </div>
            ))}
          </Carousel>
        </Box>
      )}
    </Box>
  );
};

export default TeamAndCarousel;
