import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modules/modal';
import { IoMdClose } from 'react-icons/io';

const ModalCloseButton = () => {
  const dispatch = useDispatch();
  const onCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <ModalCloseButtonStyle onClick={onCloseModal}>
      <span className={'hidden'}>
        <IoMdClose size={24} />
      </span>
    </ModalCloseButtonStyle>
  );
};

export default ModalCloseButton;

const ModalCloseButtonStyle = styled.button`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border: 0px;
  cursor: pointer;
`;
