"use client"

import { useState, useEffect } from "react"
import { CompanyDetailsResponse, CompanyDocumentsResponse, CompanySummary, CompanyValuations } from "../../state/models/investment"
import { fetchCompanyDetails, fetchCompanyDirectors, fetchCompanyDocuments, fetchCompanySummary, fetchCompanyUpdates, fetchCompanyValuations, fetchPreviousFunds, handleApiError } from "../../state/services/investment"
import * as api from "../../state/services/company"
import { UpdateContactInforRequest } from "../../state/models/employement"
import { CreateCompanyRequest } from "../../state/models/company"


export function useCompanyData(companyId: number) {
  // Data states
  const [companyData, setCompanyData] = useState<any>(null)
  const [employeeData, setEmployeeData] = useState<any>(null)
  const [companyValuations, setCompanyValuations] = useState<CompanyValuations | null>(null)
  const [companyDocuments, setCompanyDocuments] = useState<CompanyDocumentsResponse | null>(null)
  const [directors, setDirectors] = useState<any[]>([])
  const [updates, setUpdates] = useState<any[]>([])
  const [previousFunds, setPreviousFunds] = useState<any[]>([])
  const [financialMetrics, setFinancialMetrics] = useState<any>(null)

  // Loading and error states
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [apiErrors, setApiErrors] = useState<string[]>([])

  // Individual loading states
  const [loadingStates, setLoadingStates] = useState({
    summary: false,
    valuations: false,
    details: false,
    documents: false,
    directors: false,
    updates: false,
    previousFunds: false,
    financialMetrics: false,
  })

  // Generic error handler
  const handleError = (err: any, context: string) => {
    const errorMessage = handleApiError(err)
    console.warn(`${context}:`, errorMessage)
    setApiErrors((prev) => [...prev, `${context}: ${errorMessage}`])
  }

  // Fetch company summary

  // Fetch company valuations
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

  // Fetch company details
 

  // Fetch company documents
  const fetchDocuments = async () => {
    setLoadingStates((prev) => ({ ...prev, documents: true }))
    try {
      const data = await fetchCompanyDocuments(companyId)
      setCompanyDocuments(data)
    } catch (err) {
      handleError(err, "Failed to load company documents")
    } finally {
      setLoadingStates((prev) => ({ ...prev, documents: false }))
    }
  }

  // Fetch directors
  const fetchDirectorsData = async () => {
    setLoadingStates((prev) => ({ ...prev, directors: true }))
    try {
      const data = await fetchCompanyDirectors(companyId)
      setDirectors(Array.isArray(data) ? data : [])
    } catch (err) {
      handleError(err, "Failed to load company directors")
      setDirectors([])
    } finally {
      setLoadingStates((prev) => ({ ...prev, directors: false }))
    }
  }

  // Fetch company updates
  const fetchUpdatesData = async () => {
    setLoadingStates((prev) => ({ ...prev, updates: true }))
    try {
      const data = await fetchCompanyUpdates(companyId)
      setUpdates(Array.isArray(data) ? data : [])
    } catch (err) {
      handleError(err, "Failed to load company updates")
      setUpdates([])
    } finally {
      setLoadingStates((prev) => ({ ...prev, updates: false }))
    }
  }

  // Fetch previous funds
  const fetchPreviousFundsData = async () => {
    setLoadingStates((prev) => ({ ...prev, previousFunds: true }))
    try {
      const data = await fetchPreviousFunds(companyId)
      setPreviousFunds(Array.isArray(data) ? data : [])
    } catch (err) {
      handleError(err, "Failed to load previous funds")
      setPreviousFunds([])
    } finally {
      setLoadingStates((prev) => ({ ...prev, previousFunds: false }))
    }
  }

  // Fetch financial metrics
  // const fetchFinancialMetricsData = async () => {
  //   setLoadingStates((prev) => ({ ...prev, financialMetrics: true }))
  //   try {
  //     const data = await fetchFinancialMetrics(companyId)
  //     setFinancialMetrics(data)
  //   } catch (err) {
  //     handleError(err, "Failed to load financial metrics")
  //     setFinancialMetrics(null)
  //   } finally {
  //     setLoadingStates((prev) => ({ ...prev, financialMetrics: false }))
  //   }
  // }

  // Fetch all company data
  const fetchAllCompanyData = async () => {
    if (!companyId) return

    setLoading(true)
    setDataLoaded(false)
    setApiErrors([])

    try {
      // Fetch all data in parallel
      await Promise.allSettled([
        // fetchSummary(),
        fetchValuations(),
        // fetchDetails(),
        fetchCompanyData(),
        fetchDocuments(),
        fetchDirectorsData(),
        fetchUpdatesData(),
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
  

  const fetchCompanyData = async () => {
    setLoading(true)
    try {
      const data = await api.getCompanyData(companyId)
      setCompanyData(data)

      // Fetch additional data
      await Promise.all([
        fetchDirectors(),
        fetchDocuments(),
        fetchUpdates(),
        // fetchPreviousFunds(),
        // fetchFinancialMetrics(),
      ])

      setLoading(false)
    } catch (err: any) {
      setError(err.message || "Failed to fetch company data")
      setLoading(false)
    }
  }

  const fetchUpdates = async () => {
    try {
      const data = await api.getCompanyUpdates(companyId)
      setUpdates(data.updates || [])
    } catch (err: any) {
      console.error("Failed to fetch updates:", err)
    }
  }

  // const fetchPreviousFunds = async () => {
  //   try {
  //     const data = await api.getPreviousFunds(companyId)
  //     setPreviousFunds(data.funds || [])
  //   } catch (err: any) {
  //     console.error("Failed to fetch previous funds:", err)
  //     setPreviousFunds([])
  //   }
  // }

  // const fetchFinancialMetrics = async () => {
  //   try {
  //     const data = await api.getFinancialMetrics(companyId)
  //     setFinancialMetrics(data.metrics || null)
  //   } catch (err: any) {
  //     console.error("Failed to fetch financial metrics:", err)
  //     setFinancialMetrics(null)
  //   }
  // }

  const fetchDirectors = async () => {
    try {
      const data = await api.getCompanyDirectors(companyId)
      setDirectors(data.post_details || [])
    } catch (err: any) {
      console.error("Failed to fetch directors:", err)
    }
  }

  // const fetchDocuments = async () => {
  //   try {
  //     const data = await api.getCompanyDocuments(companyId)
  //     setDocuments(data.documents || [])
  //   } catch (err: any) {
  //     console.error("Failed to fetch documents:", err)
  //   }
  // }

  // Utility functions
  const clearError = () => {
    setError(null)
    setApiErrors([])
  }

  const refreshData = () => {
    fetchAllCompanyData()
  }

  // Data availability checks
  const hasData = {
    valuations: !!companyValuations && companyValuations.valuation?.length > 0,
    documents: !!companyDocuments && companyDocuments.documents?.length > 0,
    directors: directors.length > 0,
    updates: updates.length > 0,
    previousFunds: previousFunds.length > 0,
    financialMetrics: !!financialMetrics,
    contactDetails: !!companyData?.company_contact_details,
    stockMarketDetails:
      !!companyData?.stock_market_details && companyData.stock_market_details.type_of_market !== "N/A",
  }


  const updateCompany = async (data: CreateCompanyRequest, companyId: number) => {
    try {
      await api.updateCompanyDetails(data, companyId)
      // Refresh company data
      fetchCompanyData()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to update company" }
    }
  }

  // Update stock market details
  const updateStockMarket = async (data: any) => {
    try {
      await api.createStockMarketDetails({
        ...data,
        company_id: companyId,
      })
      // Refresh company data
      fetchCompanyData()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to update stock market details" }
    }
  }

  const updateContactData = async (data: UpdateContactInforRequest) => {
    try {
      await api.updateCompanyContactDetails(
        {
          ...data,
          company_id: companyId,
        },
        companyId,
      )
      // Refresh company data
      fetchCompanyData()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to update contact details" }
    }
  }

  // Add company update
  const addUpdate = async (data: any) => {
    try {
      await api.createCompanyUpdate({
        ...data,
        company_id: companyId,
      })
      // Refresh updates
      fetchUpdates()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to add update" }
    }
  }

  // Add previous funds
  const addPreviousFunds = async (data: any) => {
    try {
      await api.createPreviousFunds({
        ...data,
        company_id: companyId,
      })
      // Refresh previous funds
      // fetchPreviousFunds()
      fetchCompanyData()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to add previous funds" }
    }
  }

  // Add financial metrics
  const addFinancialMetrics = async (data: any) => {
    try {
      await api.addFinancialMetrics({
        ...data,
        company_id: companyId,
      })
      // Refresh financial metrics
      // fetchFinancialMetrics()
      fetchCompanyData()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to add financial metrics" }
    }
  }

  // Add director with all related information
  const addDirector = async (directorData: any) => {
    try {
      // Step 1: Create director details
      const directorResponse = await api.createDirectorDetails({
        company_id: companyId,
        first_name: directorData.first_name,
        last_name: directorData.last_name,
        title: directorData.title,
        dob: directorData.dob,
        marital_status: directorData.marital_status,
        email: directorData.email,
        nationality: directorData.nationality,
      })

      const employeeId = directorResponse.employee_id

      // Step 2: Create director position if provided
      if (directorData.position) {
        await api.createDirectorPosition({
          employee_id: employeeId,
          overall_position: directorData.position.overall_position || "Director",
          position: directorData.position.position,
          start_date: directorData.position.start_date,
          end_date: directorData.position.end_date,
          is_current: directorData.position.is_current,
        })
      }

      // Step 3: Create qualifications if provided
      if (directorData.qualifications && directorData.qualifications.length > 0) {
        for (const qualification of directorData.qualifications) {
          await api.createEducationalQualifications({
            employee_id: employeeId,
            institution: qualification.institution,
            education_type: qualification.education_type,
            field_of_study: qualification.field_of_study,
            year_obtained: qualification.year_obtained,
          })
        }
      }

      // Step 4: Create employment history if provided
      if (directorData.employment_history && directorData.employment_history.length > 0) {
        for (const employment of directorData.employment_history) {
          await api.createEmploymentHistory({
            employee_id: employeeId,
            company_name: employment.company_name,
            position: employment.position,
            start_date: employment.start_date,
            end_date: employment.end_date,
            achievements: employment.achievements,
            reason_for_leaving: employment.reason_for_leaving,
          })
        }
      }

      // Step 5: Create public information if provided
      if (directorData.public_info) {
        await api.createPublicInformation({
          employee_id: employeeId,
          public_profile: directorData.public_info.public_profile,
        })
      }

      // Step 6: Create awards if provided
      if (directorData.awards && directorData.awards.length > 0) {
        for (const award of directorData.awards) {
          await api.createAward({
            employee_id: employeeId,
            award: award.award,
            year: award.year,
            description: award.description,
          })
        }
      }

      // Refresh directors
      fetchDirectors()
      return { success: true, employeeId }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to add director" }
    }
  }

  // Upload document
  const uploadDocument = async (file: File) => {
    try {
      await api.uploadCompanyDocument({
        companyId,
        file
      })
      // Refresh documents
      fetchDocuments()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to upload document" }
    }
  }

  // Upload logo
  const uploadLogo = async (file: File) => {
    try {
      await api.uploadCompanyLogo(companyId, file)
      // Refresh company data
      fetchCompanyData()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to upload logo" }
    }
  }

  // Fetch employee data
  const fetchEmployeeData = async (employeeId: number) => {
    try {
      const data = await api.getEmployeeCombinedData(employeeId)
      setEmployeeData(data)
      return { success: true }
    } catch (err: any) {
      setError(err.message || "Failed to fetch employee data")
      return { success: false, error: err.message || "Failed to fetch employee data" }
    }
  }

  // Delete document
  const deleteDocument = async (documentId: number) => {
    try {
      await api.deleteCompanyDocument(documentId)
      // Refresh documents
      fetchDocuments()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to delete document" }
    }
  }

  const updateFinancialMetrics = async (data: any) => {
    try {
      await api.updateFinancialMetrics({
        ...data,
        company_id: companyId,
      })
      // Refresh financial metrics
      // fetchFinancialMetrics()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to update financial metrics" }
    }
  }

  // Delete previous funds
  const deletePreviousFunds = async (fundId: number) => {
    try {
      await api.deletePreviousFunds(fundId)
      // Refresh previous funds
      // fetchPreviousFunds()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to delete funding record" }
    }
  }

  // Initialize data on mount
  useEffect(() => {
    if (companyId) {
      fetchAllCompanyData()
    }
  }, [companyId])

  return {
    // Data states
    companyData,
    employeeData,
    companyValuations,
    companyDocuments,
    directors,
    // documents,
    updates,
    previousFunds,
    financialMetrics,

    // Loading and error states
    loading,
    error,
    dataLoaded,
    apiErrors,
    loadingStates,

    // Data availability checks
    hasData,

    // Refresh functions
    updateCompany,
    updateContactData,
    updateStockMarket,
    addUpdate,
    addDirector,
    fetchEmployeeData,

    uploadDocument,
    uploadLogo,
    deleteDocument,

    addPreviousFunds,
    addFinancialMetrics,
    updateFinancialMetrics,
    deletePreviousFunds,


    refreshData,
    // refreshSummary: fetchSummary,
    refreshValuations: fetchValuations,
    // refreshDetails: fetchDetails,
    refreshDocuments: fetchDocuments,
    refreshDirectors: fetchDirectorsData,
    refreshUpdates: fetchUpdatesData,
    refreshPreviousFunds: fetchPreviousFundsData,
    // refreshFinancialMetrics: fetchFinancialMetricsData,

    // Utility functions
    clearError,
  }
}
