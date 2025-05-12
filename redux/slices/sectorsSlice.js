import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectors: [],
};

export const sectorsSlice = createSlice({
  name: "sectors",
  initialState,

  reducers: {
    saveSectors: (state, action) => {
      state.sectors = action.payload.sectors;
    },
  },
});

export const { saveSectors } = sectorsSlice.actions;
export default sectorsSlice.reducer;
