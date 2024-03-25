// 영문 대+소문자+숫자 조합  8~20 자리
export const pwCheck = (pw: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/;
  return passwordRegex.test(pw);
};

// @제외 특수문자 체크
export const signUpIdcheck = (id: string) => {
  const signUpIdRegex =
    /^([!#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]+)$/;
  return signUpIdRegex.test(id);
};

// ~.~ 형식체크
export const signUpEmailcheck = (id: string) => {
  const signUpEmailcheck =
    /^[a-zA-Z]+\.[a-zA-Z]+$/;
  return signUpEmailcheck.test(id);
};

// ~~@~~.~~ 이메일 형식 체크
export const emailCheck = (id: string) => {
  const emailCheck =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailCheck.test(id);
};

// 한/영/숫자
export const signUpNickNameCheck = (
  id: string,
) => {
  const signUpNickNameCheck =
    /^([ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*)*$/;
  return signUpNickNameCheck.test(id);
};
