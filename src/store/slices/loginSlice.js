import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  loginWithGoogle: {},
  loginWithGituhub: {},
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setLoginField: (state, actions) => {
      state[actions.payload.field] = actions.payload.value;
    },
  },
});

export const { setLoginField } = loginSlice.actions;

export const loginSliceReducer = loginSlice.reducer;
