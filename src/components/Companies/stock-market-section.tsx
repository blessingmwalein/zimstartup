"use client"

import { Edit } from "lucide-react"
import CustomButton from "./ui/custom-button"

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
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Stock Market Details</h3>
        <CustomButton type="button" variant="solid" icon={<Edit className="h-4 w-4" />} onClick={onEdit}>
          Edit Stock Market Details
        </CustomButton>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">ISIN</h4>
            <p className="font-medium">{stockMarketData.ISIN || "Not provided"}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Type of Market</h4>
            <p className="font-medium">{stockMarketData.market_type_id || "Not provided"}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Stock ID</h4>
            <p className="font-medium">{stockMarketData.stock_id || "Not provided"}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Listed Date</h4>
            <p className="font-medium">{formatDate(stockMarketData.listed_date)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Listing Capital</h4>
            <p className="font-medium">
              {formatCurrency(stockMarketData.listing_capital, stockMarketData.listing_currency)}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Current Market Cap</h4>
            <p className="font-medium">
              {formatCurrency(stockMarketData.current_market_cap, stockMarketData.listing_currency)}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Listing Currency</h4>
            {stockMarketData.listing_currency ? (
              <span className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {stockMarketData.listing_currency}
              </span>
            ) : (
              <p className="font-medium">Not provided</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Delisted Date</h4>
            <p className="font-medium">{formatDate(stockMarketData.delisted_date)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Financial Year End</h4>
            <p className="font-medium">{formatDate(stockMarketData.financial_year_end)}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Transfer Secretary</h4>
            <p className="font-medium">{stockMarketData.transfer_secretary || "Not provided"}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Reporting Currency</h4>
            {stockMarketData.reporting_currency ? (
              <span className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {stockMarketData.reporting_currency}
              </span>
            ) : (
              <p className="font-medium">Not provided</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
