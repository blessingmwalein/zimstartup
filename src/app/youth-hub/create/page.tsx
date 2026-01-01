"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import MainLayout from "@/components/Layouts/MainLayout"
import AuthGuard from "@/components/AuthGuard"
import { useYouthHub } from "../../../hooks/useYouthHub"
import { YouthHubRequest } from "@/state/models/youthHub"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import CustomButton from "@/components/Buttons/CustomButton"
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker"
import { useForm, Controller } from "react-hook-form"

export default function CreateYouthHubPage() {
  const router = useRouter()
  const { createRequest, loadingStates } = useYouthHub()
  const { user } = useSelector((state: any) => state.auth)
  
  // React Hook Form
  const { control } = useForm()
  
  // Auto-populate national_id and contact_email from current user
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        national_id: user.national_id || "",
        contact_email: user.email || ""
      }))
    }
  }, [user])
  
  const [formData, setFormData] = useState<YouthHubRequest>({
    project_name: "",
    type_of_request: "",
    request_details: "",
    request_offer: "",
    sector: "",
    contact_email: "",
    location: "",
    region: "",
    proposed_launch_date: "",
    national_id: "",
  })

  const [errors, setErrors] = useState<Partial<YouthHubRequest>>({})

  const sectors = [
    "Technology",
    "Health",
    "Education",
    "Finance",
    "Agriculture",
    "Environment",
    "Entertainment",
    "Food & Beverage",
    "Fashion",
    "Transportation",
    "Real Estate",
    "Other"
  ]

  const requestTypes = [
    "Idea",
    "Partnership",
    "Mentorship",
    "Funding",
    "Resources",
    "Collaboration",
    "Skills Exchange",
    "Other"
  ]

  const regions = [
    "Harare",
    "Bulawayo",
    "Chitungwiza",
    "Mutare",
    "Epworth",
    "Gweru",
    "Kwekwe",
    "Kadoma",
    "Masvingo",
    "Chinhoyi",
    "Marondera",
    "Ruwa",
    "Chegutu",
    "Zvishavane",
    "Bindura",
    "Beitbridge",
    "Redcliff",
    "Victoria Falls",
    "Hwange",
    "Chiredzi",
    "Kariba",
    "Karoi",
    "Chipinge",
    "Gokwe",
    "Shurugwi",
    "Plumtree",
    "Mazowe",
    "Glendale",
    "Shamva",
    "Other"
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof YouthHubRequest]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<YouthHubRequest> = {}

    if (!formData.project_name.trim()) {
      newErrors.project_name = "Project name is required"
    }

    if (!formData.type_of_request.trim()) {
      newErrors.type_of_request = "Request type is required"
    }

    if (!formData.request_details.trim()) {
      newErrors.request_details = "Project details are required"
    }

    if (!formData.sector.trim()) {
      newErrors.sector = "Sector is required"
    }

    // Email and National ID are auto-filled from user profile, so we don't validate them
    // if (!formData.contact_email.trim()) {
    //   newErrors.contact_email = "Email is required"
    // } else if (!/\S+@\S+\.\S+/.test(formData.contact_email)) {
    //   newErrors.contact_email = "Please enter a valid email"
    // }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.region.trim()) {
      newErrors.region = "Region is required"
    }

    if (!formData.proposed_launch_date.trim()) {
      newErrors.proposed_launch_date = "Proposed launch date is required"
    }

    // National ID is auto-filled from user profile
    // if (!formData.national_id.trim()) {
    //   newErrors.national_id = "National ID is required"
    // }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const result = await createRequest(formData)
      if (result.success) {
        toast.success("Project created successfully!", {
          position: "top-right",
          autoClose: 3000,
        })
        // Redirect to youth hub page
        setTimeout(() => {
          router.push("/youth-hub")
        }, 500)
      } else {
        // Handle error
        toast.error(result.message || "Failed to create project", {
          position: "top-right",
          autoClose: 5000,
        })
        console.error("Failed to create project:", result.message)
      }
    } catch (error) {
      toast.error("An error occurred while creating the project", {
        position: "top-right",
        autoClose: 5000,
      })
      console.error("Error creating project:", error)
    }
  }

  return (
    <AuthGuard>
      <MainLayout>
        <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/youth-hub"
              className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-[#052941]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Youth Hub
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Add Your Project
            </h1>
            <p className="mt-2 text-gray-600">
              Share your project with the youth community and find collaborators.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div>
                <label htmlFor="project_name" className="mb-2 block text-sm font-medium text-gray-900">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="project_name"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleInputChange}
                  className={`block w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:border-[#052941] focus:outline-none focus:ring-2 focus:ring-[#052941]/20 ${
                    errors.project_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your project name"
                />
                {errors.project_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.project_name}</p>
                )}
              </div>

              {/* Type of Request and Sector */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="type_of_request" className="mb-2 block text-sm font-medium text-gray-900">
                    Type of Request <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type_of_request"
                    name="type_of_request"
                    value={formData.type_of_request}
                    onChange={handleInputChange}
                    className={`block w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:border-[#052941] focus:outline-none focus:ring-2 focus:ring-[#052941]/20 ${
                      errors.type_of_request ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select request type</option>
                    {requestTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type_of_request && (
                    <p className="mt-1 text-sm text-red-500">{errors.type_of_request}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="sector" className="mb-2 block text-sm font-medium text-gray-900">
                    Sector <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className={`block w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:border-[#052941] focus:outline-none focus:ring-2 focus:ring-[#052941]/20 ${
                      errors.sector ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select sector</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                  {errors.sector && (
                    <p className="mt-1 text-sm text-red-500">{errors.sector}</p>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="request_details" className="mb-2 block text-sm font-medium text-gray-900">
                  Project Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="request_details"
                  name="request_details"
                  value={formData.request_details}
                  onChange={handleInputChange}
                  rows={4}
                  className={`block w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:border-[#052941] focus:outline-none focus:ring-2 focus:ring-[#052941]/20 ${
                    errors.request_details ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Describe your project, what you're looking for, and how others can help..."
                />
                {errors.request_details && (
                  <p className="mt-1 text-sm text-red-500">{errors.request_details}</p>
                )}
              </div>

              {/* What You're Offering */}
              <div>
                <label htmlFor="request_offer" className="mb-2 block text-sm font-medium text-gray-900">
                  What You're Offering
                </label>
                <textarea
                  id="request_offer"
                  name="request_offer"
                  value={formData.request_offer}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-[#052941] focus:outline-none focus:ring-2 focus:ring-[#052941]/20"
                  placeholder="What skills, resources, or value can you offer to potential collaborators?"
                />
              </div>

                             {/* Contact Information */}
               <div className="grid gap-6 md:grid-cols-2">
                 <div>
                   <label htmlFor="contact_email" className="block text-sm font-medium text-black dark:text-white">
                     Email Address *
                   </label>
                   <input
                     type="email"
                     id="contact_email"
                     name="contact_email"
                     value={formData.contact_email}
                     onChange={handleInputChange}
                     className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary dark:bg-boxdark-2 dark:text-white ${
                       errors.contact_email ? "border-red-500" : "border-gray-300 dark:border-boxdark-2"
                     }`}
                     placeholder="your.email@example.com"
                     readOnly
                   />
                   <p className="mt-1 text-xs text-bodydark2">Auto-filled from your profile</p>
                   {errors.contact_email && (
                     <p className="mt-1 text-sm text-red-500">{errors.contact_email}</p>
                   )}
                 </div>

                 <div>
                   <label htmlFor="national_id" className="block text-sm font-medium text-black dark:text-white">
                     National ID *
                   </label>
                   <input
                     type="text"
                     id="national_id"
                     name="national_id"
                     value={formData.national_id}
                     onChange={handleInputChange}
                     className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary dark:bg-boxdark-2 dark:text-white ${
                       errors.national_id ? "border-red-500" : "border-gray-300 dark:border-boxdark-2"
                     }`}
                     placeholder="Enter your National ID"
                     readOnly
                   />
                   <p className="mt-1 text-xs text-bodydark2">Auto-filled from your profile</p>
                   {errors.national_id && (
                     <p className="mt-1 text-sm text-red-500">{errors.national_id}</p>
                   )}
                 </div>
               </div>

              {/* Location */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-black dark:text-white">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary dark:bg-boxdark-2 dark:text-white ${
                      errors.location ? "border-red-500" : "border-gray-300 dark:border-boxdark-2"
                    }`}
                    placeholder="City or town"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-black dark:text-white">
                    Region *
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary dark:bg-boxdark-2 dark:text-white ${
                      errors.region ? "border-red-500" : "border-gray-300 dark:border-boxdark-2"
                    }`}
                  >
                    <option value="">Select region</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="mt-1 text-sm text-red-500">{errors.region}</p>
                  )}
                </div>
              </div>

              {/* Proposed Launch Date */}
              <div>
                <Controller
                  control={control}
                  name="proposed_launch_date"
                  render={({ field }) => (
                    <CustomDatePicker
                      control={control}
                      name="proposed_launch_date"
                      label="Proposed Launch Date"
                      placeholder="Select your proposed launch date"
                      error={errors.proposed_launch_date}
                      value={formData.proposed_launch_date}
                      onChange={(date) => {
                        const formattedDate = date ? new Date(date).toISOString().split('T')[0] : ''
                        setFormData(prev => ({ ...prev, proposed_launch_date: formattedDate }))
                        if (errors.proposed_launch_date) {
                          setErrors(prev => ({ ...prev, proposed_launch_date: "" }))
                        }
                      }}
                    />
                  )}
                />
              </div>

                             {/* Submit Button */}
               <div className="flex justify-end space-x-4 pt-6">
                 <Link href="/youth-hub">
                   <CustomButton
                     type="button"
                     variant="outlined"
                   >
                     Cancel
                   </CustomButton>
                 </Link>
                 <CustomButton
                   type="submit"
                   variant="solid"
                   isLoading={loadingStates.create}
                   isDisabled={loadingStates.create}
                 >
                   {loadingStates.create ? "Creating..." : "Create Project"}
                 </CustomButton>
               </div>
            </form>
          </div>
        </div>
      </main>
    </MainLayout>
    </AuthGuard>
  )
} 
