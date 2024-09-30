import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CopyToClipboard from "react-copy-to-clipboard";
import CommonRow from "./CommonRow";
import SkillChip from "./SkillChip";
import { setOpportunityModalData, setOpportunityModalInfo } from "../../store";

// import { setModalData, setModalInfo } from "../../store";

const CreatedOppotunityCard = ({
  opportunity,
  handleViewApplicationsClick,
  onApplicationClose,
}) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const [anchorEl, setAnchorEl] = useState(false);
  const openCreatedOppoMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseCreatedOppoMenu = () => {
    setAnchorEl(null);
  };
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

        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <MoreVertIcon
            id="basic-button"
            aria-controls={openCreatedOppoMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openCreatedOppoMenu ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: "#fff", cursor: "pointer" }}
          />
          <Menu
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#18181D",
                border: "1px solid rgba(136, 136, 136, 0.20)",
              },

              "& .MuiMenuItem-root": {
                "&:hover": {
                  backgroundColor: "#212126",
                },
              },
            }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={openCreatedOppoMenu}
            onClose={handleCloseCreatedOppoMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              disabled={!opportunity?.status}
              onClick={() => {
                onApplicationClose(opportunity?.oppocode);
                handleCloseCreatedOppoMenu();
              }}
            >
              Stop accepting
            </MenuItem>

            <Divider
              sx={{
                border: "0.5px solid rgba(136, 136, 136, 0.20)",
                margin: "0px !important",
                padding: "0px !important",
              }}
            />
            <CopyToClipboard
              text={
                import.meta.env.VITE_CLIENT_BASE_URL +
                "opportunities?oppocode=" +
                opportunity?.oppocode
              }
              onCopy={() => {
                setSnackBarInfo({
                  type: "success",
                  msg: "URL copied to clipboard",
                });
                setShowSnackbar(true);
              }}
            >
              <MenuItem
                disabled={!opportunity?.status}
                onClick={() => {
                  handleCloseCreatedOppoMenu();
                }}
              >
                Share Opportunity
              </MenuItem>
            </CopyToClipboard>
          </Menu>
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
              minWidth: "max-content",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => {
                  handleViewApplicationsClick(opportunity);
                }}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 400,
                  textTransform: "none",
                }}
                variant="text"
              >
                Applications
              </Button>
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
              <Button
                onClick={() => {
                  dispatch(
                    setOpportunityModalInfo("deleteCreatedOpportunityModal")
                  );
                  dispatch(setOpportunityModalData(opportunity));
                }}
                sx={{
                  width: smallScreen ? "100%" : "auto",
                  textTransform: "none",
                  borderRadius: "25px",
                  background: "#FF4242",
                  color: "#fff",
                  padding: "10px 30px",
                  fontSize: "14px",
                  fontWeight: 400,
                  ":hover": {
                    background: "#fc2b2b",
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatedOppotunityCard;
