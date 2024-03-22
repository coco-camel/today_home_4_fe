import { authInstance, instance } from './axios';
import type {
  SignUpUser,
  LoginUser,
  DuplicateTestCheck,
} from '../interfaces/user/user.interface';

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
    console.log(error);
  }
};

export const nickNameConfirm = async (
  user: DuplicateTestCheck,
) => {
  console.log(user);
  try {
    const res = await instance.get(
      `/api/v1/members/check?type=${user.type}&value=${user.value}`,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
