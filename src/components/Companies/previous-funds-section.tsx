"use client"

import { DollarSign, Plus } from "lucide-react"
import CustomButton from "./ui/custom-button"

interface FundData {
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

interface PreviousFundsSectionProps {
  fundData: FundData | null
  onAddFunds: () => void
}

export default function PreviousFundsSection({ fundData, onAddFunds }: PreviousFundsSectionProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Previous Funding Round</h3>
        <CustomButton type="button" variant="solid" icon={<Plus className="h-4 w-4" />} onClick={onAddFunds}>
          Add Funding Round
        </CustomButton>
      </div>

      {!fundData ? (
        <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
          <div className="text-center text-gray-500">
            <DollarSign className="mx-auto h-10 w-10" />
            <p className="mt-2">No funding round recorded</p>
            <button onClick={onAddFunds} className="mt-2 text-[#001f3f] hover:underline">
              Add your first funding round
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2 text-green-700">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">{fundData.investor_type}</h4>
                <p className="text-sm text-gray-600">{fundData.investment_type}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Investment</p>
                <p className="font-medium">
                  {formatCurrency(fundData.investment_amount, fundData.investment_currency)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Valuation</p>
                <p className="font-medium">
                  {formatCurrency(fundData.company_valuation, fundData.company_valuation_currency)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(fundData.date_of_funds)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Valuation Date</p>
                <p className="font-medium">{formatDate(fundData.valuation_date)}</p>
              </div>
            </div>
          </div>
          {fundData.investor_information && (
            <div className="mt-3 border-t border-gray-200 pt-3">
              <p className="text-sm text-gray-700">{fundData.investor_information}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
