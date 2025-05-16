"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { format } from "date-fns"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Stepper from "@/components/common/Stepper"
import CustomAlert from "@/components/common/notification/Alert"

import type { AppDispatch } from "../../../../../../../../state/store"
import { createStockMarketDetails } from "../../../../../../../../state/slices/companySlice"
import { fetchAllConfigs } from "../../../../../../../../state/slices/configSlice"
import type { MarketType, StockExchangeEntity } from "../../../../../../../../state/models/config"

import { DollarSign, Building2, BarChart2 } from "lucide-react"
import Select from "@/components/FormElements/SelectInput"
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker"
import TextField from "@/components/FormElements/TextField"

// Yup validation schema
const schema = Yup.object({
  market_type_id: Yup.string().required("Type of Market is required"),
  listed_date: Yup.date().required("Listed Date is required"),
  listing_capital: Yup.number().required("Listing Capital is required"),
  listing_currency: Yup.string().required("Listing Currency is required"),
  delisted_date: Yup.date().required("Delisted Date is required"),
  current_market_cap: Yup.number().required("Current Market Capital is required"),
  stock_id: Yup.string().required("Stock Market is required"),
  financial_year_end: Yup.date().required("Financial Year End is required"),
  transfer_secretary: Yup.string().required("Transfer Secretary is required"),
  reporting_currency: Yup.string().required("Reporting Currency is required"),
  ISIN: Yup.string().required("ISIN is required"),
}).required()

// Main Component
const AddCompanyStockMarketDetails: React.FC = ({ params }: any) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [companyName, setCompanyName] = useState<string | null>(null)

  const { marketTypesList, stockExchangeList } = useSelector((state: any) => state.companyConfig)

  useEffect(() => {
    const companyName = params.company_name
    if (companyName) {
      const decodedCompanyName = decodeURIComponent(companyName)
      setCompanyName(decodedCompanyName)
    }
  }, [params.company_name])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    const company_id = params.company_id
    setError(null)
    setIsSubmitting(true)

    const stockMarketPayload = {
      ...data,
      listed_date: format(new Date(data.listed_date), "yyyy-MM-dd"),
      delisted_date: format(new Date(data.delisted_date), "yyyy-MM-dd"),
      financial_year_end: format(new Date(data.financial_year_end), "yyyy-MM-dd"),
      company_id,
    }

    try {
      const response = await dispatch(createStockMarketDetails(stockMarketPayload)).unwrap()

      if (response.data) {
        toast.success("Company stock market details added successfully")
        router.push(`/profile/companies/add-company/step-4/${company_id}/${params.company_name}`)
      } else {
        toast.error("Something went wrong")
      }
    } catch (err: any) {
      setError(err || "Failed to submit company stock market details")
      toast.error(err || "Failed to submit company stock market details")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFetched = useRef(false)

  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAllConfigs())
      isFetched.current = true
    }
  }, [dispatch])

  const currentStep = 2
  const headings = ["General Details", "Contact Details", "Stock Market", "Funds Details"]

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Breadcrumb pageName="Company Stock Market Details" />

        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-800">{companyName}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add stock market information for your company. This is step 3 of 4.
            </p>
          </div>

          <div className="px-8 py-6">
            <Stepper currentStep={currentStep} headings={headings} />

            {error && (
              <div className="mb-6">
                <CustomAlert title="Oops, something went wrong" subtitle={error} type={"error"} />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Market Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <BarChart2 className="mr-2 h-5 w-5 text-blue-600" />
                  Market Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Controller
                    control={control}
                    name="market_type_id"
                    render={({ field }) => (
                      <Select
                        label="Type of Market"
                        options={
                          marketTypesList?.map((marketType: MarketType) => ({
                            value: marketType.name,
                            label: marketType.name,
                          })) || []
                        }
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select type of market"
                        error={errors.market_type_id?.message}
                        icon={<BarChart2 className="h-5 w-5" />}
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
                        icon={<Building2 className="h-5 w-5" />}
                      />
                    )}
                  />

                  <CustomDatePicker
                    control={control}
                    name="listed_date"
                    label="Listed Date"
                    placeholder="Select listed date"
                    error={errors.listed_date?.message}
                  />
                </div>
              </div>

              {/* Financial Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <DollarSign className="mr-2 h-5 w-5 text-blue-600" />
                  Financial Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <TextField
                    label="Listing Capital"
                    placeholder="Enter listing capital"
                    type="number"
                    {...register("listing_capital")}
                    error={errors.listing_capital?.message}
                    icon={<DollarSign className="h-5 w-5" />}
                  />

                  <TextField
                    label="Listing Currency"
                    placeholder="Enter currency (e.g. USD)"
                    {...register("listing_currency")}
                    error={errors.listing_currency?.message}
                    icon={<DollarSign className="h-5 w-5" />}
                  />

                  <TextField
                    label="Current Market Capital"
                    placeholder="Enter current market capital"
                    type="number"
                    {...register("current_market_cap")}
                    error={errors.current_market_cap?.message}
                    icon={<DollarSign className="h-5 w-5" />}
                  />

                  <CustomDatePicker
                    control={control}
                    name="delisted_date"
                    label="Delisted Date"
                    placeholder="Select delisted date"
                    error={errors.delisted_date?.message}
                  />

                  <CustomDatePicker
                    control={control}
                    name="financial_year_end"
                    label="Financial Year End"
                    placeholder="Select financial year end"
                    error={errors.financial_year_end?.message}
                  />

                  <TextField
                    label="Reporting Currency"
                    placeholder="Enter reporting currency"
                    {...register("reporting_currency")}
                    error={errors.reporting_currency?.message}
                    icon={<DollarSign className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <Building2 className="mr-2 h-5 w-5 text-blue-600" />
                  Additional Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextField
                    label="Transfer Secretary"
                    placeholder="Enter transfer secretary"
                    {...register("transfer_secretary")}
                    error={errors.transfer_secretary?.message}
                    icon={<Building2 className="h-5 w-5" />}
                  />

                  <TextField
                    label="ISIN"
                    placeholder="Enter ISIN"
                    {...register("ISIN")}
                    error={errors.ISIN?.message}
                    icon={<Building2 className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => router.back()}
                >
                  Previous Step
                </button>
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-amber-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  onClick={() => router.push(`/profile/companies/view-company/${params.company_id}`)}
                >
                  Add Details Later
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Continue to Next Step"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <ToastContainer position="bottom-right" />
      </div>
    </DefaultLayout>
  )
}

export default AddCompanyStockMarketDetails
