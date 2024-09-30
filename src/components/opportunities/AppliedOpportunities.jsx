import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterOpportunity from "./FilterOpportunity";
import OpportunityCardSkeleton from "./OpportunityCardSkeleton";
import { useSelector } from "react-redux";
import { appliedoppo } from "../../utils/opportunitiesapi";
import AppliedOpportunityCard from "./AppliedOpportunityCard";

const AppliedOpportunities = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authSlice);
  const [opportunities, setOpportunities] = useState([]);
  const fetchAppliedOpportunities = async () => {
    try {
      setLoading(true);
      let res = await appliedoppo(user?.email);
      console.log(res);
      if (res.staus && res.data) {
        setOpportunities(res.data);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAppliedOpportunities();
  }, [user]);

  return (
    <Box>
      {/* <FilterOpportunity /> */}
      <Box
        sx={{
          padding: smallScreen ? "20px" : "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {loading &&
          Array.from({ length: 10 }).map((_, i) => {
            return <OpportunityCardSkeleton key={i} />;
          })}

        {opportunities?.map((oppo, index) => {
          return (
            <AppliedOpportunityCard
              key={oppo._id}
              opportunity={{ ...oppo, ...oppo.details }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default AppliedOpportunities;
