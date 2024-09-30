import {
  Alert,
  Box,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { nextstep4, uploadresume } from "../../utils/api";
import LoadingScreen from "../generalComponents/LoadingScreen";
import UploadButton from "../Buttons/UploadButton";
import UploadedResumeComp from "./UploadedResumeComp";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddIcon from "@mui/icons-material/Add";
import GitHubIcon from "@mui/icons-material/GitHub";
import Wrapper from "./Wrapper";
import { setSocialDetails, updateUser } from "../../store";

const Socials = () => {
  const { socialDetails } = useSelector((state) => state.onboardingSlice);
  const dispatch = useDispatch();
  const { linkedIn, github, instgram, portfolio, resume } = socialDetails;
  const [resumeUploading, setResumeUploading] = useState(false);
  const [linkedInTemp, setLinkedInTemp] = useState(linkedIn);
  const [githubTemp, setGithubTemp] = useState(github);
  const [instgramTemp, setInstgramTemp] = useState(instgram);
  const [portfolioTemp, setPortfolioTemp] = useState(portfolio);
  const [resumeTemp, setResumeTemp] = useState(resume);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState("");

  const handleUploadResumeClick = () => {
    document.getElementById("choose-resume-socials-file-56702-profile").click();
  };
  console.log(resumeTemp);
  const uploadResumeFunc = async (file) => {
    try {
      setResumeUploading(true);
      let res = await uploadresume(file);
      console.log(res);
      if (res.status === true) {
        setResumeTemp(res.data);
      }

      setResumeUploading(false);
    } catch (error) {
      setResumeUploading(false);
    }
  };
  const handleDeleteResume = () => {
    setResumeTemp("");
    setResumeFile("");
  };

  const updateUserDetails = () => {
    dispatch(
      updateUser({
        insta: instgramTemp,
        linkedin: linkedInTemp,
        git: githubTemp,
        portfolio: portfolioTemp,
        resume: resumeTemp,
      })
    );
  };

  const updateOnboardingSlice = () => {
    dispatch(
      setSocialDetails({
        resume: resumeTemp,
        linkedIn: linkedInTemp,
        github: githubTemp,
        instgram: instgramTemp,
        portfolio: portfolioTemp,
      })
    );
  };

  const handleSaveClick = async () => {
    if (resumeUploading) {
      return;
    }
    try {
      setLoading(true);
      let res = await nextstep4(
        instgramTemp,
        linkedInTemp,
        githubTemp,
        portfolioTemp,
        resumeTemp
      );
      console.log(res);
      setLoading(false);
      if (res.status === true) {
        updateUserDetails();
        updateOnboardingSlice();
        setShowSnackbar(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginTop: "40px" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={5000}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Social Details Updated Successfully
        </Alert>
      </Snackbar>
      <Wrapper>
        <LoadingScreen message="Updating..." loading={loading} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <Typography variant="body1">Resume</Typography>
          <input
            id={"choose-resume-socials-file-56702-profile"}
            type="file"
            style={{
              display: "none",
              visibility: "hidden",
              width: "0",
              height: "0",
            }}
            accept=".pdf"
            value={resumeFile}
            onChange={(event) => {
              uploadResumeFunc(event.target.files[0]);
              setResumeFile(event.target.value);
            }}
          />
          {!resumeTemp && (
            <UploadButton
              handleOnClick={() => {
                handleUploadResumeClick();
              }}
              leftIcon={<AddIcon sx={{ color: "#888" }} />}
              name={"Upload  Certificate"}
            />
          )}
          {resumeTemp && (
            <UploadedResumeComp
              handleDeleteResume={handleDeleteResume}
              name="Resume.pdf"
            />
          )}
          {resumeUploading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          <LoginSignupInput
            onChangeHandler={(text) => setInstgramTemp(text)}
            label="Instgram"
            value={instgramTemp}
            startIcon={<InstagramIcon sx={{ color: "#8B8B8B" }} />}
            placeholder="Paste URL"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <LoginSignupInput
            onChangeHandler={(text) => setLinkedInTemp(text)}
            label="LinkedIn"
            value={linkedInTemp}
            startIcon={<LinkedInIcon sx={{ color: "#8B8B8B" }} />}
            placeholder="Paste URL"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <LoginSignupInput
            onChangeHandler={(text) => setGithubTemp(text)}
            value={githubTemp}
            label="Github"
            startIcon={<GitHubIcon sx={{ color: "#8B8B8B" }} />}
            placeholder="Paste URL"
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <LoginSignupInput
            onChangeHandler={(text) => setPortfolioTemp(text)}
            label="Portfolio"
            value={portfolioTemp}
            placeholder="URL"
          />
        </Box>
      </Wrapper>
      <Footer handleSaveClick={handleSaveClick} />
    </Box>
  );
};

export default Socials;
