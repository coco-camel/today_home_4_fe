import React, { useRef, useState } from 'react';
import { useSignUp } from '../../../hooks/mutations/user/userMutation';
import { Link, useNavigate } from 'react-router-dom';
import {
  emailCheck,
  pwCheck,
  signUpEmailcheck,
  signUpIdcheck,
  signUpNickNameCheck,
} from '../../common/regex/regex';
import { SignUpUser } from '../../../interfaces/user/user.interface';
import HomeIcon from '../../../assets/HomeIcon';
import * as S from './SignUpFormStyle';
import { nickNameConfirm } from '../../../apis/login';

function SignupForm() {
  const [user, setUser] = useState<SignUpUser>({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });
  const [SelectEmail, setSelectEmail] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const signUpMutation = useSignUp();

  const [hasEmail, setHasEmail] = useState(true);
  const [hasEmailCheck, setHasEmailCheck] = useState(true);
  const [hasPassword, setHasPassword] = useState(true);
  const [hasPasswordCheck, setHasPasswordCheck] = useState(true);
  const [hasNickName, setHasNickName] = useState(true);

  // const [nickNameCheck, setNickNameCheck] = useState(true);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const emailCheckInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const passwordCheckInputRef = useRef<HTMLInputElement | null>(null);
  const nickNameInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (signUpIdcheck(value)) {
      return;
    }
    if (value.includes('@')) {
      await setSelectEmail('직접입력');
      // useEffect
      emailCheckInputRef.current?.focus();
    } else {
      setUser((prev) => ({
        ...prev,
        email: value,
      }));
      setHasEmail(false);
    }
    !value ? setHasEmail(false) : setHasEmail(true);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser((prev) => ({
      ...prev,
      password: value,
    }));
    // prev => {user: prev.user, password: value}
    !value
      ? setHasPassword(false)
      : // const hasEmail = email.length !== 0
        pwCheck(user.password)
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

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser({ ...user, nickname: value });
    !value
      ? setHasNickName(false)
      : signUpNickNameCheck(user.nickname)
        ? setHasNickName(true)
        : setHasNickName(false);

    if (value && value.length >= 2) {
      nickNameConfirm({
        type: 'nickname',
        value: value,
      });
    }
  };
  const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

    if (user.nickname.trim() === '' || !signUpNickNameCheck(user.nickname)) {
      setHasNickName(false);
      nickNameInputRef.current?.focus();
      confirm = false;
    }
    if (user.passwordCheck.trim() === '' || !pwCheck(user.passwordCheck)) {
      setHasPasswordCheck(false);
      passwordCheckInputRef.current?.focus();
      confirm = false;
    }
    if (user.password.trim() === '' || !pwCheck(user.password)) {
      setHasPassword(false);
      passwordInputRef.current?.focus();
      confirm = false;
    }
    if (SelectEmail.trim() === '') {
      setHasEmailCheck(false);
      emailCheckInputRef.current?.focus();
      confirm = false;
    }
    if (user.email.trim() === '' || emailCheck(user.email)) {
      setHasEmail(false);
      emailInputRef.current?.focus();
      confirm = false;
    }

    if (!confirm) {
      return;
    }
    signUpMutation.mutate(confirmUser);
    navigate('/login');
  };

  const handleEmailSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSelectEmail(value);
  };

  const handleCustomEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <S.SignLayoutContainer>
      <S.HomeLogo>
        <Link to="/">
          <HomeIcon width={88} height={31} />
        </Link>
      </S.HomeLogo>
      <S.SignContainer>
        <S.SignUpTitle>회원가입</S.SignUpTitle>
        <S.BorderLine></S.BorderLine>
        <form>
          <S.SignUpInputWarpper>
            <S.InputLabel $hasCheck={hasEmail}>이메일</S.InputLabel>
            <S.SignUpSelectBox>
              <S.Input
                type="text"
                value={user.email}
                onChange={handleEmailChange}
                $hasCheck={hasEmail}
                $hasValue={signUpIdcheck(user.email)}
                ref={emailInputRef}
              />
              <span>@</span>
              {SelectEmail !== '직접입력' ? (
                <S.SignSelectBox
                  onChange={handleEmailSelectChange}
                  value={SelectEmail}
                  $hasValue={hasEmail}
                >
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="icloud.com">icloud.com</option>
                  <option value="직접입력">직접입력</option>
                </S.SignSelectBox>
              ) : (
                <S.CustomEmailContainer>
                  <S.Input
                    type="text"
                    value={customEmail}
                    ref={emailCheckInputRef}
                    onChange={handleCustomEmailChange}
                    placeholder="입력해주세요"
                    $hasCheck={hasEmailCheck}
                    $hasValue={signUpEmailcheck(customEmail)}
                  />
                  <S.CustomEmailButton onClick={handleCustomEmailResetClick}>
                    x
                  </S.CustomEmailButton>
                </S.CustomEmailContainer>
              )}
            </S.SignUpSelectBox>
          </S.SignUpInputWarpper>

          <S.SignUpInputWarpper>
            <S.InputLabel $hasCheck={hasPassword || pwCheck(user.password)}>
              비밀번호
            </S.InputLabel>
            <S.InputGuide>
              영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
            </S.InputGuide>
            <S.Input
              type="password"
              value={user.password}
              onChange={handlePasswordChange}
              placeholder="비밀번호"
              $hasCheck={hasPassword}
              $hasValue={pwCheck(user.password)}
              ref={passwordInputRef}
            />
            {user.password && !pwCheck(user.password) && (
              <S.ErrorMassage>
                영문 대, 소문자 숫자를 포함하여 8자 이상이어야 합니다.
              </S.ErrorMassage>
            )}
          </S.SignUpInputWarpper>
          <S.SignUpInputWarpper>
            {/* 추가작업 필요 */}
            <S.InputLabel
              $hasCheck={
                hasPasswordCheck ||
                (user.passwordCheck !== '' &&
                  user.password === user.passwordCheck)
              }
            >
              비밀번호 확인
            </S.InputLabel>
            <S.Input
              type="password"
              value={user.passwordCheck}
              onChange={handlePasswordCheckChange}
              placeholder="비밀번호 확인"
              $hasCheck={hasPasswordCheck}
              $hasValue={
                user.passwordCheck !== '' &&
                user.password === user.passwordCheck
              }
              ref={passwordCheckInputRef}
            />
            {!hasPasswordCheck && user.password !== user.passwordCheck && (
              <S.ErrorMassage>비밀번호가 일치하지 않습니다.</S.ErrorMassage>
            )}
          </S.SignUpInputWarpper>
          <S.SignUpInputWarpper>
            <S.InputLabel
              $hasCheck={hasNickName || signUpNickNameCheck(user.nickname)}
            >
              닉네임
            </S.InputLabel>
            <S.InputGuide>
              다른 유저와 겹치지 않도록 입력해주세요 (2~20자)
            </S.InputGuide>
            <S.Input
              type="text"
              value={user.nickname}
              onChange={handleNicknameChange}
              placeholder="별명 (2~20자)"
              $hasCheck={hasNickName}
              $hasValue={signUpNickNameCheck(user.nickname)}
              ref={nickNameInputRef}
            />
          </S.SignUpInputWarpper>
          <S.Button onClick={handleSignUpClick}>회원가입하기</S.Button>
        </form>
        <S.LoginNavigate>
          <p>이미 아이디가 있으신가요?</p>
          <S.LoginLink to="/login">로그인</S.LoginLink>
        </S.LoginNavigate>
      </S.SignContainer>
    </S.SignLayoutContainer>
  );
}

export default SignupForm;
