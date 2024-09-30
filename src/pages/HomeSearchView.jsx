import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SearchView from "../components/DashboardComponents/SearchView";
import { search } from "../utils/searchapi";
import { useSelector } from "react-redux";
import SEO from "../SEO";
import SEOContent from "../SEOContext";

const HomeSearchView = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const { searchValue, collegeFilterList, skillsFilterList } = useSelector(
    (state) => state.headerSlice
  );
  console.log(profileData);
  const fetchSearchViewData = async (text, skills, colleges) => {
    try {
      setLoading(true);
      let res = await search(text, colleges, skills);
      if (res.status === true) {
        setProfileData(res.data);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const debounceFunc = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFn = useCallback(debounceFunc(fetchSearchViewData), []);

  useEffect(() => {
    optimizedFn(searchValue, collegeFilterList, skillsFilterList);
  }, [searchValue, collegeFilterList, skillsFilterList]);
  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <SEO
title={SEOContent.Search.title}
description={SEOContent.Search.description}
keywords={SEOContent.Search.keywords} />
      <SearchView profilesLoading={loading} profileData={profileData} />
    </Box>
  );
};

export default HomeSearchView;
