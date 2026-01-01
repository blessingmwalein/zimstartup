"use client";

import { useState } from "react";
import { Edit2, Trash2, ThumbsUp } from "lucide-react";
import { CompanyReview } from "@/state/services/companyReviewsService";
import StarRating from "./StarRating";
import CustomButton from "../Buttons/CustomButton";

interface CommentCardProps {
  review: CompanyReview;
  currentUsername: string | null;
  onEdit: (review: CompanyReview) => void;
  onDelete: (reviewId: number) => void;
}

export default function CommentCard({
  review,
  currentUsername,
  onEdit,
  onDelete,
}: CommentCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const isOwner = currentUsername && review.username === currentUsername;
  const formattedDate = new Date(review.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDelete = () => {
    onDelete(review.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {review.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                {review.username}
                {isOwner && (
                  <span className="ml-2 text-xs text-blue-600">(You)</span>
                )}
              </h4>
              <p className="text-xs text-gray-500">
                {formattedDate}
                {review.is_edited && (
                  <span className="ml-2 italic">(edited)</span>
                )}
              </p>
            </div>
          </div>
          <StarRating rating={review.rating} size="sm" showNumber={false} />
        </div>
        
        {isOwner && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(review)}
              className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
              title="Edit comment"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
              title="Delete comment"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <p className="mb-4 leading-relaxed text-gray-700">
        {review.comment_text}
      </p>

      {showDeleteConfirm && (
        <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
          <p className="mb-3 text-sm text-red-800">
            Are you sure you want to delete this review? This action cannot be undone.
          </p>
          <div className="flex space-x-2">
            <CustomButton
              type="button"
              variant="solid"
              onClick={handleDelete}
              className="!bg-red-600 hover:!bg-red-700"
            >
              Delete
            </CustomButton>
            <CustomButton
              type="button"
              variant="outlined"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
