// src/components/Banner.js
import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Banner from "../components/publicProfileCompnents/Banner";
import SkillsField from "../components/publicProfileCompnents/SkillsField";
import Description from "../components/publicProfileCompnents/Description";
import ProfileCard from "../components/DashboardComponents/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import { getpublicprofile } from "../utils/api";
import Educations from "../components/publicProfileCompnents/Educations";
import Internships from "../components/publicProfileCompnents/Internships";
import Projects from "../components/publicProfileCompnents/Projects";
import PositionOfResponsibility from "../components/publicProfileCompnents/PositionOfResponsibility";
import PublicViewSkeleton from "../components/publicProfileCompnents/PublicViewSkeleton";
import SEOImage from "../SEOImage";

const PublicProfile = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { userName } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getpublicprofile(userName);
      if (response.status === true && response.data) {
        setUserData(response?.data?.info);
        setSuggestions(response?.data?.suggestions);
      } else {
        navigate("/404");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [userName]);
  return (
    <>
      {loading && <PublicViewSkeleton userName={userName} />}
      {!loading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: smallScreen && "30px",
            paddingBottom: "60px",
          }}
        >
          <SEOImage
title={userData?.name_first+' '+userData?.name_last+' - SkillShodh'} 
description={userData?.bio}
keywords={userData?.name_first+','+userData?.name_last+','+userName+','+userData?.bio+', SkillShodh, profile, user, connection'}
image={userData?.profile} />
          <Banner userName={userName} userData={userData} />
          <Box
            sx={{
              padding: smallScreen ? "0px 20px" : "0px 30px",
              display: "flex",
              width: "100%",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                width: "100%",
              }}
            >
              <SkillsField skills={userData.skillslevel} />
              <Description
                bio={
                  userData?.bio
                    ? userData?.bio
                    : userData?.sbio
                    ? userData?.sbio
                    : "No bio"
                }
              />
              <Educations
                school={userData?.school}
                college={userData?.college}
                graduationyear={userData?.graduation}
              />
              <Internships interns={userData?.interns || []} />
              <Projects projects={userData?.projects || []} />
              <PositionOfResponsibility pors={userData?.por || []} />
            </Box>
            <Box sx={{ display: smallScreen ? "none" : "block" }}>
              <Typography variant="h5">Profile Suggestions</Typography>
              <br />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                {suggestions?.map((suggestion, index) => {
                  return <ProfileCard key={index} cardData={suggestion} />;
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PublicProfile;
