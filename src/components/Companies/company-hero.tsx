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
  FileText,
  CreditCard,
  Shield,
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

  // Use provided values or fallback to dynamic data
  const totalRequired = 15000 // Fixed value as per request

  // Truncate description to a reasonable length
  const getShortDescription = (description: string) => {
    if (!description) return "Innovative e-commerce platform driving retail transformation"
    return description.length > 80 ? description.substring(0, 80) + "..." : description
  }

  return (
    <div className="relative mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 rounded-3xl"></div>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
        {/* Top Row - Company Identity */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div>
            <img
              src={
                companyDetails?.company_logo && !imageError
                  ? `https://zimstartup-861d8915d228.herokuapp.com/${companyDetails.company_logo}`
                  : "/placeholder.svg?height=100&width=100"
              }
              alt={companyDetails?.company_name || "Company Logo"}
              className="relative w-24 h-24 object-contain rounded-2xl border-2 border-white shadow-lg"
              onError={() => setImageError(true)}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                {companyDetails?.company_name || "Company Name"}
              </h1>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              {getShortDescription(companyDetails?.company_short_description)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <CustomButton
              variant="solid"
              onClick={onInvestClick}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Invest Now
            </CustomButton>

            <CustomButton
              variant="outlined"
              onClick={onWatchlistClick}
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              <Heart className="h-4 w-4 mr-2" />
              Watchlist
            </CustomButton>

            <CustomButton
              variant="outlined"
              onClick={onQuestionClick}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Question
            </CustomButton>
          </div>
        </div>

        {/* Information Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {/* State Pill */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 hover:shadow-sm transition-shadow">
            <MapPin className="h-3 w-3 mr-1.5" />
            <span className="text-xs text-blue-600 mr-1">State:</span>
            <span className="font-semibold text-xs">E-Commerce</span>
          </div>

          {/* Request Type Pill */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border border-purple-200 hover:shadow-sm transition-shadow">
            <FileText className="h-3 w-3 mr-1.5" />
            <span className="text-xs text-purple-600 mr-1">Request:</span>
            <span className="font-semibold text-xs">Acquisition</span>
          </div>

          {/* Company Score Pill */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 hover:shadow-sm transition-shadow">
            <Shield className="h-3 w-3 mr-1.5" />
            <span className="text-xs text-green-600 mr-1">Score:</span>
            <span className="font-semibold text-xs">100%</span>
          </div>

          {/* Currency Pill */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200 hover:shadow-sm transition-shadow">
            <CreditCard className="h-3 w-3 mr-1.5" />
            <span className="text-xs text-yellow-600 mr-1">Currency:</span>
            <span className="font-semibold text-xs">USD</span>
          </div>

          {/* Moving Price Pill */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200 hover:shadow-sm transition-shadow">
            <DollarSign className="h-3 w-3 mr-1.5" />
            <span className="text-xs text-emerald-600 mr-1">Price:</span>
            <span className="font-semibold text-xs">$15,000</span>
          </div>

          {/* Sector Pill */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border border-cyan-200 hover:shadow-sm transition-shadow">
            <Briefcase className="h-3 w-3 mr-1.5" />
            <span className="text-xs text-cyan-600 mr-1">Sector:</span>
            <span className="font-semibold text-xs">Retail</span>
          </div>

          {/* Profile Pill */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200 hover:shadow-sm transition-shadow">
            <AlertTriangle className="h-3 w-3 mr-1.5" />
            <span className="text-xs text-red-600 mr-1">Profile:</span>
            <span className="font-semibold text-xs">Risky</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedCompanyHero
