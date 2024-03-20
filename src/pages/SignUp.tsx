import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import type { SignUpUser } from '../interfaces/user/user.interface';
import { useSignUp } from '../hooks/mutations/user/userMutation';
import { Link } from 'react-router-dom';
import HomeIcon from '../assets/HomeIcon';
import styled from 'styled-components';

const Input = styled.input`
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 8px 15px 9px;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 21px;
  position: relative;
  border-radius: 4px;
  &:focus {
    box-shadow: 0 0 0 3px rgba(53, 197, 240, 0.3);
    z-index: 1;
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
    filter: brightness(0.9);
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
const InputLabel = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  color: rgb(47, 52, 56);
  letter-spacing: -0.3px;
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
const SignSelectBox = styled.select`
  display: block;
  padding: 8px 15px 9px;
  border: 1px solid #dbdbdb;
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
  const inputRef =
    useRef<HTMLInputElement | null>(null);

  const handleEmailChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    if (value.includes('@')) {
      await setSelectEmail('직접입력');
      inputRef.current?.focus();
    } else {
      setUser({ ...user, email: value });
    }
  };
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, password: value });
  };
  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, passwordCheck: value });
  };
  const handleNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setUser({ ...user, nickname: value });
  };
  const handleSignUpClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const emailUse =
      SelectEmail === '직접입력'
        ? `${user.email}@${customEmail}`
        : `${user.email}@${SelectEmail}`;
    const confirmUser = {
      ...user,
      email: emailUse,
    };
    console.log(confirmUser);
    signUpMutation.mutate(confirmUser);
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
  };

  const handleCustomEmailResetClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setSelectEmail('');
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
            <InputLabel>이메일</InputLabel>
            <SignUpSelectBox>
              <Input
                type="text"
                value={user.email}
                onChange={handleEmailChange}
                placeholder="이메일"
              />
              <span>@</span>
              {SelectEmail !== '직접입력' ? (
                <SignSelectBox
                  className="emailBox"
                  onChange={
                    handleEmailSelectChange
                  }
                >
                  <option value="">
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
                    ref={inputRef}
                    onChange={
                      handleCustomEmailChange
                    }
                    placeholder="입력해주세요"
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
            <InputLabel>비밀번호</InputLabel>
            <InputGuide>
              영문, 숫자를 포함한 8자 이상의
              비밀번호를 입력해주세요.
            </InputGuide>
            <Input
              type="password"
              value={user.password}
              onChange={handlePasswordChange}
              placeholder="비밀번호"
            />
          </SignUpInputWarpper>
          <SignUpInputWarpper>
            <InputLabel>비밀번호 확인</InputLabel>
            <Input
              type="password"
              value={user.passwordCheck}
              onChange={handlePasswordCheckChange}
              placeholder="비밀번호 확인"
            />
          </SignUpInputWarpper>
          <SignUpInputWarpper>
            <InputLabel>닉네임</InputLabel>
            <InputGuide>
              다른 유저와 겹치지 않도록
              입력해주세요 (2~20자)
            </InputGuide>
            <Input
              type="text"
              value={user.nickname}
              onChange={handleNicknameChange}
              placeholder="별명 (2~20자)"
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
