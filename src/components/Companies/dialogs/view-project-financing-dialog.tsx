"use client"
import { Dialog } from "@headlessui/react"
import { X, Building, DollarSign, MapPin, Calendar, Layers, TrendingUp, Info } from "lucide-react"
import MoneyDisplay from "@/components/common/MoneyDisplay"

interface ProjectFinancingData {
  request_id: number;
  project_name: string;
  description: string;
  amount: number;
  currency: string;
  current_project_stage: string;
  project_sector: string;
  project_location: string;
  expected_completion_date: string;
  milestones: string;
  projected_revenue: number;
  projected_profit: number;
  status: string;
}

interface ViewProjectFinancingDialogProps {
  isOpen: boolean
  onClose: () => void
  requestData: ProjectFinancingData | null
}

export default function ViewProjectFinancingDialog({ isOpen, onClose, requestData }: ViewProjectFinancingDialogProps) {
  if (!requestData) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <Dialog.Title className="text-xl font-semibold">{requestData.project_name}</Dialog.Title>
                <p className="text-sm text-gray-500">Project Financing Details | Request ID: {requestData.request_id}</p>
              </div>
              <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Info className="h-5 w-5 text-gray-600" />
                  Project Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium"><MoneyDisplay amount={requestData.amount} /> {requestData.currency}</p>
                  </div>
                   <div>
                    <p className="text-sm text-gray-500">Sector</p>
                    <p className="font-medium">{requestData.project_sector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{requestData.project_location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Stage</p>
                    <p className="font-medium">{requestData.current_project_stage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Completion</p>
                    <p className="font-medium">{new Date(requestData.expected_completion_date).toLocaleDateString()}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{requestData.description}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Milestones</p>
                    <p className="font-medium">{requestData.milestones}</p>
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