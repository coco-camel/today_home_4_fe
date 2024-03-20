import { useMutation } from '@tanstack/react-query';
import {
  login,
  signUp,
} from '../../../apis/login';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};