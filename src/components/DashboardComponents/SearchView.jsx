import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TopSkillsHeader from "./TopSkillsHeader";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";
import ProileCardSkeleton from "./ProileCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadmore } from "../../utils/searchapi";

const SearchView = ({ profileData, profilesLoading }) => {
  const ref = useRef();
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { searchValue, collegeFilterList, skillsFilterList } = useSelector(
    (state) => state.headerSlice
  );
  const [hasMore, setHasMore] = useState(true);
  const [localProfileData, setLocalProfileData] = useState(profileData);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreProfileData = async () => {
    try {
      setLoadingMore(true);
      let res = await loadmore(
        searchValue,
        collegeFilterList,
        skillsFilterList,
        localProfileData
      );

      setLoadingMore(false);
      if (res.status === true) {
        setLocalProfileData((prevData) => [...prevData, ...res.data]);
        if (res.message === false) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setLoadingMore(false);
    }
  };
  useEffect(() => {
    setHasMore(true);
    setLocalProfileData(profileData);
  }, [profileData, collegeFilterList, skillsFilterList, searchValue]);

  useEffect(() => {
    if (ref.current && !profilesLoading && !loadingMore) {
      ref.current.scrollTop -= 500;
    }
  }, [localProfileData]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, []);
  return (
    <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      <TopSkillsHeader />
      {localProfileData?.length === 0 && !profilesLoading && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Typography variant="h4">No profile found...</Typography>
        </Box>
      )}

      {!profilesLoading && (
        <Box
          ref={ref}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            padding: smallScreen ? "20px 16px" : "40px 30px",
          }}
        >
          {localProfileData?.length > 0 &&
            localProfileData?.map((profile) => {
              return <ProfileCard key={profile._id} cardData={profile} />;
            })}
        </Box>
      )}

      {(profilesLoading || loadingMore) && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            padding: smallScreen ? "20px 16px" : "40px 30px",
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => {
            return <ProileCardSkeleton key={index} />;
          })}
        </Box>
      )}
      {/* <InfiniteScroll
        dataLength={localProfileData?.length}
        next={loadMoreProfileData}
        hasMore={hasMore}
        loader={
          <Typography style={{ textAlign: "center" }}>
            <b>Loading...</b>
          </Typography>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {!profilesLoading && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              padding: smallScreen ? "20px 16px" : "40px 30px",
            }}
          >
            {localProfileData?.length > 0 &&
              localProfileData?.map((profile) => {
                return <ProfileCard key={profile._id} cardData={profile} />;
              })}
          </Box>
        )}
      </InfiniteScroll> */}

      {localProfileData?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            paddingBottom: "40px",
          }}
        >
          <Typography
            onClick={() => {
              !loadingMore && hasMore && loadMoreProfileData();
            }}
            sx={{
              color: "#5773FF",
              cursor: hasMore ? "pointer" : "default",
              ":hover": {
                textDecoration: hasMore ? "underline" : "none",
              },
            }}
            variant="body1"
          >
            {hasMore
              ? loadingMore
                ? "Loading..."
                : "Load More"
              : "No more profiles"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchView;
