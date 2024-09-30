import React from "react";
import MessageIcon from "@mui/icons-material/Message";
import { Box, Typography, useMediaQuery } from "@mui/material";
import PrimaryButton from "../Buttons/PrimaryButton";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setTeamsModalInfo } from "../../store";

const NoChatScreen = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <MessageIcon sx={{ width: "60px", height: "60px", color: "#888888" }} />
        <Typography variant="h4">
          Click On Chat <br /> To Start Conversation
        </Typography>
        <Typography sx={{ fontSize: "20px" }} variant="subtitle2">
          Join or create new team and start conversation with your team members
        </Typography>
      </Box>
      {smallScreen && (
        <>
          <br />
          <br />
        </>
      )}
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          justifyContent: smallScreen ? "flex-end" : "center",
          flexDirection: smallScreen ? "column" : "row",
          alignItems: "center",
          //   flexWrap: "wrap",
          width: !smallScreen ? "100%" : "auto",
          marginBottom: "40px",
          position: "absolute",
          bottom: "0%",
          padding: smallScreen && "50px 20px",
        }}
      >
        <Box sx={{ width: smallScreen ? "100%" : "auto" }}>
          <PrimaryButton
            handleOnClick={() => dispatch(setTeamsModalInfo("joinTeam"))}
            variant="white"
            leftIcon={<AddIcon sx={{ color: "#000" }} />}
          >
            Join Team
          </PrimaryButton>
        </Box>

        <Box sx={{ width: smallScreen ? "100%" : "auto" }}>
          <PrimaryButton
            handleOnClick={() => dispatch(setTeamsModalInfo("createNewTeam"))}
            leftIcon={<AddIcon sx={{ color: "#fff" }} />}
          >
            Create New Team
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NoChatScreen;
