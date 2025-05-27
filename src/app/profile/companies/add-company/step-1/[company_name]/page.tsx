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

import type { AppDispatch } from "../../../../../../../state/store"
import { createNewCompany } from "../../../../../../../state/slices/companySlice"
import { fetchAllConfigs } from "../../../../../../../state/slices/configSlice"
import type { BusinessState, CompanyIndustry, StockExchangeEntity } from "../../../../../../../state/models/config"

import { Building2, Calendar, Globe, Info, MapPin, Users, Briefcase, FileText, ChevronRight } from 'lucide-react'
import TextField from "@/components/FormElements/TextField"
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker"
import Select from "@/components/FormElements/SelectInput"
import CustomButton from "@/components/Buttons/CustomButton"

// Yup validation schema
const schema = Yup.object({
  company_abbreviations: Yup.string().required("Company abbreviation is required"),
  company_name: Yup.string().required("Company name is required"),
  company_start_date: Yup.date().required("Company start date is required"),
  company_short_description: Yup.string().required("Company short description is required"),
  industry_id: Yup.string().required("Industry is required"),
  stock_id: Yup.string().required("Stock Market is required"),
  location: Yup.string().required("Location is required"),
  website: Yup.string().url("Invalid URL").required("Website is required"),
  employees: Yup.number().positive("Employees must be a positive number").required("Number of employees is required"),
  business_state_id: Yup.string().required("Business state is required"),
}).required()

interface AddCompanyGeneralDetailsProps {
  params: {
    company_name?: string
  }
}

const AddCompanyGeneralDetails: React.FC<AddCompanyGeneralDetailsProps> = ({ params }) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useSelector((state: any) => state.auth)
  const { industryList, businessStatesList, stockExchangeList } = useSelector((state: any) => state.companyConfig)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    setError(null)
    setIsSubmitting(true)

    const updatePayload = {
      ...data,
      national_id: user.national_id,
      company_start_date: format(new Date(data.company_start_date), "yyyy-MM-dd"),
    }

    try {
      const response = await dispatch(createNewCompany(updatePayload)).unwrap()

      console.log(response);

      if (response.data) {
        toast.success("Company details added successfully")
        router.push(`/profile/companies/add-company/step-2/${response.data?.company_id}/${response.data?.company_name}`)
      } else {
        toast.error("Something went wrong")
      }
    } catch (err: any) {
      setError(err || "Failed to update company details")
      toast.error(err || "Failed to update company details")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const companyName = params.company_name
    if (companyName) {
      const decodedCompanyName = decodeURIComponent(companyName)
      setValue("company_name", decodedCompanyName)
    }
  }, [params.company_name, setValue])

  const currentStep = 0
  const headings = ["General Details", "Contact Details", "Stock Market", "Funds Details"]

  const isFetched = useRef(false)

  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAllConfigs())
      isFetched.current = true
    }
  }, [dispatch])

  return (
    <DefaultLayout>
      <div className="mx-auto px-4 py-8">
        {/* <Breadcrumb pageName="New Company Registration" /> */}

        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-800">Adding New Company</h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete the form below to add your company. This is step 1 of 4.
            </p>
          </div>

          <div className="px-8 py-6">
            <div className="mb-4 px-6 py-2">
              <Stepper currentStep={currentStep} headings={headings} />

            </div>
            {error && (
              <div className="mb-6">
                <CustomAlert title="Oops, something went wrong" subtitle={error} type={"error"} />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Company Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  Company Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextField
                    label="Company Abbreviations"
                    placeholder="Enter company abbreviation"
                    {...register("company_abbreviations")}
                    error={errors.company_abbreviations?.message}
                    icon={<Building2 className="h-5 w-5" />}
                  />

                  <TextField
                    label="Company Name"
                    placeholder="Enter company name"
                    {...register("company_name")}
                    error={errors.company_name?.message}
                    icon={<Building2 className="h-5 w-5" />}
                  />

                  <CustomDatePicker
                    control={control}
                    name="company_start_date"
                    label="Company Start Date"
                    placeholder="Select start date"
                    error={errors.company_start_date?.message}
                  />

                  <div className="w-full">
                    <label className="mb-2 block text-sm font-medium text-gray-700">Company Description</label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-500">
                        <Info className="h-5 w-5" />
                      </div>
                      <textarea
                        className={`w-full rounded-md border ${errors.company_short_description ? "border-red-500" : "border-gray-300"
                          } p-3 pl-10 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        rows={3}
                        placeholder="Brief description of the company"
                        {...register("company_short_description")}
                      />
                      {errors.company_short_description && (
                        <p className="mt-1 text-sm text-red-500">{errors.company_short_description.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry & Stock Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                  Industry & Stock Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Controller
                    control={control}
                    name="industry_id"
                    render={({ field }) => (
                      <Select
                        label="Industry"
                        options={
                          industryList?.map((industry: CompanyIndustry) => ({
                            value: industry.sector,
                            label: industry.sector,
                          })) || []
                        }
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select Industry"
                        error={errors.industry_id?.message}
                        icon={<Briefcase className="h-5 w-5" />}
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
              </div>

              {/* Additional Company Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <Info className="mr-2 h-5 w-5 text-blue-600" />
                  Additional Company Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextField
                    label="Location"
                    placeholder="Company location"
                    {...register("location")}
                    error={errors.location?.message}
                    icon={<MapPin className="h-5 w-5" />}
                  />

                  <TextField
                    label="Website"
                    placeholder="https://example.com"
                    {...register("website")}
                    error={errors.website?.message}
                    icon={<Globe className="h-5 w-5" />}
                  />

                  <TextField
                    label="Number of Employees"
                    placeholder="Enter number of employees"
                    type="number"
                    {...register("employees")}
                    error={errors.employees?.message}
                    icon={<Users className="h-5 w-5" />}
                  />

                  <Controller
                    control={control}
                    name="business_state_id"
                    render={({ field }) => (
                      <Select
                        label="Business State"
                        options={
                          businessStatesList?.map((state: BusinessState) => ({
                            value: state.state_name,
                            label: state.state_name,
                          })) || []
                        }
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select Business State"
                        error={errors.business_state_id?.message}
                        icon={<Building2 className="h-5 w-5" />}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                {/* <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => router.back()}
                >
                  Cancel
                </button> */}
                <div className="w-[70px]">
                  <CustomButton variant="'outline'" onClick={() => router.back()}>
                    Cancel
                  </CustomButton>
                </div>
                <div className="">
                  <CustomButton
                    type="submit"
                    disabled={isSubmitting}
                    variant="solid">
                    <span>  {isSubmitting ? "Saving..." : "Continue to Next Step"}</span>
                    <ChevronRight />
                  </CustomButton>
                </div>

              </div>
            </form>
          </div>
        </div>

        <ToastContainer position="bottom-center" />
      </div>
    </DefaultLayout>
  )
}

export default AddCompanyGeneralDetails
