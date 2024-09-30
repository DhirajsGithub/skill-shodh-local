import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/ProfileComponents.jsx/Header";
import Stepper from "../../components/ProfileComponents.jsx/Stepper";
import { useNavigate } from "react-router-dom";
import BasicDetails from "../../components/ProfileComponents.jsx/BasicDetails";
import EducationDetils from "../../components/ProfileComponents.jsx/EducationDetils";
import Socials from "../../components/ProfileComponents.jsx/Socials";
import Skills from "../../components/ProfileComponents.jsx/Skills";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/generalComponents/LoadingScreen";
import { getcurrentuser } from "../../utils/api";
import SEO from "../../SEO";
import SEOContent from "../../SEOContext";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const pageDetail = {
    0: "Basic Details",
    1: "Education Details",
    2: "Skill Details",
    3: "Socials",
  };
  const [activePage, setActivePage] = useState(0);
  const handleStepClick = (activePage) => {
    setActivePage(activePage);
  };
  const getUserData = async () => {
    try {
      setLoading(true);
      let res = await getcurrentuser();
      if (res.status) {
        setUser(res.data);
      }
      setLoading(false);
      if (!res.status) {
        navigate("/login");
        return;
      }
      if (res && res.status === true && res.data && res.data.step !== 4) {
        navigate("/onboarding");
        return;
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, [navigate]);

  if (user && user.step === 4) {
    return (
      <Box>
        <SEO
title={SEOContent.EditProfile.title}
description={SEOContent.EditProfile.description}
keywords={SEOContent.EditProfile.keywords} />
        <Header activePage={activePage} name={pageDetail[activePage]} />

        <Stepper handleStepClick={handleStepClick} activePage={activePage} />
        {activePage === 0 && <BasicDetails />}
        {activePage === 1 && <EducationDetils />}
        {activePage === 2 && <Skills />}
        {activePage === 3 && <Socials />}
      </Box>
    );
  } else {
    return (
      <Box>
        <LoadingScreen loading={loading} />
      </Box>
    );
  }
};

export default Profile;
