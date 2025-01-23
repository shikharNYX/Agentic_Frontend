/**
 * @author Healium Digital
 * API Service
 */

import axios from 'axios';
import { AnalyticsResponse, DateRange } from '@/types/analytics';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized response
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await api.post('/auth/refresh', { refreshToken });
        const { token } = response.data;
        
        localStorage.setItem('auth_token', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        return api(originalRequest);
      } catch (error) {
        // Redirect to login on refresh token failure
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export const analyticsApi = {
  // Get analytics data
  getAnalytics: async (dateRange: DateRange, channel?: string): Promise<AnalyticsResponse> => {
    const response = await api.get('/analytics', {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        channel,
      },
    });
    return response.data;
  },

  // Get regional performance
  getRegionalPerformance: async (dateRange: DateRange): Promise<CountryPerformance[]> => {
    const response = await api.get('/analytics/regional', {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      },
    });
    return response.data;
  },

  // Get funnel data
  getFunnelData: async (dateRange: DateRange): Promise<FunnelData[]> => {
    const response = await api.get('/analytics/funnel', {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      },
    });
    return response.data;
  },
};

export default api; 