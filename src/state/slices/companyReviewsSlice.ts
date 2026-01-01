import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CompanyReview,
  CompanyReviewsResponse,
  RatingSummary,
} from "../services/companyReviewsService";

interface CompanyReviewsState {
  reviews: CompanyReview[];
  ratingSummary: RatingSummary | null;
  companyName: string;
  companyId: number | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  limit: number;
}

const initialState: CompanyReviewsState = {
  reviews: [],
  ratingSummary: null,
  companyName: "",
  companyId: null,
  loading: false,
  error: null,
  currentPage: 1,
  limit: 10,
};

const companyReviewsSlice = createSlice({
  name: "companyReviews",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCompanyReviews: (
      state,
      action: PayloadAction<CompanyReviewsResponse>
    ) => {
      state.reviews = action.payload.comments;
      state.ratingSummary = action.payload.rating_summary;
      state.companyName = action.payload.company_name;
      state.companyId = action.payload.company_id;
      state.loading = false;
      state.error = null;
    },
    setRatingSummary: (state, action: PayloadAction<RatingSummary>) => {
      state.ratingSummary = action.payload;
    },
    addReview: (state, action: PayloadAction<CompanyReview>) => {
      state.reviews.unshift(action.payload);
      // Update rating summary
      if (state.ratingSummary) {
        const rating = action.payload.rating.toString() as keyof typeof state.ratingSummary.rating_distribution;
        state.ratingSummary.rating_distribution[rating] += 1;
        state.ratingSummary.total_reviews += 1;
        // Recalculate average
        const total = Object.entries(state.ratingSummary.rating_distribution).reduce(
          (sum, [stars, count]) => sum + parseInt(stars) * count,
          0
        );
        state.ratingSummary.average_rating =
          total / state.ratingSummary.total_reviews;
      }
    },
    updateReview: (state, action: PayloadAction<CompanyReview>) => {
      const index = state.reviews.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        const oldRating = state.reviews[index].rating;
        state.reviews[index] = action.payload;
        
        // Update rating summary
        if (state.ratingSummary && oldRating !== action.payload.rating) {
          const oldKey = oldRating.toString() as keyof typeof state.ratingSummary.rating_distribution;
          const newKey = action.payload.rating.toString() as keyof typeof state.ratingSummary.rating_distribution;
          
          state.ratingSummary.rating_distribution[oldKey] -= 1;
          state.ratingSummary.rating_distribution[newKey] += 1;
          
          // Recalculate average
          const total = Object.entries(state.ratingSummary.rating_distribution).reduce(
            (sum, [stars, count]) => sum + parseInt(stars) * count,
            0
          );
          state.ratingSummary.average_rating =
            total / state.ratingSummary.total_reviews;
        }
      }
    },
    deleteReview: (state, action: PayloadAction<number>) => {
      const review = state.reviews.find((r) => r.id === action.payload);
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
      
      // Update rating summary
      if (state.ratingSummary && review) {
        const ratingKey = review.rating.toString() as keyof typeof state.ratingSummary.rating_distribution;
        state.ratingSummary.rating_distribution[ratingKey] -= 1;
        state.ratingSummary.total_reviews -= 1;
        
        // Recalculate average
        if (state.ratingSummary.total_reviews > 0) {
          const total = Object.entries(state.ratingSummary.rating_distribution).reduce(
            (sum, [stars, count]) => sum + parseInt(stars) * count,
            0
          );
          state.ratingSummary.average_rating =
            total / state.ratingSummary.total_reviews;
        } else {
          state.ratingSummary.average_rating = 0;
        }
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearReviews: (state) => {
      state.reviews = [];
      state.ratingSummary = null;
      state.companyName = "";
      state.companyId = null;
      state.currentPage = 1;
    },
  },
});

export const {
  setLoading,
  setError,
  setCompanyReviews,
  setRatingSummary,
  addReview,
  updateReview,
  deleteReview,
  setCurrentPage,
  clearReviews,
} = companyReviewsSlice.actions;

export default companyReviewsSlice.reducer;
