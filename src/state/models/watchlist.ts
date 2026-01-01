export interface AddWatchListResponse {
  watchlist_item: WatchlistItem;
}

export interface WatchlistItem {
  watchlist_id: number;
  national_id: string;
  company_id: number;
  watchlist_status: boolean;
  watchlist_date: Date;
}


export interface AddWatchListRequest {
    national_id:      string;
    company_id:       number;
    watchlist_status: boolean;
}


export interface WatchListDetail {
  watchlist_details: WatchlistDetail[];
}

export interface WatchlistDetail {
  customer_id:               string;
  created_at:                Date;
  status:                    string;
  updated_at:                Date;
  dob:                       Date;
  gender:                    string;
  title:                     string;
  first_name:                string;
  middle_name:               string;
  last_name:                 string;
  nickname:                  string;
  national_id:               string;
  marital_status:            string;
  nationality:               string;
  last_updated_by:           null;
  watchlist_id:              number;
  company_id:                number;
  watchlist_status:          boolean;
  watchlist_date:            Date;
  business_state_id:         number;
  company_abbreviations:     string;
  company_name:              string;
  company_start_date:        Date;
  company_short_description: string;
  industry_id:               number;
  stock_id:                  number;
  location:                  string;
  website:                   string;
  employees:                 number;
  company_logo:              null;
}
