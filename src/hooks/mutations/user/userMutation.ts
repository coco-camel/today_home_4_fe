import { useMutation } from '@tanstack/react-query';
import {
  login,
  logout,
  signUp,
} from '../../../apis/login';
import useUserStore from '../../../store/userStore';
import { AxiosResponse } from 'axios';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {},
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const response = data as AxiosResponse;
      if (data) {
        localStorage.setItem(
          'accessToken',
          response.headers['authorization'],
        );
        useUserStore.getState().logIn();
      }
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      useUserStore.getState().logOut();
    },
  });
};
