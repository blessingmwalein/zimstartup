export interface StockMarketDetails {
    type_of_market:     number;
    listed_date:        Date;
    listing_capital:    number;
    listing_currency:   string;
    delisted_date:      Date;
    current_market_cap: number;
    financial_year_end: Date;
    transfer_secretary: string;
    exchange_name:      string;
    exchange_country:   string;
    exchange_currency:  string;
    reporting_currency: string;
  }
  
  export interface PreviousFunds {
    investor_type:              string;
    date_of_funds:              Date;
    investor_information:       string;
    investment_type:            string;
    investment_currency:        string;
    investment_amount:          number;
    company_valuation_currency: string;
    company_valuation:          number;
    valuation_date:             Date;
  }
  