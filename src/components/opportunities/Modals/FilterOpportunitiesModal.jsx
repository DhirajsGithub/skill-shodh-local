import React, { useState, useEffect, useCallback } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  InputAdornment,
  TextField,
  Checkbox,
  useMediaQuery,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import roundedCloseIcon from "../../../assets/roundedClose.svg";

import SuggestionCard from "../../generalComponents/SuggestionCard";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { setModalInfo, setNewOpportunitiesFilter } from "../../../store";
import { ModalStyle } from "../../../styles/styles";
import debounceFunc from "../../../Helpers/debounce";
import { getfilterskills } from "../../../utils/searchapi";
import checkCircle from "../../../assets/checkCircle.svg";
import unCheckCircle from "../../../assets/unCheckCircle.svg";

export default function FilterOpportunitiesModal({
  fetchOportunitiesBasedOnFilter,
}) {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const mediumScreen = useMediaQuery("(max-width:1024px)");
  const dispatch = useDispatch();
  const { modalInfo } = useSelector((state) => state.generalSlice);
  const { newOpportunitiesFilter } = useSelector(
    (state) => state.opportunitySlice
  );

  const [searchSkill, setSearchSkill] = useState("");
  const [Skills, setSkills] = useState([]);
  const [fetchingSkills, setFetchingSkills] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [filterWithTimeFilter, setFilterWithTimeFilter] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [isCompanyOnly, setIsCompanyOnly] = useState(false);

  const handleCardClick = (type) => {
    if (type === "Paid") {
      setIsPaid((prev) => !prev);
    } else if (type === "Company Only") {
      setIsCompanyOnly((prev) => !prev);
    }
  };
  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
      fontSize: 16,
    },
  }));
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
    dispatch(setModalInfo(""));
  };

  const fetchSkills = async (skillText, selectedSkills) => {
    try {
      setFetchingSkills(true);

      let res = await getfilterskills(skillText, selectedSkills);
      console.log(res);
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

  useEffect(() => {
    dispatch(
      setNewOpportunitiesFilter({
        skills: selectedSkills,
        time: filterWithTimeFilter,
        ispaid: isPaid,
        iscompanyonly: isCompanyOnly, // Update this line
      })
    );
    console.log(newOpportunitiesFilter);
  }, [selectedSkills, filterWithTimeFilter, isPaid, isCompanyOnly]);
  const optimizedSkillSearch = useCallback(debounceFunc(fetchSkills, 500), []);
  const handleSelectSkillChange = (text) => {
    optimizedSkillSearch(text, selectedSkills);
    setSearchSkill(text);
  };

  const handleApplyFilterClick = () => {
    fetchOportunitiesBasedOnFilter();
    dispatch(setModalInfo(""));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalInfo === "filterOpportunitiesModal"}
        onClose={handleCloseClick}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalInfo === "filterOpportunitiesModal"}>
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
                        checked={selectedSkills.includes(skill)}
                        handleOnClick={() => {
                          setSelectedSkills((prv) => [...prv, skill]);
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
            {/* add new feild type  */}

            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Typography variant="h5">Type</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 10px",
                      borderRadius: "32px",
                      border: "1px solid rgba(136, 136, 136, 0.20)",
                      color: "#fff",
                      minWidth: "120px",
                    }}
                    onClick={() => handleCardClick("Paid")}
                  >
                    <Box
                      component="img"
                      src={isPaid ? checkCircle : unCheckCircle}
                      sx={{ width: "16px", height: "16px" }}
                    />
                    <Typography sx={{ color: "#fff" }} variant="body1">
                      Paid
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 10px",
                      borderRadius: "32px",
                      border: "1px solid rgba(136, 136, 136, 0.20)",
                      color: "#fff",
                      minWidth: "120px",
                    }}
                    onClick={() => handleCardClick("Company Only")}
                  >
                    <Box
                      component="img"
                      src={isCompanyOnly ? checkCircle : unCheckCircle}
                      sx={{ width: "16px", height: "16px" }}
                    />
                    <Typography sx={{ color: "#fff" }} variant="body1">
                      Company Only
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Typography variant="h5">Filter with time</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <SuggestionCard
                    // fix={true}
                    name="Show today"
                    checked={filterWithTimeFilter.includes("Show today")}
                    handleOnClick={() => {
                      if (filterWithTimeFilter.includes("Show today")) {
                        setFilterWithTimeFilter((prv) =>
                          prv.filter((s) => s !== "Show today")
                        );
                      } else {
                        setFilterWithTimeFilter((prv) => [
                          ...prv,
                          "Show today",
                        ]);
                      }
                    }}
                  />
                </Box>
                <Box>
                  <SuggestionCard
                    // fix={true}
                    name="Show less then a week"
                    checked={filterWithTimeFilter.includes(
                      "Show less then a week"
                    )}
                    handleOnClick={() => {
                      if (
                        filterWithTimeFilter.includes("Show less then a week")
                      ) {
                        setFilterWithTimeFilter((prv) =>
                          prv.filter((s) => s !== "Show less then a week")
                        );
                      } else {
                        setFilterWithTimeFilter((prv) => [
                          ...prv,
                          "Show less then a week",
                        ]);
                      }
                    }}
                  />
                </Box>
              </Box>
            </Box> */}
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
            >
              <Button
                onClick={() => {
                  setSelectedSkills([]);
                  setIsPaid(false); // Reset isPaid to false
                  setIsCompanyOnly(false); // Reset isCompanyOnly to false
                  dispatch(
                    setNewOpportunitiesFilter({
                      skills: [],
                      time: [],
                      ispaid: false, // Reset to false
                      iscomonly: false, // Reset to false
                    })
                  );
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
