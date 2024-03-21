export const pwCheck = (pw: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/;
  return passwordRegex.test(pw);
};

export const signUpIdcheck = (id: string) => {
  const signUpIdRegex =
    /^[!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/;
  return signUpIdRegex.test(id);
};

export const signUpEmailcheck = (id: string) => {
  const signUpEmailcheck =
    /^[a-zA-Z]+\.[a-zA-Z]+$/;
  return signUpEmailcheck.test(id);
};

export const emailCheck = (id: string) => {
  const emailCheck =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailCheck.test(id);
};

export const signUpNickNameCheck = (
  id: string,
) => {
  const signUpNickNameCheck =
    /^([ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,20})$/;
  return signUpNickNameCheck.test(id);
};
