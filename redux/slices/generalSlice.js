import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "USD",
  lang: "en",
  filters: {},
  investor_types: [],
  company_reg: false,
  sectors: [],
};

export const generalSlice = createSlice({
  name: "general",
  initialState,

  reducers: {
    saveFilters: (state, action) => {
      state.filters = action.payload.filters;
    },

    saveInvestorTypes: (state, action) => {
      state.investor_types = action.payload;
    },

    saveCountries: (state, action) => {
      state.countries = action.payload.countries;
    },

    _setCompanyReg: (state, action) => {
      state.company_reg = action.payload.company_reg;
    },

    saveSectors: (state, action) => {
      state.sectors = action.payload.sectors;
    },
  },
});

export const { saveCountries, saveFilters, saveInvestorTypes, _setCompanyReg, saveSectors } =
  generalSlice.actions;
export default generalSlice.reducer;
