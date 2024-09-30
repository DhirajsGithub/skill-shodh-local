import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Banner from "../../components/CompanyProfileComponents/Banner";
import FieldLayout from "../../components/CompanyProfileComponents/FieldLayout";
import PublicProfileSkeleton from "../../components/CompanyProfileComponents/PublicProfileSkeleton";
import { useParams } from "react-router-dom";
import OpportunityApplyCard from "../../components/opportunities/OpportunityApplyCard";
import { companyprofile } from "../../utils/api";
import SEOImage from "../../SEOImage";

const CompanyProfile = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [loading, setLoading] = useState(true);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [companyOpportunites, setCompanyOpportunites] = useState([]);
  const { companyId } = useParams();
  const fetchCompanyProfile = async () => {
    let res = await companyprofile(companyId);
    console.log(res);
    setLoading(false);
    if (res?.staus && res?.data?.data) {
      setCompanyProfile(res.data.data);
    }
    if (res?.staus && res?.data?.oppo) {
      setCompanyOpportunites(res.data.oppo);
    }
  };
  useEffect(() => {
    if (companyId) {
      fetchCompanyProfile();
    }
  }, [companyId]);

  if (loading) {
    return <PublicProfileSkeleton />;
  }
  if (!loading && !companyProfile) {
    return (
      <Typography
        sx={{
          textAlign: "center",
          marginTop: "20px",
        }}
        variant="h4"
      >
        Company details not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <SEOImage
title={companyProfile?.name+' - SkillShodh'} 
description={companyProfile?.description}
keywords={companyProfile?.name+','+companyProfile?.description+','+companyId+', SkillShodh, profile, company, opportunity'}
image={companyProfile?.logo} />
      <Banner companyProfile={companyProfile} />
      <Box
        sx={{
          width: "100%",
          padding: smallScreen ? "20px 15px" : "40px 30px",
          display: "flex",
          flexDirection: "column",
          gap: smallScreen ? "18px" : "25px",
        }}
      >
        <FieldLayout name="Company Description">
          <Typography sx={{ wordBreak: "break-all" }} variant="body1">
            {companyProfile?.description}
          </Typography>
        </FieldLayout>
        <FieldLayout name="Employees">
          <Typography variant="body1">
            {companyProfile?.employees} Employees
          </Typography>
        </FieldLayout>
        <FieldLayout name="Note">
          <Typography variant="body1">{companyProfile?.note}</Typography>
        </FieldLayout>

        {/* opporunities card  */}
        <Box>
          <Typography variant="h5">Our Opportunities</Typography>
          <br />
          {companyOpportunites?.length === 0 && (
            <Typography variant="body1">No opportunities found</Typography>
          )}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {companyOpportunites?.length > 0 &&
              companyOpportunites?.map((oppo) => {
                return (
                  <OpportunityApplyCard key={oppo._id} opportunity={oppo} />
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyProfile;
