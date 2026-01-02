import { createAxiosInstance } from "./axios";

const api = createAxiosInstance();

// Portfolio Summary Types
export interface PortfolioTotal {
  count: number;
  amount: number;
  currency: string;
}

export interface PortfolioDiversity {
  sector: string;
  request_type: string;
  count: number;
  amount: number;
}

export interface PortfolioLiquidity {
  liquid_assets: number;
  illiquid_assets: number;
  total_investments: number;
}

export interface PortfolioSummaryResponse {
  totals: [number, number, string][];
  diversity: [string, string, number, number][];
  liquidity: [number, number, number];
}

// Companies Owned Types
export interface CompanyOwned {
  company_id: number;
  company_name: string;
  company_abbreviations: string | null;
  location: string;
  website: string;
  sector: string;
  amount_invested: number;
  currency: string;
  quantity: number;
  investment_date: string;
}

export interface CompaniesOwnedResponse {
  companies_owned: [number, string, string | null, string, string, string, number, string, number, string][];
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
  start_date: string;
  project_stage: string;
  amount_invested: number;
  currency: string;
  quantity: number;
  estimated_completion_cost: number;
  current_completion_cost: number;
  investment_date: string;
}

export interface ProjectFinancingResponse {
  project_investments: [number, string, string, string, string, string, string, number, string, number, number, number, string][];
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
