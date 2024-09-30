import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamsModalInfo: "",
  joinOrCreateTeamData: null,
  teamInfoData: null,
  teamClickedData: { open: false, data: null },
  teamList: [],
};

const teamsSlice = createSlice({
  name: "teamsSlice",
  initialState,
  reducers: {
    setTeamsModalInfo: (state, action) => {
      state.teamsModalInfo = action.payload;
    },
    setJoinTeamData: (state, action) => {
      state.joinOrCreateTeamData = action.payload;
    },
    setTeamInfodata: (state, action) => {
      state.teamInfoData = action.payload;
    },

    setTeamClickedData: (state, action) => {
      state.teamClickedData = action.payload;
    },
    setTeamListData: (state, action) => {
      state.teamList = action.payload;
    },
    updateTeamsList: (state, action) => {
      if (action.payload.status === "add") {
        state.teamList = [action.payload.data, ...state.teamList];
      } else if (action.payload.status === "remove") {
        state.teamList = state.teamList.filter(
          (team) => team._id !== action.payload.data
        );
      } else if (action.payload.status === "update") {
        const index = state.teamList.findIndex(
          (team) => team._id === action.payload.id
        );
        state.teamList[index] = action.payload.data;
      }else if (action.payload.status === "updatemsg") {
        state.teamList.forEach(
          (team, index) => {
            if(team.code === action.payload.teamcode){
              state.teamList[index].msg_txt = action.payload.txt;
              state.teamList[index].msg_time = action.payload.time;
            }
          }
        );
        state.teamList.sort((a, b) => a.msg_time < b.msg_time ? 1 : -1)
      }
    },
  },
});

export const {
  setTeamsModalInfo,
  setJoinTeamData,
  setTeamInfodata,
  setTeamClickedData,
  setTeamListData,
  updateTeamsList,
} = teamsSlice.actions;

export const teamsSliceReducer = teamsSlice.reducer;
