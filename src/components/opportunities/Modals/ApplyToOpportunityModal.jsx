import {
  Alert,
  Avatar,
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  LinearProgress,
  Modal,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

import {
  setOpportunityModalData,
  setOpportunityModalInfo,
} from "../../../store";
import ActionButton from "../../Buttons/ActionButton";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LoginSignupInput from "../../LoginSignupComponents/LoginSignupInput";
import PrimaryButton from "../../Buttons/PrimaryButton";
import DescriptionIcon from "@mui/icons-material/Description";
import { uploadresume } from "../../../utils/api";
import { applyoppo } from "../../../utils/opportunitiesapi";
import CommonRow from "../CommonRow";
import SkillChip from "../SkillChip";
import { ModalStyle } from "../../../styles/styles";
import { useSearchParams } from "react-router-dom";
import { setSnackBarInfo as setSnackBarInfoStore } from "../../../store";

const companyBaseUrl = import.meta.env.VITE_COMPANY_PORTAL_URL;
const userBaseUrl = import.meta.env.VITE_CLIENT_BASE_URL;

const ApplyToOpportunityModal = ({ handleAplliedToOpportunity }) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { opportunityModalInfo, opportunityModalData } = useSelector(
    (state) => state.opportunitySlice
  );
  console.log(opportunityModalData);
  const { user, isAuthenticated } = useSelector((state) => state.authSlice);
  const [resume, setResume] = useState("");
  const [answers, setAnswers] = useState([]);
  const [resumeValue, setResumeValue] = useState("");
  const [resumeUploading, setResumeUploading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const style = {
    maxHeight: smallScreen ? "80vh" : "90vh",
    padding: smallScreen ? "15px 20px" : "20px 30px",
    gap: smallScreen ? "20px" : "20px",
    maxWidth: "700px",
    width: smallScreen ? "90%" : "700px",
  };
  const handleClose = () => {
    setResume("");
    setResumeValue("");
    setAnswers([]);
    setSearchParams("");
    setSnackBarInfo({ type: "", msg: "" });
    setShowSnackbar(false);

    dispatch(setOpportunityModalData(null));
    dispatch(setOpportunityModalInfo(""));
  };
  const handleAnswerChange = (text, index) => {
    let temp = [...answers];
    temp[index] = text;
    setAnswers(temp);
  };

  const handleUploadResumeClick = () => {
    document.getElementById("choose-resume-apply-file-56702").click();
  };

  const handleUploadFromProfileCheckbox = (e) => {
    if (e.target.checked) {
      setResume(user.resume);
    } else {
      setResume("");
    }
  };
  const handleRemoveResumeClick = () => {
    setResumeValue("");
    setResume("");
  };

  const uploadResumeFunc = async (file) => {
    try {
      setResumeUploading(true);
      let res = await uploadresume(file);
      if (res.status) {
        setResume(res.data);
      }
      setResumeUploading(false);
    } catch (error) {
      setResumeUploading(false);
    }
  };
  const formatStipendAmount = (amount) => {
    if (amount % 1000 === 0) {
      return `${amount / 1000}k / mo`;
    } else {
      return `${amount} / mo`;
    }
  };
  const handleApplyClick = async () => {
    if (!isAuthenticated) {
      dispatch(
        setSnackBarInfoStore({
          showSnackBar: true,
          snackBarInfo: {
            type: "error",
            msg: "Please login to apply",
          },
        })
      );
      return;
    }
    if (resumeUploading) {
      setSnackBarInfo({
        type: "info",
        msg: "Please wait while the resume is uploading",
      });
      setShowSnackbar(true);
      return;
    }
    if (opportunityModalData?.cvr && !resume) {
      setSnackBarInfo({ type: "error", msg: "Please upload your resume" });
      setShowSnackbar(true);
      return;
    }
    if (answers.length === 0 && opportunityModalData?.questions?.length > 0) {
      setSnackBarInfo({
        type: "error",
        msg: "Please answer all the questions",
      });
      setShowSnackbar(true);
      return;
    }
    for (let answer of answers) {
      if (answer.length === 0) {
        setSnackBarInfo({
          type: "error",
          msg: "Please answer all the questions",
        });
        setShowSnackbar(true);

        return;
      }
    }

    try {
      setLoading(true);
      let res = await applyoppo(
        opportunityModalData?.oppocode,
        answers,
        resume,
        user
      );

      if (res.staus) {
        setSnackBarInfo({
          type: "success",
          msg: "Successfully applied to this opportunity",
        });
        handleAplliedToOpportunity(opportunityModalData?.oppocode);
        setShowSnackbar(true);
        handleClose();
      } else {
        setSnackBarInfo({ type: "error", msg: res.message });
        setShowSnackbar(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const oppotunityByDetails = {
    by: opportunityModalData?.company
      ? opportunityModalData?.bydetails?.name
      : opportunityModalData?.bydetails?.name_first +
        " " +
        opportunityModalData?.bydetails?.name_last,
    byId: opportunityModalData?.company
      ? opportunityModalData?.bydetails?.id
      : opportunityModalData?.bydetails?.username,
    byImg: opportunityModalData?.company
      ? opportunityModalData?.bydetails?.logo
      : opportunityModalData?.bydetails?.profile,

    href: opportunityModalData?.company
      ? userBaseUrl + "company/" + opportunityModalData?.bydetails?.id
      : userBaseUrl +
        "publicProfile/" +
        opportunityModalData?.bydetails?.username,
  };

  return (
    <Modal
      open={opportunityModalInfo === "newOpportunityApply"}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...ModalStyle, ...style }}>
        <Snackbar
          sx={{ position: "sticky", top: "0%" }}
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

          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href={oppotunityByDetails?.href}
            target="_blank"
          >
            <Box
              sx={{
                padding: "8px 12px",

                borderRadius: "10px",
                border: "1px solid #888",
                background: "#18181D",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                cursor: "pointer",
                ":hover": {
                  background: "transparent",
                },
              }}
            >
              <Avatar
                src={oppotunityByDetails?.byImg}
                sx={{
                  width: smallScreen ? "30px" : "40px",
                  height: smallScreen ? "30px" : "40px",
                }}
              />
              <Box>
                <Typography sx={{ wordBreak: "break-all" }} variant="body1">
                  {oppotunityByDetails?.by}
                </Typography>
                <Typography
                  sx={{
                    fontSize: smallScreen ? "12px" : "auto",
                    wordBreak: "break-all",
                  }}
                  variant="body2"
                >
                  {oppotunityByDetails?.byId}
                </Typography>
              </Box>
            </Box>
          </a>
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
            answer={opportunityModalData?.ptitle}
          />
          <CommonRow
            isModal={true}
            label="Project / Start Up Name"
            answer={opportunityModalData?.sname}
          />
          <CommonRow
            isModal={true}
            label="Description of the Position"
            answer={opportunityModalData?.pdesc}
          />
          <CommonRow
            isModal={true}
            label="Description of the Project / StartUp"
            answer={opportunityModalData?.sdesc}
          />

          <CommonRow
            label="Type"
            answer={
              opportunityModalData?.stipendalb
                ? `Paid - ${formatStipendAmount(
                    opportunityModalData?.stipendamt
                  )}`
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
            <Typography sx={{ wordBreak: "break-all" }} variant="subtitle2">
              Skills Required
            </Typography>
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
                {opportunityModalData?.skills?.map((skill, index) => {
                  return <SkillChip key={index} label={skill} />;
                })}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography
              sx={{
                fontSize: smallScreen ? "12px" : "16px",
                wordBreak: "break-all",
              }}
              variant="subtitle2"
            >
              Students From
            </Typography>
            {opportunityModalData?.anycoll ? (
              <Typography
                sx={{
                  fontSize: smallScreen ? "14px" : "18px",
                  wordBreak: "break-all",
                }}
                variant="body2"
              >
                Any College
              </Typography>
            ) : (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {opportunityModalData?.colleges?.map((college, index) => {
                  return (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: smallScreen ? "14px" : "18px",
                        wordBreak: "break-all",
                      }}
                      variant="body2"
                    >
                      {college}
                    </Typography>
                  );
                })}
              </Box>
            )}
          </Box>

          {!resume && (
            <CommonRow
              isModal={true}
              label="CV"
              answer={opportunityModalData?.cvr ? "Required " : "Not required"}
            />
          )}

          {resume && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Typography
                sx={{
                  fontSize: smallScreen ? "12px" : "16px",
                  wordBreak: "break-all",
                }}
                variant="subtitle2"
              >
                CV
              </Typography>
              <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  target="_blank"
                  download
                  href={resume}
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

                <CloseIcon
                  onClick={handleRemoveResumeClick}
                  sx={{
                    color: "#fff",
                    width: smallScreen ? "18px" : "25px",
                    height: smallScreen ? "18px" : "25px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>
          )}

          {!resume && opportunityModalData?.cvr && (
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <input
                id={"choose-resume-apply-file-56702"}
                type="file"
                style={{
                  display: "none",
                  visibility: "hidden",
                  width: "0",
                  height: "0",
                }}
                accept=".pdf"
                value={resumeValue}
                onChange={(event) => {
                  setResumeValue(event.target.value);
                  uploadResumeFunc(event.target.files[0]);
                }}
              />
              <Box>
                <ActionButton
                  handleOnClick={() => {
                    handleUploadResumeClick();
                  }}
                  fontSize="16px"
                  name="Upload"
                  leftIcon={
                    <FileUploadOutlinedIcon
                      sx={{ color: "#fff", width: "20px", height: "20px" }}
                    />
                  }
                />

                {resumeUploading && (
                  <LinearProgress sx={{ marginTop: "5px" }} />
                )}
              </Box>

              {user?.resume && (
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleUploadFromProfileCheckbox}
                        sx={{
                          color: "#888",
                          "&.Mui-checked": {
                            color: "#5773FF",
                          },
                        }}
                      />
                    }
                    label="Upload from profile"
                  />
                </Box>
              )}
            </Box>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="subtitle2">Questionnaire</Typography>
            {opportunityModalData?.questions?.length === 0 && (
              <Typography
                sx={{ fontSize: smallScreen ? "14px" : "18px" }}
                variant="body2"
              >
                No questions
              </Typography>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {opportunityModalData?.questions?.map((question, index) => {
                return (
                  <Box key={index}>
                    <LoginSignupInput
                      multiline={true}
                      maxRows={3}
                      value={answers[index] ? answers[index] : ""}
                      onChangeHandler={(text) =>
                        handleAnswerChange(text, index)
                      }
                      label={(index+1)+'. '+question?.question}
                      placeholder="Answer"
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box>
            <PrimaryButton handleOnClick={handleApplyClick}>
              Apply
            </PrimaryButton>

            {loading && <LinearProgress sx={{ marginTop: "8px" }} />}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ApplyToOpportunityModal;
