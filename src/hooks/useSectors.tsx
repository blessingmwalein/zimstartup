"use client"

import { useState, useEffect, useCallback } from "react"
import {
  TrendingUp,
  Building2,
  Factory,
  Landmark,
  ShoppingBag,
  Leaf,
  Cpu,
  Pill,
  Radio,
  Hammer,
  Droplets,
} from "lucide-react"
import { fetchIndustries, fetchSectors, handleApiError } from "../../state/services/investment"

interface Sector {
  id: number
  name: string
  companyCount: number
  icon: any
}

interface Industry {
  id: number
  industry_name: string
  status: string
  created_at: string
}

export function useSectors() {
  const [sectors, setSectors] = useState<Sector[]>([])
  const [industries, setIndustries] = useState<Industry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Default sectors with icons if API doesn't return data
  const defaultSectors: Sector[] = [
    { id: 1, name: "Pharmaceuticals", companyCount: 0, icon: Pill },
    { id: 2, name: "Technology", companyCount: 3, icon: Cpu },
    { id: 3, name: "Retail", companyCount: 4, icon: ShoppingBag },
    { id: 4, name: "Beverages", companyCount: 2, icon: Droplets },
    { id: 5, name: "Gvt", companyCount: 1, icon: Landmark },
    { id: 6, name: "Engineering", companyCount: 1, icon: Hammer },
    { id: 7, name: "Banking", companyCount: 0, icon: Building2 },
    { id: 8, name: "Energy", companyCount: 1, icon: TrendingUp },
    { id: 9, name: "Communications", companyCount: 1, icon: Radio },
    { id: 10, name: "Health", companyCount: 1, icon: Pill },
    { id: 11, name: "Mining", companyCount: 1, icon: Factory },
    { id: 12, name: "Agriculture", companyCount: 1, icon: Leaf },
  ]

  const getSectors = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchSectors()
      // If API returns data, map it to our format, otherwise use defaults
      if (data && Array.isArray(data)) {
        const mappedSectors = data.map((sector: any, index: number) => ({
          id: sector.id || index + 1,
          name: sector.name || sector.sector_name || `Sector ${index + 1}`,
          companyCount: sector.company_count || sector.companyCount || 0,
          icon:
            defaultSectors.find(
              (ds) => ds.name.toLowerCase() === (sector.name || sector.sector_name || "").toLowerCase(),
            )?.icon || Building2,
        }))
        setSectors(mappedSectors)
      } else {
        setSectors(defaultSectors)
      }
    } catch (err) {
      console.error("Failed to fetch sectors, using defaults:", err)
      setSectors(defaultSectors)
      setError(handleApiError(err))
    } finally {
      setLoading(false)
    }
  }, [])

  const getIndustries = useCallback(async () => {
    try {
      const data = await fetchIndustries()
      setIndustries(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to fetch industries:", err)
      setIndustries([])
    }
  }, [])

  useEffect(() => {
    // Initialize with default sectors immediately
    setSectors(defaultSectors)

    // Then try to fetch from API
    getSectors()
    getIndustries()
  }, [getSectors, getIndustries])

  return {
    sectors,
    industries,
    loading,
    error,
    getSectors,
    getIndustries,
  }
}
