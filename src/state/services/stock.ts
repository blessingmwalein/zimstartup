import { createAxiosInstance } from "./axios";

const api = createAxiosInstance();

export interface BuyStockRequest {
  national_id: string;
  stock_id: number;
  quantity: number;
}

export interface BuyStockResponse {
  message: string;
  transaction_id?: number;
  // Add other response fields based on your API
}

export const buyStock = async (
  params: BuyStockRequest
): Promise<BuyStockResponse> => {
  const response = await api.post<BuyStockResponse>(
    `/buy-stock?national_id=${params.national_id}&stock_id=${params.stock_id}&quantity=${params.quantity}`,
    {}
  );
  return response.data;
};
