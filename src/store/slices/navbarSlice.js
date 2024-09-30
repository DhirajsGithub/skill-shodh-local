import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  toggled: false,
};

const navbarSlice = createSlice({
  name: "navbarSlice",
  initialState,
  reducers: {
    toggleCollapse: (state, actions) => {
      if (actions.payload === false) {
        state.collapsed = actions.payload;
      } else {
        state.collapsed = !state.collapsed;
      }
    },
    toggleSidebar: (state, actions) => {
      if (actions.payload === true || actions.payload === false) {
        state.toggled = actions.payload;
      } else {
        state.toggled = !state.toggled;
      }
    },
  },
});

export const { toggleCollapse, toggleSidebar } = navbarSlice.actions;

export const navbarSliceReducer = navbarSlice.reducer;
