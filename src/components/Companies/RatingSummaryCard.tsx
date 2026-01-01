"use client";

import { RatingSummary } from "@/state/services/companyReviewsService";
import { Star } from "lucide-react";
import StarRating from "./StarRating";

interface RatingSummaryCardProps {
  ratingSummary: RatingSummary;
}

export default function RatingSummaryCard({
  ratingSummary,
}: RatingSummaryCardProps) {
  const { average_rating, total_reviews, rating_distribution } = ratingSummary;

  const getBarWidth = (count: number) => {
    if (total_reviews === 0) return 0;
    return (count / total_reviews) * 100;
  };

  return (
    <div className="mb-6 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <div className="text-5xl font-bold text-gray-900">
              {average_rating.toFixed(1)}
            </div>
            <div>
              <StarRating rating={average_rating} size="md" showNumber={false} />
              <p className="mt-1 text-sm text-gray-600">
                Based on {total_reviews} {total_reviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = rating_distribution[stars.toString() as keyof typeof rating_distribution];
              return (
                <div key={stars} className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">{stars}</span>
                  <Star className="h-3 w-3 fill-current text-yellow-400" />
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-500"
                      style={{ width: `${getBarWidth(count)}%` }}
                    />
                  </div>
                  <span className="w-8 text-xs text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
