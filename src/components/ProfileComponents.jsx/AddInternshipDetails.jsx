import {
  Box,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UploadButton from "../Buttons/UploadButton";
import ActionButton from "../Buttons/ActionButton";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import DatePicker from "../generalComponents/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { uploadinterncertificate } from "../../utils/api";
import { setSkillDetails } from "../../store";

const AddInternshipDetails = ({ handleUpdateInternship }) => {
  const dispatch = useDispatch();
  const { skillDetails } = useSelector((state) => state.onboardingSlice);
  const initialInternshipDetails = skillDetails.internshipDetails;
  const [internshipArray, setInternshipArray] = useState(
    initialInternshipDetails
  );
  const smallScreen = useMediaQuery("(max-width:768px)");
  const handleUploadResumeClick = (target) => {
    document.getElementById(target).click();
  };
  const handleAddInternshipClick = () => {
    const lastInternship = internshipArray[internshipArray.length - 1];

    if (
      lastInternship?.companyName === "" ||
      lastInternship?.startDate === "" ||
      (!lastInternship?.currentlyWorking && lastInternship?.endDate === "") ||
      lastInternship?.role === "" ||
      lastInternship?.description === "" ||
      lastInternship?.resumeUploading === true
    ) {
      return;
    }

    const newInternship = {
      companyName: "",
      startDate: "",
      endDate: "",
      role: "",
      description: "",
      internshipCertificate: "",
      isExpanded: true,
      resumeUploading: false,
      currentlyWorking: false,
    };

    setInternshipArray([...internshipArray, newInternship]);
  };

  const updateInternship = (index, updatedData) => {
    if (Object.keys(updatedData)?.includes("startDate")) {
      updatedData.startDate = new Date(updatedData.startDate).toISOString();
    }
    if (Object.keys(updatedData)?.includes("endDate")) {
      updatedData.endDate = new Date(updatedData.endDate).toISOString();
    }
    const updatedArray = internshipArray.map((internship, i) => {
      if (i === index) {
        return { ...internship, ...updatedData };
      }
      return internship;
    });

    setInternshipArray(updatedArray);
  };
  const uploadResume = async (file, index) => {
    updateInternship(index, { resumeUploading: true }); // Start the upload process

    try {
      const res = await uploadinterncertificate(file, true);

      if (res.status) {
        updateInternship(index, {
          internshipCertificate: res.data,
          resumeUploading: false,
        });
      } else {
        updateInternship(index, { resumeUploading: false });
      }
    } catch (error) {
      updateInternship(index, { resumeUploading: false });
    }
  };

  const isValidInternship = (internship) => {
    const requiredFields = ["companyName", "description", "startDate", "role"];
    if (!internship?.currentlyWorking) {
      requiredFields.push("endDate");
    }

    return requiredFields.every((field) => internship[field]);
  };
  useEffect(() => {
    // Filter valid internships and dispatch them to Redux
    // const validInternships = internshipArray.filter(isValidInternship);
    handleUpdateInternship(internshipArray);
  }, [internshipArray, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "start",
        gap: "20px",
        width: "100%",
        // marginTop: internshipDetailsExpand && "10px",
      }}
    >
      {internshipArray.map((internship, index) => {
        return (
          <Box sx={{ width: "100%" }} key={index}>
            <Box
              sx={{
                display: "flex",

                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  {index + 1}. Internship Details
                </Typography>
              </Box>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  updateInternship(index, {
                    isExpanded: !internship.isExpanded,
                  });
                }}
              >
                {internship.isExpanded ? (
                  <ExpandLessIcon
                    sx={{ color: "#fff", width: "20px", height: "30px" }}
                  />
                ) : (
                  <ExpandMoreIcon
                    sx={{ color: "#fff", width: "20px", height: "30px" }}
                  />
                )}
              </Box>
            </Box>

            {internship?.isExpanded && (
              <Box
                sx={{
                  marginTop: "15px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <LoginSignupInput
                    onChangeHandler={(text) => {
                      updateInternship(index, { companyName: text });
                    }}
                    placeholder="Company Name"
                    value={internship?.companyName}
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: smallScreen ? "20px" : "30px",
                      flexWrap: smallScreen && "wrap",
                      alignSelf: "stretch",
                    }}
                  >
                    <DatePicker
                      date={internship.startDate}
                      onChangeDate={(date) => {
                        const newDates = {};
                        if (
                          new Date(date?.toISOString()) >
                          new Date(internship?.endDate)
                        ) {
                          newDates.endDate = date;
                        }
                        newDates.startDate = date;
                        updateInternship(index, newDates);
                      }}
                      placeholder="Start Date"
                    />
                    <DatePicker
                      disabled={internship?.currentlyWorking}
                      date={
                        internship?.currentlyWorking
                          ? new Date()
                          : internship.endDate
                      }
                      onChangeDate={(date) => {
                        const newDates = {};
                        if (
                          new Date(date?.toISOString()) <
                          new Date(internship?.startDate)
                        ) {
                          newDates.startDate = date;
                        }
                        newDates.endDate = date;
                        updateInternship(index, newDates);
                      }}
                      placeholder="End Date"
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      checked={internship?.currentlyWorking}
                      control={
                        <Checkbox
                          onChange={(e) =>
                            updateInternship(index, {
                              currentlyWorking: e.target.checked,
                            })
                          }
                          sx={{
                            color: "#888",
                            "&.Mui-checked": {
                              color: "#5773FF",
                            },
                          }}
                        />
                      }
                      label="Currently Working Here"
                    />
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <LoginSignupInput
                    onChangeHandler={(text) => {
                      updateInternship(index, { role: text });
                    }}
                    value={internship?.role}
                    placeholder="Your Role"
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <LoginSignupInput
                    onChangeHandler={(text) => {
                      updateInternship(index, { description: text });
                    }}
                    multiline={true}
                    value={internship?.description}
                    rows={4}
                    placeholder="Description"
                  />
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <Typography variant="body1">
                    Upload Your Certificate Of Internship / Completion of Course
                  </Typography>
                  <input
                    id={"choose-resume-file-56702-profile-" + index}
                    type="file"
                    style={{
                      display: "none",
                      visibility: "hidden",
                      width: "0",
                      height: "0",
                    }}
                    accept=".pdf"
                    onChange={(event) => {
                      uploadResume(event.target.files[0], index);
                    }}
                  />
                  <UploadButton
                    disabled={internship?.internshipCertificate ? true : false}
                    handleOnClick={() => {
                      if (internship?.internshipCertificate) {
                        return;
                      }
                      handleUploadResumeClick(
                        `choose-resume-file-56702-profile-${index}`
                      );
                    }}
                    leftIcon={<AddIcon sx={{ color: "#888" }} />}
                    name={
                      internship?.internshipCertificate
                        ? "Uploaded "
                        : "Upload  Certificate"
                    }
                  />
                  {internship?.resumeUploading && (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  )}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      onClick={() =>
                        setInternshipArray(
                          internshipArray.filter((_, i) => i !== index)
                        )
                      }
                      sx={{
                        color: "#FF4242",
                        cursor: "pointer",
                        ":hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Delete
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
      <Box sx={{ width: "100%", marginTop: "10px" }}>
        <ActionButton
          handleOnClick={handleAddInternshipClick}
          name="Add Internship"
        />
      </Box>
    </Box>
  );
};

export default AddInternshipDetails;
