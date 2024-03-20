import { instance } from './axios';
import type {
  SignUpUser,
  LoginUser,
} from '../interfaces/user/user.interface';

export const signUp = async (
  user: SignUpUser,
) => {
  console.log(user);
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
  console.log(user);
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
