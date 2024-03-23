import React, { useRef, useState } from 'react';
import { LoginUser } from '../../../interfaces/user/user.interface';
import { useLogin } from '../../../hooks/mutations/user/userMutation';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { emailCheck } from '../../../utils/regex/regex';
import HomeIcon from '../../../assets/HomeIcon';
import * as S from './LoginFormStyle';

function LoginForm() {
  const [user, setUser] = useState<LoginUser>({
    username: '',
    password: '',
  });
  const [hasEmail, setHasEmail] =
    useState<boolean>(true);
  const [hasPassword, setHasPassword] =
    useState<boolean>(true);

  const [loginModalIsOpen, setLoginModalIsOpen] =
    useState(false);

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
    if (
      loginModalIsOpen &&
      emailCheck(user.username)
    ) {
      setLoginModalIsOpen(false);
    }
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
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    let confirm = true;
    if (user.password.trim() === '') {
      setHasPassword(false);
      passwordInputRef.current?.focus();
      confirm = false;
    }
    if (
      user.username.trim() === '' ||
      !emailCheck(user.username)
    ) {
      setHasEmail(false);
      // 모달 오픈
      setLoginModalIsOpen(true);
      emailInputRef.current?.focus();
      confirm = false;
    }
    if (!confirm) {
      return;
    }
    loginMutation.mutate(user, {
      onSuccess: (data) => {
        data
          ? navigate('/')
          : passwordInputRef.current?.focus(),
          setHasPassword(false);
      },
    });
  };

  return (
    <S.LoginContainer>
      <S.LinkWarpper>
        <Link to="/">
          <HomeIcon width={147} height={50} />
        </Link>
      </S.LinkWarpper>
      <S.LoginForm onSubmit={handleLoginClick}>
        <S.Input
          type="email"
          value={user.username}
          onChange={handleEmailChange}
          placeholder="이메일"
          $hasValue={hasEmail}
          ref={emailInputRef}
          required
        />
        <S.Input
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          $hasValue={hasPassword}
          ref={passwordInputRef}
        />
        <S.Button type="submit">
          <span>로그인</span>
        </S.Button>
      </S.LoginForm>
      <S.StyledLink to="/signup">
        회원가입
      </S.StyledLink>
    </S.LoginContainer>
  );
}

export default LoginForm;
