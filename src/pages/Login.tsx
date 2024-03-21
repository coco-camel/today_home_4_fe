import React, { useRef, useState } from 'react';
import type { LoginUser } from '../interfaces/user/user.interface';
import styled from 'styled-components';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import HomeIcon from '../assets/HomeIcon';
import { useLogin } from '../hooks/mutations/user/userMutation';
import {
  emailCheck,
  pwCheck,
} from '../components/common/regex/regex';

const Input = styled.input<{
  $hasValue: boolean;
}>`
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 13px 15px 14px;
  border: ${({ $hasValue }) =>
    $hasValue
      ? '1px solid #dbdbdb'
      : '1px solid red'};
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 21px;
  position: relative;
  margin-top: -1px;
  z-index: 1;
  &:focus {
    box-shadow: ${({ $hasValue }) =>
      $hasValue
        ? '0 0 0 3px rgba(53, 197, 240, 0.3)'
        : '0 0 0 3px rgba(255, 119, 119, 0.3)'};
    z-index: 2;
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
    background: #009fce;
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
    username: '',
    password: '',
  });

  const [hasEmail, setHasEmail] =
    useState<boolean>(true);
  const [hasPassword, setHasPassword] =
    useState<boolean>(true);

  const loginMutation = useLogin();
  const navigate = useNavigate();

  const emailInputRef =
    useRef<HTMLInputElement | null>(null);
  const passwordInputRef =
    useRef<HTMLInputElement | null>(null);

  const handleEmailChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    await setUser({ ...user, username: value });
    !value
      ? setHasEmail(false)
      : setHasEmail(true);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, password: value });
    !value
      ? setHasPassword(false)
      : setHasPassword(true);
  };

  const handleLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    let confirm = true;
    if (
      user.password.trim() === '' ||
      !pwCheck(user.password)
    ) {
      setHasPassword(false);
      passwordInputRef.current?.focus();
      confirm = false;
    }
    if (
      user.username.trim() === '' ||
      !emailCheck(user.username)
    ) {
      setHasEmail(false);
      emailInputRef.current?.focus();
      confirm = false;
    }
    if (!confirm) {
      return;
    }
    loginMutation.mutate(user);
    navigate('/');
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
          value={user.username}
          onChange={handleEmailChange}
          placeholder="이메일"
          $hasValue={hasEmail}
          ref={emailInputRef}
        />
        <Input
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          $hasValue={hasPassword}
          ref={passwordInputRef}
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
