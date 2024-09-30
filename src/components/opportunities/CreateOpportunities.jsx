import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LoginSignupInput from "../LoginSignupComponents/LoginSignupInput";
import SuggestionCard from "../generalComponents/SuggestionCard";
import DeleteIcon from "@mui/icons-material/Delete";
import ActionButton from "../Buttons/ActionButton";
import { getfilterskills } from "../../utils/searchapi";
import { createoppo } from "../../utils/opportunitiesapi";
import { useSelector } from "react-redux";
import { getcolleges } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import debounceFunc from "../../Helpers/debounce";

const CreateOpportunities = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { user } = useSelector((state) => state.authSlice);

  const [titleOfPosition, setTitleOfPosition] = useState("");
  const [descriptionOfPosition, setDescriptionOfPosition] = useState("");
  const [nameOfProject, setNameOfProject] = useState("");
  const [descriptionOfProject, setDescriptionOfProject] = useState("");

  const [selectedCollegeList, setSelectedCollegeList] = useState([]);
  const [questions, setQuestions] = useState([
    { question: "", index: 0, id: uuidv4() },
  ]);
  const [anyCollege, setAnyCollege] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [fetchingSkills, setFetchingSkills] = useState(false);
  const [cvRequired, setCvRequired] = useState(false);
  const [searchSkill, setSearchSkill] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ type: "", msg: "" });
  const [createingOpportunity, setCreatingOpportunity] = useState(false);
  const [collegeSuggestion, setCollegeSuggestion] = useState([]);
  const [searchCollege, setSearchCollege] = useState("");
  const [fetchingCollege, setFetchingCollege] = useState(false);
  const [stipendAvailable, setStipendAvailable] = useState(false);
  const [stipendAmount, setStipendAmount] = useState("");
  const [collectPhone, setCollectPhone] = useState(false);

  const fetchSkills = async (skillText, selectedSkills) => {
    try {
      setFetchingSkills(true);

      let res = await getfilterskills(skillText, selectedSkills);
      setFetchingSkills(false);
      if (res.status === true) {
        setSkills(res.data);
      }
    } catch (err) {
      setFetchingSkills(false);
      setShowSnackbar(true);
      setSnackBarInfo({
        type: "error",
        msg: "Internal server error",
      });
    }
  };
  const fetchCollegeSuggestion = async (collegeText, selectedColList) => {
    try {
      setFetchingCollege(true);
      let res = await getcolleges(collegeText, selectedColList);

      setFetchingCollege(false);
      if (res.status === true) {
        setCollegeSuggestion(res.data?.slice(0, 8));
      }
    } catch (err) {
      setFetchingCollege(false);
      setShowSnackbar(true);
      setSnackBarInfo({
        type: "error",
        msg: "Internal server error",
      });
    }
  };
  useEffect(() => {
    fetchCollegeSuggestion("", selectedCollegeList);
  }, [selectedCollegeList]);

  useEffect(() => {
    fetchSkills("", selectedSkills);
  }, [selectedSkills]);

  const optimizedClgSearch = useCallback(
    debounceFunc(fetchCollegeSuggestion, 500),
    []
  );
  const handleSelectCollegeChange = (text) => {
    optimizedClgSearch(text, selectedCollegeList);
    setSearchCollege(text);
  };

  const optimizedSkillSearch = useCallback(debounceFunc(fetchSkills, 500), []);
  const handleSelectSkillChange = (text) => {
    optimizedSkillSearch(text, selectedSkills);
    setSearchSkill(text);
  };

  const handleAddMoreQuestionClick = () => {
    for (let question of questions) {
      if (question.question.length === 0) {
        return;
      }
    }
    if (questions.length >= 5) {
      return;
    }
    setQuestions((prv) => [
      ...prv,
      { question: "", index: prv.length, id: uuidv4() },
    ]);
  };
  const handleDeleteQuestionClick = (id) => {
    setQuestions((prv) => prv.filter((q) => q.id !== id));
  };
  const handleCreateOpportunityClick = async () => {
    // Validate each field individually and show specific error messages
    if (!titleOfPosition) {
      setSnackBarInfo({ type: "error", msg: "Title of Position is required" });
      setShowSnackbar(true);
      return;
    }

    if (!descriptionOfPosition) {
      setSnackBarInfo({
        type: "error",
        msg: "Description of Position is required",
      });
      setShowSnackbar(true);
      return;
    }

    if (!nameOfProject) {
      setSnackBarInfo({ type: "error", msg: "Name of Project is required" });
      setShowSnackbar(true);
      return;
    }

    if (!descriptionOfProject) {
      setSnackBarInfo({
        type: "error",
        msg: "Description of Project is required",
      });
      setShowSnackbar(true);
      return;
    }

    if (!anyCollege && selectedCollegeList.length === 0) {
      setSnackBarInfo({
        type: "error",
        msg: "At least one college must be selected",
      });
      setShowSnackbar(true);
      return;
    }

    if (selectedSkills.length === 0) {
      setSnackBarInfo({
        type: "error",
        msg: "At least one skill must be selected",
      });
      setShowSnackbar(true);
      return;
    }

    if (!questions || questions.length === 0) {
      setSnackBarInfo({
        type: "error",
        msg: "At least one question is required",
      });
      setShowSnackbar(true);
      return;
    }

    if (!user) {
      setSnackBarInfo({ type: "error", msg: "User information is required" });
      setShowSnackbar(true);
      return;
    }

    if (stipendAvailable && (!stipendAmount || stipendAmount <= 1)) {
      setSnackBarInfo({
        type: "error",
        msg: "A valid stipend amount is required",
      });
      setShowSnackbar(true);
      return;
    }

    if (createingOpportunity) {
      setSnackBarInfo({
        type: "error",
        msg: "Please wait, creating opportunity...",
      });
      setShowSnackbar(true);
      return;
    }

    // If all validations pass, proceed with the opportunity creation
    let filteredQuestions = questions.filter((q) => q.question.length > 0);
    const data = {
      ptitle: titleOfPosition,
      pdesc: descriptionOfPosition,
      sname: nameOfProject,
      sdesc: descriptionOfProject,
      anycoll: anyCollege,
      colleges: selectedCollegeList,
      skills: selectedSkills,
      cvr: cvRequired,
      stipendalb: stipendAvailable,
      stipendamt: stipendAmount,
      collectph: collectPhone,
      questions: filteredQuestions,
    };

    try {
      setCreatingOpportunity(true);
      let res = await createoppo(data, user);
      setSnackBarInfo({
        type: "success",
        msg: "Opportunity created successfully",
      });
      setShowSnackbar(true);
      setCreatingOpportunity(false);
    } catch (error) {
      setCreatingOpportunity(false);
      setSnackBarInfo({ type: "error", msg: "Failed to create opportunity" });
      setShowSnackbar(true);
    }

    handleCancelClick();
  };

  const handleCancelClick = () => {
    setTitleOfPosition("");
    setDescriptionOfPosition("");
    setNameOfProject("");
    setDescriptionOfProject("");
    setAnyCollege(false);
    setCvRequired(false);
    setSelectedCollegeList([]);
    setQuestions([{ question: "", index: 0 }]);
    setSelectedSkills([]);
    setStipendAvailable(false);
    setCollectPhone(false);
    setSearchSkill("");
  };
  const filteredCollegeSuggestion = () => {
    // filter based on selectedCollegeList and college suggestion
    return collegeSuggestion.filter((clg) => {
      return !selectedCollegeList.includes(clg.name);
    });
  };
  console.log(questions);
  return (
    <Box
      sx={{
        padding: smallScreen ? "20px" : "40px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={4000}
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="h4">Position</Typography>
        <LoginSignupInput
          value={titleOfPosition}
          onChangeHandler={(text) => setTitleOfPosition(text)}
          placeholder="Title of Position"
        />
        <LoginSignupInput
          value={descriptionOfPosition}
          onChangeHandler={(text) => setDescriptionOfPosition(text)}
          rows={3}
          multiline={true}
          placeholder="Description for the Position"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="h4">Project / Start Up</Typography>
        <LoginSignupInput
          value={nameOfProject}
          onChangeHandler={(text) => setNameOfProject(text)}
          placeholder="Name of Project/StartUp"
        />
        <LoginSignupInput
          value={descriptionOfProject}
          onChangeHandler={(text) => setDescriptionOfProject(text)}
          rows={3}
          multiline={true}
          placeholder="Description for the Project / Startup"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <Typography variant="h4">Students From</Typography>
        <Box>
          <FormControlLabel
            sx={{ marginBottom: "10px" }}
            control={
              <Checkbox
                checked={anyCollege}
                onChange={(event) => {
                  setSelectedCollegeList([]);
                  setAnyCollege(event.target.checked);
                }}
                sx={{
                  color: "#888",
                  "&.Mui-checked": {
                    color: "#5773FF",
                  },
                }}
              />
            }
            label="Students from any college"
          />
          {!anyCollege && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Box
                sx={{
                  maxWidth: "270px",
                  "& .css-tnihsi-MuiInputBase-root-MuiOutlinedInput-root": {
                    paddingLeft: "0px !important",
                  },
                }}
              >
                <TextField
                  onChange={(event) =>
                    handleSelectCollegeChange(event.target.value)
                  }
                  value={searchCollege}
                  autoComplete="off"
                  placeholder="Search College"
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
                        <SearchIcon
                          sx={{
                            color: "#8B8B8B",
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& fieldset": { border: "none" },
                    border: "1px solid rgba(136, 136, 136, 0.20)",
                    borderRadius: "62px",
                    padding: smallScreen ? "10px 15px" : "10px 32px",
                    "& .css-vkq66k-MuiInputBase-root-MuiOutlinedInput-root": {
                      paddingLeft: "0px",
                    },
                    width: "100%",
                    background: "#26262F",
                  }}
                />
              </Box>
              {fetchingCollege && (
                <Typography>loading new colleges...</Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {selectedCollegeList?.map((college, index) => {
                  return (
                    <Box key={index}>
                      <SuggestionCard
                        fix={true}
                        name={college}
                        checked={true}
                        handleOnClick={() =>
                          setSelectedCollegeList((prv) =>
                            prv.filter((clg) => clg !== college)
                          )
                        }
                      />
                    </Box>
                  );
                })}
                {filteredCollegeSuggestion()?.map((college, index) => {
                  return (
                    <Box key={index}>
                      <SuggestionCard
                        fix={true}
                        name={college.name}
                        handleOnClick={() => {
                          setSelectedCollegeList((prv) => [
                            ...prv,
                            college.name,
                          ]);
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="h4">Skills Required</Typography>
        <Box
          sx={{
            maxWidth: "270px",
            "& .css-tnihsi-MuiInputBase-root-MuiOutlinedInput-root": {
              paddingLeft: "0px !important",
            },
          }}
        >
          <TextField
            onChange={(event) => handleSelectSkillChange(event.target.value)}
            value={searchSkill}
            autoComplete="off"
            placeholder="Search Skills"
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
                  <SearchIcon
                    sx={{
                      color: "#8B8B8B",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& fieldset": { border: "none" },
              border: "1px solid rgba(136, 136, 136, 0.20)",
              borderRadius: "62px",
              padding: smallScreen ? "10px 15px" : "10px 32px",
              "& .css-vkq66k-MuiInputBase-root-MuiOutlinedInput-root": {
                paddingLeft: "0px",
              },
              // width: "100%",
              background: "#26262F",
            }}
          />
        </Box>

        {fetchingSkills && <Typography>loading new skills...</Typography>}
        <Box
          sx={{
            display: "flex",
            width: smallScreen ? "100%" : "70%",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {selectedSkills?.map((skill, index) => {
            return (
              <Box key={index}>
                <SuggestionCard
                  fix={true}
                  name={skill}
                  checked={true}
                  handleOnClick={() => {
                    setSelectedSkills((prv) => prv.filter((s) => s !== skill));
                  }}
                />
              </Box>
            );
          })}
          {skills?.map((skill, index) => {
            return (
              <Box key={index}>
                <SuggestionCard
                  fix={true}
                  name={skill}
                  // checked={selectedSkills.includes(skill)}
                  handleOnClick={() => {
                    setSelectedSkills((prv) => [...prv, skill]);
                  }}
                />
              </Box>
            );
          })}
          {skills.length == 0 && searchSkill.length > 0 && (
            <Box>
              <SuggestionCard
                fix={true}
                name={searchSkill}
                checked={selectedSkills.includes(searchSkill)}
                handleOnClick={() => {
                  setSelectedSkills((prv) => [...prv, searchSkill]);
                  setSearchSkill("");
                }}
              />
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h4">CV</Typography>
        <Box>
          <FormControlLabel
            sx={{ marginBottom: "10px" }}
            control={
              <Checkbox
                checked={cvRequired}
                onChange={(event) => {
                  setCvRequired(event.target.checked);
                }}
                sx={{
                  color: "#888",
                  "&.Mui-checked": {
                    color: "#5773FF",
                  },
                }}
              />
            }
            label="Required"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h4">Stipend</Typography>
        <Box>
          <FormControlLabel
            sx={{ marginBottom: "10px" }}
            control={
              <Checkbox
                checked={stipendAvailable}
                onChange={(event) => {
                  setStipendAvailable(event.target.checked);
                }}
                sx={{
                  color: "#888",
                  "&.Mui-checked": {
                    color: "#5773FF",
                  },
                }}
              />
            }
            label="Paid"
          />
        </Box>
        {stipendAvailable && (
          <LoginSignupInput
            required
            placeholder={"Enter Stipend Amount*"}
            value={stipendAmount}
            onChangeHandler={(value) => {
              setStipendAmount(value);
            }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h4">Collect Phone Number</Typography>
        <Box>
          <FormControlLabel
            sx={{ marginBottom: "10px" }}
            control={
              <Checkbox
                checked={collectPhone}
                onChange={(event) => {
                  setCollectPhone(event.target.checked);
                }}
                sx={{
                  color: "#888",
                  "&.Mui-checked": {
                    color: "#5773FF",
                  },
                }}
              />
            }
            label="Collect"
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="h4">Add Questions</Typography>
        {questions?.map((question, index) => {
          return (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <LoginSignupInput
                placeholder={`Question ${index + 1}`}
                value={question.question}
                onChangeHandler={(value) => {
                  setQuestions((prv) =>
                    prv.map((q) => {
                      if (q.id === question.id) {
                        return { ...q, question: value };
                      }
                      return q;
                    })
                  );
                }}
              />
              <DeleteIcon
                onClick={() => handleDeleteQuestionClick(question.id)}
                sx={{
                  color: "#fff",
                  width: smallScreen ? "25px" : "30px",
                  height: smallScreen ? "25px" : "30px",
                  cursor: "pointer",
                }}
              />
            </Box>
          );
        })}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            onClick={handleAddMoreQuestionClick}
            sx={{
              color: "#5773FF",
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            variant="body1"
          >
            + Add more
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          marginTop: "20px",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => handleCancelClick()}
          sx={{
            color: "#fff",
            fontSize: "14px",
            fontWeight: 400,
            textTransform: "none",
          }}
          variant="text"
        >
          Cancel
        </Button>
        <Box>
          <ActionButton
            fontSize="14px"
            handleOnClick={handleCreateOpportunityClick}
            name="Create"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateOpportunities;
