import {
  BusinessState,
  CompanyIndustry,
  MarketType,
  StockExchangeEntity,
  StockMarket,
} from "../models/config";
import {
  getIndustries,
  getBusinessStates,
  getStockExchangeEntities,
  getStockMarkets,
  getMarketTypes,
} from "../services/company_config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CompanyConfigState {
  industryList: CompanyIndustry[];
  businessStatesList: BusinessState[];
  stockExchangeList: StockExchangeEntity[];
  stockMarketsList: StockMarket[];
  marketTypesList: MarketType[];

  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CompanyConfigState = {
  industryList: [],
  businessStatesList: [],
  stockExchangeList: [],
  stockMarketsList: [],
  marketTypesList: [],
  status: "idle",
  error: null,
};

// Thunk for fetching industries
export const fetchIndustryList = createAsyncThunk(
  "companyConfig/fetchIndustryList",
  async (_, { rejectWithValue }) => {
    try {
      const industries = await getIndustries();
      return industries;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch industry list");
    }
  },
);

// Thunk for fetching business states
export const fetchBusinessStates = createAsyncThunk(
  "companyConfig/fetchBusinessStates",
  async (_, { rejectWithValue }) => {
    try {
      const businessStates = await getBusinessStates();
      return businessStates;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch business states");
    }
  },
);

// Thunk for fetching stock exchange entities
export const fetchStockExchangeEntities = createAsyncThunk(
  "companyConfig/fetchStockExchangeEntities",
  async (_, { rejectWithValue }) => {
    try {
      const stockExchangeEntities = await getStockExchangeEntities();
      return stockExchangeEntities;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch stock exchange entities");
    }
  },
);

// Thunk for fetching stock markets
export const fetchStockMarkets = createAsyncThunk(
  "companyConfig/fetchStockMarkets",
  async (_, { rejectWithValue }) => {
    try {
      const stockMarkets = await getStockMarkets();
      return stockMarkets;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch stock markets");
    }
  },
);

// Thunk for fetching market types
export const fetchMarketTypes = createAsyncThunk(
  "companyConfig/fetchMarketTypes",
  async (_, { rejectWithValue }) => {
    try {
      const marketTypesList = await getMarketTypes();
      return marketTypesList;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch market types");
    }
  },
);
export const fetchAllConfigs = createAsyncThunk(
  "companyConfig/fetchAllConfigs",
  async (_, { dispatch }) => {
    await Promise.all([
      dispatch(fetchIndustryList()),
      dispatch(fetchBusinessStates()),
      dispatch(fetchStockExchangeEntities()),
      dispatch(fetchStockMarkets()),
      dispatch(fetchMarketTypes()),
    ]);
  },
);

const companyConfigSlice = createSlice({
  name: "companyConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllConfigs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllConfigs.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchAllConfigs.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Failed to fetch configuration data";
      })
      // Handle fetchIndustryList
      .addCase(fetchIndustryList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIndustryList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.industryList = action.payload.data;
      })
      .addCase(fetchIndustryList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle fetchBusinessStates
      .addCase(fetchBusinessStates.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBusinessStates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.businessStatesList = action.payload.data;
      })
      .addCase(fetchBusinessStates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle fetchStockExchangeEntities
      .addCase(fetchStockExchangeEntities.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStockExchangeEntities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stockExchangeList = action.payload.data;
      })
      .addCase(fetchStockExchangeEntities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle fetchStockMarkets
      .addCase(fetchStockMarkets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStockMarkets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stockMarketsList = action.payload.data;
      })
      .addCase(fetchStockMarkets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle fetchMarketTypes
      .addCase(fetchMarketTypes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMarketTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.marketTypesList = action.payload.data; // Assuming market types also map here
      })
      .addCase(fetchMarketTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default companyConfigSlice.reducer;
