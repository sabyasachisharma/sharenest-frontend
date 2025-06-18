import axios from 'axios';
import { ApiResponse } from '../types';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = 
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // You could redirect to login here if needed
    }
    
    return Promise.reject({ 
      ...error, 
      message 
    });
  }
);

const api = {
  setAuthToken: (token: string | null) => {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  },

  get: <T>(url: string, params = {}): Promise<ApiResponse<T>> => 
    axiosInstance.get(url, { params }),

  post: <T>(url: string, data = {}): Promise<ApiResponse<T>> => 
    axiosInstance.post(url, data),

  put: <T>(url: string, data = {}): Promise<ApiResponse<T>> => 
    axiosInstance.put(url, data),

  patch: <T>(url: string, data = {}): Promise<ApiResponse<T>> => 
    axiosInstance.patch(url, data),

  delete: <T>(url: string): Promise<ApiResponse<T>> => 
    axiosInstance.delete(url),
};

export default api;