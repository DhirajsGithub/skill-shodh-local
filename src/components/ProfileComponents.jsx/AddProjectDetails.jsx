import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ActionButton from "../Buttons/ActionButton";
import React, { useEffect, useState } from "react";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import DatePicker from "../generalComponents/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { setSkillDetails } from "../../store";

const AddProjectDetails = ({ handleUpdateProjects }) => {
  const dispatch = useDispatch();
  const { skillDetails } = useSelector((state) => state.onboardingSlice);
  const projectDetails = skillDetails.projectDetails || [];
  const [projectArray, setProjectArray] = useState(projectDetails);
  const smallScreen = useMediaQuery("(max-width:768px)");

  const isValidProject = (project) => {
    const requiredFields = ["projectName", "startDate", "role", "description"];
    if (!project.currentlyWorking) {
      requiredFields.push("endDate");
    }
    return requiredFields.every((field) => project[field]);
  };

  const updateProject = (index, changes) => {
    if (Object.keys(changes)?.includes("startDate")) {
      changes.startDate = new Date(changes.startDate).toISOString();
    }
    if (Object.keys(changes)?.includes("endDate")) {
      changes.endDate = new Date(changes.endDate).toISOString();
    }
    const newProjectArray = projectArray.map((project, i) => {
      if (i === index) {
        return { ...project, ...changes }; // Create a new object with changes
      }
      return project; // Return unchanged objects
    });

    setProjectArray(newProjectArray); // Update state with the new array
  };

  // Add a new project to the array
  const handleAddProjectClick = () => {
    const lastProject = projectArray[projectArray.length - 1];

    if (
      lastProject &&
      !isValidProject(lastProject) // If the last project is invalid, do not add a new one
    ) {
      return;
    }

    setProjectArray([
      ...projectArray, // Spread to create a new array with the new project
      {
        projectName: "",
        startDate: "",
        endDate: "",
        role: "",
        description: "",
        projectUrl: "",
        isExpanded: true,
        currentlyWorking: false,
      },
    ]);
  };

  // Dispatch to Redux when projectArray changes
  useEffect(() => {
    const validProjectArray = projectArray.filter(isValidProject);
    handleUpdateProjects(projectArray);
  }, [projectArray, dispatch]);

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
      {projectArray.map((project, index) => {
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
                  {index + 1}. Project Details
                </Typography>
              </Box>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  const isExpanded = !project.isExpanded;
                  updateProject(index, { isExpanded }); // Update the expanded state of the project
                }}
              >
                {project.isExpanded ? (
                  <ExpandLessIcon sx={{ color: "#fff" }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: "#fff" }} />
                )}
              </Box>
            </Box>

            {project.isExpanded && (
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
                    onChangeHandler={(text) =>
                      updateProject(index, { projectName: text })
                    }
                    placeholder="Project Name"
                    value={project?.projectName}
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
                      date={project.startDate}
                      onChangeDate={(date) => {
                        const newDates = {};

                        if (
                          new Date(date?.toISOString()) >
                          new Date(project?.endDate)
                        ) {
                          newDates.endDate = date;
                        }
                        newDates.startDate = date;
                        updateProject(index, newDates);
                      }}
                      placeholder="Start Date"
                    />
                    <DatePicker
                      date={
                        project?.currentlyWorking
                          ? new Date()
                          : project?.endDate
                      }
                      disabled={project?.currentlyWorking}
                      onChangeDate={(date) => {
                        const newDates = {};
                        if (
                          new Date(date?.toISOString()) <
                          new Date(project?.endDate)
                        ) {
                          newDates.startDate = date;
                        }
                        newDates.endDate = date;
                        updateProject(index, newDates);
                      }}
                      placeholder="End Date"
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      checked={project?.currentlyWorking}
                      control={
                        <Checkbox
                          onChange={(e) =>
                            updateProject(index, {
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
                    onChangeHandler={(text) =>
                      updateProject(index, { role: text })
                    }
                    placeholder="Your Role"
                    value={project?.role}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <LoginSignupInput
                    onChangeHandler={(text) =>
                      updateProject(index, { projectUrl: text })
                    }
                    placeholder="Project URL"
                    value={project?.projectUrl}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <LoginSignupInput
                    onChangeHandler={(text) =>
                      updateProject(index, { description: text })
                    }
                    multiline={true}
                    rows={4}
                    placeholder="Description"
                    value={project?.description}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "16px",
                    }}
                  >
                    <Typography
                      onClick={() =>
                        setProjectArray(
                          projectArray.filter((_, i) => i !== index)
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
          handleOnClick={handleAddProjectClick}
          name="Add Project"
        />
      </Box>
    </Box>
  );
};

export default AddProjectDetails;
