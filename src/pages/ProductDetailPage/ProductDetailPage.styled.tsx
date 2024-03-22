import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //height: 533px;
`;

export const ProductSpan = styled.span`
  font-size: 22px;
  line-height: 33px;
`;

export const BrandName = styled.span`
  color: #656e75;
  font-size: 14px;
`;

export const FlexWrap = styled.div`
  display: flex;
  align-items: center;

  .Delivery {
    color: #828c94;
    font-size: 14px;
    margin-right: 9px;
    margin-top: 20px;
  }
  .DeliveryContent {
    font-weight: bold;
    font-size: 14px;
    margin-top: 20px;
  }
  .price {
    font-weight: 700;
    font-size: 32px;
    padding: 4px 4px 0 0;
  }
  .won {
    font-size: 24px;
    padding: 4px 4px 0 0;
  }
`;
export const Box = styled.div`
  .discount {
    color: #656e75;
    font-size: 16px;
    line-height: 19px;
  }
`;

export const BrandWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
`;

export const ReviewBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .reviewrite {
    color: #35c5f0;
  }
`;

export const ReivewWrap = styled.div`
  display: flex;

  padding: 0 60px;

  * {
    font-family: 'Pretendard Medium';
  }
`;

export const ReviewBlock = styled.div`
  display: flex;
`;

export const SpaceBtween = styled.div`
  display: flex;
  justify-content: space-between;
`;
