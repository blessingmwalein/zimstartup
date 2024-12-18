import { Update } from "@reduxjs/toolkit";
import { CheckCompanyNameResponse } from "../models/company";
import { BuyStockRequest, ExchangeCashRequest, SellStockRequest, UpdateStockPriceRequest, WalletResponse } from "../models/wallet";
import { createAxiosInstance } from "./axios";

const api = createAxiosInstance();

// Get user data from the server using the national ID
export const getUserWalletBalance = async (
    nationalId: string,
): Promise<WalletResponse> => {
    const response = await api.get<WalletResponse>(
        `get-user-wallet-balance/{id}?national_id=${nationalId}`,
    );
    return response.data;
};

//exchange-cash?national_id=632095320E63&target_investor_id=632095320E63&amount=100
export const exchangeCash = async (
    payload: ExchangeCashRequest
): Promise<any> => {
    const response = await api.post<any>(
        `exchange-cash?national_id=${payload.national_id}&target_investor_id=${payload.target_investor_id}&amount=${payload.amount}`,
    );
    return response.data;
};

//sell-stock?national_id=632095320E63&stock_id=1&quantity=100
export const sellStock = async (
    sellStockRequest: SellStockRequest
): Promise<any> => {
    const response = await api.post<any>(
        `sell-stock?national_id=${sellStockRequest.national_id}&stock_id=${sellStockRequest.stock_id}&quantity=${sellStockRequest.quantity}`,
    );
    return response.data;
};

//buy-stock?national_id=632095320E63&stock_id=1&quantity=100
export const buyStock = async (
    buyStockRequest: BuyStockRequest
): Promise<any> => {
    const response = await api.post<any>(
        `buy-stock?national_id=${buyStockRequest.national_id}&stock_id=${buyStockRequest.stock_id}&quantity=${buyStockRequest.quantity}`,
    );
    return response.data;
};

//update-stock-price?stock_id=1&new_price=100&national_id=632095320E63
export const updateStockPrice = async (
  updateStockPriceRequest:UpdateStockPriceRequest
): Promise<any> => {
    const response = await api.post<any>(
        `update-stock-price?stock_id=${updateStockPriceRequest.stock_id}&new_price=${updateStockPriceRequest.new_price}&national_id=${updateStockPriceRequest.national_id}`,
    );
    return response.data;
};