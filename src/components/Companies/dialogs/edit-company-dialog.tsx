"use client"
import { Controller, useForm } from "react-hook-form"
import { Dialog } from "@headlessui/react"
import { Building2, Users, MapPin, Globe, X, Briefcase } from "lucide-react"

import TextField from "../ui/text-field"
import Select from "../ui/select"
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker"
import CustomButton from "../ui/custom-button"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../../state/store"
import { fetchAllConfigs } from "../../../../state/slices/configSlice"
import { BusinessState, CompanyIndustry, StockExchangeEntity } from "../../../../state/models/config"

interface EditCompanyDialogProps {
  isOpen: boolean
  onClose: () => void
  initialData: any
  onSave: (data: any) => void
}

export default function EditCompanyDialog({ isOpen, onClose, initialData, onSave }: EditCompanyDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company_abbreviations: initialData?.company_abbreviations || "",
      company_name: initialData?.company_name || "",
      business_state_id: initialData?.business_state_id || "",
      company_start_date: initialData?.company_start_date ? new Date(initialData.company_start_date) : new Date(),
      company_short_description: initialData?.company_short_description || "",
      industry_id: initialData?.industry_id || "",
      stock_id: initialData?.stock_id || "",
      location: initialData?.location || "",
      website: initialData?.website || "",
      employees: initialData?.employees || 0,
      national_id: initialData?.national_id || "",
    },
  })
  const dispatch = useDispatch<AppDispatch>()

  const { industryList, businessStatesList, stockExchangeList } = useSelector((state: any) => state.companyConfig)


  const isFetched = useRef(false)


  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAllConfigs())
      isFetched.current = true
    }
  }, [dispatch])

  const onSubmit = (data) => {
    onSave(data)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-4xl rounded-lg bg-white shadow-xl">
          {/* Fixed Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold">Edit Company Information</Dialog.Title>
              <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex h-[calc(100vh-250px)] flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <TextField
                  label="Company Name"
                  icon={<Building2 className="h-5 w-5" />}
                  {...register("company_name", { required: "Company name is required" })}
                  error={errors.company_name?.message}
                  placeholder="Enter company name"
                  disabled={true}
                />

                <TextField
                  label="Company Abbreviations"
                  {...register("company_abbreviations", { required: "Abbreviation is required" })}
                  error={errors.company_abbreviations?.message}
                  placeholder="Enter abbreviation (e.g., AAPL)"
                />

                <TextField
                  label="National ID"
                  {...register("national_id")}
                  error={errors.national_id?.message}
                  placeholder="Enter national ID"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <CustomDatePicker
                  control={control}
                  name="company_start_date"
                  label="Company Start Date"
                  rules={{ required: "Start date is required" }}
                  error={errors.company_start_date?.message}
                />

                <TextField
                  label="Number of Employees"
                  icon={<Users className="h-5 w-5" />}
                  type="number"
                  {...register("employees", {
                    required: "Number of employees is required",
                    min: { value: 1, message: "Must have at least 1 employee" },
                  })}
                  error={errors.employees?.message}
                  placeholder="Enter number of employees"
                />

                <TextField
                  label="Location"
                  icon={<MapPin className="h-5 w-5" />}
                  {...register("location", { required: "Location is required" })}
                  error={errors.location?.message}
                  placeholder="Enter location"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* <Select
                  label="Industry"
                  options={industryOptions}
                  value={control._formValues.industry_id}
                  onChange={(value) => (control._formValues.industry_id = value)}
                  placeholder="Select industry"
                  error={errors.industry_id?.message}
                /> */}

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

                {/* <Select
                  label="Business State"
                  options={businessStateOptions}
                  value={control._formValues.business_state_id}
                  onChange={(value) => (control._formValues.business_state_id = value)}
                  placeholder="Select business state"
                  error={errors.business_state_id?.message}
                /> */}
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
                {/* <Select
                  label="Stock Type"
                  options={stockOptions}
                  value={control._formValues.stock_id}
                  onChange={(value) => (control._formValues.stock_id = value)}
                  placeholder="Select stock type"
                  error={errors.stock_id?.message}
                /> */}


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

              <div className="mt-6">
                <TextField
                  label="Website"
                  icon={<Globe className="h-5 w-5" />}
                  {...register("website", {
                    pattern: {
                      value: /^(http|https):\/\/[^ "]+$/,
                      message: "Enter a valid URL",
                    },
                  })}
                  error={errors.website?.message}
                  placeholder="Enter website URL"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">Company Description</label>
                <textarea
                  {...register("company_short_description", {
                    required: "Description is required",
                    maxLength: { value: 500, message: "Description must be less than 500 characters" },
                  })}
                  className={`w-full rounded-[10px] border ${errors.company_short_description ? "border-red-500" : "border-gray-300"
                    } p-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  rows={4}
                  placeholder="Enter a short description of the company"
                />
                {errors.company_short_description && (
                  <p className="mt-1 text-sm text-red-500">{errors.company_short_description.message}</p>
                )}
              </div>
            </div>

            {/* Fixed Footer */}
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
