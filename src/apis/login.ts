import { authInstance, instance } from './axios';
import type {
  SignUpUser,
  LoginUser,
  DuplicateTestCheck,
} from '../interfaces/user/user.interface';
import { AxiosError } from 'axios';

export const signUp = async (
  user: SignUpUser,
) => {
  try {
    const res = await instance.post(
      '/api/v1/members/signup',
      user,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const login = async (user: LoginUser) => {
  try {
    const res = await authInstance.post(
      '/api/v1/members/signin',
      user,
    );
    return res;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    if (axiosError.response) {
      const result =
        axiosError.response.data.status;
      return result;
    }
  }
};

export const duplicateTestConfirm = async (
  user: DuplicateTestCheck,
) => {
  try {
    const res = await instance.get(
      `/api/v1/members/check?type=${user.type}&value=${user.value}`,
    );
    const result = res.data.data.isExist;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const res = await authInstance.post(
      '/api/v1/members/logout',
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
