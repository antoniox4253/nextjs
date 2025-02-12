
import axios from 'axios';

// Create a custom instance of axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Tu backend estará corriendo aquí
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to handle auth tokens
axiosInstance.interceptors.request.use(
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

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
