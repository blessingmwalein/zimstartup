import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  user: null,
  companies: [],
};

export const userSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    
    saveUser: (state, action) => {
      state.auth = true;
      state.user = action.payload;
    },

    saveUserCompanies: (state, action) => {
      state.companies = action.payload;
    },

    resetAuth: (state, action) => {
      state.auth = false;
      state.user = null;
    },
  },
});

export const { saveUser, saveUserCompanies, resetAuth } = userSlice.actions;
export default userSlice.reducer;
