import axios, { AxiosInstance, AxiosResponse } from "axios";

// Base API URL - you can set this in environment variables
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://n514stzk-8000.inc1.devtunnels.ms/";

// Create base axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create authenticated axios instance
const axiosWithAuth = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for authenticated requests
axiosWithAuth.interceptors.request.use(
  (config) => {
    // Get token from localStorage or your preferred storage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Handle common errors
      if (error.response?.status === 401) {
        // Handle unauthorized - redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
      }

      if (error.response?.status === 403) {
        // Handle forbidden
        console.error("Access forbidden");
      }

      if (error.response?.status >= 500) {
        // Handle server errors
        console.error("Server error:", error.response.data);
      }

      return Promise.reject(error);
    }
  );
};

// Setup interceptors for both instances
setupResponseInterceptor(axiosInstance);
setupResponseInterceptor(axiosWithAuth);

export { axiosInstance, axiosWithAuth };
export default axiosInstance;
