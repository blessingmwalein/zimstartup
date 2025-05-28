import axios from "axios"
import { createAxiosInstance } from "./axios"
import { Company, CompanyDetailsResponse, CompanyDocumentsResponse, CompanySummary, CompanyValuations, FilterOptions, InvestmentRequest, SectorCompaniesResponse } from "../models/investment"



const api = createAxiosInstance()

// Types for API responses


// API Functions

/**
 * Fetch companies in a specific sector with optional filters
 */
export const fetchSectorCompanies = async (
  sector: string,
  filters: FilterOptions = {},
): Promise<SectorCompaniesResponse> => {
  const queryParams = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString())
    }
  })

  const url = `/filtered-sector-companies2/${sector}?${queryParams.toString()}`
  const response = await api.get<SectorCompaniesResponse>(url)
  return response.data
}

/**
 * Fetch company summary information
 */
export const fetchCompanySummary = async (companyId: number): Promise<CompanySummary> => {
  const response = await api.get<CompanySummary>(`/company-summary/${companyId}`)
  return response.data
}

/**
 * Fetch company valuations and funding information
 */
export const fetchCompanyValuations = async (companyId: number): Promise<CompanyValuations> => {
  const response = await api.get<CompanyValuations>(`/company-valuations/${companyId}`)
  return response.data
}

/**
 * Fetch comprehensive company details
 */
export const fetchCompanyDetails = async (companyId: number): Promise<CompanyDetailsResponse> => {
  const response = await api.get<CompanyDetailsResponse[]>(`/get-company/${companyId}`)
  return response.data[0] // API returns array with single object
}

/**
 * Fetch company documents
 */
export const fetchCompanyDocuments = async (companyId: number): Promise<CompanyDocumentsResponse> => {
  const response = await api.get<CompanyDocumentsResponse>(`/company_documents/${companyId}`)
  return response.data
}

/**
 * Search companies by query
 */
export const searchCompanies = async (searchQuery: string): Promise<Company[]> => {
  const response = await api.get<Company[]>(`/company-search-query?${searchQuery}`)
  return response.data
}

/**
 * Get all companies list
 */
export const fetchAllCompanies = async (): Promise<Company[]> => {
  const response = await api.get<Company[]>("/show-companies-list")
  return response.data
}

/**
 * Get companies by sector (alternative endpoint)
 */
export const fetchCompaniesBySector = async (sector: string): Promise<Company[]> => {
  const response = await api.get<Company[]>(`/get-companies-list-by/${sector}`)
  return response.data
}

/**
 * Get company data combined by location
 */
export const fetchCompaniesByLocation = async (location: string): Promise<Company[]> => {
  const response = await api.get<Company[]>(`/get-all-company-data-combined-by/${location}`)
  return response.data
}

/**
 * Advanced company search with multiple parameters
 */
export const searchCompaniesAdvanced = async (
  companyName: string,
  industrialId: string,
  location: string,
): Promise<Company[]> => {
  const response = await api.get<Company[]>(
    `/company-with-multiple-searches-or?company_name=${companyName}&industrial_id=${industrialId}&location=${location}`,
  )
  return response.data
}

/**
 * Make an investment in a company
 */
export const makeInvestment = async (investmentData: InvestmentRequest): Promise<any> => {
  const response = await api.post("/invest", investmentData)
  return response.data
}

/**
 * Add company to watchlist
 */
export const addToWatchlist = async (data: { company_id: number; national_id: string }): Promise<any> => {
  const response = await api.post("/add-to-watchlist", data)
  return response.data
}

/**
 * Get user's watchlist
 */
export const fetchWatchlist = async (nationalId: string): Promise<any> => {
  const response = await api.get(`/watchlist/${nationalId}`)
  return response.data
}

/**
 * Submit investor question
 */
export const submitInvestorQuestion = async (data: {
  company_id: number
  question: string
  investor_email: string
}): Promise<any> => {
  const response = await api.post("/register-investor-question", data)
  return response.data
}

/**
 * Get company financial metrics
 */


/**
 * Get company previous funds
 */
export const fetchPreviousFunds = async (companyId: number): Promise<any> => {
  const response = await api.get(`/get-previous-funds/${companyId}`)
  return response.data
}

/**
 * Get company directors
 */
export const fetchCompanyDirectors = async (companyId: number): Promise<any> => {
  const response = await api.get(`/company-directors/${companyId}`)
  return response.data
}

/**
 * Get company updates/news
 */
export const fetchCompanyUpdates = async (companyId: number): Promise<any> => {
  const response = await api.get(`/companies/${companyId}/update`)
  return response.data
}

/**
 * Upload company document
 */
export const uploadCompanyDocument = async (companyId: number, file: File): Promise<any> => {
  const formData = new FormData()
  formData.append("company_id", companyId.toString())
  formData.append("file", file)

  const response = await api.post("/upload-company-documents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

/**
 * Download company document
 */
export const downloadCompanyDocument = async (documentPath: string): Promise<Blob> => {
  const response = await api.get(`/${documentPath}`, {
    responseType: "blob",
  })
  return response.data
}

/**
 * Check if company name exists
 */
export const checkCompanyExists = async (companyName: string): Promise<any> => {
  const response = await api.get(`/search-company/${companyName}`)
  return response.data
}

/**
 * Get sectors list
 */
export const fetchSectors = async (): Promise<any> => {
  const response = await api.get("/get-all-sectors")
  return response.data
}

/**
 * Get industry list
 */
export const fetchIndustries = async (): Promise<any> => {
  const response = await api.get("/get-industry-list")
  return response.data
}

/**
 * Error handler for API calls
 */
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || `Error: ${error.response.status}`
  } else if (error.request) {
    // Request was made but no response received
    return "Network error: Please check your connection"
  } else {
    // Something else happened
    return error.message || "An unexpected error occurred"
  }
}

// Export the api instance for custom calls if needed
export { api }
