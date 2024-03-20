import React, { useState } from 'react';
import type { LoginUser } from '../interfaces/user/user.interface';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HomeIcon from '../assets/HomeIcon';
import { useLogin } from '../hooks/mutations/user/userMutation';

const Input = styled.input`
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 13px 15px 14px;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 21px;
  position: relative;
  margin-top: -1px;
  &:focus {
    box-shadow: 0 0 0 3px rgba(53, 197, 240, 0.3);
    z-index: 1;
  }
`;
const Button = styled.button`
  margin: 20px 0;
  width: 100%;
  padding: 15px 10px;
  width: 100%;
  line-height: 20px;
  font-size: 17px;
  font-weight: bold;
  min-height: 50px;
  border-radius: 4px;
  background-color: #35c5f0;
  border-color: #35c5f0;
  color: #fff;
  box-sizing: border-box;
  &:hover {
    filter: brightness(0.9);
  }
`;
const LoginContainer = styled.div`
  width: 300px;
  padding: 40px 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #757575;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
`;
const LinkWarpper = styled.div`
  margin-bottom: 30px;
`;
const LoginForm = styled.form`
  input {
    &:nth-child(1) {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    &:nth-child(2) {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;
function Login() {
  const [user, setUser] = useState<LoginUser>({
    email: '',
    password: '',
  });
  const loginMutation = useLogin();

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
    loginMutation.mutate(user);
  };

  return (
    <LoginContainer>
      <LinkWarpper>
        <Link to="/">
          <HomeIcon width={147} height={50} />
        </Link>
      </LinkWarpper>
      <LoginForm>
        <Input
          type="text"
          value={user.email}
          onChange={handleEmailChange}
          placeholder="이메일"
        />
        <Input
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
        />
        <Button onClick={handleLoginClick}>
          <span>로그인</span>
        </Button>
      </LoginForm>
      <StyledLink to="/signup">
        회원가입
      </StyledLink>
    </LoginContainer>
  );
}

export default Login;
