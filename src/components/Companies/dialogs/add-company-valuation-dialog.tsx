"use client"

import { useForm } from "react-hook-form"
import { Dialog } from "@headlessui/react"
import { X, DollarSign, Calendar, Info, FileText, TrendingUp, BarChart } from "lucide-react"
import TextField from "../ui/text-field"
import CustomButton from "../ui/custom-button"

interface AddCompanyValuationDialogProps {
  isOpen: boolean
  onClose: () => void
  companyId: number
  onSave: (data: any) => void
}

export default function AddCompanyValuationDialog({ isOpen, onClose, companyId, onSave }: AddCompanyValuationDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      valuation_amount: 0,
      valuation_date: "",
      notes: "",
      valuation_method: "",
      valuation_currency: "USD",
      financial_year: new Date().getFullYear(),
      financial_period: "",
      current_growth_rate: 0,
    },
  })

  const onSubmit = (data: any) => {
    onSave({ ...data, company_id: companyId })
    reset()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-3xl rounded-lg bg-white shadow-xl">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold">Add Company Valuation</Dialog.Title>
              <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextField
                    label="Valuation Amount"
                    icon={<DollarSign className="h-5 w-5" />}
                    type="number"
                    {...register("valuation_amount", {
                      required: "Valuation amount is required",
                      min: { value: 0, message: "Must be positive" },
                    })}
                    error={errors.valuation_amount?.message}
                    placeholder="Enter valuation amount"
                  />
                  <TextField
                    label="Valuation Currency"
                    icon={<DollarSign className="h-5 w-5" />}
                    {...register("valuation_currency", {
                      required: "Currency is required",
                    })}
                    error={errors.valuation_currency?.message}
                    placeholder="e.g., USD"
                  />
                </div>

                <TextField
                  label="Valuation Date"
                  icon={<Calendar className="h-5 w-5" />}
                  type="date"
                  {...register("valuation_date", {
                    required: "Valuation date is required",
                  })}
                  error={errors.valuation_date?.message}
                />

                <TextField
                  label="Valuation Method"
                  icon={<BarChart className="h-5 w-5" />}
                  {...register("valuation_method", {
                    required: "Valuation method is required",
                  })}
                  error={errors.valuation_method?.message}
                  placeholder="e.g., DCF, Market Comps"
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextField
                    label="Financial Year"
                    icon={<Calendar className="h-5 w-5" />}
                    type="number"
                    {...register("financial_year", {
                      required: "Financial year is required",
                    })}
                    error={errors.financial_year?.message}
                    placeholder="Enter financial year"
                  />
                  <TextField
                    label="Financial Period"
                    icon={<FileText className="h-5 w-5" />}
                    {...register("financial_period", {
                      required: "Financial period is required",
                    })}
                    error={errors.financial_period?.message}
                    placeholder="e.g., Q1, H1, Full Year"
                  />
                </div>

                <TextField
                  label="Current Growth Rate (%)"
                  icon={<TrendingUp className="h-5 w-5" />}
                  type="number"
                  step="0.01"
                  {...register("current_growth_rate", {
                    required: "Growth rate is required",
                    min: { value: 0, message: "Must be positive" },
                  })}
                  error={errors.current_growth_rate?.message}
                  placeholder="Enter current growth rate"
                />

                <TextField
                  label="Notes"
                  icon={<Info className="h-5 w-5" />}
                  {...register("notes")}
                  error={errors.notes?.message}
                  placeholder="Add any relevant notes"
                  isTextArea={true}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 border-t border-gray-200 p-6">
              <CustomButton type="button" variant="outlined" onClick={onClose}>
                Cancel
              </CustomButton>
              <CustomButton type="submit" variant="solid">
                Save Valuation
              </CustomButton>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 