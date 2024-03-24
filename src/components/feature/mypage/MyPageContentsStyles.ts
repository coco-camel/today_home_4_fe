import styled from 'styled-components';

export const ImgWrap = styled.picture`
  display: block;
  position: relative;
  background-color: #f5f5f5;
  padding-bottom: 100%;
  border-radius: 4px;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.2s;
    width: 100%;
  }
`;
export const ScrapItem = styled.li`
  position: relative;
  min-width: 150px;
  a {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  &:hover {
    img {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
`;
export const ScrapList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 20px;
`;
export const ScrapProductWrap = styled.div`
  margin: 40px 0;
`;
export const SubHeader = styled.div`
  width: 100%;
  max-width: 1256px;
  padding: 0 60px;
  margin: 0 auto;
  ul {
    display: flex;
    align-items: center;
    gap: 15px;
    li {
      height: 51px;
      a {
        display: flex;
        align-items: center;
        font-size: 16px;
        height: inherit;
        color: #35c5f0;
        font-weight: 700;
      }
      &::after {
        content: '';
        display: block;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: #35c5f0;
      }
    }
  }
`;
export const ScrapBottom = styled.header`
  border-bottom: 1px solid #f1f1f1;
  width: 100%;
`;

export const ScrapWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const UserNickName = styled.div`
  font-size: 20px;
  color: rgb(47, 52, 56);
  font-weight: bold;
  margin-top: 7px;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const MyPageSection = styled.div`
  width: 100%;
  max-width: 1256px;
  padding: 0 60px;
  margin: 50px auto 0;
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: rgb(47, 52, 56);
    margin-bottom: 14px;
  }
`;

export const UserWarp = styled.div`
  margin: 40px 0px;
`;
