"use client"

import { User, Mail, Calendar, Flag, Briefcase, Eye } from "lucide-react"

interface DirectorCardProps {
  director: any
  onEmployeeView: (employeeId: number) => void
}

export default function DirectorCard({ director, onEmployeeView }: DirectorCardProps) {
  const handleViewProfile = () => {
    // Check if employee_id exists before calling the function
    console.log(director)
    if (director?.employee_id) {
      onEmployeeView(director.employee_id)
    } else {
      console.warn("Employee ID not found for director:", director)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          {director.employee_image ? (
            <img
              src={director.employee_image || "/placeholder.svg"}
              alt={`${director.first_name} ${director.last_name}`}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="h-8 w-8 text-gray-500" />
          )}
        </div>
        <div>
          <h4 className="font-semibold">
            {director.title} {director.first_name} {director.last_name}
          </h4>
          <p className="text-sm text-gray-500">{director.position || "Director"}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>{director.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>DOB: {new Date(director.dob).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Flag className="h-4 w-4 text-gray-500" />
          <span>{director.nationality}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="h-4 w-4 text-gray-500" />
          <span>{director.marital_status}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleViewProfile}
          className="flex items-center gap-1 text-sm font-medium text-[#001f3f] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          // disabled={!director?.employee_id}
        >
          <Eye className="h-3 w-3" />
          View Profile
        </button>
      </div>
    </div>
  )
}
