import { createSlice } from "@reduxjs/toolkit";
import { signout } from "../../utils/api";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserAuthentication: (state, action) => {
      state.isAuthenticated = true;
      if (action.payload) {
        localStorage.setItem(
          "skillShodhUserData",
          JSON.stringify({
            isAuthenticated: true,
            user: action.payload,
          })
        );
        state.user = action.payload; // Contains user details
      }
    },
    logoutUser: (state) => {
      // call the supabase logout function
      signout();
      localStorage.removeItem("skillShodhUserData");
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUserAuthentication, logoutUser, updateUser } =
  authSlice.actions;

export const authSliceReducer = authSlice.reducer;
