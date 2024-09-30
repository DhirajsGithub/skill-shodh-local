import {
  Box,
  Button,
  LinearProgress,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpportunityModalInfo } from "../../../store";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSearchParams } from "react-router-dom";

const ExpiredOppoModal = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { opportunityModalInfo } = useSelector(
    (state) => state.opportunitySlice
  );

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
  const handleClose = () => {
    dispatch(setOpportunityModalInfo(""));
    setSearchParams("");
  };

  return (
    <Modal
      open={opportunityModalInfo === "expiredOppoModal"}
      onClose={handleClose}
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
            backgroundColor: "#FF4242",
          }}
        >
          <CancelIcon
            onClick={handleClose}
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
            Whoops!
          </Typography>
          <Typography
            sx={{ fontWeight: "400", textAlign: "center" }}
            variant="h5"
          >
            The link is expired or you had aready applied to this opportunity,
            please try applying for other opportunities.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ExpiredOppoModal;
