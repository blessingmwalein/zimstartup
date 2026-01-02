import { createAxiosInstance } from "./axios";

const api = createAxiosInstance();

// Portfolio Summary Types
export interface PortfolioSummaryResponse {
  totals: {
    total_investments: number;
    total_value: number;
    currency: string;
  }[];
  diversity: {
    sector: string;
    investment_type: string;
    count: number;
    total_value: number;
  }[];
  liquidity: {
    tradable_count: number;
    tradable_value: number;
    total_count: number;
  };
}

// Companies Owned Types
export interface CompanyOwned {
  company_id: number;
  company_name: string;
  company_short_description: string | null;
  location: string;
  website: string;
  sector: string;
  amount_invested: number;
  currency: string;
  acquisition_percentage: number;
  investment_date: string;
}

export interface CompaniesOwnedResponse {
  companies_owned: CompanyOwned[];
}

// Equity Investments Types
export interface EquityInvestment {
  investment_id: number;
  company_id: number;
  company_name: string;
  equity_percentage: number;
  amount_invested: number;
  currency: string;
  investment_date: string;
  current_valuation: number;
}

export interface EquityInvestmentsResponse {
  equity_investments: any[];
}

// Project Financing Types
export interface ProjectInvestment {
  company_id: number;
  company_name: string;
  project_name: string;
  project_location: string;
  project_sector: string;
  expected_completion_date: string;
  current_project_stage: string;
  amount_invested: number;
  currency: string;
  project_share: number;
  projected_revenue: number;
  projected_profit: number;
  investment_date: string;
}

export interface ProjectFinancingResponse {
  project_investments: ProjectInvestment[];
}

// Revenue-Based Financing Types
export interface RevenuePayment {
  payment_id: number;
  payment_date: string;
  amount: number;
  status: string;
}

export interface RevenueInvestment {
  investment_id: number;
  company_id: number;
  company_name: string;
  repayment_terms: string;
  revenue_share_percentage: number;
  amount_invested: number;
  currency: string;
  investment_date: string;
  description: string;
  payments: RevenuePayment[];
}

export interface RevenueBasedResponse {
  revenue_investments: RevenueInvestment[];
}

// Upcoming Payments Types
export interface UpcomingPayment {
  payment_id: number;
  company_id: number;
  company_name: string;
  investment_type: string;
  expected_date: string;
  expected_amount: number;
  currency: string;
  status: string;
}

export interface UpcomingPaymentsResponse {
  upcoming_payments: any[];
}

// API Functions
export const getPortfolioSummary = async (
  national_id: string
): Promise<PortfolioSummaryResponse> => {
  const response = await api.get<PortfolioSummaryResponse>(
    `/portfolio/summary/${national_id}`
  );
  return response.data;
};

export const getCompaniesOwned = async (
  national_id: string
): Promise<CompaniesOwnedResponse> => {
  const response = await api.get<CompaniesOwnedResponse>(
    `/portfolio/companies-owned/${national_id}`
  );
  return response.data;
};

export const getEquityInvestments = async (
  national_id: string
): Promise<EquityInvestmentsResponse> => {
  const response = await api.get<EquityInvestmentsResponse>(
    `/portfolio/equity-investments/${national_id}`
  );
  return response.data;
};

export const getProjectFinancing = async (
  national_id: string
): Promise<ProjectFinancingResponse> => {
  const response = await api.get<ProjectFinancingResponse>(
    `/portfolio/project-financing/${national_id}`
  );
  return response.data;
};

export const getRevenueBasedInvestments = async (
  national_id: string
): Promise<RevenueBasedResponse> => {
  const response = await api.get<RevenueBasedResponse>(
    `/portfolio/revenue-based/${national_id}`
  );
  return response.data;
};

export const getUpcomingPayments = async (
  national_id: string
): Promise<UpcomingPaymentsResponse> => {
  const response = await api.get<UpcomingPaymentsResponse>(
    `/portfolio/upcoming-payments/${national_id}`
  );
  return response.data;
};
