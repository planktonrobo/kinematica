import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  angles: [0, 0, 1, 0, 1, 0]
};

export const robotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {
    setAngles: (state, action) => {
      state.angles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAngles } = robotSlice.actions;

export default robotSlice.reducer;
