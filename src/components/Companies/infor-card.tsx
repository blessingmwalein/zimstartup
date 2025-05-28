"use client"

import { useState } from "react"
import { Calendar, Building2, TrendingUp, DollarSign, Target, PieChart, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react'
import CustomButton from "./ui/custom-button"

interface CompanyInfoCardsProps {
  companySummary: any
  formatDate: (date: string) => string
  formatCurrency: (amount: number) => string
  onInvestClick: () => void
}

// Animated Progress Bar Component
const ProgressBar = ({ value, max = 100, color = "emerald", size = "md" }: {
  value: number
  max?: number
  color?: "emerald" | "blue" | "purple" | "orange"
  size?: "sm" | "md" | "lg"
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  }
  
  const colorClasses = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500"
  }

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: `${percentage}%`,
            transform: `translateX(-${100 - percentage}%)`,
            animation: "slideIn 1.5s ease-out forwards"
          }}
        />
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  )
}

// Metric Item Component
const MetricItem = ({ icon: Icon, label, value, trend, color = "slate" }: {
  icon: any
  label: string
  value: string | number
  trend?: "up" | "down" | "neutral"
  color?: string
}) => {
  const trendIcons = {
    up: ArrowUpRight,
    down: ArrowDownRight,
    neutral: null
  }
  
  const TrendIcon = trend ? trendIcons[trend] : null

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className={`p-2 rounded-lg bg-${color}-100`}>
        <Icon className={`h-4 w-4 text-${color}-600`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-600 truncate">{label}</p>
        <div className="flex items-center space-x-1">
          <p className="font-semibold text-slate-900">{value}</p>
          {TrendIcon && (
            <TrendIcon className={`h-3 w-3 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
          )}
        </div>
      </div>
    </div>
  )
}

// Investment Status Badge
const InvestmentStatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'equity financing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'debt financing':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'company acquisitions':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
      {status || 'N/A'}
    </span>
  )
}

export default function CompanyInfoCards({ 
  companySummary, 
  formatDate, 
  formatCurrency, 
  onInvestClick 
}: CompanyInfoCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  
  const completenessScore = companySummary?.company_score?.completeness_score || 0
  const totalRequired = companySummary?.pie_chart_payment_summary?.total_required || 0
  const totalReceived = companySummary?.pie_chart_payment_summary?.total_received || 0
  const remaining = companySummary?.pie_chart_payment_summary?.remaining || 0
  
  const fundingProgress = totalRequired > 0 ? (totalReceived / totalRequired) * 100 : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Company Overview Card */}
      <div 
        className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden"
        onMouseEnter={() => setHoveredCard('overview')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Company Overview</h3>
            <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <MetricItem
              icon={Calendar}
              label="Founded"
              value={formatDate(companySummary?.company_details?.company_start_date)}
              color="blue"
            />
            
            <MetricItem
              icon={Building2}
              label="Company ID"
              value={companySummary?.company_details?.company_abbreviations || "N/A"}
              color="indigo"
            />
            
            {/* Completeness Score with Progress Bar */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">Profile Completeness</span>
                </div>
                <span className="text-lg font-bold text-emerald-700">{completenessScore}%</span>
              </div>
              <ProgressBar value={completenessScore} color="emerald" size="md" />
              <p className="text-xs text-emerald-600 mt-2">
                {completenessScore >= 80 ? "Excellent profile!" : 
                 completenessScore >= 60 ? "Good progress" : "Needs improvement"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Request Card */}
      <div 
        className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden"
        onMouseEnter={() => setHoveredCard('investment')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Investment Request</h3>
            <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
              <PieChart className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Investment Type Badge */}
            <div>
              <p className="text-sm text-slate-600 mb-2">Investment Type</p>
              <InvestmentStatusBadge status={companySummary?.company_details?.request_type} />
            </div>
            
            {/* Funding Progress */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-purple-800">Funding Progress</span>
                <span className="text-sm font-bold text-purple-700">{fundingProgress.toFixed(1)}%</span>
              </div>
              <ProgressBar value={fundingProgress} color="purple" size="md" />
              <div className="flex justify-between text-xs text-purple-600 mt-2">
                <span>Raised: {formatCurrency(totalReceived)}</span>
                <span>Goal: {formatCurrency(totalRequired)}</span>
              </div>
            </div>
            
            <MetricItem
              icon={Target}
              label="Total Required"
              value={formatCurrency(totalRequired)}
              color="purple"
            />
          </div>
        </div>
      </div>

      {/* Investment Opportunity Card */}
      <div 
        className="group relative bg-white rounded-2xl shadow-sm border border-emerald-200 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden"
        onMouseEnter={() => setHoveredCard('opportunity')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Investment Opportunity</h3>
            <div className="p-2 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Available Amount Highlight */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <DollarSign className="h-6 w-6" />
                <span className="text-sm font-medium opacity-90">Available Now</span>
              </div>
              <div className="text-3xl font-bold mb-1">
                {formatCurrency(remaining)}
              </div>
              <div className="text-sm opacity-90">
                {remaining > 0 ? "Ready for Investment" : "Fully Funded"}
              </div>
            </div>
            
            {/* Investment Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-emerald-50">
                <div className="text-lg font-bold text-emerald-700">
                  {totalRequired > 0 ? Math.round((remaining / totalRequired) * 100) : 0}%
                </div>
                <div className="text-xs text-emerald-600">Available</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-emerald-50">
                <div className="text-lg font-bold text-emerald-700">
                  {totalRequired > 0 ? Math.round((totalReceived / totalRequired) * 100) : 0}%
                </div>
                <div className="text-xs text-emerald-600">Funded</div>
              </div>
            </div>
            
            {/* Investment Button */}
            <CustomButton
              variant="solid"
              fullWidth
              onClick={onInvestClick}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Invest Now</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </CustomButton>
            
            {remaining <= 0 && (
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span>Investment opportunity closed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
