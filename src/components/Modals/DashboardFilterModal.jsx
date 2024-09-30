import React, { useState, useEffect, useCallback } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import roundedCloseIcon from "../../assets/roundedClose.svg";
import {
  setCollegeFilterList,
  setSkillsFilterList,
} from "../../store/slices/HeaderSlice";
import SuggestionCard from "../generalComponents/SuggestionCard";
import ActionButton from "../Buttons/ActionButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import { setModalInfo } from "../../store";
import { getfilterskills } from "../../utils/searchapi";
import debounceFunc from "../../Helpers/debounce";
import { ModalStyle } from "../../styles/styles";
import { getcolleges } from "../../utils/api";

export default function DashboardFilterModal() {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const mediumScreen = useMediaQuery("(max-width:1024px)");
  const dispatch = useDispatch();
  const { modalInfo } = useSelector((state) => state.generalSlice);
  const { collegeFilterList, skillsFilterList } = useSelector(
    (state) => state.headerSlice
  );
  const [tempCollegeFilterList, setTempCollegeFilterList] = useState([]);

  const [searchSkill, setSearchSkill] = useState("");
  const [Skills, setSkills] = useState([]);
  const [fetchingSkills, setFetchingSkills] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [searchCollege, setSearchCollege] = useState("");
  const [collegeSuggestion, setCollegSuggestion] = useState([]);
  const [fetchingColleges, setFetchingFetchingColleges] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState([]);

  const style = {
    width: smallScreen ? "90%" : mediumScreen ? "80%" : "750px",
    maxWidth: "750px",
    bgcolor: "#26262F",
    border: "1px solid rgba(136, 136, 136, 0.20)",
    borderRadius: "10px",
    boxShadow: "-7px 4px 28.6px 0px rgba(0, 0, 0, 0.15)",
    p: "20px",
    gap: "20px",
  };

  const handleCloseClick = () => {
    setSelectedColleges(collegeFilterList);
    setSelectedSkills(skillsFilterList);
    dispatch(setModalInfo(""));
  };

  const handleCollegeSuggestionClick = (name, includes) => {
    if (includes) {
      setTempCollegeFilterList((prv) =>
        prv.filter((college) => college !== name)
      );
    } else {
      setTempCollegeFilterList((prv) => [...prv, name]);
    }
  };

  // i want to apply filter when apply filter is pressed, that's why i am using this function
  // here i maintain the temp list of college and skills and then apply the filter
  const handleApplyFilterClick = () => {
    dispatch(setCollegeFilterList(selectedColleges));
    dispatch(setSkillsFilterList(selectedSkills));
    dispatch(setModalInfo(""));
  };

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
    }
  };
  useEffect(() => {
    fetchSkills("", selectedSkills);
  }, [selectedSkills]);

  const optimizedSkillSearch = useCallback(debounceFunc(fetchSkills, 500), []);
  const handleSelectSkillChange = (text) => {
    optimizedSkillSearch(text, selectedSkills);
    setSearchSkill(text);
  };

  const fetchColleges = async (collegeText, selectedColleges) => {
    try {
      setFetchingFetchingColleges(true);
      let res = await getcolleges(collegeText, selectedColleges);

      setFetchingFetchingColleges(false);
      if (res.status === true) {
        setCollegSuggestion(res.data?.slice(0, 6));
      }
    } catch (err) {
      setFetchingFetchingColleges(false);
    }
  };
  useEffect(() => {
    fetchColleges("", selectedColleges);
  }, [selectedColleges]);

  const optimizedCollegeChange = useCallback(
    debounceFunc(fetchColleges, 500),
    []
  );
  const handleSelectCollegeChange = (text) => {
    optimizedCollegeChange(text, selectedColleges);
    setSearchCollege(text);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalInfo === "filterModal"}
        onClose={handleCloseClick}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalInfo === "filterModal"}>
          <Box sx={{ ...ModalStyle, ...style }}>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" sx={{ color: "#888" }}>
                Filters
              </Typography>
              <Box
                onClick={handleCloseClick}
                sx={{
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                }}
                component="img"
                src={roundedCloseIcon}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Typography variant="h5">College</Typography>
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
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {fetchingColleges && (
                  <Typography variant="body1">Fetching Colleges...</Typography>
                )}
                {selectedColleges?.map((college, index) => {
                  return (
                    <Box key={index}>
                      <SuggestionCard
                        fix={true}
                        name={college}
                        checked={true}
                        handleOnClick={() => {
                          setSelectedColleges((prv) =>
                            prv.filter((s) => s !== college)
                          );
                        }}
                      />
                    </Box>
                  );
                })}
                {collegeSuggestion?.map((college, index) => {
                  return (
                    <Box key={index}>
                      <SuggestionCard
                        fix={true}
                        name={college?.name}
                        handleOnClick={() => {
                          setSelectedColleges((prv) => [...prv, college?.name]);
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Typography variant="h5">Skills</Typography>
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
                    handleSelectSkillChange(event.target.value)
                  }
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
                    width: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {fetchingSkills && (
                  <Typography variant="body1">Fetching Skills...</Typography>
                )}
                {selectedSkills?.map((skill, index) => {
                  return (
                    <Box key={index}>
                      <SuggestionCard
                        fix={true}
                        name={skill}
                        checked={true}
                        handleOnClick={() => {
                          setSelectedSkills((prv) =>
                            prv.filter((s) => s !== skill)
                          );
                        }}
                      />
                    </Box>
                  );
                })}
                {Skills?.map((skill, index) => {
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
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
            >
              <Button
                onClick={() => {
                  setSelectedColleges([]);
                  setSelectedSkills([]);
                  dispatch(setCollegeFilterList([]));
                  dispatch(setSkillsFilterList([]));
                  dispatch(setModalInfo(""));
                }}
                sx={{ textTransform: "none", fontSize: "16px" }}
                variant="text"
              >
                Clear Filter
              </Button>
              <Box>
                <PrimaryButton handleOnClick={handleApplyFilterClick}>
                  Appy Filters
                </PrimaryButton>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
