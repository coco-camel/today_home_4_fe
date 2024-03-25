import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
    position: relative;
  //height: 533px;
`;

export const ProductSpan = styled.span`
  font-size: 22px;
  line-height: 33px;
`;

export const BrandName = styled.span`
  color: #656e75;
  font-size: 14px;
  margin-bottom: 13px;
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
  .Sp {
    border-radius: 5px;
    background-color: #ff7777;
    color: white;
    height: 22px;
  }
`;
export const Box = styled.div`
  margin: 10px 0 2px 0;
  .discount {
    color: #656e75;
    font-size: 30px;
    line-height: 19px;
    line-height: 1;
    color: #35c5f0;
    font-weight: 900;
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
    cursor: pointer;
  }
  .review {
    font-size: 18px;
  }
`;

export const ReivewWrap = styled.div`
  display: flex;

  padding: 0 270px;

  * {
    font-family: 'Pretendard Medium';
  }
`;

export const ReviewBlock = styled.div`
  display: flex;
    margin-top: 400px;
`;

export const SpaceBtween = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const CouponBox = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 250, 255);
  padding: 16px 15px;
  margin: 18px 0 5px 0;

  .coupon {
    color: rgb(9, 96, 156);
    font-size: 13px;
    line-height: 18px;
    font-weight: 600;
  }
  .couponText {
    color: rgb(9, 96, 156);
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    padding-left: 24px;
    word-break: break-all;
  }
  .text {
    margin-left: 8px;
  }
`;

export const BrandNamm = styled.div`
  margin-left: 5px;
  color: rgb(82, 91, 97);
`;
export const Brandbutton = styled.button`
  border-radius: 5px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-basis: auto;
  flex-shrink: 0;
  width: 86px;
  padding: 4px 8px 4px 15px;
  border-radius: 14px;
  background-color: rgb(245, 245, 245);
  font-size: 13px;
  color: rgb(130, 140, 148);

  &:hover {
    background-color: #dadce0;
  }
`;

export const Line = styled.hr`
  border: 1px solid #ededed;
  margin-top: 18px;
  width: 480px;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;

  > button {
    margin-top: 20px;
    border: 1px solid gainsboro;
    border-radius: 4px;
    height: 38px;
    width: 100%;
    color: #424242;
    font-size: 15px;
    line-height: 21px;
    display: inline-block;
  }

  > div {
    margin-top: 25px;
    padding: 24px 0;
    height: 148px;
    width: 100%;
    background-color: #f7f8fa;
    border-radius: 8px;
  }
`;

export const StarBox = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
  align-items: center;
  justify-content: center;

  > h2 {
    display: inline-block;
    font-size: 34px;
    margin-left: 12px;
    font-weight: 700;
    color: #424242;
  }
`;
export const RivScor = styled.div`
  height: 100%;
  width: 224px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ReviewStar = styled.div`
  display: flex;
    margin-bottom: 10px;
`;

export const RivDetailBox = styled.div`
  display: flex;
  align-items: center;

  .bar5 {
    height: 5px;
    display: inline-block;
    border-radius: 10px;
    background-color: #dadce0;
    width: calc(100% - 70px);
    margin: 0 5px 0 5px;
  }
  > p {
    display: inline-block;
    color: #9e9e9e;
    font-size: 12px;
    font-weight: 400;
    padding-top: 4px;
  }
  .bar2 {
    position: absolute;
    border-radius: 10px;
    display: inline-block;
    background-color: #35c5f0;
    max-width: 100%;
    width: 1%;
    height: 5px;
    margin-left: 20px;
  }
  .bar3 {
    height: 5px;
    display: inline-block;
    background-color: #dadce0;
    border-radius: 10px;
    width: calc(100% - 70px);
    margin: 0 5px 0 5px;
  }
  .bar1 {
    position: absolute;
    border-radius: 10px;
    display: inline-block;
    background-color: #35c5f0;
    max-width: 100%;
    width: 4.7%;
    height: 5px;
    margin-left: 20px;
  }
  .bar4 {
    height: 5px;
    display: inline-block;
    background-color: #dadce0;
    border-radius: 10px;
    width: calc(100% - 70px);
    margin: 0 5px 0 5px;
  }
`;



export const ReviewPr = styled.div `
display: flex;
    align-items: center;
`

export const Cloum = styled.div`
display: flex;flex-direction: column;
    margin-left: 8px;
    .margin{
        margin-bottom: 6px;
    }
    .flex{
        display: flex;
        align-content: center;
    }
    
    .create{
        margin: 2px 0 0 10px;
        font-size: 15px;
    }
`

export const ReiveOutput = styled.div`
    margin-top: 20px;
.space{
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 13px;
    color: #757575;
}
`;

export const RevieCont = styled.div`
    font-size: 15px;
    line-height: 21px;
    letter-spacing: normal;
    color: #424242;
    margin: 20px 0 8px 0;
`
export const Line1 = styled.hr`
  border: 1px solid #ededed;
  margin-top: 18px;
  width: 100%;
`;

export const ReivewBar = styled.div `
    background-color: #f7f8fa;
    height: 51px;
    font-size: 15px;
    width: 100%;
    position: absolute;
    top: 900px;
    left: 0;
    border: 1px solid #dadce0;
    
   
    
    
    .rv{
        display: flex;
        max-width: 32px;
        margin-left: 654px;
        width: 80px;
        align-items: center;
        height: 100%;
        color: #35c5f0;
        border-bottom: 2px solid #35c5f0;
        z-index: 1;
    }
`