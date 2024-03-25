import React, { useRef } from 'react';
import { useSignUp } from '../../../hooks/mutations/user/userMutation';
import { useNavigate } from 'react-router-dom';
import {
  emailCheck,
  pwCheck,
  signUpNickNameCheck,
} from '../../../utils/regex/regex';
import HomeIcon from '../../../assets/HomeIcon';
import * as S from './SignUpFormStyle';
import { duplicateTestConfirm } from '../../../apis/login';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import NickNameInput from './NickNameInput';
import HomeLogo from '../../../assets/icons/homelogo.svg';
import { useSignUpContext } from './SignUpContext';
function SignupForm() {
  const {
    user,
    selectEmail,
    customEmail,
    setHasEmail,
    setHasEmailCheck,
    setEmailChecked,
    setHasNickName,
    nickNameChecked,
    setHasPassword,
    setHasPasswordCheck,
  } = useSignUpContext();

  const emailInputRef =
    useRef<HTMLInputElement>(null);
  const emailCheckInputRef =
    useRef<HTMLInputElement>(null);
  const nickNameInputRef =
    useRef<HTMLInputElement | null>(null);
  const passwordInputRef =
    useRef<HTMLInputElement | null>(null);
  const passwordCheckInputRef =
    useRef<HTMLInputElement | null>(null);

  const signUpMutation = useSignUp();

  const navigate = useNavigate();

  const handleSignUpClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    let confirm = true;
    const emailUse =
      selectEmail === '직접입력'
        ? `${user.email}@${customEmail}`
        : `${user.email}@${selectEmail}`;
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
    if (selectEmail.trim() === '') {
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
          <EmailInput
            emailInputRef={emailInputRef}
            emailCheckInputRef={
              emailCheckInputRef
            }
          />
          <PasswordInput
            passwordInputRef={passwordInputRef}
            passwordCheckInputRef={
              passwordCheckInputRef
            }
          />
          <NickNameInput
            nickNameInputRef={nickNameInputRef}
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
