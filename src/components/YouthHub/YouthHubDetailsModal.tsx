"use client"

import React from "react"
import { YouthHubResponse } from "../../../state/models/youthHub"
import { X, Calendar, MapPin, Users, Briefcase, Clock, Mail, Phone } from "lucide-react"
import CustomButton from "@/components/Buttons/CustomButton"

interface YouthHubDetailsModalProps {
  youthHub: YouthHubResponse | null
  onClose: () => void
}

const YouthHubDetailsModal: React.FC<YouthHubDetailsModalProps> = ({ youthHub, onClose }) => {
  if (!youthHub) return null

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "OPEN":
        return "bg-green-100 text-green-800"
      case "CLOSED":
        return "bg-red-100 text-red-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSectorIcon = (sector: string) => {
    switch (sector.toLowerCase()) {
      case "health":
        return "🏥"
      case "technology":
        return "💻"
      case "education":
        return "📚"
      case "finance":
        return "💰"
      case "agriculture":
        return "🌾"
      case "environment":
        return "🌱"
      default:
        return "🚀"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-boxdark-2 dark:bg-boxdark">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#052941] to-[#041f30] p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-3xl backdrop-blur-sm">
                {getSectorIcon(youthHub.sector)}
              </div>
              <div>
                <h2 className="text-2xl font-bold\">
                  {youthHub.project_name}
                </h2>
                <div className="mt-1 flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      youthHub.status
                    )}`}
                  >
                    {youthHub.status}
                  </span>
                  <span className="text-sm text-gray-200\">• {youthHub.sector}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white\"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Project Details */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  Project Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-3 h-4 w-4 text-bodydark2" />
                    <span className="font-medium text-black dark:text-white">Type:</span>
                    <span className="ml-2 text-bodydark2">{youthHub.type_of_request}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-3 h-4 w-4 text-bodydark2" />
                    <span className="font-medium text-black dark:text-white">Location:</span>
                    <span className="ml-2 text-bodydark2">{youthHub.location}, {youthHub.region}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Calendar className="mr-3 h-4 w-4 text-bodydark2" />
                    <span className="font-medium text-black dark:text-white">Proposed Launch:</span>
                    <span className="ml-2 text-bodydark2">{formatDate(youthHub.proposed_launch_date)}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Clock className="mr-3 h-4 w-4 text-bodydark2" />
                    <span className="font-medium text-black dark:text-white">Created:</span>
                    <span className="ml-2 text-bodydark2">{formatDate(youthHub.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="mr-3 h-4 w-4 text-bodydark2" />
                    <span className="font-medium text-black dark:text-white">Email:</span>
                    <span className="ml-2 text-bodydark2">{youthHub.contact_email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users className="mr-3 h-4 w-4 text-bodydark2" />
                    <span className="font-medium text-black dark:text-white">National ID:</span>
                    <span className="ml-2 text-bodydark2">{youthHub.national_id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Project Description */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  Project Description
                </h3>
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-boxdark-2">
                  <p className="text-sm text-bodydark2 leading-relaxed">
                    {youthHub.request_details}
                  </p>
                </div>
              </div>

              {/* What They're Offering */}
              {youthHub.request_offer && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                    What They're Offering
                  </h3>
                  <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                    <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                      {youthHub.request_offer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4 border-t border-gray-200 pt-6 dark:border-boxdark-2">
            <CustomButton
              type="button"
              variant="outlined"
              onClick={onClose}
            >
              Close
            </CustomButton>
            <CustomButton
              type="button"
              variant="solid"
              onClick={() => {
                // Open email in new tab/window
                window.open(
                  `mailto:${youthHub.contact_email}?subject=Interest in ${youthHub.project_name}`,
                  '_blank'
                )
              }}
            >
              Contact
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouthHubDetailsModal 