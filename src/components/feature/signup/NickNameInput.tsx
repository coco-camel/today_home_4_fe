import React from 'react';
import * as S from './SignUpFormStyle';
import { SignUpUser } from '../../../interfaces/user/user.interface';
import { signUpNickNameCheck } from '../../../utils/regex/regex';
import { duplicateTestConfirm } from '../../../apis/login';

interface NickNameInputProps {
  user: SignUpUser;
  setUser: React.Dispatch<
    React.SetStateAction<SignUpUser>
  >;
  hasNickName: boolean;
  setHasNickName: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setNickNameChecked: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  nickNameChecked: boolean;
  nickNameInputRef: React.MutableRefObject<HTMLInputElement | null>;
}
function NickNameInput({
  user,
  setUser,
  hasNickName,
  setHasNickName,
  setNickNameChecked,
  nickNameChecked,
  nickNameInputRef,
}: NickNameInputProps) {
  const handleNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    if (!signUpNickNameCheck(value)) {
      return;
    }
    if (value.length < 2 || value.length > 20) {
      setNickNameChecked(false);
      setHasNickName(false);
    }
    if (value.length >= 2 && value.length <= 20) {
      duplicateTestConfirm({
        type: 'nickname',
        value: value,
      }).then((result) => {
        setNickNameChecked(result);
        setHasNickName(!result);
      });
    }
    setUser((prev) => ({
      ...prev,
      nickname: value,
    }));
  };
  return (
    <S.SignUpInputWarpper>
      <S.InputLabel
        $hasCheck={
          hasNickName &&
          signUpNickNameCheck(user.nickname)
        }
      >
        닉네임
      </S.InputLabel>
      <S.InputGuide>
        다른 유저와 겹치지 않도록 입력해주세요
        (2~20자)
      </S.InputGuide>
      <S.Input
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
      {nickNameChecked && (
        <S.ErrorMassage>
          사용 중인 별명입니다.
        </S.ErrorMassage>
      )}
    </S.SignUpInputWarpper>
  );
}

export default React.memo(NickNameInput);
