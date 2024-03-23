import { useMutation } from '@tanstack/react-query';
import {
  login,
  logout,
  signUp,
} from '../../../apis/login';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem(
          'accessToken',
          data?.headers['authorization'],
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
