import {
  Box,
  LinearProgress,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import React, { useState } from "react";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import ActionButton from "../Buttons/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { setChangePasswordInfo, setSettingSnackBarInfo } from "../../store";
import CloseIcon from "@mui/icons-material/Close";
import { changepass } from "../../utils/settingsapi";
import { useSearchParams } from "react-router-dom";

const ChangePasswordModal = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { changePasswordInfo } = useSelector((state) => state.settingSlice);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    border: "1px solid rgba(136, 136, 136, 0.20)",
    background: "#212126",
    maxWidth: "560px",
    display: "flex",
    maxHeight: "80vh",
    overflowY: "scroll",
    scrollbarWidth: "none",
    padding: "30px 20px",
    flexDirection: "column",
    gap: "27px",
    width: smallScreen ? "90%" : "570px",
    outline: "none",
  };

  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(setChangePasswordInfo({ open: false, data: null }));
    setNewPassword("");
    setReEnterNewPassword("");
    setSearchParams("");
  };
  const handleSubmitClick = async () => {
    if (newPassword === "" || reEnterNewPassword === "") {
      dispatch(
        setSettingSnackBarInfo({
          open: true,
          message: "Please fill all the fields",
          type: "error",
        })
      );
    } else if (newPassword !== reEnterNewPassword) {
      dispatch(
        setSettingSnackBarInfo({
          open: true,
          message: "New Password and Re-Enter New Password should be same",
          type: "error",
        })
      );
    } else {
      // API call to change password
      setLoading(true);
      let res = await changepass(newPassword);
      setLoading(false);
      if (res.status) {
        dispatch(
          setSettingSnackBarInfo({
            open: true,
            message: "Password changed successfully",
            type: "success",
          })
        );
        handleClose();
      } else {
        dispatch(
          setSettingSnackBarInfo({
            open: true,
            message: res.message,
            type: "info",
          })
        );
      }
    }
  };
  return (
    <Box>
      <Modal
        open={changePasswordInfo.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <LockIcon sx={{ color: "#fff", width: "24px", height: "24px" }} />
              <Typography variant="h5">Change Password</Typography>
            </Box>
            <CloseIcon
              onClick={handleClose}
              sx={{ color: "#fff", cursor: "pointer" }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <LoginSignupInput
              onChangeHandler={(text) => setNewPassword(text)}
              placeholder="New Password*"
            />
            <LoginSignupInput
              onChangeHandler={(text) => setReEnterNewPassword(text)}
              placeholder="Re-Enter New Password* "
            />
          </Box>
          <ActionButton handleOnClick={handleSubmitClick} name="Submit" />
          {loading && <LinearProgress />}
        </Box>
      </Modal>
    </Box>
  );
};

export default ChangePasswordModal;
