"use client"

import { useState, useCallback, useRef } from "react"
import { searchCompanies as apiSearchCompanies } from "@/state/services/company"
import { CompanySearchResult } from "@/state/models/company"
import { handleApiError } from "@/state/services/investment"

export function useCompanySearch() {
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const search = useCallback(async (query: string) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    if (!query || query.trim() === "") {
      setSearchResults([])
      setLoading(false)
      setError(null)
      return
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()
    
    setLoading(true)
    setError(null)

    try {
      const response = await apiSearchCompanies(query)
      setSearchResults(response.companies)
    } catch (err: any) {
      // Don't set error if request was aborted
      if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
        setError(handleApiError(err))
        setSearchResults([])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setSearchResults([])
    setError(null)
    setLoading(false)
  }, [])

  return {
    searchResults,
    loading,
    error,
    search,
    clearResults,
  }
} 