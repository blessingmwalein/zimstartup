"use client"

import { useState, useCallback, useEffect } from "react"
import { YouthHubMessage, YouthHubRequest, YouthHubResponse } from "@/state/models/youthHub"
import { getYouthHubMessage, createYouthHubRequest, getYouthHubRequests } from "@/state/services/youthHub"

export function useYouthHub() {
  const [youthHubMessage, setYouthHubMessage] = useState<YouthHubMessage | null>(null)
  const [youthHubRequests, setYouthHubRequests] = useState<YouthHubResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [loadingStates, setLoadingStates] = useState({
    message: false,
    requests: false,
    create: false
  })

  // Generic error handler
  const handleError = useCallback((err: any, context: string) => {
    const errorMessage = err?.response?.data?.message || err?.message || "An error occurred"
    console.warn(`${context}:`, errorMessage)
    setError(`${context}: ${errorMessage}`)
  }, [])

  // Get Youth Hub message
  const fetchYouthHubMessage = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, message: true }))
    setError(null)

    try {
      const data = await getYouthHubMessage()
      setYouthHubMessage(data)
      return data
    } catch (err) {
      handleError(err, "Failed to load Youth Hub message")
      return null
    } finally {
      setLoadingStates((prev) => ({ ...prev, message: false }))
    }
  }, [handleError])

  // Get Youth Hub requests
  const fetchYouthHubRequests = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, requests: true }))
    setError(null)

    try {
      const data = await getYouthHubRequests()
      setYouthHubRequests(data.data || [])
      return data
    } catch (err) {
      handleError(err, "Failed to load Youth Hub requests")
      return { data: [] }
    } finally {
      setLoadingStates((prev) => ({ ...prev, requests: false }))
    }
  }, [handleError])

  // Create Youth Hub request
  const createRequest = useCallback(async (requestData: YouthHubRequest) => {
    setLoadingStates((prev) => ({ ...prev, create: true }))
    setError(null)

    try {
      const data = await createYouthHubRequest(requestData)
      // Refresh the requests list after creating
      await fetchYouthHubRequests()
      return { success: true, message: "Youth Hub request created successfully!", data }
    } catch (err) {
      handleError(err, "Failed to create Youth Hub request")
      return { success: false, message: err?.response?.data?.message || "Failed to create request" }
    } finally {
      setLoadingStates((prev) => ({ ...prev, create: false }))
    }
  }, [handleError, fetchYouthHubRequests])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Refresh data
  const refreshData = useCallback(() => {
    fetchYouthHubMessage()
    fetchYouthHubRequests()
  }, [fetchYouthHubMessage, fetchYouthHubRequests])

  useEffect(() => {
    // Load initial data
    fetchYouthHubMessage()
    fetchYouthHubRequests()
  }, [fetchYouthHubMessage, fetchYouthHubRequests])

  return {
    // State
    youthHubMessage,
    youthHubRequests,
    loading,
    loadingStates,
    error,

    // Actions
    fetchYouthHubMessage,
    fetchYouthHubRequests,
    createRequest,
    clearError,
    refreshData,
  }
}

// Export types for use in components
export type { YouthHubRequest, YouthHubResponse } 