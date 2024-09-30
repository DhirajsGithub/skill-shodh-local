import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Wrapper from "./Wrapper";
import { Alert, Box, Snackbar, Typography, useMediaQuery } from "@mui/material";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useDispatch, useSelector } from "react-redux";
import { handleNextButtonClick, setSkillDetails } from "../../store";
import SuggestionCard from "../generalComponents/SuggestionCard";
import SelectedSkillRow from "./SelectedSkillRow";
import AddInternshipDetails from "./AddInternshipDetails";
import AddProjectDetails from "./AddProjectDetails";
import AddPORDetails from "./AddPORDetails";
import { addskillsreq, getsuggestionskills, nextstep3 } from "../../utils/api";
import LoadingScreen from "../generalComponents/LoadingScreen";
import { v4 as uuidv4 } from "uuid";

const SkillDetails = React.forwardRef((props, ref) => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { skillDetails } = useSelector((state) => state.onboardingSlice);
  const { skills, internshipDetails, projectDetails, porDetails } =
    skillDetails;

  const [openAddRequesSkill, setOpenAddRequestSkill] = useState(false);
  const [skillAddChange, setSkillAddChange] = useState("");
  const [selectedSkills, setSelectedSkills] = useState(skills);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [suggestionSkillLoading, setSuggestionSkillLoading] = useState(false);
  const [searchSkillText, setSearchSillText] = useState("");
  const [error, setError] = useState({ isError: false, message: "" });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const isValidInternship = (internship) => {
    const requiredFields = ["companyName", "description", "startDate", "role"];
    if (!internship?.currentlyWorking) {
      requiredFields.push("endDate");
    }

    return requiredFields.every((field) => internship[field]);
  };
  const isValidPOR = (por) => {
    const requiredFields = ["startDate", "role", "description"];
    if (!por.currentlyWorking) {
      requiredFields.push("endDate");
    }
    return requiredFields.every((field) => por[field]);
  };
  const isValidProject = (project) => {
    const requiredFields = ["projectName", "startDate", "role", "description"];
    if (!project.currentlyWorking) {
      requiredFields.push("endDate");
    }
    return requiredFields.every((field) => project[field]);
  };

  const addStep3Date = async () => {
    if (
      internshipDetails.some((internship) => !isValidInternship(internship))
    ) {
      setSnackBarInfo({
        type: "error",
        msg: "Please fill all the required fields in Internship details",
      });
      setShowSnackbar(true);
      return;
    }
    if (projectDetails.some((project) => !isValidProject(project))) {
      setSnackBarInfo({
        type: "error",
        msg: "Please fill all the required fields in Project details",
      });
      setShowSnackbar(true);
      return;
    }
    if (porDetails.some((por) => !isValidPOR(por))) {
      setSnackBarInfo({
        type: "error",
        msg: "Please fill all the required fields in POR details",
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
        internshipDetails,
        projectDetails,
        porDetails
      );

      setLoading(false);
      if (res.status === true) {
        dispatch(handleNextButtonClick());
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleNextClick = () => {
    const isValid = selectedSkills.length > 0;
    if (!isValid) {
      setError({ isError: true, message: "Please select atleast one skill" });
      setSnackBarInfo({
        type: "error",
        msg: "Please select atleast one skill",
      });
      setShowSnackbar(true);
    } else {
      setError({ isError: false, message: "" });

      addStep3Date();
    }
  };

  useImperativeHandle(ref, () => {
    return {
      handleNextClick,
    };
  });

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

  const optimizedFn = useCallback(
    debounceFunc(fetchSuggestedSkills, selectedSkills),
    []
  );
  const handleSelectSkillChange = (text) => {
    setSearchSillText(text);
    optimizedFn(text, selectedSkills);
  };

  useEffect(() => {
    fetchSuggestedSkills("", selectedSkills);
  }, []);

  const handleSuggestedSkillClick = (name) => {
    setError({ isError: false, message: "" });
    if (selectedSkills.find((skill) => skill.name === name)) {
      return;
    }
    setSelectedSkills([
      ...selectedSkills,
      { name: name, level: 2, id: uuidv4() },
    ]);
    fetchSuggestedSkills("", [
      ...selectedSkills,
      { name: name, level: 2, id: uuidv4() },
    ]);
    setSearchSillText("");
  };
  const handleDeleteSelectedSkillClick = (id) => {
    let filterSkills = selectedSkills.filter((skill) => skill.id !== id);
    setSelectedSkills(filterSkills);
    fetchSuggestedSkills("", filterSkills);
    setSearchSillText("");
  };

  useEffect(() => {
    dispatch(setSkillDetails({ field: "skills", value: selectedSkills }));
  }, [selectedSkills]);

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

  return (
    <Wrapper>
      <LoadingScreen loading={loading} />
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
      <Box
        sx={{
          width: "100%",
        }}
      >
        <LoginSignupInput
          value={searchSkillText}
          onChangeHandler={(text) => {
            handleSelectSkillChange(text);
          }}
          startIcon={<SearchIcon sx={{ color: "#8B8B8B" }} />}
          label="Select Your Skill*"
          placeholder="Search for your desired skill "
        />
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
                handleDeleteSelectedSkillClick={handleDeleteSelectedSkillClick}
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
        <AddInternshipDetails />
        <AddProjectDetails />
        <AddPORDetails />
      </Box>
    </Wrapper>
  );
});

export default SkillDetails;
