import {
  BusinessStatesResponse,
  CompanyIndustryResponse,
  MarketTypesResponse,
  StockExchangeEntityResponse,
  StockMarketsResponse,
} from "../models/config";
import { createAxiosInstance } from "./axios";

const api = createAxiosInstance();

export const getIndustries = async (): Promise<CompanyIndustryResponse> => {
  const response = await api.get<CompanyIndustryResponse>(
    `get-all-industries-data-in-the-database`,
  );
  return response.data;
};

//get business states
export const getBusinessStates = async (): Promise<BusinessStatesResponse> => {
  const response = await api.get<BusinessStatesResponse>(
    `get-all-business-states-data-in-the-database`,
  );
  return response.data;
};

//get stock exchange entities
export const getStockExchangeEntities =
  async (): Promise<StockExchangeEntityResponse> => {
    const response = await api.get<StockExchangeEntityResponse>(
      `stock-exchange-entities-on-earth`,
    );
    return response.data;
  };

//get stock markets in world
export const getStockMarkets = async (): Promise<StockMarketsResponse> => {
  const response = await api.get<StockMarketsResponse>(
    `get-stock-markets-across-the-world`,
  );
  return response.data;
};

//get market types
export const getMarketTypes = async (): Promise<MarketTypesResponse> => {
  const response = await api.get<MarketTypesResponse>(`get-markets-type`);
  return response.data;
};
