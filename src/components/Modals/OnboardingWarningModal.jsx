import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { ModalStyle } from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setModalInfo } from "../../store";

const OnboardingWarningModal = () => {
  const dispatch = useDispatch();
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { modalInfo } = useSelector((state) => state.generalSlice);
  const navigate = useNavigate();
  const style = {
    maxWidth: "490px",

    width: smallScreen ? "90%" : "490px",
  };
  const handleCloseLocal = () => {
    navigate("/");
    dispatch(setModalInfo(""));
  };

  return (
    <Modal
      open={modalInfo === "onboardingWarningModal"}
      onClose={handleCloseLocal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...ModalStyle, ...style }}>
        <Box
          sx={{
            justifyContent: "space-between",
            width: "100%",
            display: "flex",
          }}
        >
          <Typography
            style={{ fontSize: "20px", color: "#ffa726" }}
            variant="h5"
          >
            Warning
          </Typography>
          <CloseIcon
            onClick={handleCloseLocal}
            sx={{ color: "#fff", cursor: "pointer" }}
          />
        </Box>
        <Typography style={{ fontSize: "20px" }}>
          Please login first to access this page.
        </Typography>
        <Link
          onClick={handleCloseLocal}
          style={{ textDecoration: "none", color: "inherit" }}
          to="/login"
        >
          <Typography
            sx={{
              display: "inline",
              color: "#5773FF",
              cursor: "pointer",
              textDecoration: "none",
              fontSize: "18px",
              ":hover": {
                textDecoration: "underline",
              },
            }}
          >
            Login
          </Typography>
        </Link>
      </Box>
    </Modal>
  );
};

export default OnboardingWarningModal;
