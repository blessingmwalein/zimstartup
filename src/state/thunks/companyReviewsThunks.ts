import { AppDispatch } from "../store";
import {
  getCompanyReviews as getCompanyReviewsService,
  getRatingSummary as getRatingSummaryService,
  createReview as createReviewService,
  updateReview as updateReviewService,
  deleteReview as deleteReviewService,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "../services/companyReviewsService";
import {
  setLoading,
  setError,
  setCompanyReviews,
  setRatingSummary,
  addReview,
  updateReview as updateReviewAction,
  deleteReview as deleteReviewAction,
} from "../slices/companyReviewsSlice";
import { toast } from "react-toastify";

export const fetchCompanyReviews =
  (companyId: number, page: number = 1, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await getCompanyReviewsService(companyId, page, limit);
      dispatch(setCompanyReviews(data));
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch reviews";
      dispatch(setError(message));
      toast.error(message);
    }
  };

export const fetchRatingSummary =
  (companyId: number) => async (dispatch: AppDispatch) => {
    try {
      const data = await getRatingSummaryService(companyId);
      dispatch(setRatingSummary(data));
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch rating summary";
      toast.error(message);
    }
  };

export const createReview =
  (payload: CreateReviewPayload) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const review = await createReviewService(payload);
      dispatch(addReview(review));
      toast.success("Review submitted successfully!");
      return { success: true, data: review };
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit review";
      dispatch(setError(message));
      toast.error(message);
      return { success: false, error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateReview =
  (reviewId: number, payload: UpdateReviewPayload) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const review = await updateReviewService(reviewId, payload);
      dispatch(updateReviewAction(review));
      toast.success("Review updated successfully!");
      return { success: true, data: review };
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update review";
      dispatch(setError(message));
      toast.error(message);
      return { success: false, error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteReview =
  (reviewId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await deleteReviewService(reviewId);
      dispatch(deleteReviewAction(reviewId));
      toast.success("Review deleted successfully!");
      return { success: true };
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete review";
      dispatch(setError(message));
      toast.error(message);
      return { success: false, error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };
