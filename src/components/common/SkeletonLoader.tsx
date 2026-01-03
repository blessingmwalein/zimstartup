import React from "react";

interface SkeletonLoaderProps {
  variant?: "card" | "sector-card" | "company-card" | "competition-card" | "text";
  count?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = "card",
  count = 1,
  className = "",
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "sector-card":
        return (
          <div className={`bg-white rounded-xl shadow-md overflow-hidden h-full ${className}`}>
            <div className="p-6 flex flex-col items-center animate-pulse">
              <div className="bg-gray-200 p-4 rounded-full mb-4 h-20 w-20"></div>
              <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>
        );

      case "company-card":
        return (
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="p-8">
              <div className="flex items-start space-x-6 animate-pulse">
                <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-gray-200"></div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="h-7 w-64 rounded bg-gray-200"></div>
                    <div className="h-4 w-32 rounded bg-gray-200"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 w-28 rounded bg-gray-200"></div>
                    <div className="h-4 w-24 rounded bg-gray-200"></div>
                    <div className="h-4 w-32 rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex-shrink-0 space-y-3 text-right">
                  <div className="h-6 w-32 rounded bg-gray-200"></div>
                  <div className="h-8 w-24 rounded bg-gray-200"></div>
                  <div className="h-10 w-32 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "competition-card":
        return (
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="relative h-48 w-full animate-pulse">
              <div className="h-full w-full bg-gray-200"></div>
              <div className="absolute right-4 top-4 h-6 w-16 rounded-full bg-gray-300"></div>
              <div className="absolute bottom-4 left-4 space-y-2">
                <div className="h-6 w-48 rounded bg-gray-300"></div>
                <div className="h-4 w-32 rounded bg-gray-300"></div>
              </div>
            </div>
            <div className="p-6 animate-pulse">
              <div className="mb-4 space-y-2">
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              </div>
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-4 w-4 rounded bg-gray-200"></div>
                <div className="h-4 w-48 rounded bg-gray-200"></div>
              </div>
              <div className="mb-4 flex items-center">
                <div className="mr-2 h-4 w-4 rounded bg-gray-200"></div>
                <div className="h-4 w-32 rounded bg-gray-200"></div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-10 w-32 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        );

      case "text":
        return <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`}></div>;

      default:
        return (
          <div className={`bg-white rounded-lg shadow-md p-4 animate-pulse ${className}`}>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </>
  );
};

export default SkeletonLoader;
