"use client"

import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import Stepper from "../../common/Stepper"
import TextField from "../ui/text-field"
import Select from "../ui/select"
import CustomButton from "../ui/custom-button"
import { AppDispatch } from "../../../../state/store"
import {
  addCompanyRequest,
  createAcquisitionRequestThunk,
  createEquityFinancingRequestThunk,
  createProjectFinancingRequestThunk,
  createRevenueBasedFinancingRequestThunk,
} from "@/state/slices/companySlice";
import {
  registerCompanyRequest,
  createAcquisitionRequest,
  createEquityFinancingRequest,
  createProjectFinancingRequest,
  createRevenueBasedFinancingRequest,
} from "../../../../state/services/company"
import CustomDatePicker from "../../FormElements/DatePicker/CustomDatePicker"

const REQUEST_TYPES = [
  { value: "Company Acquisitions", label: "Company Acquisitions" },
  { value: "Project Financing", label: "Project Financing" },
  { value: "Equity Financing", label: "Equity Financing" },
  { value: "Revenue-Based Financing", label: "Revenue-Based Financing" },
]

const requestTypeSchema = Yup.object({
  request_type: Yup.string().required("Request type is required"),
})

// Dynamic schemas for each request type
const acquisitionSchema = Yup.object({
  currency: Yup.string().required("Currency is required"),
  asking_price: Yup.number().required("Asking price is required"),
  description: Yup.string().required("Description is required"),
  deal_value: Yup.string().required("Deal value is required"),
})
const equitySchema = Yup.object({
  currency: Yup.string().required("Currency is required"),
  amount: Yup.number().required("Amount is required"),
  equity_offered: Yup.number().required("Equity offered is required"),
  funding_round: Yup.string().required("Funding round is required"),
  description: Yup.string().required("Description is required"),
})
const projectSchema = Yup.object({
  currency: Yup.string().required("Currency is required"),
  amount: Yup.number().required("Amount is required"),
  target_use_of_funds: Yup.string().required("Target use of funds is required"),
  projected_revenue: Yup.number().required("Projected revenue is required"),
  projected_profit: Yup.number().required("Projected profit is required"),
  milestones: Yup.string().required("Milestones are required"),
  description: Yup.string().required("Description is required"),
  project_name: Yup.string().required("Project name is required"),
  project_location: Yup.string().required("Project location is required"),
  project_sector: Yup.string().required("Project sector is required"),
  expected_completion_date: Yup.string().required("Expected completion date is required"),
  current_project_stage: Yup.string().required("Current project stage is required"),
})
const revenueSchema = Yup.object({
  currency: Yup.string().required("Currency is required"),
  amount: Yup.number().required("Amount is required"),
  repayment_terms: Yup.string().required("Repayment terms are required"),
  revenue_share: Yup.number().required("Revenue share is required"),
  description: Yup.string().required("Description is required"),
  payment_frequency: Yup.string().required("Payment frequency is required"),
  projected_profit: Yup.number().required("Projected profit is required"),
  projected_revenue: Yup.number().required("Projected revenue is required"),
})

const getStepSchema = (step: number, requestType: string) => {
  if (step === 0) return requestTypeSchema
  if (step === 1) {
    switch (requestType) {
      case "Company Acquisitions":
        return acquisitionSchema
      case "Equity Financing":
        return equitySchema
      case "Project Financing":
        return projectSchema
      case "Revenue-Based Financing":
        return revenueSchema
      default:
        return Yup.object({})
    }
  }
  return Yup.object({})
}

interface AddCompanyRequestDialogProps {
  isOpen: boolean
  onClose: () => void
  companyId: number
  onSuccess?: () => void
}

export default function AddCompanyRequestDialog({ isOpen, onClose, companyId, onSuccess }: AddCompanyRequestDialogProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [requestId, setRequestId] = useState<number | null>(null)
  const [requestType, setRequestType] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const methods = useForm<any>({
    resolver: yupResolver(getStepSchema(currentStep, requestType)),
    defaultValues: {
      request_type: "",
      // Step 2 fields will be set dynamically
    },
    mode: "onChange",
  })

  const { handleSubmit, control, setValue, watch, formState: { errors } } = methods

  // Step 1: Select request type
  const Step1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Request Type</h3>
      <Controller
        control={control}
        name="request_type"
        render={({ field }) => (
          <Select
            label="Request Type"
            options={REQUEST_TYPES}
            value={field.value}
            onChange={(val) => {
              field.onChange(val)
              setRequestType(val)
            }}
            placeholder="Select request type"
            error={errors.request_type?.message as string}
          />
        )}
      />
    </div>
  )

  // Currency options
  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "ZWL", label: "ZWL" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "Other", label: "Other" },
  ]

  // Step 2: Dynamic fields based on request type
  const Step2 = () => {
    switch (requestType) {
      case "Company Acquisitions":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <Select
                  label="Currency"
                  options={currencyOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select currency"
                  error={errors.currency?.message as string}
                />
              )}
            />
            <TextField label="Asking Price" type="number" {...methods.register("asking_price")} error={errors.asking_price?.message as string} />
            <TextField label="Deal Value" {...methods.register("deal_value")} error={errors.deal_value?.message as string} />
            <div className="md:col-span-2 lg:col-span-3">
              <TextField label="Description" {...methods.register("description")} error={errors.description?.message as string} />
            </div>
          </div>
        )
      case "Equity Financing":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <Select
                  label="Currency"
                  options={currencyOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select currency"
                  error={errors.currency?.message as string}
                />
              )}
            />
            <TextField label="Amount" type="number" {...methods.register("amount")} error={errors.amount?.message as string} />
            <TextField label="Equity Offered" type="number" {...methods.register("equity_offered")} error={errors.equity_offered?.message as string} />
            <TextField label="Funding Round" {...methods.register("funding_round")} error={errors.funding_round?.message as string} />
            <div className="md:col-span-2 lg:col-span-3">
              <TextField label="Description" {...methods.register("description")} error={errors.description?.message as string} />
            </div>
          </div>
        )
      case "Project Financing":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           
            <div className="md:col-span-2 lg:col-span-3">
              <TextField label="Project Description" {...methods.register("description")}
                error={errors.description?.message as string} />
            </div>
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <Select
                  label="Currency"
                  options={currencyOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select currency"
                  error={errors.currency?.message as string}
                />
              )}
            />
            <TextField label="Amount" type="number" {...methods.register("amount")} error={errors.amount?.message as string} />
            <TextField label="Target Use of Funds" {...methods.register("target_use_of_funds")} error={errors.target_use_of_funds?.message as string} />
            <TextField label="Projected Revenue" type="number" {...methods.register("projected_revenue")} error={errors.projected_revenue?.message as string} />
            <TextField label="Projected Profit" type="number" {...methods.register("projected_profit")} error={errors.projected_profit?.message as string} />
            <TextField label="Milestones" {...methods.register("milestones")} error={errors.milestones?.message as string} />
            <TextField label="Project Name" {...methods.register("project_name")} error={errors.project_name?.message as string} />
            <TextField label="Project Location" {...methods.register("project_location")} error={errors.project_location?.message as string} />
            <TextField label="Project Sector" {...methods.register("project_sector")} error={errors.project_sector?.message as string} />
            <Controller
              control={control}
              name="expected_completion_date"
              render={({ field }) => (
                <CustomDatePicker
                  control={control}
                  name={field.name}
                  label="Expected Completion Date"
                  error={errors.expected_completion_date?.message as string}
                />
              )}
            />
            <TextField label="Current Project Stage" {...methods.register("current_project_stage")} error={errors.current_project_stage?.message as string} />
            <div className="md:col-span-2 lg:col-span-3" />
          </div>
        )
      case "Revenue-Based Financing":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <Select
                  label="Currency"
                  options={currencyOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select currency"
                  error={errors.currency?.message as string}
                />
              )}
            />
            <TextField label="Amount" type="number" {...methods.register("amount")} error={errors.amount?.message as string} />
            <TextField label="Repayment Terms" {...methods.register("repayment_terms")} error={errors.repayment_terms?.message as string} />
            <TextField label="Revenue Share" type="number" {...methods.register("revenue_share")} error={errors.revenue_share?.message as string} />
            <TextField label="Payment Frequency" {...methods.register("payment_frequency")} error={errors.payment_frequency?.message as string} />
            <TextField label="Projected Profit" type="number" {...methods.register("projected_profit")} error={errors.projected_profit?.message as string} />
            <TextField label="Projected Revenue" type="number" {...methods.register("projected_revenue")} error={errors.projected_revenue?.message as string} />
            <div className="md:col-span-2 lg:col-span-3">
              <TextField label="Description" {...methods.register("description")} error={errors.description?.message as string} />
            </div>
          </div>
        )
      default:
        return <div />
    }
  }

  // Step 3: Confirmation
  const Step3 = () => (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-semibold text-green-600">Request Submitted Successfully!</h3>
      <p>Your company request has been created.</p>
      <CustomButton type="button" variant="solid" onClick={() => { onClose(); onSuccess && onSuccess(); }}>Close</CustomButton>
    </div>
  )

  const steps = [
    { title: "Request Type", component: <Step1 /> },
    { title: "Request Details", component: <Step2 /> },
    { title: "Confirmation", component: <Step3 /> },
  ]

  // Handle step submission
  const onNext = async (data: any) => {
    console.log(requestId)

    if (currentStep === 0) {
      // Register the request and get request_id
      setIsSubmitting(true)
      try {
        const payload = { company_id: companyId, request_type: data.request_type, status: "PENDING" }
        const result = await dispatch(addCompanyRequest(payload)).unwrap()
        // Expecting result.id.request_id
        console.log(result)
        if (result && result.id && result.id.request_id) {
          console.log(result.id.request_id);
          setRequestId(result.id.request_id)
          setRequestType(data.request_type)
          setCurrentStep(1)
        } else {
          toast.error("Failed to register company request")
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to register company request")
      } finally {
        setIsSubmitting(false)
      }
    } else if (currentStep === 1 && requestId) {
      setIsSubmitting(true)
      try {
        let apiResult

        // Format expected_completion_date for Project Financing and Revenue-Based Financing
        if ((requestType === "Project Financing" || requestType === "Revenue-Based Financing") && data.expected_completion_date) {
          if (data.expected_completion_date instanceof Date) {
            data.expected_completion_date = data.expected_completion_date.toISOString().slice(0, 10);
          } else if (typeof data.expected_completion_date === "string") {
            const d = new Date(data.expected_completion_date);
            if (!isNaN(d.getTime())) {
              data.expected_completion_date = d.toISOString().slice(0, 10);
            }
          }
        }

        if (requestType === "Company Acquisitions") {
          apiResult = await dispatch(createAcquisitionRequestThunk({ ...data, request_id: requestId })).unwrap()
        } else if (requestType === "Equity Financing") {
          apiResult = await dispatch(createEquityFinancingRequestThunk({ ...data, request_id: requestId })).unwrap()
        } else if (requestType === "Project Financing") {
          apiResult = await dispatch(createProjectFinancingRequestThunk({ ...data, request_id: requestId })).unwrap()
        } else if (requestType === "Revenue-Based Financing") {
          apiResult = await dispatch(createRevenueBasedFinancingRequestThunk({ ...data, request_id: requestId })).unwrap()
        }
        if ((apiResult && apiResult.offering_id) || (apiResult && apiResult.payment_id)) {
          setCurrentStep(2)
        } else {
          toast.error("Failed to submit request details")
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to submit request details")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const onPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-[100] inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl mx-auto p-12 z-10">
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b pb-4 mb-8">
            <h2 className="text-2xl font-bold">Create Company Request</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Show selected request type if available */}
          {requestType && (
            <div className="mb-4">
              {/* <label className="block text-sm font-medium text-gray-600 mb-1">Selected Request Type</label> */}
              <div className="flex items-center">
                <div className="w-full border border-blue-500 bg-blue-50 rounded-md px-4 py-2 text-blue-700 font-semibold text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all">
                  {requestType}
                </div>
              </div>
            </div>
          )}

          <Stepper currentStep={currentStep} headings={steps.map((s) => s.title)} />
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onNext)}
              className="space-y-6"
              autoComplete="off"
            >
              {/* Debug: Show errors in Step2 */}
             
              {steps[currentStep].component}
              {currentStep < 2 && (
                <div className="flex justify-between mt-8">
                  {currentStep > 0 && (
                    <CustomButton type="button" variant="outlined" onClick={onPrev}>
                      Previous
                    </CustomButton>
                  )}
                  {/* Only show submit on step 0, otherwise just Next */}
                  {currentStep === 0 ? (
                    <CustomButton type="submit" variant="solid" isLoading={isSubmitting}>
                      Next
                    </CustomButton>
                  ) : (
                    <CustomButton type="submit" variant="solid" isLoading={isSubmitting} >
                      Submit
                    </CustomButton>
                  )}
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </Dialog>
  )
} 