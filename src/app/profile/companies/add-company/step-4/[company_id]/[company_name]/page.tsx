"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
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

import type { AppDispatch } from "@/state/store"
import { createCompanyPreviousFunds } from "@/state/slices/companySlice"

import { DollarSign, Users, Building2 } from "lucide-react"
import Select from "@/components/FormElements/SelectInput"
import TextField from "@/components/FormElements/TextField"
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker"

// Yup validation schema
const schema = Yup.object({
  investor_type: Yup.string().required("Investor Type is required"),
  investor_information: Yup.string().required("Investor Information is required"),
  investment_type: Yup.string().required("Investment Type is required"),
  date_of_funds: Yup.date().required("Date of Funds is required"),
  investment_amount: Yup.number().required("Investment Amount is required"),
  investment_currency: Yup.string().required("Investment Currency is required"),
  company_valuation: Yup.number().required("Company Valuation is required"),
  company_valuation_currency: Yup.string().required("Company Valuation Currency is required"),
  valuation_date: Yup.date().required("Valuation Date is required"),
}).required()

// Main Component
const AddCompanyFundsDetails: React.FC = ({ params }: any) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [companyName, setCompanyName] = useState<string | null>(null)

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

    const fundsPayload = {
      ...data,
      company_id,
      valuation_date: format(new Date(data.valuation_date), "yyyy-MM-dd"),
      date_of_funds: format(new Date(data.date_of_funds), "yyyy-MM-dd"),
    }

    try {
      const response = await dispatch(createCompanyPreviousFunds(fundsPayload)).unwrap()

      if (response.data) {
        toast.success("Company funds details added successfully")
        router.push(`/profile/companies/view-company/${params.company_id}`)
      } else {
        toast.error("Something went wrong")
      }
    } catch (err: any) {
      setError(err || "Failed to submit company funds details")
      toast.error(err || "Failed to submit company funds details")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentStep = 3
  const headings = ["General Details", "Contact Details", "Stock Market", "Funds Details"]

  const investorTypes = [
    { value: "Individual", label: "Individual" },
    { value: "Government", label: "Government" },
    { value: "Organization", label: "Organization" },
  ]

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Breadcrumb pageName="Company Funds Details" />

        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-800">{companyName}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add funding information for your company. This is the final step.
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
              {/* Investor Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <Users className="mr-2 h-5 w-5 text-blue-600" />
                  Investor Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Controller
                    control={control}
                    name="investor_type"
                    render={({ field }) => (
                      <Select
                        label="Investor Type"
                        options={investorTypes}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select investor type"
                        error={errors.investor_type?.message}
                        icon={<Users className="h-5 w-5" />}
                      />
                    )}
                  />

                  <TextField
                    label="Investor Information"
                    placeholder="Enter investor information"
                    {...register("investor_information")}
                    error={errors.investor_information?.message}
                    icon={<Users className="h-5 w-5" />}
                  />

                  <TextField
                    label="Investment Type"
                    placeholder="Enter investment type"
                    {...register("investment_type")}
                    error={errors.investment_type?.message}
                    icon={<Building2 className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* Investment Details */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <DollarSign className="mr-2 h-5 w-5 text-blue-600" />
                  Investment Details
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <CustomDatePicker
                    control={control}
                    name="date_of_funds"
                    label="Date of Funds"
                    placeholder="Select date of funds"
                    error={errors.date_of_funds?.message}
                  />

                  <TextField
                    label="Investment Amount"
                    placeholder="Enter investment amount"
                    type="number"
                    {...register("investment_amount")}
                    error={errors.investment_amount?.message}
                    icon={<DollarSign className="h-5 w-5" />}
                  />

                  <TextField
                    label="Investment Currency"
                    placeholder="Enter currency (e.g. USD)"
                    {...register("investment_currency")}
                    error={errors.investment_currency?.message}
                    icon={<DollarSign className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* Valuation Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <Building2 className="mr-2 h-5 w-5 text-blue-600" />
                  Valuation Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <TextField
                    label="Company Valuation"
                    placeholder="Enter company valuation"
                    type="number"
                    {...register("company_valuation")}
                    error={errors.company_valuation?.message}
                    icon={<DollarSign className="h-5 w-5" />}
                  />

                  <TextField
                    label="Valuation Currency"
                    placeholder="Enter valuation currency"
                    {...register("company_valuation_currency")}
                    error={errors.company_valuation_currency?.message}
                    icon={<DollarSign className="h-5 w-5" />}
                  />

                  <CustomDatePicker
                    control={control}
                    name="valuation_date"
                    label="Valuation Date"
                    placeholder="Select valuation date"
                    error={errors.valuation_date?.message}
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
                  {isSubmitting ? "Saving..." : "Complete Registration"}
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

export default AddCompanyFundsDetails
