import { Alert, Box, Snackbar, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Privacy from "../../components/SettingComponents/Privacy";
import SettingsIcon from "@mui/icons-material/Settings";
import ShieldIcon from "@mui/icons-material/Shield";
import GroupIcon from "@mui/icons-material/Group";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import WestIcon from "@mui/icons-material/West";
import { useDispatch, useSelector } from "react-redux";
import { setChangePasswordInfo, setSettingSnackBarInfo } from "../../store";
import ChangePasswordModal from "../../components/SettingComponents/ChangePasswordModal";
import TeamsSetting from "../../components/SettingComponents/TeamsSetting";
import NotificationSetting from "../../components/SettingComponents/NotificationSetting";
import DeleteAccount from "../../components/SettingComponents/DeleteAccount";
import DeleteModal from "../../components/SettingComponents/DeleteModal";
import { useSearchParams } from "react-router-dom";
import { getproviders } from "../../utils/settingsapi";
import SEO from "../../SEO";
import SEOContent from "../../SEOContext";

const DesktopNavItem = ({ icon, name, id, handleOnClick, activeId }) => {
  return (
    <Box
      onClick={() => handleOnClick(id)}
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        padding: "16px 20px",
        cursor: "pointer",
        backgroundColor: id === activeId && "#212126",
      }}
    >
      {icon}
      <Typography
        sx={{ color: name === "DeleteAccount" && "#FF4242" }}
        variant="h6"
      >
        {name}
      </Typography>
    </Box>
  );
};

const NavigationItems = ({
  handleNavButtonClick,
  activeId,
  handleBackClick,
}) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        width: smallScreen ? "100%" : "265px",
        borderRight: "1px solid rgba(136, 136, 136, 0.20)",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          padding: "20px",
          alignItems: "center",
        }}
      >
        {!smallScreen && (
          <SettingsIcon sx={{ color: "#fff", width: "25px", height: "25px" }} />
        )}
        {smallScreen && (
          <WestIcon
            onClick={handleBackClick}
            sx={{ color: "#fff", width: "25px", height: "25px" }}
          />
        )}
        <Typography variant="h5">Settings</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <DesktopNavItem
          handleOnClick={handleNavButtonClick}
          activeId={activeId}
          id={1}
          icon=<ShieldIcon
            sx={{ color: "#fff", width: "20px", height: "20px" }}
          />
          name="Privacy"
        />
        <DesktopNavItem
          handleOnClick={handleNavButtonClick}
          activeId={activeId}
          id={2}
          icon=<GroupIcon
            sx={{ color: "#fff", width: "20px", height: "20px" }}
          />
          name="Teams"
        />
        {/* <DesktopNavItem
          handleOnClick={handleNavButtonClick}
          activeId={activeId}
          id={3}
          icon=<LightModeIcon
            sx={{ color: "#fff", width: "20px", height: "20px" }}
          />
          name="Theme"
        /> */}
        <DesktopNavItem
          handleOnClick={handleNavButtonClick}
          activeId={activeId}
          id={4}
          icon=<NotificationsIcon
            sx={{ color: "#fff", width: "20px", height: "20px" }}
          />
          name="Notification"
        />
        <DesktopNavItem
          handleOnClick={handleNavButtonClick}
          activeId={activeId}
          id={5}
          icon=<RemoveCircleIcon
            sx={{ color: "#FF4242", width: "20px", height: "20px" }}
          />
          name="DeleteAccount"
        />
      </Box>
    </Box>
  );
};

const Settings = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { snackBarInfo } = useSelector((state) => state.settingSlice);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openContent, setOpenContent] = useState(false);
  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState(1);
  const handleNavButtonClick = (id) => {
    setOpenContent(true);
    setActiveId(id);
  };

  const [providerDetails, setProviderDetails] = useState([]);

  const fetchProviderDetails = async () => {
    try {
      const providers = await getproviders();
      if (providers.status) {
        setProviderDetails(providers.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProviderDetails();
  }, []);
  useEffect(() => {
    if (
      searchParams.get("openChangePassModal") === "true" &&
      providerDetails.includes("email")
    ) {
      dispatch(setChangePasswordInfo({ open: true, data: null }));
    }
  }, [searchParams, providerDetails]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <SEO
title={SEOContent.Settings.title}
description={SEOContent.Settings.description}
keywords={SEOContent.Settings.keywords} />
      <ChangePasswordModal />
      <DeleteModal />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBarInfo.open}
        onClose={() =>
          dispatch(
            setSettingSnackBarInfo({ open: false, message: "", type: "" })
          )
        }
        autoHideDuration={3000}
      >
        <Alert
          onClose={() =>
            dispatch(
              setSettingSnackBarInfo({ open: false, message: "", type: "" })
            )
          }
          severity={snackBarInfo.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarInfo.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100%",
          overflowY: "scroll",
        }}
      >
        {(!openContent || !smallScreen) && (
          <NavigationItems
            handleBackClick={() => setOpenContent(true)}
            activeId={activeId}
            handleNavButtonClick={handleNavButtonClick}
          />
        )}

        {(openContent || !smallScreen) && (
          <Box
            sx={{
              padding: smallScreen ? "20px" : "20px 30px",
              height: "100%",
              width: "100%",
            }}
          >
            {activeId === 1 && (
              <Privacy handleBackClick={() => setOpenContent(false)} />
            )}
            {activeId === 2 && (
              <TeamsSetting handleBackClick={() => setOpenContent(false)} />
            )}
            {activeId === 4 && (
              <NotificationSetting
                handleBackClick={() => setOpenContent(false)}
              />
            )}
            {activeId === 5 && (
              <DeleteAccount handleBackClick={() => setOpenContent(false)} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
