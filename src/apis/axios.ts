import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DATA,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DATA,
});

authInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('accessToken') || '';
    if (token) {
      config.headers['Authorization'] =
        `${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);
