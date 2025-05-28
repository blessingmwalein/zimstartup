"use client"

import { useState, Fragment } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Dialog, Transition, Tab, Disclosure } from "@headlessui/react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts"
import {
  Building2,
  MapPin,
  Globe,
  Calendar,
  TrendingUp,
  DollarSign,
  FileText,
  User,
  Trophy,
  Newspaper,
  Download,
  ExternalLink,
  AlertCircle,
  X,
  ChevronDown,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  Loader2,
  Star,
  Award,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  Target,
  Briefcase,
  Users,
} from "lucide-react"
// import { useCompanyData } from "@/hooks/use-company-data"
// import { useInvestmentData } from "@/hooks/use-investment-data"
// import CustomButton from "@/components/CustomButton"
// import TextField from "@/components/TextField"
// import CompanyInfoCards from "@/components/CompanyInfoCards"
import MainLayout from "@/components/Layouts/MainLayout"
import { useCompanyData } from "@/hooks/useCompanyData"
import { useInvestmentData } from "@/hooks/useInvestmentData"
import CustomButton from "@/components/Companies/ui/custom-button"
import TextField from "@/components/FormElements/TextField"
import CompanyInfoCards from "@/components/Companies/infor-card"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

// Enhanced Loading Skeleton Component
const LoadingSkeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg ${className}`}
    style={{ animation: "shimmer 2s infinite linear" }}
  >
    <style jsx>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  </div>
)

// Enhanced Metric Card Component
const MetricCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  color = "blue",
  className = "",
}: {
  icon: any
  title: string
  value: string | number
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  color?: "blue" | "green" | "purple" | "orange" | "red"
  className?: string
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 bg-blue-50 text-blue-600 border-blue-200",
    green: "from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-600 border-emerald-200",
    purple: "from-purple-500 to-purple-600 bg-purple-50 text-purple-600 border-purple-200",
    orange: "from-orange-500 to-orange-600 bg-orange-50 text-orange-600 border-orange-200",
    red: "from-red-500 to-red-600 bg-red-50 text-red-600 border-red-200",
  }

  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : null

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden ${className}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].split(" ")[2]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color].split(" ").slice(0, 2).join(" ")} text-white shadow-lg`}
          >
            <Icon className="h-6 w-6" />
          </div>
          {TrendIcon && (
            <div
              className={`p-2 rounded-lg ${trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
            >
              <TrendIcon className="h-4 w-4" />
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

// Enhanced Tab Component
const ModernTab = ({ selected, children, ...props }: any) => (
  <Tab
    className={({ selected }) =>
      classNames(
        "relative px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none",
        selected
          ? "bg-white text-blue-700 shadow-lg ring-1 ring-blue-200"
          : "text-gray-600 hover:text-gray-900 hover:bg-white/50",
      )
    }
    {...props}
  >
    {children}
  </Tab>
)

export default function CompanyPage() {
  const params = useParams()
  const companyId = Number.parseInt(params.id as string)

  const {

    directors,
    updates,
    previousFunds,
    financialMetrics,
    loading,
    error,
    dataLoaded,
    apiErrors,
    loadingStates,

    clearError,
  } = useCompanyData(companyId)

  const { investInCompany, companySummary,
    companyValuations,
    companyDocuments, hasData, companyDetails, addCompanyToWatchlist, submitQuestion } = useInvestmentData(companyId)

  // Modal states
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false)
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  // Form states
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [investorQuestion, setInvestorQuestion] = useState("")
  const [investorEmail, setInvestorEmail] = useState("")

  const tabs = [
    {
      name: "Overview",
      icon: TrendingUp,
      content: "summary",
      hasData: hasData.summary,
      loading: loadingStates.summary,
      color: "blue",
    },
    {
      name: "Financials",
      icon: DollarSign,
      content: "evaluations",
      hasData: hasData.valuations,
      loading: loadingStates.valuations,
      color: "green",
    },
    {
      name: "Documents",
      icon: FileText,
      content: "documents",
      hasData: hasData.documents,
      loading: loadingStates.documents,
      color: "purple",
    },
    {
      name: "Team",
      icon: Users,
      content: "directors",
      hasData: hasData.directors,
      loading: loadingStates.directors,
      color: "orange",
    },
    {
      name: "Awards",
      icon: Trophy,
      content: "competitions",
      hasData: hasData.competition,
      loading: loadingStates.details,
      color: "yellow",
    },
    {
      name: "About",
      icon: Building2,
      content: "about",
      hasData: hasData.details,
      loading: loadingStates.details,
      color: "indigo",
    },
  ]

  const formatCurrency = (amount: number, currency = "USD") => {
    if (typeof amount !== "number" || isNaN(amount)) return "$0"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return "Invalid Date"
    }
  }

  const handleInvestment = async () => {
    if (!investmentAmount || !companySummary) return

    const result = await investInCompany({
      company_id: companyId,
      investment_amount: Number(investmentAmount),
      investor_type: "Individual",
      investment_type: "Equity",
    })

    if (result.success) {
      setIsInvestmentModalOpen(false)
      setInvestmentAmount("")
    }
  }

  const handleQuestionSubmit = async () => {
    if (!investorQuestion || !investorEmail) return

    const result = await submitQuestion(companyId, investorQuestion, investorEmail)

    if (result.success) {
      setIsQuestionModalOpen(false)
      setInvestorQuestion("")
      setInvestorEmail("")
    }
  }

  const openDocumentModal = (document: any) => {
    setSelectedDocument(document)
    setIsDocumentModalOpen(true)
  }

  // Enhanced chart data
  const pieData =
    hasData.summary && companySummary?.pie_chart_payment_summary
      ? [
        {
          name: "Available",
          value: companySummary.pie_chart_payment_summary.remaining || 0,
          color: "#10b981",
        },
        {
          name: "Raised",
          value: companySummary.pie_chart_payment_summary.total_received || 0,
          color: "#3b82f6",
        },
      ]
      : []

  const lineData =
    hasData.valuations && companyValuations?.valuation
      ? companyValuations.valuation.map((val: any, index: number) => ({
        name: `${val.financial_year || 2020 + index}`,
        value: val.valuation_amount || 0,
        growthRate: val.current_growth_rate || 0,
      }))
      : []

  if (loading && !dataLoaded) {
    return (
      <MainLayout>

        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <LoadingSkeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <LoadingSkeleton className="h-64" />
              <LoadingSkeleton className="h-64" />
              <LoadingSkeleton className="h-64" />
            </div>
            <LoadingSkeleton className="h-96 w-full" />
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!dataLoaded && !hasData.summary) {
    return (
      < MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Company</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We're having trouble loading the company data. This might be due to server issues.
              </p>
              <CustomButton
                variant="solid"
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                Try Again
              </CustomButton>
            </div>
          </div>
        </div></MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Company Header */}
        {hasData.summary && companySummary && (
          <>
            {/* Enhanced Company Hero Section */}
            <div className="relative mb-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 rounded-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div>
                    <img
                      src={
                        companySummary.company_details?.company_logo
                          ? `https://zimstartup-861d8915d228.herokuapp.com/${companySummary.company_details.company_logo}`
                          : "/placeholder.svg?height=100&width=100"
                      }
                      alt={companySummary.company_details?.company_name || "Company Logo"}
                      className="relative w-24 h-24 object-contain rounded-2xl border-2 border-white shadow-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                        {companySummary.company_details?.company_name || "Company Name"}
                      </h1>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                      {companySummary.company_details?.company_short_description || "No description available"}
                    </p> */}

                    <div className="flex flex-wrap items-center gap-3">
                      {companySummary.company_details?.sector && (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200">
                          <Briefcase className="h-4 w-4 mr-2" />
                          {companySummary.company_details.sector}
                        </span>
                      )}
                      {companySummary.company_details?.state_name && (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          {companySummary.company_details.state_name}
                        </span>
                      )}
                      {companySummary.company_details?.status && (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          {companySummary.company_details.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <CustomButton
                      variant="outlined"
                      size="sm"
                      className="border-pink-200 text-pink-600 hover:bg-pink-50"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Watchlist
                    </CustomButton>
                    <CustomButton
                      variant="outlined"
                      size="sm"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </CustomButton>
                    <CustomButton
                      variant="solid"
                      size="sm"
                      onClick={() => setIsQuestionModalOpen(true)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Ask Question
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Company Info Cards */}
            <div className="mb-12">
              <CompanyInfoCards
                companySummary={companySummary}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
                onInvestClick={() => setIsInvestmentModalOpen(true)}
              />
            </div>

            {/* Enhanced Tabs Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
              <Tab.Group>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4">
                  <Tab.List className="flex space-x-2 overflow-x-auto">
                    {tabs.map((tab) => (
                      <ModernTab key={tab.name}>
                        <div className="flex items-center space-x-2">
                          <tab.icon className="h-4 w-4" />
                          <span>{tab.name}</span>
                          {tab.loading && <Loader2 className="h-3 w-3 animate-spin" />}
                          {!tab.loading && !tab.hasData && (
                            <div
                              className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
                              title="No data available"
                            />
                          )}
                        </div>
                      </ModernTab>
                    ))}
                  </Tab.List>
                </div>

                <Tab.Panels className="p-6">
                  {/* Enhanced Summary Tab */}
                  <Tab.Panel className="focus:outline-none">
                    {loadingStates.summary ? (
                      <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                          <p className="text-gray-600 font-medium">Loading company overview...</p>
                        </div>
                      </div>
                    ) : hasData.summary ? (
                      <div className="space-y-8">
                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <MetricCard
                            icon={Calendar}
                            title="Founded"
                            value={
                              formatDate(companySummary.company_details?.company_start_date).split(",")[1] || "N/A"
                            }
                            subtitle={formatDate(companySummary.company_details?.company_start_date)}
                            color="blue"
                          />
                          <MetricCard
                            icon={Building2}
                            title="Company ID"
                            value={companySummary.company_details?.company_abbreviations || "N/A"}
                            subtitle="Unique Identifier"
                            color="purple"
                          />
                          <MetricCard
                            icon={CheckCircle2}
                            title="Profile Score"
                            value={`${companySummary.company_score?.completeness_score || 0}%`}
                            subtitle="Completeness"
                            trend={companySummary.company_score?.completeness_score >= 80 ? "up" : "neutral"}
                            color="green"
                          />
                          <MetricCard
                            icon={Target}
                            title="Investment Goal"
                            value={formatCurrency(companySummary.pie_chart_payment_summary?.total_required || 0)}
                            subtitle="Total Required"
                            color="orange"
                          />
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Enhanced Pie Chart */}
                          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <PieChart className="h-6 w-6 mr-3 text-blue-600" />
                                Funding Breakdown
                              </h3>
                              {pieData.length > 0 ? (
                                <>
                                  <div className="h-80 flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <PieChart>
                                        <Pie
                                          data={pieData}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={70}
                                          outerRadius={130}
                                          dataKey="value"
                                          strokeWidth={3}
                                          stroke="#fff"
                                        >
                                          {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                          ))}
                                        </Pie>
                                        <Tooltip
                                          formatter={(value) => formatCurrency(value as number)}
                                          contentStyle={{
                                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                                            border: "none",
                                            borderRadius: "12px",
                                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                          }}
                                        />
                                      </PieChart>
                                    </ResponsiveContainer>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 mt-6">
                                    {pieData.map((entry, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center space-x-3 p-3 rounded-xl bg-white/70"
                                      >
                                        <div
                                          className="w-4 h-4 rounded-full"
                                          style={{ backgroundColor: entry.color }}
                                        ></div>
                                        <div>
                                          <p className="text-sm font-medium text-gray-900">{entry.name}</p>
                                          <p className="text-xs text-gray-600">{formatCurrency(entry.value)}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <div className="text-center py-12">
                                  <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                  <p className="text-gray-500">No funding data available</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Enhanced Company Info */}
                          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <Building2 className="h-6 w-6 mr-3 text-purple-600" />
                                Company Profile
                              </h3>
                              <div className="space-y-6">
                                <div className="text-center p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl text-white">
                                  <h4 className="text-2xl font-bold mb-2">
                                    {companySummary.company_details?.state_name || "N/A"}
                                  </h4>
                                  <p className="opacity-90">
                                    {companySummary.company_details?.sector || "N/A"} Company
                                  </p>
                                </div>

                                {hasData.valuations && companyValuations?.valuation?.[0] && (
                                  <div className="space-y-4">
                                    <h5 className="font-semibold text-gray-900 flex items-center">
                                      <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                                      Latest Valuation
                                    </h5>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                                        <p className="text-sm text-gray-600">Method</p>
                                        <p className="font-semibold text-gray-900">
                                          {companyValuations.valuation[0].valuation_method || "N/A"}
                                        </p>
                                      </div>
                                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                                        <p className="text-sm text-gray-600">Amount</p>
                                        <p className="font-semibold text-emerald-600">
                                          {formatCurrency(
                                            companyValuations.valuation[0].valuation_amount,
                                            companyValuations.valuation[0].valuation_currency,
                                          )}
                                        </p>
                                      </div>
                                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                                        <p className="text-sm text-gray-600">Growth Rate</p>
                                        <p
                                          className={`font-semibold ${(companyValuations.valuation[0].current_growth_rate || 0) >= 0 ? "text-green-600" : "text-red-600"}`}
                                        >
                                          {companyValuations.valuation[0].current_growth_rate || 0}%
                                        </p>
                                      </div>
                                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                                        <p className="text-sm text-gray-600">Year</p>
                                        <p className="font-semibold text-gray-900">
                                          {companyValuations.valuation[0].financial_year || "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <TrendingUp className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-3">No Summary Data</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Company summary information is not available at this time.
                        </p>
                      </div>
                    )}
                  </Tab.Panel>

                  {/* Enhanced Financials Tab */}
                  <Tab.Panel className="focus:outline-none">
                    {loadingStates.valuations ? (
                      <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
                          <p className="text-gray-600 font-medium">Loading financial data...</p>
                        </div>
                      </div>
                    ) : hasData.valuations && companyValuations ? (
                      <div className="space-y-8">
                        {/* Financial Metrics */}
                        {companyValuations.valuation?.[0] && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <MetricCard
                              icon={DollarSign}
                              title="Current Valuation"
                              value={formatCurrency(
                                companyValuations.valuation[0].valuation_amount,
                                companyValuations.valuation[0].valuation_currency,
                              )}
                              subtitle={`As of ${formatDate(companyValuations.valuation[0].valuation_date)}`}
                              color="green"
                              className="col-span-1"
                            />
                            <MetricCard
                              icon={TrendingUp}
                              title="Growth Rate"
                              value={`${companyValuations.valuation[0].current_growth_rate || 0}%`}
                              subtitle="Annual Growth"
                              trend={(companyValuations.valuation[0].current_growth_rate || 0) >= 0 ? "up" : "down"}
                              color={(companyValuations.valuation[0].current_growth_rate || 0) >= 0 ? "green" : "red"}
                              className="col-span-1"
                            />
                          </div>
                        )}

                        {/* Valuation Chart */}
                        {lineData.length > 0 && (
                          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg border border-green-100 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                              <TrendingUp className="h-6 w-6 mr-3 text-green-600" />
                              Valuation Trend
                            </h3>
                            <div className="h-80">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={lineData}>
                                  <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                  <XAxis dataKey="name" stroke="#6b7280" />
                                  <YAxis stroke="#6b7280" />
                                  <Tooltip
                                    formatter={(value) => formatCurrency(value as number)}
                                    contentStyle={{
                                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                                      border: "none",
                                      borderRadius: "12px",
                                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                    }}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fill="url(#colorValue)"
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}

                        {/* Previous Funding */}
                        {companyValuations.fund?.length > 0 && (
                          <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                              <Award className="h-6 w-6 mr-3 text-blue-600" />
                              Previous Funding Rounds
                            </h3>
                            <div className="grid gap-6">
                              {companyValuations.fund.map((fund: any, index: number) => (
                                <div
                                  key={index}
                                  className="group bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                  <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                          <DollarSign className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                          <h4 className="font-bold text-gray-900">
                                            {fund.investor_information || "Unknown Investor"}
                                          </h4>
                                          <p className="text-sm text-gray-600">{fund.investor_type || "N/A"}</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-2xl font-bold text-green-600">
                                          {formatCurrency(fund.investment_amount, fund.investment_currency)}
                                        </p>
                                        <p className="text-sm text-gray-600">{formatDate(fund.date_of_funds)}</p>
                                      </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="text-gray-600">Company Valuation:</span>
                                          <p className="font-semibold text-gray-900">
                                            {formatCurrency(fund.company_valuation, fund.company_valuation_currency)}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="text-gray-600">Investment Type:</span>
                                          <p className="font-semibold text-gray-900">{fund.investment_type || "N/A"}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <DollarSign className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-3">No Financial Data</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Financial information is not available for this company.
                        </p>
                      </div>
                    )}
                  </Tab.Panel>

                  {/* Enhanced Documents Tab */}
                  <Tab.Panel className="focus:outline-none">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                          <FileText className="h-7 w-7 mr-3 text-purple-600" />
                          Company Documents
                        </h3>
                        <CustomButton
                          variant="outlined"
                          size="sm"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download All
                        </CustomButton>
                      </div>

                      {loadingStates.documents ? (
                        <div className="flex items-center justify-center py-16">
                          <div className="text-center">
                            <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Loading documents...</p>
                          </div>
                        </div>
                      ) : hasData.documents && companyDocuments?.documents ? (
                        <div className="grid gap-6">
                          {companyDocuments.documents.map((doc: any) => (
                            <div
                              key={doc.id}
                              className="group bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-purple-300 transition-all duration-300"
                            >
                              <div className="p-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                      <FileText className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                        {doc.document_name || "Untitled Document"}
                                      </h4>
                                      {doc.created_at && (
                                        <p className="text-sm text-gray-600 flex items-center">
                                          <Clock className="h-4 w-4 mr-1" />
                                          Uploaded: {formatDate(doc.created_at)}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex space-x-3">
                                    <CustomButton
                                      variant="outlined"
                                      size="sm"
                                      onClick={() => openDocumentModal(doc)}
                                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </CustomButton>
                                    <CustomButton
                                      variant="solid"
                                      size="sm"
                                      className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                                    >
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </CustomButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <FileText className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold text-gray-700 mb-3">No Documents Available</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            This company hasn't uploaded any documents yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </Tab.Panel>

                  {/* Enhanced Team Tab */}
                  <Tab.Panel className="focus:outline-none">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Users className="h-7 w-7 mr-3 text-orange-600" />
                        Leadership Team
                      </h3>

                      {loadingStates.directors ? (
                        <div className="flex items-center justify-center py-16">
                          <div className="text-center">
                            <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Loading team information...</p>
                          </div>
                        </div>
                      ) : hasData.directors && directors?.length > 0 ? (
                        <div className="grid gap-6">
                          {directors.map((director: any, index: number) => (
                            <Disclosure key={index}>
                              {({ open }) => (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                  <Disclosure.Button className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                                          <User className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                          <h4 className="text-xl font-bold text-gray-900 mb-1">
                                            {director.name || "Unknown Director"}
                                          </h4>
                                          <p className="text-orange-600 font-medium">
                                            {director.position || "Director"}
                                          </p>
                                        </div>
                                      </div>
                                      <ChevronDown
                                        className={`${open ? "rotate-180" : ""} h-6 w-6 text-orange-500 transition-transform duration-200`}
                                      />
                                    </div>
                                  </Disclosure.Button>
                                  <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                  >
                                    <Disclosure.Panel className="px-6 pb-6">
                                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div className="space-y-4">
                                            <div>
                                              <span className="text-sm font-medium text-gray-600">Nationality</span>
                                              <p className="text-gray-900 font-semibold">
                                                {director.nationality || "N/A"}
                                              </p>
                                            </div>
                                            <div>
                                              <span className="text-sm font-medium text-gray-600">Date of Birth</span>
                                              <p className="text-gray-900 font-semibold">
                                                {director.date_of_birth || "N/A"}
                                              </p>
                                            </div>
                                          </div>
                                          <div>
                                            <span className="text-sm font-medium text-gray-600">Experience</span>
                                            <p className="text-gray-900 font-semibold leading-relaxed">
                                              {director.experience || "No experience information available"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Disclosure.Panel>
                                  </Transition>
                                </div>
                              )}
                            </Disclosure>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <Users className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold text-gray-700 mb-3">No Team Information</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            Team member information is not available for this company.
                          </p>
                        </div>
                      )}
                    </div>
                  </Tab.Panel>

                  {/* Enhanced Awards Tab */}
                  <Tab.Panel className="focus:outline-none">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Trophy className="h-7 w-7 mr-3 text-yellow-600" />
                        Competitions & Awards
                      </h3>

                      {loadingStates.details ? (
                        <div className="flex items-center justify-center py-16">
                          <div className="text-center">
                            <Loader2 className="h-12 w-12 animate-spin text-yellow-600 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Loading competition data...</p>
                          </div>
                        </div>
                      ) : hasData.competition && companyDetails?.competition ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                          <div className="p-8">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                                  <Trophy className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                    {companyDetails.competition.competition_name}
                                  </h4>
                                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200">
                                    <Award className="h-4 w-4 mr-2" />
                                    {companyDetails.competition.status || "Active"}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-1 mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                                <p className="text-sm text-gray-600">Excellence Award</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <Trophy className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold text-gray-700 mb-3">No Competitions</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            This company is not currently participating in any competitions.
                          </p>
                        </div>
                      )}
                    </div>
                  </Tab.Panel>

                  {/* Enhanced About Tab */}
                  <Tab.Panel className="focus:outline-none">
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Building2 className="h-7 w-7 mr-3 text-indigo-600" />
                        About {companySummary.company_details?.company_name || "Company"}
                      </h3>

                      {loadingStates.details ? (
                        <div className="flex items-center justify-center py-16">
                          <div className="text-center">
                            <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Loading company details...</p>
                          </div>
                        </div>
                      ) : hasData.details ? (
                        <div className="space-y-8">
                          {/* Company Overview */}
                          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg border border-indigo-100 p-8">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                              <Newspaper className="h-6 w-6 mr-3 text-indigo-600" />
                              Company Overview
                            </h4>
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {companySummary.company_details?.company_short_description || "No description available"}
                            </p>
                          </div>

                          {/* Contact Information */}
                          {hasData.contactDetails && companyDetails?.company_contact_details && (
                            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 p-8">
                              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <Phone className="h-6 w-6 mr-3 text-blue-600" />
                                Contact Information
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                  <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <MapPin className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-900">Address</p>
                                      <p className="text-gray-600">
                                        {companyDetails.company_contact_details.address || "N/A"},{" "}
                                        {companyDetails.company_contact_details.address_city || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                      <Globe className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-900">Country</p>
                                      <p className="text-gray-600">
                                        {companyDetails.company_contact_details.country || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  {companyDetails.company_contact_details.phone1 && (
                                    <div className="flex items-start space-x-4">
                                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-purple-600" />
                                      </div>
                                      <div>
                                        <p className="font-semibold text-gray-900">Phone</p>
                                        <p className="text-gray-600">{companyDetails.company_contact_details.phone1}</p>
                                      </div>
                                    </div>
                                  )}
                                  {companyDetails.company_contact_details.work_email && (
                                    <div className="flex items-start space-x-4">
                                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-orange-600" />
                                      </div>
                                      <div>
                                        <p className="font-semibold text-gray-900">Email</p>
                                        <p className="text-gray-600">
                                          {companyDetails.company_contact_details.work_email}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Stock Market Information */}
                          {hasData.stockMarketDetails && companyDetails?.stock_market_details && (
                            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg border border-green-100 p-8">
                              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <TrendingUp className="h-6 w-6 mr-3 text-green-600" />
                                Stock Market Information
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-white rounded-xl border border-gray-200">
                                  <span className="text-sm font-medium text-gray-600">Market Type</span>
                                  <p className="text-lg font-bold text-gray-900 mt-1">
                                    {companyDetails.stock_market_details.type_of_market || "N/A"}
                                  </p>
                                </div>
                                <div className="p-6 bg-white rounded-xl border border-gray-200">
                                  <span className="text-sm font-medium text-gray-600">Listed Date</span>
                                  <p className="text-lg font-bold text-gray-900 mt-1">
                                    {companyDetails.stock_market_details.listed_date || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <Building2 className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold text-gray-700 mb-3">No Company Details</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            Detailed company information is not available.
                          </p>
                        </div>
                      )}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </>
        )}

        {/* Enhanced Error State */}
        {!hasData.summary && !loading && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Building2 className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Company Data Unavailable</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Unable to load company information at this time. Please try again later.
              </p>
              <CustomButton
                variant="solid"
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Try Again
              </CustomButton>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Investment Modal */}
      <Transition appear show={isInvestmentModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsInvestmentModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-500 px-8 py-6">
                    <Dialog.Title as="h3" className="text-2xl font-bold text-white">
                      Invest in {companySummary?.company_details?.company_name || "Company"}
                    </Dialog.Title>
                    <p className="text-emerald-100 mt-2">Join the investment opportunity</p>
                  </div>

                  <div className="p-8">
                    <div className="space-y-6">
                      <TextField
                        label="Investment Amount (USD)"
                        type="number"
                        placeholder="Enter amount"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        icon={<DollarSign className="h-5 w-5" />}
                      />

                      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-2xl border border-blue-200">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <Target className="h-5 w-5 mr-2 text-blue-600" />
                          Investment Details
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Available:</span>
                            <span className="font-semibold text-emerald-600">
                              {formatCurrency(companySummary?.pie_chart_payment_summary?.remaining || 0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Minimum Investment:</span>
                            <span className="font-semibold">$1,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Expected Return:</span>
                            <span className="font-semibold text-green-600">15-25% annually</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-8 pb-8 flex space-x-4">
                    <CustomButton
                      variant="solid"
                      fullWidth
                      onClick={handleInvestment}
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Confirm Investment
                    </CustomButton>
                    <CustomButton
                      variant="outlined"
                      fullWidth
                      onClick={() => setIsInvestmentModalOpen(false)}
                      className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </CustomButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Enhanced Document Modal */}
      <Transition appear show={isDocumentModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsDocumentModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-6 flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-2xl font-bold text-white">
                      {selectedDocument?.document_name || "Document"}
                    </Dialog.Title>
                    <CustomButton
                      variant="outlined"
                      size="sm"
                      onClick={() => setIsDocumentModalOpen(false)}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <X className="h-4 w-4" />
                    </CustomButton>
                  </div>

                  <div className="p-8">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-12 rounded-2xl text-center border-2 border-dashed border-gray-300">
                      <FileText className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">Document Preview</h4>
                      <p className="text-gray-600 mb-4">Document preview would be displayed here</p>
                      {selectedDocument?.created_at && (
                        <p className="text-sm text-gray-500 flex items-center justify-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Uploaded: {formatDate(selectedDocument.created_at)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-8 pb-8 flex space-x-4">
                    <CustomButton
                      variant="solid"
                      fullWidth
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </CustomButton>
                    <CustomButton
                      variant="outlined"
                      fullWidth
                      className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </CustomButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Enhanced Question Modal */}
      <Transition appear show={isQuestionModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsQuestionModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-6">
                    <Dialog.Title as="h3" className="text-2xl font-bold text-white">
                      Ask a Question
                    </Dialog.Title>
                    <p className="text-blue-100 mt-2">Get answers from the company</p>
                  </div>

                  <div className="p-8">
                    <div className="space-y-6">
                      <TextField
                        label="Your Email"
                        type="email"
                        placeholder="Enter your email"
                        value={investorEmail}
                        onChange={(e) => setInvestorEmail(e.target.value)}
                        icon={<Mail className="h-5 w-5" />}
                      />
                      <div className="w-full">
                        <label className="mb-3 block text-sm font-semibold text-gray-700">Your Question</label>
                        <div className="relative">
                          <textarea
                            className="w-full rounded-2xl border-2 border-gray-200 p-4 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                            rows={4}
                            placeholder="What would you like to know about this company?"
                            value={investorQuestion}
                            onChange={(e) => setInvestorQuestion(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-8 pb-8 flex space-x-4">
                    <CustomButton
                      variant="solid"
                      fullWidth
                      onClick={handleQuestionSubmit}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Submit Question
                    </CustomButton>
                    <CustomButton
                      variant="outlined"
                      fullWidth
                      onClick={() => setIsQuestionModalOpen(false)}
                      className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </CustomButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </MainLayout>
  )
}
