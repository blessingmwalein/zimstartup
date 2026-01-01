export interface Company {
  company_id: number
  status: string
  state_name: string
  sector: string
  company_abbreviations: string
  company_name: string
  company_start_date: string
  location: string
  website: string
  employees: number
  company_logo: string
  region: string
  country: string
  completeness_score: number
  grade: string
  request_type: string
  request_status: string
  requests: Array<{
    request_id: number
    currency: string
    amount?: number
    asking_price?: number
    equity_offered?: number
    funding_round?: string
    description: string
    deal_value?: string
  }>
}

export interface SectorCompaniesResponse {
  sector: string
  filters: {
    status: string | null
    location: string | null
    request_type: string
    region: string | null
    request_status: string | null
    grade: string | null
    completeness_score_range: string
  }
  total_companies: number
  companies: Company[]
}

export interface CompanySummary {
  company_details: {
    company_logo: string
    company_id: number
    company_start_date: string
    company_abbreviations: string
    company_name: string
    status: string
    request_type: string
    company_short_description: string
    state_name: string
    sector: string
  }
  company_score: {
    completeness_score: number
  }
  pie_chart_payment_summary: {
    total_required: number
    total_received: number
    remaining: number
  }
}

export interface CompanyValuations {
  company_id: number
  fund: Array<{
    investor_type: string
    investor_information: string
    investment_type: string
    date_of_funds: string
    investment_amount: number
    investment_currency: string
    company_valuation: number
    company_valuation_currency: string
    valuation_date: string
    company_id: number
  }>
  valuation: Array<{
    company_id: number
    valuation_date: string
    valuation_method: string
    valuation_amount: number
    valuation_currency: string
    financial_year: number
    financial_period: string
    current_growth_rate: number
    notes: string
  }>
}

export interface CompanyDocument {
  company_id: number
  id: number
  document_name: string
  company_doc: string
  created_at: string | null
}

export interface CompanyDocumentsResponse {
  documents: CompanyDocument[]
}

export interface CompanyDetailsResponse {
  company_data: {
    company_id: number
    status: string | null
    company_abbreviations: string
    company_name: string
    company_start_date: string
    company_short_description: string
    location: string
    website: string
    employees: number
    requests: Array<{
      id: number
      name: string
      requests: Array<{
        request_id: number
        currency: string
        asking_price?: number
        amount?: number
        description: string
        deal_value?: string
        equity_offered?: number
        funding_round?: string
      }>
    }>
  }
  company_logo: {
    company_logo: string
  }
  business_category: {
    state_name: string
  }
  company_contact_details: {
    address_city: string
    address: string
    state_code: number
    region: string
    country: string
    instagram: string
    twitter: string
    email: string | null
    work_email: string
    phone1: number
    phone2: number
    phone3: number
  }
  company_valuation: Array<{
    valuation_id: number
    valuation_date: string
    valuation_method: string
    valuation_amount: number
    valuation_currency: string
    financial_year: number
    financial_period: string
    current_growth_rate: number
    notes: string
  }>
  financial_metrics: any[]
  company_documents: any[]
  competition: {
    competition_name: string
    status: string | null
  }
  company_updates: any[]
  company_directors: any[]
  stock_market_details: {
    type_of_market: string
    listed_date: string
    listing_capital: number | null
    listing_currency: string | null
    delisted_date: string | null
    current_market_cap: number | null
    financial_year_end: string | null
    transfer_secretary: string | null
  }
  previous_funds: any[]
  auditor_review: any[]
  company_score: {
    completeness_score: number
    grade: string
    last_updated: string
  }
  company_request: {
    request_type: string
    request_status: string
  }
  company_request_details: {
    total_required_cash: string
    total_received_cash: string
    remaining_cash: string
  }
  requests: Array<{
    id: number
    name: string
    requests: Array<{
      request_id: number
      currency: string
      asking_price?: number
      amount?: number
      description: string
      deal_value?: string
      equity_offered?: number
      funding_round?: string
    }>
  }>
}

export interface FilterOptions {
  status?: string
  location?: string
  request_type?: string
  region?: string
  request_status?: string
  grade?: string
  min_completeness?: number
  max_completeness?: number
}

export interface InvestmentRequest {
  company_id: number
  investment_amount: number
  investor_type?: string
  investment_type?: string
}