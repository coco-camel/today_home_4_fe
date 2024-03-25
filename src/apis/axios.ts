import axios from 'axios';
import { getCookie } from '../cookies/cookies';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DATA,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DATA,
  withCredentials: true,
});

authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      'accessToken',
    );
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

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status);
    if (
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getCookie(
        'Refresh-token',
      );
      console.log('refreshToken', refreshToken);
      if (refreshToken) {
        try {
          console.log('axios 호출');
          const response = await instance.post(
            '/api/v1/members/reissue',
          );
          console.log('axios 호출 후', response);
          const accessToken =
            response.headers['authorization'];
          console.log(
            'axios 호출 후 acc 토큰',
            accessToken,
          );
          localStorage.setItem(
            'accessToken',
            accessToken,
          );
          originalRequest.headers[
            'authorization'
          ] = `${accessToken}`;

          return authInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
