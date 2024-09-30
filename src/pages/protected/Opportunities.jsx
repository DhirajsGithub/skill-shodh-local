import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/opportunities/Header";
import NewOpportunities from "../../components/opportunities/NewOpportunities";
import CreatedOpportunities from "../../components/opportunities/CreatedOpportunities";
import AppliedOpportunities from "../../components/opportunities/AppliedOpportunities";
import CreateOpportunities from "../../components/opportunities/CreateOpportunities";
import ViewOpportunityModal from "../../components/opportunities/Modals/ViewOpportunityModal";
import { useSelector } from "react-redux";
import SEO from "../../SEO";
import SEOContent from "../../SEOContext";

const Opportunities = () => {
  const [tab, setTab] = useState("NewOpportunities");
  const handleTabChange = (tab) => {
    setTab(tab);
  };
  const { isAuthenticated } = useSelector((state) => state.authSlice);

  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <SEO
title={SEOContent.Opportunity.title}
description={SEOContent.Opportunity.description}
keywords={SEOContent.Opportunity.keywords} />
      <ViewOpportunityModal />

      <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <Header tab={tab} handleTabChange={handleTabChange} />
        {tab === "NewOpportunities" && <NewOpportunities />}
        {tab === "CreateOpportunities" && isAuthenticated && (
          <CreateOpportunities />
        )}
        {tab === "AppliedOpportunities" && isAuthenticated && (
          <AppliedOpportunities />
        )}
        {tab === "CreatedOpportunities" && isAuthenticated && (
          <CreatedOpportunities />
        )}
      </Box>
    </Box>
  );
};

export default Opportunities;
