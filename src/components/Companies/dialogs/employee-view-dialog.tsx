"use client"
import { Dialog } from "@headlessui/react"
import { X, User, Mail, Calendar, Flag, Briefcase, GraduationCap, Award, Building2, Edit } from "lucide-react"
import CustomButton from "../ui/custom-button"

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
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg bg-white shadow-xl">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <Dialog.Title className="text-xl font-semibold">
                    {employee_data.title} {employee_data.first_name} {employee_data.last_name}
                  </Dialog.Title>
                  <p className="text-sm text-gray-500">
                    {current_position_at_company.position} • Employee ID: {employee_data.employee_id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <CustomButton type="button" variant="outlined" icon={<Edit className="h-4 w-4" />} onClick={onEdit}>
                    Edit
                  </CustomButton>
                )}
                <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <User className="h-5 w-5 text-gray-600" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{employee_data.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{new Date(employee_data.dob).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Flag className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p className="font-medium">{employee_data.nationality}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Marital Status</p>
                      <p className="font-medium">{employee_data.marital_status}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Position */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Briefcase className="h-5 w-5 text-gray-600" />
                  Current Position
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Position</p>
                      <p className="font-medium">{current_position_at_company.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Overall Position</p>
                      <p className="font-medium">{current_position_at_company.overall_position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {new Date(current_position_at_company.start_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {current_position_at_company.end_date && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className="font-medium">
                          {new Date(current_position_at_company.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${current_position_at_company.is_current ? "bg-green-500" : "bg-gray-400"}`}
                    />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">{current_position_at_company.is_current ? "Current" : "Former"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Qualifications */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <GraduationCap className="h-5 w-5 text-gray-600" />
                  Educational Qualifications
                </h3>
                {educational_qualifications.length > 0 ? (
                  <div className="space-y-4">
                    {educational_qualifications.map((qualification, index) => (
                      <div key={qualification.qualification_id} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium">{qualification.education_type}</h4>
                        <p className="text-sm text-gray-600">{qualification.field_of_study}</p>
                        <p className="text-sm text-gray-500">
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
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Briefcase className="h-5 w-5 text-gray-600" />
                  Previous Employment
                </h3>
                {previous_employment_history.length > 0 ? (
                  <div className="space-y-4">
                    {previous_employment_history.map((employment, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium">{employment.position}</h4>
                        <p className="text-sm text-gray-600">{employment.company_name}</p>
                        <p className="text-sm text-gray-500">
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
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Award className="h-5 w-5 text-gray-600" />
                    Awards & Recognition
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {awards.map((award, index) => (
                      <div key={index} className="border-l-4 border-yellow-500 pl-4">
                        <h4 className="font-medium">{award.award}</h4>
                        <p className="text-sm text-gray-600">{award.organization}</p>
                        <p className="text-sm text-gray-500">{award.year}</p>
                        {award.description && <p className="text-sm text-gray-600 mt-1">{award.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Public Profile */}
              {public_profile.public_profile && (
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <User className="h-5 w-5 text-gray-600" />
                    Public Profile
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{public_profile.public_profile}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          {/* <div className="border-t border-gray-200 p-6">
            <div className="flex justify-end gap-3">
              <CustomButton type="button" variant="outlined" onClick={onClose}>
                Close
              </CustomButton>
              {onEdit && (
                <CustomButton type="button" variant="solid" icon={<Edit className="h-4 w-4" />} onClick={onEdit}>
                  Edit Employee
                </CustomButton>
              )}
            </div>
          </div> */}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
