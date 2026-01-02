import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FundingOpportunity } from "../services/fundingOpportunities";

interface FundingOpportunitiesState {
  opportunities: FundingOpportunity[];
  currentOpportunity: FundingOpportunity | null;
  loading: boolean;
  error: string | null;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
}

const initialState: FundingOpportunitiesState = {
  opportunities: [],
  currentOpportunity: null,
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
};

const fundingOpportunitiesSlice = createSlice({
  name: "fundingOpportunities",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setOpportunities: (state, action: PayloadAction<FundingOpportunity[]>) => {
      state.opportunities = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentOpportunity: (state, action: PayloadAction<FundingOpportunity | null>) => {
      state.currentOpportunity = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.creating = false;
      state.updating = false;
      state.deleting = false;
    },
    setCreating: (state, action: PayloadAction<boolean>) => {
      state.creating = action.payload;
    },
    setUpdating: (state, action: PayloadAction<boolean>) => {
      state.updating = action.payload;
    },
    setDeleting: (state, action: PayloadAction<boolean>) => {
      state.deleting = action.payload;
    },
    addOpportunity: (state, action: PayloadAction<FundingOpportunity>) => {
      state.opportunities.unshift(action.payload);
      state.creating = false;
    },
    updateOpportunity: (state, action: PayloadAction<FundingOpportunity>) => {
      const index = state.opportunities.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.opportunities[index] = action.payload;
      }
      state.updating = false;
    },
    removeOpportunity: (state, action: PayloadAction<number>) => {
      state.opportunities = state.opportunities.filter(o => o.id !== action.payload);
      state.deleting = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setOpportunities,
  setCurrentOpportunity,
  setError,
  setCreating,
  setUpdating,
  setDeleting,
  addOpportunity,
  updateOpportunity,
  removeOpportunity,
  clearError,
} = fundingOpportunitiesSlice.actions;

// Selectors
export const selectOpportunities = (state: RootState) => state.fundingOpportunities.opportunities;
export const selectCurrentOpportunity = (state: RootState) => state.fundingOpportunities.currentOpportunity;
export const selectOpportunitiesLoading = (state: RootState) => state.fundingOpportunities.loading;
export const selectOpportunitiesError = (state: RootState) => state.fundingOpportunities.error;
export const selectCreating = (state: RootState) => state.fundingOpportunities.creating;
export const selectUpdating = (state: RootState) => state.fundingOpportunities.updating;
export const selectDeleting = (state: RootState) => state.fundingOpportunities.deleting;

export default fundingOpportunitiesSlice.reducer;
