"use client"

import { useState } from "react"
import { TrendingUp, Plus, Eye } from "lucide-react"
import CustomButton from "./ui/custom-button"
import ViewFinancialMetricDialog from "./dialogs/view-financial-metric-dialog"
import MoneyDisplay from "@/components/common/MoneyDisplay"

interface FinancialMetric {
  metric_id: number;
  company_id: number;
  revenue: number;
  profit_margin: number;
  ebitda: number;
  cash_flow: number;
  total_assets: number;
  total_liabilities: number;
  debt_level: number;
  valuation_multiple: number;
  revenue_growth_rate: number;
  customer_growth_rate: number;
  market_share: number;
  retention_rate: number;
}

interface FinancialMetricsSectionProps {
  metricsData: FinancialMetric[] | null
  onAddMetrics: () => void
}

export default function FinancialMetricsSection({ metricsData, onAddMetrics }: FinancialMetricsSectionProps) {
  const [selectedMetric, setSelectedMetric] = useState<FinancialMetric | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const handleViewMore = (metric: FinancialMetric) => {
    setSelectedMetric(metric)
    setIsViewModalOpen(true)
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

      {!metricsData || metricsData.length === 0 ? (
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit Margin
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EBITDA
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cash Flow
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {metricsData.map((metric) => (
                <tr key={metric.metric_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{metric.metric_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><MoneyDisplay amount={metric.revenue} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPercentage(metric.profit_margin)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><MoneyDisplay amount={metric.ebitda} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><MoneyDisplay amount={metric.cash_flow} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <CustomButton
                      type="button"
                      variant="outlined"
                      size="sm"
                      icon={<Eye className="h-4 w-4" />}
                      onClick={() => handleViewMore(metric)}
                    >
                      View More
                    </CustomButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ViewFinancialMetricDialog
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        metricData={selectedMetric}
      />
    </div>
  )
}
