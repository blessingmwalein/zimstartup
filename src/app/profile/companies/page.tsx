"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Plus, Search, Building2, Grid3x3, List } from "lucide-react"

import DefaultLayout from "@/components/Layouts/DefaultLayout"
import UserCompanyCard from "@/components/Companies/UserCompanyCard"
import CompanyCardSkeleton from "@/components/Companies/CompanyCardSkeleton"
import { fetchUserCompanies } from "@/state/slices/companySlice"
import { resetCompanyCreation } from "@/state/slices/companyCreationSlice"
import { AppDispatch } from "@/state/store"
import CustomButton from "@/components/Buttons/CustomButton"
import { useRouter } from "next/navigation"

const Companies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user } = useSelector((state: any) => state.auth)
  const { status, userCompanies } = useSelector((state: any) => state.company)

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const fetchCompanyList = async () => {
    try {
      await dispatch(fetchUserCompanies(user.national_id)).unwrap()
    } catch (err: any) {
      console.error("Error fetching companies:", err)
    }
  }

  useEffect(() => {
    fetchCompanyList()
  }, [])

  const handleAddCompany = () => {
    dispatch(resetCompanyCreation())
    router.push("/profile/companies/add-company")
  }

  // Filter companies based on search query
  const filteredCompanies = userCompanies?.filter((company: any) =>
    company.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.company_abbreviations.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 px-8 py-12 border-b border-gray-100">
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Your Companies</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Manage all your registered companies and organizations in one place
              </p>
            </div>

            <div className="flex w-full items-center overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <div className="pl-6 pr-2 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search by company name, abbreviation, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-4 text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <main className="container mx-auto px-6 py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                All Companies
                {filteredCompanies && (
                  <span className="ml-3 text-base font-normal text-gray-500">
                    ({filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'})
                  </span>
                )}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${viewMode === "grid"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${viewMode === "list"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <List className="h-4 w-4" />
                  <span>List</span>
                </button>
              </div>

              {/* Add Company Button */}
              <CustomButton
                onClick={handleAddCompany}
                type="button"
                variant="solid"
                isLoading={status === "loading"}
              >
                <Plus className="h-5 w-5" />
                Add New Company
              </CustomButton>
            </div>
          </div>

          {status === "loading" ? (
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-4"
            }>
              {[...Array(8)].map((_, index) => (
                <CompanyCardSkeleton key={index} viewMode={viewMode} />
              ))}
            </div>
          ) : filteredCompanies && filteredCompanies.length > 0 ? (
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-4"
            }>
              {filteredCompanies.map((company: any) => (
                <UserCompanyCard
                  key={company.company_id}
                  company={company}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-16 text-center">
              <Search className="mb-4 h-16 w-16 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">No companies found</h3>
              <p className="mb-6 max-w-md text-gray-600">
                No companies match "{searchQuery}". Try a different search term.
              </p>
              <CustomButton
                type="button"
                variant="outline"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </CustomButton>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50 p-16 text-center">
              <div className="rounded-full bg-blue-100 p-6 mb-6">
                <Building2 className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">No companies yet</h3>
              <p className="mb-8 max-w-md text-gray-600 leading-relaxed">
                You haven't added any companies yet. Start building your portfolio by adding your first company.
              </p>
              <CustomButton
                type="button"
                variant="solid"
                onClick={handleAddCompany}
              >
                <Plus className="h-5 w-5" />
                <span className="font-semibold">Add Your First Company</span>
              </CustomButton>
            </div>
          )}
        </main>
      </div>
    </DefaultLayout>
  )
}

export default Companies
