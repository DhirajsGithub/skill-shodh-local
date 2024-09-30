import {
  Alert,
  Box,
  Button,
  Snackbar,
  useMediaQuery,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterOpportunity from "./FilterOpportunity";
import OpportunityCardSkeleton from "./OpportunityCardSkeleton";
import {
  findoppoapply,
  newoppo,
  newoppoloadmore,
} from "../../utils/opportunitiesapi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setOpportunityModalData, setOpportunityModalInfo } from "../../store";
import ApplyToOpportunityModal from "./Modals/ApplyToOpportunityModal";
import OpportunityApplyCard from "./OpportunityApplyCard";
import ExpiredOppoModal from "./Modals/ExpiredOppoModal";
import FilterOpportunitiesModal from "./Modals/FilterOpportunitiesModal";

const NewOpportunities = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { user, isAuthenticated } = useSelector((state) => state.authSlice);
  const [newOpportunities, setNewOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const { newOpportunitiesFilter } = useSelector(
    (state) => state.opportunitySlice
  );

  const fetchNewOpportunities = async (skills, isPaid, isCompanyOnly) => {
    try {
      // no need of email
      let res = await newoppo(
        user?.email || "",
        skills || [],
        user?.college || "",
        isPaid,
        isCompanyOnly
      );

      if (res.staus && res.data) {
        setNewOpportunities(res.data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNewOpportunities(user?.skills, newOpportunitiesFilter.ispaid,
      newOpportunitiesFilter.iscompanyonly);
  }, [user]);

  const fetchOportunitiesBasedOnFilter = () => {
    if (newOpportunitiesFilter.skills?.length === 0) {
      fetchNewOpportunities(
        user?.skills,
        newOpportunitiesFilter.ispaid,
        newOpportunitiesFilter.iscompanyonly
      );
    } else {
      fetchNewOpportunities(
        newOpportunitiesFilter.skills,
        newOpportunitiesFilter.ispaid,
        newOpportunitiesFilter.iscompanyonly
      );
    }
  };

  const handleAplliedToOpportunity = (oppoCode) => {
    setNewOpportunities((prev) => {
      return prev.filter((opp) => opp.oppocode !== oppoCode);
    });
    setSnackBarInfo({
      type: "success",
      msg: "Applied to opportunity successfully",
    });
    setShowSnackbar(true);
  };

  // Fetches the data for the opportunity that the user is trying to apply to using the oppocode in the URL
  const fetchApplyToOpportunityData = async () => {
    try {
      let res = await findoppoapply(
        searchParams.get("oppocode"),
        user?.email,
        user?.college
      );
      if (res.staus && res.data) {
        dispatch(setOpportunityModalInfo("newOpportunityApply"));
        dispatch(setOpportunityModalData(res.data));
      } else {
        dispatch(setOpportunityModalInfo("expiredOppoModal"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLoadMoreOpportunities = async () => {
    setLoading(true);

    let res = await newoppoloadmore(
      user?.email,
      user?.skills,
      user?.college,
      newOpportunities.map((opp) => opp.oppocode)
    );

    setLoading(false);
    if (!res.message) {
      setShowLoadMore(false);
      return;
    }
    if (res.staus) {
      setNewOpportunities((prev) => [...prev, ...res.data]);
    }
  };
  useEffect(() => {
    if (searchParams.get("oppocode")) {
      fetchApplyToOpportunityData();
    }
  }, [searchParams]);
  return (
    <Box>
      <ApplyToOpportunityModal
        handleAplliedToOpportunity={handleAplliedToOpportunity}
      />
      <FilterOpportunitiesModal
        fetchOportunitiesBasedOnFilter={fetchOportunitiesBasedOnFilter}
      />
      <ExpiredOppoModal />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={2000}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackBarInfo.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarInfo.msg}
        </Alert>
      </Snackbar>
      <FilterOpportunity tab="newOpportunities" />
      <Box
        sx={{
          padding: smallScreen ? "20px" : "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {newOpportunities.length === 0 && !loading && (
          <Typography variant="body1">No new Opportunities Found</Typography>
        )}
        {newOpportunities?.map((opp, index) => {
          return <OpportunityApplyCard key={opp._id} opportunity={opp} />;
        })}
        {loading &&
          Array.from({ length: 10 }).map((_, i) => {
            return <OpportunityCardSkeleton key={i} />;
          })}
        {newOpportunities.length >= 15 && showLoadMore && !loading && (
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="text"
              sx={{ color: "#5773FF" }}
              onClick={fetchLoadMoreOpportunities}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewOpportunities;
