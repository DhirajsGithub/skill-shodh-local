import { Avatar, Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import drawerOpeningIcon from "../../assets/drawer_opening_icon.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { setTeamInfodata, setTeamsModalInfo } from "../../store";

const ChatHeader = ({ handleBackClick, handleSidePanelIconClick }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { teamClickedData } = useSelector((state) => state.teamsSlice);
  const team = teamClickedData?.data;
  return (
    <Box
      sx={{
        padding: "10px 20px",
        borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
        background: "#28282D",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <ArrowBackIosIcon onClick={handleBackClick} sx={{ color: "#fff" }} />
        </Box>
        <Box
          onClick={() => {
            dispatch(setTeamsModalInfo("teamInfoModal"));
            dispatch(setTeamInfodata(team));
          }}
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Avatar src={team?.dp} sx={{ width: "45px", height: "45px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Typography variant="h6">{team?.name}</Typography>
            <Typography variant="subtitle2">
              {team?.members?.length} Members
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* <VideocamIcon
          sx={{
            color: "#fff",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        /> */}
        {/* <CallIcon
          sx={{
            color: "#fff",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        /> */}
        <Box
          onClick={handleSidePanelIconClick}
          sx={{
            color: "#fff",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
          component="img"
          src={drawerOpeningIcon}
          alt="drawer"
        />
      </Box>
    </Box>
  );
};

export default ChatHeader;
