import React, {
  useEffect,
  useState,
} from 'react';
import ReviewModal from '../../components/modal/ReviewMadal/ReviewModal';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { openModal } from '../../redux/modules/modal';
import { ModalState } from '../../interfaces/productDetail/productDetail.interface';
import Header from '../../components/layout/Header';
import { useQuery } from '@tanstack/react-query';
import { selectiveproduct } from '../../apis/productDetail';
import { useParams } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import {
  Container,
  ContentBox,
  Wrap,
} from './ProductDetailPage2.styled';
import Flex from '../../components/layer/Flex';
import { TbHome } from 'react-icons/tb';
import {
  Box,
  Brandbutton,
  BrandName,
  BrandNamm,
  BrandWrap,
  Center,
  CouponBox,
  FlexContainer,
  FlexWrap,
  Line,
  ProductSpan,
  ReiveOutput,
  ReivewWrap,
  ReviewBlock,
  ReviewBox,
  ReviewStar,
  RivDetailBox,
  RivScor,
  SpaceBtween,
  StarBox,
} from './ProductDetailPage.styled';
import { GoStarFill } from 'react-icons/go';
import { RiCoupon2Line } from 'react-icons/ri';
import { number } from 'prop-types';

function ProductDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: { modal: ModalState }) =>
      state.modal.isOpen,
  );
  const [targetData, setTargetData] = useState();

  const { isLoading, isError, data } = useQuery({
    queryKey: [
      'getProductDetail',
      params?.productId,
    ],
    queryFn: () =>
      selectiveproduct(`${params?.productId}`),
    select: (response) => response.data,
    enabled: !!params.productId,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const handleClickShowModal = () => {
    dispatch(openModal());
  };

  const price: number | undefined =
    data?.product.price;

  const formattedPrice: string | undefined =
    price?.toLocaleString();

  return (
    <>
      {isOpen && (
        <ReviewModal
        // targetReviewData={{
        //   contents: data?.review.contents,
        //   nickname: data?.review.nickname,
        //   rating: data?.review.rating,
        // }}
        />
      )}
      <Wrap>
        <Header />
        <Container>
          <Flex
            $width={'100%'}
            $marginTop={'30px'}
          >
            <ContentBox
              $marginRight={'5px'}
              style={{ flex: 1 }}
            >
              <img src={data?.product.imageUrl} />
            </ContentBox>
            <ContentBox>
              <Flex
                className={'header'}
                $ac={true}
                $width={'100%'}
                $js={true}
                $marginBottom={'4px'}
              >
                <Flex
                  className={'title'}
                  $dc={true}
                >
                  <BrandName>
                    {data?.product.brand}
                  </BrandName>
                  <ProductSpan>
                    {data?.product.name}
                  </ProductSpan>
                </Flex>
                <button>찜</button>
              </Flex>
              <Flex
                $dc={true}
                $js={true}
                $height={'calc(100% - 96px)'}
                style={{
                  boxSizing: 'border-box',
                }}
              >
                <Flex $dc={true}>
                  <div>
                    <GoStarFill
                      color={'#35c5f0'}
                    />
                    <GoStarFill
                      color={'#35c5f0'}
                    />
                    <GoStarFill
                      color={'#35c5f0'}
                    />
                    <GoStarFill
                      color={'#35c5f0'}
                    />
                    <GoStarFill
                      color={'#35c5f0'}
                    />
                  </div>
                  <Box>
                    <span className={'discount'}>
                      {data?.product.discount}%
                    </span>
                  </Box>
                  <FlexWrap>
                    <div className={'price'}>
                      {formattedPrice}
                    </div>
                    <div className={'won'}>
                      원
                    </div>
                    <button className={'Sp'}>
                      특가
                    </button>
                  </FlexWrap>
                  <CouponBox>
                    <span className={'coupon'}>
                      <Flex>
                        <RiCoupon2Line
                          size={'16px'}
                        />
                        <span className={'text'}>
                          쿠폰 할인 상품이 있어요!
                        </span>
                      </Flex>
                    </span>
                    <span
                      className={'couponText'}
                    >
                      아래 상품 리스트에서 상품별
                      쿠폰 정보를 확인하세요.
                    </span>
                  </CouponBox>
                  <FlexWrap>
                    <div className={'Delivery'}>
                      배송
                    </div>
                    <div
                      className={
                        'DeliveryContent'
                      }
                    >
                      무료배송
                    </div>
                  </FlexWrap>
                  <Line></Line>
                  <BrandWrap>
                    <Flex>
                      <TbHome
                        color={'rgb(82, 91, 97)'}
                      />
                      <BrandNamm>
                        {data?.product.brand}
                      </BrandNamm>
                    </Flex>
                    <Brandbutton>
                      브랜드홈
                      <MdOutlineKeyboardArrowRight
                        size={'18px'}
                      />
                    </Brandbutton>
                  </BrandWrap>
                </Flex>
                {/*<SpaceBtween>*/}
                {/*  <button>*/}
                {/*    <span></span>*/}
                {/*    <span>쿠폰받기</span>*/}
                {/*  </button>*/}
                {/*</SpaceBtween>*/}
                {/*<SpaceBtween>*/}
                {/*  <span className={'text'}>*/}
                {/*    주문금액*/}
                {/*  </span>*/}
                {/*  <span className={'number'}>*/}
                {/*    0원*/}
                {/*  </span>*/}
                {/*</SpaceBtween>*/}
                <Flex>
                  <button className={'baButton'}>
                    장바구니
                  </button>
                  <button className={'buyButton'}>
                    바로 구매
                  </button>
                </Flex>
              </Flex>
            </ContentBox>
          </Flex>
          <ReivewWrap>
            <Container>
              <ReviewBlock>
                <ReviewBox>
                  <div className={'review'}>
                    리뷰
                  </div>
                  <div
                    className={'reviewrite'}
                    onClick={handleClickShowModal}
                  >
                    리뷰 작성
                  </div>
                </ReviewBox>
              </ReviewBlock>
              <Center>
                <ReviewStar>
                  <StarBox>
                    <GoStarFill
                      color={'#35c5f0'}
                      size={'21px'}
                    />
                    <GoStarFill
                      color={'#35c5f0'}
                      size={'21px'}
                    />
                    <GoStarFill
                      color={'#35c5f0'}
                      size={'21px'}
                    />
                    <GoStarFill
                      color={'#35c5f0'}
                      size={'21px'}
                    />
                    <GoStarFill
                      color={'#35c5f0'}
                      size={'21px'}
                    />
                    <h2>4.9</h2>
                  </StarBox>
                  <StarBox>
                    <RivScor>
                      <RivDetailBox>
                        <p>5점</p>
                        <div
                          className={'bar1'}
                        ></div>
                        <div
                          className={'bar4'}
                        ></div>
                        <p>0</p>
                      </RivDetailBox>
                      <RivDetailBox>
                        <p>4점</p>
                        <div
                          className={'bar2'}
                        ></div>
                        <div
                          className={'bar3'}
                        ></div>
                        <p>0</p>
                      </RivDetailBox>
                      <RivDetailBox>
                        <p>3점</p>
                        <div
                          className={'bar5'}
                        ></div>
                        <p>0</p>
                      </RivDetailBox>
                      <RivDetailBox>
                        <p>2점</p>
                        <div
                          className={'bar5'}
                        ></div>
                        <p>0</p>
                      </RivDetailBox>
                      <RivDetailBox>
                        <p>1점</p>
                        <div
                          className={'bar5'}
                        ></div>
                        <p>0</p>
                      </RivDetailBox>
                    </RivScor>
                  </StarBox>
                </ReviewStar>
              </Center>
              <div>
                {data?.reviews &&
                data.reviews.length > 0 ? (
                  data.reviews.map(
                    (review, index) => (
                      //키 값 바꿔
                      <ReiveOutput key={index}>
                        <span
                          onClick={() => {
                            setTargetData(review);
                            dispatch(openModal());
                          }}
                        >
                          수정하기
                        </span>
                        <div>프로필</div>
                        <span>
                          {review.nickname}
                        </span>
                        <span>
                          {review.contents}
                        </span>
                        <span className="review">
                          {review.rating}
                        </span>
                      </ReiveOutput>
                    ),
                  )
                ) : (
                  <div>
                    리뷰가 존재하지 않습니다.
                  </div>
                )}
                <div>별</div>
              </div>
            </Container>
          </ReivewWrap>
        </Container>
      </Wrap>
    </>
  );
}

export default ProductDetailPage;

//서버에 보내기전에 데이터를 담는다
//수정할 리뷰 데이터를 넘긴다
//팝업 띄우기
