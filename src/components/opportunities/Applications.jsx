import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Box,
  Chip,
  useMediaQuery,
  Skeleton,
  Menu,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import WestIcon from "@mui/icons-material/West";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SkillChip from "./SkillChip";
import moment from "moment";
import { applications, hireoppo } from "../../utils/opportunitiesapi";
import { socket } from "../Modals/ChatsDrawer";
import { encrypt } from "../../utils/encrypt";
const QuestionAnsRow = ({ question, answer }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography variant="body1">{question.question}</Typography>
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid rgba(136, 136, 136, 0.20)",
        }}
      >
        <Typography variant="body1">{answer}</Typography>
      </Box>
    </Box>
  );
};

const Application = ({ application, questions, handleHireClick }) => {
  const [expanded, setExpanded] = useState(false);
  const smallScreen = useMediaQuery("(max-width:768px)");

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Accordion
      sx={{
        "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
        "& .MuiAccordionDetails-root": {
          display: expanded ? "block" : "none",
        },
        "& .css-1f773le-MuiButtonBase-root-MuiAccordionSummary-root": {
          padding: 0,
        },
        "& .css-15v22id-MuiAccordionDetails-root": {
          padding: 0,
        },
        "& .css-eqpfi5-MuiAccordionSummary-content": {
          margin: 0,
        },
        backgroundColor: "#212126",
        borderRadius: "10px !important",
        padding: smallScreen ? "10px 20px" : "12px 20px",
      }}
      expanded={expanded}
      onChange={handleExpansion}
      slotProps={{ transition: { timeout: 500 } }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{ color: "#fff", width: "30px", height: "30px" }}
          />
        }
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Avatar
              src={application?.applybydetails?.profile}
              sx={{ width: "40px", height: "40px" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontWeight: 400 }} variant="h5">
                {application?.applybydetails?.name_first +
                  " " +
                  application?.applybydetails?.name_last}
              </Typography>
              <Typography
                sx={{ fontWeight: 400, color: "#8B8B8B", fontSize: "16px" }}
                variant="h5"
              >
                {application?.applyby}
              </Typography>
            </Box>

            {expanded && (
              <Box
                sx={{
                  borderRadius: "46px",
                  background: "#888",
                  padding: "8px 16px",
                  minWidth: "max-content",
                  backgroundColor: "#535038",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#FFD644" }} variant="body2">
                  Applied on {moment(application?.time)?.format("Do MMMM YYYY")}
                </Typography>
              </Box>
            )}

            <FiberManualRecordIcon
              sx={{ color: "#fff", width: "6px", height: "6px" }}
            />
            <a
              onClick={() => setExpanded(false)}
              href={"/profile/" + application?.applybydetails?.username}
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              <Typography
                sx={{
                  fontWeight: 400,
                  color: "#5773FF",
                  cursor: "pointer",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                variant="body1"
              >
                View Profile
              </Typography>{" "}
            </a>
          </Box>
          {expanded &&
            (application?.hired ? (
              <Typography sx={{ color: "#428D2F", fontWeight: "bold" }}>
                Hired
              </Typography>
            ) : (
              <Box>
                <Button
                  onClick={() => {
                    setExpanded(false);
                    handleHireClick(application);
                  }}
                  sx={{
                    borderRadius: "25px",
                    background: "#428D2F",
                    color: "#fff",
                    width: "100%",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "none",
                    ":hover": {
                      background: "#2d6120",
                    },
                  }}
                >
                  Hire Now
                </Button>
              </Box>
            ))}
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          padding: "20px 0px",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <Box sx={{ display: "flex", gap: "8px", flexDirection: "column" }}>
            <Typography variant="subtitle2">Skills</Typography>
            <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {application?.skills?.map((skill, index) => {
                return <SkillChip label={skill} key={index} />;
              })}
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography
              sx={{ fontSize: smallScreen ? "12px" : "16px" }}
              variant="subtitle2"
            >
              CV
            </Typography>

            {application?.cv ? (
              <a
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "inline",
                  width: "fit-content",
                }}
                download
                target="_blank"
                href={application?.cv}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    width: "fit-content",
                    alignItems: "center",
                    gap: "5px",
                    borderRadius: "78px",
                    border: "1px solid #888",
                    padding: "8px 12px",
                  }}
                >
                  <DescriptionIcon
                    sx={{ color: "#fff", width: "24px", height: "24px" }}
                  />
                  <Typography variant="body1">Resume.pdf</Typography>
                </Box>
              </a>
            ) : (
              <Typography variant="body1">Not required</Typography>
            )}
          </Box>
          {application?.answers?.map((answer, index) => {
            return (
              <QuestionAnsRow
                key={index}
                question={questions[index] || "Question not found"}
                answer={answer || "Answer not found"}
              />
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

const skeletonStyle = { bgcolor: "#8b8b8b" };

const ApplicationSkeleton = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        backgroundColor: "#212126",
        borderRadius: "10px !important",
        padding: smallScreen ? "10px 20px" : "12px 20px",
        height: "80px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Skeleton
          variant="circular"
          width={45}
          height={45}
          sx={skeletonStyle}
        />
        <Skeleton variant="text" width={130} height={25} sx={skeletonStyle} />
      </Box>
      <Skeleton variant="text" width={20} height={15} sx={skeletonStyle} />
    </Box>
  );
};

const Applications = ({ handleCloseApplications, applicationsFor }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const [applicationsArray, setApplicationsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(false);
  const [menuSelected, setMenuSelected] = useState("Newest");
  const [showAll, setShowAll] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchApplications = async () => {
    try {
      let res = await applications(
        applicationsFor?.oppocode,
        menuSelected === "Newest" ? false : true,
        applicationsFor?.skills
      );
      if (res?.staus && res.data) {
        setApplicationsArray(res.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    handleCloseApplications(applicationsFor);
  };

  useEffect(() => {
    fetchApplications();
  }, [menuSelected, applicationsFor]);
  const handleHireApplicantClick = async (applicationData) => {
    let res = await hireoppo(applicationData?._id);

    if (res?.staus) {
      setSnackBarInfo({ type: "success", msg: "Applicant hired successfully" });
      setShowSnackbar(true);
      fetchApplications();

      var data = await encrypt({
        msg:
          "Your have been hired for the role " +
          applicationData?.details?.ptitle +
          " at " +
          applicationData?.details?.sname,
        to: applicationData?.applyby,
        user: user?.email,
        time: new Date(),
        doclink: "",
        extension: "",
        filename: "",
        size: "",
      });

      socket.emit("messagesend", data);
    }
  };

  const filterBasedOnHired = applicationsArray.filter((application) => {
    if (showAll) return true;
    return application.hired;
  });
  return (
    <Box
      sx={{
        padding: smallScreen ? "20px" : "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
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
          justifyContent: smallScreen ? "space-around" : "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <Box
          onClick={handleBackPress}
          sx={{
            display: "flex",

            gap: "10px",
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          <WestIcon sx={{ color: "#fff", width: "20px", height: "20px" }} />
          <Typography variant="body1">Back</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              onClick={() => setShowAll(true)}
              sx={{
                backgroundColor: showAll && "#5773FF",
                padding: "10px 20px",
                borderRadius: "100px 0px 0px 100px",
                border: "1px solid #5773FF",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Show All</Typography>
            </Box>

            <Box
              onClick={() => setShowAll(false)}
              sx={{
                backgroundColor: !showAll && "#5773FF",
                padding: "10px 20px",
                borderRadius: "0px 100px 100px 0px",
                border: "1px solid #5773FF",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Show Hired</Typography>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: "10px",
                  background: "#212126",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <SwapVertOutlinedIcon sx={{ color: "#fff" }} />
                <Typography variant="body1">
                  Sorted By {menuSelected}
                </Typography>
                <KeyboardArrowDownRoundedIcon sx={{ color: "#fff" }} />
              </Box>

              <Menu
                sx={{
                  width: "100%",
                  "& .MuiPaper-root": {
                    backgroundColor: "#26262F",
                    borderRadius: "0px 0px 5px 5px",
                    border: "1px solid rgba(136, 136, 136, 0.20)",
                  },
                  "& .css-6hp17o-MuiList-root-MuiMenu-list": {
                    padding: 0,
                  },

                  "& .css-ioq9hm-MuiButtonBase-root-MuiMenuItem-root": {
                    padding: "10px 15px !important",
                    width: "180px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                  },

                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setMenuSelected("Newest");
                    handleClose();
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Typography variant="body1">Newest First</Typography>
                  </Box>
                </MenuItem>
                <Divider
                  sx={{
                    border: "0.5px solid rgba(136, 136, 136, 0.20)",
                    margin: "0px !important",
                    padding: "0px !important",
                  }}
                />
                <MenuItem
                  onClick={() => {
                    setMenuSelected("Relevance");
                    handleClose();
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Typography variant="body1">Relevance</Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Box>
      {loading &&
        Array.from({ length: 10 }, (_, i) => {
          return <ApplicationSkeleton key={i} />;
        })}
      {!loading &&
        filterBasedOnHired?.map((application, index) => {
          return (
            <Application
              key={application._id}
              application={application}
              questions={applicationsFor?.questions}
              handleHireClick={handleHireApplicantClick}
            />
          );
        })}
      {!loading && applicationsArray.length === 0 && (
        <Typography sx={{ textAlign: "center" }} variant="h5">
          No applications found !!!
        </Typography>
      )}
    </Box>
  );
};

export default Applications;
