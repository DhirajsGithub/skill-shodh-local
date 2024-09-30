import {
  Alert,
  Box,
  Modal,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import WestIcon from "@mui/icons-material/West";
import ActionButton from "../../Buttons/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import copyToClipboardSvg from "../../../assets/copy_to_clipboard.svg";
import CopyToClipboard from "react-copy-to-clipboard";

import { jointeam } from "../../../utils/teamsapi";
import LoadingScreen from "../../generalComponents/LoadingScreen";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setJoinTeamData,
  setTeamsModalInfo,
  updateTeamsList,
} from "../../../store";

const TeamNameAndCodeModal = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { user } = useSelector((state) => state.authSlice);
  const { teamsModalInfo, joinOrCreateTeamData } = useSelector(
    (state) => state.teamsSlice
  );
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const teamCode = joinOrCreateTeamData?.code;
  const teamName = joinOrCreateTeamData?.name;
  const createdTeam = joinOrCreateTeamData?.createdTeam;
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    maxHeight: "80vh",
    overflowY: "scroll",
    scrollbarWidth: "none",
    padding: "30px 20px",
    flexDirection: "column",
    gap: smallScreen ? "20px" : "40px",
    borderRadius: "10px",
    border: "2px solid rgba(136, 136, 136, 0.2)",
    background: "#18181D",
    maxWidth: "500px",
    width: smallScreen ? "90%" : "470px",
    outline: "none",
  };

  const handleModalClose = () => {
    dispatch(setJoinTeamData(null));
    dispatch(setTeamsModalInfo(""));
  };
  const handleBackPress = () => {
    handleModalClose();
  };

  const joinTeamFunc = async () => {
    if (createdTeam) {
      handleModalClose();
      return;
    }
    setShowSnackbar(true);
    try {
      setLoading(true);
      let res = await jointeam(teamCode, user?.email);
      if (res.status) {
        const upatedData = {
          ...joinOrCreateTeamData,
          members: [...joinOrCreateTeamData.members, user?.email],
        };
        dispatch(
          updateTeamsList({
            status: "add",
            data: upatedData,
          })
        );

        setSnackBarInfo({
          type: "success",
          msg: "Successfully joined the team",
        });
      } else {
        setSnackBarInfo({ type: "info", msg: res.message });
      }

      setLoading(false);
    } catch (error) {
      setSnackBarInfo({ type: "error", msg: "Internal server error" });
      setLoading(false);
    }
    handleModalClose();
  };

  return (
    <Box>
      <LoadingScreen loading={loading} name="Joining" />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackBarInfo.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarInfo.msg}
        </Alert>
      </Snackbar>
      <Modal
        open={teamsModalInfo === "teamNameAndCode"}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <CloseIcon
              onClick={handleBackPress}
              sx={{
                color: "#fff",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            />
            <Typography variant="h5">
              {createdTeam ? "Create Team" : "Join Team"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="subtitle1">Team Name</Typography>
            <Typography
              sx={{
                backgroundcolor: "primary",
                backgroundImage: `linear-gradient(90deg, #6CB9FF 0%, #B174FF 50%)`,
                backgroundSize: "100%",
                backgroundRepeat: "repeat",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              variant="h3"
            >
              {teamName}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="subtitle1">Team Code</Typography>
            {createdTeam ? (
              <CopyToClipboard
                text={teamCode}
                onCopy={() => {
                  setSnackBarInfo({
                    type: "success",
                    msg: "Copied to clipboard",
                  });
                  setShowSnackbar(true);
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">{teamCode}</Typography>
                  <Box
                    sx={{ cursor: "pointer" }}
                    component="img"
                    src={copyToClipboardSvg}
                  />
                </Box>
              </CopyToClipboard>
            ) : (
              <Typography variant="h4">{teamCode}</Typography>
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <ActionButton
              handleOnClick={joinTeamFunc}
              name={createdTeam ? "Okay" : "Join Team"}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TeamNameAndCodeModal;
