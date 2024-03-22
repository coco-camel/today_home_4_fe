import React, { useEffect } from 'react';
/*import {
  Box,
  BrandName,
  BrandWrap, Container,
  FlexBox,
  FlexWrap, Line, ProductBody,
  ProductContainer,
  ProductSpan, ReviewBox,
  Wrap,
} from './ProductDetailPage.styled';*/
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
import {
  Container,
  ContentBox,
  Wrap,
} from './ProductDetailPage2.styled';
import Flex from '../../components/layer/Flex';
import {
  Box,
  BrandName,
  BrandWrap,
  FlexContainer,
  FlexWrap,
  ProductSpan,
  ReivewWrap,
  ReviewBlock,
  ReviewBox,
  SpaceBtween,
} from './ProductDetailPage.styled';
import { GoStarFill } from 'react-icons/go';

function ProductDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: { modal: ModalState }) =>
      state.modal.isOpen,
  );

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

  //디테일 정보 콜백
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
      {isOpen && <ReviewModal />}
      <Header />
      <Wrap>
        <Container>
          <Flex $width={'100%'}>
            <ContentBox
              $marginRight={'10px'}
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
              <FlexContainer
                className={'content'}
              >
                <FlexWrap>
                  <div>
                    <GoStarFill />
                    <GoStarFill />
                    <GoStarFill />
                    <GoStarFill />
                    <GoStarFill />
                  </div>
                  <div>리뷰</div>
                </FlexWrap>
                <Box>
                  <span className={'discount'}>
                    {data?.product.discount}%
                  </span>
                </Box>
                <FlexWrap>
                  <div className={'price'}>
                    {formattedPrice}
                  </div>
                  <div className={'won'}>원</div>
                  <div className={'Sp'}>특가</div>
                </FlexWrap>
                <FlexWrap>
                  <div className={'Delivery'}>
                    배송
                  </div>
                  <div
                    className={'DeliveryContent'}
                  >
                    무료배송
                  </div>
                </FlexWrap>
                <BrandWrap>
                  <div>오디너리라이프</div>
                  <button>브랜드 홈</button>
                </BrandWrap>
              </FlexContainer>
            </ContentBox>
          </Flex>
        </Container>
      </Wrap>
      <ReivewWrap>
        <Container>
          <ReviewBox>
            <span className={'review'}>리뷰</span>
            <span
              className={'reviewrite'}
              onClick={handleClickShowModal}
            >
              리뷰쓰기
            </span>
          </ReviewBox>
          <ReviewBlock>
            <div>
              <div>프로필</div>
            </div>
            <div>
              <span>닉네임</span>
              <div>별</div>
            </div>
          </ReviewBlock>
          <div>리뷰</div>
        </Container>
      </ReivewWrap>
    </>
  );
}

export default ProductDetailPage;
