"use client"

import { useForm, Controller } from "react-hook-form"
import { Dialog } from "@headlessui/react"
import { X, TrendingUp, DollarSign } from "lucide-react"
import TextField from "../ui/text-field"
import Select from "../ui/select"
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker"
import CustomButton from "../ui/custom-button"
import { useSelector } from "react-redux"
import { StockExchangeEntity } from "../../../../state/models/config"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

interface EditStockMarketDialogProps {
  isOpen: boolean
  onClose: () => void
  initialData: any
  onSave: (data: any) => void
}

const validationSchema = yup.object().shape({
  ISIN: yup.string().required("ISIN is required"),
  market_type_id: yup.string().required("Market type is required"),
  stock_id: yup.string().required("Stock market is required"),
  listed_date: yup.date().nullable().required("Listed date is required"),
  delisted_date: yup.date().nullable(),
  financial_year_end: yup.date().nullable().required("Financial year end is required"),
  listing_capital: yup
    .number()
    .typeError("Listing capital must be a number")
    .min(0, "Must be positive")
    .required("Listing capital is required"),
  current_market_cap: yup
    .number()
    .typeError("Current market cap must be a number")
    .min(0, "Must be positive")
    .nullable(),
  listing_currency: yup.string().required("Listing currency is required"),
  reporting_currency: yup.string().required("Reporting currency is required"),
  transfer_secretary: yup.string().nullable(),
})

export default function EditStockMarketDialog({ isOpen, onClose, initialData, onSave }: EditStockMarketDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      market_type_id: initialData?.market_type_id || "",
      stock_id: initialData?.stock_id || "",
      listed_date: initialData?.listed_date ? new Date(initialData.listed_date) : null,
      listing_capital: initialData?.listing_capital || 0,
      listing_currency: initialData?.listing_currency || "USD",
      delisted_date: initialData?.delisted_date ? new Date(initialData.delisted_date) : null,
      current_market_cap: initialData?.current_market_cap || 0,
      financial_year_end: initialData?.financial_year_end ? new Date(initialData.financial_year_end) : null,
      transfer_secretary: initialData?.transfer_secretary || "",
      reporting_currency: initialData?.reporting_currency || "USD",
      ISIN: initialData?.ISIN || "",
    },
    resolver: yupResolver(validationSchema),
  })

  const { stockExchangeList } = useSelector((state: any) => state.companyConfig)

  const currencyOptions = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "ZWL", label: "ZWL - Zimbabwe Dollar" },
  ]

  const marketTypeOptions = [
    { value: "Primary", label: "Primary Market" },
    { value: "Secondary", label: "Secondary Market" },
    { value: "OTC", label: "Over-the-Counter" },
  ]

  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().split("T")[0] : null
  }

  const onSubmit = (data: any) => {
    const cleanData = {
      ...data,
      listed_date: formatDate(data.listed_date),
      delisted_date: formatDate(data.delisted_date),
      financial_year_end: formatDate(data.financial_year_end),
    }
    onSave(cleanData)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-4xl rounded-lg bg-white shadow-xl">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold">Edit Stock Market Details</Dialog.Title>
              <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex h-[calc(100vh-250px)] flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <TextField
                  label="ISIN"
                  {...register("ISIN")}
                  error={errors.ISIN?.message}
                  placeholder="Enter ISIN code"
                />

                <Controller
                  control={control}
                  name="market_type_id"
                  render={({ field }) => (
                    <Select
                      label="Market Type"
                      options={marketTypeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select market type"
                      error={errors.market_type_id?.message}
                      icon={<TrendingUp className="h-5 w-5" />}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="stock_id"
                  render={({ field }) => (
                    <Select
                      label="Stock Market"
                      options={
                        stockExchangeList?.map((stock: StockExchangeEntity) => ({
                          value: stock.name,
                          label: stock.name,
                        })) || []
                      }
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Stock Market"
                      error={errors.stock_id?.message}
                      icon={
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      }
                    />
                  )}
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <CustomDatePicker
                  control={control}
                  name="listed_date"
                  label="Listed Date"
                  error={errors.listed_date?.message}
                />
                <CustomDatePicker
                  control={control}
                  name="delisted_date"
                  label="Delisted Date (Optional)"
                  error={errors.delisted_date?.message}
                />
                <CustomDatePicker
                  control={control}
                  name="financial_year_end"
                  label="Financial Year End"
                  error={errors.financial_year_end?.message}
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <TextField
                  label="Listing Capital"
                  icon={<DollarSign className="h-5 w-5" />}
                  type="number"
                  {...register("listing_capital")}
                  error={errors.listing_capital?.message}
                  placeholder="Enter listing capital"
                />

                <Controller
                  control={control}
                  name="listing_currency"
                  render={({ field }) => (
                    <Select
                      label="Listing Currency"
                      options={currencyOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select currency"
                      error={errors.listing_currency?.message}
                    />
                  )}
                />

                <TextField
                  label="Current Market Cap"
                  icon={<DollarSign className="h-5 w-5" />}
                  type="number"
                  {...register("current_market_cap")}
                  error={errors.current_market_cap?.message}
                  placeholder="Enter current market cap"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextField
                  label="Transfer Secretary"
                  {...register("transfer_secretary")}
                  error={errors.transfer_secretary?.message}
                  placeholder="Enter transfer secretary"
                />

                <Controller
                  control={control}
                  name="reporting_currency"
                  render={({ field }) => (
                    <Select
                      label="Reporting Currency"
                      options={currencyOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select reporting currency"
                      error={errors.reporting_currency?.message}
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
                Save Changes
              </CustomButton>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
