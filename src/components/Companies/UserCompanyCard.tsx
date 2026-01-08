"use client"

import type React from "react"
import { useState } from "react"
import { Menu } from "@headlessui/react"
import { Edit, Trash2, MoreVertical, Building2, MapPin, Globe, AlertTriangle, ExternalLink, Eye } from "lucide-react"
import { Company } from "../../../state/models/company"
import CustomButton from "../Buttons/CustomButton"
import { useRouter } from "next/navigation"

interface CompanyProps {
  company: Company
  viewMode?: "grid" | "list"
}

const UserCompanyCard: React.FC<CompanyProps> = ({ company, viewMode = "grid" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  // Function to determine status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING CHECK":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-200"
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Function to determine grade badge color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "RISKY":
        return "bg-red-50 text-red-700 border-red-200"
      case "MEDIUM":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "SAFE":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  if (viewMode === "list") {
    return (
      <div
        className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-4 p-4">
          {/* Logo Section */}
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            {company.company_logo ? (
              <img
                src={company.company_logo}
                alt={`${company.company_name} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Company Details */}
          <div className="flex flex-1 items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold text-gray-900 truncate">{company.company_name}</h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {company.company_abbreviations}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span className="truncate">{company.location}</span>
                </div>
                {company.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-gray-400" />
                    <a
                      href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate flex items-center gap-1"
                    >
                      <span className="truncate max-w-[200px]">{company.website.replace(/^https?:\/\/(www\.)?/, "")}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Stats and Status */}
            <div className="flex items-center gap-6">
              {/* Completeness Score */}
              {company.completeness_score !== null && (
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-500 mb-1">Completeness</div>
                  <div className="text-lg font-bold text-gray-900">{company.completeness_score}%</div>
                </div>
              )}

              {/* Status & Grade */}
              <div className="flex flex-col gap-2 items-end">
                <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${getStatusColor(company.status)}`}>
                  {company.status}
                </span>
                {company.grade && (
                  <span className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold ${getGradeColor(company.grade)}`}>
                    <AlertTriangle className="h-3 w-3" />
                    {company.grade}
                  </span>
                )}
              </div>

              {/* Action Buttons - Circular Icons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(`/profile/companies/view-company/${company.company_id}`)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
                  title="View Company"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 shadow-sm transition-all hover:bg-gray-200 hover:shadow-md"
                  title="Edit Company"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 shadow-sm transition-all hover:bg-red-100 hover:shadow-md"
                  title="Delete Company"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with Logo and Actions */}
      <div className="relative flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        {/* Logo */}
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200">
          {company.company_logo ? (
            <img
              src={company.company_logo}
              alt={`${company.company_name} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Building2 className="h-7 w-7 text-gray-400" />
            </div>
          )}
        </div>

        {/* Company Name and Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 truncate leading-tight">{company.company_name}</h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">{company.company_abbreviations}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-600">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="truncate">{company.location}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Status and Grade Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${getStatusColor(company.status)}`}>
            {company.status}
          </span>
          {company.grade && (
            <span className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold ${getGradeColor(company.grade)}`}>
              <AlertTriangle className="h-3 w-3" />
              {company.grade}
            </span>
          )}
        </div>

        {/* Completeness Score */}
        {company.completeness_score !== null && (
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-gray-600">Completeness</span>
              <span className="font-bold text-gray-900">{company.completeness_score}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full transition-all duration-500 ${
                  company.completeness_score >= 70
                    ? "bg-green-500"
                    : company.completeness_score >= 40
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${company.completeness_score}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Website */}
        {company.website && (
          <div className="flex items-center gap-1.5 text-xs">
            <Globe className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
            <a
              href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate flex items-center gap-1 flex-1"
            >
              <span className="truncate">{company.website.replace(/^https?:\/\/(www\.)?/, "")}</span>
              <ExternalLink className="h-3 w-3 flex-shrink-0" />
            </a>
          </div>
        )}
      </div>

      {/* Footer Section - Action Buttons */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.push(`/profile/companies/view-company/${company.company_id}`)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md hover:scale-110"
            title="View Company"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 shadow-sm transition-all hover:bg-gray-200 hover:shadow-md hover:scale-110"
            title="Edit Company"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 shadow-sm transition-all hover:bg-red-100 hover:shadow-md hover:scale-110"
            title="Delete Company"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCompanyCard
