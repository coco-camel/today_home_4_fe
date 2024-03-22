import React, { useRef, useState } from 'react';
import { LoginUser } from '../../../interfaces/user/user.interface';
import { useLogin } from '../../../hooks/mutations/user/userMutation';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import {
  emailCheck,
  pwCheck,
} from '../../common/regex/regex';
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
    <S.LoginContainer>
      <S.LinkWarpper>
        <Link to="/">
          <HomeIcon width={147} height={50} />
        </Link>
      </S.LinkWarpper>
      <S.LoginForm>
        <S.Input
          type="text"
          value={user.username}
          onChange={handleEmailChange}
          placeholder="이메일"
          $hasValue={hasEmail}
          ref={emailInputRef}
        />
        <S.Input
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          $hasValue={hasPassword}
          ref={passwordInputRef}
        />
        <S.Button onClick={handleLoginClick}>
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
