import { Box, Modal, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

import CommonRow from "../CommonRow";
import SkillChip from "../SkillChip";
import { ModalStyle } from "../../../styles/styles.js";
import {
  setOpportunityModalData,
  setOpportunityModalInfo,
} from "../../../store";
const formatStipendAmount = (amount) => {
  if (amount % 1000 === 0) {
    return `${amount / 1000}k / mo`;
  } else {
    return `${amount} / mo`;
  }
};

const ViewOpportunityModal = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { opportunityModalInfo, opportunityModalData } = useSelector(
    (state) => state.opportunitySlice
  );
  const applyToOpportunityData = opportunityModalData
    ? opportunityModalData
    : {};

  const style = {
    maxHeight: smallScreen ? "80vh" : "90vh",
    padding: smallScreen ? "15px 20px" : "20px 30px",
    gap: smallScreen ? "20px" : "20px",
    maxWidth: "700px",
    background: "#212126",
    width: smallScreen ? "90%" : "700px",
  };
  const handleClose = () => {
    dispatch(setOpportunityModalInfo(""));
    dispatch(setOpportunityModalData(null));
  };

  return (
    <Modal
      open={opportunityModalInfo === "viewOpportunityModal"}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...ModalStyle, ...style }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "flex-start",
            flexDirection: smallScreen ? "row-reverse" : "row",
          }}
        >
          <CloseIcon
            onClick={handleClose}
            sx={{
              color: "#fff",
              width: smallScreen ? "25px" : "30px",
              height: smallScreen ? "25px" : "30px",
              cursor: "pointer",
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: smallScreen ? "15px" : "20px",
          }}
        >
          <CommonRow
            isModal={true}
            label="Title of Position"
            answer={applyToOpportunityData?.ptitle}
          />
          <CommonRow
            isModal={true}
            label="Project / Start Up Name"
            answer={applyToOpportunityData?.sname}
          />
          <CommonRow
            isModal={true}
            label="Description of the Position"
            answer={applyToOpportunityData?.pdesc}
          />
          <CommonRow
            isModal={true}
            label="Description of the Project / StartUp"
            answer={applyToOpportunityData?.sdesc}
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
                flexWrap: "wrap",
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
                {applyToOpportunityData?.skills?.map((skill, index) => {
                  return <SkillChip key={index} label={skill} />;
                })}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography
              sx={{ fontSize: smallScreen ? "12px" : "16px" }}
              variant="subtitle2"
            >
              Students From
            </Typography>
            {applyToOpportunityData?.anycoll ? (
              <Typography
                sx={{ fontSize: smallScreen ? "14px" : "18px" }}
                variant="body2"
              >
                Any College
              </Typography>
            ) : (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {applyToOpportunityData?.colleges?.map((college, index) => {
                  return (
                    <Typography
                      key={index}
                      sx={{ fontSize: smallScreen ? "14px" : "18px" }}
                      variant="body2"
                    >
                      {college}
                    </Typography>
                  );
                })}
              </Box>
            )}
          </Box>

          <CommonRow
            isModal={true}
            label="CV"
            answer={applyToOpportunityData?.cvr ? "Required" : "Not required"}
          />
          <CommonRow
            label="Type"
            answer={
              applyToOpportunityData?.stipendalb
                ? `Paid - ${formatStipendAmount(
                    applyToOpportunityData?.stipendamt
                  )}`
                : "Unpaid"
            }
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography
              sx={{ fontSize: smallScreen ? "12px" : "16px" }}
              variant="subtitle2"
            >
              Questionnaire
            </Typography>
            {applyToOpportunityData?.questions?.length === 0 && (
              <Typography
                sx={{ fontSize: smallScreen ? "14px" : "18px" }}
                variant="body2"
              >
                No questions
              </Typography>
            )}

            {applyToOpportunityData?.questions?.length > 0 && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {applyToOpportunityData?.questions?.map((question, index) => {
                  return (
                    <Box key={index}>
                      <Typography
                        sx={{ fontSize: smallScreen ? "14px" : "18px" }}
                        variant="body2"
                      >
                        {(index+1)+'. '+question?.question}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewOpportunityModal;
