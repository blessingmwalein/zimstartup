"use client"

import { Edit, TrendingUp, Calendar, DollarSign, FileText, Building2, Badge } from "lucide-react"

interface StockMarketSectionProps {
  stockMarketData: any
  onEdit: () => void
}

export default function StockMarketSection({ stockMarketData, onEdit }: StockMarketSectionProps) {
  const formatDate = (date: string | null) => {
    if (!date) return "Not provided"
    return new Date(date).toLocaleDateString()
  }

  const formatCurrency = (amount: number | null, currency: string | null) => {
    if (amount === null) return "Not provided"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount)
  }

  return (
    <div className="rounded-3xl border-none bg-white p-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Stock Market Details</h3>
          <p className="mt-1 text-sm text-gray-500">Market listing and trading information</p>
        </div>
        <button
          onClick={onEdit}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
        >
          <Edit className="h-5 w-5" />
        </button>
      </div>

      {/* Stock Market Information Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">ISIN</p>
            <p className="mt-1 font-normal text-gray-900">{stockMarketData.ISIN || "Not provided"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-50">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Type of Market</p>
            <p className="mt-1 font-normal text-gray-900">{stockMarketData.market_type_id || "Not provided"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50">
            <Badge className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Stock ID</p>
            <p className="mt-1 font-normal text-gray-900">{stockMarketData.stock_id || "Not provided"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
            <Calendar className="h-6 w-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Listed Date</p>
            <p className="mt-1 font-normal text-gray-900">{formatDate(stockMarketData.listed_date)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-50">
            <DollarSign className="h-6 w-6 text-cyan-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Listing Capital</p>
            <p className="mt-1 font-normal text-gray-900">
              {formatCurrency(stockMarketData.listing_capital, stockMarketData.listing_currency)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50">
            <DollarSign className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Current Market Cap</p>
            <p className="mt-1 font-normal text-gray-900">
              {formatCurrency(stockMarketData.current_market_cap, stockMarketData.listing_currency)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-pink-50">
            <DollarSign className="h-6 w-6 text-pink-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Listing Currency</p>
            <div className="mt-1">
              {stockMarketData.listing_currency ? (
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {stockMarketData.listing_currency}
                </span>
              ) : (
                <p className="font-normal text-gray-900">Not provided</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-50">
            <Calendar className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Delisted Date</p>
            <p className="mt-1 font-normal text-gray-900">{formatDate(stockMarketData.delisted_date)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-50">
            <Calendar className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Financial Year End</p>
            <p className="mt-1 font-normal text-gray-900">{formatDate(stockMarketData.financial_year_end)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50">
            <Building2 className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Transfer Secretary</p>
            <p className="mt-1 font-normal text-gray-900">{stockMarketData.transfer_secretary || "Not provided"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50">
            <DollarSign className="h-6 w-6 text-teal-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Reporting Currency</p>
            <div className="mt-1">
              {stockMarketData.reporting_currency ? (
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {stockMarketData.reporting_currency}
                </span>
              ) : (
                <p className="font-normal text-gray-900">Not provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
