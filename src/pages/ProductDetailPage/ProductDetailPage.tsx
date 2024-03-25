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
import { useMutation, useQuery } from '@tanstack/react-query';
import { selectiveproduct } from '../../apis/productDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaRegBookmark } from "react-icons/fa";
import {
  Container,
  ContentBox,
  Wrap,
} from './ProductDetailPage2.styled';
import Flex from '../../components/layer/Flex';
import { TbHome } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import {
  ReivewBar,
  RevieCont,
} from './ProductDetailPage.styled';

import {
  Box,
  Brandbutton,
  BrandName,
  BrandNamm,
  BrandWrap,
  Center,
  CouponBox,
  FlexWrap,
  Line,
  ProductSpan,
  ReiveOutput,
  ReivewWrap,
  ReviewBlock,
  ReviewBox,
  ReviewPr,
  ReviewStar,
  RivDetailBox,
  RivScor,
  StarBox,
} from './ProductDetailPage.styled';

import { GoStarFill } from 'react-icons/go';
import { RiCoupon2Line } from 'react-icons/ri';
import { Cloum } from './ProductDetailPage.styled';
import { Line1 } from './ProductDetailPage.styled';
import useUserStore from '../../store/userStore';
import bookMarkAPI from '../../apis/bookmark';


function ProductDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: { modal: ModalState }) =>
      state.modal.isOpen,
  );

  const isLoggedIn = useUserStore(
    (state) => state.isLoggedIn,
  );
  const [targetData, setTargetData] =
    useState<any>();

  const { data } = useQuery({
    queryKey: [
      'getProductDetail',
      params?.productId,
    ],
    queryFn: () =>
      selectiveproduct(`${params?.productId}`),
    select: (response) => response.data,
    enabled: !!params.productId,
  });

  const navigate = useNavigate()
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const addBookMark = async (
    productId: number,
  ) => {
    const { data } =
      await bookMarkAPI.addBookMark(productId);
    return data.data;
  };
  const { mutate: createMutate } = useMutation({
    mutationFn: addBookMark,
    onSuccess: (
    ) => {console.log('성공')},
  });

  const handleBookmarkClick = (
    productId: number,
  ) => {
    createMutate(productId);
    navigate('/');
  };

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
          targetReviewData={targetData}
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
                <FaRegBookmark
                  size={'28px'}
                  onClick={() =>
                    handleBookmarkClick(
                      Number(params?.productId),
                    )
                  }
                />
              </Flex>atp
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
                  <div className={'Box'}>
                    <div className={'review'}>
                      리뷰
                    </div>
                  </div>
                  {isLoggedIn && (
                    <div
                      className={'reviewrite'}
                      onClick={
                        handleClickShowModal
                      }
                    >
                      리뷰 작성
                    </div>
                  )}
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
              <Line1></Line1>
              <div>
                {data?.reviews &&
                !!data.reviews.length ? (
                  data.reviews.map(
                    (review, index) => (
                      <ReiveOutput key={index}>
                        <ReviewPr>
                          <div>
                            <CgProfile
                              size={'24px'}
                              color={'#757575'}
                            />
                          </div>
                          <div
                            className={'space'}
                          >
                            <Cloum>
                              <span
                                className={
                                  'margin'
                                }
                              >
                                {review.nickname}
                              </span>
                              <div className={'flex'}>
                                <span className="review">
                                {Array(review.rating)
                                  .fill(null)
                                  .map((_, index) => (
                                    <GoStarFill
                                      key={index}
                                      color={'#35c5f0'}
                                      size={'21px'}
                                    />
                                  ))}
                              </span>
                                <span className={'create'}>{review.createdAt}</span>
                              </div>
                            </Cloum>
                            <span
                              onClick={() => {
                                setTargetData(
                                  review,
                                );
                                dispatch(
                                  openModal(),
                                );
                              }}
                            >
                              수정하기
                            </span>
                          </div>
                        </ReviewPr>
                        <RevieCont>
                          {review.contents}
                        </RevieCont>
                        <Line1></Line1>
                      </ReiveOutput>
                    ),
                  )
                ) : (
                  <div>
                    리뷰가 존재하지 않습니다.
                  </div>
                )}
              </div>
            </Container>
          </ReivewWrap>
        </Container>
        <ReivewBar>
          <div className={'rv'}>리뷰</div>
        </ReivewBar>
      </Wrap>
    </>
  );
}

export default ProductDetailPage;
