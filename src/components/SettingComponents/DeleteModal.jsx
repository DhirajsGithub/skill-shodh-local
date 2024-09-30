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
import { setSettingDeleteModalInfo } from "../../store";
import { useNavigate } from "react-router-dom";
import { ModalStyle } from "../../styles/styles";
import { delete_user } from "../../utils/api";

const DeleteModal = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { deleteModlInfo } = useSelector((state) => state.settingSlice);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const style = {
    padding: smallScreen ? "20px" : "30px",

    gap: smallScreen ? "25px" : "35px",
    maxWidth: "500px",

    background: "#18181D",
    width: smallScreen ? "90%" : "490px",
  };
  const handleClose = () => {
    dispatch(setSettingDeleteModalInfo({ open: false, data: null }));
  };
  console.log(deleteModlInfo.data?.deleteAccReason);
  const handleDeleteAccountClick = async () => {
    setLoading(true);
    let res = await delete_user(deleteModlInfo.data?.deleteAccReason ?? "");
    setLoading(false);
    if (res.status) {
      dispatch(logoutUser());
      dispatch(setSignUpField({ field: "firstName", value: "" }));
      dispatch(setSignUpField({ field: "lastName", value: "" }));
      dispatch(setSignUpField({ field: "email", value: "" }));
      navigate("/login");
    }
    handleClose();
  };

  return (
    <Modal
      open={deleteModlInfo?.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...ModalStyle, ...style }}>
        <Typography sx={{ textAlign: "center" }} variant="h3">
          Delete Account?
        </Typography>
        <Typography
          sx={{ fontSize: smallScreen ? "14px" : "auto", textAlign: "center" }}
          variant="subtitle1"
        >
          Your account will be permanently deleted and all data will be removed,
          Are you sure?
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
              onClick={() => handleDeleteAccountClick()}
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
