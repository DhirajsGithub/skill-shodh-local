import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opportunityModalInfo: "",
  opportunityModalData: null,
  newOpportunitiesFilter: {
    skills: [],
    time: [],
    ispaid: false,
    iscompanyonly: false,
  },
};

const opportunitySlice = createSlice({
  name: "opportunitySlice",
  initialState,
  reducers: {
    setOpportunityModalInfo: (state, action) => {
      state.opportunityModalInfo = action.payload;
    },
    setOpportunityModalData: (state, action) => {
      state.opportunityModalData = action.payload;
    },
    setNewOpportunitiesFilter: (state, action) => {
      state.newOpportunitiesFilter = action.payload;
    },
  },
});

export const {
  setOpportunityModalInfo,
  setOpportunityModalData,
  setNewOpportunitiesFilter,
} = opportunitySlice.actions;

export const opportunitySliceReducer = opportunitySlice.reducer;
