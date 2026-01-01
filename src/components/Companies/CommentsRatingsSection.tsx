"use client";

import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageSquare, Send } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { AppDispatch, RootState } from "@/state/store";
import {
  fetchCompanyReviews,
  createReview,
  updateReview,
  deleteReview,
} from "@/state/thunks/companyReviewsThunks";
import { CompanyReview } from "@/state/services/companyReviewsService";
import CustomButton from "../Buttons/CustomButton";
import CommentCard from "./CommentCard";
import RatingSummaryCard from "./RatingSummaryCard";
import StarRating from "./StarRating";

interface CommentsRatingsSectionProps {
  companyId: number;
}

export default function CommentsRatingsSection({
  companyId,
}: CommentsRatingsSectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, ratingSummary, loading } = useSelector(
    (state: RootState) => state.companyReviews
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<CompanyReview | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCompanyReviews(companyId));
  }, [dispatch, companyId]);

  const handleSubmitReview = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (editingReview) {
        // Update existing review
        const result = await dispatch(
          updateReview(
            editingReview.id,
            {
              comment_text: newComment,
              rating: newRating,
            }
          )
        );

        if (result.success) {
          setIsReviewModalOpen(false);
          setEditingReview(null);
          setNewComment("");
          setNewRating(5);
        }
      } else {
        // Create new review
        const result = await dispatch(
          createReview({
            company_id: companyId,
            comment_text: newComment,
            rating: newRating,
          })
        );

        if (result.success) {
          setIsReviewModalOpen(false);
          setNewComment("");
          setNewRating(5);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = (review: CompanyReview) => {
    setEditingReview(review);
    setNewComment(review.comment_text);
    setNewRating(review.rating);
    setIsReviewModalOpen(true);
  };

  const handleDeleteReview = async (reviewId: number) => {
    await dispatch(deleteReview(reviewId));
  };

  const openNewReviewModal = () => {
    setEditingReview(null);
    setNewComment("");
    setNewRating(5);
    setIsReviewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Comments & Ratings
          </h2>
          {user && (
            <CustomButton
              type="button"
              variant="solid"
              onClick={openNewReviewModal}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Add Review
            </CustomButton>
          )}
        </div>

        {/* Rating Summary */}
        {ratingSummary && <RatingSummaryCard ratingSummary={ratingSummary} />}

        {/* Comments List */}
        {loading && reviews.length === 0 ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg border border-gray-200 p-6"
              >
                <div className="mb-4 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 rounded bg-gray-300" />
                    <div className="h-3 w-24 rounded bg-gray-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-300" />
                  <div className="h-4 w-3/4 rounded bg-gray-300" />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <CommentCard
                key={review.id}
                review={review}
                currentUsername={user?.email || null}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
            <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <Transition appear show={isReviewModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setIsReviewModalOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-white"
                    >
                      {editingReview ? "Edit Your Review" : "Add Your Review"}
                    </Dialog.Title>
                    <p className="mt-1 text-blue-100">
                      {editingReview
                        ? "Update your thoughts about this company"
                        : "Share your experience with this company"}
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Rating
                        </label>
                        <div className="flex items-center space-x-2">
                          <StarRating
                            rating={newRating}
                            size="lg"
                            showNumber={false}
                            interactive
                            onRatingChange={setNewRating}
                          />
                          <span className="text-lg font-semibold text-gray-900">
                            {newRating} / 5
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Your Review
                        </label>
                        <textarea
                          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          rows={4}
                          placeholder="Share your experience with this company..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 px-6 pb-6">
                    <CustomButton
                      type="button"
                      variant="solid"
                      fullWidth
                      onClick={handleSubmitReview}
                      disabled={!newComment.trim() || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {editingReview ? "Updating..." : "Submitting..."}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {editingReview ? "Update Review" : "Submit Review"}
                        </>
                      )}
                    </CustomButton>
                    <CustomButton
                      type="button"
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        setIsReviewModalOpen(false);
                        setEditingReview(null);
                        setNewComment("");
                        setNewRating(5);
                      }}
                    >
                      Cancel
                    </CustomButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
