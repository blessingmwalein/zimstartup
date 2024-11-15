import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// Base URL for all requests
const BASE_URL = process.env.API_BASE_URL || 'https://zimstartup-861d8915d228.herokuapp.com/';

// Base Axios instance with global configurations (application/json as default Content-Type)
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Function to create an Axios instance with optional custom config and token from cookies
export const createAxiosInstance = (token?: string, config?: AxiosRequestConfig) => {
  // If no token is passed, try fetching from cookies
  const authToken = token || Cookies.get('access_token');
  console.log('Using Token:', authToken);

  // Merge default configuration with any custom config provided
  const configWithAuth = {
    ...config,
    baseURL: BASE_URL, // Ensure base URL is set
    headers: {
      ...axiosInstance.defaults.headers, // Default headers from axiosInstance
      ...config?.headers, // Override with custom headers if provided
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}), // Add Authorization header if token exists
    },
  };

  return axios.create(configWithAuth);
};

// Function to create login instance with specific Content-Type for login requests
export const createLoginInstance = (config?: AxiosRequestConfig) => {
  const loginConfig : any = {
    ...config,
    headers: {
      ...axiosInstance.defaults.headers,
      'Content-Type': 'application/x-www-form-urlencoded', // Specific header for login
    },
  };

  return createAxiosInstance(undefined, loginConfig);
};

export default axiosInstance;
