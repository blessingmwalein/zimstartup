"use client"

import { useState } from "react"
import { Bell, Calendar, ExternalLink, Eye, Plus } from "lucide-react"
import CustomButton from "./ui/custom-button"

interface CompanyUpdatesSectionProps {
  updates: any[]
  onAddUpdate: () => void
}

export default function CompanyUpdatesSection({ updates, onAddUpdate }: CompanyUpdatesSectionProps) {
  const [expandedUpdateId, setExpandedUpdateId] = useState<number | null>(null)

  const toggleExpand = (updateId: number) => {
    if (expandedUpdateId === updateId) {
      setExpandedUpdateId(null)
    } else {
      setExpandedUpdateId(updateId)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Company Updates</h3>
        <CustomButton type="button" variant="solid" icon={<Plus className="h-4 w-4" />} onClick={onAddUpdate}>
          Add Update
        </CustomButton>
      </div>

      {updates.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
          <div className="text-center text-gray-500">
            <Bell className="mx-auto h-10 w-10" />
            <p className="mt-2">No updates available</p>
            <button onClick={onAddUpdate} className="mt-2 text-[#001f3f] hover:underline">
              Add your first update
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {updates.map((update, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-purple-100 p-2 text-purple-700">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{update.headline}</h4>
                    <p className="text-sm text-gray-500">{update.update_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(update.created_at).toLocaleDateString()}
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      update.is_published ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {update.is_published ? "Published" : "Draft"}
                  </span>
                  <button
                    onClick={() => toggleExpand(update.update_id)}
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-200"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {expandedUpdateId === update.update_id && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="mb-2 font-medium">Summary:</p>
                  <p className="mb-4 text-gray-700">{update.summary}</p>

                  <p className="mb-2 font-medium">Content:</p>
                  <p className="mb-4 text-gray-700">{update.update_content}</p>

                  {update.url && (
                    <a
                      href={update.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-[#001f3f] hover:underline"
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      View External Link
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
