import type React from "react"

const CompanyViewSkeleton: React.FC = () => {
  return (
    <div className="mx-auto max-w-full p-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="relative mb-6 rounded-3xl bg-gradient-to-r from-gray-300 to-gray-400 p-6 h-40">
        <div className="flex gap-4 pr-14">
          <div className="h-16 w-16 flex-shrink-0 rounded-2xl bg-white/30"></div>
          <div className="flex-1 min-w-0 space-y-3">
            <div className="h-8 w-64 bg-white/30 rounded"></div>
            <div className="h-4 w-96 bg-white/30 rounded"></div>
            <div className="flex gap-2">
              <div className="h-6 w-24 bg-white/30 rounded-full"></div>
              <div className="h-6 w-24 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="rounded-3xl border border-gray-200 bg-white">
        {/* Tab Navigation Skeleton */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2 rounded-2xl bg-gray-100 px-3 py-4">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content Skeleton */}
        <div className="border-t border-gray-200 p-6">
          {/* Dashboard Skeleton - Company Info Card */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <div className="h-6 w-48 bg-gray-200 rounded"></div>
                  <div className="mt-2 h-4 w-64 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              </div>

              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-11 w-11 flex-shrink-0 rounded-2xl bg-gray-200"></div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info Card Skeleton */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <div className="h-6 w-48 bg-gray-200 rounded"></div>
                  <div className="mt-2 h-4 w-64 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              </div>

              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-11 w-11 flex-shrink-0 rounded-2xl bg-gray-200"></div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyViewSkeleton
