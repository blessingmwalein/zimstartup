"use client"
import { Dialog } from "@headlessui/react"
import { X, DollarSign, Percent, Calendar, TrendingUp, Info } from "lucide-react"
import MoneyDisplay from "@/components/common/MoneyDisplay"

interface RevenueFinancingData {
  request_id: number
  description: string
  amount: number
  currency: string
  revenue_share: number
  repayment_terms: string
  payment_frequency: string
  projected_revenue: number
  projected_profit: number
  status: string
}

interface ViewRevenueFinancingDialogProps {
  isOpen: boolean
  onClose: () => void
  requestData: RevenueFinancingData | null
}

export default function ViewRevenueFinancingDialog({ isOpen, onClose, requestData }: ViewRevenueFinancingDialogProps) {
  if (!requestData) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <Dialog.Title className="text-xl font-semibold">Revenue-Based Financing Details</Dialog.Title>
                <p className="text-sm text-gray-500">Request ID: {requestData.request_id}</p>
              </div>
              <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Info className="h-5 w-5 text-gray-600" />
                  Request Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{requestData.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">
                      <MoneyDisplay amount={requestData.amount} /> {requestData.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Revenue Share</p>
                    <p className="font-medium">{requestData.revenue_share}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Repayment Terms</p>
                    <p className="font-medium">{requestData.repayment_terms}</p>
                  </div>
                   <div>
                    <p className="text-sm text-gray-500">Payment Frequency</p>
                    <p className="font-medium">{requestData.payment_frequency}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                  Financial Projections
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Projected Revenue</p>
                    <p className="font-medium"><MoneyDisplay amount={requestData.projected_revenue} /> {requestData.currency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Projected Profit</p>
                    <p className="font-medium"><MoneyDisplay amount={requestData.projected_profit} /> {requestData.currency}</p>
                  </div>
                </div>
              </div>
                 <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                 <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Info className="h-5 w-5 text-gray-600" />
                  Status
                </h3>
                <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                          requestData.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : requestData.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {requestData.status}
                      </span>
                 </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 