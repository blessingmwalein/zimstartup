import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import { clearUser } from "../slices/authSlice";
import store from "../store";

// Base URL for all requests
const BASE_URL =
  process.env.API_BASE_URL || "https://zimstartup-861d8915d228.herokuapp.com/";

// Base Axios instance with global configurations (application/json as default Content-Type)
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const handleAuthError = (error: any) => {
  console.error("Axios Error:", error);
  const status = error.response?.status;
  if (status === 401 || status === 403) {
    store.dispatch(clearUser());
    if (typeof window !== "undefined") {
      // Redirect to login page
      Router.push("/auth/signin");
    }
  }
  return Promise.reject(error);
};

// Add interceptor to handle 401 Unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  handleAuthError,
);

// Function to create an Axios instance with optional custom config and token from cookies
export const createAxiosInstance = (
  token?: string,
  config?: AxiosRequestConfig,
) => {
  const authToken = token || Cookies.get("access_token");

  const configWithAuth = {
    ...config,
    baseURL: BASE_URL,
    headers: {
      ...axiosInstance.defaults.headers,
      ...config?.headers,
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  };

  const instance = axios.create(configWithAuth);

  // Add the same interceptors to the custom instance
  instance.interceptors.response.use(
    (response) => response,
    handleAuthError,
  );

  return instance;
};

// Function to create login instance with specific Content-Type for login requests
export const createLoginInstance = (config?: AxiosRequestConfig) => {
  const loginConfig: any = {
    ...config,
    headers: {
      ...axiosInstance.defaults.headers,
      "Content-Type": "application/x-www-form-urlencoded", // Specific header for login
    },
  };

  return createAxiosInstance(undefined, loginConfig);
};

export default axiosInstance;
