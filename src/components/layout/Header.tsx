import React from 'react';
import styled from 'styled-components';
import ArroDownIcon from '../../assets/icons/simple-line-icons_arrow-up.svg';
import HomeLogo from '../../assets/icons/homelogo.svg';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/mutations/user/userMutation';

const Header = () => {
  const isLogined: string = localStorage.getItem(
    'accessToken',
  ) as string;
  const logoutMutation = useLogout();
  const handleLogoutClick = () => {
    logoutMutation.mutate();
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
              {!isLogined ? (
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
                      to=""
                      aria-label="스크랩북 페이지 링크 버튼"
                    >
                      ㅎㅎ
                    </Link>
                  </ScrapBookLink>
                  <MypageBtn>
                    <button aria-label="마이페이지 모달 버튼">
                      ㅎㅎ
                    </button>
                  </MypageBtn>
                  <button
                    onClick={handleLogoutClick}
                  >
                    로그아웃
                  </button>
                </MyPages>
              )}
              <WriteBtn>
                <button>
                  <span>글쓰기</span>
                  <ArrowDwonIcon>
                    <img
                      src={ArroDownIcon}
                      alt=""
                    />
                  </ArrowDwonIcon>
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
  z-index: 1000;
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
  margin: 0 10px 0 8px;
`;
const ScrapBookLink = styled.div``;
const MypageBtn = styled.div``;
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
const ArrowDwonIcon = styled.span`
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
