"use client"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { Dialog } from "@headlessui/react"
import { Bell, Link, X } from "lucide-react"

import TextField from "../ui/text-field"
import Select from "../ui/select"
import CustomButton from "../ui/custom-button"

// Validation schema
const updateSchema = Yup.object({
  company_id: Yup.number().required(),
  update_type: Yup.string().required("Update type is required"),
  headline: Yup.string().required("Headline is required"),
  summary: Yup.string().required("Summary is required").max(200, "Summary must be less than 200 characters"),
  update_content: Yup.string().required("Content is required"),
  url: Yup.string().url("Please enter a valid URL").nullable(),
  is_published: Yup.boolean(),
}).required()

interface AddCompanyUpdateDialogProps {
  isOpen: boolean
  onClose: () => void
  companyId: number
  onSave: (data: any) => void
}

export default function AddCompanyUpdateDialog({ isOpen, onClose, companyId, onSave }: AddCompanyUpdateDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateSchema),
    defaultValues: {
      company_id: companyId,
      update_type: "",
      headline: "",
      summary: "",
      update_content: "",
      url: "",
      is_published: false,
    },
  })

  const updateTypeOptions = [
    { value: "Announcement", label: "Announcement" },
    { value: "Press Release", label: "Press Release" },
    { value: "Financial Report", label: "Financial Report" },
    { value: "Dividend", label: "Dividend" },
    { value: "Corporate Action", label: "Corporate Action" },
  ]

  const onSubmit = (data: any) => {
    // Add created_at date
    const updatedData = {
      ...data,
      created_at: new Date().toISOString(),
      update_id: Math.floor(Math.random() * 1000), // Mock ID for demo
    }
    onSave(updatedData)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-3xl rounded-lg bg-white shadow-xl">
          {/* Fixed Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold">Add Company Update</Dialog.Title>
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
                  label="Headline"
                  icon={<Bell className="h-5 w-5" />}
                  {...register("headline")}
                  error={errors.headline?.message}
                  placeholder="Enter headline"
                />

                <Controller
                  control={control}
                  name="update_type"
                  render={({ field }) => (
                    <Select
                      label="Update Type"
                      options={updateTypeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select update type"
                      error={errors.update_type?.message}
                      icon={<Bell className="h-5 w-5" />}
                    />
                  )}
                />

                <TextField
                  label="External URL (optional)"
                  icon={<Link className="h-5 w-5" />}
                  {...register("url")}
                  error={errors.url?.message}
                  placeholder="Enter URL to external content"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">Summary</label>
                <textarea
                  {...register("summary")}
                  className={`w-full rounded-[10px] border ${
                    errors.summary ? "border-red-500" : "border-gray-300"
                  } p-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  rows={2}
                  placeholder="Enter a brief summary"
                />
                {errors.summary && <p className="mt-1 text-sm text-red-500">{errors.summary.message}</p>}
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  {...register("update_content")}
                  className={`w-full rounded-[10px] border ${
                    errors.update_content ? "border-red-500" : "border-gray-300"
                  } p-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  rows={6}
                  placeholder="Enter the full update content"
                />
                {errors.update_content && <p className="mt-1 text-sm text-red-500">{errors.update_content.message}</p>}
              </div>

              <div className="mt-6 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_published"
                  {...register("is_published")}
                  className="h-4 w-4 rounded border-gray-300 text-[#001f3f] focus:ring-[#001f3f]"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
                  Publish immediately
                </label>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex justify-end space-x-4 border-t border-gray-200 p-6">
              <CustomButton type="button" variant="outlined" onClick={onClose}>
                Cancel
              </CustomButton>
              <CustomButton type="submit" variant="solid" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Update"}
              </CustomButton>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
