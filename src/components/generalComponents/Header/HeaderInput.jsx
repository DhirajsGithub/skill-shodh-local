import { Box, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setModalInfo, setSearchValue } from "../../../store";
import { useNavigate } from "react-router-dom";

const HeaderInput = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");
  const { searchValue, collegeFilterList, skillsFilterList } = useSelector(
    (state) => state.headerSlice
  );
  const dispatch = useDispatch();
  const handleFilterClick = () => {
    dispatch(setModalInfo("filterModal"));
  };
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/search");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        onChange={(event) => dispatch(setSearchValue(event.target.value))}
        value={searchValue}
        autoComplete="off"
        placeholder="Search"
        inputProps={{
          style: {
            color: "#8B8B8B",
            fontSize: "16px",
            fontWeight: 400,
            padding: 0,
          },
        }}
        InputProps={{
          onClick: handleOnClick,
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
          endAdornment: (
            <InputAdornment position="end">
              <FilterAltOutlinedIcon
                onClick={handleFilterClick}
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
          backgroundColor: "#26262F",
          borderRadius: "62px",
          padding: smallScreen ? "10px 15px" : "10px 32px",
          "& .css-vkq66k-MuiInputBase-root-MuiOutlinedInput-root": {
            paddingLeft: "0px",
          },
          width: "100%",
          "& .css-l1mz6g-MuiInputBase-root-MuiOutlinedInput-root": {
            padding: "0px",
          },
        }}
      />
    </Box>
  );
};

export default HeaderInput;
