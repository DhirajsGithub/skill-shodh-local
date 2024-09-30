import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReferralCode from "../../components/referAndEarnComponents/ReferralCode";
import RefererHead from "../../components/referAndEarnComponents/RefererHead";
import Leaderboard from "../../components/referAndEarnComponents/Leaderboard";
import { useSelector } from "react-redux";
import { myreferraldata } from "../../utils/referralapi";
import LoadingScreen from "../../components/generalComponents/LoadingScreen";
import SEO from "../../SEO";
import SEOContent from "../../SEOContext";

const ReferAndEarn = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { user } = useSelector((state) => state.authSlice);
  const [refererData, setRefererData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchRefererData = async () => {
    setLoading(true);
    let res = await myreferraldata();
    setLoading(false);
    if (res?.data) {
      setRefererData(res.data);
    }
  };
  useEffect(() => {
    fetchRefererData();
  }, [user]);

  const handleRefreshClick = () => {
    fetchRefererData();
  };
  if (loading) {
    return <LoadingScreen loading={loading} name="Fetching Referral Data" />;
  }

  return (
    <Box
      sx={{
        padding: smallScreen ? "20px" : "40px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <SEO
title={SEOContent.ReferAndWin.title}
description={SEOContent.ReferAndWin.description}
keywords={SEOContent.ReferAndWin.keywords} />
      <RefererHead handleRefreshClick={handleRefreshClick} />
      <ReferralCode refererData={refererData} />

      <Leaderboard refererData={refererData} />
    </Box>
  );
};

export default ReferAndEarn;
