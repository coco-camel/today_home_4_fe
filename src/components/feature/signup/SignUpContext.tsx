import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { SignUpUser } from '../../../interfaces/user/user.interface';

interface SignUpContextType {
  user: SignUpUser;
  setUser: React.Dispatch<
    React.SetStateAction<SignUpUser>
  >;
  selectEmail: string;
  setSelectEmail: React.Dispatch<
    React.SetStateAction<string>
  >;
  customEmail: string;
  setCustomEmail: React.Dispatch<
    React.SetStateAction<string>
  >;
  hasEmail: boolean;
  setHasEmail: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  hasEmailCheck: boolean;
  setHasEmailCheck: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  emailChecked: boolean;
  setEmailChecked: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  hasNickName: boolean;
  setHasNickName: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setNickNameChecked: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  nickNameChecked: boolean;
  hasPassword: boolean;
  setHasPassword: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  hasPasswordCheck: boolean;
  setHasPasswordCheck: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const defaultValue: SignUpContextType = {
  user: {
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  },
  setUser: () => {},
  selectEmail: '',
  setSelectEmail: () => {},
  customEmail: '',
  setCustomEmail: () => {},
  hasEmail: true,
  setHasEmail: () => {},
  hasEmailCheck: true,
  setHasEmailCheck: () => {},
  emailChecked: false,
  setEmailChecked: () => {},
  hasNickName: true,
  setHasNickName: () => {},
  setNickNameChecked: () => {},
  nickNameChecked: false,
  hasPassword: true,
  setHasPassword: () => {},
  hasPasswordCheck: true,
  setHasPasswordCheck: () => {},
};

const SignUpContext =
  createContext<SignUpContextType>(defaultValue);

interface SignUpProviderProps {
  children: ReactNode;
}

export function useSignUpContext() {
  return useContext(SignUpContext);
}

export const SignUpProvider: React.FC<
  SignUpProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<SignUpUser>(
    defaultValue.user,
  );
  const [hasNickName, setHasNickName] =
    useState(true);
  const [nickNameChecked, setNickNameChecked] =
    useState(false);
  const [selectEmail, setSelectEmail] =
    useState<string>(defaultValue.selectEmail);
  const [customEmail, setCustomEmail] =
    useState<string>(defaultValue.customEmail);
  const [hasEmail, setHasEmail] =
    useState<boolean>(defaultValue.hasEmail);
  const [hasEmailCheck, setHasEmailCheck] =
    useState<boolean>(defaultValue.hasEmailCheck);
  const [emailChecked, setEmailChecked] =
    useState<boolean>(defaultValue.emailChecked);
  const [hasPassword, setHasPassword] =
    useState(true);
  const [hasPasswordCheck, setHasPasswordCheck] =
    useState(true);

  const value = {
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
    hasNickName,
    setHasNickName,
    setNickNameChecked,
    nickNameChecked,
    hasPassword,
    setHasPassword,
    hasPasswordCheck,
    setHasPasswordCheck,
  };

  return (
    <SignUpContext.Provider value={value}>
      {children}
    </SignUpContext.Provider>
  );
};
