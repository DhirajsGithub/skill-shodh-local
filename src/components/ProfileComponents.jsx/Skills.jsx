import {
  Alert,
  Box,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useId, useState } from "react";
import Footer from "./Footer";
import Wrapper from "./Wrapper";
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LoadingScreen from "../generalComponents/LoadingScreen";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import { addskillsreq, getsuggestionskills, nextstep3 } from "../../utils/api";
import SuggestionCard from "../generalComponents/SuggestionCard";
import SelectedSkillRow from "./SelectedSkillRow";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import AddInternshipDetails from "./AddInternshipDetails";
import AddProjectDetails from "./AddProjectDetails";
import AddPORDetails from "./AddPORDetails";
import { setSkillDetails, updateUser } from "../../store";

const Skills = () => {
  const { skillDetails } = useSelector((state) => state.onboardingSlice);
  const { skills, internshipDetails, projectDetails, porDetails } =
    skillDetails;
  const dispatch = useDispatch();
  const [openAddRequesSkill, setOpenAddRequestSkill] = useState(false);
  const [skillAddChange, setSkillAddChange] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(skills);
  const [suggestionSkillLoading, setSuggestionSkillLoading] = useState(false);
  const [tempInternships, setTempInternShips] = useState(internshipDetails);
  const [tempProjects, setTempProjects] = useState(projectDetails);
  const [tempPorDetails, setTempPorDetails] = useState(porDetails);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const [error, setError] = useState({ isError: false, message: "" });
  const [searchSkillText, setSearchSkillText] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceFunc = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 300);
    };
  };

  const fetchSuggestedSkills = async (text, skillsSelected) => {
    try {
      setSuggestionSkillLoading(true);
      const response = await getsuggestionskills(text, skillsSelected);

      setSuggestionSkillLoading(false);
      if (response.status === true) {
        setSuggestedSkills(response.data);
      }
    } catch (error) {
      setSuggestionSkillLoading(false);
      console.error(error);
    }
  };

  const optimizedFn = useCallback(debounceFunc(fetchSuggestedSkills), []);
  const handleSelectSkillChange = (text) => {
    optimizedFn(text, selectedSkills);
    setSearchSkillText(text);
  };

  useEffect(() => {
    fetchSuggestedSkills("", selectedSkills);
  }, []);

  const handleSuggestedSkillClick = (name) => {
    const present = selectedSkills.find((skill) => skill.name === name);
    if (present) {
      return;
    }
    setError({ error: false, message: "" });
    setSelectedSkills([
      ...selectedSkills,
      { name: name, level: 2, id: uuidv4() },
    ]);
    fetchSuggestedSkills("", [
      ...selectedSkills,
      { name: name, level: 2, id: uuidv4() },
    ]);
    setSearchSkillText("");
  };
  const handleDeleteSelectedSkillClick = (id) => {
    let filterSkills = selectedSkills?.filter((skill) => skill.id !== id);
    setSelectedSkills(filterSkills);
    fetchSuggestedSkills("", filterSkills);
    setSearchSkillText("");
  };

  const handleSkillAddClick = async () => {
    setOpenAddRequestSkill(false);

    if (skillAddChange.length === 0) {
      return;
    }
    try {
      setLoading(true);
      let res = await addskillsreq(skillAddChange);
      if (res.status) {
        setSnackBarInfo({ type: "info", msg: res.message });
        setShowSnackbar(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setSkillAddChange("");
  };

  const handleSelectedSkillLevelChange = (id, level) => {
    setSelectedSkills((prev) => {
      return prev.map((skill) => {
        if (skill.id === id) {
          return { ...skill, level: level };
        }
        return skill;
      });
    });
  };

  const handleUpdateInternship = (interns) => {
    setTempInternShips(interns);
  };

  const handleUpdateProjects = (projects) => {
    setTempProjects(projects);
  };
  const handleUpdatePors = (pors) => {
    setTempPorDetails(pors);
  };

  const updateUserDetail = () => {
    dispatch(
      updateUser({
        skills: selectedSkills,
        interns: tempInternships,
        projects: tempProjects,
        por: tempPorDetails,
      })
    );
  };

  const updateOnboardingSlice = () => {
    dispatch(setSkillDetails({ field: "skills", value: selectedSkills }));
    dispatch(
      setSkillDetails({ field: "internshipDetails", value: tempInternships })
    );
    dispatch(setSkillDetails({ field: "projectDetails", value: tempProjects }));
    dispatch(setSkillDetails({ field: "porDetails", value: tempPorDetails }));
  };

  const isValidInternship = (internship) => {
    const requiredFields = ["companyName", "description", "startDate", "role"];
    if (!internship?.currentlyWorking) {
      requiredFields.push("endDate");
    }

    return requiredFields.every((field) => internship[field]);
  };
  const isValidProject = (project) => {
    const requiredFields = ["projectName", "startDate", "role", "description"];
    if (!project.currentlyWorking) {
      requiredFields.push("endDate");
    }
    return requiredFields.every((field) => project[field]);
  };
  const isValidPOR = (por) => {
    const requiredFields = ["startDate", "role", "description"];
    if (!por.currentlyWorking) {
      requiredFields.push("endDate");
    }
    return requiredFields.every((field) => por[field]);
  };
  const handleSaveClick = async () => {
    // console.log(isValidInternship(tempInternships[0]));
    if (tempInternships.some((internship) => !isValidInternship(internship))) {
      setSnackBarInfo({
        type: "error",
        msg: "Please fill all the required fields in Internship Details",
      });
      setShowSnackbar(true);
      return;
    }
    if (tempProjects.some((project) => !isValidProject(project))) {
      setSnackBarInfo({
        type: "error",
        msg: "Please fill all the required fields in Project Details",
      });
      setShowSnackbar(true);
      return;
    }
    if (tempPorDetails.some((por) => !isValidPOR(por))) {
      setSnackBarInfo({
        type: "error",
        msg: "Please fill all the required fields in POR Details",
      });
      setShowSnackbar(true);
      return;
    }
    if (selectedSkills.length === 0) {
      setError({ isError: true, message: "Please select atleast one skill" });
      setSnackBarInfo({
        type: "error",
        msg: "Please select atleast one skill",
      });
      setShowSnackbar(true);
      return;
    }
    const skillsName = selectedSkills.map((skill) => skill.name);
    try {
      setLoading(true);
      let res = await nextstep3(
        skillsName,
        selectedSkills,
        tempInternships,
        tempProjects,
        tempPorDetails
      );

      setLoading(false);
      if (res.status === true) {
        updateUserDetail();
        updateOnboardingSlice();
        setSnackBarInfo({
          type: "success",
          msg: "Skills Details Updated Successfully",
        });
        setShowSnackbar(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginTop: "30px" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={3000}
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
      <LoadingScreen name="Updating..." loading={loading} />
      <Wrapper>
        <LoadingScreen loading={loading} />
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h6">Skills*</Typography>
            <TextField
              value={searchSkillText}
              onChange={(event) => {
                handleSelectSkillChange(event.target.value);
              }}
              inputProps={{
                style: {
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 400,
                  padding: 0,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#8B8B8B" }} />
                  </InputAdornment>
                ),
              }}
              placeholder="Search for your desired skill "
              sx={{
                marginTop: "15px",
                "& fieldset": { border: "none" },
                borderRadius: "60px",
                backgroundColor: "#26262F",
                border: "1px solid rgba(136, 136, 136, 0.20)",
                padding: "10px 32px",
                "& .css-tnihsi-MuiInputBase-root-MuiOutlinedInput-root": {
                  paddingLeft: "0px",
                },
              }}
            />
          </Box>
          {suggestionSkillLoading && <Typography>Loading...</Typography>}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "start",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <Typography variant="subtitle1">Suggestions</Typography>
          <Box
            sx={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "15px",
              width: "100%",
            }}
          >
            {suggestedSkills.map((suggestion, index) => {
              return (
                <Box key={index}>
                  <SuggestionCard
                    handleOnClick={(name) => {
                      handleSuggestedSkillClick(name);
                    }}
                    color="#888"
                    name={suggestion}
                    checked={false}
                    fix={true}
                  />
                </Box>
              );
            })}
            {!openAddRequesSkill && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  onClick={() => setOpenAddRequestSkill(true)}
                  variant="body1"
                  sx={{
                    color: "#5773FF",
                    cursor: "pointer",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Not listed?
                </Typography>
              </Box>
            )}
            {openAddRequesSkill && (
              <Box
                sx={{
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <LoginSignupInput
                  onChangeHandler={(text) => {
                    setSkillAddChange(text);
                  }}
                  value={skillAddChange}
                  endIcon={
                    <ArrowCircleRightIcon
                      onClick={handleSkillAddClick}
                      sx={{ color: "#5773FF", cursor: "pointer" }}
                    />
                  }
                  label="Skill Add Request"
                  placeholder="Write Your Skill Name Here"
                />
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1">Selected Skills</Typography>
          {error.isError && (
            <Typography
              sx={{ color: "#FF4242", marginTop: "4px", marginLeft: "15px" }}
              variant="body2"
            >
              {error.message}
            </Typography>
          )}
          <Box
            sx={{
              marginTop: "10px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {selectedSkills.map((skill, index) => {
              return (
                <SelectedSkillRow
                  key={index}
                  handleLevelChange={handleSelectedSkillLevelChange}
                  handleDeleteSelectedSkillClick={
                    handleDeleteSelectedSkillClick
                  }
                  skillDetails={skill}
                  level={skill.level}
                />
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: "50px",
          }}
        >
          <AddInternshipDetails
            handleUpdateInternship={handleUpdateInternship}
          />

          <AddProjectDetails handleUpdateProjects={handleUpdateProjects} />
          <AddPORDetails handleUpdatePors={handleUpdatePors} />
        </Box>
      </Wrapper>
      <Footer handleSaveClick={handleSaveClick} />
    </Box>
  );
};

export default Skills;
