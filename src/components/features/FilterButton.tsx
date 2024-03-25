import React from 'react';
import styled, { css } from 'styled-components';

interface FilterButtonProps {
  onFreeDeliveryClick: (
    //* eslint 문제 isTrue is defined but nerver used 에러문제로 인해 아래 주석사용해서 eslint 제어
    // eslint-disable-next-line no-unused-vars
    isTrue: boolean,
  ) => void;
  isTrue: boolean;
}
const FilterButton = ({
  onFreeDeliveryClick,
  isTrue,
}: FilterButtonProps) => {
  return (
    <FilterBtnWrap>
      <FilterBtns $isTrue={isTrue}>
        <FreeDeliveryBtn className="free-delivery__btn">
          <span>배송</span>
          <span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.06903 6.72L10.192 2.937L11.408 4.263L6.08803 9.144L0.603027 4.273L1.79903 2.927L6.06903 6.72Z"
                fill="#757575"
              />
            </svg>
          </span>
        </FreeDeliveryBtn>
        <FreeDeliveryModal>
          <button
            onClick={() =>
              onFreeDeliveryClick(isTrue)
            }
          >
            <span>무료배송만 보기</span>
            <CheckedBox className="free-delivery__check-btn"></CheckedBox>
          </button>
        </FreeDeliveryModal>
      </FilterBtns>
    </FilterBtnWrap>
  );
};

const FilterBtnWrap = styled.div`
  display: flex;
  align-items: center;
`;
const FilterBtns = styled.div<{
  $isTrue: boolean;
}>`
  position: relative;
  ${(props) =>
    props.$isTrue &&
    css`
      .free-delivery__btn {
        background: #e8f4fb;
        color: #35c5f0;
        path {
          fill: #35c5f0;
        }
      }
      .free-delivery__check-btn {
        transition: all 0.2s ease-in-out;
        background: #35c5f0;
        &::before {
          content: '';
          display: block;
          transform: translateX(28px);
          transition: all 0.1s ease-in-out;
        }
      }
    `}
`;
const FreeDeliveryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 15px;
  line-height: 19px;
  padding: 7px 8px 6px;
  border-radius: 4px;
  background: #f5f5f5;
  border-color: #f5f5f5;
  color: #757575;
`;
const FreeDeliveryModal = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);
  width: 190px;
  height: 50px;
  background: #fff;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  z-index: 100;
  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  span {
    font-size: 14px;
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    width: 15px;
    height: 15px;
    background: #fff;
  }
`;
const CheckedBox = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
  background: #ebebeb;
  border-radius: 30px;
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background: #fff;
    top: 4px;
    transform: translateX(5px);
    transition: all 0.1s ease-in-out;
  }
`;

export default FilterButton;
