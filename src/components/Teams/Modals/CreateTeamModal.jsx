import {
  Alert,
  Avatar,
  Box,
  LinearProgress,
  Modal,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
const SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;
import CloseIcon from "@mui/icons-material/Close";
import ActionButton from "../../Buttons/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  setJoinTeamData,
  setTeamListData,
  setTeamsModalInfo,
  updateTeamsList,
} from "../../../store";
import { createteam, uploadteamdp } from "../../../utils/teamsapi";
import LoadingScreen from "../../generalComponents/LoadingScreen";

const CreateTeamModal = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { user } = useSelector((state) => state.authSlice);
  const [teamImgUploading, setTeamImgUploading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamDp, setTeamDp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const { teamsModalInfo } = useSelector((state) => state.teamsSlice);
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
    maxWidth: "500px",
    borderRadius: "10px",
    border: "2px solid rgba(136, 136, 136, 0.2)",
    background: "#18181D",
    width: smallScreen ? "90%" : "470px",
    outline: "none",
  };

  const handleModalClose = () => {
    dispatch(setJoinTeamData(null));
    dispatch(setTeamsModalInfo(""));
    setTeamDp("");
    setTeamName("");
    setTeamDescription("");
  };

  const TeamImgChangeHandler = async (file) => {
    try {
      setTeamImgUploading(true);
      let res = await uploadteamdp(file);
      if (res.status === true) {
        setTeamDp(res.data);
      }
      setTeamImgUploading(false);
    } catch (error) {
      setTeamImgUploading(false);
    }
  };
  const handleChooseTeamImageClicked = () => {
    document.getElementById("choose-team-img-56702-profile").click();
  };

  const handleCreateTeamClick = async () => {
    setShowSnackbar(true);
    if (teamImgUploading) {
      setSnackBarInfo({ type: "info", msg: "Team img is uploading..." });
      return;
    }
    if (!teamDp || !teamName || !teamDescription || !user?.email) {
      setSnackBarInfo({
        msg: "All fields are required",
        type: "error",
      });
      return;
    } else {
      try {
        setLoading(true);
        let res = await createteam(
          teamDp,
          teamName,
          teamDescription,
          user.email
        );
        if (res.staus === true) {
          dispatch(updateTeamsList({ status: "add", data: res.data }));
          dispatch(setJoinTeamData({ ...res.data, createdTeam: true }));
          dispatch(setTeamsModalInfo("teamNameAndCode"));
          setSnackBarInfo({
            type: "success",
            msg: "Team created successfully !!!",
          });
          setTeamDp("");
          setTeamName("");
          setTeamDescription("");
        } else {
          setSnackBarInfo({
            type: "error",
            msg: "unable to create team",
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      <LoadingScreen loading={loading} name="Creating" />
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
        open={teamsModalInfo === "createNewTeam"}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <CloseIcon
              onClick={handleModalClose}
              sx={{
                color: "#fff",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            />
            <Typography variant="h5">Create Team</Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                flexDirection: smallScreen ? "column" : "row",
              }}
            >
              <Box
                onClick={handleChooseTeamImageClicked}
                sx={{ cursor: "pointer" }}
              >
                {teamImgUploading && (
                  <Skeleton
                    variant="circular"
                    sx={{
                      width: smallScreen ? "70px" : "100px",
                      height: smallScreen ? "70px" : "100px",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <input
                  accept="image/*"
                  id="choose-team-img-56702-profile"
                  type="file"
                  style={{
                    display: "none",
                    visibility: "hidden",
                    width: "0",
                    height: "0",
                  }}
                  onChange={(e) => {
                    TeamImgChangeHandler(e.target.files[0]);
                  }}
                />
                {!teamImgUploading && (
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      src={teamDp}
                      sx={{
                        width: smallScreen ? "70px" : "100px",
                        height: smallScreen ? "70px" : "100px",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                    <AddAPhotoIcon
                      sx={{
                        width: smallScreen ? "35px" : "45px",
                        height: smallScreen ? "35px" : "45px",
                        color: "#888888",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      }}
                    />
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flexGrow: 1,
                  width: "100%",
                }}
              >
                <Box>
                  <Typography variant="h6">Team Name</Typography>
                </Box>
                <Box>
                  <TextField
                    onChange={(e) => setTeamName(e.target.value)}
                    inputProps={{
                      style: {
                        color: "#8B8B8B",
                        fontSize: smallScreen ? "16px" : "20px",
                        fontWeight: 500,
                        padding: 0,
                      },
                    }}
                    sx={{
                      "& fieldset": { border: "none" },
                      border: " 2px solid rgba(136, 136, 136, 0.20)",

                      borderRadius: "10px",
                      padding: "20px 10px",

                      width: "100%",
                    }}
                    placeholder="Enter team name"
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
              }}
            >
              <Box>
                <Typography variant="h6">Description</Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  multiline={true}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  inputProps={{
                    style: {
                      color: "#8B8B8B",
                      fontSize: smallScreen ? "16px" : "20px",
                      fontWeight: 500,
                      padding: 0,
                    },
                  }}
                  rows={3}
                  sx={{
                    "& fieldset": { border: "none" },
                    border: " 2px solid rgba(136, 136, 136, 0.20)",
                    borderRadius: "10px",
                    padding: "20px 10px",
                    width: "100%",
                    "& .css-8pxvwv-MuiInputBase-root-MuiOutlinedInput-root": {
                      padding: "0px",
                    },
                  }}
                  placeholder="Write about your team"
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: "100%" }}>
            <ActionButton
              handleOnClick={handleCreateTeamClick}
              name="Create Team"
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateTeamModal;
