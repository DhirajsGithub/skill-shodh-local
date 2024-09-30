import React, { useState } from "react";
import CommonDesktopLayout from "./CommonDesktopLayout";
import CommonMobileLayout from "./CommonMobileLayout";
import { Box, Typography, useMediaQuery } from "@mui/material";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import Layout from "./Layout";
import { useDispatch } from "react-redux";
import { setSettingDeleteModalInfo } from "../../store";

const DesktopView = ({ handleOnChange, handleDeleteAccountClick, reason }) => {
  return (
    <CommonDesktopLayout
      name="Permanent Delete Account"
      subname="* Are you sure you want to delete your account? This will permanently remove your profile and all associated data."
    >
      <Box>
        <Typography
          sx={{ marginBottom: "15px", fontSize: "18px !important" }}
          variant="body1"
        >
          Reason for Deleting Account?{" "}
        </Typography>
        <LoginSignupInput
          multiline={true}
          rows={5}
          onChangeHandler={(text) => handleOnChange(text)}
          placeholder="Write reason here"
        />

        <Box sx={{ display: "flex", marginTop: "20px" }}>
          <Typography
            onClick={() => reason?.length > 0 && handleDeleteAccountClick()}
            sx={{ color: "#FF4242", cursor: "pointer" }}
            variant="h6"
          >
            Delete Account
          </Typography>
        </Box>
      </Box>
    </CommonDesktopLayout>
  );
};

const MobileView = ({
  handleBackClick,
  handleOnChange,
  handleDeleteAccountClick,
  reason,
}) => {
  console.log(reason);
  return (
    <CommonMobileLayout
      handleBackClick={handleBackClick}
      name="Delete Account"
      subname="Permanent Delete Account"
    >
      <Layout>
        <Typography
          sx={{ marginBottom: "15px", fontSize: "16px !important" }}
          variant="body1"
        >
          Reason for Deleting Account?{" "}
        </Typography>
        <LoginSignupInput
          multiline={true}
          rows={5}
          onChangeHandler={(text) => handleOnChange(text)}
          placeholder="Write reason here"
        />
        <Box sx={{ display: "flex", marginTop: "20px" }}>
          <Typography
            onClick={() => reason?.length > 0 && handleDeleteAccountClick()}
            sx={{ color: "#FF4242", cursor: "pointer", fontSize: "16px" }}
            variant="h6"
          >
            Delete Account
          </Typography>
        </Box>
      </Layout>
    </CommonMobileLayout>
  );
};

const DeleteAccount = ({ handleBackClick }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const handleOnChange = (text) => {
    setReason(text);
  };
  const handleDeleteAccountClick = () => {
    dispatch(
      setSettingDeleteModalInfo({
        open: true,
        data: { deleteAccReason: reason },
      })
    );
  };
  return (
    <>
      {smallScreen ? (
        <MobileView
          reason={reason}
          handleOnChange={handleOnChange}
          handleBackClick={handleBackClick}
          handleDeleteAccountClick={handleDeleteAccountClick}
        />
      ) : (
        <DesktopView
          reason={reason}
          handleDeleteAccountClick={handleDeleteAccountClick}
          handleOnChange={handleOnChange}
        />
      )}
    </>
  );
};

export default DeleteAccount;
