import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import CommonDesktopLayout from "./CommonDesktopLayout";
import SwitchRow from "./SwitchRow";
import CommonMobileLayout from "./CommonMobileLayout";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { change_teams_add } from "../../utils/settingsapi";
import { setUserAuthentication } from "../../store";

const DesktopView = ({ handleSwitchChange, checked }) => {
  return (
    <CommonDesktopLayout name="Teams" subname="Teams Setting">
      <SwitchRow
        name="Anyone can add me to teams"
        checked={checked}
        handleOnChange={handleSwitchChange}
      />
    </CommonDesktopLayout>
  );
};

const MobileView = ({ checked, handleSwitchChange, handleBackClick }) => {
  return (
    <CommonMobileLayout
      handleBackClick={handleBackClick}
      name="Teams"
      subname="Teams Setting"
    >
      <Layout>
        <SwitchRow
          name="Anyone can add me to teams"
          checked={checked}
          handleOnChange={handleSwitchChange}
        />
      </Layout>
    </CommonMobileLayout>
  );
};

const TeamsSetting = ({ handleBackClick }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const handleSwitchChange = async (val) => {
    let res = await change_teams_add(user.email, val.target.checked);
    if (res.status) {
      const changedSettings = {
        ...user.settings,
        teams_add: !val.target.checked,
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
    <Box>
      {smallScreen ? (
        <MobileView
          handleBackClick={handleBackClick}
          handleSwitchChange={handleSwitchChange}
          checked={user?.settings?.teams_add || false}
        />
      ) : (
        <DesktopView
          handleSwitchChange={handleSwitchChange}
          checked={user?.settings?.teams_add || false}
        />
      )}
    </Box>
  );
};

export default TeamsSetting;
