"use client";

import type React from "react";

import { useState, Fragment } from "react";
import { useParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import {
  Building2,
  MapPin,
  Globe,
  Calendar,
  TrendingUp,
  DollarSign,
  FileText,
  Trophy,
  Download,
  ExternalLink,
  X,
  Eye,
  MessageSquare,
  Loader2,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Users,
  Menu,
  Star,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle,
  Award,
  Flag,
  Send,
  Filter,
  Search,
  BarChart3,
  CreditCard,
  FileCheck,
  Shield,
} from "lucide-react";
import MainLayout from "@/components/Layouts/MainLayout";
import CustomButton from "@/components/Buttons/CustomButton";
import TextField from "@/components/FormElements/TextField";
import { useCompanyData } from "@/hooks/useCompanyData";
import { useInvestmentData } from "@/hooks/useInvestmentData";

// Comprehensive dummy data
const mockCompanyData = {
  company_details: {
    company_name: "Coca Cola",
    state_name: "Georgia, USA",
    sector: "Beverage",
    company_start_date: "2005-12-11",
    company_abbreviations: "CC",
    company_short_description:
      "Leading beverage company with global presence in soft drinks and refreshments, serving millions of customers worldwide with innovative products and sustainable practices.",
  },
  pie_chart_payment_summary: {
    total_required: 50000000,
    remaining: 10000000,
    total_received: 40000000,
  },
  company_score: {
    completeness_score: 90,
    financial_health: 85,
    market_position: 92,
    growth_potential: 88,
    risk_assessment: 75,
  },
  auditor_notes: [
    {
      id: 1,
      auditor_name: "John Smith, CPA",
      audit_date: "2024-01-15",
      category: "Financial Compliance",
      severity: "low",
      note: "All financial records are properly maintained and comply with GAAP standards. Minor recommendation to improve documentation of expense categories.",
      status: "resolved",
    },
    {
      id: 2,
      auditor_name: "Sarah Johnson, CPA",
      audit_date: "2024-02-20",
      category: "Internal Controls",
      severity: "medium",
      note: "Recommend implementing additional segregation of duties in accounts payable process to strengthen internal controls.",
      status: "in_progress",
    },
    {
      id: 3,
      auditor_name: "Michael Brown, CPA",
      audit_date: "2024-03-10",
      category: "Tax Compliance",
      severity: "high",
      note: "Identified potential tax optimization opportunities. Recommend consultation with tax specialist for quarterly filings.",
      status: "pending",
    },
  ],
  previous_funds: [
    {
      id: 1,
      round_name: "Series A",
      amount: 5000000,
      currency: "USD",
      date: "2022-06-15",
      lead_investor: "Venture Capital Partners",
      investors: ["VCP", "Angel Investors Group", "Tech Fund"],
      valuation_pre: 15000000,
      valuation_post: 20000000,
      use_of_funds: "Product development and market expansion",
      status: "completed",
    },
    {
      id: 2,
      round_name: "Seed Round",
      amount: 1500000,
      currency: "USD",
      date: "2021-03-20",
      lead_investor: "Early Stage Capital",
      investors: ["ESC", "Founder's Fund", "Strategic Angels"],
      valuation_pre: 5000000,
      valuation_post: 6500000,
      use_of_funds: "Initial product development and team building",
      status: "completed",
    },
    {
      id: 3,
      round_name: "Series B",
      amount: 12000000,
      currency: "USD",
      date: "2023-09-10",
      lead_investor: "Growth Equity Fund",
      investors: ["GEF", "Strategic Partners", "International Ventures"],
      valuation_pre: 35000000,
      valuation_post: 47000000,
      use_of_funds: "International expansion and technology infrastructure",
      status: "completed",
    },
  ],
  company_requests: [
    {
      id: 1,
      request_type: "Funding Request",
      amount: 25000000,
      currency: "USD",
      date_submitted: "2024-01-10",
      status: "active",
      description:
        "Series C funding for global expansion and new product lines",
      deadline: "2024-06-30",
      progress: 75,
    },
    {
      id: 2,
      request_type: "Partnership Request",
      amount: null,
      currency: null,
      date_submitted: "2023-11-15",
      status: "completed",
      description: "Strategic partnership with major retail chains",
      deadline: "2024-01-31",
      progress: 100,
    },
    {
      id: 3,
      request_type: "Grant Application",
      amount: 500000,
      currency: "USD",
      date_submitted: "2024-02-05",
      status: "pending",
      description: "Government grant for sustainable packaging research",
      deadline: "2024-04-15",
      progress: 30,
    },
  ],
  competitions: [
    {
      id: 1,
      name: "Global Innovation Awards 2024",
      category: "Sustainability",
      position: "Winner",
      date: "2024-03-15",
      prize: "$100,000",
      description: "Recognized for innovative sustainable packaging solutions",
      organizer: "International Business Council",
    },
    {
      id: 2,
      name: "Tech Startup Competition",
      category: "Technology",
      position: "2nd Place",
      date: "2023-11-20",
      prize: "$50,000",
      description: "Runner-up in regional technology innovation competition",
      organizer: "Regional Tech Hub",
    },
    {
      id: 3,
      name: "Best Employer Awards",
      category: "HR Excellence",
      position: "Finalist",
      date: "2024-01-30",
      prize: "Recognition",
      description:
        "Finalist for best workplace culture and employee satisfaction",
      organizer: "HR Excellence Institute",
    },
  ],
  comments_ratings: [
    {
      id: 1,
      user_name: "Investment Analyst",
      user_type: "Professional",
      rating: 4.5,
      comment:
        "Strong financial performance and excellent market position. The company shows consistent growth and has a solid management team.",
      date: "2024-03-01",
      helpful_votes: 15,
      category: "Financial Analysis",
    },
    {
      id: 2,
      user_name: "Former Employee",
      user_type: "Employee",
      rating: 4.0,
      comment:
        "Great company culture and opportunities for growth. Management is supportive and the work environment is collaborative.",
      date: "2024-02-15",
      helpful_votes: 8,
      category: "Work Environment",
    },
    {
      id: 3,
      user_name: "Industry Expert",
      user_type: "Expert",
      rating: 5.0,
      comment:
        "Leading player in the beverage industry with innovative products and strong brand recognition. Excellent investment opportunity.",
      date: "2024-02-28",
      helpful_votes: 22,
      category: "Market Analysis",
    },
    {
      id: 4,
      user_name: "Customer",
      user_type: "Customer",
      rating: 4.2,
      comment:
        "Love their products and commitment to sustainability. The company has been improving their environmental impact significantly.",
      date: "2024-03-05",
      helpful_votes: 6,
      category: "Product Quality",
    },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Enhanced Loading Skeleton Component
const LoadingSkeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${className}`}
    style={{ animation: "shimmer 2s infinite linear" }}
  >
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}</style>
  </div>
);

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
  icon: any;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  color?: "blue" | "green" | "purple" | "orange" | "red";
  className?: string;
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 bg-blue-50 text-blue-600 border-blue-200",
    green:
      "from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-600 border-emerald-200",
    purple:
      "from-purple-500 to-purple-600 bg-purple-50 text-purple-600 border-purple-200",
    orange:
      "from-orange-500 to-orange-600 bg-orange-50 text-orange-600 border-orange-200",
    red: "from-red-500 to-red-600 bg-red-50 text-red-600 border-red-200",
  };

  const TrendIcon =
    trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : null;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg ${className}`}
    >
      <div className="relative p-4">
        <div className="mb-3 flex items-center justify-between">
          <div
            className={`rounded-lg bg-gradient-to-r p-2 ${colorClasses[color].split(" ").slice(0, 2).join(" ")} text-white shadow-md`}
          >
            <Icon className="h-5 w-5" />
          </div>
          {TrendIcon && (
            <div
              className={`rounded-lg p-1 ${trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
            >
              <TrendIcon className="h-4 w-4" />
            </div>
          )}
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-gray-600">{title}</p>
          <p className="mb-1 text-lg font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default function CompanyPage() {
  const params = useParams();
  const companyId = Number.parseInt(params.id as string);

  // Use real hooks
  // const {
  //   // directors,
  //   // updates,
  //   // previousFunds,
  //   // financialMetrics,
  //   loading,
  //   error,
  //   dataLoaded,
  //   apiErrors,
  //   loadingStates,
  //   clearError,
  //   companyData,
  //   // companyValuations,
  //   // companyDocuments,
  //   // companyRequests,
  //   // ...other returned values
  // } = useCompanyData(companyId);

  const {
    investInCompany,
    companySummary,
    // companyValuations: investmentValuations,
    // companyDocuments: investmentDocuments,
    hasData,
    companyDetails,
    addCompanyToWatchlist,
    // submitQuestion,
    loading: investmentLoading,
    dataLoaded: investmentDataLoaded,
    // ...other returned values
  } = useInvestmentData(companyId);

  // Use companyValuations and companyDocuments from useCompanyData if available, otherwise fallback to useInvestmentData
  const effectiveCompanyValuations = companyDetails?.company_valuation;
  const effectiveCompanyDocuments = companyDetails?.company_documents;

  // Navigation and modal states
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  // Form states
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investorQuestion, setInvestorQuestion] = useState("");
  const [investorEmail, setInvestorEmail] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  const navigationItems = [
    {
      id: "overview",
      name: "Overview/Summary",
      icon: TrendingUp,
      hasData: true,
      loading: false,
    },
    {
      id: "about",
      name: "About",
      icon: Building2,
      hasData: true,
      loading: false,
    },
    {
      id: "auditor-notes",
      name: "Auditor Notes",
      icon: FileCheck,
      hasData: true,
      loading: false,
    },
    {
      id: "score-sheet",
      name: "Company Score Sheet",
      icon: BarChart3,
      hasData: true,
      loading: false,
    },
    {
      id: "documents",
      name: "Documents",
      icon: FileText,
      hasData: true,
      loading: false,
    },
    {
      id: "team-directors",
      name: "Team/Directors",
      icon: Users,
      hasData: true,
      loading: false,
    },
    {
      id: "financials",
      name: "Financials/Valuations",
      icon: DollarSign,
      hasData: true,
      loading: false,
    },
    {
      id: "previous-funds",
      name: "Previous Funds",
      icon: CreditCard,
      hasData: true,
      loading: false,
    },
    {
      id: "company-requests",
      name: "Company Requests",
      icon: Send,
      hasData: true,
      loading: false,
    },
    {
      id: "competitions",
      name: "Competitions",
      icon: Trophy,
      hasData: true,
      loading: false,
    },
    {
      id: "comments-rating",
      name: "Comments & Rating",
      icon: Star,
      hasData: true,
      loading: false,
    },
  ];

  const formatCurrency = (amount: number, currency = "USD") => {
    if (typeof amount !== "number" || isNaN(amount)) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const handleInvestment = async () => {
    if (!investmentAmount || !companySummary) return;
    const result = await investInCompany({
      company_id: companyId,
      investment_amount: Number(investmentAmount),
      investor_type: "Individual",
      investment_type: "Equity",
    });
    if (result.success) {
      setIsInvestmentModalOpen(false);
      setInvestmentAmount("");
    }
  };

  const handleQuestionSubmit = async () => {
    if (!investorQuestion || !investorEmail) return;
    const result = await submitQuestion(
      companyId,
      investorQuestion,
      investorEmail,
    );
    if (result.success) {
      setIsQuestionModalOpen(false);
      setInvestorQuestion("");
      setInvestorEmail("");
    }
  };

  const openDocumentModal = (document: any) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };

  // Enhanced chart data
  const pieData = companySummary?.pie_chart_payment_summary
    ? [
        {
          name: "Raised",
          value: companySummary.pie_chart_payment_summary.total_received || 0,
          color: "#3b82f6",
        },
        {
          name: "Remaining",
          value: companySummary.pie_chart_payment_summary.remaining || 0,
          color: "#e5e7eb",
        },
      ]
    : [];

  const renderStarRating = (rating: number, size = "sm") => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  // Helper to get the first valuation safely
  const getFirstValuation = (val: any) => {
    if (!val) return undefined;
    if (Array.isArray(val)) return val[0];
    if (val.valuation && Array.isArray(val.valuation)) return val.valuation[0];
    return undefined;
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Company Header Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    {companyDetails?.company_data?.company_name || "Company Name"}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {companyDetails?.company_contact_details?.address_city || companyDetails?.company_data?.location || "Location"}
                    </span>
                    <span className="flex items-center">
                      <Building2 className="mr-1 h-4 w-4" />
                      {companyDetails?.business_category?.state_name || "Sector"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-1 text-2xl font-bold text-blue-600">
                    {companyDetails?.company_score?.completeness_score || 0}%
                  </div>
                  <div className="text-sm text-gray-600">Company Score</div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <MetricCard
                  icon={Calendar}
                  title="Founded"
                  value={
                    companyDetails?.company_data?.company_start_date
                      ? formatDate(companyDetails.company_data.company_start_date)
                      : "N/A"
                  }
                  color="blue"
                />
                <MetricCard
                  icon={DollarSign}
                  title="Moving Price"
                  value={formatCurrency(
                    Number(companyDetails?.company_request_details?.total_required_cash) || 0,
                  )}
                  color="green"
                />
                <MetricCard
                  icon={Target}
                  title="Raised"
                  value={formatCurrency(
                    Number(companyDetails?.company_request_details?.total_received_cash) || 0,
                  )}
                  color="purple"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Remaining"
                  value={formatCurrency(
                    Number(companyDetails?.company_request_details?.remaining_cash) || 0,
                  )}
                  color="orange"
                />
              </div>

              {/* Investment Section */}
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      Investment Opportunity
                    </h3>
                    <p className="text-sm text-gray-600">
                      Requested: {formatCurrency(Number(companyDetails?.company_request_details?.total_required_cash) || 0)} • Raised: {formatCurrency(Number(companyDetails?.company_request_details?.total_received_cash) || 0)} • Remaining: {formatCurrency(Number(companyDetails?.company_request_details?.remaining_cash) || 0)}
                    </p>
                  </div>
                  <CustomButton
                    type="button"
                    variant="solid"
                    onClick={() => setIsInvestmentModalOpen(true)}
                  >
                    Invest Now
                  </CustomButton>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Pie Chart */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Funding Breakdown
                </h3>
                {pieData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="value"
                          strokeWidth={2}
                          stroke="#fff"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatCurrency(value as number)}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex h-64 items-center justify-center text-gray-500">
                    No funding data available
                  </div>
                )}
              </div>

              {/* Company Profile */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Company Profile
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-center text-white">
                    <h4 className="mb-1 text-xl font-bold">
                      {companyDetails?.company_data?.company_name || "N/A"}
                    </h4>
                    <p className="opacity-90">
                      {companyDetails?.company_data?.company_abbreviations || "N/A"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-gray-600">Sector:</span>
                      <p className="font-semibold text-gray-900">
                        {companyDetails?.business_category?.state_name || "N/A"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <span className="text-gray-600">Founded:</span>
                      <p className="font-semibold text-gray-900">
                        {companyDetails?.company_data?.company_start_date
                          ? formatDate(companyDetails.company_data.company_start_date)
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {companyDetails?.company_valuation?.[0] && (
                    <div className="border-t pt-4">
                      <h5 className="mb-3 font-semibold text-gray-900">
                        Latest Valuation
                      </h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-lg bg-green-50 p-3">
                          <span className="text-gray-600">Amount:</span>
                          <p className="font-semibold text-green-600">
                            {formatCurrency(
                              companyDetails.company_valuation[0].valuation_amount,
                              companyDetails.company_valuation[0].valuation_currency,
                            )}
                          </p>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-3">
                          <span className="text-gray-600">Growth Rate:</span>
                          <p className="font-semibold text-blue-600">
                            {companyDetails.company_valuation[0].current_growth_rate || 0}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* About Company Section */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                About Company
              </h3>
              <p className="leading-relaxed text-gray-700">
                {companyDetails?.company_data?.company_short_description || "No company description available at this time."}
              </p>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                About {companyDetails?.company_data?.company_name || "Company"}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Company Overview
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    {companyDetails?.company_data?.company_short_description || "No description available"}
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="mt-1 h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Address</p>
                          <p className="text-gray-600">
                            {companyDetails?.company_contact_details?.address || "N/A"}, {companyDetails?.company_contact_details?.address_city || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Globe className="mt-1 h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">Country</p>
                          <p className="text-gray-600">
                            {companyDetails?.company_contact_details?.country || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Phone className="mt-1 h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-900">Phone</p>
                          <p className="text-gray-600">
                            {companyDetails?.company_contact_details?.phone1 || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail className="mt-1 h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-gray-900">Email</p>
                          <p className="text-gray-600">
                            {companyDetails?.company_contact_details?.work_email || companyDetails?.company_contact_details?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Stock Market Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-green-50 p-4">
                      <span className="text-sm text-gray-600">Market Type</span>
                      <p className="font-semibold text-gray-900">
                        {companyDetails?.stock_market_details?.type_of_market || "N/A"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4">
                      <span className="text-sm text-gray-600">Listed Date</span>
                      <p className="font-semibold text-gray-900">
                        {companyDetails?.stock_market_details?.listed_date || "N/A"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4">
                      <span className="text-sm text-gray-600">Ticker Symbol</span>
                      <p className="font-semibold text-gray-900">
                        {/* No ticker_symbol in sample, fallback to N/A */}
                        {companyDetails?.stock_market_details?.ticker_symbol || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "auditor-notes":
        // Use real data from companyDetails.auditor_review
        const auditorNotes = companyDetails?.auditor_review || [];
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Auditor Notes
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select className="rounded-lg border border-gray-300 px-3 py-1 text-sm">
                    <option>All Categories</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {auditorNotes.length === 0 && (
                  <div className="text-gray-500">No auditor notes available.</div>
                )}
                {auditorNotes.map((note, idx) => (
                  <div
                    key={note.note_id || idx}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-lg p-2 bg-yellow-100">
                          <Shield className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Note
                          </h4>
                          <p className="text-sm text-gray-600">
                            {formatDate(note.note_date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                          {note.status?.toUpperCase() || "ACTIVE"}
                        </span>
                        <span className="rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800">
                          Priority {note.priority}
                        </span>
                      </div>
                    </div>
                    <p className="leading-relaxed text-gray-700">{note.note_content || "No note provided."}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "score-sheet":
        // Use real data from companyDetails.company_score
        const scoreData = companyDetails?.company_score || { completeness_score: 0, grade: "N/A" };
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Company Score Sheet
              </h2>

              {/* Overall Score */}
              <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold text-blue-600">
                    {scoreData?.completeness_score || 0}%
                  </div>
                  <p className="text-gray-600">Overall Company Score</p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <MetricCard
                  icon={CheckCircle}
                  title="Completeness Score"
                  value={`${scoreData?.completeness_score || 0}%`}
                  color="blue"
                  trend="up"
                />
                <MetricCard
                  icon={Award}
                  title="Overall Rating"
                  value={scoreData?.grade || "N/A"}
                  subtitle="Investment Grade"
                  color="green"
                  trend="up"
                />
              </div>
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Company Documents
                </h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <CustomButton type="button" variant="outlined">
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                  </CustomButton>
                </div>
              </div>

              <div className="grid gap-4">
                {companyDetails?.company_documents?.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                          <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {doc.document_name}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Uploaded: {doc.created_at ? formatDate(doc.created_at) : "N/A"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <CustomButton
                          type="button"
                          variant="outlined"
                          onClick={() => openDocumentModal(doc)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </CustomButton>
                        <CustomButton type="button" variant="solid">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "team-directors":
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Leadership Team
              </h2>

              <div className="grid gap-6">
                {companyDetails?.company_directors?.map((director: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-6"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <img
                          src={director.employee_image || "/placeholder.svg"}
                          alt={director.first_name + " " + director.last_name}
                          className="h-20 w-20 rounded-full bg-gray-200 object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {director.title} {director.first_name} {director.last_name}
                            </h3>
                            <p className="text-lg font-medium text-blue-600">
                              {director.nationality}
                            </p>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Globe className="mr-1 h-4 w-4" />
                                {director.nationality}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                Born: {director.dob ? formatDate(director.dob) : "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <CustomButton type="button" variant="outlined">
                              <Mail className="mr-2 h-4 w-4" />
                              Contact
                            </CustomButton>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="mb-2 font-semibold text-gray-900">
                            Experience
                          </h4>
                          <p className="leading-relaxed text-gray-700">
                            {/* No experience field in sample, fallback */}
                            N/A
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "financials":
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Financial Valuations
              </h2>

              {/* Current Valuation */}
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <MetricCard
                  icon={DollarSign}
                  title="Current Valuation"
                  value={formatCurrency(
                    companyDetails?.company_valuation?.[0]?.valuation_amount || 0,
                  )}
                  subtitle={`As of ${companyDetails?.company_valuation?.[0]?.valuation_date ? formatDate(companyDetails.company_valuation[0].valuation_date) : "N/A"}`}
                  color="green"
                  trend="up"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Growth Rate"
                  value={`${companyDetails?.company_valuation?.[0]?.current_growth_rate || 0}%`}
                  subtitle="Annual Growth"
                  color="blue"
                  trend="up"
                />
              </div>

              {/* Valuation History */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Valuation History
                </h3>
                <div className="space-y-4">
                  {companyDetails?.company_valuation?.map(
                    (valuation: any, index: number) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {valuation.valuation_method}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Financial Year: {valuation.financial_year}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">
                              {formatCurrency(
                                valuation.valuation_amount,
                                valuation.valuation_currency,
                              )}
                            </p>
                            <p className="text-sm text-gray-600">
                              {valuation.valuation_date ? formatDate(valuation.valuation_date) : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "previous-funds":
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Previous Funding Rounds
                </h2>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      (companyDetails?.previous_funds || []).reduce(
                        (sum, fund) => sum + (Number(fund.investment_amount) || 0),
                        0,
                      ),
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Total Raised</p>
                </div>
              </div>

              <div className="space-y-6">
                {(companyDetails?.previous_funds || []).map((fund: any) => (
                  <div
                    key={fund.id}
                    className="rounded-lg border border-gray-200 p-6"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {fund.investor_information || fund.investor_type}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {fund.investment_type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(fund.investment_amount, fund.investment_currency)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {fund.date_of_funds ? formatDate(fund.date_of_funds) : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          Valuation
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Company Valuation:</span>
                            <span className="font-medium">
                              {formatCurrency(fund.company_valuation, fund.company_valuation_currency)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Valuation Date:</span>
                            <span className="font-medium">
                              {fund.valuation_date ? formatDate(fund.valuation_date) : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">
                          Investors
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                            {fund.investor_information || fund.investor_type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "company-requests":
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Company Requests
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select className="rounded-lg border border-gray-300 px-3 py-1 text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {(companyDetails?.company_data?.requests || []).flatMap((req: any) => req.requests || []).map((request: any) => (
                  <div
                    key={request.request_id}
                    className="rounded-lg border border-gray-200 p-6"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-lg p-3 bg-blue-100">
                          <Send className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {request.name || "Request"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Amount: {formatCurrency(request.amount, request.currency)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                          {companyDetails?.company_request?.request_status?.toUpperCase() || "PENDING"}
                        </span>
                      </div>
                    </div>

                    <p className="mb-4 text-gray-700">{request.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          Repayment Terms: {request.repayment_terms || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CustomButton type="button" variant="outlined">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "competitions":
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Competitions & Awards
              </h2>

              <div className="space-y-6">
                {mockCompanyData.competitions.map((competition) => (
                  <div
                    key={competition.id}
                    className="rounded-lg border border-gray-200 p-6"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`rounded-lg p-3 ${
                            competition.position === "Winner"
                              ? "bg-yellow-100"
                              : competition.position === "2nd Place"
                                ? "bg-gray-100"
                                : "bg-blue-100"
                          }`}
                        >
                          <Trophy
                            className={`h-6 w-6 ${
                              competition.position === "Winner"
                                ? "text-yellow-600"
                                : competition.position === "2nd Place"
                                  ? "text-gray-600"
                                  : "text-blue-600"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {competition.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Category: {competition.category}
                          </p>
                          <p className="text-sm text-gray-600">
                            Organized by: {competition.organizer}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                            competition.position === "Winner"
                              ? "bg-yellow-100 text-yellow-800"
                              : competition.position === "2nd Place"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {competition.position}
                        </span>
                        <p className="mt-1 text-sm text-gray-600">
                          {formatDate(competition.date)}
                        </p>
                      </div>
                    </div>

                    <p className="mb-3 text-gray-700">
                      {competition.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          Prize: {competition.prize}
                        </span>
                      </div>
                      <CustomButton type="button" variant="outlined" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Certificate
                      </CustomButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "comments-rating":
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Comments & Ratings
                </h2>
                <CustomButton
                  type="button"
                  variant="solid"
                  onClick={() => setIsQuestionModalOpen(true)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Add Review
                </CustomButton>
              </div>

              {/* Rating Summary */}
              <div className="mb-6 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl font-bold text-gray-900">
                        4.4
                      </div>
                      <div>
                        {renderStarRating(4.4, "lg")}
                        <p className="mt-1 text-sm text-gray-600">
                          Based on {mockCompanyData.comments_ratings.length}{" "}
                          reviews
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div
                          key={star}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <span className="w-8">{star}★</span>
                          <div className="h-2 w-24 rounded-full bg-gray-200">
                            <div
                              className="h-2 rounded-full bg-yellow-400"
                              style={{
                                width: `${star === 5 ? 60 : star === 4 ? 30 : star === 3 ? 8 : star === 2 ? 2 : 0}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-gray-600">
                            {star === 5
                              ? "60%"
                              : star === 4
                                ? "30%"
                                : star === 3
                                  ? "8%"
                                  : star === 2
                                    ? "2%"
                                    : "0%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {mockCompanyData.comments_ratings.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-lg border border-gray-200 p-6"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                          <span className="font-semibold text-white">
                            {review.user_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {review.user_name}
                          </h4>
                          <div className="flex items-center space-x-3">
                            {renderStarRating(review.rating)}
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                              {review.user_type}
                            </span>
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
                              {review.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {formatDate(review.date)}
                        </p>
                      </div>
                    </div>

                    <p className="mb-4 leading-relaxed text-gray-700">
                      {review.comment}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Helpful ({review.helpful_votes})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
                          <ThumbsDown className="h-4 w-4" />
                          <span>Not Helpful</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                          <Flag className="h-4 w-4" />
                          <span>Report</span>
                        </button>
                      </div>
                      <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment Form */}
              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Add Your Review
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewRating(star)}
                          className={`h-8 w-8 ${
                            star <= newRating
                              ? "fill-current text-yellow-400"
                              : "text-gray-300"
                          } transition-colors hover:text-yellow-400`}
                        >
                          <Star className="h-full w-full" />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({newRating}/5)
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Your Review
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={4}
                      placeholder="Share your experience with this company..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>
                  <CustomButton type="button" variant="solid">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Review
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (investmentLoading && !investmentDataLoaded) {
    return (
      <MainLayout>
        <div className="flex h-screen">
          <div className="w-64 border-r border-gray-200 bg-white">
            <LoadingSkeleton className="h-full" />
          </div>
          <div className="flex-1 p-6">
            <LoadingSkeleton className="mb-6 h-32 w-full" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <LoadingSkeleton className="h-64" />
              <LoadingSkeleton className="h-64" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile sidebar overlay */}
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <div className="absolute right-0 top-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <X className="h-6 w-6 text-white" />
                    </button>
                  </div>
                  <div className="h-0 flex-1 overflow-y-auto pb-4 pt-5">
                    <nav className="mt-5 space-y-1 px-2">
                      {navigationItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveSection(item.id);
                            setSidebarOpen(false);
                          }}
                          className={classNames(
                            activeSection === item.id
                              ? "bg-blue-100 text-blue-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium",
                          )}
                        >
                          <item.icon
                            className={classNames(
                              activeSection === item.id
                                ? "text-blue-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-3 h-6 w-6 flex-shrink-0",
                            )}
                          />
                          {item.name}
                          {item.loading && (
                            <Loader2 className="ml-auto h-4 w-4 animate-spin" />
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {/* Desktop sidebar */}
        <div className="z-0 hidden lg:fixed  lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-grow flex-col border-r border-gray-200 bg-white pb-4 pt-5">
           
            <nav className="mt-8 flex-1 space-y-1 px-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={classNames(
                    activeSection === item.id
                      ? "border-r-2 border-blue-500 bg-blue-100 text-blue-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex w-full items-center rounded-l-md px-3 py-2 text-sm font-medium transition-colors",
                  )}
                >
                  <item.icon
                    className={classNames(
                      activeSection === item.id
                        ? "text-blue-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 h-5 w-5 flex-shrink-0",
                    )}
                  />
                  {item.name}
                  {item.loading && (
                    <Loader2 className="ml-auto h-4 w-4 animate-spin" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col lg:pl-64">
          {/* Mobile header */}
          <div className="sticky top-0 z-10 bg-gray-50 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">{renderContent()}</div>
          </main>
        </div>
      </div>

      {/* All modals remain the same as in the previous version */}
      {/* Investment Modal */}
      <Transition appear show={isInvestmentModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setIsInvestmentModalOpen}
        >
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-4">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-white"
                    >
                      Invest in{" "}
                      {companySummary?.company_details?.company_name ||
                        "Company"}
                    </Dialog.Title>
                    <p className="mt-1 text-emerald-100">
                      Join the investment opportunity
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <TextField
                        label="Investment Amount (USD)"
                        type="number"
                        placeholder="Enter amount"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        icon={<DollarSign className="h-5 w-5" />}
                      />

                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <h4 className="mb-3 font-semibold text-gray-900">
                          Investment Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Available:</span>
                            <span className="font-semibold text-emerald-600">
                              {formatCurrency(
                                companySummary?.pie_chart_payment_summary
                                  ?.remaining || 0,
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Minimum Investment:
                            </span>
                            <span className="font-semibold">$1,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Expected Return:
                            </span>
                            <span className="font-semibold text-green-600">
                              15-25% annually
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 px-6 pb-6">
                    <CustomButton
                      type="button"
                      variant="solid"
                      fullWidth
                      onClick={handleInvestment}
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Confirm Investment
                    </CustomButton>
                    <CustomButton
                      type="button"
                      variant="outlined"
                      fullWidth
                      onClick={() => setIsInvestmentModalOpen(false)}
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

      {/* Document Modal */}
      <Transition appear show={isDocumentModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setIsDocumentModalOpen}
        >
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                  <div className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-4">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-white"
                    >
                      {selectedDocument?.document_name || "Document"}
                    </Dialog.Title>
                    <button
                      onClick={() => setIsDocumentModalOpen(false)}
                      className="text-white hover:text-gray-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                      <FileText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                      <h4 className="mb-2 text-lg font-semibold text-gray-700">
                        Document Preview
                      </h4>
                      <p className="mb-4 text-gray-600">
                        Document preview would be displayed here
                      </p>
                      {selectedDocument?.created_at && (
                        <p className="text-sm text-gray-500">
                          Uploaded: {formatDate(selectedDocument.created_at)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3 px-6 pb-6">
                    <CustomButton type="button" variant="solid" fullWidth>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </CustomButton>
                    <CustomButton type="button" variant="outlined" fullWidth>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in New Tab
                    </CustomButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Question Modal */}
      <Transition appear show={isQuestionModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setIsQuestionModalOpen}
        >
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-white"
                    >
                      Ask a Question
                    </Dialog.Title>
                    <p className="mt-1 text-blue-100">
                      Get answers from the company
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <TextField
                        label="Your Email"
                        type="email"
                        placeholder="Enter your email"
                        value={investorEmail}
                        onChange={(e) => setInvestorEmail(e.target.value)}
                        icon={<Mail className="h-5 w-5" />}
                      />

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Your Question
                        </label>
                        <textarea
                          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          rows={4}
                          placeholder="What would you like to know about this company?"
                          value={investorQuestion}
                          onChange={(e) => setInvestorQuestion(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 px-6 pb-6">
                    <CustomButton
                      type="button"
                      variant="solid"
                      fullWidth
                      onClick={handleQuestionSubmit}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Submit Question
                    </CustomButton>
                    <CustomButton
                      type="button"
                      variant="outlined"
                      fullWidth
                      onClick={() => setIsQuestionModalOpen(false)}
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
  );
}
