import { CustomerDataResponse } from "../models/customer";
import { createAxiosInstance, createLoginInstance } from "./axios";
import { LoginRequest, LoginResponse } from "../models/login";
import qs from "qs";
import { UserResponse } from "../models/user";
import {
  CreateEmployementDetailsRequest,
  CreateNextOfKeenRequest,
  UpdateContactInfoRequest,
  UpdateContactInforRequest,
} from "../models/employement";
import {
  AddCombinedShareholderRequest,
  AddCompanyRequestDetailRequest,
  AddCompanyRequestRequest,
  AddDirectorDetailsRequest,
  AddDirectorPositionRequest,
  AddEducationalQualificationsRequest,
  AddEmploymentHistoryRequest,
  AddPublicInformationRequest,
  CheckCompanyNameResponse,
  CompanyCombinedResponse,
  CompanyListBySectorResponse,
  CompanyListResponse,
  CompanyQuestionRequestion,
  CompanyUpdate,
  CreateCompanyContactRequest,
  CreateCompanyPreviousFundRequest,
  CreateCompanyQualificationRequest,
  CreateCompanyRequest,
  CreateCompanyShareholderRequest,
  CreateCompanyStockMarketRequest,
  CreateCompanyUpdatesRequest,
  CreateUserEmploymentHistoryRequest,
  InvestorQuestionRequest,
  RegisterCompanyRequest,
  SearchCompaniesResponse,
  UploadCompanyLogoRequest,
  UserCompaniesResponse,
} from "../models/company";
import { CompanyDocumentsResponse } from "../models/documents";
import { AddWatchListRequest } from "../models/watchlist";

// Global Axios instance with the default config (including token if required)
const api = createAxiosInstance();

// Get user data from the server using the national ID
export const checkCompanyExists = async (
  companyName: string,
): Promise<CheckCompanyNameResponse> => {
  const response = await api.get<CheckCompanyNameResponse>(
    `search-company/${companyName}`,
  );
  return response.data;
};

//create new company
export const createCompany = async (
  data: CreateCompanyRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-new-company-details`, data);
  return response.data;
};

//update company details
export const updateCompanyDetails = async (
  data: CreateCompanyRequest,
  companyId: number,
): Promise<any> => {
  const response = await api.put<any>(
    `update-company-details?company_id=${companyId}`,
    data,
  );
  return response.data;
};

//create comapny contact details
export const createCompanyContactDetails = async (
  data: CreateCompanyContactRequest,
): Promise<any> => {
  const response = await api.post<any>(
    `create-new-company-contact-details`,
    data,
  );
  return response.data;
};

//update company contact details
export const updateCompanyContactDetails = async (
  data: CreateCompanyContactRequest,
  companyId: number,
): Promise<any> => {
  const response = await api.put<any>(
    `update-company-contact-details/${companyId}`,
    data,
  );
  return response.data;
};

//create-new-stockmarket-details
export const createNewStockMarketDetails = async (
  data: CreateCompanyStockMarketRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-new-stockmarket-details`, data);
  return response.data;
};

//create-previous-funds
export const createPreviousFunds = async (
  data: CreateCompanyPreviousFundRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-previous-funds`, data);
  return response.data;
};

// create-new-company-update
export const createNewCompanyUpdate = async (
  data: CreateCompanyUpdatesRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-new-company-update`, data);
  return response.data;
};

//get-company-updates
export const getCompanyUpdates = async (companyId: any): Promise<any> => {
  const response = await api.get(`/companies/${companyId}/update`);
  return response.data;
};

//create-new-shareholder
export const createNewShareholder = async (
  data: CreateCompanyShareholderRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-new-shareholder`, data);
  return response.data;
};

//create-new-qualification
export const createNewQualification = async (
  data: CreateCompanyQualificationRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-new-qualification`, data);
  return response.data;
};

//create-employee-history
export const createEmployeeHistory = async (
  data: CreateUserEmploymentHistoryRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-employee-history`, data);
  return response.data;
};

// {{URL}}register-company-request

//{{URL}}create-new-director-details
export const createNewDirectorDetails = async (data: any): Promise<any> => {
  const response = await api.post<any>(`create-new-director-details`, data);
  return response.data;
};

//{{URL}}create-new-director-position
export const createNewDirectorPosition = async (
  data: AddDirectorPositionRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-new-director-position`, data);
  return response.data;
};

//{{URL}}create-educational-qualifications
export const createEducationalQualifications = async (
  data: AddEducationalQualificationsRequest,
): Promise<any> => {
  const response = await api.post<any>(
    `create-educational-qualifications`,
    data,
  );
  return response.data;
};

//{{URL}}{create-new-employment-history
export const createNewEmploymentHistory = async (
  data: AddEmploymentHistoryRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-new-employment-history`, data);
  return response.data;
};

//{{URL}}{create-new-public-information
export const createNewPublicInformation = async (
  data: AddPublicInformationRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-new-public-information`, data);
  return response.data;
};

//{{URL}}create-new-award
export const createNewAward = async (data: any): Promise<any> => {
  const response = await api.post<any>(`create-new-award`, data);
  return response.data;
};

//{{URL}}create-new-director-profile-combined
export const createNewDirectorProfileCombined = async (
  data: any,
): Promise<any> => {
  const response = await api.post<any>(
    `create-new-director-profile-combined`,
    data,
  );
  return response.data;
};

///show-companies-list
export const showCompaniesList = async (): Promise<any> => {
  const response = await api.get<CompanyListResponse>(`show-companies-list`);
  return response.data;
};

//get-companies-list-by/Technology
export const showCompaniesListBySector = async (
  sector: string,
): Promise<any> => {
  const response = await api.get<CompanyListBySectorResponse>(
    `get-companies-list-by/${sector}`,
  );
  return response.data;
};

//https://zimstartup-861d8915d228.herokuapp.com/get-all-company-data-combined/Nyika
export const getAllCompanyDataCombined = async (
  sector: string,
): Promise<any> => {
  const response = await api.get<any>(
    `get-all-company-data-combined/${sector}`,
  );
  return response.data;
};

//https://zimstartup-861d8915d228.herokuapp.com/get-all-company-data-combined-by/harare
export const getAllCompanyDataCombinedByLocation = async (
  location: string,
): Promise<any> => {
  const response = await api.get<any>(
    `get-all-company-data-combined-by/${location}`,
  );
  return response.data;
};

//{{URL}}company-with-multiple-searches-or?company_name=X&industrial_id&location
export const companyWithMultipleSearchesOr = async (
  company_name: string,
  industrial_id: string,
  location: string,
): Promise<any> => {
  const response = await api.get<any>(
    `company-with-multiple-searches-or?company_name=${company_name}&industrial_id=${industrial_id}&location=${location}`,
  );
  return response.data;
};

//get-all-company-data-combined/Stitchit%20Inc
export const getCompanyDataCombined = async (
  companyId: string,
): Promise<CompanyCombinedResponse> => {
  const response = await api.get<CompanyCombinedResponse>(
    `get-all-company-data-combined/${companyId}`,
  );
  return response.data;
};

//add combined company shareholder
export const addCombinedCompanyShareholder = async (
  data: AddCombinedShareholderRequest,
): Promise<any> => {
  const response = await api.post<any>(
    `create-new-director-profile-combined`,
    data,
  );
  return response.data;
};

//add drector details
export const addDirectorDetails = async (
  data: AddDirectorDetailsRequest,
): Promise<any> => {
  const response = await api.post<any>(`create-new-director-details`, data);
  return response.data;
};

//upload company document
export const uploadCompanyDocument = async (
  data: UploadCompanyLogoRequest,
): Promise<any> => {
  // Create a FormData instance
  const formData = new FormData();
  formData.append("company_id", data.companyId);
  formData.append("file", data.file);

  // Send the POST request with multipart/form-data
  const response = await api.post<any>("upload-company-documents", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Set the content type explicitly
    },
  });

  return response.data;
};

//upload_company_logo
export const uploadCompanyLogo = async (
  data: UploadCompanyLogoRequest,
): Promise<any> => {
  // Create a FormData instance
  const formData = new FormData();
  formData.append("company_id", data.companyId);
  formData.append("file", data.file);

  // Send the POST request with multipart/form-data
  const response = await api.post<any>(
    `upload_company_logo?company_id=${data.companyId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type explicitly
      },
    },
  );

  return response.data;
};

//get company_documents/102
export const getCompanyDocuments = async (
  companyId: number,
): Promise<CompanyDocumentsResponse> => {
  const response = await api.get<CompanyDocumentsResponse>(
    `company_documents/${companyId}`,
  );
  return response.data;
};

export const getUserCompanies = async (
  national_id: string,
): Promise<UserCompaniesResponse[]> => {
  const response = await api.get<UserCompaniesResponse[]>(
    `fetch-companies-owned-by-user/${national_id}`,
  );
  return response.data;
};

//company to watchlist
export const addCompanyToWatchList = async (
  data: AddWatchListRequest,
): Promise<any> => {
  const response = await api.post<any>(`add-to-watchlist`, data);
  return response.data;
};

//add company request register-company-request
export const registerCompanyRequest = async (
  data: AddCompanyRequestRequest,
): Promise<any> => {
  const response = await api.post<any>(`register-company-request`, data);
  return response.data;
};

//add company request details register-company-request-detail
export const registerCompanyRequestDetails = async (
  data: AddCompanyRequestDetailRequest,
): Promise<any> => {
  const response = await api.post<any>(`register-company-request-detail`, data);
  return response.data;
};

//get watchlist
export const getWatchList = async (national_id: string): Promise<any> => {
  const response = await api.get<any>(`get-user-watchlist/${national_id}`);
  return response.data;
};

// get-all-sectors

//search companies search-query
export const searchCompanies = async (
  searchQuery: string,
): Promise<SearchCompaniesResponse> => {
  const response = await api.get<SearchCompaniesResponse>(
    `search-companies/${searchQuery}`,
  );
  return response.data;
};

//add company ivestor question question register-investor-question
export const addInvestorQuestion = async (
  data: InvestorQuestionRequest,
): Promise<any> => {
  const response = await api.post<any>(`register-investor-question`, data);
  return response.data;
};

//add company request question
export const addCompanyRequestQuestion = async (
  data: CompanyQuestionRequestion,
): Promise<any> => {
  const response = await api.post<any>(`register-company-request-question`, data);
  return response.data;
};

// Director APIs
export const createDirectorDetails = async (data: any) => {
  const response = await api.post("/create-new-director-details", data)
  return response.data
};

export const createDirectorPosition = async (data: any) => {
  const response = await api.post("/create-new-director-position", data)
  return response.data
};

export const createEmploymentHistory = async (data: any) => {
  const response = await api.post("/create-new-employment-history", data)
  return response.data
};

export const createPublicInformation = async (data: any) => {
  const response = await api.post("/create-new-public-information", data)
  return response.data
};

export const createAward = async (data: any) => {
  const response = await api.post("/create-new-award", data)
  return response.data
};

export const getCompanyDirectors = async (companyId: number) => {
  const response = await api.get(`/company-directors/${companyId}`)
  return response.data
};

// Company APIs
export const getCompanyData = async (companyId: number) => {
  const response = await api.get(`/get-all-company-data-combined/${companyId}`)
  return response.data
};

export const createStockMarketDetails = async (data: UpdateContactInforRequest) => {
  const response = await api.post("/create-new-stockmarket-details", data)
  return response.data
};

export const createCompanyUpdate = async (data: any) => {
  const response = await api.post("/create-new-company-update", data)
  return response.data
};

//get emplye combined data 
export const getEmployeeCombinedData = async (employeeId: number) => {
  const response = await api.get(`/get-employee-details/${employeeId}`)
  return response.data
};

export const getPreviousFunds = async (companyId: number) => {
  const response = await api.get(`/get-previous-funds/${companyId}`)
  return response.data
};

// Get financial metrics

// Add financial metrics
export const addFinancialMetrics = async (data: any) => {
  const response = await api.post("/add-financial-metrics", data)
  return response.data
};

// Update financial metrics
export const updateFinancialMetrics = async (data: any) => {
  const response = await api.put("/update-financial-metrics", data)
  return response.data
};

// Delete company document
export const deleteCompanyDocument = async (documentId: number) => {
  const response = await api.delete(`/delete-company-document/${documentId}`)
  return response.data
};

// Delete previous funds
export const deletePreviousFunds = async (fundId: number) => {
  const response = await api.delete(`/delete-previous-funds/${fundId}`)
  return response.data
};
