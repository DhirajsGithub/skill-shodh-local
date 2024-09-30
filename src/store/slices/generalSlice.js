import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalInfo: "",
  isUserDateFetching: false,
  modalData: { title: "", message: "" },

  // for sidebar chating
  chatWithData: { chatOpen: false, person: {} },
  snackBarInfoData: {
    showSnackBar: false,
    snackBarInfo: { type: "", msg: "" },
  },
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setModalInfo: (state, action) => {
      state.modalInfo = action.payload;
    },
    setIsUserDateFetching: (state, action) => {
      state.isUserDateFetching = action.payload;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
    setChatWith: (state, action) => {
      state.chatWithData = action.payload;
    },
    setSnackBarInfo: (state, action) => {
      state.snackBarInfoData = action.payload;
    },
  },
});

export const {
  setIsUserDateFetching,
  setModalInfo,
  setModalData,
  setChatWith,
  setSnackBarInfo,
} = generalSlice.actions;

export const generalSliceReducer = generalSlice.reducer;
