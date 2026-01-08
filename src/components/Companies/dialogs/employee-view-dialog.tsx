"use client"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { X, User, Mail, Calendar, Flag, Briefcase, GraduationCap, Award, Building2, Edit } from "lucide-react"

interface EmployeeData {
  employee_data: {
    employee_id: number
    company_id: number
    title: string
    first_name: string
    last_name: string
    dob: string
    marital_status: string
    nationality: string
    email: string
  }
  current_position_at_company: {
    overall_position: string
    position: string
    start_date: string
    end_date: string
    is_current: boolean
  }
  educational_qualifications: Array<{
    qualification_id: number
    institution: string
    education_type: string
    field_of_study: string
    year_obtained: number
  }>
  previous_employment_history: Array<any>
  public_profile: {
    public_profile: string | null
  }
  awards: Array<any>
}

interface EmployeeViewDialogProps {
  isOpen: boolean
  onClose: () => void
  employeeData: EmployeeData | null
  onEdit?: () => void
}

export default function EmployeeViewDialog({ isOpen, onClose, employeeData, onEdit }: EmployeeViewDialogProps) {
  if (!employeeData) return null

  const {
    employee_data,
    current_position_at_company,
    educational_qualifications,
    previous_employment_history,
    public_profile,
    awards,
  } = employeeData

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header with gradient */}
                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 px-6 py-8 text-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <User className="h-10 w-10 text-white" />
                          </div>
                          <div>
                            <Dialog.Title className="text-2xl font-bold">
                              {employee_data.title} {employee_data.first_name} {employee_data.last_name}
                            </Dialog.Title>
                            <p className="mt-1 text-sm text-white/90">
                              {current_position_at_company.position}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={onClose}
                          className="rounded-full p-2 text-white/80 hover:bg-white/20 transition-colors"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                      {onEdit && (
                        <button
                          onClick={onEdit}
                          className="absolute bottom-4 right-6 flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <div className="space-y-6">
                        {/* Personal Information */}
                        <div className="rounded-3xl bg-white border border-gray-100 p-6">
                          <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Email</p>
                              <p className="mt-1 font-normal text-gray-900">{employee_data.email || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Date of Birth</p>
                              <p className="mt-1 font-normal text-gray-900">{new Date(employee_data.dob).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Nationality</p>
                              <p className="mt-1 font-normal text-gray-900">{employee_data.nationality}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Marital Status</p>
                              <p className="mt-1 font-normal text-gray-900">{employee_data.marital_status}</p>
                            </div>
                          </div>
                        </div>

                        {/* Current Position */}
                        <div className="rounded-3xl bg-white border border-gray-100 p-6">
                          <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                              <Briefcase className="h-5 w-5 text-green-600" />
                            </div>
                            Current Position
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Position</p>
                              <p className="mt-1 font-normal text-gray-900">{current_position_at_company.position}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Overall Position</p>
                              <p className="mt-1 font-normal text-gray-900">{current_position_at_company.overall_position}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Start Date</p>
                              <p className="mt-1 font-normal text-gray-900">
                                  {new Date(current_position_at_company.start_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">End Date</p>
                              <p className="mt-1 font-normal text-gray-900">
                                {current_position_at_company.end_date 
                                  ? new Date(current_position_at_company.end_date).toLocaleDateString()
                                  : "N/A"}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Status</p>
                              <div className="mt-1 flex items-center gap-2">
                                <div
                                  className={`h-3 w-3 rounded-full ${current_position_at_company.is_current ? "bg-green-500" : "bg-gray-400"}`}
                                />
                                <p className="font-normal text-gray-900">{current_position_at_company.is_current ? "Current" : "Former"}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Educational Qualifications */}
                        <div className="rounded-3xl bg-white border border-gray-100 p-6">
                          <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                              <GraduationCap className="h-5 w-5 text-purple-600" />
                            </div>
                            Educational Qualifications
                          </h3>
                          {educational_qualifications.length > 0 ? (
                            <div className="space-y-4">
                              {educational_qualifications.map((qualification) => (
                                <div key={qualification.qualification_id} className="border-l-4 border-purple-500 bg-purple-50/30 rounded-r-lg pl-4 py-3">
                                  <h4 className="font-semibold text-gray-900">{qualification.education_type}</h4>
                                  <p className="text-sm text-gray-700 mt-0.5">{qualification.field_of_study}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {qualification.institution} • {qualification.year_obtained}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">No educational qualifications recorded</p>
                          )}
                        </div>

                        {/* Employment History */}
                        <div className="rounded-3xl bg-white border border-gray-100 p-6">
                          <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                              <Briefcase className="h-5 w-5 text-orange-600" />
                            </div>
                            Previous Employment
                          </h3>
                          {previous_employment_history.length > 0 ? (
                            <div className="space-y-4">
                              {previous_employment_history.map((employment, index) => (
                                <div key={index} className="border-l-4 border-orange-500 bg-orange-50/30 rounded-r-lg pl-4 py-3">
                                  <h4 className="font-semibold text-gray-900">{employment.position}</h4>
                                  <p className="text-sm text-gray-700 mt-0.5">{employment.company_name}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {employment.start_date} - {employment.end_date || "Present"}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">No previous employment history recorded</p>
                          )}
                        </div>

                        {/* Awards */}
                        {awards.length > 0 && (
                          <div className="rounded-3xl bg-white border border-gray-100 p-6">
                            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50">
                                <Award className="h-5 w-5 text-yellow-600" />
                              </div>
                              Awards & Recognition
                            </h3>
                            <div className="space-y-4">
                              {awards.map((award, index) => (
                                <div key={index} className="border-l-4 border-yellow-500 bg-yellow-50/30 rounded-r-lg pl-4 py-3">
                                  <h4 className="font-semibold text-gray-900">{award.award}</h4>
                                  <p className="text-sm text-gray-700 mt-0.5">{award.organization}</p>
                                  <p className="text-sm text-gray-500 mt-1">{award.year}</p>
                                  {award.description && <p className="text-sm text-gray-600 mt-2">{award.description}</p>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Public Profile */}
                        {public_profile.public_profile && (
                          <div className="rounded-3xl bg-white border border-gray-100 p-6">
                            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50">
                                <User className="h-5 w-5 text-cyan-600" />
                              </div>
                              Public Profile
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{public_profile.public_profile}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
