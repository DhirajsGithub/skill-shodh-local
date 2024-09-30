import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  setUserAuthentication,
  logoutUser,
  authSliceReducer,
  updateUser,
} from "./slices/authSlice";
import { loginSliceReducer, setLoginField } from "./slices/loginSlice";
import { signUpSliceReducer, setSignUpField } from "./slices/signUpSlice";
import {
  setOnboardingFields,
  onboardingSliceReducer,
  setSkillDetails,
  handleBackButtonClick,
  handleNextButtonClick,
  setPageNumber,
  setBasicDetails,
  setEducationDetails,
  setSocialDetails,
} from "./slices/onboardingSlice";
import {
  toggleCollapse,
  toggleSidebar,
  navbarSliceReducer,
} from "./slices/navbarSlice";

import {
  setSearchValue,
  setCollegeFilterList,
  setSkillsFilterList,
  headerSliceReducer,
  setListValue,
  removeListValue,
} from "./slices/HeaderSlice";

import {
  setIsUserDateFetching,
  generalSliceReducer,
  setModalInfo,
  setModalData,
  setChatWith,
  setSnackBarInfo,
} from "./slices/generalSlice";

import {
  teamsSliceReducer,
  setTeamsModalInfo,
  setJoinTeamData,
  setTeamInfodata,
  setTeamClickedData,
  setTeamListData,
  updateTeamsList,
} from "./slices/teamsSlice";

import {
  opportunitySliceReducer,
  setOpportunityModalInfo,
  setOpportunityModalData,
  setNewOpportunitiesFilter,
} from "./slices/opportunitySlice";

import {
  settingSliceReducer,
  setChangePasswordInfo,
  setSettingSnackBarInfo,
  setSettingDeleteModalInfo,
} from "./slices/settlingSlice";

const store = configureStore({
  reducer: {
    authSlice: authSliceReducer,
    navbarSlice: navbarSliceReducer,
    loginSlice: loginSliceReducer,
    signUpSlice: signUpSliceReducer,
    onboardingSlice: onboardingSliceReducer,
    headerSlice: headerSliceReducer,
    generalSlice: generalSliceReducer,
    teamsSlice: teamsSliceReducer,
    opportunitySlice: opportunitySliceReducer,
    settingSlice: settingSliceReducer,
  },
});

setupListeners(store.dispatch);

export {
  store,
  setUserAuthentication,
  logoutUser,
  updateUser,
  toggleCollapse,
  toggleSidebar,
  setLoginField,
  setSignUpField,
  setOnboardingFields,
  setSkillDetails,
  handleBackButtonClick,
  handleNextButtonClick,
  setPageNumber,
  setBasicDetails,
  setEducationDetails,
  setSocialDetails,
  setIsUserDateFetching,
  setSearchValue,
  setCollegeFilterList,
  setSkillsFilterList,
  setListValue,
  removeListValue,
  setModalInfo,
  setModalData,
  setChatWith,
  setSnackBarInfo,
  setTeamsModalInfo,
  setJoinTeamData,
  setOpportunityModalInfo,
  setOpportunityModalData,
  setNewOpportunitiesFilter,
  setTeamInfodata,
  setChangePasswordInfo,
  setSettingSnackBarInfo,
  setSettingDeleteModalInfo,
  setTeamClickedData,
  setTeamListData,
  updateTeamsList,
};
