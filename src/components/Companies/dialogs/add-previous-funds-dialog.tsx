"use client"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Dialog } from "@headlessui/react"
import { X, DollarSign, Users } from "lucide-react"
import TextField from "../ui/text-field"
import Select from "../ui/select"
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker"
import CustomButton from "../ui/custom-button"

interface AddPreviousFundsDialogProps {
  isOpen: boolean
  onClose: () => void
  companyId: number
  onSave: (data: any) => void
}

// 1. Yup schema
const schema = yup.object().shape({
  investor_type: yup.string().required("Investor type is required"),
  investor_information: yup.string().required("Investor information is required"),
  investment_type: yup.string().required("Investment type is required"),
  date_of_funds: yup.date().required("Date of funding is required"),
  investment_amount: yup
    .number()
    .typeError("Investment amount must be a number")
    .min(0, "Must be positive")
    .required("Investment amount is required"),
  investment_currency: yup.string().required("Currency is required"),
  company_valuation: yup
    .number()
    .typeError("Company valuation must be a number")
    .min(0, "Must be positive")
    .required("Company valuation is required"),
  company_valuation_currency: yup.string().required("Currency is required"),
  valuation_date: yup.date().required("Valuation date is required"),
})

export default function AddPreviousFundsDialog({
  isOpen,
  onClose,
  companyId,
  onSave,
}: AddPreviousFundsDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      investor_type: "",
      investor_information: "",
      investment_type: "",
      date_of_funds: new Date(),
      investment_amount: 0,
      investment_currency: "USD",
      company_valuation: 0,
      company_valuation_currency: "USD",
      valuation_date: new Date(),
    },
    resolver: yupResolver(schema),
  })

  const investorTypeOptions = [
    { value: "Angel Investor", label: "Angel Investor" },
    { value: "Venture Capital", label: "Venture Capital" },
    { value: "Private Equity", label: "Private Equity" },
    { value: "Government Grant", label: "Government Grant" },
    { value: "Bank Loan", label: "Bank Loan" },
    { value: "Crowdfunding", label: "Crowdfunding" },
  ]

  const investmentTypeOptions = [
    { value: "Equity", label: "Equity" },
    { value: "Debt", label: "Debt" },
    { value: "Convertible", label: "Convertible" },
    { value: "Grant", label: "Grant" },
  ]

  const currencyOptions = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "ZWL", label: "ZWL - Zimbabwe Dollar" },
  ]

  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().split("T")[0] : null
  }

  const onSubmit = (data: any) => {
    onSave({
      ...data,
      company_id: companyId,
      date_of_funds: formatDate(data.date_of_funds),
      valuation_date: formatDate(data.valuation_date),
    })
    reset()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-4xl rounded-lg bg-white shadow-xl">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold">Add Previous Funding</Dialog.Title>
              <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex h-[calc(100vh-250px)] flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Controller
                  control={control}
                  name="investor_type"
                  render={({ field }) => (
                    <Select
                      label="Investor Type"
                      options={investorTypeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select investor type"
                      error={errors.investor_type?.message}
                      icon={<Users className="h-5 w-5" />}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="investment_type"
                  render={({ field }) => (
                    <Select
                      label="Investment Type"
                      options={investmentTypeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select investment type"
                      error={errors.investment_type?.message}
                    />
                  )}
                />

                <CustomDatePicker
                  control={control}
                  name="date_of_funds"
                  label="Date of Funding"
                  error={errors.date_of_funds?.message}
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">Investor Information</label>
                <textarea
                  {...register("investor_information")}
                  className={`w-full rounded-[10px] border ${
                    errors.investor_information ? "border-red-500" : "border-gray-300"
                  } p-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  rows={3}
                  placeholder="Enter investor information and details"
                />
                {errors.investor_information && (
                  <p className="mt-1 text-sm text-red-500">{errors.investor_information.message}</p>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <TextField
                  label="Investment Amount"
                  icon={<DollarSign className="h-5 w-5" />}
                  type="number"
                  {...register("investment_amount")}
                  error={errors.investment_amount?.message}
                  placeholder="Enter investment amount"
                />

                <Controller
                  control={control}
                  name="investment_currency"
                  render={({ field }) => (
                    <Select
                      label="Investment Currency"
                      options={currencyOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select currency"
                      error={errors.investment_currency?.message}
                    />
                  )}
                />

                <CustomDatePicker
                  control={control}
                  name="valuation_date"
                  label="Valuation Date"
                  error={errors.valuation_date?.message}
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextField
                  label="Company Valuation"
                  icon={<DollarSign className="h-5 w-5" />}
                  type="number"
                  {...register("company_valuation")}
                  error={errors.company_valuation?.message}
                  placeholder="Enter company valuation"
                />

                <Controller
                  control={control}
                  name="company_valuation_currency"
                  render={({ field }) => (
                    <Select
                      label="Valuation Currency"
                      options={currencyOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select currency"
                      error={errors.company_valuation_currency?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 border-t border-gray-200 p-6">
              <CustomButton type="button" variant="outlined" onClick={onClose}>
                Cancel
              </CustomButton>
              <CustomButton type="submit" variant="solid">
                Add Funding
              </CustomButton>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
