import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor to add the auth token from cookies to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    // Use the standard Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
