import React, { useState } from 'react';
import styled from 'styled-components';
import FilterButton from './FilterButton';
import productAPI from '../../apis/product';
import {
  useInfiniteQuery,
  useMutation,
  // useQueryClient,
} from '@tanstack/react-query';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/product/product.interface';
import bookMarkAPI from '../../apis/bookmark';
// import InfiniteScroll from 'react-infinite-scroll-component';

const Products = () => {
  // 전체상품 조회
  const getProductAll = async (page: number) => {
    const { data } =
      await productAPI.getProductAll(page);

    return data.data.products;
  };

  // 무한스크롤
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam }) =>
      getProductAll(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.nextCursor,
  });

  // 북마크 등록
  const addBookMark = async (
    productId: number,
  ) => {
    const { data } =
      await bookMarkAPI.addBookMark(productId);
    return data.data;
  };
  const { mutate: createMutate } = useMutation({
    mutationFn: addBookMark,
    onSuccess: () => {},
  });
  // 북마크 삭제
  // const delBookMark = async(
  //   productId:number,
  // ) => {
  //   const { data } =
  //     await bookMarkAPI.delBookMark(productId);
  //   return data.data;
  // }
  //  const { mutate: deleteMutate } = useMutation({
  //    mutationFn: delBookMark,
  //    onSuccess: () => {},
  //  });
  const handleBookmarkClick = (
    productId: number,
  ) => {
    createMutate(productId);
    //  deleteMutate(productId);
  };

  // 무료배송 분류
  const [isFreeDelivery, setIsFreeDelivery] =
    useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const handleFreeDeliveryClick = (
    isFreeDelivery: boolean,
  ) => {
    setIsFreeDelivery(!isFreeDelivery);
  };

  // if (!products) {
  //   return <div>Loading...</div>;
  // }
  // if (isLoading) return <h3>로딩중</h3>;
  // if (isError)
  //   return <h3>잘못된 데이터 입니다.</h3>;

  return (
    <ProductSection>
      <h1>인기 상품</h1>
      <FilterButton
        onFreeDeliveryClick={
          handleFreeDeliveryClick
        }
        isTrue={isFreeDelivery}
      />
      {/* <InfiniteScroll
        hasMore={hasNextPage}
        next={() => fetchNextPage()}
      > */}
      <ProductWrap>
        <ProductList>
          {data.map((product: Product) => (
            <ProductItem key={product.productId}>
              <Link
                to={`detail/${product.productId}`}
              ></Link>
              <ImgWrap>
                <img
                  src={product.imageUrl}
                  alt=""
                />
                <ScrapBtn>
                  <button
                    onClick={() =>
                      handleBookmarkClick(
                        product.productId,
                      )
                    }
                  ></button>
                </ScrapBtn>
              </ImgWrap>
              <ItemInfo>
                <ItemInfoHeader>
                  <em>{product.brand}</em>
                  <span>{product.name}</span>
                </ItemInfoHeader>
                <ItemPrice>
                  <span>
                    {product.discount}
                    <span>%</span>
                  </span>
                  <span>
                    {product.price
                      .toString()
                      .replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ',',
                      )}
                  </span>
                </ItemPrice>
                <ItemState>
                  <p>
                    <span>
                      {product.averageRating.toFixed(
                        1,
                      )}
                    </span>
                    <span>
                      리뷰 {product.countReview}
                    </span>
                  </p>
                </ItemState>
                <ItemBadgeWrap>
                  <DeliveryBadge>
                    무료배송
                  </DeliveryBadge>
                  <SaleBadge>특가</SaleBadge>
                </ItemBadgeWrap>
              </ItemInfo>
            </ProductItem>
          ))}
        </ProductList>
      </ProductWrap>
      {/* </InfiniteScroll> */}
    </ProductSection>
  );
};
const ProductSection = styled.div`
  width: 100%;
  max-width: 1256px;
  padding: 0 60px;
  margin: 50px auto 0;
  h1 {
    font-size: 20px;
    font-weight: 700;
    color: #000;
    margin-bottom: 14px;
  }
`;
const ProductWrap = styled.div`
  margin-top: 15px;
`;
const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 20px;
`;
const ProductItem = styled.li`
  position: relative;
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
const ImgWrap = styled.picture`
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
const ScrapBtn = styled.div`
  button {
    width: 24px;
    height: 24px;
    background: red;
  }
  display: block;
  position: absolute;

  bottom: 12px;
  right: 12px;
  z-index: 11;
  transition: opacity 0.1s;
  cursor: pointer;
`;
const ItemInfo = styled.div`
  padding: 9px 10px;
`;
const ItemInfoHeader = styled.div`
  em {
    display: block;
    font-style: normal;
    color: #828c94;
    font-size: 11px;
  }
  span {
    display: block;
    margin-top: 5px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.2;
    color: #000;
  }
`;
const ItemPrice = styled.div`
  margin-top: 5px;
  span {
    font-size: 17px;
    font-weight: 700;
    color: #35c5f0;
    + span {
      display: inline-block;
      margin-left: 5px;
      color: #000;
    }
  }
`;
const ItemState = styled.div`
  margin-top: 3px;
  p span {
    margin-right: 5px;
    color: #424242;
    font-weight: 700;
    font-size: 12px;
    + span {
      color: #9e9e9e;
    }
  }
`;
const ItemBadgeWrap = styled.div`
  display: flex;
  margin-top: 5px;
  gap: 4px;
  em {
    font-size: 11px;
  }
`;
const DeliveryBadge = styled.em`
  font-style: normal;
`;
const SaleBadge = styled.em`
  font-style: normal;
`;
export default Products;
