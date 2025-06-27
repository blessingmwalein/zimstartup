"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { Building2, MapPin, Users, TrendingUp, DollarSign } from "lucide-react";
import { FilterOptions, useInvestmentData } from "@/hooks/useInvestmentData";
import MainLayout from "@/components/Layouts/MainLayout";
import CustomButton from "@/components/Companies/ui/custom-button";

interface FilterState {
  status: string;
  location: string;
  request_type: string;
  region: string;
  request_status: string;
  grade: string;
  min_completeness: number;
  max_completeness: number;
}

export default function SectorPage() {
  const params = useParams();
  const router = useRouter();
  const sector = params.sector as string;
  const { companies, loading, error, getSectorCompanies } = useInvestmentData(null);

  const [filters, setFilters] = useState<FilterOptions>({});
  const [totalCompanies, setTotalCompanies] = useState(0);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await getSectorCompanies(sector, filters);
        setTotalCompanies(data.total_companies);
      } catch (err) {
        console.error("Failed to load companies:", err);
      }
    };

    loadCompanies();
  }, [sector, filters, getSectorCompanies]);

  const handleInvestNowClick = (companyId: number) => {
    router.push(`/companies/${encodeURIComponent(companyId)}`);
  };

  const handleFilterChange = (
    key: keyof FilterState,
    value: string | number,
    checked: boolean,
  ) => {
    if (checked) {
      setFilters((prev) => ({ ...prev, [key]: value }));
    } else {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      });
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGradeBadgeColor = (grade: string) => {
    switch (grade?.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "average":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "risky":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending check":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-80">
            <div className="sticky top-8 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="p-6">
                <h3 className="mb-6 text-lg font-semibold text-slate-800">
                  Filter Companies
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-700">
                      Company Type
                    </label>
                    <div className="space-y-3">
                      {["StartUps", "Established", "Growth Stage"].map(
                        (type) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={type}
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                              onChange={(e) =>
                                handleFilterChange(
                                  "status",
                                  type,
                                  e.target.checked,
                                )
                              }
                            />
                            <label
                              htmlFor={type}
                              className="cursor-pointer text-sm text-slate-600"
                            >
                              {type}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-700">
                      Location
                    </label>
                    <div className="space-y-3">
                      {["Zimbabwe", "South Africa", "Kenya", "Nigeria"].map(
                        (location) => (
                          <div
                            key={location}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={location}
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                              onChange={(e) =>
                                handleFilterChange(
                                  "location",
                                  location,
                                  e.target.checked,
                                )
                              }
                            />
                            <label
                              htmlFor={location}
                              className="cursor-pointer text-sm text-slate-600"
                            >
                              {location}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-700">
                      Investment Type
                    </label>
                    <div className="space-y-3">
                      {[
                        "Equity Financing",
                        "Debt Financing",
                        "Company Acquisitions",
                      ].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={type}
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                            onChange={(e) =>
                              handleFilterChange(
                                "request_type",
                                type,
                                e.target.checked,
                              )
                            }
                          />
                          <label
                            htmlFor={type}
                            className="cursor-pointer text-sm text-slate-600"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-700">
                      Risk Grade
                    </label>
                    <div className="space-y-3">
                      {["EXCELLENT", "GOOD", "AVERAGE", "RISKY"].map(
                        (grade) => (
                          <div
                            key={grade}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={grade}
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                              onChange={(e) =>
                                handleFilterChange(
                                  "grade",
                                  grade,
                                  e.target.checked,
                                )
                              }
                            />
                            <label
                              htmlFor={grade}
                              className="cursor-pointer text-sm text-slate-600"
                            >
                              {grade}
                            </label>
                          </div>
                        ),
                      )}
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
                  <h1 className="mb-2 text-4xl font-bold capitalize text-slate-800">
                    {sector}
                  </h1>
                  <p className="text-slate-600">
                    {loading
                      ? "Loading..."
                      : `${totalCompanies} companies available for investment`}
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
                    <div
                      key={index}
                      className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
                    >
                      <div className="p-8">
                        <div className="flex items-start space-x-6">
                          <div className="h-24 w-24 flex-shrink-0 animate-pulse rounded-xl bg-gray-200"></div>
                          <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                              <div className="h-7 w-64 animate-pulse rounded bg-gray-200"></div>
                              <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-4 w-28 animate-pulse rounded bg-gray-200"></div>
                              <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                              <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 space-y-3 text-right">
                            <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
                            <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
                            <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : companies.map((company) => (
                    <div
                      key={company.company_id}
                      className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-lg"
                    >
                      <div className="p-8">
                        <div className="flex items-start justify-between">
                          {/* Left Section - Company Info */}
                          <div className="flex flex-1 items-start space-x-6">
                            {/* Company Logo */}
                            <div className="relative flex-shrink-0">
                              <div className="h-24 w-24 overflow-hidden rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100">
                                <Image
                                  src={
                                    company.company_logo
                                      ? `https://zimstartup-861d8915d228.herokuapp.com/${company.company_logo}`
                                      : "/placeholder.svg"
                                  }
                                  alt={company.company_name}
                                  width={96}
                                  height={96}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              {/* Grade Badge */}
                              <div className="absolute -right-2 -top-2">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${getGradeBadgeColor(company.grade)}`}
                                >
                                  {company.grade}
                                </span>
                              </div>
                            </div>

                            {/* Company Details */}
                            <div className="flex-1 space-y-4">
                              {/* Header */}
                              <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                  <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                                    {company.company_name}
                                  </h3>
                                  <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusBadgeColor(company.status)}`}
                                  >
                                    {company.status}
                                  </span>
                                </div>
                                <p className="font-medium text-gray-600">
                                  {company.state_name}
                                </p>
                              </div>

                              {/* Stats Grid */}
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">
                                    {company.location}, {company.region}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <Users className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">
                                    {company.employees} employees
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <TrendingUp className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">
                                    {company.completeness_score ?? 0}% complete
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Section - Investment Info & Action */}
                          <div className="ml-8 flex flex-shrink-0 flex-col items-end space-y-6">
                            {/* Investment Details */}
                            <div className="space-y-3 text-right">
                              <div className="space-y-1">
                                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                  {company.request_type}
                                </p>
                                {company.requests[0] && (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-end space-x-1">
                                      <DollarSign className="h-5 w-5 text-emerald-600" />
                                      <span className="text-3xl font-bold text-gray-900">
                                        {formatCurrency(
                                          company.requests[0].amount ||
                                            company.requests[0].asking_price ||
                                            0,
                                          company.requests[0].currency,
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-end space-x-4 text-sm text-gray-600">
                                      {company.requests[0].equity_offered && (
                                        <span className="rounded-md bg-gray-50 px-2 py-1">
                                          {company.requests[0].equity_offered}%
                                          equity
                                        </span>
                                      )}
                                      {company.requests[0].funding_round && (
                                        <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">
                                          {company.requests[0].funding_round}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Button */}
                            <CustomButton
                              variant="solid"
                              color="#10b981"
                              type="button"
                              onClick={() =>
                                handleInvestNowClick(company.company_id)
                              }
                            >
                              Invest Now
                            </CustomButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {!loading && companies.length === 0 && !error && (
              <div className="rounded-lg border border-gray-200 bg-white py-12 text-center shadow-sm">
                <div className="p-6">
                  <Building2 className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                  <h3 className="mb-2 text-xl font-semibold text-slate-700">
                    No companies found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
