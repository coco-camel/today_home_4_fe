import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Input = styled.input<{
  $hasValue: boolean;
}>`
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 13px 15px 14px;
  border: ${({ $hasValue }) =>
    $hasValue
      ? '1px solid #dbdbdb'
      : '1px solid red'};
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 21px;
  position: relative;
  margin-top: -1px;
  z-index: 1;
  &:focus {
    box-shadow: ${({ $hasValue }) =>
      $hasValue
        ? '0 0 0 3px rgba(53, 197, 240, 0.3)'
        : '0 0 0 3px rgba(255, 119, 119, 0.3)'};
    z-index: 2;
  }
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
export const LoginContainer = styled.div`
  width: 300px;
  padding: 40px 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  color: #757575;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
`;
export const LinkWarpper = styled.div`
  margin-bottom: 30px;
`;
export const LoginForm = styled.form`
  input {
    &:nth-child(1) {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    &:nth-child(2) {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;
