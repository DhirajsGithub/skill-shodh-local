import {
  Box,
  Button,
  LinearProgress,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalStyle } from "../../../styles/styles";
import {
  setOpportunityModalData,
  setOpportunityModalInfo,
} from "../../../store";
import { deleteoppo } from "../../../utils/opportunitiesapi";

const DeleteModal = ({ onOpportunityDelete }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { opportunityModalInfo, opportunityModalData } = useSelector(
    (state) => state.opportunitySlice
  );

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(setOpportunityModalInfo(""));
    dispatch(setOpportunityModalData(null));
  };

  const handleDeletelOpportunity = async () => {
    try {
      setLoading(true);
      let res = await deleteoppo(opportunityModalData?.oppocode);
      setLoading(false);
      console.log(res);
      if (res?.staus) {
        onOpportunityDelete(opportunityModalData.oppocode);
        handleClose();
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={opportunityModalInfo === "deleteCreatedOpportunityModal"}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...ModalStyle,
          padding: smallScreen ? "20px" : "30px",
          gap: smallScreen ? "25px" : "35px",
          width: smallScreen ? "90%" : "490px",
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h3">
          Delete this opportunity
        </Typography>
        <Typography
          sx={{ fontSize: smallScreen ? "14px" : "auto", textAlign: "center" }}
          variant="subtitle1"
        >
          Once deleted you have to created the opportunity. All the applications
          will be rejected and the opportunity will be disappear are you sure
          you want to delete?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button
              onClick={() => handleClose()}
              sx={{
                borderRadius: "25px",
                background: "#212126",
                color: "#fff",
                width: "100%",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: 400,
                textTransform: "none",
                ":hover": {
                  background: "#1d1d21",
                },
              }}
            >
              No, keep it
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => {
                handleDeletelOpportunity();
                // dispatch(setModalData(oppoId));
              }}
              sx={{
                borderRadius: "25px",
                background: "#FF4242",
                color: "#fff",
                width: "100%",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: 400,
                textTransform: "none",
                ":hover": {
                  background: "#fc2b2b",
                },
              }}
            >
              Yes, Delete!
            </Button>
          </Box>
        </Box>
        {loading && <LinearProgress />}
      </Box>
    </Modal>
  );
};

export default DeleteModal;
