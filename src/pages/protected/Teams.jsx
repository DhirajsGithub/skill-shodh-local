import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateAndJoinTeamButtons from "../../components/Teams/CreateAndJoinTeamButtons";
import JoinTeamModal from "../../components/Teams/Modals/JoinTeamModal";
import TeamNameAndCodeModal from "../../components/Teams/Modals/TeamNameAndCodeModal";
import CreateTeamModal from "../../components/Teams/Modals/CreateTeamModal";
import ChatScreen from "../../components/Teams/ChatScreen";
import TeamInforModal from "../../components/Teams/Modals/TeamInforModal";
import { useDispatch, useSelector } from "react-redux";
import { getteams } from "../../utils/teamsapi";
import LoadingScreen from "../../components/generalComponents/LoadingScreen";
import { setTeamListData, updateTeamsList } from "../../store";
import { socket } from "../../components/Modals/ChatsDrawer";
import NoChatScreen from "../../components/Teams/NoChatScreen";
import SEO from "../../SEO";
import SEOContent from "../../SEOContext";

const Teams = () => {
  // height here is 100% so that the teamlist will scroll to left only and not the whole page
  const { user } = useSelector((state) => state.authSlice);
  const { teamList } = useSelector((state) => state.teamsSlice);

  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTeamsData = async () => {
    try {
      setLoading(true);
      let res = await getteams(user?.email);
      if (res.status === true) {
        var mycodes = res.data.map((a) => a.code);
        socket.emit("joinme", mycodes);
        dispatch(setTeamListData(res.data));
        setTeams(res.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on("teammsgreceivedlist", (payload) => {
      payload.status = "updatemsg";
      dispatch(updateTeamsList(payload));
    });
  }, []);

  useEffect(() => {
    getTeamsData();
  }, [user]);
  useEffect(() => {
    if (teams.length === 0 && teamList.length > 0) {
      getTeamsData();
    }
  }, [teamList]);

  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <SEO
title={SEOContent.Teams.title}
description={SEOContent.Teams.description}
keywords={SEOContent.Teams.keywords} />
      <LoadingScreen loading={loading} name="getting team data" />
      {!loading && teams.length === 0 && (
        <NoChatScreen getTeamsData={getTeamsData} teams={teams} />
      )}
      <TeamInforModal />
      {!loading && teams.length > 0 && <ChatScreen />}
    </Box>
  );
};

export default Teams;
