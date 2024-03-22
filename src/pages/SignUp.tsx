import React, { useRef, useState } from 'react';
import type { SignUpUser } from '../interfaces/user/user.interface';
import { useSignUp } from '../hooks/mutations/user/userMutation';
import {
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import HomeIcon from '../assets/HomeIcon';
import styled from 'styled-components';
import {
  signUpNickNameCheck,
  pwCheck,
  signUpEmailcheck,
  signUpIdcheck,
  emailCheck,
} from '../components/common/regex/regex';

const Input = styled.input<{
  $hasValue: boolean;
  $hasCheck: boolean;
}>`
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 8px 15px 9px;
  border: ${({ $hasValue, $hasCheck }) =>
    $hasValue || $hasCheck
      ? '1px solid #dbdbdb'
      : '1px solid red'};
  color: #000;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 21px;
  position: relative;
  border-radius: 4px;
  background-color: #fff;
  &:focus {
    box-shadow: ${({ $hasValue, $hasCheck }) =>
      $hasValue || $hasCheck
        ? '0 0 0 3px rgba(53, 197, 240, 0.3)'
        : '0 0 0 3px rgba(255, 119, 119, 0.3)'};

    z-index: 2;
  }
`;
const SignContainer = styled.div`
  width: 360px;
  padding: 60px 0;
  display: flex;
  margin: 0px auto;
  flex-direction: column;
`;
const SignLayoutContainer = styled.div`
  padding-top: 40px;
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
const LoginLink = styled(Link)`
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
  padding-left: 10px;
`;
const SignUpTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;
const BorderLine = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 30px;
  border-bottom: 1px solid #dbdbdb;
`;
const SignUpInputWarpper = styled.div`
  margin-bottom: 30px;
`;
const InputLabel = styled.div<{
  $hasCheck: boolean;
}>`
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: ${({ $hasCheck }) =>
    $hasCheck
      ? 'rgb(47, 52, 56)'
      : 'rgb(255, 119, 119)'};
`;
const InputGuide = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
  color: rgb(130, 140, 148);
  letter-spacing: -0.3px;
`;
const LoginNavigate = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  p {
    color: rgb(66, 66, 66);
    font-size: 15px;
    text-align: center;
  }
`;
const SignUpSelectBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px 1fr;
  height: 100%;
  span {
    text-align: center;
    line-height: 40px;
    color: #dbdbdb;
  }
`;
const SignSelectBox = styled.select<{
  $hasValue: boolean;
}>`
  display: block;
  padding: 8px 15px 9px;
  border: ${({ $hasValue }) =>
    $hasValue
      ? '1px solid #dbdbdb'
      : '1px solid red'};
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 21px;
  border-radius: 4px;
`;
const CustomEmailButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0px;
  font-size: 14px;
  transform: translateY(-50%);
`;
const CustomEmailContainer = styled.div`
  position: relative;
`;
const ErrorMassage = styled.div`
  padding-top: 10px;
  font-size: 12px;
  line-height: 18px;
  color: rgb(255, 119, 119);
`;

function SignUp() {
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

  const [hasEmail, setHasEmail] =
    useState<boolean>(true);
  const [hasEmailCheck, setHasEmailCheck] =
    useState<boolean>(true);
  const [hasPassword, setHasPassword] =
    useState<boolean>(true);
  const [hasPasswordCheck, setHasPasswordCheck] =
    useState<boolean>(true);
  const [hasNickName, setHasNickName] =
    useState<boolean>(true);

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

  const handleEmailChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    if (signUpIdcheck(value)) {
      return;
    }
    if (value.includes('@')) {
      await setSelectEmail('직접입력');
      emailCheckInputRef.current?.focus();
    } else {
      setUser({ ...user, email: value });
      setHasEmail(false);
    }
    !value
      ? setHasEmail(false)
      : setHasEmail(true);
  };
  const handlePasswordChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    await setUser({ ...user, password: value });
    !value
      ? setHasPassword(false)
      : pwCheck(user.password)
        ? setHasPassword(true)
        : setHasPassword(false);
    if (user.passwordCheck) {
      setHasPasswordCheck(false);
    }
  };
  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, passwordCheck: value });
    if (value === user.password) {
      setHasPasswordCheck(true);
    } else {
      setHasPasswordCheck(false);
    }
  };

  const handleNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, nickname: value });
    !value
      ? setHasNickName(false)
      : signUpNickNameCheck(user.nickname)
        ? setHasNickName(true)
        : setHasNickName(false);
  };
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
      user.email.trim() === '' ||
      emailCheck(user.email)
    ) {
      setHasEmail(false);
      emailInputRef.current?.focus();
      confirm = false;
    }
    if (SelectEmail.trim() === '') {
      setHasEmailCheck(false);
      emailCheckInputRef.current?.focus();
      confirm = false;
    }
    if (
      user.password.trim() === '' ||
      !pwCheck(user.password)
    ) {
      setHasPassword(false);
      passwordInputRef.current?.focus();
      confirm = false;
    }
    if (
      user.passwordCheck.trim() === '' ||
      !pwCheck(user.passwordCheck)
    ) {
      setHasPasswordCheck(false);
      passwordCheckInputRef.current?.focus();
      confirm = false;
    }
    if (
      user.nickname.trim() === '' ||
      !signUpNickNameCheck(user.nickname)
    ) {
      setHasNickName(false);
      nickNameInputRef.current?.focus();
      confirm = false;
    }
    if (!confirm) {
      return;
    }
    signUpMutation.mutate(confirmUser);
    navigate('/login');
  };

  const handleEmailSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    let { value } = e.target;

    setSelectEmail(value);
  };

  const handleCustomEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setCustomEmail(value);
    !value
      ? setHasEmailCheck(false)
      : signUpEmailcheck(customEmail)
        ? setHasEmailCheck(true)
        : setHasEmailCheck(false);
  };

  const handleCustomEmailResetClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setSelectEmail('');
    setCustomEmail('');
  };

  return (
    <SignLayoutContainer>
      <Link to="/">
        <HomeIcon width={88} height={31} />
      </Link>
      <SignContainer>
        <SignUpTitle>회원가입</SignUpTitle>
        <BorderLine></BorderLine>
        <form>
          <SignUpInputWarpper>
            <InputLabel $hasCheck={hasEmail}>
              이메일
            </InputLabel>
            <SignUpSelectBox>
              <Input
                type="text"
                value={user.email}
                onChange={handleEmailChange}
                $hasCheck={hasEmail}
                $hasValue={signUpIdcheck(
                  user.email,
                )}
                ref={emailInputRef}
              />
              <span>@</span>
              {SelectEmail !== '직접입력' ? (
                <SignSelectBox
                  onChange={
                    handleEmailSelectChange
                  }
                  value={SelectEmail}
                  $hasValue={hasEmail}
                >
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  <option value="naver.com">
                    naver.com
                  </option>
                  <option value="gmail.com">
                    gmail.com
                  </option>
                  <option value="icloud.com">
                    icloud.com
                  </option>
                  <option value="직접입력">
                    직접입력
                  </option>
                </SignSelectBox>
              ) : (
                <CustomEmailContainer>
                  <Input
                    type="text"
                    value={customEmail}
                    ref={emailCheckInputRef}
                    onChange={
                      handleCustomEmailChange
                    }
                    placeholder="입력해주세요"
                    $hasCheck={hasEmailCheck}
                    $hasValue={signUpEmailcheck(
                      customEmail,
                    )}
                  />
                  <CustomEmailButton
                    onClick={
                      handleCustomEmailResetClick
                    }
                  >
                    x
                  </CustomEmailButton>
                </CustomEmailContainer>
              )}
            </SignUpSelectBox>
          </SignUpInputWarpper>

          <SignUpInputWarpper>
            <InputLabel
              $hasCheck={
                hasPassword ||
                pwCheck(user.password)
              }
            >
              비밀번호
            </InputLabel>
            <InputGuide>
              영문, 숫자를 포함한 8자 이상의
              비밀번호를 입력해주세요.
            </InputGuide>
            <Input
              type="password"
              value={user.password}
              onChange={handlePasswordChange}
              placeholder="비밀번호"
              $hasCheck={hasPassword}
              $hasValue={pwCheck(user.password)}
              ref={passwordInputRef}
            />
            {user.password &&
              !pwCheck(user.password) && (
                <ErrorMassage>
                  영문 대, 소문자 숫자를 포함하여
                  8자 이상이어야 합니다.
                </ErrorMassage>
              )}
          </SignUpInputWarpper>
          <SignUpInputWarpper>
            {/* 추가작업 필요 */}
            <InputLabel
              $hasCheck={
                hasPasswordCheck ||
                (user.passwordCheck !== '' &&
                  user.password ===
                    user.passwordCheck)
              }
            >
              비밀번호 확인
            </InputLabel>
            <Input
              type="password"
              value={user.passwordCheck}
              onChange={handlePasswordCheckChange}
              placeholder="비밀번호 확인"
              $hasCheck={hasPasswordCheck}
              $hasValue={
                user.passwordCheck !== '' &&
                user.password ===
                  user.passwordCheck
              }
              ref={passwordCheckInputRef}
            />
            {!hasPasswordCheck &&
              user.password !==
                user.passwordCheck && (
                <ErrorMassage>
                  비밀번호가 일치하지 않습니다.
                </ErrorMassage>
              )}
          </SignUpInputWarpper>
          <SignUpInputWarpper>
            <InputLabel
              $hasCheck={
                hasNickName ||
                signUpNickNameCheck(user.nickname)
              }
            >
              닉네임
            </InputLabel>
            <InputGuide>
              다른 유저와 겹치지 않도록
              입력해주세요 (2~20자)
            </InputGuide>
            <Input
              type="text"
              value={user.nickname}
              onChange={handleNicknameChange}
              placeholder="별명 (2~20자)"
              $hasCheck={hasNickName}
              $hasValue={signUpNickNameCheck(
                user.nickname,
              )}
              ref={nickNameInputRef}
            />
          </SignUpInputWarpper>
          <Button onClick={handleSignUpClick}>
            회원가입하기
          </Button>
        </form>
        <LoginNavigate>
          <p>이미 아이디가 있으신가요?</p>
          <LoginLink to="/login">
            로그인
          </LoginLink>
        </LoginNavigate>
      </SignContainer>
    </SignLayoutContainer>
  );
}

export default SignUp;
