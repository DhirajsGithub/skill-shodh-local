import React from "react";
import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { InputAdornment, TextField, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import roundedCloseIcon from "../../../assets/roundedClose.svg";

import SuggestionCard from "../../generalComponents/SuggestionCard";
import PrimaryButton from "../Buttons/PrimaryButton";
import { setModalInfo } from "../../store";

const OpportunitiesFilter = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const mediumScreen = useMediaQuery("(max-width:1024px)");
  const { modalInfo } = useSelector((state) => state.generalSlice);
  const { collegeFilterList, skillsFilterList } = useSelector(
    (state) => state.headerSlice
  );
  const [tempCollegeFilterList, setTempCollegeFilterList] = useState([]);
  const [tempSkillsFilterList, setTempSkillsFilterList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setTempCollegeFilterList(collegeFilterList);
    setTempSkillsFilterList(skillsFilterList);
  }, [skillsFilterList, collegeFilterList]);

  const style = {
    position: "absolute",
    maxHeight: "80vh",
    overflowY: "scroll",
    scrollbarWidth: "none",
    top: "50%",
    // left: smallScreen ? "50%" : mediumScreen ? "65%" : "62%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: smallScreen ? "90%" : mediumScreen ? "80%" : "750px",
    maxWidth: "750px",
    bgcolor: "#26262F",
    border: "1px solid rgba(136, 136, 136, 0.20)",
    borderRadius: "10px",
    boxShadow: "-7px 4px 28.6px 0px rgba(0, 0, 0, 0.15)",
    p: "20px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 9999,
  };

  const handleCloseClick = () => {
    setTempCollegeFilterList(collegeFilterList);
    setTempSkillsFilterList(skillsFilterList);
    dispatch(setModalInfo(""));
  };

  const collegeSuggestion = [
    { name: "Delhi University" },
    { name: "Mumbai University" },
    { name: "Bangalore University" },
    { name: "Indian Institutes of Technology" },
    { name: "Savitribai Phule Pune University" },
    { name: "Anna University" },
  ];

  const Skills = [
    { name: "C++" },
    { name: "Python" },
    { name: "Java" },
    { name: "JavaScript" },
    { name: "React" },
    { name: "Angular" },
    { name: "web desing" },
    { name: "web development" },
    { name: "full stack development" },
    { name: "data science" },
    { name: "machine learning" },
    { name: "artificial intelligence" },
  ];

  const handleCollegeSuggestionClick = (name, includes) => {
    if (includes) {
      setTempCollegeFilterList((prv) =>
        prv.filter((college) => college !== name)
      );
    } else {
      setTempCollegeFilterList((prv) => [...prv, name]);
    }
  };

  const handleSkillSuggestionClick = (name, includes) => {
    if (includes) {
      setTempSkillsFilterList((prv) => prv.filter((skill) => skill !== name));
    } else {
      setTempSkillsFilterList((prv) => [...prv, name]);
    }
  };

  // i want to apply filter when apply filter is pressed, that's why i am using this function
  // here i maintain the temp list of college and skills and then apply the filter
  const handleApplyFilterClick = () => {
    dispatch(setCollegeFilterList(tempCollegeFilterList));
    dispatch(setSkillsFilterList(tempSkillsFilterList));
    dispatch(setModalInfo(""));
  };
  return (
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
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              position: "sticky",
              top: "0%",
            }}
          >
            <Box
              onClick={handleCloseClick}
              sx={{
                cursor: "pointer",
                width: "30px",
                height: "30px",
                zIndex: 99,
              }}
              component="img"
              src={roundedCloseIcon}
            />
            <Typography variant="h6" sx={{ color: "#888" }}>
              Filters
            </Typography>
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
                // onChange={(event) =>
                //   dispatch(
                //     setCompleteActionModalFields({
                //       field: "title",
                //       value: event.target.value,
                //     })
                //   )
                // }
                // value={title}
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
              {collegeSuggestion.map((college, index) => {
                return (
                  <Box key={index}>
                    <SuggestionCard
                      handleOnClick={() =>
                        handleCollegeSuggestionClick(
                          college.name,
                          tempCollegeFilterList?.includes(college.name)
                        )
                      }
                      name={college.name}
                      checked={tempCollegeFilterList?.includes(college.name)}
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
                // onChange={(event) =>
                //   dispatch(
                //     setCompleteActionModalFields({
                //       field: "title",
                //       value: event.target.value,
                //     })
                //   )
                // }
                // value={title}
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
              {Skills.map((skill, index) => {
                return (
                  <Box key={index}>
                    <SuggestionCard
                      handleOnClick={() =>
                        handleSkillSuggestionClick(
                          skill.name,
                          tempSkillsFilterList?.includes(skill.name)
                        )
                      }
                      name={skill.name}
                      checked={tempSkillsFilterList?.includes(skill.name)}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box>
              <PrimaryButton handleOnClick={handleApplyFilterClick}>
                Appy Filters
              </PrimaryButton>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default OpportunitiesFilter;
