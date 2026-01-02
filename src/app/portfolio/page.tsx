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
  const totalInvestments = summary?.totals?.[0]?.[0] || 0;
  const totalAmount = summary?.totals?.[0]?.[1] || 0;
  const currency = summary?.totals?.[0]?.[2] || "USD";
  
  const liquidAssets = summary?.liquidity?.[0] || 0;
  const illiquidAssets = summary?.liquidity?.[1] || 0;
  const totalInvestmentCount = summary?.liquidity?.[2] || 0;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full p-4">
        <Breadcrumb pageName="Portfolio" />

        {/* Summary Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {/* Total Investments Card */}
          <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {totalInvestments}
                </h4>
                <span className="text-sm font-medium">Total Investments</span>
              </div>
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Total Value Card */}
          <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {formatCurrency(totalAmount, currency)}
                </h4>
                <span className="text-sm font-medium">Portfolio Value</span>
              </div>
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
          </div>

          {/* Liquid Assets Card */}
          <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {liquidAssets}
                </h4>
                <span className="text-sm font-medium">Liquid Assets</span>
              </div>
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <Droplets className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Illiquid Assets Card */}
          <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {illiquidAssets}
                </h4>
                <span className="text-sm font-medium">Illiquid Assets</span>
              </div>
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <BarChart3 className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke p-4 dark:border-strokedark">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("diversity")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                  activeTab === "diversity"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-meta-4 dark:text-white dark:hover:bg-meta-4/80"
                }`}
              >
                <PieChart className="h-4 w-4" />
                Portfolio Diversity
                {summary?.diversity && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {summary.diversity.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("companies")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                  activeTab === "companies"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-meta-4 dark:text-white dark:hover:bg-meta-4/80"
                }`}
              >
                <Building2 className="h-4 w-4" />
                Companies Owned
                {companiesOwned?.companies_owned && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {companiesOwned.companies_owned.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("equity")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                  activeTab === "equity"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-meta-4 dark:text-white dark:hover:bg-meta-4/80"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Equity Investments
                {equityInvestments?.equity_investments && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {equityInvestments.equity_investments.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                  activeTab === "projects"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-meta-4 dark:text-white dark:hover:bg-meta-4/80"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                Project Financing
                {projectFinancing?.project_investments && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {projectFinancing.project_investments.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("revenue")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                  activeTab === "revenue"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-meta-4 dark:text-white dark:hover:bg-meta-4/80"
                }`}
              >
                <DollarSign className="h-4 w-4" />
                Revenue-Based
                {revenueInvestments?.revenue_investments && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {revenueInvestments.revenue_investments.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                  activeTab === "payments"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-meta-4 dark:text-white dark:hover:bg-meta-4/80"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Upcoming Payments
                {upcomingPayments?.upcoming_payments && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {upcomingPayments.upcoming_payments.length}
                  </span>
                )}
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
                                  {item[0]}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="text-sm">{item[1]}</span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                  {item[2]}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold text-black dark:text-white">
                                  {formatCurrency(item[3], currency)}
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
                              Shares
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
                                    {company[1]}
                                  </p>
                                  {company[2] && (
                                    <p className="text-sm text-gray-500">{company[2]}</p>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary">
                                  {company[5]}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="flex items-center text-sm">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {company[3]}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold">{company[8]}</span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold text-success">
                                  {formatCurrency(company[6], company[7])}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="text-sm">{formatDate(company[9])}</span>
                              </td>
                              <td className="px-4 py-4">
                                {company[4] && (
                                  <a
                                    href={company[4]}
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
                              Company / Project
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
                              Shares
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Amount Invested
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                              Completion Cost
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectFinancing.project_investments.map((project, index) => (
                            <tr key={index} className="border-b border-stroke dark:border-strokedark">
                              <td className="px-4 py-4">
                                <div>
                                  <p className="font-medium text-black dark:text-white">
                                    {project[1]}
                                  </p>
                                  <p className="text-sm text-gray-500">{project[2]}</p>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="flex items-center text-sm">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {project[3]}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning">
                                  {project[4]}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="text-sm">{project[6]}</span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold">{project[9]}</span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-semibold text-success">
                                  {formatCurrency(project[7], project[8])}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="text-sm">
                                  <p>
                                    Est: {formatCurrency(project[10], project[8])}
                                  </p>
                                  <p className="text-gray-500">
                                    Current: {formatCurrency(project[11], project[8])}
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
