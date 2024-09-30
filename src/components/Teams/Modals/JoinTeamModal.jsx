import {
  Box,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
const SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;
import CloseIcon from "@mui/icons-material/Close";
import ActionButton from "../../Buttons/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { setJoinTeamData, setTeamsModalInfo } from "../../../store";
import { searchteam } from "../../../utils/teamsapi";
import LoadingScreen from "../../generalComponents/LoadingScreen";

const JoinTeamModal = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { teamsModalInfo } = useSelector((state) => state.teamsSlice);
  const [loading, setLoading] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [error, setError] = useState("");
  const recaptcha = useRef();

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
  function onChange(value) {
    setCaptchaValue(value);
  }
  const handleModalClose = () => {
    dispatch(setJoinTeamData(null));
    dispatch(setTeamsModalInfo(""));
  };
  const handleSearchTeamClick = async () => {
    try {
      setLoading(true);
      let res = await searchteam(teamCode, captchaValue);
      if (res.status && res.data) {
        setError("");
        dispatch(setJoinTeamData(res.data));
        dispatch(setTeamsModalInfo("teamNameAndCode"));
      } else {
        setError(res?.message || "Team not found !!!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    recaptcha.current?.reset();
  };

  return (
    <Box>
      <LoadingScreen loading={loading} name="Searching" />
      <Modal
        open={teamsModalInfo === "joinTeam"}
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
            <Typography variant="h5">Join Team</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box>
              <Typography variant="h6">Team Code*</Typography>
            </Box>
            <Box>
              <TextField
                onChange={(e) => {
                  setError("");
                  setTeamCode(e.target.value);
                }}
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
                placeholder="Enter team code"
              />
              {error && (
                <Typography
                  sx={{
                    color: "#FF4242",
                    marginTop: "4px",
                    marginLeft: "15px",
                  }}
                  variant="body2"
                >
                  {error}
                </Typography>
              )}
            </Box>
          </Box>

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ReCAPTCHA
              theme="dark"
              onChange={onChange}
              ref={recaptcha}
              sitekey={SITE_KEY}
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <ActionButton
              handleOnClick={handleSearchTeamClick}
              name="Search Team"
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default JoinTeamModal;
