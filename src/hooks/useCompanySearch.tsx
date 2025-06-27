"use client"

import { useState } from "react"
import { searchCompanies as apiSearchCompanies } from "../../state/services/company"
import { CompanySearchResult } from "../../state/models/company"
import { handleApiError } from "../../state/services/investment"

export function useCompanySearch() {
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await apiSearchCompanies(query)
      setSearchResults(response.companies)
    } catch (err) {
      setError(handleApiError(err))
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  return {
    searchResults,
    loading,
    error,
    search,
  }
} 