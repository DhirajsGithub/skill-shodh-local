import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import TeamList from "./TeamList";
import NoChatScreen from "./NoChatScreen";
import Chats from "./Chats";
import SidePanel from "./SidePanel";
import { useSelector } from "react-redux";

// main screen

const ChatScreen = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { teamClickedData } = useSelector((state) => state.teamsSlice);
  const { data, open } = teamClickedData;
  const [team, setTeam] = useState(data);
  const [chatsOpen, setChatsOpen] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const handleBackClick = () => {
    if (!smallScreen) {
      setSidePanelOpen(false);
    }
    setChatsOpen(false);
  };
  const handleSidePanelIconClick = () => {
    setSidePanelOpen(!sidePanelOpen);
    if (smallScreen && chatsOpen) {
      setChatsOpen(false);
    }
  };
  const handleTeamClick = () => {
    setChatsOpen(true);
    setSidePanelOpen(false);
  };
  const handleSidePanelClose = () => {
    setChatsOpen(true);
    setSidePanelOpen(false);
  };

  useEffect(() => {
    setChatsOpen(open);
    setTeam(data);
  }, [teamClickedData]);

  useEffect(() => {
    if (chatsOpen) {
      setSidePanelOpen(false);
    }
    if (sidePanelOpen) {
      setChatsOpen(true);
    }
  }, [smallScreen]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        // overflow: "hidden",
      }}
    >
      {(!smallScreen || (!chatsOpen && !sidePanelOpen)) && (
        <TeamList handleTeamClick={handleTeamClick} />
      )}
      {!chatsOpen && !smallScreen && <NoChatScreen />}
      {chatsOpen && (
        <Chats
          handleBackClick={handleBackClick}
          handleSidePanelIconClick={handleSidePanelIconClick}
          team={team}
        />
      )}
      {((!smallScreen && sidePanelOpen) || (smallScreen && sidePanelOpen)) && (
        <SidePanel team={team} handleSidePanelClose={handleSidePanelClose} />
      )}
    </Box>
  );
};

export default ChatScreen;
