import React, { useEffect, useRef } from 'react';
import { useLogout } from '../../../hooks/mutations/user/userMutation';
import styled from 'styled-components';

interface HeaderModalProps {
  closeModal: () => void;
}

function HeaderModal({
  closeModal,
}: HeaderModalProps) {
  const logoutMutation = useLogout();
  const modalRef = useRef<HTMLDivElement>(null);
  const handleCloseModal = (e: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      closeModal();
    }
  };

  const handleLogoutClick = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      handleCloseModal,
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleCloseModal,
      );
    };
  }, []);

  return (
    <div ref={modalRef}>
      <ModalWrap>
        <Modal>
          <MyBtn>HeaderModal</MyBtn>
          <MyBtn>HeaderModal</MyBtn>
          <MyBtn>HeaderModal</MyBtn>
          <MyBtn>HeaderModal</MyBtn>
          <MyBtn
            onClick={() => {
              handleLogoutClick(), closeModal();
            }}
          >
            로그아웃
          </MyBtn>
        </Modal>
      </ModalWrap>
    </div>
  );
}

export default HeaderModal;

const ModalWrap = styled.div`
  position: relative;
  padding: 8px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(218, 221, 224);
  border-radius: 6px;
  box-shadow: rgba(63, 71, 77, 0.2) 0px 4px 10px
    0px;
  transform: translateY(
    ${($moveDown) =>
      $moveDown ? '0px' : '-20px'}
  );
  transition: transform 1s ease;
`;
const Modal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: white;
  border-radius: 5px;
  z-index: 2500;
  width: 180px;
  box-shadow: rgba(63, 71, 77, 0.2) 0px 4px 10px
    0px;
  transform: translate(-70px, -10px);
`;
const MyBtn = styled.div`
  position: relative;
  padding: 10px 14px 11px;
  border: none;
  color: rgb(47, 52, 56);
  font-size: 15px;
  text-align: left;
  cursor: pointer;
`;
