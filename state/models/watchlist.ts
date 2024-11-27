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
