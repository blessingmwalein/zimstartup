import { CustomerDataResponse } from "../models/customer";
import { createAxiosInstance, createLoginInstance } from "./axios";
import { LoginRequest, LoginResponse } from "../models/login";
import qs from 'qs';
import { UserResponse } from "../models/user";
import { CreateEmployementDetailsRequest, CreateNextOfKeenRequest, UpdateContactInfoRequest } from "../models/employement";

// Global Axios instance with the default config (including token if required)
const api = createAxiosInstance();

// Function to handle login
export const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  // Use createLoginInstance to handle login-specific headers
  const loginApi = createLoginInstance();
  const formData = qs.stringify(loginRequest);
  const response = await loginApi.post<LoginResponse>('/token', formData);
  return response.data;
};

// Function to handle signup
export const signup = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  // Use createLoginInstance for signup as well
  const signupApi = createLoginInstance();
  const formData = qs.stringify(loginRequest);
  const response = await signupApi.post<LoginResponse>('/signup', formData);
  return response.data;
};

// Get user data from the server using the national ID
export const getCustomer = async (nationalId: string): Promise<CustomerDataResponse> => {
  const response = await api.get<CustomerDataResponse>(`investor-data/${nationalId}`);
  return response.data;
};

// Get logged-in user data
export const getLoggedInUser = async (token: string): Promise<UserResponse> => {
  const axiosInstance = createAxiosInstance(token);
  const response = await axiosInstance.get<UserResponse>('/users/me');
  return response.data;
};

// Update user basic information
export const updateBasicInformation = async (data: any): Promise<UserResponse> => {
  const response = await api.put<UserResponse>('/users/me', data);
  return response.data;
};

// Update contact information
export const updateContactInformation = async (data: UpdateContactInfoRequest): Promise<UserResponse> => {
  const response = await api.put<UserResponse>(`investor-contacts-new/017287cd-6fe5-44f7-add2-25ab44ca6f2d?national_id=${data.national_id}`, data);
  return response.data;
};

// Update employment work information
export const updateEmploymentInformation = async (data: CreateEmployementDetailsRequest): Promise<UserResponse> => {

  const response = await api.post<UserResponse>('create-employment-details', data);
  return response.data;
};

// Create next of kin
export const createNextOfKin = async (data: CreateNextOfKeenRequest): Promise<UserResponse> => {
  // const formData = qs.stringify(data);
  const response = await api.post<UserResponse>('/create-new-next-of-keen-details', data);
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/forgot-password', { email });
  return response.data;
};

// Reset Password
export const resetPassword = async (data: any): Promise<{ message: string }> => {
  // Assuming endpoint /reset-password based on flow requirements
  // The user only provided verify-password-reset-token but requested the change password page implementation
  const response = await api.post<{ message: string }>('/reset-password', data);
  return response.data;
};
