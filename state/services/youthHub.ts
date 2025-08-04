import { createAxiosInstance } from "./axios"
import { YouthHubMessage, YouthHubRequest, YouthHubListResponse } from "../models/youthHub"

const api = createAxiosInstance()

export const getYouthHubMessage = async (): Promise<YouthHubMessage> => {
  const response = await api.get("/youth_hub")
  return response.data
}

export const createYouthHubRequest = async (data: YouthHubRequest): Promise<any> => {
  const response = await api.post("/youth-request-details", data)
  return response.data
}

export const getYouthHubRequests = async (): Promise<YouthHubListResponse> => {
  const response = await api.get("/youth-request")
  return response.data
} 