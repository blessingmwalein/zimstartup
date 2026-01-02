"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Building2, MapPin, Users, TrendingUp, DollarSign, Calendar, X, Heart } from "lucide-react";
import { FilterOptions, useInvestmentData } from "@/hooks/useInvestmentData";
import MainLayout from "@/components/Layouts/MainLayout";
import CustomButton from "@/components/Companies/ui/custom-button";
import SelectDropdown from "@/components/FormElements/SelectDropdown";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { addToWatchlist } from "@/state/services/watchlist";
import { useAppSelector } from "@/state/store";
import { toast } from "react-toastify";

const COMPANY_STATUS_OPTIONS = [
  { value: "PENDING CHECK", label: "Pending Check" },
  { value: "ACTIVE", label: "Active" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "REJECTED", label: "Rejected" },
  { value: "BLACKLISTED", label: "Blacklisted" },
];

const REQUEST_TYPE_OPTIONS = [
  { value: "Company Acquisitions", label: "Company Acquisitions" },
  { value: "Equity Financing", label: "Equity Financing" },
  { value: "Project Financing", label: "Project Financing" },
  { value: "Revenue-Based Financing", label: "Revenue-Based Financing" },
];

const REGION_OPTIONS = [
  { value: "Northern Africa", label: "Northern Africa" },
  { value: "Sub-Saharan Africa", label: "Sub-Saharan Africa" },
  { value: "Eastern Africa", label: "Eastern Africa" },
  { value: "Middle Africa", label: "Middle Africa" },
  { value: "Southern Africa", label: "Southern Africa" },
  { value: "Western Africa", label: "Western Africa" },
];

const REQUEST_STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default function SectorPage() {
  const params = useParams();
  const router = useRouter();
  const sector = params.sector as string;
  const { companies, loading, error, getSectorCompanies } = useInvestmentData(null);
  const { user } = useAppSelector((state) => state.auth);

  const [filters, setFilters] = useState<FilterOptions>({});
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [addingToWatchlist, setAddingToWatchlist] = useState<number | null>(null);

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

  const handleAddToWatchlist = async (companyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user?.national_id) {
      toast.error("Please log in to add companies to your watchlist");
      return;
    }

    setAddingToWatchlist(companyId);
    
    try {
      const result = await addToWatchlist({
        national_id: user.national_id,
        company_id: companyId,
        watchlist_status: true,
      });

      if (result.watchlist_item) {
        toast.success("Company added to your watchlist!");
      }
    } catch (error: any) {
      console.error("Error adding to watchlist:", error);
      toast.error(error.response?.data?.detail || "Failed to add to watchlist");
    } finally {
      setAddingToWatchlist(null);
    }
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    if (value) {
      setFilters((prev) => ({ ...prev, [key]: value }));
    } else {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGradeBadgeColor = (grade: string | null) => {
    if (!grade) return "bg-gray-100 text-gray-800 border-gray-200";
    switch (grade.toLowerCase()) {
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
      case "suspended":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "rejected":
      case "blacklisted":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const handleImageError = (companyId: number) => {
    setImageErrors((prev) => new Set(prev).add(companyId));
  };

  const getCompanyImageSrc = (company: any) => {
    if (!company.company_logo || imageErrors.has(company.company_id)) {
      return "/companyplace.png";
    }
    return `/${company.company_logo}`;
  };

  const activeFiltersCount = Object.keys(filters).length;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-80">
            <div className="sticky top-8 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Filter Companies
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center space-x-1 text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      <X className="h-4 w-4" />
                      <span>Clear ({activeFiltersCount})</span>
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <SelectDropdown
                    label="Company Status"
                    value={filters.company_status || ""}
                    onChange={(value) => handleFilterChange("company_status", value)}
                    options={COMPANY_STATUS_OPTIONS}
                    placeholder="All statuses"
                  />

                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={filters.location || ""}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      placeholder="e.g., Harare"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition-colors hover:border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <SelectDropdown
                    label="Investment Type"
                    value={filters.request_type || ""}
                    onChange={(value) => handleFilterChange("request_type", value)}
                    options={REQUEST_TYPE_OPTIONS}
                    placeholder="All types"
                  />

                  <SelectDropdown
                    label="Region"
                    value={filters.region || ""}
                    onChange={(value) => handleFilterChange("region", value)}
                    options={REGION_OPTIONS}
                    placeholder="All regions"
                  />

                  <SelectDropdown
                    label="Request Status"
                    value={filters.request_status || ""}
                    onChange={(value) => handleFilterChange("request_status", value)}
                    options={REQUEST_STATUS_OPTIONS}
                    placeholder="All statuses"
                  />
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
                    {decodeURIComponent(sector)}
                  </h1>
                  <p className="text-slate-600">
                    {loading
                      ? "Loading..."
                      : `${totalCompanies} ${totalCompanies === 1 ? 'company' : 'companies'} available for investment`}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {loading ? (
                <SkeletonLoader variant="company-card" count={3} />
              ) : (
                companies.map((company) => {
                  const primaryRequest = company.requests[0];
                  const amount = primaryRequest?.amount || primaryRequest?.asking_price || 0;
                  
                  return (
                    <div
                      key={`${company.company_id}-${company.request_type}`}
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
                                  src={getCompanyImageSrc(company)}
                                  alt={company.company_name}
                                  width={96}
                                  height={96}
                                  className="h-full w-full object-cover"
                                  unoptimized={!company.company_logo}
                                  // onError={() => handleImageError(company.company_id)}
                                />
                              </div>
                              {/* Grade Badge */}
                              {company.grade && (
                                <div className="absolute -right-2 -top-2">
                                  <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${getGradeBadgeColor(company.grade)}`}
                                  >
                                    {company.grade}
                                  </span>
                                </div>
                              )}
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
                                    {company.location}{company.region && `, ${company.region}`}
                                  </span>
                                </div>
                                {company.employees > 0 && (
                                  <div className="flex items-center space-x-2 text-gray-600">
                                    <Users className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">
                                      {company.employees} employees
                                    </span>
                                  </div>
                                )}
                                {company.company_start_date && (
                                  <div className="flex items-center space-x-2 text-gray-600">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">
                                      Since {new Date(company.company_start_date).getFullYear()}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Completeness Score */}
                              {company.completeness_score != null && (
                                <div className="flex items-center space-x-2">
                                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-gray-600">Profile Completeness</span>
                                      <span className="font-semibold text-emerald-600">
                                        {company.completeness_score}%
                                      </span>
                                    </div>
                                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                                      <div
                                        className="h-full rounded-full bg-emerald-600"
                                        style={{ width: `${company.completeness_score}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Section - Investment Info & Action */}
                          <div className="ml-8 flex flex-shrink-0 flex-col items-end space-y-6">
                            {/* Investment Details */}
                            <div className="space-y-3 text-right">
                              <div className="space-y-1">
                                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                  {company.request_type || "Investment Opportunity"}
                                </p>
                                {primaryRequest && amount > 0 && (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-end space-x-1">
                                      <DollarSign className="h-5 w-5 text-emerald-600" />
                                      <span className="text-3xl font-bold text-gray-900">
                                        {formatCurrency(amount, primaryRequest.currency)}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-end gap-2 text-sm text-gray-600">
                                      {primaryRequest.equity_offered && (
                                        <span className="rounded-md bg-gray-50 px-2 py-1">
                                          {primaryRequest.equity_offered}% equity
                                        </span>
                                      )}
                                      {primaryRequest.funding_round && (
                                        <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">
                                          {primaryRequest.funding_round}
                                        </span>
                                      )}
                                      {primaryRequest.revenue_share && (
                                        <span className="rounded-md bg-purple-50 px-2 py-1 text-purple-700">
                                          {primaryRequest.revenue_share}% revenue share
                                        </span>
                                      )}
                                      {company.request_status && (
                                        <span className={`rounded-md px-2 py-1 ${
                                          company.request_status === 'APPROVED' ? 'bg-green-50 text-green-700' :
                                          company.request_status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
                                          'bg-red-50 text-red-700'
                                        }`}>
                                          {company.request_status}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => handleAddToWatchlist(company.company_id, e)}
                                disabled={addingToWatchlist === company.company_id}
                                className="rounded-lg border border-gray-300 p-3 text-gray-600 transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50"
                                title="Add to Watchlist"
                              >
                                {addingToWatchlist === company.company_id ? (
                                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                                ) : (
                                  <Heart className="h-5 w-5" />
                                )}
                              </button>
                              <CustomButton
                                variant="solid"
                                color="#10b981"
                                type="button"
                                onClick={() => handleInvestNowClick(company.company_id)}
                              >
                                View Details
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {!loading && companies.length === 0 && (
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
