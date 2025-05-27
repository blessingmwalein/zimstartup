"use client"

import { Edit, Building2, Calendar, Users, MapPin, Globe, Mail, Phone } from "lucide-react"

interface CompanyDetailsSectionProps {
  companyData: any
  contactData: any
  onEdit: () => void
}

export default function CompanyDetailsSection({ companyData, contactData, onEdit }: CompanyDetailsSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Company Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Company Information</h3>
          <button onClick={onEdit} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <Edit className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Company Name</p>
              <p className="font-medium">{companyData.company_name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Start Date</p>
              <p className="font-medium">{new Date(companyData.company_start_date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Employees</p>
              <p className="font-medium">{companyData.employees}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="font-medium">{companyData.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Website</p>
              <a href={companyData.website} className="font-medium text-[#001f3f] hover:underline">
                {companyData.website}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">National ID</p>
              <p className="font-medium">{companyData.national_id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <button onClick={onEdit} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <Edit className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="font-medium">{contactData.email || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Work Email</p>
              <p className="font-medium">{contactData.work_email || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone 1</p>
              <p className="font-medium">{contactData.phone1 || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone 2</p>
              <p className="font-medium">{contactData.phone2 || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone 3</p>
              <p className="font-medium">{contactData.phone3 || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Address Information</h3>
          <button onClick={onEdit} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <Edit className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="font-medium">{contactData.address || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">City</p>
              <p className="font-medium">{contactData.address_city || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Region</p>
              <p className="font-medium">{contactData.region || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Country</p>
              <p className="font-medium">{contactData.country || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">State Code</p>
              <p className="font-medium">{contactData.state_code || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
