import {
  Alert,
  Avatar,
  Box,
  Button,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import ActionButton from "../Buttons/ActionButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import brainIcon from "../../assets/bxs-brain.svg.svg";
import bannerDefaultImg from "../../assets/banner_default.jpeg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChatWith, setModalInfo } from "../../store";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import HelpIcon from "@mui/icons-material/Help";
import { reportuser } from "../../utils/api";

const Banner = ({ userData, userName }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  // userName is the username of the user whose profile is being viewed, it is taken from the URL as a parameter
  const { user } = useSelector((state) => state.authSlice);
  // user is the logged in user
  const dispatch = useDispatch();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const handleMessageClick = () => {
    const reqData = {
      data: {
        first_name: userData?.name_first,
        last_name: userData?.name_last,
        profile: userData?.profile,
      },
      to: userData?.email,
      user: user?.email,
    };
    dispatch(setChatWith({ chatOpen: true, person: reqData }));
    dispatch(setModalInfo("chatScreenDrawer"));
  };
  const handleReportProfileClick = async () => {
    let res = await reportuser(userData?.email);
    if (res.message) {
      setSnackbarMsg(res.message);
      setShowSnackbar(true);
    }
  };
  return (
    <Box
      sx={{ width: "100%", minWidth: "320px", padding: !smallScreen && "30px" }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          backgroundColor: "#212126",
          borderRadius: !smallScreen && "10px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: userData?.banner
              ? `url(${userData?.banner})`
              : `url(${bannerDefaultImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            height: smallScreen ? 90 : 250,
            position: "relative",
            borderRadius: !smallScreen && "10px 10px 0 0",
            textAlign: "center",
          }}
        />
        <Box
          sx={{
            padding: smallScreen ? "0px 15px 20px 15px" : "0px 30px 20px 30px",
          }}
        >
          <Box sx={{ height: smallScreen ? "50px" : "90px" }}>
            <Avatar
              sx={{
                width: smallScreen ? "80px" : "150px",
                height: smallScreen ? "80px" : "150px",

                position: "relative",
                top: smallScreen ? "-40px" : "-75px",
              }}
              src={userData?.profile}
            />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <Typography variant={smallScreen ? "h4" : "h3"}>
                  {userData?.name_first + " " + userData?.name_last}
                </Typography>
                {userData?.online && (
                  <FiberManualRecordIcon
                    sx={{
                      color: "#24FF00",
                      width: smallScreen ? "10px" : "15px",
                      height: smallScreen ? "10px" : "15px",
                    }}
                  />
                )}
              </Box>

              {user?.username === userName ? (
                <Link
                  to="/editprofile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ActionButton
                    leftIcon={
                      <BorderColorOutlinedIcon sx={{ color: "#fff" }} />
                    }
                    name="Edit"
                  />
                </Link>
              ) : (
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: smallScreen ? "14px" : "16px",
                  }}
                  variant="text"
                  onClick={handleReportProfileClick}
                  startIcon={<HelpIcon />}
                >
                  Report Profile
                </Button>
              )}
            </Box>
            <Typography variant="subtitle1">@{userData?.username}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: smallScreen ? "space-start" : "space-between",
              flexWrap: "wrap",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            {user?.step === 4 && (
              <Box
                sx={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "stretch",
                  flexWrap: "wrap",
                  flexGrow: 1,
                }}
              >
                {user?.username !== userName && (
                  <Button
                    onClick={() => handleMessageClick()}
                    variant="outlined"
                    sx={{
                      color: "#fff",
                      borderColor: "#fff",
                      textTransform: "none",

                      fontSize: "16px",
                      fontWeight: 400,
                      borderRadius: "10px",
                      ":hover": {
                        color: "#fff",
                        borderColor: "#fff",
                      },
                    }}
                  >
                    Message
                  </Button>
                )}
              </Box>
            )}
            <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
              {userData?.portfolio && (
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  target="_blank"
                  href={userData?.portfolio}
                >
                  <Box
                    sx={{
                      width: smallScreen ? "20p" : "35px",
                      height: smallScreen ? "20p" : "35px",
                      cursor: "pointer",
                    }}
                    component="img"
                    src={brainIcon}
                  />
                </a>
              )}
              {userData?.insta && (
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href={userData?.insta}
                  target="_blank"
                >
                  <InstagramIcon
                    sx={{
                      color: "#fff",
                      width: smallScreen ? "20p" : "35px",
                      height: smallScreen ? "20p" : "35px",
                      cursor: "pointer",
                    }}
                  />
                </a>
              )}
              {userData?.linkedin && (
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href={userData?.linkedin}
                  target="_blank"
                >
                  <LinkedInIcon
                    sx={{
                      color: "#fff",
                      width: smallScreen ? "20p" : "35px",
                      height: smallScreen ? "20p" : "35px",
                      cursor: "pointer",
                    }}
                  />
                </a>
              )}

              {userData?.git && (
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href={userData?.git}
                  target="_blank"
                >
                  <GitHubIcon
                    sx={{
                      color: "#fff",
                      width: smallScreen ? "20p" : "35px",
                      height: smallScreen ? "20p" : "35px",
                      cursor: "pointer",
                    }}
                  />
                </a>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
