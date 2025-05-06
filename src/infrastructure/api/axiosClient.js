// src/infrastructure/api/axios.js
import axios from 'axios';

// Base URL for all API calls
const BASE_URL = 'http://localhost:3000'; // Change this to your API base URL

// Create axios instance with custom config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired, etc)
    if (error.response && error.response.status === 401) {
      // You might want to redirect to login or refresh token
      localStorage.removeItem('token');
      // window.location.href = '/login'; // Uncomment if you want to redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;