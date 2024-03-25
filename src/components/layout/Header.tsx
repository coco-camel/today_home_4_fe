import React, { useState } from 'react';
import styled from 'styled-components';
import ArroDownIcon from '../../assets/icons/simple-line-icons_arrow-up.svg';
import HomeLogo from '../../assets/icons/homelogo.svg';
import ScrapIcon from '../../assets/icons/scrapIcon.svg';
import { Link } from 'react-router-dom';
import HeaderModal from '../modal/headerModal/HeaderModal';
import useUserStore from '../../store/userStore';
import { CgProfile } from 'react-icons/cg';

interface ModalWarpProps {
  $isOpen: boolean;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = useUserStore(
    (state) => state.isLoggedIn,
  );

  const HandleMyPageClick = () => {
    setIsOpen(true);
  };

  return (
    <HeaderWrap>
      <HeaderTop>
        <StickyHeader>
          <MainHeader>
            <Logo>
              <Link to="/">
                <h1>
                  <img src={HomeLogo} alt="" />
                </h1>
              </Link>
            </Logo>
            <Nav>
              <ul>
                <li>
                  <Link to="/">쇼핑</Link>
                </li>
              </ul>
            </Nav>
            <UserActs>
              {!isLoggedIn ? (
                <MemberShip>
                  <Link to="/login">로그인</Link>
                  <Link to="/signup">
                    회원가입
                  </Link>
                </MemberShip>
              ) : (
                <MyPages>
                  <ScrapBookLink>
                    <Link
                      to="/mypage"
                      aria-label="스크랩북 페이지 링크 버튼"
                    >
                      <img
                        src={ScrapIcon}
                        alt=""
                      />
                    </Link>
                  </ScrapBookLink>
                  <MypageBtn>
                    <MyPageBtn
                      onClick={HandleMyPageClick}
                      aria-label="마이페이지 모달 버튼"
                    >
                      <MyImg>
                        <CgProfile
                          size={'100px'}
                          color={'#757575'}
                        />
                      </MyImg>
                    </MyPageBtn>
                  </MypageBtn>
                </MyPages>
              )}
              <ModalWarp $isOpen={isOpen}>
                {/* <ModalPortal> */}
                <HeaderModal
                  closeModal={() =>
                    setIsOpen(false)
                  }
                />
                {/* </ModalPortal> */}
              </ModalWarp>
              <WriteBtn>
                <button>
                  <span>글쓰기</span>
                  <ArrowDownIcon>
                    <img
                      src={ArroDownIcon}
                      alt=""
                    />
                  </ArrowDownIcon>
                </button>
              </WriteBtn>
            </UserActs>
          </MainHeader>
        </StickyHeader>
      </HeaderTop>
      <HeaderBottom>
        <SubStickyHeader>
          <SubHeader>
            <ul>
              <li>
                <Link to="/">쇼핑홈</Link>
              </li>
            </ul>
          </SubHeader>
        </SubStickyHeader>
      </HeaderBottom>
    </HeaderWrap>
  );
};

const MyImg = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ModalWarp = styled.div<ModalWarpProps>`
  visibility: ${({ $isOpen }) =>
    $isOpen ? 'visible' : 'hidden'};
  opacity: ${({ $isOpen }) =>
    $isOpen ? '1' : '0'};
  transform: ${({ $isOpen }) =>
    $isOpen
      ? 'translate(0, 12px)'
      : 'translate(0, 0)'};
  transition:
    transform 0.4s ease,
    opacity 0.4s ease,
    visibility 0.4s ease;
`;
const MyPageBtn = styled.button`
  border-radius: 100%;
  width: 50px;
  height: 50px;
`;
const HeaderWrap = styled.header`
  position: relative;
`;
const HeaderTop = styled.header`
  height: 81px;
`;
const MainHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 1256px;
  padding: 0 60px;
  margin: 0 auto;
  height: 80px;
`;
const StickyHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  transition: top 0.1s ease 0s;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  z-index: 2000;
`;
const Logo = styled.div`
  h1 {
    font-size: 25px;
    font-weight: 700;
  }
`;
const Nav = styled.nav`
  margin-left: 40px;
  flex: 1 1 0;
  ul {
    display: flex;
    align-items: center;
    gap: 30px;
    a {
      font-size: 18px;
      color: #222;
      font-weight: 700;
      &:hover {
        color: #35c5f0;
      }
    }
  }
`;
const UserActs = styled.div`
  display: flex;
  align-items: center;
`;
const MyPages = styled.div`
  display: flex;
  align-items: center;
  margin: 0 40px 0 8px;
`;
const ScrapBookLink = styled.div`
  margin: 0 10px;
`;
const MypageBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;
const MemberShip = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px 0 8px;
  :nth-child(1) {
    border-left: none;
  }
  a {
    border-left: 1px solid #eaedef;
    font-size: 14px;
    color: #2f3438;
    padding: 0 10px;
  }
`;
const WriteBtn = styled.div`
  button {
    display: flex;
    align-items: center;
    background: #35c5f0;
    padding: 0 16px;
    height: 40px;
    border-radius: 4px;
    gap: 6px;
    span {
      font-size: 14px;
      color: #fff;
    }
    &:hover {
      background: #009fce;
    }
  }
`;
const ArrowDownIcon = styled.span`
  width: 14px;
  img {
    width: 100%;
    margin: -2px;
  }
`;
const HeaderBottom = styled.header`
  height: 52px;
`;
const SubHeader = styled.div`
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
      position: relative;
      a {
        display: flex;
        align-items: center;
        position: relative;
        font-size: 16px;
        height: inherit;
        color: #35c5f0;
        font-weight: 700;
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: #35c5f0;
      }
    }
  }
`;
const SubStickyHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 81px;
  transition: top 0.1s ease 0s;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  z-index: 1000;
`;
export default Header;
