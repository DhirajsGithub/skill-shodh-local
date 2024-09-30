import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  collegeFilterList: [],
  skillsFilterList: [],
};

const headerSlice = createSlice({
  name: "headerSlice",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCollegeFilterList: (state, action) => {
      state.collegeFilterList = action.payload;
    },
    setSkillsFilterList: (state, action) => {
      state.skillsFilterList = action.payload;
    },
    setListValue: (state, action) => {
      const { field, value } = action.payload;
      state[field] = [...state[field], value];
    },
    removeListValue: (state, action) => {
      const { field, value } = action.payload;
      state[field] = state[field].filter((item) => item !== value);
    },
  },
});

export const {
  setSearchValue,
  setCollegeFilterList,
  setSkillsFilterList,
  setListValue,
  removeListValue,
} = headerSlice.actions;

export const headerSliceReducer = headerSlice.reducer;
