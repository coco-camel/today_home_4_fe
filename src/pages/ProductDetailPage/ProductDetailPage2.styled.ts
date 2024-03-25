import styled, { css } from 'styled-components';
import {
  MarginProps,
  SizeProps,
} from '../../interfaces/styled/styled.interface';
import {
  MarginFunc,
  SizeFunc,
} from '../../utils/styled';

export const Wrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  justify-content: center;
  padding: 0 60px;

  * {
    font-family: 'Pretendard Medium';
  }
`;

export const ContentBox = styled.div<
  SizeProps & MarginProps
>(
  (props) => css`
    ${SizeFunc(props)}
    ${MarginFunc(props)}
  `,
);

export const Container = styled.div`
  width: 1136px;
  box-sizing: border-box;
  ${ContentBox} {
    > img {
      width: calc(100% - 70px);
      min-width: 550px;
      max-width: 550px;
      border-radius: 8px;
    }
    .header {
      max-width: 500px;
      .title {
        width: 100%;
        margin-right: 60px;
        > span {
          margin-bottom: 4px;
        }
        > strong {
          font-size: 24px;
        }
      }
      > button {
        width: 40px;
        height: 60px;
      }
    }

    .buyButton {
      width: 240px;
      border: 1px solid black;
      height: 56px;
      background-color: #35c5f0;
      border-color: #35c5f0;
      color: #fff;
      line-height: 26px;
      border-radius: 4px;
      font-size: 17px;
      &:hover {
        background-color: #09addb;
      }
    }
    .baButton {
      width: 240px;
      margin-right: 20px;
      border: 1px solid #35c5f0;
      border-radius: 4px;
      height: 56px;
      margin-right: 20px;
      background-color: #fff;
      border-color: #35c5f0;
      color: #35c5f0;
      font-size: 17px;
    }
  }
  .text {
    font-size: 14px;
    line-height: 20px;
  }
  .number {
    font-size: 20px;
    line-height: 28px;
  }
`;
