import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { setTeamsModalInfo } from "../../store";

const CreateAndJoinTeamButtons = () => {
  const dispatch = useDispatch();
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          display: smallScreen ? "block" : "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Typography variant="body1">No Joined / Created Teams.</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          justifyContent: smallScreen ? "flex-end" : "center",
          flexDirection: smallScreen ? "column" : "row",
          alignItems: "center",
          //   flexWrap: "wrap",
          height: "100%",
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

export default CreateAndJoinTeamButtons;
