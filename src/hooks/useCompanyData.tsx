"use client"

import { useState, useEffect } from "react"
import * as api from "../../state/services/company"
import type { CreateCompanyRequest } from "../../state/models/company"
import type { UpdateContactInforRequest } from "../../state/models/employement"

export function useCompanyData(companyId: number) {
  const [companyData, setCompanyData] = useState<any>(null)
  const [employeeData, setEmployeeData] = useState<any>(null)
  const [directors, setDirectors] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [updates, setUpdates] = useState<any[]>([])
  const [previousFunds, setPreviousFunds] = useState<any[]>([])
  const [financialMetrics, setFinancialMetrics] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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
        fetchPreviousFunds(),
        fetchFinancialMetrics(),
      ])

      setLoading(false)
    } catch (err: any) {
      setError(err.message || "Failed to fetch company data")
      setLoading(false)
    }
  }

  const fetchDirectors = async () => {
    try {
      const data = await api.getCompanyDirectors(companyId)
      setDirectors(data.post_details || [])
    } catch (err: any) {
      console.error("Failed to fetch directors:", err)
    }
  }

  const fetchDocuments = async () => {
    try {
      const data = await api.getCompanyDocuments(companyId)
      setDocuments(data.documents || [])
    } catch (err: any) {
      console.error("Failed to fetch documents:", err)
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

  const fetchPreviousFunds = async () => {
    try {
      const data = await api.getPreviousFunds(companyId)
      setPreviousFunds(data.funds || [])
    } catch (err: any) {
      console.error("Failed to fetch previous funds:", err)
      setPreviousFunds([])
    }
  }

  const fetchFinancialMetrics = async () => {
    try {
      const data = await api.getFinancialMetrics(companyId)
      setFinancialMetrics(data.metrics || null)
    } catch (err: any) {
      console.error("Failed to fetch financial metrics:", err)
      setFinancialMetrics(null)
    }
  }

  // Update company details
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

  // Update contact details
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
      fetchPreviousFunds()
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
      fetchFinancialMetrics()
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
      await api.uploadCompanyDocument(companyId, file)
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

  // Update financial metrics
  const updateFinancialMetrics = async (data: any) => {
    try {
      await api.updateFinancialMetrics({
        ...data,
        company_id: companyId,
      })
      // Refresh financial metrics
      fetchFinancialMetrics()
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
      fetchPreviousFunds()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to delete funding record" }
    }
  }

  useEffect(() => {
    if (companyId) {
      fetchCompanyData()
    }
  }, [companyId])

  return {
    // Data
    companyData,
    directors,
    documents,
    updates,
    previousFunds,
    financialMetrics,
    employeeData,
    loading,
    error,

    // Company operations
    updateCompany,
    updateContactData,
    refreshData: fetchCompanyData,

    // Stock market operations
    updateStockMarket,

    // Updates operations
    addUpdate,

    // Director operations
    addDirector,
    fetchEmployeeData,

    // Document operations
    uploadDocument,
    uploadLogo,
    deleteDocument,

    // Financial operations
    addPreviousFunds,
    addFinancialMetrics,
    updateFinancialMetrics,
    deletePreviousFunds,

    // Refresh individual sections
    refreshDirectors: fetchDirectors,
    refreshDocuments: fetchDocuments,
    refreshUpdates: fetchUpdates,
    refreshPreviousFunds: fetchPreviousFunds,
    refreshFinancialMetrics: fetchFinancialMetrics,
  }
}
