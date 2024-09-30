import React from "react";
import {
  Box,
  Button,
  Typography,
  Tooltip,
  IconButton,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GradientButton from "../Buttons/GradientButton";
import { useDispatch } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import { setSnackBarInfo } from "../../store";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import share from "../../assets/share.svg";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
const ReferralCode = ({ refererData }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const shareMessage =
    `Hey everyone! 🌟

🚀 *Exciting News Alert!* 🚀  
Join *SkillShodh* today, the ultimate platform where skills meet opportunity! 💼

✨ *Why Sign Up?*  
🔗 Connect with students across India  
💪 Collaborate on projects with skilled peers  
🎯 Unlock exclusive internships & job opportunities  
🏆 Boost your career with top-notch experiences!

🎓 Don't miss out! Create your profile on https://skillshodh.in?referral_code=` +
    refererData?.referral_code +
    ` NOW and start your journey toward success`;
  return (
    <Box
      sx={{
        padding: smallScreen ? "15px" : "20px",
        backgroundColor: "#212126",
        borderRadius: "15px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "8px",
          }}
        >
          <Typography variant="h4">Referral Code</Typography>
          <Box
            sx={{
              padding: "8px 16px",
              background: "rgba(99, 99, 99, 0.24)",
              borderRadius: "55px",
              border: "0.6px solid #888",
              backdropFilter: "blur(10.199999809265137px",
            }}
          >
            <Typography sx={{ fontSize: "16px !important" }} variant="body1">
              Your rank is {refererData?.myrank}
            </Typography>
          </Box>
        </Box>
        <Typography variant="subtitle1">
          This is your referral code, copy and send to others to get more
          referral score
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <CopyToClipboard
            text={
              import.meta.env.VITE_CLIENT_BASE_URL +
              "?referral_code=" +
              refererData?.referral_code
            }
            onCopy={() => {
              console.log("shit");
              dispatch(
                setSnackBarInfo({
                  showSnackBar: true,
                  snackBarInfo: {
                    type: "success",
                    msg: "Copied to clipboard",
                  },
                })
              );
            }}
          >
            <Button
              sx={{
                display: "flex",
                padding: "10px 40px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
                fontWeight: 400,
                borderRadius: "44px",
                textTransform: "none",
                background:
                  " linear-gradient(180deg, #7777EF 0%, #4B3BAB 100%)",
              }}
              endIcon={
                <ContentCopyRoundedIcon
                  sx={{ fontSize: "14px", color: "#fff" }}
                />
              }
            >
              <Typography sx={{ color: "#fff" }} variant="body1">
                {refererData?.referral_code}
              </Typography>
            </Button>
          </CopyToClipboard>
          <Box>
            <WhatsappShareButton title={shareMessage} url="!">
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
          </Box>
        </Box>
        <Typography
          sx={{ color: "#FF4242", marginTop: "10px" }}
          variant="body2"
        >
          *User need to complete their profile in order to update the referrals.
        </Typography>
      </Box>

      <Box
        sx={{
          background: "#343434",
          height: "1px",
          width: "100%",
          margin: "8px 0px",
        }}
      />
      <Box>
        <Typography variant="h5">Total Invites</Typography>
        <Typography sx={{ marginTop: "5px" }} variant="subtitle2">
          till September 15
        </Typography>
      </Box>

      {/* // table  */}
      <Box
        sx={{
          borderRadius: "10px",
          border: "1px solid #676767",
          background: "#313135",
          height: "125px",
          justifyContent: "center",
          maxWidth: "300px",
          minWidth: "250px",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "40%",
            borderRight: "1px solid #676767",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid #676767",
            }}
          >
            <Typography variant="h5">Today</Typography>
          </Box>
          <Box
            sx={{
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{refererData?.today}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid #676767",
            }}
          >
            <Typography variant="h5">Phase 1</Typography>
          </Box>
          <Box
            sx={{
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{refererData?.phase1}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReferralCode;
