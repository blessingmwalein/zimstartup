import { createAxiosInstance } from "./axios";

export interface CompanyReview {
  id: number;
  company_id: number;
  national_id: string;
  username: string;
  comment_text: string;
  rating: number;
  created_at: string;
  updated_at: string | null;
  is_edited: boolean;
}

export interface RatingDistribution {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface RatingSummary {
  average_rating: number;
  total_reviews: number;
  rating_distribution: RatingDistribution;
}

export interface CompanyReviewsResponse {
  company_id: number;
  company_name: string;
  rating_summary: RatingSummary;
  comments: CompanyReview[];
}

export interface CreateReviewPayload {
  company_id: number;
  comment_text: string;
  rating: number;
}

export interface UpdateReviewPayload {
  comment_text: string;
  rating: number;
}

// Global Axios instance with the default config (including token if required)
const api = createAxiosInstance();

// Get company reviews with pagination
export const getCompanyReviews = async (
  companyId: number,
  page: number = 1,
  limit: number = 10
): Promise<CompanyReviewsResponse> => {
  const response = await api.get<CompanyReviewsResponse>(
    `company-reviews/comments/${companyId}?page=${page}&limit=${limit}`
  );
  return response.data;
};

// Get rating summary for a company
export const getRatingSummary = async (
  companyId: number
): Promise<RatingSummary> => {
  const response = await api.get<RatingSummary>(
    `company-reviews/ratings/${companyId}`
  );
  return response.data;
};

// Create a new review for a company
export const createReview = async (
  payload: CreateReviewPayload
): Promise<CompanyReview> => {
  const response = await api.post<CompanyReview>(
    `company-reviews/comments`,
    payload
  );
  return response.data;
};

// Update an existing review
export const updateReview = async (
  reviewId: number,
  payload: UpdateReviewPayload
): Promise<CompanyReview> => {
  const response = await api.put<CompanyReview>(
    `company-reviews/comments/${reviewId}`,
    payload
  );
  return response.data;
};

// Delete a review
export const deleteReview = async (reviewId: number): Promise<void> => {
  await api.delete(`company-reviews/comments/${reviewId}`);
};
