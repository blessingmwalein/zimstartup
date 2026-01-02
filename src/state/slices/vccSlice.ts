import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { VCCData, VCCCompetition } from "../services/vcc";

interface VCCState {
  vccList: VCCData[];
  currentVCC: VCCData | null;
  competitions: VCCCompetition[];
  loading: boolean;
  error: string | null;
  creatingVCC: boolean;
  uploadingLogo: boolean;
  creatingCompetition: boolean;
}

const initialState: VCCState = {
  vccList: [],
  currentVCC: null,
  competitions: [],
  loading: false,
  error: null,
  creatingVCC: false,
  uploadingLogo: false,
  creatingCompetition: false,
};

const vccSlice = createSlice({
  name: "vcc",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setVCCList: (state, action: PayloadAction<VCCData[]>) => {
      state.vccList = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentVCC: (state, action: PayloadAction<VCCData | null>) => {
      state.currentVCC = action.payload;
    },
    setCompetitions: (state, action: PayloadAction<VCCCompetition[]>) => {
      state.competitions = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.creatingVCC = false;
      state.uploadingLogo = false;
      state.creatingCompetition = false;
    },
    setCreatingVCC: (state, action: PayloadAction<boolean>) => {
      state.creatingVCC = action.payload;
    },
    setUploadingLogo: (state, action: PayloadAction<boolean>) => {
      state.uploadingLogo = action.payload;
    },
    setCreatingCompetition: (state, action: PayloadAction<boolean>) => {
      state.creatingCompetition = action.payload;
    },
    addVCC: (state, action: PayloadAction<VCCData>) => {
      state.vccList.unshift(action.payload);
      state.creatingVCC = false;
    },
    addCompetition: (state, action: PayloadAction<VCCCompetition>) => {
      state.competitions.unshift(action.payload);
      state.creatingCompetition = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setVCCList,
  setCurrentVCC,
  setCompetitions,
  setError,
  setCreatingVCC,
  setUploadingLogo,
  setCreatingCompetition,
  addVCC,
  addCompetition,
  clearError,
} = vccSlice.actions;

// Selectors
export const selectVCCList = (state: RootState) => state.vcc.vccList;
export const selectCurrentVCC = (state: RootState) => state.vcc.currentVCC;
export const selectCompetitions = (state: RootState) => state.vcc.competitions;
export const selectVCCLoading = (state: RootState) => state.vcc.loading;
export const selectVCCError = (state: RootState) => state.vcc.error;
export const selectCreatingVCC = (state: RootState) => state.vcc.creatingVCC;
export const selectUploadingLogo = (state: RootState) => state.vcc.uploadingLogo;
export const selectCreatingCompetition = (state: RootState) => state.vcc.creatingCompetition;

export default vccSlice.reducer;
