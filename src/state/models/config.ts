export interface CompanyIndustryResponse {
  data: CompanyIndustry[];
}

export interface CompanyIndustry {
  id: number;
  created_at: Date;
  status: Status;
  sector: string;
}

export enum Status {
  Active = "ACTIVE",
}

export interface BusinessStatesResponse {
  data: BusinessState[];
}

export interface BusinessState {
  id: number;
  created_at: Date;
  status: Status;
  state_name: string;
  number_of_states: number;
}

export interface StockExchangeEntityResponse {
  data: StockExchangeEntity[];
}

export interface StockExchangeEntity {
  stock_id: number;
  current_status: string;
  name: string;
  exchange_symbol: string;
  country: string;
  currency: string;
}

export interface StockMarketsResponse {
  data: StockMarket[];
}

export interface StockMarket {
  market_id: number;
  market_type_id: number;
  stock_id: number;
  company_id: number;
  listed_date: Date;
  listing_capital: number;
  listing_currency: string;
  delisted_date: string;
  current_market_cap: number;
  financial_year_end: Date;
  transfer_secretary: string;
  isin: string;
  reporting_currency: string;
}

export interface MarketTypesResponse {
  data: MarketType[];
}

export interface MarketType {
  id: number;
  created_at: Date;
  name: string;
}
