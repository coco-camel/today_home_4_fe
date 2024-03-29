export interface SignUpUser {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface DuplicateTestCheck {
  type: string;
  value: string;
}
