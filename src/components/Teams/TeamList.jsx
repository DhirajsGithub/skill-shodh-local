import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import React, { useEffect, useState } from "react";
import { getteams } from "../../utils/teamsapi";
import { useDispatch, useSelector } from "react-redux";
import TeamListSkeleton from "./TeamListSkeleton";
import { socket } from "../Modals/ChatsDrawer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { setTeamClickedData, setTeamsModalInfo } from "../../store";

const TeamMetaData = ({ handleTeamClickLocal, team }) => {
  return (
    <Box
      onClick={() => {
        handleTeamClickLocal(team);
      }}
      sx={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
        cursor: "pointer",
      }}
    >
      <Avatar src={team.dp} sx={{ width: "45px", height: "45px" }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <Typography variant="h6">{team?.name}</Typography>
        <Typography sx={{ wordBreak: "break-all" }} variant="subtitle2">
          {team?.msg_txt?.length > 50
            ? team?.msg_txt?.slice(0, 50) + "..."
            : team?.msg_txt}
        </Typography>
      </Box>
    </Box>
  );
};

const TeamList = ({ handleTeamClick }) => {
  const dispatch = useDispatch();
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { teamList } = useSelector((state) => state.teamsSlice);
  const [teams, setTeams] = useState(teamList);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setTeams(teamList);
  }, [teamList]);
  const handleTeamClickLocal = (team) => {
    dispatch(setTeamClickedData({ data: team, open: true }));
    handleTeamClick();
  };
  return (
    <Box
      sx={{
        minWidth: smallScreen ? "100%" : "300px",
        maxWidth: smallScreen ? "100%" : "300px",
        borderRight: "1px solid #888",
        height: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
        display: teams.length === 0 ? "none" : "block",
      }}
    >
      <Box
        sx={{
          padding: "12px 20px",
          borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
          position: "sticky",
          top: "0%",
          height: "66px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#18181D",
          gap: "10px",
          width: "100%",
          justifyContent: "space-between",
          zIndex: 99,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="h5">Teams Chats</Typography>
          <GroupsIcon sx={{ color: "#fff" }} />
        </Box>
        {smallScreen && (
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <MoreVertIcon
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "#fff", cursor: "pointer" }}
            />
            <Menu
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#18181D",
                  borderRadius: "10px 0px 10px 10px",
                  border: "1px solid rgba(136, 136, 136, 0.20)",
                },
                "& .css-6hp17o-MuiList-root-MuiMenu-list": {
                  padding: 0,
                },
              }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  dispatch(setTeamsModalInfo("joinTeam"));
                  handleClose();
                }}
              >
                <AddIcon
                  sx={{ color: "#fff", width: "20px", height: "20px" }}
                />{" "}
                &nbsp; Join Team
              </MenuItem>
              <Divider
                sx={{
                  border: "0.5px solid rgba(136, 136, 136, 0.20)",
                  margin: "0px !important",
                  padding: "0px !important",
                }}
              />
              <MenuItem
                sx={{ color: "#FF2B2B" }}
                onClick={() => {
                  dispatch(setTeamsModalInfo("createNewTeam"));
                  handleClose();
                }}
              >
                <AddIcon
                  sx={{ color: "#FF2B2B", width: "20px", height: "20px" }}
                />{" "}
                &nbsp; Create New Team
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        {!loading &&
          teams.map((team, index) => (
            <TeamMetaData
              team={team}
              key={team._id}
              handleTeamClickLocal={handleTeamClickLocal}
            />
          ))}
        {loading && <TeamListSkeleton />}
      </Box>
    </Box>
  );
};

export default TeamList;
