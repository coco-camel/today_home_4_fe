import React, { useState } from 'react';
import type { LoginUser } from '../interfaces/user/user.interface';
import { login } from '../apis/login';

function Login() {
  const [user, setUser] = useState<LoginUser>({
    email: '',
    password: '',
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
  const handleLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    login(user);
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
          <button onClick={handleLoginClick}>
            회원가입
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
