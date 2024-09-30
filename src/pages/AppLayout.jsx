import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import { Box, useMediaQuery } from "@mui/material";
import Header from "../components/generalComponents/Header/Header";
import { useSelector } from "react-redux";
import JoinTeamModal from "../components/Teams/Modals/JoinTeamModal";
import CreateTeamModal from "../components/Teams/Modals/CreateTeamModal";
import TeamNameAndCodeModal from "../components/Teams/Modals/TeamNameAndCodeModal";

const AppLayout = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.authSlice);
  useEffect(() => {
    if (isAuthenticated && user?.step !== 4) {
      navigate("/onboarding");
      return;
    }
  }, [user]);

  const heightCal = smallScreen ? "calc(100% - 84px)" : "calc(100% - 104px)";

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100vw",
        minWidth: smallScreen ? "320px" : "1250px",
      }}
    >
      <SideNav />

      <Box
        sx={{
          width: "100%",
          // height: "100vh",
          height: "100%",
          overflowY: "scroll",
          overflowX: "scroll",
        }}
      >
        <JoinTeamModal />
        <CreateTeamModal />
        <TeamNameAndCodeModal />
        <Header />
        <Box sx={{ height: heightCal }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
