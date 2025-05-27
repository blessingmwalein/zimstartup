"use client"

import { useState } from "react"
import { Dialog } from "@headlessui/react"
import {
  X,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Loader2,
} from "lucide-react"
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { toast, ToastContainer } from "react-toastify"

import TextField from "../ui/text-field"
import Select from "../ui/select"
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker"
import CustomButton from "../ui/custom-button"
import { useDispatch } from "react-redux"

import type { AddAwardRequest, AddDirectorPositionRequest, AddEmploymentHistoryRequest } from "@/state/models/company"
import { AppDispatch } from "../../../../state/store"
import { addEducationalQualifications, addEmploymentHistory, addNewAward, addNewDirectorPosition, createDirectorDetails } from "../../../../state/slices/companySlice"

// Define validation schemas for each step
const personalInfoSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  dob: Yup.date().required("Date of birth is required").max(new Date(), "Date cannot be in the future"),
  marital_status: Yup.string().required("Marital status is required"),
  nationality: Yup.string().required("Nationality is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone_number: Yup.string(),
  id_number: Yup.string(),
})

const positionSchema = Yup.object({
  position: Yup.object({
    position: Yup.string().required("Position is required"),
    overall_position: Yup.string(),
    department: Yup.string(),
    reporting_to: Yup.string(),
    direct_reports: Yup.number().typeError("Must be a number").min(0, "Cannot be negative"),
    responsibilities: Yup.string(),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date()
      .nullable()
      .when("is_current", {
        is: false,
        then: (schema) => schema.required("End date is required when not current position"),
      }),
    is_current: Yup.boolean(),
  }),
})

const qualificationSchema = Yup.object({
  qualifications: Yup.array().of(
    Yup.object({
      institution: Yup.string().required("Institution is required"),
      education_type: Yup.string().required("Education type is required"),
      field_of_study: Yup.string().required("Field of study is required"),
      year_obtained: Yup.number()
        .typeError("Year must be a number")
        .required("Year is required")
        .min(1950, "Year must be after 1950")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
      grade: Yup.string(),
      additional_info: Yup.string(),
    }),
  ),
})

const employmentSchema = Yup.object({
  employment_history: Yup.array().of(
    Yup.object({
      company_name: Yup.string().required("Company name is required"),
      position: Yup.string().required("Position is required"),
      industry: Yup.string(),
      location: Yup.string(),
      start_date: Yup.date().required("Start date is required"),
      end_date: Yup.date().nullable(),
      achievements: Yup.string(),
      reason_for_leaving: Yup.string(),
    }),
  ),
})

const awardsSchema = Yup.object({
  public_info: Yup.object({
    public_profile: Yup.string(),
  }),
  awards: Yup.array().of(
    Yup.object({
      award: Yup.string().required("Award name is required"),
      year: Yup.number()
        .typeError("Year must be a number")
        .required("Year is required")
        .min(1950, "Year must be after 1950")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
      organization: Yup.string(),
      description: Yup.string(),
    }),
  ),
})

// Combine all schemas
const directorSchema = Yup.object({
  company_id: Yup.number().required(),
  ...personalInfoSchema.fields,
  ...positionSchema.fields,
  ...qualificationSchema.fields,
  ...employmentSchema.fields,
  ...awardsSchema.fields,
})

interface AddDirectorDialogProps {
  isOpen: boolean
  onClose: () => void
  companyId: number
  onSave: (data: any) => void
}

// Step 1: Personal Information
const PersonalInfoStep = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  const titleOptions = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Ms", label: "Ms" },
    { value: "Dr", label: "Dr" },
    { value: "Prof", label: "Prof" },
  ]

  const maritalStatusOptions = [
    { value: "SINGLE", label: "Single" },
    { value: "MARRIED", label: "Married" },
    { value: "DIVORCED", label: "Divorced" },
    { value: "WIDOWED", label: "Widowed" },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Select
              label="Title"
              options={titleOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select title"
              error={errors.title?.message}
            />
          )}
        />

        <TextField
          label="First Name"
          {...register("first_name")}
          error={errors.first_name?.message}
          placeholder="Enter first name"
        />

        <TextField
          label="Last Name"
          {...register("last_name")}
          error={errors.last_name?.message}
          placeholder="Enter last name"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <CustomDatePicker control={control} name="dob" label="Date of Birth" error={errors.dob?.message} />

        <Controller
          control={control}
          name="marital_status"
          render={({ field }) => (
            <Select
              label="Marital Status"
              options={maritalStatusOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select marital status"
              error={errors.marital_status?.message}
            />
          )}
        />

        <TextField
          label="Nationality"
          {...register("nationality")}
          error={errors.nationality?.message}
          placeholder="Enter nationality"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="Enter email address"
        />

        <TextField
          label="Phone Number"
          {...register("phone_number")}
          error={errors.phone_number?.message}
          placeholder="Enter phone number"
        />

        <TextField
          label="ID Number"
          {...register("id_number")}
          error={errors.id_number?.message}
          placeholder="Enter ID number"
        />
      </div>
    </div>
  )
}

// Step 2: Position Information
const PositionStep = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  const positionsOptions = [
    { value: "Board Member", label: "Board Member" },
    { value: "Director", label: "Director" },
    { value: "Management", label: "Management" },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Position Information</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <TextField
          label="Position"
          {...register("position.position")}
          error={errors.position?.position?.message}
          placeholder="Enter position (e.g., CEO, CFO)"
        />

         {/* <Controller
          control={control}
          name="position"
          render={({ field }) => (
            <Select
              label="Position"
              options={positionsOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select Postion"
              error={errors.position?.position?.message}
            />
          )}
        /> */}


        <TextField
          label="Overall Position"
          {...register("position.overall_position")}
          error={errors.position?.overall_position?.message}
          placeholder="Enter overall position (e.g., Executive, Non-Executive)"
        />

        <TextField
          label="Department"
          {...register("position.department")}
          error={errors.position?.department?.message}
          placeholder="Enter department"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <CustomDatePicker
          control={control}
          name="position.start_date"
          label="Start Date"
          error={errors.position?.start_date?.message}
        />

        <CustomDatePicker
          control={control}
          name="position.end_date"
          label="End Date (if applicable)"
          error={errors.position?.end_date?.message}
        />

        <div className="flex items-center space-x-2 self-end pb-4">
          <input
            type="checkbox"
            id="is_current"
            {...register("position.is_current")}
            className="h-4 w-4 rounded border-gray-300 text-[#001f3f] focus:ring-[#001f3f]"
          />
          <label htmlFor="is_current" className="text-sm font-medium text-gray-700">
            Current Position
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <TextField
          label="Reporting To"
          {...register("position.reporting_to")}
          error={errors.position?.reporting_to?.message}
          placeholder="Enter supervisor's name/position"
        />

        <TextField
          label="Direct Reports"
          type="number"
          {...register("position.direct_reports")}
          error={errors.position?.direct_reports?.message}
          placeholder="Number of direct reports"
        />

        <TextField
          label="Responsibilities"
          {...register("position.responsibilities")}
          error={errors.position?.responsibilities?.message}
          placeholder="Key responsibilities"
        />
      </div>
    </div>
  )
}

// Step 3: Qualifications
const QualificationsStep = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()
  const qualifications = watch("qualifications") || []

  const educationTypeOptions = [
    { value: "Bachelor", label: "Bachelor's Degree" },
    { value: "Master", label: "Master's Degree" },
    { value: "PhD", label: "PhD/Doctorate" },
    { value: "Diploma", label: "Diploma" },
    { value: "Certificate", label: "Certificate" },
  ]

  const addQualification = () => {
    setValue("qualifications", [
      ...qualifications,
      { institution: "", education_type: "", field_of_study: "", year_obtained: "" },
    ])
  }

  const removeQualification = (index) => {
    setValue(
      "qualifications",
      qualifications.filter((_, i) => i !== index),
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Qualifications</h3>

      {qualifications.map((qualification, index) => (
        <div key={index} className="rounded-lg border border-gray-200 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="font-medium">Qualification {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeQualification(index)}
              className="rounded-full p-1 text-red-500 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <TextField
              label="Institution"
              {...register(`qualifications.${index}.institution`)}
              error={errors.qualifications?.[index]?.institution?.message}
              placeholder="Enter institution name"
            />

            <Controller
              control={control}
              name={`qualifications.${index}.education_type`}
              render={({ field }) => (
                <Select
                  label="Education Type"
                  options={educationTypeOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select education type"
                  error={errors.qualifications?.[index]?.education_type?.message}
                />
              )}
            />

            <TextField
              label="Field of Study"
              {...register(`qualifications.${index}.field_of_study`)}
              error={errors.qualifications?.[index]?.field_of_study?.message}
              placeholder="Enter field of study"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <TextField
              label="Year Obtained"
              type="number"
              {...register(`qualifications.${index}.year_obtained`)}
              error={errors.qualifications?.[index]?.year_obtained?.message}
              placeholder="Enter year obtained"
            />

            <TextField
              label="Grade/Result"
              {...register(`qualifications.${index}.grade`)}
              error={errors.qualifications?.[index]?.grade?.message}
              placeholder="Enter grade or result"
            />

            <TextField
              label="Additional Info"
              {...register(`qualifications.${index}.additional_info`)}
              error={errors.qualifications?.[index]?.additional_info?.message}
              placeholder="Any additional information"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <CustomButton type="button" variant="outlined" icon={<Plus className="h-4 w-4" />} onClick={addQualification}>
          Add Qualification
        </CustomButton>
      </div>
    </div>
  )
}

// Step 4: Employment History
const EmploymentHistoryStep = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()
  const employmentHistory = watch("employment_history") || []

  const addEmployment = () => {
    setValue("employment_history", [
      ...employmentHistory,
      {
        company_name: "",
        position: "",
        start_date: null,
        end_date: null,
        achievements: "",
        reason_for_leaving: "",
      },
    ])
  }

  const removeEmployment = (index) => {
    setValue(
      "employment_history",
      employmentHistory.filter((_, i) => i !== index),
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Employment History</h3>

      {employmentHistory.map((employment, index) => (
        <div key={index} className="rounded-lg border border-gray-200 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="font-medium">Employment {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeEmployment(index)}
              className="rounded-full p-1 text-red-500 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <TextField
              label="Company Name"
              {...register(`employment_history.${index}.company_name`)}
              error={errors.employment_history?.[index]?.company_name?.message}
              placeholder="Enter company name"
            />

            <TextField
              label="Position"
              {...register(`employment_history.${index}.position`)}
              error={errors.employment_history?.[index]?.position?.message}
              placeholder="Enter position"
            />

            <TextField
              label="Industry"
              {...register(`employment_history.${index}.industry`)}
              error={errors.employment_history?.[index]?.industry?.message}
              placeholder="Enter industry"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <CustomDatePicker
              control={control}
              name={`employment_history.${index}.start_date`}
              label="Start Date"
              error={errors.employment_history?.[index]?.start_date?.message}
            />

            <CustomDatePicker
              control={control}
              name={`employment_history.${index}.end_date`}
              label="End Date (if applicable)"
              error={errors.employment_history?.[index]?.end_date?.message}
            />

            <TextField
              label="Location"
              {...register(`employment_history.${index}.location`)}
              error={errors.employment_history?.[index]?.location?.message}
              placeholder="Enter location"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Achievements</label>
            <textarea
              {...register(`employment_history.${index}.achievements`)}
              className="w-full rounded-[10px] border border-gray-300 p-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={2}
              placeholder="Enter key achievements"
            />
          </div>

          <div className="mt-4">
            <TextField
              label="Reason for Leaving"
              {...register(`employment_history.${index}.reason_for_leaving`)}
              error={errors.employment_history?.[index]?.reason_for_leaving?.message}
              placeholder="Enter reason for leaving"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <CustomButton type="button" variant="outlined" icon={<Plus className="h-4 w-4" />} onClick={addEmployment}>
          Add Employment
        </CustomButton>
      </div>
    </div>
  )
}

// Step 5: Awards and Public Profile
const AwardsAndProfileStep = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()
  const awards = watch("awards") || []

  const addAward = () => {
    setValue("awards", [...awards, { award: "", year: "", description: "" }])
  }

  const removeAward = (index) => {
    setValue(
      "awards",
      awards.filter((_, i) => i !== index),
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Awards and Public Profile</h3>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Public Profile</label>
        <textarea
          {...register("public_info.public_profile")}
          className="w-full rounded-[10px] border border-gray-300 p-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={4}
          placeholder="Enter public profile information"
        />
      </div>

      <h4 className="font-medium">Awards</h4>

      {awards.map((award, index) => (
        <div key={index} className="rounded-lg border border-gray-200 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="font-medium">Award {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeAward(index)}
              className="rounded-full p-1 text-red-500 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <TextField
              label="Award Name"
              {...register(`awards.${index}.award`)}
              error={errors.awards?.[index]?.award?.message}
              placeholder="Enter award name"
            />

            <TextField
              label="Year"
              type="number"
              {...register(`awards.${index}.year`)}
              error={errors.awards?.[index]?.year?.message}
              placeholder="Enter year received"
            />

            <TextField
              label="Issuing Organization"
              {...register(`awards.${index}.organization`)}
              error={errors.awards?.[index]?.organization?.message}
              placeholder="Enter issuing organization"
            />
          </div>

          <div className="mt-4">
            <TextField
              label="Description"
              {...register(`awards.${index}.description`)}
              error={errors.awards?.[index]?.description?.message}
              placeholder="Enter award description"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <CustomButton type="button" variant="outlined" icon={<Plus className="h-4 w-4" />} onClick={addAward}>
          Add Award
        </CustomButton>
      </div>
    </div>
  )
}

// Step 6: Review
const ReviewStep = () => {
  const { watch } = useFormContext()
  const formData = watch()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Review Information</h3>

      <div className="rounded-lg border border-gray-200 p-4">
        <h4 className="mb-2 font-medium">Personal Information</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p>
              {formData.title} {formData.first_name} {formData.last_name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p>{formData.dob ? new Date(formData.dob).toLocaleDateString() : "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nationality</p>
            <p>{formData.nationality}</p>
          </div>
          {formData.employee_id && (
            <div>
              <p className="text-sm text-gray-500">Employee ID</p>
              <p>{formData.employee_id}</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <h4 className="mb-2 font-medium">Position</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <p className="text-sm text-gray-500">Position</p>
            <p>{formData.position?.position}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Start Date</p>
            <p>
              {formData.position?.start_date
                ? new Date(formData.position.start_date).toLocaleDateString()
                : "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {formData.qualifications?.length > 0 && (
        <div className="rounded-lg border border-gray-200 p-4">
          <h4 className="mb-2 font-medium">Qualifications ({formData.qualifications.length})</h4>
          <ul className="list-inside list-disc space-y-1">
            {formData.qualifications.map((qual, index) => (
              <li key={index}>
                {qual.education_type} in {qual.field_of_study} from {qual.institution} ({qual.year_obtained})
              </li>
            ))}
          </ul>
        </div>
      )}

      {formData.employment_history?.length > 0 && (
        <div className="rounded-lg border border-gray-200 p-4">
          <h4 className="mb-2 font-medium">Employment History ({formData.employment_history.length})</h4>
          <ul className="list-inside list-disc space-y-1">
            {formData.employment_history.map((emp, index) => (
              <li key={index}>
                {emp.position} at {emp.company_name} (
                {emp.start_date ? new Date(emp.start_date).toLocaleDateString() : "?"} -
                {emp.end_date ? new Date(emp.end_date).toLocaleDateString() : "Present"})
              </li>
            ))}
          </ul>
        </div>
      )}

      {formData.awards?.length > 0 && (
        <div className="rounded-lg border border-gray-200 p-4">
          <h4 className="mb-2 font-medium">Awards ({formData.awards.length})</h4>
          <ul className="list-inside list-disc space-y-1">
            {formData.awards.map((award, index) => (
              <li key={index}>
                {award.award} ({award.year})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function AddDirectorDialog({ isOpen, onClose, companyId, onSave }: AddDirectorDialogProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingStep, setIsProcessingStep] = useState(false)
  const [employeeId, setEmployeeId] = useState<string | null>(null)
  const [stepErrors, setStepErrors] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  // Get the validation schema for the current step
  const getStepSchema = (step: number) => {
    switch (step) {
      case 0:
        return personalInfoSchema
      case 1:
        return positionSchema
      case 2:
        return qualificationSchema
      case 3:
        return employmentSchema
      case 4:
        return awardsSchema
      default:
        return directorSchema
    }
  }

  const methods = useForm({
    resolver: yupResolver(getStepSchema(currentStep)),
    defaultValues: {
      company_id: companyId,
      title: "Mr",
      first_name: "",
      last_name: "",
      dob: new Date(),
      marital_status: "SINGLE",
      nationality: "",
      email: "",
      phone_number: "",
      id_number: "",
      employee_id: "",
      position: {
        overall_position: "Director",
        position: "",
        department: "",
        reporting_to: "",
        direct_reports: 0,
        responsibilities: "",
        start_date: new Date(),
        end_date: null,
        is_current: true,
      },
      qualifications: [
        {
          institution: "",
          education_type: "",
          field_of_study: "",
          year_obtained: new Date().getFullYear(),
          grade: "",
          additional_info: "",
        },
      ],
      employment_history: [
        {
          company_name: "",
          position: "",
          industry: "",
          location: "",
          start_date: new Date(),
          end_date: null,
          achievements: "",
          reason_for_leaving: "",
        },
      ],
      public_info: {
        public_profile: "",
      },
      awards: [],
    },
    mode: "onChange",
  })

  const steps = [
    { title: "Personal Info", icon: <User className="h-5 w-5" />, component: <PersonalInfoStep /> },
    { title: "Position", icon: <Briefcase className="h-5 w-5" />, component: <PositionStep /> },
    { title: "Qualifications", icon: <GraduationCap className="h-5 w-5" />, component: <QualificationsStep /> },
    { title: "Employment", icon: <Briefcase className="h-5 w-5" />, component: <EmploymentHistoryStep /> },
    { title: "Awards & Profile", icon: <Award className="h-5 w-5" />, component: <AwardsAndProfileStep /> },
    { title: "Review", icon: <FileText className="h-5 w-5" />, component: <ReviewStep /> },
  ]

  // Function to format dates in the data
  const formatDates = (data) => {
    const formattedData = { ...data }

    // Format dob if it's a Date object
    if (formattedData.dob instanceof Date) {
      formattedData.dob = formattedData.dob.toISOString().split("T")[0]
    }

    // Format position dates if they exist
    if (formattedData.position) {
      if (formattedData.position.start_date instanceof Date) {
        formattedData.position.start_date = formattedData.position.start_date.toISOString().split("T")[0]
      }
      if (formattedData.position.end_date instanceof Date) {
        formattedData.position.end_date = formattedData.position.end_date.toISOString().split("T")[0]
      }
    }

    // Format employment history dates if they exist
    if (formattedData.employment_history) {
      formattedData.employment_history = formattedData.employment_history.map((emp) => ({
        ...emp,
        start_date: emp.start_date instanceof Date ? emp.start_date.toISOString().split("T")[0] : emp.start_date,
        end_date: emp.end_date instanceof Date ? emp.end_date.toISOString().split("T")[0] : emp.end_date,
      }))
    }

    return formattedData
  }

  // Function to submit personal info to the backend and get employee_id
  const submitPersonalInfo = async (personalData) => {
    setIsProcessingStep(true)
    setStepErrors(null)
    try {
      // Extract only the personal info fields
      const personalInfoFields = {
        company_id: companyId,
        title: personalData.title,
        first_name: personalData.first_name,
        last_name: personalData.last_name,
        dob: personalData.dob instanceof Date ? personalData.dob.toISOString().split("T")[0] : personalData.dob,
        marital_status: personalData.marital_status,
        nationality: personalData.nationality,
        email: personalData.email,
        phone_number: personalData.phone_number,
        id_number: personalData.id_number,
      }

      const response = await dispatch(createDirectorDetails(personalInfoFields)).unwrap()

      // Store the employee_id for use in subsequent steps
      setEmployeeId(response.data.employee_id)

      // Update the form with the employee_id
      methods.setValue("employee_id", response.data.employee_id)

      console.log("Received employee_id from backend:", response.data.employee_id)

      // Show success toast
      toast.success("Personal information saved successfully")

      return {
        success: true,
        ...response.data,
      }
    } catch (error) {
      console.error("Error submitting personal info:", error)
      setStepErrors("Failed to save personal information. Please try again.")
      return { success: false, error }
    } finally {
      setIsProcessingStep(false)
    }
  }

  // Function to submit position info
  const submitPositionInfo = async (positionData) => {
    setIsProcessingStep(true)
    setStepErrors(null)
    try {
      // Extract only the position fields
      const positionFields: AddDirectorPositionRequest = {
        // company_id: companyId,
        employee_id: employeeId,
        ...positionData.position,
        start_date:
          positionData.position.start_date instanceof Date
            ? positionData.position.start_date.toISOString().split("T")[0]
            : positionData.position.start_date,
        end_date:
          positionData.position.end_date instanceof Date
            ? positionData.position.end_date.toISOString().split("T")[0]
            : positionData.position.end_date,
      }

      const response = await dispatch(addNewDirectorPosition(positionFields)).unwrap()

      // Show success toast
      toast.success("Position information saved successfully")

      return {
        success: true,
        ...response.data,
      }
    } catch (error) {
      console.error("Error submitting position info:", error)
      setStepErrors("Failed to save position information. Please try again.")
      return { success: false, error }
    } finally {
      setIsProcessingStep(false)
    }
  }

  // Function to submit qualifications
  const submitQualifications = async (qualificationsData) => {
    setIsProcessingStep(true)
    setStepErrors(null)
    try {
      // Extract only the qualifications fields
      //first qualification = const ql
      const qual = qualificationsData.qualifications[0]
      const qualificationsFields = {
        // company_id: companyId,
        employee_id: employeeId,
        ...qual,
        year_obtained:
          typeof qual.year_obtained === "number" ? qual.year_obtained : Number.parseInt(qual.year_obtained),
        // qualifications: qualificationsData.qualifications.map((qual) => ({

        // })),
      }

      const response = await dispatch(addEducationalQualifications(qualificationsFields)).unwrap()

      // Show success toast
      toast.success("Qualification information saved successfully")

      return {
        success: true,
        ...response.data,
      }
    } catch (error) {
      console.error("Error submitting qualifications:", error)
      setStepErrors("Failed to save qualification information. Please try again.")
      return { success: false, error }
    } finally {
      setIsProcessingStep(false)
    }
  }

  // Function to submit employment history
  const submitEmploymentHistory = async (employmentData) => {
    setIsProcessingStep(true)
    setStepErrors(null)
    try {
      // Extract only the employment history fields
      const emp = employmentData.employment_history[0]
      const employmentFields: AddEmploymentHistoryRequest = {
        // company_id: companyId,
        employee_id: employeeId,
        ...emp,
        start_date: emp.start_date instanceof Date ? emp.start_date.toISOString().split("T")[0] : emp.start_date,
        end_date: emp.end_date instanceof Date ? emp.end_date.toISOString().split("T")[0] : emp.end_date,
      }

      const response = await dispatch(addEmploymentHistory(employmentFields)).unwrap()

      // Show success toast
      toast.success("Employment information saved successfully")

      return {
        success: true,
        ...response.data,
      }
    } catch (error) {
      console.error("Error submitting employment history:", error)
      setStepErrors("Failed to save employment information. Please try again.")
      return { success: false, error }
    } finally {
      setIsProcessingStep(false)
    }
  }

  // Function to submit awards and public profile
  const submitAwardsAndProfile = async (awardsData) => {
    setIsProcessingStep(true)
    setStepErrors(null)
    try {
      // Extract only the awards and public profile fields
      const award = awardsData.awards[0]
      const awardsFields: AddAwardRequest = {
        // company_id: companyId,
        employee_id: employeeId,
        // public_info: awardsData.public_info,
        ...award,
        year: typeof award.year === "number" ? award.year : Number.parseInt(award.year),
      }

      const response = await dispatch(addNewAward(awardsFields)).unwrap()

      // Show success toast
      toast.success("Awards information saved successfully")

      return {
        success: true,
        ...response.data,
      }
    } catch (error) {
      console.error("Error submitting awards and profile:", error)
      setStepErrors("Failed to save awards information. Please try again.")
      return { success: false, error }
    } finally {
      setIsProcessingStep(false)
    }
  }

  // Modified nextStep function to handle the submission of each step
  const nextStep = async () => {
    const currentSchema = getStepSchema(currentStep)

    try {
      // Get the field names for the current step
      let fieldsToValidate = []
      switch (currentStep) {
        case 0: // Personal Info
          fieldsToValidate = [
            "title",
            "first_name",
            "last_name",
            "dob",
            "marital_status",
            "nationality",
            "email",
            "phone_number",
            "id_number",
          ]
          break
        case 1: // Position
          fieldsToValidate = ["position.position", "position.start_date"]
          break
        case 2: // Qualifications
          // No required fields if there are no qualifications
          if (methods.getValues("qualifications")?.length > 0) {
            fieldsToValidate = ["qualifications"]
          }
          break
        case 3: // Employment
          // No required fields if there are no employment history
          if (methods.getValues("employment_history")?.length > 0) {
            fieldsToValidate = ["employment_history"]
          }
          break
        case 4: // Awards
          // No required fields for awards
          break
      }

      // Only validate the fields for the current step
      const result = await methods.trigger(fieldsToValidate as any, { shouldFocus: true })

      // Check if there are errors in the current step's fields
      const currentErrors = methods.formState.errors
      const hasCurrentStepErrors = fieldsToValidate.some((field) => {
        const fieldPath = field.split(".")
        let error = currentErrors
        for (const path of fieldPath) {
          if (!error[path]) return false
          error = error[path]
        }
        return true
      })

      // If there are no errors in the current step, proceed
      if (!hasCurrentStepErrors) {
        const currentData = methods.getValues()
        let response = { success: true }

        // Submit the current step data to the backend
        switch (currentStep) {
          case 0: // Personal Info
            response = await submitPersonalInfo(currentData)
            break
          case 1: // Position
            response = await submitPositionInfo(currentData)
            break
          case 2: // Qualifications
            response = await submitQualifications(currentData)
            break
          case 3: // Employment
            response = await submitEmploymentHistory(currentData)
            break
          case 4: // Awards
            response = await submitAwardsAndProfile(currentData)
            break
        }

        if (response.success) {
          // If successful, proceed to the next step
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
            methods.clearErrors()
            setStepErrors(null)
          }
        }
      }
    } catch (error) {
      console.error("Validation or submission error:", error)
      setStepErrors("An unexpected error occurred. Please try again.")
    }
  }

  // Add a skipStep function to skip the current step
  const skipStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      methods.clearErrors()
      setStepErrors(null)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      // Update the resolver with the new step's schema
      methods.clearErrors()
      setStepErrors(null)
    }
  }

  const handleClose = () => {
    setCurrentStep(0)
    setEmployeeId(null)
    setStepErrors(null)
    methods.reset()
    onClose()
  }

  const finishProcess = () => {
    toast.success("Director added successfully")
    handleClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-[100]">
      <ToastContainer />
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-5xl rounded-lg bg-white shadow-xl">
          {/* Fixed Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="mb-6 flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold">Add Director</Dialog.Title>
              <button onClick={handleClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Stepper */}
            <div className="mb-6 flex items-center justify-center">
              <div className="flex w-full max-w-3xl items-center">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-1 items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= index
                        ? "bg-[#001f3f] text-white"
                        : "border border-gray-300 bg-white text-gray-500"
                        }`}
                    >
                      {currentStep > index ? <Check className="h-5 w-5" /> : step.icon}
                    </div>

                    {index < steps.length - 1 && (
                      <div className={`h-1 flex-1 ${currentStep > index ? "bg-[#001f3f]" : "bg-gray-300"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="grid w-full max-w-3xl grid-cols-6 gap-2 text-center text-xs">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className={`font-medium ${currentStep >= index ? "text-[#001f3f]" : "text-gray-500"}`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <FormProvider {...methods}>
            <div className="flex h-[calc(100vh-300px)] flex-col">
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">


                {/* Show step errors if any */}
                {stepErrors && (
                  <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                    <p className="font-medium">Error</p>
                    <p>{stepErrors}</p>
                  </div>
                )}

                {steps[currentStep].component}
              </div>

              {/* Fixed Footer */}
              <div className="flex justify-between border-t border-gray-200 p-6">
                <CustomButton
                  type="button"
                  variant="outlined"
                  icon={<ChevronLeft className="h-4 w-4" />}
                  onClick={prevStep}
                  isDisabled={currentStep === 0 || isSubmitting || isProcessingStep}
                >
                  Previous
                </CustomButton>

                <div className="flex space-x-2">
                  {/* Show Skip button for steps that can be skipped (Position, Qualifications, Employment, Awards) */}
                  {currentStep > 0 && currentStep < steps.length - 1 && (
                    <CustomButton
                      type="button"
                      variant="outlined"
                      onClick={skipStep}
                      isDisabled={isSubmitting || isProcessingStep}
                    >
                      Skip
                    </CustomButton>
                  )}

                  {currentStep < steps.length - 1 ? (
                    <CustomButton
                      type="button"
                      variant="solid"
                      icon={
                        isProcessingStep ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )
                      }
                      onClick={nextStep}
                      isDisabled={isSubmitting || isProcessingStep}
                    >
                      {isProcessingStep ? "Processing..." : "Next"}
                    </CustomButton>
                  ) : (
                    <>
                      <CustomButton
                        type="button"
                        variant="outlined"
                        onClick={handleClose}
                        isDisabled={isProcessingStep}
                      >
                        Close
                      </CustomButton>
                      <CustomButton
                        type="button"
                        variant="solid"
                        icon={<Check className="h-4 w-4" />}
                        onClick={finishProcess}
                        isDisabled={isProcessingStep}
                      >
                        Finish
                      </CustomButton>
                    </>
                  )}
                </div>
              </div>
            </div>
          </FormProvider>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
