import { Avatar, Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

import CommonRow from "./CommonRow";
import SkillChip from "./SkillChip";
import { useDispatch } from "react-redux";
import { setOpportunityModalData, setOpportunityModalInfo } from "../../store";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import moment from "moment";

const AppliedOpportunityCard = ({ opportunity }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
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
        padding: smallScreen ? "0px 0px 15px 20px" : "0px 0px 20px 30px",
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

          alignItems: "unset",
          gap: "20px",
        }}
      >
        <Box sx={{ marginTop: smallScreen ? "15px" : "20px" }}>
          <CommonRow label="Title of Position" answer={opportunity?.ptitle} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backgroundColor: opportunity?.hired ? "#428D2F" : "#888",
            padding: smallScreen ? "8px 15px" : "12px 20px",
            alignSelf: "self-start",
            borderRadius: "0px 0px 0px 10px",
          }}
        >
          <Typography>{opportunity?.hired ? "Hired" : "Pending"}</Typography>
          {opportunity?.hired ? (
            <CheckCircleOutlineIcon
              sx={{ color: "#fff", fontSize: smallScreen ? "16px" : "18px" }}
            />
          ) : (
            <AccessTimeIcon
              sx={{ color: "#fff", fontSize: smallScreen ? "16px" : "18px" }}
            />
          )}
        </Box>
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
              //   minWidth: "max-content",
              display: "flex",
              gap: "20px",
              marginRight: smallScreen ? "20px" : "30px",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                dispatch(setOpportunityModalInfo("viewOpportunityModal"));
                dispatch(setOpportunityModalData(opportunity));
              }}
              sx={{
                color: "#fff",
                fontSize: "14px",
                fontWeight: 400,
                textTransform: "none",
              }}
              variant="text"
            >
              View
            </Button>
            <Box
              sx={{
                borderRadius: "46px",
                background: "#888",
                padding: "8px 16px",
                minWidth: "max-content",
                backgroundColor: "#888888",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#FFF" }} variant="body2">
                Applied on {moment(opportunity?.time)?.format("Do MMMM YYYY")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppliedOpportunityCard;
