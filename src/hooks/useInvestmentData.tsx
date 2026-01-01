"use client"

import { useState, useCallback, useEffect } from "react"
import { Company, CompanyDetailsResponse, CompanySummary, CompanyValuations, FilterOptions, InvestmentRequest } from "@/state/models/investment"
import { searchCompanies } from "@/state/services/company"
import { handleApiError, fetchSectorCompanies, makeInvestment, addToWatchlist, submitInvestorQuestion, fetchCompanyDetails, fetchCompanySummary, fetchCompanyValuations, fetchCompanyDocuments } from "@/state/services/investment"


export function useInvestmentData(companyId: number | null) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [companySummary, setCompanySummary] = useState<CompanySummary | null>(null)
  const [companyDetails, setCompanyDetails] = useState<CompanyDetailsResponse | null>(null)
    const [companyDocuments, setCompanyDocuments] = useState<CompanyDocumentsResponse | null>(null)
  
  const [companyValuations, setCompanyValuations] = useState<CompanyValuations | null>(null)
  const [apiErrors, setApiErrors] = useState<string[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [loadingStates, setLoadingStates] = useState({
    summary: false,
    valuations: false,
    details: false,
    directors:false,
    documents:false
  })

  const hasData = {
    summary: !!companySummary,
    valuations: !!companyValuations && companyValuations.valuation?.length > 0,
    details: !!companyDetails,
    contactDetails: !!companyDetails?.company_contact_details,
    directors : !!companyDetails?.company_directors,
    stockMarketDetails:
      !!companyDetails?.stock_market_details && companyDetails.stock_market_details.type_of_market !== "N/A",
    competition: !!companyDetails?.competition && companyDetails.competition.competition_name !== "N/A",
    documents: !!companyDocuments && companyDocuments.documents?.length > 0,
  
  }


  // Generic error handler that doesn't throw
  const handleError = useCallback((err: any, context: string) => {
    const errorMessage = handleApiError(err)
    console.warn(`${context}:`, errorMessage)
    setError(`${context}: ${errorMessage}`)
  }, [])

  // Fetch companies in a sector with filters
  const getSectorCompanies = useCallback(
    async (sector: string, filters: FilterOptions = {}) => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchSectorCompanies(sector, filters)
        setCompanies(data.companies || [])
        return data
      } catch (err) {
        handleError(err, "Failed to load companies")
        // Return fallback data
        return {
          sector,
          total_companies: 0,
          companies: [],
          filters: {},
        }
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  // Search companies
  const searchCompaniesData = useCallback(
    async (query: string) => {
      setLoading(true)
      setError(null)

      try {
        const data = await searchCompanies(query)
        setCompanies(data)
        return data
      } catch (err) {
        handleError(err, "Failed to search companies")
        return []
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  // Make investment
  const investInCompany = useCallback(
    async (investmentData: InvestmentRequest) => {
      setLoading(true)
      setError(null)

      try {
        const data = await makeInvestment(investmentData)
        return { success: true, message: "Investment successful!", data }
      } catch (err) {
        handleError(err, "Investment failed")
        return { success: false, message: handleApiError(err) }
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  // Add to watchlist
  const addCompanyToWatchlist = useCallback(
    async (companyId: number, nationalId: string) => {
      setLoading(true)
      setError(null)

      try {
        const data = await addToWatchlist({ company_id: companyId, national_id: nationalId })
        return { success: true, message: "Added to watchlist!", data }
      } catch (err) {
        handleError(err, "Failed to add to watchlist")
        return { success: false, message: handleApiError(err) }
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  // Submit investor question
  const submitQuestion = useCallback(
    async (companyId: number, question: string, investorEmail: string) => {
      setLoading(true)
      setError(null)

      try {
        const data = await submitInvestorQuestion({
          company_id: companyId,
          question,
          investor_email: investorEmail,
        })
        return { success: true, message: "Question submitted successfully!", data }
      } catch (err) {
        handleError(err, "Failed to submit question")
        return { success: false, message: handleApiError(err) }
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  const fetchDetails = async () => {
    setLoadingStates((prev) => ({ ...prev, details: true }))
    try {
      const data = await fetchCompanyDetails(companyId ?? 0)
      setCompanyDetails(data)
    } catch (err) {
      handleError(err, "Failed to load company details")
    } finally {
      setLoadingStates((prev) => ({ ...prev, details: false }))
    }
  }

  const fetchSummary = async () => {
    setLoadingStates((prev) => ({ ...prev, summary: true }))
    try {
      const data = await fetchCompanySummary(companyId ?? 0)
      setCompanySummary(data)
    } catch (err) {
      handleError(err, "Failed to load company summary")
    } finally {
      setLoadingStates((prev) => ({ ...prev, summary: false }))
    }
  }

  const fetchValuations = async () => {
    setLoadingStates((prev) => ({ ...prev, valuations: true }))
    try {
      const data = await fetchCompanyValuations(companyId)
      setCompanyValuations(data)
    } catch (err) {
      handleError(err, "Failed to load company valuations")
    } finally {
      setLoadingStates((prev) => ({ ...prev, valuations: false }))
    }
  }

  const fetchDocuments = async () => {
      setLoadingStates((prev) => ({ ...prev, documents: true }))
      try {
        const data = await fetchCompanyDocuments(companyId ?? 0)
        setCompanyDocuments(data)
      } catch (err) {
        handleError(err, "Failed to load company documents")
      } finally {
        setLoadingStates((prev) => ({ ...prev, documents: false }))
      }
    }
  

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Clear companies
  const clearCompanies = useCallback(() => {
    setCompanies([])
  }, [])

  const fetchAllCompanyData = async () => {
    if (!companyId) return

    setLoading(true)
    setDataLoaded(false)
    setApiErrors([])

    try {
      // Fetch all data in parallel
      await Promise.allSettled([
        fetchSummary(),
        fetchDetails(),
        fetchDocuments(),
        fetchValuations(),

        // fetchPreviousFundsData(),
        // fetchFinancialMetricsData(),
      ])

      setDataLoaded(true)
    } catch (err) {
      console.error("Failed to load company data:", err)
      setError("Failed to load company data")
    } finally {
      setLoading(false)
    }
  }


  const refreshData = () => {
    fetchAllCompanyData()
  }

  useEffect(() => {
    if (companyId) {
      fetchAllCompanyData()
    }
  }, [companyId])

  return {
    // State
    companies,
    companySummary,
    companyDocuments,
    companyDetails,
    companyValuations,

    loading,
    loadingStates,
    hasData,
    dataLoaded,

    apiErrors,

    error,

    // Actions
    getSectorCompanies,
    searchCompaniesData,
    investInCompany,
    addCompanyToWatchlist,
    submitQuestion,
    clearError,
    clearCompanies,

    refreshSummary: fetchSummary,
    refreshValuations: fetchValuations,

  }
}

// Export types for use in components
export type { Company, FilterOptions, InvestmentRequest }
