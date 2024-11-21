import { PreviousFunds, StockMarketDetails } from "./stock";

export interface CreateCompanyRequest {
  company_abbreviations: string;
  company_name: string;
  company_start_date: Date;
  company_short_description: string;
  industry_id: string;
  stock_id: string;
  location: string;
  website: string;
  employees: number;
  business_state_id: string;
}

export interface CreateCompanyContactRequest {
  company_id: number;
  instagram: string;
  linkedin: string;
  twitter: string;
  email: string;
  work_email: string;
  phone1: number;
  phone2: number;
  phone3: number;
  address: string;
  address_city: string;
  state_code: number;
  region: string;
  country: string;
}

export interface CreateCompanyStockMarketRequest {
  market_type_id: string;
  stock_id: string;
  company_id: number;
  listed_date: Date;
  listing_capital: number;
  listing_currency: string;
  delisted_date: Date;
  current_market_cap: number;
  financial_year_end: Date;
  transfer_secretary: string;
  reporting_currency: string;
  ISIN: string;
}

export interface CreateCompanyPreviousFundRequest {
  investor_type: string;
  investor_information: string;
  investment_type: string;
  date_of_funds: Date;
  investment_amount: number;
  investment_currency: string;
  company_valuation: number;
  company_valuation_currency: string;
  valuation_date: Date;
  company_id: number;
}

export interface CreateCompanyUpdatesRequest {
  company_id: number;
  update_type: string;
  headline: string;
  summary: string;
  update_content: string;
  url: string;
  is_published: boolean;
}

export interface CompanyUpdate {
  company_id: number;
  created_at: Date;
  status: string;
  business_state: string;
  updated_at: string;
  company_abbreviations: string;
  company_name: string;
  company_start_date: string;
  company_short_description: string;
  industry_id: string;
  stock_id: string;
  fund_id: string;
  location: string;
  website: string;
  employees: string;
  company_logo: string;
  update_id: number;
  title: string;
  update_content: string;
}

export interface CreateCompanyShareholderRequest {
  new_shareholder: NewShareholder;
  new_position: NewPosition;
}

export interface NewPosition {
  employee_id: number;
  company_name: string;
  overall_position: string;
  position: string;
}

export interface NewShareholder {
  first_name: string;
  last_name: string;
  title: string;
  dob: Date;
  marital_status: string;
}

export interface CreateCompanyQualificationRequest {
  employee_id: number;
  institution: string;
  education_type: string;
  qualification_name: string;
  year_obtained: Date;
}

export interface CreateCompanyEmployeeHistoryRequest {
  employee_id: string;
  company_name: string;
  position: string;
  start_date: Date;
  end_date: Date;
  achievements: string;
}

export interface RegisterCompanyRequest {
  company_id: number;
  request_type: string;
}

export interface CreateCompanyManagementRequest {
  company_id: number;
  first_name: string;
  last_name: string;
  title: string;
  dob: Date;
  marital_status: string;
  email: string;
  nationality: string;
}

export interface CreateCompanyPositionRequest {
  employee_id: number;
  overall_position: string;
  position: string;
  start_date: Date;
  end_date: Date;
  is_current: boolean;
}

export interface CreateUserQualificationRequest {
  employee_id: number;
  institution: string;
  education_type: string;
  field_of_study: string;
  year_obtained: number;
}

export interface CreateUserEmploymentHistoryRequest {
  employee_id: number;
  company_name: string;
  position: string;
  start_date: Date;
  end_date: Date;
  achievements: string;
  reason_for_leaving: string;
}

export interface CreateUserPreviousAwardsRequest {
  employee_id: number;
  award: string;
  year: number;
  description: string;
}

export interface CheckCompanyNameResponse {
  message: string;
  next_page: string;
}

export interface CompanyListResponse {
  data: Company[];
}
export interface CompanyListBySectorResponse {
  investment_round: Company[];
}

export interface Company {
  company_start_date: Date;
  company_status: CompanyStatus;
  request_type: null | string;
  company_abbreviations: string;
  company_name: string;
  business_state: string;
  sector: string;
  location: string;
  name: string;
  company_id: number;
}

export enum CompanyStatus {
  PendingCheck = "PENDING CHECK",
}

export interface CreateCompanyResponse {
  data: CompanyData;
}

export interface CompanyData {
  company_id: number;
  created_at: Date;
  status: string;
  business_state: string;
  updated_at: Date;
  company_abbreviations: string;
  company_name: string;
  company_start_date: Date;
  company_short_description: string;
  industry_id: number;
  stock_id: number;
  fund_id: null;
  location: string;
  website: string;
  employees: number;
  company_logo: null;
}

export interface CompanyCombinedResponse {
  company_data: CompanyData;
  company_contact_details: CompanyContactDetails;
  stock_market_details: StockMarketDetails;
  previous_funds: PreviousFunds;
  company_review: CompanyReview;
}

export interface CompanyContactDetails {
  email: string;
  work_email: string;
  phone1: number;
  phone2: number;
  phone3: number;
  address: string;
  address_city: string;
  state_code: number;
  region: string;
  country: string;
}

// export interface CompanyData {
//   company_id:                number;
//   status:                    string;
//   business_state:            number;
//   company_abbreviations:     string;
//   company_name:              string;
//   company_start_date:        Date;
//   sector:                    string;
//   company_short_description: string;
//   location:                  string;
//   website:                   string;
//   employees:                 number;
// }

export interface CompanyReview {
  approver_status: null;
  company_comment: null;
  chip_type: null;
  updated_by: null;
}

export interface AddCombinedShareholderRequest {
  position: Position;
  qualifications: Qualification[];
  employment_history: EmploymentHistory[];
  public_info: PublicInfo;
  awards: Award[];
}

export interface Award {
  employee_id: number;
  award: string;
  year: number;
  description: string;
}

export interface EmploymentHistory {
  employee_id: number;
  company_name: string;
  position: string;
  start_date: Date;
  end_date: Date;
  achievements: string;
  reason_for_leaving: string;
}

export interface Position {
  employee_id: number;
  overall_position: string;
  position: string;
  start_date: Date;
  end_date: Date;
  is_current: boolean;
}

export interface PublicInfo {
  employee_id: number;
  public_profile: string;
}

export interface Qualification {
  employee_id: number;
  institution: string;
  education_type: string;
  field_of_study: string;
  year_obtained: number;
}

export interface AddDirectorDetailsRequest {
  company_id: number;
  first_name: string;
  last_name: string;
  title: string;
  dob: Date;
  marital_status: string;
  email: string;
  nationality: string;
}
