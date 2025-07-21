"use client"

import { useState } from "react"
import { DollarSign, Plus, Eye, Calendar, Info, BarChart } from "lucide-react"
import CustomButton from "./ui/custom-button"
import MoneyDisplay from "@/components/common/MoneyDisplay"
import AddCompanyValuationDialog from "./dialogs/add-company-valuation-dialog"

interface Fund {
  investor_type: string
  investor_information?: string
  investment_type: string
  date_of_funds: string
  investment_currency: string
  investment_amount: number
  company_valuation: number
  company_valuation_currency: string
  valuation_date: string
}

interface Valuation {
  valuation_id?: number
  valuation_amount: number;
  valuation_date: string;
  notes: string;
  valuation_method: string;
  valuation_currency: string;
  financial_year: number;
  financial_period: string;
  current_growth_rate: number;
}

interface FundsAndValuationSectionProps {
  fundsData: Fund[] | null
  valuationsData: Valuation[] | null
  onAddFunds: () => void
  onAddValuation: (data: any) => void
  companyId: number
}

export default function FundsAndValuationSection({
  fundsData,
  valuationsData,
  onAddFunds,
  onAddValuation,
  companyId,
}: FundsAndValuationSectionProps) {
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false)

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-8">
      {/* Previous Funds Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Previous Funding Rounds</h3>
          <CustomButton type="button" variant="solid" icon={<Plus className="h-4 w-4" />} onClick={onAddFunds}>
            Add Funding
          </CustomButton>
        </div>
        {!fundsData || fundsData.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
            <div className="text-center text-gray-500">
              <DollarSign className="mx-auto h-10 w-10" />
              <p className="mt-2">No funding rounds recorded</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Investor Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Investment Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valuation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fundsData.map((fund, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{fund.investor_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{fund.investment_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <MoneyDisplay amount={fund.investment_amount} currency={fund.investment_currency} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <MoneyDisplay amount={fund.company_valuation} currency={fund.company_valuation_currency} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(fund.date_of_funds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Company Valuations Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Company Valuations</h3>
          <CustomButton type="button" variant="solid" icon={<Plus className="h-4 w-4" />} onClick={() => setIsValuationModalOpen(true)}>
            Add Valuation
          </CustomButton>
        </div>
        {!valuationsData || valuationsData.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
            <div className="text-center text-gray-500">
              <BarChart className="mx-auto h-10 w-10" />
              <p className="mt-2">No valuations recorded</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {valuationsData.map((valuation) => (
                  <tr key={valuation.valuation_id}>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(valuation.valuation_date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <MoneyDisplay amount={valuation.valuation_amount} currency={valuation.valuation_currency} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{valuation.valuation_method}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{valuation.current_growth_rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddCompanyValuationDialog
        isOpen={isValuationModalOpen}
        onClose={() => setIsValuationModalOpen(false)}
        companyId={companyId}
        onSave={(data) => {
          onAddValuation(data)
          setIsValuationModalOpen(false)
        }}
      />
    </div>
  )
}
