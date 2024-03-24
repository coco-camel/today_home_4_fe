import React, { useRef, useState } from 'react';
import { useSignUp } from '../../../hooks/mutations/user/userMutation';
import { useNavigate } from 'react-router-dom';
import {
  emailCheck,
  pwCheck,
  signUpNickNameCheck,
} from '../../../utils/regex/regex';
import { SignUpUser } from '../../../interfaces/user/user.interface';
import HomeIcon from '../../../assets/HomeIcon';
import * as S from './SignUpFormStyle';
import { duplicateTestConfirm } from '../../../apis/login';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import NickNameInput from './NickNameInput';
import HomeLogo from '../../../assets/icons/homelogo.svg';

function SignupForm() {
  const [user, setUser] = useState<SignUpUser>({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });
  const [SelectEmail, setSelectEmail] =
    useState('');
  const [customEmail, setCustomEmail] =
    useState('');
  const signUpMutation = useSignUp();

  const [hasEmail, setHasEmail] = useState(true);
  const [hasEmailCheck, setHasEmailCheck] =
    useState(true);

  const [hasPassword, setHasPassword] =
    useState(true);
  const [hasPasswordCheck, setHasPasswordCheck] =
    useState(true);
  const [hasNickName, setHasNickName] =
    useState(true);

  const [nickNameChecked, setNickNameChecked] =
    useState(false);
  const [emailChecked, setEmailChecked] =
    useState(false);

  const emailInputRef =
    useRef<HTMLInputElement | null>(null);
  const emailCheckInputRef =
    useRef<HTMLInputElement | null>(null);
  const passwordInputRef =
    useRef<HTMLInputElement | null>(null);
  const passwordCheckInputRef =
    useRef<HTMLInputElement | null>(null);
  const nickNameInputRef =
    useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleSignUpClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    let confirm = true;
    const emailUse =
      SelectEmail === '직접입력'
        ? `${user.email}@${customEmail}`
        : `${user.email}@${SelectEmail}`;
    const confirmUser = {
      ...user,
      email: emailUse,
    };
    if (
      confirmUser.nickname.trim() === '' ||
      !signUpNickNameCheck(
        confirmUser.nickname,
      ) ||
      nickNameChecked
    ) {
      setHasNickName(false);
      nickNameInputRef.current?.focus();
      confirm = false;
    }
    if (
      confirmUser.passwordCheck.trim() === '' ||
      confirmUser.passwordCheck !==
        confirmUser.password
    ) {
      setHasPasswordCheck(false);
      passwordCheckInputRef.current?.focus();
      confirm = false;
    }
    if (
      confirmUser.password.trim() === '' ||
      !pwCheck(confirmUser.password)
    ) {
      setHasPassword(false);
      passwordInputRef.current?.focus();
      confirm = false;
    }
    if (SelectEmail.trim() === '') {
      setHasEmailCheck(false);
      emailCheckInputRef.current?.focus();
      confirm = false;
    }
    if (
      confirmUser.email.trim() === '' ||
      !emailCheck(confirmUser.email)
    ) {
      setHasEmail(false);
      emailInputRef.current?.focus();
      confirm = false;
    }
    await duplicateTestConfirm({
      type: 'email',
      value: confirmUser.email,
    }).then((result) => {
      setEmailChecked(result);
      setHasEmail(!result);
      if (result) {
        emailInputRef.current?.focus();
        confirm = false;
      }
    });

    if (!confirm) {
      return;
    }
    signUpMutation.mutate(confirmUser);
    navigate('/login');
  };

  return (
    <S.SignLayoutContainer>
      <S.HomeLogo>
        <S.LogoLink to="/">
          <HomeIcon width={31} height={31} />
          <S.HomeIconText
            src={HomeLogo}
            alt=""
            height="24"
          />
        </S.LogoLink>
      </S.HomeLogo>
      <S.SignContainer>
        <S.SignUpTitle>회원가입</S.SignUpTitle>
        <S.BorderLine></S.BorderLine>
        <form>
          {/* ...다른 필수 기능을 구현 후 꼭.. context api로 해결해보자... */}
          <EmailInput
            user={user}
            setUser={setUser}
            SelectEmail={SelectEmail}
            setSelectEmail={setSelectEmail}
            customEmail={customEmail}
            setCustomEmail={setCustomEmail}
            hasEmail={hasEmail}
            setHasEmail={setHasEmail}
            hasEmailCheck={hasEmailCheck}
            setHasEmailCheck={setHasEmailCheck}
            emailChecked={emailChecked}
            setEmailChecked={setEmailChecked}
            emailInputRef={emailInputRef}
            emailCheckInputRef={
              emailCheckInputRef
            }
          />
          <PasswordInput
            user={user}
            setUser={setUser}
            hasPassword={hasPassword}
            setHasPassword={setHasPassword}
            hasPasswordCheck={hasPasswordCheck}
            setHasPasswordCheck={
              setHasPasswordCheck
            }
            passwordInputRef={passwordInputRef}
            passwordCheckInputRef={
              passwordCheckInputRef
            }
          />
          <NickNameInput
            user={user}
            setUser={setUser}
            hasNickName={hasNickName}
            setHasNickName={setHasNickName}
            setNickNameChecked={
              setNickNameChecked
            }
            nickNameInputRef={nickNameInputRef}
            nickNameChecked={nickNameChecked}
          />
          <S.Button onClick={handleSignUpClick}>
            회원가입하기
          </S.Button>
        </form>
        <S.LoginNavigate>
          <p>이미 아이디가 있으신가요?</p>
          <S.LoginLink to="/login">
            로그인
          </S.LoginLink>
        </S.LoginNavigate>
      </S.SignContainer>
    </S.SignLayoutContainer>
  );
}

export default SignupForm;
