import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { removeListValue, setListValue } from "../../store";

const ChipCard = ({ label, isSelected, handleOnDelete, handleOnClick }) => {
  if (isSelected) {
    return (
      <Chip
        sx={{
          backgroundColor: "#233D38",
          color: "#57FFE1",
          padding: "8px 16px",
        }}
        label={label}
        onDelete={() => handleOnDelete(label)}
        deleteIcon={
          <CloseIcon
            sx={{
              width: "16px",
              height: "16px",
              color: "#ffffff !important",
              margin: 0,
            }}
          />
        }
      />
    );
  }
  return (
    <Chip
      onClick={() => handleOnClick(label)}
      sx={{
        backgroundColor: "#26262F",
        color: "#888",
        padding: "8px 16px",
        cursor: "pointer",
      }}
      label={label}
    />
  );
};

const TopSkillsHeader = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { skillsFilterList } = useSelector((state) => state.headerSlice);
  const [loacalSkillsFilterList, setLocalSkillsFilterList] = useState([]);
  useEffect(() => {
    setLocalSkillsFilterList(skillsFilterList);
  }, [skillsFilterList]);

  let topSkills = [
    "React",
    "Node",
    "Express",
    "MongoDB",
    "Python",
    "JavaScript",
    "web design",
    "web development",
    "UI/UX",
    "product desing",
    "graphic design",
  ];
  const handleSelectedSkillDelete = (name) => {
    dispatch(removeListValue({ field: "skillsFilterList", value: name }));
  };
  const handleSuggestedSkillClick = (name) => {
    dispatch(setListValue({ field: "skillsFilterList", value: name }));
  };
  // filter according to skillFilterList, if some top skill are present in skillsFilterList then they should appear at first
  topSkills = topSkills.sort((a, b) => {
    if (
      loacalSkillsFilterList.includes(a) &&
      !loacalSkillsFilterList.includes(b)
    ) {
      return -1;
    }
    if (
      !loacalSkillsFilterList.includes(a) &&
      loacalSkillsFilterList.includes(b)
    ) {
      return 1;
    }
    return 0;
  });
  return (
    <Box
      sx={{
        width: "100%",
        padding: smallScreen ? "10px 0px 10px 20px" : "16px 0px 16px 50px",
        borderBottom: "1px solid rgba(139, 139, 139, 0.20)",
        position: "sticky",
        top: "0%",
        backgroundColor: "#18181D",
        zIndex: 99,
      }}
    >
      <Box sx={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Box sx={{ minWidth: "75px" }}>
          <Typography variant="h6">Top Skills</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            overflowX: "scroll",
            gap: "20px",
            scrollbarWidth: "none",
          }}
        >
          {topSkills.map((item, index) => {
            return (
              <ChipCard
                isSelected={loacalSkillsFilterList.includes(item)}
                handleOnDelete={handleSelectedSkillDelete}
                handleOnClick={handleSuggestedSkillClick}
                key={index}
                label={item}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default TopSkillsHeader;
