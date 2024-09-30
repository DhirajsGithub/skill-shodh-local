import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSearchParams } from "react-router-dom";
import { setModalInfo } from "../../store";
import EmailIcon from "@mui/icons-material/Email";

const SuccessModal = ({ handleClose }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { modalInfo, modalData } = useSelector((state) => state.generalSlice);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    maxHeight: "80vh",
    overflowY: "scroll",
    scrollbarWidth: "none",
    flexDirection: "column",
    maxWidth: "490px",
    borderRadius: "10px",
    border: "2px solid rgba(136, 136, 136, 0.2)",
    background: "#18181D",
    width: smallScreen ? "90%" : "490px",
    outline: "none",
  };
  const handleCloseLocal = () => {
    dispatch(setModalInfo(""));
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <Modal
      open={modalInfo === "successModal"}
      onClose={handleCloseLocal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            padding: "35px",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "#428D2F",
          }}
        >
          <CheckCircleIcon
            sx={{ color: "#fff", width: "80px", height: "80px" }}
          />
        </Box>
        <Box
          sx={{
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h4">
            {modalData.title}
          </Typography>
          <Typography
            sx={{ fontWeight: "400", textAlign: "center" }}
            variant="h5"
          >
            {modalData.message}
          </Typography>
          {modalData?.inboxButton && (
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
    </Modal>
  );
};

export default SuccessModal;
