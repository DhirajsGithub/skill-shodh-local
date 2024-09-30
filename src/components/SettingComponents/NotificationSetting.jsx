import React from "react";
import CommonDesktopLayout from "./CommonDesktopLayout";
import { useMediaQuery } from "@mui/material";
import SwitchRow from "./SwitchRow";
import CommonMobileLayout from "./CommonMobileLayout";
import { Box } from "@mui/system";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { change_dm_noti, change_teams_noti } from "../../utils/settingsapi";
import { setUserAuthentication } from "../../store";

const DesktopView = ({
  hannldePersonalDMNotificationChange,
  handleTeamDMNotificationChange,
  user,
}) => {
  return (
    <CommonDesktopLayout name="Notification" subname="Notification Setting">
      <Box
        sx={{
          padding: "10px 0px",
          borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
        }}
      >
        <SwitchRow
          name="Direct Message Notifcation"
          checked={user?.settings?.dm_noti || false}
          handleOnChange={hannldePersonalDMNotificationChange}
        />
      </Box>
      <Box
        sx={{
          padding: "10px 0px",
          borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
        }}
      >
        <SwitchRow
          name="Team Chat Notification"
          checked={user?.settings?.teams_noti || false}
          handleOnChange={handleTeamDMNotificationChange}
        />
      </Box>
      <Box
        sx={{
          padding: "10px 0px",
          borderBottom: "1px solid rgba(136, 136, 136, 0.20)",
        }}
      >
        <SwitchRow
          name="General Notification"
          checked={true}
          handleOnChange={() => {}}
        />
      </Box>
    </CommonDesktopLayout>
  );
};

const MobileView = ({
  hannldePersonalDMNotificationChange,
  handleTeamDMNotificationChange,
  user,
}) => {
  return (
    <CommonMobileLayout
      handleBackClick={handleBackClick}
      name="Notification"
      subname="Notification Setting"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Layout>
          <SwitchRow
            name="Direct Message Notifcation"
            checked={user?.settings?.dm_noti || false}
            handleOnChange={hannldePersonalDMNotificationChange}
          />
        </Layout>
        <Layout>
          <SwitchRow
            name="Team Chat Notification"
            checked={user?.settings?.teams_noti || false}
            handleOnChange={handleTeamDMNotificationChange}
          />
        </Layout>
        <Layout>
          <SwitchRow
            name="General Notification"
            checked={true}
            handleOnChange={() => {}}
          />
        </Layout>
      </Box>
    </CommonMobileLayout>
  );
};

const NotificationSetting = ({ handleBackClick }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const hannldePersonalDMNotificationChange = async (val) => {
    let res = await change_dm_noti(user.email, val.target.checked);
    if (res.status) {
      const changedSettings = {
        ...user.settings,
        dm_noti: !val.target.checked,
      };
      dispatch(
        setUserAuthentication({
          ...user,
          settings: changedSettings,
        })
      );
    }
  };
  const handleTeamDMNotificationChange = async (val) => {
    let res = await change_teams_noti(user.email, val.target.checked);
    if (res.status) {
      const changedSettings = {
        ...user.settings,
        teams_noti: !val.target.checked,
      };
      dispatch(
        setUserAuthentication({
          ...user,
          settings: changedSettings,
        })
      );
    }
  };
  return (
    <>
      {smallScreen ? (
        <MobileView
          hannldePersonalDMNotificationChange={
            hannldePersonalDMNotificationChange
          }
          handleTeamDMNotificationChange={handleTeamDMNotificationChange}
          user={user}
          handleBackClick={handleBackClick}
        />
      ) : (
        <DesktopView
          hannldePersonalDMNotificationChange={
            hannldePersonalDMNotificationChange
          }
          handleTeamDMNotificationChange={handleTeamDMNotificationChange}
          user={user}
        />
      )}
    </>
  );
};

export default NotificationSetting;
