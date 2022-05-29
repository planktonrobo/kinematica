import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maxAngleVelocity: 90.0 / (180.0 * Math.PI) / 1000.0,
  geo: [
    [4.8, 0, 7.3],
    [0, 0, 13.0],
    [1, 0, 2],
    [12.6, 0, 0],
    [3.6, 0, 0],
    [0, 0, 0],
  ],
};

export const robotSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeSpeed: (state, action) => {
      state.maxAngleVelocity = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSpeed } = robotSlice.actions;

export default robotSlice.reducer;
