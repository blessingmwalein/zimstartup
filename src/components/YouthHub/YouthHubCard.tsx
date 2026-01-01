"use client"

import React from "react"
import { YouthHubResponse } from "../../../state/models/youthHub"
import { Calendar, MapPin, Users, Briefcase, Clock } from "lucide-react"
import CustomButton from "@/components/Buttons/CustomButton"

interface YouthHubCardProps {
  youthHub: YouthHubResponse
  onViewDetails: (youthHub: YouthHubResponse) => void
}

const YouthHubCard: React.FC<YouthHubCardProps> = ({ youthHub, onViewDetails }) => {
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
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#052941] hover:shadow-lg dark:bg-boxdark">
      {/* Card Header */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#052941] to-[#041f30]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl">{getSectorIcon(youthHub.sector)}</div>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getStatusColor(
              youthHub.status
            )}`}
          >
            {youthHub.status}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
            {youthHub.project_name}
          </h3>
          <p className="text-sm text-bodydark2 line-clamp-2">
            {youthHub.request_details}
          </p>
        </div>

        {/* Project Details */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-sm text-bodydark2">
            <Briefcase className="mr-2 h-4 w-4" />
            <span className="font-medium">Type:</span>
            <span className="ml-1">{youthHub.type_of_request}</span>
          </div>
          
          <div className="flex items-center text-sm text-bodydark2">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{youthHub.location}, {youthHub.region}</span>
          </div>

          <div className="flex items-center text-sm text-bodydark2">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Launch: {formatDate(youthHub.proposed_launch_date)}</span>
          </div>

          <div className="flex items-center text-sm text-bodydark2">
            <Clock className="mr-2 h-4 w-4" />
            <span>Created: {formatDate(youthHub.created_at)}</span>
          </div>
        </div>

        {/* Offer Section */}
        {youthHub.request_offer && (
          <div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-boxdark-2">
            <h4 className="mb-1 text-sm font-medium text-black dark:text-white">
              What they're offering:
            </h4>
            <p className="text-sm text-bodydark2 line-clamp-2">
              {youthHub.request_offer}
            </p>
          </div>
        )}

        {/* Action Button */}
        <CustomButton
          type="button"
          variant="solid"
          onClick={() => onViewDetails(youthHub)}
          fullWidth={true}
        >
          View Details
        </CustomButton>
      </div>
    </div>
  )
}

export default YouthHubCard 