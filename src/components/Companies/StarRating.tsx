"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}

export default function StarRating({
  rating,
  size = "sm",
  showNumber = true,
  onRatingChange,
  interactive = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleStarClick = (star: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(star);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? "fill-current text-yellow-400" : "text-gray-300"
          } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
          onClick={() => handleStarClick(star)}
        />
      ))}
      {showNumber && (
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      )}
    </div>
  );
}
