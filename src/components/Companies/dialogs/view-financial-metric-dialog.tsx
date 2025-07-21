"use client"
import { Dialog } from "@headlessui/react"
import { X, DollarSign, Percent, TrendingUp, BarChart, Users, AreaChart, PieChart } from "lucide-react"
import MoneyDisplay from "@/components/common/MoneyDisplay"

interface FinancialMetric {
  metric_id: number
  company_id: number
  revenue: number
  profit_margin: number
  ebitda: number
  cash_flow: number
  total_assets: number
  total_liabilities: number
  debt_level: number
  valuation_multiple: number
  revenue_growth_rate: number
  customer_growth_rate: number
  market_share: number
  retention_rate: number
}

interface ViewFinancialMetricDialogProps {
  isOpen: boolean
  onClose: () => void
  metricData: FinancialMetric | null
}

export default function ViewFinancialMetricDialog({ isOpen, onClose, metricData }: ViewFinancialMetricDialogProps) {
  if (!metricData) return null

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  const sections = [
    {
      title: "Financial Performance",
      icon: <TrendingUp className="h-5 w-5 text-gray-600" />,
      metrics: [
        { label: "Revenue", value: <MoneyDisplay amount={metricData.revenue} />, icon: <DollarSign className="h-4 w-4 text-gray-400" /> },
        { label: "Profit Margin", value: formatPercentage(metricData.profit_margin), icon: <Percent className="h-4 w-4 text-gray-400" /> },
        { label: "EBITDA", value: <MoneyDisplay amount={metricData.ebitda} />, icon: <BarChart className="h-4 w-4 text-gray-400" /> },
        { label: "Cash Flow", value: <MoneyDisplay amount={metricData.cash_flow} />, icon: <AreaChart className="h-4 w-4 text-gray-400" /> },
      ],
    },
    {
      title: "Financial Position",
      icon: <PieChart className="h-5 w-5 text-gray-600" />,
      metrics: [
        { label: "Total Assets", value: <MoneyDisplay amount={metricData.total_assets} />, icon: <DollarSign className="h-4 w-4 text-gray-400" /> },
        { label: "Total Liabilities", value: <MoneyDisplay amount={metricData.total_liabilities} />, icon: <DollarSign className="h-4 w-4 text-gray-400" /> },
        { label: "Debt Level", value: <MoneyDisplay amount={metricData.debt_level} />, icon: <BarChart className="h-4 w-4 text-gray-400" /> },
        { label: "Valuation Multiple", value: `${metricData.valuation_multiple}x`, icon: <TrendingUp className="h-4 w-4 text-gray-400" /> },
      ],
    },
    {
      title: "Growth & Market",
      icon: <Users className="h-5 w-5 text-gray-600" />,
      metrics: [
        { label: "Revenue Growth Rate", value: formatPercentage(metricData.revenue_growth_rate), icon: <TrendingUp className="h-4 w-4 text-gray-400" /> },
        { label: "Customer Growth Rate", value: formatPercentage(metricData.customer_growth_rate), icon: <Users className="h-4 w-4 text-gray-400" /> },
        { label: "Market Share", value: formatPercentage(metricData.market_share), icon: <PieChart className="h-4 w-4 text-gray-400" /> },
        { label: "Retention Rate", value: formatPercentage(metricData.retention_rate), icon: <Percent className="h-4 w-4 text-gray-400" /> },
      ],
    },
  ]

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <Dialog.Title className="text-xl font-semibold">Financial Metric Details</Dialog.Title>
                <p className="text-sm text-gray-500">Metric ID: {metricData.metric_id}</p>
              </div>
              <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    {section.icon}
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0">{metric.icon}</div>
                        <div>
                          <p className="text-sm text-gray-500">{metric.label}</p>
                          <p className="font-medium">{metric.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 