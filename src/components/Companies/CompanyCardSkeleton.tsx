import type React from "react"

interface CompanyCardSkeletonProps {
  viewMode?: "grid" | "list"
}

const CompanyCardSkeleton: React.FC<CompanyCardSkeletonProps> = ({ viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse">
        <div className="flex items-center gap-4 p-4">
          {/* Logo Skeleton */}
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-200"></div>

          {/* Company Details Skeleton */}
          <div className="flex flex-1 items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-5 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded-md"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
              </div>

              {/* Status & Grade Skeleton */}
              <div className="flex flex-col gap-2 items-end">
                <div className="h-6 w-24 bg-gray-200 rounded-lg"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 bg-gray-200 rounded-full"></div>
                <div className="h-9 w-9 bg-gray-200 rounded-full"></div>
                <div className="h-9 w-9 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View Skeleton
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse">
      {/* Header Skeleton */}
      <div className="relative flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        {/* Logo Skeleton */}
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gray-200"></div>

        {/* Company Name Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
          <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Badges Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-24 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Progress Bar Skeleton */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
            <div className="h-3 w-8 bg-gray-200 rounded"></div>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full"></div>
        </div>

        {/* Website Skeleton */}
        <div className="h-3 w-full bg-gray-200 rounded"></div>
      </div>

      {/* Footer Skeleton */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCardSkeleton
