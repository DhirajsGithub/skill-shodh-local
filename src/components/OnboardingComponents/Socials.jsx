import React, { useImperativeHandle, useState } from "react";
import Wrapper from "./Wrapper";
import { Box, LinearProgress, Typography } from "@mui/material";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddIcon from "@mui/icons-material/Add";

import GitHubIcon from "@mui/icons-material/GitHub";
import { useDispatch, useSelector } from "react-redux";
import { handleNextButtonClick, setOnboardingFields } from "../../store";
import UploadButton from "../Buttons/UploadButton";
import { nextstep4, uploadresume } from "../../utils/api";
import UploadedResumeComp from "./UploadedResumeComp";
import LoadingScreen from "../generalComponents/LoadingScreen";

const Socials = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { socialDetails } = useSelector((state) => state.onboardingSlice);
  const { linkedIn, github, instgram, portfolio, resume } = socialDetails;
  const [resumeUploading, setResumeUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const addStep4Data = async () => {
    try {
      setLoading(true);
      let res = await nextstep4(instgram, linkedIn, github, portfolio, resume);
      setLoading(false);
      if (res.status === true) {
        dispatch(handleNextButtonClick());
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleNextClick = () => {
    // add any validation
    addStep4Data();
  };
  useImperativeHandle(ref, () => {
    return {
      handleNextClick,
    };
  });
  const handleUploadResumeClick = () => {
    document.getElementById("choose-resume-socials-file-56702").click();
  };

  const uploadResumeFunc = async (file) => {
    try {
      setResumeUploading(true);
      let res = await uploadresume(file);
      if (res.status === true) {
        dispatch(
          setOnboardingFields({
            field: "socialDetails.resume",
            value: res.data,
          })
        );
      }
      setResumeUploading(false);
    } catch (error) {
      setResumeUploading(false);
    }
  };
  const handleDeleteResume = () => {
    dispatch(
      setOnboardingFields({
        field: "socialDetails.resume",
        value: "",
      })
    );
  };
  return (
    <Wrapper>
      <LoadingScreen loading={loading} />
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
          id={"choose-resume-socials-file-56702"}
          type="file"
          style={{
            display: "none",
            visibility: "hidden",
            width: "0",
            height: "0",
          }}
          accept=".pdf"
          onChange={(event) => {
            uploadResumeFunc(event.target.files[0]);
          }}
        />
        {!resume && (
          <UploadButton
            handleOnClick={() => {
              handleUploadResumeClick();
            }}
            leftIcon={<AddIcon sx={{ color: "#888" }} />}
            name={"Upload  Certificate"}
          />
        )}
        {resume && (
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
          onChangeHandler={(text) =>
            dispatch(
              setOnboardingFields({
                field: "socialDetails.instgram",
                value: text,
              })
            )
          }
          label="Instgram"
          value={instgram}
          startIcon={<InstagramIcon sx={{ color: "#8B8B8B" }} />}
          placeholder="Paste URL"
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <LoginSignupInput
          onChangeHandler={(text) =>
            dispatch(
              setOnboardingFields({
                field: "socialDetails.linkedIn",
                value: text,
              })
            )
          }
          label="LinkedIn"
          value={linkedIn}
          startIcon={<LinkedInIcon sx={{ color: "#8B8B8B" }} />}
          placeholder="Paste URL"
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <LoginSignupInput
          onChangeHandler={(text) =>
            dispatch(
              setOnboardingFields({
                field: "socialDetails.github",
                value: text,
              })
            )
          }
          value={github}
          label="Github"
          startIcon={<GitHubIcon sx={{ color: "#8B8B8B" }} />}
          placeholder="Paste URL"
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <LoginSignupInput
          onChangeHandler={(text) =>
            dispatch(
              setOnboardingFields({
                field: "socialDetails.portfolio",
                value: text,
              })
            )
          }
          label="Portfolio"
          value={portfolio}
          placeholder="URL"
        />
      </Box>
    </Wrapper>
  );
});

export default Socials;
