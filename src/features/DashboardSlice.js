import { createSlice } from "@reduxjs/toolkit";

const DashboardSlice = createSlice({
  name: "user",
  initialState: {
    mobileView: true,
  },

  reducers: {
    toggleState: (state, action) => {
      state.mobileView = !state.mobileView; // Toggle mobileView
    },
  },
});

export const { toggleState } = DashboardSlice.actions;

export default DashboardSlice.reducer;
