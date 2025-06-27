"use client"

import { useState } from "react"
import {
  MapPin,
  DollarSign,
  Star,
  Briefcase,
  Heart,
  MessageSquare,
  AlertTriangle,
  CreditCard,
  Shield,
  TrendingUp,
  Users,
  Calendar,
  Target,
} from "lucide-react"
import CustomButton from "@/components/Buttons/CustomButton"

interface CompanyHeroProps {
  companySummary: any
  formatDate: (date: string) => string
  formatCurrency: (amount: number, currency?: string) => string
  onInvestClick: () => void
  onQuestionClick: () => void
  onWatchlistClick: () => void
}

const EnhancedCompanyHero = ({
  companySummary,
  formatDate,
  formatCurrency,
  onInvestClick,
  onQuestionClick,
  onWatchlistClick,
}: CompanyHeroProps) => {
  const [imageError, setImageError] = useState(false)

  const companyDetails = companySummary?.company_details
  const paymentSummary = companySummary?.pie_chart_payment_summary
  const companyScore = companySummary?.company_score || { completeness_score: 100 }

  // Investment data
  const totalRequired = 15000
  const currentRaised = 8500
  const progressPercentage = (currentRaised / totalRequired) * 100
  const daysLeft = 45
  const investors = 127

  const getShortDescription = (description: string) => {
    if (!description)
      return "Innovative e-commerce platform driving retail transformation through cutting-edge technology and strategic market positioning."
    return description.length > 120 ? description.substring(0, 120) + "..." : description
  }

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl"></div>

      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8">
          {/* Company Logo & Basic Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20"></div>
              <img
                src={
                  companyDetails?.company_logo && !imageError
                    ? `https://zimstartup-861d8915d228.herokuapp.com/${companyDetails.company_logo}`
                    : "/placeholder.svg?height=80&width=80"
                }
                alt={companyDetails?.company_name || "Company Logo"}
                className="relative w-20 h-20 object-contain rounded-xl border-2 border-white shadow-md"
                onError={() => setImageError(true)}
              />
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                {companyDetails?.company_name || "TechCorp Solutions"}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.8 (234 reviews)</span>
                </div>
              </div>
              <p className="text-gray-600 max-w-2xl leading-relaxed">
                {getShortDescription(companyDetails?.company_short_description)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto">
            <CustomButton
              variant="solid"
              onClick={onInvestClick}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Invest Now
            </CustomButton>

            <CustomButton
              variant="outlined"
              onClick={onWatchlistClick}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3"
            >
              <Heart className="h-4 w-4 mr-2" />
              Save
            </CustomButton>

            <CustomButton
              variant="outlined"
              onClick={onQuestionClick}
              className="border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-3"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask
            </CustomButton>
          </div>
        </div>

        {/* Investment Progress Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-100">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Investment Progress</h3>
              <p className="text-sm text-gray-600">Acquisition opportunity - Limited time offer</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(currentRaised)} / {formatCurrency(totalRequired)}
              </div>
              <div className="text-sm text-gray-600">{progressPercentage.toFixed(1)}% funded</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>

          {/* Investment Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{investors}</div>
              <div className="text-sm text-gray-600">Investors</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{daysLeft}</div>
              <div className="text-sm text-gray-600">Days Left</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">$118</div>
              <div className="text-sm text-gray-600">Min. Investment</div>
            </div>
          </div>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Sector</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">E-Commerce</div>
            <div className="text-xs text-gray-600">Retail Technology</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Stage</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">Growth</div>
            <div className="text-xs text-gray-600">Series A</div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Score</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">100%</div>
            <div className="text-xs text-gray-600">Excellent</div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Risk</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">Medium</div>
            <div className="text-xs text-gray-600">Moderate</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200">
            <MapPin className="h-3 w-3 mr-1.5" />
            <span className="font-medium">San Francisco, CA</span>
          </div>

          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-100 text-blue-700 border border-blue-200">
            <Calendar className="h-3 w-3 mr-1.5" />
            <span className="font-medium">Founded 2019</span>
          </div>

          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-green-100 text-green-700 border border-green-200">
            <TrendingUp className="h-3 w-3 mr-1.5" />
            <span className="font-medium">+127% YoY Growth</span>
          </div>

          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-purple-100 text-purple-700 border border-purple-200">
            <Users className="h-3 w-3 mr-1.5" />
            <span className="font-medium">50K+ Customers</span>
          </div>

          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-yellow-100 text-yellow-700 border border-yellow-200">
            <CreditCard className="h-3 w-3 mr-1.5" />
            <span className="font-medium">$2.5M ARR</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedCompanyHero
