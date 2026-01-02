import { createAxiosInstance } from './axios';

interface AddToWatchlistRequest {
  national_id: string;
  company_id: number;
  watchlist_status: boolean;
}

interface WatchlistResponse {
  watchlist_item: [number, string, number, boolean, string];
}

export const addToWatchlist = async (data: AddToWatchlistRequest): Promise<WatchlistResponse> => {
  const axios = createAxiosInstance();
  const response = await axios.post<WatchlistResponse>('/add-to-watchlist', data);
  return response.data;
};

export const removeFromWatchlist = async (data: AddToWatchlistRequest): Promise<WatchlistResponse> => {
  const axios = createAxiosInstance();
  const response = await axios.post<WatchlistResponse>('/add-to-watchlist', {
    ...data,
    watchlist_status: false,
  });
  return response.data;
};
