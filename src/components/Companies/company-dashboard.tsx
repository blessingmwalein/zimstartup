"use client"

import { Edit, Building2, Calendar, Users, MapPin, Globe, Mail, Phone, UserPlus, User } from "lucide-react"
import CustomButton from "./ui/custom-button"
import DirectorCard from "./director-card"

interface CompanyDashboardProps {
  companyData: any
  contactData: any
  onEdit: () => void
  onAddDirector: () => void
  onEditContact: () => void
}

export default function CompanyDashboard({
  companyData,
  contactData,
  onEdit,
  onAddDirector,
  onEditContact
}: CompanyDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Company Information - Full Width */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Company Information</h3>
            <p className="mt-1 text-sm text-gray-500">Essential details about your company</p>
          </div>
          <button 
            onClick={onEdit} 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 hover:scale-110"
            title="Edit Company"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Company Name</p>
              <p className="mt-1 text-base font-normal text-gray-900">{companyData.company_name}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-green-50">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Start Date</p>
              <p className="mt-1 text-base font-normal text-gray-900">{new Date(companyData.company_start_date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-purple-50">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Employees</p>
              <p className="mt-1 text-base font-normal text-gray-900">{companyData.employees}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-50">
              <MapPin className="h-5 w-5 text-orange-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Location</p>
              <p className="mt-1 text-base font-normal text-gray-900">{companyData.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-50">
              <Globe className="h-5 w-5 text-cyan-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Website</p>
              <a 
                href={companyData.website} 
                className="mt-1 block text-base font-normal text-blue-600 hover:underline truncate"
                target="_blank"
                rel="noopener noreferrer"
              >
                {companyData.website}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-50">
              <Building2 className="h-5 w-5 text-gray-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">National ID</p>
              <p className="mt-1 text-base font-normal text-gray-900">{companyData.national_id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information - Full Width */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
            <p className="mt-1 text-sm text-gray-500">Communication and address details</p>
          </div>
          <button 
            onClick={onEditContact} 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 hover:scale-110"
            title="Edit Contact"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Email</p>
              <p className="mt-1 text-base font-normal text-gray-900 truncate">{contactData.email || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-50">
              <Mail className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Work Email</p>
              <p className="mt-1 text-base font-normal text-gray-900 truncate">{contactData.work_email || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-green-50">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Phone</p>
              <p className="mt-1 text-base font-normal text-gray-900">{contactData.phone1 || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-50">
              <MapPin className="h-5 w-5 text-orange-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Address</p>
              <p className="mt-1 text-base font-normal text-gray-900">{contactData.address || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-purple-50">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">City</p>
              <p className="mt-1 text-base font-normal text-gray-900">{contactData.address_city || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-50">
              <MapPin className="h-5 w-5 text-cyan-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Country</p>
              <p className="mt-1 text-base font-normal text-gray-900">{contactData.country || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Description */}

    </div>
  )
}
