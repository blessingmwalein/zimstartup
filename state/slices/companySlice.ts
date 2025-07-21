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
  getCompanyDataCombined,
  addCombinedCompanyShareholder,
  addDirectorDetails,
  uploadCompanyDocument,
  getCompanyDocuments,
  getUserCompanies,
  updateCompanyDetails,
  updateCompanyContactDetails,
  uploadCompanyLogo,
  registerCompanyRequestDetails,
  getWatchList,
  searchCompanies,
  addInvestorQuestion,
  createAcquisitionRequest,
  createEquityFinancingRequest,
  createProjectFinancingRequest,
  createRevenueBasedFinancingRequest,
} from "../services/company";
import {
  CheckCompanyNameResponse,
  CompanyListResponse,
  CompanyListBySectorResponse,
  CreateCompanyRequest,
  CreateCompanyStockMarketRequest,
  CompanyCombinedResponse,
  AddCombinedShareholderRequest,
  AddDirectorDetailsRequest,
  AddDirectorPositionRequest,
  AddEducationalQualificationsRequest,
  AddEmploymentHistoryRequest,
  AddPublicInformationRequest,
  AddAwardRequest,
  UploadCompanyLogoRequest,
  UserCompaniesResponse,
  CreateCompanyContactRequest,
  AddCompanyRequestDetailRequest,
  AddCompanyRequestRequest,
  InvestorQuestionRequest,
} from "../models/company";
import { CompanyDocument } from "../models/documents";
import { addCompanyToWatchList } from "../services/company";
import {
  AddWatchListRequest,
  WatchlistDetail,
  WatchListDetail,
} from "../models/watchlist";
import { updateContactInformation } from "../services/auth";

interface CompanyState {
  companyList: CompanyListResponse | null;
  combinedCompanyData: CompanyCombinedResponse | null;
  companyBySectorList: CompanyListBySectorResponse | null;
  companyUpdates: any[];
  companyDocuments: CompanyDocument[];
  userCompanies: UserCompaniesResponse[];
  watchlist_details: WatchlistDetail[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: CompanyState = {
  companyList: null,
  combinedCompanyData: null,
  companyBySectorList: null,
  watchlist_details: [],
  companyUpdates: [],
  companyDocuments: [],
  userCompanies: [],
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
  async (data: CreateCompanyRequest, { rejectWithValue }) => {
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

// Async thunk to create a update company details
export const submitUpdateCompanyDetails = createAsyncThunk(
  "company/updateCompanyDetails",
  async (
    data: { data: CreateCompanyRequest; companyId: number },
    { rejectWithValue },
  ) => {
    try {
      return await updateCompanyDetails(data.data, data.companyId);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }

        if (data?.detail) {
          return rejectWithValue(data.detail);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to update company details");
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

//update contact details
export const submitUpdateContactDetails = createAsyncThunk(
  "company/updateContactDetails",
  async (
    data: { data: CreateCompanyContactRequest; companyId: number },
    { rejectWithValue },
  ) => {
    try {
      return await updateCompanyContactDetails(data.data, data.companyId);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }

        if (data?.detail) {
          return rejectWithValue(data.detail);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to update company contact details");
    }
  },
);

//createNewStockMarketDetails
export const createStockMarketDetails = createAsyncThunk(
  "company/createStockMarketDetails",
  async (data: CreateCompanyStockMarketRequest, { rejectWithValue }) => {
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

//fetch company data combined
export const fetchCompanyDataCombined = createAsyncThunk(
  "company/fetchCompanyDataCombined",
  async (companyId: any, { rejectWithValue }) => {
    try {
      return await getCompanyDataCombined(companyId);
    } catch (error: any) {
      console.error("Failed to fetch company data combined:", error.message);
      return rejectWithValue("Failed to fetch company data combined");
    }
  },
);

//addCombinedCompanyShareholder
export const createCombinedCompanyShareholder = createAsyncThunk(
  "company/createCombinedCompanyShareholder",
  async (data: AddCombinedShareholderRequest, { rejectWithValue }) => {
    try {
      return await addCombinedCompanyShareholder(data);
    } catch (error: any) {
      console.error("Failed to add company shareholder:", error.message);
      if (error.response) {
        return rejectWithValue(error?.response?.data?.detail);
      } else {
        return rejectWithValue("Failed to add company shareholder");
      }
    }
  },
);

//create addDirectorDetails
export const createDirectorDetails = createAsyncThunk(
  "company/createDirectorDetails",
  async (data: AddDirectorDetailsRequest, { rejectWithValue }) => {
    try {
      return await addDirectorDetails(data);
    } catch (error: any) {
      console.error("Failed to add company director details:", error.message);
      if (error.response) {
        return rejectWithValue(error?.response?.data?.detail);
      } else {
        return rejectWithValue("Failed to add company director details");
      }
    }
  },
);

//createNewDirectorPosition
export const addNewDirectorPosition = createAsyncThunk(
  "company/createNewDirectorPosition",
  async (data: AddDirectorPositionRequest, { rejectWithValue }) => {
    try {
      // Attempt to create a new director position
      return await createNewDirectorPosition(data);
    } catch (error: any) {
      console.error("Failed to add company director position:", error.message);
      // Handle cases where error response exists
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to add company director position");
    }
  },
);

//createEducationalQualifications
export const addEducationalQualifications = createAsyncThunk(
  "company/createEducationalQualifications",
  async (data: AddEducationalQualificationsRequest, { rejectWithValue }) => {
    try {
      return await createEducationalQualifications(data);
    } catch (error: any) {
      console.error("Failed to add educational qualifications:", error.message);
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to add educational qualifications");
    }
  },
);

//createNewEmploymentHistory
export const addEmploymentHistory = createAsyncThunk(
  "company/createNewEmploymentHistory",
  async (data: AddEmploymentHistoryRequest, { rejectWithValue }) => {
    try {
      return await createNewEmploymentHistory(data);
    } catch (error: any) {
      console.error("Failed to add employment history:", error.message);
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to add employment history");
    }
  },
);

//createNewPublicInformation
export const addPublicInformation = createAsyncThunk(
  "company/createNewPublicInformation",
  async (data: AddPublicInformationRequest, { rejectWithValue }) => {
    try {
      return await createNewPublicInformation(data);
    } catch (error: any) {
      console.error("Failed to add public information:", error.message);
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to add public information");
    }
  },
);

//createNewAward
export const addNewAward = createAsyncThunk(
  "company/createNewAward",
  async (data: AddAwardRequest, { rejectWithValue }) => {
    try {
      return await createNewAward(data);
    } catch (error: any) {
      console.error("Failed to add award:", error.message);
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to add award");
    }
  },
);

//uploadCompanyLogo
export const submitUploadCompanyLogo = createAsyncThunk(
  "company/uploadCompanyLogo",
  async (data: any, { rejectWithValue }) => {
    try {
      return await uploadCompanyLogo(data);
    } catch (error: any) {
      console.error("Failed to upload company logo:", error.message);
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to upload company logo");
    }
  },
);

//upload company documents
export const addCompanyDocument = createAsyncThunk(
  "company/uploadCompanyDocument",
  async (data: UploadCompanyLogoRequest, { rejectWithValue }) => {
    try {
      return await uploadCompanyDocument(data);
    } catch (error: any) {
      console.error("Failed to upload company document:", error.message);
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to upload company document");
    }
  },
);

//addCompanyRequest handle errors like above
export const addCompanyRequest = createAsyncThunk(
  "company/addCompanyRequest",
  async (data: AddCompanyRequestRequest, { rejectWithValue }) => {
    try {
      return await registerCompanyRequest(data);
    } catch (error: any) {
      console.error("Failed to add company request:", error.message);
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to add company request");
    }
  },
);

//add company request details
export const addCompanyRequestDetail = createAsyncThunk(
  "company/addCompanyRequestDetail",
  async (data: AddCompanyRequestDetailRequest, { rejectWithValue }) => {
    try {
      return await registerCompanyRequestDetails(data);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        // Handle 422 validation error
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");

          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }

        // For other errors, return the message from the response
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      // Return a generic error message for any other case
      return rejectWithValue("Failed to add company request details");
    }
  },
);

//get company documents
export const fetchCompanyDocuments = createAsyncThunk(
  "company/fetchCompanyDocuments",
  async (companyId: number, { rejectWithValue }) => {
    try {
      return await getCompanyDocuments(companyId);
    } catch (error: any) {
      console.error("Failed to fetch company documents:", error.message);
      return rejectWithValue("Failed to fetch company documents");
    }
  },
);

//getUserCompanies
export const fetchUserCompanies = createAsyncThunk(
  "company/fetchUserCompanies",
  async (nationalId: string, { rejectWithValue }) => {
    try {
      return await getUserCompanies(nationalId);
    } catch (error: any) {
      console.error("Failed to fetch user companies:", error.message);
      return rejectWithValue("Failed to fetch user companies");
    }
  },
);

export const addCompanyToWatch = createAsyncThunk(
  "company/addCompanyToWatch",
  async (data: AddWatchListRequest, { rejectWithValue }) => {
    try {
      return await addCompanyToWatchList(data);
    } catch (error: any) {
      console.error("Failed to add company watchlist:", error);
      const { status, data } = error.response;
      // Handle 422 validation error
      if (status === 422 && data?.detail) {
        const validationErrors = data.detail
          .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
          .join("\n");

        return rejectWithValue(`Validation Error:\n${validationErrors}`);
      }

      // For other errors, return the message from the response
      if (data?.message || data?.detail) {
        return rejectWithValue(data.message ?? data.detail);
      }

      if (data?.detail) {
        return rejectWithValue(data.detail);
      }
      return rejectWithValue("Failed to add company to watchlist");
    }
  },
);

//get user watchlist
export const fetchUserWatchList = createAsyncThunk(
  "company/fetchUserWatchList",
  async (nationalId: string, { rejectWithValue }) => {
    try {
      return await getWatchList(nationalId);
    } catch (error: any) {
      console.error("Failed to fetch user watchlist:", error.message);
      return rejectWithValue("Failed to fetch user watchlist");
    }
  },
);

//search companies
export const fetchCompanySearch = createAsyncThunk(
  "company/searchCompanies",
  async (searchQuery: any, { rejectWithValue }) => {
    try {
      return await searchCompanies(searchQuery);
    } catch (error: any) {
      console.error("Failed to search companies:", error.message);
      return rejectWithValue("Failed to search companies");
    }
  },
);

//add investor questions
export const addInvestorQuestions = createAsyncThunk(
  "company/addInvestorQuestions",
  async (data: InvestorQuestionRequest, { rejectWithValue }) => {
    try {
      return await addInvestorQuestion(data);
    } catch (error: any) {
      const { status, data } = error.response;

      if (status === 422 && data?.detail) {
        const validationErrors = data.detail
          .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
          .join("\n");

        return rejectWithValue(`Validation Error:\n${validationErrors}`);
      }

      // For other errors, return the message from the response
      if (data?.message || data?.detail) {
        return rejectWithValue(data.message ?? data.detail);
      }

      if (data?.detail) {
        return rejectWithValue(data.detail);
      }
      return rejectWithValue("Failed to add company to watchlist");
    }
  },
);

// Thunk for acquisition request
export const createAcquisitionRequestThunk = createAsyncThunk(
  "company/createAcquisitionRequest",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createAcquisitionRequest(data);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");
          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      return rejectWithValue("Failed to create acquisition request");
    }
  },
);

// Thunk for equity financing request
export const createEquityFinancingRequestThunk = createAsyncThunk(
  "company/createEquityFinancingRequest",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createEquityFinancingRequest(data);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");
          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      return rejectWithValue("Failed to create equity financing request");
    }
  },
);

// Thunk for project financing request
export const createProjectFinancingRequestThunk = createAsyncThunk(
  "company/createProjectFinancingRequest",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createProjectFinancingRequest(data);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");
          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      return rejectWithValue("Failed to create project financing request");
    }
  },
);

// Thunk for revenue-based financing request
export const createRevenueBasedFinancingRequestThunk = createAsyncThunk(
  "company/createRevenueBasedFinancingRequest",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createRevenueBasedFinancingRequest(data);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422 && data?.detail) {
          const validationErrors = data.detail
            .map((err: any) => `- ${err.msg} (at ${err.loc.join(", ")})`)
            .join("\n");
          return rejectWithValue(`Validation Error:\n${validationErrors}`);
        }
        if (data?.message) {
          return rejectWithValue(data.message);
        }
      }
      return rejectWithValue("Failed to create revenue-based financing request");
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
        state.error = action.error.message as string;
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
      })
      // Handle fetchCompanyDataCombined action
      .addCase(fetchCompanyDataCombined.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyDataCombined.fulfilled, (state, action) => {
        state.status = "idle";
        state.combinedCompanyData = action.payload;
      })
      .addCase(fetchCompanyDataCombined.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(createCombinedCompanyShareholder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCombinedCompanyShareholder.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createCombinedCompanyShareholder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(createDirectorDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDirectorDetails.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createDirectorDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addNewDirectorPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewDirectorPosition.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addNewDirectorPosition.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addEducationalQualifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEducationalQualifications.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addEducationalQualifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addEmploymentHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmploymentHistory.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addEmploymentHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addPublicInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPublicInformation.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addPublicInformation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addNewAward.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewAward.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addNewAward.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(submitUploadCompanyLogo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitUploadCompanyLogo.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(submitUploadCompanyLogo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addCompanyDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCompanyDocument.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addCompanyDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(fetchCompanyDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyDocuments.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyDocuments = action.payload.documents;
      })
      .addCase(fetchCompanyDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(fetchUserCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCompanies.fulfilled, (state, action) => {
        state.status = "idle";
        state.userCompanies = action.payload;
      })
      .addCase(fetchUserCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addCompanyToWatch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCompanyToWatch.fulfilled, (state, action) => {
        state.status = "idle";
        state.userCompanies = action.payload;
      })
      .addCase(addCompanyToWatch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(submitUpdateCompanyDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitUpdateCompanyDetails.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(submitUpdateCompanyDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(submitUpdateContactDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitUpdateContactDetails.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(submitUpdateContactDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addCompanyRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCompanyRequest.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addCompanyRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addCompanyRequestDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCompanyRequestDetail.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addCompanyRequestDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(fetchUserWatchList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserWatchList.fulfilled, (state, action) => {
        state.status = "idle";
        state.watchlist_details = action.payload.watchlist_details;
      })
      .addCase(fetchUserWatchList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(fetchCompanySearch.pending, (state) => {
        state.status = "loading";
      }
      ).addCase(fetchCompanySearch.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyList = action.payload;
      }).addCase(fetchCompanySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      }).addCase(addInvestorQuestions.pending, (state) => {
        state.status = "loading";
      }).addCase(addInvestorQuestions.fulfilled, (state) => {
        state.status = "idle";
      }).addCase(addInvestorQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      ;
  },
});

export default companySlice.reducer;
