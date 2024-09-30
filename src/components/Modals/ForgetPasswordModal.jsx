import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalInfo } from "../../store";
import { ModalStyle } from "../../styles/styles";
import EmailIcon from "@mui/icons-material/Email";

import {
  Alert,
  Box,
  Button,
  Modal,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import CloseIcon from "@mui/icons-material/Close";
import { isvalidateEmail } from "../../utils/validations";
import { forgetpass } from "../../utils/api";
import LoadingScreen from "../generalComponents/LoadingScreen";

const ForgetPasswordModal = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { modalInfo } = useSelector((state) => state.generalSlice);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({
    message: "",
    type: "",
  });
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowSnackbar(false);
    setSnackBarInfo({ message: "", type: "" });
    dispatch(setModalInfo(""));
  };
  const handleSetResetLinkClick = async () => {
    if (!email) {
      setSnackBarInfo({
        msg: "Please enter your email",
        type: "error",
      });
      setShowSnackbar(true);
      return;
    }
    if (isvalidateEmail(email).isError) {
      setSnackBarInfo({
        msg: isvalidateEmail(email).message,
        type: "error",
      });
      setShowSnackbar(true);
      return;
    }

    try {
      setLoading(true);
      let res = await forgetpass(email);
      setLoading(false);
      if (res.status) {
        setSnackBarInfo({
          msg: "Reset link sent successfully to " + email,
          type: "success",
        });
        setShowSnackbar(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={modalInfo === "forgetPasswordModal"}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...ModalStyle,
          padding: smallScreen ? "20px" : "30px",
          textAlign: "center",
          maxWidth: "700px",
          width: smallScreen ? "90%" : "550px",
          gap: smallScreen ? "20px" : "30px",
        }}
      >
        <LoadingScreen loading={loading} name="Sending" />
        <Snackbar
          sx={{ position: "absolute" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
            position: "absolute",
            top: "0%",
          }}
          open={showSnackbar}
          onClose={() => {
            setShowSnackbar(false);
            setSnackBarInfo({ msg: "", type: "" });
          }}
          //   autoHideDuration={3000}
        >
          <Alert
            onClose={() => {
              setShowSnackbar(false);
              setSnackBarInfo({ msg: "", type: "" });
            }}
            severity={snackBarInfo.type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackBarInfo.msg}
          </Alert>
        </Snackbar>
        <Box>
          <Box sx={{ textAlign: "end", width: "100%" }}>
            <CloseIcon
              onClick={handleClose}
              sx={{ color: "#fff", cursor: "pointer" }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography variant="h4">Forgot Password ?</Typography>
            <Typography variant="body1">
              Don’t worry our team will help you change your password so that
              you can use SkillShodh without any problems
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              textAlign: "start",
            }}
          >
            <Typography variant="body1">Email</Typography>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="off"
              placeholder="Enter your email"
              inputProps={{
                style: {
                  color: "#888",
                  fontSize: "16px",
                  fontWeight: 400,
                  padding: 0,
                },
              }}
              sx={{
                "& fieldset": { border: "none" },
                border: "1px solid rgba(136, 136, 136, 0.20)",
                borderRadius: "10px",
                padding: smallScreen ? "10px 15px" : "20px 16px",
                "& .css-vkq66k-MuiInputBase-root-MuiOutlinedInput-root": {
                  paddingLeft: "0px",
                },
                width: "100%",
                backgroundColor: "#18181D",
              }}
            />
            <Box>
              <ActionButton
                handleOnClick={handleSetResetLinkClick}
                fontSize="16px"
                name="Send Password Reset Link"
              />
            </Box>
            {snackBarInfo.type === "success" && (
              <>
                <br />
                <a
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    textAlign: "center",
                  }}
                  href="https://mail.google.com/"
                >
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<EmailIcon sx={{ color: "#fff" }} />}
                  >
                    Inbox
                  </Button>
                </a>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ForgetPasswordModal;
