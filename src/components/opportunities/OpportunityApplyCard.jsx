import { Avatar, Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

import CommonRow from "./CommonRow";
import SkillChip from "./SkillChip";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpportunityModalData,
  setOpportunityModalInfo,
  setSnackBarInfo,
} from "../../store";
import { useLocation, useNavigate } from "react-router-dom";

const OpportunityApplyCard = ({ opportunity }) => {
  const { isAuthenticated } = useSelector((state) => state.authSlice);

  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const formatStipendAmount = (amount) => {
    if (amount % 1000 === 0) {
      return `${amount / 1000}k / mo`;
    } else {
      return `${amount} / mo`;
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        padding: smallScreen ? "15px 20px" : "20px 30px",
        backgroundColor: "#212126",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <CommonRow label="Title of Position" answer={opportunity?.ptitle} />
        {opportunity?.company && <Avatar src={opportunity?.bydetails?.logo} />}
      </Box>

      <CommonRow label="Project / Start Up Name" answer={opportunity?.sname} />
      <CommonRow
        label="Description of the Position"
        answer={opportunity?.pdesc}
      />
      <CommonRow
        label="Type"
        answer={
          opportunity?.stipendalb
            ? `Paid - ${formatStipendAmount(opportunity?.stipendamt)}`
            : "Unpaid"
        }
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: "100%",
        }}
      >
        <Typography variant="subtitle2">Skills Required</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            width: "100%",
            flexWrap: smallScreen && "wrap",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: smallScreen ? "10px" : "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {opportunity?.skills?.map((skill, index) => {
              return <SkillChip key={index} label={skill} />;
            })}
          </Box>

          <Box
            sx={{
              width: smallScreen ? "100%" : "auto",
              minWidth: "max-content",
            }}
          >
            <Button
              onClick={() => {
                if (location.pathname?.includes("company")) {
                  navigate("/opportunities?oppocode=" + opportunity?.oppocode);
                }
                dispatch(setOpportunityModalInfo("newOpportunityApply"));
                dispatch(setOpportunityModalData(opportunity));
              }}
              sx={{
                borderRadius: "25px",
                background: "#428D2F",
                color: "#fff",
                width: "100%",
                padding: "10px 30px",
                fontSize: "14px",
                fontWeight: 400,
                textTransform: "none",
                ":hover": {
                  background: "#2d6120",
                },
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OpportunityApplyCard;
