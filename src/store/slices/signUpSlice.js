import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  loginWithGoogle: false,
  loginWithGituhub: false,
};

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {
    setSignUpField: (state, actions) => {
      state[actions.payload.field] = actions.payload.value;
    },
  },
});

export const { setSignUpField } = signUpSlice.actions;

export const signUpSliceReducer = signUpSlice.reducer;
