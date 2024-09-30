import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import BasicDetails from "../../components/OnboardingComponents/BasicDetails";
import Stepper from "../../components/OnboardingComponents/Stepper";
import Header from "../../components/OnboardingComponents/Header";
import EducationDetails from "../../components/OnboardingComponents/EducationDetails";
import SkillDetails from "../../components/OnboardingComponents/SkillDetails";
import Socials from "../../components/OnboardingComponents/Socials";
import Footer from "../../components/OnboardingComponents/Footer";
import LastStep from "../../components/OnboardingComponents/LastStep";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber, setUserAuthentication } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/generalComponents/LoadingScreen";
import { getcurrentuser } from "../../utils/api";
import SEO from "../../SEO";
import SEOContent from "../../SEOContext";

const Onboarding = () => {
  const childRef = useRef();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.authSlice);
  const { pageDetail } = useSelector((state) => state.onboardingSlice);

  const [loading, setLoading] = useState(false);

  // just to check if user is authenticated or not if someone puts /onboarding that' why it will check

  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      setLoading(true);

      let res = await getcurrentuser();
      console.log(res);
      if (res.status && res.data) {
        dispatch(setPageNumber(res.data.step ?? 0));
        if (res.data.step === 4) {
          navigate("/");
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const handleNextButtonClick = () => {
    childRef.current?.handleNextClick();
  };

  if (loading) {
    return <LoadingScreen loading={loading} />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <SEO
title={SEOContent.Onboarding.title}
description={SEOContent.Onboarding.description}
keywords={SEOContent.Onboarding.keywords} />
      <Box>
        <Header pageDetail={pageDetail} />
        <Stepper pageDetail={pageDetail} />
        {pageDetail.number === 0 && <BasicDetails ref={childRef} />}
        {pageDetail.number === 1 && <EducationDetails ref={childRef} />}
        {pageDetail.number === 2 && <SkillDetails ref={childRef} />}
        {pageDetail.number === 3 && <Socials ref={childRef} />}
        {pageDetail.number === 4 && <LastStep />}
      </Box>

      {pageDetail.number !== 4 && (
        <Footer handleNextButtonClick={handleNextButtonClick} />
      )}
    </Box>
  );
};

export default Onboarding;
