import styled from "styled-components";

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  .spantext {
    font-size: 15px;
    font-weight: 700;
    margin: 30px 0 15px 0;
  }
  .reviewInput {
    width: 638px;
    height: 110px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    margin-bottom: 34px;
    padding: 0 15px;
    line-height: 40px;
  }
`;

export const StarBox = styled.div`
  display: flex;
  justify-content: center;
`;
export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.35;
  font-weight: 700;
  text-align: center;
  font-size: 20px;
  height: 50px;
`;

export const Sbmitbutton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 668px;
  height: 45px;
  background-color: #35c5f0;
  border-color: #35c5f0;
  color: #fff;
  border-radius: 4px;
`;

export const FlexCloumBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .brandname {
    font-size: 11px;
    color: rgb(117, 117, 117);
    margin-bottom: 6px;
  }

  .productname {
    margin-bottom: 6px;
    font-size: 15px;
    line-height: 1.2;
  }
`;

export const ReviewProduct = styled.div`
  display: flex;
  align-items: center;
`;
export const ImgBox = styled.div`
  height: 100px;
  width: 125px;
  margin: 0 15px 0 0;
  > img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;
