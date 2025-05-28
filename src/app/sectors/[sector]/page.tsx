"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

import { Building2, MapPin, Users, TrendingUp, DollarSign } from "lucide-react"
import { FilterOptions, useInvestmentData } from "@/hooks/useInvestmentData"
import MainLayout from "@/components/Layouts/MainLayout"
import CustomButton from "@/components/Companies/ui/custom-button"

interface FilterState {
    company_status: string
    location: string
    request_type: string
    region: string
    request_status: string
    grade: string
    min_completeness: number
    max_completeness: number
}

export default function SectorPage() {
    const params = useParams()
    const sector = params.sector as string
    const { companies, loading, error, getSectorCompanies } = useInvestmentData()

    const [filters, setFilters] = useState<FilterOptions>({})
    const [totalCompanies, setTotalCompanies] = useState(0)

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                const data = await getSectorCompanies(sector, filters)
                setTotalCompanies(data.total_companies)
            } catch (err) {
                console.error("Failed to load companies:", err)
            }
        }

        loadCompanies()
    }, [sector, filters, getSectorCompanies])

    const handleFilterChange = (key: keyof FilterState, value: string | number, checked: boolean) => {
        if (checked) {
            setFilters((prev) => ({ ...prev, [key]: value }))
        } else {
            setFilters((prev) => {
                const newFilters = { ...prev }
                delete newFilters[key]
                return newFilters
            })
        }
    }

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const getGradeBadgeColor = (grade: string) => {
        switch (grade?.toLowerCase()) {
            case "excellent":
                return "bg-green-100 text-green-800 border-green-200"
            case "good":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "average":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "risky":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getStatusBadgeColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800 border-green-200"
            case "pending check":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "inactive":
                return "bg-gray-100 text-gray-800 border-gray-200"
            default:
                return "bg-blue-100 text-blue-800 border-blue-200"
        }
    }

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-80">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
                            <div className="p-6">
                                <h3 className="font-semibold text-lg mb-6 text-slate-800">Filter Companies</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 mb-3 block">Company Type</label>
                                        <div className="space-y-3">
                                            {["StartUps", "Established", "Growth Stage"].map((type) => (
                                                <div key={type} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id={type}
                                                        className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                                                        onChange={(e) => handleFilterChange("company_status", type, e.target.checked)}
                                                    />
                                                    <label htmlFor={type} className="text-sm text-slate-600 cursor-pointer">
                                                        {type}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-700 mb-3 block">Location</label>
                                        <div className="space-y-3">
                                            {["Zimbabwe", "South Africa", "Kenya", "Nigeria"].map((location) => (
                                                <div key={location} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id={location}
                                                        className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                                                        onChange={(e) => handleFilterChange("location", location, e.target.checked)}
                                                    />
                                                    <label htmlFor={location} className="text-sm text-slate-600 cursor-pointer">
                                                        {location}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-700 mb-3 block">Investment Type</label>
                                        <div className="space-y-3">
                                            {["Equity Financing", "Debt Financing", "Company Acquisitions"].map((type) => (
                                                <div key={type} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id={type}
                                                        className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                                                        onChange={(e) => handleFilterChange("request_type", type, e.target.checked)}
                                                    />
                                                    <label htmlFor={type} className="text-sm text-slate-600 cursor-pointer">
                                                        {type}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-700 mb-3 block">Risk Grade</label>
                                        <div className="space-y-3">
                                            {["EXCELLENT", "GOOD", "AVERAGE", "RISKY"].map((grade) => (
                                                <div key={grade} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id={grade}
                                                        className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                                                        onChange={(e) => handleFilterChange("grade", grade, e.target.checked)}
                                                    />
                                                    <label htmlFor={grade} className="text-sm text-slate-600 cursor-pointer">
                                                        {grade}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-4xl font-bold text-slate-800 capitalize mb-2">{sector}</h1>
                                    <p className="text-slate-600">
                                        {loading ? "Loading..." : `${totalCompanies} companies available for investment`}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Building2 className="h-8 w-8 text-emerald-600" />
                                </div>
                            </div>
                        </div>

                        {/* {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-800">Error: {error}</p>
                            </div>
                        )} */}

                        <div className="space-y-6">
                            {loading
                                ? // Loading skeletons
                                Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="p-6">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                                                <div className="flex-1 space-y-3">
                                                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                                                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                                </div>
                                                <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : companies.map((company) => (
                                    <div
                                        key={company.company_id}
                                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-6">
                                                    <div className="relative">
                                                        <img
                                                            src={
                                                                company.company_logo
                                                                    ? `https://zimstartup-861d8915d228.herokuapp.com/${company.company_logo}`
                                                                    : "/placeholder.svg?height=80&width=80"
                                                            }
                                                            alt={company.company_name}
                                                            className="w-20 h-20 rounded-lg object-cover border-2 border-slate-200"
                                                        />
                                                        <div className="absolute -top-2 -right-2">
                                                            <span
                                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getGradeBadgeColor(company.grade)}`}
                                                            >
                                                                {company.grade}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-3">
                                                            <h3 className="text-xl font-semibold text-slate-800">{company.company_name}</h3>
                                                            <span
                                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(company.status)}`}
                                                            >
                                                                {company.status}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                                                            <div className="flex items-center space-x-1">
                                                                <MapPin className="h-4 w-4" />
                                                                <span>
                                                                    {company.location}, {company.region}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Users className="h-4 w-4" />
                                                                <span>{company.employees} employees</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <TrendingUp className="h-4 w-4" />
                                                                <span>{company.completeness_score}% complete</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-slate-500">{company.state_name}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-8">
                                                    <div className="text-right">
                                                        <h4 className="font-semibold text-slate-700 mb-2">Investment Details</h4>
                                                        <div className="space-y-1 text-sm">
                                                            <p className="text-slate-600">
                                                                Type: <span className="font-medium">{company.request_type}</span>
                                                            </p>
                                                            {company.requests[0] && (
                                                                <>
                                                                    <div className="flex items-center space-x-1">
                                                                        <DollarSign className="h-4 w-4 text-emerald-600" />
                                                                        <span className="font-semibold text-lg text-slate-800">
                                                                            {formatCurrency(
                                                                                company.requests[0].amount || company.requests[0].asking_price || 0,
                                                                                company.requests[0].currency,
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    {company.requests[0].equity_offered && (
                                                                        <p className="text-slate-600">
                                                                            Equity:{" "}
                                                                            <span className="font-medium">{company.requests[0].equity_offered}%</span>
                                                                        </p>
                                                                    )}
                                                                    {company.requests[0].funding_round && (
                                                                        <p className="text-slate-600">
                                                                            Round: <span className="font-medium">{company.requests[0].funding_round}</span>
                                                                        </p>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col space-y-3">
                                                        <Link href={`/companies/${company.company_id}`}>
                                                            <CustomButton variant="solid" type={"button"}  >
                                                                View Details
                                                            </CustomButton>
                                                        </Link>
                                                        <CustomButton variant="outlined" color="#10b981" type={"button"}  >
                                                            Invest Now
                                                        </CustomButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {!loading && companies.length === 0 && !error && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 text-center py-12">
                                <div className="p-6">
                                    <Building2 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No companies found</h3>
                                    <p className="text-slate-500">Try adjusting your filters to see more results.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
