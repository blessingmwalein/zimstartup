import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getPortfolioSummary,
  getCompaniesOwned,
  getEquityInvestments,
  getProjectFinancing,
  getRevenueBasedInvestments,
  getUpcomingPayments,
  PortfolioSummaryResponse,
  CompaniesOwnedResponse,
  EquityInvestmentsResponse,
  ProjectFinancingResponse,
  RevenueBasedResponse,
  UpcomingPaymentsResponse,
} from "../services/portfolio";

interface PortfolioState {
  summary: PortfolioSummaryResponse | null;
  companiesOwned: CompaniesOwnedResponse | null;
  equityInvestments: EquityInvestmentsResponse | null;
  projectFinancing: ProjectFinancingResponse | null;
  revenueInvestments: RevenueBasedResponse | null;
  upcomingPayments: UpcomingPaymentsResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  summary: null,
  companiesOwned: null,
  equityInvestments: null,
  projectFinancing: null,
  revenueInvestments: null,
  upcomingPayments: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchPortfolioSummary = createAsyncThunk(
  "portfolio/fetchSummary",
  async (national_id: string) => {
    const response = await getPortfolioSummary(national_id);
    return response;
  }
);

export const fetchCompaniesOwned = createAsyncThunk(
  "portfolio/fetchCompaniesOwned",
  async (national_id: string) => {
    const response = await getCompaniesOwned(national_id);
    return response;
  }
);

export const fetchEquityInvestments = createAsyncThunk(
  "portfolio/fetchEquityInvestments",
  async (national_id: string) => {
    const response = await getEquityInvestments(national_id);
    return response;
  }
);

export const fetchProjectFinancing = createAsyncThunk(
  "portfolio/fetchProjectFinancing",
  async (national_id: string) => {
    const response = await getProjectFinancing(national_id);
    return response;
  }
);

export const fetchRevenueInvestments = createAsyncThunk(
  "portfolio/fetchRevenueInvestments",
  async (national_id: string) => {
    const response = await getRevenueBasedInvestments(national_id);
    return response;
  }
);

export const fetchUpcomingPayments = createAsyncThunk(
  "portfolio/fetchUpcomingPayments",
  async (national_id: string) => {
    const response = await getUpcomingPayments(national_id);
    return response;
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    clearPortfolio: (state) => {
      state.summary = null;
      state.companiesOwned = null;
      state.equityInvestments = null;
      state.projectFinancing = null;
      state.revenueInvestments = null;
      state.upcomingPayments = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Portfolio Summary
      .addCase(fetchPortfolioSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchPortfolioSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch portfolio summary";
      })
      // Companies Owned
      .addCase(fetchCompaniesOwned.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompaniesOwned.fulfilled, (state, action) => {
        state.loading = false;
        state.companiesOwned = action.payload;
      })
      .addCase(fetchCompaniesOwned.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch companies owned";
      })
      // Equity Investments
      .addCase(fetchEquityInvestments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEquityInvestments.fulfilled, (state, action) => {
        state.loading = false;
        state.equityInvestments = action.payload;
      })
      .addCase(fetchEquityInvestments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch equity investments";
      })
      // Project Financing
      .addCase(fetchProjectFinancing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectFinancing.fulfilled, (state, action) => {
        state.loading = false;
        state.projectFinancing = action.payload;
      })
      .addCase(fetchProjectFinancing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch project financing";
      })
      // Revenue Investments
      .addCase(fetchRevenueInvestments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenueInvestments.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueInvestments = action.payload;
      })
      .addCase(fetchRevenueInvestments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch revenue investments";
      })
      // Upcoming Payments
      .addCase(fetchUpcomingPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingPayments = action.payload;
      })
      .addCase(fetchUpcomingPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch upcoming payments";
      });
  },
});

export const { clearPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
