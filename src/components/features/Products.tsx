import React, { useState } from 'react';
import styled from 'styled-components';
import FilterButton from './FilterButton';
import productAPI from '../../apis/product';
import {
  useMutation,
  // useInfiniteQuery,
  useQuery,
  // useQueryClient,
} from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/product/product.interface';
import bookMarkAPI from '../../apis/bookmark';

const Products = () => {
  // 전체상품 조회
  const getProductAll = async () => {
    const { data } =
      await productAPI.getProductAll();
    return data.data.products;
    // const { respnseDto, hasNext } = data.data;
    // return {
    //   result: respnseDto,
    //   nextPage: pageParam + 1,
    //   isLast: !hasNext,
    // };
  };
  const { data: products } = useQuery({
    queryKey: ['getProductsAll'],
    queryFn: getProductAll,
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
  //무한 스크롤
  // const { data } = useInfiniteQuery({
  //   queryKey: ['getProductsAll'],
  //   queryFn: ({ pageParam = 1 }) =>
  //     getProductAll(pageParam),
  //   getNextPageParam: (lastPage) => {
  //     if (!lastPage.isLast)
  //       return lastPage.nextPage;
  //     return undefined;
  //   },
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: true,
  //   retry: 1,
  // });

  // 무료배송 분류
  const [isFreeDelivery, setIsFreeDelivery] =
    useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const handleFreeDeliveryClick = (
    isFreeDelivery: boolean,
  ) => {
    setIsFreeDelivery(!isFreeDelivery);
  };

  if (!products) {
    return <div>Loading...</div>;
  }
  return (
    <ProductSection>
      <h1>인기 상품</h1>
      <FilterButton
        onFreeDeliveryClick={
          handleFreeDeliveryClick
        }
        isTrue={isFreeDelivery}
      />
      <ProductWrap>
        <ProductList>
          {products.map((product: Product) => (
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
                    <span>4.8</span>
                    <span>리뷰 33,361</span>
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
