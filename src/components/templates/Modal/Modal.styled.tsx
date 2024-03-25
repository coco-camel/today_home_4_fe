import styled, { css } from 'styled-components';
import { SizeProps } from '../../../interfaces/styled/styled.interface';
import { SizeFunc } from '../../../utils/styled';

export const ModalWrap = styled.div<SizeProps>(
  (props) => css`
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 10000;
    transform: translate(-50%, -50%);
    padding: 25px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #fff;

    ${SizeFunc(props)}
  `,
);

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
`;

export const Dimmed = styled.div(
  () => css`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
  `,
);
