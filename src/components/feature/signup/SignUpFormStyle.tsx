import { Link } from 'react-router-dom';
import styled from 'styled-components';
export const Input = styled.input<{
  $hasValue: boolean;
  $hasCheck: boolean;
}>`
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 8px 15px 9px;
  border: ${({ $hasValue, $hasCheck }) =>
    $hasValue && $hasCheck
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
      $hasValue && $hasCheck
        ? '0 0 0 3px rgba(53, 197, 240, 0.3)'
        : '0 0 0 3px rgba(255, 119, 119, 0.3)'};

    z-index: 2;
  }
`;
export const SignContainer = styled.div`
  width: 360px;
  padding: 60px 0;
  display: flex;
  margin: 0px auto;
  flex-direction: column;
`;
export const SignLayoutContainer = styled.div`
  padding-top: 40px;
`;
export const Button = styled.button`
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
export const LoginLink = styled(Link)`
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
  padding-left: 10px;
`;
export const SignUpTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;
export const BorderLine = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 30px;
  border-bottom: 1px solid #dbdbdb;
`;
export const SignUpInputWarpper = styled.div`
  margin-bottom: 30px;
`;
export const InputLabel = styled.div<{
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
export const InputGuide = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
  color: rgb(130, 140, 148);
  letter-spacing: -0.3px;
`;
export const LoginNavigate = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  p {
    color: rgb(66, 66, 66);
    font-size: 15px;
    text-align: center;
  }
`;
export const SignUpSelectBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px 1fr;
  height: 100%;
  span {
    text-align: center;
    line-height: 40px;
    color: #dbdbdb;
  }
`;
export const SignSelectBox = styled.select<{
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
export const CustomEmailButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0px;
  font-size: 14px;
  transform: translateY(-50%);
`;
export const CustomEmailContainer = styled.div`
  position: relative;
`;
export const ErrorMassage = styled.div`
  padding-top: 10px;
  font-size: 12px;
  line-height: 18px;
  color: rgb(255, 119, 119);
`;
export const HomeLogo = styled.div`
  margin: 0 15px;
`;
