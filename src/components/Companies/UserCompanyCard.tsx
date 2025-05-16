"use client"

import type React from "react"
import { useState } from "react"
import { Menu } from "@headlessui/react"
import { Edit, Trash2, MoreVertical, Building2, MapPin, Globe, AlertTriangle } from "lucide-react"
import { Company } from "../../../state/models/company"
import CustomButton from "../Buttons/CustomButton"

interface CompanyProps {
  company: Company
}

const UserCompanyCard: React.FC<CompanyProps> = ({ company }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Function to determine status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING CHECK":
        return "bg-yellow-100 text-yellow-800"
      case "APPROVED":
        return "bg-green-100 text-green-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Function to determine grade badge color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "RISKY":
        return "bg-red-100 text-red-800"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800"
      case "SAFE":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status Badge - Positioned at the top left */}
      <div className="absolute left-3 top-3 z-10">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(company.status)}`}
        >
          {company.status}
        </span>
      </div>

      {/* Logo Section */}
      <div className="relative h-40 w-full bg-gradient-to-r from-gray-50 to-gray-100">
        {company.company_logo ? (
          <div className="flex h-full w-full items-center justify-center p-4">
            <img
              src={company.company_logo || "/placeholder.svg"}
              alt={`${company.company_name} logo`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Building2 className="h-16 w-16 text-gray-300" />
          </div>
        )}

        {/* Action Menu */}
        <div className="absolute right-2 top-2">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm hover:bg-white hover:text-gray-900">
              <MoreVertical className="h-5 w-5" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? "bg-gray-100" : ""
                      } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? "bg-gray-100" : ""} flex w-full items-center px-4 py-2 text-sm text-red-600`}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">{company.company_name}</h3>
            <p className="text-sm text-gray-500">{company.company_abbreviations}</p>
          </div>
          {company.grade === "RISKY" && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              <AlertTriangle className="mr-1 h-3 w-3" />
              {company.grade}
            </span>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-gray-500">Completeness</span>
            <span className="font-medium">{company.completeness_score}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full ${company.completeness_score >= 70
                ? "bg-green-500"
                : company.completeness_score >= 40
                  ? "bg-yellow-500"
                  : "bg-red-500"
                }`}
              style={{ width: `${company.completeness_score}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{company.location}</span>
          </div>

          {company.website && (
            <div className="flex items-center text-sm text-gray-500">
              <Globe className="mr-2 h-4 w-4" />
              <a
                href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {company.website}
              </a>
            </div>
          )}

          {/* <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2 font-medium">ID:</span>
            <span>{company.national_id}</span>
          </div> */}
        </div>
      </div>

      {/* Footer Section */}
      {/* <div className="bg-gray-50 p-4">
        <CustomButton variant="'outline'">
          <Edit className="mr-2 h-4 w-4" />
          Manage Company
        </CustomButton>
      </div> */}
    </div>
  )
}

export default UserCompanyCard
