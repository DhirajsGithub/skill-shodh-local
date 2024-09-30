import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import NoramalView from "../components/DashboardComponents/NoramalView";
import { useSelector } from "react-redux";
import SearchView from "../components/DashboardComponents/SearchView";
import TeamAndCarousel from "../components/DashboardComponents/TeamAndCarousel";
import Footer from "../components/DashboardComponents/Footer";
import { recommendation } from "../utils/recommendationapi";
import LoadingScreen from "../components/generalComponents/LoadingScreen";
import { useSearchParams } from "react-router-dom";
import SEO from "../SEO";
import SEOContent from "../SEOContext";

const Home = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { headerSearchFocus } = useSelector((state) => state.headerSlice);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const refereCode = searchParams.get("referral_code");
    if (refereCode) {
      localStorage.setItem("referral_code", refereCode);
    }
  }, [searchParams]);
  const [recommendationData, setRecommendationData] = useState([]);
  const ref = useRef();

  const handleScrollToTopClick = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const getRecommendation = async () => {
    try {
      setLoading(true);
      let res = await recommendation();
      if (res.status === true) {
        setRecommendationData(res.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getRecommendation();
  }, []);

  return (
<Box
      ref={ref}
      sx={{
        width: "100%",
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "60px",
      }}
    >
      <SEO
title={SEOContent.HomePage.title}
description={SEOContent.HomePage.description}
keywords={SEOContent.HomePage.keywords} />
      <NoramalView
        dataLoading={loading}
        recommendationData={recommendationData}
      />
      <TeamAndCarousel />
      <Footer handleScrollToTopClick={handleScrollToTopClick} />
    </Box>
  );
};

export default Home;
