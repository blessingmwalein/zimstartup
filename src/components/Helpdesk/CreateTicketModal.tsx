import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { X, Loader2 } from "lucide-react"
import CustomButton from "@/components/Buttons/CustomButton"

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (ticketData: { title: string; description: string; priority: string }) => Promise<void>
}

export default function CreateTicketModal({ isOpen, onClose, onSubmit }: CreateTicketModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
      })
      setErrors({})
    } catch (error) {
      console.error("Error submitting ticket:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#052941] to-[#041f30] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-xl font-semibold text-white">
                      Create Support Ticket
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="rounded-lg p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-5">
                    {/* Title */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-900">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2 ${
                          errors.title
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-gray-300 focus:border-[#052941] focus:ring-[#052941]/20"
                        }`}
                        placeholder="Brief description of your issue"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                      )}
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-900">
                        Priority <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => handleChange("priority", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-[#052941] focus:outline-none focus:ring-2 focus:ring-[#052941]/20"
                      >
                        <option value="LOW">Low - General inquiry</option>
                        <option value="MEDIUM">Medium - Non-urgent issue</option>
                        <option value="HIGH">High - Urgent issue</option>
                        <option value="CRITICAL">Critical - System down</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-900">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        rows={6}
                        className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2 ${
                          errors.description
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-gray-300 focus:border-[#052941] focus:ring-[#052941]/20"
                        }`}
                        placeholder="Provide detailed information about your issue..."
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <CustomButton
                      type="submit"
                      variant="solid"
                      fullWidth={false}
                      disabled={isSubmitting}
                      icon={
                        isSubmitting ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : undefined
                      }
                    >
                      {isSubmitting ? "Creating..." : "Create Ticket"}
                    </CustomButton>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
