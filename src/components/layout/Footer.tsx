import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Isms from '../../assets/images/isms.png';
import Dnv from '../../assets/images/dvn.png';
import Pcr from '../../assets/images/pcr.png';
import SnsIconFacebook from '../../assets/icons/facebook.svg';
import SnsIconInstagram from '../../assets/icons/insta.svg';
import SnsIconKakaoStory from '../../assets/icons/kakao.svg';
import SnsIconNaverPost from '../../assets/icons/naver.svg';
import SnsIconYoutube from '../../assets/icons/youtube.svg';

function Footer() {
  return (
    <FooterArea>
      <FooterInner>
        <Customer>
          <Link to="/">
            <h1>고객센터</h1>
          </Link>
          <Tel>
            <strong>1670-0876</strong>
            <span>09:00 ~ 18:00</span>
          </Tel>
          <ul>
            <li>평일: 전체 문의 상담</li>
            <li>
              토요일, 공휴일: 오늘내집 직접배송,
              이사/시공/제품설치 문의 상담
            </li>
            <li>일요일: 휴무</li>
          </ul>
          <EctCustomer>
            <Link to="#">
              카톡 상담(평일 09:00~18:00)
            </Link>
            <Link to="#">이메일 문의</Link>
          </EctCustomer>
        </Customer>
        <SectionLine />
        <Anchor>
          <li>
            <Link to="#">회사소개</Link>
          </li>
          <li>
            <Link to="#">채용정보</Link>
          </li>
          <li>
            <Link to="#">이용약관</Link>
          </li>
          <li>
            <Link to="#" className="point">
              개인정보처리방침
            </Link>
          </li>
          <li>
            <Link to="#">공지사항</Link>
          </li>
          <li>
            <Link to="#">안전거래센터</Link>
          </li>

          <li>
            <Link to="#">입점신청</Link>
          </li>
          <li>
            <Link to="#">제휴/광고 문의</Link>
          </li>
          <li>
            <Link to="#">시공파트너 안내</Link>
          </li>
          <li>
            <Link to="#">상품광고 소개</Link>
          </li>
          <li>
            <Link to="#">고객의 소리</Link>
          </li>
        </Anchor>
        <SectionLine />
        <Infomation>
          <CorpIntro>
            <ul>
              <li>(주)빠가사리</li>
              <li>대표이사 스폰지밥</li>
              <li>
                서울 서초구 서초대로74길 4
                삼성생명서초타워 25층, 27층
              </li>

              <li>contact@bucketplace.net</li>
              <li>
                사업자등록번호 119-86-91245{' '}
                <Link to="#">
                  <strong>사업자정보확인</strong>
                </Link>
              </li>

              <li>
                통신판매업신고번호
                제2018-서울서초-0580호
              </li>
            </ul>
            <p>
              고객님이 현금결제한 금액에 대해
              우리은행과 채무지급보증 계약을
              체결하 여 안전거래를 보장하고
              있습니다.
            </p>
          </CorpIntro>
          <Certificate>
            <li>
              <Link to="#">
                <img src={Isms} alt="" />
                <div>
                  <p>오늘내집 서비스 운영</p>
                  <p>
                    2021. 09. 08 ~ 2024. 09. 07
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src={Dnv} alt="" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src={Pcr} alt="" />
              </Link>
            </li>
          </Certificate>
          <div>
            <p>
              (주)버킷플레이스는 통신판매중개자로
              거래 당사자가 아니므로, 판매자가
              등록한 상품정보 및 거래 등에 대해
              책임을 지지 않습니다. 단,
              (주)버킷플레이스가 판매자로 등록
              판매한 상품은 판매자로서 책임을
              부담합니다.
            </p>
          </div>
          <SnsLink>
            <Link to="#">
              <img src={SnsIconYoutube} alt="" />
            </Link>
            <Link to="#">
              <img
                src={SnsIconInstagram}
                alt=""
              />
            </Link>
            <Link to="#">
              <img src={SnsIconFacebook} alt="" />
            </Link>
            <Link to="#">
              <img
                src={SnsIconKakaoStory}
                alt=""
              />
            </Link>
            <Link to="#">
              <img
                src={SnsIconNaverPost}
                alt=""
              />
            </Link>
          </SnsLink>
          <Copyright>
            Copyright 2014. bucketplace, Co., Ltd.
            All rights reserved.
          </Copyright>
        </Infomation>
      </FooterInner>
    </FooterArea>
  );
}
const SectionLine = styled.div`
  width: 1px;
  background: rgb(234, 237, 239);
`;
const FooterArea = styled.footer`
  width: 100%;
  margin: 0 auto;
  background: #f7f9fa;
  color: #2f3438;
  a {
    color: #2f3438;
  }
`;
const FooterInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 2fr;
  width: 100%;
  max-width: 1256px;
  padding: 40px 60px;
  margin: 0 auto;
  gap: 30px;
  background: #f7f9fa;
`;
const Customer = styled.div`
  > a {
    &:hover {
      text-decoration: underline;
    }
  }
  h1 {
    font-size: 18px;
    font-weight: 700;
  }
  ul {
    margin-top: 8px;
    li {
      line-height: 20px;
      font-size: 12px;
      position: relative;
      padding-left: 20px;
      &::after {
        display: block;
        content: '•';
        position: absolute;
        font-size: 10px;
        left: 7px;
        top: 0;
      }
    }
  }
`;
const Tel = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 6px;
  strong {
    font-size: 16px;
    font-weight: 700;
  }
  span {
    font-size: 14px;
  }
`;
const EctCustomer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-top: 12px;
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    border: 1px solid rgb(218, 221, 224);
    font-size: 14px;
    color: rgb(47, 52, 56);
    padding: 0 8px;
    border-radius: 4px;
    line-height: 20px;
    height: 32px;
  }
`;
const Anchor = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, min-content);
  grid-auto-flow: column;
  gap: 20px 10px;
  li {
    a {
      font-size: 12px;
      line-height: 16px;
      display: inline-flex;
      white-space: nowrap;
      color: rgb(47, 52, 56);
    }
    .point {
      font-weight: 700;
    }
  }
`;
const Infomation = styled.div`
  display: flex;
  line-height: 14px;
  flex-direction: column;
  gap: 12px;
  color: rgb(130, 140, 148);
  font-size: 10px;
`;
const CorpIntro = styled.div`
  overflow: hidden;
  ul {
    margin-left: -12px;
    li {
      display: inline-block;
      line-height: 20px;
      font-size: 12px;
      white-space: nowrap;
      position: relative;
      margin-left: 6px;
      padding-left: 6px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 4px;
        width: 1px;
        height: 11px;
        margin-right: 5px;
        background: rgb(130, 140, 148);
      }
      a {
        &:hover {
          text-decoration: underline;
        }
      }
      strong {
        font-size: 12px;
        color: rgb(130, 140, 148);
      }
    }
  }
  p {
    margin-top: 12px;
    font-size: 10px;
  }
`;
const Certificate = styled.ul`
  gap: 6px;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 102px;
    height: 38px;
    padding: 0 6px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    img {
      width: 32px;
    }
  }
  li a {
    display: flex;
    align-items: center;
    word-wrap: break-word;
    white-space: nowrap;
    gap: 5px;
    p {
      font-size: 10px;
      color: rgb(130, 140, 148);
    }
  }
  display: flex;
  + div p {
    font-size: 10px;
  }
`;
const SnsLink = styled.div`
  display: flex;
  gap: 12px;
  a {
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
`;
const Copyright = styled.p`
  font-size: 10px;
`;

export default Footer;
