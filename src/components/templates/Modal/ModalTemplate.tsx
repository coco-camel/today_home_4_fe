import React from 'react';
import { SizeProps } from '../../../interfaces/styled/styled.interface';
import {
  ModalHeader,
  ModalWrap,
} from './Modal.styled';
import ModalCloseButton from '../../button/ModalCloseButton';
import { ModalTemplateProps } from '../../../interfaces/modal/ModalTemplate.interface';

const ModalTemplate = ({
  children,
  ...styled
}: SizeProps & ModalTemplateProps) => {
  return (
    <ModalWrap {...styled}>
      <ModalHeader>
        <ModalCloseButton />
      </ModalHeader>
      {children}
    </ModalWrap>
  );
};

export default ModalTemplate;
