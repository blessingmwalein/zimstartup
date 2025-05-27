"use client"

import { TrendingUp, Plus } from "lucide-react"
import CustomButton from "./ui/custom-button"
interface FinancialMetricsSectionProps {
  metricsData: any
  onAddMetrics: () => void
}

export default function FinancialMetricsSection({ metricsData, onAddMetrics }: FinancialMetricsSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Financial Metrics</h3>
        <CustomButton type="button" variant="solid" icon={<Plus className="h-4 w-4" />} onClick={onAddMetrics}>
          Add Metrics
        </CustomButton>
      </div>

      {!metricsData ? (
        <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
          <div className="text-center text-gray-500">
            <TrendingUp className="mx-auto h-10 w-10" />
            <p className="mt-2">No financial metrics available</p>
            <button onClick={onAddMetrics} className="mt-2 text-[#001f3f] hover:underline">
              Add financial metrics
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Financial Performance */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Financial Performance</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-medium">{formatCurrency(metricsData.revenue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Profit Margin</span>
                <span className="font-medium">{formatPercentage(metricsData.profit_margin)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">EBITDA</span>
                <span className="font-medium">{formatCurrency(metricsData.ebitda)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cash Flow</span>
                <span className="font-medium">{formatCurrency(metricsData.cash_flow)}</span>
              </div>
            </div>
          </div>

          {/* Financial Position */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Financial Position</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Assets</span>
                <span className="font-medium">{formatCurrency(metricsData.total_assets)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Liabilities</span>
                <span className="font-medium">{formatCurrency(metricsData.total_liabilities)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Debt Level</span>
                <span className="font-medium">{formatCurrency(metricsData.debt_level)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Valuation Multiple</span>
                <span className="font-medium">{metricsData.valuation_multiple}x</span>
              </div>
            </div>
          </div>

          {/* Growth & Market */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Growth & Market</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revenue Growth</span>
                <span className="font-medium">{formatPercentage(metricsData.revenue_growth_rate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customer Growth</span>
                <span className="font-medium">{formatPercentage(metricsData.customer_growth_rate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Market Share</span>
                <span className="font-medium">{formatPercentage(metricsData.market_share)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Retention Rate</span>
                <span className="font-medium">{formatPercentage(metricsData.retention_rate)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
