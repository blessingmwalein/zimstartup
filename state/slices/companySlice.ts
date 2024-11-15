import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkCompanyExists,
  createCompany,
  createCompanyContactDetails,
  createNewStockMarketDetails,
  createPreviousFunds,
  createNewCompanyUpdate,
  getCompanyUpdates,
  createNewShareholder,
  createNewQualification,
  createEmployeeHistory,
  registerCompanyRequest,
  createNewDirectorDetails,
  createNewDirectorPosition,
  createEducationalQualifications,
  createNewEmploymentHistory,
  createNewPublicInformation,
  createNewAward,
  createNewDirectorProfileCombined,
  showCompaniesList,
  showCompaniesListBySector,
  getAllCompanyDataCombined,
  getAllCompanyDataCombinedByLocation,
  companyWithMultipleSearchesOr,
} from "../services/company";
import {
  CheckCompanyNameResponse,
  CompanyListResponse,
  CompanyListBySectorResponse,
} from "../models/company";

interface CompanyState {
  companyList: CompanyListResponse | null;
  companyBySectorList: CompanyListBySectorResponse | null;
  companyUpdates: any[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: CompanyState = {
  companyList: null,
  companyBySectorList: null,
  companyUpdates: [],
  status: "idle",
  error: null,
};

// Async thunk to check if company exists
export const checkIfCompanyExists = createAsyncThunk(
  "company/checkIfCompanyExists",
  async (companyName: string, { rejectWithValue }) => {
    try {
      return await checkCompanyExists(companyName);
    } catch (error: any) {
      // console.error(error);
      if (error.response.status === 400) {
        return rejectWithValue(error?.response?.data?.detail);
      } else {
        return rejectWithValue("Failed to check if company exists");
      }
    }
  },
);

// Async thunk to create a new company
export const createNewCompany = createAsyncThunk(
  "company/createNewCompany",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createCompany(data);
    } catch (error: any) {
      if (error.response.status === 400) {
        return rejectWithValue(error?.response?.data?.detail);
      } else {
        return rejectWithValue("Failed to create company");
      }
    }
  },
);

//aync createCompanyContactDetails
export const createCompanyContact = createAsyncThunk(
  "company/createCompanyContact",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createCompanyContactDetails(data);
    } catch (error: any) {
      if (error.response.status === 400) {
        return rejectWithValue(error?.response?.data?.detail);
      } else {
        return rejectWithValue("Failed to create company contact");
      }
    }
  },
);

//createNewStockMarketDetails
export const createStockMarketDetails = createAsyncThunk(
  "company/createStockMarketDetails",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createNewStockMarketDetails(data);
    } catch (error: any) {
      if (error.response.status === 400) {
        return rejectWithValue(error?.response?.data?.detail);
      } else {
        return rejectWithValue("Failed to create stock market details");
      }
    }
  },
);

//createPreviousFunds
export const createCompanyPreviousFunds = createAsyncThunk(
  "company/createPreviousFunds",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createPreviousFunds(data);
    } catch (error: any) {
      if (error.response.status === 400) {
        return rejectWithValue(error?.response?.data?.detail);
      } else {
        return rejectWithValue("Failed to create previous funds");
      }
    }
  },
);

// Async thunk to get company updates by ID
export const fetchCompanyUpdates = createAsyncThunk(
  "company/fetchCompanyUpdates",
  async (companyId: any, { rejectWithValue }) => {
    try {
      return await getCompanyUpdates(companyId);
    } catch (error: any) {
      console.error("Failed to fetch company updates:", error.message);
      return rejectWithValue("Failed to fetch company updates");
    }
  },
);

// Async thunk to show list of companies
export const fetchCompaniesList = createAsyncThunk(
  "company/fetchCompaniesList",
  async (_, { rejectWithValue }) => {
    try {
      return await showCompaniesList();
    } catch (error: any) {
      console.error("Failed to fetch company list:", error.message);
      return rejectWithValue("Failed to fetch company list");
    }
  },
);

// Async thunk to fetch companies by sector
export const fetchCompaniesBySector = createAsyncThunk(
  "company/fetchCompaniesBySector",
  async (sector: string, { rejectWithValue }) => {
    try {
      return await showCompaniesListBySector(sector);
    } catch (error: any) {
      console.error("Failed to fetch companies by sector:", error.message);
      return rejectWithValue("Failed to fetch companies by sector");
    }
  },
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle checkIfCompanyExists action
      .addCase(checkIfCompanyExists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkIfCompanyExists.fulfilled, (state, action) => {
        state.status = "idle";
        // You may handle the response here if needed
      })
      .addCase(checkIfCompanyExists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })

      // Handle createNewCompany action
      .addCase(createNewCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewCompany.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createNewCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(createCompanyContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCompanyContact.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createCompanyContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(createStockMarketDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStockMarketDetails.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createStockMarketDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string
      })
      .addCase(createCompanyPreviousFunds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCompanyPreviousFunds.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createCompanyPreviousFunds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      // Handle fetchCompanyUpdates action
      .addCase(fetchCompanyUpdates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyUpdates.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyUpdates = action.payload;
      })
      .addCase(fetchCompanyUpdates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })

      // Handle fetchCompaniesList action
      .addCase(fetchCompaniesList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompaniesList.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyList = action.payload;
      })
      .addCase(fetchCompaniesList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })

      // Handle fetchCompaniesBySector action
      .addCase(fetchCompaniesBySector.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompaniesBySector.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyBySectorList = action.payload;
      })
      .addCase(fetchCompaniesBySector.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default companySlice.reducer;
