import { useMutation } from '@tanstack/react-query';
import {
  login,
  signUp,
} from '../../../apis/login';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
    },
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem(
        'accessToken',
        data?.headers['authorization'],
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
