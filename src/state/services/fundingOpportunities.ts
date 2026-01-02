import { createAxiosInstance } from "./axios";

const api = createAxiosInstance();

export interface FundingOpportunity {
  id: number;
  agency_name: string;
  funding_or_competition: string;
  closing_date: string;
  sector: string;
  location: string;
  description: string;
  eligibility: string;
  application_link: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateFundingOpportunityRequest {
  agency_name: string;
  funding_or_competition: string;
  closing_date: string;
  sector: string;
  location: string;
  description: string;
  eligibility: string;
  application_link: string;
  is_active: boolean;
}

export interface UpdateFundingOpportunityRequest {
  agency_name: string;
  funding_or_competition: string;
  closing_date: string;
  sector: string;
  location: string;
  description: string;
  eligibility: string;
  application_link: string;
  is_active: boolean;
}

// Get all funding opportunities
export const getAllFundingOpportunities = async (
  activeOnly: boolean = false,
  sector?: string,
  location?: string
): Promise<FundingOpportunity[]> => {
  let url = `funding-opportunities/?active_only=${activeOnly}`;
  if (sector) url += `&sector=${encodeURIComponent(sector)}`;
  if (location) url += `&location=${encodeURIComponent(location)}`;
  const response = await api.get<FundingOpportunity[]>(url);
  return response.data;
};

// Create funding opportunity
export const createFundingOpportunity = async (data: CreateFundingOpportunityRequest): Promise<FundingOpportunity> => {
  const response = await api.post<FundingOpportunity>(`funding-opportunities/`, data);
  return response.data;
};

// Update funding opportunity
export const updateFundingOpportunity = async (id: number, data: UpdateFundingOpportunityRequest): Promise<FundingOpportunity> => {
  const response = await api.put<FundingOpportunity>(`funding-opportunities/${id}`, data);
  return response.data;
};

// Delete funding opportunity
export const deleteFundingOpportunity = async (id: number): Promise<void> => {
  await api.delete(`funding-opportunities/${id}`);
};
