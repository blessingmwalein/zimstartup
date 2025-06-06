"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { User, Mail, Phone, Building2, MapPin, Shield, Key, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react"

import TextField from "@/components/FormElements/TextField"
import Select from "@/components/FormElements/SelectInput"
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker"
import CustomButton from "@/components/Buttons/CustomButton"
import Stepper from "@/components/common/Stepper"
// import { useOnboarding } from "@/hooks/use-onboarding"
import AuthLayout from "@/components/Layouts/AuthLayout"
import { useOnboarding } from "@/hooks/useOnboarding"

// Validation schemas matching your project structure
const stepSchemas = {
  type: Yup.object({
    national_id: Yup.string().required("National ID is required"),
    reason: Yup.string().required("Please select at least one investor type"),
    place: Yup.string().required("Location is required"),
  }),
  basic: Yup.object({
    title: Yup.string().required("Title is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of birth is required"),
    marital_status: Yup.string().required("Marital status is required"),
    nationality: Yup.string().required("Nationality is required"),
    national_id: Yup.string().required("National ID is required"),
  }),
  contact: Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone1: Yup.string().required("Phone number is required"),
    address1: Yup.string().required("Street address is required"),
    town: Yup.string().required("Town is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  }),
  // company: Yup.object({
  //   company_name: Yup.string().required("Company name is required"),
  //   position: Yup.string().required("Position is required"),
  //   industry: Yup.string().required("Industry is required"),
  //   annual_income: Yup.number().positive("Annual income must be positive").required("Annual income is required"),
  // }),
  // "account-verification": Yup.object({
  //   verification_type: Yup.string().required("Verification type is required"),
  //   document_number: Yup.string().required("Document number is required"),
  // }),
  credentials: Yup.object({
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  }),
}

const InvestorOnboardingForm = () => {
  const {
    currentStep,
    stepTitles,
    getCurrentStepInfo,
    goToNextStep,
    goToPreviousStep,
    submitStep,
    updateStepData,
    completeOnboarding,
    isSubmitting,
    isFirstStep,
    isLastStep,
    progressPercentage,
    loading,
    error,
    errors,
    investorTypes,
    titles,
    initData,
  } = useOnboarding()

  const currentStepInfo = getCurrentStepInfo()
  const currentSchema = stepSchemas[currentStepInfo.key as keyof typeof stepSchemas]

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(currentSchema),
    defaultValues: currentStepInfo.data,
  })

  // Watch form values and update step data
  const watchedValues = watch()
  const previousValuesRef = React.useRef(watchedValues)

  React.useEffect(() => {
    // Only update if values have actually changed
    if (JSON.stringify(previousValuesRef.current) !== JSON.stringify(watchedValues)) {
      previousValuesRef.current = { ...watchedValues }
      updateStepData(currentStepInfo.key, watchedValues)
    }
  }, [watchedValues, currentStepInfo.key, updateStepData])

  const onSubmit = async (data: any) => {
    try {
      await submitStep(currentStepInfo.key, data)

      if (isLastStep) {
        completeOnboarding()
      } else {
        goToNextStep()
      }
    } catch (error) {
      // Error is handled in the hook
    }
  }

  const renderStepContent = () => {
    switch (currentStepInfo.key) {
      case "type":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What type of investor are you?</h2>
              <p className="text-gray-600">Help us understand your investment profile</p>
            </div>

            <TextField
              label="National ID"
              placeholder="Enter your national ID"
              {...register("national_id")}
              error={formErrors.national_id?.message || errors?.national_id}
              icon={<Shield className="h-5 w-5" />}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Investor Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {investorTypes.map((type, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${watchedValues.reason?.includes(type)
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                      }`}
                    onClick={() => {
                      let reason = watchedValues.reason || ""
                      if (reason.includes(type)) {
                        reason = reason.replace(type + ".", "")
                      } else {
                        reason = reason + type + "."
                      }
                      setValue("reason", reason)
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${watchedValues.reason?.includes(type) ? "border-red-500 bg-red-500" : "border-gray-300"
                          }`}
                      >
                        {watchedValues.reason?.includes(type) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{type}</span>
                    </div>
                  </div>
                ))}
              </div>
              {(formErrors.reason?.message || errors?.reason) && (
                <p className="mt-1 text-sm text-red-500">{formErrors.reason?.message || errors?.reason}</p>
              )}
            </div>

            <Controller
              control={control}
              name="place"
              render={({ field }) => (
                <Select
                  label="Current Location"
                  options={[
                    { value: "Currently in Zimbabwe", label: "Currently in Zimbabwe" },
                    { value: "Currently outside Zimbabwe", label: "Currently outside Zimbabwe" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select your current location"
                  error={formErrors.place?.message || errors?.place}
                  icon={<MapPin className="h-5 w-5" />}
                />
              )}
            />
          </div>
        )

      case "basic":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Select
                    label="Title"
                    options={titles.map((title) => ({ label: title, value: title }))}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Title"
                    error={formErrors.title?.message || errors?.title}
                    icon={<User className="h-5 w-5" />}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="First Name"
                placeholder="Enter your first name"
                {...register("first_name")}
                error={formErrors.first_name?.message || errors?.first_name}
                icon={<User className="h-5 w-5" />}
              />

              <TextField
                label="Middle Name (Optional)"
                placeholder="Enter your middle name"
                {...register("middle_name")}
                error={formErrors.middle_name?.message || errors?.middle_name}
                icon={<User className="h-5 w-5" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="Last Name"
                placeholder="Enter your last name"
                {...register("last_name")}
                error={formErrors.last_name?.message || errors?.last_name}
                icon={<User className="h-5 w-5" />}
              />

              <TextField
                label="Nickname (Optional)"
                placeholder="Enter your nickname"
                {...register("nickname")}
                error={formErrors.nickname?.message || errors?.nickname}
                icon={<User className="h-5 w-5" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomDatePicker
                control={control}
                name="dob"
                label="Date of Birth"
                placeholder="Select your date of birth"
                error={formErrors.dob?.message || errors?.dob}
              />

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select
                      label="Gender"
                      options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Gender"
                      error={formErrors.gender?.message || errors?.gender}
                      icon={<User className="h-5 w-5" />}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="marital_status"
                  render={({ field }) => (
                    <Select
                      label="Marital Status"
                      options={[
                        { value: "Single", label: "Single" },
                        { value: "Married", label: "Married" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Status"
                      error={formErrors.marital_status?.message || errors?.marital_status}
                      icon={<User className="h-5 w-5" />}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                control={control}
                name="nationality"
                render={({ field }) => (
                  <Select
                    label="Nationality"
                    options={[
                      { value: "Zimbabwean", label: "Zimbabwean" },
                      { value: "South African", label: "South African" },
                      { value: "Kenyan", label: "Kenyan" },
                      { value: "Other", label: "Other" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select nationality"
                    error={formErrors.nationality?.message || errors?.nationality}
                    icon={<Shield className="h-5 w-5" />}
                  />
                )}
              />

              <TextField
                label="National ID"
                placeholder="Enter your national ID"
                {...register("national_id")}
                error={formErrors.national_id?.message || errors?.national_id}
                icon={<Shield className="h-5 w-5" />}
              />
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Information</h2>
              <p className="text-gray-600">How can we reach you?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                error={formErrors.email?.message || errors?.email}
                icon={<Mail className="h-5 w-5" />}
              />

              <TextField
                label="Work Email (Optional)"
                type="email"
                placeholder="Enter your work email"
                {...register("work_email")}
                error={formErrors.work_email?.message || errors?.work_email}
                icon={<Mail className="h-5 w-5" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="Phone Number"
                placeholder="Enter your phone number"
                {...register("phone1")}
                error={formErrors.phone1?.message || errors?.phone1}
                icon={<Phone className="h-5 w-5" />}
              />

              <TextField
                label="Alternative Phone (Optional)"
                placeholder="Enter alternative phone"
                {...register("phone2")}
                error={formErrors.phone2?.message || errors?.phone2}
                icon={<Phone className="h-5 w-5" />}
              />
            </div>

            <TextField
              label="Street Address"
              placeholder="Enter your street address"
              {...register("address1")}
              error={formErrors.address1?.message || errors?.address1}
              icon={<MapPin className="h-5 w-5" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextField
                label="Town"
                placeholder="Enter your town"
                {...register("town")}
                error={formErrors.town?.message || errors?.town}
                icon={<MapPin className="h-5 w-5" />}
              />

              <TextField
                label="City"
                placeholder="Enter your city"
                {...register("city")}
                error={formErrors.city?.message || errors?.city}
                icon={<MapPin className="h-5 w-5" />}
              />

              <TextField
                label="State/Country"
                placeholder="e.g. Zimbabwe"
                {...register("state")}
                error={formErrors.state?.message || errors?.state}
                icon={<MapPin className="h-5 w-5" />}
              />
            </div>

            <div className="max-w-xs">
              <TextField
                label="Postal Code (Optional)"
                placeholder="Enter postal code"
                {...register("postal_code")}
                error={formErrors.postal_code?.message || errors?.postal_code}
                icon={<MapPin className="h-5 w-5" />}
              />
            </div>
          </div>
        )

      case "company":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Employment Information</h2>
              <p className="text-gray-600">Tell us about your current employment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="Company Name"
                placeholder="Enter company name"
                {...register("company_name")}
                error={formErrors.company_name?.message}
                icon={<Building2 className="h-5 w-5" />}
              />

              <TextField
                label="Position"
                placeholder="Enter your position"
                {...register("position")}
                error={formErrors.position?.message}
                icon={<User className="h-5 w-5" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                control={control}
                name="industry"
                render={({ field }) => (
                  <Select
                    label="Industry"
                    options={[
                      { value: "technology", label: "Technology" },
                      { value: "finance", label: "Finance" },
                      { value: "healthcare", label: "Healthcare" },
                      { value: "education", label: "Education" },
                      { value: "manufacturing", label: "Manufacturing" },
                      { value: "other", label: "Other" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select industry"
                    error={formErrors.industry?.message}
                    icon={<Building2 className="h-5 w-5" />}
                  />
                )}
              />

              <TextField
                label="Annual Income (USD)"
                type="number"
                placeholder="Enter annual income"
                {...register("annual_income")}
                error={formErrors.annual_income?.message}
                icon={<Building2 className="h-5 w-5" />}
              />
            </div>
          </div>
        )

      case "account-verification":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Verification</h2>
              <p className="text-gray-600">Verify your identity to secure your account</p>
            </div>

            <Controller
              control={control}
              name="verification_type"
              render={({ field }) => (
                <Select
                  label="Verification Document Type"
                  options={[
                    { value: "passport", label: "Passport" },
                    { value: "national_id", label: "National ID" },
                    { value: "drivers_license", label: "Driver's License" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select document type"
                  error={formErrors.verification_type?.message}
                  icon={<Shield className="h-5 w-5" />}
                />
              )}
            />

            <TextField
              label="Document Number"
              placeholder="Enter document number"
              {...register("document_number")}
              error={formErrors.document_number?.message}
              icon={<Shield className="h-5 w-5" />}
            />
          </div>
        )

      case "credentials":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
              <p className="text-gray-600">
                Set up your login credentials
                {initData.email && (
                  <span>
                    {" "}
                    for <strong>{initData.email}</strong>
                  </span>
                )}
              </p>
            </div>

            <TextField
              label="Password"
              type="password"
              placeholder="Create a strong password"
              {...register("password")}
              error={formErrors.password?.message || errors?.password}
              icon={<Key className="h-5 w-5" />}
            />

            <TextField
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              {...register("confirm_password")}
              error={formErrors.confirm_password?.message || errors?.confirm_password}
              icon={<Key className="h-5 w-5" />}
            />
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading onboarding...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          {/* <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">TC</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">TEFCONNECT</h1>
            <p className="text-gray-600">Start your journey to limitless opportunities today</p>
          </div> */}

          {/* Progress Stepper */}
          <div className="mb-8">
            <Stepper currentStep={currentStep} headings={stepTitles} />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Step {currentStep + 1} of {stepTitles.length}
                  </h3>
                  <p className="text-sm text-gray-600">{currentStepInfo.title}</p>
                </div>
                <div className="text-sm text-gray-500">{progressPercentage}% Complete</div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <div>
                  {!isFirstStep && (
                    <CustomButton type="button" variant="outline" onClick={goToPreviousStep}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </CustomButton>
                  )}
                </div>

                <CustomButton type="submit" disabled={isSubmitting} variant="solid">
                  {isSubmitting ? (
                    "Processing..."
                  ) : isLastStep ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Registration
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </CustomButton>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              By clicking create account, you agree to our{" "}
              <a href="#" className="text-red-600 hover:underline">
                Data Collection and Privacy Policy
              </a>
            </p>
          </div>
        </div>

        <ToastContainer position="bottom-center" />
      </div>
    </AuthLayout>
  )
}

export default InvestorOnboardingForm
