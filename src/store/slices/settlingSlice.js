import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changePasswordInfo: { open: false, data: null },
  snackBarInfo: { open: false, message: "", type: "" },
  deleteModlInfo: { open: false, data: null },
};

const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {
    setChangePasswordInfo: (state, action) => {
      state.changePasswordInfo = action.payload;
    },
    setSettingSnackBarInfo: (state, action) => {
      state.snackBarInfo = action.payload;
    },
    setSettingDeleteModalInfo: (state, action) => {
      state.deleteModlInfo = action.payload;
    },
  },
});

export const {
  setChangePasswordInfo,
  setSettingSnackBarInfo,
  setSettingDeleteModalInfo,
} = settingSlice.actions;
export const settingSliceReducer = settingSlice.reducer;
