import React, { useState } from 'react';
import type { SignUpUser } from '../interfaces/user/user.interface';
import { signUp } from '../apis/login';

function SignUp() {
  const [user, setUser] = useState<SignUpUser>({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, email: value });
  };
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, password: value });
  };
  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, passwordCheck: value });
  };
  const handleNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, nickname: value });
  };
  const handleSignUpClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    signUp(user);
  };

  return (
    <>
      <div>
        <form>
          <input
            type="text"
            value={user.email}
            onChange={handleEmailChange}
            placeholder="이메일"
          />
          <input
            type="password"
            value={user.password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          />
          <input
            type="password"
            value={user.passwordCheck}
            onChange={handlePasswordCheckChange}
            placeholder="비밀번호 확인"
          />
          <input
            type="text"
            value={user.nickname}
            onChange={handleNicknameChange}
            placeholder="별명 (2~20자)"
          />
          <button onClick={handleSignUpClick}>
            회원가입
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
