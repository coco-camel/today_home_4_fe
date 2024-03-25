import React from 'react';
import * as S from './SignUpFormStyle';
import {
  signUpEmailcheck,
  signUpIdcheck,
} from '../../../utils/regex/regex';
import { useSignUpContext } from './SignUpContext';
interface EmailInputProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
  emailCheckInputRef: React.RefObject<HTMLInputElement>;
}

function EmailInput({
  emailInputRef,
  emailCheckInputRef,
}: EmailInputProps) {
  const {
    user,
    setUser,
    selectEmail,
    setSelectEmail,
    customEmail,
    setCustomEmail,
    hasEmail,
    setHasEmail,
    hasEmailCheck,
    setHasEmailCheck,
    emailChecked,
    setEmailChecked,
  } = useSignUpContext();

  const handleEmailChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setEmailChecked(false);
    if (signUpIdcheck(value)) {
      return;
    }
    if (value.includes('@')) {
      await setSelectEmail('직접입력');
      emailCheckInputRef.current?.focus();
      return;
    }
    value
      ? setHasEmail(true)
      : setHasEmail(false);
    setUser((prev) => ({
      ...prev,
      email: value,
    }));
  };
  const handleEmailSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e.target;
    setSelectEmail(value);
  };

  const handleCustomEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    value
      ? setHasEmailCheck(true)
      : setHasEmailCheck(false);
    setCustomEmail(value);
  };

  const handleCustomEmailResetClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setSelectEmail('');
    setCustomEmail('');
  };
  return (
    <S.SignUpInputWarpper>
      <S.InputLabel $hasCheck={hasEmail}>
        이메일
      </S.InputLabel>
      <S.SignUpSelectBox>
        <S.Input
          type="text"
          value={user.email}
          onChange={handleEmailChange}
          $hasCheck={hasEmail}
          $hasValue={!signUpIdcheck(user.email)}
          ref={emailInputRef}
        />
        <span>@</span>
        {selectEmail !== '직접입력' ? (
          <S.SignSelectBox
            onChange={handleEmailSelectChange}
            value={selectEmail}
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
              $hasValue={signUpEmailcheck(
                customEmail,
              )}
            />
            <S.CustomEmailButton
              onClick={
                handleCustomEmailResetClick
              }
            >
              x
            </S.CustomEmailButton>
          </S.CustomEmailContainer>
        )}
      </S.SignUpSelectBox>
      {emailChecked && (
        <S.ErrorMassage>
          이미 가입된 이메일입니다.
        </S.ErrorMassage>
      )}
    </S.SignUpInputWarpper>
  );
}

export default React.memo(EmailInput);
