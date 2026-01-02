"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AppDispatch, RootState } from "@/state/store";
import {
  fetchPortfolioSummary,
  fetchCompaniesOwned,
  fetchEquityInvestments,
  fetchProjectFinancing,
  fetchRevenueInvestments,
  fetchUpcomingPayments,
} from "@/state/slices/portfolioSlice";
import {
  TrendingUp,
  Building2,
  PieChart,
  DollarSign,
  Briefcase,
  Calendar,
  Globe,
  MapPin,
  BarChart3,
  Droplets,
  AlertCircle,
} from "lucide-react";
import SkeletonLoader from "@/components/common/SkeletonLoader";

type TabType = "diversity" | "companies" | "equity" | "projects" | "revenue" | "payments";

export default function PortfolioPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    summary,
    companiesOwned,
    equityInvestments,
    projectFinancing,
    revenueInvestments,
    upcomingPayments,
    loading,
    error,
  } = useSelector((state: RootState) => state.portfolio);

  const [activeTab, setActiveTab] = useState<TabType>("diversity");

  useEffect(() => {
    if (user?.national_id) {
      dispatch(fetchPortfolioSummary(user.national_id));
      dispatch(fetchCompaniesOwned(user.national_id));
      dispatch(fetchEquityInvestments(user.national_id));
      dispatch(fetchProjectFinancing(user.national_id));
      dispatch(fetchRevenueInvestments(user.national_id));
      dispatch(fetchUpcomingPayments(user.national_id));
    }
  }, [user, dispatch]);

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Parse summary data
  const totalInvestments = summary?.totals?.[0]?.total_investments || 0;
  const totalAmount = summary?.totals?.[0]?.total_value || 0;
  const currency = summary?.totals?.[0]?.currency || "USD";
  
  const tradableCount = summary?.liquidity?.tradable_count || 0;
  const tradableValue = summary?.liquidity?.tradable_value || 0;
  const totalCount = summary?.liquidity?.total_count || 0;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full p-4">
        {/* Page Header with Gradient */}
        <div className="mb-6 rounded-lg bg-gradient-to-r from-primary to-blue-600 p-6 text-white shadow-lg">
          <h1 className="mb-2 text-3xl font-bold">Investment Portfolio</h1>
          <p className="text-sm opacity-90">Track and manage all your investments in one place</p>
        </div>

        {/* Summary Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {/* Total Investments Card */}
          <div className="group rounded-lg border border-stroke bg-white p-6 shadow-default transition-all hover:shadow-xl dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {totalInvestments}
                </h4>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Investments</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-500 shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Total Value Card */}
          <div className="group rounded-lg border border-stroke bg-white p-6 shadow-default transition-all hover:shadow-xl dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {formatCurrency(totalAmount, currency)}
                </h4>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Portfolio Value</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-success to-green-500 shadow-lg group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Tradable Assets Card */}
          <div className="group rounded-lg border border-stroke bg-white p-6 shadow-default transition-all hover:shadow-xl dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {tradableCount}
                </h4>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tradable Assets</span>
                <p className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {formatCurrency(tradableValue, currency)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg group-hover:scale-110 transition-transform">
                <Droplets className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Total Count Card */}
          <div className="group rounded-lg border border-stroke bg-white p-6 shadow-default transition-all hover:shadow-xl dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {totalCount}
                </h4>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Holdings</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              <button
                onClick={() => setActiveTab("diversity")}
                className={`flex flex-col items-center gap-2 rounded-lg px-4 py-4 font-medium transition-all ${
                  activeTab === "diversity"
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-meta-4 dark:text-gray-400 dark:hover:bg-opacity-80"
                }`}
              >
                {summary?.diversity && (
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    activeTab === "diversity" 
                      ? "bg-white/20 text-white" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    {summary.diversity.length}
                  </span>
                )}
                <span className="text-sm">
                  Portfolio Diversity
                </span>
              </button>
              <button
                onClick={() => setActiveTab("companies")}
                className={`flex flex-col items-center gap-2 rounded-lg px-4 py-4 font-medium transition-all ${
                  activeTab === "companies"
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-meta-4 dark:text-gray-400 dark:hover:bg-opacity-80"
                }`}
              >
                {companiesOwned?.companies_owned && (
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    activeTab === "companies" 
                      ? "bg-white/20 text-white" 
                      : "bg-success/10 text-success"
                  }`}>
                    {companiesOwned.companies_owned.length}
                  </span>
                )}
                <span className="text-sm">
                  Companies Owned
                </span>
              </button>
              <button
                onClick={() => setActiveTab("equity")}
                className={`flex flex-col items-center gap-2 rounded-lg px-4 py-4 font-medium transition-all ${
                  activeTab === "equity"
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-meta-4 dark:text-gray-400 dark:hover:bg-opacity-80"
                }`}
              >
                {equityInvestments?.equity_investments && (
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    activeTab === "equity" 
                      ? "bg-white/20 text-white" 
                      : "bg-warning/10 text-warning"
                  }`}>
                    {equityInvestments.equity_investments.length}
                  </span>
                )}
                <span className="text-sm">
                  Equity Investments
                </span>
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex flex-col items-center gap-2 rounded-lg px-4 py-4 font-medium transition-all ${
                  activeTab === "projects"
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-meta-4 dark:text-gray-400 dark:hover:bg-opacity-80"
                }`}
              >
                {projectFinancing?.project_investments && (
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    activeTab === "projects" 
                      ? "bg-white/20 text-white" 
                      : "bg-blue-500/10 text-blue-600"
                  }`}>
                    {projectFinancing.project_investments.length}
                  </span>
                )}
                <span className="text-sm">
                  Project Financing
                </span>
              </button>
              <button
                onClick={() => setActiveTab("revenue")}
                className={`flex flex-col items-center gap-2 rounded-lg px-4 py-4 font-medium transition-all ${
                  activeTab === "revenue"
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-meta-4 dark:text-gray-400 dark:hover:bg-opacity-80"
                }`}
              >
                {revenueInvestments?.revenue_investments && (
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    activeTab === "revenue" 
                      ? "bg-white/20 text-white" 
                      : "bg-green-500/10 text-green-600"
                  }`}>
                    {revenueInvestments.revenue_investments.length}
                  </span>
                )}
                <span className="text-sm">
                  Revenue-Based
                </span>
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`flex flex-col items-center gap-2 rounded-lg px-4 py-4 font-medium transition-all ${
                  activeTab === "payments"
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-meta-4 dark:text-gray-400 dark:hover:bg-opacity-80"
                }`}
              >
                {upcomingPayments?.upcoming_payments && (
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    activeTab === "payments" 
                      ? "bg-white/20 text-white" 
                      : "bg-purple-500/10 text-purple-600"
                  }`}>
                    {upcomingPayments.upcoming_payments.length}
                  </span>
                )}
                <span className="text-sm">
                  Upcoming Payments
                </span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Portfolio Diversity Tab */}
            {activeTab === "diversity" && (
              <>
                {summary?.diversity && summary.diversity.length > 0 ? (
                  <div>
                    <h3 className="mb-4 flex items-center text-xl font-semibold text-black dark:text-white">
                      <PieChart className="mr-2 h-5 w-5" />
                      Portfolio Diversity
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Sector
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Investment Type
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Count
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {summary.diversity.map((item, index) => (
                            <tr key={index} className="border-b border-stroke dark:border-strokedark">
                              <td className="px-4 py-4">
                                <span className="font-medium text-black dark:text-white">
                                  {item.sector}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="text-sm">{item.investment_type}</span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                  {item.count}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold text-black dark:text-white">
                                  {formatCurrency(item.total_value, currency)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <AlertCircle className="mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                      No Portfolio Diversity Data
                    </h3>
                    <p className="text-gray-500">
                      Start investing in different sectors to diversify your portfolio.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Companies Owned Tab */}
            {activeTab === "companies" && (
              <>
                {companiesOwned?.companies_owned && companiesOwned.companies_owned.length > 0 ? (
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      Companies Owned ({companiesOwned.companies_owned.length})
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Company
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Sector
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Location
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Ownership %
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Amount Invested
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Investment Date
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Website
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {companiesOwned.companies_owned.map((company, index) => (
                            <tr key={index} className="border-b border-stroke dark:border-strokedark">
                              <td className="px-4 py-4">
                                <div>
                                  <p className="font-medium text-black dark:text-white">
                                    {company.company_name}
                                  </p>
                                  {company.company_short_description && (
                                    <p className="text-sm text-gray-500">{company.company_short_description}</p>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary">
                                  {company.sector}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="flex items-center text-sm">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {company.location}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold text-success">{company.acquisition_percentage}%</span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold text-black dark:text-white">
                                  {formatCurrency(company.amount_invested, company.currency)}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="text-sm">{formatDate(company.investment_date)}</span>
                              </td>
                              <td className="px-4 py-4">
                                {company.website && (
                                  <a
                                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-primary hover:underline"
                                  >
                                    <Globe className="mr-1 h-4 w-4" />
                                    Visit
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Building2 className="mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                      No Companies Owned
                    </h3>
                    <p className="text-gray-500">
                      Invest in companies to see them here.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Equity Investments Tab */}
            {activeTab === "equity" && (
              <>
                {equityInvestments?.equity_investments && equityInvestments.equity_investments.length > 0 ? (
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      Equity Investments ({equityInvestments.equity_investments.length})
                    </h3>
                    <div className="text-center text-gray-500">
                      Equity investments data will be displayed here.
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <BarChart3 className="mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                      No Equity Investments
                    </h3>
                    <p className="text-gray-500">
                      Invest in equity-based opportunities to see them here.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Project Financing Tab */}
            {activeTab === "projects" && (
              <>
                {projectFinancing?.project_investments && projectFinancing.project_investments.length > 0 ? (
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      Project Financing ({projectFinancing.project_investments.length})
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Project / Company
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Location
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Sector
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Stage
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Share %
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Amount Invested
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Projected Returns
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectFinancing.project_investments.map((project, index) => (
                            <tr key={index} className="border-b border-stroke dark:border-strokedark">
                              <td className="px-4 py-4">
                                <div>
                                  <p className="font-medium text-black dark:text-white">
                                    {project.project_name}
                                  </p>
                                  <p className="text-sm text-gray-500">{project.company_name}</p>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="flex items-center text-sm">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {project.project_location}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">
                                  {project.project_sector}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="text-sm">{project.current_project_stage}</span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold text-success">{project.project_share}%</span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold text-black dark:text-white">
                                  {formatCurrency(project.amount_invested, project.currency)}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="text-sm">
                                  <p className="font-medium text-success">
                                    Revenue: {formatCurrency(project.projected_revenue, project.currency)}
                                  </p>
                                  <p className="text-gray-500">
                                    Profit: {formatCurrency(project.projected_profit, project.currency)}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Briefcase className="mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                      No Project Financing
                    </h3>
                    <p className="text-gray-500">
                      Invest in project financing opportunities to see them here.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Revenue-Based Investments Tab */}
            {activeTab === "revenue" && (
              <>
                {revenueInvestments?.revenue_investments && revenueInvestments.revenue_investments.length > 0 ? (
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                      Revenue-Based Financing ({revenueInvestments.revenue_investments.length})
                    </h3>
                    <div className="space-y-4">
                      {revenueInvestments.revenue_investments.map((investment, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-stroke p-4 dark:border-strokedark"
                        >
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-black dark:text-white">
                                {investment.company_name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {investment.description}
                              </p>
                            </div>
                            <span className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                              {investment.revenue_share_percentage}% Revenue Share
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                              <p className="text-sm text-gray-500">Amount Invested</p>
                              <p className="font-semibold text-black dark:text-white">
                                {formatCurrency(investment.amount_invested, investment.currency)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Investment Date</p>
                              <p className="font-medium">
                                {formatDate(investment.investment_date)}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">Repayment Terms</p>
                              <p className="font-medium">{investment.repayment_terms}</p>
                            </div>
                          </div>
                          {investment.payments && investment.payments.length > 0 && (
                            <div className="mt-3">
                              <p className="mb-2 text-sm font-medium">Payments</p>
                              <div className="space-y-2">
                                {investment.payments.map((payment, pIndex) => (
                                  <div
                                    key={pIndex}
                                    className="flex items-center justify-between rounded bg-gray-100 p-2 text-sm dark:bg-meta-4"
                                  >
                                    <span>{formatDate(payment.payment_date)}</span>
                                    <span className="font-semibold">
                                      {formatCurrency(payment.amount, investment.currency)}
                                    </span>
                                    <span
                                      className={`rounded px-2 py-1 text-xs ${
                                        payment.status === "PAID"
                                          ? "bg-success text-white"
                                          : "bg-warning text-white"
                                      }`}
                                    >
                                      {payment.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <DollarSign className="mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                      No Revenue-Based Investments
                    </h3>
                    <p className="text-gray-500">
                      Invest in revenue-based financing to see them here.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Upcoming Payments Tab */}
            {activeTab === "payments" && (
              <>
          {upcomingPayments?.upcoming_payments && upcomingPayments.upcoming_payments.length > 0 ? (
            <div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Upcoming Payments ({upcomingPayments.upcoming_payments.length})
              </h3>
              <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Company
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Investment Type
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Expected Date
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Expected Amount
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingPayments.upcoming_payments.map((payment: any, index) => (
                    <tr key={index} className="border-b border-stroke dark:border-strokedark">
                      <td className="px-4 py-4">
                        <span className="font-medium text-black dark:text-white">
                          {payment.company_name}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm">{payment.investment_type}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="flex items-center text-sm">
                          <Calendar className="mr-1 h-4 w-4" />
                          {formatDate(payment.expected_date)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-success">
                          {formatCurrency(payment.expected_amount, payment.currency)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                            payment.status === "PENDING"
                              ? "bg-warning bg-opacity-10 text-warning"
                              : "bg-success bg-opacity-10 text-success"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Calendar className="mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
              No Upcoming Payments
            </h3>
            <p className="text-gray-500">
              You don't have any upcoming payments scheduled.
            </p>
          </div>
        )}
      </>
    )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-lg border border-danger bg-danger bg-opacity-10 p-4 text-center">
            <p className="text-danger">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-6 space-y-4">
            <SkeletonLoader variant="card" count={3} />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
