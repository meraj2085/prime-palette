import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = configSlice.actions;

export default configSlice.reducer;
