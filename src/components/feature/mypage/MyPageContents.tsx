import React, {
  useEffect,
  useState,
} from 'react';
import { CgProfile } from 'react-icons/cg';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import * as S from './MyPageContentsStyles';
import MyPageScrapList from './MyPageScrapList';
import useUserStore from '../../../store/userStore';

interface MyJwtPayload {
  nickname: string;
}

function MyPageContents() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = useUserStore(
    (state) => state.isLoggedIn,
  );
  useEffect(() => {
    const accessToken = localStorage.getItem(
      'accessToken',
    );
    if (accessToken) {
      const jwt = jwtDecode(
        accessToken.substring(7),
      ) as MyJwtPayload;
      setNickname(jwt.nickname);
    }
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <S.MyPageSection>
      <S.UserWarp>
        <h1>스크랩북</h1>
        <S.User>
          <CgProfile
            size={'80px'}
            color={'#757575'}
          />
          <S.UserNickName>
            {nickname}
          </S.UserNickName>
        </S.User>
      </S.UserWarp>
      <S.ScrapWrap>
        <S.ScrapBottom>
          <S.SubHeader>
            <ul>
              <li>
                <Link to="#">모두</Link>
              </li>
            </ul>
          </S.SubHeader>
        </S.ScrapBottom>
      </S.ScrapWrap>
      <MyPageScrapList />
    </S.MyPageSection>
  );
}

export default MyPageContents;
