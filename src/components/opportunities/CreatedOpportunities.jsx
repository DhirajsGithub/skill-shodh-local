import { Alert, Snackbar, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import Applications from "./Applications";
import {
  applications,
  createdoppo,
  stopaccepting,
} from "../../utils/opportunitiesapi";
import { useDispatch, useSelector } from "react-redux";
import OpportunityCardSkeleton from "./OpportunityCardSkeleton";
import DeleteModal from "./Modals/DeleteModal";
import CreatedOppotunityCard from "./CreatedOppotunityCard";

const CreatedOpportunities = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const refs = useRef({});
  const [scrollToOppo, setScrollToOppo] = useState("");
  const [createdOpportunities, setCreatedOpportunities] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(true);

  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [applicationsFor, setApplicationsFor] = useState({});

  const fetchCreatedOpportunities = async () => {
    try {
      let res = await createdoppo(user?.email);
      console.log(res);
      if (res.staus && res.data) {
        setCreatedOpportunities(res.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCreatedOpportunities();
  }, [user]);

  const onOpportunityDelete = (oppoCode) => {
    setCreatedOpportunities((prev) => {
      return prev.filter((oppo) => oppo.oppocode !== oppoCode);
    });
  };
  const onApplicationClose = async (oppoCode) => {
    try {
      let res = await stopaccepting(oppoCode);
      if (res.staus) {
        setSnackBarInfo({
          type: "success",
          msg: "Applications stopped successfully for this opportunity",
        });
        setShowSnackbar(true);
        setCreatedOpportunities((prev) => {
          return prev.map((oppo) => {
            if (oppo.oppocode === oppoCode) {
              return { ...oppo, status: false };
            }
            return oppo;
          });
        });
      }
    } catch (error) {
      setSnackBarInfo({
        type: "error",
        msg: "Internal server error",
      });
      setShowSnackbar(true);
    }
  };
  const handleViewApplicationsClick = (data) => {
    setApplicationsOpen(true);
    setApplicationsFor(data);
  };
  const handleCloseApplications = (data) => {
    setApplicationsOpen(false);
    setScrollToOppo(data?.oppocode);
    setApplicationsFor({});
  };

  useEffect(() => {
    if (scrollToOppo) {
      scrollToOpportunity(scrollToOppo);
    }
  }, [scrollToOppo]);

  const scrollToOpportunity = (opportunityCode) => {
    if (refs.current[opportunityCode]) {
      refs.current[opportunityCode].scrollIntoView({ behavior: "smooth" });
      setScrollToOppo("");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DeleteModal onOpportunityDelete={onOpportunityDelete} />
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
      {!applicationsOpen && (
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
          {!loading &&
            createdOpportunities?.map((oppo) => {
              return (
                <Box
                  key={oppo._id}
                  ref={(el) => {
                    refs.current[oppo.oppocode] = el;
                  }}
                >
                  <CreatedOppotunityCard
                    onApplicationClose={onApplicationClose}
                    opportunity={oppo}
                    handleViewApplicationsClick={handleViewApplicationsClick}
                  />
                </Box>
              );
            })}
        </Box>
      )}
      {applicationsOpen && (
        <Applications
          applicationsFor={applicationsFor}
          handleCloseApplications={handleCloseApplications}
          handleBackToOppo={(oppoCode) => setScrollToOppo(oppoCode)}
        />
      )}
    </Box>
  );
};

export default CreatedOpportunities;
