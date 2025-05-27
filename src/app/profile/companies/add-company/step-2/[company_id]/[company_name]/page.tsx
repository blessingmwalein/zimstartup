"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Stepper from "@/components/common/Stepper"
import CustomAlert from "@/components/common/notification/Alert"

import type { AppDispatch } from "../../../../../../../../state/store"
import { createCompanyContact } from "../../../../../../../../state/slices/companySlice"

import { Mail, Phone, MapPin, Globe, Instagram, Linkedin, Twitter, Building2, ChevronRight } from "lucide-react"
import TextField from "@/components/FormElements/TextField"
import CustomButton from "@/components/Buttons/CustomButton"

// Yup validation schema
const schema = Yup.object({
  instagram: Yup.string().nullable(),
  linkedin: Yup.string().nullable(),
  twitter: Yup.string().nullable(),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  work_email: Yup.string().email("Invalid email address").required("Work email is required"),
  phone1: Yup.number().required("Phone number 1 is required"),
  phone2: Yup.number().nullable(),
  phone3: Yup.number().nullable(),
  address: Yup.string().required("Address is required"),
  address_city: Yup.string().required("City is required"),
  state_code: Yup.number().required("State code is required"),
  region: Yup.string().required("Region is required"),
  country: Yup.string().required("Country is required"),
}).required()

// Main Component
const AddCompanyContactDetails: React.FC = ({ params }: any) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [companyName, setCompanyName] = useState("")

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

    // Include the company_id in the contactDetailsPayload
    const contactDetailsPayload = {
      ...data,
      company_id,
    }

    try {
      // Dispatch the action to create contact details
      const response = await dispatch(createCompanyContact(contactDetailsPayload)).unwrap()

      // Redirect to the next step using the company_id from the response
      if (response.data) {
        toast.success("Company contact details added successfully")
        router.push(`/profile/companies/add-company/step-3/${company_id}/${params.company_name}`)
      } else {
        toast.error("Something went wrong")
      }
    } catch (err: any) {
      setError(err || "Failed to submit company contact details")
      toast.error(err || "Failed to submit company contact details")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentStep = 1
  const headings = ["General Details", "Contact Details", "Stock Market", "Funds Details"]

  return (
    <DefaultLayout>
      <div className="mx-auto  px-4 py-8">
        {/* <Breadcrumb pageName="Company Contact Details" /> */}

        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-800">{companyName}</h2>
            <p className="mt-1 text-sm text-gray-500">Add contact information for your company. This is step 2 of 4.</p>
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
              {/* Email Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <Mail className="mr-2 h-5 w-5 text-blue-600" />
                  Email Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextField
                    label="Email"
                    placeholder="company@example.com"
                    {...register("email")}
                    error={errors.email?.message}
                    icon={<Mail className="h-5 w-5" />}
                  />

                  <TextField
                    label="Work Email"
                    placeholder="work@example.com"
                    {...register("work_email")}
                    error={errors.work_email?.message}
                    icon={<Mail className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <Phone className="mr-2 h-5 w-5 text-blue-600" />
                  Phone Numbers
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <TextField
                    label="Phone Number 1"
                    placeholder="Primary phone number"
                    {...register("phone1")}
                    error={errors.phone1?.message}
                    icon={<Phone className="h-5 w-5" />}
                  />

                  <TextField
                    label="Phone Number 2 (Optional)"
                    placeholder="Secondary phone number"
                    {...register("phone2")}
                    error={errors.phone2?.message}
                    icon={<Phone className="h-5 w-5" />}
                  />

                  <TextField
                    label="Phone Number 3 (Optional)"
                    placeholder="Alternative phone number"
                    {...register("phone3")}
                    error={errors.phone3?.message}
                    icon={<Phone className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* Social Media Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <Globe className="mr-2 h-5 w-5 text-blue-600" />
                  Social Media Information
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <TextField
                    label="Instagram"
                    placeholder="Instagram handle"
                    {...register("instagram")}
                    error={errors.instagram?.message}
                    icon={<Instagram className="h-5 w-5" />}
                  />

                  <TextField
                    label="LinkedIn"
                    placeholder="LinkedIn profile"
                    {...register("linkedin")}
                    error={errors.linkedin?.message}
                    icon={<Linkedin className="h-5 w-5" />}
                  />

                  <TextField
                    label="Twitter"
                    placeholder="Twitter handle"
                    {...register("twitter")}
                    error={errors.twitter?.message}
                    icon={<Twitter className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
                  <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                  Address Information
                </h3>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">Address</label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-500">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <textarea
                      className={`w-full rounded-md border ${errors.address ? "border-red-500" : "border-gray-300"
                        } p-3 pl-10 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      rows={3}
                      placeholder="Company address"
                      {...register("address")}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <TextField
                    label="City"
                    placeholder="City"
                    {...register("address_city")}
                    error={errors.address_city?.message}
                    icon={<Building2 className="h-5 w-5" />}
                  />

                  <TextField
                    label="Region"
                    placeholder="Region"
                    {...register("region")}
                    error={errors.region?.message}
                    icon={<MapPin className="h-5 w-5" />}
                  />

                  <TextField
                    label="State Code"
                    placeholder="State code (e.g. 263)"
                    {...register("state_code")}
                    error={errors.state_code?.message}
                    icon={<Building2 className="h-5 w-5" />}
                  />
                </div>

                <div className="mt-6">
                  <TextField
                    label="Country"
                    placeholder="Country"
                    {...register("country")}
                    error={errors.country?.message}
                    icon={<Globe className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <div className="w-[70px]">
                  <CustomButton variant="'outline'" onClick={() => router.back()}>
                    Cancel
                  </CustomButton>
                </div>
                <div>
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

        <ToastContainer position="bottom-right" />
      </div>
    </DefaultLayout>
  )
}

export default AddCompanyContactDetails
