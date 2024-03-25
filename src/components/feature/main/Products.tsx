/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
// import FilterButton from './FilterButton';
import productAPI from '../../../apis/product';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Product } from '../../../interfaces/product/product.interface';
import bookMarkAPI from '../../../apis/bookmark';
import InfiniteScroll from 'react-infinite-scroll-component';
import useUserStore from '../../../store/userStore';
const Products = () => {
  const isLoggedIn = useUserStore(
    (state) => state.isLoggedIn,
  );

  // 전체상품 조회
  const getProductAll = async (
    pageParam: number,
  ) => {
    const { data } =
      await productAPI.getProductAll(pageParam);
    return {
      result: data.data.products,
      nextPage: pageParam + 1,
      isLast: data.data.products.length < 20,
      hasNextPage:
        data.data.products.length === 20,
    };
  };
  // 무한스크롤
  const {
    data: product,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam = 1 }) =>
      getProductAll(pageParam),

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast)
        return lastPage.nextPage;
      return undefined;
    },
  });
  const products = useMemo(() => {
    let list: any[] = [];
    product &&
      product.pages.forEach(
        ({ result }) =>
          (list = [...list, ...result]),
      );
    return list;
  }, [product]);

  // 무료배송 분류
  // const [isFreeDelivery, setIsFreeDelivery] =
  //   useState(false);
  // const handleFreeDeliveryClick = (
  //   isFreeDelivery: boolean,
  // ) => {
  //   setIsFreeDelivery(!isFreeDelivery);
  // };
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });
  //북마크 삭제
  const delBookMark = async (
    productId: number,
  ) => {
    const { data } =
      await bookMarkAPI.delBookMark(productId);
    return data.data;
  };
  const { mutate: deleteMutate } = useMutation({
    mutationFn: delBookMark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });

  const handleAddBookmarkClick = (
    productId: number,
  ) => {
    createMutate(productId);
  };
  const handleDelBookmarkClick = (
    productId: number,
  ) => {
    deleteMutate(productId);
  };
  if (!products) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    refetch();
  }, [isLoggedIn, refetch]);
  return (
    <ProductSection>
      <h1>인기 상품</h1>
      {/* <FilterButton
        onFreeDeliveryClick={
          handleFreeDeliveryClick
        }
        isTrue={isFreeDelivery}
      /> */}
      <ProductWrap>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          hasMore={hasNextPage}
          next={() => fetchNextPage()}
          loader={<h4>Loading...</h4>}
          dataLength={products.length}
        >
          <ProductList>
            {products.map((product: Product) => (
              <ProductItem
                key={product.productId}
              >
                <Link
                  to={`detail/${product.productId}`}
                ></Link>
                <ImgWrap>
                  <img
                    src={product.imageUrl}
                    alt=""
                  />

                  <ScrapBtn>
                    {!product.isBookmarked ? (
                      <button
                        disabled={!isLoggedIn}
                        onClick={() =>
                          handleAddBookmarkClick(
                            product.productId,
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="inactive-icon"
                        >
                          <defs>
                            <path
                              id="scrap-icon-2-b"
                              d="M12.472 6.93l7.056-3.811A1 1 0 0 1 21 4.002v15.496c0 .83-.672 1.502-1.5 1.502h-15c-.828 0-1.5-.673-1.5-1.502V4.002a1 1 0 0 1 1.472-.883l7.056 3.811a.999.999 0 0 0 .944 0z"
                            ></path>
                            <filter
                              id="scrap-icon-2-a"
                              width="150%"
                              height="150%"
                              x="-25%"
                              y="-25%"
                              filterUnits="objectBoundingBox"
                            >
                              <feOffset
                                in="SourceAlpha"
                                result="shadowOffsetOuter1"
                              ></feOffset>
                              <feGaussianBlur
                                in="shadowOffsetOuter1"
                                result="shadowBlurOuter1"
                                stdDeviation="1.5"
                              ></feGaussianBlur>
                              <feComposite
                                in="shadowBlurOuter1"
                                in2="SourceAlpha"
                                operator="out"
                                result="shadowBlurOuter1"
                              ></feComposite>
                              <feColorMatrix
                                in="shadowBlurOuter1"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
                              ></feColorMatrix>
                            </filter>
                            <filter
                              id="scrap-icon-2-c"
                              width="150%"
                              height="150%"
                              x="-25%"
                              y="-25%"
                              filterUnits="objectBoundingBox"
                            >
                              <feGaussianBlur
                                in="SourceAlpha"
                                result="shadowBlurInner1"
                                stdDeviation="1.5"
                              ></feGaussianBlur>
                              <feOffset
                                in="shadowBlurInner1"
                                result="shadowOffsetInner1"
                              ></feOffset>
                              <feComposite
                                in="shadowOffsetInner1"
                                in2="SourceAlpha"
                                k2="-1"
                                k3="1"
                                operator="arithmetic"
                                result="shadowInnerInner1"
                              ></feComposite>
                              <feColorMatrix
                                in="shadowInnerInner1"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                              ></feColorMatrix>
                            </filter>
                          </defs>
                          <g
                            fill="none"
                            fillRule="nonzero"
                            transform="matrix(1 0 0 -1 0 24)"
                          >
                            <use
                              fill="#000"
                              filter="url(#scrap-icon-2-a)"
                              href="#scrap-icon-2-b"
                            ></use>
                            <use
                              fill="#FFF"
                              fillOpacity=".4"
                              href="#scrap-icon-2-b"
                            ></use>
                            <use
                              fill="#000"
                              filter="url(#scrap-icon-2-c)"
                              href="#scrap-icon-2-b"
                            ></use>
                            <path
                              stroke="#FFF"
                              d="M12.71 7.37h-.002a1.5 1.5 0 0 1-1.417 0L4.236 3.56a.499.499 0 0 0-.736.442v15.496c0 .553.448 1.002 1 1.002h15c.552 0 1-.449 1-1.002V4.002a.499.499 0 0 0-.734-.443l-7.057 3.81zm-.475-.88h-.001z"
                            ></path>
                          </g>
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleDelBookmarkClick(
                            product.productId,
                          )
                        }
                      >
                        <svg
                          className="active-icon"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <path
                            fill="#35C5F0"
                            fillRule="nonzero"
                            d="M12.472 17.07a.999.999 0 0 0-.944 0l-7.056 3.811A.999.999 0 0 1 3 19.998V4.502C3 3.672 3.672 3 4.5 3h15c.828 0 1.5.673 1.5 1.502v15.496a1 1 0 0 1-1.472.883l-7.056-3.811z"
                          ></path>
                        </svg>
                      </button>
                    )}
                  </ScrapBtn>
                </ImgWrap>
                <ItemInfo>
                  <ItemInfoHeader>
                    <em>{product.brand}</em>
                    <span>{product.name}</span>
                  </ItemInfoHeader>
                  <ItemPrice>
                    <span>
                      <span>
                        {product.discount}%
                      </span>
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
        </InfiniteScroll>
      </ProductWrap>
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
  overflow: hidden;
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
