import { createSlice } from "@reduxjs/toolkit";
import { onboardingPages } from "../../utils/onboardingPages";

const initialState = {
  pageDetail: {
    number: 0,
    title: onboardingPages[0],
  },
  basicDetails: {
    profileImg: "",
    bannerImg: "",
    userName: "",
    shortBio: "",
    longBio: "",
  },
  educationDetails: {
    school: "",
    college: "",
    yearOfGraduation: "",
  },
  skillDetails: {
    skills: [],
    internshipDetails: [],
    projectDetails: [],
    porDetails: [],
  },
  socialDetails: {
    resume: "",
    linkedIn: "",
    github: "",
    instgram: "",
    portfolio: "",
  },
};

const onboardingSlice = createSlice({
  name: "onboardingSlice",
  initialState,
  reducers: {
    // used to update the state when the user changes the input fields
    setOnboardingFields: (state, action) => {
      // payload = {basicDetails.firstName: "John"}
      const { field, value } = action.payload;
      const [category, subCategory] = field.split(".");
      state[category][subCategory] = value;
    },
    // used to update the state with the data fetched from the server and also when the user changes the input fields
    setSkillDetails: (state, action) => {
      // payload for skillDetails = {skills: ["React", "Node"]}, {internshipDetails: []}
      const { field, value } = action.payload;
      state.skillDetails[field] = value;
    },
    handleBackButtonClick: (state, action) => {
      if (state.pageDetail.number === 0) return;
      state.pageDetail.title = onboardingPages[state.pageDetail.number - 1];
      state.pageDetail.number = state.pageDetail.number - 1;
    },
    handleNextButtonClick: (state, action) => {
      if (state.pageDetail.number === 4) return;
      state.pageDetail.title = onboardingPages[state.pageDetail.number + 1];
      state.pageDetail.number = state.pageDetail.number + 1;
    },
    setPageNumber: (state, action) => {
      state.pageDetail.number = action.payload;
      state.pageDetail.title = onboardingPages[action.payload];
    },

    // used to update the state with the data fetched from the server
    setBasicDetails: (state, action) => {
      console.log("basice details slice");
      state.basicDetails = action.payload;
    },
    setEducationDetails: (state, action) => {
      state.educationDetails = action.payload;
    },
    setSocialDetails: (state, action) => {
      state.socialDetails = action.payload;
    },
  },
});

export const {
  setOnboardingFields,
  setSkillDetails,
  handleBackButtonClick,
  handleNextButtonClick,
  setPageNumber,
  setBasicDetails,
  setEducationDetails,
  setSocialDetails,
} = onboardingSlice.actions;

export const onboardingSliceReducer = onboardingSlice.reducer;
