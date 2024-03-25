import React from 'react';
import * as S from './SignUpFormStyle';
import { pwCheck } from '../../../utils/regex/regex';
import { useSignUpContext } from './SignUpContext';

interface PasswordInputProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
  passwordCheckInputRef: React.RefObject<HTMLInputElement>;
}

function PasswordInput({
  passwordInputRef,
  passwordCheckInputRef,
}: PasswordInputProps) {
  const {
    user,
    setUser,
    hasPassword,
    setHasPassword,
    hasPasswordCheck,
    setHasPasswordCheck,
  } = useSignUpContext();
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    const isValidPassword = pwCheck(value);
    setHasPassword(isValidPassword);

    const isPasswordCheckValid =
      value === user.passwordCheck;
    setHasPasswordCheck(
      isPasswordCheckValid ||
        user.passwordCheck.trim() === '',
    );

    setUser((prev) => ({
      ...prev,
      password: value,
    }));
  };
  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    const isPasswordCheckValid =
      user.password === value;
    setHasPasswordCheck(isPasswordCheckValid);

    setUser((prev) => ({
      ...prev,
      passwordCheck: value,
    }));
  };

  return (
    <>
      <S.SignUpInputWarpper>
        <S.InputLabel
          $hasCheck={
            (user.password.length === 0 ||
              pwCheck(user.password)) &&
            hasPassword
          }
        >
          비밀번호
        </S.InputLabel>
        <S.InputGuide>
          영문, 숫자를 포함한 8자 이상의
          비밀번호를 입력해주세요.
        </S.InputGuide>
        <S.Input
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          $hasCheck={hasPassword}
          $hasValue={
            pwCheck(user.password) ||
            user.password.length === 0
          }
          ref={passwordInputRef}
        />
        {user.password &&
          !pwCheck(user.password) && (
            <S.ErrorMassage>
              영문 대, 소문자 숫자를 포함하여 8자
              이상이어야 합니다.
            </S.ErrorMassage>
          )}
      </S.SignUpInputWarpper>
      <S.SignUpInputWarpper>
        <S.InputLabel
          $hasCheck={hasPasswordCheck}
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
            user.passwordCheck ===
              user.password ||
            user.passwordCheck.length === 0
          }
          ref={passwordCheckInputRef}
        />
        {!hasPasswordCheck &&
          user.password !==
            user.passwordCheck && (
            <S.ErrorMassage>
              비밀번호가 일치하지 않습니다.
            </S.ErrorMassage>
          )}
      </S.SignUpInputWarpper>
    </>
  );
}

export default React.memo(PasswordInput);
